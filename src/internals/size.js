/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {isValue, ceil10, extend, capitalize} from "./util";

extend(ChartInternal.prototype, {
	getCurrentWidth() {
		const $$ = this;

		return $$.config.size_width || $$.getParentWidth();
	},

	getCurrentHeight() {
		const $$ = this;
		const config = $$.config;
		const h = config.size_height || $$.getParentHeight();

		return h > 0 ? h : 320 / ($$.hasType("gauge") && !config.gauge_fullCircle ? 2 : 1);
	},

	getCurrentPaddingTop() {
		const $$ = this;
		const config = $$.config;
		let padding = isValue(config.padding_top) ?
			config.padding_top : 0;

		if ($$.title && $$.title.node()) {
			padding += $$.getTitlePadding();
		}

		return padding;
	},

	getCurrentPaddingBottom() {
		const config = this.config;

		return isValue(config.padding_bottom) ?
			config.padding_bottom : 0;
	},

	getCurrentPaddingLeft(withoutRecompute) {
		const $$ = this;
		const config = $$.config;
		let paddingLeft;

		if (isValue(config.padding_left)) {
			paddingLeft = config.padding_left;
		} else if (config.axis_rotated) {
			paddingLeft = !config.axis_x_show ?
				1 : Math.max(ceil10($$.getAxisWidthByAxisId("x", withoutRecompute)), 40);
		} else if (!config.axis_y_show || config.axis_y_inner) { // && !config.axis_rotated
			paddingLeft = $$.axis.getYAxisLabelPosition().isOuter ? 30 : 1;
		} else {
			paddingLeft = ceil10($$.getAxisWidthByAxisId("y", withoutRecompute));
		}

		return paddingLeft;
	},

	getCurrentPaddingRight() {
		const $$ = this;
		const config = $$.config;
		const defaultPadding = 10;
		const legendWidthOnRight = $$.isLegendRight ?
			$$.getLegendWidth() + 20 : 0;
		let paddingRight;

		if (isValue(config.padding_right)) {
			paddingRight = config.padding_right + 1; // 1 is needed not to hide tick line
		} else if (config.axis_rotated) {
			paddingRight = defaultPadding + legendWidthOnRight;
		} else if (!config.axis_y2_show || config.axis_y2_inner) { // && !config.axis_rotated
			paddingRight = 2 +
				legendWidthOnRight +
				($$.axis.getY2AxisLabelPosition().isOuter ? 20 : 0);
		} else {
			paddingRight = ceil10($$.getAxisWidthByAxisId("y2")) + legendWidthOnRight;
		}

		return paddingRight;
	},

	/**
	 * Get the parent rect element's size
	 * @param {String} key property/attribute name
	 * @private
	 */
	getParentRectValue(key) {
		const offsetName = `offset${capitalize(key)}`;
		let parent = this.selectChart.node();
		let v;

		while (!v && parent && parent.tagName !== "BODY") {
			try {
				v = parent.getBoundingClientRect()[key];
			} catch (e) {
				if (offsetName in parent) {
					// In IE in certain cases getBoundingClientRect
					// will cause an "unspecified error"
					v = parent[offsetName];
				}
			}

			parent = parent.parentNode;
		}

		if (key === "width") {
			// Sometimes element's width value is incorrect(ex. flex container)
			// In this case, use body's offsetWidth instead.
			const bodyWidth = document.body.offsetWidth;

			v > bodyWidth && (v = bodyWidth);
		}

		return v;
	},

	getParentWidth() {
		return this.getParentRectValue("width");
	},

	getParentHeight() {
		const h = this.selectChart.style("height");

		return h.indexOf("px") > 0 ? +h.replace("px", "") : 0;
	},

	getSvgLeft(withoutRecompute) {
		const $$ = this;
		const config = $$.config;
		const hasLeftAxisRect = config.axis_rotated || (!config.axis_rotated && !config.axis_y_inner);
		const leftAxisClass = config.axis_rotated ? CLASS.axisX : CLASS.axisY;
		const leftAxis = $$.main.select(`.${leftAxisClass}`).node();
		const svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : {right: 0};
		const chartRect = $$.selectChart.node().getBoundingClientRect();
		const hasArc = $$.hasArcType();
		const svgLeft = svgRect.right -
			chartRect.left -
			(hasArc ? 0 : $$.getCurrentPaddingLeft(withoutRecompute));

		return svgLeft > 0 ? svgLeft : 0;
	},

	getAxisWidthByAxisId(id, withoutRecompute) {
		const $$ = this;
		const position = $$.axis.getLabelPositionById(id);

		return $$.axis.getMaxTickWidth(id, withoutRecompute) +
			(position.isInner ? 20 : 40);
	},

	getHorizontalAxisHeight(axisId) {
		const $$ = this;
		const config = $$.config;
		let h = 30;

		if (axisId === "x" && !config.axis_x_show) {
			return 8;
		}

		if (axisId === "x" && config.axis_x_height) {
			return config.axis_x_height;
		}

		if (axisId === "y" && !config.axis_y_show) {
			return config.legend_show &&
				!$$.isLegendRight &&
				!$$.isLegendInset ? 10 : 1;
		}

		if (axisId === "y2" && !config.axis_y2_show) {
			return $$.rotated_padding_top;
		}

		// Calculate x axis height when tick rotated
		if (axisId === "x" && !config.axis_rotated && config.axis_x_tick_rotate) {
			h = 30 +
				$$.axis.getMaxTickWidth(axisId) *
				Math.cos(Math.PI * (90 - config.axis_x_tick_rotate) / 180);
		}

		// Calculate y axis height when tick rotated
		if (axisId === "y" && config.axis_rotated && config.axis_y_tick_rotate) {
			h = 30 +
				$$.axis.getMaxTickWidth(axisId) *
				Math.cos(Math.PI * (90 - config.axis_y_tick_rotate) / 180);
		}

		return h +
			($$.axis.getLabelPositionById(axisId).isInner ? 0 : 10) +
			(axisId === "y2" ? -10 : 0);
	},

	getEventRectWidth() {
		return Math.max(0, this.xAxis.tickInterval());
	}
});
