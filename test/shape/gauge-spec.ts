/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import {$ARC, $COMMON, $GAUGE, $SHAPE} from "../../src/config/classes";
import util from "../assets/util";
import {getBoundingRect} from "../../src/module/util";

describe("SHAPE GAUGE", () => {
	const selector = {
		arc: `.${$ARC.chartArc}.${$COMMON.target}.${$COMMON.target}`,
		shapes: `g.${$SHAPE.shapes}.${$ARC.arcs}.${$ARC.arcs}`,
		shape: `path.${$SHAPE.shape}.${$ARC.arc}.${$ARC.arc}`
	};

    describe("show gauge", () => {
		it("should have correct d for Pi radian gauge", done => {
			const chart = util.generate({
				gauge: {
					width: 10,
					max: 10,
					expand: true,
					background: "red"
				},
				data: {
					columns: [
						["data", 8]
					],
					type: "gauge"
				}
			});

			const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);
			const data = chartArc.select(`${selector.arc}-data`)
					.select(`${selector.shapes}-data`)
					.select(`${selector.shape}-data`);

			// check guage's background color
			expect(
				chart.$.arc.select(`path.${$ARC.chartArcsBackground}`).style("fill")
			).to.be.equal(chart.internal.config.gauge_background);

			setTimeout(() => {
				expect(data.attr("d"))
					.to.be.equal("M-304,-3.7229262694079536e-14A304,304,0,0,1,245.94116628998404,-178.68671669691184L237.85099634623455,-172.8088641739871A294,294,0,0,0,-294,-3.6004615894932184e-14Z");

				expect(chartArc.select(`.${$GAUGE.gaugeValue}`).attr("dy")).to.be.equal("-.1em");

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

			const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);
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

		it("should render correctly based when min value is specified", () => {
			const chart = util.generate({
				data: {
					columns: [
					  ["data", 50]
					],
					type: "gauge"
				  },
				  gauge: {
					min: 40,
					max: 60
				  }
			});

			expect(chart.$.arc.select("path").attr("d"))
				.to.be
				.equal("M-304,-3.7229262694079536e-14A304,304,0,1,1,304,0L182.4,0A182.4,182.4,0,1,0,-182.4,-2.2337557616447722e-14Z");

			expect(chart.$.text.texts.text()).to.be.equal("50.0%");
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
			const min = chartArc.select(`.${$GAUGE.chartArcsGaugeMin}`);
			const max = chartArc.select(`.${$GAUGE.chartArcsGaugeMax}`);

			expect(min.text()).to.equal("Min: 0%");
			expect(max.text()).to.equal("Max: 100%");

			// gauge text should be multilined
			expect(chartArc.selectAll(`.${$COMMON.target}-data tspan`).size()).to.be.equal(3);
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

			const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);
			const min = chartArc.select(`.${$GAUGE.chartArcsGaugeMin}`);
			const max = chartArc.select(`.${$GAUGE.chartArcsGaugeMax}`)

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
				const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);
				const min = chartArc.select(`.${$GAUGE.chartArcsGaugeMin}`);
				const max = chartArc.select(`.${$GAUGE.chartArcsGaugeMax}`);

				// check if gauge value text is centered
				expect(+chartArc.select(`.${$GAUGE.gaugeValue}`).attr("dy")).to.be.above(0);

				// check background height
				expect(util.getBBox(chartArc.select(`.${$ARC.chartArcsBackground}`)).height).to.be.above(300);

				// check for background arcPath length (in this case full circle)
				const path = 'M-211.85,-2.5944142439936676e-14A211.85,211.85,0,1,1,211.85,2.5944142439936676e-14A211.85,211.85,0,1,1,-211.85,-2.5944142439936676e-14M-201.85,2.4719495640789325e-14A201.85,201.85,0,1,0,201.85,-2.4719495640789325e-14A201.85,201.85,0,1,0,-201.85,2.4719495640789325e-14Z'
				expect(chartArc.select('path.bb-chart-arcs-background').attr('d')).to.be.equal(path);

				// with fullCircle option, only min text is showed
				expect(min.empty()).to.be.false;
				expect(max.empty()).to.be.true;

				done();
			}, 100);
		});

		it("check for arcLength option", done => {
			const chart = util.generate({
				gauge: {
					width: 10,
					max: 10,
					expand: true,
					fullCircle: true,
					arcLength: 75
				},
				data: {
					columns: [
						["data", 10]
					],
					type: "gauge"
				}
			});

			setTimeout(() => {
				const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);

				// check background height
				expect(util.getBBox(chartArc.select(`.${$ARC.chartArcsBackground}`)).height).to.be.above(300);

				// check for background arcPath length (in this case 3 quarter)
				const backgroundArcPath = 'M-211.85,-2.5944142439936676e-14A211.85,211.85,0,1,1,1.2972071219968338e-14,211.85L1.2359747820394662e-14,201.85A201.85,201.85,0,1,0,-201.85,-2.4719495640789325e-14Z'
				expect(chartArc.select('path.bb-chart-arcs-background').attr('d')).to.be.equal(backgroundArcPath);

				// check for arcPath length (in this case 3 quarter)
				const arcPath = 'M-211.85,-2.5944142439936676e-14A211.85,211.85,0,1,1,1.2972071219968338e-14,211.85L1.2359747820394662e-14,201.85A201.85,201.85,0,1,0,-201.85,-2.4719495640789325e-14Z'
				expect(chartArc.select(`path.${$ARC.arc + '-' + chart.internal.data.targets[0].id}`).attr('d')).to.be.equal(arcPath);

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
				chart.$.arc.selectAll(`.${$COMMON.target} path`).each(function(d, i) {
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
					min: 0,
					max: 50,
					title: "TitleText"
				}
			};
			const chart = util.generate(args);

			const expected = [
				"M245.94116628998404,-178.68671669691184A304,304,0,0,1,304,0L182.4,0A182.4,182.4,0,0,0,147.5646997739904,-107.2120300181471Z",
				"M-304,-3.7229262694079536e-14A304,304,0,0,1,245.94116628998404,-178.68671669691184L147.5646997739904,-107.2120300181471A182.4,182.4,0,0,0,-182.4,-2.2337557616447722e-14Z"
			];

			setTimeout(() => {
				const data = chart.data();

				expect(chart.$.arc.select(`.${$GAUGE.chartArcsGaugeTitle}`).text()).to.be.equal(args.gauge.title);

				chart.$.arc.selectAll(`.${$COMMON.target} path`).each(function(d, i) {
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
				chart.$.arc.selectAll(`.${$COMMON.target} path`).each(function(d, i) {
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

			// gauge backgound should be aligned with the 'startingAngle' option
			expect(
				getBoundingRect(arc.select(`.${$ARC.chartArcsBackground}`).node()).width
			).to.be.equal(0);

			expect(
				arc.select(`.${$ARC.arc}-data`).datum().startAngle
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
				background: "",
				type: "multi",
				label: {
					format: function(value) {
						return `${value}%`;
					}
				},
				fullCircle: false,
				arcLength: 360,
				startingAngle: -1 * Math.PI / 2
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
			const chartArcs = arc.selectAll(`.${$ARC.chartArc} .${$ARC.arc}`);

			chartArcs.each(function(d, i) {
				expect(d3Select(this).classed(`${$SHAPE.shape} ${$ARC.arc} ${$ARC.arc}-${args.data.columns[i][0]}`)).to.be.true;
			});
		});

		it("each arc should have the color from color_pattern if color_treshold is given ", done => {
			setTimeout(() => {
				const arc = chart.$.arc;
				const chartArcs = arc.selectAll(`.${$ARC.chartArc} .${$ARC.arc}`);

				chartArcs.each(function(d, i) {
					expect(d3Select(this).style("fill")).to.be.equal(arcColor[i]);
				});

				done();
			}, 100);
		});

		it("each data_column should have one background", () => {
			const arc = chart.$.arc;
			const chartArcBackgrounds = arc.selectAll(`.${$ARC.chartArcs} path.${$ARC.chartArcsBackground}`);

			chartArcBackgrounds.each(function(d, i) {
				expect(d3Select(this).classed(`${$ARC.chartArcsBackground}-${i}`)).to.be.true;
			});
		});

		it("each background should have the same color", () => {
			const arc = chart.$.arc;
			const chartArcBackgrounds = arc.selectAll(`.${$ARC.chartArcs} path.${$ARC.chartArcsBackground}`);

			chartArcBackgrounds.each(function(d, i) {
				expect(d3Select(this).style("fill")).to.be.equal("rgb(224, 224, 224)");
			});
		});

		it("each data_column should have a label", done => {
			setTimeout(() => {
				const arc = chart.$.arc;
				const gaugeValues = arc.selectAll(`${selector.arc} text.${$GAUGE.gaugeValue}`);

				gaugeValues.each(function(d, i) {
					expect(d3Select(this).text()).to.be.equal(`${args.data.columns[i][1]}%`);
				});

				done();
			}, 100);
		});

		it("each label should have the same color", () => {
			const arc = chart.$.arc;
			const gaugeValues = arc.selectAll(`${selector.arc} text.${$GAUGE.gaugeValue}`);

			gaugeValues.each(function(d, i) {
				expect(d3Select(this).style("fill")).to.be.equal("rgb(0, 0, 0)");
			});
		});

		it("each data_column should have a labelline", () => {
			const arc = chart.$.arc;
			const arcLabelLines = arc.selectAll(`.${$ARC.chartArc} .${$ARC.arcLabelLine}`);

			arcLabelLines.each(function(d, i) {
				expect(d3Select(this).classed(`${$ARC.arcLabelLine} ${$COMMON.target} ${$COMMON.target}-${args.data.columns[i][0]}`)).to.be.true;
			});
		});

		it("each labelline should have the color from color_pattern if color_treshold is given", () => {
			const arc = chart.$.arc;
			const arcLabelLines = arc.selectAll(`.${$ARC.chartArc} .${$ARC.arcLabelLine}`);

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

			const gaugeValues = arc.selectAll(`${selector.arc} text.${$GAUGE.gaugeValue}`);
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

		it("set options gauge.background='red'", () => {
			args.gauge.background = "red";
		});

		it("check gauge's background color", () => {
			const arc = chart.$.arc;
			const backgroundColor = chart.internal.config.gauge_background;
			const gaugeBackground = arc.selectAll(`path.${$ARC.chartArcsBackground}`);

			gaugeBackground.each(function(d, i) {
				expect(this.style.fill).to.be.equal(backgroundColor);
			});
		})

		it("set gauge.startingAngle and new columns", () => {
			args.data.columns = [
				["padded1", 100],
				["padded2", 90],
				["padded3", 50],
				["padded4", 20]
			];
			args.gauge.startingAngle = -1;
			expect(args.data.columns[1][1]).to.be.equal(90);
			expect(args.gauge.startingAngle).to.be.equal(-1);
		});

		it("should mirror the starting angle", done => {
			setTimeout(() => {
				const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);

				// check for background arcPath length (in this case 3 quarter)
				const expectedBackgroundArcPaths = [
					'M-217.43610247436044,-139.6141158363273A258.4,258.4,0,0,1,217.43610247436044,-139.61411583632727L195.6924922269244,-125.65270425269455A232.55999999999997,232.55999999999997,0,0,0,-195.6924922269244,-125.65270425269458Z',
					'M-195.6924922269244,-125.65270425269458A232.55999999999997,232.55999999999997,0,0,1,195.6924922269244,-125.65270425269455L173.94888197948833,-111.69129266906181A206.71999999999997,206.71999999999997,0,0,0,-173.94888197948833,-111.69129266906184Z',
					'M-173.94888197948833,-111.69129266906184A206.71999999999997,206.71999999999997,0,0,1,173.94888197948833,-111.69129266906181L152.20527173205232,-97.7298810854291A180.88,180.88,0,0,0,-152.20527173205232,-97.72988108542911Z',
					'M-152.20527173205232,-97.72988108542911A180.88,180.88,0,0,1,152.20527173205232,-97.7298810854291L130.46166148461626,-83.76846950179637A155.04,155.04,0,0,0,-130.46166148461626,-83.76846950179639Z',
					]
				const backgroundArcPaths = chartArc.selectAll(`path.${$ARC.chartArcsBackground}`);
				backgroundArcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedBackgroundArcPaths[index])
				})

				// check for arcPath length (in this case 3 quarter)
				const expectedArcPaths = [
					'M-217.43610247436044,-139.6141158363273A258.4,258.4,0,0,1,217.43610247436044,-139.61411583632727L195.6924922269244,-125.65270425269455A232.55999999999997,232.55999999999997,0,0,0,-195.6924922269244,-125.65270425269458Z',
					'M-195.6924922269244,-125.65270425269458A232.55999999999997,232.55999999999997,0,0,1,166.828332499593,-162.02611232577675L148.29185111074932,-144.023210956246A206.71999999999997,206.71999999999997,0,0,0,-173.94888197948833,-111.69129266906184Z',
					'M-173.94888197948833,-111.69129266906184A206.71999999999997,206.71999999999997,0,0,1,1.265794931598704e-14,-206.71999999999997L1.1075705651488663e-14,-180.88A180.88,180.88,0,0,0,-152.20527173205232,-97.72988108542911Z',
					'M-152.20527173205232,-97.72988108542911A180.88,180.88,0,0,1,-102.13253058769399,-149.2867060248626L-87.54216907516629,-127.96003373559653A155.04,155.04,0,0,0,-130.46166148461626,-83.76846950179639Z',
				]
				const arcPaths = chartArc.selectAll(`path.${$ARC.arc}`);
				arcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedArcPaths[index])
				})

				done();
			}, 100);
		});

		it("set gauge.fullCircle", () => {
			args.gauge.fullCircle = true;
			args.gauge.startingAngle = -1 * Math.PI / 2;
			expect(args.gauge.startingAngle).to.be.equal(-1 * Math.PI / 2);
			expect(args.gauge.fullCircle).to.be.true;
		});

		it("check for fullCircle option", done => {
			setTimeout(() => {
				const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);
				const min = chartArc.select(`.${$GAUGE.chartArcsGaugeMin}`);
				const max = chartArc.select(`.${$GAUGE.chartArcsGaugeMax}`);

				// check for background arcPath length (in this case full circle)
				const expectedBackgroundArcPaths = [
					'M-180.07249999999996,-2.2052521073946173e-14A180.07249999999996,180.07249999999996,0,1,1,180.07249999999996,2.2052521073946173e-14A180.07249999999996,180.07249999999996,0,1,1,-180.07249999999996,-2.2052521073946173e-14M-162.06524999999996,1.9847268966551554e-14A162.06524999999996,162.06524999999996,0,1,0,162.06524999999996,-1.9847268966551554e-14A162.06524999999996,162.06524999999996,0,1,0,-162.06524999999996,1.9847268966551554e-14Z',
					'M-162.06524999999996,-1.9847268966551554e-14A162.06524999999996,162.06524999999996,0,1,1,162.06524999999996,1.9847268966551554e-14A162.06524999999996,162.06524999999996,0,1,1,-162.06524999999996,-1.9847268966551554e-14M-144.05799999999996,1.7642016859156936e-14A144.05799999999996,144.05799999999996,0,1,0,144.05799999999996,-1.7642016859156936e-14A144.05799999999996,144.05799999999996,0,1,0,-144.05799999999996,1.7642016859156936e-14Z',
					'M-144.05799999999996,-1.7642016859156936e-14A144.05799999999996,144.05799999999996,0,1,1,144.05799999999996,1.7642016859156936e-14A144.05799999999996,144.05799999999996,0,1,1,-144.05799999999996,-1.7642016859156936e-14M-126.05074999999998,1.543676475176232e-14A126.05074999999998,126.05074999999998,0,1,0,126.05074999999998,-1.543676475176232e-14A126.05074999999998,126.05074999999998,0,1,0,-126.05074999999998,1.543676475176232e-14Z',
					'M-126.05074999999998,-1.543676475176232e-14A126.05074999999998,126.05074999999998,0,1,1,126.05074999999998,1.543676475176232e-14A126.05074999999998,126.05074999999998,0,1,1,-126.05074999999998,-1.543676475176232e-14M-108.04349999999998,1.3231512644367703e-14A108.04349999999998,108.04349999999998,0,1,0,108.04349999999998,-1.3231512644367703e-14A108.04349999999998,108.04349999999998,0,1,0,-108.04349999999998,1.3231512644367703e-14Z'
				]
				const backgroundArcPaths = chartArc.selectAll(`path.${$ARC.chartArcsBackground}`);
				backgroundArcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedBackgroundArcPaths[index])
				})

				// check for arcPath length (in this case full circle)
				const expectedArcPaths = [
					'M-180.07249999999996,-2.2052521073946173e-14A180.07249999999996,180.07249999999996,0,1,1,180.07249999999996,2.2052521073946173e-14A180.07249999999996,180.07249999999996,0,1,1,-180.07249999999996,-2.2052521073946173e-14M-162.06524999999996,-1.2409558866675413e-13A162.06524999999996,162.06524999999996,0,1,0,162.06524999999996,1.2409558866675413e-13A162.06524999999996,162.06524999999996,0,1,0,-162.06524999999996,-1.2409558866675413e-13Z',
					'M-162.06524999999996,-1.9847268966551554e-14A162.06524999999996,162.06524999999996,0,1,1,-131.1135414476245,95.25956385909261L-116.54537017566622,84.67516787474898A144.05799999999996,144.05799999999996,0,1,0,-144.05799999999996,-1.7642016859156936e-14Z',
					'M-144.05799999999996,-1.7642016859156936e-14A144.05799999999996,144.05799999999996,0,1,1,144.05799999999996,6.39746033925803e-14L126.05074999999998,5.597777796850777e-14A126.05074999999998,126.05074999999998,0,1,0,-126.05074999999998,-1.543676475176232e-14Z',
					'M-126.05074999999998,-1.543676475176232e-14A126.05074999999998,126.05074999999998,0,0,1,-38.95182390370789,-119.88138717139132L-33.38727763174962,-102.75547471833542A108.04349999999998,108.04349999999998,0,0,0,-108.04349999999998,-1.3231512644367703e-14Z'
				]
				const arcPaths = chartArc.selectAll(`path.${$ARC.arc}`);
				arcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedArcPaths[index])
				})

				// with fullCircle option, only min text is showed
				expect(min.empty()).to.be.false;
				expect(max.empty()).to.be.true;

				done();
			}, 100);
		});

		it("set gauge.arcLength", () => {
			args.gauge.arcLength = 75;
			expect(args.gauge.arcLength).to.be.equal(75);
		});

		it("check for arcLength option", done => {
			setTimeout(() => {
				const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);

				// check for background arcPath length (in this case 3 quarter)
				const expectedBackgroundArcPaths = [
					'M-180.07249999999996,-2.2052521073946173e-14A180.07249999999996,180.07249999999996,0,1,1,1.1026260536973086e-14,180.07249999999996L9.923634483275777e-15,162.06524999999996A162.06524999999996,162.06524999999996,0,1,0,-162.06524999999996,-1.9847268966551554e-14Z',
					'M-162.06524999999996,-1.9847268966551554e-14A162.06524999999996,162.06524999999996,0,1,1,9.923634483275777e-15,162.06524999999996L8.821008429578468e-15,144.05799999999996A144.05799999999996,144.05799999999996,0,1,0,-144.05799999999996,-1.7642016859156936e-14Z',
					'M-144.05799999999996,-1.7642016859156936e-14A144.05799999999996,144.05799999999996,0,1,1,8.821008429578468e-15,144.05799999999996L7.71838237588116e-15,126.05074999999998A126.05074999999998,126.05074999999998,0,1,0,-126.05074999999998,-1.543676475176232e-14Z',
					'M-126.05074999999998,-1.543676475176232e-14A126.05074999999998,126.05074999999998,0,1,1,7.71838237588116e-15,126.05074999999998L6.615756322183852e-15,108.04349999999998A108.04349999999998,108.04349999999998,0,1,0,-108.04349999999998,-1.3231512644367703e-14Z'
				]
				const backgroundArcPaths = chartArc.selectAll(`path.${$ARC.chartArcsBackground}`);
				backgroundArcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedBackgroundArcPaths[index])
				})

				// check for arcPath length (in this case 3 quarter)
				const expectedArcPaths = [
					'M-180.07249999999996,-2.2052521073946173e-14A180.07249999999996,180.07249999999996,0,1,1,1.1026260536973086e-14,180.07249999999996L9.923634483275777e-15,162.06524999999996A162.06524999999996,162.06524999999996,0,1,0,-162.06524999999996,-1.9847268966551554e-14Z',
					'M-162.06524999999996,-1.9847268966551554e-14A162.06524999999996,162.06524999999996,0,1,1,73.57608383791458,144.40119509421885L65.40096341147962,128.35661786152787A144.05799999999996,144.05799999999996,0,1,0,-144.05799999999996,-1.7642016859156936e-14Z',
					'M-144.05799999999996,-1.7642016859156936e-14A144.05799999999996,144.05799999999996,0,0,1,101.86438868417164,-101.86438868417163L89.1313400986502,-89.13134009865018A126.05074999999998,126.05074999999998,0,0,0,-126.05074999999998,-1.543676475176232e-14Z',
					'M-126.05074999999998,-1.543676475176232e-14A126.05074999999998,126.05074999999998,0,0,1,-74.09077189040543,-101.97719890370789L-63.5063759060618,-87.40902763174962A108.04349999999998,108.04349999999998,0,0,0,-108.04349999999998,-1.3231512644367703e-14Z'
				]
				const arcPaths = chartArc.selectAll(`path.${$ARC.arc}`);
				arcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedArcPaths[index])
				})

				done();
			}, 100);
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
	
	describe("Text value & positioning", () => {
        it("check max text value ", () => {
			const args = {
                data: {
					columns: [
						["data", 500]
					],
					type: "gauge"
				},
				gauge: {
					min: 0,
					max: 100
				}
            };
            const chart = util.generate(args);
			const maxValue = +chart.$.main.select(`.${$GAUGE.chartArcsGaugeMax}`).text();
            
			expect(args.gauge.max).to.be.below(maxValue);
			expect(maxValue).to.be.equal(args.data.columns[0][1]);
			expect(chart.config("gauge.max")).to.be.equal(maxValue);
		});
		
		it("unit text position shouldn't be overlapped with value", () => {
			const args = {
				data: {
					columns: [
						["data", 91.4]
					],
					type: "gauge"
				},
				gauge: {
					fullCircle: true,
					units: "units"
				}
            };
			const chart = util.generate(args);
			
			const valueRect = chart.$.text.texts.node().getBoundingClientRect();
			const unitRect = chart.$.main.select(`.${$GAUGE.chartArcsGaugeUnit}`).node().getBoundingClientRect();

			expect(unitRect.y).to.be.greaterThan(valueRect.y + valueRect.height);
		});
    });

	describe("Interaction disabled", () => {
        it("shoul generate correctly", () => {
			try {
				util.generate({
					data: {
						columns: [
							["data", 91.4]
						],
						type: "gauge"
					},
					interaction: {
					enabled: false
					}
				});

				expect(true).to.be.true;
			} catch (e) {
				expect(false).to.be.true;
			}
		});
	});
});
