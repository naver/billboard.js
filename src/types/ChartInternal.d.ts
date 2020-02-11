import {d3Selection} from "../../types/types";

type node = d3Selection | null;

export interface Nodes {
    chart: node;
    main: node;
    svg: node;
    axis: {  // axes
        x: node;
        y: node;
        y2: node;
        subX: node;
    };
    defs: node;
    tooltip: node;
    legend: node;
    title: node;
    subchart: {
        main: node;
        bar: node;
        line: node;
        area: node;
    };

    arcs: node;
    bar: node; //mainBar,
    line: node; //mainLine,
    area: node; //mainArea,
    circle: node; //mainCircle,
    text: node; //mainText,
    grid: {
        main: node;  // grid (also focus)
        x: node; // xgrid,
        y: node; // ygrid,
    };
    gridLines: {
        main: node;  // gridLines
        x: node; // xgridLines,
        y: node; // ygridLines
    };
    region: {
        main: node; //region
        list: node; // mainRegion
    },
    eventRect: node;
}

