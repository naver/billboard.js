/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {select as d3Select} from "d3-selection";
import {selectAll as d3SelectAll} from "d3-selection";
import CLASS from "../../src/config/classes";
import util from "../assets/util";
import {getBoundingRect} from "../../src/internals/util";

describe("SHAPE ARC", () => {
	const selector = {
		arc: `.${CLASS.chartArc}.${CLASS.target}.${CLASS.target}`,
		shapes: `g.${CLASS.shapes}.${CLASS.arcs}.${CLASS.arcs}`,
		shape: `path.${CLASS.shape}.${CLASS.arc}.${CLASS.arc}`
	};

	describe("show pie chart", () => {
		const chart = util.generate({
			data: {
				columns: [
					["data1", 30],
					["data2", 150],
					["data3", 120]
				],
				type: "pie"
			}
		});

		it("should have correct classes", () => {
			const chartArc = chart.$.main.select(`.${CLASS.chartArcs}`);
			const selector = {
				arc: `.${CLASS.chartArc}.${CLASS.target}.${CLASS.target}`,
				shapes: `g.${CLASS.shapes}.${CLASS.arcs}.${CLASS.arcs}`,
				shape: `path.${CLASS.shape}.${CLASS.arc}.${CLASS.arc}`
			}

			const arcs = {
				data1: chartArc.select(`${selector.arc}-data1`)
					.select(`${selector.shapes}-data1`)
					.select(`${selector.shape}-data1`),
				data2: chartArc.select(`${selector.arc}-data2`)
					.select(`${selector.shapes}-data2`)
					.select(`${selector.shape}-data2`),
				data3: chartArc.select(`${selector.arc}-data3`)
					.select(`${selector.shapes}-data3`)
					.select(`${selector.shape}-data3`)
			};

			expect(arcs.data1.size()).to.be.equal(1);
			expect(arcs.data2.size()).to.be.equal(1);
			expect(arcs.data3.size()).to.be.equal(1);
		});

		it("should have correct d", () => {
			const main = chart.$.main;

			expect(main.select(`.${CLASS.arc}-data1`).attr("d"))
				.to.match(/M-124\..+,-171\..+A211\..+,211\..+,0,0,1,-3\..+,-211\..+L0,0Z/);

			expect(main.select(`.${CLASS.arc}-data2`).attr("d"))
				.to.match(/M1\..+,-211\..+A211\..+,211\..+,0,0,1,1\..+,211\..+L0,0Z/);

			expect(main.select(`.${CLASS.arc}-data3`).attr("d"))
				.to.match(/M1\..+,211\..+A211\..+,211\..+,0,0,1,-124\..+,-171\..+L0,0Z/);
		});

		it("check when hiding data", () => {
			const arc = chart.$.arc;
			let total = 0;

			// when
			chart.hide("data1");

			chart.data.shown().map(v => v.id)
				.forEach(id => total += parseFloat(arc.select(`.${CLASS.target}-${id} text`).text()));

			expect(total).to.be.equal(100);
		});

		it("should have correct d even if data id can be converted to a color", done => {
			const chart = util.generate({
				data: {
					columns: [
						["black", 30],
						["data2", 150],
						["data3", 120]
					],
					type: "pie"
				}
			});

			setTimeout(() => {
				expect(chart.$.main.select(`.${CLASS.arc}-black`).attr("d"))
					.to.match(/M-124\..+,-171\..+A211\..+,211\..+,0,0,1,-3\..+,-211\..+L0,0Z/);

				done();
			}, 500);
		});
	});

	describe("Check attribute", () => {
		const chart = util.generate({
			data: {
				columns: [
					["data1", null],
					["data2", null],
					["data3", null]
				],
				type: "pie"
			}
		});

		it("should have correct d attribute", () => {
			const chartArc = chart.$.main.select(`.${CLASS.chartArcs}`);
			const arcs = {
				data1: chartArc.select(`${selector.arc}-data1`)
					.select(`${selector.shapes}-data1`)
					.select(`${selector.shape}-data1`),
				data2: chartArc.select(`${selector.arc}-data2`)
					.select(`${selector.shapes}-data2`)
					.select(`${selector.shape}-data2`),
				data3: chartArc.select(`${selector.arc}-data3`)
					.select(`${selector.shapes}-data3`)
					.select(`${selector.shape}-data3`)
			};

			expect(arcs.data1.attr("d").indexOf("NaN")).to.be.equal(-1);
			expect(arcs.data2.attr("d").indexOf("NaN")).to.be.equal(-1);
			expect(arcs.data3.attr("d").indexOf("NaN")).to.be.equal(-1);
		});

		it("check for donut's options", () => {
			const value = 0.05;
			const chart = util.generate({
				data: {
					columns: [
						["data1", 60],
						["data2", 40]
					],
					type: "donut"
				},
				donut: {
					title: "text1\ntext2\ntext3",
					padAngle: value
				}
			});

			expect(chart.internal.pie.padAngle()()).to.be.equal(value);
			expect(chart.$.main.selectAll(`text.${CLASS.chartArcsTitle} tspan`).size()).to.be.equal(3);

			d3SelectAll(`.${CLASS.chartArc} text`).each(function(d) {
				const value = parseInt(this.textContent);

				expect(value).to.be.equal(d.value);
			});
		});

		it("check for padding and innerRadius", () => {
			const padding = 5;
			const innerRadius = 20;
			const chart = util.generate({
				data: {
					columns: [
						["data1", 60],
						["data2", 40]
					],
					type: "pie"
				},
				pie: {
					padding,
					innerRadius,
					format: value => `$$\n${value}`
				}
			});
			const internal = chart.internal;

			expect(internal.pie.padAngle()()).to.be.equal(padding * 0.01);
			expect(internal.innerRadius).to.be.equal(innerRadius);

			d3SelectAll(`.${CLASS.chartArc} text`).each(function(d) {
				const value = parseInt(this.textContent);

				expect(value).to.be.equal(d.value);
			});
		});

		it("check for variant innerRadius", done => {
			const innerRadius = {
				data1: 50,
				data2: 80,
				data3: 0
			};
			const chart = util.generate({
				data: {
					columns: [
						["data1", 30],
						["data2", 50],
						["data3", 20]
					],
					type: "pie"
				},
				pie: {
					innerRadius
				}
			});

			const expected = {
				data1: "M-8.110822788676742e-14,211.85A211.85,211.85,0,0,1,-201.48132297712823,-65.46525025833276L-47.55282581475767,-15.450849718747406A50,50,0,0,0,-1.9142843494634746e-14,50Z",
				data2: "M1.2972071219968338e-14,-211.85A211.85,211.85,0,1,1,-8.110822788676742e-14,211.85L-3.06285495914156e-14,80A80,80,0,1,0,4.898587196589413e-15,-80Z",
				data3: "M-201.48132297712823,-65.46525025833276A211.85,211.85,0,0,1,1.4924438455356651e-13,-211.85L0,0Z"
			};

			expect(chart.internal.innerRadius).to.be.deep.equal(innerRadius);

			setTimeout(() => {
				chart.$.arc.selectAll("path").each(function(d) {
					expect(this.getAttribute("d")).to.be.equal(expected[d.data.id]);
				});

				done();
			}, 500);
		});
	});

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
					.to.match(/M-258.*?,-3\..+A258.*?,258.*?,0,0,1,209.*?,-151.*?L200.*?,-146.*?A248.*?,248.*?,0,0,0,-248.*?,-3.*?Z/);

				expect(chartArc.select(`.${CLASS.gaugeValue}`).attr("dy")).to.be.equal("-.1em");

				done();
			}, 500);
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
					.to.equal("M-180.07249999999996,-2.2052521073946173e-14A180.07249999999996,180.07249999999996,0,1,1,-55.645462719582696,171.259124530559L-52.55529277583322,161.74855936760747A170.07249999999996,170.07249999999996,0,1,0,-170.07249999999996,-2.0827874274798818e-14Z");

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
				expect(chartArc.select(`.${CLASS.chartArcsBackground}`).node().getBBox().height).to.be.above(300);

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
				}
			});

			const expected = [
				"M-258.4,-3.16448732899676e-14A258.4,258.4,0,0,1,-233.96782456822908,-109.6796109895106L-140.38069474093746,-65.80776659370636A155.04,155.04,0,0,0,-155.04,-1.8986923973980563e-14Z",
				"M-233.96782456822908,-109.6796109895106A258.4,258.4,0,0,1,83.43229659294165,-244.56003738392624L50.059377955765,-146.73602243035575A155.04,155.04,0,0,0,-140.38069474093746,-65.80776659370636Z",
				"M83.43229659294165,-244.56003738392624A258.4,258.4,0,0,1,192.4491320209932,-172.43518081982668L115.46947921259591,-103.46110849189601A155.04,155.04,0,0,0,50.059377955765,-146.73602243035575Z",
				"M192.4491320209932,-172.43518081982668A258.4,258.4,0,0,1,241.34976249649037,-92.30846192461274L144.80985749789423,-55.38507715476765A155.04,155.04,0,0,0,115.46947921259591,-103.46110849189601Z",
				"M241.34976249649037,-92.30846192461274A258.4,258.4,0,0,1,258.4,-5.737632591262808e-14L155.04,-3.442579554757685e-14A155.04,155.04,0,0,0,144.80985749789423,-55.38507715476765Z"
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
				"M-79.84999134648639,-245.75300381066768A258.4,258.4,0,0,1,1.58224366449838e-14,-258.4L9.493461986990282e-15,-155.04A155.04,155.04,0,0,0,-47.909994807891835,-147.4518022864006Z",
				"M-258.4,-3.16448732899676e-14A258.4,258.4,0,0,1,-79.84999134648639,-245.75300381066768L-47.909994807891835,-147.4518022864006A155.04,155.04,0,0,0,-155.04,-1.8986923973980563e-14Z"
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
				type: "gauge"
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

		it("if only one data_column is visible the label transform should be empty", done => {
			const arc = chart.$.main;
			const textBeforeHide = arc.select(`${selector.arc}-padded4 text`);
			expect(textBeforeHide.attr("transform")).not.to.be.equal("");
			chart.hide(["padded1", "padded2", "padded3"]);
			setTimeout(function() {
				const textAfterHide = chart.internal.main.select(`${selector.arc}-padded4 text`);
				expect(textAfterHide.attr("transform")).to.be.equal("");
				done();
			}, 1000);
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
	});

	describe("check for interaction", () => {
		let chart;
		const spyOver = sinon.spy();
		const spyOut = sinon.spy();

		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30],
						["data2", 150],
						["data3", 120]
					],
					type: "pie",
					onover: spyOver,
					onout: spyOut
				}
			});
		});

		/*beforeEach(() => {
			spyOver.resetHistory();
			spyOut.resetHistory();
		});*/

		it("should interact properly for mouseover & mouseout", done => {
			setTimeout(() => {
				const path = chart.$.main.select(`path.${CLASS.arc}-data2`).node();

				util.fireEvent(path, "mouseover", {
					clientX: 500,
					clientY: 200
				}, chart);

				util.fireEvent(path, "mouseout", {
					clientX: 0,
					clientY: 0
				}, chart);

				expect(spyOver.calledOnce).to.be.true;
				expect(spyOut.calledOnce).to.be.true;

				expect(chart.$.tooltip.select(".value").text()).to.be.equal("50.0%");
				done();
			}, 500);
		});
	});

	describe("check for 0 or null value rendering", () => {
		let chart;

		before(() => {
			chart = util.generate({
				data: {
					columns: [["data1", 100], ["data2", 0], ["data3", null]],
					type: "donut"
				},
				donut: {
					title: "Iris Petal Width"
				}
			});
		});

		it("the dimension should be 0x0", () => {
			["data2", "data3"].forEach(id => {
				const rect = chart.$.arc.select(`.${CLASS.arc}-${id}`).node().getBBox();

				expect(rect.width === 0).to.be.true;
				expect(rect.height === 0).to.be.true;
			});
		});
	});

	describe("check for multiline label format", () => {
		const labelFormat = {
			label: { format: value => `$$\n${value}` }
		};
		let chart;
		let args = {
			data: {
				columns: [
					["data1", 60],
					["data2", 40]
				],
				type: "pie"
			},
			pie: labelFormat,
			donut: labelFormat
		};

		const checkMultiline = arc => {
			arc.selectAll("text").each(function() {
				expect(this.querySelectorAll("tspan").length).to.be.equal(2);
			});
		}

		beforeEach(() => {
			chart = util.generate(args);
		});

		it("should be multilined in pie", () => {
			checkMultiline(chart.$.arc);

			chart.toggle("data1");
			chart.toggle("data1");

			checkMultiline(chart.$.arc);
		});

		it("set options data.type='donut'", () => {
			args.data.type = "donut";
		});

		it("should be multilined in donut", () => {
			checkMultiline(chart.$.arc);
		});
	});

	describe("check for multiline text position", () => {
		let chart;
		let args = {
			data: {
				columns: [
					["data1", 50],
					["data2", 50]
				],
				type: "donut"
			},
			donut: {
				title: "Title 1\nTitle 2"
			}
		};

		beforeEach(() => {
			chart = util.generate(args);
		});

		const checkAtMiddle = done => {
			const arc = chart.$.arc.node().getBoundingClientRect();
			const title = chart.$.arc.select("text").node().getBoundingClientRect();

			const titlePos = title.top - arc.top + (title.height / 2);

			expect(titlePos).to.be.closeTo(arc.height / 2, 2);
			done && done();
		};

		it("check for two lined text position", done => {
			setTimeout(() => {
				checkAtMiddle(done);
			}, 100);
		});

		it("set option args.donut.title", () => {
			args.donut.title = "Title 1\nTitle 2\nTitle 3";
		});

		it("check for three lined text position", done => {
			setTimeout(() => {
				checkAtMiddle(done);
			}, 100);
		});
	});

	describe("check for data loading", () => {
		it("Interaction of chart when initialized with 0 and .load()", done => {
			const chart = util.generate({
				data: {
				columns: [
					["data1", 0],
					["data2", 0],
				],
				type: "pie",
				}
			});

			setTimeout(function() {
				chart.load({
					columns: [
						["data1", 3],
						["data2", 6],
					],
					done: () => {
						const legend = chart.$.legend.select(`.${CLASS.legendItem}-data2`).node();

						util.fireEvent(legend, "mouseover");
						util.fireEvent(legend, "mouseout");

						setTimeout(() => {
							chart.$.arc.selectAll("path").each(function() {
								const rect = this.getBoundingClientRect();

								expect(this.getAttribute("d")).to.not.be.equal("M 0 0");
								expect(rect.width > 0 && rect.height > 0).to.be.true;
							});

							done();
						}, 1000);
					}
				});
			}, 1000);
		});
	});

	describe("check for startingAngle", () => {
		let chart;
		let args = {
			data: {
				columns: [
					["data1", 30],
					["data2", 45],
					["data3", 25]
				],
				type: "pie"
			},
			donut: {
				startingAngle: 0.5
			},
			pie: {
				startingAngle: 1
			}
		};

		beforeEach(() => {
			chart = util.generate(args);
		});

		it("check Pie's startingAngle", done => {
			const expectedPath = [
				"M-134.1696615971501,163.9479319994803A211.85,211.85,0,0,1,-114.46304349816526,-178.26562813155297L0,0Z",
				"M178.26562813155286,-114.46304349816538A211.85,211.85,0,0,1,-134.1696615971501,163.9479319994803L0,0Z",
				"M-114.46304349816526,-178.26562813155297A211.85,211.85,0,0,1,178.26562813155294,-114.46304349816526L0,0Z"
			];

			setTimeout(() => {
				chart.$.arc.selectAll("path").each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expectedPath[i]);
				});

				done();
			}, 100);
		});

		it("set options data.type=donut", () => {
			args.data.type = "donut";
		});

		it("check Donut's startingAngle", done => {
			const expectedPath = [
				"M-39.144129750495274,208.2022084562899A211.85,211.85,0,0,1,-185.91586573647538,-101.56630035330055L-111.54951944188521,-60.93978021198032A127.10999999999999,127.10999999999999,0,0,0,-23.486477850297163,124.92132507377393Z",
				"M101.56630035330042,-185.91586573647544A211.85,211.85,0,0,1,-39.144129750495274,208.2022084562899L-23.486477850297163,124.92132507377393A127.10999999999999,127.10999999999999,0,0,0,60.93978021198024,-111.54951944188525Z",
				"M-185.91586573647538,-101.56630035330055A211.85,211.85,0,0,1,101.56630035330053,-185.91586573647538L60.93978021198031,-111.54951944188522A127.10999999999999,127.10999999999999,0,0,0,-111.54951944188521,-60.93978021198032Z"
			];

			setTimeout(() => {
				chart.$.arc.selectAll("path").each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expectedPath[i]);
				});

				done();
			}, 100);
		});
	});
});
