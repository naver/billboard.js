/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {Data, RegionOptions} from "./options";
import {ArrayOrString, d3Selection, DataArray, DataItem, PrimitiveArray, TargetIds} from "./types";

export interface Chart {
	$: {
		/**
		 * Wrapper element
		 */
		chart: d3Selection;

		/**
		 * Main svg element
		 */
		svg: d3Selection;

		/**
		 * Definition element
		 */
		defs: d3Selection;

		/**
		 * Main grouping element
		 */
		main: d3Selection;

		/**
		 * Tooltip element
		 */
		tooltip: d3Selection;

		/**
		 * Legend element
		 */
		legend: d3Selection;

		/**
		 * Title element
		 */
		title: d3Selection;

		/**
		 * Grid element
		 */
		grid: d3Selection;

		/**
		 * Arc element
		 */
		arc: d3Selection;

		bar: {
			/**
			 * Bar elements
			 */
			bars: d3Selection;
		};

		/**
		 * Candlestick elements
		 */
		candlestick: d3Selection;

		line: {
			/**
			 * Line elements
			 */
			lines: d3Selection;

			/**
			 * Areas elements
			 */
			areas: d3Selection;

			/**
			 * Data point circle elements
			 */
			circles: d3Selection;
		};

		text: {
			/**
			 * Data label text elements
			 */
			texts: d3Selection;
		};
	};

	/**
	 * Plugin instance array
	 */
	plugins: any[];

	xgrids: GridOperations;
	ygrids: GridOperations;

	regions: {
		/**
		 * Update regions.
		 * @param regions Regions will be replaced with this argument. The format of this argument is the same as regions.
		 */
		(regions: RegionOptions[]): void;

		/**
		 * Add new region. This API adds new region instead of replacing like regions.
		 * @param grids New region will be added. The format of this argument is the same as regions and it's possible to give an Object if only one region will be added.
		 */
		add(regions: RegionOptions | RegionOptions[]): void;

		/**
		 * Remove regions. This API removes regions.
		 * @param args This argument should include classes. If classes is given, the regions that have one of the specified classes will be removed. If args is not given, all of regions will be
		 * removed.
		 */
		remove(args?: { classes: string[] }): void;
	};

	data: {
		/**
		 * Get data loaded in the chart.
		 * @param targetIds If this argument is given, this API returns the specified target data. If this argument is not given, all of data will be returned.
		 */
		(targetIds?: ArrayOrString): DataArray;

		/**
		 * Get data shown in the chart.
		 * @param targetIds If this argument is given, this API filters the data with specified target ids. If this argument is not given, all shown data will be returned.
		 */
		shown(targetIds?: ArrayOrString): DataArray;

		/**
		 * Get values of the data loaded in the chart.
		 * @param targetIds This API returns the values of specified target. If this argument is not given, null will be retruned.
		 */
		values(targetIds?: ArrayOrString): number[];

		/**
		 * Get and set names of the data loaded in the chart.
		 * @param names If this argument is given, the names of data will be updated. If not given, the current names will be returned. The format of this argument is the same as data.names.
		 */
		names(names?: { [key: string]: string }): { [key: string]: string };

		/**
		 * Get and set colors of the data loaded in the chart.
		 * @param colors If this argument is given, the colors of data will be updated. If not given, the current colors will be returned. The format of this argument is the same as data.colors.
		 */
		colors(colors?: { [key: string]: string; }): { [key: string]: string };

		/**
		 * Get and set axes of the data loaded in the chart.
		 * @param axes If this argument is given, the axes of data will be updated. If not given, the current axes will be returned. The format of this argument is the same as data.axes.
		 */
		axes(axes?: { [key: string]: string }): { [key: string]: string };

		/**
		 * Get the minimum data value bound to the chart.
		 */
		min(): DataItem[];

		/**
		 * Get the maximum data value bound to the chart.
		 */
		max(): DataItem[];
	};

	axis: {
		/**
		 * Get and set axis labels.
		 * @param labels If labels is given, specified axis' label will be updated.
		 */
		labels(labels?: { [key: string]: string }): { [key: string]: string };

		/**
		 * Get and set axis min value.
		 * @param min If min is given, specified axis' min value will be updated. If no argument is given, the current min values for each axis will be returned.
		 */
		min(min?: number | false | { [key: string]: number }): number | {
			[key: string]: number | undefined
		};

		/**
		 * Get and set axis max value.
		 * @param max If max is given, specified axis' max value will be updated. If no argument is given, the current max values for each axis will be returned.
		 */
		max(max?: number | false | { [key: string]: number }): number | {
			[key: string]: number | undefined
		};

		/**
		 * Get and set axis min and max value.
		 * @param range If range is given, specified axis' min and max value will be updated. If no argument is given, the current min and max values for each axis will be returned.
		 */
		range(range?: {
			min?: number | false | { [key: string]: number | false };
			max?: number | false | { [key: string]: number | false };
		}): {
			min: number | { [key: string]: number | undefined };
			max: number | { [key: string]: number | undefined };
		};
	};

