/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Modules exports for Axis based chart
 */
// Chart
import apiAxis from "../../Chart/api/axis";
import apiGroup from "../../Chart/api/group";
import apiX from "../../Chart/api/x";

// ChartInternal
import axis from "../../ChartInternal/Axis/Axis";
import eventrect from "../../ChartInternal/interactions/eventrect";

import clip from "../../ChartInternal/internals/clip";
import sizeAxis from "../../ChartInternal/internals/size.axis";

// Axis based options
import optAxis from "../Options/axis/axis";
import optDataAxis from "../Options/data/axis";

export const api = [
	apiAxis,
	apiGroup,
	apiX
];

export const internal = {
	axis,
	clip,
	eventrect,
	sizeAxis
};

export const options = {
	optDataAxis,
	optAxis
};
