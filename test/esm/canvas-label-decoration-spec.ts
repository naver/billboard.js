/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, afterEach, beforeAll, it, expect */
import {afterEach, beforeAll, describe, expect, it, vi} from "vitest";
import bb, {bar, canvas, line, treemap} from "../../src/index.canvas";

describe("ESM canvas data label decorations", () => {
	let chart;
	let container;

	beforeAll(() => {
		canvas();
		bar();
		line();
		treemap();
	});

	afterEach(() => {
		chart?.destroy();
		container?.remove();
		chart = null;
		container = null;
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	function generateWithOptions(options) {
		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		return (chart = bb.generate({
			bindto: container,
			render: {
				mode: canvas()
			},
			size: {
				width: 320,
				height: 240
			},
			data: {
				columns: [
					["data1", 30, 200],
					["data2", 50, 20]
				],
				type: bar(),
				labels: true
			},
			...options
		}));
	}

	function getTransformedRect(ctx, x, y, w, h) {
		const matrix = ctx.getTransform();

		return {
			x: (matrix.a * x) + (matrix.c * y) + matrix.e,
			y: (matrix.b * x) + (matrix.d * y) + matrix.f,
			w: matrix.a * w,
			h: matrix.d * h
		};
	}

	it("draws label backgrounds before canvas label text", () => {
		const calls = [];
		let boundApi;

		vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect").mockImplementation(function() {
			calls.push({type: "fillRect", style: String(this.fillStyle)});
		});
		vi.spyOn(CanvasRenderingContext2D.prototype, "fillText").mockImplementation(function(text) {
			calls.push({type: "text", text: String(text), style: String(this.fillStyle)});
		});

		generateWithOptions({
			data: {
				columns: [["data1", 30, 200]],
				type: bar(),
				labels: {
					backgroundColors(defaultColor, d) {
						boundApi = this;

						return d.index === 0 ? "rgb(10, 20, 30)" : null;
					}
				}
			}
		});

		const backgroundIndex = calls.findIndex(call =>
			call.type === "fillRect" && call.style === "#0a141e"
		);
		const textIndex = calls.findIndex(call => call.type === "text" && call.text === "30");

		expect(boundApi).to.equal(chart);
		expect(backgroundIndex).to.be.greaterThan(-1);
		expect(textIndex).to.be.greaterThan(-1);
		expect(backgroundIndex).to.be.lessThan(textIndex);
	});

	it("aligns bar label background bounds with SVG alphabetic baseline", () => {
		const rects = [];

		vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(x, y, w, h) {
				rects.push({
					style: String(this.fillStyle),
					rect: getTransformedRect(this, x, y, w, h)
				});
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, -200],
					["data2", -50, 150]
				],
				type: bar(),
				labels: {
					backgroundColors: "yellow",
					colors: "red"
				}
			}
		});

		const blueBars = rects.filter(({style}) => style === "#1f77b4");
		const yellowLabels = rects.filter(({style}) => style === "#ffff00");
		const positiveGap = blueBars[0].rect.y -
			(yellowLabels[0].rect.y + yellowLabels[0].rect.h);
		const negativeOverlap = (blueBars[1].rect.y + blueBars[1].rect.h) -
			yellowLabels[1].rect.y;

		expect(positiveGap).to.be.closeTo(1, 1);
		expect(negativeOverlap).to.be.closeTo(1, 1);
	});

	it("draws treemap label backgrounds before canvas label text", () => {
		const calls = [];

		vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect").mockImplementation(function() {
			calls.push({type: "fillRect", style: String(this.fillStyle)});
		});
		vi.spyOn(CanvasRenderingContext2D.prototype, "fillText").mockImplementation(function(text) {
			calls.push({type: "text", text: String(text), style: String(this.fillStyle)});
		});

		generateWithOptions({
			data: {
				columns: [
					["data1", 30],
					["data2", 20]
				],
				type: treemap(),
				labels: {
					backgroundColors: "yellow",
					colors: "#000"
				}
			},
			treemap: {
				label: {
					threshold: 0
				}
			}
		});

		const backgroundIndex = calls.findIndex(call =>
			call.type === "fillRect" && call.style === "#ffff00"
		);
		const textIndex = calls.findIndex(call => call.type === "text" && call.text === "data1");

		expect(backgroundIndex).to.be.greaterThan(-1);
		expect(textIndex).to.be.greaterThan(-1);
		expect(backgroundIndex).to.be.lessThan(textIndex);
	});

	it("draws label borders before canvas label text", () => {
		const calls = [];

		vi.spyOn(CanvasRenderingContext2D.prototype, "stroke").mockImplementation(function() {
			calls.push({type: "stroke", style: String(this.strokeStyle), lineWidth: this.lineWidth});
		});
		vi.spyOn(CanvasRenderingContext2D.prototype, "fillText").mockImplementation(function(text) {
			calls.push({type: "text", text: String(text)});
		});

		generateWithOptions({
			data: {
				columns: [["data1", 30, 200]],
				type: bar(),
				labels: {
					border: {
						padding: "4 6",
						radius: 8,
						stroke: "#c80a14",
						strokeWidth: 3
					}
				}
			}
		});

		const borderIndex = calls.findIndex(call =>
			call.type === "stroke" &&
			call.style === "#c80a14" &&
			call.lineWidth === 3
		);
		const textIndex = calls.findIndex(call => call.type === "text" && call.text === "30");

		expect(borderIndex).to.be.greaterThan(-1);
		expect(textIndex).to.be.greaterThan(-1);
		expect(borderIndex).to.be.lessThan(textIndex);
	});

	it("loads and draws label images before canvas label text", async () => {
		const calls = [];
		let loadImage;

		vi.stubGlobal("Image", class {
			onload = null;
			onerror = null;

			set src(value) {
				this._src = value;
				loadImage = () => this.onload?.();
			}

			get src() {
				return this._src;
			}
		});
		vi.spyOn(CanvasRenderingContext2D.prototype, "drawImage").mockImplementation(function(...args) {
			args.length === 5 && calls.push({type: "image"});
		});
		vi.spyOn(CanvasRenderingContext2D.prototype, "fillText").mockImplementation(function(text) {
			calls.push({type: "text", text: String(text)});
		});

		generateWithOptions({
			data: {
				columns: [["data1", 30]],
				type: bar(),
				labels: {
					image(v, id, i) {
						return {
							url: "/label-{=ID}.png",
							width: 10,
							height: 12,
							pos: {x: i, y: 2}
						};
					}
				}
			}
		});

		expect(calls.some(call => call.type === "image")).to.be.false;

		const xDomain = chart.internal.scale.x.domain().slice();

		loadImage();
		await Promise.resolve();

		const imageIndex = calls.findIndex(call => call.type === "image");
		const textIndex = calls.findIndex((call, index) =>
			index > imageIndex && call.type === "text" && call.text === "30"
		);

		expect(imageIndex).to.be.greaterThan(-1);
		expect(textIndex).to.be.greaterThan(-1);
		expect(imageIndex).to.be.lessThan(textIndex);
		expect(chart.internal.scale.x.domain()).to.deep.equal(xDomain);
	});

	it("does not warn for supported canvas label decoration options", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

		generateWithOptions({
			data: {
				columns: [["data1", 30, 200]],
				type: line(),
				labels: {
					backgroundColors: {
						data1: "rgb(10, 20, 30)"
					},
					border: true,
					image: {
						url: "/label-{=ID}.png",
						width: 10,
						height: 12
					}
				}
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");

		expect(messages).not.to.contain("data.labels.backgroundColors");
		expect(messages).not.to.contain("data.labels.border");
		expect(messages).not.to.contain("data.labels.image");
	});
});
