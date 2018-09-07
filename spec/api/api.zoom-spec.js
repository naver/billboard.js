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

			const domain = chart.internal.zoomScale.domain().map(Math.round);

			expect(domain[0]).to.be.equal(target[0]);
			expect(domain[1]).to.be.equal(target[1]);
		});

		it("should be zoomed properly again", () => {
			const target = [1, 4];

			chart.zoom(target);

			const domain = chart.internal.zoomScale.domain().map(Math.round);

			expect(domain[0]).to.be.equal(target[0]);
			expect(domain[1]).to.be.equal(target[1]);
		});

		it("should be zoomed and showing focus grid properly when target contained minus value", () => {
			const target = [-2, 3]; // zoom in cotaining minus value

			chart.zoom(target);

			const zoomScale = chart.internal.zoomScale;

			// If target contained minus value should not be null
			expect(zoomScale).to.not.be.null;

			const domain = chart.internal.zoomScale.domain().map(Math.round);

			// domain value must be above than target
			expect(domain[0]).to.be.above(target[0]);
			expect(domain[1]).to.be.above(target[1]);
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

	describe("zoom category type", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					x: {
						type: "category"
					}
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("should be zoomed properly", done => {
			const target = [1,2];

			const internal = chart.internal;

			chart.zoom(target);

			setTimeout(() => {
				const rectlist = internal.main.selectAll(`.${CLASS.eventRect}`)
					.filter((v, i) => target.indexOf(i) !== -1);
				const rectSize = rectlist.attr("width");
				const domain = internal.zoomScale.domain().map(Math.round);

				expect(domain[0]).to.be.equal(target[0]);
				expect(domain[1] - 1).to.be.equal(target[1]);

				rectlist.each(function(d, i) {
					const x = +d3.select(this).attr("x");

					expect(x * i).to.be.closeTo(rectSize * i, 5);
				});

				done();
			}, 1000);
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
			const rectlist = chart.$.main.selectAll(`.${CLASS.eventRect}`).nodes();
			const rect = [];

			// when
			chart.zoom([3, 5]);

			setTimeout(() => {
				rectlist.forEach(function(el, i) {
					const x = +el.getAttribute("x");
					const width = +el.getAttribute("width");

					if (i > 0) {
						expect(rect[i - 1]).to.be.equal(x);
					}

					rect.push(x + width);
				});

				done();
			}, 500)
		});
	});

	describe("unzoom", () => {
		before(() => {
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
		});

		it("should be unzoomed properly", () => {
			const internal = chart.internal;
			const target = [1, 4];
			const original = internal.x.domain();
			let domain;

			chart.zoom(target);

			domain = internal.zoomScale.domain().map(Math.round);

			expect(domain[0]).to.be.equal(target[0]);
			expect(domain[1]).to.be.equal(target[1]);

			chart.unzoom();

			domain = chart.internal.x.domain();

			expect(domain[0]).to.be.equal(original[0]);
			expect(domain[1]).to.be.equal(original[1]);
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
			chart.zoom(domain).map(Math.round).forEach((v, i) => {
				expect(v).to.not.equal(domain[i]);
			});

			expect(+main.select(selector).attr("x")).to.be.equal(xValue);

			// check x Axis to not be zoomed
			main.selectAll(`.${CLASS.axisX} .tick`).each(function(i) {
				expect(this.getAttribute("transform")).to.be.equal(tickTransform[i]);
			});

			// when enable zoom
			chart.zoom.enable(true);

			chart.zoom(domain).map(Math.round).forEach((v, i) => {
				expect(v).to.equal(domain[i]);
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
