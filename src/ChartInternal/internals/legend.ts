/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	namespaces as d3Namespaces
} from "d3-selection";
import {document} from "../../module/browser";
import {$FOCUS, $GAUGE, $LEGEND} from "../../config/classes";
import {KEY} from "../../module/Cache";
import {callFn, isDefined, getOption, isEmpty, isFunction, notEmpty, tplProcess} from "../../module/util";

export default {
	/**
	 * Initialize the legend.
	 * @private
	 */
	initLegend(): void {
		const $$ = this;
		const {config, $el} = $$;

		$$.legendItemTextBox = {};
		$$.state.legendHasRendered = false;

		if (config.legend_show) {
			if (!config.legend_contents_bindto) {
				$el.legend = $$.$el.svg.append("g")
					.classed($LEGEND.legend, true)
					.attr("transform", $$.getTranslate("legend"));
			}

			// MEMO: call here to update legend box and translate for all
			// MEMO: translate will be updated by this, so transform not needed in updateLegend()
			$$.updateLegend();
		} else {
			$$.state.hiddenLegendIds = $$.mapToIds($$.data.targets);
		}
	},

	/**
	 * Update legend element
	 * @param {Array} targetIds ID's of target
	 * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
	 * @param {object} transitions Return value of the generateTransitions
	 * @private
	 */
	updateLegend(targetIds, options, transitions): void {
		const $$ = this;
		const {config, state, scale, $el} = $$;
		const optionz = options || {
			withTransform: false,
			withTransitionForTransform: false,
			withTransition: false
		};

		optionz.withTransition = getOption(optionz, "withTransition", true);
		optionz.withTransitionForTransform = getOption(optionz, "withTransitionForTransform", true);

		if (config.legend_contents_bindto && config.legend_contents_template) {
			$$.updateLegendTemplate();
		} else {
			$$.updateLegendElement(
				targetIds || $$.mapToIds($$.data.targets),
				optionz,
				transitions
			);
		}

		// toggle legend state
		$el.legend.selectAll(`.${$LEGEND.legendItem}`)
			.classed($LEGEND.legendItemHidden, function(id) {
				const hide = !$$.isTargetToShow(id);

				if (hide) {
					this.style.opacity = null;
				}

				return hide;
			});

		// Update size and scale
		$$.updateScales(false, !scale.zoom);
		$$.updateSvgSize();

		// Update g positions
		$$.transformAll(optionz.withTransitionForTransform, transitions);

		state.legendHasRendered = true;
	},

	/**
	 * Update legend using template option
	 * @private
	 */
	updateLegendTemplate(): void {
		const $$ = this;
		const {config, $el} = $$;
		const wrapper = d3Select(config.legend_contents_bindto);
		const template = config.legend_contents_template;

		if (!wrapper.empty()) {
			const targets = $$.mapToIds($$.data.targets);
			const ids: any[] = [];
			let html = "";

			targets.forEach(v => {
				const content = isFunction(template) ?
					template.bind($$.api)(v, $$.color(v), $$.api.data(v)[0].values) :
					tplProcess(template, {
						COLOR: $$.color(v),
						TITLE: v
					});

				if (content) {
					ids.push(v);
					html += content;
				}
			});

			const legendItem = wrapper.html(html)
				.selectAll(function() { return this.childNodes; })
				.data(ids);

			$$.setLegendItem(legendItem);

			$el.legend = wrapper;
		}
	},

	/**
	 * Update the size of the legend.
	 * @param {Obejct} size Size object
	 * @private
	 */
	updateSizeForLegend(size): void {
		const $$ = this;
		const {config, state: {
			isLegendTop, isLegendLeft, isLegendRight, isLegendInset, current
		}} = $$;
		const {width, height} = size;

		const insetLegendPosition = {
			top: isLegendTop ?
				$$.getCurrentPaddingTop() + config.legend_inset_y + 5.5 :
				current.height - height - $$.getCurrentPaddingBottom() - config.legend_inset_y,
			left: isLegendLeft ?
				$$.getCurrentPaddingLeft() + config.legend_inset_x + 0.5 :
				current.width - width - $$.getCurrentPaddingRight() - config.legend_inset_x + 0.5
		};

		$$.state.margin3 = {
			top: isLegendRight ?
				0 : isLegendInset ? insetLegendPosition.top : current.height - height,
			right: NaN,
			bottom: 0,
			left: isLegendRight ?
				current.width - width : isLegendInset ? insetLegendPosition.left : 0
		};
	},

	/**
	 * Transform Legend
	 * @param {boolean} withTransition whether or not to transition.
	 * @private
	 */
	transformLegend(withTransition): void {
		const $$ = this;
		const {$el: {legend}, $T} = $$;

		$T(legend, withTransition)
			.attr("transform", $$.getTranslate("legend"));
	},

	/**
	 * Update the legend step
	 * @param {number} step Step value
	 * @private
	 */
	updateLegendStep(step: number): void {
		this.state.legendStep = step;
	},

	/**
	 * Update legend item width
	 * @param {number} width Width value
	 * @private
	 */
	updateLegendItemWidth(width: number): void {
		this.state.legendItemWidth = width;
	},

	/**
	 * Update legend item height
	 * @param {number} height Height value
	 * @private
	 */
	updateLegendItemHeight(height): void {
		this.state.legendItemHeight = height;
	},

	/**
	 * Update legend item color
	 * @param {string} id Corresponding data ID value
	 * @param {string} color Color value
	 * @private
	 */
	updateLegendItemColor(id: string, color: string): void {
		const {legend} = this.$el;

		if (legend) {
			legend.select(`.${$LEGEND.legendItem}-${id} line`)
				.style("stroke", color);
		}
	},

	/**
	 * Get the width of the legend
	 * @returns {number} width
	 * @private
	 */
	getLegendWidth(): number {
		const $$ = this;
		const {current: {width}, isLegendRight, isLegendInset, legendItemWidth, legendStep} = $$.state;

		return $$.config.legend_show ? (
			isLegendRight || isLegendInset ?
				legendItemWidth * (legendStep + 1) : width
		) : 0;
	},

	/**
	 * Get the height of the legend
	 * @returns {number} height
	 * @private
	 */
	getLegendHeight(): number {
		const $$ = this;
		const {current, isLegendRight, legendItemHeight, legendStep} = $$.state;

		return $$.config.legend_show ? (
			isLegendRight ?
				current.height : Math.max(20, legendItemHeight) * (legendStep + 1)
		) : 0;
	},

	/**
	 * Get the opacity of the legend that is unfocused
	 * @param {d3.selection} legendItem Legend item node
	 * @returns {string|null} opacity
	 * @private
	 */
	opacityForUnfocusedLegend(legendItem): string | null {
		return legendItem.classed($LEGEND.legendItemHidden) ? null : "0.3";
	},

	/**
	 * Toggles the focus of the legend
	 * @param {Array} targetIds ID's of target
	 * @param {boolean} focus whether or not to focus.
	 * @private
	 */
	toggleFocusLegend(targetIds: string[], focus: boolean): void {
		const $$ = this;
		const {$el: {legend}, $T} = $$;
		const targetIdz = $$.mapToTargetIds(targetIds);

		legend && $T(legend.selectAll(`.${$LEGEND.legendItem}`)
			.filter(id => targetIdz.indexOf(id) >= 0)
			.classed($FOCUS.legendItemFocused, focus))
			.style("opacity", function() {
				return focus ? null :
					$$.opacityForUnfocusedLegend.call($$, d3Select(this));
			});
	},

	/**
	 * Revert the legend to its default state
	 * @private
	 */
	revertLegend(): void {
		const $$ = this;
		const {$el: {legend}, $T} = $$;

		legend && $T(legend.selectAll(`.${$LEGEND.legendItem}`)
			.classed($FOCUS.legendItemFocused, false))
			.style("opacity", null);
	},

	/**
	 * Shows the legend
	 * @param {Array} targetIds ID's of target
	 * @private
	 */
	showLegend(targetIds: string[]): void {
		const $$ = this;
		const {config, $el, $T} = $$;

		if (!config.legend_show) {
			config.legend_show = true;

			$el.legend ?
				$el.legend.style("visibility", null) :
				$$.initLegend();

			!$$.state.legendHasRendered && $$.updateLegend();
		}

		$$.removeHiddenLegendIds(targetIds);

		$T(
			$el.legend.selectAll($$.selectorLegends(targetIds))
				.style("visibility", null)
		).style("opacity", null);
	},

	/**
	 * Hide the legend
	 * @param {Array} targetIds ID's of target
	 * @private
	 */
	hideLegend(targetIds: string[]): void {
		const $$ = this;
		const {config, $el: {legend}} = $$;

		if (config.legend_show && isEmpty(targetIds)) {
			config.legend_show = false;
			legend.style("visibility", "hidden");
		}

		$$.addHiddenLegendIds(targetIds);
		legend.selectAll($$.selectorLegends(targetIds))
			.style("opacity", "0")
			.style("visibility", "hidden");
	},

	/**
	 * Get legend item textbox dimension
	 * @param {string} id Data ID
	 * @param {HTMLElement|d3.selection} textElement Text node element
	 * @returns {object} Bounding rect
	 * @private
	 */
	getLegendItemTextBox(id?: string, textElement?) {
		const $$ = this;
		const {cache, state} = $$;
		let data;

		// do not prefix w/'$', to not be resetted cache in .load() call
		const cacheKey = KEY.legendItemTextBox;

		if (id) {
			data = (!state.redrawing && cache.get(cacheKey)) || {};

			if (!data[id]) {
				data[id] = $$.getTextRect(textElement, $LEGEND.legendItem);
				cache.add(cacheKey, data);
			}

			data = data[id];
		}

		return data;
	},

	/**
	 * Set legend item style & bind events
	 * @param {d3.selection} item Item node
	 * @private
	 */
	setLegendItem(item): void {
		const $$ = this;
		const {api, config, state} = $$;
		const isTouch = state.inputType === "touch";
		const hasGauge = $$.hasType("gauge");

		item
			.attr("class", function(id) {
				const node = d3Select(this);
				const itemClass = (!node.empty() && node.attr("class")) || "";

				return itemClass + $$.generateClass($LEGEND.legendItem, id);
			})
			.style("visibility", id => ($$.isLegendToShow(id) ? null : "hidden"));

		if (config.interaction_enabled) {
			item
				.style("cursor", "pointer")
				.on("click", function(event, id) {
					if (!callFn(config.legend_item_onclick, api, id)) {
						if (event.altKey) {
							api.hide();
							api.show(id);
						} else {
							api.toggle(id);

							d3Select(this)
								.classed($FOCUS.legendItemFocused, false);
						}
					}

					isTouch && $$.hideTooltip();
				});

			!isTouch && item
				.on("mouseout", function(event, id) {
					if (!callFn(config.legend_item_onout, api, id)) {
						d3Select(this).classed($FOCUS.legendItemFocused, false);

						if (hasGauge) {
							$$.undoMarkOverlapped($$, `.${$GAUGE.gaugeValue}`);
						}

						$$.api.revert();
					}
				})
				.on("mouseover", function(event, id) {
					if (!callFn(config.legend_item_onover, api, id)) {
						d3Select(this).classed($FOCUS.legendItemFocused, true);

						if (hasGauge) {
							$$.markOverlapped(id, $$, `.${$GAUGE.gaugeValue}`);
						}

						if (!state.transiting && $$.isTargetToShow(id)) {
							api.focus(id);
						}
					}
				});
		}
	},

	/**
	 * Update the legend
	 * @param {Array} targetIds ID's of target
	 * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
	 * @private
	 */
	updateLegendElement(targetIds: string[], options): void {
		const $$ = this;
		const {config, state, $el: {legend}, $T} = $$;
		const paddingTop = 4;
		const paddingRight = 10;
		const posMin = 10;
		const tileWidth = config.legend_item_tile_width + 5;
		let maxWidth = 0;
		let maxHeight = 0;
		let xForLegend;
		let yForLegend;
		let totalLength = 0;
		const offsets = {};
		const widths = {};
		const heights = {};
		const margins = [0];
		const steps = {};
		let step = 0;
		let background;
		const isLegendRightOrInset = state.isLegendRight || state.isLegendInset;

		// Skip elements when their name is set to null
		const targetIdz = targetIds
			.filter(id => !isDefined(config.data_names[id]) || config.data_names[id] !== null);

		const withTransition = options.withTransition;

		const updatePositions = function(textElement, id, index) {
			const reset = index === 0;
			const isLast = index === targetIdz.length - 1;
			const box = $$.getLegendItemTextBox(id, textElement);

			const itemWidth = box.width + tileWidth +
				(isLast && !isLegendRightOrInset ? 0 : paddingRight) + config.legend_padding;
			const itemHeight = box.height + paddingTop;
			const itemLength = isLegendRightOrInset ? itemHeight : itemWidth;
			const areaLength = isLegendRightOrInset ? $$.getLegendHeight() : $$.getLegendWidth();
			let margin;

			// MEMO: care about condifion of step, totalLength
			const updateValues = function(id2, withoutStep?: boolean) {
				if (!withoutStep) {
					margin = (areaLength - totalLength - itemLength) / 2;

					if (margin < posMin) {
						margin = (areaLength - itemLength) / 2;
						totalLength = 0;
						step++;
					}
				}

				steps[id2] = step;
				margins[step] = state.isLegendInset ? 10 : margin;
				offsets[id2] = totalLength;
				totalLength += itemLength;
			};

			if (reset) {
				totalLength = 0;
				step = 0;
				maxWidth = 0;
				maxHeight = 0;
			}

			if (config.legend_show && !$$.isLegendToShow(id)) {
				widths[id] = 0;
				heights[id] = 0;
				steps[id] = 0;
				offsets[id] = 0;

				return;
			}

			widths[id] = itemWidth;
			heights[id] = itemHeight;

			if (!maxWidth || itemWidth >= maxWidth) {
				maxWidth = itemWidth;
			}

			if (!maxHeight || itemHeight >= maxHeight) {
				maxHeight = itemHeight;
			}

			const maxLength = isLegendRightOrInset ? maxHeight : maxWidth;

			if (config.legend_equally) {
				Object.keys(widths).forEach(id2 => (widths[id2] = maxWidth));
				Object.keys(heights).forEach(id2 => (heights[id2] = maxHeight));
				margin = (areaLength - maxLength * targetIdz.length) / 2;

				if (margin < posMin) {
					totalLength = 0;
					step = 0;
					targetIdz.forEach(id2 => updateValues(id2));
				} else {
					updateValues(id, true);
				}
			} else {
				updateValues(id);
			}
		};

		if (state.isLegendInset) {
			step = config.legend_inset_step ? config.legend_inset_step : targetIdz.length;
			$$.updateLegendStep(step);
		}

		if (state.isLegendRight) {
			xForLegend = id => maxWidth * steps[id];
			yForLegend = id => margins[steps[id]] + offsets[id];
		} else if (state.isLegendInset) {
			xForLegend = id => maxWidth * steps[id] + 10;
			yForLegend = id => margins[steps[id]] + offsets[id];
		} else {
			xForLegend = id => margins[steps[id]] + offsets[id];
			yForLegend = id => maxHeight * steps[id];
		}

		const xForLegendText = (id, i?: number) => xForLegend(id, i) + 4 + config.legend_item_tile_width;
		const xForLegendRect = (id, i?: number) => xForLegend(id, i);
		const x1ForLegendTile = (id, i?: number) => xForLegend(id, i) - 2;
		const x2ForLegendTile = (id, i?: number) => xForLegend(id, i) - 2 + config.legend_item_tile_width;

		const yForLegendText = (id, i?: number) => yForLegend(id, i) + 9;
		const yForLegendRect = (id, i?: number) => yForLegend(id, i) - 5;
		const yForLegendTile = (id, i?: number) => yForLegend(id, i) + 4;

		const pos = -200;

		// Define g for legend area
		const l = legend.selectAll(`.${$LEGEND.legendItem}`)
			.data(targetIdz)
			.enter()
			.append("g");

		$$.setLegendItem(l);

		l.append("text")
			.text(id => (isDefined(config.data_names[id]) ? config.data_names[id] : id))
			.each(function(id, i) {
				updatePositions(this, id, i);
			})
			.style("pointer-events", "none")
			.attr("x", isLegendRightOrInset ? xForLegendText : pos)
			.attr("y", isLegendRightOrInset ? pos : yForLegendText);

		l.append("rect")
			.attr("class", $LEGEND.legendItemEvent)
			.style("fill-opacity", "0")
			.attr("x", isLegendRightOrInset ? xForLegendRect : pos)
			.attr("y", isLegendRightOrInset ? pos : yForLegendRect);

		const getColor = id => {
			const data = $$.getDataById(id);

			return $$.levelColor ?
				$$.levelColor(data.values[0].value) :
				$$.color(data);
		};

		const usePoint = config.legend_usePoint;

		if (usePoint) {
			const ids: any[] = [];

			l.append(d => {
				const pattern = notEmpty(config.point_pattern) ?
					config.point_pattern : [config.point_type];

				ids.indexOf(d) === -1 && ids.push(d);

				let point = pattern[ids.indexOf(d) % pattern.length];

				if (point === "rectangle") {
					point = "rect";
				}

				return document.createElementNS(d3Namespaces.svg, ("hasValidPointType" in $$) && $$.hasValidPointType(point) ? point : "use");
			})
				.attr("class", $LEGEND.legendItemPoint)
				.style("fill", getColor)
				.style("pointer-events", "none")
				.attr("href", (data, idx, selection) => {
					const node = selection[idx];
					const nodeName = node.nodeName.toLowerCase();
					const id = $$.getTargetSelectorSuffix(data);

					return nodeName === "use" ? `#${state.datetimeId}-point${id}` : undefined;
				});
		} else {
			l.append("line")
				.attr("class", $LEGEND.legendItemTile)
				.style("stroke", getColor)
				.style("pointer-events", "none")
				.attr("x1", isLegendRightOrInset ? x1ForLegendTile : pos)
				.attr("y1", isLegendRightOrInset ? pos : yForLegendTile)
				.attr("x2", isLegendRightOrInset ? x2ForLegendTile : pos)
				.attr("y2", isLegendRightOrInset ? pos : yForLegendTile)
				.attr("stroke-width", config.legend_item_tile_height);
		}

		// Set background for inset legend
		background = legend.select(`.${$LEGEND.legendBackground} rect`);

		if (state.isLegendInset && maxWidth > 0 && background.size() === 0) {
			background = legend.insert("g", `.${$LEGEND.legendItem}`)
				.attr("class", $LEGEND.legendBackground)
				.append("rect");
		}

		const texts = legend.selectAll("text")
			.data(targetIdz)
			.text(id => (isDefined(config.data_names[id]) ? config.data_names[id] : id)) // MEMO: needed for update
			.each(function(id, i) {
				updatePositions(this, id, i);
			});

		$T(texts, withTransition)
			.attr("x", xForLegendText)
			.attr("y", yForLegendText);

		const rects = legend.selectAll(`rect.${$LEGEND.legendItemEvent}`)
			.data(targetIdz);

		$T(rects, withTransition)
			.attr("width", id => widths[id])
			.attr("height", id => heights[id])
			.attr("x", xForLegendRect)
			.attr("y", yForLegendRect);

		if (usePoint) {
			const tiles = legend.selectAll(`.${$LEGEND.legendItemPoint}`)
				.data(targetIdz);

			$T(tiles, withTransition)
				.each(function() {
					const nodeName = this.nodeName.toLowerCase();
					const pointR = config.point_r;
					let x = "x";
					let y = "y";
					let xOffset = 2;
					let yOffset = 2.5;
					let radius;
					let width;
					let height;

					if (nodeName === "circle") {
						const size = pointR * 0.2;

						x = "cx";
						y = "cy";
						radius = pointR + size;
						xOffset = pointR * 2;
						yOffset = -size;
					} else if (nodeName === "rect") {
						const size = pointR * 2.5;

						width = size;
						height = size;
						yOffset = 3;
					}

					d3Select(this)
						.attr(x, d => x1ForLegendTile(d) + xOffset)
						.attr(y, d => yForLegendTile(d) - yOffset)
						.attr("r", radius)
						.attr("width", width)
						.attr("height", height);
				});
		} else {
			const tiles = legend.selectAll(`line.${$LEGEND.legendItemTile}`)
				.data(targetIdz);

			$T(tiles, withTransition)
				.style("stroke", getColor)
				.attr("x1", x1ForLegendTile)
				.attr("y1", yForLegendTile)
				.attr("x2", x2ForLegendTile)
				.attr("y2", yForLegendTile);
		}

		if (background) {
			$T(background, withTransition)
				.attr("height", $$.getLegendHeight() - 12)
				.attr("width", maxWidth * (step + 1) + 10);
		}

		// Update all to reflect change of legend
		$$.updateLegendItemWidth(maxWidth);
		$$.updateLegendItemHeight(maxHeight);
		$$.updateLegendStep(step);
	}
};
