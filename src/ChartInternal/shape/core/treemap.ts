/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	hierarchy as d3Hierarchy,
	treemap as d3Treemap,
	treemapBinary as d3TreemapBinary,
	treemapDice as d3TreemapDice,
	treemapResquarify as d3TreemapResquarify,
	treemapSlice as d3TreemapSlice,
	treemapSliceDice as d3TreemapSliceDice,
	treemapSquarify as d3TreemapSquarify
} from "d3-hierarchy";
import type {IData, ITreemapData} from "../../data/IData";

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
	/**
	 * Initialize treemap layout generator.
	 * @private
	 */
	initTreemapLayout(): void {
		this.treemap = d3Treemap()
			.tile(this.getTreemapTile());
	},

	/**
	 * Get tiling function
	 * @returns {function}
	 * @private
	 */
	getTreemapTile() {
		const $$ = this;
		const {config, state: {current: {width, height}}} = $$;
		const tile = {
			binary: d3TreemapBinary,
			dice: d3TreemapDice,
			slice: d3TreemapSlice,
			sliceDice: d3TreemapSliceDice,
			squarify: d3TreemapSquarify,
			resquarify: d3TreemapResquarify
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
	 * Get treemap hierarchy root.
	 * @param {Array} targets Data targets
	 * @returns {object}
	 * @private
	 */
	getTreemapRoot(targets?: IData[]) {
		const $$ = this;
		const data = $$.getTreemapData(targets ?? $$.data.targets);
		const hierarchyData = d3Hierarchy(data).sum(d => d.value);
		const sortFn = $$.getSortCompareFn(true);

		if (!$$.treemap) {
			$$.initTreemapLayout();
		}

		return $$.treemap(
			sortFn ? hierarchyData.sort(sortFn) : hierarchyData
		);
	}
};
