/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	axisTop as d3AxisTop,
	axisBottom as d3AxisBottom,
	axisLeft as d3AxisLeft,
	axisRight as d3AxisRight
} from "d3-axis";
import {scaleLinear as d3ScaleLinear} from "d3-scale";
import CLASS from "../config/classes";
import {capitalize, isArray, isFunction, isString, isValue, isEmpty, isNumber, isObjectType, mergeObj, sortValue} from "../internals/util";
import AxisRenderer from "./AxisRenderer";

const isHorizontal = ($$, forHorizontal) => {
	const isRotated = $$.config.axis_rotated;

	return forHorizontal ? isRotated : !isRotated;
};

const getAxisClassName = id => `${CLASS.axis} ${CLASS[`axis${capitalize(id)}`]}`;

export default class Axis {
	constructor(owner) {
		this.owner = owner;
		this.setOrient();
	}

	init() {
		const $$ = this.owner;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const main = $$.main;
		const target = ["x", "y"];

		config.axis_y2_show && target.push("y2");

		$$.axesList = {};

		target.forEach(v => {
			const classAxis = getAxisClassName(v);
			const classLabel = CLASS[`axis${v.toUpperCase()}Label`];

			$$.axes[v] = main.append("g")
				.attr("class", classAxis)
				.attr("clip-path", () => {
					let res = null;

					if (v === "x") {
						res = $$.clipPathForXAxis;
					} else if (v === "y" && config.axis_y_inner) {
						res = $$.clipPathForYAxis;
					}

					return res;
				})
				.attr("transform", $$.getTranslate(v))
				.style("visibility", config[`axis_${v}_show`] ? "visible" : "hidden");

			$$.axes[v].append("text")
				.attr("class", classLabel)
				.attr("transform", ["rotate(-90)", null][
					v === "x" ? +!isRotated : +isRotated
				])
				.style("text-anchor", () => this.textAnchorForAxisLabel(v));

			this.generateAxes(v);
		});
	}

	/**
	 * Set axis orient according option value
	 * @private
	 */
	setOrient() {
		const $$ = this.owner;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const yInner = config.axis_y_inner;
		const y2Inner = config.axis_y2_inner;

		$$.xOrient = isRotated ? "left" : "bottom";
		$$.yOrient = isRotated ? (yInner ? "top" : "bottom") : (yInner ? "right" : "left");
		$$.y2Orient = isRotated ? (y2Inner ? "bottom" : "top") : (y2Inner ? "left" : "right");
		$$.subXOrient = isRotated ? "left" : "bottom";
	}

	/**
	 * Generate axes
	 * It's used when axis' axes option is set
	 * @param {String} id Axis id
	 * @private
	 */
	generateAxes(id) {
		const $$ = this.owner;
		const config = $$.config;
		const axes = [];
		const axesConfig = config[`axis_${id}_axes`];
		const isRotated = config.axis_rotated;
		let d3Axis;

		if (id === "x") {
			d3Axis = isRotated ? d3AxisLeft : d3AxisBottom;
		} else if (id === "y") {
			d3Axis = isRotated ? d3AxisBottom : d3AxisLeft;
		} else if (id === "y2") {
			d3Axis = isRotated ? d3AxisTop : d3AxisRight;
		}

		if (axesConfig.length) {
			axesConfig.forEach(v => {
				const tick = v.tick || {};
				const scale = $$[id].copy();

				v.domain && scale.domain(v.domain);

				axes.push(
					d3Axis(scale)
						.ticks(tick.count)
						.tickFormat(tick.format || (x => x))
						.tickValues(tick.values)
						.tickSizeOuter(tick.outer === false ? 0 : 6)
				);
			});
		}

		$$.axesList[id] = axes;
	}

	/**
	 * Update axes nodes
	 * @private
	 */
	updateAxes() {
		const $$ = this.owner;
		const config = $$.config;

		Object.keys($$.axesList).forEach(id => {
			const axesConfig = config[`axis_${id}_axes`];
			const scale = $$[id].copy();
			const range = scale.range();

			$$.axesList[id].forEach((v, i) => {
				const axisRange = v.scale().range();

				// adjust range value with the current
				// https://github.com/naver/billboard.js/issues/859
				if (!range.every((v, i) => v === axisRange[i])) {
					v.scale().range(range);
				}

				const className = `${getAxisClassName(id)}-${i + 1}`;
				let g = $$.main.select(`.${className.replace(/\s/, ".")}`);

				if (g.empty()) {
					g = $$.main.append("g")
						.attr("class", className)
						.style("visibility", config[`axis_${id}_show`] ? "visible" : "hidden")
						.call(v);
				} else {
					axesConfig[i].domain && scale.domain(axesConfig[i].domain);

					$$.xAxis.helper.transitionise(g)
						.call(v.scale(scale));
				}

				g.attr("transform", $$.getTranslate(id, i + 1));
			});
		});
	}