	legend: {
		/**
		 * Show legend for each target.
		 * @param targetIds If targetIds is given, specified target's legend will be shown. If only one target is the candidate, String can be passed. If no argument is given, all of target's
		 * legend will be shown.
		 */
		show(targetIds?: ArrayOrString): void;

		/**
		 * Hide legend for each target.
		 * @param targetIds If targetIds is given, specified target's legend will be hidden. If only one target is the candidate, String can be passed. If no argument is given, all of target's
		 * legend will be hidden.
		 */
		hide(targetIds?: ArrayOrString): void;
	};

	zoom: {
		/**
		 * Zoom by giving x domain.
		 * @param domain If domain is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
		 */
		(domain?: Array<Date|number|string>): Array<Date|number>;

		/**
		 * Enable and disable zooming.
		 * @param enabled If enabled is true, the feature of zooming will be enabled. If false is given, it will be disabled.
		 */
		enable(enabled: boolean): void;

		/**
		 * Set or get x Axis minimum zoom range value.
		 * @param min Minimum value to set for zoom
		 */
		min(min?: number): number;

		/**
		 * Set or get x Axis maximum zoom range value.
		 * @param max Maximum value to set for zoom
		 */
		max(max?: number): number;

		/**
		 * Set zoom range.
		 * @param range Zoom range object value
		 */
		range(range?: { min?: number, max?: number }): { min: number, max: number }
	};

	subchart: {
		/**
		 * Hide generated subchart
		 * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
		 */
		hide(): void;

		/**
		 * Show subchart
		 * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
		 */
		show(): void

		/**
		 * Hide generated subchart
		 * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
		 */
		toggle(): void;
	};

	tooltip: {
		/**
		 * Hide tooltip
		 */
		hide(): void;

		/**
		 * Show tooltip
		 * @param args Option object to specify specific tooltip
		 */
		show(args: {
			index?: number,
			data?: { x?: number | Date, index?: number, id?: string, value?: number },
			mouse?: number[],
			x?: number | Date,
		}): void
	};

	/**
	 * This API highlights specified targets and fade out the others.
	 * You can specify multiple targets by giving an array that includes id as String.
	 * If no argument is given, all of targets will be highlighted.
	 * @param targetIds Target Ids value to focus
	 */
	focus(targetIds?: ArrayOrString): void;

	/**
	 * This API fades out specified targets and reverts the others.
	 * You can specify multiple targets by giving an array that includes id as String.
	 * If no argument is given, all of targets will be faded out.
	 * @param targetIds Target Ids value to defocus
	 */
	defocus(targetIds?: ArrayOrString): void;

	/**
	 * This API reverts specified targets.
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be reverted.
	 */
	revert(targetIds?: ArrayOrString): void;

	/**
	 * This API shows specified targets.
	 * You can specify multiple targets by giving an array that includes id as String.
	 * If no argument is given, all of targets will be shown.
	 * If withLegend is set true, legend will be shown together with the specified data.
	 */
	show(targetIds?: ArrayOrString, options?: { withLegend: boolean }): void;

	/**
	 * This API hides specified targets.
	 * You can specify multiple targets by giving an array that includes id as String.
	 * If no argument is given, all of targets will be hidden.
	 * If withLegend is set true, legend will be hidden together with the specified data.
	 */
	hide(targetIds?: ArrayOrString, options?: { withLegend: boolean }): void;

	/**
	 * This API toggles (shows or hides) specified targets.
	 * You can specify multiple targets by giving an array that includes id as String.
	 * If no argument is given, all of targets will be toggles.
	 * If withLegend is set true, legend will be toggled together with the specified data.
	 */
	toggle(targetIds?: ArrayOrString, options?: { withLegend: boolean }): void;

