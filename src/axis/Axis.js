/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {isFunction, isString, isValue, isEmpty, isNumber, isObjectType} from "../internals/util";
import bbAxis from "./bb.axis";
import CLASS from "../config/classes";

export default class Axis {
	constructor(owner) {
		this.owner = owner;
	}

	init() {
		const $$ = this.owner;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const main = $$.main;

		$$.axes.x = main.append("g")
			.attr("class", `${CLASS.axis} ${CLASS.axisX}`)
			.attr("clip-path", $$.clipPathForXAxis)
			.attr("transform", $$.getTranslate("x"))
			.style("visibility", config.axis_x_show ? "visible" : "hidden");

		$$.axes.x.append("text")
			.attr("class", CLASS.axisXLabel)
			.attr("transform", isRotated ? "rotate(-90)" : "")
			.style("text-anchor", this.textAnchorForXAxisLabel.bind(this));

		$$.axes.y = main.append("g")
			.attr("class", `${CLASS.axis} ${CLASS.axisY}`)
			.attr("clip-path", config.axis_y_inner ? "" : $$.clipPathForYAxis)
			.attr("transform", $$.getTranslate("y"))
			.style("visibility", config.axis_y_show ? "visible" : "hidden");

		$$.axes.y.append("text")
			.attr("class", CLASS.axisYLabel)
			.attr("transform", isRotated ? "" : "rotate(-90)")
			.style("text-anchor", this.textAnchorForYAxisLabel.bind(this));

		$$.axes.y2 = main.append("g")
			.attr("class", `${CLASS.axis} ${CLASS.axisY2}`)
			.attr("transform", $$.getTranslate("y2"))
			.style("visibility", config.axis_y2_show ? "visible" : "hidden");

		$$.axes.y2.append("text")
			.attr("class", CLASS.axisY2Label)
			.attr("transform", isRotated ? "" : "rotate(-90)")
			.style("text-anchor", this.textAnchorForY2AxisLabel.bind(this));
	}

	getXAxis(scale, orient, tickFormat,
		tickValues, withOuterTick, withoutTransition, withoutRotateTickText) {
		const $$ = this.owner;
		const config = $$.config;
		const isCategory = $$.isCategorized();
		const axisParams = {
			isCategory,
			withOuterTick,
			withoutTransition,
			config,
			tickMultiline: config.axis_x_tick_multiline,
			tickWidth: config.axis_x_tick_width,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_x_tick_rotate,
			tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
			orgXScale: $$.x
		};

		const axis = bbAxis(axisParams)
			.scale($$.zoomScale || scale)
			.orient(orient);

		let newTickValues = tickValues;

		if ($$.isTimeSeries() && tickValues && !isFunction(tickValues)) {
			newTickValues = tickValues.map(v => $$.parseDate(v));
		}

		// Set tick
		axis.tickFormat(tickFormat).tickValues(newTickValues);

		if (isCategory) {
			axis.tickCentered(config.axis_x_tick_centered);

			if (isEmpty(config.axis_x_tick_culling)) {
				config.axis_x_tick_culling = false;
			}
		}

		return axis;
	}

	getYAxis(scale, orient, tickFormat, tickValues,
		withOuterTick, withoutTransition, withoutRotateTickText) {
		const $$ = this.owner;
		const config = $$.config;
		const axisParams = {
			withOuterTick,
			withoutTransition,
			config,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_y_tick_rotate
		};
		const axis = bbAxis(axisParams)
			.scale(scale)
			.orient(orient)
			.tickFormat(tickFormat);

		$$.isTimeSeriesY() ?
			// https://github.com/d3/d3/blob/master/CHANGES.md#time-intervals-d3-time
			axis.ticks(config.axis_y_tick_time_value) :
			axis.tickValues(tickValues);

		return axis;
	}

