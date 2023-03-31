/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
import {select as d3Select} from "d3-selection";
import type {d3Selection} from "../../../types/types";
import Helper from "./AxisRendererHelper";
import {isArray, toArray, isFunction, isString, isNumber} from "../../module/util";

export default class AxisRenderer {
	private helper;
	private config;
	private params;
	private g;
	private generatedTicks: (Date|number)[];

	constructor(params: any = {}) {
		const config = {
			innerTickSize: 6,
			outerTickSize: params.outerTick ? 6 : 0,
			orient: "bottom",
			range: [],
			tickArguments: null,
			tickCentered: null,
			tickCulling: true,
			tickFormat: null,
			tickLength: 9,
			tickOffset: 0,
			tickPadding: 3,
			tickValues: null,
			transition: null,
			noTransition: params.noTransition
		};

		config.tickLength = Math.max(config.innerTickSize, 0) + config.tickPadding;

		this.config = config;
		this.params = params;
		this.helper = new Helper(this);
	}

	/**
	 * Create axis element
	 * @param {d3.selection} g Axis selection
	 * @private
	 */
	create(g: d3Selection): void {
		const ctx = this;
		const {config, helper, params} = ctx;
		const {scale} = helper;
		const {orient} = config;
		const splitTickText = this.splitTickText.bind(ctx);
		const isLeftRight = /^(left|right)$/.test(orient);
		const isTopBottom = /^(top|bottom)$/.test(orient);

		// line/text enter and path update
		const tickTransform = helper.getTickTransformSetter(isTopBottom ? "x" : "y");
		const axisPx = tickTransform === helper.axisX ? "y" : "x";
		const sign = /^(top|left)$/.test(orient) ? -1 : 1;

		// tick text helpers
		const rotate = params.tickTextRotate;

		this.config.range = scale.rangeExtent ?
			scale.rangeExtent() :
			helper.scaleExtent((params.orgXScale || scale).range());

		const {innerTickSize, tickLength, range} = config;

		// // get the axis' tick position configuration
		const id = params.id;
		const tickTextPos = id && /^(x|y|y2)$/.test(id) ?
			params.config[`axis_${id}_tick_text_position`] : {x: 0, y: 0};

		// tick visiblity
		const prefix = id === "subX" ? `subchart_axis_x` : `axis_${id}`;
		const axisShow = params.config[`${prefix}_show`];
		const tickShow = {
			tick: axisShow ? params.config[`${prefix}_tick_show`] : false,
			text: axisShow ? params.config[`${prefix}_tick_text_show`] : false
		};

		let $g;

		g.each(function() {
			const g = d3Select(this);
			let scale0 = this.__chart__ || scale;
			let scale1 = helper.copyScale();

			$g = g;
			this.__chart__ = scale1;

			config.tickOffset = params.isCategory ?
				Math.ceil((scale1(1) - scale1(0)) / 2) : 0;

			// update selection - data join
			const path = g.selectAll(".domain").data([0]);

			// enter + update selection
			path.enter().append("path")
				.attr("class", "domain")
				// https://observablehq.com/@d3/d3-selection-2-0
				.merge(path as d3Selection)
				.attr("d", () => {
					const outerTickSized = config.outerTickSize * sign;

					return isTopBottom ?
						`M${range[0]},${outerTickSized}V0H${range[1]}V${outerTickSized}` :
						`M${outerTickSized},${range[0]}H0V${range[1]}H${outerTickSized}`;
				});

			if (tickShow.tick || tickShow.text) {
				// count of tick data in array
				const ticks = config.tickValues || helper.generateTicks(scale1, isLeftRight);

				// set generated ticks
				ctx.generatedTicks = ticks;

				// update selection
				let tick: d3Selection = g.selectAll(".tick")
					.data(ticks, scale1);

				// enter selection
				const tickEnter = tick
					.enter()
					.insert("g", ".domain")
					.attr("class", "tick");

				// MEMO: No exit transition. The reason is this transition affects max tick width calculation because old tick will be included in the ticks.
				const tickExit = tick.exit().remove();

				// enter + update selection
				tick = tickEnter.merge(tick);

				tickShow.tick && tickEnter.append("line");
				tickShow.text && tickEnter.append("text");

				const sizeFor1Char = Helper.getSizeFor1Char(tick);
				const counts: number[] = [];

				let tspan: d3Selection = tick.select("text")
					.selectAll("tspan")
					.data((d, index) => {
						const split = params.tickMultiline ?
							splitTickText(d, scale1, ticks, isLeftRight, sizeFor1Char.w) : (
								isArray(helper.textFormatted(d)) ?
									helper.textFormatted(d).concat() : [helper.textFormatted(d)]
							);

						counts[index] = split.length;

						return split.map(splitted => ({index, splitted}));
					});

				tspan.exit().remove();

				tspan = tspan
					.enter()
					.append("tspan")
					.merge(tspan)
					.text(d => d.splitted);

				// set <tspan>'s position
				tspan
					.attr("x", isTopBottom ? 0 : tickLength * sign)
					.attr("dx", (() => {
						let dx = 0;

						if (/(top|bottom)/.test(orient) && rotate) {
							dx = 8 * Math.sin(Math.PI * (rotate / 180)) * (orient === "top" ? -1 : 1);
						}

						return dx + (tickTextPos.x || 0);
					})())
					.attr("dy", (d, i) => {
						const defValue = ".71em";
						let dy: number | string = 0;

						if (orient !== "top") {
							dy = sizeFor1Char.h;

							if (i === 0) {
								dy = isLeftRight ? -((counts[d.index] - 1) * (sizeFor1Char.h / 2) - 3) :
									(tickTextPos.y === 0 ? defValue : 0);
							}
						}

						return isNumber(dy) && tickTextPos.y ?
							dy + tickTextPos.y : dy || defValue;
					});

				const lineUpdate = tick.select("line");
				const textUpdate = tick.select("text");

				tickEnter.select("line").attr(`${axisPx}2`, innerTickSize * sign);
				tickEnter.select("text").attr(axisPx, tickLength * sign);

				ctx.setTickLineTextPosition(lineUpdate, textUpdate);

				// Append <title> for tooltip display
				if (params.tickTitle) {
					const title = textUpdate.select("title");

					(title.empty() ? textUpdate.append("title") : title)
						.text(index => params.tickTitle[index]);
				}

				if (scale1.bandwidth) {
					const x = scale1;
					const dx = x.bandwidth() / 2;

					scale0 = d => x(d) + dx;
					scale1 = scale0;
				} else if (scale0.bandwidth) {
					scale0 = scale1;
				} else {
					tickTransform(tickExit, scale1);
				}

				// when .flow(), it should follow flow's transition config
				// otherwise make to use ChartInternals.$T()
				tick = params.owner.state.flowing ?
					helper.transitionise(tick) :
					params.owner.$T(tick);

				tickTransform(tickEnter, scale0);
				tickTransform(tick.style("opacity", null), scale1);
			}
		});

		this.g = $g;
	}

