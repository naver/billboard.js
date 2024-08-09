/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, describe, expect, it} from "vitest";
import bb, {line, subchart} from "../../src/index.esm";

describe("ESM subchart", function() {
    let chart;

    const args: any = {
        data: {
            columns: [
                ["data1", 30, 350, 300, 0, 100],
                ["data2", 200, 100, 140, 200, 150]
            ],
            type: line()
        },
        subchart: {
            enabled: subchart()
        }
    };
    
	beforeEach(() => {
		chart = bb.generate(args);
	});

    it("shouldn't throw error during zoom", () => {
        expect(chart.subchart.show()).to.not.throw;
    });
});