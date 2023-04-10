/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {Axis} from "./axis";
import {ChartTypes, d3Selection, DataItem, PrimitiveArray} from "./types";
import {Chart} from "./chart";
import {IArcData, IData, IDataRow} from "../src/ChartInternal/data/IData";
import {
	ArcOptions,
	AreaOptions,
	BarOptions,
	BubbleOptions,
	CandlestickOptions,
	DonutOptions,
	GaugeOptions,
	LineOptions,
	PieOptions,
	PolarOptions,
	RadarOptions,
	ScatterOptions,
	SplineOptions,
	TreemapOptions
} from "./options.shape";

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

	/**
	 * Set chart background.
	 */
	background?: {
		/**
		 * Specify the class name for background element.
		 */
		class?: string;

		/**
		 * Specify the fill color for background element. (NOTE: Will be ignored if `imgUrl` option is set.)
		 */
		color?: string;

		/**
		 * Specify the image url string for background.
		 */
		imgUrl?: string;
	};

	boost?: {
		/**
		 * Avoid setting inline styles for each shape elements.
		 * - **NOTE:**
		 *   - Will append <style> to the head tag and will add shpes' CSS rules dynamically.
		 *   - For now, covers colors related properties (fill, stroke, etc.) only.
		 */
		useCssRule?: boolean;

		/**
		 * Use Web Worker as possible for processing.
		 * - **NOTE:**
		 *   - For now, only applies for data conversion at the initial time.
		 *   - As of Web Worker's async nature, handling chart instance synchrously is not recommended.
		 */
		useWorker?: boolean;
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

	svg?: {
		/**
		 * Set svg element's class name
		 */
		classname?: string;
	};

	/**
	 * Set padding of chart, and accepts object or boolean type.
	 * - `Object`: Specify each side's padding.
	 * - `false`: Remove padding completely and make shape to fully occupy the container element.
	 *   - In this case, axes and subchart will be hidden.
	 *   - To adjust some padding from this state, use `axis.[x|y].padding` option.
	 */
	padding?: boolean | {
		/**
		 * Padding mode
	 	* - `"fit"`: Reduce padding as much as possible to make chart fit to the container element for chart types w/axis.<br>When specified, all padding values will be relative from fitted value.
		*/
		mode?: "fit";

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

		/**
		 * Set resize timer option.
		 * - **NOTE:**
		 *   - The resize function will be called using: true - `setTimeout()`, false - `requestIdleCallback()`.
		 *   - Given number(delay in ms) value, resize function will be triggered using `setTimer()` with given delay.
		 */
		timer?: boolean | number;
	};

	color?: {
		/**
		 * Set custom color pattern.
		 *
		 * Passing 'null' will not set a color for these elements, which requires the usage of custom CSS-based theming to work.
		 */
		pattern?: Array<(string|null)>;

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
		tiles?: (this: Chart) => SVGPathElement[];

		/**
		 * Set the color value for each data point when mouse/touch onover event occurs.
		 */
		onover?: string | { [key: string]: string } | ((this: Chart, d: DataItem) => string);
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

	arc?: ArcOptions;
	area?: AreaOptions;
	bar?: BarOptions;
	bubble?: BubbleOptions;
	candlestick?: CandlestickOptions;
	donut?: DonutOptions;
	gauge?: GaugeOptions;
	line?: LineOptions;
	polar?: PolarOptions;
	pie?: PieOptions;
	radar?: RadarOptions;
	scatter?: ScatterOptions;
	spline?: SplineOptions;
	treemap?: TreemapOptions;

	/**
	 * Set a callback to execute when the chart is initialized.
	 */
	oninit?(this: Chart): void;

	/**
	 * Set a callback to execute after the chart is initialized
	 */
	onafterinit?(this: Chart): void;

	/**
	 * Set a callback to execute before the chart is initialized
	 */
	onbeforeinit?(this: Chart): void;

	/**
	 * Set a callback which is executed when the chart is rendered. Basically, this callback will be called in each time when the chart is redrawed.
	 */
	onrendered?(this: Chart): void;

	/**
	 * Set a callback to execute when the chart is clicked.
	 */
	onclick?(this: Chart, event: Event): void;

	/**
	 * Set a callback to execute when mouse/touch enters the chart.
	 */
	onover?(this: Chart, event: Event): void;

	/**
	 * Set a callback to execute when mouse/touch leaves the chart.
	 */
	onout?(this: Chart, event: Event): void;

	/**
	 * Set a callback to execute when user resizes the screen.
	 */
	onresize?(this: Chart): void;

	/**
	 * Set a callback to execute when screen resize finished.
	 */
	onresized?(this: Chart): void;

	/**
	 * Set 'clip-path' attribute for chart element.
	 * When is false, chart node element is positioned after the axis node in DOM tree hierarchy.
	 * Is to make chart element positioned over axis element.
	 */
	clipPath?: boolean;

	/**
	 * Set plugins
	 */
	plugins?: Array<InstanceType<any>>;

	/**
	 * Control the render timing
	 */
	render?: {
		/**
		 * Make to not render at initialization (enabled by default when bind element's visibility is hidden).
		 */
		lazy?: boolean;

		/**
		 * Observe bind element's visibility(`display` or `visiblity` inline css property or class value) & render when is visible automatically (for IEs, only works IE11+).
		 * When set to **false**, call [`.flush()`](./Chart.html#flush) to render.
		 */
		observe?: boolean;
	};

	title?: {
		/**
		 * Set the title text.
		 * If contains \n, it's used as line break allowing multiline title.
		 */
		text?: string;

		padding?: {
			/**
			 * Top padding value.
			 */
			top?: number;

			/**
			 * Bottom padding value.
			 */
			bottom?: number;

			/**
			 * Right padding value.
			 */
			right?: number;

			/**
			 * Left padding value.
			 */
			left?: number;
		};

		/**
		 * Set the position. Default value is 'center'
		 */
		position?: "center" | "right" | "left";
	};
}

export interface RegionOptions {
	axis?: "x" | "y" | "y2";
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
			 * Set width for 'rectangle' legend item tile element.
			 */
			width?: number;

			/**
			 * Set height for 'rectangle' legend item tile element.
			 */
			height?: number;

			/**
			 * Set legend item shape type.
			 */
			type?: "circle" | "rectangle";

			/**
			 * Set the radius for 'circle' legend item tile type.
			 */
			r?: number;
		};
		/**
		 * Set click event handler to the legend item.
		 */
		onclick?(this: Chart, id: string): void;

		/**
		 * Set mouseover event handler to the legend item.
		 */
		onover?(this: Chart, id: string): void;

		/**
		 * Set mouseout event handler to the legend item.
		 */
		onout?(this: Chart, id: string): void;
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
		template?: ((this: Chart, title: string, color: string, data: DataItem[]) => void) | string;
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
	 * Make tooltip keep showing not hiding on interaction.
	 */
	doNotHide?: boolean;

	/**
	 * Set if tooltip is grouped or not for the data points.
	 */
	grouped?: boolean;
	format?: {
		/**
		 * Set format for the title of tooltip. Specified function receives x of the data point to show.
		 */
		title?(this: Chart, x: any): string;

		/**
		 * Set format for the name of each data in tooltip.
		 * Specified function receives name, ratio, id and index of the data point to show.
		 * ratio will be undefined if the chart is not donut/pie/gauge.
		 */
		name?(this: Chart, name: string, ratio: number, id: string, index: number): string;

		/**
		 * Set format for the value of each data in tooltip. If undefined returned, the row of that value will be skipped to be called.
		 *  - Will pass following arguments to the given function:
		 *    - `value {string}`: Value of the data point
		 *    - `ratio {number}`: Ratio of the data point in the `pie/donut/gauge` and `area/bar` when contains grouped data. Otherwise is `undefined`.
		 *    - `id {string}`: id of the data point
		 *    - `index {number}`: Index of the data point
		 */
		value?(this: Chart, value: number, ratio: number | undefined, id: string, index: number): string;
	};
	/**
	 * Set tooltip values order
	 * Available Values: desc, asc, any[], function (data1, data2) { ... }, null
	 */
	order?: string | any[] | ((this: Chart, data1: any, data2: any) => number) | null;

	/**
	 * Set custom position function for the tooltip.
	 * This option can be used to modify the tooltip position by returning object that has top and left.
	 */
	position?: ((
		this: Chart,
		data: any,
		width: number,
		height: number,
		element: any,
		pos: {
			x: number;
			y: number;
			xAxis?: number;
		}
	) => { top: number; left: number });

	/**
	 * Set custom HTML for the tooltip.
	 * Specified function receives data, defaultTitleFormat, defaultValueFormat and color of the data point to show.
	 * If tooltip.grouped is true, data includes multiple data points.
	 */
	contents?: ((
		this: Chart,
		data: IDataRow[],
		defaultTitleFormat: (x: Date|number|string) => number|string,
		defaultValueFormat: (value: number, ratio: number|undefined, id: string) => number|string,
		color: (d: IDataRow|IArcData|string) => string
	) => string) | {
		/**
		 * Set CSS selector or element reference to bind tooltip.
		 */
		bindto?: string | HTMLElement;

		/**
		 * Within template, below syntax will be replaced using template-like syntax string:
		 *  - {{ ... }}: the doubly curly brackets indicate loop block for data rows
		 *  - {=CLASS_TOOLTIP}: default tooltip class name `bb-tooltip`.
		 *  - {=CLASS_TOOLTIP_NAME}: default tooltip data class name (ex. `bb-tooltip-name-data1`)
		 *  - {=TITLE}: title value
		 *  - {=COLOR}: data color
		 *  - {=VALUE}: data value
		 */
		template?: string;

		/**
		 * Set additional text content within data loop, using template syntax.
		 *  - NOTE: It should contain `{ key: Array, ... }` value
		 *    - 'key' name is used as substitution within template as '{=KEY}'
		 *    - The value array length should match with the data length
		 */
		text?: { [key: string]: string[] | number[] }
	};

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
	onshow?(this: Chart, selectedData: DataItem[]): void;

	/**
	 * Set a callback that will be invoked after the tooltip is shown
	 */
	onshown?(this: Chart, selectedData: DataItem[]): void;

	/**
	 * Set a callback that will be invoked before the tooltip is hidden.
	 */
	onhide?(this: Chart, selectedData: DataItem[]): void;

	/**
	 * Set a callback that will be invoked after the tooltip is hidden.
	 */
	onhidden?(this: Chart, selectedData: DataItem[]): void;

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

	/**
	 * Show sub chart's handle.
	 */
	showHandle?: boolean;

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
				 * Use custom format for x axis ticks - see 'axis.x.tick.format' option for details.
				 */
				format?: string
					| ((this: Chart, x: Date) => string | number)
					| ((this: Chart, index: number, categoryName: string) => string);
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

	init?: {
		/**
		 * Set initial selection domain range.
		 */
		range?: [number, number];
	};

	/**
	 * Set callback for brush event.
	 * Specified function receives the current zoomed x domain.
	 */
	onbrush?(this: Chart, domain: any): void;
}

