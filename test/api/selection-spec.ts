/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$BAR, $SELECT, $SHAPE} from "../../src/config/classes";

describe("API select", () => {
	let chart;
	let main;
	let args: any = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150],
				["data2", 5000, 2000, 1000, 4000, 1500]
			],
			selection: {
				enabled: true
			}
		},
		transition: {
			duration: 0
		}
	};

	describe("selection for circle data points", () => {
		beforeAll(() => {
			chart = util.generate(args);
			main = chart.$.main;
		});

		it("should select all data points", () => {
			chart.select();

			const selected = main.selectAll(`.${$SELECT.selectedCircle}`);
			const dataLen = chart.data.values("data1").length + chart.data.values("data2").length;

			expect(selected.size()).to.be.equal(dataLen);
		});

		it("should unselect indice '1' data point", () => {
			const indice = 1;

			chart.unselect(["data1", "data2"], [indice]);

			const unselected = main.selectAll(`.${$SELECT.selectedCircle}`)
				.filter(`.${$SELECT.selectedCircle}-${indice}`);

			expect(unselected.empty()).to.be.ok;
		});
		
		it("should select some portion of data points", () => {
			const indice = [1, 3];
			
			chart.select("data1", indice, true);
			
			const selected = chart.selected();
			
			main.selectAll(`.${$SELECT.selectedCircles}-data1 circle`).each((v, i) => {
				expect(v).to.be.equal(selected[i]);
				expect(v.index).to.be.equal(indice[i]);
			});
		});

		it("should unselect all data points", () => {
			chart.unselect();

			const unselected = main.selectAll(`.${$SELECT.selectedCircle}`);

			expect(unselected.empty()).to.be.ok;
		});

		it("with reset option", () => {
			const target = [1, 3];

			// when
			chart.select("data1", target);

			let selected = main.selectAll(`.${$SELECT.selectedCircle}`);

			expect(selected.size()).to.be.equal(2);

			selected.each(function(d, i) {
				expect(d.index).to.be.equal(target[i]);
			});

			// when select again with reset option, should be unselected
			chart.select("data1", target, true);

			selected = main.selectAll(`.${$SELECT.selectedCircle}`);

			expect(selected.size()).to.be.equal(0);
		});
	});

	describe("selection for bar", () => {
		beforeAll(() => {
			args.data.type = "bar";
			chart = util.generate(args);
			main = chart.$.main;
		});

		it("should select all data points", () => {
			chart.select();

			const selected = main.selectAll(`.${$SELECT.SELECTED}`);
			const dataLen = chart.data.values("data1").length + chart.data.values("data2").length;

			expect(selected.size()).to.be.equal(dataLen);
		});

		it("should unselect indice '1' data point", () => {
			const indice = 1;

			chart.unselect(["data1", "data2"], [indice]);

			const unselected = main.selectAll(`.${$SELECT.SELECTED}`)
				.filter(`.${$BAR.bar}-${indice}`);

			expect(unselected.empty()).to.be.ok;
		});

		it("should unselect all data points", () => {
			chart.unselect();

			const unselected = main.selectAll(`.${$SELECT.SELECTED}`);

			expect(unselected.empty()).to.be.ok;
		});

		it("should select some portion of data points", () => {
			const indice = [1, 3];
			const color = chart.color("data1");

			chart.select("data1", indice, true);

			const selected = chart.selected();

			main.selectAll(`.${$SHAPE.shapes}-data1 path.${$SELECT.SELECTED}`).each(function(v, i) {
				expect(v).to.be.equal(selected[i]);
				expect(v.index).to.be.equal(indice[i]);

				// check for the selected color
				expect(this.style.filter).to.be.equal("brightness(1.25)");
			});
		});
	});

	describe("when selection is disabled", () => {
		beforeAll(() => {
			args.data.selection = false;
			chart = util.generate(args);
			main = chart.$.main;
		});

		it("the call of .select() should not select.", () => {
			// when
			chart.select();

			const selected = main.selectAll(`.${$SELECT.SELECTED}`);

			expect(selected.size()).to.be.equal(0);			
		});
	});
});
