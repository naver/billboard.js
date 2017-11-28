/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import ChartInternal from "../internals/ChartInternal";
import {extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Change the type of the chart.
	 * @method transform
	 * @instance
	 * @memberOf Chart
	 * @param {String} type Specify the type to be transformed. The types listed in data.type can be used.
	 * @param {String|Array} targetIds Specify targets to be transformed. If not given, all targets will be the candidate.
	 * @example
	 *  // all targets will be bar chart.
	 *  chart.transform("bar");
	 *
	 *  // only data1 will be bar chart.
	 *  chart.transform("bar", "data1");
	 *
	 *  // only data1 and data2 will be bar chart.
	 *  chart.transform("bar", ["data1", "data2"]);
	 */
	transform(type, targetIds) {
		const $$ = this.internal;
		const options = ["pie", "donut"]
			.indexOf(type) >= 0 ? {withTransform: true} : null;

		$$.transformTo(targetIds, type, options);
	}
});

extend(ChartInternal.prototype, {
	/**
	 * Change the type of the chart.
	 * @private
	 * @param {String|Array} targetIds
	 * @param {String} type
	 * @param {Object} optionsForRedraw
	 */
	transformTo(targetIds, type, optionsForRedraw) {
		const $$ = this;
		const withTransitionForAxis = !$$.hasArcType();
		const options = optionsForRedraw || {withTransitionForAxis: withTransitionForAxis};

		options.withTransitionForTransform = false;
		$$.transiting = false;

		$$.setTargetType(targetIds, type);
		$$.updateTargets($$.data.targets); // this is needed when transforming to arc
		$$.updateAndRedraw(options);
	}
});
