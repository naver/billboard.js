/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, afterEach, beforeAll, it, expect */
import {afterEach, beforeAll, describe, expect, it, vi} from "vitest";
import bb, {bar, canvas, category, line, treemap} from "../../src/index.canvas";

describe("ESM canvas axis and title", () => {
	let chart;
	let container;

	beforeAll(() => {
		canvas();
		bar();
		category();
		line();
		treemap();
	});

	afterEach(() => {
		chart?.destroy();
		container?.remove();
		chart = null;
		container = null;
		vi.restoreAllMocks();
	});

	function generateWithOptions(options) {
		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:360px;height:260px;";
		document.body.appendChild(container);

		return (chart = bb.generate({
			bindto: container,
			render: {
				mode: canvas()
			},
			size: {
				width: 360,
				height: 260
			},
			data: {
				columns: [
					["data1", 30, 200, 100],
					["data2", 50, 20, 10]
				],
				type: line()
			},
			...options
		}));
	}

	it("draws title text on canvas and reserves top padding", () => {
		const titleRecords: Array<{baseline: string, y: number}> = [];
		const fillText = vi
			.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(text, _x, y) {
				if (text === "Canvas Title") {
					titleRecords.push({
						baseline: this.textBaseline,
						y: Number(y)
					});
				}
			});

		generateWithOptions({});
		const topWithoutTitle = chart.internal.state.margin.top;

		chart.destroy();
		container.remove();
		chart = null;
		container = null;

		generateWithOptions({
			title: {
				text: "Canvas Title",
				padding: {
					top: 8,
					bottom: 6
				}
			}
		});

		expect(fillText.mock.calls.some(([text]) => text === "Canvas Title")).to.be.true;
		expect(titleRecords[0]?.baseline).to.be.equal("alphabetic");
		expect(titleRecords[0]?.y).to.be.closeTo(
			8 + chart.internal.getCanvasTitleHeight(),
			0.1
		);
		expect(chart.internal.state.margin.top).to.be.greaterThan(topWithoutTitle);
	});

	it("draws x, y and y2 axis labels on canvas", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100],
					["data2", 50, 20, 10]
				],
				axes: {
					data2: "y2"
				},
				type: line()
			},
			axis: {
				x: {
					label: "X Axis"
				},
				y: {
					label: "Y Axis"
				},
				y2: {
					show: true,
					label: "Y2 Axis"
				}
			}
		});

		const texts = fillText.mock.calls.map(([text]) => text);

		expect(texts).to.contain("X Axis");
		expect(texts).to.contain("Y Axis");
		expect(texts).to.contain("Y2 Axis");
	});

	it("uses CSS fill colors for each canvas axis label", () => {
		const records: Array<{text: string, fillStyle: string}> = [];
		const originalFillText = CanvasRenderingContext2D.prototype.fillText;
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(text, ...args) {
				records.push({
					text: String(text),
					fillStyle: String(this.fillStyle)
				});

				return originalFillText.call(this, text, ...args);
			});
		const style = document.createElement("style");

		style.textContent = `
			.bb-axis-x-label { fill: rgb(1, 2, 3); }
			.bb-axis-y-label { fill: rgb(4, 5, 6); }
			.bb-axis-y2-label { fill: rgb(7, 8, 9); }
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 50, 20, 10]
					],
					axes: {
						data2: "y2"
					},
					type: line()
				},
				axis: {
					x: {
						label: "X Axis"
					},
					y: {
						label: "Y Axis"
					},
					y2: {
						show: true,
						label: "Y2 Axis"
					}
				}
			});
		} finally {
			style.remove();
		}

		const labelFillStyle = text => records.find(record => record.text === text)?.fillStyle;

		expect(labelFillStyle("X Axis")).to.be.equal("#010203");
		expect(labelFillStyle("Y Axis")).to.be.equal("#040506");
		expect(labelFillStyle("Y2 Axis")).to.be.equal("#070809");

		fillText.mockRestore();
	});

	it("positions rotated canvas axis labels like SVG axis label transforms", () => {
		const records: Array<{text: string, absX: number, absY: number}> = [];
		const originalFillText = CanvasRenderingContext2D.prototype.fillText;
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(text, x, y, ...args) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					absX: transform.a * Number(x) + transform.c * Number(y) + transform.e,
					absY: transform.b * Number(x) + transform.d * Number(y) + transform.f
				});

				return originalFillText.call(this, text, x, y, ...args);
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100],
					["data2", 50, 20, 10]
				],
				axes: {
					data2: "y2"
				},
				type: line()
			},
			axis: {
				x: {
					label: {
						text: "X Axis",
						position: "outer-center"
					}
				},
				y: {
					label: {
						text: "Y Axis",
						position: "outer-middle"
					}
				},
				y2: {
					show: true,
					label: {
						text: "Y2 Axis",
						position: "outer-middle"
					}
				}
			}
		});

		const {margin, width, height} = chart.internal.state;
		const getRecord = text => records.find(record => record.text === text)!;
		const xLabel = getRecord("X Axis");
		const yLabel = getRecord("Y Axis");
		const y2Label = getRecord("Y2 Axis");
		const verticalLabelY = margin.top + (height / 2);

		expect(xLabel.absX).to.be.closeTo(margin.left + (width / 2), 1);
		expect(xLabel.absY).to.be.greaterThan(margin.top + height);
		expect(yLabel.absX).to.be.greaterThan(0);
		expect(yLabel.absX).to.be.lessThan(margin.left);
		expect(yLabel.absY).to.be.closeTo(verticalLabelY, 1);
		expect(y2Label.absX).to.be.greaterThan(margin.left + width);
		expect(y2Label.absY).to.be.closeTo(verticalLabelY, 1);

		fillText.mockRestore();
	});

	it("adds horizontal padding to the canvas x-axis tick text clip", () => {
		const records: Array<{x: number, y: number, w: number, h: number}> = [];
		const originalRect = CanvasRenderingContext2D.prototype.rect;
		const rect = vi.spyOn(CanvasRenderingContext2D.prototype, "rect")
			.mockImplementation(function(x, y, w, h, ...args) {
				records.push({x, y, w, h});

				return originalRect.call(this, x, y, w, h, ...args);
			});

		generateWithOptions({
			axis: {
				x: {
					tick: {
						format: value => `${value}`
					}
				}
			}
		});

		const {current, margin, width} = chart.internal.state;

		expect(records.some(record =>
			record.x === margin.left - 20 &&
			record.y === 0 &&
			record.w === width + 40 &&
			record.h === current.height
		)).to.be.true;

		rect.mockRestore();
	});

	it("adds vertical padding to the rotated canvas x-axis tick text clip", () => {
		const records: Array<{x: number, y: number, w: number, h: number}> = [];
		const originalRect = CanvasRenderingContext2D.prototype.rect;
		const rect = vi.spyOn(CanvasRenderingContext2D.prototype, "rect")
			.mockImplementation(function(x, y, w, h, ...args) {
				records.push({x, y, w, h});

				return originalRect.call(this, x, y, w, h, ...args);
			});

		generateWithOptions({
			axis: {
				rotated: true,
				x: {
					tick: {
						format: value => `${value}`
					}
				}
			}
		});

		const {current, height, margin} = chart.internal.state;

		expect(records.some(record =>
			record.x === 0 &&
			record.y === margin.top - 15 &&
			record.w === current.width &&
			record.h === height + 30
		)).to.be.true;

		rect.mockRestore();
	});

	it("draws title text on non-axis canvas charts", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			title: {
				text: "Treemap Title"
			},
			data: {
				columns: [
					["data1", 30],
					["data2", 50]
				],
				type: treemap()
			}
		});

		expect(fillText.mock.calls.some(([text]) => text === "Treemap Title")).to.be.true;
	});

	it("draws rotated and width-wrapped x tick text on canvas", () => {
		const rotate = vi.spyOn(CanvasRenderingContext2D.prototype, "rotate");
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100]
				],
				type: bar()
			},
			axis: {
				x: {
					type: "category",
					categories: [
						"Long category one",
						"Long category two",
						"Long category three"
					],
					tick: {
						rotate: 45,
						width: 44,
						multiline: true
					}
				}
			}
		});

		expect(rotate.mock.calls.some(([angle]) =>
			Math.abs(angle - (45 * Math.PI / 180)) < 0.001
		)).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "Long")).to.be.true;
	});
});
