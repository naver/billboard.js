/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../../../ChartInternal/ChartInternal";
import {customTypeHooks} from "../../../ChartInternal/shape/core/heatmap";
import shapeHeatmap from "../../../ChartInternal/shape/heatmap";
import {extend} from "../../../module/util";
import Options from "../../Options/Options";
import optHeatmap from "../../Options/shape/heatmap";
import {registerCustomType} from "../customType";

export let heatmap = (): string => (
	extend(ChartInternal.prototype, [shapeHeatmap]),
		Options.setOptions([optHeatmap]),
		registerCustomType("heatmap", {hooks: customTypeHooks}),
		(heatmap = () => "heatmap")()
);
