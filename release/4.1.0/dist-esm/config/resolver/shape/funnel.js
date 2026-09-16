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
import { extendArc } from "./arc.helpers.js";
import funnel_default from "../../../ChartInternal/shape/funnel.js";
import funnel_default$1 from "../../Options/shape/funnel.js";
//#region src/config/resolver/shape/funnel.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let funnel = () => (extendArc([funnel_default], [funnel_default$1]), (funnel = () => TYPE.FUNNEL)());
//#endregion
export { funnel };
