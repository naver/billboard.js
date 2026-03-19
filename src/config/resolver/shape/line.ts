/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {TYPE} from "../../const";
import optSpline from "../../Options/shape/spline";
import {extendLine} from "./axis.helpers";

export let line = (): string => (extendLine(), (line = () => TYPE.LINE)());
export let spline =
	(): string => (extendLine(undefined, [optSpline]), (spline = () => TYPE.SPLINE)());
export let step = (): string => (extendLine(), (step = () => TYPE.STEP)());
