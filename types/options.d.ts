/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import { Axis } from "./axis";
import { ChartTypes, d3Selection, DataItem, PrimitiveArray } from "./types";

export interface ChartOptions {
	/**
	 * Specify the CSS selector or the element which the chart will be set to. D3 selection object can be specified also.
	 * If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).
	 * - **NOTE:** In case of element doesn't exist or not specified, will add a `<div>` element to the body.
	 */
	bindto?: string | HTMLElement | d3Selection | null | {
		/**
		 * Specify the element where chart will be drawn.
		 */
		element?: string | HTMLElement | d3Selection;

		/**
		 * Specify the class name of bind element.
		 * NOTE: When class name isn't bb, then you also need to update the default CSS to be rendered correctly.
		 */
		classname?: string;
	};

	size?: {
		/**
		 * The desired width of the chart element.
		 * If this option is not specified, the width of the chart will be calculated by the size of the parent element it's appended to.
		 * Note: This option should be specified if possible because it can improve its performance because some size calculations will be skipped by an explicit value.
		 */
		width?: number;

		/**
		 * The desired height of the chart element.
		 * If this option is not specified, the height of the chart will be calculated by the size of the parent element it's appended to.
		 */
		height?: number;
	};

	padding?: {
		/**
		 * The padding on the top of the chart.
		 */
		top?: number;

		/**
		 * The padding on the right of the chart.
		 */
		right?: number;

		/**
		 * The padding on the bottom of the chart.
		 */

		bottom?: number;

		/**
		 * The padding on the left of the chart.
		 */
		left?: number;
	};

	resize?: {
		/**
		 * Indicate if the chart should automatically get resized when the window gets resized.
		 */
		auto?: boolean;
	};

	color?: {
		/**
		 * Set custom color pattern.
		 */
		pattern?: string[];

		/**
		 * color threshold for gauge and tooltip color
		 */
		threshold?: {
			/**
			 * If set to value, the threshold will be based on the data value.
			 * Otherwise it'll be based on equation of the threshold.max option value.
			 */
			unit?: string;

			/**
			 * Threshold values for each steps
			 */
			values?: number[];

			/**
			 * The base value to determine threshold step value condition.
			 * When the given value is 15 and max 10, then the value for threshold is 15*100/10
			 */
			max?: number;
		};

		/**
		 * if defined, allows use svg's patterns to fill data area. It should return an array of SVGPatternElement.
		 * - NOTE: The pattern element's id will be defined as bb-colorize-pattern-$COLOR-VALUE.
		 *   ex. When color pattern value is ['red', '#fff'] and defined 2 patterns,then ids for pattern elements are:
		 *   - bb-colorize-pattern-red
		 *   - bb-colorize-pattern-fff
		 */
		tiles?: () => SVGPathElement[];

		/**
		 * Set the color value for each data point when mouse/touch onover event occurs.
		 */
		onover: string | {[key: string]: string} | ((d: DataItem) => string);
	};

	interaction?: {
		/**
		 * Indicate if the chart should have interactions.
		 * If false is set, all of interactions (showing/hiding tooltip, selection, mouse events, etc) will be disabled.
		 */
		enabled?: boolean;

		/**
		 * Make brighter for the selected area (ex. 'pie' type data selected area)
		 */
		brighten?: boolean;

		inputType?: {
			/**
			 * enable or disable mouse interaction
			 */
			mouse?: boolean;

			/**
			 * enable or disable touch interaction
			 */
			touch?: boolean | {
				/**
				 * enable or disable to call event.preventDefault on touchstart & touchmove event.
				 * It's usually used to prevent document scrolling.
				 */
				preventDefault?: boolean | number;
			};
		}
	};

	transition?: {
		/**
		 * Set duration of transition (in milliseconds) for chart animation.
		 * Note: If 0 or null set, transition will be skipped. So, this makes initial rendering faster especially in case you have a lot of data.
		 */
		duration?: number;
	};

	data?: Data;

	axis?: Axis;

