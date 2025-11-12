/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import util from "../assets/util";
import {fireEvent} from "../assets/helper";

describe("INTERACTION: touch", () => {
	let chart;
	let args;

	beforeEach(() => {
		if (args) {
			chart = util.generate(args);
		}
	});

	afterEach(() => {
		if (chart) {
			chart.destroy();
		}
	});

	describe("generate event rects", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 10, 20, 30],
						["data2", 20, 16, 18]
					],
					type: "line"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			}
		});
		
		it("when touch event fired on svg element, should be in unselected mode.", () => new Promise(done => {
			// when
			chart.tooltip.show({index: 1});

			util.simulator(chart.$.svg.node(), {
				pos: [250,150],
				deltaX: -200,
				deltaY: 0,
				duration: 500,
			}, () => {
				expect(chart.$.tooltip.style("display")).to.be.equal("none");

				done(1);
			});
		}));

		it("set options: data.xs", () => {
			args = {
				data: {
					columns: [
						["x1", 0, 1, 2],
						["x2", 2, 3, 4],
						["data1", 10, 20, 30],
						["data2", 20, 16, 18]
					],
					xs: {
						data1: "x1",
						data2: "x2"
					},
					type: "line"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			};
		});

		it("tooltip on multipleXs", () => {
			const data = {
				id: "data1",
				value: 20,
				x: 1
			};

			// when
			chart.tooltip.show({
				data
			});

			const {tooltip} = chart.$;

			expect(tooltip.select(".name").text()).to.be.equal(data.id);
			expect(+tooltip.select(".value").text()).to.be.equal(data.value)
		});
	});

	describe("arc type", () => {
		const spy = sinon.spy();

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 50],
						["data2", 50]
					],
					type: "pie",
					onclick: spy
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			};
		});

		it("should touch event bound to pie", () => {
			const path =  chart.$.arc.select("path").node();
			const rect = path.getBoundingClientRect();

			fireEvent(path, "click", {
				clientX: rect.x + 10,
				clientY: rect.y
			}, chart);

			expect(spy.calledOnce).to.be.true;
		});
	});

	describe("passive event listener option", () => {
		let addEventListenerSpy;

		// Skip the global beforeEach chart generation for these tests
		beforeAll(() => {
			args = null;
		});

		afterEach(() => {
			if (addEventListenerSpy) {
				addEventListenerSpy.restore();
				addEventListenerSpy = null;
			}
			if (chart) {
				chart.destroy();
				chart = null;
			}
		});

		it("should add touch events with passive: true when preventDefault is false", () => {
			// Spy on addEventListener before chart creation
			const originalAddEventListener = Element.prototype.addEventListener;
			const touchstartCalls = [];
			
			addEventListenerSpy = sinon.stub(Element.prototype, "addEventListener").callsFake(function(type, listener, options) {
				if (type === "touchstart") {
					touchstartCalls.push({ type, options });
				}
				return originalAddEventListener.call(this, type, listener, options);
			});

			// Create chart with touch input enabled and preventDefault disabled
			chart = util.generate({
				data: {
					columns: [
						["data1", 10, 20, 30],
						["data2", 20, 16, 18]
					],
					type: "line"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			});

			// Check if touchstart events were added with passive: true
			const hasPassiveTrue = touchstartCalls.some(call => {
				const options = call.options;
				return options && options.passive === true;
			});

			expect(touchstartCalls.length).to.be.above(0);
			expect(hasPassiveTrue).to.be.true;
		});

		it("should add touch events with passive: false when preventDefault is true", () => {
			// Spy on addEventListener before chart creation
			const originalAddEventListener = Element.prototype.addEventListener;
			const touchCalls = [];
			
			addEventListenerSpy = sinon.stub(Element.prototype, "addEventListener").callsFake(function(type, listener, options) {
				if (type === "touchstart" || type === "touchmove") {
					touchCalls.push({ type, options });
				}
				return originalAddEventListener.call(this, type, listener, options);
			});

			// Create chart with preventDefault enabled
			chart = util.generate({
				data: {
					columns: [
						["data1", 10, 20, 30],
						["data2", 20, 16, 18]
					],
					type: "line"
				},
				interaction: {
					inputType: {
						touch: {
							preventDefault: true
						}
					}
				}
			});

			// Check if touch events were added with passive: false
			const allPassiveFalse = touchCalls.every(call => {
				const options = call.options;
				return options && options.passive === false;
			});

			expect(touchCalls.length).to.be.above(0);
			expect(allPassiveFalse).to.be.true;
		});

		it("should add touch events with passive: false when preventDefault is a number", () => {
			// Spy on addEventListener before chart creation
			const originalAddEventListener = Element.prototype.addEventListener;
			const touchCalls = [];
			
			addEventListenerSpy = sinon.stub(Element.prototype, "addEventListener").callsFake(function(type, listener, options) {
				if (type === "touchstart" || type === "touchmove") {
					touchCalls.push({ type, options });
				}
				return originalAddEventListener.call(this, type, listener, options);
			});

			// Create chart with preventDefault as a number
			chart = util.generate({
				data: {
					columns: [
						["data1", 10, 20, 30],
						["data2", 20, 16, 18]
					],
					type: "line"
				},
				interaction: {
					inputType: {
						touch: {
							preventDefault: 50
						}
					}
				}
			});

			// Check if touch events were added with passive: false
			const allPassiveFalse = touchCalls.every(call => {
				const options = call.options;
				return options && options.passive === false;
			});

			expect(touchCalls.length).to.be.above(0);
			expect(allPassiveFalse).to.be.true;
		});
	});

	describe("passive option for arc types", () => {
		let addEventListenerSpy;

		// Skip the global beforeEach chart generation for these tests
		beforeAll(() => {
			args = null;
		});

		afterEach(() => {
			if (addEventListenerSpy) {
				addEventListenerSpy.restore();
				addEventListenerSpy = null;
			}
			if (chart) {
				chart.destroy();
				chart = null;
			}
		});

		it("should add touch events with passive: true for pie chart", () => {
			// Spy on addEventListener before chart creation
			const originalAddEventListener = Element.prototype.addEventListener;
			const touchstartCalls = [];
			
			addEventListenerSpy = sinon.stub(Element.prototype, "addEventListener").callsFake(function(type, listener, options) {
				if (type === "touchstart") {
					touchstartCalls.push({ type, options });
				}
				return originalAddEventListener.call(this, type, listener, options);
			});

			// Create pie chart
			chart = util.generate({
				data: {
					columns: [
						["data1", 50],
						["data2", 50]
					],
					type: "pie"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			});

			// Check if touchstart events were added with passive: true
			const hasPassiveTrue = touchstartCalls.some(call => {
				const options = call.options;
				return options && options.passive === true;
			});

			expect(touchstartCalls.length).to.be.above(0);
			expect(hasPassiveTrue).to.be.true;
		});
	});

	describe("passive option for other shape types", () => {
		let addEventListenerSpy;

		// Skip the global beforeEach chart generation for these tests
		beforeAll(() => {
			args = null;
		});

		afterEach(() => {
			if (addEventListenerSpy) {
				addEventListenerSpy.restore();
				addEventListenerSpy = null;
			}
			if (chart) {
				chart.destroy();
				chart = null;
			}
		});

		it("should add touch events with passive: true for radar chart", () => {
			// Spy on addEventListener before chart creation
			const originalAddEventListener = Element.prototype.addEventListener;
			const touchstartCalls = [];
			
			addEventListenerSpy = sinon.stub(Element.prototype, "addEventListener").callsFake(function(type, listener, options) {
				if (type === "touchstart") {
					touchstartCalls.push({ type, options });
				}
				return originalAddEventListener.call(this, type, listener, options);
			});

			// Create radar chart
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					],
					type: "radar"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			});

			// Check if touchstart events were added with passive: true
			const hasPassiveTrue = touchstartCalls.some(call => {
				const options = call.options;
				return options && options.passive === true;
			});

			expect(touchstartCalls.length).to.be.above(0);
			expect(hasPassiveTrue).to.be.true;
		});

		it("should add touch events with passive: true for treemap chart", () => {
			// Spy on addEventListener before chart creation
			const originalAddEventListener = Element.prototype.addEventListener;
			const touchstartCalls = [];
			
			addEventListenerSpy = sinon.stub(Element.prototype, "addEventListener").callsFake(function(type, listener, options) {
				if (type === "touchstart") {
					touchstartCalls.push({ type, options });
				}
				return originalAddEventListener.call(this, type, listener, options);
			});

			// Create treemap chart
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					],
					type: "treemap"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			});

			// Check if touchstart events were added with passive: true
			const hasPassiveTrue = touchstartCalls.some(call => {
				const options = call.options;
				return options && options.passive === true;
			});

			expect(touchstartCalls.length).to.be.above(0);
			expect(hasPassiveTrue).to.be.true;
		});

		it("should add touch events with passive: true for funnel chart", () => {
			// Spy on addEventListener before chart creation
			const originalAddEventListener = Element.prototype.addEventListener;
			const touchstartCalls = [];
			
			addEventListenerSpy = sinon.stub(Element.prototype, "addEventListener").callsFake(function(type, listener, options) {
				if (type === "touchstart") {
					touchstartCalls.push({ type, options });
				}
				return originalAddEventListener.call(this, type, listener, options);
			});

			// Create funnel chart
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					],
					type: "funnel"
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			});

			// Check if touchstart events were added with passive: true
			const hasPassiveTrue = touchstartCalls.some(call => {
				const options = call.options;
				return options && options.passive === true;
			});

			expect(touchstartCalls.length).to.be.above(0);
			expect(hasPassiveTrue).to.be.true;
		});
	});
});
