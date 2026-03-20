/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapePoint from "../../../ChartInternal/shape/point";
import shapeRadar from "../../../ChartInternal/shape/radar";
import {TYPE} from "../../const";
import optPoint from "../../Options/common/point";
import optRadar from "../../Options/shape/radar";
import {internal as axisInternal, options as axisOptions} from "../axis";
import {extendArc} from "./arc.helpers";

export let radar = (): string => (
	extendArc(
		[axisInternal.eventrect, shapePoint, shapeRadar],
		[optPoint, optRadar, {axis_x_categories: axisOptions.optAxis.axis_x_categories}]
	), (radar = () => TYPE.RADAR)()
);
