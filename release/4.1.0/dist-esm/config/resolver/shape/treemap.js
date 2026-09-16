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
import { extendAxis } from "./axis.helpers.js";
import treemap_default from "../../../ChartInternal/shape/treemap.js";
import treemap_default$1 from "../../Options/shape/treemap.js";
//#region src/config/resolver/shape/treemap.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let treemap = () => (extendAxis([treemap_default], [treemap_default$1]), (treemap = () => TYPE.TREEMAP)());
//#endregion
export { treemap };
