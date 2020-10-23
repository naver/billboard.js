/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import sinon from "sinon";
import bb, {bar} from "../../src/index.esm";

// for ESM test, import helper rather than util
import {getBBox, fireEvent} from "../assets/helper";

describe("ESM bar", function() {
    let chart;
    const spy = sinon.spy();
    const args: any = {
        data: {
            columns: [
                ["data1", 30, 350, 300, 0, 100],
                ["data2", 200, 100, 140, 200, 150]
            ],
            type: bar(),
            onclick: spy
        }
    };
    
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
});