/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {$ARC} from "../../src/config/classes";
import util from "../assets/util";
import { $GAUGE } from "../../src/config/classes";

describe("SHAPE ARC: NEEDLE option", () => {
	let chart;
	let args = {
		data: {
			columns: [
				["data1", 25],
				["data2", 25],
				["data3", 25],
				["data4", 25]
			],
			type: "donut", // for ESM specify as: donut()
		},
		donut: {
			title: "{=NEEDLE_VALUE}"
		},
		arc: {
			needle: {
				show: true
			}
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("donut", () => {	
		it("basic", () => {
			const {$el: {arcs, needle}} = chart.internal;
			
			expect(needle.attr("d")).to.be.equal("M-7.5 0 A1 1 0 0 0 7.5 0 L0 -210.85 A0 0 0 0 0 -0 -210.85 L-7.5 0 Z");
			expect(+arcs.select(`.${$ARC.chartArcsTitle}`).text()).to.be.equal(0);
		});

		it("set options", () => {
			args.arc.needle = {
				show: true,
				value: 33,
				length: 80,
				color: "red",
				top: {
					rx: 1,
					ry: 1,
					width: 5
				},
				bottom: {
					rx: 0,
					ry: 0,
					width: 10,
					len: 20
				}
			}
		});

		it("check needle options", () => {
			const {$el: {arcs, needle}} = chart.internal;

			expect(needle.attr("d")).to.be.equal("M-5 20 A0 0 0 0 0 5 20 L2.5 -168.67999999999998 A1 1 0 0 0 -2.5 -168.67999999999998 L-5 20 Z");
			expect(util.parseNum(needle.style("transform"))).to.equal(118.8);
			expect(needle.style("fill")).to.equal("red");

			expect(+arcs.select(`.${$ARC.chartArcsTitle}`).text()).to.be.equal(args.arc.needle.value);
		});

		it(".updateHelper()", done => {
			const {$el: {arcs, needle}} = chart.internal;

			new Promise((resolve) => {
				needle.updateHelper(70);

				setTimeout(() => {
					// title text has been updated?
					expect(+arcs.select(`.${$ARC.chartArcsTitle}`).text()).to.be.equal(70);

					// needle has been updated?
					expect(util.parseNum(needle.style("transform"))).to.be.equal(252);

					resolve();
				}, 500);
			}).then(() => {
				return new Promise((resolve) => {
					// hide 'data1'
					chart.toggle("data1");

					setTimeout(() => {
						// title text value should be equal as the initial value
						expect(+arcs.select(`.${$ARC.chartArcsTitle}`).text()).to.be.equal(args.arc.needle.value);
						
						expect(util.parseNum(needle.style("transform"))).to.be.equal(158.4);
						
						// show 'data1'
						chart.toggle("data1");		
	
						resolve();
					}, 500);
				});
			}).then(() => {
				return new Promise((resolve) => {
					// update needle value with configUpdate option
					needle.updateHelper(70, true);

					setTimeout(() => {
						// title text value should be equal as the initial value
						expect(+arcs.select(`.${$ARC.chartArcsTitle}`).text()).to.be.equal(70);
					
						resolve();
					}, 500);
				});
			}).then(() => {
				// hide 'data1
				chart.toggle("data1");

				setTimeout(() => {
					// title text value should be equal as the initial value
					expect(+arcs.select(`.${$ARC.chartArcsTitle}`).text()).to.be.equal(70);
				
					done();
				}, 500);
			});
		});

		it("set options: arc.needle.path", () => {
			args.arc.needle.path = function(length) {
				const len = length - 20;
				const path = `M 0 -${len + 20}
					L -12 -${len}
					L -5 -${len}
					L -5 0 
					A 1 1 0 0 0 5 0
					L 5 -${len}
					L 12 -${len} Z`;
	
				return path;
			};
		});

		it("check custom path", () => {
			const {$el: {needle}} = chart.internal;
			const path = needle.attr("d").replace(/[\n]/g, "").replace(/\s{2,}/g, " ");
			
			expect(path).to.be.equal("M 0 -168.67999999999998 L -12 -148.67999999999998 L -5 -148.67999999999998 L -5 0 A 1 1 0 0 0 5 0 L 5 -148.67999999999998 L 12 -148.67999999999998 Z");
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 50],
						["data2", 50],
					],
					type: "donut"
				},
				donut: {
					startingAngle: 2
				},
				arc: {
					needle: {
						show: true
					}
				}
			};
		});

		it("check with startingAngle", done => {
			const {$el: {needle}} = chart.internal;
			
			expect(util.parseNum(needle.style("transform"))).to.be.equal(114.592);

			// when
			chart.$.needle.updateHelper(50);

			setTimeout(() => {
				expect(util.parseNum(needle.style("transform"))).to.be.equal(294.592);

				done();
			}, 500);			
		});
	});

	describe("gauge", () => {	
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 25]
					],
					type: "gauge"
				},
				transition: {
					duration: 0
				},
				arc: {
					needle: {
						show: true
					}
				}
			};
		});

		it("basic", () => {
			const {$el: {arcs, needle}} = chart.internal;
			
			expect(arcs.select(`.${$GAUGE.gaugeValue}`).text()).to.be.equal("25.0%");
			expect(needle.attr("d")).to.be.equal("M-7.5 0 A1 1 0 0 0 7.5 0 L0 -303 A0 0 0 0 0 -0 -303 L-7.5 0 Z");
			expect(util.parseNum(needle.style("transform"))).to.be.equal(-45);
		});

		it("set options", () => {
			args.arc.needle.value = 50;
		});

		it("with initial value", () => {
			const {$el: {arcs, needle}} = chart.internal;
			
			expect(arcs.select(`.${$GAUGE.gaugeValue}`).text()).to.be.equal("25.0%");
			expect(util.parseNum(needle.style("transform"))).to.be.equal(0);
		});

		it("set options", () => {
			args.gauge = {
				title: "{=NEEDLE_VALUE}%"
			};
		});

		it("check gauge title template binding", () => {
			const {$el: {arcs}} = chart.internal;
			
			expect(arcs.select(`.${$GAUGE.chartArcsGaugeTitle}`).text()).to.be.equal("50%");
		});

		it(".updateHelper()", done => {
			const {$el: {arcs}} = chart.internal;
			
			// when
			chart.$.needle.updateHelper(70);

			setTimeout(() => {
				expect(arcs.select(`.${$GAUGE.chartArcsGaugeTitle}`).text()).to.be.equal("70%");

				done();
			}, 500);
		});

		it("set options: multiple dataseries", () => {
			args.data.columns = [
				["data1", 25],
				["data2", 25]
			];

			args.arc.needle.value = undefined;
		});

		it("check when multiple dataseries are bound.", done => {
			const {$el: {arcs}} = chart.internal;
			const gaugeTitle = arcs.select(`.${$GAUGE.chartArcsGaugeTitle}`);
			
			expect(arcs.select(`.${$GAUGE.chartArcsGaugeTitle}`).text()).to.be.equal("0%");

			new Promise((resolve) => {
				// when
				chart.$.needle.updateHelper(70);
				chart.toggle("data2");  // hide 'data2'

				setTimeout(() => {
					expect(gaugeTitle.text()).to.be.equal("0%");
					resolve();
				}, 500);
			}).then(() => {
				// when
				chart.$.needle.updateHelper(85, true);
				chart.toggle("data2");  // show 'data2'

				setTimeout(() => {
					expect(gaugeTitle.text()).to.be.equal("85%");
					
					done();
				}, 500);
			});
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 30]
					],
					type: "gauge"
				},
				gauge: {
					startingAngle: -1.3
				},
				arc: {
					needle: {
						show: true
					}
				}
			};
		});

		it("check with startingAngle", done => {
			const {$el: {needle}} = chart.internal;
			
			expect(util.parseNum(needle.style("transform"))).to.be.equal(-29.7938);

			// when
			chart.$.needle.updateHelper(100);

			setTimeout(() => {
				expect(util.parseNum(needle.style("transform"))).to.be.equal(74.4845);

				done();
			}, 500);			
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 100]
					],
					type: "gauge"
				},
				gauge: {
					fullCircle: true,
					startingAngle: -1.3,
					arcLength: 70
				},
				arc: {
					needle: {
						show: true,
						value: 50
					}
				}
			};
		});

		it("check with fullCircle and arcLength options", done => {
			const {$el: {needle}} = chart.internal;
			const path = needle.attr("d");
			
			expect(util.parseNum(needle.style("transform"))).to.be.equal(51.5155);

			new Promise((resolve) => {
				// when
				chart.$.needle.updateHelper(0);

				setTimeout(() => {
					expect(util.parseNum(needle.style("transform"))).to.be.closeTo(-74.4845, 1);
					resolve();
				}, 500);
			}).then(() => {
				// when
				chart.$.needle.updateHelper(100);

				setTimeout(() => {
					expect(util.parseNum(needle.style("transform"))).to.be.equal(177.515);
					
					done();
				}, 500);
			});	
		});
	});

	describe("pie", () => {	
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 100],
						["data2", 100],
						["data3", 100],
						["data4", 100],
						["data5", 100]
					],
					type: "pie"
				},
				transition: {
					duration: 0
				},
				arc: {
					needle: {
						show: true,
						value: 300
					}
				}
			};
		});

		it("basic", () => {
			const {$el: {needle}} = chart.internal;
			
			expect(util.parseNum(needle.style("transform"))).to.be.equal(216);
		});

		it("toggle data", done => {
			const {$el: {needle}} = chart.internal;

			new Promise((resolve) => {
				// when
				chart.toggle("data5");

				setTimeout(() => {
					expect(util.parseNum(needle.style("transform"))).to.be.equal(270);
					resolve();
				}, 500);
			}).then(() => {
				// when
				chart.toggle("data4");

				setTimeout(() => {
					expect(util.parseNum(needle.style("transform"))).to.be.equal(360);
					
					done();
				}, 500);
			});	
		});
	});
});
