/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {rgb as d3Rgb} from "d3-color";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend, callFn} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Select a point
	 * @private
	 * @param {Object} target point
	 * @param {Object} data
	 * @param {Number} index
	 */
	selectPoint(target, d, i) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const cx = (isRotated ? $$.circleY : $$.circleX).bind($$);
		const cy = (isRotated ? $$.circleX : $$.circleY).bind($$);
		const r = $$.pointSelectR.bind($$);

		callFn(config.data_onselected, $$.api, d, target.node());

		// add selected-circle on low layer g
		$$.main.select(`.${CLASS.selectedCircles}${$$.getTargetSelectorSuffix(d.id)}`)
			.selectAll(`.${CLASS.selectedCircle}-${i}`)
			.data([d])
			.enter()
			.append("circle")
			.attr("class", () => $$.generateClass(CLASS.selectedCircle, i))
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("stroke", () => $$.color(d))
			.attr("r", d2 => $$.pointSelectR(d2) * 1.4)
			.transition()
			.duration(100)
			.attr("r", r);
	},

	/**
	 * Unelect a point
	 * @private
	 * @param {Object} target point
	 * @param {Object} data
	 * @param {Number} index
	 */
	unselectPoint(target, d, i) {
		const $$ = this;

		callFn($$.config.data_onunselected, $$.api, d, target.node());

		// remove selected-circle from low layer g
		$$.main.select(`.${CLASS.selectedCircles}${$$.getTargetSelectorSuffix(d.id)}`)
			.selectAll(`.${CLASS.selectedCircle}-${i}`)
			.transition()
			.duration(100)
			.attr("r", 0)
			.remove();
	},

	/**
	 * Toggles the selection of points
	 * @private
	 * @param {Boolean} whether or not to select.
	 * @param {Object} target point
	 * @param {Object} data
	 * @param {Number} index
	 */
	togglePoint(selected, target, d, i) {
		const method = `${selected ? "" : "un"}selectPoint`;

		this[method](target, d, i);
	},

	/**
	 * Select a path
	 * @private
	 * @param {Object} target path
	 * @param {Object} data
	 */
	selectPath(target, d) {
		const $$ = this;
		const config = $$.config;

		callFn(config.data_onselected, $$, d, target.node());

		if (config.interaction_brighten) {
			target.transition().duration(100)
				.style("fill", () => d3Rgb($$.color(d)).brighter(0.75));
		}
	},

	/**
	 * Unelect a path
	 * @private
	 * @param {Object} target path
	 * @param {Object} data
	 */
	unselectPath(target, d) {
		const $$ = this;
		const config = $$.config;

		callFn(config.data_onunselected, $$, d, target.node());

		if (config.interaction_brighten) {
			target.transition().duration(100)
				.style("fill", () => $$.color(d));
		}
	},

	/**
	 * Toggles the selection of lines
	 * @private
	 * @param {Boolean} whether or not to select.
	 * @param {Object} target shape
	 * @param {Object} data
	 * @param {Number} index
	 */
	togglePath(selected, target, d, i) {
		this[
			`${selected ? "" : "un"}selectPath`
		](target, d, i);
	},

	/**
	 * Returns the toggle method of the target
	 * @private
	 * @param {Object} target shape
	 * @param {Object} data
	 * @returns {Function} toggle method
	 */
	getToggle(that, d) {
		const $$ = this;

		return that.nodeName === "path" ?
			$$.togglePath : (
				$$.isStepType(d) ?
					() => {} : // circle is hidden in step chart, so treat as within the click area
					$$.togglePoint
			);
	},

	/**
	 * Toggles the selection of shapes
	 * @private
	 * @param {Object} target shape
	 * @param {Object} data
	 * @param {Number} index
	 */
	toggleShape(that, d, i) {
		const $$ = this;
		const config = $$.config;
		const shape = d3Select(that);
		const isSelected = shape.classed(CLASS.SELECTED);
		const toggle = $$.getToggle(that, d).bind($$);
		let toggledShape;

		if (config.data_selection_enabled && config.data_selection_isselectable(d)) {
			if (!config.data_selection_multiple) {
				let selector = `.${CLASS.shapes}`;

				if (config.data_selection_grouped) {
					selector += $$.getTargetSelectorSuffix(d.id);
				}

				$$.main.selectAll(selector)
					.selectAll(`.${CLASS.shape}`)
					.each(function(d, i) {
						const shape = d3Select(this);

						if (shape.classed(CLASS.SELECTED)) {
							toggledShape = shape;
							toggle(false, shape.classed(CLASS.SELECTED, false), d, i);
						}
					});
			}

			if (!toggledShape || toggledShape.node() !== shape.node()) {
				shape.classed(CLASS.SELECTED, !isSelected);
				toggle(!isSelected, shape, d, i);
			}
		}
	},
});
