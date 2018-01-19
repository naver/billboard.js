/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";

describe("API grid", function() {
	const chart = util.generate({
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250]
			]
		}
	});

	describe("ygrid.add and ygrid.remove", () => {
		it("should update y grids", done => {
			const main = chart.internal.main;
			const expectedGrids = [{
					value: 100,
					text: "Pressure Low"
				},
				{
					value: 200,
					text: "Pressure High"
				}];

			let grids;

			// Call ygrids.add
			chart.ygrids.add(expectedGrids);

			setTimeout(() => {
				grids = main.selectAll(".bb-ygrid-line");

				expect(grids.size()).to.be.equal(expectedGrids.length);

				grids.each(function (d, i) {
					const y = +d3.select(this).select("line").attr("y1");
					const text = d3.select(this).select("text").text();
					const expectedY = Math.round(chart.internal.y(expectedGrids[i].value));
					const expectedText = expectedGrids[i].text;

					expect(y).to.be.equal(expectedY);
					expect(text).to.be.equal(expectedText);
				});

				// Call ygrids.remove
				chart.ygrids.remove(expectedGrids);

				setTimeout(() => {
					grids = main.selectAll(".bb-ygrid-line");

					expect(grids.size()).to.be.equal(0);
					done();
				}, 500);
			}, 500);
		});

		it("should update x ygrids even if it's zoomed", done => {
			const main = chart.internal.main;
			const expectedGrids = [{
						value: 0,
						text: "Pressure Low"
					},
					{
						value: 1,
						text: "Pressure High"
					}
				];

			let grids;
			let domain;

			chart.zoom([0, 2]);

			setTimeout(() => {

				// Call xgrids
				chart.xgrids(expectedGrids);
				setTimeout(() => {
					grids = main.selectAll(".bb-xgrid-line");

					expect(grids.size()).to.be.equal(expectedGrids.length);

					grids.each(function(d, i) {
						const x = +d3.select(this).select("line").attr("x1");
						const text = d3.select(this).select("text").text();
						const expectedX = Math.round(chart.internal.x(expectedGrids[i].value));
						const expectedText = expectedGrids[i].text;

						expect(x).to.be.equal(expectedX);
						expect(text).to.be.equal(expectedText);
					});

					// check if it was not rescaled
					domain = chart.internal.y.domain();
					expect(domain[0]).to.be.below(0);
					expect(domain[1]).to.be.above(400);

					// Call xgrids.remove
					chart.xgrids.remove(expectedGrids);

					setTimeout(() => {
						grids = main.selectAll(".bb-xgrid-line");

						expect(grids.size()).to.be.equal(0);
						done();
					}, 500); // for xgrids.remove()
				}, 500); // for xgrids()
			}, 500); // for zoom
		});
	});
});
