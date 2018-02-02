/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API select", () => {
	const chart = util.generate({
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150],
				["data2", 5000, 2000, 1000, 4000, 1500]
			],
			selection: {
				enabled: true
			}
		}
	});
	const main = chart.internal.main;

	it("should select all data points", () => {
		chart.select();

		const selected = main.selectAll(`.${CLASS.selectedCircle}`);
		const dataLen = chart.data.values("data1").length + chart.data.values("data2").length;

		expect(selected.size()).to.be.equal(dataLen);
	});

	it("should unselect indice '1' data point", done => {
		const indice = 1;

		chart.unselect(["data1", "data2"], [indice]);

		setTimeout(() => {
			const unselected = main.selectAll(`.${CLASS.selectedCircle}`)
				.filter(`.${CLASS.selectedCircle}-${indice}`);

			expect(unselected.empty()).to.be.ok;

			done();
		}, 500);
	});

	it("should unselect all data points", done => {
		chart.unselect();

		setTimeout(() => {
			const unselected = main.selectAll(`.${CLASS.selectedCircle}`);

			expect(unselected.empty()).to.be.ok;

			done();
		}, 500);
	});

	it("should select some portion of data points", done => {
		const indice = [1, 3];

		chart.select();
		chart.select("data1", indice, true);

		const selected = chart.selected();

		setTimeout(() => {
			main.selectAll(`.${CLASS.selectedCircles}-data1 circle`).each((v, i) => {
				expect(v).to.be.equal(selected[i]);
				expect(v.index).to.be.equal(indice[i]);
			});

			done();
		}, 500);
	});
});
