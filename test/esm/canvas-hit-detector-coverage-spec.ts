/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {describe, expect, it} from "vitest";

import HitDetector from "../../src/canvas/HitDetector";
import {TYPE} from "../../src/config/const";

function makeScale(domain = [0, 1], range = [0, 100]) {
	return value => {
		const [d0, d1] = domain;
		const [r0, r1] = range;

		return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0);
	};
}

function makeRow(id, index, value = index) {
	return {id, index, x: index, value};
}

function makeContext(type, overrides = {}) {
	const targets = [
		{
			id: "data1",
			values: [makeRow("data1", 0, 10), makeRow("data1", 1, 20)]
		}
	];
	const ctx = {
		api: {},
		config: {
			axis_rotated: false,
			axis_x_forceAsSingle: false,
			data_selection_enabled: false,
			data_selection_grouped: false,
			data_type: type,
			data_types: {},
			point_r: 4,
			point_sensitivity: undefined,
			tooltip_grouped: true
		},
		data: {targets},
		filterTargetsToShow: list => list,
		generateGetBarPoints: () => (d, i) => [[i * 30, 0], [i * 30 + 12, 18]],
		generateGetCandlestickPoints: () => (d, i) => [[i * 30, 4], [i * 30 + 10, 16], [i * 30 + 5, 0, 20]],
		getBaseValue: d => d.value,
		getCandlestickData: d => ({open: d.value - 1, close: d.value}),
		getPointSensitivity: () => 12,
		getTreemapRoot: () => ({
			children: [
				{data: makeRow("data1", 0, 10), x0: 0, x1: 0.5, y0: 0, y1: 0.5},
				{data: makeRow("data2", 1, 20), x0: 0.5, x1: 1, y0: 0.5, y1: 1}
			]
		}),
		getXCacheKey: x => `x:${x}`,
		isGrouped: () => false,
		isMultipleX: () => false,
		pointR: () => 4,
		scale: {
			x: makeScale(),
			y: makeScale()
		},
		state: {
			current: {height: 120, width: 160},
			hasTreemap: false,
			height: 80,
			margin: {left: 10, top: 20},
			width: 120
		}
	};
	const {config, data, state, ...rest} = overrides;

	Object.assign(ctx, rest);
	config && Object.assign(ctx.config, config);
	data && Object.assign(ctx.data, data);
	state && Object.assign(ctx.state, state);

	return ctx;
}

describe("ESM canvas hit detector coverage", () => {
	it("indexes bars, grouped indices and rectangular selections", () => {
		const detector = new HitDetector();
		const ctx = makeContext(TYPE.BAR, {
			config: {
				data_selection_enabled: true,
				data_selection_grouped: true
			}
		});

		detector.rebuild(ctx, {indices: {[TYPE.BAR]: {}}, pos: {}});

		expect(detector.findNearest(16, 28)).to.be.equal(ctx.data.targets[0].values[0]);
		expect(detector.findNearest(55, 40)).to.be.equal(ctx.data.targets[0].values[1]);
		expect(detector.findNearestIndexByCoord(16, 25)).to.be.equal(ctx.data.targets[0].values[0]);
		expect(detector.findInRect({x: 0, y: 0, w: 80, h: 80}).map(d => d.index))
			.to.be.deep.equal([0, 1]);
		expect(detector.findInRect({x: 0, y: 0, w: 25, h: 80}, true).map(d => d.index))
			.to.be.deep.equal([0]);
		expect(detector.findNearest(200, 200)).to.be.null;
	});

	it("indexes point targets with dynamic and numeric sensitivity", () => {
		const detector = new HitDetector();
		const ctx = makeContext(TYPE.SCATTER);
		const shape = {
			indices: {},
			pos: {
				cx: (d, i) => i * 30,
				cy: (d, i) => i * 10
			}
		};

		detector.rebuild(ctx, shape);
		expect(detector.findNearest(10, 20)).to.be.equal(ctx.data.targets[0].values[0]);
		expect(detector.findInRect({x: 0, y: 0, w: 80, h: 60}).map(d => d.index))
			.to.be.deep.equal([0, 1]);

		ctx.config.point_sensitivity = 2;
		detector.rebuild(ctx, shape);
		expect(detector.findNearest(20, 20)).to.be.null;
	});

	it("indexes candlesticks and rotated grouped selections", () => {
		const detector = new HitDetector();
		const ctx = makeContext(TYPE.CANDLESTICK, {
			config: {
				axis_rotated: true,
				data_selection_enabled: true,
				data_selection_grouped: true
			}
		});

		detector.rebuild(ctx, {indices: {[TYPE.CANDLESTICK]: {}}, pos: {}});

		expect(detector.findNearest(16, 28)).to.be.equal(ctx.data.targets[0].values[0]);
		expect(detector.findInRect({x: 0, y: 0, w: 100, h: 40}, true).map(d => d.index))
			.to.include(0);

		ctx.getCandlestickData = () => null;
		detector.rebuild(ctx, {indices: {[TYPE.CANDLESTICK]: {}}, pos: {}});
		expect(detector.findNearest(16, 28)).to.be.null;
	});

	it("indexes treemap nodes and skips unsupported treemap data", () => {
		const detector = new HitDetector();
		const ctx = makeContext(TYPE.TREEMAP, {
			config: {
				data_types: {data1: TYPE.TREEMAP, data2: TYPE.BAR}
			},
			state: {
				hasTreemap: true
			}
		});

		detector.rebuild(ctx, {indices: {}, pos: {}});

		expect(detector.findNearest(20, 20).id).to.be.equal("data1");
		expect(detector.findNearest(120, 100)).to.be.null;
		expect(detector.findInRect({x: 0, y: 0, w: 100, h: 100}).map(d => d.id))
			.to.be.deep.equal(["data1"]);
	});
});
