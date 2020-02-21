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
import AxisRenderer from "./AxisRenderer";
import CLASS from "../../config/classes";
import {capitalize, isArray, isFunction, isString, isValue, isEmpty, isNumber, isObjectType, mergeObj, sortValue} from "../../module/util";
import ChartInternal from "../ChartInternal";

export default class Axis {
	public owner: ChartInternal;
	private axesList = {};
	public tick = {
		x: null, y: null, y2: null
	};
	public xs = [];
	private orient = {
		x: "bottom",
		y: "left",
		y2: "right",
		subX: "bottom"
	};

	constructor(owner) {
		this.owner = owner;
		this.setOrient();
	}

	private getAxisClassName(id) {
		return `${CLASS.axis} ${CLASS[`axis${capitalize(id)}`]}`
	}

	private isHorizontal($$, forHorizontal) {
		const isRotated = $$.config.axis_rotated;

		return forHorizontal ? isRotated : !isRotated;
	}

	init() {
		const $$ = this.owner;
		const {config, $el: {main, axis}, state: {clip}} = $$;
		const isRotated = config.axis_rotated;
		const target = ["x", "y"];

		config.axis_y2_show && target.push("y2");

		target.forEach(v => {
			const classAxis = this.getAxisClassName(v);
			const axisId = v.toUpperCase();
			const classLabel = CLASS[`axis${axisId}Label`];

			axis[v] = main.append("g")
				.attr("class", classAxis)
				.attr("clip-path", () => {
					let res = null;

					if (v === "x") {
						res = clip.pathXAxis;
					} else if (v === "y" && config.axis_y_inner) {
						res = clip.pathYAxis;
					}

					return res;
				})
				.attr("transform", $$.getTranslate(v))
				.style("visibility", config[`axis_${v}_show`] ? "visible" : "hidden");

			axis[v].append("text")
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
		const {
			axis_rotated: isRotated,
			axis_y_inner: yInner,
			axis_y2_inner: y2Inner
		} = $$.config;

		this.orient = {
			x: isRotated ? "left" : "bottom",
			y: isRotated ? (yInner ? "top" : "bottom") : (yInner ? "right" : "left"),
			y2: isRotated ? (y2Inner ? "bottom" : "top") : (y2Inner ? "left" : "right"),
			subX: isRotated ? "left" : "bottom"
		};
	}

	/**
	 * Generate axes
	 * It's used when axis' axes option is set
	 * @param {String} id Axis id
	 * @private
	 */
	generateAxes(id: string) {
		const $$ = this.owner;
		const {config} = $$;
		const axes: any[] = [];
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
				const scale = $$.scale[id].copy();

				v.domain && scale.domain(v.domain);

				axes.push(
					d3Axis(scale)
						.ticks(tick.count)
						.tickFormat(isFunction(tick.format) ? tick.format.bind($$.api) : ((x: any) => x))
						.tickValues(tick.values)
						.tickSizeOuter(tick.outer === false ? 0 : 6)
				);
			});
		}

