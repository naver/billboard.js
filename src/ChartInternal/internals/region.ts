/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection"; // selection
import type {RegionOptions} from "../../../types/options";
import type {AxisType} from "../../../types/types";
import {$REGION} from "../../config/classes";
import {isValue, parseDate} from "../../module/util";

export default {
	initRegion(): void {
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

		const regionsEnter = regions
			.enter()
			.append("g");

		regionsEnter
			.append("rect")
			.style("fill-opacity", "0");

		region.list = regionsEnter
			.merge(regions)
			.attr("class", $$.classRegion.bind($$));

		region.list.each(function(d) {
			const g = d3Select(this);

			if (g.select("text").empty() && d.label?.text) {
				d3Select(this).append("text")
					.style("opacity", "0");
			}
		});
	},

	redrawRegion(withTransition: boolean) {
		const $$ = this;
		const {$el: {region}, $T} = $$;
		let regions = region.list.select("rect");
		let label = region.list.selectAll("text");

		regions = $T(regions, withTransition)
			.attr("x", $$.regionX.bind($$))
			.attr("y", $$.regionY.bind($$))
			.attr("width", $$.regionWidth.bind($$))
			.attr("height", $$.regionHeight.bind($$));

		label = $T(label, withTransition)
			.attr("transform", d => {
				const {x = 0, y = 0, rotated = false} = d.label ?? {};

				return `translate(${$$.regionX.bind($$)(d) + x}, ${$$.regionY.bind($$)(d) + y})${
					rotated ? ` rotate(-90)` : ``
				}`;
			})
			.attr("text-anchor", d => (d.label?.rotated ? "end" : null))
			.attr("dy", "1em")
			.style("fill", d => d.label?.color ?? null)
			.text(d => d.label?.text);

		return [
			regions
				.style("fill-opacity", d => (isValue(d.opacity) ? d.opacity : null))
				.on("end", function() {
					// remove unnecessary rect after transition
					d3Select(this.parentNode)
						.selectAll("rect:not([x])")
						.remove();
				}),
			label.style("opacity", null)
		];
	},

	regionX(d: RegionOptions): number {
		return this.getRegionSize("x", d);
	},

	regionY(d: RegionOptions): number {
		return this.getRegionSize("y", d);
	},

	regionWidth(d: RegionOptions): number {
		return this.getRegionSize("width", d);
	},

	regionHeight(d: RegionOptions): number {
		return this.getRegionSize("height", d);
	},

	/**
	 * Get Region size according start/end position
	 * @param {string} type Type string
	 * @param {ojbect} d Data object
	 * @returns {number}
	 * @private
	 */
	getRegionSize(type: AxisType | "width" | "height", d: RegionOptions): number {
		const $$ = this;
		const {config, scale, state} = $$;
		const isRotated = config.axis_rotated;
		const isAxisType = /(x|y|y2)/.test(type);

		const isType = isAxisType ? type === "x" : type === "width";
		const start = !isAxisType && $$[isType ? "regionX" : "regionY"](d);
		let key = isAxisType ? "start" : "end";
		let pos = isAxisType ? 0 : state[type];
		let currScale;

		if (d.axis === "y" || d.axis === "y2") {
			if (!isAxisType && !isType) {
				key = "start";
			} else if (isAxisType && !isType) {
				key = "end";
			}

			if ((isType ? isRotated : !isRotated) && key in d) {
				currScale = scale[d.axis];
			}
		} else if ((isType ? !isRotated : isRotated) && key in d) {
			currScale = scale.zoom || scale.x;
		}

		if (currScale) {
			let offset = 0;
			pos = d[key];

			if ($$.axis.isTimeSeries(d.axis)) {
				pos = parseDate.call($$, pos);
			} else if (/(x|width)/.test(type) && $$.axis.isCategorized() && isNaN(pos)) {
				pos = config.axis_x_categories.indexOf(pos);
				offset = $$.axis.x.tickOffset() * (key === "start" ? -1 : 1);
			}

			pos = currScale(pos) + offset;
		}

		return isAxisType ? pos : pos < start ? 0 : pos - start;
	},

	isRegionOnX(d: RegionOptions): boolean {
		return !d.axis || d.axis === "x";
	}
};
