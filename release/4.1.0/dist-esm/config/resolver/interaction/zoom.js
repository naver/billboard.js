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
import zoom_default from "../../../Chart/api/zoom.js";
import zoom_default$1 from "../../../ChartInternal/interactions/zoom.js";
import zoom_default$2 from "../../Options/interaction/zoom.js";
//#region src/config/resolver/interaction/zoom.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let zoomModule = () => {
	extend(ChartInternal.prototype, zoom_default$1);
	extend(Chart.prototype, zoom_default);
	Options.setOptions([zoom_default$2]);
	return (zoomModule = () => true)();
};
//#endregion
export { zoomModule };
