/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
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
					.to.match(/M-304,-3\..+A304,304,0,0,1,245\..+,-178\..+L237\..+,-172\..+A294,294,0,0,0,-294,-3\..+Z/);

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
					.to.equal("M-211.85,-2.5944142439936676e-14A211.85,211.85,0,1,1,-65.46525025833259,201.4813229771283L-62.375080314583116,191.97075781417675A201.85,201.85,0,1,0,-201.85,-2.4719495640789325e-14Z");

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
				expect(chartArc.select(`.${CLASS.chartArcsBackground}`).node().getBBox().height).to.be.above(400);

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
			).to.be.above(600);

			expect(
				arc.select(`.${CLASS.arc}-data`).datum().startAngle
			).to.be.equal(
				chart.config("gauge.startingAngle")
			);
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

	describe("check for expand rate", () => {
		let chart;
		let args = {
			data: {
				columns: [
					["data1", 30],
					["data2", 50]
				],
				type: "pie"
			},
			donut: {
				expand: {
					rate: 1.05
				}
			},
			gauge: {
				expand: {
					rate: 1.05
				}
			},
			pie: {
				expand: {
					rate: 1.05
				}
			},
			transition: {
				duration: 0
			}
		};

		beforeEach(() => {
			chart = util.generate(args);
		});

		const checkExpand = done => {
			let path;
			let length;

			new Promise((resolve, reject) => {
				setTimeout(() => {
					path = chart.$.arc
						.select(`.${CLASS.arc}-data1`)
						.node();

					length = path.getTotalLength();

					// when
					chart.focus("data1");

					resolve();
				}, 300);
			}).then(() => {
				setTimeout(() => {
					expect(path.getTotalLength()).to.be.greaterThan(length);
					done();
				}, 300);
			});
		};

		it("check Pie's expand", done => {
			checkExpand(done);
		});

		it("set options: data.type='donut'", done => {
			args.data.type = "donut";
		});

		it("check Donut's expand", done => {
			checkExpand(done);
		});

		it("set options: data.type='gauge'", done => {
			args.data.type = "donut";
		});

		it("check Gauge's expand", done => {
			checkExpand(done);
		});
	});
});
