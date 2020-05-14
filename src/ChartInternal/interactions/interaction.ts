/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	mouse as d3Mouse,
	select as d3Select
} from "d3-selection";
import {drag as d3Drag} from "d3-drag";
import CLASS from "../../config/classes";
import {emulateEvent, isNumber, isObject, isValue} from "../../module/util";

export default {
	/**
	 * Handle data.onover/out callback options
	 * @param {boolean} isOver Over or not
	 * @param {number|object} d data object
	 * @private
	 */
	setOverOut(isOver: boolean, d): void {
		const $$ = this;
		const {config, $el: {main}} = $$;
		const isArc = isObject(d);

		// Call event handler
		if (isArc || d !== -1) {
			let callback = config[isOver ? "data_onover" : "data_onout"].bind($$.api);

			config.color_onover && $$.setOverColor(isOver, d, isArc);

			if (isArc) {
				callback(d, main.select(`.${CLASS.arc}${$$.getTargetSelectorSuffix(d.id)}`).node());
			} else if (!config.tooltip_grouped) {
				const callee = $$.setOverOut;
				let last = callee.last || [];

				const shape = main.selectAll(`.${CLASS.shape}-${d}`)
					.filter(function(d) {
						return $$.isWithinShape(this, d);
					});

				shape
					.each(function(d) {
						if (last.length === 0 || last.every(v => v !== this)) {
							callback(d, this);
							last.push(this);
						}
					});

				if (last.length > 0 && shape.empty()) {
					callback = config.data_onout.bind($$.api);

					last.forEach(v => callback(d3Select(v).datum(), v));
					last = [];
				}

				callee.last = last;
			} else {
				if (isOver) {
					config.point_focus_only ?
						$$.showCircleFocus($$.getAllValuesOnIndex(d, true)) :
						$$.expandCirclesBars(d, null, true);
				}

				!$$.isMultipleX() && main.selectAll(`.${CLASS.shape}-${d}`)
					.each(function(d) {
						callback(d, this);
					});
			}
		}
	},

	/**
	 * Call data.onover/out callback for touch event
	 * @param {number|object} d target index or data object for Arc type
	 * @private
	 */
	callOverOutForTouch(d): void {
		const $$ = this;
		const callee = $$.callOverOutForTouch;
		const {last} = callee;

		if (isObject(d) && last ? d.id !== last.id : (d !== last)) {
			(last || isNumber(last)) && $$.setOverOut(false, last);
			(d || isNumber(d)) && $$.setOverOut(true, d);

			callee.last = d;
		}
	},

	/**
	 * Return draggable selection function
	 * @returns {Function}
	 * @private
	 */
	getDraggableSelection(): Function {
		const $$ = this;
		const {config} = $$;

		return config.interaction_enabled && config.data_selection_draggable && $$.drag ?
			d3Drag()
				.on("drag", function() {
					// @ts-ignore
					$$.drag(d3Mouse(this));
				})
				.on("start", function() {
					// @ts-ignore
					$$.dragstart(d3Mouse(this));
				})
				.on("end", () => { $$.dragend(); }) : () => {};
	},

	/**
	 * Dispatch a mouse event.
	 * @private
	 * @param {string} type event type
	 * @param {number} index Index of eventRect
	 * @param {Array} mouse x and y coordinate value
	 */
	dispatchEvent(type: string, index: number, mouse): void {
		const $$ = this;
		const isMultipleX = $$.isMultipleX();
		const selector = `.${isMultipleX ? CLASS.eventRect : `${CLASS.eventRect}-${index}`}`;
		const eventRect = $$.$el.main.select(selector).node();
		const {width, left, top} = eventRect.getBoundingClientRect();
		const x = left + (mouse ? mouse[0] : 0) + (
			isMultipleX || $$.config.axis_rotated ? 0 : (width / 2)
		);
		const y = top + (mouse ? mouse[1] : 0);
		const params = {
			screenX: x,
			screenY: y,
			clientX: x,
			clientY: y
		};

		emulateEvent[/^(mouse|click)/.test(type) ? "mouse" : "touch"](eventRect, type, params);
	}
};
