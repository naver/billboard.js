/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// common
import main from "./common/main";
import boost from "./common/boost";
import data from "./data/data";
import color from "./common/color";
import interaction from "./interaction/interaction";
import legend from "./common/legend";
import title from "./common/title";
import tooltip from "./common/tooltip";

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
		this.data = options
			.reduce((a, c) => ({...a, ...c}), this.data);
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
