/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {mouse as d3Mouse} from "d3";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend, isValue, sanitise, isString} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Initializes the tooltip
	 * @private
	 */
	initTooltip() {
		const $$ = this;
		const config = $$.config;
		let i;

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
				config.tooltip_init_x = $$.parseDate(config.tooltip_init_x);

				for (i = 0; i < $$.data.targets[0].values.length; i++) {
					if (($$.data.targets[0].values[i].x - config.tooltip_init_x) === 0) { break; }
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
		const orderAsc = $$.isOrderAsc();
		let text;
		let i;
		let title;
		let value;
		let name;
		let bgcolor;

		if (config.data_groups.length === 0) {
			d.sort((a, b) => {
				const v1 = a ? a.value : null;
				const v2 = b ? b.value : null;

				return orderAsc ? v1 - v2 : v2 - v1;
			});
		} else {
			const ids = $$.orderTargets($$.data.targets).map(i2 => i2.id);

			d.sort((a, b) => {
				let v1 = a ? a.value : null;
				let v2 = b ? b.value : null;

				if (v1 > 0 && v2 > 0) {
					v1 = a ? ids.indexOf(a.id) : null;
					v2 = b ? ids.indexOf(b.id) : null;
				}
				return orderAsc ? v1 - v2 : v2 - v1;
			});
		}

		for (i = 0; i < d.length; i++) {
			if (!(d[i] && (d[i].value || d[i].value === 0))) {
				continue;
			}

			if (!text) {
				title = sanitise(titleFormat ? titleFormat(d[i].x) : d[i].x);
				text = (title || title === 0 ? `<tr><th colspan="2">${title}</th></tr>` : "");
				text = `<table class="${$$.CLASS.tooltip}">${text}`;
			}

			value = sanitise(valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index, d));

			if (value !== undefined) {
				// Skip elements when their name is set to null
				if (d[i].name === null) { continue; }
				name = sanitise(nameFormat(d[i].name, d[i].ratio, d[i].id, d[i].index));
				bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

				text += `<tr class="${$$.CLASS.tooltipName}${$$.getTargetSelectorSuffix(d[i].id)}">` +
					`<td class="name"><span style="background-color:${bgcolor}"></span>${name}</td>` +
					`<td class="value">${value}</td>` +
					`</tr>`;
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

		// Determin tooltip position
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
	 * @param {Object} data
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

		$$.tooltip.html(
			config.tooltip_contents.call(
				$$,
				selectedData,
				$$.axis.getXAxisTickFormat(),
				$$.getYFormat(forArc),
				$$.color
			))
			.style("display", "block");

		// Get tooltip dimensions
		const tWidth = $$.tooltip.property("offsetWidth");
		const tHeight = $$.tooltip.property("offsetHeight");
		const position = positionFunction.call(this, dataToShow, tWidth, tHeight, element);

		// Set tooltip
		$$.tooltip
			.style("top", `${position.top}px`)
			.style("left", `${position.left}px`);
	},
	/**
	 * Hide the tooltip
	 * @private
	 */
	hideTooltip() {
		this.tooltip.style("display", "none");
	},
});
