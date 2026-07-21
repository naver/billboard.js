/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isNumber} from "../../../module/util";

export type BarRadiusCorners = number | {tl?: number, tr?: number, br?: number, bl?: number};

export type BarRadiusInfo = {
	radius: number,
	corners: BarRadiusCorners,
	clipPath: string | null,
	indexX: number,
	indexY: number,
	isNegative: boolean,
	pos: number
};

// d3's default string interpolator (used by transition.attr("d", …)) treats
// every number in the path as interpolatable. SVG arc commands however carry
// integer-only flags (x-axis-rotation, large-arc-flag, sweep-flag) which, when
// interpolated to fractions like "0.00001", produce invalid path syntax and
// flood the console with parse errors on chart.load(). See #4166.
const RE_PATH_NUMBER = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
const RE_PATH_TOKEN = /([aAcChHlLmMqQsStTvVzZ])|([-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?)/g;

/**
 * Collect the ordinal indexes of numeric tokens that are SVG arc-command flags.
 * Arc parameters repeat in groups of 7: rx ry x-rotation large-arc sweep x y.
 * Positions 2(x-rotation), 3(large-arc) and 4(sweep) must stay integers.
 * @param {string} path Path string to scan
 * @returns {Set} Ordinal indexes (in number order) of arc flag tokens
 * @private
 */
function getArcFlagTokenIndexes(path: string): Set<number> {
	const flags = new Set<number>();
	let numIndex = -1;
	let argIndex = 0;
	let inArc = false;
	let token;

	RE_PATH_TOKEN.lastIndex = 0;

	while ((token = RE_PATH_TOKEN.exec(path))) {
		if (token[1]) {
			inArc = token[1] === "a" || token[1] === "A";
			argIndex = 0;
		} else {
			numIndex++;

			if (inArc) {
				const pos = argIndex % 7;

				if (pos === 2 || pos === 3 || pos === 4) {
					flags.add(numIndex);
				}

				argIndex++;
			}
		}
	}

	return flags;
}

/**
 * Build a path interpolator that behaves like d3's string interpolator but
 * snaps SVG arc flags to valid integers, preventing malformed paths during
 * bar transitions (ex. chart.load() with bar.radius). See #4166.
 * @param {string} a Start path
 * @param {string} b Target path
 * @returns {function} Interpolator returning a valid path for progress t
 * @private
 */
export function getBarPathInterpolator(a: string, b: string): (t: number) => string {
	const flagSet = getArcFlagTokenIndexes(b);
	const segments: (string | null)[] = [];
	const interpolators: {index: number, fn: (t: number) => number}[] = [];
	let bIndex = 0;
	let segIndex = -1;
	let numIndex = -1;
	let am;
	let bm;

	// append a literal chunk, merging with the previous literal segment
	const append = (text: string): void => {
		if (segments[segIndex]) {
			segments[segIndex] += text;
		} else {
			segments[++segIndex] = text;
		}
	};

	RE_PATH_NUMBER.lastIndex = 0;
	const reA = RE_PATH_NUMBER;
	const reB = new RegExp(RE_PATH_NUMBER.source, "g");

	a += "";
	b += "";

	while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
		numIndex++;

		// literal (non-numeric) part of target preceding this number
		if (bm.index > bIndex) {
			append(b.slice(bIndex, bm.index));
		}

		if (am[0] === bm[0]) {
			append(bm[0]);
		} else {
			const from = +am[0];
			const to = +bm[0];
			const isFlag = flagSet.has(numIndex);

			segments[++segIndex] = null;
			interpolators.push({
				index: segIndex,
				fn: isFlag ? t => Math.round(from + (to - from) * t) : t => from + (to - from) * t
			});
		}

		bIndex = reB.lastIndex;
	}

	// remaining target literal/numbers stay as-is (already valid)
	if (bIndex < b.length) {
		append(b.slice(bIndex));
	}

	if (!interpolators.length) {
		const result = segments.join("");

		return () => result;
	}

	return (t: number) => {
		for (let i = 0, len = interpolators.length; i < len; i++) {
			const {index, fn} = interpolators[i];

			segments[index] = String(fn(t));
		}

		return segments.join("");
	};
}

/**
 * Get the configured bar corner radius resolver.
 * @param {object} $$ ChartInternal instance
 * @returns {function|null} Radius resolver
 * @private
 */
export function getBarRadiusResolver($$): ((width: number) => number) | null {
	const {bar_radius: radius, bar_radius_ratio: ratio} = $$.config;

	return isNumber(radius) && radius > 0 ? () => radius : (
		isNumber(ratio) ? width => width * ratio : null
	);
}

/**
 * Get stacked bar rows that should receive rounded bar-end corners.
 * @param {object} $$ ChartInternal instance
 * @returns {Set} Radius row keys
 * @private
 */
