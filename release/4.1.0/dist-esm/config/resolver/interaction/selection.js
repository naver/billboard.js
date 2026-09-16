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
import selection_default from "../../../Chart/api/selection.js";
import selection_default$1 from "../../../ChartInternal/internals/selection.js";
import selection_default$2 from "../../Options/data/selection.js";
//#region src/config/resolver/interaction/selection.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let selectionModule = () => {
	extend(ChartInternal.prototype, selection_default$1);
	extend(Chart.prototype, selection_default);
	Options.setOptions([selection_default$2]);
	return (selectionModule = () => true)();
};
//#endregion
export { selectionModule };