	// called from : updateScales() & getMaxTickWidth()
	getAxis(name, scale, outerTick, noTransition, noTickTextRotate) {
		const $$ = this.owner;
		const config = $$.config;
		const isX = /^(x|subX)$/.test(name);
		const type = isX ? "x" : name;

		const isCategory = isX && $$.isCategorized();
		const orient = $$[`${name}Orient`];
		const tickFormat = isX ? $$.xAxisTickFormat : config[`axis_${name}_tick_format`];
		const tickTextRotate = noTickTextRotate ? 0 : $$.getAxisTickRotate(type);
		let tickValues = isX ? $$.xAxisTickValues : $$[`${name}AxisTickValues`];

		const axisParams = mergeObj({
			outerTick,
			noTransition,
			config,
			name,
			tickTextRotate
		}, isX && {
			isCategory,
			tickMultiline: config.axis_x_tick_multiline,
			tickWidth: config.axis_x_tick_width,
			tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
			orgXScale: $$.x
		});

		if (!isX) {
			axisParams.tickStepSize = config[`axis_${type}_tick_stepSize`];
		}

		const axis = new AxisRenderer(axisParams)
			.scale((isX && $$.zoomScale) || scale)
			.orient(orient);

		if (isX && $$.isTimeSeries() && tickValues && !isFunction(tickValues)) {
			tickValues = tickValues.map(v => $$.parseDate(v));
		} else if (!isX && $$.isTimeSeriesY()) {
			// https://github.com/d3/d3/blob/master/CHANGES.md#time-intervals-d3-time
			axis.ticks(config.axis_y_tick_time_value);
			tickValues = null;
		}

		tickValues && axis.tickValues(tickValues);

		// Set tick
		axis.tickFormat(
			tickFormat || (
				!isX && ($$.isStackNormalized() && (x => `${x}%`))
			)
		);

		if (isCategory) {
			axis.tickCentered(config.axis_x_tick_centered);

			if (isEmpty(config.axis_x_tick_culling)) {
				config.axis_x_tick_culling = false;
			}
		}

		const tickCount = config[`axis_${type}_tick_count`];

		tickCount && axis.ticks(tickCount);

		return axis;
	}

	updateXAxisTickValues(targets, axis) {
		const $$ = this.owner;
		const config = $$.config;
		const fit = config.axis_x_tick_fit;
		const count = config.axis_x_tick_count;
		let values;

		if (fit || (count && fit)) {
			values = this.generateTickValues(
				$$.mapTargetsToUniqueXs(targets),
				count,
				$$.isTimeSeries()
			);
		}

		if (axis) {
			axis.tickValues(values);
		} else if ($$.xAxis) {
			$$.xAxis.tickValues(values);
			$$.subXAxis.tickValues(values);
		}

		return values;
	}

	getId(id) {
		const config = this.owner.config;

		return id in config.data_axes ? config.data_axes[id] : "y";
	}

	getXAxisTickFormat() {
		const $$ = this.owner;
		const config = $$.config;
		const tickFormat = config.axis_x_tick_format;
		const isTimeSeries = $$.isTimeSeries();
		const isCategorized = $$.isCategorized();
		let format;

		if (tickFormat) {
			if (isFunction(tickFormat)) {
				format = tickFormat;
			} else if (isTimeSeries) {
				format = date => (date ? $$.axisTimeFormat(tickFormat)(date) : "");
			}
		} else {
			format = isTimeSeries ? $$.defaultAxisTimeFormat : (
				isCategorized ?
					$$.categoryName : v => (v < 0 ? v.toFixed(0) : v)
			);
		}

		return isFunction(format) ? v =>
			format.apply($$, isCategorized ?
				[v, $$.categoryName(v)] : [v]
			) : format;
	}

	getTickValues(id) {
		const $$ = this.owner;
		const tickValues = $$.config[`axis_${id}_tick_values`];
		const axis = $$[`${id}Axis`];

		return (isFunction(tickValues) ? tickValues() : tickValues) ||
			(axis ? axis.tickValues() : undefined);
	}

