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
import CLASS from "../../src/config/classes";

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
        const rect = chart.$.main.select(`.${CLASS.eventRect}.${CLASS.eventRect}-0`).node();
        const bar = chart.$.bar.bars.nodes()[0];
        const pos = util.getBBox(bar);

        util.fireEvent(rect, "click", {
            clientX: pos.x + 20,
            clientY: pos.y + 50
        }, chart);

        expect(spy.calledOnce).to.be.true;
    });
});