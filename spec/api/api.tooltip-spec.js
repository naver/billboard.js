/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

// @TODO
describe.skip("API tooltip", () => {
	const chart = util.generate({
		data: {
			x: "x",
			columns: [
				["x", "a", "b", "c", "d", "e"],
				["data1", 30, 200, 100, 400, 150],
				["data2", 5000, 2000, 1000, 4000, 1500]
			]
		},
		axis: {
			x: {
				type: "category"
			}
		}
	});

	it("", () => {

	});
});
