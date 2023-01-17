/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {DataItem} from "../../../types/types";
import {extend, isUndefined, isArray} from "../../module/util";
import type {IDataRow} from "../../ChartInternal/data/IData";

/**
 * Get data loaded in the chart.
 * @function data
 * @instance
 * @memberof Chart
 * @param {string|Array} targetIds If this argument is given, this API returns the specified target data. If this argument is not given, all of data will be returned.
 * @returns {Array} Data objects
 * @example
 * // Get only data1 data
 * chart.data("data1");
 * // --> [{id: "data1", id_org: "data1", values: Array(6)}, ...]
 *
 * // Get data1 and data2 data
 * chart.data(["data1", "data2"]);
 *
 * // Get all data
 * chart.data();
 */
const data = function(targetIds: string|string[]): DataItem[] {
	const {targets} = this.internal.data;

	if (!isUndefined(targetIds)) {
		const ids: any = isArray(targetIds) ? targetIds : [targetIds];

		return targets.filter(t => ids.some(v => v === t.id));
	}

	return targets;
};

extend(data, {
	/**
	 * Get data shown in the chart.
	 * @function data․shown
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} targetIds If this argument is given, this API filters the data with specified target ids. If this argument is not given, all shown data will be returned.
	 * @returns {Array} Data objects
	 * @example
	 * // Get shown data by filtering to include only data1 data
	 * chart.data.shown("data1");
	 * // --> [{id: "data1", id_org: "data1", values: Array(6)}, ...]
	 *
	 * // Get shown data by filtering to include data1 and data2 data
	 * chart.data.shown(["data1", "data2"]);
	 *
	 * // Get all shown data
	 * chart.data.shown();
	 */
	shown: function(targetIds: string | string[]): DataItem[] {
		return this.internal.filterTargetsToShow(this.data(targetIds));
	},

	/**
	 * Get values of the data loaded in the chart.
	 * @function data․values
	 * @instance
	 * @memberof Chart
	 * @param {string|Array|null} targetIds This API returns the values of specified target. If this argument is not given, null will be retruned
	 * @param {boolean} [flat=true] Get flatten values
	 * @returns {Array} Data values
	 * @example
	 * // Get data1 values
	 * chart.data.values("data1");
	 * // --> [10, 20, 30, 40]
	 */
	values: function(targetIds?: string | string[], flat: boolean = true): number[]|number[][]|null {
		let values: any = null;

		if (targetIds) {
			const targets = this.data(targetIds);

			if (isArray(targets)) {
				values = [];

				targets.forEach(v => {
					const dataValue = v.values.map(d => d.value);

					flat ? (values = values.concat(dataValue)) : values.push(dataValue);
				});
			}
		}

		return values;
	},

	/**
	 * Get and set names of the data loaded in the chart.
	 * @function data․names
	 * @instance
	 * @memberof Chart
	 * @param {object} names If this argument is given, the names of data will be updated. If not given, the current names will be returned. The format of this argument is the same as [data.names](./Options.html#.data%25E2%2580%25A4names).
	 * @returns {object} Corresponding names according its key value, if specified names values.
	 * @example
	 * // Get current names
	 * chart.data.names();
	 * // --> {data1: "test1", data2: "test2"}
	 *
	 * // Update names
	 * chart.data.names({
	 *  data1: "New Name 1",
	 *  data2: "New Name 2"
	 *});
	 */
	names: function(names?: Array<{ [key: string]: string|null; }>): {[key: string]: string|null} {
		const $$ = this.internal;

		return $$.updateDataAttributes("names", names);
	},

	/**
	 * Get and set colors of the data loaded in the chart.
	 * @function data․colors
	 * @instance
	 * @memberof Chart
	 * @param {object} colors If this argument is given, the colors of data will be updated. If not given, the current colors will be returned. The format of this argument is the same as [data.colors](./Options.html#.data%25E2%2580%25A4colors).
	 * @returns {object} Corresponding data color value according its key value.
	 * @example
	 * // Get current colors
	 * chart.data.colors();
	 * // --> {data1: "#00c73c", data2: "#fa7171"}
	 *
	 * // Update colors
	 * chart.data.colors({
	 *  data1: "#FFFFFF",
	 *  data2: "#000000"
	 * });
	 */
	colors: function(colors?: Array<{ [key: string]: string; }>): { [key: string]: string } {
		return this.internal.updateDataAttributes("colors", colors);
	},

	/**
	 * Get and set axes of the data loaded in the chart.
	 * - **NOTE:** If all data is related to one of the axes, the domain of axis without related data will be replaced by the domain from the axis with related data
	 * @function data․axes
	 * @instance
	 * @memberof Chart
	 * @param {object} axes If this argument is given, the axes of data will be updated. If not given, the current axes will be returned. The format of this argument is the same as
	 * @returns {object} Corresponding axes value for data, if specified axes value.
	 * @example
	 * // Get current axes
	 * chart.data.axes();
	 * // --> {data1: "y"}
	 *
	 * // Update axes
	 * chart.data.axes({
	 *  data1: "y",
	 *  data2: "y2"
	 * });
	 */
	axes: function(axes?: Array<{ [key: string]: string }>): { [key: string]: string } {
		return this.internal.updateDataAttributes("axes", axes);
	},

	/**
	 * Get the minimum data value bound to the chart
	 * @function data․min
	 * @instance
	 * @memberof Chart
	 * @returns {Array} Data objects
	 * @example
	 * // Get current axes
	 * chart.data.min();
	 * // --> [{x: 0, value: 30, id: "data1", index: 0}, ...]
	 */
	min: function(): IDataRow[] {
		return this.internal.getMinMaxData().min;
	},

	/**
	 * Get the maximum data value bound to the chart
	 * @function data․max
	 * @instance
	 * @memberof Chart
	 * @returns {Array} Data objects
	 * @example
	 * // Get current axes
	 * chart.data.max();
	 * // --> [{x: 3, value: 400, id: "data1", index: 3}, ...]
	 */
	max: function(): IDataRow[] {
		return this.internal.getMinMaxData().max;
	}
});

export default {data};
