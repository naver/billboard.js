/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapePoint from "../../../ChartInternal/shape/point";
import shapePointCommon from "../../../ChartInternal/shape/point.common";
import {TYPE} from "../../const";
import optPoint from "../../Options/common/point";
import optScatter from "../../Options/shape/scatter";
import {extendAxis} from "./axis.helpers";

export let scatter = (): string => (
	extendAxis(
		[shapePointCommon, shapePoint],
		[optPoint, optScatter]
	), (scatter = () => TYPE.SCATTER)()
);