	grid?: Grid;

	/**
	 * Show rectangles inside the chart.
	 * This option accepts array including object that has axis, start, end and class. The keys start, end and class are optional.
	 * axis must be x, y or y2. start and end should be the value where regions start and end. If not specified, the edge values will be used.
	 * If timeseries x axis, date string, Date object and unixtime integer can be used. If class is set, the region element will have it as class.
	 */
	regions?: RegionOptions[];

	legend?: LegendOptions;

	tooltip?: TooltipOptions;

	subchart?: SubchartOptions;

	zoom?: ZoomOptions;

	point?: PointOptions;

	line?: {
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
			type: "step" | "step-before" | "step-after";
		};

		/**
		 * If set, used to set a css class on each line.
		 */
		classes?: string[];

		/**
		 * Set to false to not draw points on linecharts. Or pass an array of line ids to draw points for.
		 */
		point?: boolean | string[];
	};

	area?: {
		/**
		 * Set background area above the data chart line.
		 */
		above?: boolean;

		/**
		 * Set the linear gradient on area.<br><br>
		 * Or customize by giving below object value:
		 *  - x {Array}: `x1`, `x2` value
		 *  - y {Array}: `y1`, `y2` value
		 *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
		 */
		linearGradient?: boolean | AreaLinearGradientOptions;

		/**
		 * Set if min or max value will be 0 on area chart.
		 */
		zerobased?: boolean;
	};

	bar?: {
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
			[key: string]: {
				ratio: number;
				max: number;
			}
		};

		headers?: Array<{ [key: string]: string; }>;

		/**
		 * Set if min or max value will be 0 on bar chart.
		 */
		zerobased?: boolean;

		/**
		 * Set space between bars in bar charts
		 */
		space?: number;

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
	};

	bubble?: {
		/**
		 * Set the max bubble radius value
		 */
		maxR?: (d: {}) => number | number;
	};

	radar?: {
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
				/**
				 * Show or hide axis text.
				 */
				show?: boolean;
			};

			direction?: {
				/**
				 * Set the direction to be drawn.
				 */
				clockwise: boolean;
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
					format?: (x: string) => string;

					/**
					 * Show or hide level text.
					 */
					show?: boolean;
				};
			}

			size?: {
				/**
				 * Set size ratio.
				 */
				ratio?: number;
			}
		}
	};

	pie?: {
		label?: {
			/**
			 * Show or hide label on each pie piece.
			 */
			show?: boolean;

			/**
			 * Set threshold to show/hide labels.
			 */
			threshold?: number;

			/**
			 * Set formatter for the label on each pie piece.
			 */
			format?(value: number, ratio: number, id: string): string;

			/**
			 * Set ratio of labels position.
			 */
			ratio?: (d: DataItem, radius: number, h: number) => void | number
		};
		/**
		 * Enable or disable expanding pie pieces.
		 */
		expand?: boolean | {
			/**
			 * Set expand transition time in ms.
			 */
			duration?: number;
		};

		/**
		 * Sets the inner radius of pie arc.
		 */
		innerRadius?: number;

		/**
		 * Set padding between data.
		 */
		padAngle?: number;

		/**
		 * Sets the gap between pie arcs.
		 */
		padding?: number;
	};

	donut?: {
		label?: {
			/**
			 * Show or hide label on each donut piece.
			 */
			show?: boolean;

			/**
			 * Set threshold to show/hide labels.
			 */
			threshold?: number;

			/**
			 * Set formatter for the label on each donut piece.
			 */
			format?(value: number, ratio: number, id: string): string;
		};

		/**
		 * Enable or disable expanding pie pieces.
		 */
		expand?: boolean;

		/**
		 * Set width of donut chart.
		 */
		width?: number;

		/**
		 * Set title of donut chart.
		 */
		title?: string;
	};

	gauge?: {
		label?: {
			/**
			 * Show or hide label on gauge.
			 */
			show?: boolean;

			/**
			 * Set formatter for the label on gauge.
			 */
			format?(value: any, ratio: number): string;
		};

		/**
		 * Enable or disable expanding gauge.
		 */
		expand?: boolean;

		/**
		 * Set min value of the gauge.
		 */
		min?: number;

		/**
		 * Set max value of the gauge.
		 */
		max?: number;

		/**
		 * Set units of the gauge.
		 */
		units?: string;

		/**
		 * Set width of gauge chart.
		 */
		width?: number;

		/**
		 * Whether this should be displayed
		 * as a full circle instead of a
		 * half circle.
		 */
		fullCircle?: boolean;
	};

	spline?: {
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
	};

	/**
	 * Set a callback to execute when the chart is initialized.
	 */
	oninit?(): void;

	/**
	 * Set a callback to execute after the chart is initialized
	 */
	onafterinit?(): void;

	/**
	 * Set a callback to execute before the chart is initialized
	 */
	onbeforeinit?(): void;

	/**
	 * Set a callback which is executed when the chart is rendered. Basically, this callback will be called in each time when the chart is redrawed.
	 */
	onrendered?(): void;

	/**
	 * Set a callback to execute when mouse/touch enters the chart.
	 */
	onover?(): void;

	/**
	 * Set a callback to execute when mouse/touch leaves the chart.
	 */
	onout?(): void;

	/**
	 * Set a callback to execute when user resizes the screen.
	 */
	onresize?(): void;

	/**
	 * Set a callback to execute when screen resize finished.
	 */
	onresized?(): void;

	/**
	 * Set 'clip-path' attribute for chart element.
	 * When is false, chart node element is positioned after the axis node in DOM tree hierarchy.
	 * Is to make chart element positioned over axis element.
	 */
	clipPath?: boolean;
}

