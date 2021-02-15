/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import util from "../../assets/util";
import CLASS from "../../../src/config/classes";
import TextOverlap from "../../../src/Plugin/textoverlap";

describe("PLUGIN: TEXTOVERLAP", () => {
	let chart;
	let args = {
        padding: {
            left: 50
        },
        data: {
            columns: [
                ["data1", 1030, 2200, 2100],
                ["data2", 1150, 2010, 1200],
                ["data3", -1150, -2010, -1200],
                ["data4", -1030, -2200, -2100]
            ],
            type: "line",
            labels: true,
            groups: [
                ["data1", "data2"],
                ["data3", "data4"]
            ]
        },
        plugins: [
            new TextOverlap({})
        ]
    };

	beforeEach(() => {
		chart = util.generate(args);
	});

    it("should move data labels into correct position", () => {
        const expectedTextDy = {
            data1: ["0.35em", "0.71em", "0.71em"],
            data2: ["0.35em", "0.35em", "0.71em"],
            data3: ["0.71em", "0.71em", "0.35em"],
            data4: ["0.71em", "0.35em", "0.35em"]
        };
        const expectedTextTransform = {
            data1: ["translate(-1, -1)", "translate(-1, 6)", "translate(-1, 6)"],
            data2: ["translate(-1, -1)", "translate(-1, -1)", "translate(-1, 6)"],
            data3: ["translate(-1, 6)", "translate(-1, 6)", "translate(-1, -1)"],
            data4: ["translate(-1, 6)", "translate(-1, -1)", "translate(-1, -1)"]
        };

        Object.keys(expectedTextDy).forEach(key => {
            chart.$.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`).each(function(d, i) {
                const text = d3Select(this);

                expect(text.attr("dy")).to.be.equal(expectedTextDy[key][i]);
                expect(text.attr("transform")).to.be.equal(expectedTextTransform[key][i]);
            });
        });
    });

    it("set options extent & area options", () => {
        args.plugins = [
            new TextOverlap({
                extent: 8,
                area: 3
            })
        ];
    });

    it("should move data labels into correct position with specified extent and area", () => {
        const expectedTextDy = {
            data1: ["0.35em", "0.71em", "0.71em"],
            data2: ["0.35em", "0.35em", "0.71em"],
            data3: ["0.71em", "0.71em", "0.35em"],
            data4: ["0.71em", "0.35em", "0.35em"]
        };
        const expectedTextTransform = {
            data1: ["translate(-8, -8)", "translate(-8, 13)", "translate(-8, 13)"],
            data2: ["translate(-8, -8)", "translate(-8, -8)", "translate(-8, 13)"],
            data3: ["translate(-8, 13)", "translate(-8, 13)", "translate(-8, -8)"],
            data4: ["translate(-8, 13)", "translate(-8, -8)", "translate(-8, -8)"]
        };

        Object.keys(expectedTextDy).forEach(key => {
            chart.$.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`).each(function(d, i) {
                const text = d3Select(this);

                expect(text.attr("dy")).to.be.equal(expectedTextDy[key][i]);
                expect(text.attr("transform")).to.be.equal(expectedTextTransform[key][i]);
            });
        });
    });
});
