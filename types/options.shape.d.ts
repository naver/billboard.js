/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {DataItem, GaugeTypes} from "./types";
import {Chart} from "./chart";

export interface ArcOptions {
	/**
	 *  Set corner radius of Arc(donut/gauge/pie/polar) shape.
	 *  - **NOTE:**
	 * 	  - Corner radius can't surpass the `(outerRadius - innerRadius) /2` of indicated shape.
	 */
	cornerRadius?: number | ((id: string, value: number, outerRadius: number) => number) | {
		ratio?: number
	};
}

export interface AreaOptions {
	/**
	 * Set background area above the data chart line.
	 */
	above?: boolean;

	/**
	 * Set background area `below` the data chart line.
	 *  - **NOTE**: Can't be used along with `above` option. When above & below options are set to true, `above` will be prioritized.
	 */
	below?: boolean;

	/**
	 * Set area node to be positioned over line node.
	 */
	front?: boolean;

	/**
	 * Set the linear gradient on area.<br><br>
	 * Or customize by giving below object value:
	 *  - x {Array}: `x1`, `x2` value
	 *  - y {Array}: `y1`, `y2` value
	 *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
	 */
	linearGradient?: boolean | LinearGradientOptions;

	/**
	 * Set if min or max value will be 0 on area chart.
	 */
	zerobased?: boolean;
}

export interface BarOptions {
	/**
	 * Set threshold ratio to show/hide labels.
	 */
	label?: {
		threshold?: number;
	};

	/**
	 * Remove nullish data on bar indices positions.
	 */
	indices?: {
		removeNull?: boolean;
	};

	/**
	 * Set the linear gradient on bar.<br><br>
	 * Or customize by giving below object value:
	 *  - x {Array}: `x1`, `x2` value
	 *  - y {Array}: `y1`, `y2` value
	 *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
	 */
	linearGradient?: boolean | LinearGradientOptions;

	/**
	 * Bars will be rendered at same position, which will be overlapped each other. (for non-grouped bars only)
	 */
	orverlap?: boolean;

	/**
	 * The padding pixel value between each bar.
	 */
	padding?: number;

	/**
	 * Set the radius of bar edge in pixel.
	 * - NOTE: Only for non-stacking bars.
	 */
	radius?: number | {
		/**
		 * Set the radius ratio of bar edge in relative the bar's width.
		 */
		ratio?: number;
	};

	/**
	 * The senstivity offset value for interaction boundary.
	 */
	sensitivity?: number;

	/**
	 * Change the width of bar chart. If ratio is specified, change the width of bar chart by ratio.
	 */
	width?: number | {
		/**
		 * Set the width of each bar by ratio
		 */
		ratio: number;

		/**
		 * Set max width of each bar
		 */
		max?: number;
	} | {
		/**
		 * Set the width option for specific dataset
		 */
		[key: string]: number | {
			ratio: number;
			max: number;
		}
	};

	/**
	 * Set if min or max value will be 0 on bar chart.
	 */
	zerobased?: boolean;
}

export interface BubbleOptions {
	/**
	 * Set the max bubble radius value
	 */
	maxR?: ((this: Chart, d: {}) => number) | number;

	/**
	 * Set if min or max value will be 0 on bubble chart.
	 */
	zerobased?: boolean;
}

export interface CandlestickOptions {
	/**
	 * Change the width of bar chart. If ratio is specified, change the width of bar chart by ratio.
	 */
	width?: number | {
		/**
		 * Set the width of each bar by ratio
		 */
		ratio: number;

		/**
		 * Set max width of each bar
		 */
		max?: number;
	} | {
		/**
		 * Set the width option for specific dataset
		 */
		[key: string]: number | {
			ratio: number;
			max: number;
		}
	};

	color?: {
		/**
		 * Change down value color.
		 */
		down: string | {
			/**
			 * Change down value color for indicated dataset only.
			 */
			[key: string]: string;
		}
	};
}

export interface DonutOptions {
	label?: {
		/**
		 * Show or hide label on each donut piece.
		 */
		show?: boolean;

		/**
		 * Set formatter for the label on each donut piece.
		 */
		format?: (this: Chart, value: number, ratio: number, id: string) => string;

		/**
		 * Set ratio of labels position.
		 */
		ratio?: number | ((this: Chart, d: DataItem, radius: number, h: number) => number)

		/**
		 * Set threshold ratio to show/hide labels.
		 */
		threshold?: number;
	};

