/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import apiSelection from "../../../Chart/api/selection";
import Chart from "../../../Chart/Chart";
import ChartInternal from "../../../ChartInternal/ChartInternal";
import selection from "../../../ChartInternal/internals/selection";
import {extend} from "../../../module/util";
import optDataSelection from "../../Options/data/selection";
import Options from "../../Options/Options";

export let selectionModule = (): boolean => {
	extend(ChartInternal.prototype, selection);
	extend(Chart.prototype, apiSelection);
	Options.setOptions([optDataSelection]);

	return (selectionModule = () => true)();
};
