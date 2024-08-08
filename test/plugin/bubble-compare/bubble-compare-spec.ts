/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import BubbleCompare from "../../../src/Plugin/bubblecompare";
import util from "../../assets/util";

describe("PLUGIN: BUBBLE-COMPARE", () => {
	let chart;
	const args = {
		data: {
			"type": "bubble",
			"xs": {
				"United States": "x0",
				"Korea": "x1",
				"France": "x2",
				"Japan": "x3",
				"Andorra": "x4"
			},
			// value x: population density
			// value y: Area
			// value z: population
			"columns": [
				["x0", 30],
				["x1", 515],
				["x2", 319],
				["x3", 337],
				["x4", 164],
				["United States", {"y": 9631418, "z": 295734134}],
				["Korea", {"y": 100210, "z": 51635256}],
				["France", {"y": 547030, "z": 67022000}],
				["Japan", {"y": 377835, "z": 127417244}],
				["Andorra", {"y": 464, "z": 76177}],
			]
		},
		plugins: [
			new BubbleCompare({
				minR: 11,
				maxR: 74,
				expandScale: 1.1
			})
		]
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	it("Every bubble radius should be in given radius range", () => {
		chart.$.circles.each(function() {
			const circle = d3Select(this);
			const {minR, maxR} = chart.plugins[0].options;
			const circleRadius = parseInt(circle.attr("r"), 10);

			expect(circleRadius).to.be.within(minR, maxR);
		});
	});

	it("check min and max radius", () => {
		const {circles} = chart.$;
		const {minR, maxR} = chart.plugins[0].options;

		const max = Math.floor(circles.filter(d => d.id === "United States").attr("r"));
		const min = Math.floor(circles.filter(d => d.id === "Andorra").attr("r"));

		expect(max).to.be.equal(maxR);
		expect(min).to.be.equal(minR);
	});

	it("check when bubble is expanded", () => {
		const {$: {circles}, internal: {$el}} = chart;
		const {expandScale} = chart.plugins[0].options;

		// when	
		util.hoverChart(chart, "mousemove", {clientX: 50, clientY: 70});
		
		const r = circles.filter(d => d.id === "United States").attr("r");
		
		// bubble radius should be expanded
		expect(+r).to.be.equal(74 * expandScale);
		expect($el.eventRect.style("cursor")).to.be.equal("pointer");
	});
});
