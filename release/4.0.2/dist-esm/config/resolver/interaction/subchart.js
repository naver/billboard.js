/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import apiSubchart from '../../../Chart/api/subchart.js';
import Chart from '../../../Chart/Chart.js';
import ChartInternal from '../../../ChartInternal/ChartInternal.js';
import subchart from '../../../ChartInternal/interactions/subchart.js';
import optSubchart from '../../Options/interaction/subchart.js';
import Options from '../../Options/Options.js';
import { extend } from '../../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let subchartModule = () => {
    extend(ChartInternal.prototype, subchart);
    extend(Chart.prototype, apiSubchart);
    Options.setOptions([optSubchart]);
    return (subchartModule = () => true)();
};

export { subchartModule };
