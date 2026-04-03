/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeFunnel from "../../../ChartInternal/shape/funnel";
import {TYPE} from "../../const";
import optFunnel from "../../Options/shape/funnel";
import {extendArc} from "./arc.helpers";

export let funnel = (): string => (
	extendArc([shapeFunnel], [optFunnel]), (funnel = () => TYPE.FUNNEL)()
);