	/**
	 * Enable or disable expanding donut pieces.
	 */
	expand?: boolean | {
		/**
		 * Set expand transition time in ms.
		 */
		duration?: number;

		/**
		 * Set expand rate.
		 */
		rate?: number;
	};

	/**
	 * Set padding between data.
	 */
	padAngle?: number;

	/**
	 * Set starting angle where data draws.
	 */
	startingAngle?: number;

	/**
	 * Set width of donut chart.
	 */
	width?: number;

	/**
	 * Set title of donut chart.
	 */
	title?: string;
}

export interface GaugeOptions {
	/**
	 * Set background color. (The `.bb-chart-arcs-background` element)
	 */
	background?: string;

	/**
	 * Whether this should be displayed
	 * as a full circle instead of a
	 * half circle.
	 */
	fullCircle?: boolean;

	label?: {
		/**
		 * Show or hide label on gauge.
		 */
		show?: boolean;

		/**
		 * Set formatter for the label on gauge.
		 */
		format?(this: Chart, value: any, ratio: number, id: string): string;

		/**
		 * Set customized min/max label text.
		 */
		extents?(this: Chart, value: number, isMax: boolean): string | number;

		/**
		 * Set threshold ratio to show/hide labels.
		 */
		threshold?: number;
	};

	/**
	 * Enable or disable expanding gauge pieces.
	 */
	expand?: boolean | {
		/**
		 * Set expand transition time in ms.
		 */
		duration?: number;

		/**
		 * Set expand rate.
		 */
		rate?: number;
	};

	/**
	 * Set type of the gauge.
	 */
	type?: GaugeTypes;

	/**
	 * Set min value of the gauge.
	 */
	min?: number;

	/**
	 * Set max value of the gauge.
	 */
	max?: number;

	/**
	 * Set starting angle where data draws.
	 */
	startingAngle?: number;

	/**
	 * Set title of gauge chart. Use `\n` character to enter line break.
	 */
	title?: string;

	/**
	 * Set units of the gauge.
	 */
	units?: string;

	/**
	 * Set width of gauge chart.
	 */
	width?: number;

	/**
	 * Set minimal width of gauge arcs until the innerRadius disappears.
	 */
	arcs?: {
		minWidth?: number;
	};

	/**
	 * Set the length of the arc to be drawn in percent from -100 to 100.
	 * Negative value will draw the arc **counterclockwise**.
	 */
	arcLength?: number;
}

export interface LineOptions {
	/**
	 * Set if null data point will be connected or not.
	 * If true set, the region of null data will be connected without any data point.
	 * If false set, the region of null data will not be connected and get empty.
	 */
	connectNull?: boolean;

	/**
	 * Change step type for step chart.
	 * 'step', 'step-before' and 'step-after' can be used.
	 */
	step?: {
		type?: "step" | "step-before" | "step-after";
	};

	/**
	 * Set if min or max value will be 0 on line chart.
	 */
	zerobased?: boolean;

	/**
	 * If set, used to set a css class on each line.
	 */
	classes?: string[];

	/**
	 * Set to false to not draw points on linecharts. Or pass an array of line ids to draw points for.
	 */
	point?: boolean | string[];
}

export interface PieOptions {
	label?: {
		/**
		 * Show or hide label on each pie piece.
		 */
		show?: boolean;

		/**
		 * Set threshold ratio to show/hide labels.
		 */
		threshold?: number;

		/**
		 * Set formatter for the label on each pie piece.
		 */
		format?(this: Chart, value: number, ratio: number, id: string): string;

		/**
		 * Set ratio of labels position.
		 */
		ratio?: ((this: Chart, d: DataItem, radius: number, h: number) => void) | number
	};

	/**
	 * Enable or disable expanding pie pieces.
	 */
	expand?: boolean | {
		/**
		 * Set expand transition time in ms.
		 */
		duration?: number;

		/**
		 * Set expand rate.
		 */
		rate?: number;
	};

	/**
	 * Sets the inner radius of pie arc.
	 */
	innerRadius?: number | {
		[key: string]: number
	};

	/**
	 * Sets the outer radius of pie arc.
	 */
	outerRadius?: number | {
		[key: string]: number
	};

	/**
	 * Set padding between data.
	 */
	padAngle?: number;

	/**
	 * Sets the gap between pie arcs.
	 */
	padding?: number;

