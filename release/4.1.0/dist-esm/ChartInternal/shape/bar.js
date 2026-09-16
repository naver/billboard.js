/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isNumber } from "../../module/util/type-checks.js";
import { getRandom } from "../../module/util/object.js";
import { $BAR, $COMMON } from "../../config/classes.js";
import { getShapeColorWithGradient, updateTargetsForShape } from "./shape.js";
import { getBarPathInterpolator, getBarRadiusInfo, getBarRadiusResolver, getStackingBarRadiusSet } from "./core/barRadius.js";
import { select } from "d3-selection";
//#region src/ChartInternal/shape/bar.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Get the type of connect line for bar chart
* @param {string} id Data id
* @returns {string|null} Connect line type or null if not applicable
* @private
*/
function _getConnectLineType(id) {
	const connectLine = this.config.bar_connectLine;
	const type = connectLine?.[id] || connectLine;
	return /^(start|end)\-(start|end)$/.test(type) ? type : null;
}
var bar_default = {
	initBar() {
		const { $el, config, state: { clip } } = this;
		$el.bar = $el.main.select(`.${$COMMON.chart}`);
		$el.bar = config.bar_front ? $el.bar.append("g") : $el.bar.insert("g", ":first-child");
		$el.bar.attr("class", $BAR.chartBars).call(this.setCssRule(false, `.${$BAR.chartBars}`, ["pointer-events:none"]));
		if (config.clipPath === false && (config.bar_radius || config.bar_radius_ratio)) $el.bar.attr("clip-path", clip.pathXAxis.replace(/#[^)]*/, `#${clip.id}`));
	},
	updateTargetsForBar(targets) {
		const $$ = this;
		const { config } = $$;
		const classBars = $$.getClass("bars", true);
		const isSelectable = config.interaction_enabled && config.data_selection_isselectable;
		updateTargetsForShape.call($$, targets, {
			type: "Bar",
			elKey: "bar",
			containerClass: $BAR.chartBars,
			itemClass: $BAR.chartBar,
			initFn: $$.initBar
		}).append("g").attr("class", classBars).style("cursor", (d) => isSelectable?.bind?.($$.api)(d) ? "pointer" : null).call((selection) => {
			$$.setCssRule(true, ` .${$BAR.bar}`, ["fill"], $$.color)(selection);
			selection.each(function(d) {
				if (_getConnectLineType.call($$, d.id)) select(this).append("path").attr("class", $BAR.barConnectLine);
			});
		});
	},
	/**
	* Generate/Update elements
	* @param {boolean} withTransition Transition for exit elements
	* @param {boolean} isSub Subchart draw
	* @private
	*/
	updateBar(withTransition, isSub = false) {
		const $$ = this;
		if ($$.state.isCanvasMode) return;
		const { config, $el, $T } = $$;
		const $root = isSub ? $el.subchart : $el;
		const classBar = $$.getClass("bar", true);
		const initialOpacity = $$.initialOpacity.bind($$);
		config.bar_linearGradient && $$.updateLinearGradient();
		const bar = $root.main.selectAll(`.${$BAR.bars}`).selectAll(`.${$BAR.bar}`).data($$.labelishData.bind($$));
		$T(bar.exit(), withTransition).style("opacity", "0").remove();
		$root.bar = bar.enter().append("path").attr("class", classBar).style("fill", $$.generateUpdateBarColor()).merge(bar).style("opacity", initialOpacity);
		$$.setRatioForGroupedData($root.bar.data());
	},
	/**
	* Generate bar color accessor, hoisting the bound color function
	* to be created once per call (not per datum)
	* @returns {function} Color accessor
	* @private
	*/
	generateUpdateBarColor() {
		const $$ = this;
		const fn = $$.getStylePropValue($$.color) || (() => null);
		return (d) => getShapeColorWithGradient.call($$, d, "bar_linearGradient", fn);
	},
	/**
	* Update bar color
	* @param {object} d Data object
	* @returns {string} Color string
	* @private
	*/
	updateBarColor(d) {
		return this.generateUpdateBarColor()(d);
	},
	/**
	* Redraw function
	* @param {function} drawFn Retuned function from .getDrawShape() => .generateDrawBar()
	* @param {boolean} withTransition With or without transition
	* @param {boolean} isSub Subchart draw
	* @returns {Array}
	* @private
	*/
	redrawBar(drawFn, withTransition, isSub = false) {
		const $$ = this;
		if ($$.state.isCanvasMode) return [];
		const { bar } = isSub ? $$.$el.subchart : $$.$el;
		const barPath = [];
		const connectLineCache = /* @__PURE__ */ new Map();
		const getRadius = getBarRadiusResolver($$);
		const barColor = $$.generateUpdateBarColor();
		const getBarPath = function(d, i, arr) {
			const path = isNumber(d.value) || $$.isBarRangeType(d) || $$.isSubchartCandlestickBarValue?.(d, isSub) ? drawFn(d, i) : [""];
			let connectLineType = connectLineCache.get(d.id);
			if (connectLineType === void 0) {
				connectLineType = _getConnectLineType.call($$, d.id);
				connectLineCache.set(d.id, connectLineType);
			}
			if (path.length > 1) barPath.push(path[1]);
			if (i === arr.length - 1 && barPath.length) {
				const barConnectLineNode = $$.$T(select(this.parentNode.querySelector(`.${$BAR.barConnectLine}`)), withTransition, getRandom());
				$$.updateConnectLine(barConnectLineNode, connectLineType, barPath);
				barPath.splice(0);
			}
			return path[0];
		};
		const barTransition = $$.$T(bar, withTransition, getRandom());
		if (getRadius && typeof barTransition.attrTween === "function") barTransition.attrTween("d", function(d, i, arr) {
			const target = getBarPath.call(this, d, i, arr);
			return getBarPathInterpolator(this.getAttribute("d") ?? "", target);
		});
		else barTransition.attr("d", getBarPath);
		return [barTransition.style("fill", (d) => $$.getSubchartCandlestickBarColor?.(d, isSub) || barColor(d)).style("clip-path", (d) => d.clipPath).style("opacity", null)];
	},
	/**
	* Generate draw function
	* @param {object} barIndices data order within x axis.
	* barIndices ==> {data1: 0, data2: 0, data3: 1, data4: 1, __max__: 1}
	*
	* When gropus given as:
	*  groups: [
	* 		["data1", "data2"],
	* 		["data3", "data4"]
	* 	],
	*
	* Will be rendered as:
	* 		data1 data3   data1 data3
	* 		data2 data4   data2 data4
	* 		-------------------------
	* 			 0             1
	* @param {boolean} isSub If is for subchart
	* @returns {function}
	* @private
	*/
	generateDrawBar(barIndices, isSub) {
		const $$ = this;
		const { config } = $$;
		const getPoints = $$.generateGetBarPoints(barIndices, isSub);
		const getRadius = getBarRadiusResolver($$);
		const stackingRadiusSet = getRadius ? getStackingBarRadiusSet($$) : /* @__PURE__ */ new Set();
		const connectLineCache = /* @__PURE__ */ new Map();
		return (d, i) => {
			const points = getPoints(d, i);
			const { indexX, indexY, isNegative, pos, radius, clipPath } = getBarRadiusInfo($$, d, points, getRadius, stackingRadiusSet, $$.isStackingRadiusData.bind($$));
			const pathRadius = ["", ""];
			d.clipPath = clipPath;
			if (getRadius) {
				const arc = `a${radius} ${radius} ${isNegative ? "1 0 0" : "0 0 1"} `;
				pathRadius[indexY] = `${arc}${radius},${radius}`;
				pathRadius[indexX] = `${arc}${[-radius, radius][config.axis_rotated ? "sort" : "reverse"]()}`;
				isNegative && pathRadius.reverse();
			}
			const path = config.axis_rotated ? `H${pos} ${pathRadius[0]}V${points[2][indexY] - radius} ${pathRadius[1]}H${points[3][indexX]}` : `V${pos} ${pathRadius[0]}H${points[2][indexX] - radius} ${pathRadius[1]}V${points[3][indexY]}`;
			const coords = [`M${points[0][indexX]},${points[0][indexY]}${path}z`];
			let connectLineType = connectLineCache.get(d.id);
			if (connectLineType === void 0) {
				connectLineType = _getConnectLineType.call($$, d.id);
				connectLineCache.set(d.id, connectLineType);
			}
			if (connectLineType) coords.push(config.axis_rotated ? {
				x: points[0][indexX],
				y: points[0][indexY],
				width: points[0][indexX] - pos,
				height: points[2][indexY] - points[0][indexY]
			} : {
				x: points[0][indexX],
				y: pos,
				width: points[2][indexX] - points[0][indexX],
				height: points[3][indexY] - pos
			});
			return coords;
		};
	},
	/**
	* Determine if given stacking bar data is radius type
	* @param {object} d Data row
	* @returns {boolean}
	*/
	isStackingRadiusData(d) {
		const $$ = this;
		const { $el, config, data, state } = $$;
		const { id, index, value } = d;
		if (state.hiddenTargetIds.has(id)) {
			const target = $el.bar.filter((d) => d.id === id && d.value === value);
			return !target.empty() && /a\d+/i.test(target.attr("d"));
		}
		const keys = config.data_groups.find((v) => v.indexOf(id) > -1);
		const sortedIds = $$.orderTargets($$.filterTargetsToShow(data.targets.filter($$.isBarType, $$))).filter((v) => keys.indexOf(v.id) > -1).map((v) => {
			const v2 = v.values[index];
			if (v2 && (isNumber(value) && value > 0 ? v2.value > 0 : v2.value < 0)) return v2;
		}).filter(Boolean).map((v) => v.id);
		return value !== 0 && sortedIds.indexOf(id) === sortedIds.length - 1;
	},
	/**
	* Update the bar connect line path
	* @param {d3Selection} node d3 selection of bar connect line
	* @param {string} type Type of connect line, one of "start-start", "start-end", "end-start", "end-end"
	* @param {Array} barPath d3 path data for the bar
	*/
	updateConnectLine(node, type, barPath) {
		const path = barPath.map((v, i, arr) => {
			const isRotated = this.config.axis_rotated;
			const isStart = /^start-(start|end)$/.test(type);
			const isEnd = /^end-(start|end)$/.test(type);
			const path = [];
			const x = isRotated ? isEnd ? v.x - v.width : v.x : v.x + v.width;
			const y = isRotated ? v.y + v.height : isStart ? v.y + v.height : v.y;
			if (i === 0) path.push(`${x},${y}`);
			else {
				path.push(isRotated ? `L${v.x - (/\w+-end$/.test(type) ? v.width : 0)},${v.y}` : `L${v.x},${v.y + (/\w+-start$/.test(type) ? v.height : 0)}`);
				if (i < arr.length - 1) path.push(`M${x},${y}`);
			}
			return path.join(" ");
		});
		node.attr("d", `M${path.join("")}z`);
	}
};
//#endregion
export { bar_default as default };