	getLabelOptionByAxisId(id) {
		return this.owner.config[`axis_${id}_label`];
	}

	getLabelText(id) {
		const option = this.getLabelOptionByAxisId(id);

		return isString(option) ? option : (
			option ? option.text : null
		);
	}

	setLabelText(id, text) {
		const $$ = this.owner;
		const config = $$.config;
		const option = this.getLabelOptionByAxisId(id);

		if (isString(option)) {
			config[`axis_${id}_label`] = text;
		} else if (option) {
			option.text = text;
		}
	}

	getLabelPosition(id, defaultPosition) {
		const isRotated = this.owner.config.axis_rotated;
		const option = this.getLabelOptionByAxisId(id);
		const position = (isObjectType(option) && option.position) ?
			option.position : defaultPosition[+!isRotated];

		const has = v => !!~position.indexOf(v);

		return {
			isInner: has("inner"),
			isOuter: has("outer"),
			isLeft: has("left"),
			isCenter: has("center"),
			isRight: has("right"),
			isTop: has("top"),
			isMiddle: has("middle"),
			isBottom: has("bottom")
		};
	}

	getAxisLabelPosition(id) {
		return this.getLabelPosition(id, id === "x" ? ["inner-top", "inner-right"] : ["inner-right", "inner-top"]);
	}

	getLabelPositionById(id) {
		return this.getAxisLabelPosition(id);
	}

	xForAxisLabel(id) {
		const $$ = this.owner;
		const position = this.getAxisLabelPosition(id);
		let x = position.isMiddle ? -$$.height / 2 : 0;

		if (isHorizontal($$, id !== "x")) {
			x = position.isLeft ? 0 : (
				position.isCenter ? $$.width / 2 : $$.width
			);
		} else if (position.isBottom) {
			x = -$$.height;
		}

		return x;
	}

	dxForAxisLabel(id) {
		const $$ = this.owner;
		const position = this.getAxisLabelPosition(id);
		let dx = position.isBottom ? "0.5em" : "0";

		if (isHorizontal($$, id !== "x")) {
			dx = position.isLeft ? "0.5em" : (
				position.isRight ? "-0.5em" : "0"
			);
		} else if (position.isTop) {
			dx = "-0.5em";
		}

		return dx;
	}

	textAnchorForAxisLabel(id) {
		const $$ = this.owner;
		const position = this.getAxisLabelPosition(id);
		let anchor = position.isMiddle ? "middle" : "end";

		if (isHorizontal($$, id !== "x")) {
			anchor = position.isLeft ? "start" : (
				position.isCenter ? "middle" : "end"
			);
		} else if (position.isBottom) {
			anchor = "start";
		}

		return anchor;
	}

	dyForAxisLabel(id) {
		const $$ = this.owner;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const isInner = this.getAxisLabelPosition(id).isInner;
		const tickRotate = config[`axis_${id}_tick_rotate`] ? $$.getHorizontalAxisHeight(id) : 0;
		const maxTickWidth = this.getMaxTickWidth(id);
		let dy;

		if (id === "x") {
			const xHeight = config.axis_x_height;

			if (isRotated) {
				dy = isInner ? "1.2em" : -25 - maxTickWidth;
			} else if (isInner) {
				dy = "-0.5em";
			} else if (xHeight) {
				dy = xHeight - 10;
			} else if (tickRotate) {
				dy = tickRotate - 10;
			} else {
				dy = "3em";
			}
		} else {
			dy = {
				y: ["-0.5em", 10, "3em", "1.2em", 10],
				y2: ["1.2em", -20, "-2.2em", "-0.5em", 15]
			}[id];

			if (isRotated) {
				if (isInner) {
					dy = dy[0];
				} else if (tickRotate) {
					dy = tickRotate * (id === "y2" ? -1 : 1) - dy[1];
				} else {
					dy = dy[2];
				}
			} else {
				dy = isInner ?
					dy[3] : (
						dy[4] + (
							config[`axis_${id}_inner`] ? 0 : (maxTickWidth + dy[4])
						)
					) * (id === "y" ? -1 : 1);
			}
		}

		return dy;
	}

