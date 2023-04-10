/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$REGION} from "../../src/config/classes";

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
				regions = main.selectAll(`.${$REGION.region}`);

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function(d, i) {
					const region = d3Select(this);

					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = "red";
					const unexpectedClass = "green";
					const expectedStart = Math.round(chart.internal.scale.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.scale.y(expectedRegions[i].end));
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

		it("check for <rect> element generation", () => {
			// when
			chart.regions.add({
				axis: "y",
				start: 150,
				end: 200,
				class: "a",
			});

			chart.regions.add({
				axis: "y",
				start: 200,
				end: 220,
				class: "b",
			});

			const regionList = chart.internal.$el.region.list;

			expect(regionList.size()).to.be.equal(4);

			// regions <rect> element should be 1
			regionList.each(function(d, i) {
				expect(this.querySelectorAll("rect").length).to.be.equal(1);
			});
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
				],
				zoom: {
					enabled: true
				}
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
				regions = main.selectAll(`.${$REGION.region}`);

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function(d, i) {
					const region = d3Select(this);
					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = expectedClasses[i];
					const expectedStart = Math.round(chart.internal.scale.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.scale.y(expectedRegions[i].end));
					const expectedY = expectedEnd;
					const expectedHeight = expectedStart - expectedEnd;

					expect(y).to.be.closeTo(expectedY, 0.5);
					expect(height).to.be.closeTo(expectedHeight, 1);
					expect(region.classed(expectedClass)).to.be.ok;
				});

				done();
			}, 500);
		});


		it("set options", () => {
			args = {
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
			};
		});

		it("region should be added when is zoomed.", () => {
			const zoomDomain = [1, 3];

			// when
			chart.zoom(zoomDomain);
			chart.regions([{ axis: 'x', start: 2, end: 3 }]);

			expect(chart.zoom().map(Math.round)).to.eql(zoomDomain);
			
			const rect = chart.internal.$el.region.list.select("rect").node().getBoundingClientRect();

			expect(rect.width).to.be.equal(300);
			expect(rect.height).to.be.equal(426);
		});
	});

	describe("Remove regions using regions()", () => {
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
					},
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
				]
			}
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
				regions = main.selectAll(`.${$REGION.region}`);

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function(d, i) {
					const region = d3Select(this);
					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = expectedClasses[i];
					const expectedStart = Math.round(chart.internal.scale.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.scale.y(expectedRegions[i].end));
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
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				}
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

			// regions should be positioned behind the chart elements
			// https://github.com/naver/billboard.js/issues/2067
			expect(chart.$.main.select(":first-child").classed($REGION.regions)).to.be.true;

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
