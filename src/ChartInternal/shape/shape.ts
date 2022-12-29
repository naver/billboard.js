/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	curveStepBefore as d3CurveStepBefore,
	curveStepAfter as d3CurveStepAfter,
	curveBasisClosed as d3CurveBasisClosed,
	curveBasisOpen as d3CurveBasisOpen,
	curveBasis as d3CurveBasis,
	curveBundle as d3CurveBundle,
	curveCardinalClosed as d3CurveCardinalClosed,
	curveCardinalOpen as d3CurveCardinalOpen,
	curveCardinal as d3CurveCardinal,
	curveCatmullRomClosed as d3CurveCatmullRomClosed,
	curveCatmullRomOpen as d3CurveCatmullRomOpen,
	curveCatmullRom as d3CurveCatmullRom,
	curveLinearClosed as d3CurveLinearClosed,
	curveLinear as d3CurveLinear,
	curveMonotoneX as d3CurveMonotoneX,
	curveMonotoneY as d3CurveMonotoneY,
	curveNatural as d3CurveNatural,
	curveStep as d3CurveStep
} from "d3-shape";
import {select as d3Select} from "d3-selection";
import type {d3Selection} from "../../../types/types";
import CLASS from "../../config/classes";
import {capitalize, getPointer, getRectSegList, getUnique, isObjectType, isNumber, isValue, isUndefined, notEmpty} from "../../module/util";
import type {IDataRow, IDataIndice, TIndices} from "../data/IData";

export interface IOffset {
	_$width: number;
	_$total: number[]
}

