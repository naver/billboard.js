/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { TYPE } from "../../const.js";
import point_default from "../../../ChartInternal/shape/core/point.js";
import point_default$1 from "../../../ChartInternal/shape/point.js";
import point_default$2 from "../../Options/common/point.js";
import { extendAxis } from "./axis.helpers.js";
import scatter_default from "../../Options/shape/scatter.js";
//#region src/config/resolver/shape/scatter.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let scatter = () => (extendAxis([point_default, point_default$1], [point_default$2, scatter_default]), (scatter = () => TYPE.SCATTER)());
//#endregion
export { scatter };