export interface AreaLinearGradientOptions {
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
	 */
	stops?: [
		/**
		 * offset, stop-color, stop-opacity
		 * - setting 'null' for stop-color, will set its original data color
		 * - setting 'function' for stop-color, will pass data id as argument. It should return color string or null value
		 */
		[number, string | null | ((id: string) => string), number]
	];
}

export interface RegionOptions {
	axis?: string;
	start?: string | number | Date;
	end?: string | number | Date;
	class?: string;
}

export interface LegendOptions {
	/**
	 * Show or hide legend.
	 */
	show?: boolean;

	/**
	 * Hide legend
	 * If true given, all legend will be hidden. If string or array given, only the legend that has the id will be hidden.
	 */
	hide?: boolean | string[] | string;

	/**
	 * Change the position of legend.
	 * Currently bottom, right and inset are supported.
	 */
	position?: string;

	/**
	 * Change inset legend attributes.
	 * This option accepts object that has the keys anchor, x, y and step.
	 * - anchor: decides the position of the legend. These anchors are available: top-left, top-right, bottom-left, bottom-right
	 * - x and y: set the position of the legend based on the anchor.
	 * - step: defines the max step the lagend has (e.g. If 2 set and legend has 3 legend item, the legend 2 columns).
	 */
	inset?: {
		anchor?: string;
		x?: number;
		y?: number;
		step?: number;
	};
	/**
	 * Padding between legend elements.
	 */
	padding?: number;

	item?: {
		/**
		 * Tile settings for legend color display.
		 */
		tile?: {
			/**
			 * Tile width.
			 */
			width?: number;

			/**
			 * Tile height
			 */
			height?: number;
		};
		/**
		 * Set click event handler to the legend item.
		 */
		onclick?(id: DataItem): void;

		/**
		 * Set mouseover event handler to the legend item.
		 */
		onover?(id: DataItem): void;

		/**
		 * Set mouseout event handler to the legend item.
		 */
		onout?(id: DataItem): void;
	};

