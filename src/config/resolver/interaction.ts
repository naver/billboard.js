/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../../Chart/Chart";
import ChartInternal from "../../ChartInternal/ChartInternal";
import Options from "../Options/Options";
import {extend} from "../../module/util";

// Chart
import apiSelection from "../../Chart/api/selection";
import apiSubchart from "../../Chart/api/subchart";
import apiZoom from "../../Chart/api/zoom";

// ChartInternal
import selection from "../../ChartInternal/internals/selection";
import subchart from "../../ChartInternal/interactions/subchart";
import zoom from "../../ChartInternal/interactions/zoom";

// Axis based options
import optDataSelection from "../Options/data/selection";
import optSubchart from "../Options/interaction/subchart";
import optZoom from "../Options/interaction/zoom";

export {
	selectionModule as selection,
	subchartModule as subchart,
	zoomModule as zoom
};

let selectionModule = (): boolean => {
	extend(ChartInternal.prototype, selection);
	extend(Chart.prototype, apiSelection);
	Options.setOptions([optDataSelection]);

	return (selectionModule = () => true)();
};

let subchartModule = (): boolean => {
	extend(ChartInternal.prototype, subchart);
	extend(Chart.prototype, apiSubchart);
	Options.setOptions([optSubchart]);

	return (subchartModule = () => true)();
};

let zoomModule = (): boolean => {
	extend(ChartInternal.prototype, zoom);
	extend(Chart.prototype, apiZoom);
	Options.setOptions([optZoom]);

	return (zoomModule = () => true)();
};
