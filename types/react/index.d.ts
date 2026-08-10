/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {ForwardRefExoticComponent, HTMLProps, RefAttributes} from "react";
import type {bb, Chart as BillboardChart, ChartOptions, ChartTypes} from "../index.js";

export type ChartTypeResolver = () => ChartTypes;
export type ChartModuleResolver = () => unknown;

export {ChartOptions as IChartOptions};

export interface IProp extends Pick<HTMLProps<HTMLDivElement>, "className" | "style"> {
	bb: typeof bb;
	options: ChartOptions;
	type?: ChartTypes | ChartTypeResolver;
	modules?: ChartModuleResolver[];
}

export interface IChart {
	instance: BillboardChart;
}

declare const Chart: ForwardRefExoticComponent<IProp & RefAttributes<IChart>>;

export {Chart};
export default Chart;
