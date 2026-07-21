/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import util from "../assets/util";
import {$SHAPE, $SELECT} from "../../src/config/classes";

describe("SELECTION", () => {
	let chart;
	let args;
	const spySelected = sinon.spy();
	const spyUnSelected = sinon.spy();

	beforeEach(() => {
		spySelected.resetHistory();
		spyUnSelected.resetHistory();

		chart = util.generate(args);
	});

	describe("check for callbacks", () => {
		describe("data.selction.enabled", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 10, 190, 95, 40, 15, 25]
						],
						selection: {
							enabled: true
						},
						onselected: spySelected,
						onunselected: spyUnSelected
					}
				};
			});

			it("multiple selection & onselected callback", () => {
				let circle = util.getBBox(d3Select(`.${$SHAPE.shape}-3`));
				const rect = chart.internal.$el.eventRect.node();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledOnce).to.be.true;

				circle = util.getBBox(d3Select(`.${$SHAPE.shape}-4`));

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledTwice).to.be.true;

				// should be selected multiple data points
				expect(d3SelectAll(`.${$SELECT.SELECTED}`).size() > 1).to.be.true;
			});

			it("set options data.selection.multiple=false", () => {
				args.data.selection.multiple = false;
			});

			it("one selection & onunselected callback", () => {
				let circle = util.getBBox(d3Select(`.${$SHAPE.shape}-3`));
				const rect = chart.internal.$el.eventRect.node();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledOnce).to.be.true;

				circle = util.getBBox(d3Select(`.${$SHAPE.shape}-4`));

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledTwice).to.be.true;
				expect(spyUnSelected.calledOnce).to.be.true;

				// should be selected one data point only
				expect(d3SelectAll(`.${$SELECT.SELECTED}`).size() === 1).to.be.true;
			});

			it("onselected & onunselected callback should be called once", () => {
				const circle = util.getBBox(d3Select(`.${$SHAPE.shape}-3`));
				const rect = chart.internal.$el.eventRect.node();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledOnce).to.be.true;
				expect(spyUnSelected.calledOnce).to.be.true;
			});

			it("set options selection.grouped = true", () => {
				args.data.selection.grouped = true;
			});

			it("grouped selections & onunselected callback", () => {
				let circle = util.getBBox(d3Select(`.${$SHAPE.shape}-3`));
				const rect = chart.internal.$el.eventRect.node();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledTwice).to.be.true;

				circle = util.getBBox(d3Select(`.${$SHAPE.shape}-4`));

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.callCount).to.be.equal(4);
				expect(spyUnSelected.calledTwice).to.be.true;

				// should be selected 2 data points only
				expect(d3SelectAll(`.${$SELECT.SELECTED}`).size() === 2).to.be.true;
			});
		});
	});

	describe("check for selection", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 230, 280, 320, 218, 250, 150]
					],
					type: "line",
					selection: {
						enabled: true,
						multiple: false
					}
				},
				point:{
					focus: {
						only: true
					}
				}
			};
		});

		it("check one selection only.", () => new Promise(done => {
			const eventRect = chart.internal.$el.eventRect.node();

			// when
			chart.tooltip.show({x: 3});

			chart.$.circles.each(function() {				
				util.fireEvent(eventRect, "click", {
					clientX: +this.getAttribute("cx"),
					clientY: +this.getAttribute("cy")
				}, chart);
			});

			setTimeout(() => {
				const selected = chart.$.main.selectAll(`.${$SELECT.selectedCircles} circle`);

				expect(selected.size()).to.be.equal(1);
				expect(selected.datum().id).to.be.equal("data2");

				done(1);
			}, 350);
		}));
	});

	describe("API selection with data.selection.multiple=false", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 230, 280, 320, 218, 250, 150]
					],
					type: "line",
					selection: {
						enabled: true,
						grouped: false,
						multiple: false
					}
				}
			};
		});

		it("select() API should keep only one selection at a time", () => {
			chart.select(["data1"], [2]);
			chart.select(["data2"], [4]);

			const selected = chart.selected();

			expect(selected.length).to.be.equal(1);
			expect(selected[0].id).to.be.equal("data2");
			expect(selected[0].index).to.be.equal(4);
		});

		it("select() API with multiple indices should keep only one selection", () => {
			chart.select(["data1"], [0, 2, 4]);

			expect(chart.selected().length).to.be.equal(1);
		});

		it("select() API with no arguments should keep only one selection", () => {
			chart.select();

			expect(chart.selected().length).to.be.equal(1);
		});

		it("select() API with no selectable match should preserve current selection", () => {
			chart.select(["data1"], [2]);
			chart.select(["unknown"], [0]);

			const selected = chart.selected();

			expect(selected.length).to.be.equal(1);
			expect(selected[0].id).to.be.equal("data1");
			expect(selected[0].index).to.be.equal(2);
		});

		it("set options selection.grouped = true", () => {
			args.data.selection.grouped = true;
		});

		it("grouped select() API should keep only one x-index group", () => {
			chart.select(["data1"], [2]);
			chart.select(["data2"], [4]);

			const selected = chart.selected();

			// grouped: both series at the single selected index remain
			expect(selected.length).to.be.equal(2);
			expect(selected.every(d => d.index === 4)).to.be.true;
		});
	});

	describe("API selection with point.focus.only=true", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "line",
					selection: {
						enabled: true,
						grouped: true,
						multiple: false
					}
				},
				point: {
					focus: {
						only: true
					}
				}
			};
		});

		it("select()/selected() should work with focus.only", () => {
			chart.select(["data1"], [3], true);

			const selected = chart.selected();

			expect(selected.length).to.be.equal(1);
			expect(selected[0].index).to.be.equal(3);
			expect(chart.$.main.selectAll(`.${$SELECT.selectedCircle}`).size()).to.be.equal(1);
		});

		it("select() w/resetOther should move the single selection", () => new Promise(done => {
			chart.select(["data1"], [1], true);
			chart.select(["data1"], [5], true);

			setTimeout(() => {
				const selected = chart.selected();

				expect(selected.length).to.be.equal(1);
				expect(selected[0].index).to.be.equal(5);

				done(1);
			}, 500);
		}));

		it("rapid successive select() must not leave orphaned selected circles", () => {
			[0, 4, 2, 5].forEach(index => chart.select(["data1"], [index], true));

			// selected-circle removal is synchronous, so no accumulation even when
			// consecutive calls happen within a transition duration
			expect(chart.selected().length).to.be.equal(1);
			expect(chart.selected()[0].index).to.be.equal(5);
			expect(chart.$.main.selectAll(`.${$SELECT.selectedCircle}`).size()).to.be.equal(1);
		});

		it("select() with no selectable match should preserve focus.only selection", () => {
			chart.select(["data1"], [2], true);
			chart.select(["data1"], [99], true);

			const selected = chart.selected();

			expect(selected.length).to.be.equal(1);
			expect(selected[0].index).to.be.equal(2);
			expect(chart.$.main.selectAll(`.${$SELECT.selectedCircle}`).size()).to.be.equal(1);
		});

		it("unselect() should work with focus.only", () => new Promise(done => {
			chart.select(["data1"], [2], true);
			chart.unselect(["data1"], [2]);

			setTimeout(() => {
				expect(chart.selected().length).to.be.equal(0);

				done(1);
			}, 500);
		}));
	});
});