	getMaxTickWidth(id, withoutRecompute) {
		const $$ = this.owner;
		const config = $$.config;
		const currentTickMax = $$.currentMaxTickWidths[id];
		let maxWidth = 0;

		if (withoutRecompute || !config[`axis_${id}_show`] || $$.filterTargetsToShow().length === 0) {
			return currentTickMax.size;
		}

		if ($$.svg) {
			const isYAxis = /^y2?$/.test(id);
			const targetsToShow = $$.filterTargetsToShow($$.data.targets);
			const scale = $$[id].copy().domain($$[`get${isYAxis ? "Y" : "X"}Domain`](targetsToShow, id));
			const domain = scale.domain();

			// do not compute if domain is same
			if (domain[0] === domain[1] ||
				(isArray(currentTickMax.domain) && currentTickMax.domain[0] === currentTickMax.domain[1])
			) {
				return currentTickMax.size;
			} else {
				currentTickMax.domain = domain;
			}

			const axis = this.getAxis(id, scale, false, false, true);
			const tickCount = config[`axis_${id}_tick_count`];
			const tickValues = config[`axis_${id}_tick_values`];

			// Make to generate the final tick text to be rendered
			// https://github.com/naver/billboard.js/issues/920
			// Do not generate if 'tick values' option is given
			// https://github.com/naver/billboard.js/issues/1251
			if (!tickValues && tickCount) {
				axis.tickValues(
					this.generateTickValues(
						domain,
						tickCount,
						isYAxis ? $$.isTimeSeriesY() : $$.isTimeSeries()
					));
			}

			!isYAxis && this.updateXAxisTickValues(targetsToShow, axis);

			const dummy = $$.selectChart.append("svg")
				.style("visibility", "hidden")
				.style("position", "fixed")
				.style("top", "0px")
				.style("left", "0px");

			axis.create(dummy);

			dummy.selectAll("text")
				.each(function(d, i) {
					const currentTextWidth = this.getBoundingClientRect().width;

					maxWidth = Math.max(maxWidth, currentTextWidth);
					// cache tick text width for getXAxisTickTextY2Overflow()
					if (id === "x") {
						$$.currentMaxTickWidths.x.ticks[i] = currentTextWidth;
					}
				});

			dummy.remove();
		}

		if (maxWidth > 0) {
			currentTickMax.size = maxWidth;
		}

		return currentTickMax.size;
	}

	getXAxisTickTextY2Overflow(defaultPadding) {
		const $$ = this.owner;
		const config = $$.config;
		const xAxisTickRotate = $$.getAxisTickRotate("x");
		const positiveRotation = xAxisTickRotate > 0 && xAxisTickRotate < 90;

		if (($$.isCategorized() || $$.isTimeSeries()) &&
			config.axis_x_tick_fit &&
			!config.axis_x_tick_culling &&
			!config.axis_x_tick_multiline &&
			positiveRotation
		) {
			const widthWithoutCurrentPaddingLeft = $$.currentWidth - $$.getCurrentPaddingLeft();
			const maxOverflow = this.getXAxisTickMaxOverflow(
				xAxisTickRotate, widthWithoutCurrentPaddingLeft - defaultPadding
			);
			const xAxisTickTextY2Overflow = Math.max(0, maxOverflow) +
				defaultPadding; // for display inconsistencies between browsers

			return Math.min(xAxisTickTextY2Overflow, widthWithoutCurrentPaddingLeft / 2);
		}

		return 0;
	}

	getXAxisTickMaxOverflow(xAxisTickRotate, widthWithoutCurrentPaddingLeft) {
		const $$ = this.owner;
		const config = $$.config;
		const isTimeSeries = $$.isTimeSeries();

		const tickTextWidths = $$.currentMaxTickWidths.x.ticks;
		const tickCount = tickTextWidths.length;
		const {left, right} = this.x.padding;
		let maxOverflow = 0;

		const remaining = tickCount - (isTimeSeries && config.axis_x_tick_fit ? 0.5 : 0);

		for (let i = 0; i < tickCount; i++) {
			const tickIndex = i + 1;
			const rotatedTickTextWidth = Math.cos(Math.PI * xAxisTickRotate / 180) * tickTextWidths[i];
			const ticksBeforeTickText = tickIndex - (isTimeSeries ? 1 : 0.5) + left;

			// Skip ticks if there are no ticks before them
			if (ticksBeforeTickText <= 0) {
				continue;
			}

			const xAxisLengthWithoutTickTextWidth = widthWithoutCurrentPaddingLeft - rotatedTickTextWidth;
			const tickLength = xAxisLengthWithoutTickTextWidth / ticksBeforeTickText;
			const remainingTicks = remaining - tickIndex;

			const paddingRightLength = right * tickLength;
			const remainingTickWidth = (remainingTicks * tickLength) + paddingRightLength;
			const overflow = rotatedTickTextWidth - (tickLength / 2) - remainingTickWidth;

			maxOverflow = Math.max(maxOverflow, overflow);
		}

		let tickOffset = 0;

		if (!isTimeSeries) {
			const scale = d3ScaleLinear()
				.domain([
					left * -1,
					$$.getXDomainMax($$.data.targets) + 1 + right
				])
				.range([0, widthWithoutCurrentPaddingLeft - maxOverflow]);

			tickOffset = (Math.ceil((scale(1) - scale(0)) / 2));
		}

		return maxOverflow + tickOffset;
	}

