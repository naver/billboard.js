/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
export const $COMMON = {
	button: "bb-button",
	chart: "bb-chart",
	empty: "bb-empty",
	main: "bb-main",
	target: "bb-target",
	EXPANDED: "_expanded_"
};

export const $ARC = {
	arc: "bb-arc",
	arcLabelLine: "bb-arc-label-line",
	arcs: "bb-arcs",
	chartArc: "bb-chart-arc",
	chartArcs: "bb-chart-arcs",
	chartArcsBackground: "bb-chart-arcs-background",
	chartArcsTitle: "bb-chart-arcs-title"
};

export const $AREA = {
	area: "bb-area",
	areas: "bb-areas"
};

export const $AXIS = {
	axis: "bb-axis",
	axisX: "bb-axis-x",
	axisXLabel: "bb-axis-x-label",
	axisY: "bb-axis-y",
	axisY2: "bb-axis-y2",
	axisY2Label: "bb-axis-y2-label",
	axisYLabel: "bb-axis-y-label"
};

export const $BAR = {
	bar: "bb-bar",
	bars: "bb-bars",
	chartBar: "bb-chart-bar",
	chartBars: "bb-chart-bars"
};

export const $CANDLESTICK = {
	candlestick: "bb-candlestick",
	candlesticks: "bb-candlesticks",
	chartCandlestick: "bb-chart-candlestick",
	chartCandlesticks: "bb-chart-candlesticks",
	valueDown: "bb-value-down",
	valueUp: "bb-value-up"
};

export const $CIRCLE = {
	chartCircles: "bb-chart-circles",
	circle: "bb-circle",
	circles: "bb-circles"
};

export const $COLOR = {
	colorPattern: "bb-color-pattern",
	colorScale: "bb-colorscale"
};

export const $DRAG = {
	dragarea: "bb-dragarea",
	INCLUDED: "_included_"
};

export const $GAUGE = {
	chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
	chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
	chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
	chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
	gaugeValue: "bb-gauge-value"
};

export const $LEGEND = {
	legend: "bb-legend",
	legendBackground: "bb-legend-background",
	legendItem: "bb-legend-item",
	legendItemEvent: "bb-legend-item-event",
	legendItemHidden: "bb-legend-item-hidden",
	legendItemPoint: "bb-legend-item-point",
	legendItemTile: "bb-legend-item-tile"
};

export const $LINE = {
	chartLine: "bb-chart-line",
	chartLines: "bb-chart-lines",
	line: "bb-line",
	lines: "bb-lines"
};

export const $EVENT = {
	eventRect: "bb-event-rect",
	eventRects: "bb-event-rects",
	eventRectsMultiple: "bb-event-rects-multiple",
	eventRectsSingle: "bb-event-rects-single",

};

export const $FOCUS = {
	focused: "bb-focused",
	defocused: "bb-defocused",
	legendItemFocused: "bb-legend-item-focused",
	xgridFocus: "bb-xgrid-focus",
	ygridFocus: "bb-ygrid-focus"
};

export const $GRID = {
	grid: "bb-grid",
	gridLines: "bb-grid-lines",
	xgrid: "bb-xgrid",
	xgridLine: "bb-xgrid-line",
	xgridLines: "bb-xgrid-lines",
	xgrids: "bb-xgrids",
	ygrid: "bb-ygrid",
	ygridLine: "bb-ygrid-line",
	ygridLines: "bb-ygrid-lines",
	ygrids: "bb-ygrids"
};

export const $LEVEL = {
	level: "bb-level",
	levels: "bb-levels"
};

export const $RADAR = {
	chartRadar: "bb-chart-radar",
	chartRadars: "bb-chart-radars"
};

export const $REGION = {
	region: "bb-region",
	regions: "bb-regions"
};

export const $SELECT = {
	selectedCircle: "bb-selected-circle",
	selectedCircles: "bb-selected-circles",
	SELECTED: "_selected_"
};

export const $SHAPE = {
	shape: "bb-shape",
	shapes: "bb-shapes",
};

export const $SUBCHART = {
	brush: "bb-brush",
	subchart: "bb-subchart"
};

export const $TEXT = {
	chartText: "bb-chart-text",
	chartTexts: "bb-chart-texts",
	text: "bb-text",
	texts: "bb-texts",
	title: "bb-title",
	TextOverlapping: "text-overlapping"
};

export const $TOOLTIP = {
	tooltip: "bb-tooltip",
	tooltipContainer: "bb-tooltip-container",
	tooltipName: "bb-tooltip-name"
};

export const $TREEMAP = {
	treemap: "bb-treemap",
	chartTreemap: "bb-chart-treemap",
	chartTreemaps: "bb-chart-treemaps"
};

export const $ZOOM = {
	buttonZoomReset: "bb-zoom-reset",
	zoomBrush: "bb-zoom-brush"
};

export default {
	...$COMMON,
	...$ARC,
	...$AREA,
	...$AXIS,
	...$BAR,
	...$CANDLESTICK,
	...$CIRCLE,
	...$COLOR,
	...$DRAG,
	...$GAUGE,
	...$LEGEND,
	...$LINE,
	...$EVENT,
	...$FOCUS,
	...$GRID,
	...$RADAR,
	...$REGION,
	...$SELECT,
	...$SHAPE,
	...$SUBCHART,
	...$TEXT,
	...$TOOLTIP,
	...$TREEMAP,
	...$ZOOM
};