	updateXAxisTickValues(targets, axis) {
		const $$ = this.owner;
		const config = $$.config;
		const xTickCount = config.axis_x_tick_count;
		let tickValues;

		if (config.axis_x_tick_fit || xTickCount) {
			tickValues = this.generateTickValues(
				$$.mapTargetsToUniqueXs(targets),
				xTickCount,
				$$.isTimeSeries()
			);
		}

		if (axis) {
			axis.tickValues(tickValues);
		} else {
			$$.xAxis.tickValues(tickValues);
			$$.subXAxis.tickValues(tickValues);
		}

		return tickValues;
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

	getTickValues(tickValues, axis) {
		return tickValues || (axis ? axis.tickValues() : undefined);
	}

	getXAxisTickValues() {
		return this.getTickValues(this.owner.config.axis_x_tick_values, this.owner.xAxis);
	}

	getYAxisTickValues() {
		return this.getTickValues(this.owner.config.axis_y_tick_values, this.owner.yAxis);
	}

	getY2AxisTickValues() {
		return this.getTickValues(this.owner.config.axis_y2_tick_values, this.owner.y2Axis);
	}

	getLabelOptionByAxisId(axisId) {
		const $$ = this.owner;

		return $$.config[`axis_${axisId}_label`];
	}

	getLabelText(axisId) {
		const option = this.getLabelOptionByAxisId(axisId);

		return isString(option) ? option : (
			option ? option.text : null
		);
	}

	setLabelText(axisId, text) {
		const $$ = this.owner;
		const config = $$.config;
		const option = this.getLabelOptionByAxisId(axisId);

		if (isString(option)) {
			config[`axis_${axisId}_label`] = text;
		} else if (option) {
			option.text = text;
		}
	}

	getLabelPosition(axisId, defaultPosition) {
		const option = this.getLabelOptionByAxisId(axisId);
		const position = (isObjectType(option) && option.position) ?
			option.position : defaultPosition;

		return {
			isInner: !!~position.indexOf("inner"),
			isOuter: !!~position.indexOf("outer"),
			isLeft: !!~position.indexOf("left"),
			isCenter: !!~position.indexOf("center"),
			isRight: !!~position.indexOf("right"),
			isTop: !!~position.indexOf("top"),
			isMiddle: !!~position.indexOf("middle"),
			isBottom: !!~position.indexOf("bottom"),
		};
	}

	getXAxisLabelPosition() {
		return this.getLabelPosition("x", this.owner.config.axis_rotated ? "inner-top" : "inner-right");
	}

	getYAxisLabelPosition() {
		return this.getLabelPosition("y", this.owner.config.axis_rotated ? "inner-right" : "inner-top");
	}

	getY2AxisLabelPosition() {
		return this.getLabelPosition("y2", this.owner.config.axis_rotated ? "inner-right" : "inner-top");
	}

	getLabelPositionById(id) {
		return this[`get${id.toUpperCase()}AxisLabelPosition`]();
	}

	textForXAxisLabel() {
		return this.getLabelText("x");
	}

	textForYAxisLabel() {
		return this.getLabelText("y");
	}

	textForY2AxisLabel() {
		return this.getLabelText("y2");
	}

	xForAxisLabel(forHorizontal, position) {
		const $$ = this.owner;
		let x = position.isMiddle ? -$$.height / 2 : 0;

		if (forHorizontal) {
			x = position.isLeft ? 0 : (
				position.isCenter ? $$.width / 2 : $$.width
			);
		} else if (position.isBottom) {
			x = -$$.height;
		}

		return x;
	}

	dxForAxisLabel(forHorizontal, position) {
		let dx = position.isBottom ? "0.5em" : "0";

		if (forHorizontal) {
			dx = position.isLeft ? "0.5em" : (
				position.isRight ? "-0.5em" : "0"
			);
		} else if (position.isTop) {
			dx = "-0.5em";
		}

		return dx;
	}

	textAnchorForAxisLabel(forHorizontal, position) {
		let anchor = position.isMiddle ? "middle" : "end";

		if (forHorizontal) {
			anchor = position.isLeft ? "start" : (
				position.isCenter ? "middle" : "end"
			);
		} else if (position.isBottom) {
			anchor = "start";
		}

		return anchor;
	}

	xForXAxisLabel() {
		return this.xForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition());
	}

