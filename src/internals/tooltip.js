/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	mouse as d3Mouse
} from "d3-selection";
import ChartInternal from "./ChartInternal";
import {document} from "./browser";
import CLASS from "../config/classes";
import {extend, isFunction, isObject, isString, isValue, callFn, sanitise, tplProcess, isUndefined} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Initializes the tooltip
	 * @private
	 */
	initTooltip() {
		const $$ = this;
		const config = $$.config;
		const bindto = config.tooltip_contents.bindto;

		$$.tooltip = d3Select(bindto);

		if ($$.tooltip.empty()) {
			$$.tooltip = $$.selectChart
				.style("position", "relative")
				.append("div")
				.attr("class", CLASS.tooltipContainer)
				.style("position", "absolute")
				.style("pointer-events", "none")
				.style("display", "none");
		}

		// Show tooltip if needed
		if (config.tooltip_init_show) {
			if ($$.isTimeSeries() && isString(config.tooltip_init_x)) {
				const targets = $$.data.targets[0];
				let i;
				let val;

				config.tooltip_init_x = $$.parseDate(config.tooltip_init_x);

				for (i = 0; (val = targets.values[i]); i++) {
					if ((val.x - config.tooltip_init_x) === 0) {
						break;
					}
				}

				config.tooltip_init_x = i;
			}

			$$.tooltip.html($$.getTooltipHTML(
				$$.data.targets.map(d => $$.addName(d.values[config.tooltip_init_x])),
				$$.axis.getXAxisTickFormat(),
				$$.getYFormat($$.hasArcType(null, ["radar"])),
				$$.color
			));

			if (!bindto) {
				$$.tooltip.style("top", config.tooltip_init_position.top)
					.style("left", config.tooltip_init_position.left)
					.style("display", "block");
			}
		}

		$$.bindTooltipResizePos();
	},

	/**
	 * Get the tooltip HTML string
	 * @param  {...any} args
	 * @private
	 * @return {String} Formatted HTML string
	 */
	getTooltipHTML(...args) {
		const $$ = this;
		const config = $$.config;

		return isFunction(config.tooltip_contents) ?
			config.tooltip_contents.call($$, ...args) : $$.getTooltipContent(...args);
	},

	/**
	 * Returns the tooltip content(HTML string)
	 * @param {Object} d data
	 * @param {Function} defaultTitleFormat Default title format
	 * @param {Function} defaultValueFormat Default format for each data value in the tooltip.
	 * @param {Function} color Color function
	 * @returns {String} html
	 * @private
	 */
	getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) {
		const $$ = this;
		const config = $$.config;
		const titleFormat = config.tooltip_format_title || defaultTitleFormat;
		const nameFormat = config.tooltip_format_name || (name => name);
		const valueFormat = config.tooltip_format_value || ($$.isStackNormalized() ? ((v, ratio) => `${(ratio * 100).toFixed(2)}%`) : defaultValueFormat);
		const order = config.tooltip_order;
		const getRowValue = row => ($$.isBubbleZType(row) ? $$.getBubbleZData(row.value, "z") : $$.getBaseValue(row));
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
			d.sort(order);
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
				const title = sanitise(titleFormat ? titleFormat(row.x) : row.x);

				text = tplProcess(tpl[0], {
					CLASS_TOOLTIP: CLASS.tooltip,
					TITLE: isValue(title) ? (
						tplStr ? title : `<tr><th colspan="2">${title}</th></tr>`
					) : ""
				});
			}

			param = [row.ratio, row.id, row.index, d];
			value = sanitise(valueFormat(getRowValue(row), ...param));

			if ($$.isAreaRangeType(row)) {
				const [high, low] = ["high", "low"].map(v => sanitise(
					valueFormat($$.getAreaRangeData(row, v), ...param)
				));

				value = `<b>Mid:</b> ${value} <b>High:</b> ${high} <b>Low:</b> ${low}`;
			}

			if (value !== undefined) {
				// Skip elements when their name is set to null
				if (row.name === null) {
					continue;
				}

				const name = sanitise(nameFormat(row.name, ...param));
				const color = getBgColor(row);
				const contentValue = {
					CLASS_TOOLTIP_NAME: CLASS.tooltipName + $$.getTargetSelectorSuffix(row.id),
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
	 * @param {String} tplStr
	 * @return {String} Template string
	 * @private
	 */
	getTooltipContentTemplate(tplStr) {
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
	 * @param {Object} dataToShow data
	 * @param {String} tWidth Width value of tooltip element
	 * @param {String} tHeight Height value of tooltip element
	 * @param {HTMLElement} element
	 * @returns {Object} top, left value
	 * @private
	 */
	tooltipPosition(dataToShow, tWidth, tHeight, element) {
		const $$ = this;
		const config = $$.config;
		const hasGauge = $$.hasType("gauge") && !config.gauge_fullCircle;
		const svgLeft = $$.getSvgLeft(true);
		let [left, top] = d3Mouse(element);
		let chartRight = svgLeft + $$.currentWidth - $$.getCurrentPaddingRight(true);
		const chartLeft = $$.getCurrentPaddingLeft(true);
		const size = 20;

		top += size;

		// Determine tooltip position
		if ($$.hasArcType()) {
			const raw = $$.inputType === "touch" || $$.hasType("radar");

			if (!raw) {
				top += hasGauge ? $$.height : $$.height / 2;
				left += ($$.width - ($$.isLegendRight ? $$.getLegendWidth() : 0)) / 2;
			}
		} else {
			const dataScale = $$.x(dataToShow[0].x);

			if (config.axis_rotated) {
				top = dataScale + size;
				left += svgLeft + 100;
				chartRight -= svgLeft;
			} else {
				top -= 5;
				left = svgLeft + chartLeft + size + ($$.zoomScale ? left : dataScale);
			}
		}

		// when tooltip left + tWidth > chart's width
		if ((left + tWidth + 15) > chartRight) {
			left -= (svgLeft + tWidth + chartLeft);
		}

		if (top + tHeight > $$.currentHeight) {
			top -= hasGauge ? tHeight * 3 : tHeight + 30;
		}

		if (top < 0) {
			top = 0;
		}

		return {top, left};
	},

	/**
	 * Show the tooltip
	 * @private
	 * @param {Object} selectedData
	 * @param {HTMLElement} element
	 */
	showTooltip(selectedData, element) {
		const $$ = this;
		const config = $$.config;
		const bindto = config.tooltip_contents.bindto;
		const forArc = $$.hasArcType(null, ["radar"]);
		const dataToShow = selectedData.filter(d => d && isValue($$.getBaseValue(d)));

		if (dataToShow.length === 0 || !config.tooltip_show) {
			return;
		}

		let datum = $$.tooltip.datum();
		let {width = 0, height = 0} = datum || {};
		const dataStr = JSON.stringify(selectedData);

		if (!datum || datum.current !== dataStr) {
			const index = selectedData.concat().sort()[0].index;

			callFn(config.tooltip_onshow, $$, $$.api, selectedData);

			// set tooltip content
			$$.tooltip
				.html($$.getTooltipHTML(
					selectedData,
					$$.axis.getXAxisTickFormat(),
					$$.getYFormat(forArc),
					$$.color
				))
				.style("display", null)
				.style("visibility", null) // for IE9
				.datum(datum = {
					index,
					current: dataStr,
					width: width = $$.tooltip.property("offsetWidth"),
					height: height = $$.tooltip.property("offsetHeight")
				});

			callFn(config.tooltip_onshown, $$, $$.api, selectedData);
			$$._handleLinkedCharts(true, index);
		}

		if (!bindto) {
			const fnPos = config.tooltip_position || $$.tooltipPosition;

			// Get tooltip dimensions
			const pos = fnPos.call(this, dataToShow, width, height, element);

			["top", "left"].forEach(v => {
				const value = pos[v];

				$$.tooltip.style(v, `${value}px`);

				// Remember left pos in percentage to be used on resize call
				if (v === "left" && !datum.xPosInPercent) {
					datum.xPosInPercent = value / $$.currentWidth * 100;
				}
			});
		}
	},

	/**
	 * Adjust tooltip position on resize event
	 * @private
	 */
	bindTooltipResizePos() {
		const $$ = this;
		const {resizeFunction, tooltip} = $$;

		resizeFunction.add(() => {
			if (tooltip.style("display") === "block") {
				const {currentWidth} = $$;
				const {width, xPosInPercent} = tooltip.datum();
				let value = currentWidth / 100 * xPosInPercent;
				const diff = currentWidth - (value + width);

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
	 * @param {Boolean} force Force to hide
	 * @private
	 */
	hideTooltip(force) {
		const $$ = this;
		const {api, config, tooltip} = $$;

		if (tooltip.style("display") !== "none" && (!config.tooltip_doNotHide || force)) {
			const selectedData = JSON.parse(this.tooltip.datum().current);

			callFn(config.tooltip_onhide, $$, api, selectedData);

			// hide tooltip
			tooltip
				.style("display", "none")
				.style("visibility", "hidden") // for IE9
				.datum(null);

			callFn(config.tooltip_onhidden, $$, api, selectedData);
		}
	},

	/**
	 * Toggle display for linked chart instances
	 * @param {Boolean} show true: show, false: hide
	 * @param {Number} index x Axis index
	 * @private
	 */
	_handleLinkedCharts(show, index) {
		const $$ = this;

		if ($$.config.tooltip_linked) {
			const linkedName = $$.config.tooltip_linked_name;

			($$.api.internal.charts || []).forEach(c => {
				if (c !== $$.api) {
					const config = c.internal.config;
					const isLinked = config.tooltip_linked;
					const name = config.tooltip_linked_name;
					const isInDom = document.body.contains(c.element);

					if (isLinked && linkedName === name && isInDom) {
						const data = c.internal.tooltip.data()[0];
						const isNotSameIndex = index !== (data && data.index);

						// prevent throwing error for non-paired linked indexes
						try {
							if (show && isNotSameIndex) {
								c.tooltip.show({index});
							} else if (!show) {
								c.tooltip.hide();
							}
						} catch (e) {}
					}
				}
			});
		}
	}
});
