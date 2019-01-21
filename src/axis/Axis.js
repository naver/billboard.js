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
import CLASS from "../config/classes";
import {capitalize, isFunction, isString, isValue, isEmpty, isNumber, isObjectType} from "../internals/util";
import AxisRenderer from "./AxisRenderer";

const isHorizontal = ($$, forHorizontal) => {
	const isRotated = $$.config.axis_rotated;

	return forHorizontal ? isRotated : !isRotated;
};

const getAxisClassName = id => `${CLASS.axis} ${CLASS[`axis${capitalize(id)}`]}`;

export default class Axis {
	constructor(owner) {
		this.owner = owner;
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
			const classLabel = CLASS[`axis${capitalize(v)}Label`];

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
				.style("text-anchor", this.textAnchorForXAxisLabel.bind(this));

			this.generateAxes(v);
		});
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
				const tick = v.tick;

				axes.push(
					d3Axis($$[id])
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
			$$.axesList[id].forEach((v, i) => {
				const className = `${getAxisClassName(id)}-${i + 1}`;
				let g = $$.main.select(`.${className.replace(/\s/, ".")}`);

				if (g.empty()) {
					g = $$.main.append("g")
						.attr("class", className)
						.style("visibility", config[`axis_${id}_show`] ? "visible" : "hidden")
						.call(v);
				} else {
					$$.xAxis.helper.transitionise(g)
						.call(v.scale($$[id]));
				}

				g.attr("transform", $$.getTranslate(id, i + 1));
			});
		});
	}

	getXAxis(axisName, scale, orient, tickFormat,
		tickValues, withOuterTick, withoutTransition, withoutRotateTickText) {
		const $$ = this.owner;
		const config = $$.config;
		const isCategory = $$.isCategorized();
		const axisParams = {
			isCategory,
			withOuterTick,
			withoutTransition,
			config,
			axisName,
			tickMultiline: config.axis_x_tick_multiline,
			tickWidth: config.axis_x_tick_width,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_x_tick_rotate,
			tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
			orgXScale: $$.x
		};

		const axis = new AxisRenderer(axisParams)
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

	getYAxis(axisName, scale, orient, tickFormat, tickValues,
		withOuterTick, withoutTransition, withoutRotateTickText) {
		const $$ = this.owner;
		const config = $$.config;
		const axisParams = {
			withOuterTick,
			withoutTransition,
			config,
			axisName,
			tickTextRotate: withoutRotateTickText ? 0 : config.axis_y_tick_rotate
		};

		const axis = new AxisRenderer(axisParams)
			.scale(scale)
			.orient(orient)
			.tickFormat(
				tickFormat || ($$.isStackNormalized() && (x => `${x}%`))
			);

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
		} else if ($$.xAxis) {
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

	getTickValues(type) {
		const $$ = this.owner;
		const tickValues = $$.config[`axis_${type}_tick_values`];
		const axis = $$[`${type}Axis`];

		return tickValues || (axis ? axis.tickValues() : undefined);
	}

	getXAxisTickValues() {
		return this.getTickValues("x");
	}

	getYAxisTickValues() {
		return this.getTickValues("y");
	}

	getY2AxisTickValues() {
		return this.getTickValues("y2");
	}

	getLabelOptionByAxisId(axisId) {
		return this.owner.config[`axis_${axisId}_label`];
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
		const isRotated = this.owner.config.axis_rotated;
		const option = this.getLabelOptionByAxisId(axisId);
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

	getXAxisLabelPosition() {
		return this.getLabelPosition("x", ["inner-top", "inner-right"]);
	}

	getYAxisLabelPosition() {
		return this.getLabelPosition("y", ["inner-right", "inner-top"]);
	}

	getY2AxisLabelPosition() {
		return this.getLabelPosition("y2", ["inner-right", "inner-top"]);
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

	xForAxisLabel(position, forHorizontal = true) {
		const $$ = this.owner;
		let x = position.isMiddle ? -$$.height / 2 : 0;

		if (isHorizontal($$, forHorizontal)) {
			x = position.isLeft ? 0 : (
				position.isCenter ? $$.width / 2 : $$.width
			);
		} else if (position.isBottom) {
			x = -$$.height;
		}

		return x;
	}

	dxForAxisLabel(position, forHorizontal = true) {
		const $$ = this.owner;
		let dx = position.isBottom ? "0.5em" : "0";

		if (isHorizontal($$, forHorizontal)) {
			dx = position.isLeft ? "0.5em" : (
				position.isRight ? "-0.5em" : "0"
			);
		} else if (position.isTop) {
			dx = "-0.5em";
		}

		return dx;
	}

	textAnchorForAxisLabel(position, forHorizontal = true) {
		const $$ = this.owner;
		let anchor = position.isMiddle ? "middle" : "end";

		if (isHorizontal($$, forHorizontal)) {
			anchor = position.isLeft ? "start" : (
				position.isCenter ? "middle" : "end"
			);
		} else if (position.isBottom) {
			anchor = "start";
		}

		return anchor;
	}

	xForXAxisLabel() {
		return this.xForAxisLabel(this.getXAxisLabelPosition(), false);
	}

	xForYAxisLabel() {
		return this.xForAxisLabel(this.getYAxisLabelPosition());
	}

	xForY2AxisLabel() {
		return this.xForAxisLabel(this.getY2AxisLabelPosition());
	}

	dxForXAxisLabel() {
		return this.dxForAxisLabel(this.getXAxisLabelPosition(), false);
	}

	dxForYAxisLabel() {
		return this.dxForAxisLabel(this.getYAxisLabelPosition());
	}

	dxForY2AxisLabel() {
		return this.dxForAxisLabel(this.getY2AxisLabelPosition());
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
		return this.textAnchorForAxisLabel(this.getXAxisLabelPosition(), false);
	}

	textAnchorForYAxisLabel() {
		return this.textAnchorForAxisLabel(this.getYAxisLabelPosition());
	}

	textAnchorForY2AxisLabel() {
		return this.textAnchorForAxisLabel(this.getY2AxisLabelPosition());
	}

	getMaxTickWidth(id, withoutRecompute) {
		const $$ = this.owner;
		const config = $$.config;
		const currentTickMax = $$.currentMaxTickWidths;
		let maxWidth = 0;

		if ((withoutRecompute && currentTickMax[id]) || !config[`axis_${id}_show`]) {
			return currentTickMax[id];
		}

		if ($$.svg) {
			const isYAxis = /^y2?$/.test(id);
			const targetsToShow = $$.filterTargetsToShow($$.data.targets);
			const getFrom = isYAxis ? "getY" : "getX";

			const scale = $$[id].copy().domain($$[`${getFrom}Domain`](targetsToShow, id));
			const axis = this[`${getFrom}Axis`](
				id,
				scale,
				$$[`${id}Orient`],
				isYAxis ? config[`axis_${id}_tick_format`] : $$.xAxisTickFormat,
				null,
				false,
				true,
				true
			);

			!isYAxis && this.updateXAxisTickValues(targetsToShow, axis);

			const dummy = $$.selectChart.append("svg")
				.style("visibility", "hidden")
				.style("position", "fixed")
				.style("top", "0px")
				.style("left", "0px");

			axis.create(dummy);

			dummy.selectAll("text")
				.each(function() {
					maxWidth = Math.max(maxWidth, this.getBoundingClientRect().width);
				});

			dummy.remove();
		}

		if (maxWidth > 0) {
			currentTickMax[id] = maxWidth;
		}

		return currentTickMax[id];
	}

	updateLabels(withTransition) {
		const $$ = this.owner;
		const labels = {
			X: $$.main.select(`.${CLASS.axisX} .${CLASS.axisXLabel}`),
			Y: $$.main.select(`.${CLASS.axisY} .${CLASS.axisYLabel}`),
			Y2: $$.main.select(`.${CLASS.axisY2} .${CLASS.axisY2Label}`)
		};

		Object.keys(labels).filter(id => !labels[id].empty())
			.forEach(v => {
				const node = labels[v];
				const axisLabel = `${v}AxisLabel`;

				(withTransition ? node.transition() : node)
					.attr("x", this[`xFor${axisLabel}`].bind(this))
					.attr("dx", this[`dxFor${axisLabel}`].bind(this))
					.attr("dy", this[`dyFor${axisLabel}`].bind(this))
					.text(this[`textFor${axisLabel}`].bind(this));
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

	redraw(transitions, isHidden) {
		const $$ = this.owner;
		const opacity = isHidden ? "0" : "1";

		["x", "y", "y2", "subX"].forEach(id => {
			const axis = $$[`${id}Axis`];

			if (axis) {
				$$.axes[id.toLowerCase()].style("opacity", opacity);
				axis.create(transitions[`axis${capitalize(id)}`]);
			}
		});

		this.updateAxes();
	}
}
