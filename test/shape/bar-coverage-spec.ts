/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {describe, expect, it} from "vitest";

import barShape from "../../src/ChartInternal/shape/bar";

function makeRow(id, index, value) {
	return {id, index, value};
}

function makeContext(overrides = {}) {
	const targets = [
		{id: "data1", values: [makeRow("data1", 0, 10), makeRow("data1", 1, -10)]},
		{id: "data2", values: [makeRow("data2", 0, 20), makeRow("data2", 1, -20)]},
		{id: "data3", values: [makeRow("data3", 0, 30), makeRow("data3", 1, 0)]}
	];
	const ctx = {
		$el: {
			bar: {
				filter: () => ({
					attr: () => "M0,0a4 4 0 0 1 4,4z",
					empty: () => false
				})
			}
		},
		axis: {
			getId: () => "y"
		},
		config: {
			axis_rotated: false,
			axis_y_inverted: false,
			bar_connectLine: "start-end",
			bar_radius: undefined,
			bar_radius_ratio: undefined,
			data_groups: [["data1", "data2", "data3"]]
		},
		data: {targets},
		filterTargetsToShow: list => list,
		generateGetBarPoints: () => (d, i) => [
			[i * 12, 0],
			[i * 12, d.value],
			[i * 12 + 8, d.value],
			[i * 12 + 8, 0]
		],
		isBarType: () => true,
		isGrouped: () => false,
		isStackingRadiusData: () => false,
		orderTargets: list => list,
		state: {
			hiddenTargetIds: new Set()
		}
	};
	const {config, state, ...rest} = overrides;

	Object.assign(ctx, rest);
	config && Object.assign(ctx.config, config);
	state && Object.assign(ctx.state, state);

	return ctx;
}

describe("SHAPE bar coverage", () => {
	it("skips SVG bar updates in canvas mode", () => {
		const ctx = {
			state: {
				isCanvasMode: true
			}
		};

		expect(barShape.updateBar.call(ctx)).to.be.undefined;
		expect(barShape.redrawBar.call(ctx, () => [])).to.deep.equal([]);
	});

	it("generates connect-line path metadata for rotated and non-rotated bars", () => {
		const normal = makeContext();
		const rotated = makeContext({
			config: {
				axis_rotated: true,
				bar_connectLine: {data1: "end-start"}
			},
			generateGetBarPoints: () => (d, i) => [
				[i * 12, 0],
				[d.value, i * 12],
				[d.value, i * 12 + 8],
				[0, i * 12 + 8]
			]
		});
		const normalPath = barShape.generateDrawBar.call(normal, {}, false)(
			makeRow("data1", 0, 10),
			0
		);
		const rotatedPath = barShape.generateDrawBar.call(rotated, {}, false)(
			makeRow("data1", 0, -10),
			0
		);
		const ignoredPath = barShape.generateDrawBar.call(makeContext({
			config: {
				bar_connectLine: "bad"
			}
		}), {}, false)(makeRow("data1", 0, 10), 0);

		expect(normalPath).to.have.length(2);
		expect(rotatedPath).to.have.length(2);
		expect(ignoredPath).to.have.length(1);
		expect(normalPath[0]).to.include("V10");
		expect(rotatedPath[0]).to.include("V-10");
	});

	it("detects stacking radius rows for visible and hidden grouped bars", () => {
		const ctx = makeContext({
			isGrouped: () => true
		});

		expect(barShape.isStackingRadiusData.call(ctx, makeRow("data3", 0, 30))).to.be.true;
		expect(barShape.isStackingRadiusData.call(ctx, makeRow("data1", 0, 10))).to.be.false;
		expect(barShape.isStackingRadiusData.call(ctx, makeRow("data3", 1, 0))).to.be.false;
		expect(barShape.isStackingRadiusData.call(ctx, makeRow("data2", 1, -20))).to.be.true;

		ctx.state.hiddenTargetIds.add("data1");
		expect(barShape.isStackingRadiusData.call(ctx, makeRow("data1", 0, 10))).to.be.true;

		ctx.$el.bar.filter = () => ({
			attr: () => "M0,0L4,4z",
			empty: () => false
		});
		expect(barShape.isStackingRadiusData.call(ctx, makeRow("data1", 0, 10))).to.be.false;

		ctx.$el.bar.filter = () => ({
			attr: () => "",
			empty: () => true
		});
		expect(barShape.isStackingRadiusData.call(ctx, makeRow("data1", 0, 10))).to.be.false;
	});

	it("updates connect line paths for all endpoint combinations", () => {
		const barPath = [
			{x: 0, y: 10, width: 8, height: 20},
			{x: 10, y: 20, width: 8, height: 10},
			{x: 20, y: 15, width: 8, height: 15}
		];
		const node = {
			value: "",
			attr(name, value) {
				this.value = value;
				return this;
			}
		};
		const ctx = makeContext();

		for (const rotated of [false, true]) {
			ctx.config.axis_rotated = rotated;

			for (const type of ["start-start", "start-end", "end-start", "end-end"]) {
				barShape.updateConnectLine.call(ctx, node, type, barPath);
				expect(node.value).to.match(/^M/);
			}
		}
	});
});