	/**
	 * Load data to the chart.
	 * You can specify multiple targets by giving an array that includes id as String.
	 * If no argument is given, all of targets will be toggles.
	 * - Note:
	 *   - unload should be used if some data needs to be unloaded simultaneously.
	 *     If you call unload API soon after/before load instead of unload param, chart will not be rendered properly because of cancel of animation.
	 *   - done will be called after data loaded, but it's not after rendering.
	 *     It's because rendering will finish after some transition and there is some time lag between loading and rendering
	 */
	load(this: Chart, args: {
		append?: boolean;
		url?: string;
		json?: Array<{[key: string]: string | number }> | {[key: string]: Array<string | number>};
		rows?: PrimitiveArray[];
		columns?: PrimitiveArray[];
		data?: Array<{ [key: string]: number }>;
		names?: { [key: string]: string };
		xs?: { [key: string]: string };
		classes?: { [key: string]: string };
		categories?: string[];
		axes?: { [key: string]: string | string[] };
		colors?: { [key: string]: string };
		headers?: { [key: string]: string };
		keys?: { [key: string]: string | string[] };
		mimeType?: string;
		type?: string;
		types?: { [key: string]: string };
		unload?: boolean | ArrayOrString;
		done?: (this: Chart) => void;
		resizeAfter?: boolean;
	}): void;

	/**
	 * Unload data to the chart.
	 * You can specify multiple targets by giving an array that includes id as String.
	 * - If no argument is given, all of targets will be toggles.
	 * - If ids given, the data that has specified target id will be unloaded. ids should be String or Array.
	 * - If ids is not specified, all data will be unloaded.
	 * - If done given, the specified function will be called after data loded.
	 *
	 * - NOTE:
	 *   - If you call load API soon after/before unload, unload param of load should be used. Otherwise chart will not be rendered properly because of cancel of animation.
	 *   - done will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering.
	 */
	unload(this: Chart, args?: TargetIds | {
		ids?: TargetIds,
		done?: (this: Chart) => void,
		resizeAfter?: boolean;
	}): void;

	/**
	 * Flow data to the chart. By this API, you can append new data points to the chart.
	 *
	 * The args object can consist with following members:
	 *    | Key | Type | Description |
	 *    | --- | --- | --- |
	 *    | json | Object | Data as JSON format (@see [data․json](Options.html#.data%25E2%2580%25A4json)) |
	 *    | rows | Array | Data in array as row format (@see [data․rows](Options.html#.data%25E2%2580%25A4json)) |
	 *    | columns | Array | Data in array as column format (@see [data․columns](Options.html#.data%25E2%2580%25A4columns)) |
	 *    | to | String | The lower x edge will move to that point. If not given, the lower x edge will move by the number of given data points |
	 *    | length | Number | The lower x edge will move by the number of this argument |
	 *    | duration | Number | The duration of the transition will be specified value. If not given, transition.duration will be used as default |
	 *    | done | Function | The specified function will be called when flow ends |
	 *
	 * - NOTE:
	 *   - If json, rows and columns given, the data will be loaded.
	 *   - If data that has the same target id is given, the chart will be appended.
	 *   - Otherwise, new target will be added. One of these is required when calling.
	 *   - If json specified, keys is required as well as data.json.
	 * 	 - If tab isn't visible(by evaluating `document.hidden`), will not be executed to prevent unnecessary work.
	 */
	flow(args: {
		json?: {};
		keys?: { x?: string; value: string[] };
		rows?: PrimitiveArray[];
		columns?: PrimitiveArray[];
		to?: any;
		length?: number;
		duration?: number;
		done?(this: Chart): void;
	}): void;

	/**
	 * Change data point state to selected. By this API, you can select data points. To use this API, data.selection.enabled needs to be set true.
	 * @param ids Specify target ids to be selected. If this argument is not given, all targets will be the candidate.
	 * @param indices Specify indices to be selected. If this argument is not given, all data points will be the candidate.
	 * @param resetOthers If this argument is set true, the data points that are not specified by ids, indices will be unselected.
	 */
	select(ids?: string[], indices?: number[], resetOthers?: boolean): void;

	/**
	 * Change data point state to unselected. By this API, you can unselect data points. To use this API, data.selection.enabled needs to be set true.
	 * @param ids Specify target ids to be unselected. If this argument is not given, all targets will be the candidate.
	 * @param indices Specify indices to be unselected. If this argument is not given, all data points will be the candidate.
	 */
	unselect(ids?: string[], indices?: number[]): void;

	/**
	 * Get selected data points. By this API, you can get selected data points information. To use this API, data.selection.enabled needs to be set true.
	 * @param targetId You can filter the result by giving target id that you want to get. If not given, all of data points will be returned.
	 */
	selected(targetId?: string): Data;

