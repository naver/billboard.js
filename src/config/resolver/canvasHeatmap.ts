/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import canvasHeatmapDraw from "../../canvas/heatmap";
import ChartInternal from "../../ChartInternal/ChartInternal";
import shapeHeatmapCommon, {customTypeHooks} from "../../ChartInternal/shape/core/heatmap";
import {extend} from "../../module/util";
import Options from "../Options/Options";
import optHeatmap from "../Options/shape/heatmap";
import {registerCustomType} from "./customType";

/**
 * Register modules and options required for canvas heatmap charts.
 * Canvas mode draws the heatmap through the module of the type: bundles without it do not carry it.
 * @returns {string} Heatmap chart type
 */
export let heatmap = (): string => (
	extend(ChartInternal.prototype, [shapeHeatmapCommon]),
		Options.setOptions([optHeatmap]),
		registerCustomType("heatmap", {hooks: customTypeHooks, canvas: canvasHeatmapDraw}),
		(heatmap = () => "heatmap")()
);
