/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeBar from "../../../ChartInternal/shape/bar";
import shapePointCommon from "../../../ChartInternal/shape/point.common";
import {TYPE} from "../../const";
import optPoint from "../../Options/common/point";
import optBar from "../../Options/shape/bar";
import {extendAxis} from "./axis.helpers";

export let bar = (): string => (
	extendAxis([shapeBar, shapePointCommon], [optBar, optPoint]), (bar = () => TYPE.BAR)()
);
