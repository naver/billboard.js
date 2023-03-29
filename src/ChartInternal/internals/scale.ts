/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	scaleTime as d3ScaleTime,
	scaleUtc as d3ScaleUtc,
	scaleLinear as d3ScaleLinear,
	scaleLog as d3ScaleLog,
	scaleSymlog as d3ScaleSymlog
} from "d3-scale";
import {isString, isValue, parseDate} from "../../module/util";
import type {IDataRow, IGridData} from "../data/IData";


/**
 * Get scale
 * @param {string} [type='linear'] Scale type
 * @param {number} [min] Min range
 * @param {number} [max] Max range
 * @returns {d3.scaleLinear|d3.scaleTime} scale
 * @private
 */
export function getScale(type = "linear", min = 0, max = 1): any {
	const scale = ({
		linear: d3ScaleLinear,
		log: d3ScaleSymlog,
		_log: d3ScaleLog,
		time: d3ScaleTime,
		utc: d3ScaleUtc
	})[type]();

	scale.type = type;
	/_?log/.test(type) && scale.clamp(true);

	return scale.range([min, max]);
}

export default {
	/**
	 * Get x Axis scale function
	 * @param {number} min Min value
	 * @param {number} max Max value
	 * @param {Array} domain Domain value
	 * @param {Function} offset The offset getter to be sum
	 * @returns {Function} scale
	 * @private
	 */
	getXScale(min: number, max: number, domain: number[], offset: Function) {
		const $$ = this;
		const scale = $$.scale.zoom || getScale($$.axis.getAxisType("x"), min, max);

		return $$.getCustomizedXScale(
			domain ? scale.domain(domain) : scale,
			offset
		);
	},

	/**
	 * Get y Axis scale function
	 * @param {string} id Axis id: 'y' or 'y2'
	 * @param {number} min Min value
	 * @param {number} max Max value
	 * @param {Array} domain Domain value
	 * @returns {Function} Scale function
	 * @private
	 */
	getYScale(id: "y" | "y2", min: number, max: number, domain: number[]): Function {
		const $$ = this;
		const scale = getScale($$.axis.getAxisType(id), min, max);

		domain && scale.domain(domain);

		return scale;
	},

	/**
	 * Get y Axis scale
	 * @param {string} id Axis id
	 * @param {boolean} isSub Weather is sub Axis
	 * @returns {Function} Scale function
	 * @private
	 */
	getYScaleById(id: string, isSub = false): Function {
		const isY2 = this.axis?.getId(id) === "y2";
		const key = isSub ? (isY2 ? "subY2" : "subY") : (isY2 ? "y2" : "y");

		return this.scale[key];
	},

	/**
	 * Get customized x axis scale
	 * @param {d3.scaleLinear|d3.scaleTime} scaleValue Scale function
	 * @param {Function} offsetValue Offset getter to be sum
	 * @returns {Function} Scale function
	 * @private
	 */
	getCustomizedXScale(scaleValue: Function | any, offsetValue): Function {
		const $$ = this;
		const offset = offsetValue || (() => $$.axis.x.tickOffset());
		const isInverted = $$.config.axis_x_inverted;
		const scale = function(d, raw) {
			const v = scaleValue(d) + offset();

			return raw ? v : Math.ceil(v);
		};

		// copy original scale methods
		for (const key in scaleValue) {
			scale[key] = scaleValue[key];
		}

		scale.orgDomain = () => scaleValue.domain();
		scale.orgScale = () => scaleValue;

		// define custom domain() for categorized axis
		if ($$.axis.isCategorized()) {
			scale.domain = function(domainValue) {
				let domain = domainValue;

				if (!arguments.length) {
					domain = this.orgDomain();

					return isInverted ?
						[domain[0] + 1, domain[1]] :
						[domain[0], domain[1] + 1];
				}

				scaleValue.domain(domain);

				return scale;
			};
		}

		return scale;
	},

	/**
	 * Update scale
	 * @param {boolean} isInit Param is given at the init rendering
	 * @param {boolean} updateXDomain If update x domain
	 * @private
	 */
	updateScales(isInit: boolean, updateXDomain = true): void {
		const $$ = this;
		const {axis, config, format, org, scale,
			state: {current, width, height, width2, height2, hasAxis, hasTreemap}
		} = $$;

		if (hasAxis) {
			const isRotated = config.axis_rotated;
			const resettedPadding = $$.getResettedPadding(1);

			// update edges
			const min = {
				x: isRotated ? resettedPadding : 0,
				y: isRotated ? 0 : height,
				subX: isRotated ? 1 : 0,
				subY: isRotated ? 0 : height2
			};

			const max = {
				x: isRotated ? height : width,
				y: isRotated ? width : resettedPadding,
				subX: isRotated ? height : width,
				subY: isRotated ? width2 : 1
			};

			// update scales
			// x Axis
			const xDomain = updateXDomain && scale.x?.orgDomain();
			const xSubDomain = updateXDomain && org.xDomain;

			scale.x = $$.getXScale(min.x, max.x, xDomain, () => axis.x.tickOffset());
			scale.subX = $$.getXScale(min.x, max.x, xSubDomain, d => (
				d % 1 ? 0 : (axis.subX ?? axis.x).tickOffset())
			);

			format.xAxisTick = axis.getXAxisTickFormat();
			format.subXAxisTick = axis.getXAxisTickFormat(true);

			axis.setAxis("x", scale.x, config.axis_x_tick_outer, isInit);

			if (config.subchart_show) {
				axis.setAxis("subX", scale.subX, config.axis_x_tick_outer, isInit);
			}

			// y Axis
			scale.y = $$.getYScale("y", min.y, max.y, scale.y ? scale.y.domain() : config.axis_y_default);
			scale.subY = $$.getYScale(
				"y", min.subY, max.subY, scale.subY ? scale.subY.domain() : config.axis_y_default);

			axis.setAxis("y", scale.y, config.axis_y_tick_outer, isInit);

			// y2 Axis
			if (config.axis_y2_show) {
				scale.y2 = $$.getYScale("y2", min.y, max.y, scale.y2 ? scale.y2.domain() : config.axis_y2_default);
				scale.subY2 = $$.getYScale(
					"y2", min.subY, max.subY, scale.subY2 ? scale.subY2.domain() : config.axis_y2_default);

				axis.setAxis("y2", scale.y2, config.axis_y2_tick_outer, isInit);
			}
		} else if (hasTreemap) {
			const padding = $$.getCurrentPadding();

			scale.x = d3ScaleLinear().rangeRound([padding.left, current.width - padding.right]);
			scale.y = d3ScaleLinear().rangeRound([padding.top, current.height - padding.bottom]);
		} else {
			// update for arc
			$$.updateArc?.();
		}
	},

	/**
	 * Get the zoom or unzoomed scaled value
	 * @param {Date|number|object} d Data value
	 * @returns {number|null}
	 * @private
	 */
	xx(d: IDataRow): number | null {
		const $$ = this;
		const {config, scale: {x, zoom}} = $$;
		const fn = config.zoom_enabled && zoom ? zoom : x;

		return d ? fn(isValue(d.x) ? d.x : d) : null;
	},

	xv(d: IGridData): number {
		const $$ = this;
		const {axis, config, scale: {x, zoom}} = $$;
		const fn = config.zoom_enabled && zoom ? zoom : x;
		let value = $$.getBaseValue(d);

		if (axis.isTimeSeries()) {
			value = parseDate.call($$, value);
		} else if (axis.isCategorized() && isString(value)) {
			value = config.axis_x_categories.indexOf(value);
		}

		return Math.ceil(fn(value));
	},

	yv(d: IGridData): number {
		const $$ = this;
		const {scale: {y, y2}} = $$;
		const yScale = d.axis && d.axis === "y2" ? y2 : y;

		return Math.ceil(yScale($$.getBaseValue(d)));
	},

	subxx(d: IDataRow): number | null {
		return d ? this.scale.subX(d.x) : null;
	}
};