	/**
	 * Update groups for the targets.
	 * @param groups This argument needs to be an Array that includes one or more Array that includes target ids to be grouped.
	 */
	groups(groups: string[][]): void;

	/**
	 * Gets and sets the value a category
	 * @param index Index of the category to get or set
	 * @param category: Value of the category to update
	 */
	category(index: number, category?: string): string;

	/**
	 * Get and set the categories
	 * @param categories: Value of the categories to update
	 */
	categories(categories?: string[]): string[];

	/**
	 * Get the color for the specified targetId
	 */
	color(targetId: string): string;

	/**
	 * Get and set x values for the chart.
	 * @param x If x is given, x values of every target will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
	 */
	x(x?: PrimitiveArray): PrimitiveArray;

	/**
	 * Get and set x values for the chart.
	 * @param x If x is given, x values of every target will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
	 */
	xs(xs?: {
		[key: string]: PrimitiveArray;
	}): { [key: string]: PrimitiveArray };

	/**
	 * Unzoom to the original domain.
	 */
	unzoom(): void;

	/**
	 * Resize the chart. If no size is specified it will resize to fit.
	 * @param size This argument should include width and height in pixels.
	 */
	resize(size?: { width?: number; height?: number }): void;

	/**
	 * Force to redraw.
	 * - **NOTE:** When zoom/subchart is used, the zoomed state will be resetted.
	 * @param soft For soft redraw.
	 */
	flush(soft?: boolean): void;

	/**
	 * Reset the chart object and remove element and events completely.
	 */
	destroy(): void;

	/**
	 * Export chart as an image.
	 * - NOTE:
	 *   - IE11 and below not work properly due to the lack of the feature(foreignObject) support
	 *   - The basic CSS file(ex. billboard.css) should be at same domain as API call context to get correct styled export image.
	 * @param option Export options
	 * @param [option.mimeType="image/png"] The desired output image format. (ex. 'image/png' for png, 'image/jpeg' for jpeg format)
	 * @param [option.width={currentWidth}] width
	 * @param [option.height={currentHeigth}] height
	 * @param [option.preserveAspectRatio=true] Preserve aspect ratio on given size
	 * @param [option.preserveFontStyle=false]  Preserve font style(font-family).
	 * **NOTE:**
	 *   - This option is useful when outlink web font style's `font-family` are applied to chart's text element.
	 *   - Text element's position(especially "transformed") can't be preserved correctly according the page's layout condition.
	 *   - If need to preserve accurate text position, embed the web font data within to the page and set `preserveFontStyle=false`.
	 *     - Checkout the embed example: https://stackblitz.com/edit/zfbya9-8nf9nn?file=index.html
	 * @param callback The callback to be invoked when export is ready.
	 */
	export(this: Chart, option?: {
		width?: number;
		height?: number;
		mimeType?: string;
		preserveAspectRatio?: boolean;
		preserveFontStyle?: boolean;
	}, callback?: (this: Chart, dataUrl: string) => void): string;

	/**
	 * Get or set single config option value.
	 * - **NOTE:**
	 *   - without parameter, will return all specified generation options object only. (will exclude any other options not specified at the initialization)
	 * @param optionName The option key name.
	 * @param value The value accepted for indicated option.
	 * @param redraw Set to redraw with the new option changes. (NOTE: Doesn't guarantee work in all circumstances. It can be applied for limited options only)
	 */
	config(optionName?: string, value?: any, redraw?: boolean): any;
}

export interface GridOperations {
	/**
	 * Update the x/y grid lines.
	 * @param grids X/Y grid lines will be replaced with this argument. The format of this argument is the same as grid.x.lines or grid.y.lines.
	 */
	(grids: any[]): void;

	/**
	 * Add x/y grid lines. This API adds new x/y grid lines instead of replacing like xgrids.
	 * @param grids New x/y grid lines will be added. The format of this argument is the same as grid.x.lines or grid.y.lines and it's possible to give an Object if only one line will be added.
	 */
	add(grids: any[] | {}): void;

	/**
	 * Remove x/y grid lines. This API removes x/y grid lines.
	 * @param args This argument should include value or class. If value is given, the x/y grid lines that have specified x/y value will be removed. If class is given, the x/y grid lines that
	 * have specified class will be removed. If args is not given, all of x/y grid lines will be removed.
	 */
	remove(args?: { class?: string; value?: number | string }): void;
}
