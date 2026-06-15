/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {
	curveBasis as d3CurveBasis,
	curveBasisClosed as d3CurveBasisClosed,
	curveBasisOpen as d3CurveBasisOpen,
	curveBundle as d3CurveBundle,
	curveCardinal as d3CurveCardinal,
	curveCardinalClosed as d3CurveCardinalClosed,
	curveCardinalOpen as d3CurveCardinalOpen,
	curveCatmullRom as d3CurveCatmullRom,
	curveCatmullRomClosed as d3CurveCatmullRomClosed,
	curveCatmullRomOpen as d3CurveCatmullRomOpen,
	curveLinear as d3CurveLinear,
	curveLinearClosed as d3CurveLinearClosed,
	curveMonotoneX as d3CurveMonotoneX,
	curveMonotoneY as d3CurveMonotoneY,
	curveNatural as d3CurveNatural,
	curveStep as d3CurveStep,
	curveStepAfter as d3CurveStepAfter,
	curveStepBefore as d3CurveStepBefore
} from "d3-shape";
import type {d3Selection} from "../../../types/types";
import CLASS from "../../config/classes";
import {KEY} from "../../module/Cache";
import {
	capitalize,
	getPointer,
	getRectSegList,
	getUnique,
	isFunction,
	isNumber,
	isObjectType,
	isUndefined,
	isValue,
	notEmpty,
	parseDate
} from "../../module/util";
import type {IDataIndice, IDataRow, TIndices} from "../data/IData";
import type {IOffset, ShapeElementConfig, UpdateTargetsConfig} from "./IShape";

// Module-level constant: avoids re-creating the lookup object on every getInterpolate() call
const CURVE_MAP: Record<string, unknown> = {
	basis: d3CurveBasis,
	"basis-closed": d3CurveBasisClosed,
	"basis-open": d3CurveBasisOpen,
	bundle: d3CurveBundle,
	cardinal: d3CurveCardinal,
	"cardinal-closed": d3CurveCardinalClosed,
	"cardinal-open": d3CurveCardinalOpen,
	"catmull-rom": d3CurveCatmullRom,
	"catmull-rom-closed": d3CurveCatmullRomClosed,
	"catmull-rom-open": d3CurveCatmullRomOpen,
	"monotone-x": d3CurveMonotoneX,
	"monotone-y": d3CurveMonotoneY,
	natural: d3CurveNatural,
	"linear-closed": d3CurveLinearClosed,
	linear: d3CurveLinear,
	step: d3CurveStep,
	"step-after": d3CurveStepAfter,
	"step-before": d3CurveStepBefore
};

// Re-export types for backward compatibility
export type {
	IOffset,
	LinearGradientOption,
	ShapeElementConfig,
	UpdateTargetsConfig
} from "./IShape";

/**
 * Check if a target can use line-like grouped point offsets.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} d Data value, target or id
 * @returns {boolean} Whether target uses point-like y coordinates
 * @private
 */
function isLinePointGroupType($$, d): boolean {
	return $$.isLineType(d) || $$.isScatterType?.(d) || $$.isBubbleType?.(d);
}

/**
 * Get type filter for grouped line-like point offsets.
 * @param {object} $$ ChartInternal instance
 * @returns {function} Type filter
 * @private
 */
function getLinePointGroupTypeFilter($$): Function {
	return d => isLinePointGroupType($$, d);
}

/**
 * Get numeric value used for stacked offset calculation.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {number|Array|object|null} Offset value
 * @private
 */
function getShapeOffsetValue($$, d) {
	if ($$.isCandlestickType?.(d)) {
		return $$.getCandlestickData?.(d)?.close;
	}

	return $$.getBaseValue(d);
}

/**
 * Get grouped data point function for y coordinate
 * @param {object} d data vlaue
 * @returns {function|undefined}
 * @private
 */
