/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterEach, describe, expect, it} from "vitest";
import sinon from "sinon";
import util from "../assets/util";
import {getFallback, window} from "../../src/module/browser";
// import {getGlobal, getFallback, window} from "../../src/module/browser";
import {getWorker, runWorker} from "../../src/module/worker";

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
        beforeAll(() => {
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
        // it("check global & fallback returns correctly when no default param is given.", () => {
        //     // test for global
        //     global = self = window;
            
        //     // will return from 'global'
        //     // @ts-ignore
        //     globalThis = null;
        //     expect(getGlobal().document).to.be.ok;

        //     // will return from 'self'
        //     // @ts-ignore
        //     global = null;
        //     expect(getGlobal().document).to.be.ok;

        //     // // will return from Function('return this')()
        //     // @ts-ignore
        //     self = null;
        //     expect(getGlobal().document).to.be.ok;

        //     // restore global
        //     // @ts-ignore
        //     globalThis = global = self = window;
        // });

        it("check fallback", () => new Promise(done => {
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

                done(1);
            }, 100);
        }));
    });

    describe("Worker", () => { 
        it("check worker onerror handler call.", () => {
            const worker = getWorker("test");
            const errorStub = sinon.stub(console, "error");

            worker.onerror({e: {message: "ERR MSG"}});

            expect(errorStub.called).to.be.true;

            errorStub.restore();
            
            const error = console.error;

            // @ts-ignore
            console.error = null;
            const logStub = sinon.stub(console, "log");

            worker.onerror({e: {message: "ERR MSG"}});

            expect(logStub.called).to.be.true;

            logStub.restore();
            console.error = error;
        });

        it("check with dependency function", () => new Promise(done => {
            function depsFn() {
                return 1234;
            }

            runWorker(
                true,
                function() { return depsFn(); },
                function(res) {
                    expect(res).to.be.equal(1234);
                    done(1);
                },
                [depsFn]
            )();
        }), 5000);
    });
});