/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {mouse as d3Mouse} from "d3-selection";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend, isFunction, isString, isValue, callFn, sanitise} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Initializes the tooltip
	 * @private
	 */
	initTooltip() {
		const $$ = this;
		const config = $$.config;

		$$.tooltip = $$.selectChart
			.style("position", "relative")
			.append("div")
			.attr("class", CLASS.tooltipContainer)
			.style("position", "absolute")
			.style("pointer-events", "none")
			.style("display", "none");

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

			$$.tooltip.html(config.tooltip_contents.call($$,
				$$.data.targets.map(d => $$.addName(d.values[config.tooltip_init_x])),
				$$.axis.getXAxisTickFormat(), $$.getYFormat($$.hasArcType(null, ["radar"])), $$.color));

			$$.tooltip.style("top", config.tooltip_init_position.top)
				.style("left", config.tooltip_init_position.left)
				.style("display", "block");
		}
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
		const valueFormat = config.tooltip_format_value || defaultValueFormat;
		const order = config.tooltip_order;

		const getRowValue = row => $$.getBaseValue(row);
		const getBgColor = $$.levelColor ? row => $$.levelColor(row.value) : row => color(row.id);

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

		let text;
		let row;
		let param;
		let value;

		for (let i = 0, len = d.length; i < len; i++) {
			if (!((row = d[i]) && (getRowValue(row) || getRowValue(row) === 0))) {
				continue;
			}

			if (!text) {
				const title = sanitise(titleFormat ? titleFormat(row.x) : row.x);

				text = `<table class="${$$.CLASS.tooltip}">${
					isValue(title) ? `<tr><th colspan="2">${title}</th></tr>` : ""
				}`;
			}

			param = [row.ratio, row.id, row.index, d];

			if ($$.isAreaRangeType(row)) {
				value = ["high", "low"].map(v => sanitise(
					valueFormat($$.getAreaRangeData(row, v), ...param)
				));

				value = `<b>Mid:</b> ${value} <b>High:</b> ${value[0]} <b>Low:</b> ${value[1]}`;
			} else {
				value = sanitise(valueFormat(getRowValue(row), ...param));
			}

			if (value !== undefined) {
				// Skip elements when their name is set to null
				if (row.name === null) {
					continue;
				}

				const name = sanitise(nameFormat(row.name, ...param));
				const bgcolor = getBgColor(row);

				text += `<tr class="${$$.CLASS.tooltipName}${$$.getTargetSelectorSuffix(row.id)}"><td class="name">`;

				text += $$.patterns ?
					`<svg><rect style="fill:${bgcolor}" width="10" height="10"></rect></svg>` :
					`<span style="background-color:${bgcolor}"></span>`;

				text += `${name}</td><td class="value">${value}</td></tr>`;
			}
		}

		return `${text}</table>`;
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
		let [left, top] = d3Mouse(element);

		const svgLeft = $$.getSvgLeft(true);
		let chartRight = svgLeft + $$.currentWidth - $$.getCurrentPaddingRight();

		top += 20;

		// Determine tooltip position
		if ($$.hasArcType()) {
			const raw = $$.inputType === "touch" || $$.hasType("radar");

			if (!raw) {
				top += $$.height / 2;
				left += ($$.width - ($$.isLegendRight ? $$.getLegendWidth() : 0)) / 2;
			}
		} else {
			const dataScale = $$.x(dataToShow[0].x);

			if (config.axis_rotated) {
				top = dataScale + 20;
				left += svgLeft + 100;
				chartRight -= svgLeft;
			} else {
				top -= 5;
				left = svgLeft + $$.getCurrentPaddingLeft(true) + 20 + ($$.zoomScale ? left : dataScale);
			}
		}

		const right = left + tWidth;

		if (right > chartRight) {
			// 20 is needed for Firefox to keep tooltip width
			left -= right - chartRight + 20;
		}

		if (top + tHeight > $$.currentHeight) {
			top -= tHeight + 30;
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
		const forArc = $$.hasArcType(null, ["radar"]);
		const dataToShow = selectedData.filter(d => d && isValue($$.getBaseValue(d)));
		const positionFunction = config.tooltip_position || $$.tooltipPosition;

		if (dataToShow.length === 0 || !config.tooltip_show) {
			return;
		}

		const datum = $$.tooltip.datum();
		let width = (datum && datum.width) || 0;
		let height = (datum && datum.height) || 0;

		if (!datum || datum.current !== JSON.stringify(selectedData)) {
			const html = config.tooltip_contents.call(
				$$,
				selectedData,
				$$.axis.getXAxisTickFormat(),
				$$.getYFormat(forArc),
				$$.color
			);

			callFn(config.tooltip_onshow, $$);

			// set tooltip content
			$$.tooltip.html(html)
				.style("display", "block")
				.datum({
					current: JSON.stringify(selectedData),
					width: width = $$.tooltip.property("offsetWidth"),
					height: height = $$.tooltip.property("offsetHeight")
				});

			callFn(config.tooltip_onshown, $$);
			$$._handleLinkedCharts(true, selectedData[0].index);
		}

		// Get tooltip dimensions
		const position = positionFunction.call(this, dataToShow, width, height, element);

		// Set tooltip position
		$$.tooltip
			.style("top", `${position.top}px`)
			.style("left", `${position.left}px`);
	},

	/**
	 * Hide the tooltip
	 * @private
	 */
	hideTooltip() {
		const $$ = this;
		const config = $$.config;

		callFn(config.tooltip_onhide, $$);

		// hide tooltip
		this.tooltip.style("display", "none").datum(null);

		callFn(config.tooltip_onhidden, $$);
		$$._handleLinkedCharts(false);
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

			$$.api.internal.charts.forEach(c => {
				if (c !== $$.api) {
					const internal = c.internal;
					const isLinked = internal.config.tooltip_linked;
					const name = internal.config.tooltip_linked_name;
					const isInDom = document.body.contains(c.element);

					if (isLinked && linkedName === name && isInDom) {
						const isShowing = internal.tooltip.style("display") === "block";

						// prevent throwing error for non-paired linked indexes
						try {
							isShowing ^ show && c.tooltip[isShowing ? "hide" : "show"]({index});
						} catch (e) {}
					}
				}
			});
		}
	}
});
