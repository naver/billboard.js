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

	it("should resize correctly in flex container", done => {
		// set flex container
		document.body.innerHTML = '<div style="display:flex"><div style="display:block;flex-basis:0;flex-grow:1;flex-shrink:1"><div id="chart"></div></div></div>';
		const chart = bb.generate({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 500, 800, 500, 2000]
				]
			}
		});

		const chartWidth = +chart.internal.svg.attr("width");
		const diff = 50;

		// shrink width & resize
		document.body.style.width = `${document.body.offsetWidth - diff}px`;
		chart.internal.resizeFunction();

		setTimeout(() => {
			expect(+chart.internal.svg.attr("width")).to.be.equal(chartWidth - diff);
			done();
		}, 100);
	});
});
