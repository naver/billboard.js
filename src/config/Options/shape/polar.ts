/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * polar config options
 */
export default {
	/**
	 * Set polar options
	 * @name polar
	 * @memberof Options
	 * @type {object}
	 * @property {object} polar Polar object
	 * @property {boolean} [polar.label.show=true] Show or hide label on each polar piece.
	 * @property {Function} [polar.label.format] Set formatter for the label on each polar piece.
	 * @property {number} [polar.label.threshold=0.05] Set threshold ratio to show/hide labels.
	 * @property {number|Function} [polar.label.ratio=undefined] Set ratio of labels position.
	 * @property {object|Function} [polar.label.image] Set image to be displayed next to the label text.<br><br>
	 * When function is specified, will receives 3 arguments such as `v, id, i` and it must return an image object with `url`, `width`, `height`, and optional `pos` properties.<br><br>
	 * The arguments are:<br>
	 *  - `v` is the value of the data point where the label is shown.
	 *  - `id` is the id of the data where the label is shown.
	 *  - `i` is the index of the data series point where the label is shown.
	 * @property {string} polar.label.image.url Image URL path. Can use placeholder `{=ID}` which will be replaced with the data ID.
	 * @property {number} polar.label.image.width Image width in pixels.
	 * @property {number} polar.label.image.height Image height in pixels.
	 * @property {object} [polar.label.image.pos] Image position relative to the label text.
	 * @property {number} [polar.label.image.pos.x=0] x coordinate position, relative the original.
	 * @property {number} [polar.label.image.pos.y=0] y coordinate position, relative the original.
	 * @property {number} [polar.level.depth=3] Set the level depth.
	 * @property {boolean} [polar.level.show=true] Show or hide level.
	 * @property {string} [polar.level.text.backgroundColor="#fff"] Set label text's background color.
	 * @property {Function} [polar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
	 * @property {boolean} [polar.level.text.show=true] Show or hide level text.
	 * @property {number} [polar.padAngle=0] Set padding between data.
	 * @property {number} [polar.padding=0] Sets the gap between pie arcs.
	 * @property {number} [polar.startingAngle=0] Set starting angle where data draws.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
	 * @see [Demo: label image](https://naver.github.io/billboard.js/demo/#PolarChartOptions.LabelImage)
	 * @example
	 *  polar: {
	 *      label: {
	 *          show: false,
	 *          format: function(value, ratio, id) {
	 *              return d3.format("$")(value);
	 *
	 *              // to multiline, return with '\n' character
	 *              // return value +"%\nLine1\n2Line2";
	 *          },
	 *
	 *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
	 *          // if data value is below than 0.1, text label will be hidden.
	 *          threshold: 0.1,
	 *
	 *          // set ratio callback. Should return ratio value
	 *          ratio: function(d, radius, h) {
	 *              ...
	 *              return ratio;
	 *          },
	 *          // or set ratio number
	 *          ratio: 0.5,
	 *
	 *          // set image to be displayed next to the label text
	 *          image: {
	 *             url: "./sample.svg",
	 *
	 *             // use placeholder to dynamically set image URL based on data ID
	 *             url: "./images/{=ID}.svg",  // will be replaced to "./images/data1.svg", "./images/data2.svg", etc.
	 *             width: 35,
	 *             height: 35,
	 *             pos: {
	 *                x: 0,
	 *                y: 0
	 *             }
	 *          },
	 *
	 *          // or use function to return image configuration dynamically
	 *          image: function(v, id, i) {
	 *             // Return different images based on value
	 *             if (v > 500) {
	 *                return {
	 *                   url: "./high-value.svg",
	 *                   width: 40,
	 *                   height: 40,
	 *                   pos: { x: 0, y: 0 }
	 *                };
	 *             } else if (v > 100) {
	 *                return {
	 *                   url: "./medium-value.svg",
	 *                   width: 30,
	 *                   height: 30,
	 *                   pos: { x: 0, y: 0 }
	 *                };
	 *             } else if(v < 5) {
	 *                // Return falsy value in case of don't want to show image
	 *                return null;
	 *             } else {
	 *                return {
	 *                   url: "./low-value.svg",
	 *                   width: 20,
	 *                   height: 20,
	 *                   pos: { x: 0, y: 0 }
	 *                };
	 *             }
	 *          }
	 *      },
	 *      level: {
	 *          depth: 3,
	 *          max: 500,
	 *          show: true,
	 *          text: {
	 *              format: function(x) {
	 *                  return x + "%";
	 *              },
	 *              show: true,
	 *              backgroundColor: "red"
	 *          }
	 *      },
	 *      padAngle: 0.1,
	 *      padding: 0,
	 *      startingAngle: 1
	 *  }
	 */
	polar_label_show: true,
	polar_label_format: <(() => number | string) | undefined>undefined,
	polar_label_threshold: 0.05,
	polar_label_image: <
		| {url: string, width: number, height: number, pos?: {x?: number, y?: number}}
		| ((v: number, id: string, i: number) => {
			url: string,
			width: number,
			height: number,
			pos?: {x?: number, y?: number}
		} | null)
		| undefined
	>undefined,
	polar_label_ratio: <(() => number) | undefined>undefined,
	polar_level_depth: 3,
	polar_level_max: <number | undefined>undefined,
	polar_level_show: true,
	polar_level_text_backgroundColor: "#fff",
	polar_level_text_format: (x: number) => (x % 1 === 0 ? x : x.toFixed(2)),
	polar_level_text_show: true,
	polar_padAngle: 0,
	polar_padding: 0,
	polar_startingAngle: 0
};
