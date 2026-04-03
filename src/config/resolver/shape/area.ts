/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeArea from "../../../ChartInternal/shape/area";
import {TYPE} from "../../const";
import optArea from "../../Options/shape/area";
import optSpline from "../../Options/shape/spline";
import {extendLine} from "./axis.helpers";

export let area = (): string => (
	extendLine(shapeArea, [optArea]), (area = () => TYPE.AREA)()
);
export let areaLineRange = (): string => (
	extendLine(shapeArea, [optArea]), (areaLineRange = () => TYPE.AREA_LINE_RANGE)()
);
export let areaStepRange = (): string => (
	extendLine(shapeArea, [optArea]), (areaStepRange = () => TYPE.AREA_STEP_RANGE)()
);
export let areaSpline = (): string => (
	extendLine(shapeArea, [optArea, optSpline]), (areaSpline = () => TYPE.AREA_SPLINE)()
);
export let areaSplineRange = (): string => (
	extendLine(shapeArea, [optArea, optSpline]), (areaSplineRange = () => TYPE.AREA_SPLINE_RANGE)()
);
export let areaStep = (): string => (
	extendLine(shapeArea, [optArea]), (areaStep = () => TYPE.AREA_STEP)()
);
