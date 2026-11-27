/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeBoxplot from "../../../ChartInternal/shape/boxplot";
import shapeBoxplotCommon, {$BOXPLOT} from "../../../ChartInternal/shape/core/boxplot";
import shapePointCommon from "../../../ChartInternal/shape/core/point";
import {$COMMON} from "../../classes";
import optPoint from "../../Options/common/point";
import optBoxplot from "../../Options/shape/boxplot";
import {registerAxisType} from "../customType";
import {extendAxis} from "./axis.helpers";

// what the shared code uses of the type: the hit of the pointer and the rows of the tooltip
export const boxplotAxisType = {
	padded: true,
	domainValues: ($$, row) => shapeBoxplotCommon.getBoxplotDomainValues.call($$, row),
	// the box of the shape: the pointer is on the data when it is within the box
	hit: ($$, d) =>
		`.${$BOXPLOT.chartBoxplot}.${$COMMON.target}${
			$$.getTargetSelectorSuffix(d.id)
		} .${$BOXPLOT.boxplot}-${d.index} .${$BOXPLOT.boxplotBox}`,
	tooltipRows: ($$, row, format, param) =>
		shapeBoxplotCommon.getBoxplotTooltipRows.call($$, row, format, param)
};

export let boxplot = (): string => (
	extendAxis([shapeBoxplot, shapePointCommon], [optBoxplot, optPoint]),
		registerAxisType("boxplot", boxplotAxisType),
		(boxplot = () => "boxplot")()
);