	/**
	 * Get generated ticks
	 * @param {number} count Count of ticks
	 * @returns {Array} Generated ticks
	 * @private
	 */
	getGeneratedTicks(count: number): (Date|number)[] {
		const len = this.generatedTicks?.length - 1;
		let res = this.generatedTicks;

		if (len > count) {
			const interval = Math.round((len / count) + 0.1);

			res = this.generatedTicks
				.map((v, i) => (i % interval === 0 ? v : null))
				.filter(v => v !== null)
				.splice(0, count) as (Date|number)[];
		}

		return res;
	}

	/**
	 * Get tick x/y coordinate
	 * @returns {{x: number, y: number}}
	 * @private
	 */
	getTickXY(): {x: number, y: number} {
		const {config} = this;
		const pos = {x: 0, y: 0};

		if (this.params.isCategory) {
			pos.x = config.tickCentered ? 0 : config.tickOffset;
			pos.y = config.tickCentered ? config.tickOffset : 0;
		}

		return pos;
	}

	/**
	 * Get tick size
	 * @param {object} d data object
	 * @returns {number}
	 * @private
	 */
	getTickSize(d): number {
		const {scale} = this.helper;
		const {config} = this;
		const {innerTickSize, range} = config;

		const tickPosition = scale(d) +
			(config.tickCentered ? 0 : config.tickOffset);

		return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;
	}

	/**
	 * Set tick's line & text position
	 * @param {d3.selection} lineUpdate Line selection
	 * @param {d3.selection} textUpdate Text selection
	 * @private
	 */
	setTickLineTextPosition(lineUpdate, textUpdate): void {
		const tickPos = this.getTickXY();
		const {innerTickSize, orient, tickLength, tickOffset} = this.config;
		const rotate = this.params.tickTextRotate;

		const textAnchorForText = r => {
			const value = ["start", "end"];

			orient === "top" && value.reverse();

			return !r ? "middle" : value[r > 0 ? 0 : 1];
		};
		const textTransform = r => (r ? `rotate(${r})` : null);
		const yForText = r => {
			const r2 = r / (orient === "bottom" ? 15 : 23);

			return r ? 11.5 - 2.5 * r2 * (r > 0 ? 1 : -1) : tickLength;
		};

		switch (orient) {
			case "bottom":
				lineUpdate
					.attr("x1", tickPos.x)
					.attr("x2", tickPos.x)
					.attr("y2", this.getTickSize.bind(this));

				textUpdate
					.attr("x", 0)
					.attr("y", yForText(rotate))
					.style("text-anchor", textAnchorForText(rotate))
					.attr("transform", textTransform(rotate));
				break;
			case "top":
				lineUpdate
					.attr("x2", 0)
					.attr("y2", -innerTickSize);

				textUpdate
					.attr("x", 0)
					.attr("y", -yForText(rotate) * 2)
					.style("text-anchor", textAnchorForText(rotate))
					.attr("transform", textTransform(rotate));
				break;
			case "left":
				lineUpdate
					.attr("x2", -innerTickSize)
					.attr("y1", tickPos.y)
					.attr("y2", tickPos.y);

				textUpdate
					.attr("x", -tickLength)
					.attr("y", tickOffset)
					.style("text-anchor", "end");
				break;
			case "right":
				lineUpdate
					.attr("x2", innerTickSize)
					.attr("y2", 0);

				textUpdate
					.attr("x", tickLength)
					.attr("y", 0)
					.style("text-anchor", "start");
		}
	}

