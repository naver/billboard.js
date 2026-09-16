/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isObject } from "../../module/util/type-checks.js";
import { getRandom } from "../../module/util/object.js";
import { $CANDLESTICK } from "../../config/classes.js";
import { initShapeElement, updateTargetsForShape } from "./shape.js";
import candlestick_default$1 from "./core/candlestick.js";
import { select } from "d3-selection";
//#region src/ChartInternal/shape/candlestick.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
var candlestick_default = {
	...candlestick_default$1,
	initCandlestick() {
		initShapeElement.call(this, {
			elKey: "candlestick",
			className: $CANDLESTICK.chartCandlesticks
		});
	},
	/**
	* Update targets by its data
	* called from: ChartInternal.updateTargets()
	* @param {Array} targets Filtered target by type
	* @private
	*/
	updateTargetsForCandlestick(targets) {
		updateTargetsForShape.call(this, targets, {
			type: "Candlestick",
			elKey: "candlestick",
			containerClass: $CANDLESTICK.chartCandlesticks,
			itemClass: $CANDLESTICK.chartCandlestick,
			initFn: this.initCandlestick,
			withFocus: false,
			withStyles: false
		}).style("pointer-events", "none");
	},
	/**
	* Generate/Update elements
	* @param {boolean} withTransition Transition for exit elements
	* @param {boolean} isSub Subchart draw
	* @private
	*/
	updateCandlestick(withTransition, isSub = false) {
		const $$ = this;
		const { $el, $T } = $$;
		const $root = isSub ? $el.subchart : $el;
		const classSetter = $$.getClass("candlestick", true);
		const initialOpacity = $$.initialOpacity.bind($$);
		const candlestick = $root.main.selectAll(`.${$CANDLESTICK.chartCandlestick}`).selectAll(`.${$CANDLESTICK.candlestick}`).data($$.labelishData.bind($$));
		$T(candlestick.exit(), withTransition).style("opacity", "0").remove();
		const candlestickEnter = candlestick.enter().filter((d) => d.value).append("g").attr("class", classSetter);
		candlestickEnter.append("line");
		candlestickEnter.append("path");
		$root.candlestick = candlestick.merge(candlestickEnter).style("opacity", initialOpacity);
	},
	/**
	* Get draw function
	* @param {object} indices Indice data
	* @param {boolean} isSub Subchart draw
	* @returns {function}
	* @private
	*/
	generateDrawCandlestick(indices, isSub) {
		const $$ = this;
		const { config } = $$;
		const getPoints = $$.generateGetCandlestickPoints(indices, isSub);
		const isRotated = config.axis_rotated;
		const downColor = config.candlestick_color_down;
		return (d, i, g) => {
			const points = getPoints(d, i);
			const isUp = $$.getCandlestickData(d)?._isUp;
			const indexX = +isRotated;
			const indexY = +!indexX;
			if (g.classed) g.classed($CANDLESTICK[isUp ? "valueUp" : "valueDown"], true);
			const path = isRotated ? `H${points[1][1]} V${points[1][0]} H${points[0][1]}` : `V${points[1][1]} H${points[1][0]} V${points[0][1]}`;
			g.select("path").attr("d", `M${points[0][indexX]},${points[0][indexY]}${path}z`).style("fill", (d) => {
				return (isUp ? $$.color(d) : isObject(downColor) ? downColor[d.id] : downColor) || $$.color(d);
			});
			const line = g.select("line");
			const pos = isRotated ? {
				x1: points[2][1],
				x2: points[2][2],
				y1: points[2][0],
				y2: points[2][0]
			} : {
				x1: points[2][0],
				x2: points[2][0],
				y1: points[2][1],
				y2: points[2][2]
			};
			for (const x in pos) line.attr(x, pos[x]);
		};
	},
	/**
	* Redraw function
	* @param {function} drawFn Retuned functino from .generateDrawCandlestick()
	* @param {boolean} withTransition With or without transition
	* @param {boolean} isSub Subchart draw
	* @returns {Array}
	*/
	redrawCandlestick(drawFn, withTransition, isSub = false) {
		const { $el, $T } = this;
		const { candlestick } = isSub ? $el.subchart : $el;
		const rand = getRandom(true);
		return [candlestick.each(function(d, i) {
			drawFn(d, i, $T(select(this), withTransition, rand));
		}).style("opacity", null)];
	}
};
//#endregion
export { candlestick_default as default };