export interface ZoomOptions {
	/**
	 * Enable zooming.
	 */
	enabled?: boolean;

	/**
	 * Set zoom interaction type.
	 */
	type?: "wheel" | "drag";

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
	onzoomstart?(this: Chart, event: Event): void;

	/**
	 * Set callback that is called when the chart is zooming.
	 * Specified function receives the zoomed domain.
	 */
	onzoom?(this: Chart, domain: any): void;

	/**
	 * Set callback that is called when zooming ends.
	 * Specified function receives the zoomed domain.
	 */
	onzoomend?(this: Chart, domain: any): void;

	/**
	 * Set to display zoom reset button for 'drag' type zoom
	 */
	resetButton?: boolean | {
		/**
		 * Set callback when clicks the reset button. The callback will receive reset button element reference as argument.
		 */
		onclick?(this: Chart, button: HTMLElement): void;

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
	r?: number | ((this: Chart, d: DataItem) => number);

	focus?: {
		expand?: {
			/**
			 * Whether to expand each point on focus.
			 */
			enabled?: boolean;

			/**
			 * The radius size of each point on focus.
			 */
			r?: number;
		};

		/**
		 * Show point only when is focused.
		 */
		only?: boolean;
	};

	/**
	 * Set point opacity value.
	 */
	opacity?: number | null;

	select?: {
		/**
		 * The radius size of each point on selected.
		 */
		r?: number;
	};

	/**
	 * The senstivity value for interaction boundary.
	 */
	sensitivity?: number;

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
		 * Show edged focus grid line.
		 * **NOTE:** Available when [`tooltip.grouped=false`](#.tooltip) option is set.
		 */
		edge?: boolean;

		/**
		 * Show grids when focus.
		 */
		show?: boolean;

		/**
		 * Show y coordinate focus grid line.
		 * **NOTE:** Available when [`tooltip.grouped=false`](#.tooltip) option is set.
		 */
		y?: boolean;
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
		lines?: GridLineOptions[];
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
		lines?: GridLineOptions[];

		/**
		 * Number of y grids to be shown.
		 */
		ticks?: number;
	};
}

export interface GridLineOptions {
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
	idConverter?: (this: Chart, d: string) => string;

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
	names?: { [key: string]: string|null };
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
	 * Set how zero value will be treated on groups.<br>
	 * Possible values:
	 * - `zero`: 0 will be positioned at absolute axis zero point.
	 * - `positive`: 0 will be positioned at the top of a stack.
	 * - `negative`: 0 will be positioned at the bottom of a stack.
	 */
	groupsZeroAs?: "positive" | "negative" | "zero";