	/**
	 * Get x Axis padding
	 * @param {Number} tickCount Tick count
	 * @return {Object} Padding object values with 'left' & 'right' key
	 * @private
	 */
	getXAxisPadding(tickCount) {
		const $$ = this.owner;
		let padding = $$.config.axis_x_padding;

		if (isEmpty(padding)) {
			padding = {left: 0, right: 0};
		} else {
			padding.left = padding.left || 0;
			padding.right = padding.right || 0;
		}

		if ($$.isTimeSeries()) {
			const firstX = +$$.getXDomainMin($$.data.targets);
			const lastX = +$$.getXDomainMax($$.data.targets);
			const timeDiff = lastX - firstX;

			const range = timeDiff + padding.left + padding.right;
			const relativeTickWidth = (timeDiff / tickCount) / range;

			const left = padding.left / range / relativeTickWidth || 0;
			const right = padding.right / range / relativeTickWidth || 0;

			padding = {left, right};
		}

		return padding;
	}

	updateLabels(withTransition) {
		const $$ = this.owner;
		const labels = {
			x: $$.main.select(`.${CLASS.axisX} .${CLASS.axisXLabel}`),
			y: $$.main.select(`.${CLASS.axisY} .${CLASS.axisYLabel}`),
			y2: $$.main.select(`.${CLASS.axisY2} .${CLASS.axisY2Label}`)
		};

		Object.keys(labels).filter(id => !labels[id].empty())
			.forEach(v => {
				const node = labels[v];

				(withTransition ? node.transition() : node)
					.attr("x", () => this.xForAxisLabel(v))
					.attr("dx", () => this.dxForAxisLabel(v))
					.attr("dy", () => this.dyForAxisLabel(v))
					.text(() => this.getLabelText(v));
			});
	}

	getPadding(padding, key, defaultValue, domainLength) {
		const p = isNumber(padding) ? padding : padding[key];

		if (!isValue(p)) {
			return defaultValue;
		}

		return this.convertPixelsToAxisPadding(p, domainLength);
	}

	convertPixelsToAxisPadding(pixels, domainLength) {
		const $$ = this.owner;
		const length = $$.config.axis_rotated ? $$.width : $$.height;

		return domainLength * (pixels / length);
	}

	generateTickValues(values, tickCount, forTimeSeries) {
		let tickValues = values;
		let start;
		let end;
		let count;
		let interval;
		let i;
		let tickValue;

		if (tickCount) {
			const targetCount = isFunction(tickCount) ? tickCount() : tickCount;

			// compute ticks according to tickCount
			if (targetCount === 1) {
				tickValues = [values[0]];
			} else if (targetCount === 2) {
				tickValues = [values[0], values[values.length - 1]];
			} else if (targetCount > 2) {
				const isCategorized = this.owner.isCategorized();

				count = targetCount - 2;
				start = values[0];
				end = values[values.length - 1];
				interval = (end - start) / (count + 1);

				// re-construct unique values
				tickValues = [start];

				for (i = 0; i < count; i++) {
					tickValue = +start + interval * (i + 1);
					tickValues.push(
						forTimeSeries ? new Date(tickValue) : (
							isCategorized ? Math.round(tickValue) : tickValue
						)
					);
				}

				tickValues.push(end);
			}
		}

		if (!forTimeSeries) {
			tickValues = tickValues.sort((a, b) => a - b);
		}

		return tickValues;
	}

	generateTransitions(duration) {
		const $$ = this.owner;
		const axes = $$.axes;

		const [axisX, axisY, axisY2, axisSubX] = ["x", "y", "y2", "subx"]
			.map(v => {
				let axis = axes[v];

				if (axis && duration) {
					axis = axis.transition().duration(duration);
				}

				return axis;
			});

		return {axisX, axisY, axisY2, axisSubX};
	}

