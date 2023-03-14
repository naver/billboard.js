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

/**
 * Get color string for given data id
 * @param {string} id Data id
 * @returns {string} Color string
 * @private
 */
function getLegendColor(id: string): string {
	const $$ = this;
	const data = $$.getDataById(id);
	const color = $$.levelColor ?
		$$.levelColor(data.values[0].value) :
		$$.color(data);

	return color;
}

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
		} else if (!state.hasTreemap) {
			$$.updateLegendElement(
				targetIds || $$.mapToIds($$.data.targets),
				optionz,
				transitions
			);
		}

		// toggle legend state
		$el.legend?.selectAll(`.${$LEGEND.legendItem}`)
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
			const ids: string[] = [];
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
		const isFitPadding = $$.config.padding?.mode === "fit";

		return $$.config.legend_show ? (
			isLegendRight ?
				current.height : (
					isFitPadding ? 10 : Math.max(20, legendItemHeight)
				) * (legendStep + 1)
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
		const {$el, api, config, state} = $$;
		const isTouch = state.inputType === "touch";
		const hasGauge = $$.hasType("gauge");
		const useCssRule = config.boost_useCssRule;

		item
			.attr("class", function(id) {
				const node = d3Select(this);
				const itemClass = (!node.empty() && node.attr("class")) || "";

				return itemClass + $$.generateClass($LEGEND.legendItem, id);
			})
			.style("visibility", id => ($$.isLegendToShow(id) ? null : "hidden"));

		if (config.interaction_enabled) {
			if (useCssRule) {
				[
					[`.${$LEGEND.legendItem}`, "cursor:pointer"],
					[`.${$LEGEND.legendItem} text`, "pointer-events:none"],
					[`.${$LEGEND.legendItemPoint} text`, "pointer-events:none"],
					[`.${$LEGEND.legendItemTile}`, "pointer-events:none"],
					[`.${$LEGEND.legendItemEvent}`, "fill-opacity:0"]
				].forEach(v => {
					const [selector, props] = v;

					$$.setCssRule(false, selector, [props])($el.legend);
				});
			}

			item
				.style("cursor", $$.getStylePropValue("pointer"))
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
		const legendType = config.legend_item_tile_type;
		const isRectangle = legendType !== "circle";
		const legendItemR = config.legend_item_tile_r;

		const itemTileSize = {
			width: isRectangle ? config.legend_item_tile_width : legendItemR * 2,
			height: isRectangle ? config.legend_item_tile_height : legendItemR * 2
		};

		const dimension = {
			padding: {
				top: 4,
				right: 10
			},
			max: {
				width: 0,
				height: 0
			},
			posMin: 10,
			step: 0,
			tileWidth: itemTileSize.width + 5,
			totalLength: 0
		};

		const sizes = {
			offsets: {},
			widths: {},
			heights: {},
			margins: [0],
			steps: {}
		};

		let xForLegend;
		let yForLegend;
		let background;

		// Skip elements when their name is set to null
		const targetIdz = targetIds
			.filter(id => !isDefined(config.data_names[id]) || config.data_names[id] !== null);

		const withTransition = options.withTransition;
		const updatePositions = $$.getUpdateLegendPositions(targetIdz, dimension, sizes);

		if (state.isLegendInset) {
			dimension.step = config.legend_inset_step ? config.legend_inset_step : targetIdz.length;
			$$.updateLegendStep(dimension.step);
		}

		if (state.isLegendRight) {
			xForLegend = id => dimension.max.width * sizes.steps[id];
			yForLegend = id => sizes.margins[sizes.steps[id]] + sizes.offsets[id];
		} else if (state.isLegendInset) {
			xForLegend = id => dimension.max.width * sizes.steps[id] + 10;
			yForLegend = id => sizes.margins[sizes.steps[id]] + sizes.offsets[id];
		} else {
			xForLegend = id => sizes.margins[sizes.steps[id]] + sizes.offsets[id];
			yForLegend = id => dimension.max.height * sizes.steps[id];
		}

		const posFn = {
			xText: (id, i?: number) => xForLegend(id, i) + 4 + itemTileSize.width,
			xRect: (id, i?: number) => xForLegend(id, i),
			x1Tile: (id, i?: number) => xForLegend(id, i) - 2,
			x2Tile: (id, i?: number) => xForLegend(id, i) - 2 + itemTileSize.width,
			yText: (id, i?: number) => yForLegend(id, i) + 9,
			yRect: (id, i?: number) => yForLegend(id, i) - 5,
			yTile: (id, i?: number) => yForLegend(id, i) + 4
		};

		$$.generateLegendItem(targetIdz, itemTileSize, updatePositions, posFn);

		// Set background for inset legend
		background = legend.select(`.${$LEGEND.legendBackground} rect`);

		if (state.isLegendInset && dimension.max.width > 0 && background.size() === 0) {
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
			.attr("x", posFn.xText)
			.attr("y", posFn.yText);

		const rects = legend.selectAll(`rect.${$LEGEND.legendItemEvent}`)
			.data(targetIdz);

		$T(rects, withTransition)
			.attr("width", id => sizes.widths[id])
			.attr("height", id => sizes.heights[id])
			.attr("x", posFn.xRect)
			.attr("y", posFn.yRect);

		// update legend items position
		$$.updateLegendItemPos(targetIdz, withTransition, posFn);

		if (background) {
			$T(background, withTransition)
				.attr("height", $$.getLegendHeight() - 12)
				.attr("width", dimension.max.width * (dimension.step + 1) + 10);
		}

		// Update all to reflect change of legend
		$$.updateLegendItemWidth(dimension.max.width);
		$$.updateLegendItemHeight(dimension.max.height);
		$$.updateLegendStep(dimension.step);
	},

	/**
	 * Get position update function
	 * @param {Array} targetIdz Data ids
	 * @param {object} dimension Dimension object
	 * @param {object} sizes Size object
	 * @returns {Function} Update position function
	 * @private
	 */
	getUpdateLegendPositions(targetIdz, dimension, sizes) {
		const $$ = this;
		const {config, state} = $$;
		const isLegendRightOrInset = state.isLegendRight || state.isLegendInset;

		return function(textElement, id, index) {
			const reset = index === 0;
			const isLast = index === targetIdz.length - 1;
			const box = $$.getLegendItemTextBox(id, textElement);

			const itemWidth = box.width + dimension.tileWidth +
				(isLast && !isLegendRightOrInset ? 0 : dimension.padding.right) + config.legend_padding;
			const itemHeight = box.height + dimension.padding.top;
			const itemLength = isLegendRightOrInset ? itemHeight : itemWidth;
			const areaLength = isLegendRightOrInset ? $$.getLegendHeight() : $$.getLegendWidth();
			let margin;

			// MEMO: care about condifion of step, totalLength
			const updateValues = function(id2, withoutStep?: boolean) {
				if (!withoutStep) {
					margin = (areaLength - dimension.totalLength - itemLength) / 2;

					if (margin < dimension.posMin) {
						margin = (areaLength - itemLength) / 2;
						dimension.totalLength = 0;
						dimension.step++;
					}
				}

				sizes.steps[id2] = dimension.step;
				sizes.margins[dimension.step] = state.isLegendInset ? 10 : margin;
				sizes.offsets[id2] = dimension.totalLength;
				dimension.totalLength += itemLength;
			};

			if (reset) {
				dimension.totalLength = 0;
				dimension.step = 0;
				dimension.max.width = 0;
				dimension.max.height = 0;
			}

			if (config.legend_show && !$$.isLegendToShow(id)) {
				sizes.widths[id] = 0;
				sizes.heights[id] = 0;
				sizes.steps[id] = 0;
				sizes.offsets[id] = 0;

				return;
			}

			sizes.widths[id] = itemWidth;
			sizes.heights[id] = itemHeight;

			if (!dimension.max.width || itemWidth >= dimension.max.width) {
				dimension.max.width = itemWidth;
			}

			if (!dimension.max.height || itemHeight >= dimension.max.height) {
				dimension.max.height = itemHeight;
			}

			const maxLength = isLegendRightOrInset ? dimension.max.height : dimension.max.width;

			if (config.legend_equally) {
				Object.keys(sizes.widths).forEach(id2 => (sizes.widths[id2] = dimension.max.width));
				Object.keys(sizes.heights).forEach(id2 => (sizes.heights[id2] = dimension.max.height));
				margin = (areaLength - maxLength * targetIdz.length) / 2;

				if (margin < dimension.posMin) {
					dimension.totalLength = 0;
					dimension.step = 0;
					targetIdz.forEach(id2 => updateValues(id2));
				} else {
					updateValues(id, true);
				}
			} else {
				updateValues(id);
			}
		};
	},

	/**
	 * Generate legend item elements
	 * @param {Array} targetIdz Data ids
	 * @param {object} itemTileSize Item tile size {width, height}
	 * @param {Function} updatePositions Update position function
	 * @param {object} posFn Position functions
	 * @private
	 */
	generateLegendItem(targetIdz, itemTileSize, updatePositions, posFn) {
		const $$ = this;
		const {config, state, $el: {legend}} = $$;
		const usePoint = config.legend_usePoint;
		const legendItemR = config.legend_item_tile_r;
		const legendType = config.legend_item_tile_type;
		const isRectangle = legendType !== "circle";
		const isLegendRightOrInset = state.isLegendRight || state.isLegendInset;

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
			.style("pointer-events", $$.getStylePropValue("none"))
			.attr("x", isLegendRightOrInset ? posFn.xText : pos)
			.attr("y", isLegendRightOrInset ? pos : posFn.yText);

		l.append("rect")
			.attr("class", $LEGEND.legendItemEvent)
			.style("fill-opacity", $$.getStylePropValue("0"))
			.attr("x", isLegendRightOrInset ? posFn.xRect : pos)
			.attr("y", isLegendRightOrInset ? pos : posFn.yRect);

		if (usePoint) {
			const ids: string[] = [];

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
				.style("fill", getLegendColor.bind($$))
				.style("pointer-events", $$.getStylePropValue("none"))
				.attr("href", (data, idx, selection) => {
					const node = selection[idx];
					const nodeName = node.nodeName.toLowerCase();
					const id = $$.getTargetSelectorSuffix(data);

					return nodeName === "use" ? `#${state.datetimeId}-point${id}` : undefined;
				});
		} else {
			l.append(isRectangle ? "line" : legendType)
				.attr("class", $LEGEND.legendItemTile)
				.style("stroke", getLegendColor.bind($$))
				.style("pointer-events", $$.getStylePropValue("none"))
				.call(selection => {
					if (legendType === "circle") {
						selection
							.attr("r", legendItemR)
							.style("fill", getLegendColor.bind($$))
							.attr("cx", isLegendRightOrInset ? posFn.x2Tile : pos)
							.attr("cy", isLegendRightOrInset ? pos : posFn.yTile);
					} else if (isRectangle) {
						selection
							.attr("stroke-width", itemTileSize.height)
							.attr("x1", isLegendRightOrInset ? posFn.x1Tile : pos)
							.attr("y1", isLegendRightOrInset ? pos : posFn.yTile)
							.attr("x2", isLegendRightOrInset ? posFn.x2Tile : pos)
							.attr("y2", isLegendRightOrInset ? pos : posFn.yTile);
					}
				});
		}
	},

	/**
	 * Update legend item position
	 * @param {Array} targetIdz Data ids
	 * @param {boolean} withTransition Whether or not to apply transition
	 * @param {object} posFn Position functions
	 * @private
	 */
	updateLegendItemPos(targetIdz: string[], withTransition: boolean, posFn): void {
		const $$ = this;
		const {config, $el: {legend}, $T} = $$;
		const usePoint = config.legend_usePoint;
		const legendType = config.legend_item_tile_type;
		const isRectangle = legendType !== "circle";

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
					let radius = null;
					let width = <number|null>null;
					let height = <number|null>null;

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
						.attr(x, d => posFn.x1Tile(d) + xOffset)
						.attr(y, d => posFn.yTile(d) - yOffset)
						.attr("r", radius)
						.attr("width", width)
						.attr("height", height);
				});
		} else {
			const tiles = legend.selectAll(`.${$LEGEND.legendItemTile}`)
				.data(targetIdz);

			$T(tiles, withTransition)
				.style("stroke", getLegendColor.bind($$))
				.call(selection => {
					if (legendType === "circle") {
						selection
							.attr("cx", d => {
								const x2 = posFn.x2Tile(d);

								return x2 - ((x2 - posFn.x1Tile(d)) / 2);
							})
							.attr("cy", posFn.yTile);
					} else if (isRectangle) {
						selection
							.attr("x1", posFn.x1Tile)
							.attr("y1", posFn.yTile)
							.attr("x2", posFn.x2Tile)
							.attr("y2", posFn.yTile);
					}
				});
		}
	}
};
