/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, describe, expect, it} from "vitest";
import sinon from "sinon";
import bb, {scatter} from "../../src/index.esm";
import util from "../assets/util";
import {$EVENT} from "../../src/config/classes";

describe("ESM scatter", function() {
    let chart;
    const spy = sinon.spy();

    const args: any = {
        data: {
            columns: [
                ["data1", 30, 350, 300, 0, 100],
                ["data2", 200, 100, 140, 200, 150]
            ],
            type: scatter(),
            onclick: spy
        },
        point: {
            r: 5
        }
    };
    
	beforeEach(() => {
		chart = bb.generate(args);
	});

    it("check data.onclick for scatter type", () => {
        const rect = chart.$.main.select(`rect.${$EVENT.eventRect}`).node();
        const circle = chart.$.circles.nodes()[0];
        const pos = util.getBBox(circle);

        util.fireEvent(rect, "click", {
            clientX: pos.x + 2,
            clientY: pos.y + 2
        }, chart);

        expect(spy.calledOnce).to.be.true;
    });
});