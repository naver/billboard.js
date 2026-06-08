/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
// Install stubs for optional APIs (export, flow, grid, regions, category) —
// surfaces an explicit import-guidance error when called without importing
// the matching resolver.
import "./Chart/api/stubs";

// canvas shape modules
export {
	area,
	areaLineRange,
	areaSpline,
	areaSplineRange,
	areaStep,
	areaStepRange,
	bar,
	bubble,
	candlestick,
	line,
	scatter,
	spline,
	step,
	treemap
} from "./config/resolver/canvasShape";

// canvas render module
export {canvas} from "./config/resolver/canvas";

// optional API modules (tree-shakable)
export {category} from "./config/resolver/category";
export {exportApi} from "./config/resolver/export";
export {flow} from "./config/resolver/flow";
export {grid} from "./config/resolver/grid";
export {regions} from "./config/resolver/regions";

// interaction modules (tree-shakable)
export {selection, subchart, zoom} from "./config/resolver/interaction";

export {bb, default} from "./core";
