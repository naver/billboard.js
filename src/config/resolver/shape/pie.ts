/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {TYPE} from "../../const";
import optArc from "../../Options/shape/arc";
import optPie from "../../Options/shape/pie";
import {extendArc} from "./arc.helpers";

export let pie = (): string => (
	extendArc(undefined, [optArc, optPie]), (pie = () => TYPE.PIE)()
);