	xForYAxisLabel() {
		return this.xForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition());
	}

	xForY2AxisLabel() {
		return this.xForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition());
	}

	dxForXAxisLabel() {
		return this.dxForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition());
	}

	dxForYAxisLabel() {
		return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition());
	}

	dxForY2AxisLabel() {
		return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition());
	}

	dyForXAxisLabel() {
		const $$ = this.owner;
		const config = $$.config;
		const isInner = this.getXAxisLabelPosition().isInner;
		const xHeight = config.axis_x_height;

		if (config.axis_rotated) {
			return isInner ? "1.2em" : -25 - this.getMaxTickWidth("x");
		} else if (isInner) {
			return "-0.5em";
		} else if (xHeight) {
			return xHeight - 10;
		} else {
			return "3em";
		}
	}

	dyForYAxisLabel() {
		const $$ = this.owner;
		const isInner = this.getYAxisLabelPosition().isInner;

		if ($$.config.axis_rotated) {
			return isInner ? "-0.5em" : "3em";
		} else {
			return isInner ? "1.2em" : -10 - ($$.config.axis_y_inner ? 0 : (this.getMaxTickWidth("y") + 10));
		}
	}

	dyForY2AxisLabel() {
		const $$ = this.owner;
		const isInner = this.getY2AxisLabelPosition().isInner;

		if ($$.config.axis_rotated) {
			return isInner ? "1.2em" : "-2.2em";
		} else {
			return isInner ? "-0.5em" : 15 + ($$.config.axis_y2_inner ? 0 : (this.getMaxTickWidth("y2") + 15));
		}
	}

	textAnchorForXAxisLabel() {
		const isRotated = this.owner.config.axis_rotated;

		return this.textAnchorForAxisLabel(!isRotated, this.getXAxisLabelPosition());
	}

	textAnchorForYAxisLabel() {
		const isRotated = this.owner.config.axis_rotated;

		return this.textAnchorForAxisLabel(isRotated, this.getYAxisLabelPosition());
	}

	textAnchorForY2AxisLabel() {
		const isRotated = this.owner.config.axis_rotated;

		return this.textAnchorForAxisLabel(isRotated, this.getY2AxisLabelPosition());
	}

	getMaxTickWidth(id, withoutRecompute) {
		const $$ = this.owner;
		const config = $$.config;
		let maxWidth = 0;
		let dummy;
		let svg;

		if (withoutRecompute && $$.currentMaxTickWidths[id]) {
			return $$.currentMaxTickWidths[id];
		}

		if ($$.svg) {
			const targetsToShow = $$.filterTargetsToShow($$.data.targets);
			let scale;
			let axis;

			if (/^y2?$/.test(id)) {
				scale = $$[id].copy().domain($$.getYDomain(targetsToShow, id));
				axis = this.getYAxis(
					scale,
					$$[`${id}Orient`],
					config[`axis_${id}_tick_format`],
					$$[`${id}AxisTickValues`],
					false,
					true,
					true
				);
			} else {
				scale = $$.x.copy().domain($$.getXDomain(targetsToShow));
				axis = this.getXAxis(
					scale,
					$$.xOrient,
					$$.xAxisTickFormat,
					$$.xAxisTickValues,
					false,
					true,
					true
				);
				this.updateXAxisTickValues(targetsToShow, axis);
			}

			dummy = d3Select("body")
				.append("div")
				.classed("bb", true);

			svg = dummy.append("svg")
				.style("visibility", "hidden")
				.style("position", "fixed")
				.style("top", "0px")
				.style("left", "0px");

			svg.append("g").call(axis)
				.each(function() {
					d3Select(this).selectAll("text")
						.each(function() {
							const boxWidth = this.getBoundingClientRect().width;

							maxWidth < boxWidth && (maxWidth = boxWidth);
						});

					dummy.remove();
				});
		}

		$$.currentMaxTickWidths[id] = maxWidth <= 0 ?
			$$.currentMaxTickWidths[id] : maxWidth;

		return $$.currentMaxTickWidths[id];
	}

	updateLabels(withTransition) {
		const $$ = this.owner;
		const labels = {
			X: $$.main.select(`.${CLASS.axisX} .${CLASS.axisXLabel}`),
			Y: $$.main.select(`.${CLASS.axisY} .${CLASS.axisYLabel}`),
			Y2: $$.main.select(`.${CLASS.axisY2} .${CLASS.axisY2Label}`)
		};

		Object.keys(labels).forEach(axis => {
			const node = labels[axis];

			(withTransition ? node.transition() : node)
				.attr("x", this[`xFor${axis}AxisLabel`].bind(this))
				.attr("dx", this[`dxFor${axis}AxisLabel`].bind(this))
				.attr("dy", this[`dyFor${axis}AxisLabel`].bind(this))
				.text(this[`textFor${axis}AxisLabel`].bind(this));
		});
	}

	getPadding(padding, key, defaultValue, domainLength) {
		const p = isNumber(padding) ? padding : padding[key];

		if (!isValue(p)) {
			return defaultValue;
		}

		if (padding.unit === "ratio") {
			return padding[key] * domainLength;
		}

		// assume padding is pixels if unit is not specified
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
				count = targetCount - 2;
				start = values[0];
				end = values[values.length - 1];
				interval = (end - start) / (count + 1);

				// re-construct unique values
				tickValues = [start];

				for (i = 0; i < count; i++) {
					tickValue = +start + interval * (i + 1);
					tickValues.push(forTimeSeries ? new Date(tickValue) : tickValue);
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

		return {
			axisX: duration ? axes.x.transition().duration(duration) : axes.x,
			axisY: duration ? axes.y.transition().duration(duration) : axes.y,
			axisY2: duration ? axes.y2.transition().duration(duration) : axes.y2,
			axisSubX: duration ? axes.subx.transition().duration(duration) : axes.subx,
		};
	}

	redraw(transitions, isHidden) {
		const $$ = this.owner;
		const opacity = isHidden ? "0" : "1";

		$$.axes.x.style("opacity", opacity);
		$$.axes.y.style("opacity", opacity);
		$$.axes.y2.style("opacity", opacity);
		$$.axes.subx.style("opacity", opacity);

		transitions.axisX.call($$.xAxis);
		transitions.axisY.call($$.yAxis);
		transitions.axisY2.call($$.y2Axis);
		transitions.axisSubX.call($$.subXAxis);
	}
}
