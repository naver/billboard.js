/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
import Chart from "./Chart/Chart";
import ChartInternal from "./ChartInternal/ChartInternal";
import Options from "./config/Options/Options";
import {extend} from "./module/util";
import * as m from "./config/resolver";

const modules = Object.keys(m);
const internals = modules.filter(v => /^(axisInternal|shape)/.test(v)).map(v => m[v]);
const options = modules.filter(v => /^opt/.test(v)).map(v => m[v]);

// extends
extend(ChartInternal.prototype, internals);
extend(Chart.prototype, m.axisAPI);
Options.setOptions(m.axisOptions.concat(options));

export {default, bb} from "./core";
