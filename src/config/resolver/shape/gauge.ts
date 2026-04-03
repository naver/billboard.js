/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeGauge from "../../../ChartInternal/shape/gauge";
import {TYPE} from "../../const";
import optArc from "../../Options/shape/arc";
import optGauge from "../../Options/shape/gauge";
import {extendArc} from "./arc.helpers";

export let gauge = (): string => (
	extendArc([shapeGauge], [optArc, optGauge]), (gauge = () => TYPE.GAUGE)()
);
