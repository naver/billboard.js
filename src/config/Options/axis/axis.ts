/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import x from "./x";
import y from "./y";
import y2 from "./y2";

import {mergeObj} from "../../../module/util";

 /**
 * y Axis  config options
 */
export default mergeObj({
    /**
     * Switch x and y axis position.
     * @name axis․rotated
     * @memberof Options
     * @type {Boolean}
     * @default false
     * @example
     * axis: {
     *   rotated: true
     * }
     */
    axis_rotated: false
}, x, y, y2);
