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
			const axisId = v.toUpperCase();
			const classLabel = CLASS[`axis${axisId}Label`];

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
				.style("text-anchor", this[`textAnchorFor${axisId}AxisLabel`].bind(this));

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
		const type = isX ? "x" : "y";

		const isCategory = isX && $$.isCategorized();
		const orient = $$[`${name}Orient`];
		const tickFormat = isX ? $$.xAxisTickFormat : config[`axis_${name}_tick_format`];
		let tickValues = isX ? $$.xAxisTickValues : $$[`${name}AxisTickValues`];

		const axisParams = mergeObj({
			outerTick,
			noTransition,
			config,
			name,
			tickTextRotate: noTickTextRotate ? 0 : config[`axis_${type}_tick_rotate`]
		}, isX && {
			isCategory,
			tickMultiline: config.axis_x_tick_multiline,
			tickWidth: config.axis_x_tick_width,
			tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
			orgXScale: $$.x
		});

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

		config[`axis_${type}_tick_count`] && axis.ticks(config[`axis_${type}_tick_count`]);

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
		const currentTickMax = $$.currentMaxTickWidths[id];
		let maxWidth = 0;

		if (withoutRecompute || !config[`axis_${id}_show`]) {
			return currentTickMax.size;
		}

		if ($$.svg) {
			const isYAxis = /^y2?$/.test(id);
			const targetsToShow = $$.filterTargetsToShow($$.data.targets);
			const scale = $$[id].copy().domain($$[`get${isYAxis ? "Y" : "X"}Domain`](targetsToShow, id));
			const domain = scale.domain();

			// do not compute if domain is same
			if (isArray(currentTickMax.domain) && currentTickMax.domain.every((v, i) => v === domain[i])) {
				return currentTickMax.size;
			} else {
				currentTickMax.domain = domain;
			}

			const axis = this.getAxis(id, scale, false, false, true);
			const tickCount = config[`axis_${id}_tick_count`];

			// Make to generate the final tick text to be rendered
			// https://github.com/naver/billboard.js/issues/920
			if (tickCount) {
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
				.each(function() {
					maxWidth = Math.max(maxWidth, this.getBoundingClientRect().width);
				});

			dummy.remove();
		}

		if (maxWidth > 0) {
			currentTickMax.size = maxWidth;
		}

		return currentTickMax.size;
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
		const opacity = isHidden ? "0" : "1";

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
			}
		});
	}
}
