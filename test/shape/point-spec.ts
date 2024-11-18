/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import sinon from "sinon";
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$CIRCLE} from "../../src/config/classes";
import {fireEvent} from "../assets/helper";

describe("SHAPE POINT", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("default point type", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					]
				}
			};
		});

		it("Should render svg circle elements", () => {
			const circles = chart.$.circles.filter(d => d.id === "data1");

			expect(circles.size()).to.be.equal(chart.data("data1")[0].values.length);
		});

		it("circle points are expanded?", () => {
			const index = 1;
			const r = chart.config("point.r");

			// when
			chart.internal.expandCircles(index);

			chart.$.circles.filter(d => d.x === index).each(function() {
				expect(+this.getAttribute("r")).to.be.above(r);
			});
		});
	});

	describe("rectangle point type", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					]
				},
				point: {
					pattern: ["rectangle"]
				}
			};
		});

		it("Should render svg rect elements", () => {
			const circles = chart.$.circles.filter(d => d.id === "data1");

			expect(circles.size()).to.be.equal(chart.data("data1")[0].values.length);

			circles.each(function() {
				expect(this.tagName).to.be.equal("rect");
			});
		});
	});

	describe("custom point type", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data 2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					]
				},
				point: {
					pattern: [
						"<polygon points='2.5 0 0 5 5 5'></polygon>"
					]
				}
			};
		});

		it("Should render svg \"use\" elements", () => {
			const circles = chart.$.circles.filter(d => d.id === "data1");

			expect(circles.size()).to.be.equal(chart.data("data1")[0].values.length);

			circles.each(function() {
				expect(this.tagName).to.be.equal("use");
			});
		});

		it("set options point.pattern", () => {
			args.point.pattern = [
				"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10' style='fill:#fff'></rect></g>"
			];
		});

		it("should be allowing to set groping nodes", () => {
			const innerHTML = chart.config("point.pattern")[0]
				.replace(/<\/?g>/g, "").replace(/'/g, '"');

			chart.$.defs.selectAll("g").each(function() {
				expect(this.innerHTML).to.be.equal(innerHTML);
			});
		});

		it("custom points are expanded?", () => {
			const index = 1;

			// when
			chart.internal.expandCircles(index);

			chart.$.circles.filter(d => d.x === index).each(function() {
				const scale = +this.getAttribute("transform").match(/scale\((.*)\)/)[1];

				expect(scale).to.be.equal(1.75);
			});
		});

		it("set option: nullish data", () => {
			args.data.columns = [
				["data1", 6, 4, null]
			];

			args.point.pattern = ['<circle cx="4" cy="4" r="4" />'];
		});

		it("custom point's position for null data shoudn't be set as NaN", () => {
			expect(chart.$.circles.filter(":last-child").attr("y")).to.not.equal("NaN");
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data 2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					],
					selection: {
						enabled: true
					}
				},
				point: {
					pattern: [
						"<polygon points='2.5 0 0 5 5 5'></polygon>"
					]
				}
			};
		});

		it("should custom point hidden", () => new Promise(done => {
			const target = {
				id: "data3",
				index: 2
			};

			// when
			chart.select(target.id, [target.index], true);
			chart.hide(target.id);

			setTimeout(() => {
				const point = chart.$.circles.filter(d => d.id === target.id && d.index == target.index).node();

				expect(point.parentNode.style.opacity).to.be.equal("0");
				done(1);
			}, 300);
		}));
	});

	describe("point transition", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					]
				}
			};
		});

		it("newly added points shouldn't be transitioning from the top/left", () => new Promise(done => {
			const main = chart.$.main;
			const pos: number[] = [];
			let point;
			let interval;

			setTimeout(() => {
				interval = setInterval(() => {
					point = main.select(`.${$CIRCLE.circles}-data2 .${$CIRCLE.circle}-3`);
					pos.push(+point.attr("cx"));
				}, 20);

				chart.load({
					columns: [
						["data2", 44, 134, 98, 170]
					],
					done: function () {
						setTimeout(() => {
							clearInterval(interval);
							const currPos = +point.attr("cx");

							expect(Math.round(pos[0])).to.not.equal(0);
							expect(pos.every(v => v === currPos)).to.be.true;

							done(1);
						}, 300);
					}
				});
			}, 300);
		}));
	});

	describe("point sensitivity", () => {
		const spy = sinon.spy();

		function checkHover({circle, eventRect}, values, index, sensitivity = 0) {
			const node = circle.nodes()[index];
			const x = +node.getAttribute("cx");
			const y = +node.getAttribute("cy");
			const r = +node.getAttribute("r");

			const clientX = x + (sensitivity || r);
			const clientY = y;

			util.hoverChart(chart, "mousemove", {
				clientX, clientY
			});

			expect(+chart.$.tooltip.select(".value").text())
				.to.be.equal(values[index]);

			expect(eventRect.style("cursor")).to.be.equal("pointer");

			if (chart.config("point.sensitivity") === "radius") {
				fireEvent(eventRect.node(), "click", {
					clientX, clientY
				}, chart);

				expect(spy.calledOnce).to.be.true;

				spy.resetHistory();
			}
		}

		beforeAll(() => {
			args = {
				size: {
					width: 400,
					height: 250
				},
				data: {
					columns: [
						["data1", 90, 40, 10],
						["data2", 5, 5, 5],
						["data3", 3, 3, 3]
					],
					groups: [["data1", "data2", "data3"]]
				},
				tooltip: {
					grouped: false
				}
			}; 
		});

		it("default sensitivity", () => {
			chart.tooltip.show({
				data: {x: 1, value: 4}
			});

			expect(chart.$.tooltip.selectAll(".name").size()).to.be.equal(2);
		});

		it("set options point.sensitivity=3", () => {
			args.point = {
				sensitivity: 3
			};
		});

		it("lowered sensitivity", () => {
			chart.tooltip.show({
				data: {x: 1, value: 4}
			});

			expect(chart.$.tooltip.selectAll(".name").size()).to.be.equal(1);
		});

		it("set options point.sensitivity='radius'", () => {
			args = {
				data: {
				  columns: [
					  ["data1", 10, 100, 300]
				  ],
				  type: "bubble",
				  onclick: spy
				},
				point: {
					sensitivity: "radius"
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("check when point.sensitivity='radius'", () => new Promise(done => {
			const {$el} = chart.internal;
			const values = chart.data.values("data1");

			new Promise((resolve, reject) => {
				checkHover($el, values, 0);

				setTimeout(resolve, 300);
			}).then(() => {
				return new Promise((resolve, reject) => {
					checkHover($el, values, 1);

					setTimeout(resolve, 300);
				});
			}).then(() => {
				return new Promise((resolve, reject) => {
					checkHover($el, values, 2);

					setTimeout(resolve, 300);
				});
			}).then(() => {
				done(1);
			});
		}));

		it("set options point.sensitivity=Function", () => {
			args.point.sensitivity = function(d) {
				const {r, value} = d;
				
				// check callback call context
				expect(this === chart).to.be.true;

				if (value === 100) {
				  return 5;
				} else if (value === 300) {
				  return 15;
				} else {
					return r;
				}
			};
		});

		it("check when point.sensitivity=Function", () => new Promise(done => {
			const {$el} = chart.internal;
			const values = chart.data.values("data1");

			new Promise((resolve, reject) => {
				checkHover($el, values, 0);

				setTimeout(resolve, 300);
			}).then(() => {
				return new Promise((resolve, reject) => {
					checkHover($el, values, 1, 3);

					setTimeout(resolve, 300);
				});
			}).then(() => {
				return new Promise((resolve, reject) => {
					checkHover($el, values, 2, 15);

					setTimeout(resolve, 300);
				});
			}).then(() => {
				done(1);
			});
		}));

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 450],
					],
					type: "bubble",
					onclick: sinon.spy()
				},
				point: {
					sensitivity: "radius"
				}
			}
		});

		it("shouldn't throw error when blank(non shape) area is clicked.", () => {
            const {eventRect} = chart.internal.$el;

			expect(
				fireEvent(eventRect.node(), "click", {
					clientX: 100,
					clientY: 100
				}, chart)
			).to.not.throw;
		});

		it("set options: poinst.sensitivity=function(){}", () => {
			args.point.sensitivity = sinon.spy(({r}) => r);
		});
		
		it("should data.onclick callback called.", () => {
			const {circles} = chart.$;
			const {$el: {eventRect}} = chart.internal;
			const rect = circles.node().getBoundingClientRect();

			fireEvent(eventRect.node(), "click", {
				clientX: rect.left + 3,
				clientY: rect.top + 3
			}, chart);

			const spy = args.point.sensitivity.args[0][0];

			expect(args.data.onclick.called).to.be.true;
			expect(spy.r > 0).to.be.true;
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
					  ["data1", 450],
					],
					onclick: sinon.spy(function() {
						console.log("3333333")
					}),
					type: "line"
				},
				point: {
					sensitivity: sinon.spy(function(r) {
						return 10;
					}),
					r: 10,
					focus: {
						expand: {
							r: 10
						}
					}
				},
			};
		});

		it("should data.onclick callback called.", () => {
			const {circles} = chart.$;
			const {$el: {eventRect}} = chart.internal;
			const rect = circles.node().getBoundingClientRect();

			fireEvent(eventRect.node(), "click", {
				clientX: 300,
				clientY: 40
			}, chart); 

			const spy = args.point.sensitivity.args[0][0];
  
			expect(args.data.onclick.called).to.be.true;
			expect(spy.r > 0).to.be.true;
		});
	}); 
 
	describe("point.focus.only", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 100, 350, null, 300, 250],
						["data2", 130, 100, 140, 200, 150]
					]
				},
				point: {
					focus: {
						only: true
					}
				}
			};
		});

		it("circle visibility", () => {
			const {$: {circles}, internal: {scale}} = chart;
			const pos = {};
			let x = 3;

			circles.each(function(d) {
				pos[d.id] = [+this.getAttribute("cx"), +this.getAttribute("cy")];
			});

			expect(circles.size()).to.be.equal(chart.data().length);

			// when
			chart.tooltip.show({x});
			const cx = scale.x(x);

			circles.each(function(d) {
				const p = pos[d.id];
				
				expect(+this.getAttribute("cx")).to.be.above(p[0]);
				expect(+this.getAttribute("cy")).to.be.above(p[1]);d
				expect(d.x).to.be.equal(x);
				expect(+this.getAttribute("cx")).to.be.equal(cx);
			});

			// when
			x = 2;
			chart.tooltip.show({x});

			// 'null' data point shoudn't be displayed
			expect(circles.filter(function() {
				return this.getAttribute("style").indexOf("hidden") === -1;
			}).size()).to.be.equal(1);
		});

		it("visibility with data toggle", () => new Promise(done => {
			const {circles} = chart.$;
			let x = 2;
			
			new Promise(resolve => {
				chart.toggle("data1");

				setTimeout(resolve, 300);
			}).then(resolve => {
				chart.tooltip.show({x});

				// @ts-ignore
				setTimeout(resolve, 300);
			}).then(() => {
				circles.each(function(d, i) {
					if (i === 0) {
						expect(this.style.opacity).to.be.equal("0");
					} else {
						expect(d.id).to.be.equal("data2");
						expect(d.x).to.be.equal(x);
					}
				});

				done(1);
			});
		}));

		it("visibility with data load", () => new Promise(done => {
			let {circles} = chart.$;
			const size = circles.size();

			expect(size).to.be.equal(chart.data().length);

			chart.load({
				columns: [["data3", 100, 100, null, 100]],
				done: function() {
					circles = chart.$.circles;
					expect(circles.size()).to.be.equal(size + 1);

					circles.each(function() {
						expect(+this.style.opacity).to.be.equal(0);
					});
					
					// when
					const x = 3;
					const cx = chart.internal.scale.x(x);

					chart.tooltip.show({x});

					circles.each(function(d) {
						expect(this.style.opacity).to.be.equal("");
						expect(d.x).to.be.equal(x);
						expect(+this.getAttribute("cx")).to.be.equal(cx);
					});
					
					done(1);
				}
			});
		}));

		it("set option: data.type=bar", () => {
			args.data.types = {
				data1: "bar"
			};
		});

		it("visibility with combination with bar type", () => new Promise(done => {
			const {circles} = chart.$;
			let x = 2;

			expect(circles.size()).to.be.equal(1);

			new Promise(resolve => {
				chart.tooltip.show({x});

				// @ts-ignore
				setTimeout(resolve, 300);
			}).then(() => {

				circles.each(function(d, i) {
						expect(d.id).to.be.equal("data2");
						expect(d.x).to.be.equal(x);
					});

				done(1);
			});
		}));

		it("set option: data.type=bubble", () => {
			args.data.type = "bubble";
		});

		it("should render bubble circles", () => new Promise(done => {
			setTimeout(() => {
				chart.$.circles.each(function() {
					expect(+this.style.opacity).to.not.be.equal(0);
					expect(+this.getAttribute("cx") > 0).to.be.true;
					expect(+this.getAttribute("cy") > 0).to.be.true;
				});

				done(1);
			}, 300);
		}));

		it("set option: data.type=scatter", () => {
			args.data.type = "scatter";
		});

		it("should render scatter circles", () => new Promise(done => {
			setTimeout(() => {
				chart.$.circles.each(function() {
					expect(+this.style.opacity).to.not.be.equal(0);
					expect(+this.getAttribute("cx") > 0).to.be.true;
					expect(+this.getAttribute("cy") > 0).to.be.true;
				});

				done(1);
			}, 300);
		}));
	});

	describe("point.opacity", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 350, 300],
						["data2", 130, 100, 140],
						["data3", 200, 150, 50]
					],
					types: {
					  data1: "bubble",
					  data2: "scatter",
					  data3: "line"
					}
				  },
				  point: {
					  opacity: null
				  }
			};
		});

		it("inline opacity css prop shouldn't be set", () => {
			chart.$.circles.each(function() {
				expect(this.style.cssText.indexOf("opacity")).to.be.equal(-1);
			});
		});

		it("set option point.opacity=0.75", () => {
			args.point.opacity = 0.75;
		});

		it("check for point opacity value", () => {
			chart.$.circles.each(function() {
				expect(+this.style.opacity).to.be.equal(args.point.opacity);
			});
		});
	});

	describe("point expand", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 230, 280, 320, 218, 250, 150]
					],
					type: "line",
					selection: {
						enabled: true,
						draggable: true
					}
				  },
				  point:{
					r: 0,
					focus: {
						expand: {
							r: 3.5
						}
					}
				}
			};
		});

		it("should point r attribute to be set to 0(zero).", () => {
			// when
			chart.tooltip.show({ x: 0 });
			chart.tooltip.show({ x: 1 });

			chart.$.circles.filter(".bb-circle-0").each(function() {
				expect(+this.getAttribute("r")).to.be.equal(0);
			});
		});
	});

	describe("point radialGradient", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 100, 250],
						["data2", 130, 100, 130, 200, 150, 50]
					],
					type: "scatter"
				},
				point: {
					r: 20,
					radialGradient: true,
					opacity: 1,
					sensitivity: "radius"
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("should defs correctly generated", () => {
			const {$: {circles}, internal: {$el}} = chart;
			const radialGradientDefs = $el.defs.selectAll("radialGradient");
			const ids = chart.data().map(v => v.id);
			const rx = /.+-(\w+\d+)$/;
			const radialGradientIds: string[] = [];

			radialGradientDefs.each(function(d, i) {
				const id = this.id.replace(rx, "$1");

				radialGradientIds.push(this.id);

				expect(id).to.be.equal(ids[i]);
				expect(this.querySelectorAll("stop").length).to.be.equal(2);				
			});

			ids.forEach((id, i) => {
				const radialId = radialGradientIds[i];

				circles.filter(d => d.id === id).each(function() {
					expect(this.style.fill.indexOf(radialId) > -1).to.be.true;					
				});
			});
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 100, 250],
						["data2", 130, 100, 130, 200, 150, 50]
					],
					type: "bubble"
				},
				point: {
					r: 10,
					radialGradient: {
						cx: 0.5,
						cy: 0.5,
						r: 0.5,
						stops: [
							[0.3, "#fff", 0.8],
							[0.6, function(id) { return id === "data1" ? this.color(id) : "green"; }, 0.35],
							[1, null, 1]
						]
					},
					opacity: 1,
					sensitivity: "radius"
				}
			};
		});

		it("should radialGradient options are correctly specified.", () => {
			const {$: {circles}, internal: {$el}} = chart;
			const radialGradientDefs = $el.defs.selectAll("radialGradient");
			const ids = chart.data().map(v => v.id);
			const rx = /.+-(\w+\d+)$/;
			const radialGradientIds: string[] = [];
			const options = args.point.radialGradient;

			radialGradientDefs.each(function(d, i) {
				const id = this.id.replace(rx, "$1");

				radialGradientIds.push(this.id);

				expect(id).to.be.equal(ids[i]);

				expect(+this.getAttribute("cx")).to.be.equal(options.cx);
				expect(+this.getAttribute("cy")).to.be.equal(options.cy);
				expect(+this.getAttribute("r")).to.be.equal(options.r);
				
				this.querySelectorAll("stop").forEach((stop, i) => {
					const [offset, color, opacity] = options.stops[i];

					expect(+stop.getAttribute("offset")).to.be.equal(offset);
					expect(stop.getAttribute("stop-color")).to.be.equal(typeof color === "function" ? color.bind(chart)(id) : color ?? chart.color(id));
					expect(+stop.getAttribute("stop-opacity")).to.be.equal(opacity);
				});
			});

			ids.forEach((id, i) => {
				const radialId = radialGradientIds[i];

				circles.filter(d => d.id === id).each(function() {
					expect(this.style.fill.indexOf(radialId) > -1).to.be.true;
				});
			});
		});
	});
});
0