export function getStackingBarRadiusSet($$): Set<string> {
	const {config, data} = $$;
	const set = new Set<string>();

	if (!config.data_groups.length) {
		return set;
	}

	const orderedTargets = $$.orderTargets(
		$$.filterTargetsToShow(data.targets.filter($$.isBarType, $$))
	);

	for (const group of config.data_groups) {
		const ids = new Set(group);
		const lastPosByIndex = new Map<number, string>();
		const lastNegByIndex = new Map<number, string>();

		for (const target of orderedTargets) {
			if (!ids.has(target.id)) {
				continue;
			}

			for (const d of target.values) {
				if (d.value === null || d.value === 0) {
					continue;
				}

				(d.value > 0 ? lastPosByIndex : lastNegByIndex).set(d.index, target.id);
			}
		}

		for (const [index, id] of lastPosByIndex) {
			set.add(`${id}:${index}`);
		}

		for (const [index, id] of lastNegByIndex) {
			set.add(`${id}:${index}`);
		}
	}

	return set;
}

/**
 * Get canvas/SVG corner flags for the rounded bar edge.
 * @param {boolean} isRotated Whether axis is rotated
 * @param {boolean} isNegative Whether the bar direction is negative
 * @param {number} radius Radius value
 * @returns {number|object} Corner radius map
 * @private
 */
function getBarRadiusCorners(
	isRotated: boolean,
	isNegative: boolean,
	radius: number
): BarRadiusCorners {
	if (!radius) {
		return 0;
	}

	return isRotated ?
		(
			isNegative ? {tl: radius, bl: radius} : {tr: radius, br: radius}
		) :
		(
			isNegative ? {br: radius, bl: radius} : {tl: radius, tr: radius}
		);
}

/**
 * Get SVG clip-path inset for radius arcs that exceed the bar shape.
 * @param {Array} init Initial render coordinate
 * @param {number} pos Rounded edge position
 * @param {boolean} isRotated Whether axis is rotated
 * @param {boolean} isNegative Whether the bar direction is negative
 * @returns {string|null} Clip-path value
 * @private
 */
function getBarRadiusClipPath(
	init: number[],
	pos: number,
	isRotated: boolean,
	isNegative: boolean
): string | null {
	let clipPath = "";

	if (isRotated) {
		if (isNegative && init[0] < pos) {
			clipPath = `0 ${pos - init[0]}px 0 0`;
		} else if (!isNegative && init[0] > pos) {
			clipPath = `0 0 0 ${init[0] - pos}px`;
		}
	} else {
		if (isNegative && init[1] > pos) {
			clipPath = `${init[1] - pos}px 0 0 0`;
		} else if (!isNegative && init[1] < pos) {
			clipPath = `0 0 ${pos - init[1]}px 0`;
		}
	}

	return clipPath ? `inset(${clipPath})` : null;
}

/**
 * Get shared rounded bar geometry that renderers can translate to their own primitives.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @param {Array} points Shared bar points
 * @param {function|null} getRadius Radius resolver
 * @param {Set} stackingRadiusSet Stacked radius row keys
 * @param {function} isStackingRadiusData Optional fallback for hidden SVG bars
 * @returns {object} Rounded bar geometry
 * @private
 */
export function getBarRadiusInfo(
	$$,
	d,
	points: number[][],
	getRadius: ((width: number) => number) | null,
	stackingRadiusSet: Set<string>,
	isStackingRadiusData?: (d) => boolean
): BarRadiusInfo {
	const {config, state} = $$;
	const isRotated = config.axis_rotated;
	const indexX = +isRotated;
	const indexY = +!indexX;
	const isUnderZero = d.value < 0;
	const isInverted = config[`axis_${$$.axis.getId(d.id)}_inverted`];
	const isNegative = (!isInverted && isUnderZero) || (isInverted && !isUnderZero);
	const isGrouped = $$.isGrouped(d.id);
	const isRadiusData = getRadius && isGrouped && d.value !== 0 ?
		(
			state.hiddenTargetIds.has(d.id) && isStackingRadiusData ?
				isStackingRadiusData(d) :
				stackingRadiusSet.has(`${d.id}:${d.index}`)
		) :
		false;
	const init = [
		points[0][indexX],
		points[0][indexY]
	];
	let radius = 0;

	if (getRadius) {
		const index = isRotated ? indexY : indexX;
		const barW = Math.abs(points[2][index] - points[0][index]);

		radius = Math.max(0, !isGrouped || isRadiusData ? getRadius(barW) : 0);
	}

	const pos = isRotated ?
		points[1][indexX] + (isNegative ? radius : -radius) :
		points[1][indexY] + (isNegative ? -radius : radius);

	return {
		radius,
		corners: getBarRadiusCorners(isRotated, isNegative, radius),
		clipPath: radius ? getBarRadiusClipPath(init, pos, isRotated, isNegative) : null,
		indexX,
		indexY,
		isNegative,
		pos
	};
}
