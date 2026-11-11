/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {scaleLinear as d3ScaleLinear} from "d3-scale";
import {getElementPos, isArray, isFunction, isNumber, isObject} from "../../../module/util";
import type {IBulletData} from "../../data/IData";
import {getTextPos} from "../../internals/text.util";

// class names of the bullet elements
export const $BULLET = {
	bullet: "bb-bullet",
	chartBullet: "bb-chart-bullet",
	chartBullets: "bb-chart-bullets",
	bulletRange: "bb-bullet-range",
	bulletMeasure: "bb-bullet-measure",
	bulletTarget: "bb-bullet-target",
	bulletAxis: "bb-bullet-axis",
	bulletTitle: "bb-bullet-title"
};

export interface IBulletAxis {
	scale: any;
	count: number;
	ticks: number[];
	format: (value: number) => string;
	// what the axis is drawn with: when it is the same, redrawing it would only replace its text nodes
	key: string;
}

export interface IBulletLayout {
	rows: IBulletData[];
	area: {left: number, top: number, width: number, height: number};
	isRotated: boolean;
	axisSize: number;
	band: number;
	bandInner: number;
	axisLen: number;
	// axis (scale, ticks, format) shared by the rows with the same domain
	axes: Map<string, IBulletAxis>;
}

export interface IBulletGeometry {
	area: {left: number, top: number};
	offset: {x: number, y: number};
	// fill is the color given by bullet.range.colors, null for the theme default at position t (0 ~ 1)
	ranges: {x: number, y: number, width: number, height: number, fill: string | null, t: number}[];
	isDot: boolean;
	measure: {[key: string]: number};
	color: string;
	// comparative target markers: one per target value
	targets: {x1: number, x2: number, y1: number, y2: number}[];
	axis: (IBulletAxis & {rotated: boolean, x: number, y: number}) | null;
	// anchor of the data label (beside the measure, or above it when rotated), and the measure center
	label: {x: number, y: number, center: {x: number, y: number}};
	// title of the row, relative to the row origin: null when the titles are not shown
	title: {text: string, x: number, y: number, anchor: "end" | "middle"} | null;
}

// room kept for the first/last tick labels of the horizontal axis
const AXIS_EDGE = 16;

// a number that can be drawn: NaN or Infinity would make every position of its row NaN
const isValid = (v): v is number => Number.isFinite(v);

// the property of the object itself: "constructor" or "toString" as a data id is not a key
const own = (obj, key: string) =>
	obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : undefined;

/**
 * Get the min and max of the values, and 0.
 * (not Math.min(...values): too many values are too many arguments)
 * @param {Array} values Values
 * @returns {Array} Min and max
 * @private
 */
function _getExtent(values: number[]): [number, number] {
	let min = 0;
	let max = 0;

	values.forEach(v => {
		min = Math.min(min, v);
		max = Math.max(max, v);
	});

	return [min, max];
}

/**
 * Get the title text of the given bullet row
 * @param {string} id Data id
 * @param {number} value Measure value
 * @returns {string} Title text
 * @private
 */
function _getTitleText(id: string, value: number): string {
	const {config, api} = this;
	const text = config.bullet_title_text;
	let resolved;

	if (isFunction(text)) {
		resolved = text.call(api, id, value);
	} else if (isObject(text)) {
		resolved = own(text, id);
	}

	// the same name as the legend and the tooltip, by default
	return String(resolved ?? own(config.data_names, id) ?? id);
}

/**
 * Get the space the titles of the rows take: the width of the widest one (horizontal),
 * or the height of the line under the columns (rotated)
 * @param {Array} rows Bullet rows
 * @returns {number} Size in px
 * @private
 */
