/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isObject, isUndefined, isValue } from "../../module/util/type-checks.js";
import { getRandom } from "../../module/util/object.js";
import { getBBox, getBoundingRect, getPointer } from "../../module/util/dom.js";
import { $CIRCLE, $COMMON, $SELECT } from "../../config/classes.js";
import { select } from "d3-selection";
//#region src/ChartInternal/shape/point.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
const getTransitionName = () => getRandom();
const pointBBoxCache = /* @__PURE__ */ new WeakMap();
/**
* Get cached dimensions for non-circle point elements.
* @param {SVGElement} node Point element
* @returns {object} Width/height pair
* @private
*/
function getPointBBox(node) {
	const attrHeight = node.getAttribute("height");
	const attrWidth = node.getAttribute("width");
	const href = node.getAttribute("href") || node.getAttribute("xlink:href");
	const cached = pointBBoxCache.get(node);
	if (cached && cached.attrHeight === attrHeight && cached.attrWidth === attrWidth && cached.href === href) return cached;
	const { width, height } = getBBox(node);
	const bbox = {
		attrHeight,
		attrWidth,
		height,
		href,
		width
	};
	pointBBoxCache.set(node, bbox);
	return bbox;
}
var point_default = {
	initialOpacityForCircle(d) {
		const { config, state: { withoutFadeIn } } = this;
		let opacity = config.point_opacity;
		if (isUndefined(opacity)) opacity = this.getBaseValue(d) !== null && withoutFadeIn[d.id] ? this.opacityForCircle(d) : "0";
		return opacity;
	},
	opacityForCircle(d) {
		const { config } = this;
		let opacity = config.point_opacity;
		if (isUndefined(opacity)) {
			opacity = config.point_show && !this.isPointFocusOnly?.() ? null : "0";
			opacity = isValue(this.getBaseValue(d)) ? this.isBubbleType(d) || this.isScatterType(d) ? "0.5" : opacity : "0";
		}
		return opacity;
	},
	initCircle() {
		const $$ = this;
		const { $el: { main } } = $$;
		!$$.point && ($$.point = $$.generatePoint());
		if (($$.hasType("bubble") || $$.hasType("scatter")) && main.select(`.${$COMMON.chart} > .${$CIRCLE.chartCircles}`).empty()) main.select(`.${$COMMON.chart}`).append("g").attr("class", $CIRCLE.chartCircles);
	},
	updateTargetForCircle(targetsValue, enterNodeValue) {
		const $$ = this;
		const { config, data, $el } = $$;
		const selectionEnabled = config.interaction_enabled && config.data_selection_enabled;
		const isSelectable = selectionEnabled && config.data_selection_isselectable;
		const classCircles = $$.getClass("circles", true);
		if (!config.point_show) return;
		$$.initCircle();
		let targets = targetsValue;
		let enterNode = enterNodeValue;
		if (!targets) {
			targets = $$.filterNullish(data.targets).filter((d) => this.isScatterType(d) || this.isBubbleType(d));
			const mainCircle = $el.main.select(`.${$CIRCLE.chartCircles}`).style("pointer-events", "none").selectAll(`.${$CIRCLE.circles}`).data(targets);
			mainCircle.exit().remove();
			enterNode = mainCircle.enter();
		}
		selectionEnabled && enterNode.append("g").attr("class", (d) => $$.generateClass($SELECT.selectedCircles, d.id));
		enterNode.append("g").attr("class", classCircles).call((selection) => {
			$$.setCssRule(true, `.${$CIRCLE.circles}`, ["cursor:pointer"], isSelectable)(selection);
			$$.setCssRule(true, ` .${$CIRCLE.circle}`, ["fill", "stroke"], $$.color)(selection);
		}).style("opacity", function() {
			return select(this.parentNode).classed($CIRCLE.chartCircles) ? "0" : null;
		});
		selectionEnabled && targets.forEach((t) => {
			$el.main.selectAll(`.${$SELECT.selectedCircles}${$$.getTargetSelectorSuffix(t.id)}`).selectAll(`${$SELECT.selectedCircle}`).each((d) => {
				d.value = t.values[d.index].value;
			});
		});
	},
	updateCircle(isSub = false) {
		const $$ = this;
		const { config, state, $el } = $$;
		const focusOnly = $$.isPointFocusOnly();
		const $root = isSub ? $el.subchart : $el;
		if (config.point_show && !state.toggling) {
			config.point_radialGradient && $$.updateLinearGradient();
			const circles = $root.main.selectAll(`.${$CIRCLE.circles}`).selectAll(`.${$CIRCLE.circle}`).data((d) => {
				const data = $$.isLineType(d) && $$.shouldDrawPointsForLine(d) || $$.isBubbleType(d) || $$.isRadarType(d) || $$.isScatterType(d) ? focusOnly ? [d.values[0]] : d.values : [];
				return $$.filterNullish(data);
			});
			circles.exit().remove();
			const pointR = $$.pointR.bind($$);
			const updateCircleColor = $$.generateUpdateCircleColor();
			const initialOpacityForCircle = $$.initialOpacityForCircle.bind($$);
			circles.enter().filter(Boolean).append($$.point("create", this, pointR, updateCircleColor));
			$root.circle = $root.main.selectAll(`.${$CIRCLE.circles} .${$CIRCLE.circle}`).style("stroke", $$.getStylePropValue($$.color)).style("opacity", initialOpacityForCircle);
		}
	},
	/**
	* Generate circle color accessor, hoisting the bound color function
	* to be created once per call (not per datum)
	* @returns {function} Color accessor
	* @private
	*/
	generateUpdateCircleColor() {
		const $$ = this;
		const fn = $$.getStylePropValue($$.color);
		return (d) => $$.config.point_radialGradient ? $$.getGradienColortUrl(d.id) : fn ? fn(d) : null;
	},
	/**
	* Update circle color
	* @param {object} d Data object
	* @returns {string} Color string
	* @private
	*/
	updateCircleColor(d) {
		return this.generateUpdateCircleColor()(d);
	},
	redrawCircle(cx, cy, withTransition, flow, isSub = false) {
		const $$ = this;
		const { state: { rendered }, $el, $T } = $$;
		const $root = isSub ? $el.subchart : $el;
		const selectedCircles = $root.main.selectAll(`.${$SELECT.selectedCircle}`);
		if (!$$.config.point_show) return [];
		const posAttr = $$.isCirclePoint() ? "c" : "";
		const t = getRandom();
		const opacityStyleFn = $$.opacityForCircle.bind($$);
		const updateCircleColor = $$.generateUpdateCircleColor();
		if ($$.isCirclePoint()) {
			const sel = $root.circle;
			if ($$.hasType("bubble")) sel.attr("r", $$.pointR.bind($$));
			if (withTransition) {
				flow && sel.attr("cx", cx);
				$T(sel.filter(function() {
					return !!this.getAttribute("cx");
				}), true, `${t}-pos`).attr("cx", cx).attr("cy", cy).style("fill", updateCircleColor);
				sel.filter(function() {
					return !this.getAttribute("cx");
				}).attr("cx", cx).attr("cy", cy).style("fill", updateCircleColor);
			} else sel.attr("cx", cx).attr("cy", cy).style("fill", updateCircleColor);
			return [[$T(sel, withTransition || !rendered, t).style("opacity", opacityStyleFn)], $T(selectedCircles, withTransition).attr("cx", cx).attr("cy", cy)];
		}
		const fn = $$.point("update", $$, cx, cy, updateCircleColor, withTransition, flow, selectedCircles);
		const mainCircles = [];
		$root.circle.each(function(d) {
			let result = fn.bind(this)(d);
			result = $T(result, withTransition || !rendered, t).style("opacity", opacityStyleFn);
			mainCircles.push(result);
		});
		return [mainCircles, $T(selectedCircles, withTransition).attr(`${posAttr}x`, cx).attr(`${posAttr}y`, cy)];
	},
	/**
	* Show focused data point circle
	* @param {object} d Selected data
	* @private
	*/
	showCircleFocus(d) {
		const $$ = this;
		const { state: { hasRadar, resizing, toggling, transiting }, $el } = $$;
		let { circle } = $el;
		if (transiting === false && circle && $$.isPointFocusOnly()) {
			const cx = (hasRadar ? $$.radarCircleX : $$.circleX).bind($$);
			const cy = (hasRadar ? $$.radarCircleY : $$.circleY).bind($$);
			const withTransition = toggling || isUndefined(d);
			const fn = $$.point("update", $$, cx, cy, $$.getStylePropValue($$.color), resizing ? false : withTransition);
			if (d) circle = circle.filter(function(t) {
				const data = d.filter?.((v) => v.id === t.id);
				return data.length ? select(this).datum(data[0]) : false;
			});
			circle.attr("class", this.updatePointClass.bind(this)).style("opacity", null).each(function(d) {
				const { id, index, value } = d;
				let visibility = "hidden";
				if (isValue(value)) {
					fn.bind(this)(d);
					$$.expandCircles(index, id);
					visibility = "";
				}
				this.style.visibility = visibility;
			});
		}
	},
	/**
	* Hide focused data point circle
	* @private
	*/
	hideCircleFocus() {
		const $$ = this;
		const { $el: { circle } } = $$;
		if ($$.isPointFocusOnly() && circle) {
			$$.unexpandCircles();
			circle.style("visibility", "hidden");
		}
	},
	expandCircles(i, id, reset) {
		const $$ = this;
		const r = $$.pointExpandedR.bind($$);
		reset && $$.unexpandCircles();
		const circles = $$.getShapeByIndex("circle", i, id).classed($COMMON.EXPANDED, true);
		const scale = r(circles) / $$.config.point_r;
		const ratio = 1 - scale;
		if ($$.isCirclePoint()) circles.attr("r", r);
		else circles.each(function() {
			const point = select(this);
			if (this.tagName === "circle") point.attr("r", r);
			else {
				const { width, height } = getPointBBox(this);
				const x = ratio * (+point.attr("x") + width / 2);
				const y = ratio * (+point.attr("y") + height / 2);
				point.attr("transform", `translate(${x} ${y}) scale(${scale})`);
			}
		});
	},
	unexpandCircles(i) {
		const $$ = this;
		const r = $$.pointR.bind($$);
		const circles = $$.getShapeByIndex("circle", i).filter(function() {
			return select(this).classed($COMMON.EXPANDED);
		}).classed($COMMON.EXPANDED, false);
		circles.attr("r", r);
		if (!$$.isCirclePoint()) {
			const scale = r(circles) / $$.config.point_r;
			circles.attr("transform", scale !== 1 ? `scale(${scale})` : null);
		}
	},
	isWithinCircle(node, r) {
		const { state } = this;
		const mouse = getPointer(state.event, node);
		const element = select(node);
		const prefix = this.isCirclePoint(node) ? "c" : "";
		const pointSensitivity = this.getPointSensitivity(element?.datum());
		let cx = +element.attr(`${prefix}x`);
		let cy = +element.attr(`${prefix}y`);
		if (!(cx || cy) && node.nodeType === 1) {
			const { x, y } = getBoundingRect(node);
			cx = x;
			cy = y;
		}
		const dx = cx - mouse[0];
		const dy = cy - mouse[1];
		return Math.sqrt(dx * dx + dy * dy) < (r || pointSensitivity);
	},
	updatePointClass(d) {
		const $$ = this;
		const { circle } = $$.$el;
		let pointClass = false;
		if (isObject(d) || circle) pointClass = d === true ? circle.each(function(d) {
			let className = $$.getClass("circle", true)(d);
			if (this.getAttribute("class").indexOf($COMMON.EXPANDED) > -1) className += ` ${$COMMON.EXPANDED}`;
			this.setAttribute("class", className);
		}) : $$.getClass("circle", true)(d);
		return pointClass;
	},
	custom: {
		create(element, id, fillStyleFn) {
			return element.append("use").attr("xlink:href", `#${id}`).attr("class", this.updatePointClass.bind(this)).style("fill", fillStyleFn).node();
		},
		update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
			const $$ = this;
			const { width, height } = getPointBBox(element.node());
			const xPosFn2 = (d) => isValue(d.value) ? xPosFn(d) - width / 2 : 0;
			const yPosFn2 = (d) => isValue(d.value) ? yPosFn(d) - height / 2 : 0;
			let mainCircles = element;
			if (withTransition) {
				flow && mainCircles.attr("x", xPosFn2);
				mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
				selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
			}
			return mainCircles.attr("x", xPosFn2).attr("y", yPosFn2).style("fill", fillStyleFn);
		}
	},
	circle: {
		create(element, sizeFn, fillStyleFn) {
			return element.append("circle").attr("class", this.updatePointClass.bind(this)).attr("r", sizeFn).style("fill", fillStyleFn).node();
		},
		update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
			const $$ = this;
			let mainCircles = element;
			if ($$.hasType("bubble")) mainCircles.attr("r", $$.pointR.bind($$));
			if (withTransition) {
				flow && mainCircles.attr("cx", xPosFn);
				if (mainCircles.attr("cx")) mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
				selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
			}
			return mainCircles.attr("cx", xPosFn).attr("cy", yPosFn).style("fill", fillStyleFn);
		}
	},
	rectangle: {
		create(element, sizeFn, fillStyleFn) {
			const rectSizeFn = (d) => sizeFn(d) * 2;
			return element.append("rect").attr("class", this.updatePointClass.bind(this)).attr("width", rectSizeFn).attr("height", rectSizeFn).style("fill", fillStyleFn).node();
		},
		update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
			const $$ = this;
			const r = $$.config.point_r;
			const rectXPosFn = (d) => xPosFn(d) - r;
			const rectYPosFn = (d) => yPosFn(d) - r;
			let mainCircles = element;
			if (withTransition) {
				flow && mainCircles.attr("x", rectXPosFn);
				mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
				selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
			}
			return mainCircles.attr("x", rectXPosFn).attr("y", rectYPosFn).style("fill", fillStyleFn);
		}
	}
};
//#endregion
export { point_default as default };
