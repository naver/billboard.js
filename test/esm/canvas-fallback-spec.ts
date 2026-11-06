/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// the svg modules of the ESM entry, with the canvas engine of the canvas entry:
// a type whose canvas part is not imported can not be drawn on canvas
import {afterEach, describe, expect, it, vi} from "vitest";
import * as svgEsm from "../../src/index.esm";
import {canvas} from "../../src/index.canvas";

describe("ESM canvas mode with the svg modules", () => {
	let chart;
	let container;

	afterEach(() => {
		chart?.destroy();
		container?.remove();
		chart = null;
		container = null;
	});

	function generate(type, extra = {}) {
		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		return (chart = svgEsm.bb.generate({
			bindto: container,
			size: {width: 320, height: 240},
			render: {mode: canvas()},
			data: {columns: [["data1", 30]], type},
			...extra
		}));
	}

	it("should fall back to SVG with a warning for a type whose canvas module is not imported", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

		try {
			generate(svgEsm.bullet(), {bullet: {ranges: [100]}});

			const messages = warn.mock.calls.map(([message]) => String(message)).join("\n");

			expect(messages).to.contain("render.mode='canvas' is ignored for bullet chart");
			expect(messages).to.contain("falling back to SVG");
		} finally {
			warn.mockRestore();
		}

		expect(chart.internal.config.render_mode).to.be.equal("svg");
		expect(container.querySelector("canvas")).to.be.null;
		// the chart is drawn, not left blank
		expect(container.querySelectorAll(".bb-bullet-measure").length).to.be.equal(1);
	});

	it("should keep the canvas mode for a type the canvas engine draws by itself", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

		try {
			generate(svgEsm.bar());

			expect(warn).not.toHaveBeenCalled();
		} finally {
			warn.mockRestore();
		}

		expect(chart.internal.config.render_mode).to.be.equal("canvas");
		expect(container.querySelector("canvas")).to.not.be.null;
	});
});
