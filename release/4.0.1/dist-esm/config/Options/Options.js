/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import boost from './common/boost.js';
import color from './common/color.js';
import legend from './common/legend.js';
import main from './common/main.js';
import title from './common/title.js';
import tooltip from './common/tooltip.js';
import data from './data/data.js';
import interaction from './interaction/interaction.js';
import { deepClone } from '../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// common
/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
class Options {
    static data = {};
    static setOptions(options) {
        for (let i = 0; i < options.length; i++) {
            Object.assign(this.data, options[i]);
        }
    }
    constructor() {
        return deepClone(main, boost, data, color, interaction, legend, title, tooltip, Options.data);
    }
}

export { Options as default };
