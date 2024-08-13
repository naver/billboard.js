/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, describe, expect, it} from "vitest";
import bb, {donut} from "../../src/index.esm";

describe("ESM donut", function() {
    let chart;

    const args: any = {
        data: {
            columns: [
                ["data1", 30],
                ["data2", 120]
            ],
            type: donut()
        },
        point: {
            pattern: [
              '<rect width="15" height="15" rx="5" ry="5" ></rect>',
            ]
        },
        legend: {
            usePoint: true
        }
    };
    
	beforeEach(() => {
		chart = bb.generate(args);
	});

    it("should tooltip.hide() work", () => new Promise(done => {
        const {internal} = chart;
        const {hideGridFocus} = internal;
        
        internal.hideGridFocus = null;

        setTimeout(() => {
            // when
            chart.tooltip.show({index: 0});

            expect(chart.tooltip.hide()).to.not.throw;
            expect(chart.$.tooltip.style("display")).to.be.equal("none");
            
            // revert internal method
            internal.hideGridFocus = hideGridFocus;

            done(1);
        }, 300);        
    }));

    it("shouldn't throw error on call of tooltip API.", () => {
        delete chart.internal.config.axis_y_label;

        expect(
            chart.tooltip.show({x:0})
        ).to.not.throw;

        chart.internal.config.axis_y_label = {};
    });

    it("should point.pattern def element appended.", () => {
        const defs = chart.internal.$el.defs.selectAll("[id*=point-data]");

        expect(defs.size()).to.be.equal(chart.data().length);
    });
});