	/**
	 * Set legend templates
	 */
	contents?: {
		/**
		 * Set CSS selector or element reference to bind legend items.
		 */
		bindto?: string | HTMLElement;

		/**
		 * Set item's template.
		 * If set string value, within template the 'color' and 'title' can be replaced using template-like syntax string:
		 *  {=COLOR}: data color value
		 *  {=TITLE}: data title value
		 *  If set function value, will pass following arguments to the given function:
		 *  title {String}: data's id value
		 *  color {String}: color string
		 *  data {Array}: data array
		 */
		template?: (title: string, color: string, data: DataItem[]) => void | string;
	};

	/**
	 * Whether to use custom points in legend.
	 */
	usePoint?: boolean;
}

export interface TooltipOptions {
	/**
	 * Show or hide tooltip.
	 */
	show?: boolean;

	/**
	 * Set if tooltip is grouped or not for the data points.
	 */
	grouped?: boolean;
	format?: {
		/**
		 * Set format for the title of tooltip. Specified function receives x of the data point to show.
		 */
		title?(x: any): string;

		/**
		 * Set format for the name of each data in tooltip.
		 * Specified function receives name, ratio, id and index of the data point to show.
		 * ratio will be undefined if the chart is not donut/pie/gauge.
		 */
		name?(name: string, ratio: number, id: string, index: number): string;

		/**
		 * Set format for the value of each data in tooltip.
		 * Specified function receives name, ratio, id and index of the data point to show.
		 * ratio will be undefined if the chart is not donut/pie/gauge.
		 * If undefined returned, the row of that value will be skipped.
		 */
		value?(value: any, ratio: number, id: string, index: number): string;
	};
	/**
	 * Set tooltip values order
	 * Available Values: desc, asc, any[], function (data1, data2) { ... }, null
	 */
	order?: string | any[] | ((data1: any, data2: any) => number) | null;

	/**
	 * Set custom position for the tooltip.
	 * This option can be used to modify the tooltip position by returning object that has top and left.
	 */
	position?(
		data: any,
		width: number,
		height: number,
		element: any
	): { top: number; left: number };

	/**
	 * Set custom HTML for the tooltip.
	 * Specified function receives data, defaultTitleFormat, defaultValueFormat and color of the data point to show.
	 * If tooltip.grouped is true, data includes multiple data points.
	 */
	contents?(
		data: any,
		defaultTitleFormat: string,
		defaultValueFormat: string,
		color: any
	): string;

	init?: {
	/**
	 * Show tooltip at the initialization.
	 */
	show?: boolean;

	/**
	 * Set x Axis index to be shown at the initialization.
	 */
	x?: number;

	/**
	 * Set the position of tooltip at the initialization.
	 */
	position?: {
			top?: string;
			left?: string;
		}
	};

	/**
	 * Set a callback that will be invoked before the tooltip is shown.
	 */
	onshow?(): void;

	/**
	 * Set a callback that will be invoked before the tooltip is hidden.
	 */
	onhide?(): void;

	/**
	 * Set a callback that will be invoked after the tooltip is shown
	 */
	onshown?(): void;

	/**
	 * Set a callback that will be invoked after the tooltip is hidden.
	 */
	onhidden?(): void;

	/**
	 * Set if tooltips on all visible charts with like x points are shown together when one is shown.
	 */
	linked?: boolean | {
		/**
		 * Groping name for linked tooltip.
		 * If specified, linked tooltip will be groped interacting to be worked only with the same name.
		 */
		name?: string;
	};
}

export interface SubchartOptions {
	/**
	 * Show sub chart on the bottom of the chart.
	 */
	show?: boolean;
	size?: {
		/**
		 * Change the height of the subchart.
		 */
		height: number;
	};

	axis?: {
		x?: {
			/**
			 * Show or hide x axis.
			 */
			show?: boolean;
			tick?: {
				/**
				 * Show or hide x axis tick line.
				 */
				show?: boolean;
				text?: {
					/**
					 * Show or hide x axis tick text.
					 */
					show?: boolean;
				};
			};
		};
	};

	/**
	 * Set callback for brush event.
	 * Specified function receives the current zoomed x domain.
	 */
	onbrush?(domain: any): void;
}

