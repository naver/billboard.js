/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";

describe("DOMAIN", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("axis.y.min", () => {
		beforeAll(() => {
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
			const domain = chart.internal.scale.y.domain();

			expect(domain[0]).to.be.equal(-150);
			expect(domain[1]).to.be.equal(450);
		});

		it("should change axis.y.min to 500", () => {
			args.axis.y.min = 500;

			expect(true).to.be.ok;
		});

		it("should be set properly when bigger than max of data", () => {
			const domain = chart.internal.scale.y.domain();

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
			const domain = chart.internal.scale.y.domain();

			expect(domain[0]).to.be.equal(-89);
			expect(domain[1]).to.be.equal(1099);
		});

		it("should change axis.y.max to 0", () => {
			args.axis.y.max = 0;

			expect(true).to.be.ok;
		});

		it("should be set properly when smaller than min of data", () => {
			const domain = chart.internal.scale.y.domain();

			expect(domain[0]).to.be.equal(-11);
			expect(domain[1]).to.be.equal(1);
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 5, 5, 5, 5, 5]
					],
					type: "bar"
				},
				axis: {
					y: { 
						max: 5,
						tick: {
							values: [1, 3, 5]
						},
						padding: {
							top: 0,
							bottom: 0
						}
					}
				}
			}
		});

		it("check y axis domain range with positive data value", () => {
			const domain = chart.internal.scale.y.domain();

			expect(domain).to.be.deep.equal([0, args.axis.y.max]);
		});

		it("set options: data.columns", () => {
			args.data.columns[0].splice(1, 1, -5);
		});

		it("check y axis domain range with negative data value", () => {
			const domain = chart.internal.scale.y.domain();

			expect(domain).to.be.deep.equal([-5, args.axis.y.max]);
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 5, 5, 5, 5, 5],
						["data2", -5, -5, -5, -5, -5],
					],
					type: "bar",
					axes: {
						data1: "y",
						data2: "y2"
					}
				  },
				  axis: {
				   y: { 
						max: 5,
						tick: { values: [1, 3, 5] },
						padding: {
							top: 0,
							bottom: 0
						}
					},
					y2: {
						show: true,
						min: -5,
						tick: { values: [-1, -3, -5] },
						padding: {
							top: 0,
							bottom: 0
						}
					}
				}
			};
		});

		it("check y/y2 axes domain range", () => {
			const {y, y2} = chart.internal.scale;

			expect(y.domain()).to.be.deep.equal([0, args.axis.y.max]);
			expect(y2.domain()).to.be.deep.equal([args.axis.y2.min, 0]);
		});
	});

	describe("axis.y.padding #1", () => {
		beforeAll(() => {
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
			const domain = chart.internal.scale.y.domain();

			expect(domain[0]).to.be.closeTo(-9, 1);
			expect(domain[1]).to.be.closeTo(69, 1);
		});
	});

	describe("axis.y.padding #2", () => {
		beforeAll(() => {
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
			const domain = chart.internal.scale.y.domain();

			expect(domain[0]).to.be.closeTo(-9, 1);
			expect(domain[1]).to.be.closeTo(69, 1);
		});
	});

	describe("Multi xs with grouped data", () => {
		beforeAll(() => {
			args = {
				data: {
					xs: { "Buy": "xBuy", "Sell": "xSell" },
					columns: [
						["xBuy", "2018-07-05", "2018-07-11"],
						["xSell","2018-07-02","2018-07-05"],
						["Buy", 33, 3],
						["Sell", 7, 33]
					],
					type: "bar",
					groups: [[ "Buy", "Sell"]]
				},
				axis: {
					x: {
						type: 'timeseries',
						tick: {
							format: '%d/%m/%y'
						}
					},
					y2: {
						show: true
					}
				}
			};
		});

		it("should set max y Axis properly", () => {
			const lastTickText = +chart.$.main.selectAll(".bb-axis-y .tick tspan")
				.nodes().pop().textContent;

			expect(lastTickText).to.be.equal(70);
		});
	});

	describe("axis.y/axis.y2 domain should be the same", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 300, 1000, 4000, 1500, 2500],
						["data2", 5000, 2000, 1000, 4000, 1500, 2500]
					]
				},
				axis: {
					y2: {
						show: true
					}
				}
			};
		});

		it("if there is no specified data.axes binding", () => {
			const yDomain = chart.internal.scale.y.domain();
			const y2Domain = chart.internal.scale.y2.domain();

			expect(yDomain).to.be.deep.equal(y2Domain);
		});

		it("bind all data to y axis", () => {
			args.data.axes = {
				data1: "y",
				data2: "y"
			};
		});

		it("if all data is bound to y axis", () => {
			const yDomain = chart.internal.scale.y.domain();
			const y2Domain = chart.internal.scale.y2.domain();

			expect(yDomain).to.be.deep.equal(y2Domain);
		});

		it("bind all data to y2 axis", () => {
			args.data.axes = {
				data1: "y2",
				data2: "y2"
			};
		});

		it("if all data is bound to y2 axis", () => {
			const yDomain = chart.internal.scale.y.domain();
			const y2Domain = chart.internal.scale.y2.domain();

			expect(yDomain).to.be.deep.equal(y2Domain);
		});

		it("set option data.axes", () => {
			args.data.axes = {
				data2: "y2"
			};
		});

		describe("check the domain value after the data toggle", () => {
			const checkDomain = (dataId, axisId, done) => {
				const domain = chart.internal.scale[axisId].domain();

				// when
				chart.toggle(dataId);

				setTimeout(() => {
					expect(chart.internal.scale[axisId].domain()).to.be.deep.equal(domain);
					done(1);
				}, 300);
			};

			it("y Axis domain should maintain", () => new Promise(done => {
				checkDomain("data1", "y", done);
			}));

			it("y2 Axis domain should maintain", () => new Promise(done => {
				checkDomain("data2", "y2", done);
			}));
		});
	});

	describe("data.axes with combination of zerobased and non-zerobased types.", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150],
						["data2", 130, 100, 200, 250, 250]
					],
					axes: {
						data1: "y1",
						data2: "y2"
					},
					types: {
						data1: "bar",
						data2: "line"
					}
				  },
				  axis: {
					y: {
						show: false
					},
					y2: {
						show: true
					}
				}
			};
		});

		it("y2 domain value shouldn't be chaging.", () => {
			const {scale: {y2}} = chart.internal;
			const domain = y2.domain();

			// when toogling, y2 domain should stay same without changes
			chart.toggle("data1");

			expect(y2.domain()).to.be.deep.equal(domain);
		});
	});

	describe("trimXDomain", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150],
					],
					type: "line",
				},
				zoom: {
					enabled: true,
				},
			}
		});

		it("test pan left gets trimmed", () => {
			const domain = chart.internal.scale.x.domain();
			const trimmed = chart.internal.trimXDomain(domain.map((x: number) => x - 10));

			expect(trimmed[0]).to.approximately(domain[0], 0.1);
			expect(trimmed[1]).to.approximately(domain[1], 0.1);
		});

		it("test pan right gets trimmed", () => {
			const domain = chart.internal.scale.x.domain();
			const trimmed = chart.internal.trimXDomain(domain.map((x: number) => x + 5));

			expect(trimmed[0]).to.approximately(domain[0], 0.1);
			expect(trimmed[1]).to.approximately(domain[1], 0.1);
		});
	});
});
