/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection"; // selection
import {$REGION} from "../../config/classes";
import {isValue, parseDate} from "../../module/util";
import type {AxisType, RegionsType} from "../../../types/types";

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

				return `translate(${$$.regionX.bind($$)(d) + x}, ${$$.regionY.bind($$)(d) + y})${rotated ? ` rotate(-90)` : ``}`;
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

	getRegionXY(type: AxisType, d: RegionsType): number {
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

	regionX(d: RegionsType): number {
		return this.getRegionXY("x", d);
	},

	regionY(d: RegionsType): number {
		return this.getRegionXY("y", d);
	},

	getRegionSize(type: "width" | "height", d: RegionsType): number {
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

	regionWidth(d: RegionsType): number {
		return this.getRegionSize("width", d);
	},

	regionHeight(d: RegionsType): number {
		return this.getRegionSize("height", d);
	},

	isRegionOnX(d: RegionsType): boolean {
		return !d.axis || d.axis === "x";
	},
};
