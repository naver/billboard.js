/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import bb, {bar, zoom} from "../../src/index.esm";
import util from "../assets/util";

// for ESM test, import helper rather than util
import {getBBox, fireEvent} from "../assets/helper";

describe("ESM bar", function() {
    let chart;
    const spy = sinon.spy(function() { console.log("clicked!!!")});
    let args: any = {
        data: {
            columns: [
                ["data1", 30, 350, 300, 0, 100],
                ["data2", 200, 100, 140, 200, 150]
            ],
            type: bar(),
            onclick: spy
        }
    };
      
    describe("basic functionalities", () => {
        beforeEach(() => {
            chart = bb.generate(args);
        });

        it("check data.onclick for bar type", () => {
            const {eventRect} = chart.internal.$el;
            const bar = chart.$.bar.bars.nodes()[0];
            const pos = getBBox(bar);

            fireEvent(eventRect.node(), "click", {
                clientX: pos.x + 10,
                clientY: pos.y
            }, chart);
            
            expect(spy.calledOnce).to.be.true;        
        });

        it("set options: tooltip.grouped=false", () => {
            args.tooltip = {
                grouped: false
            };
        });

        it("should not throw error", () => {
            chart.tooltip.show({x: 1});

            expect(true).to.be.ok;
        });

        it("check data.onclick for bar type", () => {
            try {
                chart.internal.clickHandlerForSingleX(undefined, chart.internal);
            } catch(e) {
                expect(false).to.be.true;
            }

            expect(true).to.be.true;
        });

        it("set options zoom.enabled=true", () => {
            args.zoom = {
                enabled: zoom()
            };
        });

        it("shouldn't throw error during zoom", () => {
            expect(chart.zoom([0,1])).to.not.throw;
        });
    });

    describe("Focus grid line: on mobile", () => {
		beforeAll(() => {
            chart = util.generate({
                data: {
                    type: bar(),
					columns: [
                        ["data1", 50, 20, 40]
					]
				},
                grid: {
                    focus: {
                        show: false
                    }
                },
                interaction: {
                    inputType: {
                        touch: true
                    }
                }
			});
		});

        it("Resized without error?", () => {
            const proto = Object.getPrototypeOf(chart.internal);
            const fn = proto.showCircleFocus;

            delete proto.showCircleFocus;

            expect(
                chart.resize({width:300})
            ).to.not.throw;

           proto.showCircleFocus = fn;
        });

        it("shoudn't throw error on tooltip show", () => {
            const proto = Object.getPrototypeOf(chart.internal);
            const {isPointFocusOnly} = proto;

            // delete temporarly for test
            delete proto.isPointFocusOnly;

            expect(
                chart.tooltip.show({x: 2})
            ).to.not.throw;

            // restore
            proto.isPointFocusOnly = isPointFocusOnly;
        });
	});
});