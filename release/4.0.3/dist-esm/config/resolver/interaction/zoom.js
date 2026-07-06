/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import apiZoom from '../../../Chart/api/zoom.js';
import Chart from '../../../Chart/Chart.js';
import ChartInternal from '../../../ChartInternal/ChartInternal.js';
import zoom from '../../../ChartInternal/interactions/zoom.js';
import optZoom from '../../Options/interaction/zoom.js';
import Options from '../../Options/Options.js';
import { extend } from '../../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let zoomModule = () => {
    extend(ChartInternal.prototype, zoom);
    extend(Chart.prototype, apiZoom);
    Options.setOptions([optZoom]);
    return (zoomModule = () => true)();
};

export { zoomModule };