export interface ZoomOptions {
	/**
	 * Enable zooming.
	 */
	enabled?: boolean | {
		/**
		 * Set zoom interaction type.
		 */
		type?: "scroll" | "drag";
	};

	/**
	 * Enable to rescale after zooming.
	 * If true set, y domain will be updated according to the zoomed region.
	 */
	rescale?: boolean;

	/**
	 * Change zoom extent.
	 */
	extent?: [number, number];

	x?: {
		/**
		 * Set x Axis minimum zoom range
		 */
		min?: number | Date;

		/**
		 * Set x Axis maximum zoom range
		 */
		max?: number | Date;
	};

	/**
	 * Set callback that is called when zooming starts.
	 * Specified function receives the zoom event.
	 */
	onzoomstart?(event: Event): void;

	/**
	 * Set callback that is called when the chart is zooming.
	 * Specified function receives the zoomed domain.
	 */
	onzoom?(domain: any): void;

	/**
	 * Set callback that is called when zooming ends.
	 * Specified function receives the zoomed domain.
	 */
	onzoomend?(domain: any): void;

	/**
	 * Set to display zoom reset button for 'drag' type zoom
	 */
	resetButton?: boolean | {
		/**
		 * Text value for zoom reset button.
		 */
		text?: string;
	};
}

export interface PointOptions {
	/**
	 * Whether to show each point in line.
	 */
	show?: boolean;

	/**
	 * The radius size of each point.
	 */
	r?: number | ((d: DataItem) => number);

	focus?: {
		expand: {
			/**
			 * Whether to expand each point on focus.
			 */
			enabled?: boolean;

			/**
			 * The radius size of each point on focus.
			 */
			r?: number;
		};
	};

	select?: {
		/**
		 * The radius size of each point on selected.
		 */
		r?: number;
	};

	/**
	 * The type of point to be drawn
	 * - NOTE: If chart has 'bubble' type, only circle can be used.
	 *   For IE, non circle point expansions are not supported due to lack of transform support.
	 *
	 * - Available Values:
	 *   - circle
	 *   - rectangle
	 */
	type?: string;

	/**
	 * The type of point or svg shape as string, to be drawn for each line
	 * - NOTE:
	 *  This is an experimental feature and can have some unexpected behaviors.
	 *  If chart has 'bubble' type, only circle can be used.
	 *  For IE, non circle point expansions are not supported due to lack of transform support.
	 *
	 * - Available Values:
	 *  - circle
	 *  - rectangle
	 *  - svg shape tag interpreted as string (ex. <polygon points='2.5 0 0 5 5 5'></polygon>)
	 */
	pattern?: string[];
}

export interface Grid {
	/**
	 * Set 'grid & focus lines' to be positioned over grid lines and chart elements.
	 */
	front?: boolean;

	focus?: {
		/**
		 * Show grids when focus.
		 */
		show?: boolean;
	};

	lines?: {
		/**
		 * Set grid lines to be positioned over chart elements.
		 */
		front?: boolean;
	};

	x?: {
		/**
		 * Show grids along x axis.
		 */
		show?: boolean;

		/**
		 * Show additional grid lines along x axis.
		 * This option accepts array including object that has value, text, position and class.
		 * text, position and class are optional. For position, start, middle and end (default) are available.
		 * If x axis is category axis, value can be category name.
		 * If x axis is timeseries axis, value can be date string, Date object and unixtime integer.
		 */
		lines?: LineOptions[];
	};

	y?: {
		/**
		 * Show grids along y axis.
		 */
		show?: boolean;

		/**
		 * Show additional grid lines along y axis.
		 * This option accepts array including object that has value, text, position and class.
		 */
		lines?: LineOptions[];

		/**
		 * Number of y grids to be shown.
		 */
		ticks?: number;
	};
}

export interface LineOptions {
	value: string | number | Date;
	text?: string;
	axis?: string;
	position?: string;
	class?: string;
}

