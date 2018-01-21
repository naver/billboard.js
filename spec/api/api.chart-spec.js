/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
 /* eslint-disable */
import util from "../assets/util";

describe("API chart", () => {
	const chart = util.generate({
		data: {
			columns: [
				["data1", 30, 200, 100, 400],
				["data2", 500, 800, 500, 2000]
			]
		}
	});

	describe("resize", () => {
		it("should resize correctly", () => {
			const newSize = {width: 1200, height: 1400};
			chart.resize(newSize);
			expect(chart.internal.getCurrentWidth()).to.be.equal(newSize.width);
			expect(chart.internal.getCurrentHeight()).to.be.equal(newSize.height);
		});
	});

	describe("destroy", () => {
		it("should be destroyed", () => {
			chart.destroy();
			const svg = d3.select("#chart svg");
			expect(svg.empty()).to.be.true;
		});
	});

	//chart.flush

	// chart.transform

	// chart.toggle

	// chart.groups
});