		this.axesList[id] = axes;
	}

	/**
	 * Update axes nodes
	 * @private
	 */
	updateAxes() {
		const $$ = this.owner;
		const {config, $el: {main}} = $$;

		Object.keys(this.axesList).forEach(id => {
			const axesConfig = config[`axis_${id}_axes`];
			const scale = $$.scale[id].copy();
			const range = scale.range();

			this.axesList[id].forEach((v, i) => {
				const axisRange = v.scale().range();

				// adjust range value with the current
				// https://github.com/naver/billboard.js/issues/859
				if (!range.every((v, i) => v === axisRange[i])) {
					v.scale().range(range);
				}

				const className = `${this.getAxisClassName(id)}-${i + 1}`;
				let g = main.select(`.${className.replace(/\s/, ".")}`);

				if (g.empty()) {
					g = main.append("g")
						.attr("class", className)
						.style("visibility", config[`axis_${id}_show`] ? "visible" : "hidden")
						.call(v);
				} else {
					axesConfig[i].domain && scale.domain(axesConfig[i].domain);

					$$.axis.x.helper.transitionise(g)
						.call(v.scale(scale));
				}

				g.attr("transform", $$.getTranslate(id, i + 1));
			});
		});
	}

	// called from : updateScales() & getMaxTickWidth()
	getAxis(name, scale, outerTick, noTransition, noTickTextRotate): AxisRenderer {
		const $$ = this.owner;
		const {config} = $$;
		const isX = /^(x|subX)$/.test(name);
		const type = isX ? "x" : name;

		const isCategory = isX && $$.isCategorized();
		const orient = this.orient[name];

		let tickFormat;

		if (isX) {
			tickFormat = $$.format.xAxisTick;
		} else {
			const fn = config[`axis_${name}_tick_format`];

			if (isFunction(fn)) {
				tickFormat = fn.bind($$.api);
			}
		}

		let tickValues = $$.axis.tick[type];

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
			orgXScale: $$.scale.x
		});

		if (!isX) {
			axisParams.tickStepSize = config[`axis_${type}_tick_stepSize`];
		}

		const axis = new AxisRenderer(axisParams)
			.scale((isX && $$.scale.zoom) || scale)
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

	updateXAxisTickValues(targets, axis?): string[] {
		const $$ = this.owner;
		const {config} = $$;
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
		} else if ($$.axis.x) {
			$$.axis.x.tickValues(values);
			$$.axis.subX && $$.axis.subX.tickValues(values);
		}

		return values;
	}

	getId(id) {
		const {config, scale} = this.owner;
		let axis = config.data_axes[id];

		// when data.axes option has 'y2', but 'axis.y2.show=true' isn't set will return 'y'
		if (!axis || !scale[axis]) {
			axis = "y";
		}

		return axis;
	}

	getXAxisTickFormat() {
		const $$ = this.owner;
		const {config, format} = $$;
		const tickFormat = config.axis_x_tick_format;
		const isTimeSeries = $$.isTimeSeries();
		const isCategorized = $$.isCategorized();
		let currFormat;

		if (tickFormat) {
			if (isFunction(tickFormat)) {
				currFormat = tickFormat.bind($$.api);
			} else if (isTimeSeries) {
				currFormat = date => (date ? format.axisTime(tickFormat)(date) : "");
			}
		} else {
			currFormat = isTimeSeries ? format.defaultAxisTime : (
				isCategorized ?
					$$.categoryName : v => (v < 0 ? v.toFixed(0) : v)
			);
		}

		return isFunction(currFormat) ? v =>
			currFormat.apply($$, isCategorized ?
				[v, $$.categoryName(v)] : [v]
			) : currFormat;
	}

	getTickValues(id) {
		const $$ = this.owner;
		const tickValues = $$.config[`axis_${id}_tick_values`];
		const axis = $$[`${id}Axis`];

		return (isFunction(tickValues) ? tickValues.call($$.api) : tickValues) ||
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
		const {config} = $$;
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
		const {width, height} = $$.state;
		let x = position.isMiddle ? -height / 2 : 0;

		if (this.isHorizontal($$, forHorizontal)) {
			x = position.isLeft ? 0 : (
				position.isCenter ? width / 2 : width
			);
		} else if (position.isBottom) {
			x = -$$.state.height;
		}

		return x;
	}

	dxForAxisLabel(position, forHorizontal = true) {
		const $$ = this.owner;
		let dx = position.isBottom ? "0.5em" : "0";

		if (this.isHorizontal($$, forHorizontal)) {
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

		if (this.isHorizontal($$, forHorizontal)) {
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
		const {config} = $$;
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

	getMaxTickWidth(id: string, withoutRecompute?: boolean): number {
		const $$ = this.owner;
		const {config, $el: {svg, chart}} = $$;
		const currentTickMax = $$.state.currentMaxTickWidths[id];
		let maxWidth = 0;

		if (withoutRecompute || !config[`axis_${id}_show`]) {
			return currentTickMax.size;
		}

		if (svg) {
			const isYAxis = /^y2?$/.test(id);
			const targetsToShow = $$.filterTargetsToShow($$.data.targets);
			const scale = $$.scale[id].copy().domain($$[`get${isYAxis ? "Y" : "X"}Domain`](targetsToShow, id));
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

			const dummy = chart.append("svg")
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
		const {main} = $$.$el;

		const labels = {
			X: main.select(`.${CLASS.axisX} .${CLASS.axisXLabel}`),
			Y: main.select(`.${CLASS.axisY} .${CLASS.axisYLabel}`),
			Y2: main.select(`.${CLASS.axisY2} .${CLASS.axisY2Label}`)
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

		return this.convertPixelsToAxisPadding(p, domainLength);
	}

	convertPixelsToAxisPadding(pixels, domainLength) {
		const $$ = this.owner;
		const {config, state: {width, height}} = $$;
		const length = config.axis_rotated ? width : height;

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
		const axis = $$.$el.axis;

		const [axisX, axisY, axisY2, axisSubX] = ["x", "y", "y2", "subX"]
			.map(v => {
				let ax = axis[v];

				if (ax && duration) {
					ax = ax.transition().duration(duration);
				}

				return ax;
			});

		return {axisX, axisY, axisY2, axisSubX};
	}

	redraw(transitions, isHidden, isInit) {
		const $$ = this.owner;
		const {config, $el} = $$;
		const opacity = isHidden ? "0" : "1";

		["x", "y", "y2", "subX"].forEach(id => {
			const axis = $$.axis[id];
			const $axis = $el.axis[id];

			if (axis && $axis) {
				if (!isInit) {
					axis.config.withoutTransition = !config.transition_duration;
				}

				$axis.style("opacity", opacity);
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
		const {config, scale, $el} = $$;
		const hasZoom = !!scale.zoom;
		let xDomainForZoom;

		if (!hasZoom && $$.isCategorized() && targetsToShow.length === 0) {
			scale.x.domain([0, $el.axis.x.selectAll(".tick").size()]);
		}

		if (scale.x && targetsToShow.length) {
			!hasZoom &&
				$$.updateXDomain(targetsToShow, wth.UpdateXDomain, wth.UpdateOrgXDomain, wth.TrimXDomain);

			if (!config.axis_x_tick_values) {
				this.updateXAxisTickValues(targetsToShow);
			}
		} else if ($$.axis.x) {
			$$.axis.x.tickValues([]);
			$$.axis.subX && $$.axis.subX.tickValues([]);
		}

		if (config.zoom_rescale && !flow) {
			xDomainForZoom = scale.x.orgDomain();
		}

		["y", "y2"].forEach(key => {
			const axis = scale[key];

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
			scale.subY && scale.subY.domain($$.getYDomain(targetsToShow, "y"));
			scale.subY2 && scale.subY2.domain($$.getYDomain(targetsToShow, "y2"));
		}
	}

	/**
	 * Set manual culling
	 * @private
	 */
	setCulling() {
		const $$ = this.owner;
		const {config, $el} = $$;

		["subX", "x", "y", "y2"].forEach(type => {
			const axis = $el.axis[type];

			// subchart x axis should be aligned with x axis culling
			const id = type === "subX" ? "x" : type;
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
