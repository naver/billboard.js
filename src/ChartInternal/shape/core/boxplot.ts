/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isArray, isNumber, isObject} from "../../../module/util";
import type {IOffset} from "../IShape";

// class names of the boxplot elements
export const $BOXPLOT = {
	boxplot: "bb-boxplot",
	boxplotBox: "bb-boxplot-box",
	boxplotMean: "bb-boxplot-mean",
	boxplotMedian: "bb-boxplot-median",
	boxplotOutlier: "bb-boxplot-outlier",
	boxplotWhisker: "bb-boxplot-whisker",
	chartBoxplot: "bb-chart-boxplot",
	chartBoxplots: "bb-chart-boxplots"
};

/**
 * Parsed boxplot value
 * @private
 */
export interface IBoxplotData {
	min: number;
	q1: number;
	median: number;
	q3: number;
	max: number;
	outliers: number[];
	mean?: number;
}

/**
 * Get the value at the given rank of the sorted samples, by linear interpolation
 * (the default method of Plotly, and the `7` method of R)
 * @param {Array} sorted Sorted samples
 * @param {number} p Rank between 0 and 1
 * @returns {number}
 * @private
 */
function quantile(sorted: number[], p: number): number {
	const pos = (sorted.length - 1) * p;
	const base = Math.floor(pos);
	const rest = pos - base;

	return sorted[base] +
		(rest && sorted[base + 1] !== undefined ? rest * (sorted[base + 1] - sorted[base]) : 0);
}

/**
 * Get the five numbers, the outliers and the mean of the samples.
 * A sample out of `iqr` times of the range between the quartiles is an outlier,
 * and the whiskers reach the samples next to them.
 * @param {Array} samples Sample values
 * @param {number} iqr Multiple of the interquartile range
 * @returns {object|null} Parsed value, null when there is no sample
 * @private
 */
function fromSamples(samples: any[], iqr: number): IBoxplotData | null {
	const sorted = samples.filter(isNumber).sort((a, b) => a - b);

	if (!sorted.length) {
		return null;
	}

	const q1 = quantile(sorted, 0.25);
	const q3 = quantile(sorted, 0.75);
	const range = (q3 - q1) * iqr;
	const inside = sorted.filter(v => v >= q1 - range && v <= q3 + range);

	return {
		min: inside[0],
		q1,
		median: quantile(sorted, 0.5),
		q3,
		max: inside[inside.length - 1],
		outliers: sorted.filter(v => v < q1 - range || v > q3 + range),
		mean: sorted.reduce((a, c) => a + c, 0) / sorted.length
	};
}

export default {
	/**
	 * Check if the data belongs to the boxplot type
	 * @param {object|string} d Data object or id
	 * @returns {boolean}
	 * @private
	 */
	isBoxplotType(d): boolean {
		return this.isTypeOf(d, "boxplot");
	},

	/**
	 * Get boxplot data as object.
	 * The value is `[min, q1, median, q3, max, outliers?, mean?]`, or the samples when
	 * `boxplot.samples` is set.
	 * @param {object} param Data row
	 * @param {Array} param.value Data value
	 * @returns {object|null} Parsed value, null when the value isn't valid
	 * @private
	 */
	getBoxplotData({value}): IBoxplotData | null {
		if (!isArray(value)) {
			return null;
		}

		const {config} = this;
		// the parsed values of the value arrays, of the chart: a value array is parsed once
		const parsed: WeakMap<object, IBoxplotData | null> = this.boxplotParsed ??= new WeakMap();
		let data = parsed.get(value);

		if (data === undefined) {
			const {boxplot_outlier_show: showOutlier, boxplot_mean_show: showMean} = config;

			if (config.boxplot_samples) {
				data = fromSamples(value, config.boxplot_whisker_iqr);
			} else if (value.length >= 5 && value.slice(0, 5).every(isNumber)) {
				const [min, q1, median, q3, max, outliers, mean] = value;

				data = {
					min,
					q1,
					median,
					q3,
					max,
					outliers: isArray(outliers) ? outliers.filter(isNumber) : [],
					mean: isNumber(mean) ? mean : undefined
				};
			} else {
				data = null;
			}

			// the outliers and the mean are in the data only when they are shown
			if (data) {
				!showOutlier && (data.outliers = []);
				!showMean && (data.mean = undefined);
			}

			parsed.set(value, data);
		}

		return data;
	},

	/**
	 * Get the values the y domain has to cover, of a data row
	 * @param {object} row Data row
	 * @returns {Array} Values
	 * @private
	 */
	getBoxplotDomainValues(row): number[] {
		const data = this.getBoxplotData(row);

		return data ? [data.min, data.max, ...data.outliers] : [];
	},

	/**
	 * Generate shape drawing points
	 * @param {object} indices Indice data
	 * @param {boolean} isSub Subchart draw
	 * @returns {function}
	 * @private
	 */
	generateGetBoxplotPoints(indices, isSub = false): (d, i) => number[][] | null {
		const $$ = this;
		const axis = isSub ? $$.axis.subX : $$.axis.x;
		const targetsNum = $$.getIndicesMax(indices) + 1;
		const barW: IOffset = $$.getBarW("boxplot", axis, targetsNum);

		// the widths set for some of the series only: the others take the default width, and the
		// shapes are laid out by the width of every series shown (not by those set)
		if (isObject(barW)) {
			const ids = $$.getTargetsToShow().map(v => v.id);

			ids.forEach(id => {
				barW[id] ??= barW._$width;
			});
			barW._$total = ids.map(id => barW[id]);
		}

		const x = $$.getShapeX(barW, indices, !!isSub);
		const y = $$.getShapeY(!!isSub);

		// points are [index position, value position], the draw function swaps them if rotated:
		// [box start (q1), box end (q3), whisker (x, min, max), median (y), outliers (y), mean (y)]
		return d => {
			const value = $$.getBoxplotData(d);

			if (!value) {
				return null;
			}

			const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
			const x0 = x(d);

			return [
				[x0, y(value.q1)],
				[x0 + width, y(value.q3)],
				[x0 + (width / 2), y(value.min), y(value.max)],
				[y(value.median)],
				value.outliers.map(v => y(v)),
				isNumber(value.mean) ? [y(value.mean)] : []
			];
		};
	},

	/**
	 * Get the name and the formatted value of each part of the box, for the tooltip
	 * @param {object} row Data row
	 * @param {function} format Value formatter
	 * @param {Array} param Parameters of the formatter
	 * @returns {Array} [name, value] pairs
	 * @private
	 */
	getBoxplotTooltipRows(row, format, param): string[][] {
		const value = this.getBoxplotData(row);

		if (!value) {
			return [];
		}

		const f = (v: number) => format(v, ...param);
		const shown = value.outliers.slice(0, 5).map(f).join(", ");
		const rows = [
			["Max", f(value.max)],
			["Q3", f(value.q3)],
			["Median", f(value.median)],
			["Q1", f(value.q1)],
			["Min", f(value.min)]
		];

		isNumber(value.mean) && rows.splice(3, 0, ["Mean", f(value.mean)]);
		value.outliers.length && rows.push([
			"Outliers",
			shown + (value.outliers.length > 5 ? `, ... (${value.outliers.length})` : "")
		]);

		return rows;
	}
};
