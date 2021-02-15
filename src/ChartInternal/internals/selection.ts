/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {rgb as d3Rgb} from "d3-color";
import drag from "../interactions/drag";
import CLASS from "../../config/classes";
import {callFn} from "../../module/util";

export default {
	...drag,

	/**
	 * Select a point
	 * @param {object} target Target point
	 * @param {object} d Data object
	 * @param {number} i Index number
	 * @private
	 */
	selectPoint(target, d, i: number): void {
		const $$ = this;
		const {config, $el: {main}} = $$;
		const isRotated = config.axis_rotated;
		const cx = (isRotated ? $$.circleY : $$.circleX).bind($$);
		const cy = (isRotated ? $$.circleX : $$.circleY).bind($$);
		const r = $$.pointSelectR.bind($$);

		callFn(config.data_onselected, $$.api, d, target.node());

		// add selected-circle on low layer g
		main.select(`.${CLASS.selectedCircles}${$$.getTargetSelectorSuffix(d.id)}`)
			.selectAll(`.${CLASS.selectedCircle}-${i}`)
			.data([d])
			.enter()
			.append("circle")
			.attr("class", () => $$.generateClass(CLASS.selectedCircle, i))
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("stroke", $$.color)
			.attr("r", d2 => $$.pointSelectR(d2) * 1.4)
			.transition()
			.duration(100)
			.attr("r", r);
	},

	/**
	 * Unelect a point
	 * @param {object} target Target point
	 * @param {object} d Data object
	 * @param {number} i Index number
	 * @private
	 */
	unselectPoint(target, d, i: number): void {
		const $$ = this;
		const {config, $el} = $$;

		callFn(config.data_onunselected, $$.api, d, target.node());

		// remove selected-circle from low layer g
		$el.main.select(`.${CLASS.selectedCircles}${$$.getTargetSelectorSuffix(d.id)}`)
			.selectAll(`.${CLASS.selectedCircle}-${i}`)
			.transition()
			.duration(100)
			.attr("r", 0)
			.remove();
	},

	/**
	 * Toggles the selection of points
	 * @param {boolean} selected whether or not to select.
	 * @param {object} target Target object
	 * @param {object} d Data object
	 * @param {number} i Index number
	 * @private
	 */
	togglePoint(selected, target, d, i: number): void {
		const method = `${selected ? "" : "un"}selectPoint`;

		this[method](target, d, i);
	},

	/**
	 * Select a path
	 * @param {object} target Target path
	 * @param {object} d Data object
	 * @private
	 */
	selectPath(target, d): void {
		const $$ = this;
		const {config} = $$;

		callFn(config.data_onselected, $$.api, d, target.node());

		if (config.interaction_brighten) {
			target.transition().duration(100)
				.style("fill", () => d3Rgb($$.color(d)).brighter(0.75));
		}
	},

	/**
	 * Unelect a path
	 * @private
	 * @param {object} target Target path
	 * @param {object} d Data object
	 */
	unselectPath(target, d): void {
		const $$ = this;
		const {config} = $$;

		callFn(config.data_onunselected, $$.api, d, target.node());

		if (config.interaction_brighten) {
			target.transition().duration(100)
				.style("fill", () => $$.color(d));
		}
	},

	/**
	 * Toggles the selection of lines
	 * @param {boolean} selected whether or not to select.
	 * @param {object} target Target object
	 * @param {object} d Data object
	 * @param {number} i Index number
	 * @private
	 */
	togglePath(selected, target, d, i: number): void {
		this[
			`${selected ? "" : "un"}selectPath`
		](target, d, i);
	},

	/**
	 * Returns the toggle method of the target
	 * @param {object} that shape
	 * @param {object} d Data object
	 * @returns {Function} toggle method
	 * @private
	 */
	getToggle(that, d): Function {
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
	 * @param {object} that shape
	 * @param {object} d Data object
	 * @param {number} i Index number
	 * @private
	 */
	toggleShape(that, d, i: number): void {
		const $$ = this;
		const {config, $el: {main}} = $$;
		const shape = d3Select(that);
		const isSelected = shape.classed(CLASS.SELECTED);
		const toggle = $$.getToggle(that, d).bind($$);
		let toggledShape;

		if (config.data_selection_enabled && config.data_selection_isselectable.bind($$.api)(d)) {
			if (!config.data_selection_multiple) {
				let selector = `.${CLASS.shapes}`;

				if (config.data_selection_grouped) {
					selector += $$.getTargetSelectorSuffix(d.id);
				}

				main.selectAll(selector)
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
};
