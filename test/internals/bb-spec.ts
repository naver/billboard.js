/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import bb from "../../src";
import util from "../assets/util";
import CLASS from "../../src/config/classes";7

describe.only("Interface & initialization", () => {
	let chart;

	describe("Initialization", () => {
		const checkElements = $ => {
			const isD3Node = v => v && "node" in v || false;

			Object.values($).forEach(v1 => {
				const isNode = isD3Node(v1);

				if (isNode) {
					expect(isNode).to.be.true;
				} else {
					Object.values(v1).forEach(v2 => {
						expect(isD3Node(v2)).to.be.true;
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
			chart = util.generate({
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
				onrendered: ctx => checkElements(ctx.$)
			});
			const internal = chart.internal;

			expect(chart).not.to.be.null;
			expect(d3Select(chart.element).classed("bb")).to.be.true;
			expect(internal.svg.node().tagName).to.be.equal("svg");
			expect(internal.convertInputType()).to.be.equal(internal.inputType);
			expect(chart).to.be.equal(bb.instance[0]);
		});

		it("should return version string", () => {
			expect(bb.version.length > 0).to.be.ok;
		});

		it("should be accessing node elements", () => {
			checkElements(chart.$);
		});

		it("instantiate with non-existing element", () => {
			chart = util.generate({
				bindto: "#no-exist-element",
				data: {
					columns: [
						["data1", 30]
					]
				}
			});

			expect(chart.element.classList.contains("bb")).to.be.true;
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
			chart = bb.generate({
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

			expect(d3Select(chart.element).classed(bindtoClassName)).to.be.true;
		});
	});

	describe("auto resize", () => {
		let container;

		beforeEach(() => {
			container = document.getElementById("container");

			if (!container) {
				container = document.createElement("div");
				container.id = "container";
				document.body.appendChild(container);
			}
		});

		after(() => {
			document.body.removeAttribute("style");
		});

		it("should resize correctly in flex container", function(done) {
			const innerHTML = document.body.innerHTML;

			this.timeout(5000);

			// set flex container
			document.body.innerHTML = '<div style="display:flex"><div style="display:block;flex-basis:0;flex-grow:1;flex-shrink:1"><div id="flex-container"></div></div></div>';

			const chart = util.generate({
				bindto: "#flex-container",
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 500, 800, 500, 2000]
					]
				}
			});

			const chartWidth = +chart.internal.svg.attr("width");
			const diff = 50;

			// shrink width & resize
			document.body.style.width = `${document.body.offsetWidth - diff}px`;
			chart.internal.resizeFunction();

			setTimeout(() => {
				expect(+chart.internal.svg.attr("width")).to.be.equal(chartWidth - diff);
				document.body.innerHTML = innerHTML;

				done();
			}, 200);
		});

		it("height shouldn't be increased on resize event", function(done) {
			this.timeout(5000);

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
			const chartHeight = +chart.internal.svg.attr("height");

			container.style.width = `${+container.style.width.replace("px", "") - 100}px`;
			chart.internal.resizeFunction();

			setTimeout(() => {
				expect(+chart.internal.svg.attr("height")).to.be.equal(chartHeight);
				done();
			}, 200);
		});

		it("should be resizing all generated chart elements", function(done) {
			this.timeout(5000);
			container.innerHTML = '<div id="chartResize1"></div><div id="chartResize2"></div>';

			const width = 300;
			const args = {
				data: {
					columns: [
						["data1", 30]
					]
				},
				bindto: "#chartResize1"
			};

			const chart1 = util.generate(args);
			const chart2 = util.generate((args.bindto = "#chartResize2") && args);

			container.style.width = width + "px";

			// run the resize handler
			chart.internal.charts.forEach(c => {
				c.internal.resizeFunction();
			});

			setTimeout(() => {
				expect(+chart1.internal.svg.attr("width")).to.be.equal(width);
				expect(+chart2.internal.svg.attr("width")).to.be.equal(width);
				done();
			}, 200);
		});
	});

	describe("set defaults options", () => {
		let tickPrefix = "-A-";
		let args = {
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

		before(() => {
			bb.defaults(args);
		});

		after(() => {
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

			chart.$.main.selectAll(`.${CLASS.axisX} .tick text`).each(function(d, i) {
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
				Object.assign({}, bb.defaults().data.types, args.data.types)
			);

			chart.$.main.selectAll(`.${CLASS.axisX} .tick text`).each(function(d, i) {
				expect(this.textContent).to.be.equal(`${tickPrefix}${i}`);
			});
		});
	});

	describe("check for callbacks if instance param is passed", () => {
		let chart;
		const spy = sinon.spy();

		before(() => {
			const args = {
				data: {
					columns: [
						["data1", 300, 350, 300]
					]
				}
			};

			["beforeinit", "init", "rendered", "afterinit", "resize", "resized", "over", "out"]
				.forEach(v => {
					args[`on${v}`] = ctx => spy(v, ctx);
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

		it("check for the onover/out callbacks", () => {
			const expected = ["over", "out"];

			// when
			chart.$.svg.on("mouseenter")();
			chart.$.svg.on("mouseleave")();

			spy.args.forEach((v, i) => {
				expect(v[0]).to.be.equal(expected[i]);
				expect(v[1]).to.be.equal(chart);
			});
		});
	});

	describe("check for lazy rendering", () => {
		const spy = {};
		const args = {
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

		it("check lazy rendering & mutation observer: style attribute", done => {
			const el = document.body.querySelector("#chart");

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
				done();
			}, 500);
		});

		it("check lazy rendering & mutation observer: class attribute", done => {
			const el = document.body.querySelector("#chart");

			// hide to lazy render
			el.classList.add("hide");

			chart = util.generate(args);

			expect(el.innerHTML).to.be.empty;

			for (let x in spy) {
				expect(spy[x].called).to.be.false;
			}

			el.classList.remove("hide");

			setTimeout(() => {
				expect(el.innerHTML).to.be.not.empty;
				expect(spy.afterinit.called).to.be.true;
				expect(spy.rendered.called).to.be.true;
				done();
			}, 500);
		});

		it("check lazy rendering on callbacks", done => {
			const el = document.body.querySelector("#chart");

			// hide to lazy render
			el.style.display = "none";

			chart = util.generate(args);

			expect(el.innerHTML).to.be.empty;

			// onresize, resized shouldn't be called on resize
			chart.resize({width: 500});

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
					done();
				}, 300);				
			}, 500);
		});

		it("check lazy rendering via option", done => {
			const el = document.body.querySelector("#chart");

			args.render = {
				lazy: true,
				observe: false
			};

			chart = util.generate(args);

			// chart shouldn't be rendered
			expect(el.innerHTML).to.be.empty;

			for (let x in spy) {
				expect(spy[x].called).to.be.false;
			}

			// call to render
			chart.flush();

			setTimeout(() => {
				expect(el.innerHTML).to.be.not.empty;
				expect(spy.afterinit.called).to.be.true;
				expect(spy.rendered.called).to.be.true;
				done();
			}, 500);
		});
	});

	describe("check for background", () => {
		const args = {
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

			expect(element.node().parentNode.getAttribute("class")).to.be.equal(CLASS.regions);
			expect(element.empty()).to.be.false;
			expect(element.attr("href")).to.be.equal(args.background.imgUrl);
			expect(element.node().tagName).to.be.equal("image");
		});

		it("check for pie's image background", () => {
			args.data.type = "pie";
			chart = util.generate(args);

			const element = chart.$.main.select(".myBgClass");

			expect(element.node().parentNode.getAttribute("class")).to.be.equal(CLASS.chart);
		});

		it("set option background.color=red", () => {
			args.data.type = "line";
			args.background.color = "red";
			delete args.background.imgUrl;
		});

		it("check for rect background", () => {
			chart = util.generate(args);

			const element = chart.$.main.select(".myBgClass");

			expect(element.node().parentNode.getAttribute("class")).to.be.equal(CLASS.regions);
			expect(element.empty()).to.be.false;
			expect(element.style("fill")).to.be.equal(args.background.color);
			expect(element.node().tagName).to.be.equal("rect");
		});

		it("check for pie's rect background", () => {
			args.data.type = "pie";
			chart = util.generate(args);

			const element = chart.$.main.select(".myBgClass");

			expect(element.node().parentNode.getAttribute("class")).to.be.equal(CLASS.chart);
		});
	});
});
