/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {area as d3Area, line as d3Line} from "d3-shape";

type PathContext = CanvasRenderingContext2D | null | undefined;
type PathResult = string | void;

/**
 * Build the path y value accessor, with subchart candlestick projection.
 * @param {object} $$ ChartInternal instance
 * @param {boolean} isSub Whether to use subchart scales
 * @returns {function} Accessor returning the path y value
 * @private
 */
function getPathValueFn($$, isSub?: boolean): (d) => any {
	// resolved once per generator rather than per data point: the candlestick
	// projection only exists for the subchart, so the main chart keeps the plain
	// `getBaseValue` accessor it used before subchart types were configurable
	if (!isSub) {
		return d => $$.getBaseValue(d);
	}

	return d => {
		const value = $$.getSubchartCandlestickShapeValue?.(d, true);

		return value === undefined ? $$.getBaseValue(d) : value;
	};
}

/**
 * Get drawable values with subchart candlestick projection.
 * @param {object} $$ ChartInternal instance
 * @param {Array} values Drawable values
 * @param {boolean} isSub Whether to use subchart scales
 * @returns {Array} Projected values
 * @private
 */
function getProjectedValues($$, values, isSub?: boolean): any[] {
	// the main chart has nothing to project, and this sits in the area redraw path:
	// mapping there would clone the whole value array on every render
	if (!isSub) {
		return values;
	}

	return values.map(d => {
		const value = $$.getSubchartCandlestickShapeValue?.(d, isSub);

		return value === undefined ? d : {...d, value};
	});
}

/**
 * Get values with step handling for line-like paths.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data target (needs `.id` for per-series step type detection)
 * @param {Array} values Null-filtered values to draw
 * @returns {Array} Drawable values
 * @private
 */
function getLineValues($$, d, values): any[] {
	return $$.isStepType(d) ? $$.convertValuesToStep(values) : values;
}

/**
 * Generate line path drawing function shared by SVG and canvas renderers.
 * @param {object} $$ ChartInternal instance
 * @param {object} lineIndices Shape indices
 * @param {boolean} isSub Whether to use subchart scales
 * @param {object} context Optional canvas path context
 * @returns {function} Line path drawing function
 * @private
 */
export function generateDrawLinePath(
	$$,
	lineIndices,
	isSub?: boolean,
	context?: PathContext
): (d) => PathResult {
	const {config, scale} = $$;
	const lineConnectNull = config.line_connectNull;
	const isRotated = config.axis_rotated;

	const getPoints = $$.generateGetLinePoints(lineIndices, isSub);
	const yScale = $$.getYScaleById.bind($$);
	const pathValue = getPathValueFn($$, isSub);

	const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
	const yValue = (d, i) => (
		$$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)(
			pathValue(d)
		)
	);

	let line = d3Line<any>();

	line = isRotated ? line.x(yValue).y(xValue) : line.x(xValue).y(yValue);
	context && (line = line.context(context));

	if (!lineConnectNull) {
		line = line.defined(d => pathValue(d) !== null);
	}

	const x = isSub ? scale.subX : scale.x;

	return d => {
		const y = yScale(d.id, isSub);
		let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;

		let x0 = 0;
		let y0 = 0;
		let path;

		if ($$.isLineType(d)) {
			const regions = config.data_regions[d.id];

			if (regions && !context && $$.lineWithRegions) {
				values = getProjectedValues($$, values, isSub);

				if ($$.isAreaRangeType(d)) {
					values = values.map(dv => ({...dv, value: $$.getRangedData(dv, "mid")}));
				}

				if ($$.isStepType(d)) {
					values = $$.convertValuesToStep(values);
				}

				path = $$.lineWithRegions(values, scale.zoom || x, y, regions);
			} else {
				path = line.curve($$.getCurve(d))(getLineValues($$, d, values));
			}
		} else {
			if (values[0]) {
				x0 = x(values[0].x);
				y0 = y(pathValue(values[0]));
			}

			path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
		}

		return path || (context ? undefined : "M 0 0");
	};
}

/**
 * Generate area path drawing function shared by SVG and canvas renderers.
 * @param {object} $$ ChartInternal instance
 * @param {object} areaIndices Shape indices
 * @param {boolean} isSub Whether to use subchart scales
 * @param {object} context Optional canvas path context
 * @returns {function} Area path drawing function
 * @private
 */
export function generateDrawAreaPath(
	$$,
	areaIndices,
	isSub?: boolean,
	context?: PathContext
): (d) => PathResult {
	const {config} = $$;
	const lineConnectNull = config.line_connectNull;
	const isRotated = config.axis_rotated;

	const getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
	const yScale = $$.getYScaleById.bind($$);
	const pathValue = getPathValueFn($$, isSub);

	// `getShapeYMin()` resolves a scale and slices its domain, but only depends on
	// the target id — memoized here so the area baseline costs one lookup per
	// series rather than one per data point
	const shapeYMin = new Map<string, number>();
	const getShapeYMin = (id: string): number => {
		let min = shapeYMin.get(id);

		if (min === undefined) {
			min = $$.getShapeYMin(id, isSub) as number;
			shapeYMin.set(id, min);
		}

		return min;
	};

	const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
	const value0 = (d, i) => ($$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)(
		$$.isAreaRangeType(d) ? $$.getRangedData(d, "high") : getShapeYMin(d.id)
	));
	const value1 = (d, i) => ($$.isGrouped(d.id) ? getPoints(d, i)[1][1] : yScale(d.id, isSub)(
		$$.isAreaRangeType(d) ? $$.getRangedData(d, "low") : pathValue(d)
	));

	return d => {
		let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
		let x0 = 0;
		let y0 = 0;
		let path;

		if ($$.isAreaType(d)) {
			let area = d3Area<any>();

			area = isRotated ?
				area.y(xValue)
					.x0(value0)
					.x1(value1) :
				area.x(xValue)
					.y0(config.area_above ? 0 : (
						config.area_below ? (isSub ? $$.state.height2 : $$.state.height) : value0
					))
					.y1(value1);
			context && (area = area.context(context));

			if (!lineConnectNull) {
				area = area.defined(d => pathValue(d) !== null);
			}

			values = getProjectedValues($$, values, isSub);

			if ($$.isStepType(d)) {
				values = $$.convertValuesToStep(values);
			}

			path = area.curve($$.getCurve(d))(values);
		} else {
			if (values[0]) {
				x0 = (isSub ? $$.scale.subX : $$.scale.x)(values[0].x);
				y0 = $$.getYScaleById(d.id, isSub)(pathValue(values[0]));
			}

			path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
		}

		return path || (context ? undefined : "M 0 0");
	};
}
