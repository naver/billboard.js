/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
import {scaleLinear as d3ScaleLinear} from "d3-scale";
import {isDefined, isNumber, isString} from "../internals/util";

export default class AxisRendererHelper {
	constructor(owner) {
		const scale = d3ScaleLinear();
		const {config, params} = owner;

		this.owner = owner;
		this.config = config;
		this.scale = scale;

		if (config.noTransition || !params.config.transition_duration) {
			config.withoutTransition = true;
		}

		// set range
		config.range = scale.rangeExtent ?
			scale.rangeExtent() :
			this.scaleExtent((params.orgXScale || scale).range());
	}

	/**
	 * Compute a character dimension
	 * @param {d3.selection} node
	 * @return {{w: number, h: number}}
	 * @private
	 */
	static getSizeFor1Char(node) {
		// default size for one character
		const size = {
			w: 5.5,
			h: 11.5
		};

		!node.empty() && node.select("text")
			.text("0")
			.call(el => {
				try {
					const {width, height} = el.node().getBBox();

					if (width && height) {
						size.w = width;
						size.h = height;
					}
				} catch (e) {
				} finally {
					el.text("");
				}
			});

		this.getSizeFor1Char = () => size;

		return size;
	}

	/**
	 * Get tick transform setter function
	 * @param {String} id Axis id
	 * @private
	 */
	getTickTransformSetter(id) {
		const {config} = this;
		const fn = id === "x" ?
			value => `translate(${value + config.tickOffset},0)` :
			value => `translate(0,${value})`;

		return (selection, scale) => {
			selection.attr("transform", d => fn(Math.ceil(scale(d))));
		};
	}

	scaleExtent(domain) {
		const start = domain[0];
		const stop = domain[domain.length - 1];

		return start < stop ? [start, stop] : [stop, start];
	}

	generateTicks(scale, isYAxes) {
		const {tickStepSize} = this.owner.params;
		let ticks = [];

		// When 'axis[y|y2].tick.stepSize' option is set
		if (isYAxes && tickStepSize) {
			const [start, end] = scale.domain();
			let interval = start;

			while (interval <= end) {
				ticks.push(interval);
				interval += tickStepSize;
			}
		} else if (scale.ticks) {
			ticks = scale.ticks(
				...(this.config.tickArguments || [])
			).map(v => (
				// round the tick value if is number
				(isString(v) && isNumber(v) && !isNaN(v) &&
					Math.round(v * 10) / 10
				) || v
			));
		} else {
			const domain = scale.domain();

			for (let i = Math.ceil(domain[0]); i < domain[1]; i++) {
				ticks.push(i);
			}

			if (ticks.length > 0 && ticks[0] > 0) {
				ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));
			}
		}

		return ticks;
	}

	copyScale() {
		const newScale = this.scale.copy();

		if (!newScale.domain().length) {
			newScale.domain(this.scale.domain());
		}

		return newScale;
	}

	textFormatted(v) {
		const tickFormat = this.config.tickFormat;

		// to round float numbers from 'binary floating point'
		// https://en.wikipedia.org/wiki/Double-precision_floating-point_format
		// https://stackoverflow.com/questions/17849101/laymans-explanation-for-why-javascript-has-weird-floating-math-ieee-754-stand
		const value = /\d+\.\d+0{5,}\d$/.test(v) ? +String(v).replace(/0+\d$/, "") : v;
		const formatted = tickFormat ? tickFormat(value) : value;

		return isDefined(formatted) ? formatted : "";
	}

	transitionise(selection) {
		const config = this.config;

		return config.withoutTransition ?
			selection.interrupt() : selection.transition(config.transition);
	}
}
