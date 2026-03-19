/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import apiZoom from "../../../Chart/api/zoom";
import Chart from "../../../Chart/Chart";
import ChartInternal from "../../../ChartInternal/ChartInternal";
import zoom from "../../../ChartInternal/interactions/zoom";
import {extend} from "../../../module/util";
import optZoom from "../../Options/interaction/zoom";
import Options from "../../Options/Options";

export let zoomModule = (): boolean => {
	extend(ChartInternal.prototype, zoom);
	extend(Chart.prototype, apiZoom);
	Options.setOptions([optZoom]);

	return (zoomModule = () => true)();
};
