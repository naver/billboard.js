/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import util from "../assets/util";

describe("API subchart", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe(".subchart.show/hide/toggle()", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "line",
				},
				subchart: {
					show: false
				}
			};
		});

		it("check subchart interactions", () => {
			const {subchart} = chart.internal.$el;

			expect(subchart.main).to.be.null;

			// when
			chart.subchart.show();

			expect(subchart.main).to.be.not.null;

			// when
			chart.subchart.hide();

			expect(subchart.main.style("display")).to.be.equal("none");

			// when
			chart.subchart.toggle();

			expect(subchart.main.style("display")).to.be.not.equal("none");

			// when
			chart.subchart.toggle();

			expect(subchart.main.style("display")).to.be.equal("none");
		});

		it("dynamic data load", done => {
			// when
			chart.subchart.show();

			const path = chart.internal.$el.subchart.line.attr("d");

			chart.subchart.hide();

			chart.load({
				columns: [
					["data1", 30, 20, 50]
				],
				done: function() {
					// show subchart again
					this.subchart.show();

					const currentPath =  this.internal.$el.subchart.line.attr("d")

					expect(currentPath).to.be.not.equal(path);
					expect(currentPath).to.be.equal("M6,38.69444444444444L299,55.083333333333336L593,5.916666666666669");
					done();
				}
			});
		});
	});

	describe("usage with other combination", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					],
					type: "line"
				},
				subchart: {
					show: true,
					showHandle: true
				},
				transition: {
					duration: 0
				}
			};
		});

		it("Zoom reset button should be hidden during subchart interaction", () => {

			// when
			chart.zoom.enable("drag");
			chart.zoom([1,2]);

			const {resetBtn} = chart.internal.zoom;

			expect(resetBtn.style("display")).to.be.equal("inline");

			// when
			chart.subchart.toggle();

			expect(resetBtn.style("display")).to.be.equal("none");
		});
	});
});
