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
import {emulateEvent, isNumber, isObject} from "../../module/util";

export default {
	/**
	 * Handle data.onover/out callback options
	 * @param {Boolean} isOver
	 * @param {Number|Object} d
	 * @private
	 */
	setOverOut(isOver, d) {
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
				isOver && $$.expandCirclesBars(d, null, true);

				!$$.isMultipleX() && main.selectAll(`.${CLASS.shape}-${d}`)
					.each(function(d) {
						callback(d, this);
					});
			}
		}
	},

	/**
	 * Call data.onover/out callback for touch event
	 * @param {Number|Object} d target index or data object for Arc type
	 * @private
	 */
	callOverOutForTouch(d) {
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
	 * @return {Function}
	 * @private
	 */
	getDraggableSelection() {
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
	 * @param {String} type event type
	 * @param {Number} index Index of eventRect
	 * @param {Array} mouse x and y coordinate value
	 */
	dispatchEvent(type, index, mouse) {
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
