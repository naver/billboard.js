/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
type TDataRow = {
    value: number | null;
    id: string;
    index: number;
    name?: string;
};

export interface ITreemapData {
    name: string;
    id?: string; // for compatibility
    value?: number;
    ratio?: number;
    children?: ITreemapData[];
}

export interface IDataRow extends TDataRow {
    x: number | string | Date;
}
export interface IArcDataRow extends TDataRow {
    ratio: number;
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
    value: number | null;
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
