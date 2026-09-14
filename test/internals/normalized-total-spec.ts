/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {afterEach, describe, expect, it, vi} from "vitest";
import {KEY} from "../../src/module/Cache";
import util from "../assets/util";

describe("Normalized visible totals", () => {
	let chart;

	afterEach(() => {
		vi.restoreAllMocks();
		chart?.destroy();
	});

	function generate(perGroup = false) {
		chart = util.generate({
			transition: {duration: 0},
			data: {
				columns: [
					["a", 10, 20, 0], ["b", 30, 60, 0],
					["c", 50, 100, 0], ["d", 50, 100, 0]
				],
				type: "bar",
				groups: [["a", "b"], ["c", "d"]],
				stack: {normalize: perGroup ? {perGroup: true} : true}
			}
		});
	}

	function ratio(id, index = 0) {
		const target = chart.data(id)[0];

		return chart.internal.getRatio("index", target.values[index]);
	}

	it("reuses hidden-series sums across points and redraws", () => {
		generate();
		chart.hide(["b", "d"]);
		chart.internal.cache.remove(KEY.visibleTotalPerIndex);
		const values = vi.spyOn(chart.data, "values");

		for (let i = 0; i < 2; i++) {
			expect(ratio("a", i)).toBeCloseTo(1 / 6);
			expect(ratio("c", i)).toBeCloseTo(5 / 6);
		}
		expect(ratio("a", 2)).toBe(0);
		chart.internal.redraw({withTransition: false});
		expect(values).toHaveBeenCalledTimes(1);
		chart.flush();
		expect(values).toHaveBeenCalledTimes(2);
	});

	it("refreshes totals when hidden series change, including before redraw", () => {
		generate();
		chart.hide(["b", "d"]);
		expect(ratio("a")).toBeCloseTo(1 / 6);
		chart.show("b");
		expect(ratio("a")).toBeCloseTo(1 / 9);
		chart.internal.removeHiddenTargetIds(["d"]);
		expect(ratio("a")).toBeCloseTo(1 / 14);
		chart.internal.addHiddenTargetIds(["b"]);
		expect(ratio("a")).toBeCloseTo(1 / 11);
	});

	it("refreshes per-group totals after regrouping and loading", () => {
		generate(true);
		chart.hide("b");
		expect(ratio("a")).toBe(1);
		expect(ratio("c")).toBe(0.5);
		chart.groups([["a", "c"], ["b", "d"]]);
		expect(ratio("a")).toBeCloseTo(1 / 6);
		expect(ratio("d")).toBe(1);
		chart.load({columns: [["c", 90, 180, 0]]});
		expect(ratio("a")).toBeCloseTo(0.1);
	});
});
