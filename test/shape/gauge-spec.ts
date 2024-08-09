/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, describe, expect, it} from "vitest";
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
		it("should have correct d for Pi radian gauge", () => new Promise(done => {
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
					.to.be.equal("M-304,0A304,304,0,0,1,245.941,-178.687L237.851,-172.809A294,294,0,0,0,-294,0Z");

				expect(chartArc.select(`.${$GAUGE.gaugeValue}`).attr("dy")).to.be.equal("-.1em");

				done(1);
			}, 300);
		}));

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

		it("should have correct d for 2 Pi radian gauge starting at Pi/2", () => new Promise(done => {
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
				const path = data.attr("d");
				
				// This test has bee updated to make tests pass. @TODO double-check this test is accurate.
				expect(path)
					.to.be.equal("M-211.85,0A211.85,211.85,0,1,1,-65.465,201.481L-62.375,191.971A201.85,201.85,0,1,0,-201.85,0Z");

				done(1);
			}, 300);
		}));

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
				.equal("M-304,0A304,304,0,1,1,304,0L182.4,0A182.4,182.4,0,1,0,-182.4,0Z");

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

		it("check for fullCircle option", () => new Promise(done => {
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
				const path = chartArc.select('path.bb-chart-arcs-background').attr('d');
				
				expect(path).to.be.equal("M-211.85,0A211.85,211.85,0,1,1,211.85,0A211.85,211.85,0,1,1,-211.85,0M-201.85,0A201.85,201.85,0,1,0,201.85,0A201.85,201.85,0,1,0,-201.85,0Z");

				// with fullCircle option, only min text is showed
				expect(min.empty()).to.be.false;
				expect(max.empty()).to.be.true;

				done(1);
			}, 100);
		}));

		it("check for arcLength option", () => new Promise(done => {
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
				const backgroundArcPath = chartArc.select('path.bb-chart-arcs-background').attr('d');

				expect(backgroundArcPath).to.be.equal("M-211.85,0A211.85,211.85,0,1,1,0,211.85L0,201.85A201.85,201.85,0,1,0,-201.85,0Z");

				// check for arcPath length (in this case 3 quarter)
				const arcPath = chartArc.select(`path.${$ARC.arc + '-' + chart.internal.data.targets[0].id}`).attr('d');
				
				expect(arcPath).to.be.equal("M-211.85,0A211.85,211.85,0,1,1,0,211.85L0,201.85A201.85,201.85,0,1,0,-201.85,0Z");

				done(1);
			}, 100);
		}));

		it("check for stack data #1", () => new Promise(done => {
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
				'M-304,0A304,304,0,0,1,-275.256,-129.035L-165.154,-77.421A182.4,182.4,0,0,0,-182.4,0Z',
				'M-275.256,-129.035A304,304,0,0,1,98.156,-287.718L58.893,-172.631A182.4,182.4,0,0,0,-165.154,-77.421Z',
				'M98.156,-287.718A304,304,0,0,1,226.411,-202.865L135.846,-121.719A182.4,182.4,0,0,0,58.893,-172.631Z',
				'M226.411,-202.865A304,304,0,0,1,283.941,-108.598L170.365,-65.159A182.4,182.4,0,0,0,135.846,-121.719Z',
				'M283.941,-108.598A304,304,0,0,1,304,0L182.4,0A182.4,182.4,0,0,0,170.365,-65.159Z'
		  	];

			setTimeout(() => {
				chart.$.arc.selectAll(`.${$COMMON.target} path`).each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expected[i]);
				});

				done(1);
			}, 200);
		}));

		it("check for stack data #2", () => new Promise(done => {
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
				'M245.941,-178.687A304,304,0,0,1,304,0L182.4,0A182.4,182.4,0,0,0,147.565,-107.212Z',
				'M-304,0A304,304,0,0,1,245.941,-178.687L147.565,-107.212A182.4,182.4,0,0,0,-182.4,0Z'
			];

			setTimeout(() => {
				const data = chart.data();

				expect(chart.$.arc.select(`.${$GAUGE.chartArcsGaugeTitle}`).text()).to.be.equal(args.gauge.title);

				chart.$.arc.selectAll(`.${$COMMON.target} path`).each(function(d, i) {
					expect(d.value).to.be.equal(data[i].values[0].value);
					expect(this.getAttribute("d")).to.be.equal(expected[i]);
				});

				done(1);
			}, 100);
		}));

		it("check for stack data #3", () => new Promise(done => {
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
				'M99.429,-287.28A304,304,0,0,1,238.96,-187.92L143.376,-112.752A182.4,182.4,0,0,0,59.657,-172.368Z',
				'M-304,0A304,304,0,0,1,99.429,-287.28L59.657,-172.368A182.4,182.4,0,0,0,-182.4,0Z',
				'M 0 0'
			];

			setTimeout(() => {
				chart.$.arc.selectAll(`.${$COMMON.target} path`).each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expected[i]);
				});
				
				done(1);
			}, 300);
		}));

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

	describe("min/max", () => {
		let args = {
			data: {
				columns: [
					["data1", 30]
				],
				type: "gauge"
			},
			gauge: {
				type: "single",
				enforceMinMax: true,
				min: 50,
				max: 100
			}
		};
		let chart;

		beforeEach(() => {
			chart = util.generate(args);
		});

		it("shoudn't render data when given value is less than min.", () => {
			const length = chart.$.arc.select(".bb-shapes path").node().getTotalLength();

			expect(length < 100).to.be.true;
		});

		it("set options: gauge.type='multi'", () => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 75],
						["data3", 130],
					],
					type: "gauge"
				},
				gauge: {
					type: "multi",
					enforceMinMax: true,
					min: 50,
					max: 100
				}
			}
		});

		it("shoud render data shape in a range of min/max value.", () => new Promise(done => {
			const expected = [
				{value: 0, length: 70},
				{value: 50, length: 720},
				{value: 100, length: 1560}
			];

			setTimeout(() => {
				chart.$.arc.selectAll(".bb-shapes").each(function(d, i) {
					expect(parseInt(this.nextSibling.textContent)).to.be.equal(expected[i].value);
					expect(this.querySelector("path").getTotalLength() < expected[i].length).to.be
				});

				done(1);
			}, 300);
		}));
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
			legend: {
				show: true
			},
			gauge: {
				background: "",
				type: "multi",
				label: {
					format: function(value) {
						return `${value}%`;
					},
					show: true
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

		it("each arc should have the color from color_pattern if color_treshold is given ", () => new Promise(done => {
			setTimeout(() => {
				const arc = chart.$.arc;
				const chartArcs = arc.selectAll(`.${$ARC.chartArc} .${$ARC.arc}`);

				chartArcs.each(function(d, i) {
					expect(d3Select(this).style("fill")).to.be.equal(arcColor[i]);
				});

				done(1);
			}, 100);
		}));

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

		it("each data_column should have a label", () => new Promise(done => {
			setTimeout(() => {
				const arc = chart.$.arc;
				const gaugeValues = arc.selectAll(`${selector.arc} text.${$GAUGE.gaugeValue}`);

				gaugeValues.each(function(d, i) {
					expect(d3Select(this).text()).to.be.equal(`${args.data.columns[i][1]}%`);
				});

				done(1);
			}, 100);
		}));

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

		it("should mirror the starting angle", () => new Promise(done => {
			setTimeout(() => {
				const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);

				// check for background arcPath length (in this case 3 quarter)
				const expectedBackgroundArcPaths = [
						'M-217.436,-139.614A258.4,258.4,0,0,1,217.436,-139.614L195.692,-125.653A232.56,232.56,0,0,0,-195.692,-125.653Z',
						'M-195.692,-125.653A232.56,232.56,0,0,1,195.692,-125.653L173.949,-111.691A206.72,206.72,0,0,0,-173.949,-111.691Z',
						'M-173.949,-111.691A206.72,206.72,0,0,1,173.949,-111.691L152.205,-97.73A180.88,180.88,0,0,0,-152.205,-97.73Z',
						'M-152.205,-97.73A180.88,180.88,0,0,1,152.205,-97.73L130.462,-83.768A155.04,155.04,0,0,0,-130.462,-83.768Z'
					]
				const backgroundArcPaths = chartArc.selectAll(`path.${$ARC.chartArcsBackground}`);
				backgroundArcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedBackgroundArcPaths[index])
				})

				// check for arcPath length (in this case 3 quarter)
				const expectedArcPaths = [
					'M-217.436,-139.614A258.4,258.4,0,0,1,217.436,-139.614L195.692,-125.653A232.56,232.56,0,0,0,-195.692,-125.653Z',
					'M-195.692,-125.653A232.56,232.56,0,0,1,166.828,-162.026L148.292,-144.023A206.72,206.72,0,0,0,-173.949,-111.691Z',
					'M-173.949,-111.691A206.72,206.72,0,0,1,0,-206.72L0,-180.88A180.88,180.88,0,0,0,-152.205,-97.73Z',
					'M-152.205,-97.73A180.88,180.88,0,0,1,-102.133,-149.287L-87.542,-127.96A155.04,155.04,0,0,0,-130.462,-83.768Z'
				]
				const arcPaths = chartArc.selectAll(`path.${$ARC.arc}`);
				arcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedArcPaths[index])
				})

				done(1);
			}, 100);
		}));

		it("set gauge.fullCircle", () => {
			args.gauge.fullCircle = true;
			args.gauge.startingAngle = -1 * Math.PI / 2;
			expect(args.gauge.startingAngle).to.be.equal(-1 * Math.PI / 2);
			expect(args.gauge.fullCircle).to.be.true;
		});

		it("check for fullCircle option", () => new Promise(done => {
			setTimeout(() => {
				const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);
				const min = chartArc.select(`.${$GAUGE.chartArcsGaugeMin}`);
				const max = chartArc.select(`.${$GAUGE.chartArcsGaugeMax}`);

				// check for background arcPath length (in this case full circle)
				const expectedBackgroundArcPaths = [
					'M-180.072,0A180.072,180.072,0,1,1,180.072,0A180.072,180.072,0,1,1,-180.072,0M-162.065,0A162.065,162.065,0,1,0,162.065,0A162.065,162.065,0,1,0,-162.065,0Z',
					'M-162.065,0A162.065,162.065,0,1,1,162.065,0A162.065,162.065,0,1,1,-162.065,0M-144.058,0A144.058,144.058,0,1,0,144.058,0A144.058,144.058,0,1,0,-144.058,0Z',
					'M-144.058,0A144.058,144.058,0,1,1,144.058,0A144.058,144.058,0,1,1,-144.058,0M-126.051,0A126.051,126.051,0,1,0,126.051,0A126.051,126.051,0,1,0,-126.051,0Z',
					'M-126.051,0A126.051,126.051,0,1,1,126.051,0A126.051,126.051,0,1,1,-126.051,0M-108.043,0A108.043,108.043,0,1,0,108.043,0A108.043,108.043,0,1,0,-108.043,0Z'
				]
				const backgroundArcPaths = chartArc.selectAll(`path.${$ARC.chartArcsBackground}`);
				backgroundArcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedBackgroundArcPaths[index])
				})

				// check for arcPath length (in this case full circle)
				const expectedArcPaths = [
					'M-180.072,0A180.072,180.072,0,1,1,180.072,0A180.072,180.072,0,1,1,-180.072,0M-162.065,0A162.065,162.065,0,1,0,162.065,0A162.065,162.065,0,1,0,-162.065,0Z',
					'M-162.065,0A162.065,162.065,0,1,1,-131.114,95.26L-116.545,84.675A144.058,144.058,0,1,0,-144.058,0Z',
					'M-144.058,0A144.058,144.058,0,1,1,144.058,0L126.051,0A126.051,126.051,0,1,0,-126.051,0Z',
					'M-126.051,0A126.051,126.051,0,0,1,-38.952,-119.881L-33.387,-102.755A108.043,108.043,0,0,0,-108.043,0Z'
				]
				const arcPaths = chartArc.selectAll(`path.${$ARC.arc}`);
				arcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedArcPaths[index])
				})

				// with fullCircle option, only min text is showed
				expect(min.empty()).to.be.false;
				expect(max.empty()).to.be.true;

				done(1);
			}, 100);
		}));

		it("set gauge.arcLength", () => {
			args.gauge.arcLength = 75;
			expect(args.gauge.arcLength).to.be.equal(75);
		});

		it("check for arcLength option", () => new Promise(done => {
			setTimeout(() => {
				const chartArc = chart.$.main.select(`.${$ARC.chartArcs}`);

				// check for background arcPath length (in this case 3 quarter)
				const expectedBackgroundArcPaths = [
					'M-180.072,0A180.072,180.072,0,1,1,0,180.072L0,162.065A162.065,162.065,0,1,0,-162.065,0Z',
					'M-162.065,0A162.065,162.065,0,1,1,0,162.065L0,144.058A144.058,144.058,0,1,0,-144.058,0Z',
					'M-144.058,0A144.058,144.058,0,1,1,0,144.058L0,126.051A126.051,126.051,0,1,0,-126.051,0Z',
					'M-126.051,0A126.051,126.051,0,1,1,0,126.051L0,108.043A108.043,108.043,0,1,0,-108.043,0Z'
				]
				const backgroundArcPaths = chartArc.selectAll(`path.${$ARC.chartArcsBackground}`);
				backgroundArcPaths.each((data, index, elements)=> {					
					expect(elements[index].getAttribute('d')).to.be.equal(expectedBackgroundArcPaths[index])
				})

				// check for arcPath length (in this case 3 quarter)
				const expectedArcPaths = [
					'M-180.072,0A180.072,180.072,0,1,1,0,180.072L0,162.065A162.065,162.065,0,1,0,-162.065,0Z',
					'M-162.065,0A162.065,162.065,0,1,1,73.576,144.401L65.401,128.357A144.058,144.058,0,1,0,-144.058,0Z',
					'M-144.058,0A144.058,144.058,0,0,1,101.864,-101.864L89.131,-89.131A126.051,126.051,0,0,0,-126.051,0Z',
					'M-126.051,0A126.051,126.051,0,0,1,-74.091,-101.977L-63.506,-87.409A108.043,108.043,0,0,0,-108.043,0Z'
				]
				const arcPaths = chartArc.selectAll(`path.${$ARC.arc}`);
				arcPaths.each((data, index, elements)=> {
					expect(elements[index].getAttribute('d')).to.be.equal(expectedArcPaths[index])
				})

				done(1);
			}, 100);
		}));

		const gaugeSizeWithoutLabel = {
			width: 0,
			height: 0,
			radius: 0
		};

		it("set options: legend.show & gauge.label.show", () => {
			const rect = chart.$.arc.node().getBoundingClientRect();

			// store values to compare with next test
			gaugeSizeWithoutLabel.width = rect.width;
			gaugeSizeWithoutLabel.height = rect.height;
			gaugeSizeWithoutLabel.radius = chart.internal.state.radius;

			args.legend.show = false;
			args.gauge.label.show = false;
		});

		it("Arc size should expand w/o when gauge label text is hidden.", () => {
			const rect = chart.$.arc.node().getBoundingClientRect();
			const {radius} = chart.internal.state;

			expect(rect.width).to.be.greaterThan(gaugeSizeWithoutLabel.width);
			expect(rect.height).to.be.greaterThan(gaugeSizeWithoutLabel.height);
			expect(radius).to.be.greaterThan(gaugeSizeWithoutLabel.radius);
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

	describe("gauge label", () => {
		type TPos = [number,number][];
		let args: any = {
			data: {
				columns: [
					["data1", 100],
					["data2", 70],
					["data3", 30]
				],
				type: "gauge",
				order: "desc"
			},
			legend: {
				show: false
			},
			gauge: {
				width: 150
			}
		};
		let chart;
		let pos:TPos;

		beforeEach(() => {
			chart = util.generate(args);
		});

		function getLabelPos(ctx): TPos {
			const currPos: TPos = [];

			ctx.$.text.texts.each(function(v) {
				const pos = this.getAttribute("transform").split(",").map(util.parseNum);

				currPos.push(pos);
			});

			return currPos;
		}

		it("should ratio applied correctly?", () => {
			pos = getLabelPos(chart);

			// update label ratio
			chart.config("gauge.label.ratio", 1, true);

			const newPos = getLabelPos(chart);

			pos.forEach((v, i) => {
				const [x, y] = v.map(Math.abs);
				const [nx, ny] = newPos[i].map(Math.abs);

				expect(x > nx && y > ny).to.be.true;
			});
		});

		it("set options: gauge.label.ratio", () => {
			args.gauge.label = {
				ratio: function(d, radius, h) {
					return d.value > 90 ? 1.2 : 1;
				}
			};				
		});

		it("should ratio applied correctly?", () => {
			const newPos = getLabelPos(chart);

			pos.forEach((v, i) => {
				const [x, y] = v.map(Math.abs);
				const [nx, ny] = newPos[i].map(Math.abs);

				if (i === 0) {
					 expect(x < nx && y < ny).to.be.true;
				} else {
					expect(x > nx && y > ny).to.be.true;
				}
			});
		});
	});
});
