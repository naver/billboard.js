/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */

import Chart from "./Chart/Chart";
import ChartInternal from "./ChartInternal/ChartInternal";
import {extend} from "./module/util";

// Axis
import {
	api as apiAxis,
	internal as internalAxis
} from "./config/resolver/axis";

// Shape
import shapeArc from "./ChartInternal/shape/arc";
import shapeArea from "./ChartInternal/shape/area";
import shapeBar from "./ChartInternal/shape/bar";
import shapeBubble from "./ChartInternal/shape/bubble";
import shapeLine from "./ChartInternal/shape/line";
import shapePoint from "./ChartInternal/shape/point";
import shapeRadar from "./ChartInternal/shape/radar";

// Options
import Options from "./config/Options/Options";

// Axis based
import optDataAxis from "./config/Options/data/axis";
import optDataSelection from "./config/Options/data/selection";
import optAxis from "./config/Options/axis/axis";
import optGrid from "./config/Options/common/grid";
import optPoint from "./config/Options/common/point";
import optSubchart from "./config/Options/common/subchart";
import optZoom from "./config/Options/common/zoom";

import optArea from "./config/Options/shape/area";
import optBar from "./config/Options/shape/bar";
import optBubble from "./config/Options/shape/bubble";
import optLine from "./config/Options/shape/line";
import optScatter from "./config/Options/shape/scatter";
import optSpline from "./config/Options/shape/spline";

// Non-Axis based
import optDonut from "./config/Options/shape/donut";
import optGauge from "./config/Options/shape/gauge";
import optPie from "./config/Options/shape/pie";
import optRadar from "./config/Options/shape/radar";

export {default, bb} from "./core";

extend(ChartInternal.prototype, [
	...internalAxis,
	shapeArc,
	shapeArea,
	shapeBar,
	shapeBubble,
	shapeLine,
	shapePoint,
	shapeRadar
]);

extend(Chart.prototype, apiAxis);

// extend options
Options.setOptions(
	optDataAxis,
	optDataSelection,
	optAxis,
	optGrid,
	optPoint,
	optSubchart,
	optZoom,

	optArea,
	optBar,
	optBubble,
	optLine,
	optScatter,
	optSpline,
	optDonut,
	optGauge,
	optPie,
	optRadar
);
