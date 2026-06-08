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
