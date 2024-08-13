/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$LEVEL} from "../../src/config/classes";

describe("SHAPE POLAR", () => {
    let chart;
    let args = {
        data: {
            "columns": [
                ["data1", 60],
                ["data2", 120],
                ["data3", 75]
            ],
            type: "polar"
        },
        transition: {
            duration: 0
        },
        polar: {
            label: {},
            level: {},
            padAngle: 0,
            padding: 0,
            startingAngle: 0
        }
    };

    beforeEach(function() {
        chart = util.generate(args);
    });

    describe("default polar", () => {        
        it("check for levels", () => {
            const {internal} = chart;
            const {config, $el: {arcs}} = internal;
            const depth = config.polar_level_depth;
            const step = internal.getMinMaxData().max[0].value / depth;
            
            // level
            const levels = arcs.selectAll(`.${$LEVEL.level}`);

            expect(levels.size()).to.be.equal(depth);

            levels.each(function(d, i) {
                const r = [71, 141, 212];
                const circle = this.querySelector("circle")
                const text = this.querySelector("text")

                expect(this.classList.contains(`bb-level-${i}`)).to.be.true;
                expect(+text.textContent).to.be.equal(step * (i + 1));
                expect(Math.round(circle.getAttribute("r"))).to.be.equal(r[i]);

                // check for level text background color
                const defsId = text.getAttribute("filter").replace(/(url\(#|\))/g, "");
                const textBgColor = chart.$.defs.select(`#${defsId}`)
                     .select("feFlood").attr("flood-color");

                expect(textBgColor).to.be.equal(config.polar_level_text_backgroundColor);
            });
        });

        it("check for polar arc shapes", () => new Promise(done => {
            const {internal} = chart;
            const {config, $el: {arcs}} = internal;

            const path = arcs.selectAll("path");
            const text = arcs.selectAll(`.bb-target text`);

            setTimeout(() => {
                const expectedAngle = [
                    [4.804788764313801, 6.283185307179586],
                    [0, 2.95679308573157],
                    [2.95679308573157, 4.804788764313801]
                ];
                const expectedLabel = ["23.5%", "47.1%", "29.4%"];

                path.each(function(d, i) {
                    const {startAngle, endAngle, value} = d;
                    const expected = expectedAngle[i];

                    expect(startAngle).to.be.closeTo(expected[0], 0.5);
                    expect(endAngle).to.be.closeTo(expected[1], 0.5);
                });


                text.each(function(d, i) {
                    expect(this.textContent).to.be.equal(expectedLabel[i]);
                });

                done(1);
            }, 300);
        }));
    });

    describe("polar options #1", () => {        
        const originalPath: number[] = [];
        const originalAngle: [number, number][] = [];

        afterAll(() => {
            args.polar.padAngle = 0;
            args.polar.padding = 0;
            args.polar.startingAngle = 0;
        });

        it("Retrieve original path data", () => new Promise(done => {
            setTimeout(() => {
                chart.internal.$el.arcs.selectAll("path").each(function(d) {
                    const {startAngle, endAngle} = d;

                    originalPath.push(this.getTotalLength());
                    originalAngle.push([startAngle, endAngle]);
                });

                done(1);
            }, 300);
        }));

        it("set options: padAngle=0.3", () => {
            args.polar.padAngle = 0.3;
        });

        it("should padAngle applied correctly?", () => new Promise(done => {
            setTimeout(() => {
                chart.internal.$el.arcs.selectAll("path").each(function(d, i) {
                    expect(this.getTotalLength()).to.be.below(originalPath[i]);
                });

                done(1);
            }, 300);
        }));

        it("set options: padding=10", () => {
            args.polar.padAngle = 0;
            args.polar.padding = 10;
        });

        it("should padding applied correctly?", () => new Promise(done => {
            setTimeout(() => {
                chart.internal.$el.arcs.selectAll("path").each(function(d, i) {
                    expect(this.getTotalLength()).to.be.below(originalPath[i]);
                });

                done(1);
            }, 300);
        }));

        it("set options: startingAngle=3", () => {
            args.polar.padAngle = 0;
            args.polar.padding = 0;
            args.polar.startingAngle = 1.5;
        });

        it("should startingAngle applied correctly?", () => new Promise(done => {
            setTimeout(() => {
                chart.internal.$el.arcs.selectAll("path").each(function(d, i) {
                    const {startAngle, endAngle} = d;

                    expect(startAngle).to.be.above(originalAngle[i][0]);
                    expect(endAngle).to.be.above(originalAngle[i][1]);
                });

                done(1);
            }, 300);
        }));
    });

    describe("polar options #2: level", () => {
        beforeAll(() => {
            args.polar.level = {
                depth: 5,
                max: 150,
                show: false,
                text: {
                    show: true
                }
            };
        });

        it("level should be hidden", () => {
            const {$el: {arcs}} = chart.internal;

            // level
            const levels = arcs.selectAll(`.${$LEVEL.level}`);

            expect(levels.empty()).to.be.true;
        });

        it("set options: polar.level.show=true", () => {
            // @ts-ignore
            args.polar.level.show = true;
        });

        it("level depth and max", () => {
            const {internal} = chart;
            const {config, $el: {arcs}} = internal;
            const depth = config.polar_level_depth;
            const step = config.polar_level_max / depth;
            
            // level
            const levels = arcs.selectAll(`.${$LEVEL.level}`);

            expect(levels.size()).to.be.equal(depth);

            levels.each(function(d, i) {
                const r = [42, 85, 127, 169, 212];
                const circle = this.querySelector("circle")
                const text = this.querySelector("text")

                expect(this.classList.contains(`bb-level-${i}`)).to.be.true;
                expect(+text.textContent).to.be.equal(step * (i + 1));
                expect(Math.round(circle.getAttribute("r"))).to.be.equal(r[i]);
            });
        });

        it("set options: polar.level.text", () => {
            // @ts-ignore
            args.polar.level.text.show = false;
        });

        it("text shouldn't be displayed", () => {
            expect(
                chart.internal.$el.arcs.selectAll(".bb-levels text").size()
            ).to.be.equal(0);
        });

        it("set options: polar.level.text", () => {
            // @ts-ignore
            args.polar.level.text = {
                show: true,
                backgroundColor: "yellow",
				format: function(level) {
					return `Level: ${level}`;
				}
            };
        });

        it("check for level text background color and formatting", () => {
            const {internal} = chart;
            const {config, $el: {arcs}} = internal;
            const depth = config.polar_level_depth;
            const step = config.polar_level_max / depth;
            
            // level
            const texts = arcs.selectAll(`.${$LEVEL.level} text`);

            texts.each(function(d, i) {
                // check for level text background color
                const defsId = this.getAttribute("filter").replace(/(url\(#|\))/g, "");
                const textBgColor = chart.$.defs.select(`#${defsId}`)
                        .select("feFlood").attr("flood-color");

                expect(textBgColor).to.be.equal(config.polar_level_text_backgroundColor);

                // check for level text format
                expect(this.textContent).to.be.equal(config.polar_level_text_format(step * (i + 1)));
            });
        });
    });

    describe("polar options #3: label", () => {
        beforeAll(() => {
            args.polar.label = {
                show: true,
                format: function(value, ratio, id) {
                    return `${value}\n(${(ratio * 100).toFixed(0)}%)`;
                }
            }
        });

        it("check label fromatting", () => {
           const {texts} = chart.$.text;
           const expected = [
                ["60", "(24%)"],
                ["120", "(47%)"],
                ["75", "(29%)"]
           ];
           
            texts.each(function(d, i) {
                const tspan = this.querySelectorAll("tspan");

                expect(tspan.length).to.be.equal(2);
                expect(tspan[0].textContent).to.be.equal(expected[i][0]);
                expect(tspan[1].textContent).to.be.equal(expected[i][1]);
            });
        });

        it("set options: label.ratio=1", () => {
            // @ts-ignore
            args.polar.label.ratio = 1;
        });

        it("check label's position", () => {
            const {texts} = chart.$.text;
            const expectedCoord = [
                [-31.397564727666964, -33.44024266018361],
                [87.67735013709874, -9.948862896662684],
                [-36.542464021419896, 43.042562998655555]
            ];

            texts.each(function(d, i) {
                const coord = this.getAttribute("transform")
                    .split(",")                    
                    .map(util.parseNum);
                
                expect(coord[0]).to.be.closeTo(expectedCoord[i][0], 5);
                expect(coord[1]).to.be.closeTo(expectedCoord[i][1], 5);
            });
        });

        it("set options: label.threshold", () => {
            // @ts-ignore
            delete args.polar.label.ratio;

            // @ts-ignore
            args.polar.label.threshold = 0.25;
        });

        it("check label's visibility", () => {
            const {texts} = chart.$.text;

            texts.each(function(d, i) {
                const {value} = d;

                if (value > 60) {
                    expect(this.textContent).to.be.not.empty;
                } else {
                    expect(this.textContent).to.be.empty;
                }
            });
        });
    });
});
