/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../../../ChartInternal/ChartInternal";
import {customTypeHooks} from "../../../ChartInternal/shape/core/sankey";
import shapeSankey from "../../../ChartInternal/shape/sankey";
import {extend} from "../../../module/util";
import Options from "../../Options/Options";
import optSankey from "../../Options/shape/sankey";
import {registerCustomType} from "../customType";

export let sankey = (): string => (
	extend(ChartInternal.prototype, [shapeSankey]),
		Options.setOptions([optSankey]),
		registerCustomType("sankey", {hooks: customTypeHooks}),
		(sankey = () => "sankey")()
);
