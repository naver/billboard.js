/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$COMMON, $FUNNEL, $SHAPE} from "../../src/config/classes";

describe("SHAPE FUNNEL", () => {
	let chart;
	let args;

	beforeEach(function(){
		chart = util.generate(args);
	});

	describe("default funnel", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25],
						["data4", 55]
					],
					type: "funnel"
				}
			};
		});

		it("check for basic rendering", () => {
			const {internal} = chart;
			const {$el: {funnel}} = internal;
			let height = internal.getLegendHeight() + 10;

			funnel.selectAll(`path.${$SHAPE.shape}`).each(function(d, i) {
				const rect = this.getBoundingClientRect();

				expect(rect.height).to.be.closeTo(d.ratio, 1);
				height += rect.height;
			});

			expect(height).to.be.equal(+chart.$.svg.attr("height"));
		});

		it("check neck clip-path", () => {
			const expected = "M0,0L640,0L320,450L320,450L320,450L320,450L0,0z";
			const path = chart.internal.$el.funnel.attr("clip-path")
				.replace(/(^path\(|\)$|')/g, "");

			expect(path).to.be.equal(expected);
		});

		it("set options: legend.show=false", () => {
			args.legend = {show: false};
		});

		it("check for basic rendering w/o legend", () => {
			const {internal} = chart;
			const {$el: {funnel}} = internal;
			let height = 0;

			funnel.selectAll(`path.${$SHAPE.shape}`).each(function(d, i) {
				const rect = this.getBoundingClientRect();

				expect(rect.height).to.be.closeTo(d.ratio, 1);
				height += rect.height;
			});

			expect(height).to.be.equal(+chart.$.svg.attr("height"));
		});

		it("check neck clip-path w/o legend", () => {
			const expected = "M0,0L640,0L320,480L320,480L320,480L320,480L0,0z";
			const path = chart.internal.$el.funnel.attr("clip-path")
				.replace(/(^path\(|\)$|')/g, "");

			expect(path).to.be.equal(expected);
		});

		it("data shape hide correctly?", () => new Promise(done => {
			const {internal} = chart;
			const {$el: {funnel}} = internal;
			const targetId = "data4";
			let accumulatedHeight = 0;

			// when
			chart.hide(targetId);

			setTimeout(() => {
				funnel.selectAll(`.${$COMMON.target}`).each(function(d, i) {
					if (d.id === targetId) {
						expect(+this.style.opacity).to.be.equal(0);
					} else {
						accumulatedHeight += d.ratio;
					}
				});

				expect(accumulatedHeight).to.be.equal(internal.state.current.height);

				done(1);
			}, 300);
		}));

		it("data shape hide -> show correctly?", () => new Promise(done => {
			const {internal} = chart;
			const {$el: {funnel}} = internal;
			const targetId = "data4";
			let accumulatedHeight = 0;

			// when
			chart.hide(targetId);
			chart.show(targetId);

			setTimeout(() => {
				funnel.selectAll(`.${$COMMON.target}`).each(function(d, i) {
					expect(this.style.opacity).to.be.empty;
					accumulatedHeight += d.ratio;
				});

				expect(parseInt(`${accumulatedHeight}`)).to.be.equal(internal.state.current.height);

				done(1);
			}, 300);
		}));

		it("should .tooltip.show/hide() API works", () => {
			const targetId = "data1";

			// when
			chart.tooltip.show({data: {id: targetId}});

			expect(chart.$.tooltip.select(".name").text()).to.be.equal(targetId);

			// when
			chart.tooltip.hide();

			expect(chart.$.tooltip.style("display")).to.be.equal("none");
		});

		it("set options: legend.show=false", () => {
			args.legend = {show: false};
		});

		it("check dimension w/o legend", () => {
			const {$el: {svg, funnel}} = chart.internal;

			const rect = funnel.node().getBoundingClientRect();
			const shapes = funnel.selectAll(`path.${$SHAPE.shape}`);
			let accumulatedHeight = 0;

			shapes.each(function(d, i) {
				accumulatedHeight += d.ratio;
			});

			expect(parseInt(`${accumulatedHeight}`)).to.be.equal(rect.height);
			expect(parseInt(`${accumulatedHeight}`)).to.be.equal(+svg.attr("height"));
		});
	});

	describe("padding option", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 50],
						["data2", 50],
						["data3", 50]
					],
					type: "funnel"
				},
				padding: {
					top: 20,
					bottom: 20,
					left: 20,
					right:20
				},
				funnel: {
					neck: {
						width: 200,
						height: 100
					}
				}
			};
		});

		it("check path value with padding", () => {
			const {funnel} = chart.internal.$el;
			const expectedClipPath = "M0,0L600,0L400,310L400,410L200,410L200,310L0,0z";
			const expectedBackgroundPath = "M20,20L620,20L420,330L420,430L220,430L220,330L20,20z";

			expect(funnel.attr("clip-path").indexOf(expectedClipPath) > -1).to.be.true;
			expect(funnel.select(`.${$FUNNEL.funnelBackground}`).attr("d").indexOf(expectedBackgroundPath) > -1).to.be.true;
		});
	});

	describe("neck option", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25],
						["data4", 55]
					],
					type: "funnel"
				},
				funnel: {
					neck: {
						width: 200,
						height: 100
					}
				}
			};
		});

		function chkNeckSize(str, width, height) {
			const path = str
				.replace(/[mz]/ig, "")
				.split("L")
				.map(v => v.split(",").map(Number));

			// check for neck width
			expect(path[3][0] - path[4][0]).to.be.equal(width);

			// check for neck height
			expect(path[3][1] - path[2][1]).to.be.equal(height);
			expect(path[4][1] - path[5][1]).to.be.equal(height);
		}

		it("check neck path: absolute size", () => {
			const {funnel} = chart.internal.$el;
			const {width, height} = args.funnel.neck;
			const path = funnel.attr("clip-path");
			const bgPath = funnel.select(`.${$FUNNEL.funnelBackground}`).attr("d");

			chkNeckSize(path, width, height);
			chkNeckSize(bgPath, width, height);
		});

		it("set options: funnel.neck.show=false", () => {
			args.funnel.neck = {
				width: {
					ratio: 0.5
				},
				height: {
					ratio: 0.5
				}
			}
		});

		it("check neck path: size in ratio", () => {
			const {funnel} = chart.internal.$el;
			let rect = funnel.node().getBoundingClientRect();
			let {width, height} = args.funnel.neck;

			width = rect.width * width.ratio;
			height = rect.height * height.ratio;

			let path = funnel.attr("clip-path");
			let bgPath = funnel.select(`.${$FUNNEL.funnelBackground}`).attr("d");

			chkNeckSize(path, width, height);
			chkNeckSize(bgPath, width, height);

			// when
			chart.resize({width: 500, height: 300});
			
			rect = funnel.node().getBoundingClientRect();
			width = rect.width * args.funnel.neck.width.ratio;
			height = rect.height * args.funnel.neck.height.ratio;

			path = funnel.attr("clip-path");
			bgPath = funnel.select(`.${$FUNNEL.funnelBackground}`).attr("d");

			chkNeckSize(path, width, height);
			chkNeckSize(bgPath, width, height);
		});
	});

	describe(".load() API", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25],
						["data4", 55]
					],
					type: "funnel"
				},
				funnel: {
					neck: {
						width: 100,
						height: 100
					}
				}
			};
		});

		it("should dynamic data load work", () => new Promise(done => {
			chart.load({
				columns: [
					["data5", 30],
					["data6", 20]
				],
				done() {
					const rect = this.internal.$el.funnel.node().getBoundingClientRect();
					const shapes = this.$.svg.selectAll(`path.${$SHAPE.shape}`);
					let accumulatedHeight = 0;

					shapes.each(function(d, i) {
						accumulatedHeight += d.ratio;
					});

					expect(shapes.size()).to.be.equal(6);
					expect(accumulatedHeight).to.be.equal(rect.height);

					done(1);
				}
			});
		}));

		it("should dynamic data load w/unload work", () => new Promise(done => {
			chart.load({
				columns: [
					["data5", 80],
					["data6", 75]
				],
				unload: ["data1", "data2"],
				done() {
					const rect = this.internal.$el.funnel.node().getBoundingClientRect();
					const shapes = this.$.svg.selectAll(`path.${$SHAPE.shape}`);
					let accumulatedHeight = 0;

					shapes.each(function(d, i) {
						accumulatedHeight += d.ratio;
					});

					expect(shapes.size()).to.be.equal(4);
					expect(accumulatedHeight).to.be.equal(rect.height);

					done(1);
				}
			});
		}));
	});

	describe(".unload() API", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 50],
						["data2", 50],
						["data3", 50],
					],
					type: "funnel"
				},
				legend: {
					show: false
				}
			};
		});

		it("should unload and shape resized correctly.", () => new Promise(done => {
			// when
			chart.unload({
				ids: ["data1"],
				done() {
					const {internal: {$el}} = this;
					const targets = this.internal.$el.funnel.selectAll(`.${$COMMON.target}`);
					const height = targets.data().reduce((a, c) => a.ratio + c.ratio);

					expect(targets.size()).to.be.equal(2);
					expect(+$el.svg.attr("height")).to.be.equal(height);

					done(1);
				}
			});			
		}));
	});
});
