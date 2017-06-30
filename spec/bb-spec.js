/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {bb} from "../src/core";

describe("Interface & initialization", () => {
	it("Check for billboard.js object", () => {
		expect(bb).not.to.be.null;
		expect(typeof bb).to.be.equal("object");
		expect(typeof bb.generate).to.be.equal("function");
	});

	it("Check for initialization", () => {
		const chart = bb.generate({
			data: {
				columns: [
					["data1", 30]
				]
			}
		});

		expect(chart).not.to.be.null;
		expect(chart.internal.svg.node().tagName).to.be.equal("svg");
	});
});
