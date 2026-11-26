/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {interpolateRgb as d3InterpolateRgb} from "d3-interpolate";
import {scaleLinear as d3ScaleLinear} from "d3-scale";
import {isFunction} from "../../../module/util";

// class names of the heatmap elements
export const $HEATMAP = {
	chartHeatmap: "bb-chart-heatmap",
	heatmapRows: "bb-heatmap-rows",
	heatmapRow: "bb-heatmap-row",
	heatmapCell: "bb-heatmap-cell",
	heatmapLabel: "bb-heatmap-label",
	heatmapNames: "bb-heatmap-names",
	heatmapAxis: "bb-heatmap-axis",
	heatmapColorbar: "bb-heatmap-colorbar"
};

export interface IHeatmapCell {
	// the series (row) of the cell, its name, and the name of the column
	id: string;
	name: string;
	x: string;
	// the index of the column, and of the row among the shown rows
	index: number;
	row: number;
	// null for a cell without a value
	value: number | null;
	color: string;
	x0: number;
	y0: number;
	x1: number;
	y1: number;
}

export interface IHeatmapRange {
	from?: number;
	to?: number;
	color: string;
	name?: string;
}

export interface IHeatmapText {
	text: string;
	x: number;
	y: number;
	align: "left" | "right" | "center";
	baseline: "middle" | "top" | "bottom";
}

export interface IHeatmapColorbar {
	// true: from the left (the min) to the right (the max), false: from the bottom to the top
	horizontal: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	// along the bar from its start (the left, or the top) to its end: offset 0 ~ 1 and color
	stops: [number, string][];
	labels: IHeatmapText[];
}

// a name along the color bar: 0 is the start (the min), 1 is the end, a name of a range is in its middle
interface IBarLabel {
	text: string;
	pos: number;
	edge: boolean;
}

export interface IHeatmapLayout {
	// the height of the chart the cells fit in, from the width: for the cell ratio
	height: number;
	cells: IHeatmapCell[];
	rows: string[];
	columns: string[];
	plot: {left: number, top: number, width: number, height: number};
	axisX: IHeatmapText[];
	axisY: IHeatmapText[];
	colorbar: IHeatmapColorbar | null;
	domain: [number, number];
}

// the size of the column names (a line), the gap to the plot, and the color bar
const AXIS_X_SIZE = 18;
const AXIS_GAP = 6;
const BAR_WIDTH = 12;
const BAR_GAP = 10;
// the height of the names of the values of a horizontal bar
const BAR_LABEL = 16;
const LINE_HEIGHT = 11;

// the property of the object itself: "constructor" or "toString" as a data id is not a key
const own = (obj, key: string) =>
	obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : undefined;

const isValue = (value): boolean =>
	value !== null && value !== undefined && value !== "" &&
	Number.isFinite(Number(value));

/**
 * Get the area the heatmap is drawn in, in chart coordinates.
 * @returns {object} Area
 * @private
 */
function _getArea(): {left: number, top: number, width: number, height: number, chrome: number} {
	const $$ = this;
	const {config, state: {current: {width, height}, isCanvasMode, isLegendRight}} = $$;
	const padding = $$.getCurrentPadding();
	// canvas mode draws the legend as HTML outside of its drawing surface: only the gap is needed
	const legendHeight = config.legend_show && config.legend_position === "bottom" ?
		(isCanvasMode ? 0 : $$.getLegendHeight()) + 10 :
		0;
	const legendRight = config.legend_show && isLegendRight ?
		$$.getLegendWidth() + (config.padding?.mode === "fit" ? 6 : 20) :
		0;
	const surfaceHeight = isCanvasMode ? $$.getCanvasSurfaceHeight() : height;

	const areaHeight = Math.max(0, surfaceHeight - padding.top - padding.bottom - legendHeight);
	// canvas mode has the bottom legend as HTML under the surface
	const domLegend = isCanvasMode && legendHeight ? $$.getCanvasBottomLegendHeight?.() || 0 : 0;

	return {
		left: padding.left,
		top: padding.top,
		width: Math.max(0, width - padding.left - padding.right - legendRight),
		height: areaHeight,
		// what the chart has besides the area: the paddings and the legend
		chrome: padding.top + padding.bottom + legendHeight + domLegend
	};
}

/**
 * Get the width of the widest text, drawn with the style of the axis.
 * @param {Array} texts Texts
 * @returns {number} Width in px
 * @private
 */
