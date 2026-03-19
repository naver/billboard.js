/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapeTreemap from "../../../ChartInternal/shape/treemap";
import {TYPE} from "../../const";
import optTreemap from "../../Options/shape/treemap";
import {extendAxis} from "./axis.helpers";

export let treemap = (): string => (
	extendAxis([shapeTreemap], [optTreemap]), (treemap = () => TYPE.TREEMAP)()
);
