/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// the types of the canvas entry have no part for the svg mode: the error says what is missing
import {afterEach, describe, expect, it, vi} from "vitest";
import {bar, bb, bullet, canvas, line, treemap} from "../../src/index.canvas";

describe("ESM canvas entry modules in the svg mode", () => {
	let container;

	afterEach(() => {
		container?.remove();
		container = null;
	});

	function generate(type, extra = {}) {
		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		return bb.generate({
			bindto: container,
			size: {width: 320, height: 240},
			data: {columns: [["data1", 30]], type},
			...extra
		});
	}

	const missing = {
		bar: ["updateTargetsForBar", bar],
		line: ["generatePoint", line],
		bullet: ["initBullet", bullet],
		treemap: ["updateTargetsForTreemap", treemap]
	};

	Object.keys(missing).forEach(name => {
		const [method, type] = missing[name];

		it(`${name}: tells the method of the svg part that is not there, and how to use the module`, () => {
			const error = vi.spyOn(console, "error").mockImplementation(() => {});
			const info = vi.spyOn(console, "info").mockImplementation(() => {});
			let message = "";
			let logged = {error: "", info: ""};

			try {
				generate(type());
			} catch (e) {
				message = e.message;
			} finally {
				// (the calls are gone after the restore)
				logged = {error: String(error.mock.calls[0]?.[0]), info: String(info.mock.calls[0])};
				error.mockRestore();
				info.mockRestore();
			}

			expect(message).to.contain("[billboard.js]");
			expect(message).to.contain(`'${method}' is imported for render.mode='svg'`);
			expect(message).to.contain("billboard.js/canvas");
			// not the error of the runtime, that tells nothing
			expect(message).to.not.contain("is not a function");
			// the styled message and the link are logged to the console, as for the other module errors
			expect(logged.error).to.contain(method);
			expect(logged.info).to.contain("MODULE_IMPORTS.md");
		});

		it(`${name}: draws in the canvas mode`, () => {
			const chart = generate(type(), {render: {mode: canvas()}});

			expect(container.querySelector("canvas")).to.not.be.null;
			chart.destroy();
		});
	});

});