function _getTitleSize(rows: IBulletData[]): number {
	const $$ = this;
	const {config, cache, state: {isCanvasMode}, $el} = $$;

	if (config.bullet_rotated) {
		return 18;
	}

	const titles = rows.map(d => d.title);
	const key = `bullet-title-${isCanvasMode}-${titles.join("\u0000")}`;
	let width: number = cache.get(key) || 0;

	if (!width && isCanvasMode && $$.canvasRenderer) {
		const {ctx} = $$.canvasRenderer;

		ctx.save();
		ctx.font = $$.canvasTheme.style.bullet.titleFont;
		width = titles.reduce((w, v) => Math.max(w, ctx.measureText(v).width), 0);
		ctx.restore();
	} else if (!width && !isCanvasMode && $el.bullet) {
		const text = $el.bullet.append("text")
			.attr("class", $BULLET.bulletTitle)
			.style("visibility", "hidden");

		titles.forEach(v => {
			width = Math.max(width, text.text(v).node().getComputedTextLength?.() || 0);
		});
		text.remove();
	}

	if (width) {
		cache.add(key, width);
	} else {
		// it can not be measured yet (not drawn): estimate from the characters
		width = titles.reduce((n, v) => Math.max(n, v.length), 0) * 6.5;
	}

	// the gap to the plot
	return Math.ceil(width) + 8;
}

/**
 * Get the plot area of the bullets
 * @param {Array} rows Bullet rows, when the caller has them already
 * @returns {object} size object
 * @private
 */
function _getArea(
	rows?: IBulletData[]
): {width: number, height: number, left: number, top: number} {
	const $$ = this;
	const {config, state: {current: {width, height}, isCanvasMode, isLegendRight}} = $$;
	const padding = $$.getCurrentPadding();
	// canvas mode draws the legend as HTML outside of its drawing surface: only the gap is needed
	const legendHeight = config.legend_show && config.legend_position === "bottom" ?
		(isCanvasMode ? 0 : $$.getLegendHeight()) + 10 :
		0;
	const surfaceHeight = isCanvasMode ? $$.getCanvasSurfaceHeight() : height;

	// keep room for the first/last tick labels of the horizontal axis
	const edge = config.bullet_axis_show && !config.bullet_rotated ? AXIS_EDGE : 0;

	// the right legend sits beside the plot: same spacing as the axis types
	const legendRight = config.legend_show && isLegendRight ?
		$$.getLegendWidth() + (config.padding?.mode === "fit" ? 0 : 20) :
		0;

	const hasLabel = !config.bullet_rotated && config.bullet_label_show && $$.hasDataLabel();
	const list: IBulletData[] = hasLabel || config.bullet_title_show ?
		(rows ?? $$.getBulletData()) :
		[];

	// the label of a row is past the end of the plot, when its bar ends at the axis end:
	// the value reaches the max of the scale (or is above it), or nothing of it is above 0
	// (a minus sign needs room as well)
	const labelRoom = hasLabel && list.some(d => d.domainMax <= 0 || d.value >= d.domainMax) ?
		14 :
		0;

	// the titles are beside the plot, or under it when rotated
	const titleSize = config.bullet_title_show ? _getTitleSize.call($$, list) : 0;
	const titleWidth = config.bullet_rotated ? 0 : titleSize;
	const titleHeight = config.bullet_rotated ? titleSize : 0;

	// canvas title padding ends at the text baseline, SVG one also covers the descent
	const top = padding.top + (isCanvasMode ? $$.getCanvasTitleDescent?.() || 0 : 0);

	return {
		width: Math.max(
			0,
			width - padding.left - padding.right - edge * 2 - labelRoom - titleWidth - legendRight
		),
		height: Math.max(0, surfaceHeight - legendHeight - top - padding.bottom - titleHeight),
		left: padding.left + edge + titleWidth,
		top
	};
}

/**
 * Get the space (in px) reserved for the axis of each bullet
 * @returns {number} axis size
 * @private
 */
function _getAxisSize(): number {
	const {config} = this;

	return config.bullet_axis_show ? (config.bullet_rotated ? 34 : 20) : 0;
}

/**
 * Resolve the qualitative range thresholds for the given bullet row
 * @param {string} id Data id
 * @param {number} value Measure value
 * @returns {Array} Ascending range thresholds
 * @private
 */
