/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {Plugin} from "../plugin";
import {SparklineOptions} from "./options";

export default class Sparkline extends Plugin {
	/**
	 * Sparkline plugin.<br>
	 * Generates sparkline charts
	 * - **NOTE:**
	 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
	 *   - Non required modules from billboard.js core, need to be installed separately.
	 *
	 * - **Bear in mind:**
	 * - Use this plugin to visualize multiple tiny chart only and chart APIs won't work properly.
	 * - Sparkline chart size will be based on the main chart element size. To control spakrline charts, is highly recommended to set `size` option.
	 * - Bubble, scatter and Arc(pie, donut, ratdar) types aren't supported.
	 * - Some options will be stricted to be:
	 *   - `resize.auto = false`
	 *   - `axis.x.show = false`
	 *   - `axis.y.show = false`
	 *   - `axis.y.padding = 10`
	 *   - `legend.show = false`
	 */
	constructor(options: SparklineOptions);
}
