/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {afterEach, describe, expect, it} from "vitest";

import util from "../assets/util";

function makeRows(count, id = "data1", mapX = index => index) {
	return Array.from({length: count}, (_, index) => ({
		id,
		index,
		x: mapX(index),
		value: index
	}));
}

function makeInternal() {
	const chart = util.generate({
		data: {
			columns: [
				["data1", 1, 2]
			]
		}
	});

	chart.internal.config.data_xSort = true;
	chart.internal.config.point_sensitivity = 2;
	chart.internal.scale.x = value => Number(value);
	chart.internal.scale.zoom = null;

	return chart;
}

describe("DATA coverage helpers", () => {
	afterEach(() => {
		util.destroyAll();
	});

	it("gets closest candidates through sorted line, bar and fallback paths", () => {
		const chart = makeInternal();
		const internal = chart.internal;
		const rows = makeRows(250);

		expect(internal.getClosestCandidates(rows.slice(0, 20), [10, 0])).to.have.length(20);
		expect(internal.getClosestCandidates(rows, [10, 0], false)).to.have.length(250);

		internal.config.data_xSort = false;
		expect(internal.getClosestCandidates(rows, [10, 0])).to.have.length(250);

		internal.config.data_xSort = true;
		internal.config.point_sensitivity = undefined;
		expect(internal.getClosestCandidates(rows, [10, 0])).to.have.length(250);

		internal.config.point_sensitivity = 2;
		const lineCandidates = internal.getClosestCandidates(rows, [120, 0]);

		expect(lineCandidates.map(d => d.index)).to.include(120);
		expect(lineCandidates.length).to.be.lessThan(20);

		const descending = makeRows(250, "data1", index => 249 - index);
		const descendingCandidates = internal.getClosestCandidates(descending, [120, 0]);

		expect(descendingCandidates.map(d => d.x)).to.include(120);

		const duplicateBars = makeRows(250, "data1", index => index < 5 ? 2 : index);

		internal.isBarType = () => true;
		internal.isCandlestickType = () => false;
		expect(internal.getClosestCandidates(duplicateBars, [2, 0]).map(d => d.x))
			.to.include(2);

		internal.isBarType = () => false;
		internal.isCandlestickType = () => true;
		expect(internal.getClosestCandidates(rows, [248, 0]).map(d => d.index))
			.to.include(248);
	});

	it("converts step and range values through boundary branches", () => {
		const chart = makeInternal();
		const internal = chart.internal;
		const values = [
			{id: "data1", x: 1, value: 10},
			{id: "data1", x: 2, value: 20}
		];

		internal.config.line_step_type = "step-after";
		internal.axis.isCategorized = () => true;
		expect(internal.convertValuesToStep(values).map(v => v.x))
			.to.deep.equal([-1, 0, 1, 2, 3]);

		internal.config.line_step_type = "step-before";
		expect(internal.convertValuesToStep(values).map(v => v.x))
			.to.deep.equal([0, 1, 2, 3, 4]);

		expect(internal.convertValuesToRange({
			id: "range",
			x: 3,
			value: [4, 6, 8]
		}).map(v => v.value)).to.deep.equal([4, 8]);
	});
});
