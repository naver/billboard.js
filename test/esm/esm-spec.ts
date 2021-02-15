/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import * as bb from "../../src/index.esm";
import CLASS from "../../src/config/classes";

describe("ESM build", function() {
    let chart;

    const data = [
        ["data1", 300, 350, 300, 0, 100],
        ["data2", 130, 100, 140, 200, 150]
    ];
    
    const rangeData = [
        ["data1",
            [150, 140, 110],
            [155, 130, 115],
            [160, 135, 120],
            [135, 120, 110],
            [180, 150, 130]
        ]
    ];

    let args: any = {
        data: {
            columns: data
        }
    };
    
    it("should generate each chart types", () => {
        Object.keys(bb)
            .filter(v => !/(bb|default|selection|subchart|zoom)/.test(v))
            .forEach(v => {
                let path;

                // initialize type
                args.data.type = bb[v]();
                
                if (/(area|line|step)/.test(v)) {
                    args.data.columns = /Range/.test(v) ? rangeData: data;

                    chart = bb.bb.generate(args);
                    path = chart.$.line.lines.attr("d");

                } else {
                    chart = bb.bb.generate(args);

                    if (v === "bar") {
                        path = chart.$.bar.bars.attr("d");

                    } else if (v === "radar") {
                        path = chart.$.main
                            .select(`.${CLASS.chartRadar} polygon`)
                            .attr("points");
                
                    } else if (v === "scatter") {
                        const dataLength: any = data.reduce((a: any, r: any) => a.length + r.length);

                        expect(chart.$.circles.nodes().length).to.be.equal(dataLength - 2);

                    } else {
                        // donut, gauge, pie
                        path = chart.$.arc.selectAll("path").attr("d");
                    }
                }

                path && expect(/NaN/.test(path)).to.be.false;
            });
    });
});