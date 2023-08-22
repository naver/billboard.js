/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import sinon from "sinon";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$ARC, $AXIS, $BAR, $CIRCLE, $COMMON, $FOCUS, $EVENT, $SELECT, $SHAPE} from "../../src/config/classes";

describe("INTERACTION", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	afterEach(() => {
		chart.destroy();
	});

	describe("generate event rects", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 10, 20, 30],
						["data2", 20, 16, 18]
					],
					type: "line"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			}
		});
		
		it("when touch event fired on svg element, should be in unselected mode.", done => {
			// when
			chart.tooltip.show({index: 1});

			util.simulator(chart.$.svg.node(), {
				pos: [250,150],
				deltaX: -200,
				deltaY: 0,
				duration: 500,
			}, () => {
				expect(chart.$.tooltip.style("display")).to.be.equal("none");

				done();
			});
		});

		it("set options: data.xs", () => {
			args = {
				data: {
					columns: [
						["x1", 0, 1, 2],
						["x2", 2, 3, 4],
						["data1", 10, 20, 30],
						["data2", 20, 16, 18]
					],
					xs: {
						data1: "x1",
						data2: "x2"
					},
					type: "line"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			};
		});

		it("tooltip on multipleXs", () => {
			const data = {
				id: "data1",
				value: 20,
				x: 1
			};

			// when
			chart.tooltip.show({
				data
			});

			const {tooltip} = chart.$;

			expect(tooltip.select(".name").text()).to.be.equal(data.id);
			expect(+tooltip.select(".value").text()).to.be.equal(data.value)
		});
	});
});
