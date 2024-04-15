/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {scaleOrdinal as d3ScaleOrdinal} from "d3-scale";
import {select as d3Select} from "d3-selection";
import {d3Selection} from "../../../types";
import {$ARC, $COLOR, $SHAPE} from "../../config/classes";
import {document} from "../../module/browser";
import {KEY} from "../../module/Cache";
import {isFunction, isObject, isString, notEmpty} from "../../module/util";
import type {IArcData, IDataRow} from "../data/IData";

/**
 * Set pattern's background color
 * (it adds a <rect> element to simulate bg-color)
 * @param {SVGPatternElement} pattern SVG pattern element
 * @param {string} color Color string
 * @param {string} id ID to be set
 * @returns {{id: string, node: SVGPatternElement}}
 * @private
 */
const colorizePattern = (pattern, color, id: string) => {
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

/**
 * Get color pattern from CSS file
 * CSS should be defined as: background-image: url("#00c73c;#fa7171; ...");
 * @param {d3Selection} element Chart element
 * @returns {Array}
 * @private
 */
function getColorFromCss(element: d3Selection): string[] {
	const cacheKey = KEY.colorPattern;
	const {body} = document;
	let pattern = body[cacheKey];

	if (!pattern) {
		const delimiter = ";";
		const content = element
			.classed($COLOR.colorPattern, true)
			.style("background-image");

		element.classed($COLOR.colorPattern, false);

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
}

// Replacement of d3.schemeCategory10.
// Contained differently depend on d3 version: v4(d3-scale), v5(d3-scale-chromatic)
const schemeCategory10 = [
	"#1f77b4",
	"#ff7f0e",
	"#2ca02c",
	"#d62728",
	"#9467bd",
	"#8c564b",
	"#e377c2",
	"#7f7f7f",
	"#bcbd22",
	"#17becf"
];

export default {
	generateColor(): Function {
		const $$ = this;
		const {$el, config} = $$;
		const colors = config.data_colors;
		const callback = config.data_color;
		const ids: string[] = [];

		let pattern = notEmpty(config.color_pattern) ?
			config.color_pattern :
			d3ScaleOrdinal(getColorFromCss($el.chart) || schemeCategory10).range();

		const originalColorPattern = pattern;

		if (isFunction(config.color_tiles)) {
			const tiles = config.color_tiles.bind($$.api)();

			// Add background color to patterns
			const colorizedPatterns = pattern.map((p, index) => {
				const color = p.replace(/[#\(\)\s,]/g, "");
				const id = `${$$.state.datetimeId}-pattern-${color}-${index}`;

				return colorizePattern(tiles[index % tiles.length], p, id);
			});

			pattern = colorizedPatterns.map(p => `url(#${p.id})`);
			$$.patterns = colorizedPatterns;
		}

		return function(d: IDataRow | IArcData | string): string {
			const id: string = (d as IDataRow).id ||
				(d as IArcData).data?.id ||
				d as string;

			const isLine = $$.isTypeOf(id, ["line", "spline", "step"]) || !config.data_types[id];
			let color;

			// if callback function is provided
			if (isFunction(colors[id])) {
				color = colors[id].bind($$.api)(d);

				// if specified, choose that color
			} else if (colors[id]) {
				color = colors[id];

				// if not specified, choose from pattern
			} else {
				if (ids.indexOf(id) < 0) {
					ids.push(id);
				}

				color = isLine ?
					originalColorPattern[ids.indexOf(id) % originalColorPattern.length] :
					pattern[ids.indexOf(id) % pattern.length];

				colors[id] = color;
			}

			return isFunction(callback) ? callback.bind($$.api)(color, d) : color;
		};
	},

	generateLevelColor(): Function | null {
		const $$ = this;
		const {config} = $$;
		const colors = config.color_pattern;
		const threshold = config.color_threshold;
		const asValue = threshold.unit === "value";
		const max = threshold.max || 100;
		const values = threshold.values &&
				threshold.values.length ?
			threshold.values :
			[];

		return notEmpty(threshold) ?
			function(value) {
				const v = asValue ? value : (value * 100 / max);
				let color = colors[colors.length - 1];

				for (let i = 0, l = values.length; i < l; i++) {
					if (v <= values[i]) {
						color = colors[i];
						break;
					}
				}

				return color;
			} :
			null;
	},

	/**
	 * Append data backgound color filter definition
	 * @param {string|object} color Color string
	 * @param {object} attr filter attribute
	 * @private
	 */
	generateTextBGColorFilter(color: string | object, attr = {
		x: 0,
		y: 0,
		width: 1,
		height: 1
	}): void {
		const $$ = this;
		const {$el, state} = $$;

		if (color) {
			let ids: string[] = [];

			if (isString(color)) {
				ids.push("");
			} else if (isObject(color)) {
				ids = Object.keys(color);
			}

			ids.forEach(v => {
				const id = `${state.datetimeId}-labels-bg${$$.getTargetSelectorSuffix(v)}${
					isString(color) ? $$.getTargetSelectorSuffix(color) : ""
				}`;

				$el.defs.append("filter")
					.attr("x", attr.x)
					.attr("y", attr.y)
					.attr("width", attr.width)
					.attr("height", attr.height)
					.attr("id", id)
					.html(
						`<feFlood flood-color="${v === "" ? color : color[v]}" />
						<feComposite in="SourceGraphic" />`
					);
			});
		}
	},

	/**
	 * Get data gradient color url
	 * @param {string} id Data id
	 * @returns {string}
	 * @private
	 */
	getGradienColortUrl(id: string): string {
		return `url(#${this.state.datetimeId}-gradient${this.getTargetSelectorSuffix(id)})`;
	},

	/**
	 * Update linear/radial gradient definition
	 * - linear: area & bar only
	 * - radial: type which has data points only
	 * @private
	 */
	updateLinearGradient(): void {
		const $$ = this;
		const {config, data: {targets}, state: {datetimeId}, $el: {defs}} = $$;

		targets.forEach(d => {
			const id = `${datetimeId}-gradient${$$.getTargetSelectorSuffix(d.id)}`;
			const radialGradient = $$.hasPointType() && config.point_radialGradient;
			const supportedType = ($$.isAreaType(d) && "area") || ($$.isBarType(d) && "bar");

			if ((radialGradient || supportedType) && defs.select(`#${id}`).empty()) {
				const color = $$.color(d);
				const gradient = {
					defs: <null | d3Selection>null,
					stops: <[number, string | Function | null, number][]>[]
				};

				if (radialGradient) {
					const {
						cx = 0.3,
						cy = 0.3,
						r = 0.7,
						stops = [[0.1, color, 0], [0.9, color, 1]]
					} = radialGradient;

					gradient.stops = stops;
					gradient.defs = defs.append("radialGradient")
						.attr("id", `${id}`)
						.attr("cx", cx)
						.attr("cy", cy)
						.attr("r", r);
				} else {
					const isRotated = config.axis_rotated;
					const {
						x = isRotated ? [1, 0] : [0, 0],
						y = isRotated ? [0, 0] : [0, 1],
						stops = [[0, color, 1], [1, color, 0]]
					} = config[`${supportedType}_linearGradient`];

					gradient.stops = stops;
					gradient.defs = defs.append("linearGradient")
						.attr("id", `${id}`)
						.attr("x1", x[0])
						.attr("x2", x[1])
						.attr("y1", y[0])
						.attr("y2", y[1]);
				}

				gradient.stops.forEach((v: [number, string | Function | null, number]) => {
					const [offset, stopColor, stopOpacity] = v;
					const colorValue = isFunction(stopColor) ?
						stopColor.bind($$.api)(d.id) :
						stopColor;

					gradient.defs && gradient.defs.append("stop")
						.attr("offset", offset)
						.attr("stop-color", colorValue || color)
						.attr("stop-opacity", stopOpacity);
				});
			}
		});
	},

	/**
	 * Set the data over color.
	 * When is out, will restate in its previous color value
	 * @param {boolean} isOver true: set overed color, false: restore
	 * @param {number|object} d target index or data object for Arc type
	 * @private
	 */
	setOverColor(isOver: boolean, d): void {
		const $$ = this;
		const {config, $el: {main}} = $$;
		const onover = config.color_onover;
		let color = isOver ? onover : $$.color;

		if (isObject(color)) {
			color = ({id}) => (id in onover ? onover[id] : $$.color(id));
		} else if (isString(color)) {
			color = () => onover;
		} else if (isFunction(onover)) {
			color = color.bind($$.api);
		}

		main.selectAll(
			isObject(d) ?
				// when is Arc type
				`.${$ARC.arc}${$$.getTargetSelectorSuffix(d.id)}` :
				`.${$SHAPE.shape}-${d}`
		).style("fill", color);
	}
};
