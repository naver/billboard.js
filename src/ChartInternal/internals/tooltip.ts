/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {document} from "../../module/browser";
import {$ARC, $TOOLTIP} from "../../config/classes";
import type {IArcData, IDataRow} from "../data/IData";
import {getPointer, isEmpty, isFunction, isObject, isString, isValue, callFn, sanitize, tplProcess, isUndefined, parseDate} from "../../module/util";

export default {
	/**
	 * Initializes the tooltip
	 * @private
	 */
	initTooltip(): void {
		const $$ = this;
		const {config, $el} = $$;

		$el.tooltip = d3Select(config.tooltip_contents.bindto);

		if ($el.tooltip.empty()) {
			$el.tooltip = $el.chart
				.append("div")
				.attr("class", $TOOLTIP.tooltipContainer)
				.style("position", "absolute")
				.style("pointer-events", "none")
				.style("display", "none");
		}

		$$.bindTooltipResizePos();
	},

	/**
	 * Show tooltip at initialization.
	 * Is called only when tooltip.init.show=true option is set
	 * @private
	 */
	initShowTooltip(): void {
		const $$ = this;
		const {config, $el, state: {hasAxis, hasRadar}} = $$;

		// Show tooltip if needed
		if (config.tooltip_init_show) {
			const isArc = !(hasAxis || hasRadar);

			if ($$.axis?.isTimeSeries() && isString(config.tooltip_init_x)) {
				config.tooltip_init_x = parseDate.call($$, config.tooltip_init_x);
			}

			$$.api.tooltip.show({
				data: {
					[isArc ? "index" : "x"]: config.tooltip_init_x
				}
			});

			const position = config.tooltip_init_position;

			if (!config.tooltip_contents.bindto && !isEmpty(position)) {
				const {top = 0, left = 50} = position;

				$el.tooltip.style("top", isString(top) ? top : `${top}px`)
					.style("left", isString(left) ? left : `${left}px`)
					.style("display", null);
			}
		}
	},

	/**
	 * Get the tooltip HTML string
	 * @param  {Array} args Arguments
	 * @returns {string} Formatted HTML string
	 * @private
	 */
	getTooltipHTML(...args): string {
		const $$ = this;
		const {api, config} = $$;

		return isFunction(config.tooltip_contents) ?
			config.tooltip_contents.bind(api)(...args) : $$.getTooltipContent(...args);
	},

	/**
	 * Returns the tooltip content(HTML string)
	 * @param {object} d data
	 * @param {Function} defaultTitleFormat Default title format
	 * @param {Function} defaultValueFormat Default format for each data value in the tooltip.
	 * @param {Function} color Color function
	 * @returns {string} html
	 * @private
	 */
	getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color): string {
		const $$ = this;
		const {api, config, state, $el} = $$;

		// get formatter function
		const [titleFn, nameFn, valueFn] = ["title", "name", "value"].map(v => {
			const fn = config[`tooltip_format_${v}`];

			return isFunction(fn) ? fn.bind(api) : fn;
		});

		// determine fotmatter function with sanitization
		const titleFormat = (...arg) => sanitize((titleFn || defaultTitleFormat)(...arg));
		const nameFormat = (...arg) => sanitize((nameFn || (name => name))(...arg));
		const valueFormat = (...arg) => {
			const fn = valueFn || (
				state.hasTreemap || $$.isStackNormalized() ? (v, ratio) => `${(ratio * 100).toFixed(2)}%` : defaultValueFormat
			);

			return sanitize(fn(...arg));
		};

		const order = config.tooltip_order;
		const getRowValue = row => ($$.axis && $$.isBubbleZType(row) ? $$.getBubbleZData(row.value, "z") : $$.getBaseValue(row));
		const getBgColor = $$.levelColor ? row => $$.levelColor(row.value) : row => color(row);
		const contents = config.tooltip_contents;
		const tplStr = contents.template;
		const targetIds = $$.mapToTargetIds();

		if (order === null && config.data_groups.length) {
			// for stacked data, order should aligned with the visually displayed data
			const ids = $$.orderTargets($$.data.targets)
				.map(i2 => i2.id)
				.reverse();

			d.sort((a, b) => {
				let v1 = a ? a.value : null;
				let v2 = b ? b.value : null;

				if (v1 > 0 && v2 > 0) {
					v1 = a.id ? ids.indexOf(a.id) : null;
					v2 = b.id ? ids.indexOf(b.id) : null;
				}

				return v1 - v2;
			});
		} else if (/^(asc|desc)$/.test(order)) {
			const isAscending = order === "asc";

			d.sort((a, b) => {
				const v1 = a ? getRowValue(a) : null;
				const v2 = b ? getRowValue(b) : null;

				return isAscending ? v1 - v2 : v2 - v1;
			});
		} else if (isFunction(order)) {
			d.sort(order.bind(api));
		}

		const tpl = $$.getTooltipContentTemplate(tplStr);
		const len = d.length;
		let text;
		let row;
		let param;
		let value;
		let i;

		for (i = 0; i < len; i++) {
			row = d[i];

			if (!row || !(getRowValue(row) || getRowValue(row) === 0)) {
				continue;
			}

			if (isUndefined(text)) {
				const title = (state.hasAxis || state.hasRadar) && titleFormat(row.x);

				text = tplProcess(tpl[0], {
					CLASS_TOOLTIP: $TOOLTIP.tooltip,
					TITLE: isValue(title) ? (
						tplStr ? title : `<tr><th colspan="2">${title}</th></tr>`
					) : ""
				});
			}

			if (!row.ratio && $el.arcs) {
				param = ["arc", $$.$el.arcs.select(`path.${$ARC.arc}-${row.id}`).data()[0]];
				row.ratio = $$.getRatio(...param);
			}

			// arrange param to be passed to formatter
			param = [row.ratio, row.id, row.index];

			if ($$.isAreaRangeType(row)) {
				const [high, low] = ["high", "low"].map(v => valueFormat($$.getRangedData(row, v), ...param));
				const mid = valueFormat(getRowValue(row), ...param);

				value = `<b>Mid:</b> ${mid} <b>High:</b> ${high} <b>Low:</b> ${low}`;
			} else if ($$.isCandlestickType(row)) {
				const [open, high, low, close, volume] = ["open", "high", "low", "close", "volume"].map(v => {
					const value = $$.getRangedData(row, v, "candlestick");

					return value ? valueFormat(
						$$.getRangedData(row, v, "candlestick"), ...param
					) : undefined;
				});

				value = `<b>Open:</b> ${open} <b>High:</b> ${high} <b>Low:</b> ${low} <b>Close:</b> ${close}${volume ? ` <b>Volume:</b> ${volume}` : ""}`;
			} else if ($$.isBarRangeType(row)) {
				const {value: [start, end], id, index} = row;

				value = `${valueFormat(start, undefined, id, index)} ~ ${valueFormat(end, undefined, id, index)}`;
			} else {
				value = valueFormat(getRowValue(row), ...param);
			}

			if (value !== undefined) {
				// Skip elements when their name is set to null
				if (row.name === null) {
					continue;
				}

				const name = nameFormat(row.name, ...param);
				const color = getBgColor(row);
				const contentValue = {
					CLASS_TOOLTIP_NAME: $TOOLTIP.tooltipName + $$.getTargetSelectorSuffix(row.id),
					COLOR: (tplStr || !$$.patterns) ? color : `<svg><rect style="fill:${color}" width="10" height="10"></rect></svg>`,
					NAME: name,
					VALUE: value
				};

				if (tplStr && isObject(contents.text)) {
					const index = targetIds.indexOf(row.id);

					Object.keys(contents.text).forEach(key => {
						contentValue[key] = contents.text[key][index];
					});
				}

				text += tplProcess(tpl[1], contentValue);
			}
		}

		return `${text}</table>`;
	},

	/**
	 * Get the content template string
	 * @param {string} tplStr Tempalte string
	 * @returns {Array} Template string
	 * @private
	 */
	getTooltipContentTemplate(tplStr?: string): string[] {
		return (tplStr || `<table class="{=CLASS_TOOLTIP}"><tbody>
				{=TITLE}
				{{<tr class="{=CLASS_TOOLTIP_NAME}">
					<td class="name">${this.patterns ? `{=COLOR}` : `<span style="background-color:{=COLOR}"></span>`}{=NAME}</td>
					<td class="value">{=VALUE}</td>
				</tr>}}
			</tbody></table>`)
			.replace(/(\r?\n|\t)/g, "")
			.split(/{{(.*)}}/);
	},

	/**
	 * Update tooltip position coordinate
	 * @param {object} dataToShow Data object
	 * @param {SVGElement} eventTarget Event element
	 * @private
	 */
	setTooltipPosition(dataToShow: IDataRow, eventTarget: SVGElement): void {
		const $$ = this;
		const {config, scale, state, $el: {eventRect, tooltip}} = $$;
		const {bindto} = config.tooltip_contents;
		const datum = tooltip?.datum();

		if (!bindto && datum) {
			const [x, y] = getPointer(state.event, eventTarget ?? eventRect?.node()); // get mouse event position
			const currPos: {x: number, y: number, xAxis?: number} = {x, y};

			if (scale.x && datum && "x" in datum) {
				currPos.xAxis = scale.x(datum.x);
			}

			const {width = 0, height = 0} = datum;

			// Get tooltip position
			const pos = config.tooltip_position?.bind($$.api)(
				dataToShow ?? JSON.parse(datum.current),
				width, height, eventRect?.node(), currPos
			) ?? $$.getTooltipPosition.bind($$)(width, height, currPos);

			["top", "left"].forEach(v => {
				const value = pos[v];

				tooltip.style(v, `${value}px`);

				// Remember left pos in percentage to be used on resize call
				if (v === "left" && !datum.xPosInPercent) {
					datum.xPosInPercent = value / state.current.width * 100;
				}
			});
		}
	},

	/**
	 * Returns the position of the tooltip
	 * @param {string} tWidth Width value of tooltip element
	 * @param {string} tHeight Height value of tooltip element
	 * @param {object} currPos Current mouse position
	 * @returns {object} top, left value
	 * @private
	 */
	getTooltipPosition(tWidth: number, tHeight: number, currPos: {[key:string]: number}):
		{top: number, left: number} {
		const $$ = this;
		const {config, scale, state} = $$;
		const {width, height, current, isLegendRight, inputType} = state;
		const hasGauge = $$.hasType("gauge") && !config.gauge_fullCircle;
		const hasTreemap = state.hasTreemap;
		const isRotated = config.axis_rotated;
		const svgLeft = $$.getSvgLeft(true);
		let chartRight = svgLeft + current.width - $$.getCurrentPaddingRight();
		const chartLeft = $$.getCurrentPaddingLeft(true);
		const size = 20;
		let {x, y} = currPos;

		// Determine tooltip position
		if ($$.hasArcType()) {
			const raw = inputType === "touch" || $$.hasType("radar");

			if (!raw) {
				y += hasGauge ? height : height / 2;
				x += (width - (isLegendRight ? $$.getLegendWidth() : 0)) / 2;
			}
		} else if (!hasTreemap) {
			if (isRotated) {
				y = currPos.xAxis + size;
				x += svgLeft;
				chartRight -= svgLeft;
			} else {
				y -= 5;
				x = svgLeft + chartLeft + size + (scale.zoom ? x : currPos.xAxis);
			}
		}

		// when tooltip left + tWidth > chart's width
		if ((x + tWidth + 15) > chartRight) {
			x -= isRotated ? tWidth - chartLeft : tWidth + (hasTreemap ? 0 : chartLeft);
		}

		if (y + tHeight > current.height) {
			const gap = hasTreemap ? 0 : 30;

			y -= hasGauge ? tHeight * 3 : tHeight + gap;
		}

		const pos = {top: y, left: x};

		// make sure to not be positioned out of viewport
		Object.keys(pos).forEach(v => {
			if (pos[v] < 0) {
				pos[v] = 0;
			}
		});

		return pos;
	},

	/**
	 * Show the tooltip
	 * @param {object} selectedData Data object
	 * @param {SVGElement} eventTarget Event element
	 * @private
	 */
	showTooltip(selectedData: IDataRow[], eventTarget: SVGElement): void {
		const $$ = this;
		const {config, $el: {tooltip}} = $$;
		const dataToShow = selectedData.filter(d => d && isValue($$.getBaseValue(d)));

		if (!tooltip || dataToShow.length === 0 || !config.tooltip_show) {
			return;
		}

		let datum = tooltip.datum();
		const dataStr = JSON.stringify(selectedData);

		if (!datum || datum.current !== dataStr) {
			const {index, x} = selectedData.concat().sort()[0];

			callFn(config.tooltip_onshow, $$.api, selectedData);

			// set tooltip content
			tooltip
				.html($$.getTooltipHTML(
					selectedData, // data
					$$.axis ? $$.axis.getXAxisTickFormat() : $$.categoryName.bind($$), // defaultTitleFormat
					$$.getDefaultValueFormat(), // defaultValueFormat
					$$.color // color
				))
				.style("display", null)
				.style("visibility", null) // for IE9
				.datum(datum = {
					index,
					x,
					current: dataStr,
					width: tooltip.property("offsetWidth"),
					height: tooltip.property("offsetHeight")
				});

			callFn(config.tooltip_onshown, $$.api, selectedData);
			$$._handleLinkedCharts(true, index);
		}

		$$.setTooltipPosition(dataToShow, eventTarget);
	},

	/**
	 * Adjust tooltip position on resize event
	 * @private
	 */
	bindTooltipResizePos(): void {
		const $$ = this;
		const {resizeFunction, state, $el: {tooltip}} = $$;

		resizeFunction.add(() => {
			if (tooltip.style("display") === "block") {
				const {current} = state;
				const {width, xPosInPercent} = tooltip.datum();
				let value = current.width / 100 * xPosInPercent;
				const diff = current.width - (value + width);

				// if tooltip size overs current viewport size
				if (diff < 0) {
					value += diff;
				}

				tooltip.style("left", `${value}px`);
			}
		});
	},

	/**
	 * Hide the tooltip
	 * @param {boolean} force Force to hide
	 * @private
	 */
	hideTooltip(force?: boolean): void {
		const $$ = this;
		const {api, config, $el: {tooltip}} = $$;

		if (tooltip && tooltip.style("display") !== "none" && (!config.tooltip_doNotHide || force)) {
			const selectedData = JSON.parse(tooltip.datum().current ?? {});

			callFn(config.tooltip_onhide, api, selectedData);

			// hide tooltip
			tooltip
				.style("display", "none")
				.style("visibility", "hidden") // for IE9
				.datum(null);

			callFn(config.tooltip_onhidden, api, selectedData);
		}
	},

	/**
	 * Toggle display for linked chart instances
	 * @param {boolean} show true: show, false: hide
	 * @param {number} index x Axis index
	 * @private
	 */
	_handleLinkedCharts(show: boolean, index: number): void {
		const $$ = this;
		const {charts, config, state: {event}} = $$;

		// Prevent propagation among instances if isn't instantiated from the user's event
		// https://github.com/naver/billboard.js/issues/1979
		if (event?.isTrusted && config.tooltip_linked && charts.length > 1) {
			const linkedName = config.tooltip_linked_name;

			charts
				.filter(c => c !== $$.api)
				.forEach(c => {
					const {config, $el} = c.internal;
					const isLinked = config.tooltip_linked;
					const name = config.tooltip_linked_name;
					const isInDom = document.body.contains($el.chart.node());

					if (isLinked && linkedName === name && isInDom) {
						const data = $el.tooltip.data()[0];
						const isNotSameIndex = index !== data?.index;

						try {
							c.tooltip[
								show && isNotSameIndex ? "show" : "hide"
							]({index});
						} catch (e) {}
					}
				});
		}
	},

	/**
	 * Update tooltip content on redraw
	 * - In a situation where tooltip is displayed and data load happens, it should reflect loaded data to tooltip
	 * @param {d3Selection} context Event rect element
	 * @param {number} index Data index
	 * @private
	 */
	updateTooltipOnRedraw(context?: SVGRectElement, index?: number): void {
		const $$ = this;
		const {
			config,
			$el: {eventRect, svg, tooltip},
			state: {event, hasAxis, hasRadar, hasTreemap}
		} = $$;

		// Update tooltip, when tooltip is in shown state
		if (tooltip?.style("display") === "block" && event) {
			const rect = context ?? (hasRadar ? svg : eventRect)?.node();

			// for Axis based & Radar
			if (hasAxis || hasRadar) {
				if ($$.isMultipleX()) {
					$$.selectRectForMultipleXs(rect, false);
				} else {
					const idx = index ?? $$.getDataIndexFromEvent(event);

					if (index === -1) {
						$$.api.tooltip.hide();
					} else {
						$$.selectRectForSingle(rect, idx);
						$$.setExpand(idx, null, true);
					}
				}

			// for Arc & Treemap
			} else {
				const {clientX, clientY} = event;

				setTimeout(() => {
					let target = document.elementFromPoint(clientX, clientY);
					const data = d3Select(target).datum() as IArcData;

					if (data) {
						const d = $$.hasArcType() ?
							$$.convertToArcData($$.updateAngle(data)) : data?.data;

						hasTreemap && (target = svg.node());
						d && $$.showTooltip([d], target);
					} else {
						$$.api.tooltip.hide();
					}
				}, config.transition_duration);
			}
		}
	}
};
