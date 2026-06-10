/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {AxisTickFormat, AxisTickValue, AxisTickValues} from "../../types/axis";
import type {AxisType} from "../../types/types";
import {getScale} from "../ChartInternal/internals/scale";
import {AXIS_DEFAULT_TICK_COUNT, AXIS_TICK_LINE_OVERLAP_PADDING} from "../config/const";
import {parseDate} from "../module/util";
import {getCanvasComparableValue, getCanvasComparableXDomain} from "./util";

export type YAxisId = Exclude<AxisType, "x">;
type XDataTickCache = {key: string, values: AxisTickValue[], comparable: number[]};

/**
 * Get explicitly configured tick values.
 * @param {Array|function} values Tick values option
 * @param {object} api Chart API
 * @returns {Array} Tick values
 * @private
 */
function getOptionTickValues(values: AxisTickValues | null | undefined, api):
	| AxisTickValue[]
	| undefined {
	const resolved = typeof values === "function" ? values.call(api) : values;

	return resolved?.length ? resolved : undefined;
}

/**
 * Normalize axis values that can be expressed as category names, dates or numbers.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value Axis value
 * @param {string} id Axis id
 * @returns {number|Date|string} Scale-compatible value
 * @private
 */
function normalizeAxisValue($$, value: AxisTickValue, id: AxisType): AxisTickValue {
	if ($$.axis?.isTimeSeries?.(id)) {
		return value instanceof Date ? value : parseDate.call($$, value);
	}

	if (id === "x" && $$.axis?.isCategorized?.() && typeof value === "string") {
		const index = $$.config.axis_x_categories.indexOf(value);

		return index >= 0 ? index : value;
	}

	if ($$.axis?.isLog?.(id) && value !== null && value !== undefined) {
		return +value;
	}

	return value;
}

/**
 * Normalize x values that can be expressed as category names, dates or numbers.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value X value
 * @returns {number|Date|string} Scale-compatible value
 * @private
 */
export function normalizeXValue($$, value: AxisTickValue): AxisTickValue {
	return normalizeAxisValue($$, value, "x");
}

/**
 * Normalize y/y2 tick or grid values.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value Axis value
 * @param {string} id Axis id
 * @returns {number|Date|string} Scale-compatible value
 * @private
 */
export function normalizeYValue($$, value: AxisTickValue, id: YAxisId = "y"): AxisTickValue {
	return normalizeAxisValue($$, value, id);
}

/**
 * Normalize y/y2 tick values.
 * @param {object} $$ ChartInternal context
 * @param {Array} values Tick values
 * @param {string} id Axis id
 * @returns {Array} Scale-compatible tick values
 * @private
 */
function normalizeYTickValues($$, values: AxisTickValue[], id: YAxisId = "y"): AxisTickValue[] {
	return values.map(value => normalizeYValue($$, value, id));
}

/**
 * Normalize x tick values.
 * @param {object} $$ ChartInternal context
 * @param {Array} values Tick values
 * @returns {Array} Scale-compatible tick values
 * @private
 */
function normalizeXTickValues($$, values: AxisTickValue[]): AxisTickValue[] {
	return values
		.map(value => normalizeXValue($$, value))
		.filter(value => !(typeof value === "string" && $$.axis?.isCategorized?.()));
}

/**
 * Get tick values from scale.
 * @param {object} scale Scale function
 * @param {number} count Tick count
 * @returns {Array} Tick values
 * @private
 */
function getScaleTicks(scale, count?: number | Function): AxisTickValue[] {
	const tickCount = typeof count === "function" ? count() : count;

	return scale.ticks ? scale.ticks(tickCount) : scale.domain();
}

/**
 * Generate ticks for billboard log axes using the same SVG helper behavior.
 * @param {object} scale Symlog display scale
 * @param {number|function} count Optional tick count
 * @returns {Array} Tick values
 * @private
 */
