/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import sinon from "sinon";
import {select as d3Select} from "d3-selection";
import {selectAll as d3SelectAll} from "d3-selection";
import CLASS from "../../src/config/classes";
import util from "../assets/util";
import {getBoundingRect} from "../../src/module/util";

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
				// @ts-ignore
				const value = parseInt(this.textContent);

				// @ts-ignore
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
			expect(internal.state.innerRadius).to.be.equal(innerRadius);

			d3SelectAll(`.${CLASS.chartArc} text`).each(function(d) {
				// @ts-ignore
				const value = parseInt(this.textContent);

				// @ts-ignore
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

			expect(chart.internal.state.innerRadius).to.be.deep.equal(innerRadius);

			setTimeout(() => {
				chart.$.arc.selectAll("path").each(function(d) {
					expect(this.getAttribute("d")).to.be.equal(expected[d.data.id]);
				});

				done();
			}, 500);
		});
	});

	describe("Check position & data label text", () => {
		it("check for Pie's threshold data label text", done => {
			const chart = util.generate({
				data: {
				columns: [
					["data1", 10],
					["data2", 30],
					["data3", 60]
				],
				type: "pie"
				},
				pie: {
				label:{
					threshold: 0.2
				}
				}
			});

			const checkText = () => {
				chart.$.arc.selectAll("text").each(function(d, i) {
					expect(this.textContent).to.be.equal(expectedText[i]);
				});
			};

			let expectedText = ["", "30.0%", "60.0%"];

			checkText();

			new Promise((resolve, reject) => {
				// when
				chart.toggle("data3");
				expectedText = ["25.0%", "75.0%", ""];

				setTimeout(() => {
					checkText();
					resolve();
				}, 200);
			}).then(() => {
				// when
				chart.toggle("data3");
				expectedText = ["", "30.0%", "60.0%"];

				setTimeout(() => {
					checkText();
					done();
				}, 200);
			});
		});

		it("check if Pie's size adjusts when legend is positioned to right.", () => {
			const chart = util.generate({
				data: {
					columns: [
						["data1-very very very very very very very very very very long name", 30],
						["data2", 120]
					],
					type: "pie",
				},
				legend: {
					position: "right"
				}
			});

			const {arcWidth, arcHeight} = chart.internal.state;

			expect(arcWidth).to.be.closeTo(284, 5);
			expect(arcHeight).to.be.closeTo(476, 5);
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
