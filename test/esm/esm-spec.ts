/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {describe, expect, it} from "vitest";
import * as bb from "../../src/index.esm";
import {$RADAR} from "../../src/config/classes";

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

    const candlestickData = [
        ["data1",
            [1327, 1369, 1289, 1348],
            [1348, 1371, 1314, 1320],
            [1320, 1412, 1314, 1394],
            [1394, 1458, 1393, 1453]
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
                    args.data.columns = data;

                    if (/Range/.test(v)) {
                        args.data.columns = rangeData;
                    }

                    chart = bb.bb.generate(args);
                    path = chart.$.line.lines.attr("d");

                } else {
                    if (v === "candlestick") {
                        args.data.columns = candlestickData;
                    }

                    chart = bb.bb.generate(args);

                    if (v === "bar") {
                        path = chart.$.bar.bars.attr("d");

                    } else if (v === "radar") {
                        path = chart.$.main
                            .select(`.${$RADAR.chartRadar} polygon`)
                            .attr("points");
                
                    } else if (v === "scatter") {
                        const dataLength: any = data.reduce((a: any, r: any) => a.length + r.length);

                        expect(chart.$.circles.nodes().length).to.be.equal(dataLength - 2);

                    } else if (v === "candlestick") {
                        chart.$.candlestick.each(function() {
                            expect(this.querySelector("path")).to.not.be.null;
                            expect(this.querySelector("line")).to.not.be.null;
                        });

                    } else if (v === "funnel") {
                        path = chart.internal.$el.funnel.selectAll("path").size();

                    } else if (v === "polar") {
                        path = chart.$.main.selectAll("path").attr("d");
                    
                    } else if (v === "treemap") {
                        path = chart.$.main.selectAll("rect").size();
                    } else {
                        // donut, gauge, pie
                        path = chart.$.arc.selectAll("path").attr("d");
                    }
                }

                path && expect(/NaN/.test(path)).to.be.false;
            });
    });
});