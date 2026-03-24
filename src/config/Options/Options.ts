/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// common
import boost from "./common/boost";
import color from "./common/color";
import legend from "./common/legend";
import main from "./common/main";
import title from "./common/title";
import tooltip from "./common/tooltip";
import data from "./data/data";
import interaction from "./interaction/interaction";

import {deepClone} from "../../module/util";

/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
export default class Options {
	static data = {};

	static setOptions(options: any[]) {
		for (let i = 0; i < options.length; i++) {
			Object.assign(this.data, options[i]);
		}
	}

	constructor() {
		return deepClone(
			main,
			boost,
			data,
			color,
			interaction,
			legend,
			title,
			tooltip,
			Options.data
		);
	}
}
