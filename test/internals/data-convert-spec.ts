/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {describe, expect, it} from "vitest";
import util from "../assets/util";
import Chart from "../../src/Chart/Chart";

describe("DATA Convert", () => {
	it("columns: should throw error when data contains undefined value", () => {
		try {
			util.generate({
				data: {
					columns: [
						["data1", 20, undefined, 30]
					],
					type: "line"
				}
			});
		} catch (e) {
			expect(true).to.be.ok;
		}
	});

	it("rows: should throw error when data contains undefined value", () => {
		try {
			util.generate({
				data: {
					rows: [
						["data1"],
						[20],
						[undefined],
						[30]
					],
					type: "line"
				}
			});
		} catch (e) {
			expect(true).to.be.ok;
		}
	});

	it("should handle non-array value in json object", () => {
		const chart = util.generate({
			data: {
				json: {
					1: 1,
					data2: 2,
					data3: [10, 20, 30]
				},
				type: "line"
			}
		}) as any;

		expect(chart.data().length).to.be.equal(3);
		expect(chart.data("1")[0].values[0].value).to.be.equal(1);
		expect(chart.data("data2")[0].values[0].value).to.be.equal(2);
		expect(chart.data("data3")[0].values.length).to.be.equal(3);

		chart.destroy();
	});

	it("should generate json data with keys.value param only", () => {
		const chart = util.generate({
			data: {
				json: [
					{name: "a", upload: 200, download: 200},
					{name: "b", upload: 190, download: 230},
				],
				keys: {
					value: ["upload", "download"]
				},
				type: "line"
			}
		}) as any;

		expect(chart.data().length).to.be.equal(2);

		chart.destroy();
	});
});
