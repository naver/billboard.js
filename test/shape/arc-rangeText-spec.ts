/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import {$ARC} from "../../src/config/classes";
import util from "../assets/util";

describe("SHAPE ARC: rangeText option", () => {
    let chart;
    let args = {
        data: {
            columns: [
                ["data1", 30],
                ["data2", 120],
                ["data3", 50]
            ],
            type: "donut",
        },
        arc: {
            rangeText: {
                values: [
                    15,
                    50,
                    70,
                    110,
                    160,
                    195
                ],
                unit: "absolute",
                fixed: false,
                format: v => v === 50 ? "Fifty" : v
            },
            position: () => {}
        }
    };

    beforeEach(() => {
        chart = util.generate(args);
    });

    it("basic functionality: donut", () => new Promise(done => {
        const expected = [
            [98, -192],
            [218, 3],
            [176, 133],
            [-67, 210],
            [-207, -66],
            [-34, -212]
        ];
        const rangeText = chart.$.main.selectAll(`.${$ARC.arcRange}`);

        rangeText.each(function(d, i) {
            const [x, y] = this.getAttribute("transform").split(",").map(util.parseNum);
            const [nx, ny] = expected[i];
            
            expect(x).closeTo(nx, 1);
            expect(y).closeTo(ny, 1);
        });

        // check for format function
        expect(rangeText.filter(d => d === 50).text()).to.be.equal(args.arc.rangeText.format(50));

        new Promise(resolve => {
            chart.hide("data2");

            setTimeout(resolve, 300);
        }).then(() => {
            rangeText.filter(d => d > 70).each(function() {
                expect(this.style.opacity).to.be.equal("0");
            });

            return new Promise(resolve => {
                chart.show("data2");

                setTimeout(resolve, 300);
            })
        }).then(() => {
            rangeText.filter(d => d > 70).each(function() {
                expect(this.style.opacity).to.be.empty;
            });

            done(1);
        });
    }));

    it("set options: data.type='pie' / rangeText.unit='%'", () => {
        args.arc.rangeText.values = [10, 25, 50, 75, 99];
        args.arc.rangeText.unit = "%";
        args.data.type = "pie";
    });

    it("basic functionality: pie", () => new Promise(done => {
        const expected = [
            [128, -174],
            [218, 3],
            [-8, 221],
            [-218, 3],
            [-13, -214]
        ];
        const rangeText = chart.$.main.selectAll(`.${$ARC.arcRange}`);

        rangeText.each(function(d, i) {
            const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                .split(",").map(v => parseInt(v, 10));
            const [nx, ny] = expected[i];

            expect(x).to.be.closeTo(nx, 1);
            expect(y).to.be.closeTo(ny, 1);
        });

        new Promise(resolve => {
            chart.hide("data2");

            setTimeout(resolve, 300);
        }).then(() => {
            rangeText.each(function() {
                expect(this.style.opacity).to.be.empty;
            });

            return new Promise(resolve => {
                chart.show("data2");

                setTimeout(resolve, 300);
            })
        }).then(() => {
            rangeText.each(function() {
                expect(this.style.opacity).to.be.empty;
            });

            done(1);
        });
    }));

    it("set options: data.type='gauge'", () => {
        args.data.type = "gauge";
    });

    it("basic functionality: gauge", () => new Promise(done => {
        const expected = [
            [-297, -95],
            [-220, -220],
            [8, -309],
            [220, -220],
            [312, -7]
        ];
        const rangeText = chart.$.main.selectAll(`.${$ARC.arcRange}`);

        rangeText.each(function(d, i) {
            const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                .split(",").map(v => parseInt(v, 10));
            const [nx, ny] = expected[i];

            expect(x).to.be.closeTo(nx, 1);
            expect(y).to.be.closeTo(ny, 1);
        });

        new Promise(resolve => {
            chart.hide("data2");

            setTimeout(resolve, 300);
        }).then(() => {
            rangeText.each(function(d, i) {
                const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                    .split(",").map(v => parseInt(v, 10));
                const [nx, ny] = expected[i];

                expect(x < nx).to.be.true;
                expect(i <= 2 ? y > ny : y < ny).to.be.true;
            });

            return new Promise(resolve => {
                chart.show("data2");

                setTimeout(resolve, 300);
            });
        }).then(() => {
            rangeText.each(function(d, i) {
                const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                    .split(",").map(v => parseInt(v, 10));
                const [nx, ny] = expected[i];

                expect(x).to.be.closeTo(nx, 1);
                expect(y).to.be.closeTo(ny, 1);
            });

            done(1);
        });
    }));

    it("set options: arc.rangeText.fixed=true", () => {
        args.arc.rangeText.fixed = true;
    });

    it("should rangeText position fixed on gauge type.", () => new Promise(done => {
        const expected = [
            [-297, -95],
            [-220, -220],
            [8, -309],
            [220, -220],
            [312, -7]
        ];
        const rangeText = chart.$.main.selectAll(`.${$ARC.arcRange}`);

        rangeText.each(function(d, i) {
            const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                .split(",").map(v => parseInt(v, 10));
            const [nx, ny] = expected[i];

            expect(x).to.be.closeTo(nx, 1);
            expect(y).to.be.closeTo(ny, 1);
        });

        new Promise(resolve => {
            chart.hide("data2");

            setTimeout(resolve, 300);
        }).then(() => {
            rangeText.each(function(d, i) {
                const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                    .split(",").map(v => parseInt(v, 10));
                const [nx, ny] = expected[i];

                expect(x).to.be.closeTo(nx, 1);
                expect(y).to.be.closeTo(ny, 1);
            });

            return new Promise(resolve => {
                chart.show("data2");

                setTimeout(resolve, 300);
            });
        }).then(() => {
            rangeText.each(function(d, i) {
                const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                    .split(",").map(v => parseInt(v, 10));
                const [nx, ny] = expected[i];

                expect(x).to.be.closeTo(nx, 1);
                expect(y).to.be.closeTo(ny, 1);
            });

            done(1);
        });
    }));

    it("set options: arc.rangeText.position #1", () => {
        args.arc.rangeText.position = {
             x: 5,
             y: 5
        };
    });

    it("position option worked?", () => {
        const expected = [
            [-297, -95],
            [-220, -220],
            [8, -309],
            [220, -220],
            [312, -7]
        ];
        const rangeText = chart.$.main.selectAll(`.${$ARC.arcRange}`);
        const {x: x1, y: y1} = args.arc.rangeText.position

        rangeText.each(function(d, i) {
            const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                .split(",").map(v => parseInt(v, 10));
            const [nx, ny] = expected[i];

            expect(x).to.be.closeTo(nx, x1);
            expect(y).to.be.closeTo(ny, y1);
        });
    });

    it("set options: arc.rangeText.position #2", () => {
        args = {
            data: {
                columns: [
                    ["data1", 30],
                    ["data2", 120],
                    ["data3", 50]
                ],
                type: "gauge"
            },
            arc: {
                rangeText: {
                    values: [10, 25, 50, 75, 99],
                    unit: "%",
                    position: function(v) {
                        if (v === 50) {
                            return {x: 30};
                        }
                    }
                }
            }
        }
    });

    it("position function worked?", () => {
        const expected = [
            [-297, -95],
            [-220, -220],
            [8, -309],
            [220, -220],
            [312, -7]
        ];
        const rangeText = chart.$.main.selectAll(`.${$ARC.arcRange}`);

        rangeText.each(function(d, i) {
            const [x, y] = this.getAttribute("transform").replace(/(translate\(|\))/g, "")
                .split(",").map(v => parseInt(v, 10));
            const [nx, ny] = expected[i];

            if (this.textContent === "50%") {
                expect(x).to.be.equal(30);
                expect(y).to.be.closeTo(ny, 1);
            } else {
                expect(x).to.be.closeTo(nx, 1);
                expect(y).to.be.closeTo(ny, 1);
            }
        });
    });
});
