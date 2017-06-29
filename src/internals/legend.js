/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	event as d3Event
} from "d3";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend, isDefined, getOption, isEmpty} from "./util";


extend(ChartInternal.prototype, {
	/**
	 * Initialize the legend.
	 * @private
	 */
	initLegend() {
		const $$ = this;

		$$.legendItemTextBox = {};
		$$.legendHasRendered = false;
		$$.legend = $$.svg.append("g").attr("transform", $$.getTranslate("legend"));
		if (!$$.config.legend_show) {
			$$.legend.style("visibility", "hidden");
			$$.hiddenLegendIds = $$.mapToIds($$.data.targets);
			return;
		}
		// MEMO: call here to update legend box and tranlate for all
		// MEMO: translate will be upated by this, so transform not needed in updateLegend()
		$$.updateLegendWithDefaults();
	},

	/**
	 * Update the legend to its default value.
	 * @private
	 */
	updateLegendWithDefaults() {
		const $$ = this;

		$$.updateLegend($$.mapToIds($$.data.targets), {
			withTransform: false,
			withTransitionForTransform: false,
			withTransition: false
		});
	},

	/**
	 * Update the size of the legend.
	 * @private
	 * @param {Number} height
	 * @param {Number} width
	 */
	updateSizeForLegend(legendHeight, legendWidth) {
		const $$ = this;
		const config = $$.config;

		const insetLegendPosition = {
			top: $$.isLegendTop ?
				$$.getCurrentPaddingTop() + config.legend_inset_y + 5.5 :
				$$.currentHeight - legendHeight - $$.getCurrentPaddingBottom() - config.legend_inset_y,
			left: $$.isLegendLeft ?
				$$.getCurrentPaddingLeft() + config.legend_inset_x + 0.5 :
				$$.currentWidth - legendWidth - $$.getCurrentPaddingRight() - config.legend_inset_x + 0.5
		};

		$$.margin3 = {
			top: $$.isLegendRight ?
				0 : $$.isLegendInset ? insetLegendPosition.top : $$.currentHeight - legendHeight,
			right: NaN,
			bottom: 0,
			left: $$.isLegendRight ?
				$$.currentWidth - legendWidth : $$.isLegendInset ? insetLegendPosition.left : 0
		};
	},
	/**
	 * Transform Legend
	 * @private
	 * @param {Boolean} whether or not to transition.
	 */
	transformLegend(withTransition) {
		const $$ = this;

		(withTransition ? $$.legend.transition() : $$.legend)
			.attr("transform", $$.getTranslate("legend"));
	},

	/**
	 * Update the legend step
	 * @private
	 * @param {Number} step
	 */
	updateLegendStep(step) {
		this.legendStep = step;
	},

	/**
	 * Update legend item width
	 * @private
	 * @param {Number} width
	 */
	updateLegendItemWidth(w) {
		this.legendItemWidth = w;
	},

	/**
	 * Update legend item height
	 * @private
	 * @param {Number} height
	 */
	updateLegendItemHeight(h) {
		this.legendItemHeight = h;
	},

	/**
	 * Get the width of the legend
	 * @private
	 * @param {Number} width
	 */
	getLegendWidth() {
		const $$ = this;

		return $$.config.legend_show ?
			$$.isLegendRight ||
			$$.isLegendInset ? $$.legendItemWidth * ($$.legendStep + 1) : $$.currentWidth : 0;
	},
	/**
	 * Get the height of the legend
	 * @private
	 * @param {Number} height
	 */
	getLegendHeight() {
		const $$ = this;
		let h = 0;

		if ($$.config.legend_show) {
			if ($$.isLegendRight) {
				h = $$.currentHeight;
			} else {
				h = Math.max(20, $$.legendItemHeight) * ($$.legendStep + 1);
			}
		}
		return h;
	},
	/**
	 * Get the opacity of the legend
	 * @private
	 * @param {Object} d3.Select
	 * @returns {Number} opacity
	 */
	opacityForLegend(legendItem) {
		return legendItem.classed(CLASS.legendItemHidden) ? null : "1";
	},

	/**
	 * Get the opacity of the legend that is unfocused
	 * @private
	 * @param {Object} legendItem, d3.Select
	 * @returns {Number} opacity
	 */
	opacityForUnfocusedLegend(legendItem) {
		return legendItem.classed(CLASS.legendItemHidden) ? null : "0.3";
	},
	/**
	 * Toggles the focus of the legend
	 * @private
	 * @param {Array} ID's of target
	 * @param {Boolean} whether or not to focus.
	 */
	toggleFocusLegend(targetIds, focus) {
		const $$ = this;
		const targetIdz = $$.mapToTargetIds(targetIds);

		$$.legend.selectAll(`.${CLASS.legendItem}`)
			.filter(id => targetIdz.indexOf(id) >= 0)
			.classed(CLASS.legendItemFocused, focus)
			.transition()
			.duration(100)
			.style("opacity", function() {
				const opacity = focus ? $$.opacityForLegend : $$.opacityForUnfocusedLegend;

				return opacity.call($$, d3Select(this));
			});
	},
	/**
	 * Revert the legend to its default state
	 * @private
	 */
	revertLegend() {
		const $$ = this;

		$$.legend.selectAll(`.${CLASS.legendItem}`)
			.classed(CLASS.legendItemFocused, false)
			.transition()
			.duration(100)
			.style("opacity", function() {
				return $$.opacityForLegend(d3Select(this));
			});
	},
	/**
	 * Shows the legend
	 * @private
	 * @param {Array} ID's of target
	 */
	showLegend(targetIds) {
		const $$ = this;
		const config = $$.config;

		if (!config.legend_show) {
			config.legend_show = true;
			$$.legend.style("visibility", "visible");
			if (!$$.legendHasRendered) {
				$$.updateLegendWithDefaults();
			}
		}
		$$.removeHiddenLegendIds(targetIds);

		$$.legend.selectAll($$.selectorLegends(targetIds))
			.style("visibility", "visible")
			.transition()
			.style("opacity", function() {
				return $$.opacityForLegend(d3Select(this));
			});
	},
	/**
	 * Hide the legend
	 * @private
	 * @param {Array} ID's of target
	 */
	hideLegend(targetIds) {
		const $$ = this;
		const config = $$.config;

		if (config.legend_show && isEmpty(targetIds)) {
			config.legend_show = false;
			$$.legend.style("visibility", "hidden");
		}
		$$.addHiddenLegendIds(targetIds);
		$$.legend.selectAll($$.selectorLegends(targetIds))
			.style("opacity", "0")
			.style("visibility", "hidden");
	},
	/**
	 * Clear the LegendItemTextBox cache.
	 * @private
	 */
	clearLegendItemTextBoxCache() {
		this.legendItemTextBox = {};
	},
	/**
	 * Update the legend
	 * @private
	 * @param {Array} ID's of target
	 * @param {Object} withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
	 * @param {Object} the return value of the generateTransitions
	 */
	updateLegend(targetIds, options, transitions) {
		const $$ = this;
		const config = $$.config;
		const paddingTop = 4;
		const paddingRight = 10;
		const posMin = 10;
		const tileWidth = config.legend_item_tile_width + 5;
		const isTouch = ($$.inputType === "touch");
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
		// Skip elements when their name is set to null
		const targetIdz = targetIds
			.filter(id => !isDefined(config.data_names[id]) || config.data_names[id] !== null);
		const optionz = options || {};
		const withTransition = getOption(optionz, "withTransition", true);
		const withTransitionForTransform = getOption(optionz, "withTransitionForTransform", true);
		const getTextBox = function(textElement, id) {
			if (!$$.legendItemTextBox[id]) {
				$$.legendItemTextBox[id] =
					$$.getTextRect(textElement.textContent, CLASS.legendItem, textElement);
			}
			return $$.legendItemTextBox[id];
		};
		const updatePositions = function(textElement, id, index) {
			const reset = index === 0;
			const isLast = index === targetIdz.length - 1;
			const box = getTextBox(textElement, id);
			const itemWidth = box.width + tileWidth +
				(isLast && !($$.isLegendRight || $$.isLegendInset) ? 0 : paddingRight) + config.legend_padding;
			const itemHeight = box.height + paddingTop;
			const itemLength = $$.isLegendRight ||
				$$.isLegendInset ? itemHeight : itemWidth;
			const areaLength = $$.isLegendRight ||
				$$.isLegendInset ? $$.getLegendHeight() : $$.getLegendWidth();
			let margin;

			// MEMO: care about condifion of step, totalLength
			const updateValues = function(id2, withoutStep) {
				if (!withoutStep) {
					margin = (areaLength - totalLength - itemLength) / 2;
					if (margin < posMin) {
						margin = (areaLength - itemLength) / 2;
						totalLength = 0;
						step++;
					}
				}
				steps[id2] = step;
				margins[step] = $$.isLegendInset ? 10 : margin;
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

			const maxLength = $$.isLegendRight || $$.isLegendInset ? maxHeight : maxWidth;

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

		if ($$.isLegendInset) {
			step = config.legend_inset_step ? config.legend_inset_step : targetIdz.length;
			$$.updateLegendStep(step);
		}

		if ($$.isLegendRight) {
			xForLegend = id => maxWidth * steps[id];
			yForLegend = id => margins[steps[id]] + offsets[id];
		} else if ($$.isLegendInset) {
			xForLegend = id => maxWidth * steps[id] + 10;
			yForLegend = id => margins[steps[id]] + offsets[id];
		} else {
			xForLegend = id => margins[steps[id]] + offsets[id];
			yForLegend = id => maxHeight * steps[id];
		}

		const xForLegendText = (id, i) => xForLegend(id, i) + 4 + config.legend_item_tile_width;
		const yForLegendText = (id, i) => yForLegend(id, i) + 9;
		const xForLegendRect = (id, i) => xForLegend(id, i);
		const yForLegendRect = (id, i) => yForLegend(id, i) - 5;
		const x1ForLegendTile = (id, i) => xForLegend(id, i) - 2;
		const x2ForLegendTile = (id, i) => xForLegend(id, i) - 2 + config.legend_item_tile_width;
		const yForLegendTile = (id, i) => yForLegend(id, i) + 4;

		// Define g for legend area
		const l = $$.legend.selectAll(`.${CLASS.legendItem}`)
			.data(targetIdz)
			.enter()
			.append("g")
			.attr("class", id => $$.generateClass(CLASS.legendItem, id))
			.style("visibility", id => ($$.isLegendToShow(id) ? "visible" : "hidden"))
			.style("cursor", "pointer")
			.on(isTouch ? "touchstart" : "click", id => {
				if (config.legend_item_onclick) {
					config.legend_item_onclick.call($$, id);
				} else {
					if (d3Event.altKey) {
						$$.api.hide();
						$$.api.show(id);
					} else {
						$$.api.toggle(id);
						$$.isTargetToShow(id) ? $$.api.focus(id) : $$.api.revert();
					}
				}
				isTouch && $$.hideTooltip();
			})
			.on(isTouch ? undefined : "mouseover", function(id) {
				if (config.legend_item_onover) {
					config.legend_item_onover.call($$, id);
				} else {
					d3Select(this).classed(CLASS.legendItemFocused, true);
					if (!$$.transiting && $$.isTargetToShow(id)) {
						$$.api.focus(id);
					}
				}
			})
			.on(isTouch ? "touchend" : "mouseout", function(id) {
				if (config.legend_item_onout) {
					config.legend_item_onout.call($$, id);
				} else {
					d3Select(this).classed(CLASS.legendItemFocused, false);
					$$.api.revert();
				}
			});

		l.append("text")
			.text(id => (isDefined(config.data_names[id]) ? config.data_names[id] : id))
			.each(function(id, i) {
				updatePositions(this, id, i);
			})
			.style("pointer-events", "none")
			.attr("x", $$.isLegendRight || $$.isLegendInset ? xForLegendText : -200)
			.attr("y", $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendText);

		l.append("rect")
			.attr("class", CLASS.legendItemEvent)
			.style("fill-opacity", "0")
			.attr("x", $$.isLegendRight || $$.isLegendInset ? xForLegendRect : -200)
			.attr("y", $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendRect);

		l.append("line")
			.attr("class", CLASS.legendItemTile)
			.style("stroke", $$.color)
			.style("pointer-events", "none")
			.attr("x1", $$.isLegendRight || $$.isLegendInset ? x1ForLegendTile : -200)
			.attr("y1", $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendTile)
			.attr("x2", $$.isLegendRight || $$.isLegendInset ? x2ForLegendTile : -200)
			.attr("y2", $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendTile)
			.attr("stroke-width", config.legend_item_tile_height);

		// Set background for inset legend
		background = $$.legend.select(`.${CLASS.legendBackground} rect`);

		if ($$.isLegendInset && maxWidth > 0 && background.size() === 0) {
			background = $$.legend.insert("g", `.${CLASS.legendItem}`)
				.attr("class", CLASS.legendBackground)
				.append("rect");
		}

		const texts = $$.legend.selectAll("text")
			.data(targetIdz)
			.text(id => (isDefined(config.data_names[id]) ? config.data_names[id] : id)) // MEMO: needed for update
			.each(function(id, i) {
				updatePositions(this, id, i);
			});

		(withTransition ? texts.transition() : texts)
			.attr("x", xForLegendText)
			.attr("y", yForLegendText);

		const rects = $$.legend.selectAll(`rect.${CLASS.legendItemEvent}`)
			.data(targetIdz);

		(withTransition ? rects.transition() : rects)
			.attr("width", id => widths[id])
			.attr("height", id => heights[id])
			.attr("x", xForLegendRect)
			.attr("y", yForLegendRect);

		const tiles = $$.legend.selectAll(`line.${CLASS.legendItemTile}`)
			.data(targetIdz);

		(withTransition ? tiles.transition() : tiles)
			.style("stroke", $$.color)
			.attr("x1", x1ForLegendTile)
			.attr("y1", yForLegendTile)
			.attr("x2", x2ForLegendTile)
			.attr("y2", yForLegendTile);

		if (background) {
			(withTransition ? background.transition() : background)
				.attr("height", $$.getLegendHeight() - 12)
				.attr("width", maxWidth * (step + 1) + 10);
		}

		// toggle legend state
		$$.legend.selectAll(`.${CLASS.legendItem}`)
			.classed(CLASS.legendItemHidden, id => !$$.isTargetToShow(id));

		// Update all to reflect change of legend
		$$.updateLegendItemWidth(maxWidth);
		$$.updateLegendItemHeight(maxHeight);
		$$.updateLegendStep(step);
		// Update size and scale
		$$.updateSizes();
		$$.updateScales(!options.withTransition);
		$$.updateSvgSize();
		// Update g positions
		$$.transformAll(withTransitionForTransform, transitions);
		$$.legendHasRendered = true;
	},
});
