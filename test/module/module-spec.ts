/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import sinon from "sinon";
import util from "../assets/util";
import {window, document, requestAnimationFrame, cancelAnimationFrame, requestIdleCallback, cancelIdleCallback} from "../../src/module/browser";

describe("MODULE", function() {
    let chart;
    let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

    afterEach(() => {
        chart.destroy();
    });

    describe("Cache", () => { 
        before(() => {
            args = {
                data: {
                    columns: [
                        ["data1", 300, 350, 300, 0, 0, 0],
                        ["data2", 130, 100, 140, 200, 150, 50]
                    ]
                }
            }
        });

        const data = {
            key: "__CACHE_DATA__",
            value: "cache data"
        };
        
        it("check basic key CRUD", () => {
            const {cache} = chart.internal;

            cache.add(data.key, data.value);

            expect(cache.get(data.key)).to.be.equal(data.value);

            cache.remove(data.key);

            expect(cache.get(data.key)).to.be.null;
        });

        it("check for rowData value", () => {
            const {cache} = chart.internal;
            const rowData = {
                id: "data1",
			    id_org: "data1",
			    values: [{x: 0, value: 20, id: "data1"}]
            }

            cache.add(rowData.id, rowData, true);

            expect(cache.get([rowData.id], true)).to.be.deep.equal([rowData]);

            cache.remove(["data1"]);

            expect(cache.get([rowData.id], true)).to.be.empty;
        });
    });
});