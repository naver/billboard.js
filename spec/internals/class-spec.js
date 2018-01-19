/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";

describe("CLASS", function() {
	const chart = util.generate({
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2 prefix", 50, 20, 10, 40, 15, 25],
				["data3 мужчины", 150, 120, 110, 140, 115, 125]
			]
		}
	});

	describe("internal.getTargetSelectorSuffix", () => {
		it("should not replace any characters", () => {
			const input = "data1";
			const expected = `-${input}`;
			const suffix = chart.internal.getTargetSelectorSuffix(input);

			expect(suffix).to.be.equal(expected);
		});

		it("should replace space to '-'", () => {
			const input = "data1 suffix";
			const expected = "-data1-suffix";
			const suffix = chart.internal.getTargetSelectorSuffix(input);

			expect(suffix).to.be.equal(expected);
		});

		it("should replace space to '-' with multibyte characters", () => {
			const input = "data1 suffix 한글 日本語";
			const expected = "-data1-suffix-한글-日本語";
			const suffix = chart.internal.getTargetSelectorSuffix(input);

			expect(suffix).to.be.equal(expected);
		});

		it("should replace special characters to '-'", () => {
			const input = "data1 !@#$%^&*()_=+,.<>\"':;[]/|?~`{}\\";
			const expected = "-data1--------------------------------";
			const suffix = chart.internal.getTargetSelectorSuffix(input);

			expect(suffix).to.be.equal(expected);
		});
	});

	describe("multibyte characters on chart", () => {
		it("should replace space to '-' with multibyte characters", () => {
			const selector = ".bb-target-data3-мужчины";

			expect(chart.internal.main.select(selector).size()).to.be.equal(1);
		});
	});
});
