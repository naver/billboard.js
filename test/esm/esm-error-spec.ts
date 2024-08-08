/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {describe, expect, it} from "vitest";
import {bb} from "../../src/index.esm";
import {TYPE, TYPE_METHOD_NEEDED} from "../../src/config/const";
import {camelize} from "../../src/module/util";

describe("ESM-ERROR check", function() {
    const args = {
        data: {
            columns: [
                ["data1", 300, 350, 300, 0, 100],
                ["data2", 130, 100, 140, 200, 150]
            ],
            type: ""
        },
        onbeforeinit: function() {}
    };

    it("when initializes wihtout specifying types, it default to 'line', but as isn't esm import usage, should throw error", () => {
        let fn;
        let proto;

        try {
            args.onbeforeinit = function() {
                proto = Object.getPrototypeOf(this.internal);

                fn = proto[TYPE_METHOD_NEEDED.LINE];
                delete proto[TYPE_METHOD_NEEDED.LINE];
            };

            bb.generate(args);        
        } catch(e) {
            const {message} = e;
            const type = "line";

            expect(message.indexOf("[billboard.js]") > -1).to.be.true;
            expect(message.indexOf(type) > -1).to.be.true;

            proto[TYPE_METHOD_NEEDED.LINE] = fn;
        }
    });

    it("should throw error when needed internal method is missing.", () => {
        const types = Object.keys(TYPE);
        let fn;
        let errorCount = 0;

        types.forEach(type => {
            try {
                args.data.type = TYPE[type];
                const m = TYPE_METHOD_NEEDED[type];

                args.onbeforeinit = function() {
                    const proto = Object.getPrototypeOf(this.internal);

                    if (!fn || fn?.name !== m) {
                        if (fn) {
                            proto[fn.name] = fn;
                        }

                        fn = proto[m];
                        delete proto[m];
                    }
                }

                const chart = bb.generate(args);
            } catch(e) {
                const {message} = e;
                const type = camelize(args.data.type);

                expect(message.indexOf("[billboard.js]") > -1).to.be.true;
                expect(message.indexOf(type) > -1).to.be.true;

                errorCount++;
            }
        });

        expect(types.length).to.be.equal(errorCount);

        // recover the last deleted prototype method
        args.onbeforeinit = function() {
            Object.getPrototypeOf(this.internal)[fn?.name] = fn;
        }

        // bb.generate(args);
    });
});