	/**
	 * Set starting angle where data draws.
	 */
	startingAngle?: number;
}

export interface PolarOptions {
	label?: {
		/**
		 * Show or hide label on each polar piece.
		 */
		show?: boolean;

		/**
		 * Set threshold ratio to show/hide labels.
		 */
		threshold?: number;

		/**
		 * Set formatter for the label on each polar piece.
		 */
		format?(this: Chart, value: number, ratio: number, id: string): string;

		/**
		 * Set ratio of labels position.
		 */
		ratio?: ((this: Chart, d: DataItem, radius: number, h: number) => void) | number
	};
	level?: {
		/**
		 * Set the level depth.
		 */
		depth?: number;

		/**
		 * Set level max value.
		 */
		max?: number;

		/**
		 * Show or hide level.
		 */
		show?: boolean;

		text?: {
			/**
			 * Set label text's background color.
			 */
			backgroundColor?: string;

			/**
			 * Set format function for the level value.
			 */
			format?: (this: Chart, x: string) => string;

			/**
			 * Show or hide level text.
			 */
			show?: boolean;
		}
	};

	/**
	 * Set padding between data.
	 */
	padAngle?: number;

	/**
	 * Sets the gap between pie arcs.
	 */
	padding?: number;

	/**
	 * Set starting angle where data draws.
	 */
	startAngle?: number;
}

export interface RadarOptions {
	axis?: {
		/**
		 * The max value of axis. If not given, it'll take the max value from the given data.
		 */
		max?: number;

		line?: {
			/**
			 * Show or hide axis line.
			 */
			show?: boolean;
		};

		text?: {
			position?: {
				/**
				 * x coordinate position, relative the original
				 */
				x?: number;

				/**
				 * y coordinate position, relative the original
				 */
				y?: number;
			};

			/**
			 * Show or hide axis text.
			 */
			show?: boolean;
		};
	};

	direction?: {
		/**
		 * Set the direction to be drawn.
		 */
		clockwise?: boolean;
	};

	level?: {
		/**
		 * Set the level depth.
		 */
		depth?: number;

		/**
		 * Show or hide level.
		 */
		show?: boolean;

		text?: {
			/**
			 * Set format function for the level value.
			 */
			format?: (this: Chart, x: string) => string;

			/**
			 * Show or hide level text.
			 */
			show?: boolean;
		};
	};

	size?: {
		/**
		 * Set size ratio.
		 */
		ratio?: number;
	};
}

export interface ScatterOptions {
	/**
	 * Set if min or max value will be 0 on scatter chart.
	 */
	zerobased?: boolean;
}

export interface SplineOptions {
	interpolation?: {
		/**
		 * Set custom spline interpolation
		 */
		type?: "basis"
		| "basis-open"
		| "bundle"
		| "cardinal"
		| "cardinal-closed"
		| "cardinal-open"
		| "catmull-rom"
		| "catmull-rom-closed"
		| "catmull-rom-open"
		| "monotone-x"
		| "monotone-y"
		| "natural"
		| "linear-closed"
		| "linear"
		| "step"
		| "step-after"
		| "step-before"
	};
}

export interface LinearGradientOptions {
	/**
	 * x1, x2 attributes
	 */
	x?: [number, number];

	/**
	 * y1, y2 attributes
	 */
	y?: [number, number];

	/**
	 * The ramp of colors to use on a gradient
	 *
	 * offset, stop-color, stop-opacity
	 * - setting 'null' for stop-color, will set its original data color
	 * - setting 'function' for stop-color, will pass data id as argument. It should return color string or null value
	 */
	stops?: Array<[number, string | null | ((this: Chart, id: string) => string), number]>;
}

export interface TreemapOptions {
	/**
	 * Treemap tile type
	 * - **Available tile type values:**
	 *  - binary (d3.treemapBinary)
	 *  - dice (d3.treemapDice)
	 * 	- slice (d3.treemapSlice)
	 * 	- sliceDice (d3.treemapSliceDice)
	 * 	- squrify (d3.treemapSquarify)
	 * 	- resquarify (d3.treemapResquarify)
	 */
	tile?: string;

	label?: {
		/**
		 * Show or hide label text.
		 */
		show?: boolean;

		/**
		 * Set formatter for the label.
		 */
		format?: (this: Chart, value: number, ratio: number, id: string) => string;

		/**
		 * Set threshold ratio to show/hide labels.
		 */
		threshold?: number
	};
}