	/**
	 * Set y axis the data related to. y and y2 can be used.
	 * - **NOTE:** If all data is related to one of the axes, the domain of axis without related data will be replaced by the domain from the axis with related data
	 */
	axes?: { [key: string]: string };

	/**
	 * Set chart type at once.
	 * If this option is specified, the type will be applied to every data. This setting can be overwritten by data.types.
	 * - Available Values: area, area-line-range, area-spline, area-spline-range, area-step, bar, bubble, candlestick, donut, gauge, line, pie, radar, scatter, spline, step
	 */
	type?: ChartTypes;

	/**
	 * Set chart type for each data.
	 * This setting overwrites data.type setting.
	 * - **NOTE:** `radar` and `treemap` type can't be combined with other types.
	 */
	types?: { [key: string]: ChartTypes };

	/**
	 * Show labels on each data points or set formatter function for data labels.
	 * The formatter function receives 4 arguments such as v, id, i, j and it must return a string that will be shown as the label. The arguments are:
	 * - v is the value of the data point where the label is shown.
	 * - id is the id of the data where the label is shown.
	 * - i is the index of the data point where the label is shown.
	 * - j is the sub index of the data point where the label is shown.
	 */
	labels?: boolean | {
		/**
		 * Centerize labels on `bar` shape. (**NOTE:** works only for 'bar' type)
		 */
		centered?: boolean;

		/**
		 * Set label text background colors.
		 */
		backgroundColors?: string | { [key: string]: string };

		/**
		 * Set label text colors.
		 */
		colors?: string |
			{ [key: string]: string } |
			((this: Chart, color: string, d: DataItem) => string);

		/**
		 * The formatter function receives 4 arguments such as v, id, i, j and it **must return a string**(`\n` character will be used as line break) that will be shown as the label.<br><br>
		 * The arguments are:<br>
		 *  - `v` is the value of the data point where the label is shown.
		 *  - `id` is the id of the data where the label is shown.
		 *  - `i` is the index of the data series point where the label is shown.
		 *  - `texts` is the array of whole corresponding data series' text labels.<br><br>
		 * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
		 */
		format?: FormatFunction | { [key: string]: FormatFunction };

		position?: {
			/**
			 * Set each dataset position, relative the original.
			 */
			[key: string]: {
				/**
				 * x coordinate position, relative the original.
				 */
				x?: number;

				/**
				 * y coordinate position, relative the original.
				 */
				y?: number;
			} | {
				/**
				 * x coordinate position, relative the original.
				 */
				x?: number;

				/**
				 * y coordinate position, relative the original.
				 */
				y?: number;
			};
		};

		/**
		 * Rotate label text. Specify degree value in a range of `0 ~ 360`.
		 */
		rotate?: number;
	};

