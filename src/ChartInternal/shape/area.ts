/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {d3Selection} from "../../../types";
import {$AREA, $CIRCLE, $LINE} from "../../config/classes";
import {getRandom} from "../../module/util";
import type {IDataRow} from "../data/IData";
import {generateDrawAreaPath} from "./core/path";
import {getShapeColorWithGradient} from "./shape";

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

		return getShapeColorWithGradient.call($$, d, "area_linearGradient", $$.color) as string;
	},

	/**
	 * Generate/Update elements
	 * @param {boolean} withTransition Transition for exit elements
	 * @param {boolean} isSub Subchart draw
	 * @private
	 */
	updateArea(withTransition: boolean, isSub = false): void {
		const $$ = this;

		if ($$.state.isCanvasMode) {
			return;
		}

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
	 * @param {function} drawFn Retuned functino from .generateDrawCandlestick()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 */
	redrawArea(drawFn: Function, withTransition?: boolean, isSub = false): d3Selection[] {
		const $$ = this;

		if ($$.state.isCanvasMode) {
			return [];
		}

		const {area} = isSub ? this.$el.subchart : this.$el;
		const {orgAreaOpacity} = $$.state;

		return [
			$$.$T(area, withTransition, getRandom())
				.attr("d", drawFn)
				.style("fill", $$.updateAreaColor.bind($$))
				.style("opacity",
					d => String($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity))
		];
	},

	/**
	 * Generate area path data
	 * @param {object} areaIndices Indices
	 * @param {boolean} isSub Weather is sub axis
	 * @returns {function}
	 * @private
	 */
	generateDrawArea(areaIndices, isSub?: boolean): (d) => string {
		const $$ = this;

		return generateDrawAreaPath($$, areaIndices, isSub) as (d) => string;
	}
};
