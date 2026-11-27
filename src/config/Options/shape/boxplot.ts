/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * boxplot config options
 */
export default {
	/**
	 * Set boxplot options
	 * - **NOTE:**
	 *   - Each data value is the five-number summary: `[min, q1, median, q3, max]`. The list can have
	 *     the outliers (array) and the mean (number) after them: `[min, q1, median, q3, max, [outliers], mean]`.
	 *   - When `boxplot.samples` is set, each data value is the list of the samples instead, and the
	 *     chart calculates the quartiles (linear interpolation, the default method of Plotly), the whiskers,
	 *     the outliers and the mean from it.
	 *   - The color of the box is the color of the data (`data.colors`, `color.pattern`). The stroke and
	 *     the opacity of the parts are set by CSS (`.bb-boxplot-box`, `.bb-boxplot-median`, `.bb-boxplot-whisker`,
	 *     `.bb-boxplot-outlier`, `.bb-boxplot-mean`), or by the canvas theme when the chart is rendered on canvas.
	 *   - The data labels, the subchart and the object form of the value are not supported.
	 * @name boxplot
	 * @memberof Options
	 * @type {object}
	 * @property {object} boxplot Boxplot object
	 * @property {boolean} [boxplot.samples=false] Set true to give the samples as the data value, instead of the five-number summary.
	 * @property {number} [boxplot.width] Change the width.
	 * @property {number} [boxplot.width.ratio=0.6] Change the width by ratio.
	 * @property {number} [boxplot.width.max] The maximum width value for ratio.
	 * @property {number} [boxplot.width.dataname] Change the width for indicated dataset only.
	 * @property {number} [boxplot.width.dataname.ratio=0.6] Change the width of the dataset by ratio.
	 * @property {number} [boxplot.width.dataname.max] The maximum width value for ratio.
	 * @property {number} [boxplot.whisker.width=0.5] Set the width of the cap at the end of the whiskers, by the ratio of the width of the box. 0 hides the caps.
	 * @property {number} [boxplot.whisker.iqr=1.5] Set how far the whiskers reach, by the multiple of the interquartile range. A sample out of it is an outlier. Applied when `boxplot.samples` is set.
	 * @property {boolean} [boxplot.outlier.show=true] Show the outliers.
	 * @property {number} [boxplot.outlier.r=3] Set the radius of the outliers.
	 * @property {boolean} [boxplot.mean.show=false] Show the mean.
	 * @property {number} [boxplot.mean.r=4] Set the size of the mean marker.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.BoxplotChart)
	 * @example
	 *  data: {
	 *      columns: [
	 *          // min, q1, median, q3, max
	 *          ["data1", [1, 3, 5, 7, 9], [2, 4, 6, 8, 10]],
	 *
	 *          // with the outliers and the mean: min, q1, median, q3, max, [outliers], mean
	 *          ["data2", [1, 3, 5, 7, 9, [14, 15], 5.5], [2, 4, 6, 8, 10, [], 6.1]]
	 *      ],
	 *      type: "boxplot"
	 *  },
	 *  boxplot: {
	 *      // give the samples, and get the quartiles calculated
	 *      samples: false,
	 *
	 *      width: 10,
	 *
	 *      // or
	 *      width: {
	 *         	ratio: 0.2,
	 *         	max: 20
	 *      },
	 *
	 *      // or specify width per dataset
	 *      width: {
	 *         	data1: 20,
	 *         	data2: {
	 *         	    ratio: 0.2,
	 *         		max: 20
	 *         	}
	 *      },
	 *
	 *      whisker: {
	 *          width: 0.5,
	 *          iqr: 1.5
	 *      },
	 *      outlier: {
	 *          show: true,
	 *          r: 3
	 *      },
	 *      mean: {
	 *          show: false,
	 *          r: 4
	 *      }
	 *  }
	 */
	boxplot_samples: false,
	boxplot_width: <number | {ratio?: number, max?: number} | undefined>undefined,
	boxplot_width_ratio: 0.6,
	boxplot_width_max: undefined,
	boxplot_whisker_width: 0.5,
	boxplot_whisker_iqr: 1.5,
	boxplot_outlier_show: true,
	boxplot_outlier_r: 3,
	boxplot_mean_show: false,
	boxplot_mean_r: 4
};
