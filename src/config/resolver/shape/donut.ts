/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {TYPE} from "../../const";
import optArc from "../../Options/shape/arc";
import optDonut from "../../Options/shape/donut";
import {extendArc} from "./arc.helpers";

export let donut = (): string => (
	extendArc(undefined, [optArc, optDonut]), (donut = () => TYPE.DONUT)()
);
