/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import sinon from "sinon";
import {expect} from "chai";
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import util from "../assets/util";
import CLASS from "../../src/config/classes";

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
			before(() => {
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
				let circle = util.getBBox(d3Select(`.${CLASS.shape}-3`));
				const rect = chart.internal.$el.eventRect.node();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledOnce).to.be.true;

				circle = util.getBBox(d3Select(`.${CLASS.shape}-4`));

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledTwice).to.be.true;

				// should be selected multiple data points
				expect(d3SelectAll(`.${CLASS.SELECTED}`).size() > 1).to.be.true;
			});

			it("set options data.selection.multiple=false", () => {
				args.data.selection.multiple = false;
			});

			it("one selection & onunselected callback", () => {
				let circle = util.getBBox(d3Select(`.${CLASS.shape}-3`));
				const rect = chart.internal.$el.eventRect.node();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledOnce).to.be.true;

				circle = util.getBBox(d3Select(`.${CLASS.shape}-4`));

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledTwice).to.be.true;
				expect(spyUnSelected.calledOnce).to.be.true;

				// should be selected one data point only
				expect(d3SelectAll(`.${CLASS.SELECTED}`).size() === 1).to.be.true;
			});

			it("onselected & onunselected callback should be called once", () => {
				const circle = util.getBBox(d3Select(`.${CLASS.shape}-3`));
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
				let circle = util.getBBox(d3Select(`.${CLASS.shape}-3`));
				const rect = chart.internal.$el.eventRect.node();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.calledTwice).to.be.true;

				circle = util.getBBox(d3Select(`.${CLASS.shape}-4`));

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(spySelected.callCount).to.be.equal(4);
				expect(spyUnSelected.calledTwice).to.be.true;

				// should be selected 2 data points only
				expect(d3SelectAll(`.${CLASS.SELECTED}`).size() === 2).to.be.true;
			});
		});
	});
});
