/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import {$AREA, $CIRCLE, $COMMON} from "../../../src/config/classes";
import Sparkline from "../../../src/Plugin/sparkline";
import util from "../../assets/util";

describe("PLUGIN: SPARKLINE", () => {
	let chart;
	const selector = ".sparkline";
	let args: any = {
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
			types: {
				data3: "area"
			}
		},
		padding: {},
		tooltip: {
			show: true
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

	describe("basic functionality", () => {
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
		});
		
		it("set options", () => {
			args.padding = false;
			args.tooltip.show = false;
		});

		it("check for the dimension & tooltip", () => {
			const last = document.querySelectorAll(selector)[2];
			const {width, height} = last.querySelector(`.${$AREA.areas} path`)?.getBoundingClientRect() ?? {width:0, height: 0};

			// chart element should occupy the whole dimension of given size
			expect({width, height}).to.be.deep.equal(args.size);

			// tooltip element shouldn't be added to the DOM
			expect(chart.$.tooltip).to.be.null;
		});
	});

	describe("point option", () => {
		before(() => {
			args = {
				size: {
					width: 150,
					height: 50
				},
				data: {
					columns: [
						["data1", 130, 200, 150, 140, 160, 150],
						["data2", 200, 130, 90, 240, 130, 220],
						["data3", 300, 200, 160, 400, 250, 250],
					],
					type: "area",
					types: {
						data1: "line",
						data2: "step"
					}
				},
				point: {
					focus: {
						only: true
					}
				},
				plugins: [
					new Sparkline({
						selector
					})
				]
			};
		});

		it("when point.focus.only=true is set, only one point per dataseries should show.", () => {
			const testX = 3;

			expect(chart.$.circles.size()).to.be.equal(args.data.columns.length);

			// when
			chart.tooltip.show({x: testX});

			chart.$.circles.each(function(d) {
				expect(d.x).to.be.equal(testX);
				expect(+this.getAttribute("cx")).to.be.equal(90);
			});
		});
	});
});
