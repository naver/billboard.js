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
