/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {Selection} from "d3-selection";
import type {Transition} from "d3-transition";

export type PrimitiveArray = Array<
	string | boolean | number | Date | null |
	{[key: string]: number} | number[]
>;
export type ArrayOrString = string[] | string;
export type d3Selection = Selection<any, any, any, any>;
export type d3Transition = Transition<any, any, any, any>;
export type ChartTypes = "area"
	| "area-line-range"
	| "area-spline"
	| "area-spline-range"
	| "area-step"
	| "bar"
	| "bubble"
	| "candlestick"
	| "donut"
	| "gauge"
	| "line"
	| "pie"
	| "radar"
	| "scatter"
	| "spline"
	| "step"
	| "treemap";

export type GaugeTypes = "single" | "multi";
export type AxisType = "x" | "y" | "y2";

export interface TargetIds {
	ids: string[] | string;
}

export interface DataRow<T=number> {
	id: string;
	id_org: string; // eslint-disable-line camelcase
	values: Array<DataItem<T>>;
}

export interface DataItem<T=number> {
	id: string;
	x: number;
	value: T;
	index?: number;
	name?: string;
	ratio?: number;
}

export type DataArray = DataRow[];

export interface RegionsType {
	[key: string]: {
		start?: number;
		end?: number;
		style?: {
			dasharray?: string;
		}
	};
}
