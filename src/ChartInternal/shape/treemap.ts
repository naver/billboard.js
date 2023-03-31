/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	hierarchy as d3Hierarchy,
	treemap as d3Treemap,
	treemapBinary as d3TreemapBinary,
	treemapDice as d3TreemapDice,
	treemapSlice as d3TreemapSlice,
	treemapSliceDice as d3TreemapSliceDice,
	treemapSquarify as d3TreemapSquarify,
	treemapResquarify as d3TreemapResquarify
} from "d3-hierarchy";
import {select as d3Select} from "d3-selection";
import type {d3Selection} from "../../../types/types";
import {$COMMON, $TREEMAP} from "../../config/classes";
import {isFunction, getRandom} from "../../module/util";
import type {ITreemapData, IData, IDataRow} from "../data/IData";

/**
 * Get treemap elements' position
 * @param {d3Selection} group Root selection
 * @param {object} root Root data
 * @private
 */
function position(group, root): void {
	const $$ = this;
	const {scale: {x, y}, state: {width}} = $$;

	group.selectAll("g")
		.attr("transform", d => (
			`translate(${d === root ? "0,0" : `${x(d.x0)},${y(d.y0)}`})`
		))
		.select("rect")
		.attr("width", d => (
			d === root ? width : x(d.x1) - x(d.x0))
		)
		.attr("height", d => (
			d === root ? 0 : y(d.y1) - y(d.y0))
		);
}

/**
 * Convert data for treemap hierarchy
 * @param {object} data Data object
 * @returns {Array} Array of data for treemap hierarchy
 * @private
 */
function convertDataToTreemapData(data: IData[]): ITreemapData[] {
	const $$ = this;

	return data.map(d => {
		const {id, values} = d;
		const {value} = values[0];

		return {
			name: id,
			id, // needed to keep compatibility on whole code logic
			value,
			ratio: $$.getRatio("treemap", values[0])
		} as ITreemapData;
	});
}

export default {
	initTreemap(): void {
		const $$ = this;
		const {$el, state: {
			current: {width, height}, clip, datetimeId
		}} = $$;

		clip.id = `${datetimeId}-clip`;

		$$.treemap = d3Treemap()
			.tile($$.getTreemapTile());

		$$.treemapFn = data => {
			const hierarchyData = d3Hierarchy(data).sum(d => d.value);
			const sortFn = $$.getSortCompareFn(true);

			return $$.treemap(
				sortFn ? hierarchyData.sort(sortFn) : hierarchyData
			);
		};

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

			if (/^rect$/i.test(target.tagName)) {
				state.event = event;
				data = d3Select(target).datum();
			}

			return data?.data;
		};

		if (config.interaction_enabled) {
			const isTouch = state.inputType === "touch";

			$el.treemap
				.on(isTouch ? "touchstart" : "mousemove", event => {
					const data = getTarget(event);

					if (data) {
						$$.showTooltip([data], event.currentTarget);
						event.type === "mouseover" && $$.setOverOut(true, data);
					}
				})
				.on(isTouch ? "touchend" : "mouseout", event => {
					const data = getTarget(event);

					$$.hideTooltip();
					$$.setOverOut(false, data);
				});
		}
	},

	/**
	 * Get tiling function
	 * @returns {Function}
	 * @private
	 */
	getTreemapTile() {
		const $$ = this;
		const {config, state: {current: {width, height}}} = $$;
		const tile = {
			"binary": d3TreemapBinary,
			"dice": d3TreemapDice,
			"slice": d3TreemapSlice,
			"sliceDice": d3TreemapSliceDice,
			"squarify": d3TreemapSquarify,
			"resquarify": d3TreemapResquarify
		}[config.treemap_tile ?? "binary"] ?? d3TreemapBinary;

		return (node, x0, y0, x1, y1) => {
			tile(node, 0, 0, width, height);

			for (const child of node.children) {
				child.x0 = x0 + child.x0 / width * (x1 - x0);
				child.x1 = x0 + child.x1 / width * (x1 - x0);
				child.y0 = y0 + child.y0 / height * (y1 - y0);
				child.y1 = y0 + child.y1 / height * (y1 - y0);
			}
		};
	},

	/**
	 * Get treemap hierarchy data
	 * @param {Array} targets Data targets
	 * @returns {object}
	 * @private
	 */
	getTreemapData(targets: IData[]): ITreemapData {
		const $$ = this;

		return {
			name: "root",
			children: convertDataToTreemapData.bind($$)(
				$$.filterTargetsToShow(targets.filter($$.isTreemapType, $$))
			)
		};
	},

	/**
	 * Update treemap data
	 * @param {Array} targets Data targets
	 * @private
	 */
	updateTargetsForTreemap(targets: IData): void {
		const $$ = this;
		const {$el: {treemap}} = $$;
		const treemapData = $$.treemapFn($$.getTreemapData(targets ?? $$.data.targets));

		// using $el.treemap reference can alter data, so select treemap <g> again
		treemap.data(treemapData);
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
			.attr("fill", d => $$.color(d.data.name));
	},

	/**
	 * Generate treemap coordinate points data
	 * @returns {Array} Array of coordinate points
	 * @private
	 */
	generateGetTreemapPoints(): (d: IDataRow) => [number, number][] {
		const $$ = this;
		const {$el, scale: {x, y}} = $$;
		const points = {};

		$el.treemap.selectAll("g").each(d => {
			points[d.data.name] = [
				[x(d.x0), y(d.y0)],
				[x(d.x1), y(d.y1)]
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
	 * @returns {Function}
	 * @private
	 */
	treemapDataLabelFormat(d: IDataRow): Function {
		const $$ = this;
		const {config} = $$;
		const {id, value} = d;
		const format = config.treemap_label_format;
		const ratio = $$.getRatio("treemap", d);
		const percentValue = (ratio * 100).toFixed(2);
		const meetLabelThreshold = config.treemap_label_show && $$.meetsLabelThreshold(
			ratio, "treemap"
		) ? null : "0";

		return function(node) {
			node.style("opacity", meetLabelThreshold);

			return isFunction(format) ? format.bind($$.api)(value, ratio, id) :
				`${id}\n${percentValue}%`;
		};
	}
};