export default {
	/**
	 * Get the shape draw function
	 * @returns {object}
	 * @private
	 */
	getDrawShape() {
		type TShape = {
			area?: any;
			bar?: any;
			line?: any;
		};

		const $$ = this;
		const isRotated = $$.config.axis_rotated;
		const {hasRadar, hasTreemap} = $$.state;
		const shape = {type: <TShape>{}, indices: <TShape>{}, pos: {}};

		!hasTreemap && ["bar", "candlestick", "line", "area"].forEach(v => {
			const name = capitalize(/^(bubble|scatter)$/.test(v) ? "line" : v);

			if ($$.hasType(v) || $$.hasTypeOf(name) || (
				v === "line" && ($$.hasType("bubble") || $$.hasType("scatter"))
			)) {
				const indices = $$.getShapeIndices($$[`is${name}Type`]);
				const drawFn = $$[`generateDraw${name}`];

				shape.indices[v] = indices;
				shape.type[v] = drawFn ? drawFn.bind($$)(indices, false) : undefined;
			}
		});

		if (!$$.hasArcType() || hasRadar || hasTreemap) {
			let cx;
			let cy;

			// generate circle x/y functions depending on updated params
			if (!hasTreemap) {
				cx = hasRadar ? $$.radarCircleX : (isRotated ? $$.circleY : $$.circleX);
				cy = hasRadar ? $$.radarCircleY : (isRotated ? $$.circleX : $$.circleY);
			}

			shape.pos = {
				xForText: $$.generateXYForText(shape.indices, true),
				yForText: $$.generateXYForText(shape.indices, false),
				cx: (cx || function() {}).bind($$),
				cy: (cy || function() {}).bind($$)
			};
		}

		return shape;
	},

	/**
	 * Get shape's indices according it's position
	 *
	 * From the below example, indices will be:
	 * ==> {data1: 0, data2: 0, data3: 1, data4: 1, __max__: 1}
	 *
	 *	data1 data3   data1 data3
	 *	data2 data4   data2 data4
	 *	-------------------------
	 *		 0             1
	 * @param {Function} typeFilter Chart type filter function
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

					for (let k = 0, row; (row = groups[k]); k++) {
						if (row in ind) {
							ind[d.id] = ind[row];
							break;
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

		return notEmpty(xs) ?
			indices[xs[id]] : indices;
	},

	/**
	 * Get indices max number
	 * @param {object} indices Indices object
	 * @returns {number} Max number
	 * @private
	 */
	getIndicesMax(indices: TIndices | IDataIndice): number {
		return notEmpty(this.config.data_xs) ?
			// if is multiple xs, return total sum of xs' __max__ value
			Object.keys(indices)
				.map(v => indices[v].__max__ || 0)
				.reduce((acc, curr) => acc + curr) : (indices as IDataIndice).__max__;
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

		return d => {
			const ind = $$.getIndices(indices, d, "getShapeX");
			const index = d.id in ind ? ind[d.id] : 0;
			const targetsNum = (ind.__max__ || 0) + 1;
			let x = 0;

			if (notEmpty(d.x)) {
				const xPos = currScale(d.x, true);

				if (halfWidth) {
					const offsetWidth = offset[d.id] || offset._$width;

					x = barOverlap ?
						xPos - offsetWidth / 2 :
						xPos - offsetWidth + offset._$total.slice(0, index + 1).reduce(sum) - halfWidth;
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
	 * @param {Function} typeFilter Type filter function
	 * @returns {object}
	 * @private
	 */
	getShapeOffsetData(typeFilter) {
		const $$ = this;
		const targets = $$.orderTargets($$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)));
		const isStackNormalized = $$.isStackNormalized();

		const shapeOffsetTargets = targets.map(target => {
			let rowValues = target.values;
			const values = {};

			if ($$.isStepType(target)) {
				rowValues = $$.convertValuesToStep(rowValues);
			}

			const rowValueMapByXValue = rowValues.reduce((out, d) => {
				const key = Number(d.x);

				out[key] = d;
				values[key] = isStackNormalized ? $$.getRatio("index", d, true) : d.value;

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

		return {indexMapByTargetId, shapeOffsetTargets};
	},

	getShapeOffset(typeFilter, indices, isSub?: boolean): Function {
		const $$ = this;
		const {shapeOffsetTargets, indexMapByTargetId} = $$.getShapeOffsetData(typeFilter);
		const groupsZeroAs = $$.config.data_groupsZeroAs;

		return (d, idx) => {
			const {id, value, x} = d;
			const ind = $$.getIndices(indices, d);
			const scale = $$.getYScaleById(id, isSub);

			if ($$.isBarRangeType(d)) {
				// TODO use range.getStart()
				return scale(value[0]);
			}

			const dataXAsNumber = Number(x);
			const y0 = scale(groupsZeroAs === "zero" ? 0 : $$.getShapeYMin(id));
			let offset = y0;

			shapeOffsetTargets
				.filter(t => t.id !== id && ind[t.id] === ind[id])
				.forEach(t => {
					const {id: tid, rowValueMapByXValue, rowValues, values: tvalues} = t;

					// for same stacked group (ind[tid] === ind[id])
					if (indexMapByTargetId[tid] < indexMapByTargetId[id]) {
						const rValue = tvalues[dataXAsNumber];
						let row = rowValues[idx];

						// check if the x values line up
						if (!row || Number(row.x) !== dataXAsNumber) {
							row = rowValueMapByXValue[dataXAsNumber];
						}

						if (row?.value * value >= 0 && isNumber(rValue)) {
							const addOffset = value === 0 ? (
								(groupsZeroAs === "positive" && rValue > 0) ||
								(groupsZeroAs === "negative" && rValue < 0)
							) : true;

							if (addOffset) {
								offset += scale(rValue) - y0;
							}
						}
					}
				});

			return offset;
		};
	},

	getBarW(type, axis, targetsNum: number): number | IOffset {
		const $$ = this;
		const {config, org, scale} = $$;
		const maxDataCount = $$.getMaxDataCount();
		const isGrouped = type === "bar" && config.data_groups.length;
		const configName = `${type}_width`;

		const tickInterval = scale.zoom && !$$.axis.isCategorized() ?
			(org.xDomain.map(v => scale.zoom(v))
				.reduce((a, c) => Math.abs(a) + c) / maxDataCount
			) : axis.tickInterval(maxDataCount);

		const getWidth = (id?: string) => {
			const width = id ? config[configName][id] : config[configName];
			const ratio = id ? width.ratio : config[`${configName}_ratio`];
			const max = id ? width.max : config[`${configName}_max`];
			const w = isNumber(width) ?
				width : targetsNum ? (tickInterval * ratio) / targetsNum : 0;

			return max && w > max ? max : w;
		};

		let result = getWidth();

		if (!isGrouped && isObjectType(config[configName])) {
			result = {_$width: result, _$total: []};

			$$.filterTargetsToShow($$.data.targets).forEach(v => {
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
		const suffix = (isValue(i) ? `-${i}` : ``);
		let shape = $el[shapeName];

		// filter from shape reference if has
		if (shape && !shape.empty()) {
			shape = shape
				.filter(d => (id ? d.id === id : true))
				.filter(d => (isValue(i) ? d.index === i : true));
		} else {
			shape = (id ? $el.main
				.selectAll(`.${CLASS[`${shapeName}s`]}${$$.getTargetSelectorSuffix(id)}`) : $el.main)
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
				$$.isWithinStep(that, $$.getYScaleById(d.id)(d.value)) :
				$$.isWithinCircle(that, $$.isBubbleType(d) ? $$.pointSelectR(d) * 1.5 : 0);
		} else if (that.nodeName === "path") {
			isWithin = shape.classed(CLASS.bar) ? $$.isWithinBar(that) : true;
		}

		return isWithin;
	},

	getInterpolate(d) {
		const $$ = this;
		const interpolation = $$.getInterpolateType(d);

		return {
			"basis": d3CurveBasis,
			"basis-closed": d3CurveBasisClosed,
			"basis-open": d3CurveBasisOpen,
			"bundle": d3CurveBundle,
			"cardinal": d3CurveCardinal,
			"cardinal-closed": d3CurveCardinalClosed,
			"cardinal-open": d3CurveCardinalOpen,
			"catmull-rom": d3CurveCatmullRom,
			"catmull-rom-closed": d3CurveCatmullRomClosed,
			"catmull-rom-open": d3CurveCatmullRomOpen,
			"monotone-x": d3CurveMonotoneX,
			"monotone-y": d3CurveMonotoneY,
			"natural": d3CurveNatural,
			"linear-closed": d3CurveLinearClosed,
			"linear": d3CurveLinear,
			"step": d3CurveStep,
			"step-after": d3CurveStepAfter,
			"step-before": d3CurveStepBefore
		}[interpolation];
	},

	getInterpolateType(d) {
		const $$ = this;
		const {config} = $$;
		const type = config.spline_interpolation_type;
		const interpolation = $$.isInterpolationType(type) ? type : "cardinal";

		return $$.isSplineType(d) ?
			interpolation : (
				$$.isStepType(d) ?
					config.line_step_type : "linear"
			);
	},

	isWithinBar(that): boolean {
		const mouse = getPointer(this.state.event, that);
		const list = getRectSegList(that);
		const [seg0, seg1] = list;
		const x = Math.min(seg0.x, seg1.x);
		const y = Math.min(seg0.y, seg1.y);
		const offset = this.config.bar_sensitivity;
		const {width, height} = that.getBBox();
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
