/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {scaleOrdinal as d3ScaleOrdinal} from "d3-scale";
import ChartInternal from "./ChartInternal";
import {document, window} from "./browser";
import CLASS from "../config/classes";
import {notEmpty, extend, isFunction, isObject, isString} from "./util";

/**
 * Set pattern's background color
 * (it adds a <rect> element to simulate bg-color)
 * @param {SVGPatternElement} pattern SVG pattern element
 * @param {String} color Color string
 * @param {String} id ID to be set
 * @return {{id: string, node: SVGPatternElement}}
 * @private
 */
const colorizePattern = (pattern, color, id) => {
	const node = d3Select(pattern.cloneNode(true));

	node
		.attr("id", id)
		.insert("rect", ":first-child")
		.attr("width", node.attr("width"))
		.attr("height", node.attr("height"))
		.style("fill", color);

	return {
		id,
		node: node.node()
	};
};

// Replacement of d3.schemeCategory10.
// Contained differently depend on d3 version: v4(d3-scale), v5(d3-scale-chromatic)
const schemeCategory10 = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

extend(ChartInternal.prototype, {
	/**
	 * Get color pattern from CSS file
	 * CSS should be defined as: background-image: url("#00c73c;#fa7171; ...");
	 * @return {Array}
	 * @private
	 */
	getColorFromCss() {
		const cacheKey = "__colorPattern__";
		const body = document.body;
		let pattern = body[cacheKey];

		if (!pattern) {
			const delimiter = ";";
			const span = document.createElement("span");

			span.className = CLASS.colorPattern;
			span.style.display = "none";
			body.appendChild(span);

			const content = window.getComputedStyle(span).backgroundImage;

			span.parentNode.removeChild(span);

			if (content.indexOf(delimiter) > -1) {
				pattern = content
					.replace(/url[^#]*|["'()]|(\s|%20)/g, "")
					.split(delimiter)
					.map(v => v.trim().replace(/[\"'\s]/g, ""))
					.filter(Boolean);

				body[cacheKey] = pattern;
			}
		}

		return pattern;
	},

	generateColor() {
		const $$ = this;
		const config = $$.config;
		const colors = config.data_colors;
		const callback = config.data_color;
		const ids = [];

		let pattern = notEmpty(config.color_pattern) ? config.color_pattern :
			d3ScaleOrdinal($$.getColorFromCss() || schemeCategory10).range();

		const originalColorPattern = pattern;

		if (isFunction(config.color_tiles)) {
			const tiles = config.color_tiles();

			// Add background color to patterns
			const colorizedPatterns = pattern.map((p, index) => {
				const color = p.replace(/[#\(\)\s,]/g, "");
				const id = `${$$.datetimeId}-pattern-${color}-${index}`;

				return colorizePattern(tiles[index % tiles.length], p, id);
			});

			pattern = colorizedPatterns.map(p => `url(#${p.id})`);
			$$.patterns = colorizedPatterns;
		}

		return function(d) {
			const id = d.id || (d.data && d.data.id) || d;
			const isLine = $$.isTypeOf(id, ["line", "spline", "step"]) || !$$.config.data_types[id];
			let color;

			// if callback function is provided
			if (isFunction(colors[id])) {
				color = colors[id](d);

			// if specified, choose that color
			} else if (colors[id]) {
				color = colors[id];

			// if not specified, choose from pattern
			} else {
				if (ids.indexOf(id) < 0) {
					ids.push(id);
				}

				color = isLine ? originalColorPattern[ids.indexOf(id) % originalColorPattern.length] :
					pattern[ids.indexOf(id) % pattern.length];

				colors[id] = color;
			}

			return isFunction(callback) ?
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
			const v = asValue ? value : (value * 100 / max);
			let color = colors[colors.length - 1];

			for (let i = 0, l = values.length; i < l; i++) {
				if (v <= values[i]) {
					color = colors[i];
					break;
				}
			}

			return color;
		} : null;
	},

	/**
	 * Set the data over color.
	 * When is out, will restore in its previous color value
	 * @param {Boolean} isOver true: set overed color, false: restore
	 * @param {Number|Object} d target index or data object for Arc type
	 * @private
	 */
	setOverColor(isOver, d) {
		const $$ = this;
		const config = $$.config;
		const onover = config.color_onover;
		let color = isOver ? onover : $$.color;

		if (isObject(color)) {
			color = ({id}) => (id in onover ? onover[id] : $$.color(id));
		} else if (isString(color)) {
			color = () => onover;
		}

		// when is Arc type
		if (isObject(d)) {
			$$.main.selectAll(`.${CLASS.arc}${$$.getTargetSelectorSuffix(d.id)}`)
				.style("fill", color(d));
		} else {
			$$.main.selectAll(`.${CLASS.shape}-${d}`)
				.style("fill", color);
		}
	}
});
