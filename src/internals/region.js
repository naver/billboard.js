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
		const x = $$.regionX.bind($$);
		const y = $$.regionY.bind($$);
		const w = $$.regionWidth.bind($$);
		const h = $$.regionHeight.bind($$);

		let regions = $$.mainRegion.select("rect");

		regions = (withTransition ? regions.transition() : regions)
			.attr("x", x)
			.attr("y", y)
			.attr("width", w)
			.attr("height", h);

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

	regionX(d) {
		const $$ = this;
		const config = $$.config;
		const yScale = d.axis === "y" ? $$.y : $$.y2;
		let xPos;

		if (d.axis === "y" || d.axis === "y2") {
			xPos = config.axis_rotated ? (
				"start" in d ? yScale(d.start) : 0
			) : 0;
		} else {
			xPos = config.axis_rotated ? 0 : (
				"start" in d ? $$.x(
					$$.isTimeSeries() ? $$.parseDate(d.start) : d.start
				) : 0
			);
		}

		return xPos;
	},

	regionY(d) {
		const $$ = this;
		const config = $$.config;
		const yScale = d.axis === "y" ? $$.y : $$.y2;
		let yPos;

		if (d.axis === "y" || d.axis === "y2") {
			yPos = config.axis_rotated ? 0 : (
				"end" in d ? yScale(d.end) : 0
			);
		} else {
			yPos = config.axis_rotated ? (
				"start" in d ? $$.x(
					$$.isTimeSeries() ? $$.parseDate(d.start) : d.start
				) : 0
			) : 0;
		}

		return yPos;
	},

	regionWidth(d) {
		const $$ = this;
		const config = $$.config;
		const yScale = d.axis === "y" ? $$.y : $$.y2;
		const start = $$.regionX(d);
		let end;

		if (d.axis === "y" || d.axis === "y2") {
			end = config.axis_rotated ? (
				"end" in d ? yScale(d.end) : $$.width
			) : $$.width;
		} else {
			end = config.axis_rotated ?
				$$.width : "end" in d ?
					$$.x($$.isTimeSeries() ? $$.parseDate(d.end) : d.end) :
					$$.width;
		}

		return end < start ? 0 : end - start;
	},

	regionHeight(d) {
		const $$ = this;
		const config = $$.config;
		const start = this.regionY(d);
		let end;
		const yScale = d.axis === "y" ? $$.y : $$.y2;

		if (d.axis === "y" || d.axis === "y2") {
			end = config.axis_rotated ?
				$$.height : (
					"start" in d ? yScale(d.start) : $$.height
				);
		} else {
			end = config.axis_rotated ? (
				"end" in d ? $$.x(
					$$.isTimeSeries() ? $$.parseDate(d.end) : d.end
				) : $$.height
			) : $$.height;
		}

		return end < start ? 0 : end - start;
	},

	isRegionOnX(d) {
		return !d.axis || d.axis === "x";
	},
});