export interface Data {
	/**
	 * Load a CSV or JSON file from a URL.
	 * Note that this will not work if loading via the "file://" protocol as most browsers with block XMLHTTPRequests.
	 */
	url?: string;

	/**
	 * Load data from a multidimensional array, with the first element containing the data names, the following containing related data in that order.
	 */
	rows?: PrimitiveArray[];

	/*
	 * Load data from a multidimensional array, with each element containing an array consisting of a datum name and associated data values.
	 */
	columns?: PrimitiveArray[];

	/**
	 * XHR header value
	 * - NOTE: Should be used with data.url option
	 */
	headers?: Array<{ [key: string]: string; }>;

	/**
	 * Hide each data when the chart appears.
	 * If true specified, all of data will be hidden. If multiple ids specified as an array, those will be hidden.
	 */
	hide?: boolean | string[];

	/**
	 * Converts data id value
	 */
	idConverter?: (id: string) => string;

	/**
	 * Parse a JSON object for data.
	 */
	json?: {};

	/**
	 * Used if loading JSON via data.url
	 */
	mimeType?: string;

	/**
	 * Choose which JSON object keys correspond to desired data.
	 */
	keys?: { x?: string; value: string[] };

	/**
	 * Specify the key of x values in the data.
	 * We can show the data with non-index x values by th is option. This option is required when the type of x axis is timeseries.
	 * If this option is set on category axis, the values of the data
	 * on the key will be used for category names.
	 */
	x?: string;

	/**
	 * Specify the keys of the x values for each data.
	 * This option can be used if we want to show the data that has different x values.
	 */
	xs?: { [key: string]: string };

	/**
	 * Set a format to parse string specifed as x.
	 * Default is %Y-%m-%d
	 */
	xFormat?: string;
	/**
	 * Set localtime format to parse x axis.
	 */
	xLocaltime?: boolean;

	/**
	 * Sort on x axis.
	 */
	xSort?: boolean;

	/**
	 * Set custom data name.
	 */
	names?: { [key: string]: string };
	/**
	 * Set custom data class.
	 * If this option is specified, the element g for the data has an additional class that has the prefix billboard-target- (e.g. billboard-target-additional-data1-class).
	 */
	classes?: { [key: string]: string };

	/**
	 * Set groups for the data for stacking.
	 */
	groups?: string[][];

	/**
	 * Set y axis the data related to. y and y2 can be used.
	 */
	axes?: { [key: string]: string };

	/**
	 * Set chart type at once.
	 * If this option is specified, the type will be applied to every data. This setting can be overwritten by data.types.
	 * - Available Values: area, area-line-range, area-spline, area-spline-range, area-step, bar, bubble, donut, gauge, line, pie, radar, scatter, spline, step
	 */
	type?: ChartTypes;

	/**
	 * Set chart type for each data.
	 * This setting overwrites data.type setting.
	 */
	types?: { [key: string]: ChartTypes };

	/**
	 * Show labels on each data points or set formatter function for data labels.
	 * The formatter function receives 4 arguments such as v, id, i, j and it must return a string that will be shown as the label. The arguments are:
	 * - v is the value of the data point where the label is shown.
	 * - id is the id of the data where the label is shown.
	 * - i is the index of the data point where the label is shown.
	 * - j is the sub index of the data point where the label is shown.
	 * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (e.g. d3.format('$'))
	 */
	labels?: boolean
		| { format: FormatFunction }
		| { format: { [key: string]: FormatFunction } }
		| {
			position: {
				x?: number;
				y?: number;
			}
		};

	/**
	 * Define the order of the data.
	 * This option changes the order of stacking the data and pieces of pie/donut. If null specified, it will be the order the data loaded.
	 * If function specified, it will be used to sort the data and it will recieve the data as argument.
	 * Available Values: desc, asc, function (data1, data2) { ... }, null
	 */
	order?: string | ((...data: string[]) => void) | null;

