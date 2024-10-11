/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$AXIS, $SUBCHART} from "../../config/classes";
import {document} from "../../module/browser";
import {KEY} from "../../module/Cache";
import {capitalize, ceil10, isEmpty, isNumber, isString, isUndefined} from "../../module/util";

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
			} catch {
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
			height = /px$/.test(h) ? parseInt(h, 10) : this.getParentRectValue("height");
		}

		return height;
	},

	getSvgLeft(withoutRecompute?: boolean): number {
		const $$ = this;
		const {config, state: {hasAxis}, $el} = $$;
		const isRotated = config.axis_rotated;
		const hasLeftAxisRect = isRotated || (!isRotated && !config.axis_y_inner);
		const leftAxisClass = isRotated ? $AXIS.axisX : $AXIS.axisY;
		const leftAxis = $el.main.select(`.${leftAxisClass}`).node();
		const leftLabel = hasAxis && config[`axis_${isRotated ? "x" : "y"}_label`];
		let labelWidth = 0;

		// if axis label position set to inner, exclude from the value
		if (
			hasAxis && (
				isString(leftLabel) || isString(leftLabel.text) ||
				/^inner-/.test(leftLabel?.position)
			)
		) {
			const label = $el.main.select(`.${leftAxisClass}-label`);

			if (!label.empty()) {
				labelWidth = label.node().getBoundingClientRect().left;
			}
		}

		const svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : {right: 0};
		const chartRectLeft = $el.chart.node().getBoundingClientRect().left + labelWidth;
		const hasArc = $$.hasArcType();
		const svgLeft = svgRect.right - chartRectLeft -
			(hasArc ? 0 : $$.getCurrentPaddingByDirection("left", withoutRecompute));

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
		const {config, state: {clip, current, hasAxis, width, height}, $el: {svg}} = $$;

		if (config.resize_auto === "viewBox") {
			svg
				.attr("viewBox", `0 0 ${current.width} ${current.height}`);
		} else {
			svg
				.attr("width", current.width)
				.attr("height", current.height);
		}

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

	/**
	 * Get padding by the direction.
	 * @param {string} type "top" | "bottom" | "left" | "right"
	 * @param {boolean} [withoutRecompute=false] If set true, do not recompute the padding value.
	 * @param {boolean} [withXAxisTickTextOverflow=false] If set true, calculate x axis tick text overflow.
	 * @returns {number} padding value
	 * @private
	 */
	getCurrentPaddingByDirection(type: "top" | "bottom" | "left" | "right",
		withoutRecompute = false, withXAxisTickTextOverflow = false): number {
		const $$ = this;
		const {config, $el, state: {hasAxis}} = $$;
		const isRotated = config.axis_rotated;
		const isFitPadding = config.padding?.mode === "fit";
		const paddingOption = isNumber(config[`padding_${type}`]) ?
			config[`padding_${type}`] :
			undefined;
		const axisId = hasAxis ?
			{
				top: isRotated ? "y2" : null,
				bottom: isRotated ? "y" : "x",
				left: isRotated ? "x" : "y",
				right: isRotated ? null : "y2"
			}[type] :
			null;

		const isLeftRight = /^(left|right)$/.test(type);
		const isAxisInner = axisId && config[`axis_${axisId}_inner`];
		const isAxisShow = axisId && config[`axis_${axisId}_show`];
		const axesLen = axisId ? config[`axis_${axisId}_axes`].length : 0;

		let axisSize = axisId ?
			(
				isLeftRight ?
					$$.getAxisWidthByAxisId(axisId, withoutRecompute) :
					$$.getHorizontalAxisHeight(axisId)
			) :
			0;
		const defaultPadding = 20;
		let gap = 0;

		if (!isFitPadding && isLeftRight) {
			axisSize = ceil10(axisSize);
		}

		let padding = hasAxis && isLeftRight && (
				isAxisInner || (isUndefined(paddingOption) && !isAxisShow)
			) ?
			0 :
			(
				isFitPadding ? (isAxisShow ? axisSize : 0) + (paddingOption ?? 0) : (
					isUndefined(paddingOption) ? axisSize : paddingOption
				)
			);

		if (isLeftRight && hasAxis) {
			if (axisId && (isFitPadding || isAxisInner) && config[`axis_${axisId}_label`].text) {
				padding += $$.axis.getAxisLabelPosition(axisId).isOuter ? defaultPadding : 0;
			}

			if (type === "right") {
				padding += isRotated ?
					(
						!isFitPadding && isUndefined(paddingOption) ? 10 : 2
					) :
					!isAxisShow || isAxisInner ?
					(isFitPadding ? 2 : 1) :
					0;

				padding += withXAxisTickTextOverflow ?
					$$.axis.getXAxisTickTextY2Overflow(defaultPadding) :
					0;
			} else if (type === "left" && isRotated && isUndefined(paddingOption)) {
				padding = !config.axis_x_show ?
					1 :
					(isFitPadding ? axisSize : Math.max(axisSize, 40));
			}
		} else {
			if (type === "top") {
				if ($el.title && $el.title.node()) {
					padding += $$.getTitlePadding();
				}

				gap = isRotated && !isAxisInner ? axesLen : 0;
			} else if (type === "bottom" && hasAxis && isRotated && !isAxisShow) {
				padding += 1;
			}
		}
		// console.log(type, padding + (axisSize * axesLen) - gap)
		return padding + (axisSize * axesLen) - gap;
	},

	getCurrentPadding(
		withXAxisTickTextOverflow = false
	): {top: number, bottom: number, left: number, right: number} {
		const $$ = this;
		const [top, bottom, left, right] = ["top", "bottom", "left", "right"]
			.map(v => $$.getCurrentPaddingByDirection(v, null, withXAxisTickTextOverflow));

		return {top, bottom, left, right};
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
					) ?
					v[key] :
					0;
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
		const isNonAxis = $$.hasArcType() || state.hasFunnel || state.hasTreemap;
		const isFitPadding = config.padding?.mode === "fit";

		!isInit && $$.setContainerSize();

		const currLegend = {
			width: legend ? $$.getLegendWidth() : 0,
			height: legend ? $$.getLegendHeight() : 0
		};

		if (!isNonAxis && config.axis_x_show && config.axis_x_tick_autorotate) {
			$$.updateXAxisTickClip();
		}

		const legendSize = {
			right: config.legend_show && state.isLegendRight ?
				$$.getLegendWidth() + (isFitPadding ? 0 : 20) :
				0,
			bottom: !config.legend_show || state.isLegendRight || state.isLegendInset ?
				0 :
				currLegend.height
		};

		const xAxisHeight = isRotated || isNonAxis ? 0 : $$.getHorizontalAxisHeight("x");

		const subchartXAxisHeight =
			config.subchart_axis_x_show && config.subchart_axis_x_tick_text_show ? xAxisHeight : 30;
		const subchartHeight = config.subchart_show && !isNonAxis ?
			(config.subchart_size_height + subchartXAxisHeight) :
			0;

		// when needle is shown with legend, it need some bottom space to not overlap with legend text
		const gaugeHeight = $$.hasType("gauge") && config.arc_needle_show &&
				!config.gauge_fullCircle && !config.gauge_label_show ?
			10 :
			0;

		const padding = $$.getCurrentPadding(true);

		// for main
		state.margin = !isNonAxis && isRotated ?
			{
				top: padding.top,
				right: isNonAxis ? 0 : padding.right + legendSize.right,
				bottom: legendSize.bottom + padding.bottom,
				left: subchartHeight + (isNonAxis ? 0 : padding.left)
			} :
			{
				top: (isFitPadding ? 0 : 4) + padding.top, // for top tick text
				right: isNonAxis ? 0 : padding.right + legendSize.right,
				bottom: gaugeHeight + subchartHeight + legendSize.bottom + padding.bottom,
				left: isNonAxis ? 0 : padding.left
			};

		state.margin = $$.getResettedPadding(state.margin);

		// for subchart
		state.margin2 = isRotated ?
			{
				top: state.margin.top,
				right: NaN,
				bottom: 20 + legendSize.bottom,
				left: $$.state.rotatedPadding.left
			} :
			{
				top: state.current.height - subchartHeight - legendSize.bottom,
				right: NaN,
				bottom: subchartXAxisHeight + legendSize.bottom,
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
			state.margin.left - state.rotatedPadding.left - state.rotatedPadding.right :
			state.width;

		state.height2 = isRotated ?
			state.height :
			state.current.height - state.margin2.top - state.margin2.bottom;

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
			const textWidth = (state.hasRadar && $$.cache.get(KEY.radarTextWidth)) ?? 0;

			state.arcWidth = state.width - (isLegendRight ? currLegend.width + 10 : 0) - textWidth;
			state.arcHeight = state.height - (isLegendRight && !hasGauge ? 0 : 10);

			if (config.arc_rangeText_values?.length) {
				if (hasGauge) {
					state.arcWidth -= 25;
					state.arcHeight -= 10;
					state.margin.left += 10;
				} else {
					state.arcHeight -= 20;
					state.margin.top += 10;
				}
			}

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
