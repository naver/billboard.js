/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export interface IDataRow {
    x: number;
    value: number;
    id: string;
    index: number;
    name?: string;
}

export interface IData {
    id: string;
    id_org: string;
    values: IDataRow[];
}

export interface IArcData {
    data: IData;
    index: number;
    padAngle: number;
    startAngle: number;
    endAngle: number;
    value: number;
}

export interface IGridData {
    axis?: string;
	text: string;
	value: number;
}

export interface IDataIndice {
    [key: string]: number;
    __max__: number;
}

export type TIndices = {} | {
    [key:string]: IDataIndice
};
