/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {document} from "../../module/browser";
import CLASS from "../../config/classes";
import {isValue, ceil10, capitalize} from "../../module/util";
import {AxisType} from "../../../types/types";

export default {
	/**
	 * Update container size
	 * @private
	 */
	setContainerSize(): void {
		const $$ = this;
		const {state} = $$;

		state.current.width = $$.getCurrentWidth();
		state.current.height = $$.getCurrentHeight();
	},

	getCurrentWidth(): number {
		const $$ = this;

		return $$.config.size_width || $$.getParentWidth();
	},

	getCurrentHeight(): number {
		const $$ = this;
		const {config} = $$;
		const h = config.size_height || $$.getParentHeight();

		return h > 0 ? h : 320 / ($$.hasType("gauge") && !config.gauge_fullCircle ? 2 : 1);
	},

	/**
	 * Get Axis size according its position
	 * @param {string} id Axis id value - x, y or y2
	 * @returns {number} size Axis size value
	 * @private
	 */
	getAxisSize(id: AxisType): number {
		const $$ = this;
		const isRotated = $$.config.axis_rotated;

		return (isRotated && id === "x") || (!isRotated && /y2?/.test(id)) ?
			$$.getAxisWidthByAxisId(id, true) :
			$$.getHorizontalAxisHeight(id);
	},

	getCurrentPaddingTop(): number {
		const $$ = this;
		const {config, $el} = $$;
		const axesLen = config.axis_y2_axes.length;

		let padding = isValue(config.padding_top) ?
			config.padding_top : 0;

		if ($el.title && $el.title.node()) {
			padding += $$.getTitlePadding();
		}

		if (axesLen && config.axis_rotated) {
			padding += $$.getHorizontalAxisHeight("y2") * axesLen;
		}

		return padding;
	},

	getCurrentPaddingBottom(): number {
		const $$ = this;
		const {config} = $$;
		const axisId = config.axis_rotated ? "y" : "x";
		const axesLen = config[`axis_${axisId}_axes`].length;
		const padding = isValue(config.padding_bottom) ?
			config.padding_bottom : 0;

		return padding + (
			axesLen ? $$.getHorizontalAxisHeight(axisId) * axesLen : 0
		);
	},

	getCurrentPaddingLeft(withoutRecompute?: boolean): number {
		const $$ = this;
		const {config, state: {hasAxis}} = $$;
		const isRotated = config.axis_rotated;
		const axisId = isRotated ? "x" : "y";
		const axesLen = config[`axis_${axisId}_axes`].length;
		const axisWidth = hasAxis ? $$.getAxisWidthByAxisId(axisId, withoutRecompute) : 0;
		let padding;

		if (isValue(config.padding_left)) {
			padding = config.padding_left;
		} else if (hasAxis && isRotated) {
			padding = !config.axis_x_show ?
				1 : Math.max(ceil10(axisWidth), 40);
		} else if (hasAxis && (!config.axis_y_show || config.axis_y_inner)) { // && !config.axis_rotated
			padding = $$.axis.getAxisLabelPosition("y").isOuter ? 30 : 1;
		} else {
			padding = ceil10(axisWidth);
		}

		return padding + (axisWidth * axesLen);
	},

	getCurrentPaddingRight(withoutTickTextOverflow = false): number {
		const $$ = this;
		const {config} = $$;
		const defaultPadding = 10;
		const legendWidthOnRight = $$.state.isLegendRight ? $$.getLegendWidth() + 20 : 0;
		const axesLen = config.axis_y2_axes.length;
		const axisWidth = $$.getAxisWidthByAxisId("y2");
		const xAxisTickTextOverflow = withoutTickTextOverflow ?
			0 : $$.axis.getXAxisTickTextY2Overflow(defaultPadding);
		let padding;

		if (isValue(config.padding_right)) {
			padding = config.padding_right + 1; // 1 is needed not to hide tick line
		} else if ($$.axis && config.axis_rotated) {
			padding = defaultPadding + legendWidthOnRight;
		} else if ($$.axis && (!config.axis_y2_show || config.axis_y2_inner)) { // && !config.axis_rotated
			padding = Math.max(
				2 + legendWidthOnRight + ($$.axis.getAxisLabelPosition("y2").isOuter ? 20 : 0),
				xAxisTickTextOverflow
			);
		} else {
			padding = Math.max(ceil10(axisWidth) + legendWidthOnRight, xAxisTickTextOverflow);
		}

		return padding + (axisWidth * axesLen);
	},

	/**
	 * Get the parent rect element's size
	 * @param {string} key property/attribute name
	 * @returns {number}
	 * @private
	 */
	getParentRectValue(key): number {
		const offsetName = `offset${capitalize(key)}`;
		let parent = this.$el.chart.node();
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

	getParentWidth(): number {
		return this.getParentRectValue("width");
	},

	getParentHeight(): number {
		const h = this.$el.chart.style("height");

		return h.indexOf("px") > 0 ? parseInt(h, 10) : 0;
	},

	getSvgLeft(withoutRecompute?: boolean): number {
		const $$ = this;
		const {config, $el} = $$;
		const hasLeftAxisRect = config.axis_rotated || (!config.axis_rotated && !config.axis_y_inner);
		const leftAxisClass = config.axis_rotated ? CLASS.axisX : CLASS.axisY;
		const leftAxis = $el.main.select(`.${leftAxisClass}`).node();
		const svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : {right: 0};
		const chartRect = $el.chart.node().getBoundingClientRect();
		const hasArc = $$.hasArcType();
		const svgLeft = svgRect.right - chartRect.left -
			(hasArc ? 0 : $$.getCurrentPaddingLeft(withoutRecompute));

		return svgLeft > 0 ? svgLeft : 0;
	},

	getAxisWidthByAxisId(id: AxisType, withoutRecompute?: boolean): number {
		const $$ = this;

		if ($$.axis) {
			const position = $$.axis && $$.axis.getLabelPositionById(id);

			return $$.axis.getMaxTickWidth(id, withoutRecompute) +
				(position.isInner ? 20 : 40);
		} else {
			return 40;
		}
	},

	getHorizontalAxisHeight(id: AxisType): number {
		const $$ = this;
		const {config, state} = $$;
		const {current, rotatedPadding, isLegendRight, isLegendInset} = state;
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
				!isLegendRight &&
				!isLegendInset ? 10 : 1;
		}

		if (id === "y2" && !config.axis_y2_show) {
			return rotatedPadding.top;
		}

		const rotate = $$.getAxisTickRotate(id);

		// Calculate x/y axis height when tick rotated
		if (
			((id === "x" && !isRotated) || (/y2?/.test(id) && isRotated)) && rotate
		) {
			h = 30 +
				$$.axis.getMaxTickWidth(id) *
				Math.cos(Math.PI * (90 - rotate) / 180);

			if (!config.axis_x_tick_multiline && current.height) {
				if (h > current.height / 2) {
					h = current.height / 2;
				}
			}
		}

		return h +
			($$.axis.getLabelPositionById(id).isInner ? 0 : 10) +
			(id === "y2" && !isRotated ? -10 : 0);
	},

	getEventRectWidth(): number {
		return Math.max(0, this.axis.x.tickInterval());
	},

	/**
	 * Get axis tick test rotate value
	 * @param {string} id Axis id
	 * @returns {number} rotate value
	 * @private
	 */
	getAxisTickRotate(id: AxisType): number {
		const $$ = this;
		const {axis, config, state, $el} = $$;
		let rotate = config[`axis_${id}_tick_rotate`];

		if (id === "x") {
			const isCategorized = axis.isCategorized();
			const isTimeSeries = axis.isTimeSeries();
			const allowedXAxisTypes = isCategorized || isTimeSeries;
			let tickCount = 0;

			if (config.axis_x_tick_fit && allowedXAxisTypes) {
				tickCount = state.current.maxTickWidths.x.ticks.length + (isTimeSeries ? -1 : 1);

				if (tickCount !== state.axis.x.tickCount) {
					state.axis.x.padding = $$.axis.getXAxisPadding(tickCount);
				}

				state.axis.x.tickCount = tickCount;
			}

			if ($el.svg &&
				config.axis_x_tick_fit &&
				!config.axis_x_tick_multiline &&
				!config.axis_x_tick_culling &&
				config.axis_x_tick_autorotate &&
				allowedXAxisTypes
			) {
				rotate = $$.needToRotateXAxisTickTexts() ?
					config.axis_x_tick_rotate : 0;
			}
		}

		return rotate;
	},

	/**
	 * Check weather axis tick text needs to be rotated
	 * @returns {boolean}
	 * @private
	 */
	needToRotateXAxisTickTexts(): boolean {
		const $$ = this;
		const {state: {axis, current}} = $$;
		const xAxisLength = current.width -
			$$.getCurrentPaddingLeft(false) - $$.getCurrentPaddingRight(true);
		const tickCountWithPadding = axis.x.tickCount +
			axis.x.padding.left + axis.x.padding.right;

		const maxTickWidth = $$.axis.getMaxTickWidth("x");
		const tickLength = (xAxisLength / tickCountWithPadding) || 0;

		return maxTickWidth > tickLength;
	},

	updateDimension(withoutAxis?: boolean): void {
		const $$ = this;
		const {config, state: {hasAxis}, $el} = $$;

		if (hasAxis && !withoutAxis) {
			if ($$.axis.x && config.axis_rotated) {
				$$.axis.x.create($el.axis.x);
				$$.axis.subX && $$.axis.subX.create($el.axis.subX);
			} else {
				$$.axis.y && $$.axis.y.create($el.axis.y);
				$$.axis.y2 && $$.axis.y2.create($el.axis.y2);
			}
		}

		// pass 'withoutAxis' param to not animate at the init rendering
		$$.updateScales(withoutAxis);
		$$.updateSvgSize();
		$$.transformAll(false);
	},

	updateSvgSize(): void {
		const $$ = this;
		const {state, $el: {svg}} = $$;

		svg
			.attr("width", state.current.width)
			.attr("height", state.current.height);

		if (state.hasAxis) {
			const brush = svg.select(`.${CLASS.brush} .overlay`);
			const brushSize = {width: 0, height: 0};

			if (brush.size()) {
				brushSize.width = +brush.attr("width");
				brushSize.height = +brush.attr("height");
			}

			svg.selectAll([`#${state.clip.id}`, `#${state.clip.idGrid}`])
				.select("rect")
				.attr("width", state.width)
				.attr("height", state.height);

			svg.select(`#${state.clip.idXAxis}`)
				.select("rect")
				.attr("x", $$.getXAxisClipX.bind($$))
				.attr("y", $$.getXAxisClipY.bind($$))
				.attr("width", $$.getXAxisClipWidth.bind($$))
				.attr("height", $$.getXAxisClipHeight.bind($$));

			svg.select(`#${state.clip.idYAxis}`)
				.select("rect")
				.attr("x", $$.getYAxisClipX.bind($$))
				.attr("y", $$.getYAxisClipY.bind($$))
				.attr("width", $$.getYAxisClipWidth.bind($$))
				.attr("height", $$.getYAxisClipHeight.bind($$));

			state.clip.idSubchart && svg.select(`#${state.clip.idSubchart}`)
				.select("rect")
				.attr("width", state.width)
				.attr("height", brushSize.height);

			svg.select(`.${CLASS.zoomRect}`)
				.attr("width", state.width)
				.attr("height", state.height);
		}
	},

	/**
	 * Update size values
	 * @param {boolean} isInit If is called at initialization
	 * @private
	 */
	updateSizes(isInit?: boolean): void {
		const $$ = this;
		const {config, state, $el: {legend}} = $$;
		const isRotated = config.axis_rotated;
		const hasArc = $$.hasArcType();

		!isInit && $$.setContainerSize();

		const currLegend = {
			width: legend ? $$.getLegendWidth() : 0,
			height: legend ? $$.getLegendHeight() : 0
		};

		const legendHeightForBottom = state.isLegendRight || state.isLegendInset ? 0 : currLegend.height;
		const xAxisHeight = isRotated || hasArc ? 0 : $$.getHorizontalAxisHeight("x");

		const subchartXAxisHeight = config.subchart_axis_x_show && config.subchart_axis_x_tick_text_show ?
			xAxisHeight : 30;
		const subchartHeight = config.subchart_show && !hasArc ?
			(config.subchart_size_height + subchartXAxisHeight) : 0;

		// for main
		state.margin = isRotated ? {
			top: $$.getHorizontalAxisHeight("y2") + $$.getCurrentPaddingTop(),
			right: hasArc ? 0 : $$.getCurrentPaddingRight(),
			bottom: $$.getHorizontalAxisHeight("y") + legendHeightForBottom + $$.getCurrentPaddingBottom(),
			left: subchartHeight + (hasArc ? 0 : $$.getCurrentPaddingLeft())
		} : {
			top: 4 + $$.getCurrentPaddingTop(), // for top tick text
			right: hasArc ? 0 : $$.getCurrentPaddingRight(),
			bottom: xAxisHeight + subchartHeight + legendHeightForBottom + $$.getCurrentPaddingBottom(),
			left: hasArc ? 0 : $$.getCurrentPaddingLeft()
		};

		// for subchart
		state.margin2 = isRotated ? {
			top: state.margin.top,
			right: NaN,
			bottom: 20 + legendHeightForBottom,
			left: $$.state.rotatedPadding.left
		} : {
			top: state.current.height - subchartHeight - legendHeightForBottom,
			right: NaN,
			bottom: subchartXAxisHeight + legendHeightForBottom,
			left: state.margin.left
		};

		// for legend
		state.margin3 = {
			top: 0,
			right: NaN,
			bottom: 0,
			left: 0
		};

		$$.updateSizeForLegend && $$.updateSizeForLegend(currLegend);

		state.width = state.current.width - state.margin.left - state.margin.right;
		state.height = state.current.height - state.margin.top - state.margin.bottom;

		if (state.width < 0) {
			state.width = 0;
		}

		if (state.height < 0) {
			state.height = 0;
		}

		state.width2 = isRotated ?
			state.margin.left - state.rotatedPadding.left - state.rotatedPadding.right : state.width;

		state.height2 = isRotated ?
			state.height : state.current.height - state.margin2.top - state.margin2.bottom;

		if (state.width2 < 0) {
			state.width2 = 0;
		}

		if (state.height2 < 0) {
			state.height2 = 0;
		}

		// for arc
		state.arcWidth = state.width - (state.isLegendRight ? currLegend.width + 10 : 0);
		state.arcHeight = state.height - (state.isLegendRight ? 0 : 10);

		if ($$.hasType("gauge") && !config.gauge_fullCircle) {
			state.arcHeight += state.height - $$.getGaugeLabelHeight();
		}

		$$.updateRadius && $$.updateRadius();

		if (state.isLegendRight && hasArc) {
			state.margin3.left = state.arcWidth / 2 + state.radiusExpanded * 1.1;
		}

		if (!hasArc && config.axis_x_show &&
			config.axis_x_tick_culling && config.axis_x_tick_autorotate) {
			$$.updateXAxisTickClip();
		}
	}
};
