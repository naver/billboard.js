/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	namespaces as d3Namespaces,
	select as d3Select
} from "d3-selection";
import type {d3Selection} from "../../../types/types";
import {$CIRCLE, $COMMON, $SELECT} from "../../config/classes";
import {document} from "../../module/browser";
import type {IDataRow} from "../data/IData";
import {getBoundingRect, getPointer, getRandom, isFunction, isObject, isObjectType, isUndefined, isValue, toArray, notEmpty} from "../../module/util";

const getTransitionName = () => getRandom();

export default {
	hasValidPointType(type?: string): boolean {
		return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(type || this.config.point_type);
	},

	hasValidPointDrawMethods(type?: string): boolean {
		const pointType = type || this.config.point_type;

		return isObjectType(pointType) &&
			isFunction(pointType.create) && isFunction(pointType.update);
	},

	initialOpacityForCircle(d): string | number | null {
		const {config, state: {withoutFadeIn}} = this;
		let opacity = config.point_opacity;

		if (isUndefined(opacity)) {
			opacity = this.getBaseValue(d) !== null &&
				withoutFadeIn[d.id] ? this.opacityForCircle(d) : "0";
		}

		return opacity;
	},

	opacityForCircle(d): string | number | null {
		const {config} = this;
		let opacity = config.point_opacity;

		if (isUndefined(opacity)) {
			opacity = config.point_show && !config.point_focus_only ? null : "0";

			opacity = isValue(this.getBaseValue(d)) ?
				(this.isBubbleType(d) || this.isScatterType(d) ?
					"0.5" : opacity) : "0";
		}

		return opacity;
	},

	initCircle(): void {
		const $$ = this;
		const {$el: {main}} = $$;

		$$.point = $$.generatePoint();

		if (($$.hasType("bubble") || $$.hasType("scatter")) && main.select(`.${$CIRCLE.chartCircles}`).empty()) {
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

		!$el.circle && $$.initCircle();

		let targets = targetsValue;
		let enterNode = enterNodeValue;

		// only for scatter & bubble type should generate seprate <g> node
		if (!targets) {
			targets = (data.targets)
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
				$$.setCssRule(true, `.${$CIRCLE.circles}`, ["cursor:pointer"], isSelectable)(selection);
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
		const focusOnly = config.point_focus_only;
		const $root = isSub ? $el.subchart : $el;

		if (config.point_show && !state.toggling) {
			const circles = $root.main.selectAll(`.${$CIRCLE.circles}`)
				.selectAll(`.${$CIRCLE.circle}`)
				.data(d => (
					($$.isLineType(d) && $$.shouldDrawPointsForLine(d)) ||
						$$.isBubbleType(d) || $$.isRadarType(d) || $$.isScatterType(d) ?
						(focusOnly ? [d.values[0]] : d.values) : [])
				);

			circles.exit().remove();

			circles.enter()
				.filter(Boolean)
				.append($$.point("create", this, $$.pointR.bind($$), $$.getStylePropValue($$.color)));

			$root.circle = $root.main.selectAll(`.${$CIRCLE.circles} .${$CIRCLE.circle}`)
				.style("stroke", $$.getStylePropValue($$.color))
				.style("opacity", $$.initialOpacityForCircle.bind($$));
		}
	},

	redrawCircle(cx: Function, cy: Function, withTransition: boolean, flow, isSub = false) {
		const $$ = this;
		const {state: {rendered}, $el, $T} = $$;
		const $root = isSub ? $el.subchart : $el;
		const selectedCircles = $root.main.selectAll(`.${$SELECT.selectedCircle}`);

		if (!$$.config.point_show) {
			return [];
		}

		const fn = $$.point("update", $$, cx, cy, $$.getStylePropValue($$.color), withTransition, flow, selectedCircles);
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
		const {config, state: {hasRadar, resizing, toggling, transiting}, $el} = $$;
		let {circle} = $el;

		if (transiting === false && config.point_focus_only && circle) {
			const cx = (hasRadar ? $$.radarCircleX : $$.circleX).bind($$);
			const cy = (hasRadar ? $$.radarCircleY : $$.circleY).bind($$);
			const withTransition = toggling || isUndefined(d);
			const fn = $$.point("update", $$, cx, cy, $$.getStylePropValue($$.color), resizing ? false : withTransition);

			if (d) {
				circle = circle
					.filter(function(t) {
						const data = d.filter?.(v => v.id === t.id);

						return data.length ?
							d3Select(this).datum(data[0]) : false;
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
		const {config, $el: {circle}} = $$;

		if (config.point_focus_only && circle) {
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
					const {width, height} = this.getBBox();
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

		return r;
	},

	pointExpandedR(d): number {
		const $$ = this;
		const {config} = $$;
		const scale = $$.isBubbleType(d) ? 1.15 : 1.75;

		return config.point_focus_expand_enabled ?
			(config.point_focus_expand_r || $$.pointR(d) * scale) : $$.pointR(d);
	},

	pointSelectR(d): number {
		const $$ = this;
		const selectR = $$.config.point_select_r;

		return isFunction(selectR) ?
			selectR(d) : (selectR || $$.pointR(d) * 4);
	},

	isWithinCircle(node, r?: number): boolean {
		const mouse = getPointer(this.state.event, node);
		const element = d3Select(node);
		const prefix = this.isCirclePoint(node) ? "c" : "";
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
		) < (r || this.config.point_sensitivity);
	},

	insertPointInfoDefs(point, id: string): void {
		const $$ = this;
		const copyAttr = (from, target) => {
			const attribs = from.attributes;

			for (let i = 0, name; (name = attribs[i]); i++) {
				name = name.name;
				target.setAttribute(name, from.getAttribute(name));
			}
		};

		const doc = new DOMParser().parseFromString(point, "image/svg+xml");
		const node = doc.documentElement;
		const clone = document.createElementNS(d3Namespaces.svg, node.nodeName.toLowerCase());

		clone.id = id;
		clone.style.fill = "inherit";
		clone.style.stroke = "inherit";

		copyAttr(node, clone);

		if (node.childNodes?.length) {
			const parent = d3Select(clone);

			if ("innerHTML" in clone) {
				parent.html(node.innerHTML);
			} else {
				toArray(node.childNodes).forEach(v => {
					copyAttr(v, parent.append(v.tagName).node());
				});
			}
		}

		$$.$el.defs.node().appendChild(clone);
	},

	pointFromDefs(id: string) {
		return this.$el.defs.select(`#${id}`);
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
				}) : $$.getClass("circle", true)(d);
		}

		return pointClass;
	},

	generateGetLinePoints(lineIndices, isSub?: boolean):Function { // partial duplication of generateGetBarPoints
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
			if (config.axis_rotated && (
				(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
			)) {
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

	generatePoint(): Function {
		const $$ = this;
		const {config, state: {datetimeId}} = $$;
		const ids: string[] = [];
		const pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];

		return function(method, context, ...args) {
			return function(d) {
				const id: string = $$.getTargetSelectorSuffix(d.id || d.data?.id || d);
				const element = d3Select(this);

				ids.indexOf(id) < 0 && ids.push(id);

				let point = pattern[ids.indexOf(id) % pattern.length];

				if ($$.hasValidPointType(point)) {
					point = $$[point];
				} else if (!$$.hasValidPointDrawMethods(point)) {
					const pointId = `${datetimeId}-point${id}`;
					const pointFromDefs = $$.pointFromDefs(pointId);

					if (pointFromDefs.size() < 1) {
						$$.insertPointInfoDefs(point, pointId);
					}

					if (method === "create") {
						return $$.custom.create.bind(context)(element, pointId, ...args);
					} else if (method === "update") {
						return $$.custom.update.bind(context)(element, ...args);
					}
				}

				return point[method].bind(context)(element, ...args);
			};
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

		update(element, xPosFn, yPosFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			const $$ = this;
			const {width, height} = element.node().getBBox();

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

		update(element, xPosFn, yPosFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
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

		update(element, xPosFn, yPosFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
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