function _getRanges(id: string, value: number): number[] {
	const ranges = this.config.bullet_ranges;
	let resolved: number[] = [];

	if (isFunction(ranges)) {
		resolved = ranges.call(this.api, id, value) || [];
	} else if (isArray(ranges)) {
		resolved = ranges;
	} else if (isObject(ranges) && isArray(ranges[id])) {
		resolved = ranges[id];
	}

	return resolved
		.filter(isValid)
		.sort((a, b) => a - b);
}

/**
 * Resolve the comparative target values for the given bullet row
 * @param {string} id Data id
 * @param {number} value Measure value
 * @returns {Array} Target values: empty when there is none
 * @private
 */
function _getTargets(id: string, value: number): number[] {
	const target = this.config.bullet_target;
	let resolved;

	if (isFunction(target)) {
		resolved = target.call(this.api, id, value);
	} else if (isArray(target) || isValid(target)) {
		resolved = target;
	} else if (isObject(target)) {
		resolved = own(target, id);
	}

	return (isArray(resolved) ? resolved : [resolved]).filter(isValid);
}

/**
 * Get the fill color given by bullet.range.colors for the qualitative range band
 * @param {number} index Band index (0 = smallest range)
 * @param {number} length Total number of bands
 * @returns {string|null} Color string, or null to use the default grayscale of the theme
 * @private
 */
function _getRangeColor(index: number, length: number): string | null {
	const colors = this.config.bullet_range_colors;

	if (isFunction(colors)) {
		return colors.call(this.api, index, length);
	} else if (isArray(colors) && colors[index]) {
		return colors[index];
	}

	return null;
}

/**
 * Get the axis (scale, ticks, format) for the given domain, shared between rows of same domain.
 * @param {IBulletLayout} layout Bullet layout
 * @param {number} domainMin Domain min value
 * @param {number} domainMax Domain max value
 * @returns {object} Axis
 * @private
 */
function _getAxis(layout: IBulletLayout, domainMin: number, domainMax: number): IBulletAxis {
	const {config, api} = this;
	const {axes, axisLen, isRotated} = layout;
	const key = `${domainMin}|${domainMax}`;
	let axis = axes.get(key);

	if (!axis) {
		const scale = d3ScaleLinear()
			.domain([domainMin, domainMax])
			.range(isRotated ? [axisLen, 0] : [0, axisLen]);
		const {
			bullet_axis_tick_count: tickCount,
			bullet_axis_tick_values: tickValues,
			bullet_axis_tick_format: tickFormat
		} = config;
		// the count is a hint for d3 to choose the ticks: it is approximate,
		// and there is no use of more ticks than the pixels of the axis
		const count = isValid(tickCount) && tickCount > 0 ?
			Math.min(tickCount, Math.max(2, axisLen)) :
			Math.max(2, Math.floor(axisLen / (isRotated ? 40 : 60)));
		const [min, max] = [domainMin, domainMax];
		// the given values out of the domain would be drawn out of the axis
		const ticks: number[] = isArray(tickValues) ?
			tickValues.filter(v => isValid(v) && v >= min && v <= max) :
			scale.ticks(count);
		const format: (value: number) => string = isFunction(tickFormat) ?
			(value: number) => String(tickFormat.call(api, value)) :
			scale.tickFormat(count);

		axis = {
			scale,
			count,
			ticks,
			format,
			// the rows of the same domain share the axis: its labels are made once
			key: `${scale.domain()}|${scale.range()}|${ticks}|${ticks.map(format)}`
		};
		axes.set(key, axis);
	}

	return axis;
}

/**
 * Get the layout shared by all bullet rows. Computed once per draw.
 * @returns {object} Bullet layout
 * @private
 */
function _getLayout(): IBulletLayout {
	const $$ = this;
	const {config} = $$;
	const rows: IBulletData[] = $$.getBulletData();
	const area = _getArea.call($$, rows);
	const isRotated = config.bullet_rotated;
	const axisSize = _getAxisSize.call($$);
	const band = (isRotated ? area.width : area.height) / (rows.length || 1);

	return {
		rows,
		area,
		isRotated,
		axisSize,
		band,
		bandInner: Math.max(0, band - config.bullet_padding - axisSize),
		axisLen: isRotated ? area.height : area.width,
		axes: new Map()
	};
}

