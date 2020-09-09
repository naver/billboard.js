/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import sinon from "sinon";
import bb, {bar} from "../../src/index.esm";
import util from "../assets/util";

describe("ESM bar", function() {
    let chart;
    const spy = sinon.spy();
    const args: any = {
        data: {
            columns: [
                ["data1", 300, 350, 300, 0, 100],
                ["data2", 130, 100, 140, 200, 150]
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
        const pos = util.getBBox(bar);

        util.fireEvent(eventRect.node(), "click", {
            clientX: pos.x + 20,
            clientY: pos.y + 50
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
});