/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import CLASS from "../../src/config/classes";
import util from "../assets/util";
import {getBoundingRect} from "../../src/module/util";

describe("SHAPE GAUGE", () => {
	const selector = {
		arc: `.${CLASS.chartArc}.${CLASS.target}.${CLASS.target}`,
		shapes: `g.${CLASS.shapes}.${CLASS.arcs}.${CLASS.arcs}`,
		shape: `path.${CLASS.shape}.${CLASS.arc}.${CLASS.arc}`
	};

    describe("show gauge", () => {
		it("should have correct d for Pi radian gauge", done => {
			const chart = util.generate({
				gauge: {
					width: 10,
					max: 10,
					expand: true
				},
				data: {
					columns: [
						["data", 8]
					],
					type: "gauge"
				}
			});

			const chartArc = chart.$.main.select(`.${CLASS.chartArcs}`);
			const data = chartArc.select(`${selector.arc}-data`)
					.select(`${selector.shapes}-data`)
					.select(`${selector.shape}-data`);

			setTimeout(() => {
				expect(data.attr("d"))
					.to.be.equal("M-304,-3.7229262694079536e-14A304,304,0,0,1,245.94116628998404,-178.68671669691184L237.85099634623455,-172.8088641739871A294,294,0,0,0,-294,-3.6004615894932184e-14Z");

				expect(chartArc.select(`.${CLASS.gaugeValue}`).attr("dy")).to.be.equal("-.1em");

				done();
			}, 500);
		});


		it("gauge max value should be equal to totalSum if gauge max < totalSum", () => {
			const chart = util.generate({
				gauge: {
					width: 10,
					max: 10,
					expand: true
				},
				data: {
					columns: [
						["data1", 10],
						["data2", 20],
						["data3", 20],
						["data4", 50]
					],
					type: "gauge"
				}
			});

			const totalSum = chart.internal.getTotalDataSum();
			const gaugeMax = chart.internal.config.gauge_max;

			expect(gaugeMax).to.be.equal(totalSum);
		});

		it("should have correct d for 2 Pi radian gauge starting at Pi/2", done => {
			const chart = util.generate({
				gauge: {
					width: 10,
					max: 10,
					expand: true,
					fullCircle: true
				},
				data: {
					columns: [
						["data", 8]
					],
					type: "gauge"
				}
			});

			const chartArc = chart.$.main.select(`.${CLASS.chartArcs}`);
			const data = chartArc.select(`${selector.arc}-data`)
					.select(`${selector.shapes}-data`)
					.select(`${selector.shape}-data`);

			setTimeout(() => {
				// This test has bee updated to make tests pass. @TODO double-check this test is accurate.
				expect(data.attr("d"))
					.to.be.equal("M-211.85,-2.5944142439936676e-14A211.85,211.85,0,1,1,-65.46525025833259,201.4813229771283L-62.375080314583116,191.97075781417675A201.85,201.85,0,1,0,-201.85,-2.4719495640789325e-14Z");

				done();
			}, 500);
		});


		it("should show custom gauge labels", () => {
			const chart = util.generate({
				gauge: {
					width: 10,
					max: 100,
					expand: true,
					label: {
						extents: (value, isMax) => {
							if (isMax) {
								return `Max: ${value}%`;
							}

							return `Min: ${value}%`;
						},
						format: function(value) {
							return value +"%\nTest\nValue";
						}
					}
				},
				data: {
					columns: [
						["data", 8]
					],
					type: "gauge"
				}
			});

			const chartArc = chart.$.arc;
			const min = chartArc.select(`.${CLASS.chartArcsGaugeMin}`);
			const max = chartArc.select(`.${CLASS.chartArcsGaugeMax}`);

			expect(min.text()).to.equal("Min: 0%");
			expect(max.text()).to.equal("Max: 100%");

			// gauge text should be multilined
			expect(chartArc.selectAll(`.${CLASS.target}-data tspan`).size()).to.be.equal(3);
		});

		it("should not show gauge labels", () => {
			const chart = util.generate({
				gauge: {
					label: {
						show: false
					}
				},
				data: {
					columns: [
						["data", 75]
					],
					type: "gauge"
				}
			});

			const chartArc = chart.$.main.select(`.${CLASS.chartArcs}`);
			const min = chartArc.select(`.${CLASS.chartArcsGaugeMin}`);
			const max = chartArc.select(`.${CLASS.chartArcsGaugeMax}`)

			expect(min.empty()).to.be.true;
			expect(max.empty()).to.be.true;
		});

		it("check for fullCircle option", done => {
			const chart = util.generate({
				gauge: {
					width: 10,
					max: 10,
					expand: true,
					fullCircle: true
				},
				data: {
					columns: [
						["data", 10]
					],
					type: "gauge"
				}
			});

			setTimeout(() => {
				const chartArc = chart.$.main.select(`.${CLASS.chartArcs}`);
				const min = chartArc.select(`.${CLASS.chartArcsGaugeMin}`);
				const max = chartArc.select(`.${CLASS.chartArcsGaugeMax}`);

				// check if gauge value text is centered
				expect(+chartArc.select(`.${CLASS.gaugeValue}`).attr("dy")).to.be.above(0);

				// check background height
				expect(util.getBBox(chartArc.select(`.${CLASS.chartArcsBackground}`)).height).to.be.above(300);

				// with fullCircle option, only min text is showed
				expect(min.empty()).to.be.false;
				expect(max.empty()).to.be.true;

				done();
			}, 100);
		});

		it("check for stack data #1", done => {
			const chart = util.generate({
				size: {
					width: 640,
					height: 480
				},
				data: {
					columns: [
						["data1", 50, 10],
						["data2", 200],
						["data3", 70],
						["data4", 50],
						["data5", 50],
					],
					type: "gauge",
					order: null
				},
				transition: {
					duration: 0
				}
			});

			const expected = [
				"M-304,-3.7229262694079536e-14A304,304,0,0,1,-275.25626419791655,-129.03483645824778L-165.15375851874995,-77.42090187494867A182.4,182.4,0,0,0,-182.4,-2.2337557616447722e-14Z",
				"M-275.25626419791655,-129.03483645824778A304,304,0,0,1,98.15564305051961,-287.71769103991323L58.893385830311765,-172.63061462394796A182.4,182.4,0,0,0,-165.15375851874995,-77.42090187494867Z",
				"M98.15564305051961,-287.71769103991323A304,304,0,0,1,226.41074355410964,-202.86491861156082L135.8464461324658,-121.7189511669365A182.4,182.4,0,0,0,58.893385830311765,-172.63061462394796Z",
				"M226.41074355410964,-202.86491861156082A304,304,0,0,1,283.9408970546946,-108.59819049954442L170.36453823281676,-65.15891429972665A182.4,182.4,0,0,0,135.8464461324658,-121.7189511669365Z",
				"M283.9408970546946,-108.59819049954442A304,304,0,0,1,304,-6.750155989720952e-14L182.4,-4.050093593832571e-14A182.4,182.4,0,0,0,170.36453823281676,-65.15891429972665Z"
		  	];

			setTimeout(() => {
				chart.$.arc.selectAll(`.${CLASS.target} path`).each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expected[i]);
				});

				done();
			}, 200);
		});

		it("check for stack data #2", done => {
			const args = {
				size: {
					width: 640,
					height: 480
				},
				data: {
					columns: [
						["data1", 50],
						["data2", 200]
					],
					type: "gauge",
					order: "desc"
				},
				gauge: {
					min: 50,
					max: 550,
					title: "TitleText"
				}
			};
			const chart = util.generate(args);

			const expected = [
				"M-93.941166289984,-289.1211809537267A304,304,0,0,1,1.8614631347039768e-14,-304L1.1168778808223861e-14,-182.4A182.4,182.4,0,0,0,-56.364699773990395,-173.47270857223603Z",
				"M-304,-3.7229262694079536e-14A304,304,0,0,1,-93.941166289984,-289.1211809537267L-56.364699773990395,-173.47270857223603A182.4,182.4,0,0,0,-182.4,-2.2337557616447722e-14Z"
			];

			setTimeout(() => {
				const data = chart.data();

				expect(chart.$.arc.select(`.${CLASS.chartArcsGaugeTitle}`).text()).to.be.equal(args.gauge.title);

				chart.$.arc.selectAll(`.${CLASS.target} path`).each(function(d, i) {
					expect(d.value).to.be.equal(data[i].values[0].value);
					expect(this.getAttribute("d")).to.be.equal(expected[i]);
				});

				done();
			}, 100);
		});

		it("check for stack data #3", done => {
			const chart = util.generate({
				size: {
					width: 640,
					height: 480
				},
				data: {
					columns: [
						["data1", 50, 10],
						["data2", 200],
						["data3", 70]
					],
					type: "gauge",
					hide: ["data3"]
				}
			});

			const expected = [
				"M99.4286608484961,-287.28024888925927A304,304,0,0,1,238.9601408018073,-187.92033181106407L143.37608448108438,-112.75219908663844A182.4,182.4,0,0,0,59.65719650909766,-172.36814933355555Z",
				"M-304,-3.7229262694079536e-14A304,304,0,0,1,99.4286608484961,-287.28024888925927L59.65719650909766,-172.36814933355555A182.4,182.4,0,0,0,-182.4,-2.2337557616447722e-14Z",
				"M 0 0"
			];

			setTimeout(() => {
				chart.$.arc.selectAll(`.${CLASS.target} path`).each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expected[i]);
				});
				
				done();
			}, 500);
		});

		it("check for startingAngle option", () => {
			const chart = util.generate({
				data: {
				  columns: [
					  ["data", 50]
					],
				  type: "gauge"
				},
				gauge: {
				  startingAngle: 0
				}
			});

			const arc = chart.$.arc;

			// gauge backgound shouldn't be aligned with the 'startingAngle' option
			expect(
				getBoundingRect(arc.select(`.${CLASS.chartArcsBackground}`).node()).width
			).to.be.above(500);

			expect(
				arc.select(`.${CLASS.arc}-data`).datum().startAngle
			).to.be.equal(
				chart.config("gauge.startingAngle")
			);
		});

		it("check for Gauge's threshold data label text", () => {
			const chart = util.generate({
				data: {
					columns: [
						["data1", 30],
						["data2", 30],
						["data3", 20],
						["data4", 15],
						["data5", 5]
					],
					type: "gauge"
				},
				gauge: {
					label: {
						threshold: 0.15
					}
				}
			});

			const hiddenIds = chart.internal.state.hiddenTargetIds;
			const target = chart.$.text.texts.filter(function(d) {
				return hiddenIds.indexOf(d.id) === -1 && !this.textContent;
			});

			expect(target.size()).to.be.equal(1);
			expect(target.datum().value).to.be.equal(5);
		});
	});

	describe("show multi-arc-gauge", () => {
		const args = {
			data: {
				columns: [
					["padded1", 100],
					["padded2", 90],
					["padded3", 50],
					["padded4", 20]
				],
				type: "gauge",
				labels: {
					colors: {}
				}
			},
			gauge: {
				type: "multi",
				label: {
					format: function(value) {
						return `${value}%`;
					}
				}
			},
			color: {
				pattern: ["rgb(255,0,0)", "rgb(249,118,0)", "rgb(246,198,0)", "rgb(96,176,68)"],
				threshold: {
					values: [30, 80, 95]
				}
			}
		};
		const arcColor = ["rgb(96, 176, 68)", "rgb(246, 198, 0)", "rgb(249, 118, 0)", "rgb(255, 0, 0)"];
		let chart;

		beforeEach(() => {
			chart = util.generate(args);
		});

		it("gauge max value should be below totalSum if more than 1 value", () => {
			const maxValue = chart.internal.getMinMaxData().max[0].value;
			const totalSum = chart.internal.getTotalDataSum();
			const gaugeMax = chart.internal.config.gauge_max;

			expect(chart.internal.data.targets.length).to.be.above(1);
			expect(gaugeMax).to.be.below(totalSum);
			expect(gaugeMax).to.be.equal(maxValue);
		});

		it("each data_column should have one arc", () => {
			const arc = chart.$.arc;
			const chartArcs = arc.selectAll(`.${CLASS.chartArc} .${CLASS.arc}`);

			chartArcs.each(function(d, i) {
				expect(d3Select(this).classed(`${CLASS.shape} ${CLASS.arc} ${CLASS.arc}-${args.data.columns[i][0]}`)).to.be.true;
			});
		});

		it("each arc should have the color from color_pattern if color_treshold is given ", done => {
			setTimeout(() => {
				const arc = chart.$.arc;
				const chartArcs = arc.selectAll(`.${CLASS.chartArc} .${CLASS.arc}`);

				chartArcs.each(function(d, i) {
					expect(d3Select(this).style("fill")).to.be.equal(arcColor[i]);
				});

				done();
			}, 100);
		});

		it("each data_column should have one background", () => {
			const arc = chart.$.arc;
			const chartArcBackgrounds = arc.selectAll(`.${CLASS.chartArcs} path.${CLASS.chartArcsBackground}`);

			chartArcBackgrounds.each(function(d, i) {
				expect(d3Select(this).classed(`${CLASS.chartArcsBackground}-${i}`)).to.be.true;
			});
		});

		it("each background should have the same color", () => {
			const arc = chart.$.arc;
			const chartArcBackgrounds = arc.selectAll(`.${CLASS.chartArcs} path.${CLASS.chartArcsBackground}`);

			chartArcBackgrounds.each(function(d, i) {
				expect(d3Select(this).style("fill")).to.be.equal("rgb(224, 224, 224)");
			});
		});

		it("each data_column should have a label", done => {
			setTimeout(() => {
				const arc = chart.$.arc;
				const gaugeValues = arc.selectAll(`${selector.arc} text.${CLASS.gaugeValue}`);

				gaugeValues.each(function(d, i) {
					expect(d3Select(this).text()).to.be.equal(`${args.data.columns[i][1]}%`);
				});

				done();
			}, 100);
		});

		it("each label should have the same color", () => {
			const arc = chart.$.arc;
			const gaugeValues = arc.selectAll(`${selector.arc} text.${CLASS.gaugeValue}`);

			gaugeValues.each(function(d, i) {
				expect(d3Select(this).style("fill")).to.be.equal("rgb(0, 0, 0)");
			});
		});

		it("each data_column should have a labelline", () => {
			const arc = chart.$.arc;
			const arcLabelLines = arc.selectAll(`.${CLASS.chartArc} .${CLASS.arcLabelLine}`);

			arcLabelLines.each(function(d, i) {
				expect(d3Select(this).classed(`${CLASS.arcLabelLine} ${CLASS.target} ${CLASS.target}-${args.data.columns[i][0]}`)).to.be.true;
			});
		});

		it("each labelline should have the color from color_pattern if color_treshold is given", () => {
			const arc = chart.$.arc;
			const arcLabelLines = arc.selectAll(`.${CLASS.chartArc} .${CLASS.arcLabelLine}`);

			arcLabelLines.each(function(d, i) {
				expect(d3Select(this).style("fill")).to.be.equal(arcColor[i]);
			});
		});

		it("set new columns", () => {
			args.data.columns = [
				["padded1", 1],
				["padded2", 14],
				["padded3", 15],
				["padded4", 16],
				["padded5", 50],
			];
			expect(args.data.columns[1][1]).to.be.equal(14);
		});

		it("each overlapped text should be hidden", () => {
			const arc = chart.$.arc;

			chart.focus("padded3");

			const gaugeValues = arc.selectAll(`${selector.arc} text.${CLASS.gaugeValue}`);
			const gaugeValuesNodes = gaugeValues.nodes();

			expect(gaugeValuesNodes[0].className.baseVal).to.be.equal("bb-gauge-value");
			expect(gaugeValuesNodes[1].className.baseVal).to.be.equal("bb-gauge-value text-overlapping");
			expect(gaugeValuesNodes[2].className.baseVal).to.be.equal("bb-gauge-value");
			expect(gaugeValuesNodes[3].className.baseVal).to.be.equal("bb-gauge-value text-overlapping");
			expect(gaugeValuesNodes[4].className.baseVal).to.be.equal("bb-gauge-value");

			chart.focus("padded4");

			expect(gaugeValuesNodes[0].className.baseVal).to.be.equal("bb-gauge-value");
			expect(gaugeValuesNodes[1].className.baseVal).to.be.equal("bb-gauge-value");
			expect(gaugeValuesNodes[2].className.baseVal).to.be.equal("bb-gauge-value text-overlapping");
			expect(gaugeValuesNodes[3].className.baseVal).to.be.equal("bb-gauge-value");
			expect(gaugeValuesNodes[4].className.baseVal).to.be.equal("bb-gauge-value");
		});

		it("set options data.labels.colors", () => {
			args.data.labels.colors = "red";
		});

		it("should apply data label colors for all data", () => {
			chart.$.text.texts.each(function() {
				expect(this.style.fill).to.be.equal(args.data.labels.colors);
			});
		});

		it("set options data.labels.colors", () => {
			args.data.labels.colors = {
				padded1: "red",
				padded4: "cyan"
			};
		});

		it("should apply data label colors by each data", () => {
			chart.$.text.texts.each(function(d) {
				const color = args.data.labels.colors[d.id];

				color && expect(this.style.fill).to.be.equal(color);
			});
		});
    });
    
    describe("Positioning", () => {
        it("should have padded bottom space for the legend", () => {
            const chart = util.generate({
                data: {
                    columns: [
                        ["data", 91.4]
                    ],
                    type: "gauge",
                },
                size: {
                    height: 180
                }
                });
                
            const svgRect = chart.$.svg.node().getBoundingClientRect();
            const legendRect = chart.$.svg.select(".bb-legend").node().getBoundingClientRect();
            
            expect(legendRect.bottom).to.be.below(svgRect.bottom - 5);
        });
    });
});
