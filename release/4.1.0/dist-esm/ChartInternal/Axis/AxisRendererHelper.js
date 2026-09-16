/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isDefined, isValue } from "../../module/util/type-checks.js";
import { getBBox } from "../../module/util/dom.js";
import { getScale } from "../internals/scale.js";
//#region src/ChartInternal/Axis/AxisRendererHelper.ts
var AxisRendererHelper = class {
	owner;
	config;
	scale;
	charSize = {};
	constructor(owner) {
		const scale = getScale();
		const { config, params } = owner;
		this.owner = owner;
		this.config = config;
		this.scale = scale;
		if (config.noTransition || !params.config.transition_duration) config.withoutTransition = true;
		config.range = this.scaleExtent((params.orgXScale || scale).range());
	}
	/**
	* Compute a character dimension
	* @param {string} orient Axis orientation
	* @param {d3.selection} text SVG text selection
	* @param {boolean} memoize memoize the calculated size
	* @returns {{w: number, h: number}}
	* @private
	*/
	getSizeFor1Char(orient, text, memoize = true) {
		const size = {
			w: 5.5,
			h: 11.5
		};
		if (this.charSize[orient] && memoize) return this.charSize[orient];
		!text.empty() && text.text("0").call((el) => {
			try {
				const { width, height } = getBBox(el.node(), true);
				if (width && height) {
					size.w = width;
					size.h = height;
				}
			} finally {
				el.text("");
			}
		});
		this.charSize[orient] = size;
		return size;
	}
	/**
	* Get tick transform setter function
	* @param {string} id Axis id
	* @returns {function(d3Selection, d3Scale): void} transform setter function
	* @private
	*/
	getTickTransformSetter(id) {
		const { config } = this;
		const fn = id === "x" ? (value) => `translate(${value + config.tickOffset},0)` : (value) => `translate(0,${value})`;
		return (selection, scale) => {
			selection.attr("transform", (d) => {
				const x = scale(d);
				return isValue(d) ? fn(x) : null;
			});
		};
	}
	scaleExtent(domain) {
		const start = domain[0];
		const stop = domain[domain.length - 1];
		return start < stop ? [start, stop] : [stop, start];
	}
	generateTicks(scale, isYAxes) {
		const { tickStepSize } = this.owner.params;
		const [start, end] = scale.domain();
		let ticks = [];
		if (isYAxes && tickStepSize) {
			let interval = Math.round(start);
			while (interval <= end) {
				ticks.push(interval);
				interval += tickStepSize;
			}
		} else if (scale.ticks) {
			const { tickArguments } = this.config;
			if (scale.type === "log" && !tickArguments) {
				const s = getScale("_log").domain([start > 0 ? start : 1, end]).range(scale.range());
				ticks = s.ticks();
				for (let cnt = end.toFixed().length; ticks.length > 15; cnt--) ticks = s.ticks(cnt);
				ticks.splice(0, 1, start);
				ticks.splice(ticks.length - 1, 1, end);
			} else ticks = scale.ticks(...this.config.tickArguments || []);
		}
		return ticks;
	}
	copyScale() {
		const newScale = this.scale.copy();
		if (!newScale.domain().length) newScale.domain(this.scale.domain());
		newScale.type = this.scale.type;
		return newScale;
	}
	textFormatted(v) {
		const tickFormat = this.config.tickFormat;
		const value = /\d+\.\d+0{5,}\d$/.test(v) ? +String(v).replace(/0+\d$/, "") : v;
		const formatted = tickFormat ? tickFormat(value) : value;
		return isDefined(formatted) ? formatted : "";
	}
	transitionise(selection) {
		const { config } = this;
		let transitionSelection = selection;
		if (config.withoutTransition) transitionSelection = selection.interrupt();
		else if (config.transition || !this.owner.params.noTransition) try {
			transitionSelection = selection.transition(config.transition);
		} catch {}
		return transitionSelection;
	}
};
//#endregion
export { AxisRendererHelper as default };