function _getGroupedDataPointsFn(d) {
	const $$ = this;
	let fn;

	if (isLinePointGroupType($$, d)) {
		const typeFilter = getLinePointGroupTypeFilter($$);

		fn = $$.generateGetLinePoints($$.getShapeIndices(typeFilter), false, typeFilter);
	} else if ($$.isBarType(d)) {
		fn = $$.generateGetBarPoints($$.getShapeIndices($$.isBarType));
	} else if ($$.isCandlestickType?.(d)) {
		fn = $$.generateGetCandlestickPoints?.($$.getShapeIndices($$.isCandlestickType));
	}

	return fn;
}

/**
 * Get shape color with gradient support
 * @param {object} d Data object
 * @param {string} configKey Configuration key for linearGradient (e.g., 'bar_linearGradient', 'area_linearGradient')
 * @param {(d: IDataRow) => string | null} colorFn Fallback color function when gradient is not enabled
 * @returns {string | null} Color string or gradient URL
 * @private
 */
export function getShapeColorWithGradient(
	this: any,
	d: IDataRow,
	configKey: string,
	colorFn: (d: IDataRow) => string | null
): string | null {
	return this.config[configKey] ? this.getGradienColortUrl(d.id) : colorFn(d);
}

/**
 * Initialize a shape element container
 * @param {ShapeElementConfig} config Configuration object
 * @private
 */
export function initShapeElement(this: any, config: ShapeElementConfig): void {
	const {$el} = this;
	const {elKey, className, cssRules, position} = config;
	const container = $el.main.select(`.${CLASS.chart}`);

	$el[elKey] = position === "first" ?
		container.insert("g", ":first-child") :
		container.append("g");

	$el[elKey].attr("class", className);

	if (cssRules?.length) {
		$el[elKey].call(this.setCssRule(false, `.${className}`, cssRules));
	}
}

/**
 * Common update targets pattern for shapes
 * @param {Array} targets Target data
 * @param {UpdateTargetsConfig} config Configuration object
 * @returns {d3Selection} Enter selection for additional setup
 * @private
 */
export function updateTargetsForShape(
	this: any,
	targets: any[],
	config: UpdateTargetsConfig
): d3Selection {
	const $$ = this;
	const {$el} = $$;
	const {type, elKey, containerClass, itemClass, initFn, withFocus = true, withStyles = true} =
		config;

	if (!$el[elKey]) {
		initFn.call($$);
	}

	const classChart = $$.getChartClass(type);
	const classFocus = withFocus ? $$.classFocus.bind($$) : () => "";

	const mainUpdate = $el.main.select(`.${containerClass}`)
		.selectAll(`.${itemClass}`)
		.data($$.filterNullish(targets))
		.attr("class", d => classChart(d) + classFocus(d));

	const mainEnter = mainUpdate.enter().append("g")
		.attr("class", classChart);

	if (withStyles) {
		mainEnter
			.style("opacity", "0")
			.style("pointer-events", $$.getStylePropValue("none"));
	}

	return mainEnter;
}

