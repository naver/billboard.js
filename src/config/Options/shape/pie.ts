/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * pie config options
 */
export default {
	/**
	 * Set pie options
	 * @name pie
	 * @memberof Options
	 * @type {object}
	 * @property {object} pie Pie object
	 * @property {boolean} [pie.label.show=true] Show or hide label on each pie piece.
	 * @property {function} [pie.label.format] Set formatter for the label on each pie piece.
	 * @property {number|function} [pie.label.ratio=undefined] Set ratio of labels position.
	 * @property {number} [pie.label.threshold=0.05] Set threshold ratio to show/hide labels.
	 * @property {boolean|object} [pie.label.line=false] Enable label with lines (displayed outside with connector lines).
	 *  - `true`: Enable label with lines with default settings
	 *  - `false`: Labels are displayed inside the pie slices (default behavior).
	 *  - `{show: boolean, distance: number, text: boolean}`: Enable label with lines with custom settings. When object member is not provided, it will be set to default values.
	 * @property {boolean} [pie.label.line.show=true] Show or hide connector lines.
	 * @property {number} [pie.label.line.distance=20] Set the distance of the horizontal part of the connector line in pixels.
	 * @property {boolean|function} [pie.label.line.text=true] Show text at the end of the connector line (outside the shape).
	 *  - `true`: show data "id" text
	 *  - `false`: use default formatter(label.format) to show text
	 *  - `function(value, ratio, id)`: Custom formatter function for the text.
	 *  - **NOTE:** When the viewport size decreases, the size is adjusted based on the shape, so text may appear clipped. In this case, consider setting `overflow: visible` on the SVG node.
	 * @property {object|function} [pie.label.image] Set image to be displayed next to the label text.<br><br>
	 * When function is specified, will receives 3 arguments such as `v, id, i` and it must return an image object with `url`, `width`, `height`, and optional `pos` properties.<br><br>
	 * The arguments are:<br>
	 *  - `v` is the value of the data point where the label is shown.
	 *  - `id` is the id of the data where the label is shown.
	 *  - `i` is the index of the data series point where the label is shown.
	 * @property {string} pie.label.image.url Image URL path. Can use placeholder `{=ID}` which will be replaced with the data ID.
	 * @property {number} pie.label.image.width Image width in pixels.
	 * @property {number} pie.label.image.height Image height in pixels.
	 * @property {object} [pie.label.image.pos] Image position relative to the label text.
	 * @property {number} [pie.label.image.pos.x=0] x coordinate position, relative the original.
	 * @property {number} [pie.label.image.pos.y=0] y coordinate position, relative the original.
	 * @property {boolean|object} [pie.expand=true] Enable or disable expanding pie pieces.
	 * @property {number} [pie.expand.rate=0.98] Set expand rate.
	 * @property {number} [pie.expand.duration=50] Set expand transition time in ms.
	 * @property {number|object} [pie.innerRadius=0] Sets the inner radius of pie arc.
	 * @property {number|object|undefined} [pie.outerRadius=undefined] Sets the outer radius of pie arc.
	 * @property {number} [pie.padAngle=0] Set padding between data.
	 * @property {number} [pie.padding=0] Sets the gap between pie arcs.
	 * @property {number} [pie.startingAngle=0] Set starting angle where data draws.
	 * @see [Demo: expand.rate](https://naver.github.io/billboard.js/demo/#PieChartOptions.ExpandRate)
	 * @see [Demo: innerRadius](https://naver.github.io/billboard.js/demo/#PieChartOptions.InnerRadius)
	 * @see [Demo: outerRadius](https://naver.github.io/billboard.js/demo/#PieChartOptions.OuterRadius)
	 * @see [Demo: startingAngle](https://naver.github.io/billboard.js/demo/#PieChartOptions.StartingAngle)
	 * @see [Demo: label image](https://naver.github.io/billboard.js/demo/#PieChartOptions.LabelImage)
	 * @see [Demo: label line](https://naver.github.io/billboard.js/demo/#PieChartOptions.LabelLine)
	 * @example
	 *  pie: {
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
	 *          // Enable label with lines (displayed outside with connector lines)
	 *          line: false,  // default - labels inside
	 *          line: true,   // enable label with lines with default settings
	 *          line: {       // enable label with lines with custom settings
	 *             show: true,
	 *             distance: 20,  // horizontal line distance in pixels
	 *
	 *             // show text at the end of connector line (outside the shape)
	 *             text: true,  // use default formatter
	 *             text: function(value, ratio, id) {  // custom formatter
	 *                 return d3.format(".1%")(ratio);
	 *             }
	 *          },
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
	 *      innerRadius: 0,
	 *
	 *      // set different innerRadius for each data
	 *      innerRadius: {
	 *      	data1: 10,
	 *      	data2: 0
	 *      },
	 *
	 *      outerRadius: 100,
	 *
	 *      // set different outerRadius for each data
	 *      outerRadius: {
	 *      	data1: 50,
	 *      	data2: 100
	 *      }
	 *
	 *      padAngle: 0.1,
	 *      padding: 0,
	 *      startingAngle: 1
	 *  }
	 */
	pie_label_show: true,
	pie_label_format: <(() => number | string) | undefined>undefined,
	pie_label_ratio: <(() => number) | undefined>undefined,
	pie_label_threshold: 0.05,
	pie_label_line: <boolean | {
		show?: boolean,
		distance?: number,
		text?: boolean | ((value: number, ratio: number, id: string) => string)
	}>false,
	pie_label_image: <
		| {url: string, width: number, height: number, pos?: {x?: number, y?: number}}
		| ((v: number, id: string, i: number) => {
			url: string,
			width: number,
			height: number,
			pos?: {x?: number, y?: number}
		} | null)
		| undefined
	>undefined,
	pie_expand: <boolean | {rate?: number, duration?: number}>{},
	pie_expand_rate: 0.98,
	pie_expand_duration: 50,
	pie_innerRadius: <number | {[key: string]: number}>0,
	pie_outerRadius: <number | {[key: string]: number} | undefined>undefined,
	pie_padAngle: 0,
	pie_padding: 0,
	pie_startingAngle: 0
};
