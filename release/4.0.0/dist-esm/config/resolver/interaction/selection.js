/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import apiSelection from '../../../Chart/api/selection.js';
import Chart from '../../../Chart/Chart.js';
import ChartInternal from '../../../ChartInternal/ChartInternal.js';
import selection from '../../../ChartInternal/internals/selection.js';
import optDataSelection from '../../Options/data/selection.js';
import Options from '../../Options/Options.js';
import { extend } from '../../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let selectionModule = () => {
    extend(ChartInternal.prototype, selection);
    extend(Chart.prototype, apiSelection);
    Options.setOptions([optDataSelection]);
    return (selectionModule = () => true)();
};

export { selectionModule };
