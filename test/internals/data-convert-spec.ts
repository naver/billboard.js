/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {describe, expect, it} from "vitest";
import util from "../assets/util";

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
		});

		expect(chart.data().length).to.be.equal(2);

		chart.destroy();
	});
});
