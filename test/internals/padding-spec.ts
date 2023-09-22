/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import sinon from "sinon";
import util from "../assets/util";
import {$AXIS} from "../../src/config/classes";

describe("PADDING", () => {
	let chart;
	let args: any = {
		svg: {
			classname: "customclass"
		},
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 20, 10, 40, 15, 25],
				["data3", 150, 120, 110, 140, 115, 125]
			]
		}
	};

	const deepEqual = (val, print=false) => {
		const {margin} = chart.internal.state;
		
		print && console.log(`val: ${JSON.stringify(val)}`, `margin: ${JSON.stringify(margin)}`);
		expect(margin).to.deep.equal(val);
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("basic", () => {
		let margin;

		before(() => {
			args = {
				data: {
					columns: [["data", 130, 100, 140, 35, 110, 50]],
					type: "area"
				},
				axis: {},
				legend: {
					show: false
				},
				size: {
					width: 300,
					height: 150
				},
				padding: false
			};
		});

		it("Area shape should have same size as the container's size.", () => {
			const {width, height} = chart.$.line.areas.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.equal(args.size.height);
		});

		it("Event <rect> element should have same size as the container's size.", () => {
			const {width, height} = chart.internal.$el.eventRect.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.equal(args.size.height);
		});

		it("Axes and subchart options should be disabled.", () => {
			expect(chart.config("axis.x.show")).to.be.false;
			expect(chart.config("axis.y.show")).to.be.false;
			expect(chart.config("axis.y2.show")).to.be.false;
			expect(chart.config("subchart.show")).to.be.false;
		});

		it("set option: axis.rotated = true", () => {
			args.axis.rotated = true;
		});

		it("Area shape should have same size as the container's size for rotated axis.", () => {
			const {width, height} = chart.$.line.areas.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.equal(args.size.height);
		});

		it("set option: data.labels = true", () => {
			delete args.axis.rotated;
			args.data.labels = true;
		});

		it("Area shape's height should be smaller as data label text shows.", () => {
			const {width, height} = chart.$.line.areas.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.below(args.size.height);
		});

		it("set option: data.type='bar'", () => {
			delete args.data.labels;
			args.data.type = "bar";
		});

		it("Event <rect> element should have same size as the container's size for 'bar' type.", () => {
			const {width, height} = chart.internal.$el.eventRect.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.equal(args.size.height);
		});

		it("set options: padding = true", () => {
			args.padding = true;
			args.legend.show = true;
			args.axis.y2 = {show: true};
		});

		it("set options: padding = 'fit'", () => {
			// remember the margin when "padding=true"
			margin = chart.internal.state.margin;

			args.padding = {
				mode: "fit"
			};
		});

		it("when padding set to 'fit', margin values should be below than normal.", () => {
			const currMargin = chart.internal.state.margin;

			Object.keys(margin).forEach(v => {
				expect(currMargin[v]).to.be.below(margin[v]);
			});
		});

		it("set options: legend.show=false", () => {
			margin = chart.internal.state.margin;

			args.legend.show = false;
		});

		it("check when legend is hidden.", () => {
			expect(chart.internal.state.margin.bottom).to.be.below(margin.bottom);

			margin = chart.internal.state.margin;
		});

		it("set options: legend.show=false", () => {
			args.axis.y = { 
				show: true,
				inner: true
			};

			args.axis.y2 = { 
				show: true,
				inner: true
			};
		});

		it("check when axes with inner option.", () => {
			const currMargin = chart.internal.state.margin;

			["left", "right"].forEach(v => {
				expect(margin[v] - currMargin[v] > 20).to.be.true;
			});
		});

		it("check element's position by its coordination.", () => {
			const {svg, main} = chart.$;
			const svgRect = svg.node().getBoundingClientRect();
			let rect = main.select(`.${$AXIS.axisX}`).node().getBoundingClientRect();

			expect(rect.x).to.closeTo(1, 1);

			// y axis
			rect = main.select(`.${$AXIS.axisY}`).node().getBoundingClientRect();			
			expect(rect.y).to.closeTo(svgRect.y, 2);

			// y2 axis
			rect = main.select(`.${$AXIS.axisY2}`).node().getBoundingClientRect();			
			expect(rect.x + rect.width).to.be.closeTo(svgRect.width, 2);
		});		

		it("set options: axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("check element's position by its coordination for rotated axis.", () => {
			const {svg, main} = chart.$;
			const svgRect = svg.node().getBoundingClientRect();

			// x axis
			let rect = main.select(`.${$AXIS.axisX}`).node().getBoundingClientRect();

			expect(rect.x).to.closeTo(2, 1);

			// y axis
			rect = main.select(`.${$AXIS.axisY}`).node().getBoundingClientRect();			
			expect(rect.y + rect.height).to.closeTo(svgRect.y + svgRect.height, 1);

			// y2 axis
			rect = main.select(`.${$AXIS.axisY2}`).node().getBoundingClientRect();			
			expect(rect.y).to.be.closeTo(svgRect.y, 2);			
		});

	});

	describe("margin: normal mode", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 51130, 12300, 23140, 23300, 21050, 4550]
					],
					type: "bar"
				},
				padding: {},
				legend: {
					show: true
				},
				axis: {
					rotated: false,
					x: {},
					y: {
						inner: false,
						show: true
					},
					y2: {
						inner: false,
						show: false
					}
				}
			};
		});

		describe("non-rotated axis", () => {
			it("y Axis with legend", () => {
				deepEqual({top: 4, right: 1, bottom: 50, left: 60});
			});

			it("set options: axis.y2.show=true", () => {
				args.axis.y2.show = true;
			});

			it("y/y2 axes with legend", () => {
				deepEqual({top: 4, right: 60, bottom: 50, left: 60});
			});

			it("set options: axis.y.inner=true", () => {
				args.axis.y.inner = true;
			});

			it("y axis with inner option", () => {
				deepEqual({top: 4, right: 60, bottom: 50, left: 0});
			});

			it("set options: axis.y.inner=false, axis.y2.inner=true", () => {
				args.axis.y.inner = false;
				args.axis.y2.inner = true;
			});

			it("y axis with inner option", () => {
				deepEqual({top: 4, right: 1, bottom: 50, left: 60});
			});

			it("set options: y axis inner=true", () => {
				args.axis.y.inner = true;
			});

			it("y/y2 axes with inner option", () => {
				deepEqual({top: 4, right: 1, bottom: 50, left: 0});
			});

			it("set options: axis.y.label", () => {
				args.axis.y.inner = false;
				args.axis.y2.inner = false;

				args.axis.y.label = {
					text: "Axis Label Text",
					position: "outer-middle"
				};
			});

			it("y axis with outer label text", () => {
				deepEqual({top: 4, right: 60, bottom: 50, left: 80});
			});

			it("set options: axis.y2.label", () => {
				args.axis.y2.label = {
					text: "Axis Label Text",
					position: "outer-middle"
				};
			});

			it("y axis with outer label text", () => {
				deepEqual({top: 4, right: 80, bottom: 50, left: 80});
			});

			it("set options: y axis inner=true", () => {
				args.axis.y.inner = true;
			});

			it("inner y axis with outer label text", () => {
				deepEqual({top: 4, right: 80, bottom: 50, left: 20});
			});

			it("set options: y2 axis inner=true", () => {
				args.axis.y2.inner = true;
			});

			it("inner y/y2 axes with outer label text", () => {
				deepEqual({top: 4, right: 21, bottom: 50, left: 20});
			});

			it("set options: legend.show=false", () => {
				args.legend.show = false;
			});

			it("when legend is hidden", () => {
				deepEqual({top: 4, right: 21, bottom: 30, left: 20});
			});

			it("set options: padding.bottom=0", () => {
				args.padding = {
					bottom: 0
				};
			});

			it("bottom x axis won't be shown", () => {
				deepEqual({top: 4, right: 21, bottom: 0, left: 20});	
				
				args.padding = {};
			});
		});

		//----- rotated axis
		describe("rotated axis", () => {
			it("set options: axis.rotated=true", () => {
				args.axis.rotated = true;
			});

			it("rotated axis: inner y/y2 with outer axis label text", () => {
				deepEqual({top: 40, right: 10, bottom: 40, left: 40});
			});

			it("set options: y/y2.inner=false", () => {
				args.axis.y.inner = false;
				args.axis.y2.inner = false;
			});

			it("rotated axis: outer y/y2 with outer axis label text", () => {
				deepEqual({top: 40, right: 10, bottom: 40, left: 40});
			});

			it("set options: y/y2.inner=false", () => {
				args.axis.y.label = {};
				args.axis.y2.label = {};
			});

			it("rotated axis: outer y/y2 without axis label text", () => {
				deepEqual({top: 30, right: 10, bottom: 30, left: 40});
			});

			it("set options: y2.show=false", () => {
				args.axis.y2.show = false;
			});

			it("rotated axis: outer y axis only without axis label text", () => {
				deepEqual({top: 5, right: 10, bottom: 30, left: 40});
			});
		});
	});

	describe("margin: 'fit' mode", () => {
		let temp;

		before(() => {
			args = {
				data: {
					columns: [
						["data1", 51130, 12300, 23140, 23300, 21050, 4550]
					],
					type: "bar"
				},
				padding: {
					mode: "fit"
				},
				legend: {
					show: true
				},
				axis: {
					rotated: false,
					x: {},
					y: {
						inner: false,
						show: true
					},
					y2: {
						inner: false,
						show: false
					}
				}
			};
		});

		describe("non-rotated axis", () => {
			it("outer y axis with legend", () => {
				deepEqual({top: 0, right: 2, bottom: 30, left: 40.59375});
			});

			it("set options: y2.show=true", () => {
				args.axis.y2.show = true;
			});

			it("when y/y2 axes are displyed", () => {
				deepEqual({top: 0, right: 40.59375, bottom: 30, left: 40.59375});
			});

			it("set options: axis.y.label", () => {
				args.axis.y.label = {
					text: "Your Axis",
					position: "outer-center"
				};
			});

			it("y axis with outer label text", () => {
				deepEqual({top: 0, right: 40.59375, bottom: 30, left: 60.59375});
			});

			it("set options: axis.y2.label", () => {
				args.axis.y2.label = {
					text: "Your Axis",
					position: "outer-center"
				};
			});

			it("y/y2 axes with outer label text", () => {
				deepEqual({top: 0, right: 60.59375, bottom: 30, left: 60.59375});
			});

			it("set options: axis.y.inner=true", () => {
				args.axis.y.inner = true;
			});

			it("inner y axis with outer label text", () => {
				deepEqual({top: 0, right: 60.59375, bottom: 30, left: 20});
			});

			it("set options: axis.y2.inner=true", () => {
				args.axis.y2.inner = true;
			});

			it("inner y2 axis with outer label text", () => {
				deepEqual({top: 0, right: 22, bottom: 30, left: 20});
			});

			it("set options: axis.y.label = {}", () => {
				args.axis.y.label = {};
			});

			it("inner y axis without outer label text", () => {
				deepEqual({top: 0, right: 22, bottom: 30, left: 0});
			});

			it("set options: axis.y2.label = {}", () => {
				args.axis.y2.label = {};
			});

			it("inner y/y2 axes without outer label text", () => {
				deepEqual({top: 0, right: 2, bottom: 30, left: 0});
			});

			it("set options: legend.show=false", () => {
				args.legend.show = false;
			});

			it("inner y/y2 axes without outer label text and without legend", () => {
				deepEqual({top: 0, right: 2, bottom: 20, left: 0});
			});

			it("set options: padding", () => {
				temp = chart.internal.state.margin;
				
				args.padding = {
					mode: "fit",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0
				};
			});
			
			it("specifying padding should be relative.", () => {
				const {state: {margin}} = chart.internal;

				expect(margin).to.deep.equal(temp);
			});

			it("set options", () => {
				temp = args;

				args = {
					data: {
						columns: [
							["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
						],
						type: "line"
					},
					padding: {
						mode: "fit",
						right: 0
					}
				};			
			});

			it("when y is shown, y2 hidden and padding.right=0", () => {
				deepEqual({top: 0, right: 2, bottom: 30, left: 28.359375});

				// restore args
				args = temp;
			});
		});

		describe("rotated axis", () => {
			it("set options: axis.rotated=true", () => {
				args.axis.rotated = true;
			});

			it("inner y/y2 axes without outer label text and without legend", () => {
				deepEqual({top: 0, right: 2, bottom: 1, left: 16.125});
			});

			it("set options: axis.y.label", () => {
				args.axis.y.label = {
					text: "Your Axis",
					position: "outer-center"
				};
			});

			it("y axis with outer label text", () => {
				deepEqual({top: 0, right: 2, bottom: 30, left: 16.125});
			});

			it("set options: axis.y2.label", () => {
				args.axis.y2.label = {
					text: "Your Axis",
					position: "outer-center"
				};
			});

			it("y axis with outer label text", () => {
				deepEqual({top: 30, right: 2, bottom: 30, left: 16.125});
			});

			it("set options: axis.y.inner=false", () => {
				args.axis.y.inner = false;
			});

			it("outer y axis with outer label text", () => {
				deepEqual({top: 30, right: 2, bottom: 30, left: 16.125});
			});

			it("set options: axis.y2.inner=false", () => {
				args.axis.y2.inner = false;
			});

			it("outer y/y2 axes with outer label text", () => {
				deepEqual({top: 30, right: 2, bottom: 30, left: 16.125});
			});

			it("set options: axis.y.label={}", () => {
				args.axis.y.label = {};
			});

			it("outer y axis without outer label text", () => {
				deepEqual({top: 30, right: 2, bottom: 20, left: 16.125});
			});

			it("set options: axis.y2.label={}", () => {
				args.axis.y2.label = {};
			});

			it("outer y/y2 axes without outer label text", () => {
				deepEqual({top: 20, right: 2, bottom: 20, left: 16.125});
			});

			it("set options: axis.y2.show=false", () => {
				args.axis.y2.show=false;
			});

			it("y axis show and hidden y2 axis", () => {
				deepEqual({top: 0, right: 2, bottom: 20, left: 16.125});
			});

			it("set options: axis.y.show=false", () => {
				args.axis.y.show=false;
			});

			it("y axis show and hidden y2 axis", () => {
				deepEqual({top: 0, right: 2, bottom: 1, left: 16.125});
			});
		});
	});
});
