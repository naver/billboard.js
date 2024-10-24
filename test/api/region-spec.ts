/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$REGION} from "../../src/config/classes";
import {testRegions} from "../internals/regions-spec";

describe("API regions", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("regions()", () => {
		beforeAll(() => {
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

		it("should update regions", () => new Promise(done => {
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

				done(1);
			}, 300);
		}));

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
		beforeAll(() => {
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

		it("should add regions", () => new Promise(done => {
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

				done(1);
			}, 300);
		}));


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

			expect(rect.width).to.be.equal(299.5);
			expect(rect.height).to.be.equal(426);
		});
	});

	describe("Remove regions using regions()", () => {
		beforeAll(() => {
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

		it("should remove regions", () => new Promise(done => {
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

				done(1);
			}, 300);
		}));
	});

	// regions.add / remove
	describe("regions()", () => {
		beforeAll(() => {
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

	describe("label text", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 100, 150, 130, 200, 220, 190],
					],
					axes: {
						data2: "y2",
					},
					type: "line",
					colors: {
						data1: "#ff0000"
					}
				},
				axis: {
					y2: {
						show: true
					}
				},
				regions: [
					{
						axis: "x",
						start: 1,
						end: 2,
						class: "regions_class1",
						label: {
							text: "Regions 1",
							x: 0,
							y: 0,
							color: "red"
						}
					},
					{
						axis: "y",
						start: 100,
						end: 300,
						class: "regions_class3",
						label: {
							text: "Regions 3"
						}
					},
					{
						axis: "y2",
						start: 200,
						end: 220,
						class: "regions_class4",
						label: {
							text: "Regions 4"
						}
					}
				]
			}
		});

		it("labels are updated correctly?", () => new Promise(done => {
			// when
			chart.regions([
				{
					axis: "y",
					start: 200,
					end: 300,
					label: {
						text: "1 Regions",
						x: 150,
						color: "rgb(0, 0, 255)"
					}
				},
				{
					axis: "x",
					start: 2,
					end: 4,
					class: "fill_green",
					label: {
						text: "2 Region",
						y: 50,
						color: "rgb(165, 42, 42)",
						rotated: true
					}
				}
			]);

			setTimeout(() => {
				chart.internal.$el.region.list.each(testRegions(chart));

				done(1);
			}, 300);
		}));
	});
});
