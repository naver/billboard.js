/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { extend } from "../../../module/util/object.js";
import Options from "../../Options/Options.js";
import ChartInternal from "../../../ChartInternal/ChartInternal.js";
import Chart from "../../../Chart/Chart.js";
import subchart_default from "../../../Chart/api/subchart.js";
import subchart_default$1 from "../../../ChartInternal/interactions/subchart.js";
import subchart_default$2 from "../../Options/interaction/subchart.js";
//#region src/config/resolver/interaction/subchart.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let subchartModule = () => {
	extend(ChartInternal.prototype, subchart_default$1);
	extend(Chart.prototype, subchart_default);
	Options.setOptions([subchart_default$2]);
	return (subchartModule = () => true)();
};
//#endregion
export { subchartModule };
