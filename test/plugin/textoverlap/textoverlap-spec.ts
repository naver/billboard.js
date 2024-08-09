/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, describe, expect, it} from "vitest";
import util from "../../assets/util";
import {$TEXT} from "../../../src/config/classes";
import TextOverlap from "../../../src/Plugin/textoverlap";

describe("PLUGIN: TEXTOVERLAP", () => {
	let chart;
	let args = {
        data: {
            columns: [
                ["data1", 3, 3, 10.1],
                ["data2", 2.5, 3.2, 10],
                ["data3", 2, 3.5, 10.2]
            ],
            type: "line",
            labels: true
        },
        axis: {
            y: {
                show: false
            }
        },
        plugins: [
            new TextOverlap({                
                // selector: ".bb-texts text",
                // extent: 8,
                // area: 3
            })
        ]
    };

	beforeEach(() => {
		chart = util.generate(args);
	});

    it("should move data labels into correct position", () => {
        const {texts} = chart.$.text;

        chart.data().forEach((v, i) => {
            let x = i;
            let y = i;

            texts.filter(`.${$TEXT.text}-${i}`).each(function(d, j) {
                if (x === i) {
                    x = +this.getAttribute("x");
                    y = +this.getAttribute("y");
                } else {
                    expect(+this.getAttribute("x")).to.be.closeTo(x, 1);
                    expect(+this.getAttribute("y")).to.be.closeTo(y, 50);;
                }

                expect(/translate\(-?1, (-1|6)\)/.test(this.getAttribute("transform"))).to.be.true;
            });
        });
    });

    it("set options extent & area options", () => {
        args.plugins = [
            new TextOverlap({
                selector: ".bb-texts text",
                extent: 5,
                area: 0.35
            })
        ];
    });

    it("should move data labels into correct position with specified extent and area", () => {
        const expected = [
            {data1: "", data2: "none", data3: ""},
            {data1: "", data2: "", data3: ""},
            {data1: "none", data2: "", data3: ""}
        ];

        const {texts} = chart.$.text;

        chart.data().forEach((v, i) => {
            texts.filter(`.${$TEXT.text}-${i}`).each(function(d) {
                expect(this.style.display).to.be.equal(expected[d.index][d.id]);
            });
        });
    });
});
