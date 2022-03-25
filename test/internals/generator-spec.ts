/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import sinon from "sinon";
import util from "../assets/util";
import {window} from "../../src/module/browser";
import {isTabVisible} from "../../src/module/util";

describe("GENERATOR", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("generateWait()", () => {
		const spy = sinon.spy();

		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				},
				onrendered: spy
			};
		});

		it("should onrendered callback called, when tab isn't visible", done => {
			window.$$TEST$$.isTabVisible = false;

			// when
			chart.toggle(["data1", "data2"]);

			setTimeout(() => {
				expect(isTabVisible()).to.be.false;
				expect(spy.called).to.be.true;

				// restore
				delete window.$$TEST$$.isTabVisible;
				done();
			}, 500);
		});
	});
});
