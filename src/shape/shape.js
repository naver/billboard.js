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
import CLASS from "../config/classes";
import ChartInternal from "../internals/ChartInternal";
import {extend, getUnique, isObjectType, isNumber, isUndefined, notEmpty} from "../internals/util";

extend(ChartInternal.prototype, {
	getShapeIndices(typeFilter) {
		const $$ = this;
		const config = $$.config;
		const xs = config.data_xs;
		const hasXs = notEmpty(xs);
		const indices = {};
		let i = hasXs ? {} : 0;

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
	 * @param {Object} indices Indices object
	 * @param {String} id Data id value
	 * @return {Object} Indices object
	 * @private
	 */
	getIndices(indices, id) {
		const xs = this.config.data_xs;

		return notEmpty(xs) ?
			indices[xs[id]] : indices;
	},

	/**
	 * Get indices max number
	 * @param {Object} indices Indices object
	 * @return {Number} Max number
	 * @private
	 */
	getIndicesMax(indices) {
		return notEmpty(this.config.data_xs) ?
			// if is multiple xs, return total sum of xs' __max__ value
			Object.keys(indices)
				.map(v => indices[v].__max__ || 0)
				.reduce((acc, curr) => acc + curr) : indices.__max__;
	},

	getShapeX(offset, indices, isSub) {
		const $$ = this;
		const scale = isSub ? $$.subX : ($$.zoomScale || $$.x);
		const barPadding = $$.config.bar_padding;
		const sum = (p, c) => p + c;
		const halfWidth = isObjectType(offset) && offset.total.length ? offset.total.reduce(sum) / 2 : 0;

		return d => {
			const ind = $$.getIndices(indices, d.id);
			const index = d.id in ind ? ind[d.id] : 0;
			const targetsNum = (ind.__max__ || 0) + 1;
			let x = 0;

			if (notEmpty(d.x)) {
				const xPos = scale(d.x);

				if (halfWidth) {
					x = xPos - (offset[d.id] || offset.width) +
						offset.total.slice(0, index + 1).reduce(sum) -
						halfWidth;
				} else {
					x = xPos - (isNumber(offset) ? offset : offset.width) * (targetsNum / 2 - index);
				}
			}

			// adjust x position for bar.padding optionq
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

	getShapeY(isSub) {
		const $$ = this;
		const isStackNormalized = $$.isStackNormalized();

		return d => {
			const value = isStackNormalized ? $$.getRatio("index", d, true) : (
				$$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "y") : d.value
			);

			return (isSub ? $$.getSubYScale(d.id) : $$.getYScale(d.id))(value);
		};
	},

	/**
	 * Get shape based y Axis min value
	 * @param {String} id Data id
	 * @return {Number}
	 * @private
	 */
	getShapeYMin(id) {
		const $$ = this;
		const [yMin] = $$[$$.axis.getId(id)].domain();

		return !$$.isGrouped(id) && yMin > 0 ? yMin : 0;
	},

	/**
	 * Get Shape's offset data
	 * @param {function(Object): boolean} typeFilter
	 * @return {{shapeOffsetTargets: ShapeOffsetTarget[], indexMapByTargetId: object}}
	 * @private
	 */
	getShapeOffsetData(typeFilter) {
		const $$ = this;
		const targets = $$.orderTargets($$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)));
		const shapeOffsetTargets = targets.map(target => {
			let rowValues = target.values;

			if ($$.isStepType(target)) {
				rowValues = $$.convertValuesToStep(rowValues);
			}
			const rowValueMapByXValue = rowValues.reduce((out, value) => {
				out[Number(value.x)] = value;
				return out;
			}, {});

			const values = rowValues.map(
				$$.isStackNormalized() ?
					v => $$.getRatio("index", v, true) :
					(({value}) => value)
			);

			return {
				id: target.id,
				rowValues,
				rowValueMapByXValue,
				values,
			};
		});
		const indexMapByTargetId = targets.reduce((out, {id}, index) => {
			out[id] = index;
			return out;
		}, {});

		return {indexMapByTargetId, shapeOffsetTargets};
	},

	getShapeOffset(typeFilter, indices, isSub) {
		const $$ = this;
		const {shapeOffsetTargets, indexMapByTargetId} = $$.getShapeOffsetData(typeFilter);

		return (d, idx) => {
			const ind = $$.getIndices(indices, d.id);
			const scale = isSub ? $$.getSubYScale(d.id) : $$.getYScale(d.id);
			const y0 = scale($$.getShapeYMin(d.id));

			const isStepType = $$.isStepType(d);
			const dataXAsNumber = Number(d.x);
			let offset = y0;

			shapeOffsetTargets
				.forEach(t => {
					const rowValues = t.rowValues;
					const values = t.values;

					if (t.id === d.id || ind[t.id] !== ind[d.id]) {
						return;
					}

					if (indexMapByTargetId[t.id] < indexMapByTargetId[d.id]) {
						let row = rowValues[idx];

						// check if the x values line up
						if (!row || Number(row.x) !== dataXAsNumber) {
							row = t.rowValueMapByXValue[dataXAsNumber];
						}

						if (row && row.value * d.value >= 0) {
							offset += scale(values[isStepType ? idx : row.index]) - y0;
						}
					}
				});

			return offset;
		};
	},

	isWithinShape(that, d) {
		const $$ = this;
		const shape = d3Select(that);
		let isWithin;

		if (!$$.isTargetToShow(d.id)) {
			isWithin = false;
		} else if ($$.hasValidPointType(that.nodeName)) {
			isWithin = $$.isStepType(d) ?
				$$.isWithinStep(that, $$.getYScale(d.id)(d.value)) :
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
		const type = $$.config.spline_interpolation_type;
		const interpolation = $$.isInterpolationType(type) ? type : "cardinal";

		return $$.isSplineType(d) ?
			interpolation : (
				$$.isStepType(d) ?
					$$.config.line_step_type : "linear"
			);
	}
});
