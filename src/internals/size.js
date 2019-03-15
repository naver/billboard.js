/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {isValue, ceil10, extend, capitalize} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Update container size
	 * @private
	 */
	setContainerSize() {
		const $$ = this;

		$$.currentWidth = $$.getCurrentWidth();
		$$.currentHeight = $$.getCurrentHeight();
	},

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

	/**
	 * Get Axis size according its position
	 * @param {String} id Axis id value - x, y or y2
	 * @return {number} size Axis size value
	 * @private
	 */
	getAxisSize(id) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;

		return (isRotated && id === "x") || (!isRotated && /y2?/.test(id)) ?
			$$.getAxisWidthByAxisId(id, true) :
			$$.getHorizontalAxisHeight(id);
	},

	getCurrentPaddingTop() {
		const $$ = this;
		const config = $$.config;
		const axesLen = config.axis_y2_axes.length;

		let padding = isValue(config.padding_top) ?
			config.padding_top : 0;

		if ($$.title && $$.title.node()) {
			padding += $$.getTitlePadding();
		}

		if (axesLen && config.axis_rotated) {
			padding += $$.getHorizontalAxisHeight("y2") * axesLen;
		}

		return padding;
	},

	getCurrentPaddingBottom() {
		const $$ = this;
		const config = $$.config;
		const axisId = config.axis_rotated ? "y" : "x";
		const axesLen = config[`axis_${axisId}_axes`].length;
		const padding = isValue(config.padding_bottom) ?
			config.padding_bottom : 0;

		return padding + (
			axesLen ? $$.getHorizontalAxisHeight(axisId) * axesLen : 0
		);
	},

	getCurrentPaddingLeft(withoutRecompute) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const axisId = isRotated ? "x" : "y";
		const axesLen = config[`axis_${axisId}_axes`].length;
		const axisWidth = $$.getAxisWidthByAxisId(axisId, withoutRecompute);
		let padding;

		if (isValue(config.padding_left)) {
			padding = config.padding_left;
		} else if (isRotated) {
			padding = !config.axis_x_show ?
				1 : Math.max(ceil10(axisWidth), 40);
		} else if (!config.axis_y_show || config.axis_y_inner) { // && !config.axis_rotated
			padding = $$.axis.getYAxisLabelPosition().isOuter ? 30 : 1;
		} else {
			padding = ceil10(axisWidth);
		}

		return padding + (axisWidth * axesLen);
	},

	getCurrentPaddingRight() {
		const $$ = this;
		const config = $$.config;
		const defaultPadding = 10;
		const legendWidthOnRight = $$.isLegendRight ? $$.getLegendWidth() + 20 : 0;
		const axesLen = config.axis_y2_axes.length;
		const axisWidth = $$.getAxisWidthByAxisId("y2");
		let padding;

		if (isValue(config.padding_right)) {
			padding = config.padding_right + 1; // 1 is needed not to hide tick line
		} else if (config.axis_rotated) {
			padding = defaultPadding + legendWidthOnRight;
		} else if (!config.axis_y2_show || config.axis_y2_inner) { // && !config.axis_rotated
			padding = 2 +
				legendWidthOnRight +
				($$.axis.getY2AxisLabelPosition().isOuter ? 20 : 0);
		} else {
			padding = ceil10(axisWidth) + legendWidthOnRight;
		}

		return padding + (axisWidth * axesLen);
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

		return h.indexOf("px") > 0 ? parseInt(h, 10) : 0;
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

	getHorizontalAxisHeight(id) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		let h = 30;

		if (id === "x" && !config.axis_x_show) {
			return 8;
		}

		if (id === "x" && config.axis_x_height) {
			return config.axis_x_height;
		}

		if (id === "y" && !config.axis_y_show) {
			return config.legend_show &&
				!$$.isLegendRight &&
				!$$.isLegendInset ? 10 : 1;
		}

		if (id === "y2" && !config.axis_y2_show) {
			return $$.rotated_padding_top;
		}

		// Calculate x/y axis height when tick rotated
		if ((id === "x" && !isRotated && config.axis_x_tick_rotate) ||
			(id === "y" && isRotated && config.axis_y_tick_rotate)) {
			h = 30 +
				$$.axis.getMaxTickWidth(id) *
				Math.cos(Math.PI * (90 - config[`axis_${id}_tick_rotate`]) / 180);
		}

		return h +
			($$.axis.getLabelPositionById(id).isInner ? 0 : 10) +
			(id === "y2" && !isRotated ? -10 : 0);
	},

	getEventRectWidth() {
		return Math.max(0, this.xAxis.tickInterval());
	}
});
