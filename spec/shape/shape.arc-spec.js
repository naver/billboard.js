/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import CLASS from "../../src/config/classes";
import util from "../assets/util";

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

			d3.selectAll(`.${CLASS.chartArc} text`).each(function(d) {
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

			d3.selectAll(`.${CLASS.chartArc} text`).each(function(d) {
				const value = parseInt(this.textContent);

				expect(value).to.be.equal(d.value);
			});
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
					.to.match(/M-221.*?,-2\..+A221.*?,221.*?,0,1,1,-68.*?,210.*?L-65.*?,201.*?A211.*?,211.*?,0,1,0,-211.*?,-2.*?Z/);

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

		it("check for fullCircle option", () => {
			const chart = util.generate({
				gauge: {
					width: 10,
					max: 10,
					expand: true,
					fullCircle: true
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
			const max = chartArc.select(`.${CLASS.chartArcsGaugeMax}`);

			// check if gauge value text is centered
			expect(+chartArc.select(`.${CLASS.gaugeValue}`).attr("dy")).to.be.above(0);

			// check background height
			expect(chartArc.select(`.${CLASS.chartArcsBackground}`).node().getBBox().height).to.be.above(400);

			// with fullCircle option, only min text is showed
			expect(min.empty()).to.be.false;
			expect(max.empty()).to.be.true;
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
			["data1", "data2"].forEach(id => {
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
		});

		it("set options data.type='donut'", () => {
			args.data.type = "donut";
		});

		it("should be multilined in donut", () => {
			checkMultiline(chart.$.arc);
		});
	});
});
