/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API grid", function() {
	let chart = util.generate({
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250]
			]
		}
	});

	describe("ygrids.add() / ygrids.remove()", () => {
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

			// add grid
			chart.ygrids.add(expectedGrids);

			setTimeout(() => {
				grids = main.selectAll(`.${CLASS.ygridLine}`);

				expect(grids.size()).to.be.equal(expectedGrids.length);

				grids.each(function (d, i) {
					const y = +d3.select(this).select("line").attr("y1");
					const text = d3.select(this).select("text").text();
					const expectedY = Math.round(chart.internal.y(expectedGrids[i].value));
					const expectedText = expectedGrids[i].text;

					expect(y).to.be.equal(expectedY);
					expect(text).to.be.equal(expectedText);
				});

				// remove grid
				chart.ygrids.remove(expectedGrids);

				setTimeout(() => {
					grids = main.selectAll(`.${CLASS.ygridLine}`);

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

			// for zoom
			setTimeout(() => {
				// Call xgrids
				chart.xgrids(expectedGrids);

				// for xgrids()
				setTimeout(() => {
					grids = main.selectAll(`.${CLASS.xgridLine}`);

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

					// for xgrids.remove()
					setTimeout(() => {
						grids = main.selectAll(`.${CLASS.xgridLine}`);

						expect(grids.size()).to.be.equal(0);
						done();
					}, 500);
				}, 500);
			}, 500);
		});
	});

	describe("xgrids()", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 170, 150, 250]
					],
				},
				grid: {
					y: {
						lines: [{value: 1, class: "test"}]
					}
				}
			});
		});

		it("should update y grids", done => {
			const gridData = {
				value: 2, text: "grid text", position: "middle", class:"some-class"
			};

			chart.xgrids([gridData]);

			setTimeout(() => {
				const xgrid = chart.internal.main.select(`.${CLASS.xgridLine}`);

				expect(xgrid.classed(gridData.class)).to.be.true;

				const text = xgrid.select("text");

				expect(text.text()).to.be.equal(gridData.text);
				expect(text.attr("text-anchor")).to.be.equal(gridData.position);

				done();
			}, 500);
		});
	});

	describe("ygrids()", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 170, 150, 250]
					],
				},
				grid: {
					y: {
						lines: [{value: 150, class: "test"}]
					}
				}
			});
		});

		it("should update y grids", done => {
			const gridData = {
				value: 250, text: "grid text", position: "start", class:"some-class"
			};

			chart.ygrids([gridData]);

			setTimeout(() => {
				const ygrid = chart.internal.main.select(`.${CLASS.ygridLine}`);

				expect(ygrid.classed(gridData.class)).to.be.true;

				const text = ygrid.select("text");

				expect(text.text()).to.be.equal(gridData.text);
				expect(text.attr("text-anchor")).to.be.equal(gridData.position);

				done();
			}, 500);
		});
	});
});
