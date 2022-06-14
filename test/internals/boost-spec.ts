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
			const {$el: {circle, text}} = chart.internal;

			[circle, text].forEach(nodes => {
				nodes.each(function() {
					expect(this.style.fill).to.be.equal("");
					expect(this.style.stroke).to.be.equal("");
				});
			});
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
});
