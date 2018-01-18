/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "../assets/util";

describe("TYPES", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("internal.hasArcType", () => {
		describe("with data", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
							["data3", 150, 120, 110, 140, 115, 125]
						],
						type: "pie"
					}
				};
			});

			it("should return true",
				() => expect(chart.internal.hasArcType()).to.be.ok);

			it("should change chart type to 'bar'", () => {
				args.data.type = "bar";

				expect(true).to.be.ok;
			});

			it("should return false",
				() => expect(chart.internal.hasArcType()).to.not.be.ok);
		});

		describe("with empty data", () => {
			before(() => {
				args = {
					data: {
						columns: [],
						type: "pie"
					}
				};
			});

			it("should return true",
				() => expect(chart.internal.hasArcType()).to.be.ok);

			it("should change chart type to 'bar'", () => {
				args.data.type = "bar";

				expect(true).to.be.ok;
			});

			it("should return false",
				() => expect(chart.internal.hasArcType()).to.not.be.ok);
		});
	});

	describe("internal.hasType", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					],
					type: "pie"
				}
			};
		});

		it("should return true for 'pie' type",
			() => expect(chart.internal.hasType("pie")).to.be.ok);

		it("should return false for 'line' type",
			() => expect(chart.internal.hasType("line")).to.not.be.ok);

		it("should return false for 'bar' type",
			() => expect(chart.internal.hasType("bar")).to.not.be.ok);

		it("should unload successfully", () => {
			chart.unload([]);
			expect(true).to.be.ok;
		});

		it("should return true for 'pie' type even if no data",
			() => expect(chart.internal.hasType("pie")).to.be.ok);

		it("should return false for 'line' type even if no data",
			() => expect(chart.internal.hasType("line")).to.not.be.ok);

		it("should return false for 'bar' type even if no data",
			() => expect(chart.internal.hasType("bar")).to.not.be.ok);

		it("should change chart type to 'bar' successfully", () => {
			args.data.type = "bar";

			expect(true).to.be.ok;
		});

		it("should return false for 'pie' type even if no data",
			() => expect(chart.internal.hasType("pie")).to.not.be.ok);

		it("should return false for 'line'' type even if no data",
			() => expect(chart.internal.hasType("line")).to.not.be.ok);

		it("should return true for 'bar' type even if no data",
			() => expect(chart.internal.hasType("bar")).to.be.ok);
	});
});
