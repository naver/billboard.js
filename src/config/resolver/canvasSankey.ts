/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import canvasSankeyDraw from "../../canvas/sankey";
import ChartInternal from "../../ChartInternal/ChartInternal";
import shapeSankeyCommon, {customTypeHooks} from "../../ChartInternal/shape/core/sankey";
import {extend} from "../../module/util";
import Options from "../Options/Options";
import optSankey from "../Options/shape/sankey";
import {registerCustomType} from "./customType";

/**
 * Register modules and options required for canvas sankey charts.
 * Canvas mode draws the sankey through the module of the type: bundles without it do not carry it.
 * @returns {string} Sankey chart type
 */
export let sankey = (): string => (
	extend(ChartInternal.prototype, [shapeSankeyCommon]),
		Options.setOptions([optSankey]),
		registerCustomType("sankey", {hooks: customTypeHooks, canvas: canvasSankeyDraw}),
		(sankey = () => "sankey")()
);
