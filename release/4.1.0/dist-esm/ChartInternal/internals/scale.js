/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isString, isValue } from "../../module/util/type-checks.js";
import { parseDate } from "../../module/util/object.js";
import { scaleLinear, scaleLog, scaleSymlog, scaleTime, scaleUtc } from "d3-scale";
//#region src/ChartInternal/internals/scale.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Get scale
* @param {string} [type='linear'] Scale type
* @param {number|Date} [min] Min range
* @param {number|Date} [max] Max range
* @returns {d3.scaleLinear|d3.scaleTime} scale
* @private
*/
function getScale(type = "linear", min, max) {
	const scale = {
		linear: scaleLinear,
		log: scaleSymlog,
		_log: scaleLog,
		time: scaleTime,
		utc: scaleUtc
	}[type]();
	scale.type = type;
	/_?log/.test(type) && scale.clamp(true);
	return scale.range([min ?? 0, max ?? 1]);
}
var scale_default = {
	/**
	* Get x Axis scale function
	* @param {number} min Min range value
	* @param {number} max Max range value
	* @param {Array} domain Domain value
	* @param {function} offset The offset getter to be sum
	* @returns {function} scale
	* @private
	*/
	getXScale(min, max, domain, offset) {
		const $$ = this;
		const scale = $$.state.loading !== "append" && $$.scale.zoom || getScale($$.axis.getAxisType("x"), min, max);
		return $$.getCustomizedXScale(domain ? scale.domain(domain) : scale, offset);
	},
	/**
	* Get y Axis scale function
	* @param {string} id Axis id: 'y' or 'y2'
	* @param {number} min Min value
	* @param {number} max Max value
	* @param {Array} domain Domain value
	* @param {object} [existing] Existing scale function to be updated
	* @returns {function} Scale function
	* @private
	*/
	getYScale(id, min, max, domain, existing) {
		const type = this.axis.getAxisType(id);
		if (existing && existing.type === type) {
			existing.range([min, max]);
			domain && existing.domain(domain);
			return existing;
		}
		const scale = getScale(type, min, max);
		domain && scale.domain(domain);
		return scale;
	},
	/**
	* Get y Axis scale
	* @param {string} id Axis id
	* @param {boolean} isSub Weather is sub Axis
	* @returns {function} Scale function
	* @private
	*/
	getYScaleById(id, isSub = false) {
		const isY2 = this.axis?.getId(id) === "y2";
		const key = isSub ? isY2 ? "subY2" : "subY" : isY2 ? "y2" : "y";
		return this.scale[key];
	},
	/**
	* Get customized x axis scale
	* @param {d3.scaleLinear|d3.scaleTime} scaleValue Scale function
	* @param {function} offsetValue Offset getter to be sum
	* @returns {function} Scale function
	* @private
	*/
	getCustomizedXScale(scaleValue, offsetValue) {
		const $$ = this;
		const offset = () => {
			return (offsetValue ? offsetValue() : $$.axis.x.tickOffset()) || ($$.axis.isCategorized() ? (scaleValue(1) - scaleValue(0)) / 2 : 0);
		};
		const isInverted = $$.config.axis_x_inverted;
		/**
		* Get scaled value
		* @param {object} d Data object
		* @returns {number}
		* @private
		*/
		const scale = function(d) {
			return scaleValue(d) + offset();
		};
		for (const key in scaleValue) scale[key] = scaleValue[key];
		scale.orgDomain = () => scaleValue.domain();
		scale.orgScale = () => scaleValue;
		if ($$.axis.isCategorized()) scale.domain = function(domainValue) {
			let domain = domainValue;
			if (!arguments.length) {
				domain = this.orgDomain();
				return isInverted ? [domain[0] + 1, domain[1]] : [domain[0], domain[1] + 1];
			}
			scaleValue.domain(domain);
			return scale;
		};
		return scale;
	},
	/**
	* Update scale
	* @param {boolean} isInit Param is given at the init rendering
	* @param {boolean} updateXDomain If update x domain
	* @private
	*/
	updateScales(isInit, updateXDomain = true) {
		const $$ = this;
		const { axis, config, format, org, scale, state: { current, width, height, width2, height2, hasAxis, hasTreemap } } = $$;
		if (hasAxis) {
			const isRotated = config.axis_rotated;
			const resettedPadding = $$.getResettedPadding(1);
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
			const xDomain = updateXDomain ? scale.x?.orgDomain() : scale.zoom ? void 0 : scale.x?.domain?.();
			const xSubDomain = updateXDomain ? org.xDomain : scale.zoom ? void 0 : scale.subX?.domain?.();
			scale.x = $$.getXScale(min.x, max.x, xDomain, () => axis.x.tickOffset());
			scale.subX = $$.getXScale(min.x, max.x, xSubDomain, (d) => d % 1 ? 0 : (axis.subX ?? axis.x).tickOffset());
			format.xAxisTick = axis.getXAxisTickFormat();
			format.subXAxisTick = axis.getXAxisTickFormat(true);
			axis.setAxis("x", scale.x, config.axis_x_tick_outer, isInit);
			if (config.subchart_show) axis.setAxis("subX", scale.subX, config.subchart_axis_x_tick_outer ?? config.axis_x_tick_outer, isInit);
			scale.y = $$.getYScale("y", min.y, max.y, scale.y ? scale.y.domain() : config.axis_y_default, scale.y);
			scale.subY = $$.getYScale("y", min.subY, max.subY, scale.subY ? scale.subY.domain() : config.axis_y_default, scale.subY);
			axis.setAxis("y", scale.y, config.axis_y_tick_outer, isInit);
			config.subchart_show && config.subchart_axis_y_show && axis.setAxis("subY", scale.subY, config.subchart_axis_y_tick_outer ?? config.axis_y_tick_outer, isInit);
			if (config.axis_y2_show || config.subchart_axis_y2_show) {
				scale.y2 = $$.getYScale("y2", min.y, max.y, scale.y2 ? scale.y2.domain() : config.axis_y2_default, scale.y2);
				scale.subY2 = $$.getYScale("y2", min.subY, max.subY, scale.subY2 ? scale.subY2.domain() : config.axis_y2_default, scale.subY2);
				axis.setAxis("y2", scale.y2, config.axis_y2_tick_outer, isInit);
				config.subchart_show && config.subchart_axis_y2_show && axis.setAxis("subY2", scale.subY2, config.subchart_axis_y2_tick_outer ?? config.axis_y2_tick_outer, isInit);
			}
		} else if (hasTreemap) {
			const padding = $$.getCurrentPadding();
			scale.x = scaleLinear().rangeRound([padding.left, current.width - padding.right]);
			scale.y = scaleLinear().rangeRound([padding.top, current.height - padding.bottom]);
		} else $$.updateArc?.();
	},
	/**
	* Get the zoom or unzoomed scaled value
	* @param {Date|number|object} d Data value
	* @returns {number|null}
	* @private
	*/
	xx(d) {
		const { config, scale: { x, zoom } } = this;
		return d ? (config.zoom_enabled && zoom ? zoom : x)(isValue(d.x) ? d.x : d) : null;
	},
	xv(d) {
		const $$ = this;
		const { axis, config, scale: { x, zoom } } = $$;
		const fn = config.zoom_enabled && zoom ? zoom : x;
		let value = $$.getBaseValue(d);
		if (axis.isTimeSeries()) value = parseDate.call($$, value);
		else if (axis.isCategorized() && isString(value)) value = config.axis_x_categories.indexOf(value);
		return fn(value);
	},
	yv(d) {
		const $$ = this;
		const { scale: { y, y2 } } = $$;
		return (d.axis && d.axis === "y2" ? y2 : y)($$.getBaseValue(d));
	},
	subxx(d) {
		return d ? this.scale.subX(d.x) : null;
	}
};
//#endregion
export { scale_default as default, getScale };
