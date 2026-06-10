/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {describe, expect, it} from "vitest";

import {
	getAdditionalAxisScale,
	getAdditionalAxisTickFormat,
	getAdditionalAxisTickValues,
	getSubXTickValues,
	getXScale,
	getXTickLinePosition,
	getXTickLineValues,
	getXTickValues,
	getYGridTickValues,
	getYTickValues,
	isSameTickValue,
	normalizeXValue,
	normalizeYValue
} from "../../src/canvas/axisTicks";

function makeScale(initialDomain = [0, 10], initialRange = [0, 100]) {
	let domain = initialDomain.slice();
	const range = initialRange.slice();

	function scale(value) {
		const [d0, d1] = domain.map(Number);
		const [r0, r1] = range;

		return r0 + ((Number(value) - d0) / (d1 - d0)) * (r1 - r0);
	}

	scale.domain = next => {
		if (!next) {
			return domain;
		}

		domain = next.slice();
		return scale;
	};
	scale.range = () => range;
	scale.ticks = (count = 5) => {
		const len = Math.max(1, count);

		return Array.from({length: len}, (_, i) => (
			len === 1 ? domain[0] : domain[0] + ((domain[1] - domain[0]) * i / (len - 1))
		));
	};
	scale.copy = () => makeScale(domain, range);
	scale.invert = pixel => {
		const [d0, d1] = domain.map(Number);
		const [r0, r1] = range;

		return d0 + ((pixel - r0) / (r1 - r0)) * (d1 - d0);
	};
	scale.orgDomain = () => domain;
	scale.orgScale = () => scale;

	return scale;
}

function getInternal(overrides = {}) {
	const target = {
		id: "data1",
		values: [0, 1, 2, 3, 4, 5].map(index => ({
			id: "data1",
			index,
			x: index,
			value: index
		}))
	};
	const $$ = {
		api: {name: "api"},
		axis: {
			generateTickValues(values, count) {
				return count ? values.slice(0, count) : values;
			},
			isCategorized: () => false,
			isLog: () => false,
			isTimeSeries: () => false,
			x: {
				tickOffset: () => 5
			},
			y: {}
		},
		config: {
			axis_rotated: false,
			axis_x_categories: [],
			axis_x_tick_count: undefined,
			axis_x_tick_culling: true,
			axis_x_tick_culling_lines: true,
			axis_x_tick_culling_max: 4,
			axis_x_tick_culling_reverse: false,
			axis_x_tick_fit: false,
			axis_x_tick_outer: true,
			axis_x_tick_values: undefined,
			axis_y_tick_count: undefined,
			axis_y_tick_stepSize: undefined,
			axis_y_tick_time_value: undefined,
			axis_y_tick_values: undefined,
			axis_y2_tick_count: undefined,
			axis_y2_tick_stepSize: undefined,
			axis_y2_tick_time_value: undefined,
			axis_y2_tick_values: undefined,
			data_xFormat: "%Y-%m-%d",
			grid_y_ticks: undefined
		},
		data: {targets: [target]},
		filterTargetsToShow(targets) {
			return targets ?? this.data.targets;
		},
		format: {
			dataTime: () => value => new Date(`${value}T00:00:00Z`)
		},
		getTargetsToShow: null,
		mapTargetsToUniqueXs: targets => targets[0].values.map(v => v.x),
		scale: {
			x: makeScale(),
			subX: makeScale(),
			y: makeScale(),
			y2: makeScale([1, 100]),
			zoom: null
		},
		state: {
			dataGeneration: 1,
			height: 120,
			height2: 40,
			redrawGeneration: 1,
			width: 320,
			width2: 160
		},
		zoom: {
			getDomain: () => [2, 8]
		}
	};

	const {axis, config, scale, state, ...rest} = overrides;

	Object.assign($$, rest);
	axis && Object.assign($$.axis, axis);
	config && Object.assign($$.config, config);
	scale && Object.assign($$.scale, scale);
	state && Object.assign($$.state, state);

	return $$;
}

