/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
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
        }
    };
    
	beforeEach(() => {
		chart = bb.generate(args);
	});

    it("should tooltip.hide() work", done => {
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

            done();
        }, 500);        
    });
});
