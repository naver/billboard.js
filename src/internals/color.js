/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	scaleOrdinal as d3ScaleOrdinal,
	schemeCategory10 as d3SchemeCategory10
} from "d3";
import ChartInternal from "./ChartInternal";
import {notEmpty, extend, isFunction, colorizePattern} from "./util";

extend(ChartInternal.prototype, {
	generateColor() {
		const $$ = this;
		const config = $$.config;
		const colors = config.data_colors;
		const callback = config.data_color;
		const ids = [];
		let pattern = notEmpty(config.color_pattern) ?
			config.color_pattern : d3ScaleOrdinal(d3SchemeCategory10).range();

		if (isFunction(config.pattern)) {
			const patterns = config.pattern(pattern, colorizePattern);

			pattern = patterns.map(p => `url("#${p.id}")`);
			$$.patterns = patterns;
		}

		return function(d) {
			const id = d.id || (d.data && d.data.id) || d;
			let color;

			// if callback function is provided
			if (colors[id] instanceof Function) {
				color = colors[id](d);

			// if specified, choose that color
			} else if (colors[id]) {
				color = colors[id];

			// if not specified, choose from pattern
			} else {
				if (ids.indexOf(id) < 0) { ids.push(id); }
				color = pattern[ids.indexOf(id) % pattern.length];
				colors[id] = color;
			}

			return callback instanceof Function ?
				callback(color, d) : color;
		};
	},

	generateLevelColor() {
		const $$ = this;
		const config = $$.config;
		const colors = config.color_pattern;
		const threshold = config.color_threshold;

		const asValue = threshold.unit === "value";
		const max = threshold.max || 100;
		const values = threshold.values &&
			threshold.values.length ? threshold.values : [];

		return notEmpty(threshold) ? function(value) {
			let color = colors[colors.length - 1];

			for (let i = 0, v; i < values.length; i++) {
				v = asValue ? value : (value * 100 / max);
				if (v < values[i]) {
					color = colors[i];
					break;
				}
			}

			return color;
		} : null;
	}
});
