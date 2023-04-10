/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection"; // selection
import {$REGION} from "../../config/classes";
import {isValue, parseDate} from "../../module/util";
import type {AxisType} from "../../../types/types";

export default {
	initRegion() {
		const $$ = this;
		const {$el} = $$;

		$el.region.main = $el.main
			.insert("g", ":first-child")
			.attr("clip-path", $$.state.clip.path)
			.attr("class", $REGION.regions);
	},

	updateRegion(): void {
		const $$ = this;
		const {config, $el: {region}, $T} = $$;

		if (!region.main) {
			$$.initRegion();
		}

		// hide if arc type
		region.main.style("visibility", $$.hasArcType() ? "hidden" : null);

		// select <g> element
		const regions = region.main
			.selectAll(`.${$REGION.region}`)
			.data(config.regions);

		$T(regions.exit())
			.style("opacity", "0")
			.remove();

		const regionsEnter = regions.enter()
			.append("g");

		regionsEnter
			.append("rect")
			.style("fill-opacity", "0");

		region.list = regionsEnter
			.merge(regions)
			.attr("class", $$.classRegion.bind($$));
	},

	redrawRegion(withTransition) {
		const $$ = this;
		const {$el: {region}, $T} = $$;
		let regions = region.list.select("rect");

		regions = $T(regions, withTransition)
			.attr("x", $$.regionX.bind($$))
			.attr("y", $$.regionY.bind($$))
			.attr("width", $$.regionWidth.bind($$))
			.attr("height", $$.regionHeight.bind($$));

		return [
			regions
				.style("fill-opacity", d => (isValue(d.opacity) ? d.opacity : null))
				.on("end", function() {
					// remove unnecessary rect after transition
					d3Select(this.parentNode)
						.selectAll("rect:not([x])")
						.remove();
				})
		];
	},

	getRegionXY(type: AxisType, d): number {
		const $$ = this;
		const {config, scale} = $$;
		const isRotated = config.axis_rotated;
		const isX = type === "x";
		let key = "start";
		let currScale;
		let pos = 0;

		if (d.axis === "y" || d.axis === "y2") {
			if (!isX) {
				key = "end";
			}

			if ((isX ? isRotated : !isRotated) && key in d) {
				currScale = scale[d.axis];
				pos = currScale(d[key]);
			}
		} else if ((isX ? !isRotated : isRotated) && key in d) {
			currScale = scale.zoom || scale.x;
			pos = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key]);
		}

		return pos;
	},

	regionX(d): number {
		return this.getRegionXY("x", d);
	},

	regionY(d): number {
		return this.getRegionXY("y", d);
	},

	getRegionSize(type, d): number {
		const $$ = this;
		const {config, scale, state} = $$;
		const isRotated = config.axis_rotated;
		const isWidth = type === "width";
		const start = $$[isWidth ? "regionX" : "regionY"](d);
		let currScale;
		let key = "end";
		let end = state[type];

		if (d.axis === "y" || d.axis === "y2") {
			if (!isWidth) {
				key = "start";
			}

			if ((isWidth ? isRotated : !isRotated) && key in d) {
				currScale = scale[d.axis];
				end = currScale(d[key]);
			}
		} else if ((isWidth ? !isRotated : isRotated) && key in d) {
			currScale = scale.zoom || scale.x;
			end = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key]);
		}

		return end < start ? 0 : end - start;
	},

	regionWidth(d): number {
		return this.getRegionSize("width", d);
	},

	regionHeight(d): number {
		return this.getRegionSize("height", d);
	},

	isRegionOnX(d): boolean {
		return !d.axis || d.axis === "x";
	},
};
