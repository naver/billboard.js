/* eslint-disable */
import {expect} from "chai";
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
		plugins: [new BubbleCompare({minR: 11, maxR: 74, expandScale: 1.1})]
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	it("Every bubble radius should be in given radius range", () => {
		chart.$.main.selectAll("circle").each(function() {
			const circle = d3Select(this);
			const {minR, maxR} = chart.plugins[0].options;
			const circleRadius = parseInt(circle.attr("r"), 10);

			expect(circleRadius).to.be.within(minR, maxR);
		});
	});
});
