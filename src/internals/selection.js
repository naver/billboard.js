/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {rgb as d3Rgb} from "d3-color";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend} from "./util";

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
		const cx = (config.axis_rotated ? $$.circleY : $$.circleX).bind($$);
		const cy = (config.axis_rotated ? $$.circleX : $$.circleY).bind($$);
		const r = $$.pointSelectR.bind($$);

		config.data_onselected
			.call($$.api, d, target.node());

		// add selected-circle on low layer g
		$$.main.select(`.${CLASS.selectedCircles}${$$.getTargetSelectorSuffix(d.id)}`).selectAll(`.${CLASS.selectedCircle}-${i}`)
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

		$$.config.data_onunselected.call($$.api, d, target.node());
		// remove selected-circle from low layer g
		$$.main.select(`.${CLASS.selectedCircles}${$$.getTargetSelectorSuffix(d.id)}`).selectAll(`.${CLASS.selectedCircle}-${i}`)
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
		selected ? this.selectPoint(target, d, i) : this.unselectPoint(target, d, i);
	},

	/**
	 * Select a path
	 * @private
	 * @param {Object} target path
	 * @param {Object} data
	 */
	selectPath(target, d) {
		const $$ = this;

		$$.config.data_onselected.call($$, d, target.node());
		if ($$.config.interaction_brighten) {
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

		$$.config.data_onunselected.call($$, d, target.node());
		if ($$.config.interaction_brighten) {
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
		selected ? this.selectPath(target, d, i) : this.unselectPath(target, d, i);
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
		let toggle;

		if (that.nodeName !== "path") {
			if ($$.isStepType(d)) {
				// circle is hidden in step chart, so treat as within the click area
				toggle = () => {}; // TODO: how to select step chart?
			} else {
				toggle = $$.togglePoint;
			}
		} else if (that.nodeName === "path") {
			toggle = $$.togglePath;
		}

		return toggle;
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
				let selecter = `.${CLASS.shapes}`;

				if (config.data_selection_grouped) {
					selecter = `.${selecter}${$$.getTargetSelectorSuffix(d.id)}`;
				}

				$$.main.selectAll(`${selecter}`)
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
