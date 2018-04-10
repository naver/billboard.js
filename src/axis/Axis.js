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
		const main = $$.main;

		$$.axes.x = main.append("g")
			.attr("class", `${CLASS.axis} ${CLASS.axisX}`)
			.attr("clip-path", $$.clipPathForXAxis)
			.attr("transform", $$.getTranslate("x"))
			.style("visibility", config.axis_x_show ? "visible" : "hidden");

		$$.axes.x.append("text")
			.attr("class", CLASS.axisXLabel)
			.attr("transform", config.axis_rotated ? "rotate(-90)" : "")
			.style("text-anchor", this.textAnchorForXAxisLabel.bind(this));

		$$.axes.y = main.append("g")
			.attr("class", `${CLASS.axis} ${CLASS.axisY}`)
			.attr("clip-path", config.axis_y_inner ? "" : $$.clipPathForYAxis)
			.attr("transform", $$.getTranslate("y"))
			.style("visibility", config.axis_y_show ? "visible" : "hidden");

		$$.axes.y.append("text")
			.attr("class", CLASS.axisYLabel)
			.attr("transform", config.axis_rotated ? "" : "rotate(-90)")
			.style("text-anchor", this.textAnchorForYAxisLabel.bind(this));

		$$.axes.y2 = main.append("g")
			.attr("class", `${CLASS.axis} ${CLASS.axisY2}`)
			.attr("transform", $$.getTranslate("y2"))
			.style("visibility", config.axis_y2_show ? "visible" : "hidden");

		$$.axes.y2.append("text")
			.attr("class", CLASS.axisY2Label)
			.attr("transform", config.axis_rotated ? "" : "rotate(-90)")
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
			tickMultiline: config.axis_x_tick_multiline,
			tickWidth: config.axis_x_tick_width,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_x_tick_rotate,
			tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
			withoutTransition,
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

	updateXAxisTickValues(targets, axis) {
		const $$ = this.owner;
		const config = $$.config;
		let tickValues;

		if (config.axis_x_tick_fit || config.axis_x_tick_count) {
			tickValues = this.generateTickValues(
				$$.mapTargetsToUniqueXs(targets),
				config.axis_x_tick_count,
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

	getYAxis(scale, orient, tickFormat, tickValues,
		withOuterTick, withoutTransition, withoutRotateTickText) {
		const $$ = this.owner;
		const config = $$.config;
		const axisParams = {
			withOuterTick,
			withoutTransition,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_y_tick_rotate
		};
		const axis = bbAxis(axisParams)
			.scale(scale)
			.orient(orient)
			.tickFormat(tickFormat);

		if ($$.isTimeSeriesY()) {
			// https://github.com/d3/d3/blob/master/CHANGES.md#time-intervals-d3-time
			axis.ticks(config.axis_y_tick_time_value);
		} else {
			axis.tickValues(tickValues);
		}

		return axis;
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
			if (isTimeSeries) {
				format = $$.defaultAxisTimeFormat;
			} else {
				format = isCategorized ?
					$$.categoryName : v => (v < 0 ? v.toFixed(0) : v);
			}
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
		let text;

		if (isString(option)) {
			text = option;
		} else {
			text = option ? option.text : null;
		}

		return text;
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
		let label;

		if (id === "y2") {
			label = this.getY2AxisLabelPosition();
		} else {
			label = id === "y" ? this.getYAxisLabelPosition() : this.getXAxisLabelPosition();
		}

		return label;
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
		let x;

		if (forHorizontal) {
			if (position.isLeft) {
				x = 0;
			} else {
				x = position.isCenter ? $$.width / 2 : $$.width;
			}
		} else if (position.isBottom) {
			x = -$$.height;
		} else {
			x = position.isMiddle ? -$$.height / 2 : 0;
		}

		return x;
	}

	dxForAxisLabel(forHorizontal, position) {
		let dx;

		if (forHorizontal) {
			if (position.isLeft) {
				dx = "0.5em";
			} else {
				dx = position.isRight ? "-0.5em" : "0";
			}
		} else if (position.isTop) {
			dx = "-0.5em";
		} else {
			dx = position.isBottom ? "0.5em" : "0";
		}

		return dx;
	}

	textAnchorForAxisLabel(forHorizontal, position) {
		let anchor;

		if (forHorizontal) {
			if (position.isLeft) {
				anchor = "start";
			} else {
				anchor = position.isCenter ? "middle" : "end";
			}
		} else if (position.isBottom) {
			anchor = "start";
		} else {
			anchor = position.isMiddle ? "middle" : "end";
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
		const position = this.getXAxisLabelPosition();

		if (config.axis_rotated) {
			return position.isInner ? "1.2em" : -25 - this.getMaxTickWidth("x");
		} else if (position.isInner) {
			return "-0.5em";
		} else if (config.axis_x_height) {
			return config.axis_x_height - 10;
		} else {
			return "3em";
		}
	}

	dyForYAxisLabel() {
		const $$ = this.owner;
		const position = this.getYAxisLabelPosition();

		if ($$.config.axis_rotated) {
			return position.isInner ? "-0.5em" : "3em";
		} else {
			return position.isInner ? "1.2em" : -10 - ($$.config.axis_y_inner ? 0 : (this.getMaxTickWidth("y") + 10));
		}
	}

	dyForY2AxisLabel() {
		const $$ = this.owner;
		const position = this.getY2AxisLabelPosition();

		if ($$.config.axis_rotated) {
			return position.isInner ? "1.2em" : "-2.2em";
		} else {
			return position.isInner ? "-0.5em" : 15 + ($$.config.axis_y2_inner ? 0 : (this.getMaxTickWidth("y2") + 15));
		}
	}

	textAnchorForXAxisLabel() {
		const $$ = this.owner;

		return this.textAnchorForAxisLabel(!$$.config.axis_rotated, this.getXAxisLabelPosition());
	}

	textAnchorForYAxisLabel() {
		const $$ = this.owner;

		return this.textAnchorForAxisLabel($$.config.axis_rotated, this.getYAxisLabelPosition());
	}

	textAnchorForY2AxisLabel() {
		const $$ = this.owner;

		return this.textAnchorForAxisLabel($$.config.axis_rotated, this.getY2AxisLabelPosition());
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
		const axisXLabel = $$.main.select(`.${CLASS.axisX} .${CLASS.axisXLabel}`);
		const axisYLabel = $$.main.select(`.${CLASS.axisY} .${CLASS.axisYLabel}`);
		const axisY2Label = $$.main.select(`.${CLASS.axisY2}  .${CLASS.axisY2Label}`);

		(withTransition ? axisXLabel.transition() : axisXLabel)
			.attr("x", this.xForXAxisLabel.bind(this))
			.attr("dx", this.dxForXAxisLabel.bind(this))
			.attr("dy", this.dyForXAxisLabel.bind(this))
			.text(this.textForXAxisLabel.bind(this));

		(withTransition ? axisYLabel.transition() : axisYLabel)
			.attr("x", this.xForYAxisLabel.bind(this))
			.attr("dx", this.dxForYAxisLabel.bind(this))
			.attr("dy", this.dyForYAxisLabel.bind(this))
			.text(this.textForYAxisLabel.bind(this));

		(withTransition ? axisY2Label.transition() : axisY2Label)
			.attr("x", this.xForY2AxisLabel.bind(this))
			.attr("dx", this.dxForY2AxisLabel.bind(this))
			.attr("dy", this.dyForY2AxisLabel.bind(this))
			.text(this.textForY2AxisLabel.bind(this));
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