/**
 * Get the geometry of a single bullet row, relative to the row origin.
 * Shared by the SVG and the canvas renderer.
 * @param {object} d Bullet row data
 * @param {object} layout Bullet layout
 * @returns {object} Row geometry
 * @private
 */
function _getRowGeometry(d: IBulletData, layout: IBulletLayout): IBulletGeometry {
	const $$ = this;
	const {config} = $$;
	const {area, isRotated, axisSize, band, bandInner, axisLen} = layout;
	const {height, left, top} = area;
	const {domainMin, domainMax} = d;
	const measureThickness = bandInner * config.bullet_width_ratio;
	const targetLen = bandInner * config.bullet_width_target_ratio;
	const scale = (v: number): number => ((v - domainMin) / (domainMax - domainMin)) * axisLen;
	// a position within the axis: the bar of a value out of the given axis range ends at its edge
	const pos = (v: number): number => Math.min(Math.max(scale(v), 0), axisLen);
	// the measure is drawn from the zero position to the value
	// (the nearest end of the axis, when its range does not include 0)
	const zero = pos(0);

	// qualitative range bands (largest first so smaller ones overlap on top)
	const ranges = d.ranges.map((value, index) => ({value, index}))
		.sort((a, b) => b.value - a.value)
		.map(({value, index}) => {
			const len = pos(value);

			return {
				...(isRotated ?
					{x: 0, y: height - len, width: bandInner, height: len} :
					{x: 0, y: 0, width: len, height: bandInner}),
				fill: _getRangeColor.call($$, index, d.ranges.length),
				// the default grayscale: smaller range (index 0) is the darkest
				t: index / Math.max(d.ranges.length - 1, 1)
			};
		});

	// measure (bar or dot)
	const isDot = config.bullet_type === "dot";
	const markerSize = config.bullet_marker_size || measureThickness / 2;
	const len = pos(d.value);
	const isNegative = d.value < 0;
	let measure;

	if (isDot) {
		measure = {
			cx: isRotated ? bandInner / 2 : len,
			cy: isRotated ? height - len : bandInner / 2,
			r: markerSize
		};
	} else {
		const size = Math.abs(len - zero);

		measure = isRotated ?
			{
				x: (bandInner - measureThickness) / 2,
				y: height - Math.max(zero, len),
				width: measureThickness,
				height: size
			} :
			{
				x: Math.min(zero, len),
				y: (bandInner - measureThickness) / 2,
				width: size,
				height: measureThickness
			};
	}

	// comparative target markers
	// (a target out of the given axis range is not drawn: at the edge it would tell a wrong value)
	const targets: IBulletGeometry["targets"] = d.targets
		.filter(value => value >= domainMin && value <= domainMax)
		.map(value => {
			const at = scale(value);

			return isRotated ?
				{
					x1: (bandInner - targetLen) / 2,
					x2: (bandInner + targetLen) / 2,
					y1: height - at,
					y2: height - at
				} :
				{
					x1: at,
					x2: at,
					y1: (bandInner - targetLen) / 2,
					y2: (bandInner + targetLen) / 2
				};
		});

	// data label: keep it clear of the dot marker
	const gap = isDot ? markerSize : 0;
	// the label of a negative value is at the zero position: the end of its measure can be
	// at the edge of the plot, where there is no room for it
	const labelPos = isNegative ? zero : len;
	const label: IBulletGeometry["label"] = {
		...(isRotated ?
			{x: bandInner / 2, y: height - labelPos - gap - 6} :
			{x: labelPos + gap + 5, y: bandInner / 2}),
		center: isDot ?
			{x: measure.cx, y: measure.cy} :
			{x: measure.x + measure.width / 2, y: measure.y + measure.height / 2}
	};

	// beside the plot, clear of the first tick label; under the column when rotated
	const title: IBulletGeometry["title"] = config.bullet_title_show ?
		(isRotated ?
			{text: d.title, x: bandInner / 2, y: height + 13, anchor: "middle"} :
			{text: d.title, x: -(axisSize ? AXIS_EDGE : 0) - 6, y: bandInner / 2, anchor: "end"}) :
		null;

	return {
		area: {left, top},
		offset: isRotated ? {x: d.index * band + axisSize, y: 0} : {x: 0, y: d.index * band},
		ranges,
		isDot,
		measure,
		color: $$.color(d),
		targets,
		title,
		// quantitative scale axis
		axis: axisSize ?
			{
				..._getAxis.call($$, layout, domainMin, domainMax),
				rotated: isRotated,
				x: 0,
				y: isRotated ? 0 : bandInner
			} :
			null,
		label
	};
}

