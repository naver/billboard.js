/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { document as doc } from "../../module/browser.js";
import { isEmpty, isFunction, isObject, isString, isUndefined, isValue } from "../../module/util/type-checks.js";
import { sanitize } from "../../module/sanitize.js";
import { callFn, parseDate, tplProcess } from "../../module/util/object.js";
import { getBoundingRect, getPointer, getTransformCTM, hasViewBox } from "../../module/util/dom.js";
import { $ARC, $TOOLTIP } from "../../config/classes.js";
import { select } from "d3-selection";
//#region src/ChartInternal/internals/tooltip.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
const RE_WHITESPACE = /(\r?\n|\t)/g;
const RE_TOOLTIP_TPL = /{{(.*)}}/;
var tooltip_default = {
	/**
	* Initializes the tooltip
	* @private
	*/
	initTooltip() {
		const $$ = this;
		const { config, $el } = $$;
		$el.tooltip = select(config.tooltip_contents.bindto);
		if ($el.tooltip.empty()) $el.tooltip = $el.chart.append("div").attr("class", $TOOLTIP.tooltipContainer).style("position", "absolute").style("pointer-events", "none").style("display", "none");
		$$.bindTooltipResizePos();
	},
	/**
	* Show tooltip at initialization.
	* Is called only when tooltip.init.show=true option is set
	* @private
	*/
	initShowTooltip() {
		const $$ = this;
		const { config, $el, state: { hasAxis, hasRadar } } = $$;
		if (config.tooltip_init_show) {
			const isArc = !(hasAxis || hasRadar);
			if ($$.axis?.isTimeSeries() && isString(config.tooltip_init_x)) config.tooltip_init_x = parseDate.call($$, config.tooltip_init_x);
			$$.api.tooltip.show({ data: { [isArc ? "index" : "x"]: config.tooltip_init_x } });
			const position = config.tooltip_init_position;
			if (!config.tooltip_contents.bindto && !isEmpty(position)) {
				const { top = 0, left = 50 } = position;
				$el.tooltip.style("top", isString(top) ? top : `${top}px`).style("left", isString(left) ? left : `${left}px`).style("display", null);
			}
		}
	},
	/**
	* Get the tooltip HTML string
	* @param  {Array} args Arguments
	* @returns {string} Formatted HTML string
	* @private
	*/
	getTooltipHTML(...args) {
		const $$ = this;
		const { api, config } = $$;
		return sanitize(isFunction(config.tooltip_contents) ? config.tooltip_contents.bind(api)(...args) : $$.getTooltipContent(...args));
	},
	/**
	* Returns the tooltip content(HTML string)
	* @param {object} d data
	* @param {function} defaultTitleFormat Default title format
	* @param {function} defaultValueFormat Default format for each data value in the tooltip.
	* @param {function} color Color function
	* @returns {string} html
	* @private
	*/
	getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) {
		const $$ = this;
		const { api, config, state, $el } = $$;
		const titleFn = config.tooltip_format_title;
		const nameFn = config.tooltip_format_name;
		const valueFn = config.tooltip_format_value;
		const titleFormat = isFunction(titleFn) ? titleFn.bind(api) : defaultTitleFormat;
		const nameFormat = isFunction(nameFn) ? nameFn.bind(api) : ((name) => name);
		const boundValueFn = isFunction(valueFn) ? valueFn.bind(api) : null;
		const valueFormat = (v, ratio, id, index) => {
			let fn = boundValueFn;
			if (!fn) {
				if (state.hasTreemap || $$.isStackNormalized() && (!$$.isStackNormalizedPerGroup() || $$.isGrouped(id))) fn = (v, ratio) => `${(ratio * 100).toFixed(2)}%`;
				else fn = defaultValueFormat;
			}
			return fn(v, ratio, id, index);
		};
		const order = config.tooltip_order;
		const getRowValue = (row) => $$.axis && $$.isBubbleZType(row) ? $$.getBubbleZData(row.value, "z") : $$.getBaseValue(row);
		const getBgColor = $$.levelColor ? (row) => $$.levelColor(row.value) : (row) => color(row);
		const contents = config.tooltip_contents;
		const tplStr = contents.template;
		const targetIds = $$.mapToTargetIds();
		if (order === null && config.data_groups.length) {
			const ids = $$.orderTargets($$.data.targets).map((i2) => i2.id).reverse();
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
		} else if (isFunction(order)) d.sort(order.bind(api));
		const tpl = $$.getTooltipContentTemplate(tplStr);
		const len = d.length;
		let text;
		let row;
		let param;
		let value;
		let i = 0;
		for (; i < len; i++) {
			row = d[i];
			const rowValue = row && getRowValue(row);
			if (!row || !(rowValue || rowValue === 0)) continue;
			if (isUndefined(text)) {
				const title = (state.hasAxis || state.hasRadar) && titleFormat(row.x);
				text = tplProcess(tpl[0], {
					CLASS_TOOLTIP: $TOOLTIP.tooltip,
					TITLE: isValue(title) ? tplStr ? title : `<tr><th colspan="2">${title}</th></tr>` : ""
				});
			}
			if (!row.ratio && $el.arcs) {
				param = ["arc", $$.$el.arcs.select(`path.${$ARC.arc}-${row.id}`).data()[0]];
				row.ratio = $$.getRatio(...param);
			}
			param = [
				row.ratio,
				row.id,
				row.index
			];
			if ($$.isAreaRangeType(row)) {
				const [high, low] = ["high", "low"].map((v) => valueFormat($$.getRangedData(row, v), ...param));
				value = `<b>Mid:</b> ${valueFormat(getRowValue(row), ...param)} <b>High:</b> ${high} <b>Low:</b> ${low}`;
			} else if ($$.isCandlestickType(row)) {
				const [open, high, low, close, volume] = [
					"open",
					"high",
					"low",
					"close",
					"volume"
				].map((v) => {
					return $$.getRangedData(row, v, "candlestick") ? valueFormat($$.getRangedData(row, v, "candlestick"), ...param) : void 0;
				});
				value = `<b>Open:</b> ${open} <b>High:</b> ${high} <b>Low:</b> ${low} <b>Close:</b> ${close}${volume ? ` <b>Volume:</b> ${volume}` : ""}`;
			} else if ($$.isBarRangeType(row)) {
				const { value: rangeValue, id, index } = row;
				value = `${valueFormat(rangeValue, void 0, id, index)}`;
			} else value = valueFormat(getRowValue(row), ...param);
			if (value !== void 0) {
				if (row.name === null) continue;
				const name = nameFormat(row.name ?? row.id, ...param);
				const color = getBgColor(row);
				const contentValue = {
					CLASS_TOOLTIP_NAME: $TOOLTIP.tooltipName + $$.getTargetSelectorSuffix(row.id),
					COLOR: tplStr || !$$.patterns ? color : `<svg><rect style="fill:${color}" width="10" height="10"></rect></svg>`,
					NAME: name,
					VALUE: value
				};
				if (tplStr && isObject(contents.text)) {
					const index = targetIds.indexOf(row.id);
					Object.keys(contents.text).forEach((key) => {
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
	getTooltipContentTemplate(tplStr) {
		return (tplStr || `<table class="{=CLASS_TOOLTIP}"><tbody>
				{=TITLE}
				{{<tr class="{=CLASS_TOOLTIP_NAME}">
					<td class="name">${this.patterns ? `{=COLOR}` : `<span style="background-color:{=COLOR}"></span>`}{=NAME}</td>
					<td class="value">{=VALUE}</td>
				</tr>}}
			</tbody></table>`).replace(RE_WHITESPACE, "").split(RE_TOOLTIP_TPL);
	},
	/**
	* Update tooltip position coordinate
	* @param {object} dataToShow Data object
	* @param {SVGElement} eventTarget Event element
	* @private
	*/
	setTooltipPosition(dataToShow, eventTarget) {
		const $$ = this;
		const { config, scale, state, $el: { eventRect, tooltip, svg } } = $$;
		const { bindto } = config.tooltip_contents;
		const isRotated = config.axis_rotated;
		const datum = tooltip?.datum();
		if (!bindto && datum) {
			const data = dataToShow ?? datum.data;
			const [x, y] = getPointer(state.event, eventTarget ?? eventRect?.node());
			const currPos = {
				x,
				y
			};
			if (state.hasAxis && scale.x && datum && "x" in datum) {
				const getYPos = (value = 0, id, axisId = "y") => {
					const scaleFn = scale[id ? $$.axis?.getId(id) : axisId];
					return scaleFn ? scaleFn(value) + (isRotated ? state.margin.left : state.margin.top) : 0;
				};
				currPos.xAxis = scale.x(datum.x) + (config.tooltip_position ? isRotated ? state.margin.top : state.margin.left : 0);
				if (data.length === 1) currPos.yAxis = getYPos(data[0].value, data[0].id);
				else currPos.yAxis = getYPos;
			}
			const { width = 0, height = 0 } = datum;
			const pos = config.tooltip_position?.bind($$.api)(data, width, height, eventRect?.node(), currPos) ?? (svg && hasViewBox(svg) ? $$.getTooltipPositionViewBox.bind($$)(width, height, currPos) : $$.getTooltipPosition.bind($$)(width, height, currPos));
			["top", "left"].forEach((v) => {
				const value = pos[v];
				tooltip.style(v, `${value}px`);
				if (v === "left" && !datum.xPosInPercent) datum.xPosInPercent = value / state.current.width * 100;
			});
		}
	},
	/**
	* Get tooltip position when svg has vieBox attribute
	* @param {number} tWidth Tooltip width value
	* @param {number} tHeight Tooltip height value
	* @param {object} currPos Current event position value from SVG coordinate
	* @returns {object} top, left value
	*/
	getTooltipPositionViewBox(tWidth, tHeight, currPos) {
		const $$ = this;
		const { $el: { eventRect, svg }, config, state } = $$;
		const isRotated = config.axis_rotated;
		const hasArcType = $$.hasArcType() || state.hasFunnel || state.hasTreemap;
		const target = (hasArcType ? svg : eventRect)?.node() ?? state.event.target;
		let { x, y } = currPos;
		if (state.hasAxis) {
			x = isRotated ? x : currPos.xAxis;
			y = isRotated ? currPos.xAxis : y;
		}
		const ctm = getTransformCTM(target, x, y, false);
		const rect = getBoundingRect(target);
		const size = getTransformCTM(target, 20, 0, false).x;
		let top = ctm.y;
		let left = ctm.x + tWidth / 2 + size;
		if (hasArcType) {
			if (state.hasFunnel || state.hasTreemap || state.hasRadar) {
				left -= tWidth / 2 + size;
				top += tHeight;
			} else {
				top += rect.height / 2;
				left += rect.width / 2 - (tWidth - size);
			}
		}
		if (left + tWidth > rect.width) left = rect.width - tWidth - size;
		if (top + tHeight > rect.height) top -= tHeight * 2;
		return {
			top,
			left
		};
	},
	/**
	* Returns the position of the tooltip
	* @param {string} tWidth Width value of tooltip element
	* @param {string} tHeight Height value of tooltip element
	* @param {object} currPos Current mouse position
	* @returns {object} top, left value
	* @private
	*/
	getTooltipPosition(tWidth, tHeight, currPos) {
		const $$ = this;
		const { config, scale, state } = $$;
		const { width, height, current, hasFunnel, hasRadar, hasTreemap, isLegendRight, inputType } = state;
		const hasGauge = $$.hasType("gauge") && !config.gauge_fullCircle;
		const isRotated = config.axis_rotated;
		const hasArcType = $$.hasArcType();
		const svgLeft = state.isCanvasMode ? 0 : $$.getSvgLeft(true);
		let chartRight = svgLeft + current.width - $$.getCurrentPaddingByDirection("right");
		const size = 20;
		let { x, y } = currPos;
		if (hasRadar) {
			x += x >= width / 2 ? 15 : -(tWidth + 15);
			y += 15;
		} else if (hasArcType) {
			if (inputType !== "touch") {
				let titlePadding = $$.getTitlePadding?.() ?? 0;
				if (titlePadding && hasGauge && config.arc_rangeText_values?.length) titlePadding += 10;
				x += (width - (isLegendRight ? $$.getLegendWidth() : 0)) / 2;
				y += (hasGauge ? height : height / 2 + tHeight) + titlePadding;
			}
		} else if (hasFunnel || hasTreemap) y += tHeight;
		else {
			const padding = {
				top: $$.getCurrentPaddingByDirection("top", true),
				left: $$.getCurrentPaddingByDirection("left", true)
			};
			if (isRotated) {
				x += svgLeft + padding.left + size;
				y = padding.top + currPos.xAxis + size;
				chartRight -= svgLeft;
			} else {
				x = svgLeft + padding.left + size + (scale.zoom ? x : currPos.xAxis);
				y += padding.top - 5;
			}
		}
		if (x + tWidth + 15 > chartRight) x -= tWidth + (hasFunnel || hasTreemap || hasArcType ? 0 : isRotated ? 40 : 38);
		if (y + tHeight > current.height) {
			const gap = hasTreemap ? tHeight + 10 : 30;
			y -= hasGauge ? tHeight * 1.5 : tHeight + gap;
		}
		const pos = {
			top: y,
			left: x
		};
		if (pos.top < 0) pos.top = 0;
		if (pos.left < 0) pos.left = 0;
		return pos;
	},
	/**
	* Show the tooltip
	* @param {object} selectedData Data object
	* @param {SVGElement} eventTarget Event element
	* @private
	*/
	showTooltip(selectedData, eventTarget) {
		const $$ = this;
		const { config, $el: { tooltip } } = $$;
		if (!tooltip || !config.tooltip_show) return;
		let dataToShow = null;
		let dataToShowCount = 0;
		let dataStr = `${$$.data.targets.length}:`;
		let firstData;
		for (let i = 0; i < selectedData.length; i++) {
			const d = selectedData[i];
			i > 0 && (dataStr += ",");
			dataStr += `${d?.index}|${d?.id}|${d?.value}`;
			!firstData && d && (firstData = d);
			if (d && isValue($$.getBaseValue(d))) {
				dataToShowCount++;
				dataToShow?.push(d);
			} else if (!dataToShow) dataToShow = selectedData.slice(0, i);
		}
		if (dataToShowCount === 0 || !firstData) return;
		const datum = tooltip.datum();
		let positionData = dataToShow;
		if (!datum || datum.current !== dataStr) {
			const { index, x } = firstData;
			if (!positionData) positionData = selectedData.slice();
			callFn(config.tooltip_onshow, $$.api, selectedData);
			tooltip.html($$.getTooltipHTML(selectedData, $$.axis ? $$.axis.getXAxisTickFormat() : $$.categoryName.bind($$), $$.getDefaultValueFormat(), $$.color)).style("display", null).style("visibility", null);
			tooltip.datum({
				index,
				x,
				current: dataStr,
				data: selectedData,
				width: tooltip.property("offsetWidth"),
				height: tooltip.property("offsetHeight")
			});
			callFn(config.tooltip_onshown, $$.api, selectedData);
			$$._handleLinkedCharts(true, index);
		}
		$$.setTooltipPosition(positionData || selectedData, eventTarget);
	},
	/**
	* Adjust tooltip position on resize event
	* @private
	*/
	bindTooltipResizePos() {
		const { resizeFunction, state, $el: { tooltip } } = this;
		resizeFunction.add(() => {
			if (tooltip.style("display") === "block") {
				const { current } = state;
				const { width, xPosInPercent } = tooltip.datum();
				let value = current.width / 100 * xPosInPercent;
				const diff = current.width - (value + width);
				if (diff < 0) value += diff;
				tooltip.style("left", `${value}px`);
			}
		});
	},
	/**
	* Hide the tooltip
	* @param {boolean} force Force to hide
	* @private
	*/
	hideTooltip(force) {
		const { api, config, $el: { tooltip } } = this;
		if (tooltip && tooltip.style("display") !== "none" && (!config.tooltip_doNotHide || force)) {
			const selectedData = tooltip.datum().data ?? [];
			callFn(config.tooltip_onhide, api, selectedData);
			tooltip.style("display", "none").datum(null);
			callFn(config.tooltip_onhidden, api, selectedData);
		}
	},
	/**
	* Toggle display for linked chart instances
	* @param {boolean} show true: show, false: hide
	* @param {number} index x Axis index
	* @private
	*/
	_handleLinkedCharts(show, index) {
		const $$ = this;
		const { charts, config, state: { event } } = $$;
		if (event?.isTrusted && config.tooltip_linked && charts.length > 1) {
			const linkedName = config.tooltip_linked_name;
			charts.filter((c) => c !== $$.api).forEach((c) => {
				const { config, $el, state } = c.internal;
				const isLinked = config.tooltip_linked;
				const name = config.tooltip_linked_name;
				const isInDom = doc.body.contains($el.chart.node());
				if (isLinked && linkedName === name && isInDom) {
					const isNotSameIndex = index !== $el.tooltip.data()[0]?.index;
					try {
						if (show && isNotSameIndex && state.isCanvasMode) c.internal.showCanvasLinkedTooltip?.(index);
						else c.tooltip[show && isNotSameIndex ? "show" : "hide"]({ index });
					} catch {}
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
	updateTooltipOnRedraw(context, index) {
		const $$ = this;
		const { config, $el: { eventRect, svg, tooltip }, state: { event, hasAxis, hasRadar, hasTreemap } } = $$;
		if ($$.state.isCanvasMode) return;
		if (tooltip?.style("display") === "block" && event) {
			const rect = context ?? (hasRadar ? svg : eventRect)?.node();
			if (hasAxis || hasRadar) {
				if ($$.isMultipleX()) $$.selectRectForMultipleXs(rect, false);
				else {
					const idx = index ?? $$.getDataIndexFromEvent(event);
					if (index === -1) $$.api.tooltip.hide();
					else {
						$$.selectRectForSingle(rect, idx);
						$$.setExpand(idx, null, true);
					}
				}
			} else {
				const { clientX, clientY } = event;
				setTimeout(() => {
					let target = [clientX, clientY].every(Number.isFinite) && doc.elementFromPoint(clientX, clientY);
					const data = target && select(target).datum();
					if (data) {
						const d = $$.hasArcType() ? $$.convertToArcData($$.updateAngle(data)) : data?.data;
						hasTreemap && (target = svg.node());
						d && $$.showTooltip([d], target);
					} else $$.api.tooltip.hide();
				}, config.transition_duration);
			}
		}
	}
};
//#endregion
export { tooltip_default as default };
