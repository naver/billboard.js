/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
// Install stubs for optional APIs (export, flow, grid, regions, category) —
// surfaces an explicit import-guidance error when called without importing
// the matching resolver.
import "./Chart/api/stubs";

// shape module
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
	donut,
	funnel,
	gauge,
	line,
	pie,
	polar,
	radar,
	scatter,
	spline,
	step,
	treemap
} from "./config/resolver/shape";

// interaction module
export {selection, subchart, zoom} from "./config/resolver/interaction";

// optional API modules (tree-shakable)
export {category} from "./config/resolver/category";
export {exportApi} from "./config/resolver/export";
export {flow} from "./config/resolver/flow";
export {grid} from "./config/resolver/grid";
export {regions} from "./config/resolver/regions";

export {bb, default} from "./core";