export default {
	/**
	 * Get the shape draw function
	 * @returns {object}
	 * @private
	 */
	getDrawShape() {
		type TShape = {area?: any, bar?: any, line?: any};

		const $$ = this;
		const isRotated = $$.config.axis_rotated;
		const {hasRadar, hasTreemap} = $$.state;
		const shape = {type: <TShape>{}, indices: <TShape>{}, pos: {}};

		!hasTreemap && ["bar", "candlestick", "line", "area"].forEach(v => {
			const name = capitalize(v);

			if (
				$$.hasType(v) || $$.hasTypeOf(name) || (
					v === "line" &&
					($$.hasType("bubble") || $$.hasType("scatter"))
				)
			) {
				const indices = $$.getShapeIndices($$[`is${name}Type`]);
				const drawFn = $$[`generateDraw${name}`];

				shape.indices[v] = indices;
				shape.type[v] = drawFn ? drawFn.bind($$)(indices, false) : undefined;
			}
		});

		if (!$$.hasArcType() || hasRadar || hasTreemap) {
			let cx;
			let cy;
			let xForText;
			let yForText;

			// generate circle x/y functions depending on updated params
			if (!hasTreemap) {
				cx = hasRadar ? $$.radarCircleX : (isRotated ? $$.circleY : $$.circleX);
				cy = hasRadar ? $$.radarCircleY : (isRotated ? $$.circleX : $$.circleY);
			}

			if (hasTreemap && $$.state.isCanvasMode) {
				xForText = yForText = function() {};
			} else {
				xForText = $$.generateXYForText(shape.indices, true);
				yForText = $$.generateXYForText(shape.indices, false);
			}

			shape.pos = {
				xForText,
				yForText,
				cx: (cx || function() {}).bind($$),
				cy: (cy || function() {}).bind($$)
			};
		}

		return shape;
	},

	/**
	 * Get shape's indices according it's position within each axis tick.
	 *
	 * From the below example, indices will be:
	 * ==> {data1: 0, data2: 0, data3: 1, data4: 1, __max__: 1}
	 *
	 * 	data1 data3   data1 data3
	 * 	data2 data4   data2 data4
	 * 	-------------------------
	 * 		 0             1
	 * @param {function} typeFilter Chart type filter function
	 * @returns {object} Indices object with its position
	 */
	getShapeIndices(typeFilter): TIndices {
		const $$ = this;
		const {config} = $$;
		const xs = config.data_xs;
		const hasXs = notEmpty(xs);
		const indices: TIndices = {};
		let i: any = hasXs ? {} : 0;

		if (hasXs) {
			getUnique(Object.keys(xs).map(v => xs[v]))
				.forEach(v => {
					i[v] = 0;
					indices[v] = {};
				});
		}

		$$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$))
			.forEach(d => {
				const xKey = d.id in xs ? xs[d.id] : "";
				const ind = xKey ? indices[xKey] : indices;

				for (let j = 0, groups; (groups = config.data_groups[j]); j++) {
					if (groups.indexOf(d.id) < 0) {
						continue;
					}

					for (let k = 0, key; (key = groups[k]); k++) {
						if (key in ind) {
							ind[d.id] = ind[key];
							break;
						}

						// for same grouped data, add other data to same indices
						if (d.id !== key && xKey) {
							ind[key] = ind[d.id] ?? i[xKey];
						}
					}
				}

				if (isUndefined(ind[d.id])) {
					ind[d.id] = xKey ? i[xKey]++ : i++;
					ind.__max__ = (xKey ? i[xKey] : i) - 1;
				}
			});

		return indices;
	},

	/**
	 * Get indices value based on data ID value
	 * @param {object} indices Indices object
	 * @param {object} d Data row
	 * @param {string} caller Caller function name (Used only for 'sparkline' plugin)
	 * @returns {object} Indices object
	 * @private
	 */
	getIndices(indices: TIndices, d: IDataRow, caller?: string): IDataIndice { // eslint-disable-line
		const $$ = this;
		const {data_xs: xs, bar_indices_removeNull: removeNull} = $$.config;
		const {id, index} = d;

		if ($$.isBarType(id) && removeNull) {
			const ind = {} as IDataIndice;

			// redefine bar indices order
			$$.getAllValuesOnIndex(index, true)
				.forEach((v, i) => {
					ind[v.id] = i;
					ind.__max__ = i;
				});

			return ind;
		}

		return notEmpty(xs) ? indices[xs[id]] : indices as IDataIndice;
	},

	/**
	 * Get indices max number
	 * @param {object} indices Indices object
	 * @returns {number} Max number
	 * @private
	 */
	getIndicesMax(indices: TIndices | IDataIndice): number {
		if (!notEmpty(this.config.data_xs)) {
			return (indices as IDataIndice).__max__;
		}

		// if is multiple xs, return total sum of xs' __max__ value
		let total = 0;

		for (const key in indices) {
			total += indices[key].__max__ || 0;
		}

		return total;
	},

	getShapeX(offset: IOffset, indices, isSub?: boolean): (d) => number {
		const $$ = this;
		const {config, scale} = $$;
		const currScale = isSub ? scale.subX : (scale.zoom || scale.x);
		const barOverlap = config.bar_overlap;
		const barPadding = config.bar_padding;
		const sum = (p, c) => p + c;

		// total shapes half width
		const halfWidth = isObjectType(offset) && (
			offset._$total.length ? offset._$total.reduce(sum) / 2 : 0
		);

		// Pre-compute prefix sums to avoid O(n) slice+reduce on every bar datum
		const prefixSums: number[] = [];

		if (halfWidth && isObjectType(offset) && offset._$total.length) {
			let acc = 0;

			for (const v of offset._$total) {
				acc += v;
				prefixSums.push(acc);
			}
		}

		return d => {
			const ind = $$.getIndices(indices, d, "getShapeX");
			const index = d.id in ind ? ind[d.id] : 0;
			const targetsNum = (ind.__max__ || 0) + 1;
			let x = 0;

			if (notEmpty(d.x)) {
				const xPos = currScale(d.x, true);

				if (halfWidth) {
					const offsetWidth = offset[d.id] || offset._$width;

					x = barOverlap ? xPos - offsetWidth / 2 : xPos - offsetWidth +
						(prefixSums[index] ?? offset._$total.slice(0, index + 1).reduce(sum)) -
						halfWidth;
				} else {
					x = xPos - (isNumber(offset) ? offset : offset._$width) *
							(targetsNum / 2 - (
								barOverlap ? 1 : index
							));
				}
			}

			// adjust x position for bar.padding option
			if (offset && x && targetsNum > 1 && barPadding) {
				if (index) {
					x += barPadding * index;
				}

				if (targetsNum > 2) {
					x -= (targetsNum - 1) * barPadding / 2;
				} else if (targetsNum === 2) {
					x -= barPadding / 2;
				}
			}

			return x;
		};
	},

	getShapeY(isSub?: boolean): Function {
		const $$ = this;
		const isStackNormalized = $$.isStackNormalized();

		return d => {
			let {value} = d;

			if (isNumber(d)) {
				value = d;
			} else if ($$.isAreaRangeType(d)) {
				value = $$.getBaseValue(d, "mid");
			} else if (isStackNormalized) {
				value = $$.getRatio("index", d, true);
			} else if ($$.isBubbleZType(d)) {
				value = $$.getBubbleZData(d.value, "y");
			} else if ($$.isBarRangeType(d)) {
				// TODO use range.getEnd() like method
				value = value[1];
			}

			return $$.getYScaleById(d.id, isSub)(value);
		};
	},

	/**
	 * Get shape based y Axis min value
	 * @param {string} id Data id
	 * @returns {number}
	 * @private
	 */
	getShapeYMin(id: string): number {
		const $$ = this;
		const axisId = $$.axis.getId(id);
		const scale = $$.scale[axisId];
		const [yMin] = scale.domain();
		const inverted = $$.config[`axis_${axisId}_inverted`];

		return !$$.isGrouped(id) && !inverted && yMin > 0 ? yMin : 0;
	},

	/**
	 * Get Shape's offset data
	 * @param {function} typeFilter Type filter function
	 * @returns {object}
	 * @private
	 */
	getShapeOffsetData(typeFilter) {
		const $$ = this;
		const targets = $$.orderTargets(
			$$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$))
		);

		// Same IDs can receive new values through load()/flow(), so ID-only
		// caching can leave stacked offsets pointing at stale row maps.
		const dataGeneration = $$.state.dataGeneration;
		const targetIds = targets.map(t => t.id).join("_");
		const cacheKey = `${KEY.shapeOffset}_${targetIds}`;

		// Check if result is already cached
		const cachedData = $$.cache.get(cacheKey);

		if (cachedData?.generation === dataGeneration) {
			return cachedData;
		}

		const isStackNormalized = $$.isStackNormalized();

		const shapeOffsetTargets = targets.map(target => {
			let rowValues = target.values;
			const values = {};

			if ($$.isStepType(target)) {
				rowValues = $$.convertValuesToStep(rowValues);
			}

			const rowValueMapByXValue = rowValues.reduce((out, d) => {
				const key = Number(d.x);
				const value = getShapeOffsetValue($$, d);

				out[key] = d;
				values[key] = isStackNormalized ? $$.getRatio("index", d, true) : value;

				return out;
			}, {});

			return {
				id: target.id,
				rowValues,
				rowValueMapByXValue,
				values
			};
		});
		const indexMapByTargetId = targets.reduce((out, {id}, index) => {
			out[id] = index;
			return out;
		}, {});

		const result = {generation: dataGeneration, indexMapByTargetId, shapeOffsetTargets};

		// Cache the result
		$$.cache.add(cacheKey, result);

		return result;
	},

	getShapeOffset(typeFilter, indices, isSub?: boolean): Function {
		const $$ = this;
		const {shapeOffsetTargets, indexMapByTargetId} = $$.getShapeOffsetData(
			typeFilter
		);
		const groupsZeroAs = $$.config.data_groupsZeroAs;

		// Pre-build per-series same-stacking-group lookup to avoid .filter() on every datum.
		// bar_indices_removeNull recomputes group membership per-datum index, so fall back there.
		let sameGroupByTargetId: Map<string, typeof shapeOffsetTargets> | null = null;

		if (!$$.config.bar_indices_removeNull) {
			sameGroupByTargetId = new Map();

			for (const target of shapeOffsetTargets) {
				const ind = $$.getIndices(indices, {id: target.id, index: 0} as IDataRow);

				sameGroupByTargetId.set(
					target.id,
					shapeOffsetTargets.filter(
						t => t.id !== target.id && ind[t.id] === ind[target.id]
					)
				);
			}
		}

		return (d, idx) => {
			const {id, value, x} = d;
			const baseValue = getShapeOffsetValue($$, d);
			const ind = $$.getIndices(indices, d);
			const scale = $$.getYScaleById(id, isSub);

			if ($$.isBarRangeType(d)) {
				// TODO use range.getStart()
				return scale(value[0]);
			}

			const dataXAsNumber = Number(x);
			const y0 = scale(groupsZeroAs === "zero" ? 0 : $$.getShapeYMin(id));
			let offset = y0;

			const sameGroupTargets = sameGroupByTargetId?.get(id) ??
				shapeOffsetTargets.filter(t => t.id !== id && ind[t.id] === ind[id]);

			for (const t of sameGroupTargets) {
				const {
					id: tid,
					rowValueMapByXValue,
					rowValues,
					values: tvalues
				} = t;

				// for same stacked group (ind[tid] === ind[id])
				if (indexMapByTargetId[tid] < indexMapByTargetId[id]) {
					const rValue = tvalues[dataXAsNumber];
					let row = rowValues[idx];

					// check if the x values line up
					if (!row || Number(row.x) !== dataXAsNumber) {
						row = rowValueMapByXValue[dataXAsNumber];
					}

					const rowValue = row && getShapeOffsetValue($$, row);

					if (
						isNumber(rowValue) &&
						isNumber(baseValue) &&
						rowValue * baseValue >= 0 &&
						isNumber(rValue)
					) {
						const addOffset = baseValue === 0 ?
							(
								(groupsZeroAs === "positive" &&
									rValue > 0) ||
								(groupsZeroAs === "negative" && rValue < 0)
							) :
							true;

						if (addOffset) {
							offset += scale(rValue) - y0;
						}
					}
				}
			}

			return offset;
		};
	},

	/**
	 * Generate line coordinate points from shared geometry.
	 * @param {object} lineIndices Data order within x axis
	 * @param {boolean} isSub Whether the coordinates are for subchart
	 * @param {function} typeFilter Type filter for offset targets
	 * @returns {function} Line point generator
	 * @private
	 */
	generateGetLinePoints(lineIndices, isSub?: boolean, typeFilter?: Function): Function {
		const $$ = this;
		const {config} = $$;
		const x = $$.getShapeX(0, lineIndices, isSub);
		const y = $$.getShapeY(isSub);
		const lineOffset = $$.getShapeOffset(typeFilter || $$.isLineType, lineIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d, i) => {
			const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
			const offset = lineOffset(d, i) || y0;
			const posX = x(d);
			let posY = y(d);

			if (
				config.axis_rotated && (
					(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
				)
			) {
				posY = y0;
			}

			const point = [posX, posY - (y0 - offset)];

			return [
				point,
				point,
				point,
				point
			];
		};
	},

	/**
	 * Generate area coordinate points from shared geometry.
	 * @param {object} areaIndices Data order within x axis
	 * @param {boolean} isSub Whether the coordinates are for subchart
	 * @returns {function} Area point generator
	 * @private
	 */
	generateGetAreaPoints(
		areaIndices: TIndices,
		isSub?: boolean
	): (d: IDataRow, i: number) => [number, number][] {
		const $$ = this;
		const {config} = $$;
		const x = $$.getShapeX(0, areaIndices, isSub);
		const y = $$.getShapeY(!!isSub);
		const areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		return function(d, i) {
			const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
			const offset = areaOffset(d, i) || y0;
			const posX = x(d);
			const value = d.value as number;
			let posY = y(d);

			if (
				config.axis_rotated && (
					(value > 0 && posY < y0) || (value < 0 && y0 < posY)
				)
			) {
				posY = y0;
			}

			return [
				[posX, offset],
				[posX, posY - (y0 - offset)],
				[posX, posY - (y0 - offset)],
				[posX, offset]
			];
		};
	},

	/**
	 * Generate bar coordinate points from shared geometry.
	 * @param {object} barIndices Data order within x axis
	 * @param {boolean} isSub Whether the coordinates are for subchart
	 * @returns {function} Bar point generator
	 * @private
	 */
	generateGetBarPoints(
		barIndices,
		isSub?: boolean
	): (d, i: number) => [number, number][] {
		const $$ = this;
		const {config} = $$;
		const axis = isSub ? $$.axis.subX : $$.axis.x;
		const barTargetsNum = $$.getIndicesMax(barIndices) + 1;
		const barW: IOffset = $$.getBarW("bar", axis, barTargetsNum);
		const barX = $$.getShapeX(barW, barIndices, !!isSub);
		const barY = $$.getShapeY(!!isSub);
		const barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d, i) => {
			const {id} = d;
			const y0 = yScale.call($$, id, isSub)($$.getShapeYMin(id));
			const offset = barOffset(d, i) || y0;
			const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
			const isInverted = config[`axis_${$$.axis.getId(id)}_inverted`];
			const value = d.value as number;
			const posX = barX(d);
			let posY = barY(d);

			if (
				config.axis_rotated && !isInverted && (
					(value > 0 && posY < y0) || (value < 0 && y0 < posY)
				)
			) {
				posY = y0;
			}

			if (!$$.isBarRangeType(d)) {
				posY -= y0 - offset;
			}

			const startPosX = posX + width;

			return [
				[posX, offset],
				[posX, posY],
				[startPosX, posY],
				[startPosX, offset]
			];
		};
	},

	/**
	 * Get data's y coordinate
	 * @param {object} d Target data
	 * @param {number} i Index number
	 * @returns {number} y coordinate
	 * @private
	 */
	circleY(d: IDataRow, i: number): number {
		const $$ = this;
		const id = d.id;
		let points;

		if ($$.isGrouped(id)) {
			points = _getGroupedDataPointsFn.bind($$)(d);
		}

		return points ? points(d, i)[0][1] : $$.getYScaleById(id)($$.getBaseValue(d));
	},

	/**
	 * Get data point x coordinate.
	 * @param {object} d Data row
	 * @returns {number|null} X coordinate
	 * @private
	 */
	circleX(d): number | null {
		return this.xx(d);
	},

	/**
	 * Generate data point y coordinate accessor.
	 * @param {boolean} isSub Whether the coordinates are for subchart
	 * @returns {function} Y coordinate accessor
	 * @private
	 */
	updateCircleY(isSub = false): Function {
		const $$ = this;
		const typeFilter = getLinePointGroupTypeFilter($$);
		const getPoints = $$.generateGetLinePoints($$.getShapeIndices(typeFilter), isSub,
			typeFilter);

		return (d, i) => {
			const id = d.id;

			return $$.isGrouped(id) && isLinePointGroupType($$, d) ?
				getPoints(d, i)[0][1] :
				$$.getYScaleById(id, isSub)($$.getBaseValue(d));
		};
	},

	/**
	 * Get point radius.
	 * @param {object} d Data row
	 * @returns {number} Point radius
	 * @private
	 */
	pointR(d): number {
		const $$ = this;
		const {config} = $$;
		const pointR = config.point_r;
		let r = pointR;

		if ($$.isBubbleType(d)) {
			r = $$.getBubbleR(d);
		} else if (isFunction(pointR)) {
			r = pointR.bind($$.api)(d);
		}

		d.r = r;

		return r;
	},

	/**
	 * Get focused point radius.
	 * @param {object} d Data row
	 * @returns {number} Focused point radius
	 * @private
	 */
	pointExpandedR(d): number {
		const $$ = this;
		const {config} = $$;
		const scale = $$.isBubbleType(d) ? 1.15 : 1.75;

		return config.point_focus_expand_enabled ?
			(config.point_focus_expand_r || $$.pointR(d) * scale) :
			$$.pointR(d);
	},

	/**
	 * Get selected point radius.
	 * @param {object} d Data row
	 * @returns {number} Selected point radius
	 * @private
	 */
	pointSelectR(d): number {
		const $$ = this;
		const selectR = $$.config.point_select_r;

		return isFunction(selectR) ? selectR(d) : (selectR || $$.pointR(d) * 4);
	},

	/**
	 * Check if point.focus.only option can be applied.
	 * @returns {boolean} Whether focus-only point rendering is active
	 * @private
	 */
	isPointFocusOnly(): boolean {
		const $$ = this;

		return $$.config.point_focus_only &&
			!$$.hasType("bubble") && !$$.hasType("scatter") && !$$.hasArcType(null, ["radar"]);
	},

	/**
	 * Get data point sensitivity radius.
	 * @param {object} d Data point
	 * @returns {number} Sensitivity radius
	 * @private
	 */
	getPointSensitivity(d) {
		const $$ = this;
		let sensitivity = $$.config.point_sensitivity;

		if (!d) {
			return sensitivity;
		} else if (isFunction(sensitivity)) {
			sensitivity = sensitivity.call($$.api, d);
		} else if (sensitivity === "radius") {
			sensitivity = d.r;
		}

		return sensitivity;
	},

	getBarW(type, axis, targetsNum: number): number | IOffset {
		const $$ = this;
		const {config, org, scale, state} = $$;
		const maxDataCount = $$.getMaxDataCount();
		const isGrouped = type === "bar" && config.data_groups?.length;
		const configName = `${type}_width`;
		const {k} = $$.getZoomTransform?.() ?? {k: 1};
		const xMinMax = [
			config.axis_x_min ?? org.xDomain[0],
			config.axis_x_max ?? org.xDomain[1]
		].map(v => ($$.axis.isTimeSeries() ? parseDate.call($$, v) : Number(v))) as [
			number,
			number
		];

		let tickInterval = axis.tickInterval(maxDataCount);

		if (scale.zoom && !$$.axis.isCategorized() && k > 1) {
			const isSameMinMax = xMinMax.every((v, i) => v === org.xDomain[i]);

			tickInterval = org.xDomain.map((v, i) => {
				const value = isSameMinMax ? v : v - Math.abs(xMinMax[i]);

				return scale.zoom(value);
			}).reduce((a, c) => Math.abs(a) + c) / maxDataCount;
		}

		const getWidth = (id?: string) => {
			const width = id ? config[configName][id] : config[configName];
			const ratio = id ? width.ratio : config[`${configName}_ratio`];
			const max = id ? width.max : config[`${configName}_max`];
			const w = isNumber(width) ? width : (
				isFunction(width) ?
					width.call($$, state.width, targetsNum, maxDataCount) :
					(targetsNum ? (tickInterval * ratio) / targetsNum : 0)
			);

			return max && w > max ? max : w;
		};

		let result = getWidth();

		if (!isGrouped && isObjectType(config[configName])) {
			result = {_$width: result, _$total: []};

			$$.getTargetsToShow().forEach(v => {
				if (config[configName][v.id]) {
					result[v.id] = getWidth(v.id);
					result._$total.push(result[v.id] || result._$width);
				}
			});
		}

		return result;
	},

	/**
	 * Get shape element
	 * @param {string} shapeName Shape string
	 * @param {number} i Index number
	 * @param {string} id Data series id
	 * @returns {d3Selection}
	 * @private
	 */
	getShapeByIndex(shapeName: string, i: number, id?: string): d3Selection {
		const $$ = this;
		const {$el} = $$;
		const suffix = isValue(i) ? `-${i}` : ``;
		let shape = $el[shapeName];

		// filter from shape reference if has
		if (shape && !shape.empty()) {
			shape = shape
				.filter(d => (id ? d.id === id : true))
				.filter(d => (isValue(i) ? d.index === i : true));
		} else {
			shape = (id ?
				$el.main
					.selectAll(
						`.${CLASS[`${shapeName}s`]}${$$.getTargetSelectorSuffix(id)}`
					) :
				$el.main)
				.selectAll(`.${CLASS[shapeName]}${suffix}`);
		}

		return shape;
	},

	isWithinShape(that, d): boolean {
		const $$ = this;
		const shape = d3Select(that);
		let isWithin;

		if (!$$.isTargetToShow(d.id)) {
			isWithin = false;
		} else if ($$.hasValidPointType?.(that.nodeName)) {
			isWithin = $$.isStepType(d) ?
				$$.isWithinStep(that, $$.getYScaleById(d.id)($$.getBaseValue(d))) :
				$$.isWithinCircle(
					that,
					$$.isBubbleType(d) ? $$.pointSelectR(d) * 1.5 : 0
				);
		} else if (that.nodeName === "path") {
			isWithin = shape.classed(CLASS.bar) ? $$.isWithinBar(that) : true;
		}

		return isWithin;
	},

	getInterpolate(d) {
		const $$ = this;
		const interpolation = $$.getInterpolateType(d);

		return CURVE_MAP[interpolation];
	},

	/**
	 * Get curve generator for line-like shapes.
	 * @param {object} d Data target
	 * @returns {function} Curve generator
	 * @private
	 */
	getCurve(d): Function {
		const $$ = this;
		const isRotatedStepType = $$.config.axis_rotated && $$.isStepType(d);

		// when is step & rotated, should be computed in different way
		// https://github.com/naver/billboard.js/issues/471
		return isRotatedStepType ?
			context => {
				const step = $$.getInterpolate(d)(context);

				// keep the original method
				step.orgPoint = step.point;

				// to get rotated path data
				step.pointRotated = function(x, y) {
					this._point === 1 && (this._point = 2);

					const y1 = this._y * (1 - this._t) + y * this._t;

					this._context.lineTo(this._x, y1);
					this._context.lineTo(x, y1);

					this._x = x;
					this._y = y;
				};

				step.point = function(x, y) {
					this._point === 0 ? this.orgPoint(x, y) : this.pointRotated(x, y);
				};

				return step;
			} :
			$$.getInterpolate(d);
	},

	getInterpolateType(d) {
		const $$ = this;
		const {config} = $$;
		const type = config.spline_interpolation_type;
		const interpolation = $$.isInterpolationType(type) ? type : "cardinal";

		return $$.isSplineType(d) ? interpolation : (
			$$.isStepType(d) ? config.line_step_type : "linear"
		);
	},

	isWithinBar(that): boolean {
		const mouse = getPointer(this.state.event, that);
		const list = getRectSegList(that);
		const [seg0, seg1, seg2] = list;
		const x = Math.min(seg0.x, seg1.x);
		const y = Math.min(seg0.y, seg1.y);
		const offset = this.config.bar_sensitivity;
		const width = Math.abs(seg2.x - seg1.x);
		const height = Math.abs(seg0.y - seg1.y);
		const sx = x - offset;
		const ex = x + width + offset;
		const sy = y + height + offset;
		const ey = y - offset;

		const isWithin = sx < mouse[0] &&
			mouse[0] < ex &&
			ey < mouse[1] &&
			mouse[1] < sy;

		return isWithin;
	}
};
