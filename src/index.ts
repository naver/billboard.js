/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
import canvasBoxplot from "./canvas/boxplot";
import canvasBullet from "./canvas/bullet";
import canvasFlow from "./canvas/flow";
import canvasGrid from "./canvas/grid";
import canvasHeatmap from "./canvas/heatmap";
import canvasSankey from "./canvas/sankey";
import canvasSelection, {selectionDraw} from "./canvas/selection";
import canvasSubchart, {subchartDraw} from "./canvas/subchart";
import canvasTreemap from "./canvas/treemap";
import ChartInternal from "./ChartInternal/ChartInternal";
import {canvas} from "./config/resolver/canvas";
import {registerCanvasFeature, registerCanvasType} from "./config/resolver/canvasType";
import {category} from "./config/resolver/category";
import {registerAxisType, registerCustomType} from "./config/resolver/customType";
import {exportApi} from "./config/resolver/export";
import {flow} from "./config/resolver/flow";
import {grid} from "./config/resolver/grid";
import * as interaction from "./config/resolver/interaction";
import {regions} from "./config/resolver/regions";
import * as shape from "./config/resolver/shape";
import {extend} from "./module/util";

// extends shape modules
Object.keys(shape)
	.forEach(v => shape[v]());

// extends interaction modules
Object.keys(interaction)
	.forEach(v => interaction[v]());

// always include optional API modules in UMD bundle
exportApi();
flow();
extend(ChartInternal.prototype, canvasFlow);
grid();
registerCanvasFeature("grid", canvasGrid);
extend(ChartInternal.prototype, canvasSubchart);
registerCanvasFeature("subchart", subchartDraw);
extend(ChartInternal.prototype, canvasSelection);
registerCanvasFeature("selection", selectionDraw);
regions();
category();
canvas();

// the canvas drawing of boxplot, which the svg shape resolver does not carry
registerAxisType("boxplot", {canvas: canvasBoxplot});

// the canvas drawing of bullet, which shape resolvers do not carry
registerCustomType("bullet", {canvas: canvasBullet});

// the canvas drawing of heatmap, which the svg shape resolver does not carry
registerCustomType("heatmap", {canvas: canvasHeatmap});

// the canvas drawing of sankey, which the svg shape resolver does not carry
registerCustomType("sankey", {canvas: canvasSankey});

// the canvas drawing of treemap, which the svg shape resolver does not carry
registerCanvasType("treemap", canvasTreemap);

export {bb, default} from "./core";
