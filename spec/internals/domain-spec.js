/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";

describe("DOMAIN", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("axis.y.min", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				axis: {
					y: {
						min: - 100
					},
					y2: {}
				}
			};
		});

		it("should be set properly when smaller than max of data", () => {
			const domain = chart.internal.y.domain();

			expect(domain[0]).to.be.equal(-150);
			expect(domain[1]).to.be.equal(450);
		});

		it("should change axis.y.min to 500", () => {
			args.axis.y.min = 500;

			expect(true).to.be.ok;
		});

		it("should be set properly when bigger than max of data", () => {
			const domain = chart.internal.y.domain();

			expect(domain[0]).to.be.equal(499);
			expect(domain[1]).to.be.equal(511);
		});

		it("should change axis.y.min to undefined", () => {
			args.axis.y.min = undefined;

			expect(true).to.be.ok;
		});
	});

	describe("axis.y.max", () => {
		it("should change axis.y.max to 1000", () => {
			args.axis.y.max = 1000;

			expect(true).to.be.ok;
		});

		it("should be set properly when bigger than min of data", () => {
			const domain = chart.internal.y.domain();

			expect(domain[0]).to.be.equal(-89);
			expect(domain[1]).to.be.equal(1099);
		});

		it("should change axis.y.max to 0", () => {
			args.axis.y.max = 0;

			expect(true).to.be.ok;
		});

		it("should be set properly when smaller than min of data", () => {
			const domain = chart.internal.y.domain();

			expect(domain[0]).to.be.equal(-11);
			expect(domain[1]).to.be.equal(1);
		});

	});

	describe("axis.y.padding #1", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 10, 20, 10, 40, 15, 25],
						["data2", 50, 40, 30, 45, 25, 45]
					]
				},
				axis: {
					y: {
						padding: 200,
					}
				}
			};
		});

		it("should be set properly when bigger than min of data", () => {
			const domain = chart.internal.y.domain();

			expect(domain[0]).to.be.closeTo(-9, 1);
			expect(domain[1]).to.be.closeTo(69, 1);
		});
	});

	describe("axis.y.padding #2", () => {
		before(() => {
			// should change axis.y.max to 1000 with top/bottom padding
			args = {
				data: {
					columns: [
						["data1", 10, 20, 10, 40, 15, 25],
						["data2", 50, 40, 30, 45, 25, 45]
					]
				},
				axis: {
					y: {
						padding: {
							top: 200,
							bottom: 200
						}
					}
				}
			};
		});

		it("should be set properly when bigger than min of data", () => {
			const domain = chart.internal.y.domain();

			expect(domain[0]).to.be.closeTo(-9, 1);
			expect(domain[1]).to.be.closeTo(69, 1);
		});
	});
});
