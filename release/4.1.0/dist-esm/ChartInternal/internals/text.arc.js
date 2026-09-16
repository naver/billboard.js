/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { window as win } from "../../module/browser.js";
import { isFunction, isObjectType } from "../../module/util/type-checks.js";
import { setTextValue } from "../../module/util/dom.js";
import { $ARC } from "../../config/classes.js";
import { select } from "d3-selection";
//#region src/ChartInternal/internals/text.arc.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
const BREAK_POINT_OFFSET = 15;
const DEFAULT_LINE_DISTANCE = 20;
const TEXT_VERTICAL_OFFSET = .35;
/**
* Get the first matching arc chart type
* @this {object} ChartInternal context
* @param {boolean} excludeMultiGauge Whether to exclude multi gauge type
* @returns {string|undefined} Chart type or undefined
* @private
*/
function getArcType(excludeMultiGauge = false) {
	const $$ = this;
	return [
		"donut",
		"pie",
		"polar",
		"gauge"
	].find((type) => $$.hasType(type) && !(type === "gauge" && excludeMultiGauge && $$.hasMultiArcGauge()));
}
/**
* Get label line configuration (line and text)
* @this {object} ChartInternal context
* @returns {LabelLineConfig} Configuration with chartType, line (show, distance) and text (formatter)
* @private
*/
function getConfig() {
	const $$ = this;
	const { config } = $$;
	const chartType = getArcType.call($$, true);
	const lineConfig = chartType && config[`${chartType}_label_line`];
	const isValidConfig = isObjectType(lineConfig);
	const defaultFormatter = (value, ratio, id) => id;
	const line = {
		show: lineConfig === true || isValidConfig && lineConfig?.show !== false,
		distance: isValidConfig && lineConfig?.distance || DEFAULT_LINE_DISTANCE
	};
	if (lineConfig === true) return {
		chartType,
		line,
		text: { formatter: defaultFormatter }
	};
	if (!isValidConfig) return {
		chartType,
		line: {
			show: false,
			distance: DEFAULT_LINE_DISTANCE
		},
		text: { formatter: null }
	};
	let formatter = defaultFormatter;
	if (isFunction(lineConfig.text)) formatter = lineConfig.text;
	else if (lineConfig.text === false) formatter = null;
	return {
		chartType,
		line,
		text: { formatter }
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
function getLinePosition(d, lineDistance) {
	const $$ = this;
	const { state } = $$;
	const updated = $$.updateAngle(d);
	if (!updated) return null;
	let { outerRadius } = $$.getRadius(d);
	let arcOuterRadius = outerRadius;
	if ($$.hasType("polar")) {
		arcOuterRadius = $$.getPolarOuterRadius(d, outerRadius);
		outerRadius = state.radius;
	}
	let midAngle = (updated.startAngle + updated.endAngle) / 2;
	if (Math.abs(updated.endAngle - updated.startAngle - 2 * Math.PI) < .01) midAngle = Math.PI / 2;
	const sinAngle = Math.sin(midAngle);
	const cosAngle = -Math.cos(midAngle);
	const startPoint = {
		x: sinAngle * arcOuterRadius,
		y: cosAngle * arcOuterRadius
	};
	const breakRadius = outerRadius + BREAK_POINT_OFFSET;
	const breakPoint = {
		x: sinAngle * breakRadius,
		y: cosAngle * breakRadius
	};
	const isRight = sinAngle >= 0;
	return {
		startPoint,
		breakPoint,
		endPoint: {
			x: breakPoint.x + lineDistance * (isRight ? 1 : -1),
			y: breakPoint.y
		},
		isRight,
		midAngle
	};
}
/**
* Check if label with line type is enabled for arc charts
* @this {object} ChartInternal context
* @returns {boolean} Whether label with lines are enabled
* @private
*/
function isLabelWithLine() {
	return getConfig.call(this).line.show;
}
/**
* Render connector lines and text for label with lines
* @this {object} ChartInternal context
* @param {number} duration Transition duration
* @private
*/
function redrawArcLabelLines(duration) {
	const $$ = this;
	const { $el: { arcs }, $T } = $$;
	const { line: lineConfig, text: textConfig } = getConfig.call($$);
	const lineDistance = lineConfig.distance;
	let cachedFontSize = null;
	arcs.selectAll(`.${$ARC.chartArc}`).each(function(d) {
		const g = select(this);
		const linePos = getLinePosition.call($$, d, lineDistance);
		const { ratio, meetsThreshold, updated } = d._cache ?? {};
		if (!updated || !linePos) return;
		const isVisible = $$.isTargetToShow(d.data.id) && meetsThreshold;
		const { startPoint, breakPoint, endPoint, isRight } = linePos;
		const points = `${startPoint.x},${startPoint.y} ${breakPoint.x},${breakPoint.y} ${endPoint.x},${endPoint.y}`;
		if (lineConfig.show) {
			let line = g.select(`.${$ARC.arcLabelLine}`);
			if (line.empty()) line = g.append("polyline").attr("class", $ARC.arcLabelLine);
			$T(line, duration).attr("points", points).style("stroke", $$.color(d.data)).style("opacity", isVisible ? null : "0");
		}
		let labelLineText = g.select(`.${$ARC.arcLabelLineText}`);
		if (labelLineText.empty()) labelLineText = g.append("text").attr("class", $ARC.arcLabelLineText).style("pointer-events", "none");
		if (isVisible) {
			const { value } = updated;
			const { id } = d.data;
			const text = (textConfig.formatter ?? $$.getArcLabelConfig("format") ?? $$.defaultArcValueFormat)(value, ratio, id).toString();
			setTextValue(labelLineText, text, [-1, 1], false);
			const pos = {
				x: endPoint.x + 5 * (isRight ? 1 : -1),
				y: endPoint.y
			};
			labelLineText.style("text-anchor", isRight ? "start" : "end");
			const textNode = labelLineText.node();
			const tspanNodes = textNode?.querySelectorAll("tspan");
			if (cachedFontSize === null) cachedFontSize = parseFloat(win.getComputedStyle(textNode).fontSize) || 12;
			if (tspanNodes && tspanNodes.length > 1) {
				const centerOffset = (tspanNodes.length - 3) / 2;
				pos.y += (-centerOffset + TEXT_VERTICAL_OFFSET) * cachedFontSize;
			} else pos.y += TEXT_VERTICAL_OFFSET * cachedFontSize;
			$T(labelLineText, duration).attr("transform", `translate(${pos.x},${pos.y})`).style("opacity", null).style("fill", $$.updateTextColor.bind($$)(d));
		} else $T(labelLineText, duration).style("opacity", "0");
	});
}
//#endregion
export { isLabelWithLine, redrawArcLabelLines };
