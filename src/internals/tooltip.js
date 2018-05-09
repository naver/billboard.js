/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {mouse as d3Mouse} from "d3-selection";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend, isFunction, isString, isValue, sanitise} from "./util";

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
				const len = targets.values.length;
				let i;

				config.tooltip_init_x = $$.parseDate(config.tooltip_init_x);

				for (i = 0; i < len; i++) {
					if ((targets.values[i].x - config.tooltip_init_x) === 0) {
						break;
					}
				}

				config.tooltip_init_x = i;
			}

			$$.tooltip.html(config.tooltip_contents.call($$,
				$$.data.targets.map(d => $$.addName(d.values[config.tooltip_init_x])),
				$$.axis.getXAxisTickFormat(), $$.getYFormat($$.hasArcType()), $$.color));

			$$.tooltip.style("top", config.tooltip_init_position.top)
				.style("left", config.tooltip_init_position.left)
				.style("display", "block");
		}
	},

	/**
	 * Returns the tooltip content(HTML string)
	 * @private
	 * @param {Object} data
	 * @param {Function} default title format
	 * @param {Function} default format for each data value in the tooltip.
	 * @param {Object} $$.color(generateColor())
	 * @returns {string} html
	 */
	getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) {
		const $$ = this;
		const config = $$.config;
		const titleFormat = config.tooltip_format_title || defaultTitleFormat;
		const nameFormat = config.tooltip_format_name || (name => name);
		const valueFormat = config.tooltip_format_value || defaultValueFormat;
		const order = config.tooltip_order;
		let text;
		let title;
		let hiValue;
		let loValue;
		let value;
		let name;
		let bgcolor;

		const getRowValue = function(row) {
			return $$.isAreaRangeType(row) ? $$.getAreaRangeData(row, "mid") : row.value;
		};

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

		for (let i = 0, row, len = d.length; i < len; i++) {
			if (!((row = d[i]) && (getRowValue(row) || getRowValue(row) === 0))) {
				continue;
			}

			const isAreaRangeType = $$.isAreaRangeType(row);

			if (!text) {
				title = sanitise(titleFormat ? titleFormat(row.x) : row.x);
				text = (title || title === 0 ? `<tr><th colspan="2">${title}</th></tr>` : "");
				text = `<table class="${$$.CLASS.tooltip}">${text}`;
			}

			if (isAreaRangeType) {
				hiValue = sanitise(valueFormat($$.getAreaRangeData(row, "high"), row.ratio, row.id, row.index, d));
				loValue = sanitise(valueFormat($$.getAreaRangeData(row, "low"), row.ratio, row.id, row.index, d));
			}

			value = sanitise(valueFormat(getRowValue(row), row.ratio, row.id, row.index, d));

			if (value !== undefined) {
				// Skip elements when their name is set to null
				if (row.name === null) {
					continue;
				}

				name = sanitise(nameFormat(row.name, row.ratio, row.id, row.index));
				bgcolor = $$.levelColor ? $$.levelColor(row.value) : color(row.id);

				text += `<tr class="${$$.CLASS.tooltipName}${$$.getTargetSelectorSuffix(row.id)}"><td class="name">`;

				text += $$.patterns ?
					`<svg><rect style="fill:${bgcolor}" width="10" height="10"></rect></svg>` :
					`<span style="background-color:${bgcolor}"></span>`;


				text += `${name}</td><td class="value">${
					isAreaRangeType ? `<b>Mid:</b> ${value} <b>High:</b> ${hiValue} <b>Low:</b> ${loValue}` : value
				}</td></tr>`;
			}
		}

		return `${text}</table>`;
	},

	/**
	 * Returns the position of the tooltip
	 * @private
	 * @param {Object} data
	 * @param {String} width
	 * @param {String} hHeight
	 * @param {HTMLElement} element
	 * @returns {Object} top, left value
	 */
	tooltipPosition(dataToShow, tWidth, tHeight, element) {
		const $$ = this;
		const config = $$.config;
		const forArc = $$.hasArcType();
		const isTouch = ($$.inputType === "touch");
		const mouse = d3Mouse(element);
		let svgLeft;
		let tooltipLeft;
		let tooltipRight;
		let tooltipTop;
		let chartRight;

		// Determine tooltip position
		if (forArc) {
			tooltipLeft = isTouch ? mouse[0] :
				(($$.width - ($$.isLegendRight ? $$.getLegendWidth() : 0)) / 2) + mouse[0];
			tooltipTop = isTouch ? mouse[1] + 20 : ($$.height / 2) + mouse[1] + 20;
		} else {
			svgLeft = $$.getSvgLeft(true);

			if (config.axis_rotated) {
				tooltipLeft = svgLeft + mouse[0] + 100;
				tooltipRight = tooltipLeft + tWidth;
				chartRight = $$.currentWidth - $$.getCurrentPaddingRight();
				tooltipTop = $$.x(dataToShow[0].x) + 20;
			} else {
				tooltipLeft = svgLeft + $$.getCurrentPaddingLeft(true) + $$.x(dataToShow[0].x) + 20;
				tooltipRight = tooltipLeft + tWidth;
				chartRight = svgLeft + $$.currentWidth - $$.getCurrentPaddingRight();
				tooltipTop = mouse[1] + 15;
			}

			if (tooltipRight > chartRight) {
				// 20 is needed for Firefox to keep tooltip width
				tooltipLeft -= tooltipRight - chartRight + 20;
			}

			if (tooltipTop + tHeight > $$.currentHeight) {
				tooltipTop -= tHeight + 30;
			}
		}

		if (tooltipTop < 0) {
			tooltipTop = 0;
		}

		return {
			top: tooltipTop,
			left: tooltipLeft
		};
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
		const forArc = $$.hasArcType();
		const dataToShow = selectedData.filter(d => d && isValue(d.value));
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

			isFunction(config.tooltip_onshow) && config.tooltip_onshow.call($$);

			// set tooltip content
			$$.tooltip.html(html)
				.style("display", "block")
				.datum({
					current: JSON.stringify(selectedData),
					width: width = $$.tooltip.property("offsetWidth"),
					height: height = $$.tooltip.property("offsetHeight")
				});

			isFunction(config.tooltip_onshown) && config.tooltip_onshown.call($$);
			$$._handleLinkedCharts(true, selectedData[0].x);
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

		isFunction(config.tooltip_onhide) && config.tooltip_onhide.call($$);

		// hide tooltip
		this.tooltip.style("display", "none").datum(null);

		isFunction(config.tooltip_onhidden) && config.tooltip_onhidden.call($$);
		$$._handleLinkedCharts(false);
	},

	/**
	 * Toggle display for linked chart instances
	 * @param {Boolean} show true: show, false: hide
	 * @param {Number} x x Axis coordinate
	 * @private
	 */
	_handleLinkedCharts(show, x) {
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

						isShowing ^ show &&
							c.tooltip[isShowing ? "hide" : "show"]({x});
					}
				}
			});
		}
	}
});
