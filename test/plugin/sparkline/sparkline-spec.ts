/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import {$CIRCLE, $COMMON} from "../../../src/config/classes";
import Sparkline from "../../../src/Plugin/sparkline";
import util from "../../assets/util";

describe("PLUGIN: SPARKLINE", () => {
	let chart;
	const selector = ".sparkline";
	const args = {
		size: {
			width: 150,
			height: 50
		},
		data: {
			columns: [
				["data1", 30, 20, 50],
				["data2", 200, 130, 90],
				["data3", 300, 200, 160]
			],
		},
		plugins: [
			new Sparkline({
				selector
			})
		]
	};
	let body = document.body.innerHTML;

	before(() => {
		const div = document.createElement("div");

		div.className = selector.replace(".", "");
		document.body.append(div);
	});

	after(() => {
		chart.destroy();
		document.body.innerHTML = body;
	});

	beforeEach(() => {
		chart = util.generate(args);
	});

	it("Sparkline generated correctly?", () => {
		expect(document.body.querySelectorAll(selector).length).to.be.equal(chart.data().length);
	});

	it("check for tooltip interaction", () => {
		const el = chart.plugins[0].element[0];
		const {tooltip} = chart.$;
		const svg = el.querySelector("svg");

		// hover 1st chart element
		util.fireEvent(svg, "mousemove", {
			clientX: 10,
			clientY: 10
		}, chart);

		expect(tooltip.style("display")).to.be.equal("block");

		expect(tooltip.select("th").text()).to.be.equal("0");
		expect(tooltip.select(".name").text()).to.be.equal("data1");
		expect(tooltip.select(".value").text()).to.be.equal("30");

		const circle = svg.querySelector(`.${$COMMON.EXPANDED}`);

		expect(circle).to.be.ok;
		expect(circle.classList.contains(`${$CIRCLE.circle}-0`)).to.be.true;

		// when
		util.fireEvent(svg, "mouseout", {
			clientX: 10,
			clientY: 10
		}, chart);

		expect(tooltip.style("display")).to.be.equal("none");

		console.log(1);
	})
});
