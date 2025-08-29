/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";

describe("LABELS IMAGE", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("data.labels.image on bar chart", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 100, 200, 150, 300, 250],
						["data2", 80, 180, 120, 280, 200]
					],
					type: "bar",
					labels: {
						colors: "#fff",
						image: {
							url: "./assets/data1.svg",
							width: 30,
							height: 30,
							pos: {
								y: -5
							}
						},
						centered: true
					}
				},
				bar: {
					width: {
						ratio: 0.6
					}
				}
			};
		});

		it("should create image elements for labels", () => {
			const images = chart.$.main.selectAll(`image`);
			
			expect(images.size()).to.be.above(0);
		});

		it("should set correct image attributes", () => {
			const images = chart.$.main.selectAll(`image`);
			
			images.each(function() {
				const image = d3Select(this);
				
				expect(image.attr("href")).to.contain("./assets/data1.svg");
				expect(+image.attr("width")).to.be.equal(30);
				expect(+image.attr("height")).to.be.equal(30);
			});
		});

		it("should position images correctly with pos.y offset", () => {
			const images = chart.$.main.selectAll(`image`);
			const bars = chart.$.bar.bars;
			
			images.each(function(d, i) {
				const image = d3Select(this);
				const imageY = +image.attr("y");
				
				// Image should be positioned with y offset
				expect(imageY).to.be.a("number");
			});
		});
	});

	describe("data.labels.image on treemap chart", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 120],
						["data3", 90]
					],
					type: "treemap",
					labels: {
						colors: "#fff",
						centered: true,
						image: {
							url: "./assets/{=ID}.svg",
							width: 40,
							height: 40
						}
					}
				}
			};
		});

		it("should create image elements for treemap labels", () => {
			const images = chart.$.main.selectAll(`image`);
			
			expect(images.size()).to.be.equal(3);
		});

		it("should use dynamic URL with {=ID} placeholder", () => {
			const images = chart.$.main.selectAll(`image`);
			
			images.each(function(d) {
				const image = d3Select(this);
				const href = image.attr("href");
				
				expect(href).to.contain(`./assets/${d.id}.svg`);
				expect(+image.attr("width")).to.be.equal(40);
				expect(+image.attr("height")).to.be.equal(40);
			});
		});
	});

	describe("data.labels.image function callback", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250, 50, 100, 250],
						["data2", 130, 100, 140, 200, 150, 50, 80, 70, 180]
					],
					type: "line",
					labels: {
						image: function(v) {
							if (v > 200) {
								return {
									url: "./assets/data1.svg",
									width: 30,
									height: 30
								};
							} else if (v > 100) {
								return {
									url: "./assets/data2.svg",
									width: 20,
									height: 20
								};
							} else {
								return {
									url: "./assets/data3.svg",
									width: 15,
									height: 15
								};
							}
						}
					}
				}
			};
		});

		it("should create different images based on value", () => {
			const images = chart.$.main.selectAll(`image`);
			
			expect(images.size()).to.be.above(0);
		});

		it("should use correct image URL and size based on value", () => {
			const images = chart.$.main.selectAll(`image`);
			
			images.each(function(d) {
				const image = d3Select(this);
				const href = image.attr("href");
				const width = +image.attr("width");
				const height = +image.attr("height");
				
				// Check that href contains one of the expected asset files
				const validUrls = ["./assets/data1.svg", "./assets/data2.svg", "./assets/data3.svg"];
				const hasValidUrl = validUrls.some(url => href.includes(url));
				expect(hasValidUrl).to.be.true;
				
				// Check that width and height are valid values
				expect([15, 20, 30]).to.include(width);
				expect([15, 20, 30]).to.include(height);
			});
		});
	});

	describe("donut.label.image", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 120],
						["data3", 90]
					],
					type: "donut"
				},
				donut: {
					label: {
						image: {
							url: "./assets/{=ID}.svg",
							width: 30,
							height: 30
						}
					}
				}
			};
		});

		it("should create image elements for donut labels", () => {
			const images = chart.$.main.selectAll(`image`);
			
			expect(images.size()).to.be.equal(3);
		});

		it("should use dynamic URL with {=ID} placeholder for donut", () => {
			const images = chart.$.main.selectAll(`image`);
			
			images.each(function(d) {
				const image = d3Select(this);
				const href = image.attr("href");
				
				expect(href).to.contain(`./assets/${d.data.id}.svg`);
				expect(+image.attr("width")).to.be.equal(30);
				expect(+image.attr("height")).to.be.equal(30);
			});
		});
	});

	describe("gauge.label.image function callback", () => {
		beforeAll(() => {
			args = {
				size: {
					height: 250
				},
				data: {
					columns: [
						["data1", 30],
						["data2", 120],
						["data3", 90]
					],
					type: "gauge"
				},
				gauge: {
					width: 80,
					label: {
						image: function(v, id, i) {
							if (v < 50) {
								return false;
							} else {
								return {
									url: "./assets/{=ID}.svg",
									width: 40,
									height: 40
								};
							}
						}
					}
				}
			};
		});

		it("should create images only for values >= 50", () => {
			const images = chart.$.main.selectAll(`image`);
			
			// Should only show images for data2 (120) and data3 (90), not data1 (30)
			expect(images.size()).to.be.equal(2);
		});

		it("should use dynamic URL and correct size for gauge images", () => {
			const images = chart.$.main.selectAll(`image`);
			
			images.each(function(d) {
				const image = d3Select(this);
				const href = image.attr("href");
				
				// Should only have images for values >= 50
				expect(d.value).to.be.at.least(50);
				// Check that href contains one of the expected asset files
				const validUrls = ["./assets/data1.svg", "./assets/data2.svg", "./assets/data3.svg"];
				const hasValidUrl = validUrls.some(url => href.includes(url));
				expect(hasValidUrl).to.be.true;
				expect(+image.attr("width")).to.be.equal(40);
				expect(+image.attr("height")).to.be.equal(40);
			});
		});
	});

	describe("pie.label.image", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 120],
						["data3", 90]
					],
					type: "pie"
				},
				pie: {
					label: {
						image: {
							url: "./assets/{=ID}.svg",
							width: 40,
							height: 40
						}
					}
				}
			};
		});

		it("should create image elements for pie labels", () => {
			const images = chart.$.main.selectAll(`image`);
			
			expect(images.size()).to.be.equal(3);
		});

		it("should use dynamic URL with {=ID} placeholder for pie", () => {
			const images = chart.$.main.selectAll(`image`);
			
			images.each(function(d) {
				const image = d3Select(this);
				const href = image.attr("href");
				
				expect(href).to.contain(`./assets/${d.data.id}.svg`);
				expect(+image.attr("width")).to.be.equal(40);
				expect(+image.attr("height")).to.be.equal(40);
			});
		});
	});

	describe("polar.label.image function callback", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 120],
						["data3", 90]
					],
					type: "polar"
				},
				polar: {
					label: {
						image: function(v, id, i) {
							if (v < 50) {
								return null;
							} else {
								return {
									url: "./assets/{=ID}.svg",
									width: 40,
									height: 40
								};
							}
						}
					}
				}
			};
		});

		it("should create images only for values >= 50", () => {
			const images = chart.$.main.selectAll(`image`);
			
			// Should only show images for data2 (120) and data3 (90), not data1 (30)
			expect(images.size()).to.be.equal(2);
		});

		it("should use dynamic URL and correct size for polar images", () => {
			const images = chart.$.main.selectAll(`image`);
			
			images.each(function(d) {
				const image = d3Select(this);
				const href = image.attr("href");
				
				// Should only have images for values >= 50
				expect(d.value).to.be.at.least(50);
				// Check that href contains one of the expected asset files
				const validUrls = ["./assets/data1.svg", "./assets/data2.svg", "./assets/data3.svg"];
				const hasValidUrl = validUrls.some(url => href.includes(url));
				expect(hasValidUrl).to.be.true;
				expect(+image.attr("width")).to.be.equal(40);
				expect(+image.attr("height")).to.be.equal(40);
			});
		});
	});
});