function _getTextWidth(texts: string[]): number {
	const $$ = this;
	const {cache, state: {isCanvasMode}, $el} = $$;
	const key = `heatmap-text-${isCanvasMode}-${texts.join("\u0000")}`;
	let width: number = cache.get(key) || 0;

	if (!width && isCanvasMode && $$.canvasRenderer) {
		const {ctx} = $$.canvasRenderer;

		ctx.save();
		ctx.font = $$.canvasTheme.style.heatmap.axisFont;
		width = texts.reduce((w, v) => Math.max(w, ctx.measureText(v).width), 0);
		ctx.restore();
	} else if (!width && !isCanvasMode && $el.heatmap) {
		const text = $el.heatmap.append("text")
			.attr("class", $HEATMAP.heatmapAxis)
			.style("visibility", "hidden");

		texts.forEach(v => {
			width = Math.max(width, text.text(v).node().getComputedTextLength?.() || 0);
		});
		text.remove();
	}

	if (width) {
		cache.add(key, width);
	} else {
		// it can not be measured yet (not drawn): estimate from the characters
		width = texts.reduce((n, v) => Math.max(n, v.length), 0) * 6.5;
	}

	return Math.ceil(width);
}

/**
 * Get the color function of the values: the colors of heatmap.color.range spread on the domain.
 * @param {Array} domain Min and max value
 * @returns {function} Color getter
 * @private
 */
function _getColorScale(domain: [number, number]): (value: number) => string | undefined {
	const ranges: IHeatmapRange[] = this.config.heatmap_color_ranges;

	// by the ranges: the first one that has the value, none when there is no such range
	if (ranges?.length) {
		return value =>
			ranges.find(r => value >= (r.from ?? -Infinity) && value <= (r.to ?? Infinity))
				?.color;
	}

	const range: string[] = this.config.heatmap_color_range;
	const [min, max] = domain;
	const last = range.length - 1;

	if (last < 1) {
		return () => range[0];
	}

	return d3ScaleLinear<string>()
		.domain(range.map((_, i) => min + (max - min) * i / last))
		.range(range)
		.interpolate(d3InterpolateRgb)
		.clamp(true);
}

/**
 * Get the text color to read on the color: black on a light one, white on a dark one.
 * @param {string} color Color in the rgb() or the hex form
 * @returns {string} Text color
 * @private
 */
function _getContrastColor(color: string): string {
	const m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(color);
	let rgb: number[] = [0, 0, 0];

	if (m) {
		rgb = [+m[1], +m[2], +m[3]];
	} else if (/^#[0-9a-f]{6}$/i.test(color)) {
		rgb = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16));
	} else if (/^#[0-9a-f]{3}$/i.test(color)) {
		rgb = [1, 2, 3].map(i => parseInt(color[i] + color[i], 16));
	}

	// perceived brightness
	return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 140 ? "#000" : "#fff";
}

/**
 * Get the names to draw along an axis: every name that fits, or every n-th name when they don't.
 * @param {Array} names Names
 * @param {number} step Size of a cell along the axis
 * @param {number} size Size of the widest name along the axis
 * @param {number} [gap=4] The space kept between two names
 * @returns {Array} The names with their index
 * @private
 */
function _getNames(names: string[], step: number, size: number, gap = 4): [string, number][] {
	const skip = Math.max(1, Math.ceil((size + gap) / (step || 1)));

	return names.map((v, i) => <[string, number]>[v, i]).filter(([, i]) => i % skip === 0);
}

/**
 * How the heatmap differs from the other types for the shared code.
 * It asks these through `getCustomTypeHooks()` (they are registered with the type name).
 * @private
 */
