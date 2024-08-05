/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, describe, expect, it} from "vitest";
import bb, {radar} from "../../src/index.esm";
import {$AXIS} from "../../src/config/classes";

describe("ESM radar", function() {
    let chart;

    const args: any = {
        data: {
            x: "x",
            columns: [
                ["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
                ["data1", 330, 350, 200, 380, 150],
                ["data2", 130, 100, 30, 200, 80],
                ["data3", 230, 153, 85, 300, 250]
            ],
            type: radar(),
            labels: true
        },
        radar: {
            axis: {
                max: 400
            },
            level: {
                depth: 4
            },
            direction: {
                clockwise: true
            }
        }
    };
    
	beforeEach(() => {
		chart = bb.generate(args);
	});

    it("should correctly render radar chart", () => {
        const categories = chart.internal.config.axis_x_categories;

        expect(categories.length === args.data.columns[0].length - 1).to.be.true;

        chart.$.main.selectAll(`.${$AXIS.axis} text`).each(function(d, i) {
            expect(this.textContent).to.be.equal(categories[i]);
        });
    });
});
