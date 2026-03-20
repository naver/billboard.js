/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeBubble from "../../../ChartInternal/shape/bubble";
import shapePoint from "../../../ChartInternal/shape/point";
import shapePointCommon from "../../../ChartInternal/shape/point.common";
import {TYPE} from "../../const";
import optPoint from "../../Options/common/point";
import optBubble from "../../Options/shape/bubble";
import {extendAxis} from "./axis.helpers";

export let bubble = (): string => (
	extendAxis(
		[shapePointCommon, shapePoint, shapeBubble],
		[optBubble, optPoint]
	), (bubble = () => TYPE.BUBBLE)()
);
