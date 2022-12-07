/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {area as d3Area} from "d3-shape";
import {select as d3Select} from "d3-selection";
import {$AREA, $CIRCLE, $LINE} from "../../config/classes";
import {getRandom} from "../../module/util";
import type {IData, IDataRow} from "../data/IData";
import {d3Selection} from "../../../types";

type Indices = {[key: string | "__max__"]: number};

export default {
	initArea(mainLine: d3Selection): void {
		const $$ = this;
		const {config} = $$;

		mainLine
			.insert("g", `.${config.area_front ? $CIRCLE.circles : $LINE.lines}`)
			.attr("class", $$.getClass("areas", true));
	},

	/**
	 * Update area color
	 * @param {object} d Data object
	 * @returns {string} Color string
	 * @private
	 */
	updateAreaColor(d: IDataRow): string {
		const $$ = this;

		return $$.config.area_linearGradient ?
			$$.getGradienColortUrl(d.id) : $$.color(d);
	},

	/**
	 * Generate/Update elements
	 * @param {boolean} withTransition Transition for exit elements
	 * @param {boolean} isSub Subchart draw
	 * @private
	 */
	updateArea(withTransition: boolean, isSub = false): void {
		const $$ = this;
		const {config, state, $el, $T} = $$;
		const $root = isSub ? $el.subchart : $el;

		config.area_linearGradient && $$.updateLinearGradient();

		const area = $root.main.selectAll(`.${$AREA.areas}`)
			.selectAll(`.${$AREA.area}`)
			.data($$.lineData.bind($$));

		$T(area.exit(), withTransition)
			.style("opacity", "0")
			.remove();

		$root.area = area.enter().append("path")
			.attr("class", $$.getClass("area", true))
			.style("fill", $$.updateAreaColor.bind($$))
			.style("opacity", function() {
				state.orgAreaOpacity = d3Select(this).style("opacity");
				return "0";
			})
			.merge(area);

		area.style("opacity", state.orgAreaOpacity);

		// calculate ratio if grouped data exists
		$$.setRatioForGroupedData($root.area.data());
	},

	/**
	 * Redraw function
	 * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 */
	redrawArea(drawFn: Function, withTransition?: boolean, isSub = false): d3Selection[] {
		const $$ = this;
		const {area} = (isSub ? this.$el.subchart : this.$el);
		const {orgAreaOpacity} = $$.state;

		return [
			$$.$T(area, withTransition, getRandom())
				.attr("d", drawFn)
				.style("fill", $$.updateAreaColor.bind($$))
				.style("opacity", d => String($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity))
		];
	},

	/**
	 * Generate area path data
	 * @param {object} areaIndices Indices
	 * @param {boolean} isSub Weather is sub axis
	 * @returns {Function}
	 * @private
	 */
	generateDrawArea(areaIndices: Indices, isSub?: boolean): (d: IData) => string {
		const $$ = this;
		const {config} = $$;
		const lineConnectNull = config.line_connectNull;
		const isRotated = config.axis_rotated;

		const getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
		const value0 = (d, i) => ($$.isGrouped(d.id) ?
			getPoints(d, i)[0][1] :
			yScale(d.id, isSub)(
				$$.isAreaRangeType(d) ?
					$$.getRangedData(d, "high") : $$.getShapeYMin(d.id)
			));
		const value1 = (d, i) => ($$.isGrouped(d.id) ?
			getPoints(d, i)[1][1] :
			yScale(d.id, isSub)(
				$$.isAreaRangeType(d) ?
					$$.getRangedData(d, "low") : d.value
			));

		return d => {
			let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
			let x0 = 0;
			let y0 = 0;
			let path;

			if ($$.isAreaType(d)) {
				let area = d3Area();

				area = isRotated ?
					area.y(xValue)
						.x0(value0)
						.x1(value1) :
					area.x(xValue)
						.y0(config.area_above ? 0 : (
							config.area_below ? $$.state.height : value0
						))
						.y1(value1);

				if (!lineConnectNull) {
					area = area.defined(d => $$.getBaseValue(d) !== null);
				}

				if ($$.isStepType(d)) {
					values = $$.convertValuesToStep(values);
				}

				path = area.curve($$.getCurve(d))(values);
			} else {
				if (values[0]) {
					x0 = $$.scale.x(values[0].x);
					y0 = $$.getYScaleById(d.id)(values[0].value);
				}

				path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
			}

			return path || "M 0 0";
		};
	},

	generateGetAreaPoints(
		areaIndices: Indices, isSub?: boolean
	): (d: IDataRow, i: number) => [number, number][] {
		// partial duplication of generateGetBarPoints
		const $$ = this;
		const {config} = $$;
		const x = $$.getShapeX(0, areaIndices, isSub);
		const y = $$.getShapeY(!!isSub);
		const areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		return function(d, i) {
			const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
			const offset = areaOffset(d, i) || y0; // offset is for stacked area chart
			const posX = x(d);
			const value = d.value as number;
			let posY = y(d);

			// fix posY not to overflow opposite quadrant
			if (config.axis_rotated && (
				(value > 0 && posY < y0) || (value < 0 && y0 < posY)
			)) {
				posY = y0;
			}

			// 1 point that marks the area position
			return [
				[posX, offset],
				[posX, posY - (y0 - offset)],
				[posX, posY - (y0 - offset)], // needed for compatibility
				[posX, offset] // needed for compatibility
			];
		};
	}
};