	/**
	 * Define the order of the data.
	 * This option changes the order of stacking the data and pieces of pie/donut. If null specified, it will be the order the data loaded.
	 * If function specified, it will be used to sort the data and it will recieve the data as argument.
	 *
	 * - Available Values: desc, asc, function (data1, data2) { ... }, null
	 * **NOTE**: order function, only works for Axis based types & Arc types, except `Radar` type.
	 */
	order?: "asc" | "desc" | ((this: Chart, a: IData, b: IData) => number) | null;

	/**
	 * Define regions for each data.
	 * The values must be an array for each data and it should include an object that has start, end, style.
	 * If start is not set, the start will be the first data point. If end is not set, the end will be the last data point.
	 * Currently this option supports only line chart and dashed style. If this option specified, the line will be dashed only in the regions.
	 */
	regions?: {
		[key: string]: Array<{
			start?: number;
			end?: number;
			style?: {
				dasharray?: string;
			};
		}>
	};

	/**
	 * Set color converter function.
	 * This option should a function and the specified function receives color (e.g. '#ff0000') and d that has data parameters like id, value, index, etc.
	 * And it must return a string that represents color (e.g. '#00ff00').
	 */
	color?(this: Chart, color: string, d: DataItem): string;

	/**
	 * Set color for each data.
	 */
	colors?: {
		[key: string]: string | ((this: Chart, d: DataItem) => string);
	};