/**
 * How the data labels of a bullet differ from the other types.
 * The shared data label code asks these through `getCustomTypeHooks()`.
 * They are registered with the type name (registerCustomType()).
 * @private
 */
export const customTypeHooks = {
	// the legend is placed beside its own plot, not by the size of an arc
	ownLegendLayout: true,

	// the label is not drawn with the color of the series
	themeTextColor: true,

	// beside the measure, or above it when rotated
	textAnchor($$): string {
		return $$.config.bullet_rotated || $$.config.data_labels.centered ? "middle" : "start";
	},

	// a bullet has one label, for its measure: the last value
	labelData($$, d): IBulletData[] {
		const last = d.values[d.values.length - 1];

		return $$.config.bullet_label_show && last &&
				(isNumber(last.value) || Boolean(last.value)) ?
			[last] :
			[];
	},

	// bullet.label.format takes precedence over data.labels.format
	labelFormat($$): ((value: number, id: string) => unknown) | undefined {
		const format = $$.config.bullet_label_format;

		return isFunction(format) ? (value, id) => format.call($$.api, value, id) : undefined;
	},

	// a bullet is one row per data id, not a value per index: tooltip.show() addresses it so,
	// and the tooltip is placed at its measure
	tooltipTarget($$, args): {data: IBulletData[], point?: number[]} {
		const rows: IBulletData[] = $$.getBulletData().filter(d => $$.isTargetToShow(d.id));
		const data = args.data?.id ?
			rows.filter(d => d.id === args.data.id) :
			[rows[args.index]].filter(Boolean);

		return {data, point: data[0] && $$.getBulletMeasureCenter(data[0])};
	},

	// points[0]: label anchor, points[1]: center of the measure
	// Preserve current position when points unavailable (during hide transition)
	textX($$, points, d, textElement): number {
		return points ?
			points[$$.config.data_labels.centered ? 1 : 0][0] + getTextPos.call($$, d, "x") :
			getElementPos(textElement, "x");
	},

	// beside the measure the label is centered on the row, above it (rotated) it sits on y
	textY($$, points, d, textElement, rect): number {
		if (!points) {
			return getElementPos(textElement, "y");
		}

		const centered = $$.config.data_labels.centered;
		const y = points[centered ? 1 : 0][1];

		return (centered || !$$.config.bullet_rotated ? y + rect.height / 2 - 3 : y) +
			getTextPos.call($$, d, "y");
	}
};