	// this should be called only when category axis
	splitTickText(d, scale, ticks, isLeftRight, charWidth) {
		const {params} = this;
		const tickText = this.helper.textFormatted(d);
		const splitted = isString(tickText) && tickText.indexOf("\n") > -1 ?
			tickText.split("\n") : [];

		if (splitted.length) {
			return splitted;
		}

		if (isArray(tickText)) {
			return tickText;
		}

		let tickWidth = params.tickWidth;

		if (!tickWidth || tickWidth <= 0) {
			tickWidth = isLeftRight ? 95 : (
				params.isCategory ?	(
					Math.ceil(
						params.isInverted ?
							scale(ticks[0]) - scale(ticks[1]) :
							scale(ticks[1]) - scale(ticks[0])
					) - 12
				) : 110
			);
		}

		// split given text by tick width size
		// eslint-disable-next-line
		function split(splitted, text) {
			let subtext;
			let spaceIndex;
			let textWidth;

			for (let i = 1; i < text.length; i++) {
				if (text.charAt(i) === " ") {
					spaceIndex = i;
				}

				subtext = text.substr(0, i + 1);
				textWidth = charWidth * subtext.length;

				// if text width gets over tick width, split by space index or current index
				if (tickWidth < textWidth) {
					return split(
						splitted.concat(text.substr(0, spaceIndex || i)),
						text.slice(spaceIndex ? spaceIndex + 1 : i)
					);
				}
			}

			return splitted.concat(text);
		}

		return split(splitted, String(tickText));
	}

	scale(x?): AxisRenderer {
		if (!arguments.length) {
			return this.helper.scale;
		}

		this.helper.scale = x;

		return this;
	}

	orient(x): AxisRenderer {
		if (!arguments.length) {
			return this.config.orient;
		}

		this.config.orient = x in {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1
		} ? String(x) : "bottom";

		return this;
	}

	tickFormat(format): AxisRenderer {
		const {config} = this;

		if (!arguments.length) {
			return config.tickFormat;
		}

		config.tickFormat = format;

		return this;
	}

	tickCentered(isCentered: boolean): AxisRenderer {
		const {config} = this;

		if (!arguments.length) {
			return config.tickCentered;
		}

		config.tickCentered = isCentered;

		return this;
	}

	/**
	 * Return tick's offset value.
	 * The value will be set for 'category' axis type.
	 * @returns {number}
	 * @private
	 */
	tickOffset(): number {
		return this.config.tickOffset;
	}

	/**
	 * Get tick interval count
	 * @private
	 * @param {number} size Total data size
	 * @returns {number}
	 */
	tickInterval(size: number): number {
		const {outerTickSize, tickOffset, tickValues} = this.config;
		let interval;

		if (this.params.isCategory) {
			interval = tickOffset * 2;
		} else {
			const length = this.g.select("path.domain")
				.node()
				.getTotalLength() - outerTickSize * 2;

			interval = length / (size || this.g.selectAll("line").size());

			// get the interval by its values
			const intervalByValue = tickValues ? tickValues
				.map((v, i, arr) => {
					const next = i + 1;

					return next < arr.length ?
						this.helper.scale(arr[next]) - this.helper.scale(v) : null;
				}).filter(Boolean) : [];

			interval = Math.min(...intervalByValue, interval);
		}

		return interval === Infinity ? 0 : interval;
	}

	ticks(...args): AxisRenderer {
		const {config} = this;

		if (!args.length) {
			return config.tickArguments;
		}

		config.tickArguments = toArray(args);

		return this;
	}

	tickCulling(culling): AxisRenderer {
		const {config} = this;

		if (!arguments.length) {
			return config.tickCulling;
		}

		config.tickCulling = culling;

		return this;
	}

	tickValues(x?: (number|Date|string)[]|Function): AxisRenderer | (number|Date|string)[] {
		const {config} = this;

		if (isFunction(x)) {
			config.tickValues = () => x(this.helper.scale.domain());
		} else {
			if (!arguments.length) {
				return config.tickValues;
			}

			config.tickValues = x;
		}

		return this;
	}

	setTransition(t): AxisRenderer {
		this.config.transition = t;

		return this;
	}
}
