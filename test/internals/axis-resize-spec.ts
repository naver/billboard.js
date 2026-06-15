/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {afterEach, describe, expect, it, vi} from "vitest";
import {$AXIS} from "../../src/config/classes";
import util from "../assets/util";

describe("axis resize", () => {
	let chart;

	afterEach(() => {
		chart?.destroy();
		chart = null;
	});

	const generate = axis => util.generate({
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250]
			]
		},
		axis: {
			x: {
				tick: {
					culling: false,
					show: false,
					...axis?.x?.tick
				}
			}
		},
		transition: {
			duration: 0
		}
	});

	it("reuses unchanged x tick text on resize", () => {
		chart = generate();
		const beforeTicks = chart.internal.$el.axis.x.selectAll(".tick").nodes();
		const beforeTransform = beforeTicks[1].getAttribute("transform");

		const descriptor = Object.getOwnPropertyDescriptor(Node.prototype, "textContent");
		const setTickText = vi.fn();

		Object.defineProperty(Node.prototype, "textContent", {
			configurable: true,
			get: descriptor.get,
			set(value) {
				if (this.nodeName === "tspan" && this.closest?.(`.${$AXIS.axisX}`)) {
					setTickText(value);
				}

				return descriptor.set.call(this, value);
			}
		});

		try {
			chart.resize({width: 500, height: 360});
		} finally {
			Object.defineProperty(Node.prototype, "textContent", descriptor);
		}

		const afterTicks = chart.internal.$el.axis.x.selectAll(".tick").nodes();

		expect(afterTicks).to.deep.equal(beforeTicks);
		expect(afterTicks[1].getAttribute("transform")).not.to.be.equal(beforeTransform);
		expect(setTickText).not.toHaveBeenCalled();
	});

	it("keeps custom x tick formatter active on resize", () => {
		const format = vi.fn(v => `tick-${v}`);

		chart = generate({
			x: {
				tick: {
					format
				}
			}
		});
		format.mockClear();

		chart.resize({width: 500, height: 360});

		expect(format).toHaveBeenCalled();
	});
});
