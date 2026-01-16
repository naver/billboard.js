/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import type {d3Selection} from "../../../types/types";
import {$ARC} from "../../config/classes";
import {window} from "../../module/browser";
import {isFunction, isObjectType, setTextValue} from "../../module/util";
import type {IArcData} from "../data/IData";

// Arc label line positioning constants (used in multiple places or non-obvious values)
const BREAK_POINT_OFFSET = 15; // Offset from arc edge to break point
const DEFAULT_LINE_DISTANCE = 20; // Default horizontal line distance
const TEXT_VERTICAL_OFFSET = 0.35; // Text vertical alignment offset (shared with arc.ts)

/**
 * Get the first matching arc chart type
 * @this {object} ChartInternal context
 * @param {boolean} excludeMultiGauge Whether to exclude multi gauge type
 * @returns {string|undefined} Chart type or undefined
 * @private
 */
function getArcType(excludeMultiGauge = false): string | undefined {
	const $$ = this;

	return ["donut", "pie", "polar", "gauge"].find(type =>
		$$.hasType(type) && !(type === "gauge" && excludeMultiGauge && $$.hasMultiArcGauge())
	);
}

/**
 * Label line configuration type
 */
type LabelLineConfig = {
	chartType: string | undefined,
	line: {show: boolean, distance: number},
	text: {formatter: ((value: number, ratio: number, id: string) => string) | null}
};

/**
 * Get label line configuration (line and text)
 * @this {object} ChartInternal context
 * @returns {LabelLineConfig} Configuration with chartType, line (show, distance) and text (formatter)
 * @private
 */
function getConfig(): LabelLineConfig {
	const $$ = this;
	const {config} = $$;
	const chartType = getArcType.call($$, true);
	const lineConfig = chartType && config[`${chartType}_label_line`];
	const isValidConfig = isObjectType(lineConfig);

	// Default formatter: returns id
	const defaultFormatter = (value: number, ratio: number, id: string) => id;

	// Line configuration
	const line = {
		show: lineConfig === true || (isValidConfig && lineConfig?.show !== false),
		distance: (isValidConfig && lineConfig?.distance) || DEFAULT_LINE_DISTANCE
	};

	// When lineConfig is boolean true, use all defaults
	if (lineConfig === true) {
		return {
			chartType,
			line,
			text: {formatter: defaultFormatter}
		};
	}

	// When no valid config, return default with show: false
	if (!isValidConfig) {
		return {
			chartType,
			line: {show: false, distance: DEFAULT_LINE_DISTANCE},
			text: {formatter: null}
		};
	}

	// Determine formatter based on text option
	// - text is function: use custom formatter
	// - text is true or undefined (not set): use default formatter (show id)
	// - text is false: use label.format by returning null
	let formatter: ((value: number, ratio: number, id: string) => string) | null = defaultFormatter;

	if (isFunction(lineConfig.text)) {
		formatter = lineConfig.text;
	} else if (lineConfig.text === false) {
		formatter = null;
	}

	return {
		chartType,
		line,
		text: {formatter}
	};
}

/**
 * Calculate label with line positions for arc data
 * @this {object} ChartInternal context
 * @param {object} d Data object
 * @param {number} lineDistance Horizontal line distance (from getConfig)
 * @returns {object|null} Object containing startPoint, breakPoint, endPoint, isRight, and midAngle
 * @private
 */
function getLinePosition(
	d: IArcData,
	lineDistance: number
): {
	startPoint: {x: number, y: number},
	breakPoint: {x: number, y: number},
	endPoint: {x: number, y: number},
	isRight: boolean,
	midAngle: number
} | null {
	const $$ = this;
	const {state} = $$;
	const updated = $$.updateAngle(d);

	if (!updated) {
		return null;
	}

	let {outerRadius} = $$.getRadius(d);
	let arcOuterRadius = outerRadius;

	if ($$.hasType("polar")) {
		// For polar, arc radius is proportional to data value
		arcOuterRadius = $$.getPolarOuterRadius(d, outerRadius);
		// But labels should be positioned outside the full chart radius (levels)
		outerRadius = state.radius;
	}

	let midAngle = (updated.startAngle + updated.endAngle) / 2;

	// Check if this is a single data item (full circle arc)
	// When arc spans the entire circle, position label on the right side to avoid legend overlap
	const isFullCircleArc =
		Math.abs((updated.endAngle - updated.startAngle) - (2 * Math.PI)) < 0.01;

	if (isFullCircleArc) {
		// Position at 3 o'clock (π/2 from top) for single data item
		midAngle = Math.PI / 2;
	}

	// Pre-calculate trigonometric values
	const sinAngle = Math.sin(midAngle);
	const cosAngle = -Math.cos(midAngle);

	// Start point: at the arc edge (for polar, this is the data-proportional radius)
	const startPoint = {
		x: sinAngle * arcOuterRadius,
		y: cosAngle * arcOuterRadius
	};

	// Break point: extends outward from the full chart radius (outside levels for polar)
	const breakRadius = outerRadius + BREAK_POINT_OFFSET;
	const breakPoint = {
		x: sinAngle * breakRadius,
		y: cosAngle * breakRadius
	};

	// Determine if label is on the right side of the chart
	// Use pre-calculated sinAngle to account for startingAngle offset
	const isRight = sinAngle >= 0;

	// End point: extends horizontally from break point
	const endPoint = {
		x: breakPoint.x + (lineDistance * (isRight ? 1 : -1)),
		y: breakPoint.y
	};

	return {startPoint, breakPoint, endPoint, isRight, midAngle};
}

