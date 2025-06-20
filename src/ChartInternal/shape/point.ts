/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import type {d3Selection} from "../../../types/types";
import {$CIRCLE, $COMMON, $SELECT} from "../../config/classes";
import {
	getBBox,
	getBoundingRect,
	getPointer,
	getRandom,
	isFunction,
	isObject,
	isUndefined,
	isValue
} from "../../module/util";
import type {IDataPoint, IDataRow} from "../data/IData";

const getTransitionName = () => getRandom();

export default {
	initialOpacityForCircle(d): string | number | null {
		const {config, state: {withoutFadeIn}} = this;
		let opacity = config.point_opacity;

		if (isUndefined(opacity)) {
			opacity = this.getBaseValue(d) !== null &&
					withoutFadeIn[d.id] ?
				this.opacityForCircle(d) :
				"0";
		}

		return opacity;
	},

	opacityForCircle(d): string | number | null {
		const {config} = this;
		let opacity = config.point_opacity;

		if (isUndefined(opacity)) {
			opacity = config.point_show && !this.isPointFocusOnly?.() ? null : "0";

			opacity = isValue(this.getBaseValue(d)) ?
				(this.isBubbleType(d) || this.isScatterType(d) ? "0.5" : opacity) :
				"0";
		}

		return opacity;
	},

	initCircle(): void {
		const $$ = this;
		const {$el: {main}} = $$;

		!$$.point && ($$.point = $$.generatePoint());

		if (
			($$.hasType("bubble") || $$.hasType("scatter")) &&
			main.select(`.${$COMMON.chart} > .${$CIRCLE.chartCircles}`).empty()
		) {
			main.select(`.${$COMMON.chart}`)
				.append("g")
				.attr("class", $CIRCLE.chartCircles);
		}
	},

	updateTargetForCircle(targetsValue, enterNodeValue): void {
		const $$ = this;
		const {config, data, $el} = $$;
		const selectionEnabled = config.interaction_enabled && config.data_selection_enabled;
		const isSelectable = selectionEnabled && config.data_selection_isselectable;
		const classCircles = $$.getClass("circles", true);

		if (!config.point_show) {
			return;
		}

		$$.initCircle();

		let targets = targetsValue;
		let enterNode = enterNodeValue;

		// only for scatter & bubble type should generate seprate <g> node
		if (!targets) {
			targets = $$.filterNullish(data.targets)
				.filter(d => this.isScatterType(d) || this.isBubbleType(d));

			const mainCircle = $el.main.select(`.${$CIRCLE.chartCircles}`)
				.style("pointer-events", "none")
				.selectAll(`.${$CIRCLE.circles}`)
				.data(targets);

			mainCircle.exit().remove();
			enterNode = mainCircle.enter();
		}

		// Circles for each data point on lines
		selectionEnabled && enterNode.append("g")
			.attr("class", d => $$.generateClass($SELECT.selectedCircles, d.id));

		enterNode.append("g")
			.attr("class", classCircles)
			.call(selection => {
				$$.setCssRule(true, `.${$CIRCLE.circles}`, ["cursor:pointer"], isSelectable)(
					selection
				);
				$$.setCssRule(true, ` .${$CIRCLE.circle}`, ["fill", "stroke"], $$.color)(selection);
			})
			.style("opacity", function() {
				const parent = d3Select(this.parentNode);

				// if the parent node is .bb-chart-circles (bubble, scatter), initialize <g bb-circles> with opacity "0"
				return parent.attr("class").indexOf($CIRCLE.chartCircles) > -1 ? "0" : null;
			});

		// Update date for selected circles
		selectionEnabled && targets.forEach(t => {
			$el.main.selectAll(`.${$SELECT.selectedCircles}${$$.getTargetSelectorSuffix(t.id)}`)
				.selectAll(`${$SELECT.selectedCircle}`)
				.each(d => {
					d.value = t.values[d.index].value;
				});
		});
	},

	updateCircle(isSub = false): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const focusOnly = $$.isPointFocusOnly();
		const $root = isSub ? $el.subchart : $el;

		if (config.point_show && !state.toggling) {
			config.point_radialGradient && $$.updateLinearGradient();

			const circles = $root.main.selectAll(`.${$CIRCLE.circles}`)
				.selectAll(`.${$CIRCLE.circle}`)
				.data(d => {
					const data = ($$.isLineType(d) && $$.shouldDrawPointsForLine(d)) ||
							$$.isBubbleType(d) || $$.isRadarType(d) || $$.isScatterType(d) ?
						(focusOnly ? [d.values[0]] : d.values) :
						[];

					// return data;
					return $$.filterNullish(data);
				});

			circles.exit().remove();

			circles.enter()
				.filter(Boolean)
				.append(
					$$.point("create", this, $$.pointR.bind($$), $$.updateCircleColor.bind($$))
				);

			$root.circle = $root.main.selectAll(`.${$CIRCLE.circles} .${$CIRCLE.circle}`)
				.style("stroke", $$.getStylePropValue($$.color))
				.style("opacity", $$.initialOpacityForCircle.bind($$));
		}
	},

	/**
	 * Update circle color
	 * @param {object} d Data object
	 * @returns {string} Color string
	 * @private
	 */
	updateCircleColor(d: IDataRow): string | null {
		const $$ = this;
		const fn = $$.getStylePropValue($$.color);

		return $$.config.point_radialGradient ? $$.getGradienColortUrl(d.id) : (fn ? fn(d) : null);
	},

	redrawCircle(cx: Function, cy: Function, withTransition: boolean, flow, isSub = false) {
		const $$ = this;
		const {state: {rendered}, $el, $T} = $$;
		const $root = isSub ? $el.subchart : $el;
		const selectedCircles = $root.main.selectAll(`.${$SELECT.selectedCircle}`);

		if (!$$.config.point_show) {
			return [];
		}

		const fn = $$.point("update", $$, cx, cy, $$.updateCircleColor.bind($$), withTransition,
			flow, selectedCircles);
		const posAttr = $$.isCirclePoint() ? "c" : "";

		const t = getRandom();
		const opacityStyleFn = $$.opacityForCircle.bind($$);
		const mainCircles: any[] = [];

		$root.circle.each(function(d) {
			let result: d3Selection | any = fn.bind(this)(d);

			result = $T(result, withTransition || !rendered, t)
				.style("opacity", opacityStyleFn);

			mainCircles.push(result);
		});

		return [
			mainCircles,
			$T(selectedCircles, withTransition)
				.attr(`${posAttr}x`, cx)
				.attr(`${posAttr}y`, cy)
		];
	},

	/**
	 * Show focused data point circle
	 * @param {object} d Selected data
	 * @private
	 */
	showCircleFocus(d?: IDataRow[]): void {
		const $$ = this;
		const {state: {hasRadar, resizing, toggling, transiting}, $el} = $$;
		let {circle} = $el;

		if (transiting === false && circle && $$.isPointFocusOnly()) {
			const cx = (hasRadar ? $$.radarCircleX : $$.circleX).bind($$);
			const cy = (hasRadar ? $$.radarCircleY : $$.circleY).bind($$);
			const withTransition = toggling || isUndefined(d);
			const fn = $$.point("update", $$, cx, cy, $$.getStylePropValue($$.color),
				resizing ? false : withTransition);

			if (d) {
				circle = circle
					.filter(function(t) {
						const data = d.filter?.(v => v.id === t.id);

						return data.length ? d3Select(this).datum(data[0]) : false;
					});
			}

			circle
				.attr("class", this.updatePointClass.bind(this))
				.style("opacity", null)
				.each(function(d) {
					const {id, index, value} = d;
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
	hideCircleFocus(): void {
		const $$ = this;
		const {$el: {circle}} = $$;

		if ($$.isPointFocusOnly() && circle) {
			$$.unexpandCircles();
			circle.style("visibility", "hidden");
		}
	},

	circleX(d): number | null {
		return this.xx(d);
	},

	updateCircleY(isSub = false): Function {
		const $$ = this;
		const getPoints = $$.generateGetLinePoints($$.getShapeIndices($$.isLineType), isSub);

		return (d, i) => {
			const id = d.id;

			return $$.isGrouped(id) ?
				getPoints(d, i)[0][1] :
				$$.getYScaleById(id, isSub)($$.getBaseValue(d));
		};
	},

	expandCircles(i: number, id: string, reset?: boolean): void {
		const $$ = this;
		const r = $$.pointExpandedR.bind($$);

		reset && $$.unexpandCircles();

		const circles = $$.getShapeByIndex("circle", i, id).classed($COMMON.EXPANDED, true);
		const scale = r(circles) / $$.config.point_r;
		const ratio = 1 - scale;

		if ($$.isCirclePoint()) {
			circles.attr("r", r);
		} else {
			// transform must be applied to each node individually
			circles.each(function() {
				const point = d3Select(this);

				if (this.tagName === "circle") {
					point.attr("r", r);
				} else {
					const {width, height} = getBBox(this);
					const x = ratio * (+point.attr("x") + width / 2);
					const y = ratio * (+point.attr("y") + height / 2);

					point.attr("transform", `translate(${x} ${y}) scale(${scale})`);
				}
			});
		}
	},

	unexpandCircles(i): void {
		const $$ = this;
		const r = $$.pointR.bind($$);

		const circles = $$.getShapeByIndex("circle", i)
			.filter(function() {
				return d3Select(this).classed($COMMON.EXPANDED);
			})
			.classed($COMMON.EXPANDED, false);

		circles.attr("r", r);

		if (!$$.isCirclePoint()) {
			const scale = r(circles) / $$.config.point_r;

			circles.attr("transform", scale !== 1 ? `scale(${scale})` : null);
		}
	},

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

	pointExpandedR(d): number {
		const $$ = this;
		const {config} = $$;
		const scale = $$.isBubbleType(d) ? 1.15 : 1.75;

		return config.point_focus_expand_enabled ?
			(config.point_focus_expand_r || $$.pointR(d) * scale) :
			$$.pointR(d);
	},

	pointSelectR(d): number {
		const $$ = this;
		const selectR = $$.config.point_select_r;

		return isFunction(selectR) ? selectR(d) : (selectR || $$.pointR(d) * 4);
	},

	/**
	 * Check if point.focus.only option can be applied.
	 * @returns {boolean}
	 * @private
	 */
	isPointFocusOnly(): boolean {
		const $$ = this;

		return $$.config.point_focus_only &&
			!$$.hasType("bubble") && !$$.hasType("scatter") && !$$.hasArcType(null, ["radar"]);
	},

	isWithinCircle(node: SVGElement, r?: number): boolean {
		const {state} = this;
		const mouse = getPointer(state.event, node);
		const element = d3Select(node);
		const prefix = this.isCirclePoint(node) ? "c" : "";
		const pointSensitivity = this.getPointSensitivity(element?.datum());

		let cx = +element.attr(`${prefix}x`);
		let cy = +element.attr(`${prefix}y`);

		// if node don't have cx/y or x/y attribute value
		if (!(cx || cy) && node.nodeType === 1) {
			const {x, y} = getBoundingRect(node);

			cx = x;
			cy = y;
		}

		return Math.sqrt(
			Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)
		) < (r || pointSensitivity);
	},

	/**
	 * Get data point sensitivity radius
	 * @param {object} d Data point object
	 * @returns {number} return the sensitivity value
	 */
	getPointSensitivity(d: IDataPoint) {
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

	updatePointClass(d) {
		const $$ = this;
		const {circle} = $$.$el;
		let pointClass = false;

		if (isObject(d) || circle) {
			pointClass = d === true ?
				circle.each(function(d) {
					let className = $$.getClass("circle", true)(d);

					if (this.getAttribute("class").indexOf($COMMON.EXPANDED) > -1) {
						className += ` ${$COMMON.EXPANDED}`;
					}

					this.setAttribute("class", className);
				}) :
				$$.getClass("circle", true)(d);
		}

		return pointClass;
	},

	generateGetLinePoints(lineIndices, isSub?: boolean): Function { // partial duplication of generateGetBarPoints
		const $$ = this;
		const {config} = $$;
		const x = $$.getShapeX(0, lineIndices, isSub);
		const y = $$.getShapeY(isSub);
		const lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d, i) => {
			const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
			const offset = lineOffset(d, i) || y0; // offset is for stacked area chart
			const posX = x(d);
			let posY = y(d);

			// fix posY not to overflow opposite quadrant
			if (
				config.axis_rotated && (
					(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
				)
			) {
				posY = y0;
			}

			// 1 point that marks the line position
			const point = [posX, posY - (y0 - offset)];

			return [
				point,
				point, // from here and below, needed for compatibility
				point,
				point
			];
		};
	},

	custom: {
		create(element, id, fillStyleFn) {
			return element.append("use")
				.attr("xlink:href", `#${id}`)
				.attr("class", this.updatePointClass.bind(this))
				.style("fill", fillStyleFn)
				.node();
		},

		update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
			const $$ = this;
			const {width, height} = getBBox(element.node());

			const xPosFn2 = d => (isValue(d.value) ? xPosFn(d) - width / 2 : 0);
			const yPosFn2 = d => (isValue(d.value) ? yPosFn(d) - height / 2 : 0);
			let mainCircles = element;

			if (withTransition) {
				flow && mainCircles.attr("x", xPosFn2);

				mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
				selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
			}

			return mainCircles
				.attr("x", xPosFn2)
				.attr("y", yPosFn2)
				.style("fill", fillStyleFn);
		}
	},

	// 'circle' data point
	circle: {
		create(element, sizeFn, fillStyleFn) {
			return element.append("circle")
				.attr("class", this.updatePointClass.bind(this))
				.attr("r", sizeFn)
				.style("fill", fillStyleFn)
				.node();
		},

		update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
			const $$ = this;
			let mainCircles = element;

			// when '.load()' called, bubble size should be updated
			if ($$.hasType("bubble")) {
				mainCircles.attr("r", $$.pointR.bind($$));
			}

			if (withTransition) {
				flow && mainCircles.attr("cx", xPosFn);

				if (mainCircles.attr("cx")) {
					mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
				}

				selectedCircles && $$.$T(mainCircles, withTransition, getTransitionName());
			}

			return mainCircles
				.attr("cx", xPosFn)
				.attr("cy", yPosFn)
				.style("fill", fillStyleFn);
		}
	},

	// 'rectangle' data point
	rectangle: {
		create(element, sizeFn, fillStyleFn) {
			const rectSizeFn = d => sizeFn(d) * 2.0;

			return element.append("rect")
				.attr("class", this.updatePointClass.bind(this))
				.attr("width", rectSizeFn)
				.attr("height", rectSizeFn)
				.style("fill", fillStyleFn)
				.node();
		},

		update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
			const $$ = this;
			const r = $$.config.point_r;
			const rectXPosFn = d => xPosFn(d) - r;
			const rectYPosFn = d => yPosFn(d) - r;

			let mainCircles = element;

			if (withTransition) {
				flow && mainCircles.attr("x", rectXPosFn);

				mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
				selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
			}

			return mainCircles
				.attr("x", rectXPosFn)
				.attr("y", rectYPosFn)
				.style("fill", fillStyleFn);
		}
	}
};
