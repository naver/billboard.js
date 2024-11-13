/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import {selectAll as d3SelectAll} from "d3-selection";
import {$ARC, $COMMON, $LEGEND, $SHAPE} from "../../src/config/classes";
import util from "../assets/util";

describe("SHAPE ARC", () => {
	let chart;
	const selector = {
		arc: `.${$ARC.chartArc}.${$COMMON.target}.${$COMMON.target}`,
		shapes: `g.${$SHAPE.shapes}.${$ARC.arcs}.${$ARC.arcs}`,
		shape: `path.${$SHAPE.shape}.${$ARC.arc}.${$ARC.arc}`
	};

	// afterAll(() => {
	// 	util.destroyAll();
	// });

	describe("show pie chart", () => {
		let instChart;

		beforeAll(() => {
			return new Promise((resolve) => {
				instChart = util.generate({
					data: {
						columns: [
							["data1", 30],
							["data2", 150],
							["data3", 120]
						],
						type: "pie"
					},
					onrendered: resolve
				});
			});
		});

		it("should have correct classes", () => {
			const chartArc = instChart.$.main.select(`.${$ARC.chartArcs}`);
			const selector = {
				arc: `.${$ARC.chartArc}.${$COMMON.target}.${$COMMON.target}`,
				shapes: `g.${$SHAPE.shapes}.${$ARC.arcs}.${$ARC.arcs}`,
				shape: `path.${$SHAPE.shape}.${$ARC.arc}.${$ARC.arc}`
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
			const main = instChart.$.main;

			expect(main.select(`.${$ARC.arc}-data1`).attr("d"))
			 	.to.be.equal("M-124.522,-171.39A211.85,211.85,0,0,1,0,-211.85L0,0Z");

			
			expect(main.select(`.${$ARC.arc}-data2`).attr("d"))
				.to.be.equal("M0,-211.85A211.85,211.85,0,0,1,0,211.85L0,0Z");
			
			expect(main.select(`.${$ARC.arc}-data3`).attr("d"))
				.to.be.equal("M0,211.85A211.85,211.85,0,0,1,-124.522,-171.39L0,0Z");
		});

		it("check when hiding data", () => {
			const arc = instChart.$.arc;
			let total = 0;

			// when
			instChart.hide("data1");

			instChart.data.shown().map(v => v.id)
				.forEach(id => total += parseFloat(arc.select(`.${$COMMON.target}-${id} text`).text()));

			expect(total).to.be.equal(100);
		});

		it("should have correct d even if data id can be converted to a color", () => new Promise(done => {
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
				expect(chart.$.main.select(`.${$ARC.arc}-black`).attr("d"))
					.to.be.equal("M-124.522,-171.39A211.85,211.85,0,0,1,0,-211.85L0,0Z");

				done(1);
			}, 300);
		}));
	});

	describe("Check attribute", () => {
		let instChart;

		beforeAll(() => {
			return new Promise((resolve) => {
				instChart = util.generate({
					data: {
						columns: [
							["data1", null],
							["data2", null],
							["data3", null]
						],
						type: "pie"
					},
					onrendered: resolve
				});
			});
		});

		it("should have correct d attribute", () => {
			const chartArc = instChart.$.main.select(`.${$ARC.chartArcs}`);
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
			expect(chart.$.main.selectAll(`text.${$ARC.chartArcsTitle} tspan`).size()).to.be.equal(3);

			d3SelectAll(`.${$ARC.chartArc} text`).each(function(d) {
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

			d3SelectAll(`.${$ARC.chartArc} text`).each(function(d) {
				// @ts-ignore
				const value = parseInt(this.textContent);

				// @ts-ignore
				expect(value).to.be.equal(d.value);
			});
		});

		it("check for variant innerRadius", () => new Promise(done => {
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

			const expectedPath = {
				data1: "M0,211.85A211.85,211.85,0,0,1",
				data2: "M0,-211.85A211.85,211.85,0,1,1,0,211.85",
				data3: "M-201.481,-65.465A211.85,211.85,0,0,1,0,-211.85L0,0"
			};
			
			expect(chart.internal.state.innerRadius).to.be.deep.equal(innerRadius);

			setTimeout(() => {
				chart.$.arc.selectAll("path").each(function(d) {
					expect(this.getAttribute("d").indexOf(expectedPath[d.data.id]) > -1).to.be.ok;
				});
				done(1);
			}, 300);
		}));

		it("check for outerRadius", () => new Promise(done => {
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
					outerRadius: 100
				}
			});

			setTimeout(() => {
				const rect = chart.$.arc.node().getBoundingClientRect();

				expect(rect.width).to.be.below(337);
				expect(rect.height).to.be.below(249);
				expect(rect.width).to.be.closeTo(rect.height, 1);

				expect(chart.internal.state.outerRadius).to.be.equal(chart.config("pie.outerRadius"));

				done(1);
			}, 300);
		}));

		it("check for variant outerRadius", () => new Promise(done => {
			const outerRadius = {
				data1: 120,
				data2: 80
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
					outerRadius
				}
			});

			const expectedPath = {
				data1: "M0,120A120,120,0,0,1,-114.127,-37.082L0,0Z",
				data2: "M0,-80A80,80,0,1,1,0,80L0,0Z",
				data3: "M-201.481,-65.465A211.85,211.85,0,0,1,0,-211.85L0,0Z"
			};
			const expectedTextPos = {
				data1: "translate(-77.665631459995,56.42738422007736)",
				data2: "translate(58.00000000000001,1.2878587085651817e-14)",
				data3: "translate(-99.61784455852826,-137.1122002066662)"
			};

			setTimeout(() => {
				chart.$.arc.selectAll("path").each(function(d) {
					expect(this.getAttribute("d")).to.be.equal(expectedPath[d.data.id]);
				});

				chart.$.text.texts.each(function(d) {
					expect(this.getAttribute("transform")).to.be.equal(expectedTextPos[d.data.id]);
				});

				done(1);
			}, 300);
		}));
	});

	describe("Check position & data label text", () => {
		it("check for Pie's threshold data label text", () => new Promise(done => {
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
					resolve(undefined);
				}, 200);
			}).then(() => {
				// when
				chart.toggle("data3");
				expectedText = ["", "30.0%", "60.0%"];

				setTimeout(() => {
					checkText();
					done(1);
				}, 200);
			});
		}));

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

		beforeAll(() => {
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

		it("should interact properly for mouseover & mouseout", () => new Promise(done => {
			setTimeout(() => {
				const path = chart.$.main.select(`path.${$ARC.arc}-data2`).node();

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
				done(1);
			}, 300);
		}));
	});

	describe("check for 0 or null value rendering", () => {
		let chart;

		beforeAll(() => {
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
				const rect = chart.$.arc.select(`.${$ARC.arc}-${id}`).node().getBBox();

				expect(rect.width === 0).to.be.true;
				// expect(rect.height === 0).to.be.true;
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
			done && done(1);
		};

		it("check for two lined text position", () => new Promise(done => {
			setTimeout(() => {
				checkAtMiddle(done);
			}, 100);
		}));

		it("set option args.donut.title", () => {
			args.donut.title = "Title 1\nTitle 2\nTitle 3";
		});

		it("check for three lined text position", () => new Promise(done => {
			setTimeout(() => {
				checkAtMiddle(done);
			}, 100);
		}));
	});

	describe("check for data loading", () => {
		it("Interaction of chart when initialized with 0 and .load()", () => new Promise(done => {
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
					done() {
						const legend = chart.$.legend.select(`.${$LEGEND.legendItem}-data2`).node();

						util.fireEvent(legend, "mouseover");
						util.fireEvent(legend, "mouseout");

						setTimeout(() => {
							chart.$.arc.selectAll("path").each(function() {
								const rect = this.getBoundingClientRect();

								expect(this.getAttribute("d")).to.not.be.equal("M 0 0");
								expect(rect.width > 0 && rect.height > 0).to.be.true;
							});

							done(1);
						}, 300);
					}
				});
			}, 300);
		}));
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

		it("check Pie's startingAngle", () => new Promise(done => {
			const expectedPath = [
				"M-134.17,163.948A211.85,211.85,0,0,1,-114.463,-178.266L0,0Z",
				"M178.266,-114.463A211.85,211.85,0,0,1,-134.17,163.948L0,0Z",
				"M-114.463,-178.266A211.85,211.85,0,0,1,178.266,-114.463L0,0Z"
			];

			setTimeout(() => {
				chart.$.arc.selectAll("path").each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expectedPath[i]);
				});

				done(1);
			}, 100);
		}));

		it("set options data.type=donut", () => {
			args.data.type = "donut";
		});

		it("check Donut's startingAngle", () => new Promise(done => {
			const expectedPath = [
				"M-39.144,208.202A211.85,211.85,0,0,1,-185.916,-101.566L-111.55,-60.94A127.11,127.11,0,0,0,-23.486,124.921Z",
				"M101.566,-185.916A211.85,211.85,0,0,1,-39.144,208.202L-23.486,124.921A127.11,127.11,0,0,0,60.94,-111.55Z",
				"M-185.916,-101.566A211.85,211.85,0,0,1,101.566,-185.916L60.94,-111.55A127.11,127.11,0,0,0,-111.55,-60.94Z"
			];

			setTimeout(() => {
				chart.$.arc.selectAll("path").each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expectedPath[i]);
				});

				done(1);
			}, 100);
		}));
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
						.select(`.${$ARC.arc}-data1`)
						.node();

					length = path.getTotalLength();

					// when
					chart.focus("data1");

					resolve(undefined);
				}, 300);
			}).then(() => {
				setTimeout(() => {
					expect(path.getTotalLength()).to.be.greaterThan(length);
					done(1);
				}, 300);
			});
		};

		it("check Pie's expand", () => new Promise(done => {
			checkExpand(done);
		}));

		it("set options: data.type='donut'", () => {
			args.data.type = "donut";
		});

		it("check Donut's expand", () => new Promise(done => {
			checkExpand(done);
		}));

		it("set options: data.type='gauge'", () => {
			args.data.type = "donut";
		});

		it("check Gauge's expand", () => new Promise(done => {
			checkExpand(done);
		}));
	});

	describe("Arc options", () => {
		let instChart;
		let args = {
			data: {
				columns: [
					["data1", 30],
					["data2", 45],
					["data3", 25]
				],
				type: "donut"
			},
			arc: {
				cornerRadius: 25
			}
		};

		beforeEach(() => {
			return new Promise(resolve => {
				args.onrendered = resolve;
				instChart = util.generate(args);
			});
		});

		it("check the corner radius applied correctly.", () => {
			const expected = [
				['M57.221,176.107', '25,25,0,0,1,37.919,208.429'],
				['M0,-185.17', '25,25,0,0,1,28.345,-209.945'],
				['M-185.17,0', '25,25,0,0,1,-209.945,-28.345']
			];

			instChart.$.arc.selectAll("path").each(function(d, i) {
				const path = this.getAttribute("d").split("A").splice(0, 2);

				expect(path).to.be.deep.equal(expected[i]);
			});
		});

		it("set option: ratio", () => {
			args.arc.cornerRadius = {
				ratio: 0.2
			};
		});

		it("check the corner radius in 'ratio' value, applied correctly.", () => new Promise(done => {
			const expected = [
				['M28.424,87.481', '23.75,23.75,0,0,1,7.296,118.526'],
				['M0,-91.983', '23.75,23.75,0,0,1,29.688,-114.979'],
				['M-91.983,0', '23.75,23.75,0,0,1,-114.979,-29.688']
			];

			// when resizes
			instChart.resize({width: 250});

			setTimeout(() => {
				instChart.$.arc.selectAll("path").each(function(d, i) {
					const path = this.getAttribute("d").split("A").splice(0, 2);

					expect(path).to.be.deep.equal(expected[i]);
				});

				done(1);
			}, 300);
		}));

		it("set option: function", () => {
			args.arc.cornerRadius = function(id, value, outerRadius) {
				return ({
					data1: outerRadius * 0.1,
					data2: value > 45 ? outerRadius * 0.5 : 0,
					data3: 60
				})[id];
			};
		});

		it("check the corner radius with 'function', applied correctly.", () => {
			const expected = [
				['M58.554,180.21', '21.185,21.185,0,0,1,42.673,207.508'],
				['M0,-211.85', '211.85,211.85,0,0,1,65.465,201.481L39.279,120.889'],
				['M-164.098,0', '42.37,42.37,0,0,1,-205.123,-52.963']
			];

			instChart.$.arc.selectAll("path").each(function(d, i) {
				const path = this.getAttribute("d").split("A").splice(0, 2);

				expect(path).to.be.deep.equal(expected[i]);
			});
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data3", 25]
					],
					type: "pie"
				},
				arc: {
					cornerRadius: {
						ratio: 0.7
					}
				}, 
				pie: {
					expand: {
						duration: 300
					}
				}
			};
		});

		it("should exapnd Arc shape correctly on transition.", () => new Promise(done => {
			const {arc} = instChart.$;
			const rx = /^[01]$/;
			let i = 0;

			// when
			instChart.tooltip.show({ index: 0});

			const interval = setInterval(function() {
				if (i > 10) {
					clearInterval(interval);
					done(1);
				}

				const arcCommand = arc.select(`.${$ARC.arc}-data1`)
					.attr("d")
					.replace(/(M[^A]+|,\d+Z)/g, "") // extract Arc command only from path
					.split("A");
					
				arcCommand.forEach(v => {
					const param = v.split(",");

					// Arc params formed as:
					// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
					// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
					if (param.length === 7) {
						// 'large-arc-flag' and 'sweep-flag' should be 0 or 1
						expect(rx.test(param[2])).to.be.true;
						expect(rx.test(param[3])).to.be.true;
					}
				});

				i++;
			}, 15);
		}));

		it("when colorish string value is used as data name", () => new Promise(done => {
			const chart = util.generate({
				data: {
					columns: [
						["data1", 30],
						["red", 120]
					],
					type: "donut"
				},
				onafterinit: function() {
					setTimeout(() => {
						this.focus("red");
					}, 300);
			
					setTimeout(() => {
						const d = this.$.arc.select(".bb-arc-red").attr("d");
			
						// shape shouldn't be an empty path
						expect(d).to.not.be.equal("M 0 0");

						done(1);
					}, 300);
				}
			});			
		}));
	});
});
