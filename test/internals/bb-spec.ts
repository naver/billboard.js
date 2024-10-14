/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, afterEach, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";

import bb from "../../src";
import {convertInputType, extend} from "../assets/module/util";
import util from "../assets/util";
import {$AXIS, $COMMON} from "../../src/config/classes";
import Chart from "../../src/Chart/Chart";

describe("Interface & initialization", () => {
	function getWrapper(id) {
		let container = document.getElementById(id);

		if (!container) {
			container = document.createElement("div");
			container.id = id;
			document.body.appendChild(container);
		}

		return container;
	}

	describe("Initialization", () => {
		let instChart;
		const checkElements = $ => {
			const isD3Node = v => v && "node" in v || false;

			Object.values($).forEach((v1: any) => {
				const isNode = isD3Node(v1);

				if (isNode) {
					expect(isNode).to.be.true;
				} else if (v1) {
					Object.values(v1).forEach(v2 => {
						v2 && expect(isD3Node(v2)).to.be.true;
					});
				}
			});
		};

		it("Check for billboard.js object", () => {
			expect(bb).not.to.be.null;
			expect(typeof bb).to.be.equal("object");
			expect(typeof bb.generate).to.be.equal("function");
		});

		it("Check for initialization", () => {
			instChart = util.generate({
				title: {
					text: "test"
				},
				data: {
					columns: [
						["data1", 30]
					],
					labels: {
						show: true
					},
					type: "bar"
				},
				onrendered: function() {
					checkElements(this.$);
				}
			});
			const internal = instChart.internal;

			expect(instChart).not.to.be.null;
			expect(instChart.$.chart.classed("bb")).to.be.true;
			expect(internal.$el.svg.node().tagName).to.be.equal("svg");
			expect(convertInputType(true, false)).to.be.equal(internal.state.inputType);
			expect(instChart).to.be.equal(bb.instance[bb.instance.length - 1]);
		});

		it("should return version string", () => {
			expect(bb.version.length > 0).to.be.ok;
		});

		it("should be accessing node elements", () => {
			checkElements(instChart.$);
		});

		it("instantiate with non-existing element", () => {
			instChart = util.generate({
				bindto: "#no-exist-element",
				data: {
					columns: [
						["data1", 30]
					]
				}
			});

			expect(instChart.$.chart.classed("bb")).to.be.true;
		});

		it("instantiate with empty data", () => {
			let threw = false;

			try {
				util.generate({data: {}});
			} catch(e) {
				threw = true;
			} finally {
				expect(threw).to.be.true;
			}
		});

		it("instantiate with different classname on wrapper element", () => {
			const bindtoClassName = "billboard-js";
			instChart = bb.generate({
				bindto: {
					element: "#chart",
					classname: bindtoClassName
				},
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 500, 800, 500, 2000]
					]
				}
			});

			expect(instChart.$.chart.classed(bindtoClassName)).to.be.true;
		});

		it("should bind correctly with nullish properties", () => {
			const options = {
				data: {
					columns: [["data1", 0]]
				}
			};
	
			class Extended extends Chart {
				nullProperty;
				voidProperty;
			}
	
			extend(Chart.prototype, {
				nullProperty: null,
				voidProperty: undefined
			});
	
			const extendedInstance = new Chart(options);

			expect((extendedInstance as Extended).nullProperty).to.be.null;
			expect((extendedInstance as Extended).voidProperty).to.be.undefined;
		});
	});

	describe("auto resize", () => {
		let chart;
		const containerName = "container";
		let container;

		beforeEach(() => {
			container = document.getElementById(containerName);

			if (!container) {
				container = document.createElement("div");
				container.id = containerName;
				document.body.appendChild(container);
			}
		});

		afterAll(() => {
			//document.body.removeAttribute("style");
		});

		it("should resize correctly in flex container", () => new Promise(done => {
			const innerHTML = document.body.innerHTML;

			// set flex container
			const div = document.createElement("div");

			div.style.display = "flex";
			div.innerHTML = `<div style="display:block;flex-basis:0;flex-grow:1;flex-shrink:1"><div id="flex-container"></div></div>`;

			document.body.appendChild(div);

			//document.body.innerHTML = '<div style="display:flex"><div style="display:block;flex-basis:0;flex-grow:1;flex-shrink:1"><div id="flex-container"></div></div></div>';

			const chart = util.generate({
				bindto: "#flex-container",
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 500, 800, 500, 2000]
					]
				}
			});

			const chartWidth = +chart.internal.$el.svg.attr("width");
			const diff = 50;

			// shrink width & resize
			document.body.style.width = `${document.body.offsetWidth - diff}px`;
			chart.internal.resizeFunction();

			setTimeout(() => {
				expect(+chart.internal.$el.svg.attr("width")).to.be.equal(chartWidth - diff);

				div.parentNode?.removeChild(div);
				//document.body.innerHTML = innerHTML;

				done(1);
			}, 200);
		}));

		it("height shouldn't be increased on resize event", () => new Promise(done => {
			beforeAll(() => {
				return new Promise((resolve) => {
					chart = util.generate({
						bindto: "#chartResize",
						data: {
							columns: [
								["data1", 30, 200, 100, 400],
								["data2", 500, 800, 500, 2000]
							]
						},
						onrendered: resolve
					});
				});
			});

			container.innerHTML = '<div id="chartResize"></div>';

			chart = util.generate({
				bindto: "#chartResize",
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 500, 800, 500, 2000]
					]
				}
			});
			const chartHeight = +chart.internal.$el.svg.attr("height");

			container.style.width = `${+container.style.width.replace("px", "") - 100}px`;
			chart.internal.resizeFunction();

			setTimeout(() => {
				expect(+chart.internal.$el.svg.attr("height")).to.be.equal(chartHeight);
				done(1);
			}, 300);
		}));

		it("should be resizing all generated chart elements", () => new Promise(done => {
			const width = 300;
			const inst: any[] = [];

			beforeAll(() => {
				container.innerHTML = '<div id="chartResize1"></div><div id="chartResize2"></div>';
	
				const args = {
					data: {
						columns: [
							["data1", 30]
						]
					},
					transition: {
						duration: 0
					},
					bindto: "#chartResize1"
				};
	
				inst.push(util.generate(args));
				inst.push(util.generate((args.bindto = "#chartResize2") && args));
			});

			container.style.width = width + "px";

			// run the resize handler
			inst.forEach(c => {
				c.internal.resizeFunction();
			});

			setTimeout(() => {
				inst.forEach(c => {
					expect(+c.internal.$el.svg.attr("width")).to.be.equal(width);
				});

				done(1);
			}, 300);
		}));

		it("should set correct height value", () => {
			const height = 450;
			container.innerHTML = `<div style="height:${height}px;width:500px"><div id="chartHeight" style="height:100%"></div></div>`;

			chart = util.generate({
				bindto: "#chartHeight",
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 500, 800, 500, 2000]
					]
				}
			});

			expect(chart.$.chart.node().getBoundingClientRect().height).to.be.equal(height);
		});

		it("check if viewBox attribute set", () => {
			chart = util.generate({
				resize: {
					auto: "viewBox"
				},
				data: {
					columns: [
						["data1", 300, 350, 300, 120, 100, 200],
					],
					type: "bar"
				}
			});

			const {svg} = chart.$;

			expect(svg.attr("viewBox")).to.be.equal("0 0 640 480");
		});
	});

	describe("set defaults options", () => {
		let chart;
		let tickPrefix = "-A-";
		let args: any = {
			data: {
				types: {
					data1: "area",
					data2: "area-spline"
				}
			},
			axis: {
				x: {
					tick: {
						format: x =>`${tickPrefix}${x}`
					}
				}
			}
		};

		beforeAll(() => {
			bb.defaults(args);
		});

		afterAll(() => {
			bb.defaults({});
		})

		it("check if defaults options applied", () => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					]
				}
			});

			expect(bb.defaults()).deep.equal(args);
			expect(chart.config("data.types")).to.be.deep.equal(args.data.types);

			chart.$.main.selectAll(`.${$AXIS.axisX} .tick text`).each(function(d, i) {
				expect(this.textContent).to.be.equal(`${tickPrefix}${i}`);
			})
		});

		it("check if defaults options not applied", () => {
			tickPrefix = "AB-";
			args = {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					types: {
						data1: "bar"
					}
				},
				axis: {
					x: {
						tick: {
							format: x =>`${tickPrefix}${x}`
						}
					}
				}
			};

			chart = util.generate(args);

			expect(chart.config("data.types")).to.be.deep.equal(
				// @ts-ignore
				Object.assign({}, bb.defaults().data.types, args.data.types)
			);

			chart.$.main.selectAll(`.${$AXIS.axisX} .tick text`).each(function(d, i) {
				expect(this.textContent).to.be.equal(`${tickPrefix}${i}`);
			});
		});
	});

	describe("check for callbacks if instance param is passed", () => {
		let chart;
		const spy = sinon.spy();

		beforeAll(() => {
			const args = {
				data: {
					columns: [
						["data1", 300, 350, 300]
					]
				}
			};

			["beforeinit", "init", "rendered", "afterinit", "resize", "resized", "click", "over", "out"]
				.forEach(v => {
					args[`on${v}`] = function() {
						spy(v, this);
					}
				});

			chart = util.generate(args);
		});

		beforeEach(() => spy.resetHistory());

		it("check for the init callbacks", () => {
			const expected = ["beforeinit", "init", "rendered", "afterinit"];

			spy.args.forEach((v, i) => {
				expect(v[0]).to.be.equal(expected[i]);
				expect(v[1]).to.be.equal(chart);
			});
		});

		it("check for the resize callbacks", () => {
			const expected = ["resize", "resized"];

			// when
			chart.internal.resizeFunction();

			spy.args.forEach((v, i) => {
				expect(v[0]).to.be.equal(expected[i]);
				expect(v[1]).to.be.equal(chart);
			});
		});

		it("check for the onclick/over/out callbacks", () => {
			const expected = ["click", "over", "out"];

			// when
			chart.$.svg.on("click")();
			chart.$.svg.on("mouseenter")();
			chart.$.svg.on("mouseleave")();

			spy.args.forEach((v, i) => {
				expect(v[0]).to.be.equal(expected[i]);
				expect(v[1]).to.be.equal(chart);
			});
		});
	});

	describe("check for lazy rendering", () => {
		let chart;
		const spy: any = {};
		const args: any = {
			data: {
				columns: [
					["data1", 300, 350, 300]
				]
			}
		};

		["afterinit", "rendered", "resize", "resized"].forEach(v => {
			args[`on${v}`] = spy[v] = sinon.spy();
		});

		afterEach(() => {
			for (let x in spy) {
				spy[x].resetHistory();
			}
		});

		it("check lazy rendering & mutation observer: style attribute", () => new Promise(done => {
			const el: any = document.body.querySelector("#chart");

			// hide to lazy render
			el.style.display = "none";

			chart = util.generate(args);

			expect(el.innerHTML).to.be.empty;

			for (let x in spy) {
				expect(spy[x].called).to.be.false;
			}

			el.style.display = "block";

			setTimeout(() => {
				expect(el.innerHTML).to.be.not.empty;
				el.style.display = "";

				expect(spy.afterinit.called).to.be.true;
				expect(spy.rendered.called).to.be.true;
				done(1);
			}, 300);
		}));

		it("check lazy rendering & mutation observer: class attribute", () => new Promise(done => {
			const el = document.body.querySelector("#chart");

			// hide to lazy render
			el?.classList.add("hide");

			chart = util.generate(args);

			expect(el?.innerHTML).to.be.empty;

			for (let x in spy) {
				expect(spy[x].called).to.be.false;
			}

			el?.classList.remove("hide");

			setTimeout(() => {
				expect(el?.innerHTML).to.be.not.empty;
				expect(spy.afterinit.called).to.be.true;
				expect(spy.rendered.called).to.be.true;
				
				done(1);
			}, 300);
		}));

		it("check lazy rendering on callbacks", () => new Promise(done => {
			const el = document.body.querySelector("#chart") as HTMLDivElement;

			// hide to lazy render
			el.style.display = "none";

			chart = util.generate(args);

			expect(el.innerHTML).to.be.empty;

			// onresize, resized shouldn't be called on resize
			expect(
				chart.resize({width: 500})
			).to.throw;

			for (let x in spy) {
				expect(spy[x].called).to.be.false;
			}

			el.style.display = "block";

			setTimeout(() => {
				expect(el.innerHTML).to.be.not.empty;
				el.style.display = "";

				expect(spy.afterinit.called).to.be.true;
				expect(spy.rendered.called).to.be.true;

				chart.resize({width: 500});

				setTimeout(() => {
					expect(spy.resize.called).to.be.true;
					expect(spy.resized.called).to.be.true;
					
					done(1);
				}, 300);	
			}, 300);
		}), 4000);

		it("check lazy rendering via option", () => new Promise(done => {
			const el = document.body.querySelector("#chart");

			args.render = {
				lazy: true,
				observe: false
			};

			chart = util.generate(args);

			// chart shouldn't be rendered
			expect(el?.innerHTML).to.be.empty;

			for (let x in spy) {
				expect(spy[x].called).to.be.false;
			}

			// call to render
			chart.flush();

			setTimeout(() => {
				expect(el?.innerHTML).to.be.not.empty;
				expect(spy.afterinit.called).to.be.true;
				expect(spy.rendered.called).to.be.true;
		
				done(1);
			}, 300);
		}));

		it("should forcely linitialize even chart element visibility is hidden.", () =>{
			const el = <HTMLDivElement>document.body.querySelector("#chart");

			// hide to lazy render
			el.style.display = "none";

			chart = util.generate({
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "line"
				},
				render: {
					lazy: false
				}
			});

			expect(chart.$.svg.node().innerHTML).to.be.not.empty;

			el.style.display = "";
		});
	});

	describe("check for background", () => {
		let chart;
		const args: any = {
			data: {
				columns: [
					["data1", 300, 350, 300]
				]
			},
			background: {
				class: "myBgClass",
				imgUrl: "https://naver.github.io/billboard.js/img/logo/billboard.js.svg"
			}
		};

		it("check for image background", () => {
			chart = util.generate(args);

			const element = chart.$.main.select(".myBgClass");

			expect(element.node().parentNode).to.be.equal(chart.$.svg.select("g").node());
			expect(element.empty()).to.be.false;
			expect(element.attr("href")).to.be.equal(args.background.imgUrl);
			expect(element.node().tagName).to.be.equal("image");
		});

		it("check for pie's image background", () => {
			args.data.type = "pie";
			chart = util.generate(args);

			const element = chart.$.main.select(".myBgClass");

			expect(element.node().nextSibling.getAttribute("class")).to.be.equal($COMMON.chart);
		});

		it("set option background.color=red", () => {
			args.data.type = "line";
			args.background.color = "red";
			delete args.background.imgUrl;
		});

		it("check for rect background", () => {
			chart = util.generate(args);

			const element = chart.$.main.select(".myBgClass");

			expect(element.node().parentNode).to.be.equal(chart.$.svg.select("g").node());
			expect(element.empty()).to.be.false;
			expect(element.style("fill")).to.be.equal(args.background.color);
			expect(element.node().tagName).to.be.equal("rect");
		});

		it("check for pie's rect background", () => {
			args.data.type = "pie";
			chart = util.generate(args);

			const element = chart.$.main.select(".myBgClass");

			expect(element.node().nextSibling.getAttribute("class")).to.be.equal($COMMON.chart);
		});
	});

	describe("resize options", () => {
		const containerName = "container2";
		const spy = sinon.spy();
		let container;

		beforeEach(() => {
			container = getWrapper(containerName);
		});

		it("check for the resize timer using requestIdleCallback()", () => new Promise(done => {
			const width = 300;
			const chart = util.generate({
				bindto: `#${containerName}`,
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 500, 800, 500, 2000]
					]
				},
				resize: {
					timer: false
				},
				onresize: function() {
					expect(this).to.be.deep.equal(chart);
				},
				onresized: function() {
					expect(this).to.be.deep.equal(chart);
					expect(chart.$.chart.style("width")).to.be.equal(`${width}px`);
			
					done(1);
				}
			});

			// resize chart holder
			chart.$.chart.style("width", `${width}px`);

			// trigger resize eventize 
			window.dispatchEvent(new Event("resize"));
		}));
	});

	describe("resize legend", () => {
		const containerName = "containerForLegend";
		let container;

		beforeAll(() => {
			container = getWrapper(containerName);
		});

		it("should legend resized correctly?", () => new Promise(function(done) {
			container.innerHTML = `<div id="${containerName}"></div>`;

			const chart = util.generate({
				bindto: `#${containerName}`,
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 500, 800, 500, 2000]
					]
				},
				resize: {
					timer: 100
				},
				transition: {
					duration: 0
				},
				onresized: function() {
					const {$: {legend}, internal} = chart;
					const rect = legend.node().getBoundingClientRect();

					expect(
						util.parseNum(legend.attr("transform")) + rect.height
					).to.be.below(internal.state.current.height);

					done(``);
				}
			});

			// resize chart holder
			chart.$.chart.style("width", "100px");
			window.dispatchEvent(new Event("resize"));
		}));
	});
});
