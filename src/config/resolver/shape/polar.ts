/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapePolar from "../../../ChartInternal/shape/polar";
import {TYPE} from "../../const";
import optArc from "../../Options/shape/arc";
import optPolar from "../../Options/shape/polar";
import {extendArc} from "./arc.helpers";

export let polar = (): string => (
	extendArc([shapePolar], [optArc, optPolar]), (polar = () => TYPE.POLAR)()
);
