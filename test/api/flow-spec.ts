/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import sinon from "sinon";
import util from "../assets/util";
import CLASS from "../../src/config/classes";
import {window} from "../../src/module/browser";

describe("API flow", () => {
	const chart = util.generate({
		data: {
			x: "x",
			columns: [
				["x", "2017-01-11", "2017-01-21", "2017-01-25"],
				["data1", 130, 140, 130],
				["data2", 150, 160, 145]
			]
		},
		axis: {
			x: {
				type: "timeseries",
				tick: {
					format: "%m/%d"
				}
			}
		}
	});

	it("should flow updating the data", done => {
		chart.flow({
			columns: [
				["x", "2017-02-11", "2017-02-21"],
				["data1", 500, 200],
				["data2", 100, 300],
				["data3", 200, 120]
			],
			done: function () {
				const lineSize = this.internal.$el.main.selectAll(`.${CLASS.chartLines} > g`).size();

				expect(lineSize).to.be.equal(this.data().length);
				done();
			}
		});
	});

	it("should flow correctly with options", done => {
		const spy = sinon.spy(function() {
			chart.internal.$el.main.selectAll(`.${CLASS.axisX} .tick tspan`).each(function(d, i) {
				expect(this.textContent).to.be.equal(tickText[i]);
				expect(d.splitted).to.be.equal(tickText[i]);
			});

			expect(spy.called).to.be.true;
			done();
		});
		const tickText = ["01/25", "02/11", "02/21", "03/11", "03/21"];

		chart.flow({
			columns: [
				["x", "2017-03-11", "2017-03-21"],
				["data1", 500, 200]
			],
			length: 2,
			duration: 1000,
			done: spy
		});
	});

	it("check when is not visible", () => {
		const spy = sinon.spy();

		window.$$TEST$$.isTabVisible = false;
		
		chart.flow({
			columns: [
				["x", "2017-03-30"],
				["data1", 500]
			],
			done: spy
		});

		const lastTickText = chart.$.main.selectAll(`.${CLASS.axisX} .tick tspan`)
			.nodes().pop().innerHTML;

		// when tab is not visible, it shouldn't be executed
		expect(spy.called).to.be.false;
		expect(lastTickText).to.be.equal("03/21");

		// restore
		delete window.$$TEST$$.isTabVisible;
	})
});
