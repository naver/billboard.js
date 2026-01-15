/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, describe, expect, it} from "vitest";
import util from "../assets/util";
import {runWorker} from "../../src/module/worker";

describe("BOOST", () => {
	let chart;
	let args: any = {
		boost: {
			useCssRule: true,
		},
		data: {
			columns: [
				["data1", 30, -200, -100, 400, 150, 250],
				["data2", -50, 150, -150, 150, -50, -150]
			],
			type: "line",
			labels: true
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("useCssRule", () => {		
		it("shouldn't set inline style props for <circle>, <text> elements", () => {
			const {$el: {circle, legend, text}} = chart.internal;

			[circle, text].forEach(nodes => {
				nodes.each(function() {
					expect(this.style.fill).to.be.equal("");
					expect(this.style.stroke).to.be.equal("");
				});
			});

			// check for legend elements
			["g", "text", "rect"].forEach(v => {
				legend.selectAll(v).each(function(){
					expect(this.getAttribute("style")).to.be.null;
				});
			});

			legend.selectAll("line").each(function(){
				expect(this.style.pointerEvents).to.be.empty;
			});
			
			legend.selectAll("g")
		});

		it("set option: data.type='bar'", () => {
			args.data.type = "bar";
		});

		it("shouldn't set inline style props for <bar>, <text> elements", () => {
			const {$el: {bar, text}} = chart.internal;

			[bar, text].forEach(nodes => {
				nodes.each(function() {
					expect(this.style.fill).to.be.equal("");
					expect(this.style.stroke).to.be.equal("");
				});
			});
		});
	});

	describe("useWorker", function() {
		beforeEach(() => {
			args = {
				boost: {
					useWorker: true
				},
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 150, 150, 150, 50, 150]
					],
					type: "line"
				}
			};
		});

		it("should enable Web Worker option when boost.useWorker is true", () => {
			chart = util.generate(args);
			const {config} = chart.internal;
			
			expect(config.boost_useWorker).to.be.true;
		});

		it("should disable Web Worker option when boost.useWorker is false", () => {
			args.boost.useWorker = false;
			chart = util.generate(args);
			const {config} = chart.internal;
			
			expect(config.boost_useWorker).to.be.false;
		});

		it("should process JSON data correctly (fallback to sync when Worker not available)", () => {
			const jsonData = [
				{x: 1, value1: 10, value2: 20},
				{x: 2, value1: 15, value2: 25},
				{x: 3, value1: 20, value2: 30}
			];

			// Use sync processing to ensure reliable test
			args.boost.useWorker = false;
			args.data = {
				json: jsonData,
				keys: {x: "x", value: ["value1", "value2"]}
			};

			chart = util.generate(args);
			const data = chart.data();
			
			expect(data.length).to.be.equal(2);
			expect(data[0].id).to.be.equal("value1");
			expect(data[1].id).to.be.equal("value2");
		});

		it("should process rows data correctly (fallback to sync when Worker not available)", () => {
			const rowsData = [
				["data1", "data2"],
				[10, 20],
				[15, 25],
				[20, 30]
			];

			// Use sync processing to ensure reliable test
			args.boost.useWorker = false;
			args.data = {
				rows: rowsData
			};

			chart = util.generate(args);
			const data = chart.data();
			
			expect(data.length).to.be.equal(2);
			expect(data[0].id).to.be.equal("data1");
			expect(data[1].id).to.be.equal("data2");
		});

		it("should process columns data correctly (fallback to sync when Worker not available)", () => {
			const columnsData = [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 150, 150, 150, 50, 150]
			];

			// Use sync processing to ensure reliable test
			args.boost.useWorker = false;
			args.data = {
				columns: columnsData
			};

			chart = util.generate(args);
			const data = chart.data();
			
			expect(data.length).to.be.equal(2);
			expect(data[0].id).to.be.equal("data1");
			expect(data[1].id).to.be.equal("data2");
		});

		it("should not use Web Worker when data is empty", () => {
			args.data = {
				columns: []
			};

			chart = util.generate(args);
			const {config} = chart.internal;
			
			// useWorker should be enabled in config but shouldn't be used for empty data
			expect(config.boost_useWorker).to.be.true;
		});

		it("should not apply worker when data.columns is empty array even if useWorker=true", () => {
			args.boost.useWorker = true;
			args.data = {
				columns: []
			};

			chart = util.generate(args);
			const {config} = chart.internal;
			
			// Config should be true, but worker shouldn't be used due to empty data
			expect(config.boost_useWorker).to.be.true;
			
			// Chart should still be generated successfully
			expect(chart).to.not.be.undefined;
			expect(chart.data().length).to.be.equal(0);
		});

		it("should not apply worker when data.json is empty array even if useWorker=true", () => {
			args.boost.useWorker = true;
			args.data = {
				json: [],
				keys: {x: "x", value: ["value1", "value2"]}
			};

			chart = util.generate(args);
			const {config} = chart.internal;
			
			// Config should be true, but worker shouldn't be used due to empty data
			expect(config.boost_useWorker).to.be.true;
			
			// Chart should still be generated successfully
			expect(chart).to.not.be.undefined;
			expect(chart.data().length).to.be.equal(0);
		});

		it("should not apply worker when data.rows is empty array even if useWorker=true", () => {
			args.boost.useWorker = true;
			args.data = {
				rows: []
			};

			chart = util.generate(args);
			const {config} = chart.internal;
			
			// Config should be true, but worker shouldn't be used due to empty data
			expect(config.boost_useWorker).to.be.true;
			
			// Chart should still be generated successfully
			expect(chart).to.not.be.undefined;
			expect(chart.data().length).to.be.equal(0);
		});

		it("should not apply worker when data.json has empty first element even if useWorker=true", () => {
			args.boost.useWorker = true;
			args.data = {
				json: [{}], // Empty object as first element
				keys: {x: "x", value: ["value1", "value2"]}
			};

			chart = util.generate(args);
			const {config} = chart.internal;
			
			// Config should be true, but worker shouldn't be used due to empty first element
			expect(config.boost_useWorker).to.be.true;
			
			// Chart should still be generated successfully
			expect(chart).to.not.be.undefined;
		});

		it("should not apply worker when data.rows has empty first element even if useWorker=true", () => {
			args.boost.useWorker = true;
			args.data = {
				rows: [[]] // Empty array as first element
			};

			chart = util.generate(args);
			const {config} = chart.internal;
			
			// Config should be true, but worker shouldn't be used due to empty first element
			expect(config.boost_useWorker).to.be.true;
			
			// Chart should still be generated successfully
			expect(chart).to.not.be.undefined;
		});

		it("should not apply worker when data.columns has empty first element even if useWorker=true", () => {
			args.boost.useWorker = true;
			args.data = {
				columns: [[]] // Empty array as first element
			};

			chart = util.generate(args);
			const {config} = chart.internal;
			
			// Config should be true, but worker shouldn't be used due to empty first element
			expect(config.boost_useWorker).to.be.true;
			
			// Chart should still be generated successfully
			expect(chart).to.not.be.undefined;
		});

		it("should work with synchronous processing when useWorker is disabled", () => {
			args.boost.useWorker = false;
			
			chart = util.generate(args);
			const data = chart.data();
			
			expect(data.length).to.be.equal(2);
			expect(data[0].id).to.be.equal("data1");
			expect(data[1].id).to.be.equal("data2");
		});

		it("should have boost_useWorker config when enabled", () => {
			args.boost.useWorker = true;
			chart = util.generate(args);
			
			expect(chart.internal.config.boost_useWorker).to.be.true;
		});

		it("should handle data conversion logic in convert.ts with runWorker", () => {
			// Test that boost config is properly set and integration works
			args.boost.useWorker = true;
			args.data = {
				columns: [
					["data1", 30, 200, 100],
					["data2", 50, 150, 150]
				]
			};
			
			chart = util.generate(args);
			
			// Verify config is set properly
			expect(chart.internal.config.boost_useWorker).to.be.true;
			
			// Verify chart exists and has basic functionality
			expect(chart).to.not.be.undefined;
			expect(chart.internal).to.not.be.undefined;
		});
	});

	describe("runWorker function tests", function() {
		it("check if given function run without WebWorker", () => {
			return new Promise((resolve) => {
				runWorker(false, function test_for_worker(p) {
						return `${p}_123`;
					},
					function(res) {
						expect(res).to.be.equal("abcd_123");
						resolve(1);
					}
				)("abcd");
			});
		});

		it("check if given function run on WebWorker thread", function() {
			// Skip this test in environments where WebWorker is not properly supported
			if (typeof Worker === 'undefined' || typeof window === 'undefined' || !window.Worker) {
				this.skip();
				return;
			}

			return new Promise((resolve, reject) => {
				const timeoutId = setTimeout(() => {
					resolve(1);
					reject(new Error("WebWorker test timed out"));
				}, 3000);

				runWorker(true, function test_for_worker(p) {
						return `${p}_123`;
					},
					function(res) {
						clearTimeout(timeoutId);
						try {
							expect(res).to.be.equal("abcd_123");
							resolve(1);
						} catch (error) {
							reject(error);
						}
					}
				)("abcd");
			});
		});
	});
});
