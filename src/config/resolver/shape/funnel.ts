/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeFunnel, {customTypeHooks} from "../../../ChartInternal/shape/funnel";
import CLASS, {$FUNNEL} from "../../classes";
import {TYPE} from "../../const";
import optFunnel from "../../Options/shape/funnel";
import {registerCustomType} from "../customType";
import {extendArc} from "./arc.helpers";

export let funnel = (): string => (
	extendArc([shapeFunnel], [optFunnel]),
		// the classes of the type are in the map of the classes only when its module is there
		Object.assign(CLASS, $FUNNEL),
		registerCustomType("funnel", {hooks: customTypeHooks}),
		(funnel = () => TYPE.FUNNEL)()
);
