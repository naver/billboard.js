/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * donut config options
 */
export default {
	/**
	 * Set donut options
	 * @name donut
	 * @memberof Options
	 * @type {object}
	 * @property {object} donut Donut object
	 * @property {boolean} [donut.label.show=true] Show or hide label on each donut piece.
	 * @property {function} [donut.label.format] Set formatter for the label on each donut piece.
	 * @property {number} [donut.label.threshold=0.05] Set threshold ratio to show/hide labels.
	 * @property {number|function} [donut.label.ratio=undefined] Set ratio of labels position.
	 * @property {object|function} [donut.label.image] Set image to be displayed next to the label text.<br><br>
	 * When function is specified, will receives 3 arguments such as `v, id, i` and it must return an image object with `url`, `width`, `height`, and optional `pos` properties.<br><br>
	 * The arguments are:<br>
	 *  - `v` is the value of the data point where the label is shown.
	 *  - `id` is the id of the data where the label is shown.
	 *  - `i` is the index of the data series point where the label is shown.
	 * @property {string} donut.label.image.url Image URL path. Can use placeholder `{=ID}` which will be replaced with the data ID.
	 * @property {number} donut.label.image.width Image width in pixels.
	 * @property {number} donut.label.image.height Image height in pixels.
	 * @property {object} [donut.label.image.pos] Image position relative to the label text.
	 * @property {number} [donut.label.image.pos.x=0] x coordinate position, relative the original.
	 * @property {number} [donut.label.image.pos.y=0] y coordinate position, relative the original.
	 * @property {boolean} [donut.expand=true] Enable or disable expanding donut pieces.
	 * @property {number} [donut.expand.rate=0.98] Set expand rate.
	 * @property {number} [donut.expand.duration=50] Set expand transition time in ms.
	 * @property {number} [donut.width] Set width of donut chart.
	 * @property {string} [donut.title=""] Set title of donut chart. Use `\n` character for line break.
	 *  - **NOTE:**
	 *    - When `arc.needle.show=true` is set, special template `{=NEEDLE_VALUE}` can be used inside the title text to show current needle value.
	 * @property {number} [donut.padAngle=0] Set padding between data.
	 * @property {number} [donut.startingAngle=0] Set starting angle where data draws.
	 * @see [Demo: Corner Radius](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutCornerRadius)
	 * @see [Demo: Needle](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutNeedle)
	 * @see [Demo: Range Text](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutRangeText)
	 * @see [Demo: Label Image](https://naver.github.io/billboard.js/demo/#DonutChartOptions.LabelImage)
	 * @see [Demo: Label Ratio](https://naver.github.io/billboard.js/demo/#DonutChartOptions.LabelRatio)
	 * @see [Demo: Multiline Label](https://naver.github.io/billboard.js/demo/#DonutChartOptions.MultilineLabel)
	 * @see [Demo: Multiline Title](https://naver.github.io/billboard.js/demo/#DonutChartOptions.MultilineTitle)
	 * @see [Demo: Pad Angle](https://naver.github.io/billboard.js/demo/#DonutChartOptions.padAngle)
	 * @see [Demo: Starting Angle](https://naver.github.io/billboard.js/demo/#DonutChartOptions.StartingAngle)
	 *
	 * @example
	 *  donut: {
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
	 *          	...
	 *          	return ratio;
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
	 *
	 *      // disable expand transition for interaction
	 *      expand: false,
	 *
	 *      expand: {
	 *      	// set duration of expand transition to 500ms.
	 *          duration: 500,
	 *
	 *      	// set expand area rate
	 *          rate: 1
	 *      },
	 *
	 *      width: 10,
	 *      padAngle: 0.2,
	 *      startingAngle: 1,
	 *      title: "Donut Title"
	 *
	 *      // when 'arc.needle.show=true' is set, can show current needle value.
	 *      title: "Needle value:\n{=NEEDLE_VALUE}",
	 *
	 *      // title with line break
	 *      title: "Title1\nTitle2"
	 *  }
	 */
	donut_label_show: true,
	donut_label_format: <(() => number | string) | undefined>undefined,
	donut_label_threshold: 0.05,
	donut_label_image: <
		| {url: string, width: number, height: number, pos?: {x?: number, y?: number}}
		| ((v: number, id: string, i: number) => {
			url: string,
			width: number,
			height: number,
			pos?: {x?: number, y?: number}
		} | null)
		| undefined
	>undefined,
	donut_label_ratio: <number | (() => number) | undefined>undefined,
	donut_width: <number | undefined>undefined,
	donut_title: "",
	donut_expand: <boolean | {rate?: number, duration?: number}>{},
	donut_expand_rate: 0.98,
	donut_expand_duration: 50,
	donut_padAngle: 0,
	donut_startingAngle: 0
};