	/**
	 * Define regions for each data.
	 * The values must be an array for each data and it should include an object that has start, end, style.
	 * If start is not set, the start will be the first data point. If end is not set, the end will be the last data point.
	 * Currently this option supports only line chart and dashed style. If this option specified, the line will be dashed only in the regions.
	 */
	regions?: { [key: string]: Array<{
		start?: number;
		end?: number;
		style?: {
			dasharray?: string;
		};
	}> };

	/**
	 * Set color converter function.
	 * This option should a function and the specified function receives color (e.g. '#ff0000') and d that has data parameters like id, value, index, etc.
	 * And it must return a string that represents color (e.g. '#00ff00').
	 */
	color?(color: string, d: DataItem): string;

	/**
	 * Set color for each data.
	 */
	colors?: {
		[key: string]: string | ((d: DataItem) => string);
	};

	/**
	 * Set text displayed when empty data.
	 */
	empty?: { label: { text: string } };

	selection?: {
		/**
		 * Set data selection enabled
		 * If this option is set true, we can select the data points and get/set its state of selection by API (e.g. select, unselect, selected).
		 */
		enabled?: boolean;

		/**
		 * Set grouped selection enabled.
		 * If this option set true, multiple data points that have same x value will be selected by one selection.
		 */
		grouped?: boolean;

		/**
		 * Set multiple data points selection enabled.
		 * If this option set true, multile data points can have the selected state at the same time.
		 * If false set, only one data point can have the selected state and the others will be unselected when the new data point is selected.
		 */
		multiple?: boolean;

		/**
		 * Enable to select data points by dragging. If this option set true, data points can be selected by dragging.
		 * NOTE: If this option set true, scrolling on the chart will be disabled because dragging event will handle the event.
		 */
		draggable?: boolean;

		/**
		 * Set a callback for each data point to determine if it's selectable or not.
		 * The callback will receive d as an argument and it has some parameters like id, value, index. This callback should return boolean.
		 * @param d Data object
		 */
		isselectable?(d?: any): boolean;
	};

	filter?: (v: Array<{
		id: string;
		id_org: string;
		values: Array<{
			x: number;
			value: number;
			id: string;
			index: number;
			}>
		}>) => boolean;

	stack?: {
		/**
		 * Set the stacking to be normalized
		 * - NOTE: For stacking, 'data.groups' option should be set
		 *  - y Axis will be set in percentage value (0 ~ 100%)
		 *  - Must have postive values
		 */
		normalize?: boolean;
	};

	/**
	 * Set a callback for click event on each data point.
	 * This callback will be called when each data point clicked and will receive d and element as the arguments.
	 * - d is the data clicked and element is the element clicked. In this callback, this will be the Chart object.
	 */
	onclick?(d: DataItem, element: any): void;

	/**
	 * Set a callback for mouse/touch over event on each data point.
	 * This callback will be called when mouse cursor or via touch moves onto each data point and will receive d as the argument.
	 * - d is the data where mouse cursor moves onto. In this callback, this will be the Chart object.
	 */
	onover?(d: DataItem, element?: any): void;

	/**
	 * Set a callback for mouse/touch event on each data point.
	 * This callback will be called when mouse cursor moves out each data point and will receive d as the argument.
	 * - d is the data where mouse cursor moves out. In this callback, this will be the Chart object.
	 */
	onout?(d: DataItem, element?: any): void;

	/**
	 * Set a callback for on data selection.
	 */
	onselected?(d: DataItem, element?: any): void;

	/**
	 * Set a callback for on data un-selection.
	 */
	onunselected?(d: DataItem, element?: any): void;

	/**
	 * Set a callback for minimum data
	 * - NOTE: For 'area-line-range' and 'area-spline-range', mid data will be taken for the comparison
	 */
	onmin?(d: DataItem[]): void;

	/**
	 * Set a callback for maximum data
	 * - NOTE: For 'area-line-range' and 'area-spline-range', mid data will be taken for the comparison
	 */
	onmax?(d: DataItem[]): void;
}

export type FormatFunction = (
	v: any,
	id: string,
	i: number,
	j: number
) => void;
