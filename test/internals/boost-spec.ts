/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import util from "../assets/util";

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


	describe.skip("useWorker", () => {
		it("for columns data type", done => {
			const chart = util.generate({
				boost: {
					useWorker: true
				},
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "line"
				},
				onrendered: function() {
					expect(this.$.chart.empty()).to.be.false;
					done();
				}
			});

			// workers works async, so at this point node references are not yet updated
			expect(chart.$).to.be.undefined;
		});

		it("for rows data type", done => {
			const chart = util.generate({
				boost: {
					useWorker: true
				},
				data: {
					rows: [
						["data1", "data2", "data3"],
						[90, 120, 300],
						[40, 160, 240],
						[50, 200, 290],
						[120, 160, 230],
						[80, 130, 300],
						[90, 220, 320]
					],
					type: "line"
				},
				onrendered: function() {
					expect(this.$.chart.empty()).to.be.false;
					done();
				}
			});

			// workers works async, so at this point node references are not yet updated
			expect(chart.$).to.be.undefined;
		});

		it("for JSON data type", done => {
			const chart = util.generate({
				boost: {
					useWorker: true
				},
				data: {
					json: {
						data1: [30, 20, 50, 40, 60, 50],
						data2: [200, 130, 90, 240, 130, 220],
						data3: [300, 200, 160, 400, 250, 250]
					},
					type: "line"
				},
				onrendered: function() {
					expect(this.$.chart.empty()).to.be.false;
					done();
				}
			});

			// workers works async, so at this point node references are not yet updated
			expect(chart.$).to.be.undefined;
		});
	});
});
