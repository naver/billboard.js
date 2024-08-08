/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$ARC, $CIRCLE, $SHAPE} from "../../src/config/classes";

describe("TOOLTIP Position", function() {
	let chart;
	let args: any = {
		data: {
			x: "x",
			columns: [
				["x", 2, 4, 6, 8, 10, 12],
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 20, 10, 40, 15, 25],
				["data3", 150, 120, 110, 140, 115, 125]
			]
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("tooltip position", () => {
		describe("without left margin", () => {
		  it("should show tooltip on proper position", () => {
			util.hoverChart(chart, "mousemove", {
			  clientX: 270,
			  clientY: 100
			});
	  
			const {tooltip} = chart.$;
			const top = Math.floor(+tooltip.style("top").replace(/px/, ""));
			const left = Math.floor(+tooltip.style("left").replace(/px/, ""));
			const tooltipPos = {
			  top: 95,
			  left: 280
			};
	  
			expect(top).to.be.equal(tooltipPos.top);
			expect(left).to.be.above(tooltipPos.left);
		  });
		});
	  
		describe("with left margin", () => {
		  beforeAll(() => {
			chart.$.chart.style("marginLeft", "300px");
		  });
	  
		  afterAll(() => {
			// reset to not affect other tests
			chart.$.chart.style("marginLeft", null);
		  });
	  
		  it("should show tooltip on proper position", () => {
			util.hoverChart(chart, "mousemove", {
			  clientX: 270,
			  clientY: 100
			});
	  
			const tooltipContainer = chart.$.tooltip;
			const top = Math.floor(+tooltipContainer.style("top").replace(/px/, ""));
			const left = Math.floor(+tooltipContainer.style("left").replace(/px/, ""));
			const tooltipPos = {
			  top: 95,
			  left: 280
			};
	  
			expect(top).to.be.equal(tooltipPos.top);
			expect(left).to.be.above(tooltipPos.left);
		  });
		});
	  
		describe("do not overlap data point", () => {
		  it("should show tooltip on proper position", () => {
			const {circles, tooltip} = chart.$;
			const getCircleRectX = x => circles.filter(`.${$SHAPE.shape}-${x}`)
			  .node().getBoundingClientRect().x;
	  
			// when
			let x = 8;
			chart.tooltip.show({x});
	  
			// tooltip should locate on the right side of data point
			expect(
			  util.parseNum(tooltip.style("left")) + util.parseNum(tooltip.style("width"))
			).to.be.above(getCircleRectX(3));
	  
			// when
			x = 10;
			chart.tooltip.show({x});
	  
			// tooltip should locate on the left side of data point
			expect(
			  util.parseNum(tooltip.style("left")) + util.parseNum(tooltip.style("width"))
			).to.be.below(getCircleRectX(4));
	  
			// when
			x = 12;
			chart.tooltip.show({x});
	  
			// tooltip should locate on the left side of data point
			expect(
			  util.parseNum(tooltip.style("left")) + util.parseNum(tooltip.style("width"))
			).to.be.below(getCircleRectX(5));
		  });
	  
		  describe("do not overlap data point", () => {
			let prevArgs = args;
	  
			beforeAll(() => {
			  args = {
				data: {
				  columns: [
					["data1", 50, 50],
					["data2", 100, 100],
				  ],
				  types: {
					data1: "spline",
					data2: "bar"
				  }
				}
			  };					
			});
	  
			afterAll(() => {
			  args = prevArgs;
			});
	  
			it("check if tooltip position updates according mouse pointer moves", () => new Promise(done => {
			  const top = {
				a: 0, b: 0
			  };
	  
			  new Promise((res, rej) => {
				util.hoverChart(chart, "mousemove", {
				  clientX: 500,
				  clientY: 300
				});
	  
				setTimeout(res, 300);
			  }).then(() => {
				top.a = util.parseNum(chart.$.tooltip.style("top"));
	  
				new Promise((res, rej) => {
				  util.hoverChart(chart, "mousemove", {
					clientX: 500,
					clientY: 400
				  });
	  
				  setTimeout(res, 300);
				})
			  }).then(() => {
				top.b = util.parseNum(chart.$.tooltip.style("top"));
	  
				expect(top.b).to.be.greaterThan(top.a);
	  
				done(1);
			  });
			}));
		  });
		});
	  
		describe("flex display tooltip", () => {
		  beforeAll(() => {
			args.bindto = "#display_flex";
		  });
	  
		  afterAll(() => {
			delete args.bindto;
		  });
	  
		  it("check tooltip position", () => new Promise(done => {
			chart.resize({width:300});
	  
			setTimeout(() => {
			  chart.tooltip.show({
				index:5
			  });
	  
			  const {circles, tooltip} = chart.$;
			  const pointRect = circles.filter(".bb-circle-5").node().getBoundingClientRect();
			  const tooltipPos = parseInt(tooltip.style("left")) + parseInt(tooltip.style("width"));
	  
			  expect(pointRect.left > tooltipPos).to.be.true;
			  expect(pointRect.left).to.be.above(tooltipPos, "20");
	  
			  done(1);
			}, 300);
		  }));
		});
	  
		describe("when zoomed", () => {
		  beforeAll(() => {
			args.zoom = {enabled: true};
		  });
	  
		  it("should show tooltip on proper position", () => new Promise(done => {
			chart.zoom([4,7]);
	  
			setTimeout(() => {
			  util.hoverChart(chart, "mousemove", {
				clientX: 50,
				clientY: 100
			  });
	  
			  const tooltipContainer = chart.$.tooltip;
			  const top = Math.floor(+tooltipContainer.style("top").replace(/px/, ""));
			  const left = Math.floor(+tooltipContainer.style("left").replace(/px/, ""));
			  const tooltipPos = {
				top: 95,
				left: 110
			  };
	  
			  expect(top).to.be.equal(tooltipPos.top);
			  expect(left).to.be.equal(tooltipPos.left);
	  
			  done(1);
			}, 350);
		  }));
		});
	  
		describe("step-after tooltip position", () => {
		  const orgArgs = args;
		  const posX = [];
	  
		  beforeAll(() => {				
			args = {
			  data: {
				columns: [
				  ['data1', 30, 200, 100, 400, 150, 250],
				  ['data2', 130, 340, 200, 500, 250, 350]
				],
				type: 'step'
			  },
			  line: {
				step: {
				  type: 'step-after'
				}
			  }
			}
		  });
	  
		  const chkTooltipPosX = () => {
			// do hover
			util.hoverChart(chart, "mousemove", {clientX: 70, clientY: 311});
	  
			posX.push(
			  chart.$.tooltip.node().getBoundingClientRect().x
			);
		  }
	  
		  it("check tooltip x position: indexed type", () => {
			chkTooltipPosX();
		  });
	  
		  it("set options", () => {
			args = {
			  data: {
				x: 'x',
				columns: [
				  [
					'x',
					'2013-01-01',
					'2013-01-02',
					'2013-01-03',
					'2013-01-04',
					'2013-01-05',
					'2013-01-06'
				  ],
				  ['data1', 30, 200, 100, 400, 150, 250],
				  ['data2', 130, 340, 200, 500, 250, 350]
				],
				type: 'step'
			  },
			  line: {
			  step: {
				type: 'step-after'
			  }
			  },
			  axis: {
			  x: {
				type: 'timeseries',
				tick: {
				format: '%Y-%m-%d'
				}
			  }
			  }
			}
		  });
	  
		  it("check tooltip x position: timeseries type", () => {
			chkTooltipPosX();
		  });
	  
		  it("set options", () => {
			args = {
			  data: {
				columns: [
				  ['data1', 30, 200, 100, 400, 150, 250],
				  ['data2', 130, 340, 200, 500, 250, 350]
				],
				types: {
				  data1: 'step',
				  data2: 'step'
				}
				},
				line: {
				step: {
				  type: 'step-after'
				}
			  }
			};
		  });
	  
		  it("check tooltip x position", () => {
			// check tooltip x position: indexed type, specifying data.types
			chkTooltipPosX();
	  
			expect(posX.every((v, i, arr) => arr[0] === v)).to.be.true;
		  })
		});
	  
		describe('tooltip index with step types and tooltipMatch', function () {
		  // x axis ticks getBoundingClientRect x are at [43.4375, 336.4375, 630.4375]
		  beforeAll(() => {
			args = {
			  data: {
				columns: [
				  ['data1', 30, 40, 20],
				],
				type: 'step',
			  },
			  line: {
				step: {
				  type: 'step',
				  tooltipMatch: true,
				}
			  }
			}
		  });
	  
		  it("should have tooltip to nearest", () => {
			const {eventReceiver} = chart.internal.state;
	  
			util.hoverChart(chart, "mousemove", {clientX: 150, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(0);
	  
			util.hoverChart(chart, "mousemove", {clientX: 200, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(1);
	  
			util.hoverChart(chart, "mousemove", {clientX: 425, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(1);
	  
			util.hoverChart(chart, "mousemove", {clientX: 500, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(2);
		  })
	  
		  it("set step type to step before", () => {
			args.line.step.type = 'step-before';
		  });
	  
		  it("should have tooltip to right", () => {
			const {eventReceiver} = chart.internal.state;
	  
			util.hoverChart(chart, "mousemove", {clientX: 150, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(1);
	  
			util.hoverChart(chart, "mousemove", {clientX: 200, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(1);
	  
			util.hoverChart(chart, "mousemove", {clientX: 450, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(2);
	  
			util.hoverChart(chart, "mousemove", {clientX: 500, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(2);
		  });
	  
		  it("set step type to default", () => {
			args.line.step.type = 'step-after';
		  });
	  
		  const checkStepAfter = () => {
			const {eventReceiver} = chart.internal.state;
	  
			util.hoverChart(chart, "mousemove", {clientX: 150, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(0);
	  
			util.hoverChart(chart, "mousemove", {clientX: 200, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(0);
	  
			util.hoverChart(chart, "mousemove", {clientX: 450, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(1);
	  
			util.hoverChart(chart, "mousemove", {clientX: 500, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(1);
		  }
	  
		  it("should have tooltip to left", () => {
			checkStepAfter();
		  });
	  
		  it("set timeseries", () => {
			args.axis = {
			  x: {
				type: "timeseries",
			  }
			}
			args.data.x = "x";
			args.data.columns = args.data.columns.concat([
			  ["x", "2021-01-01", "2021-01-02", "2021-01-03"],
			]);
		  });
	  
		  it("should work with timeseries", () => {
			checkStepAfter();
		  });
	  
		  it("should change when enter from right", () => {
			const {eventReceiver} = chart.internal.state;
	  
			util.hoverChart(chart, "mousemove", {clientX: 350, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(1);
	  
			util.hoverChart(chart, "mousemove", {clientX: 250, clientY: 300});
			expect(eventReceiver.currentIdx).to.be.equal(0);
		  });
	  
		});
	  
		describe("with padding", () => {
		  beforeAll(() => {
			args = {
			  data: {
				columns: [
				  ["data1", 30, 200, 100, 400, 150, 250],
				  ["data2", 130, 340, 200, 500, 250, 350]
				],
				type: "line"
			  },
			  padding: {
				left: 400
			  },
			  axis: {
				rotated: false,
				y: {
				  label: "y axis label"
				}
			  }
			}
		  });
	  
		  it("should displayed in correct position with padding.left", () => {
			const x = 4;
	  
			// when
			chart.tooltip.show({x});
	  
			const tooltip = chart.$.tooltip.node().getBoundingClientRect();
			const pointLeft = chart.$.circles.filter(`.${$CIRCLE.circle}-${x}`).node().getBoundingClientRect().left;
	  
			expect(tooltip.left + tooltip.width).to.be.below(pointLeft);
			expect(tooltip.left + tooltip.width).to.be.closeTo(pointLeft, 15);
		  });
	  
		  it("set options: axis.y.label", () => {
			args.axis.y.label = {
			  text: "y axis label"
			};
		  });
	  
		  it("should displayed in correct position with padding.left", () => {
			const x = 4;
	  
			// when
			chart.tooltip.show({x});
	  
			const tooltip = chart.$.tooltip.node().getBoundingClientRect();
			const pointLeft = chart.$.circles.filter(`.${$CIRCLE.circle}-${x}`).node().getBoundingClientRect().left;
	  
			expect(tooltip.left + tooltip.width).to.be.below(pointLeft);
			expect(tooltip.left + tooltip.width).to.be.closeTo(pointLeft, 15);
		  });
	  
		  it("set options: axis.y.label", () => {
			args.axis.y.label = {
			  text: "y axis label",
			  position: "inner-middle"
			};
		  });
	  
		  it("should displayed in correct position with padding.left", () => {
			const x = 4;
	  
			// when
			chart.tooltip.show({x});
	  
			const tooltip = chart.$.tooltip.node().getBoundingClientRect();
			const pointLeft = chart.$.circles.filter(`.${$CIRCLE.circle}-${x}`).node().getBoundingClientRect().left;
	  
			expect(tooltip.left + tooltip.width).to.be.below(pointLeft);
			expect(tooltip.left + tooltip.width).to.be.closeTo(pointLeft, 15);
		  });
	  
		  it("set options: axis.rotated=true", () => {
			args.axis.rotated = true;
		  });
	  
		  it("should displayed in correct position with padding.left on rotated axis", () => {
			const x = 2;
	  
			// when
			util.hoverChart(chart, "mousemove", {clientX: 0, clientY: 200});
	  
			const tooltip = chart.$.tooltip.node().getBoundingClientRect();
			const pointLeft = chart.$.circles.filter(`.${$CIRCLE.circle}-${x}`).node().getBoundingClientRect().left;
	  
			expect(pointLeft).to.be.below(tooltip.left + tooltip.width);
			expect(tooltip.left).to.be.closeTo(pointLeft, 30);
		  });
	  
		  it("set options: axis.rotated=true", () => {
			args.axis.rotated = false;
			args.padding = {
			  top: 100
			};
		  });
	  
		  it("should displayed in correct position with padding.top", () => {
			const x = 3;
	  
			// when
			chart.tooltip.show({x});
	  
			const tooltip = chart.$.tooltip.node().getBoundingClientRect();
			const pointTop = chart.$.circles.filter(`.${$CIRCLE.circle}-${x}`).node().getBoundingClientRect().top;
	  
			expect(tooltip.top).to.be.below(pointTop);
			expect(tooltip.top + tooltip.height).to.be.closeTo(pointTop, 30);
		  });
	  
		  it("set options: axis.rotated=true", () => {
			args.axis.rotated = true;
		  });
	  
		  it("should displayed in correct position with padding.top on rotated axis", () => {
			const x = 2;
	  
			// when
			util.hoverChart(chart, "mousemove", {clientX: 0, clientY: 250});
	  
			const tooltip = chart.$.tooltip.node().getBoundingClientRect();
			const pointTop = chart.$.circles.filter(`.${$CIRCLE.circle}-${x}`).node().getBoundingClientRect().top;
	  
			expect(pointTop).to.be.below(tooltip.top + tooltip.height);
			expect(tooltip.top).to.be.closeTo(pointTop, 30);
		  });
		});
	  
		describe("when document or container element is scrolled", () => {
		  beforeAll(() => {
			args = {
			  size: {
				width: 640,
				height: 480
			  },
			  data: {
				columns: [
				  ["data1", 30, 200, 100, 400, 150, 250],
				  ["data2", 10, 190, 95, 40, 15, 25]
				]
			  },
			  axis: {
				rotated: false
			  }
			};
		  });
	  
		  it("tooltip correctly showed?", () => new Promise(function(done) {
			chart.$.chart.attr("style", "position: relative; top: 0px; left: 0px; width:300px;height:400px;overflow:scroll;");
	  
			const top = chart.$.chart.node().getBoundingClientRect().top;
			const {tooltip} = chart.$;
			const index = [];
	  
			new Promise(resolve => {
			  util.hoverChart(chart, "mousemove", {
				clientX: 50,
				clientY: top + 50
			  });
	  
			  index.push(+tooltip.select("th").text());
	  
			  setTimeout(() => {
				chart.$.chart.node().scrollTo(500, 0);
				resolve();
			  }, 300);
			}).then(() => {
			  new Promise(resolve => {
				util.hoverChart(chart, "mousemove", {
				  clientX: 200,
				  clientY: top + 50
				});
	  
				setTimeout(resolve, 300);
			  });
			}).then(() => {
			  index.push(+tooltip.select("th").text());
	  
			  expect(index).to.be.deep.equal([0, 5]);
	  
			  chart.$.chart.node().scrollTo(0, 0);
			  done(1);
			});
		  }));
	  
		  it("set option: axis.rotated=true", () => {
			args.size = {
			  width: 480,
			  height: 640
			};
	  
			args.axis.rotated = true;
		  });
	  
		  it("tooltip correctly showed on rotated axis?", () => new Promise(function(done) {
			chart.$.chart.attr("style", "position: relative; top: 0px; left: 0px; width:480px;height:640px;overflow:scroll;");
			const {tooltip} = chart.$;
			const index = [];
	  
			new Promise(resolve => {
			  util.hoverChart(chart, "mousemove", {
				clientX: 100,
				clientY: 50
			  });
	  
			  index.push(+tooltip.select("th").text());
	  
			  setTimeout(() => {
				chart.$.chart.node().scrollTo(0, 500);
				resolve();
			  }, 300);
			}).then(() => {
			  new Promise(resolve => {
				util.hoverChart(chart, "mousemove", {
				  clientX: 100,
				  clientY: 550
				});
	  
				setTimeout(resolve, 300);
			  });
			}).then(() => {
			  index.push(+tooltip.select("th").text());
	  
			  expect(index).to.be.deep.equal([0, 5]);
	  
			  chart.$.chart.attr("style", "position: relative; top: 0px; left: 0px; width:640px;height:480px;");
	  
			  done(1);
			});
		  }));
		});
	  
		describe("check interference", () => {
		  beforeAll(() => {
			args = {
			  data: {
				x: "x",
				columns: [
				  ["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
				  ["data1", 330, 350, 200, 380, 150],
				  ["data2", 130, 100, 30, 200, 80],
				  ["data3", 230, 153, 85, 300, 250]
				],
				type: "radar"
			  },
			  radar: {
				direction: {
				  clockwise: true
				}
			  }
			};
		  });
	  
		  const checkPos = (tooltip, expected) => {
			const left = util.parseNum(tooltip.style("left"));
			const top = util.parseNum(tooltip.style("top"));
	  
			[top, left].forEach((v, i) => {
			  expect(v).to.be.closeTo(expected[i], 2);
			});
		  };
	  
		  it("check radar's tooltip position.", () => {
			const {$: {tooltip}} = chart;
	  
			// when
			chart.tooltip.show({x:0});
			checkPos(tooltip, [24, 335]);
	  
			// when
			chart.tooltip.show({x:1});
			checkPos(tooltip, [175, 469]);
	  
			// when
			chart.tooltip.show({x:2});
			checkPos(tooltip, [300, 481]);
	  
			// when
			chart.tooltip.show({x:3});
			checkPos(tooltip, [300, 68]);
	  
			// when
			chart.tooltip.show({x:4});
			checkPos(tooltip, [175, 0]);
		  });
	  
		  it("set options: data.type='pie'", () => {
			args = {
			  data: {
				columns: [
				  ["data1", 30],
				  ["data2", 120]
				],
				type: "pie",
			  },
			  legend: {
				show: false
			  },
			  transition: {
				duration: 0
			  }
			};
		  });
	  
		  it("check pie's tooltip position.", () => new Promise(done => {
			const {$: {arc, tooltip}} = chart;
			const path = arc.select(".bb-shapes-data2 path").node();
			
			setTimeout(() => {
			  util.hoverChart(chart, "mousemove", {clientX: 250, clientY: 170}, path);
			  checkPos(tooltip, [198.5, 249.5]);
	  
			  util.hoverChart(chart, "mousemove", {clientX: 630, clientY: 470}, path);
			  checkPos(tooltip, [445.5, 524.5]);
	  
			  done(1);
			}, 300)
		  }));
	  
		  it("set options: data.type='treemap'", () => {
			args = {
			  data: {
				columns: [
				  ["data1", 1300],
				  ["data2", 200],
				  ["data3", 500],
				  ["data4", 50],
				  ["data5", 100],
				  ["data6", 70],
				  ["data7", 200],
				  ["data8", 133],
				  ["data9", 220],
				  ["data10", 15]
				],
				type: "treemap",
				labels: {
				  colors: "#fff"
				}
			  },
			  treemap: {
				label: {
				  threshold: 0.03
				}
			  }
			};
		  });
	  
		  it("check treemap's tooltip position.", () => {
			const {$: {tooltip}, internal: {$el: {treemap}}} = chart;
	  
			chart.tooltip.show({
			  data: {
				id: "data1"
			  }
			  });
	  
			util.hoverChart(chart, "mousemove", {clientX: 100, clientY: 170}, treemap.node());
			checkPos(tooltip, [198, 100]);
	  
			util.hoverChart(chart, "mousemove", {clientX: 100, clientY: 470}, treemap.node());
			checkPos(tooltip, [442, 100]);
		  });
		});
	  
		describe("on rotated axis", () => {
		  beforeAll(() => {
			args = {
			  data: {
				columns: [
				["Male", -83, -143, -100, -120, -150, -85],
				["Female", 130, 100, 140, 175, 150, 50]
				],
				type: "bar",
				groups: [
				["Male", "Female"]
				],
			  },
			  axis: {
				rotated: true,
				x: {
				  show: false
				}
			  },
			  grid: {
				y: {
				  show: true,
				  lines: [
				  {
					value: 0,
					class: "base-line"
				  }
				  ]
				}
			  }
			};
		  });
	  
		  it("tooltip shoudn't overflow the chart", () => {
			const {state} = chart.internal;
			
			util.hoverChart(chart, "mousemove", {
			  clientX: 628,
			  clientY: 317
			});
	  
			const tooltip = chart.$.tooltip;
			const {offsetWidth, offsetHeight} = tooltip.node();
			const tooltipLeft = util.parseNum(tooltip.style("left")) + offsetWidth;
	  
			// check for tooltip text line break
			expect(offsetHeight).to.be.lessThan(70);
	  
			// check for tooltip position to not overflow the chart
			expect(tooltipLeft).to.be.lessThanOrEqual(state.width);				
		  });			
		});
	  
		describe("Narrow width container's tooltip position", () => {
		  const orgArgs = args;
	  
		  beforeAll(() => {
			args = {
			  "transition":{
				"duration": 0
				},
				"axis":{
				"x":{
				  "type":"category"
				},
				"rotated":true
				},
				"data":{
				"json":[
				  {
				  "region":"South and Central America",
				  "A":10.34,
				  "B":22.62,
				  "Total":32.96
				  },
				  {
				  "region":"North America",
				  "A":7.73,
				  "B":22.64,
				  "Total":30.37
				  },
				  {
				  "region":"East and South East Asia",
				  "A":12.28,
				  "B":15.02,
				  "Total":27.299999999999997
				  },
				  {
				  "region":"Europe",
				  "A":9.72,
				  "B":14.42,
				  "Total":24.14
				  }
				],
				"type":"bar",
				"keys":{
				  "x":"region",
				  "value":["region", "A"]
				}
			  }
			};
	  
			chart.$.chart.style("width", "200px");
		  });
	  
		  afterAll(() => {
			// revert
			chart.$.chart.style("width", "640px");
			args = orgArgs;
		  });
	  
		  it("tooltip shoundn't be positioned out of viewport", () => {
			// when
			chart.tooltip.show({x: 2});
	  
			expect(chart.$.tooltip.style("left")).to.equal("0px");
		  });
		});
	});

	describe("Gauge with arc.rangeText with title option", () => {
		beforeAll(() => {
			args = {
				title: {
					text: "Range text in 'absolute' value"
				},
				size: {
					height: 220
				},
				data: {
					columns: [
						["data1", 30],
						["data2", 120],
						["data3", 50]
					],
					type: "gauge",
				},
				arc: {
					rangeText: {
						values: [
							15,
							50,
							70,
							110,
							160,
							195
						],
						unit: "absolute"
					}
				},
				gauge: {
					label: {
						format: function(value, ratio) { return value; },
						extents: function() { return ""; }
					}
				}
			}
		});
		
		it("check tooltip y coordinate", () => {
			const target = chart.$.arc.select(`.${$ARC.arc}-data2`).node();

			// when
			util.hoverChart(chart, "mousemove", {
				clientX: 318,
				clientY: 186
			}, target);

			const {y} = chart.$.tooltip.node().getBoundingClientRect();

			expect(y >= 175).to.be.true;
		});
	});
});
