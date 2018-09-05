/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";

describe("API region", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("regions()", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				regions: [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "green",
					}
				]
			}
		});

		it("should update regions", done => {
			const main = chart.$.main;
			const expectedRegions = [
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
					{
						axis: "y",
						start: 25,
						end: 75,
						class: "red"
					}
				];
			let regions;

			// Call regions API
			chart.regions(expectedRegions);

			setTimeout(() => {
				regions = main.selectAll(".bb-region");

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function(d, i) {
					const region = d3.select(this);

					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = "red";
					const unexpectedClass = "green";
					const expectedStart = Math.round(chart.internal.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.y(expectedRegions[i].end));
					const expectedY = expectedEnd;
					const expectedHeight = expectedStart - expectedEnd;

					expect(y).to.be.closeTo(expectedY, 1);
					expect(height).to.be.closeTo(expectedHeight, 1);

					expect(region.classed(expectedClass)).to.be.ok;
					expect(region.classed(unexpectedClass)).to.not.be.ok;
				});

				done();
			}, 1000);
		});
	});

	describe("Add regions using regions()", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
					]
				},
				regions: [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "green",
					}
				]
			}
		});

		it("should add regions", done => {
			const main = chart.$.main;
			const expectedRegions = [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "green",
					},
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
					{
						axis: "y",
						start: 25,
						end: 75,
						class: "red"
					}
				];

			const expectedClasses = [
					"green",
					"green",
					"red",
					"red",
				];

			let regions;

			// Call regions API
			chart.regions(expectedRegions);

			setTimeout(() => {
				regions = main.selectAll(".bb-region");

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function(d, i) {
					const region = d3.select(this);
					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = expectedClasses[i];
					const expectedStart = Math.round(chart.internal.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.y(expectedRegions[i].end));
					const expectedY = expectedEnd;
					const expectedHeight = expectedStart - expectedEnd;

					expect(y).to.be.closeTo(expectedY, 0.5);
					expect(height).to.be.closeTo(expectedHeight, 1);
					expect(region.classed(expectedClass)).to.be.ok;
				});

				done();
			}, 500);
		});
	});

	describe("Remove regions using regions()", () => {
		before(() =>
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
					]
				},
				regions: [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "green",
					},
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
				]
			});

		it("should remove regions", done => {
			const main = chart.$.main;
			const expectedRegions = [
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
				];
			const expectedClasses = ["red"];
			let regions;

			// Call regions API
			chart.regions(expectedRegions);

			setTimeout(() => {
				regions = main.selectAll(".bb-region");

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function(d, i) {
					const region = d3.select(this);
					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = expectedClasses[i];
					const expectedStart = Math.round(chart.internal.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.y(expectedRegions[i].end));
					const expectedY = expectedEnd;
					const expectedHeight = expectedStart - expectedEnd;

					expect(y).to.be.closeTo(expectedY, 1);
					expect(height).to.be.closeTo(expectedHeight, 1);
					expect(region.classed(expectedClass)).to.be.ok;
				});

				done();
			}, 500);
		});
	});

	// regions.add / remove
	describe("regions()", () => {
		before(() =>
			args ={
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				}
			});

		it(".add() / .remove()", () => {
			const regions = [
				{
					axis: "y",
					start: 300,
					end: 400,
					class: "class-a"
				},
				{
					axis: "y",
					start: 0,
					end: 100,
					class: "class-b"
				}
			];

			// when
			chart.regions.add(regions);

			expect(chart.regions()).to.deep.equal(regions);

			// when
			const removed = chart.regions.remove({
				classes: ["class-a"]
			});

			expect(chart.regions().length).to.be.equal(1);
			expect(removed[0]).to.deep.equal(regions[1]);

			// when remove all
			chart.regions.remove();

			expect(chart.regions().length).to.be.equal(0);
		});
	});
});
