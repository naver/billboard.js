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
		it("check if given function run on WebWorker thread.", () => new Promise(done => {
			runWorker(undefined, function test_for_worker(p) {
					return `${p}_123`;
				},
				function(res) {
					expect(res).to.be.equal("abcd_123");
					done(1);
				}
			)("abcd");
		}), 5000);
	});
});
