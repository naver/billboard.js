/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { deepClone } from "../../module/util/object.js";
import boost_default from "./common/boost.js";
import color_default from "./common/color.js";
import legend_default from "./common/legend.js";
import main_default from "./common/main.js";
import title_default from "./common/title.js";
import tooltip_default from "./common/tooltip.js";
import data_default from "./data/data.js";
import interaction_default from "./interaction/interaction.js";
//#region src/config/Options/Options.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Class to set options on generating chart.
* - It's instantiated internally, not exposed for public.
* @class Options
* @see {@link bb.generate} to use these options on generating the chart
*/
var Options = class Options {
	static data = {};
	static setOptions(options) {
		for (let i = 0; i < options.length; i++) Object.assign(this.data, options[i]);
	}
	constructor() {
		return deepClone(main_default, boost_default, data_default, color_default, interaction_default, legend_default, title_default, tooltip_default, Options.data);
	}
};
//#endregion
export { Options as default };
