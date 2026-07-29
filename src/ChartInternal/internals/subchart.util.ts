/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Check whether the x focus grid should be rendered as one continuous line
 * spanning both the main chart and the subchart.
 * Shared by the SVG and canvas renderers, so both stay in sync.
 * @param {object} $$ ChartInternal instance
 * @returns {boolean} Whether continuous focus line is enabled
 * @private
 */
export function isContinuousGridFocusEnabled($$): boolean {
	const {config, state} = $$;

	return !!(
		config.subchart_grid_focus_continuous &&
		config.subchart_show &&
		config.subchart_brush_enabled === false &&
		state.width2 > 0 &&
		state.height2 > 0
	);
}

/**
 * Convert a subchart local index axis coordinate to the matching main chart coordinate.
 * Falls back to a proportional mapping when the x scale can't invert the coordinate
 * (ex. category/ordinal scales) and clamps the result to the main plot length.
 * @param {object} $$ ChartInternal instance
 * @param {number} subCoord Subchart local coordinate on the index axis
 * @returns {number|null} Main chart local coordinate, or null when not resolvable
 * @private
 */
export function getMainCoordFromSubchartCoord($$, subCoord: number): number | null {
	const {config, scale, state} = $$;
	const mainX = scale.zoom || scale.x;
	const subX = scale.subX;

	if (!mainX || !subX) {
		return null;
	}

	const subLength = config.axis_rotated ? state.height2 : state.width2;
	const mainLength = config.axis_rotated ? state.height : state.width;
	const domainValue = subX.invert?.(subCoord);
	let mainCoord = domainValue == null ? NaN : mainX(domainValue);

	if (!Number.isFinite(mainCoord) && subLength > 0) {
		mainCoord = Math.max(0, Math.min(1, subCoord / subLength)) * mainLength;
	}

	return Number.isFinite(mainCoord) ? Math.max(0, Math.min(mainLength, mainCoord)) : null;
}
