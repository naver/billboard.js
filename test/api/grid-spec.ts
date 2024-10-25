/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$GRID} from "../../src/config/classes";

describe("API grid", function() {
	let chart;

	beforeAll(() => {
		return new Promise((resolve) => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				transition: {
					duration: 0
				},
				onrendered: resolve
			});
		});
	});

	describe("ygrids.add() / ygrids.remove()", () => {
		it("should update y grids", () => new Promise(done => {
			const main = chart.$.main;
			const expectedGrids = [{
					value: 100,
					text: "Pressure Low"
				},
				{
					value: 200,
					text: "Pressure High"
				}];

			// add grid
			chart.ygrids.add(expectedGrids);

			let grids = main.selectAll(`.${$GRID.ygridLine}`);

			expect(grids.size()).to.be.equal(expectedGrids.length);

			setTimeout(() => {
				grids.each(function (d, i) {
					const y = +d3Select(this).select("line").attr("y1");
					const text = d3Select(this).select("text").text();
					const expectedY = chart.internal.scale.y(expectedGrids[i].value);
					const expectedText = expectedGrids[i].text;

					expect(y).to.be.equal(expectedY);
					expect(text).to.be.equal(expectedText);
				});

				// remove grid
				chart.ygrids.remove(expectedGrids);

				grids = main.selectAll(`.${$GRID.ygridLine}`);

				expect(grids.size()).to.be.equal(0);
				done(1);
			}, 300);
		}));

		it("should update x ygrids even if it's zoomed", () => new Promise(done => {
			const main = chart.$.main;
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
					grids = main.selectAll(`.${$GRID.xgridLine}`);

					expect(grids.size()).to.be.equal(expectedGrids.length);

					grids.each(function(d, i) {
						const x = +d3Select(this).select("line").attr("x1");
						const text = d3Select(this).select("text").text();
						const expectedX = chart.internal.scale.x(expectedGrids[i].value);
						const expectedText = expectedGrids[i].text;

						expect(x).to.be.equal(expectedX);
						expect(text).to.be.equal(expectedText);
					});

					// check if it was not rescaled
					domain = chart.internal.scale.y.domain();
					expect(domain[0]).to.be.below(0);
					expect(domain[1]).to.be.above(400);

					// Call xgrids.remove
					chart.xgrids.remove(expectedGrids);

					// for xgrids.remove()
					setTimeout(() => {
						grids = main.selectAll(`.${$GRID.xgridLine}`);

						expect(grids.size()).to.be.equal(0);
						done(1);
					}, 300);
				}, 300);
			}, 300);
		}));
	});

	describe("xgrids()", () => {
		beforeAll(() => {
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
				},
				transition: {
					duration: 0
				}
			});
		});

		it("should update x grids", () => {
			const gridData = {
				value: 2, text: "grid text", position: "middle", class:"some-class"
			};

			chart.xgrids([gridData]);

			const xgrid = chart.$.main.select(`.${$GRID.xgridLine}`);

			expect(xgrid.classed(gridData.class)).to.be.true;

			const text = xgrid.select("text");

			expect(text.text()).to.be.equal(gridData.text);
			expect(text.attr("text-anchor")).to.be.equal(gridData.position);

			chart.xgrids.remove();
		});

		it("using .xgrids.add()", () => {
			const {$el: {gridLines}, scale: {x}} = chart.internal;
			const gridData = [
				{value: 2, text: "Label 2"},
				{value: 3, text: "Label 3"},
				{value: 4, text: "Label 4"}
			];

			chart.xgrids.add(
				gridData[0]
			);

			expect(gridLines.x.size()).to.be.equal(1);

			gridLines.x.each(function(d) {
				const x1 = +this.querySelector("line").getAttribute("x1");

				expect(x1).to.be.equal(x(d.value));
				expect(this.querySelector("text").textContent).to.be.equal(d.text);
			});

			// when adding some duplicated xgrids
			chart.xgrids.add(gridData.slice(1));

			expect(gridLines.x.size()).to.be.equal(3);

			gridLines.x.each(function(d) {
				const x1 = +this.querySelector("line").getAttribute("x1");

				expect(x1).to.be.equal(x(d.value));
				expect(this.querySelector("text").textContent).to.be.equal(d.text);
			});

			expect(chart.xgrids()).to.be.deep.equal(gridData);
		});
	});

	describe("Add xgrids() when is zoomed", () => {
		beforeAll(() => {
			chart = util.generate({
				data: {
					columns: [
					  ["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "line"
				},
				zoom: {
					enabled: true
				},
				transition: {
					duration: 0
				}
			});
		});

		it("grid should be added when is zoomed without zoom reset.", () => {
			const zoomDomain = [1, 3];

			// when
			chart.zoom(zoomDomain);
			chart.xgrids([{value: 2, text: "Label 2"}]);

			expect(chart.zoom().map(Math.round)).to.eql(zoomDomain);
			
			const line = chart.internal.$el.gridLines.x.select("line");

			expect(+line.attr("x1")).to.be.equal(299.5);
			expect(+line.attr("y2")).to.be.equal(426);
		});
	});

	describe("ygrids()", () => {
		beforeAll(() => {
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
				},
				transition: {
					duration: 0
				}
			});
		});

		it("should update y grids", () => {
			const gridData = {
				value: 250, text: "grid text", position: "start", class:"some-class"
			};

			chart.ygrids([gridData]);

			const ygrid = chart.$.main.select(`.${$GRID.ygridLine}`);

			expect(ygrid.classed(gridData.class)).to.be.true;

			const text = ygrid.select("text");

			expect(text.text()).to.be.equal(gridData.text);
			expect(text.attr("text-anchor")).to.be.equal(gridData.position);
		});
	});
});