export const customTypeHooks = {
	// the legend is placed beside its own plot, not by the size of an arc
	ownLegendLayout: true,

	// with a cell ratio, the chart is as high as its cells need, when the height is not set
	currentHeight($$): number | undefined {
		if (!($$.config.heatmap_cell_ratio > 0) || !$$.data?.targets?.length) {
			return undefined;
		}

		const {height} = $$.getHeatmapLayout(true);

		return Number.isFinite(height) ? Math.ceil(height) : undefined;
	},

	// the name of a cell tells its row and its column ("Noon / Wed"): the tooltip has no title of the x
	namedData: true,

	// the names and the values are drawn by the type: there are no data labels of the values
	labelData(): [] {
		return [];
	},

	// the swatch of the legend: the color of the mean value of the row, as the color of the cells
	legendColor($$, data): string | undefined {
		const values = data.values.filter(v => isValue(v.value));

		return values.length ?
			($$.getHeatmapScale().scale(
				values.reduce((sum, v) => sum + Number(v.value), 0) / values.length
			) ?? $$.config.heatmap_color_none ?? undefined) :
			undefined;
	},

	// the swatch of the tooltip: the color of the cell
	tooltipColor($$, row): string | undefined {
		return isValue(row.value) ?
			($$.getHeatmapScale().scale(Number(row.value)) ?? $$.config.heatmap_color_none ??
				undefined) :
			undefined;
	},

	// the tooltip of a cell, addressed by its row (tooltip.show({data: {id}, index: column}))
	tooltipTarget($$, args) {
		const {cells} = $$.getHeatmapLayout();
		const id = args.data?.id;
		const index = args.index ?? args.data?.index;
		const x = args.x ?? args.data?.x;
		const cell = cells.find(d =>
			(id === undefined || d.id === id) &&
			(index !== undefined ?
				d.index === index :
				(x !== undefined ? d.x === String(x) : true)) &&
			d.value !== null
		);

		return {
			data: cell ? [$$.getHeatmapCellData(cell)] : [],
			point: cell && [(cell.x0 + cell.x1) / 2, (cell.y0 + cell.y1) / 2]
		};
	}
};

// the charts that told about a min over the max
const invalid = new WeakSet<object>();

// how many times the height was fit again for a width, by chart
const fitting = new WeakMap<object, {width: number, count: number}>();

