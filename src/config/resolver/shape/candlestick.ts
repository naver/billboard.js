/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeCandlestick from "../../../ChartInternal/shape/candlestick";
import shapePointCommon from "../../../ChartInternal/shape/point.common";
import {TYPE} from "../../const";
import optPoint from "../../Options/common/point";
import optCandlestick from "../../Options/shape/candlestick";
import {extendAxis} from "./axis.helpers";

export let candlestick = (): string => (
	extendAxis(
		[shapeCandlestick, shapePointCommon],
		[optCandlestick, optPoint]
	), (candlestick = () => TYPE.CANDLESTICK)()
);
