/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend, isUndefined, isArray} from "../internals/util";

/**
 * Get data loaded in the chart.
 * @method data
 * @instance
 * @memberof Chart
 * @param {String|Array} targetIds If this argument is given, this API returns the specified target data. If this argument is not given, all of data will be returned.
 * @return {Array} Data objects
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
const data = function(targetIds) {
	const targets = this.internal.data.targets;

	return isUndefined(targetIds) ?
		targets : targets.filter(t => targetIds.indexOf(t.id) >= 0);
};

extend(data, {
	/**
	 * Get data shown in the chart.
	 * @method data․shown
	 * @instance
	 * @memberof Chart
	 * @param {String|Array} targetIds If this argument is given, this API filters the data with specified target ids. If this argument is not given, all shown data will be returned.
	 * @return {Array} Data objects
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
	shown: function(targetIds) {
		return this.internal.filterTargetsToShow(this.data(targetIds));
	},

	/**
	 * Get values of the data loaded in the chart.
	 * @method data․values
	 * @instance
	 * @memberof Chart
	 * @param {String|Array} targetIds This API returns the values of specified target. If this argument is not given, null will be retruned
	 * @return {Array} Data values
	 * @example
	 * // Get data1 values
	 * chart.data.values("data1");
	 * // --> [10, 20, 30, 40]
	 */
	values: function(targetId, flat = true) {
		let values = null;

		if (targetId) {
			const targets = this.data(targetId);

			if (targets && isArray(targets)) {
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
	 * @method data․names
	 * @instance
	 * @memberof Chart
	 * @param {Object} names If this argument is given, the names of data will be updated. If not given, the current names will be returned. The format of this argument is the same as
	 * @return {Object} Corresponding names according its key value, if specified names values.
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
	names: function(names) {
		this.internal.clearLegendItemTextBoxCache();

		return this.internal.updateDataAttributes("names", names);
	},

	/**
	 * Get and set colors of the data loaded in the chart.
	 * @method data․colors
	 * @instance
	 * @memberof Chart
	 * @param {Object} colors If this argument is given, the colors of data will be updated. If not given, the current colors will be returned. The format of this argument is the same as [data.colors](./Options.html#.data%25E2%2580%25A4colors).
	 * @return {Object} Corresponding data color value according its key value.
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
	colors: function(colors) {
		return this.internal.updateDataAttributes("colors", colors);
	},

	/**
	 * Get and set axes of the data loaded in the chart.
	 * @method data․axes
	 * @instance
	 * @memberof Chart
	 * @param {Object} axes If this argument is given, the axes of data will be updated. If not given, the current axes will be returned. The format of this argument is the same as
	 * @return {Object} Corresponding axes value for data, if specified axes value.
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
	axes: function(axes) {
		return this.internal.updateDataAttributes("axes", axes);
	},

	/**
	 * Get the minimum data value bound to the chart
	 * @method data․min
	 * @instance
	 * @memberof Chart
	 * @return {Array} Data objects
	 * @example
	 * // Get current axes
	 * chart.data.min();
	 * // --> [{x: 0, value: 30, id: "data1", index: 0}, ...]
	 */
	min: function() {
		return this.internal.getMinMaxData().min;
	},

	/**
	 * Get the maximum data value bound to the chart
	 * @method data․max
	 * @instance
	 * @memberof Chart
	 * @return {Array} Data objects
	 * @example
	 * // Get current axes
	 * chart.data.max();
	 * // --> [{x: 3, value: 400, id: "data1", index: 3}, ...]
	 */
	max: function() {
		return this.internal.getMinMaxData().max;
	}
});

extend(Chart.prototype, {data});