/**
 * Check if label with line type is enabled for arc charts
 * @this {object} ChartInternal context
 * @returns {boolean} Whether label with lines are enabled
 * @private
 */
function isLabelWithLine(): boolean {
	return getConfig.call(this).line.show;
}

/**
 * Render connector lines and text for label with lines
 * @this {object} ChartInternal context
 * @param {number} duration Transition duration
 * @private
 */
function redrawArcLabelLines(duration: number): void {
	const $$ = this;
	const {$el: {arcs}, $T} = $$;

	// Get config once and reuse (avoid N+1 calls)
	const {line: lineConfig, text: textConfig} = getConfig.call($$);
	const lineDistance = lineConfig.distance;

	// Cache fontSize from first text element to avoid repeated getComputedStyle calls
	let cachedFontSize: number | null = null;

	arcs.selectAll(`.${$ARC.chartArc}`).each(function(d) {
		const g = d3Select(this);
		const linePos = getLinePosition.call($$, d, lineDistance);

		// Use cached values from textForArcLabel if available, otherwise calculate
		const {ratio, meetsThreshold, updated} = d._cache ?? {};

		// Handle invalid data
		if (!updated || !linePos) {
			return;
		}

		const isVisible = $$.isTargetToShow(d.data.id) && meetsThreshold;

		// --- Render connector line (polyline) ---
		const {startPoint, breakPoint, endPoint, isRight} = linePos;
		const points =
			`${startPoint.x},${startPoint.y} ${breakPoint.x},${breakPoint.y} ${endPoint.x},${endPoint.y}`;

		if (lineConfig.show) {
			let line = g.select(`.${$ARC.arcLabelLine}`) as d3Selection;

			if (line.empty()) {
				line = g.append("polyline")
					.attr("class", $ARC.arcLabelLine) as d3Selection;
			}

			$T(line, duration)
				.attr("points", points)
				.style("stroke", $$.color(d.data))
				.style("opacity", isVisible ? null : "0");
		}

		// --- Render text ---
		let labelLineText = g.select(`.${$ARC.arcLabelLineText}`) as d3Selection;

		if (labelLineText.empty()) {
			labelLineText = g.append("text")
				.attr("class", $ARC.arcLabelLineText)
				.style("pointer-events", "none") as d3Selection;
		}

		if (isVisible) {
			const {value} = updated;
			const {id} = d.data;

			// Get formatted text
			const text = (
				textConfig.formatter ??
					$$.getArcLabelConfig("format") ??
					$$.defaultArcValueFormat
			)(value, ratio, id).toString();

			setTextValue(labelLineText, text, [-1, 1], false);

			// Position the text at the end of the connector line (outside)
			const pos = {
				x: endPoint.x + (5 * (isRight ? 1 : -1)), // 5: label offset from endpoint
				y: endPoint.y
			};

			// Configure text alignment based on position
			labelLineText.style("text-anchor", isRight ? "start" : "end");

			// Handle text vertical alignment by adjusting translate y position
			const textNode = labelLineText.node() as SVGTextElement;
			const tspanNodes = textNode?.querySelectorAll("tspan");

			// Cache fontSize on first access to avoid repeated getComputedStyle calls
			if (cachedFontSize === null) {
				cachedFontSize = parseFloat(window.getComputedStyle(textNode).fontSize) || 12;
			}

			if (tspanNodes && tspanNodes.length > 1) {
				// Multiline: adjust for vertical centering
				// With setTextValue(text, [-1, 1], false):
				// - 1st line at -1em, 2nd at 0em, 3rd at 1em, 4th at 2em, ...
				// - Center of text block = (-1 + (lineCount - 2)) / 2 = (lineCount - 3) / 2
				// - To center at y=0, shift by negative of center
				const lineCount = tspanNodes.length;
				const centerOffset = (lineCount - 3) / 2;

				pos.y += (-centerOffset + TEXT_VERTICAL_OFFSET) * cachedFontSize;
			} else {
				// Single line: apply base vertical offset
				pos.y += TEXT_VERTICAL_OFFSET * cachedFontSize;
			}

			$T(labelLineText, duration)
				.attr("transform", `translate(${pos.x},${pos.y})`)
				.style("opacity", null)
				.style("fill", $$.updateTextColor.bind($$)(d));
		} else {
			$T(labelLineText, duration)
				.style("opacity", "0");
		}
	});
}

export {isLabelWithLine, redrawArcLabelLines};