function getLogScaleTicks(scale, count?: number | Function): AxisTickValue[] {
	const [start, end] = scale.domain();
	const numericStart = +start;
	const numericEnd = +end;

	if (
		count ||
		!Number.isFinite(numericStart) ||
		!Number.isFinite(numericEnd) ||
		numericEnd <= 0
	) {
		return getScaleTicks(scale, count);
	}

	const logScale = getScale("_log")
		.domain([numericStart > 0 ? numericStart : 1, numericEnd])
		.range(scale.range());
	let ticks = logScale.ticks();

	for (let cnt = numericEnd.toFixed().length; ticks.length > 15; cnt--) {
		ticks = logScale.ticks(cnt);
	}

	if (ticks.length) {
		ticks.splice(0, 1, start);
		ticks.splice(ticks.length - 1, 1, end);
	}

	return ticks;
}

/**
 * Check whether two tick values are equivalent.
 * @param {number|Date|string} a First value
 * @param {number|Date|string} b Second value
 * @returns {boolean} Whether values are equivalent
 * @private
 */
export function isSameTickValue(a: AxisTickValue, b: AxisTickValue): boolean {
	const av = +a;
	const bv = +b;

	return Number.isFinite(av) && Number.isFinite(bv) ? Math.abs(av - bv) < 1e-6 : a === b;
}

/**
 * Keep the visible domain edges in generated canvas ticks.
 * @param {Array} ticks Generated tick values
 * @param {Array} domain Current x domain
 * @returns {Array} Tick values including domain edges
 * @private
 */
function includeDomainEndpoints(ticks: AxisTickValue[], domain: AxisTickValue[]): AxisTickValue[] {
	const [start, end] = domain;
	const values = ticks.slice();

	if (start !== undefined && !values.some(value => isSameTickValue(value, start))) {
		values.unshift(start);
	}

	if (end !== undefined && !values.some(value => isSameTickValue(value, end))) {
		values.push(end);
	}

	return values;
}

/**
 * Convert an x value to a comparable number.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value X value
 * @returns {number|null} Comparable value
 * @private
 */
function toComparableValue($$, value: AxisTickValue): number | null {
	const normalized = normalizeXValue($$, value);

	return getCanvasComparableValue(normalized);
}

/**
 * Check whether a zoom scale is showing a narrowed x domain.
 * @param {object} $$ ChartInternal context
 * @returns {boolean} Whether zoom scale should be used
 * @private
 */
function hasActiveXZoom($$): boolean {
	const {scale} = $$;
	const zoomDomain = scale.zoom?.domain?.();
	const xDomain = scale.subX?.domain?.() || scale.x?.orgDomain?.() || scale.x?.domain?.();

	if (!zoomDomain?.length || !xDomain?.length) {
		return false;
	}

	return !isSameTickValue(zoomDomain[0], xDomain[0]) ||
		!isSameTickValue(zoomDomain[1], xDomain[1]);
}

/**
 * Get current x scale, using zoom scale when active.
 * @param {object} $$ ChartInternal context
 * @returns {function} X scale
 * @private
 */
export function getXScale($$) {
	return hasActiveXZoom($$) ? $$.scale.zoom : $$.scale.x;
}

/**
 * Check if an x tick is inside the current x scale domain.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value Tick value
 * @param {number} tolerance Domain tolerance
 * @returns {boolean} Whether value is visible in current domain
 * @private
 */
function isInCurrentXDomain($$, value: AxisTickValue, tolerance = 0): boolean {
	const domain = getXScale($$).domain?.();

	if (!domain?.length) {
		return true;
	}

	const target = toComparableValue($$, value);
	const min = +domain[0];
	const max = +domain[1];

	if (target === null || !Number.isFinite(min) || !Number.isFinite(max)) {
		return true;
	}

	return target >= Math.min(min, max) - tolerance &&
		target <= Math.max(min, max) + tolerance;
}

/**
 * Get half-distance to the nearest neighboring x data point.
 * @param {Array} comparableValues Comparable x values
 * @param {number} index Current index
 * @returns {number} Half-distance tolerance
 * @private
 */
