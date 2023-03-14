/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {document} from "../../module/browser";
import {$AXIS, $SUBCHART} from "../../config/classes";
import {isValue, ceil10, capitalize, isNumber, isEmpty} from "../../module/util";

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

	getCurrentPaddingTop(): number {
		const $$ = this;
		const {config, state: {hasAxis}, $el} = $$;
		const axesLen = hasAxis ? config.axis_y2_axes.length : 0;

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
		const {config, state: {hasAxis}} = $$;
		const axisId = config.axis_rotated ? "y" : "x";
		const axesLen = hasAxis ? config[`axis_${axisId}_axes`].length : 0;
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
		const isFitPadding = config.padding?.mode === "fit";
		const axisId = isRotated ? "x" : "y";
		const axesLen = hasAxis ? config[`axis_${axisId}_axes`].length : 0;
		let axisWidth = hasAxis ? $$.getAxisWidthByAxisId(axisId, withoutRecompute) : 0;

		if (!isFitPadding) {
			axisWidth = ceil10(axisWidth);
		}

		let padding = config[`axis_${axisId}_inner`] || !config[`axis_${axisId}_show`] ? 0 : axisWidth;

		if (isValue(config.padding_left)) {
			padding = config.padding_left + (isFitPadding && isRotated ? axisWidth : 0);
		} else if (hasAxis && isRotated) {
			padding = !config.axis_x_show ?
				1 : (isFitPadding ? axisWidth : Math.max(axisWidth, 40));
		}

		if (hasAxis && (isFitPadding || config[`axis_${axisId}_inner`]) && config[`axis_${axisId}_label`].text) {
			padding += $$.axis.getAxisLabelPosition("y").isOuter ? 20 : 0;
		}

		return padding + (axisWidth * axesLen);
	},

	getCurrentPaddingRight(withXAxisTickTextOverflow = false): number {
		const $$ = this;
		const {config, state: {hasAxis}} = $$;
		const isRotated = config.axis_rotated;
		const isFitPadding = config.padding?.mode === "fit";
		const defaultPadding = isFitPadding ? 2 : 10;
		const legendWidthOnRight = $$.state.isLegendRight ? $$.getLegendWidth() + 20 : 0;
		const axesLen = hasAxis ? config.axis_y2_axes.length : 0;
		const axisLabelWidth = $$.axis?.getAxisLabelPosition("y2").isOuter ? 20 : 0;
		const xAxisTickTextOverflow = withXAxisTickTextOverflow ?
			$$.axis.getXAxisTickTextY2Overflow(defaultPadding) : 0;
		let axisWidth = hasAxis && !config.axis_y2_inner ? $$.getAxisWidthByAxisId("y2") : 1;

		if (!isFitPadding) {
			axisWidth = ceil10(axisWidth);
		}

		let padding = isRotated ? 0 : Math.max(axisWidth + legendWidthOnRight, xAxisTickTextOverflow);

		if (isValue(config.padding_right)) {
			// padding = config.padding_right + (hasAxis ? 1 : 0); // 1 is needed not to hide tick line

			padding = config.padding_right +
				(isFitPadding && (isRotated || !config.axis_y2_show ? defaultPadding : padding)) +
				(hasAxis && !isFitPadding ? 1 : 0); // 1 is needed not to hide tick line
		} else if ($$.axis && isRotated) {
			padding = defaultPadding + legendWidthOnRight;
		} else if ($$.axis && (!config.axis_y2_show || config.axis_y2_inner)) {
			padding = Math.max(
				(isFitPadding && !config.axis_y2_show ? 2 : 1) + legendWidthOnRight + axisLabelWidth,
				xAxisTickTextOverflow
			);
		}

		if (hasAxis && !isRotated && isFitPadding &&
			config.axis_y2_show && !config.axis_y2_inner && config.axis_y2_label.text
		) {
			padding += axisLabelWidth;
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
		let v = 0;

		while (v < 30 && parent && parent.tagName !== "BODY") {
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

		// Sometimes element's dimension value is incorrect(ex. flex container)
		// In this case, use body's offset instead.
		const bodySize = document.body[offsetName];

		v > bodySize && (v = bodySize);

		return v;
	},

	getParentWidth(): number {
		return this.getParentRectValue("width");
	},

	getParentHeight(): number {
		const h: string = this.$el.chart.style("height");
		let height = 0;

		if (h) {
			height = /px$/.test(h) ?
				parseInt(h, 10) :
				this.getParentRectValue("height");
		}

		return height;
	},

	getSvgLeft(withoutRecompute?: boolean): number {
		const $$ = this;
		const {config, $el} = $$;
		const hasLeftAxisRect = config.axis_rotated || (!config.axis_rotated && !config.axis_y_inner);
		const leftAxisClass = config.axis_rotated ? $AXIS.axisX : $AXIS.axisY;
		const leftAxis = $el.main.select(`.${leftAxisClass}`).node();
		const svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : {right: 0};
		const chartRect = $el.chart.node().getBoundingClientRect();
		const hasArc = $$.hasArcType();
		const svgLeft = svgRect.right - chartRect.left -
			(hasArc ? 0 : $$.getCurrentPaddingLeft(withoutRecompute));

		return svgLeft > 0 ? svgLeft : 0;
	},

	updateDimension(withoutAxis?: boolean): void {
		const $$ = this;
		const {config, state: {hasAxis}, $el} = $$;

		if (hasAxis && !withoutAxis && $$.axis.x && config.axis_rotated) {
			$$.axis.subX?.create($el.axis.subX);
		}

		// pass 'withoutAxis' param to not animate at the init rendering
		$$.updateScales(withoutAxis);
		$$.updateSvgSize();
		$$.transformAll(false);
	},

	updateSvgSize(): void {
		const $$ = this;
		const {state: {clip, current, hasAxis, width, height}, $el: {svg}} = $$;

		svg
			.attr("width", current.width)
			.attr("height", current.height);

		if (hasAxis) {
			const brush = svg.select(`.${$SUBCHART.brush} .overlay`);
			const brushSize = {width: 0, height: 0};

			if (brush.size()) {
				brushSize.width = +brush.attr("width");
				brushSize.height = +brush.attr("height");
			}

			svg.selectAll([`#${clip.id}`, `#${clip.idGrid}`])
				.select("rect")
				.attr("width", width)
				.attr("height", height);

			svg.select(`#${clip.idXAxis}`)
				.select("rect")
				.call($$.setXAxisClipPath.bind($$));

			svg.select(`#${clip.idYAxis}`)
				.select("rect")
				.call($$.setYAxisClipPath.bind($$));

			clip.idSubchart && svg.select(`#${clip.idSubchart}`)
				.select("rect")
				.attr("width", width)
				.attr("height", brushSize.height);
		}
	},

	getCurrentPadding(): {top: number, bottom: number, left: number, right: number} {
		const $$ = this;

		return {
			top: $$.getCurrentPaddingTop(),
			bottom: $$.getCurrentPaddingBottom(),
			left: $$.getCurrentPaddingLeft(),
			right: $$.getCurrentPaddingRight()
		};
	},

	/**
	 * Get resetted padding values when 'padding=false' option is set
	 * https://github.com/naver/billboard.js/issues/2367
	 * @param {number|object} v Padding values to be resetted
	 * @returns {number|object} Padding value
	 * @private
	 */
	getResettedPadding<T = number | {[key: string]: string}>(v: T): T {
		const $$ = this;
		const {config} = $$;
		const isNum = isNumber(v);
		let p: any = isNum ? 0 : {};

		if (config.padding === false) {
			!isNum && Object.keys(v as object).forEach(key => {
				// when data.lables=true, do not reset top padding
				p[key] = (
					!isEmpty(config.data_labels) &&
					config.data_labels !== false &&
					key === "top"
				) ? v[key] : 0;
			});
		} else {
			p = v;
		}

		return p as T;
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
		const isNonAxis = $$.hasArcType() || state.hasTreemap;
		const isFitPadding = config.padding?.mode === "fit";

		!isInit && $$.setContainerSize();

		const currLegend = {
			width: legend ? $$.getLegendWidth() : 0,
			height: legend ? $$.getLegendHeight() : 0
		};

		if (!isNonAxis && config.axis_x_show && config.axis_x_tick_autorotate) {
			$$.updateXAxisTickClip();
		}

		const legendHeightForBottom = state.isLegendRight || state.isLegendInset ? 0 : currLegend.height;
		const xAxisHeight = isRotated || isNonAxis ? 0 : $$.getHorizontalAxisHeight("x");

		const subchartXAxisHeight = config.subchart_axis_x_show && config.subchart_axis_x_tick_text_show ?
			xAxisHeight : 30;
		const subchartHeight = config.subchart_show && !isNonAxis ?
			(config.subchart_size_height + subchartXAxisHeight) : 0;

		const padding = $$.getCurrentPadding();

		// for main
		state.margin = !isNonAxis && isRotated ? {
			top: $$.getHorizontalAxisHeight("y2") + padding.top,
			right: isNonAxis ? 0 : $$.getCurrentPaddingRight(true),
			bottom: $$.getHorizontalAxisHeight("y") + legendHeightForBottom + padding.bottom,
			left: subchartHeight + (isNonAxis ? 0 : padding.left)
		} : {
			top: (isFitPadding ? 0 : 4) + padding.top, // for top tick text
			right: isNonAxis ? 0 : $$.getCurrentPaddingRight(true),
			bottom: xAxisHeight + subchartHeight + legendHeightForBottom + padding.bottom,
			left: isNonAxis ? 0 : padding.left
		};

		state.margin = $$.getResettedPadding(state.margin);

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

		$$.updateSizeForLegend?.(currLegend);

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
		if ($$.hasArcType()) {
			const hasGauge = $$.hasType("gauge");
			const isLegendRight = config.legend_show && state.isLegendRight;

			state.arcWidth = state.width - (isLegendRight ? currLegend.width + 10 : 0);
			state.arcHeight = state.height - (isLegendRight && !hasGauge ? 0 : 10);

			if (hasGauge && !config.gauge_fullCircle) {
				state.arcHeight += state.height - $$.getPaddingBottomForGauge();
			}

			$$.updateRadius?.();
		}

		if (state.isLegendRight && isNonAxis) {
			state.margin3.left = state.arcWidth / 2 + state.radiusExpanded * 1.1;
		}
	}
};