	redraw(transitions, isHidden, isInit) {
		const $$ = this.owner;
		const opacity 	= isHidden ? "0" : "1";

		["x", "y", "y2", "subX"].forEach(id => {
			const axis = $$[`${id}Axis`];

			if (axis) {
				if (!isInit) {
					axis.config.withoutTransition = !$$.config.transition_duration;
				}

				$$.axes[id.toLowerCase()].style("opacity", opacity);
				axis.create(transitions[`axis${capitalize(id)}`]);
			}
		});

		this.updateAxes();
	}

	/**
	 * Redraw axis
	 * @param {Object} targetsToShow targets data to be shown
	 * @param {Object} wth
	 * @param {Ojbect} transitions
	 * @param {Object} flow
	 * @private
	 */
	redrawAxis(targetsToShow, wth, transitions, flow, isInit) {
		const $$ = this.owner;
		const config = $$.config;
		const hasZoom = !!$$.zoomScale;
		let xDomainForZoom;

		if (!hasZoom && $$.isCategorized() && targetsToShow.length === 0) {
			$$.x.domain([0, $$.axes.x.selectAll(".tick").size()]);
		}

		if ($$.x && targetsToShow.length) {
			!hasZoom &&
				$$.updateXDomain(targetsToShow, wth.UpdateXDomain, wth.UpdateOrgXDomain, wth.TrimXDomain);

			if (!config.axis_x_tick_values) {
				this.updateXAxisTickValues(targetsToShow);
			}
		} else if ($$.xAxis) {
			$$.xAxis.tickValues([]);
			$$.subXAxis.tickValues([]);
		}

		if (config.zoom_rescale && !flow) {
			xDomainForZoom = $$.x.orgDomain();
		}

		["y", "y2"].forEach(key => {
			const axis = $$[key];

			if (axis) {
				const tickValues = config[`axis_${key}_tick_values`];
				const tickCount = config[`axis_${key}_tick_count`];

				axis.domain($$.getYDomain(targetsToShow, key, xDomainForZoom));

				if (!tickValues && tickCount) {
					const domain = axis.domain();

					$$[`${key}Axis`].tickValues(
						this.generateTickValues(
							domain,
							domain.every(v => v === 0) ? 1 : tickCount,
							$$.isTimeSeriesY()
						)
					);
				}
			}
		});

		// axes
		this.redraw(transitions, $$.hasArcType(), isInit);

		// Update axis label
		this.updateLabels(wth.Transition);

		// show/hide if manual culling needed
		if ((wth.UpdateXDomain || wth.UpdateXAxis || wth.Y) && targetsToShow.length) {
			this.setCulling();
		}

		// Update sub domain
		if (wth.Y) {
			$$.subY && $$.subY.domain($$.getYDomain(targetsToShow, "y"));
			$$.subY2 && $$.subY2.domain($$.getYDomain(targetsToShow, "y2"));
		}
	}

	/**
	 * Set manual culling
	 * @private
	 */
	setCulling() {
		const $$ = this.owner;
		const config = $$.config;

		["subx", "x", "y", "y2"].forEach(type => {
			const axis = $$.axes[type];

			// subchart x axis should be aligned with x axis culling
			const id = type === "subx" ? "x" : type;
			const toCull = config[`axis_${id}_tick_culling`];

			if (axis && toCull) {
				const tickText = axis.selectAll(".tick text");
				const tickValues = sortValue(tickText.data());
				const tickSize = tickValues.length;
				const cullingMax = config[`axis_${id}_tick_culling_max`];
				let intervalForCulling;

				if (tickSize) {
					for (let i = 1; i < tickSize; i++) {
						if (tickSize / i < cullingMax) {
							intervalForCulling = i;
							break;
						}
					}

					tickText.each(function(d) {
						this.style.display = tickValues.indexOf(d) % intervalForCulling ? "none" : "block";
					});
				} else {
					tickText.style("display", "block");
				}

				// set/unset x_axis_tick_clippath
				if (type === "x") {
					const clipPath = $$.clipXAxisTickMaxWidth ? $$.clipPathForXAxisTickTexts : null;

					$$.svg.selectAll(`.${CLASS.axisX} .tick text`)
						.attr("clip-path", clipPath);
				}
			}
		});
	}
}