function getHalfNeighborDistance(comparableValues: number[], index: number): number {
	const distances = [
		index > 0 ? Math.abs(comparableValues[index] - comparableValues[index - 1]) : Infinity,
		index < comparableValues.length - 1 ?
			Math.abs(comparableValues[index + 1] - comparableValues[index]) :
			Infinity
	].filter(Number.isFinite);
	const distance = Math.min(...distances);

	return Number.isFinite(distance) ? (distance / 2) : 0;
}

/**
 * Find the first numeric value greater than or equal to the target.
 * @param {Array} values Sorted numbers
 * @param {number} target Target value
 * @returns {number} Value index
 * @private
 */
function lowerBoundNumbers(values: number[], target: number): number {
	let low = 0;
	let high = values.length;

	while (low < high) {
		const mid = (low + high) >> 1;

		if (values[mid] < target) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
}

/**
 * Find the first numeric value greater than the target.
 * @param {Array} values Sorted numbers
 * @param {number} target Target value
 * @returns {number} Value index
 * @private
 */
function upperBoundNumbers(values: number[], target: number): number {
	let low = 0;
	let high = values.length;

	while (low < high) {
		const mid = (low + high) >> 1;

		if (values[mid] <= target) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
}

/**
 * Get cached sorted x data ticks and numeric values.
 * @param {object} $$ ChartInternal context
 * @param {Array} targets Visible targets
 * @returns {object} Cached data ticks
 * @private
 */
function getCachedXDataTicks($$, targets): XDataTickCache {
	const {axis, state} = $$;
	const key = [
		state.dataGeneration,
		axis?.isTimeSeries?.() ? 1 : 0,
		targets.map(target => `${target.id}:${target.values.length}`).join(",")
	].join("|");
	const cached = state._canvasXDataTickCache;

	if (cached?.key === key) {
		return cached;
	}

	const values = $$.mapTargetsToUniqueXs(targets);
	const entry = {
		key,
		values,
		comparable: values.map(value => toComparableValue($$, value) ?? NaN)
	};

	state._canvasXDataTickCache = entry;

	return entry;
}

/**
 * Include the nearest data ticks at zoom boundaries.
 * @param {object} $$ ChartInternal context
 * @param {object} dataTicks Cached data x ticks
 * @returns {Array} Data ticks visible in current zoom domain
 * @private
 */
function filterXDataTicksForZoom($$, dataTicks: XDataTickCache): AxisTickValue[] {
	const {values: ticks, comparable} = dataTicks;

	if (!hasActiveXZoom($$)) {
		return ticks;
	}

	const domain = getCanvasComparableXDomain($$);

	if (!domain || comparable.length !== ticks.length || !Number.isFinite(comparable[0])) {
		return ticks.filter(value => isInCurrentXDomain($$, value));
	}

	const [start, end] = domain;
	let startIndex = lowerBoundNumbers(comparable, start);
	let endIndex = upperBoundNumbers(comparable, end);
	const includeNearest = (edge: number): void => {
		const index = lowerBoundNumbers(comparable, edge);
		let nearestIndex = -1;
		let nearestDistance = Infinity;

		for (const candidate of [index - 1, index]) {
			const value = comparable[candidate];
			const distance = Math.abs(value - edge);

			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestIndex = candidate;
			}
		}

		if (
			nearestIndex > -1 &&
			nearestIndex < comparable.length &&
			nearestDistance <= getHalfNeighborDistance(comparable, nearestIndex) + 1e-6
		) {
			startIndex = Math.min(startIndex, nearestIndex);
			endIndex = Math.max(endIndex, nearestIndex + 1);
		}
	};

	includeNearest(start);
	includeNearest(end);

	return ticks.slice(
		Math.max(0, startIndex),
		Math.min(ticks.length, endIndex)
	);
}

/**
 * Get stable key part for configured explicit tick values.
 * @param {Array|function} values Tick values option
 * @param {number} generation Current redraw generation
 * @returns {string} Cache key
 * @private
 */
function getTickOptionCacheKey(values: AxisTickValues | null | undefined,
	generation: number): string {
	if (typeof values === "function") {
		return `fn:${generation}`;
	}

	return Array.isArray(values) ?
		values.map(value => value instanceof Date ? +value : String(value)).join(",") :
		"";
}

/**
 * Get x tick cache key for the current draw inputs.
 * @param {object} $$ ChartInternal context
 * @param {boolean} cull Whether ticks are text-culled
 * @returns {string} Cache key
 * @private
 */
function getXTickCacheKey($$, cull: boolean): string {
	const {config, state} = $$;
	const domain = getXScale($$).domain?.() || [];
	const domainKey = domain.map(value => value instanceof Date ? +value : String(value)).join(",");
	const size = config.axis_rotated ? state.height : state.width;

	return [
		cull ? 1 : 0,
		state.dataGeneration,
		domainKey,
		size,
		config.axis_x_tick_fit ? 1 : 0,
		config.axis_x_tick_count || "",
		config.axis_x_tick_culling,
		config.axis_x_tick_culling_max || "",
		config.axis_x_tick_culling_reverse ? 1 : 0,
		config.axis_x_categories?.length || 0,
		getTickOptionCacheKey(config.axis_x_tick_values, state.redrawGeneration)
	].join("|");
}

/**
 * Generate tick values reusing the axis helper when available.
 * @param {object} $$ ChartInternal context
 * @param {Array} values Base values
 * @param {number} count Tick count
 * @param {boolean} forTimeSeries Whether values are timeseries
 * @returns {Array} Tick values
 * @private
 */
function generateTickValues($$, values: AxisTickValue[], count?: number,
	forTimeSeries = false): AxisTickValue[] {
	return $$.axis?.generateTickValues ?
		$$.axis.generateTickValues(values, count, forTimeSeries) :
		values;
}

/**
 * Get step ticks for y axis.
 * @param {Array} domain Scale domain
 * @param {number} stepSize Step size
 * @returns {Array} Tick values
 * @private
 */
function getStepTicks(domain: number[], stepSize: number): number[] {
	const [start, end] = domain;
	const ticks: number[] = [];

	if (!stepSize || !Number.isFinite(stepSize)) {
		return ticks;
	}

	for (let value = Math.round(start); value <= end; value += stepSize) {
		ticks.push(value);
	}

	return ticks;
}

/**
 * Get x ticks for indexed/linear canvas mode.
 * @param {object} $$ ChartInternal context
 * @param {boolean} cull Whether to cull tick values
 * @returns {Array} Tick values
 * @private
 */
export function getXTickValues($$, cull = true): AxisTickValue[] {
	const {axis, config} = $$;
	const targetScale = getXScale($$);
	const targetsToShow = $$.getTargetsToShow?.() || $$.filterTargetsToShow();
	const cache = $$.state._canvasXTickValuesCache ||
		($$.state._canvasXTickValuesCache = new Map<string, AxisTickValue[]>());
	const cacheKey = getXTickCacheKey($$, cull);
	const cached = cache.get(cacheKey);

	if (cached) {
		return cached;
	}

	const setCache = (ticks: AxisTickValue[]): AxisTickValue[] => {
		cache.set(cacheKey, ticks);
		return ticks;
	};

	if (!targetsToShow?.length) {
		return setCache([]);
	}

	const explicit = getOptionTickValues(config.axis_x_tick_values, $$.api);

	if (explicit) {
		const values = normalizeXTickValues($$, explicit);

		return setCache(cull ? cullDataTicks($$, values) : values);
	}

	if (config.axis_x_tick_fit && targetsToShow?.length && $$.mapTargetsToUniqueXs) {
		const dataTicks = getCachedXDataTicks($$, targetsToShow);
		const values = filterXDataTicksForZoom($$, dataTicks);
		const generated = generateTickValues(
			$$,
			values,
			config.axis_x_tick_count,
			axis?.isTimeSeries?.()
		);

		return setCache(cull ? cullDataTicks($$, generated, true) : generated);
	}

	if (hasActiveXZoom($$) && !axis?.isCategorized?.()) {
		const domain = $$.zoom?.getDomain?.() || targetScale.domain();
		const generated = includeDomainEndpoints(
			getScaleTicks(targetScale, config.axis_x_tick_count || AXIS_DEFAULT_TICK_COUNT),
			domain
		);

		return setCache(cull ? cullTicks(generated, getXTickCullMax($$)) : generated);
	}

	if (axis?.isCategorized?.() && config.axis_x_categories?.length) {
		const generated = config.axis_x_categories.map((_, i) => i);

		return setCache(cull ? cullTicks(generated, getXTickCullMax($$)) : generated);
	}

	const generated = getScaleTicks(targetScale,
		config.axis_x_tick_count || AXIS_DEFAULT_TICK_COUNT);

	return setCache(cull ? cullTicks(generated, getXTickCullMax($$)) : generated);
}

/**
 * Get max number of subchart x ticks to render.
 * @param {object} $$ ChartInternal context
 * @returns {number|undefined} Max tick count
 * @private
 */
function getSubXTickCullMax($$): number | undefined {
	const {config, state: {height2, width2}} = $$;
	const size = config.axis_rotated ? height2 : width2;

	if (config.axis_x_tick_count) {
		return config.axis_x_tick_count;
	}

	if (config.axis_x_tick_culling !== false) {
		return Math.min(
			config.axis_x_tick_culling_max || AXIS_DEFAULT_TICK_COUNT,
			Math.max(2, Math.floor(size / 70))
		);
	}

	return undefined;
}

/**
 * Get x ticks for the canvas subchart axis.
 * @param {object} $$ ChartInternal context
 * @returns {Array} Tick values
 * @private
 */
export function getSubXTickValues($$): AxisTickValue[] {
	const {axis, config, scale} = $$;
	const targetScale = scale.subX;
	const targetsToShow = $$.getTargetsToShow?.() || $$.filterTargetsToShow();
	const cullMax = getSubXTickCullMax($$);
	const cull = (ticks: AxisTickValue[]): AxisTickValue[] => cullTicks(ticks, cullMax);

	if (!targetScale || !targetsToShow?.length) {
		return [];
	}

	const explicit = getOptionTickValues(config.axis_x_tick_values, $$.api);

	if (explicit) {
		return cull(normalizeXTickValues($$, explicit));
	}

	if (config.axis_x_tick_fit && $$.mapTargetsToUniqueXs) {
		const generated = generateTickValues(
			$$,
			$$.mapTargetsToUniqueXs(targetsToShow),
			config.axis_x_tick_count,
			axis?.isTimeSeries?.()
		);

		return cull(generated);
	}

	if (axis?.isCategorized?.() && config.axis_x_categories?.length) {
		return cull(config.axis_x_categories.map((_, i) => i));
	}

	const generated = getScaleTicks(
		targetScale,
		config.axis_x_tick_count || AXIS_DEFAULT_TICK_COUNT
	);

	return cull(generated);
}

/**
 * Get raw category boundary tick values for x axis tick lines.
 * @param {object} $$ ChartInternal context
 * @returns {Array} Category boundary values
 * @private
 */
function getCategoryXTickLineValues($$): AxisTickValue[] {
	const scale = getXScale($$);
	const domain = scale.orgDomain?.() || scale.domain?.();

	if (!domain?.length) {
		return [];
	}

	const start = +domain[0];
	const end = +domain[domain.length - 1];

	if (!Number.isFinite(start) || !Number.isFinite(end)) {
		return [];
	}

	const min = Math.ceil(Math.min(start, end));
	const max = Math.floor(Math.max(start, end));
	const values = Array.from({length: Math.max(0, max - min + 1)}, (_, i) => min + i);

	return $$.config.axis_x_tick_outer ? values.slice(1, -1) : values;
}

/**
 * Resolve x tick line coordinate. Category tick lines are drawn on raw scale boundaries.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value X tick value
 * @param {function} targetScale X scale
 * @returns {number} Pixel coordinate relative to plot area
 * @private
 */
export function getXTickLinePosition($$, value: AxisTickValue,
	targetScale = getXScale($$)): number {
	const scale = targetScale;
	const normalized = normalizeXValue($$, value);

	if ($$.axis?.isCategorized?.()) {
		const rawScale = scale.orgScale?.();

		if (rawScale) {
			return rawScale(normalized);
		}

		const offset = $$.axis.x?.tickOffset?.() || ((scale(1) - scale(0)) / 2);

		return scale(normalized) - offset;
	}

	return scale(normalized);
}

/**
 * Check whether adjacent x tick line intervals overlap on canvas.
 * @param {object} $$ ChartInternal context
 * @param {Array} ticks Sorted tick values
 * @param {number} tickLineWidth Tick line stroke width
 * @returns {boolean} Whether tick lines should follow culled text ticks
 * @private
 */
function hasOverlappedXTickLineIntervals($$, ticks: AxisTickValue[],
	tickLineWidth: number): boolean {
	if (ticks.length < 2) {
		return false;
	}

	const halfWidth = Math.max(1, tickLineWidth) / 2;
	const positions = ticks
		.map(tick => getXTickLinePosition($$, tick))
		.filter(Number.isFinite)
		.sort((a, b) => a - b);

	if (positions.length < 2) {
		return false;
	}

	let previousEnd = positions[0] + halfWidth;

	for (let i = 1; i < positions.length; i++) {
		const start = positions[i] - halfWidth;
		const end = positions[i] + halfWidth;

		if (start <= previousEnd + AXIS_TICK_LINE_OVERLAP_PADDING) {
			return true;
		}

		previousEnd = Math.max(previousEnd, end);
	}

	return false;
}

/**
 * Remove line ticks that map to the same canvas pixel.
 * @param {object} $$ ChartInternal context
 * @param {Array} ticks Tick values
 * @returns {Array} Pixel-deduped tick values
 * @private
 */
function dedupeXTickLineValues($$, ticks: AxisTickValue[]): AxisTickValue[] {
	const seen = new Set<number>();

	return ticks.filter(tick => {
		const pos = getXTickLinePosition($$, tick);
		const key = Math.round(pos);

		if (!Number.isFinite(pos) || seen.has(key)) {
			return false;
		}

		seen.add(key);

		return true;
	});
}

/**
 * Get x tick values for tick lines, following SVG culling options.
 * @param {object} $$ ChartInternal context
 * @param {Array} textTicks Text tick values
 * @param {number} tickLineWidth Tick line stroke width
 * @returns {Array} Tick line values
 * @private
 */
export function getXTickLineValues($$, textTicks: AxisTickValue[],
	tickLineWidth = 1): AxisTickValue[] {
	const {axis, config} = $$;

	if (axis?.isCategorized?.()) {
		const categoryLineTicks = getCategoryXTickLineValues($$);

		return dedupeXTickLineValues($$, categoryLineTicks);
	}

	if (config.axis_x_tick_culling === false || config.axis_x_tick_culling_lines === false) {
		return textTicks;
	}

	const lineTicks = getXTickValues($$, false);

	return hasOverlappedXTickLineIntervals($$, lineTicks, tickLineWidth) ?
		textTicks :
		dedupeXTickLineValues($$, lineTicks);
}

/**
 * Get y ticks for indexed/linear canvas mode.
 * @param {object} $$ ChartInternal context
 * @param {string} id Axis id
 * @param {number} count Optional tick count override
 * @param {boolean} culling Whether to apply tick culling
 * @returns {Array} Tick values
 * @private
 */
export function getYTickValues(
	$$,
	id: YAxisId = "y",
	count?: number,
	culling = true
): AxisTickValue[] {
	const {axis, config, scale} = $$;
	const prefix = `axis_${id}`;
	const targetScale = scale[id];
	const explicit = getOptionTickValues(config[`${prefix}_tick_values`], $$.api);
	const maybeCull = (ticks: AxisTickValue[]) => culling ? cullAxisTicks($$, id, ticks) : ticks;

	if (explicit) {
		return maybeCull(normalizeYTickValues($$, explicit, id));
	}

	const stepTicks = getStepTicks(targetScale.domain(), config[`${prefix}_tick_stepSize`]);

	if (stepTicks.length) {
		return maybeCull(stepTicks);
	}

	const tickCount = count ?? config[`${prefix}_tick_count`];

	if (axis?.isTimeSeries?.(id) && config[`${prefix}_tick_time_value`]) {
		return maybeCull(getScaleTicks(targetScale, config[`${prefix}_tick_time_value`]));
	}

	if (axis?.isLog?.(id)) {
		return maybeCull(getLogScaleTicks(targetScale, tickCount));
	}

	if (tickCount) {
		const domain = targetScale.domain();

		return maybeCull(generateTickValues(
			$$,
			domain,
			domain.every(v => v === 0) ? 1 : tickCount,
			axis?.isTimeSeries?.(id)
		));
	}

	return maybeCull(getScaleTicks(targetScale, AXIS_DEFAULT_TICK_COUNT));
}

/**
 * Get scale for an additional axis.
 * @param {object} $$ ChartInternal context
 * @param {string} id Axis id
 * @param {object} axisConfig Additional axis config
 * @returns {function} Scale
 * @private
 */
export function getAdditionalAxisScale($$, id: AxisType, axisConfig) {
	const baseScale = id === "x" ? getXScale($$) : $$.scale[id];
	const scale = baseScale?.copy ? baseScale.copy() : baseScale;

	if (axisConfig.domain && scale?.domain) {
		scale.domain(axisConfig.domain);
	}

	return scale;
}

/**
 * Get tick values for an additional axis.
 * @param {object} $$ ChartInternal context
 * @param {string} id Axis id
 * @param {function} scale Axis scale
 * @param {object} axisConfig Additional axis config
 * @returns {Array} Tick values
 * @private
 */
export function getAdditionalAxisTickValues($$, id: AxisType, scale, axisConfig): AxisTickValue[] {
	const tick = axisConfig.tick || {};
	const explicit = getOptionTickValues(tick.values, $$.api);

	if (explicit) {
		return id === "x" ?
			normalizeXTickValues($$, explicit) :
			normalizeYTickValues($$, explicit, id as YAxisId);
	}

	if (id !== "x" && $$.axis?.isLog?.(id)) {
		return getLogScaleTicks(scale, tick.count);
	}

	return getScaleTicks(scale, tick.count ?? AXIS_DEFAULT_TICK_COUNT);
}

/**
 * Get tick formatter for an additional axis.
 * @param {object} $$ ChartInternal context
 * @param {object} axisConfig Additional axis config
 * @returns {function} Formatter
 * @private
 */
export function getAdditionalAxisTickFormat($$, axisConfig): AxisTickFormat {
	const format = axisConfig.tick?.format;

	return typeof format === "function" ? format.bind($$.api) : (value => value);
}

/**
 * Cull generated ticks like AxisRenderer.getGeneratedTicks().
 * @param {Array} ticks Tick values
 * @param {number} count Target count
 * @returns {Array} Culled tick values
 * @private
 */
function cullTicks(ticks: AxisTickValue[], count?: number): AxisTickValue[] {
	const len = ticks.length - 1;

	if (count && len > count) {
		const last = ticks.length - 1;

		if (count <= 1) {
			return [ticks[0]];
		}

		return Array.from({length: count}, (_, i) => ticks[Math.round(i * last / (count - 1))]);
	}

	return ticks;
}

/**
 * Cull axis ticks following SVG manual culling.
 * @param {object} $$ ChartInternal context
 * @param {string} id Axis id
 * @param {Array} ticks Tick values
 * @returns {Array} Culled tick values
 * @private
 */
function cullAxisTicks($$, id: AxisType, ticks: AxisTickValue[]): AxisTickValue[] {
	const {config} = $$;
	const prefix = `axis_${id}_tick_culling`;

	if (!config[prefix]) {
		return ticks;
	}

	const sortedTicks = ticks.slice().sort((a, b) => {
		const av = +a;
		const bv = +b;
		const order = Number.isFinite(av) && Number.isFinite(bv) ?
			av - bv :
			String(a).localeCompare(String(b));

		return config[`${prefix}_reverse`] ? -order : order;
	});
	const tickSize = sortedTicks.length;
	const cullingMax = config[`${prefix}_max`] || AXIS_DEFAULT_TICK_COUNT;
	let intervalForCulling = 0;

	for (let i = 1; i < tickSize; i++) {
		if (tickSize / i < cullingMax) {
			intervalForCulling = i;
			break;
		}
	}

	if (!intervalForCulling) {
		return ticks;
	}

	const visible = new Set(
		sortedTicks.filter((_, i) => i % intervalForCulling === 0)
	);

	return ticks.filter(tick => visible.has(tick));
}

/**
 * Cull data-based x ticks like the SVG axis manual culling path.
 * @param {object} $$ ChartInternal context
 * @param {Array} ticks Tick values
 * @param {boolean} sorted Whether ticks are already sorted in x order
 * @returns {Array} Culled tick values
 * @private
 */
function cullDataTicks($$, ticks: AxisTickValue[], sorted = false): AxisTickValue[] {
	const {config} = $$;

	if (config.axis_x_tick_culling === false) {
		return ticks;
	}

	const cullingMax = config.axis_x_tick_culling_max || AXIS_DEFAULT_TICK_COUNT;
	const sortedTicks = sorted ? ticks : ticks
		.slice()
		.sort((a, b) => {
			const av = +a;
			const bv = +b;

			if (Number.isFinite(av) && Number.isFinite(bv)) {
				return config.axis_x_tick_culling_reverse ? bv - av : av - bv;
			}

			return config.axis_x_tick_culling_reverse ?
				String(b).localeCompare(String(a)) :
				String(a).localeCompare(String(b));
		});
	const tickSize = sortedTicks.length;
	let intervalForCulling = 0;

	for (let i = 1; i < tickSize; i++) {
		if (tickSize / i < cullingMax) {
			intervalForCulling = i;
			break;
		}
	}

	if (!intervalForCulling) {
		return ticks;
	}

	if (sorted) {
		return ticks.filter((_, i) =>
			config.axis_x_tick_culling_reverse ?
				(tickSize - 1 - i) % intervalForCulling === 0 :
				i % intervalForCulling === 0
		);
	}

	const visible = new Set(
		sortedTicks.filter((_, i) => i % intervalForCulling === 0)
	);

	return ticks.filter(tick => visible.has(tick));
}

/**
 * Get max number of x ticks to render.
 * @param {object} $$ ChartInternal context
 * @returns {number|undefined} Max tick count
 * @private
 */
function getXTickCullMax($$): number | undefined {
	const {config, state: {height, width}} = $$;
	const size = config.axis_rotated ? height : width;

	if (config.axis_x_tick_count) {
		return config.axis_x_tick_count;
	}

	if (config.axis_x_tick_culling !== false) {
		return Math.min(
			config.axis_x_tick_culling_max || AXIS_DEFAULT_TICK_COUNT,
			Math.max(2, Math.floor(size / 70))
		);
	}

	return undefined;
}

/**
 * Get y grid ticks.
 * @param {object} $$ ChartInternal context
 * @returns {Array} Tick values
 * @private
 */
export function getYGridTickValues($$): AxisTickValue[] {
	const {axis, config} = $$;
	const generated = axis?.y?.getGeneratedTicks?.(config.grid_y_ticks);

	if (generated?.length) {
		return generated;
	}

	return config.grid_y_ticks ?
		cullTicks(getYTickValues($$, "y", undefined, false), config.grid_y_ticks) :
		getYTickValues($$, "y", undefined, false);
}