export default {
	/**
	 * Whether the data belongs to the bullet type.
	 * @param {object} d Data object
	 * @returns {boolean}
	 * @private
	 */
	isBulletType(d): boolean {
		return this.isTypeOf(d, "bullet");
	},

	/**
	 * Get the plot area of the bullets
	 * @returns {object} Plot size and offset
	 * @private
	 */
	getBulletSize(): {width: number, height: number, left: number, top: number} {
		return _getArea.call(this);
	},

	/**
	 * Get the space the canvas title text takes below its baseline.
	 * SVG title padding includes it, but canvas title padding stops at the baseline.
	 * @returns {number} Title descent
	 * @private
	 */
	getCanvasTitleDescent(): number {
		const {config, canvasRenderer, canvasTheme} = this;

		if (!config.title_text || !canvasRenderer) {
			return 0;
		}

		const {ctx} = canvasRenderer;

		ctx.save();
		ctx.font = canvasTheme.style.title.font;

		const descent = ctx.measureText(String(config.title_text)).fontBoundingBoxDescent || 0;

		ctx.restore();

		return descent;
	},

	/**
	 * Get bullet rows data
	 * @returns {Array} Bullet rows
	 * @private
	 */
	getBulletData(): IBulletData[] {
		const $$ = this;
		const targets = $$.data.targets.filter($$.isBulletType.bind($$));

		return targets.map((t, index) => {
			// the measure is a single value: use the latest one (one that can not be drawn is 0)
			const latest = Number(t.values[t.values.length - 1]?.value);
			const value = isValid(latest) ? latest : 0;
			const ranges = _getRanges.call($$, t.id, value);
			const targets = _getTargets.call($$, t.id, value);
			// by default the domain includes everything drawn, and 0 (the origin of the measure)
			const [autoMin, autoMax] = _getExtent([value].concat(targets, ranges));
			const {bullet_axis_min: min, bullet_axis_max: max} = $$.config;
			let domainMin = isValid(min) ? min : autoMin;
			let domainMax = isValid(max) ? max : autoMax;

			// min and max that do not make a range are ignored
			if (domainMin >= domainMax) {
				domainMin = autoMin;
				domainMax = autoMax;
			}

			if (domainMax === domainMin) {
				domainMax = domainMin + 1;
			}

			// when no ranges given, generate 3 bands from the domain
			const span = domainMax - domainMin;
			const resolvedRanges = ranges.length ?
				ranges :
				[0.5, 0.75, 1].map(v => domainMin + span * v);

			return {
				id: t.id,
				index,
				x: index,
				name: t.id,
				value,
				title: $$.config.bullet_title_show ? _getTitleText.call($$, t.id, value) : "",
				ranges: resolvedRanges,
				targets,
				domainMin,
				domainMax
			};
		});
	},

	/**
	 * Get the layout shared by all rows. Compute it once per draw and pass it to each row.
	 * @returns {object} Bullet layout
	 * @private
	 */
	getBulletLayout(): IBulletLayout {
		return _getLayout.call(this);
	},

	/**
	 * Get the center of the measure of a bullet row, in chart coordinates.
	 * @param {object} d Bullet row data
	 * @returns {Array} x, y coordinate
	 * @private
	 */
	getBulletMeasureCenter(d: IBulletData): number[] {
		const {area, offset, measure} = _getRowGeometry.call(this, d, _getLayout.call(this));
		const [x, y] = "cx" in measure ?
			[measure.cx, measure.cy] :
			[measure.x + measure.width / 2, measure.y + measure.height / 2];

		return [area.left + offset.x + x, area.top + offset.y + y];
	},

	/**
	 * Get the positions of the data label of each row, for the data label pipeline.
	 * @returns {function(IDataRow): Array.<Array.<number>>} Point getter: [anchor, measure center]
	 * @private
	 */
	generateGetBulletPoints(): (d: {id: string}) => number[][] | undefined {
		const $$ = this;
		let points: {[id: string]: number[][]} | undefined;

		// computed when the first label is positioned: not at all without data labels
		return d => {
			if (!points) {
				const layout = _getLayout.call($$);

				points = {};
				layout.rows.forEach(row => {
					const {area, offset, label} = _getRowGeometry.call($$, row, layout);
					const x = area.left + offset.x;
					const y = area.top + offset.y;

					points![row.id] = [
						[x + label.x, y + label.y],
						[x + label.center.x, y + label.center.y]
					];
				});
			}

			return points[d.id];
		};
	},

	/**
	 * Get the geometry of a bullet row. Shared by the SVG and the canvas renderer.
	 * @param {object} d Bullet row data
	 * @param {object} layout Bullet layout from getBulletLayout()
	 * @returns {object} Row geometry, relative to the row origin
	 * @private
	 */
	getBulletRowGeometry(d: IBulletData, layout: IBulletLayout): IBulletGeometry {
		return _getRowGeometry.call(this, d, layout);
	}
};
