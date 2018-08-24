/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection"; // selection
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {isValue, extend} from "./util";

extend(ChartInternal.prototype, {
	initRegion() {
		const $$ = this;

		$$.region = $$.main.append("g")
			.attr("clip-path", $$.clipPath)
			.attr("class", CLASS.regions);
	},

	updateRegion(duration) {
		const $$ = this;
		const config = $$.config;

		// hide if arc type
		$$.region.style("visibility", $$.hasArcType() ? "hidden" : "visible");

		// select <g> element
		$$.mainRegion = $$.main.select(`.${CLASS.regions}`)
			.selectAll(`.${CLASS.region}`)
			.data(config.regions);

		$$.mainRegion.exit()
			.transition()
			.duration(duration)
			.style("opacity", "0")
			.remove();

		$$.mainRegion = $$.mainRegion.enter()
			.append("g")
			.merge($$.mainRegion)
			.attr("class", $$.classRegion.bind($$));

		$$.mainRegion
			.append("rect")
			.style("fill-opacity", "0");
	},

	redrawRegion(withTransition) {
		const $$ = this;
		let regions = $$.mainRegion.select("rect");

		regions = (withTransition ? regions.transition() : regions)
			.attr("x", $$.regionX.bind($$))
			.attr("y", $$.regionY.bind($$))
			.attr("width", $$.regionWidth.bind($$))
			.attr("height", $$.regionHeight.bind($$));

		return [
			(withTransition ? regions.transition() : regions)
				.style("fill-opacity", d => (isValue(d.opacity) ? d.opacity : "0.1"))
				.on("end", function() {
					// remove unnecessary rect after transition
					d3Select(this.parentNode)
						.selectAll("rect:not([x])")
						.remove();
				})
		];
	},

	getRegionXY(type, d) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const isX = type === "x";
		let key = "start";
		let scale;
		let pos = 0;

		if (d.axis === "y" || d.axis === "y2") {
			if (!isX) {
				key = "end";
			}

			if ((isX ? isRotated : !isRotated) && key in d) {
				scale = $$[d.axis];
				pos = scale(d[key]);
			}
		} else if ((isX ? !isRotated : isRotated) && key in d) {
			scale = $$.zoomScale || $$.x;
			pos = scale($$.isTimeSeries() ? $$.parseDate(d[key]) : d[key]);
		}

		return pos;
	},

	regionX(d) {
		return this.getRegionXY("x", d);
	},

	regionY(d) {
		return this.getRegionXY("y", d);
	},

	getRegionSize(type, d) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const isWidth = type === "width";
		const start = $$[isWidth ? "regionX" : "regionY"](d);
		let scale;
		let key = "end";
		let end = $$[type];

		if (d.axis === "y" || d.axis === "y2") {
			if (!isWidth) {
				key = "start";
			}

			if ((isWidth ? isRotated : !isRotated) && key in d) {
				scale = $$[d.axis];
				end = scale(d[key]);
			}
		} else if ((isWidth ? !isRotated : isRotated) && key in d) {
			scale = $$.zoomScale || $$.x;
			end = scale($$.isTimeSeries() ? $$.parseDate(d[key]) : d[key]);
		}

		return end < start ? 0 : end - start;
	},

	regionWidth(d) {
		return this.getRegionSize("width", d);
	},

	regionHeight(d) {
		return this.getRegionSize("height", d);
	},

	isRegionOnX(d) {
		return !d.axis || d.axis === "x";
	},
});
