/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
import canvasBullet from "./canvas/bullet";
import canvasTreemap from "./canvas/treemap";
import {canvas} from "./config/resolver/canvas";
import {registerCanvasType} from "./config/resolver/canvasType";
import {category} from "./config/resolver/category";
import {registerCustomType} from "./config/resolver/customType";
import {exportApi} from "./config/resolver/export";
import {flow} from "./config/resolver/flow";
import {grid} from "./config/resolver/grid";
import * as interaction from "./config/resolver/interaction";
import {regions} from "./config/resolver/regions";
import * as shape from "./config/resolver/shape";

// extends shape modules
Object.keys(shape)
	.forEach(v => shape[v]());

// extends interaction modules
Object.keys(interaction)
	.forEach(v => interaction[v]());

// always include optional API modules in UMD bundle
exportApi();
flow();
grid();
regions();
category();
canvas();

// the canvas drawing of bullet, which shape resolvers do not carry
registerCustomType("bullet", {canvas: canvasBullet});

// the canvas drawing of treemap, which the svg shape resolver does not carry
registerCanvasType("treemap", canvasTreemap);

export {bb, default} from "./core";