	/**
	 * Set text label to be displayed when there's no data to show.
	 * - ex. Toggling all visible data to not be shown, unloading all current data, etc.
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
		isselectable?(this: Chart, d?: any): boolean;
	};

	filter?: (this: Chart,
		v: Array<{
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
	onclick?(this: Chart, d: DataItem, element: SVGElement): void;

	/**
	 * Set a callback for mouse/touch over event on each data point.
	 * This callback will be called when mouse cursor or via touch moves onto each data point and will receive d as the argument.
	 * - d is the data where mouse cursor moves onto. In this callback, this will be the Chart object.
	 */
	onover?(this: Chart, d: DataItem, element?: SVGElement): void;

	/**
	 * Set a callback for mouse/touch event on each data point.
	 * This callback will be called when mouse cursor moves out each data point and will receive d as the argument.
	 * - d is the data where mouse cursor moves out. In this callback, this will be the Chart object.
	 */
	onout?(this: Chart, d: DataItem, element?: SVGElement): void;

	/**
	 * Set a callback for on data selection.
	 */
	onselected?(this: Chart, d: DataItem, element?: SVGElement): void;

	/**
	 * Set a callback for on data un-selection.
	 */
	onunselected?(this: Chart, d: DataItem, element?: SVGElement): void;

	/**
	 * Set a callback for minimum data
	 * - NOTE: For 'area-line-range' and 'area-spline-range', mid data will be taken for the comparison
	 */
	onmin?(this: Chart, d: DataItem[]): void;

	/**
	 * Set a callback for maximum data
	 * - NOTE: For 'area-line-range' and 'area-spline-range', mid data will be taken for the comparison
	 */
	onmax?(this: Chart, d: DataItem[]): void;

	/**
	 * Set a callback for when data is shown.
	 * The callback will receive shown data ids in array.
	 */
	onshown?(this: Chart, ids: string[]): void;

	/**
	 * Set a callback for when data is hidden.
	 * The callback will receive hidden data ids in array.
	 */
	onhidden?(this: Chart, ids: string[]): void;
}

export type FormatFunction = (
	this: Chart,
	v: any,
	id: string,
	i: number,
	texts: SVGTextElement[]
) => void;
