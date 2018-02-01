/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API legend", () => {
	const chart = util.generate({
		data: {
			x: "x",
			columns: [
				["x", "a", "b", "c", "d", "e"],
				["data1", 30, 200, 100, 400, 150],
				["data2", 5000, 2000, 1000, 4000, 1500]
			]
		},
		axis: {
			x: {
				type: "category"
			}
		}
	});

	it("it should hide all legends", () => {
		chart.legend.hide();

		chart.internal.svg.selectAll(`.${CLASS.legendItem}`).each(function() {
			expect(+this.style.opacity).to.be.equal(0);
		});
	});

	it("it should show all hide legends", done => {
		chart.legend.show();

		setTimeout(() => {
			chart.internal.svg.selectAll(`.${CLASS.legendItem}`).each(function() {

				expect(+this.style.opacity).to.be.equal(1);
			});

			done();
		}, 500)
	});

	it("it should hide 'data1' legend", () => {
		chart.legend.hide("data1");

		chart.internal.svg.selectAll(`.${CLASS.legendItem}`).each(function(v) {
			expect(+this.style.opacity).to.be.equal(v === "data1" ? 0 : 1);
		});
	});


	it("it should show 'data1' legend", done => {
		chart.legend.show("data1");

		setTimeout(() => {
			chart.internal.svg.selectAll(`.${CLASS.legendItem}`).each(function(v) {
				expect(+this.style.opacity).to.be.equal(1);
			});

			done();
		}, 500);
	});
});
