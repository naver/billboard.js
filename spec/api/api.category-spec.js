/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API category", () => {
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

	it("should return category names", () => {
		const name = chart.internal.config.data_columns[0];

		chart.categories().forEach((d, i) => {
			expect(d).to.be.equal(name[i + 1]);
		});
	});

	it("should change category names", () => {
		const name = ["aa","bb","cc", "dd", "ee"];
		chart.categories(name);

		chart.internal.main.selectAll(`.${CLASS.axisX} tspan`).each(function(d, i) {
			expect(d3.select(this).text()).to.be.equal(name[i]);
		});
	});

	it("should change individual category name", () => {
		const name = chart.categories();
		name[0] = "category 1";
		name[2] = "CategoRY 3";

		chart.category(0, name[0]);
		chart.category(2, name[2]);

		chart.categories().forEach((d, i) => {
			expect(d).to.be.equal(name[i]);
		});

		// check if <tspan> element value has changed
		chart.internal.main.selectAll(`.${CLASS.axisX} tspan`).each(function(d, i) {
			expect(d3.select(this).text()).to.be.equal(name[i]);
		});
	});
});
