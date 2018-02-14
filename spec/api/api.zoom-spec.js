/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API zoom", function() {
	let chart;

	describe("zoom line chart #1", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("should be zoomed properly", () => {
			const target = [3, 5];

			chart.zoom(target);

			const domain = chart.internal.zoomScale.domain();

			expect(Math.round(domain[0])).to.be.equal(target[0]);
			expect(Math.round(domain[1])).to.be.equal(target[1]);
		});

		it("should be zoomed properly again", () => {
			const target = [1, 4];

			chart.zoom(target);

			const domain = chart.internal.zoomScale.domain();

			expect(Math.round(domain[0])).to.be.equal(target[0]);
			expect(Math.round(domain[1])).to.be.equal(target[1]);
		});

		it("should be zoomed and showing focus grid properly when target contained minus value", () => {
			const target = [-2, 3]; // zoom in cotaining minus value

			chart.zoom(target);

			const zoomScale = chart.internal.zoomScale;

			// If target contained minus value should not be null
			expect(zoomScale).to.not.be.null;

			const domain = chart.internal.zoomScale.domain();

			// domain value must be above than target
			expect(Math.round(domain[0])).to.be.above(target[0]);
			expect(Math.round(domain[1])).to.be.above(target[1]);
		});
	});

	describe("zoom line chart #2", () => {
		before(() => {
			chart = util.generate({
				data: {
					x: "date",
					columns: [
						["date", "2014-01-01", "2014-01-02", "2014-08-01", "2014-10-19"],
						["data1", 30, 200, 100, 400]
					]
				},
				axis: {
					x: {
						type: "timeseries"
					}
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("should be zoomed properly (new Date)", done => {
			const target = [new Date(2014, 7, 1), new Date(2014, 8, 1)];

			chart.zoom(target);

			setTimeout(() => {
				const domain = chart.internal.zoomScale.domain();

				expect(domain[0].getFullYear()).to.be.equal(target[0].getFullYear());
				expect(domain[0].getMonth()).to.be.equal(target[0].getMonth());
				expect(domain[0].getDate()).to.be.equal(target[0].getDate());
				expect(domain[1].getFullYear()).to.be.equal(target[1].getFullYear());
				expect(domain[1].getMonth()).to.be.equal(target[1].getMonth());
				expect(domain[1].getDate()).to.be.equal(target[1].getDate());

				done();
			}, 500);
		});

		it("should be zoomed properly (string)", done => {
			const target = ["2014-08-01", "2014-09-01"];

			chart.zoom(target);

			setTimeout(() => {
				const domain = chart.internal.zoomScale.domain();
				const targetDate = [chart.internal.parseDate(target[0]), chart.internal.parseDate(target[1])];

				expect(domain[0].getFullYear()).to.be.equal(targetDate[0].getFullYear());
				expect(domain[0].getMonth()).to.be.equal(targetDate[0].getMonth());
				expect(domain[0].getDate()).to.be.equal(targetDate[0].getDate());
				expect(domain[1].getFullYear()).to.be.equal(targetDate[1].getFullYear());
				expect(domain[1].getMonth()).to.be.equal(targetDate[1].getMonth());
				expect(domain[1].getDate()).to.be.equal(targetDate[1].getDate());

				done();
			}, 500)
		});
	});

	describe("zoom bar chart", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					],
					type: "bar"
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("should be zoomed properly", done => {
			const target = [3, 5];
			const bars = d3.select(`.${CLASS.chartBars}`).node();
			const rects = d3.select(`.${CLASS.eventRects}`).node();
			const rectlist = d3.selectAll(`.${CLASS.eventRect}`).nodes();
			const orgWidth = bars.getBoundingClientRect().width;
			const rectWidth = chart.internal.getEventRectWidth();

			chart.zoom(target);

			setTimeout(() => {
				rectlist.forEach(v => {
					expect(parseFloat(d3.select(v).attr("width"))).to.be.equal(rectWidth);
				});
				expect(bars.getBoundingClientRect().width/orgWidth).to.be.above(2.5);
				expect(rects.getBoundingClientRect().width/orgWidth).to.be.above(2.5);

				done();
			}, 500)
		});
	});

	describe("unzoom", () => {
		chart = util.generate({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				]
			},
			zoom: {
				enabled: true
			}
		});

		it("should be unzoomed properly", () => {
			const target = [1, 4];
			const orginal = chart.internal.x.domain();
			let domain;

			chart.zoom(target);

			domain = chart.internal.zoomScale.domain();

			expect(Math.round(domain[0])).to.be.equal(target[0]);
			expect(Math.round(domain[1])).to.be.equal(target[1]);

			chart.unzoom();

			domain = chart.internal.x.domain();

			expect(domain[0]).to.be.equal(orginal[0]);
			expect(domain[1]).to.be.equal(orginal[1]);
		});
	});

	describe("zoom.enable()", () => {
		chart = util.generate({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				]
			},
			zoom: {
				enabled: true
			}
		});

		it("should be disabled & enabled zoom", () => {
			const main = chart.internal.main;
			const domain = [1, 2];

			// when disable zoom
			chart.zoom.enable(false);

			const selector = `.${CLASS.eventRect}-1`;
			const xValue = +main.select(selector).attr("x");
			const tickTransform = [];

			main.selectAll(`.${CLASS.axisX} .tick`).each(function() {
				tickTransform.push(this.getAttribute("transform"));
			});

			// check the returned domain value
			chart.zoom(domain).forEach((v, i) => {
				expect(Math.round(v)).to.not.equal(domain[i]);
			});

			expect(+main.select(selector).attr("x")).to.be.equal(xValue);

			// check x Axis to not be zoomed
			main.selectAll(`.${CLASS.axisX} .tick`).each(function(i) {
				expect(this.getAttribute("transform")).to.be.equal(tickTransform[i]);
			});

			// when enable zoom
			chart.zoom.enable(true);

			chart.zoom(domain).forEach((v, i) => {
				expect(Math.round(v)).to.equal(domain[i]);
			});

			expect(+main.select(selector).attr("x")).to.below(xValue);
		});
	});

	describe("zoom.min/max/range()", () => {
		chart = util.generate({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				]
			},
			zoom: {
				enabled: true
			}
		});

		it("should be updated the minimum zoom range", () => {
			const range = chart.zoom.min(-1);
			const zoomRange = chart.zoom([-1, 1]);

			expect(Math.round(zoomRange[0])).to.be.equal(range);
			expect(+chart.internal.main.select(`.${CLASS.axisX} .tick`).attr("transform").match(/\d+/)[0]).to.be.above(250);
		});

		it("should be updated the maximum zoom range", () => {
			const range = chart.zoom.max(6);
			const zoomRange = chart.zoom([4, 6]);

			expect(Math.round(zoomRange[1])).to.be.equal(range);

			const tick = chart.internal.main.selectAll(`.${CLASS.axisX} .tick`);
			expect(+tick.filter(`:nth-child(${tick.size() + 1})`).attr("transform").match(/\d+/)[0]).to.be.below(500);
		});

		it("should be updated zoom range", () => {
			const main = chart.internal.main;
			const range = chart.zoom.range({
				min: -2,
				max: 7
			});

			// check the min range
			let zoomRange = chart.zoom([-2, 1]);

			expect(Math.round(zoomRange[0])).to.be.equal(range.min);
			expect(+main.select(`.${CLASS.axisX} .tick`).attr("transform").match(/\d+/)[0]).to.be.above(350);

			// check the max range
			zoomRange = chart.zoom([5, 7]);

			expect(Math.round(zoomRange[1])).to.be.equal(range.max);

			const tick = main.selectAll(`.${CLASS.axisX} .tick`);

			expect(+tick.filter(`:nth-child(${tick.size() + 1})`).attr("transform").match(/\d+/)[0]).to.be.below(5);
		});
	});
});