export default {
	/**
	 * Fit the height of the chart (heatmap.cell.ratio) after a draw.
	 * The first height is made before the legend and the other parts are there to measure: it is fit
	 * again once they are, as the resize of the window does. At most 3 times for a width.
	 * @private
	 */
	fitHeatmapHeight(): void {
		const $$ = this;
		const {width, height} = $$.state.current;
		const fit = customTypeHooks.currentHeight($$);
		let state = fitting.get($$);

		if (!state || state.width !== width) {
			fitting.set($$, state = {width, count: 0});
		}

		if (fit && Math.abs(fit - height) > 1 && state.count++ < 3) {
			$$.resizeFunction();
		}
	},

	/**
	 * Whether the data belongs to the heatmap type.
	 * @param {object} d Data object
	 * @returns {boolean}
	 * @private
	 */
	isHeatmapType(d): boolean {
		return this.isTypeOf(d, "heatmap");
	},

	/**
	 * Get the layout of the cells, the names and the color bar, in chart coordinates.
	 * Shared by the SVG and the canvas renderer.
	 * @param {boolean} [fit=false] Set true to lay out the cells without the height limit, to get the height they need
	 * @returns {object} Heatmap layout
	 * @private
	 */
	getHeatmapLayout(fit = false): IHeatmapLayout {
		const $$ = this;
		const {config} = $$;
		const targets = $$.data.targets.filter($$.isHeatmapType.bind($$));
		const area = _getArea.call($$);

		// the height is not a limit when the chart is made as high as the cells need
		fit && (area.height = Infinity);

		// the columns are of the longest series: a shorter one has no cells after its end
		const longest = targets.reduce((a, t) => (t.values.length > a.length ? t.values : a), []);
		const columns: string[] = longest.map(v => String(v.x));
		const {domain, scale} = $$.getHeatmapScale();
		const shown = targets.filter(t => $$.isTargetToShow(t.id));
		const rows = shown.map(t => t.id);
		const names = shown.map(t => String(own(config.data_names, t.id) ?? t.id));

		// the space the names and the color bar take
		const showX = config.heatmap_axis_x_show && columns.length > 0;
		const showY = config.heatmap_axis_y_show && rows.length > 0;
		const axisYWidth = showY ? _getTextWidth.call($$, names) + AXIS_GAP : 0;
		const axisXHeight = showX ? AXIS_X_SIZE : 0;
		const onTop = config.heatmap_axis_x_position === "top";
		const format = config.heatmap_colorbar_format;
		const fmt = (v: number | undefined) =>
			v === undefined ? "" : String(isFunction(format) ? format.call($$.api, v) : v);
		const ranges: IHeatmapRange[] = config.heatmap_color_ranges || [];
		let barLabels: IBarLabel[] = [];

		if (config.heatmap_colorbar_show) {
			barLabels = ranges.length ?
				ranges.map((r, i) => ({
					text: r.name ??
						(r.from === undefined ?
							`≤ ${fmt(r.to)}` :
							(r.to === undefined ?
								`≥ ${fmt(r.from)}` :
								`${fmt(r.from)} - ${fmt(r.to)}`)),
					pos: (i + 0.5) / ranges.length,
					edge: false
				})) :
				domain.map((v, i) => ({text: fmt(v), pos: i, edge: true}));
		}
		const barPosition = config.heatmap_colorbar_position;
		const isBarSide = barPosition !== "top" && barPosition !== "bottom";
		const hasBar = barLabels.length > 0;
		const barSpace = hasBar && isBarSide ?
			BAR_GAP + BAR_WIDTH + 4 + _getTextWidth.call($$, barLabels.map(d => d.text)) :
			0;
		// a horizontal bar takes a line above or below the cells (and the names of the columns)
		const barLine = hasBar && !isBarSide ? BAR_GAP + BAR_WIDTH + BAR_LABEL : 0;
		const barOnTop = barPosition === "top";
		const plot = {
			left: area.left + axisYWidth,
			top: area.top + (onTop ? axisXHeight : 0) + (barOnTop ? barLine : 0),
			width: Math.max(0, area.width - axisYWidth - barSpace),
			height: Math.max(0, area.height - axisXHeight - barLine)
		};
		let cw = columns.length ? plot.width / columns.length : 0;
		let ch = rows.length ? plot.height / rows.length : 0;
		const ratio = config.heatmap_cell_ratio;

		// the biggest cells of the ratio that fit: the plot shrinks to them, from its left and top
		if (ratio > 0 && cw && ch) {
			cw = Math.min(cw, ch * ratio);
			ch = cw / ratio;
			plot.width = cw * columns.length;
			plot.height = ch * rows.length;
		}
		const pad = config.heatmap_cell_padding / 2;
		const none = config.heatmap_color_none;
		const cells: IHeatmapCell[] = [];

		shown.forEach((t, row) => {
			t.values.forEach((v, index) => {
				const hasValue = isValue(v.value);

				const color = hasValue ? scale(Number(v.value)) ?? none : none;

				// no color: the value is in no range and there is no color for it
				if (!color) {
					return;
				}

				cells.push({
					id: t.id,
					name: names[row],
					x: columns[index],
					index,
					row,
					value: hasValue ? Number(v.value) : null,
					color,
					x0: plot.left + index * cw + pad,
					y0: plot.top + row * ch + pad,
					x1: plot.left + (index + 1) * cw - pad,
					y1: plot.top + (row + 1) * ch - pad
				});
			});
		});

		const axisX: IHeatmapText[] = showX ?
			_getNames(columns, cw, _getTextWidth.call($$, columns)).map(([text, i]) => ({
				text,
				x: plot.left + (i + 0.5) * cw,
				y: onTop ? plot.top - AXIS_GAP : plot.top + plot.height + AXIS_GAP,
				align: "center",
				baseline: onTop ? "bottom" : "top"
			})) :
			[];
		const axisY: IHeatmapText[] = showY ?
			_getNames(names, ch, LINE_HEIGHT, 0).map(([text, i]) => ({
				text,
				x: plot.left - AXIS_GAP,
				y: plot.top + (i + 0.5) * ch,
				align: "right",
				baseline: "middle"
			})) :
			[];

		let colorbar: IHeatmapColorbar | null = null;

		if (hasBar) {
			const colors: string[] = ranges.length ?
				ranges.map(r => r.color) :
				config.heatmap_color_range;
			const last = colors.length - 1;
			// the ranges are bands of the same size with hard edges: their colors are on both ends
			const stops: [number, string][] = [];

			colors.forEach((c, i) => {
				if (ranges.length) {
					stops.push([i / colors.length, c], [(i + 1) / colors.length, c]);
				} else {
					stops.push([last ? i / last : 0, c]);
				}
			});

			if (isBarSide) {
				const x = plot.left + plot.width + BAR_GAP;

				colorbar = {
					horizontal: false,
					x,
					y: plot.top,
					width: BAR_WIDTH,
					height: plot.height,
					// the max is on the top
					stops: stops.map(([o, c]) => <[number, string]>[1 - o, c]).reverse(),
					labels: barLabels.map(d => ({
						text: d.text,
						x: x + BAR_WIDTH + 4,
						y: plot.top + plot.height * (1 - d.pos),
						align: "left",
						baseline: d.edge ? (d.pos ? "top" : "bottom") : "middle"
					}))
				};
			} else {
				// above the names of the columns, or under them
				const y = barOnTop ?
					area.top + BAR_LABEL :
					plot.top + plot.height + (onTop ? 0 : axisXHeight) + BAR_GAP;
				const labelY = barOnTop ? y - 4 : y + BAR_WIDTH + 4;
				const baseline = barOnTop ? "bottom" : "top";

				colorbar = {
					horizontal: true,
					x: plot.left,
					y,
					width: plot.width,
					height: BAR_WIDTH,
					stops,
					labels: barLabels.map(d => ({
						text: d.text,
						x: plot.left + plot.width * d.pos,
						y: labelY,
						align: d.edge ? (d.pos ? "right" : "left") : "center",
						baseline
					}))
				};
			}
		}

		return {
			cells,
			rows,
			columns,
			plot,
			axisX,
			axisY,
			colorbar,
			domain,
			height: plot.height + axisXHeight + barLine + area.chrome
		};
	},

	/**
	 * Get the domain of the values and the color function of them.
	 * The colors of the cells do not depend on what is hidden: all the series are counted.
	 * @returns {object} Domain and color getter
	 * @private
	 */
	getHeatmapScale(): {domain: [number, number], scale: (value: number) => string | undefined} {
		const $$ = this;
		const {config} = $$;
		let min = Infinity;
		let max = -Infinity;

		$$.data.targets.filter($$.isHeatmapType.bind($$)).forEach(t => {
			// the series get their colors in the data order, shown or not
			$$.color(t.id);
			t.values.forEach(v => {
				if (isValue(v.value)) {
					const value = Number(v.value);

					min = Math.min(min, value);
					max = Math.max(max, value);
				}
			});
		});

		let low = config.heatmap_color_min;
		let high = config.heatmap_color_max;

		// a min over the max would turn the colors upside down: they are not used
		if (low > high) {
			if (!invalid.has($$)) {
				invalid.add($$);
				console.error(
					`[billboard.js] heatmap.color.min (${low}) is bigger than heatmap.color.max (${high}): both are ignored.`
				);
			}

			low = high = undefined;
		}

		const domain: [number, number] = [
			low ?? (min === Infinity ? 0 : min),
			high ?? (max === -Infinity ? 1 : max)
		];

		return {domain, scale: _getColorScale.call($$, domain)};
	},

	/**
	 * Get the text color of a cell: heatmap.label.color, or the one to read on the cell.
	 * @param {object} cell Cell
	 * @returns {string} Color
	 * @private
	 */
	getHeatmapLabelColor(cell: IHeatmapCell): string {
		return this.config.heatmap_label_color || _getContrastColor(cell.color);
	},

	/**
	 * Get the label of a cell: its value, or the text of heatmap.label.format.
	 * @param {object} cell Cell
	 * @returns {string} Text, empty when it is not shown
	 * @private
	 */
	getHeatmapLabel(cell: IHeatmapCell): string {
		const $$ = this;
		const {config} = $$;

		if (!config.heatmap_label_show || cell.value === null) {
			return "";
		}

		const format = config.heatmap_label_format;

		return String(
			(isFunction(format) ? format.call($$.api, cell.value, cell.x, cell.id) : cell.value) ??
				""
		);
	},

	/**
	 * Check whether a row is defocused by focus(), defocus() or a legend hover.
	 * @param {string} id Row id
	 * @returns {boolean} Whether it is defocused
	 * @private
	 */
	isHeatmapDefocused(id: string): boolean {
		return !!this.state.defocusedTargetIds?.has(id);
	},

	/**
	 * Get the data of a cell, for the tooltip and the events.
	 * @param {object} cell Cell
	 * @returns {object} Data
	 * @private
	 */
	getHeatmapCellData(cell: IHeatmapCell) {
		return {
			id: cell.id,
			x: cell.x,
			index: cell.index,
			value: cell.value,
			name: `${cell.name} / ${cell.x}`
		};
	},

	/**
	 * The data labels of the values are not drawn for the heatmap (see customTypeHooks.labelData).
	 * The shared data label code asks the points of every type, so it is there.
	 * @returns {function} Point getter
	 * @private
	 */
	generateGetHeatmapPoints(): () => undefined {
		return () => undefined;
	}
};
