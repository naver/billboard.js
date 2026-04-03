/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import apiSubchart from "../../../Chart/api/subchart";
import Chart from "../../../Chart/Chart";
import ChartInternal from "../../../ChartInternal/ChartInternal";
import subchart from "../../../ChartInternal/interactions/subchart";
import {extend} from "../../../module/util";
import optSubchart from "../../Options/interaction/subchart";
import Options from "../../Options/Options";

export let subchartModule = (): boolean => {
	extend(ChartInternal.prototype, subchart);
	extend(Chart.prototype, apiSubchart);
	Options.setOptions([optSubchart]);

	return (subchartModule = () => true)();
};