describe("ESM canvas axis tick coverage", () => {
	it("normalizes category, timeseries and log axis values", () => {
		const category = getInternal({
			axis: {isCategorized: () => true},
			config: {axis_x_categories: ["alpha", "beta"]}
		});
		const timeseries = getInternal({
			axis: {isTimeSeries: id => id === "x"}
		});
		const log = getInternal({
			axis: {isLog: id => id === "y"}
		});

		expect(normalizeXValue(category, "beta")).to.be.equal(1);
		expect(normalizeXValue(category, "missing")).to.be.equal("missing");
		expect(+normalizeXValue(timeseries, "2026-01-02")).to.be.equal(+new Date("2026-01-02T00:00:00Z"));
		expect(normalizeYValue(log, "10")).to.be.equal(10);
		expect(isSameTickValue(new Date(10), 10)).to.be.true;
		expect(isSameTickValue("a", "b")).to.be.false;
	});

	it("uses the zoom scale only when its domain is narrowed", () => {
		const $$ = getInternal({
			scale: {
				zoom: makeScale([2, 8])
			}
		});

		expect(getXScale($$).domain()).to.be.deep.equal([2, 8]);

		$$.scale.zoom.domain([0, 10]);
		expect(getXScale($$)).to.be.equal($$.scale.x);
	});

	it("resolves x ticks from explicit, fit, zoom, category and scale paths", () => {
		const explicit = getInternal({
			axis: {isCategorized: () => true},
			config: {
				axis_x_categories: ["a", "b"],
				axis_x_tick_culling: false,
				axis_x_tick_values: () => ["a", "missing", 1]
			}
		});

		expect(getXTickValues(explicit, true)).to.be.deep.equal([0, 1]);

		const fit = getInternal({
			config: {
				axis_x_tick_count: 3,
				axis_x_tick_fit: true
			}
		});

		expect(getXTickValues(fit, true)).to.be.deep.equal([0, 1, 2]);
		expect(getXTickValues(fit, true)).to.be.deep.equal([0, 1, 2]);

		const zoomed = getInternal({
			config: {
				axis_x_tick_fit: false
			},
			scale: {
				zoom: makeScale([2, 8])
			}
		});

		expect(getXTickValues(zoomed, false)).to.include.members([2, 8]);

		const category = getInternal({
			axis: {isCategorized: () => true},
			config: {
				axis_x_categories: ["a", "b", "c"],
				axis_x_tick_fit: false
			}
		});

		expect(getXTickValues(category, false)).to.be.deep.equal([0, 1, 2]);
		expect(getXTickValues(getInternal({config: {axis_x_tick_count: 2}}), false)).to.have.length(2);
		expect(getXTickValues(getInternal({getTargetsToShow: () => []}))).to.be.deep.equal([]);
	});

	it("resolves subchart ticks across explicit, fit, category and scale paths", () => {
		expect(getSubXTickValues(getInternal({scale: {subX: null}}))).to.be.deep.equal([]);

		const explicit = getInternal({
			axis: {isCategorized: () => true},
			config: {
				axis_x_categories: ["a", "b"],
				axis_x_tick_values: ["a", "none", 1]
			}
		});

		expect(getSubXTickValues(explicit)).to.be.deep.equal([0, 1]);
		expect(getSubXTickValues(getInternal({
			config: {
				axis_x_tick_count: 2,
				axis_x_tick_fit: true
			}
		}))).to.be.deep.equal([0, 1]);
		expect(getSubXTickValues(getInternal({
			axis: {isCategorized: () => true},
			config: {
				axis_x_categories: ["a", "b", "c"],
				axis_x_tick_fit: false
			}
		}))).to.be.deep.equal([0, 1, 2]);
		expect(getSubXTickValues(getInternal({
			config: {
				axis_x_tick_count: 3,
				axis_x_tick_fit: false
			}
		}))).to.have.length(3);
	});

	it("deduplicates x tick lines and handles category boundaries", () => {
		const category = getInternal({
			axis: {isCategorized: () => true},
			config: {
				axis_x_categories: ["a", "b", "c"]
			},
			scale: {
				x: makeScale([0, 3], [0, 30])
			}
		});

		expect(getXTickLinePosition(category, 1)).to.be.equal(10);
		expect(getXTickLineValues(category, [0, 1, 2], 1)).to.be.deep.equal([1, 2]);

		const fallback = getInternal({
			axis: {
				isCategorized: () => true,
				x: {tickOffset: () => 7}
			}
		});

		fallback.scale.x.orgScale = undefined;
		expect(getXTickLinePosition(fallback, 1)).to.be.equal(3);

		const linear = getInternal({
			config: {
				axis_x_tick_culling: false
			},
			scale: {
				x: makeScale([0, 2], [0, 2])
			}
		});

		expect(getXTickLineValues(linear, [0, 1, 2], 1)).to.be.deep.equal([0, 1, 2]);
	});

	it("resolves y ticks from explicit, step, time, log, count and grid paths", () => {
		expect(getYTickValues(getInternal({
			config: {axis_y_tick_values: ["1", 2]}
		}))).to.be.deep.equal(["1", 2]);
		expect(getYTickValues(getInternal({
			config: {axis_y_tick_stepSize: 3}
		}))).to.be.deep.equal([0, 3, 6, 9]);
		expect(getYTickValues(getInternal({
			axis: {isTimeSeries: id => id === "y"},
			config: {axis_y_tick_time_value: 2}
		}))).to.have.length(2);
		expect(getYTickValues(getInternal({
			axis: {isLog: id => id === "y2"}
		}), "y2")).to.not.be.empty;
		expect(getYTickValues(getInternal({
			config: {axis_y_tick_count: 3},
			scale: {y: makeScale([0, 0])}
		}))).to.be.deep.equal([0]);
		expect(getYGridTickValues(getInternal({
			axis: {y: {getGeneratedTicks: () => [9, 10]}},
			config: {grid_y_ticks: 2}
		}))).to.be.deep.equal([9, 10]);
		expect(getYGridTickValues(getInternal({
			config: {grid_y_ticks: 2}
		}))).to.have.length(2);
	});

	it("resolves additional axis scales, ticks and formatters", () => {
		const $$ = getInternal({
			axis: {
				isCategorized: () => true,
				isLog: id => id === "y2"
			},
			config: {axis_x_categories: ["a", "b"]}
		});
		const scale = getAdditionalAxisScale($$, "x", {domain: [1, 5]});

		expect(scale.domain()).to.be.deep.equal([1, 5]);
		expect(getAdditionalAxisTickValues($$, "x", scale, {tick: {values: ["a", "b", "z"]}}))
			.to.be.deep.equal([0, 1]);
		expect(getAdditionalAxisTickValues($$, "y2", $$.scale.y2, {tick: {count: 3}}))
			.to.not.be.empty;
		expect(getAdditionalAxisTickFormat($$, {
			tick: {
				format(value) {
					expect(this).to.be.equal($$.api);
					return `v:${value}`;
				}
			}
		})(3)).to.be.equal("v:3");
		expect(getAdditionalAxisTickFormat($$, {})(4)).to.be.equal(4);
	});

	it("keeps zoom endpoints, falls back for invalid zoom data ticks and culls single ticks", () => {
		const zoomed = getInternal({
			config: {
				axis_x_tick_fit: false
			},
			scale: {
				zoom: makeScale([2, 8])
			},
			zoom: {
				getDomain: () => [1.5, 8.5]
			}
		});

		expect(getXTickValues(zoomed, false)).to.include.members([1.5, 8.5]);

		const invalidData = getInternal({
			config: {
				axis_x_tick_fit: true
			},
			mapTargetsToUniqueXs: () => ["bad", 5],
			scale: {
				zoom: makeScale([2, 8])
			}
		});

		expect(getXTickValues(invalidData, false)).to.be.deep.equal(["bad", 5]);

		expect(getXTickValues(getInternal({
			axis: {isCategorized: () => true},
			config: {
				axis_x_categories: ["a", "b", "c", "d"],
				axis_x_tick_count: 1,
				axis_x_tick_fit: false
			}
		}))).to.be.deep.equal([0]);
	});

	it("uses text ticks when x tick lines overlap", () => {
		const denseTicks = Array.from({length: 21}, (_, i) => i);
		const dense = getInternal({
			config: {
				axis_x_tick_values: denseTicks
			},
			scale: {
				x: makeScale([0, 20], [0, 10])
			}
		});

		expect(getXTickLineValues(dense, denseTicks.slice(0, 3), 5))
			.to.be.deep.equal([0, 1, 2]);
	});

	it("handles invalid category line domains and reverse string culling", () => {
		const emptyCategory = getInternal({
			axis: {isCategorized: () => true},
			scale: {
				x: makeScale()
			}
		});

		emptyCategory.scale.x.orgDomain = () => [];
		expect(getXTickLineValues(emptyCategory, [])).to.be.deep.equal([]);

		const invalidCategory = getInternal({
			axis: {isCategorized: () => true},
			scale: {
				x: makeScale()
			}
		});

		invalidCategory.scale.x.orgDomain = () => ["a", "b"];
		expect(getXTickLineValues(invalidCategory, [])).to.be.deep.equal([]);

		const reverseStrings = getInternal({
			config: {
				axis_x_tick_culling_max: 2,
				axis_x_tick_culling_reverse: true,
				axis_x_tick_values: ["b", "a", "c", "d"]
			}
		});

		expect(getXTickValues(reverseStrings, true)).to.be.deep.equal(["a", "d"]);

		const rotatedCull = getInternal({
			axis: {isCategorized: () => true},
			config: {
				axis_rotated: true,
				axis_x_categories: ["a", "b", "c", "d", "e"],
				axis_x_tick_fit: false,
				axis_x_tick_culling_max: undefined
			},
			state: {
				height: 80
			}
		});

		expect(getXTickValues(rotatedCull, true).length).to.be.lessThan(5);
	});
});
