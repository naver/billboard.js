/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// common
import main from "./common/main";
import data from "./data/data";
import color from "./common/color";
import interaction from "./common/interaction";
import legend from "./common/legend";
import title from "./common/title";
import tooltip from "./common/tooltip";

// Axis based
import dataAxis from "./data/axis";
import dataSelection from "./data/selection";
import axis from "./axis/axis";
import grid from "./common/grid";
import point from "./common/point";
import subchart from "./common/subchart";
import zoom from "./common/zoom";

import area from "./shape/area";
import bar from "./shape/bar";
import bubble from "./shape/bubble";
import line from "./shape/line";
import spline from "./shape/spline";

// Non-Axis based
import donut from "./shape/donut";
import gauge from "./shape/gauge";
import pie from "./shape/pie";
import radar from "./shape/radar";

import {mergeObj} from "../../module/util";

/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
export default class Options {
	constructor() {
		const arcShapeConfig = [donut, gauge, pie, radar];

		const axisConfig = [dataAxis, dataSelection, axis, grid, point, subchart, zoom];
		const axisShapeConfig = [area, bar, bubble, line, spline];

		const config = [
			data,
			color,
			interaction,
			legend,
			title,
			tooltip,
			...arcShapeConfig,
			...axisConfig,
			...axisShapeConfig
		];

		return mergeObj({...main}, ...config);
	}
}
