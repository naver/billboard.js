/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import sinon from "sinon";
import util from "../assets/util";
import {getGlobal, getFallback} from "../../src/module/browser";
import {getWorker} from "../../src/module/worker";

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

    describe("Browser", () => { 
        it("check global & fallback returns correctly when no default param is given.", () => {
            // set nullish value for test
            globalThis = global = self = null;

            const win = getGlobal();

            expect(win.document).to.be.ok;

            // restore global
            globalThis = global = self = window;
        });

        it("check fallback", done => {
            const spy = sinon.spy();

            const [
                requestAnimationFrame,
                cancelAnimationFrame,
                requestIdleCallback,
                cancelIdleCallback
             ] = getFallback();
            
            const raf = requestAnimationFrame(spy);
            const ric = requestIdleCallback(spy);

            expect(raf > 0).to.be.true;
            expect(ric > 0).to.be.true;

            setTimeout(() => {
                cancelAnimationFrame(raf);
                cancelIdleCallback(ric);

                expect(spy.callCount).to.be.equal(2);

                done();
            }, 100);
        });
    });

    describe("Worker", () => { 
        it("check worker onerror handler call.", () => {
            const worker = getWorker("test");
            const errorStub = sinon.stub(console, "error");

            worker.onerror({e: {message: "ERR MSG"}});

            expect(errorStub.called).to.be.true;

            errorStub.restore();
        });
    });
});