/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import type {d3Selection} from "../../../types/types";
import {$COMMON, $TREEMAP} from "../../config/classes";
import {getRandom, isFunction} from "../../module/util";
import type {IData, IDataRow} from "../data/IData";
import {meetsLabelThreshold} from "../internals/text.util";
import {getTreemapNodeRect} from "./core/geometry";
import shapeTreemapCommon from "./core/treemap";

/**
 * Get treemap elements' position
 * @param {d3Selection} group Root selection
 * @param {object} root Root data
 * @private
 */
function position(group, root): void {
	const $$ = this;

	group.selectAll("g")
		.attr("transform", d => {
			const rect = getTreemapNodeRect($$, d, root);

			return `translate(${rect.x},${rect.y})`;
		})
		.select("rect")
		.attr("width", d => getTreemapNodeRect($$, d, root).w)
		.attr("height", d => getTreemapNodeRect($$, d, root).h);
}

export default {
	...shapeTreemapCommon,

	initTreemap(): void {
		const $$ = this;
		const {
			$el,
			state: {
				current: {width, height},
				clip,
				datetimeId
			}
		} = $$;

		clip.id = `${datetimeId}-clip`;

		$$.initTreemapLayout();

		$el.defs
			.append("clipPath")
			.attr("id", clip.id)
			.append("rect")
			.attr("width", width)
			.attr("height", height);

		$el.treemap = $el.main.select(`.${$COMMON.chart}`)
			.attr("clip-path", `url(#${clip.id})`)
			.append("g")
			.classed($TREEMAP.chartTreemaps, true);

		$$.bindTreemapEvent();
	},

	/**
	 * Bind events
	 * @private
	 */
	bindTreemapEvent(): void {
		const $$ = this;
		const {$el, config, state} = $$;
		const getTarget = event => {
			const target = event.isTrusted ? event.target : state.eventReceiver.rect?.node();
			let data;

			if (target && /^rect$/i.test(target.tagName)) {
				state.event = event;
				data = d3Select(target).datum();
			}

			return data?.data;
		};

		if (config.interaction_enabled) {
			const isTouch = state.inputType === "touch";

			$el.treemap
				.on(isTouch ? "touchstart" : "mouseover mousemove", event => {
					const data = getTarget(event);

					if (data) {
						$$.showTooltip([data], event.currentTarget);
						/^(touchstart|mouseover)$/.test(event.type) && $$.setOverOut(true, data);
					}
				}, isTouch ? {passive: true} : undefined)
				.on(isTouch ? "touchend" : "mouseout", event => {
					const data = getTarget(event);

					if (config.interaction_onout) {
						$$.hideTooltip();
						$$.setOverOut(false, data);
					}
				});
		}
	},

	/**
	 * Update treemap data
	 * @param {Array} targets Data targets
	 * @private
	 */
	updateTargetsForTreemap(targets: IData[]): void {
		const $$ = this;
		const {$el: {treemap}} = $$;
		const treemapData = [$$.getTreemapRoot(targets ?? $$.data.targets)];

		// using $el.treemap reference can alter data, so select treemap <g> again
		treemap.data($$.filterNullish(treemapData));
	},

	/**
	 * Render treemap
	 * @param {number} durationForExit Duration for exit transition
	 * @private
	 */
	updateTreemap(durationForExit: number): void {
		const $$ = this;
		const {$el, $T} = $$;
		const data = $el.treemap.datum();
		const classChartTreemap = $$.getChartClass("Treemap");
		const classTreemap = $$.getClass("treemap", true);

		const treemap = $el.treemap
			.selectAll("g")
			.data(data.children);

		$T(treemap.exit(), durationForExit)
			.style("opacity", "0")
			.remove();

		treemap.enter()
			.append("g")
			.append("rect");

		$el.treemap.selectAll("g")
			.attr("class", classChartTreemap)
			.select("rect")
			.attr("class", classTreemap)
			.attr("fill", d => $$.color(d.data.name));
	},

	/**
	 * Generate treemap coordinate points data
	 * @returns {Array} Array of coordinate points
	 * @private
	 */
	generateGetTreemapPoints(): (d: IDataRow) => [number, number][] {
		const $$ = this;
		const {$el} = $$;
		const points = {};

		$el.treemap.selectAll("g").each(d => {
			const rect = getTreemapNodeRect($$, d);

			points[d.data.name] = [
				[rect.x, rect.y],
				[rect.x + rect.w, rect.y + rect.h]
			];
		});

		return d => points[d.id];
	},

	/**
	 * Redraw treemap
	 * @param {boolean} withTransition With or without transition
	 * @returns {Array} Selections
	 * @private
	 */
	redrawTreemap(withTransition?: boolean): d3Selection[] {
		const $$ = this;
		const {$el, state: {current: {width, height}}} = $$;

		// update defs
		$el.defs.select("rect")
			.attr("width", width)
			.attr("height", height);

		return [
			$$.$T($el.treemap, withTransition, getRandom())
				.call(position.bind($$), $el.treemap.datum())
		];
	},

	/**
	 * Get treemap data label format function
	 * @param {object} d Data object
	 * @returns {function} Label formatter function
	 * @private
	 */
	treemapDataLabelFormat(d: IDataRow): Function {
		const $$ = this;
		const {$el: {treemap}, config, scale: {x, y}} = $$;
		const {id, value} = d;
		const format = config.treemap_label_format;
		const ratio = $$.getRatio("treemap", d);
		const percentValue = (ratio * 100).toFixed(2);
		const meetLabelThreshold =
			config.treemap_label_show && meetsLabelThreshold.call($$, ratio, "treemap") ?
				null :
				"0";

		// Get treemap dimensions for the specific data
		const treemapNode = treemap.selectAll("g")
			.filter(node => node.data.id === id)
			.datum();

		let width = 0;
		let height = 0;

		if (treemapNode) {
			const {x0, x1, y0, y1} = treemapNode;
			width = x(x1) - x(x0);
			height = y(y1) - y(y0);
		}

		return function(node) {
			node.style("opacity", meetLabelThreshold);

			return isFunction(format) ?
				format.bind($$.api)(value, ratio, id, {width, height}) :
				`${id}\n${percentValue}%`;
		};
	}
};
