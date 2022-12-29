/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {document} from "../../module/browser";
import {$ARC, $TOOLTIP} from "../../config/classes";
import type {IDataRow} from "../data/IData";
import {getPointer, isFunction, isObject, isString, isValue, callFn, sanitise, tplProcess, isUndefined, parseDate} from "../../module/util";

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

	initShowTooltip(): void {
		const $$ = this;
		const {config, $el, state: {hasAxis, hasRadar}} = $$;

		// Show tooltip if needed
		if (config.tooltip_init_show) {
			const isArc = !(hasAxis && hasRadar);

			if ($$.axis?.isTimeSeries() && isString(config.tooltip_init_x)) {
				const targets = $$.data.targets[0];
				let i;
				let val;

				config.tooltip_init_x = parseDate.call($$, config.tooltip_init_x);

				for (i = 0; (val = targets.values[i]); i++) {
					if ((val.x - config.tooltip_init_x) === 0) {
						break;
					}
				}

				config.tooltip_init_x = i;
			}

			let data = $$.data.targets.map(d => {
				const x = isArc ? 0 : config.tooltip_init_x;

				return $$.addName(d.values[x]);
			});

			if (isArc) {
				data = [data[config.tooltip_init_x]];
			}

			$el.tooltip.html($$.getTooltipHTML(
				data,
				$$.axis?.getXAxisTickFormat(),
				$$.getDefaultValueFormat(),
				$$.color
			));

			if (!config.tooltip_contents.bindto) {
				$el.tooltip.style("top", config.tooltip_init_position.top)
					.style("left", config.tooltip_init_position.left)
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

		let [titleFormat, nameFormat, valueFormat] = ["title", "name", "value"].map(v => {
			const fn = config[`tooltip_format_${v}`];

			return isFunction(fn) ? fn.bind(api) : fn;
		});

		titleFormat = titleFormat || defaultTitleFormat;
		nameFormat = nameFormat || (name => name);
		valueFormat = valueFormat || (
			state.hasTreemap || $$.isStackNormalized() ? (v, ratio) => `${(ratio * 100).toFixed(2)}%` : defaultValueFormat
		);

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
				const title = (state.hasAxis || state.hasRadar) &&
					sanitise(titleFormat ? titleFormat(row.x) : row.x);

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

			param = [row.ratio, row.id, row.index, d];
			value = sanitise(valueFormat(getRowValue(row), ...param));

			if ($$.isAreaRangeType(row)) {
				const [high, low] = ["high", "low"].map(v => sanitise(
					valueFormat($$.getRangedData(row, v), ...param)
				));

				value = `<b>Mid:</b> ${value} <b>High:</b> ${high} <b>Low:</b> ${low}`;
			} else if ($$.isCandlestickType(row)) {
				const [open, high, low, close, volume] = ["open", "high", "low", "close", "volume"].map(v => sanitise(
					valueFormat($$.getRangedData(row, v, "candlestick"), ...param)
				));

				value = `<b>Open:</b> ${open} <b>High:</b> ${high} <b>Low:</b> ${low} <b>Close:</b> ${close}${volume ? ` <b>Volume:</b> ${volume}` : ""}`;
			} else if ($$.isBarRangeType(row)) {
				const [start, end] = row.value;

				value = `${valueFormat(start)} ~ ${valueFormat(end)}`;
			}

			if (value !== undefined) {
				// Skip elements when their name is set to null
				if (row.name === null) {
					continue;
				}

				const name = sanitise(nameFormat(row.name, ...param));
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
	 * Returns the position of the tooltip
	 * @param {object} dataToShow data
	 * @param {string} tWidth Width value of tooltip element
	 * @param {string} tHeight Height value of tooltip element
	 * @param {HTMLElement} element Tooltip element
	 * @returns {object} top, left value
	 * @private
	 */
	tooltipPosition(dataToShow, tWidth: number, tHeight: number, element):
		{top: number, left: number} {
		const $$ = this;
		const {config, scale, state} = $$;
		const {width, height, current, isLegendRight, inputType, event} = state;
		const hasGauge = $$.hasType("gauge") && !config.gauge_fullCircle;
		const hasTreemap = state.hasTreemap;
		const svgLeft = $$.getSvgLeft(true);
		let chartRight = svgLeft + current.width - $$.getCurrentPaddingRight();
		const chartLeft = $$.getCurrentPaddingLeft(true);
		const size = 20;
		let [x, y] = getPointer(event, element);

		// Determine tooltip position
		if ($$.hasArcType()) {
			const raw = inputType === "touch" || $$.hasType("radar");

			if (!raw) {
				y += hasGauge ? height : height / 2;
				x += (width - (isLegendRight ? $$.getLegendWidth() : 0)) / 2;
			}
		} else if (!hasTreemap) {
			const dataScale = scale.x(dataToShow[0].x);

			if (config.axis_rotated) {
				y = dataScale + size;
				x += svgLeft + 100;
				chartRight -= svgLeft;
			} else {
				y -= 5;
				x = svgLeft + chartLeft + size + (scale.zoom ? x : dataScale);
			}
		}

		// when tooltip left + tWidth > chart's width
		if ((x + tWidth + 15) > chartRight) {
			x -= tWidth + (hasTreemap ? 0 : chartLeft);
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
	 * @param {SVGElement} eventRect Event <rect> element
	 * @private
	 */
	showTooltip(selectedData: IDataRow[], eventRect: SVGElement): void {
		const $$ = this;
		const {config, scale, state, $el: {tooltip}} = $$;
		const {bindto} = config.tooltip_contents;
		const dataToShow = selectedData.filter(d => d && isValue($$.getBaseValue(d)));

		if (!tooltip || dataToShow.length === 0 || !config.tooltip_show) {
			return;
		}

		let datum = tooltip.datum();
		let {width = 0, height = 0} = datum || {};
		const dataStr = JSON.stringify(selectedData);

		if (!datum || datum.current !== dataStr) {
			const index = selectedData.concat().sort()[0].index;

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
					current: dataStr,
					width: width = tooltip.property("offsetWidth"),
					height: height = tooltip.property("offsetHeight")
				});

			callFn(config.tooltip_onshown, $$.api, selectedData);
			$$._handleLinkedCharts(true, index);
		}

		if (!bindto) {
			const fnPos = config.tooltip_position?.bind($$.api) || $$.tooltipPosition.bind($$);
			const [x, y] = getPointer(state.event, eventRect); // get mouse event position
			const currPos: any = {x, y};
			const data = selectedData.filter(Boolean)?.shift();

			if (scale.x && data && "x" in data) {
				currPos.xAxis = scale.x(data.x);
			}

			// Get tooltip dimensions
			const pos = fnPos(dataToShow, width, height, eventRect, currPos);

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
			const selectedData = JSON.parse(tooltip.datum().current);

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
	}
};
