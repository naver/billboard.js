/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeAll, afterEach, it, expect */
import {timeMinute as d3TimeMinute} from "d3-time";
import {afterEach, beforeAll, describe, expect, it, vi} from "vitest";
import bb, {
	area,
	areaLineRange,
	areaSpline,
	areaSplineRange,
	areaStep,
	areaStepRange,
	bar,
	bubble,
	canvas,
	candlestick,
	category,
	exportApi,
	flow,
	grid,
	line,
	regions,
	scatter,
	selection,
	spline,
	subchart,
	step,
	treemap,
	zoom
} from "../../src/index.canvas";
import {$CANVAS} from "../../src/canvas/classes";
import CanvasTheme from "../../src/canvas/CanvasTheme";
import {$AXIS, $COMMON, $FOCUS, $LEGEND} from "../../src/config/classes";
import {AXIS_TICK_PADDING, AXIS_TICK_SIZE, TYPE} from "../../src/config/const";
import {funnel, pie} from "../../src/config/resolver/shape";

describe("ESM canvas", function() {
	let chart;
	let container;

	const columns = [
		["data1", 30, 200, 100, 400],
		["data2", 50, 20, 10, 40]
	];
	const candlestickColumns = [
		["data1", [1327, 1369, 1289, 1348], [1348, 1418, 1305, 1399]]
	];
	const rangeColumns = [
		["data1", [150, 140, 110], [155, 130, 115], [160, 135, 120], [135, 120, 110]],
		["data2", [130, 120, 90], [140, 115, 100], [150, 125, 100], [125, 110, 90]]
	];

	beforeAll(() => {
		canvas();
		category();
		exportApi();
		flow();
		grid();
		regions();
		selection();
		subchart();
		zoom();
	});

	afterEach(() => {
		chart?.destroy();
		container?.remove();
		chart = null;
		container = null;
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
			...options
		}));
	}

	function generate(type, dataColumns = columns) {
		return generateWithOptions({
			data: {
				columns: dataColumns,
				type
			}
		});
	}

	function generateColumns(seriesCount, pointCount) {
		return Array.from({length: seriesCount}, (_, i) => [
			`data${i + 1}`,
			...Array.from({length: pointCount}, (v, j) => (i + 1) * 20 + j)
		]);
	}

	function getCanvasPoint(point, rotated) {
		return rotated ? [point[1], point[0]] : [point[0], point[1]];
	}

	function getCanvasRectCenter(points, rotated) {
		const canvasPoints = points.map(point => getCanvasPoint(point, rotated));
		const xs = canvasPoints.map(([x]) => x);
		const ys = canvasPoints.map(([, y]) => y);

		return {
			x: Math.min(...xs) + (Math.max(...xs) - Math.min(...xs)) / 2,
			y: Math.min(...ys) + (Math.max(...ys) - Math.min(...ys)) / 2
		};
	}

	function normalizeCanvasColor(color) {
		const ctx = document.createElement("canvas").getContext("2d");

		ctx.strokeStyle = color;

		return String(ctx.strokeStyle);
	}

	function getPngSize(dataUrl) {
		const bytes = Uint8Array.from(atob(dataUrl.split(",")[1]), c => c.charCodeAt(0));
		const view = new DataView(bytes.buffer);

		return {
			width: view.getUint32(16),
			height: view.getUint32(20)
		};
	}

	function getCrisp(value, lineWidth) {
		return lineWidth % 2 ? Math.round(value) + 0.5 : Math.round(value);
	}

	function getTranslatedCrisp(value, offset, lineWidth) {
		return getCrisp(offset + value, lineWidth) - offset;
	}

	function countCanvasAlphaPixels(canvas) {
		const ctx = canvas.getContext("2d");
		const image = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		let pixels = 0;

		for (let i = 3; i < image.length; i += 4) {
			image[i] > 0 && pixels++;
		}

		return pixels;
	}

	function getCanvasSubchartClientPoint(coord, crossRatio = 0.5) {
		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin2, width2, height2} = internal.state;

		return internal.config.axis_rotated ?
			{
				x: rect.left + margin2.left + width2 * crossRatio,
				y: rect.top + margin2.top + coord
			} :
			{
				x: rect.left + margin2.left + coord,
				y: rect.top + margin2.top + height2 * crossRatio
			};
	}

	function dragCanvasSubchart(startCoord, endCoord, crossRatio = 0.5) {
		const canvas = chart.$.canvas.node();
		const start = getCanvasSubchartClientPoint(startCoord, crossRatio);
		const end = getCanvasSubchartClientPoint(endCoord, crossRatio);

		canvas.dispatchEvent(new MouseEvent("mousedown", {
			bubbles: true,
			clientX: start.x,
			clientY: start.y
		}));
		window.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: end.x,
			clientY: end.y
		}));
		window.dispatchEvent(new MouseEvent("mouseup", {
			bubbles: true,
			clientX: end.x,
			clientY: end.y
		}));
	}

	const chartCases: Array<[string, () => string, any[]?]> = [
		["bar", bar],
		["line", line],
		["spline", spline],
		["step", step],
		["area", area],
		["area-line-range", areaLineRange, rangeColumns],
		["area-spline", areaSpline],
		["area-spline-range", areaSplineRange, rangeColumns],
		["area-step", areaStep],
		["area-step-range", areaStepRange, rangeColumns],
		["scatter", scatter],
		["bubble", bubble],
		["candlestick", candlestick, candlestickColumns],
		["treemap", treemap]
	];

	chartCases.forEach(([name, resolver, dataColumns]) => {
		it(`should render ${name} chart with a single canvas only`, () => {
			const chart = generate(resolver(), dataColumns);
			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);

			expect(canvasEl).to.not.be.null;
			expect(canvasEl).to.equal(chart.$.canvas.node());
			expect(container.querySelectorAll("canvas")).to.have.length(1);
			expect(container.querySelector("svg")).to.be.null;
			expect(container.querySelector(".bb-event-overlay")).to.be.null;
			if (name === "treemap") {
				expect(container.querySelector(".bb-legend")).to.be.null;
			} else {
				expect(container.querySelector(".bb-legend")).to.not.be.null;
			}
			expect(chart.internal.state.isCanvasMode).to.be.true;
		});
	});

	it("should fall back to SVG for chart types unsupported by canvas mode", () => {
		const unsupportedCases: Array<[() => string, string]> = [
			[pie, "arc charts"],
			[funnel, "funnel chart"]
		];

		unsupportedCases.forEach(([resolver, warningText]) => {
			const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
			const currentChart = generate(resolver());
			const currentContainer = container;

			expect(currentChart.internal.config.render_mode).to.equal("svg");
			expect(currentChart.internal.state.isCanvasMode).to.be.false;
			expect(container.querySelector(`canvas.${$CANVAS.canvas}`)).to.be.null;
			expect(container.querySelector("svg")).to.not.be.null;
			expect(warning).toHaveBeenCalledWith(
				expect.stringContaining(warningText)
			);

			warning.mockRestore();
			currentChart.destroy();
			currentContainer.remove();
			chart = null;
			container = null;
		});
	});

	it("should keep the canvas surface in normal flow", () => {
		generate(line());

		const canvasEl = chart.$.canvas.node();

		expect(canvasEl.style.display).to.be.equal("block");
		expect(canvasEl.style.position).to.be.equal("");
		expect(canvasEl.style.top).to.be.equal("");
		expect(canvasEl.style.left).to.be.equal("");
		expect(canvasEl.style.zIndex).to.be.equal("");
	});

	it("should not create SVG structural nodes or generated shape classes in canvas mode", () => {
		generateWithOptions({
			data: {
				columns,
				labels: true,
				type: bar()
			},
			grid: {
				x: {
					show: true
				},
				y: {
					show: true
				}
			}
		});

		expect(container.querySelector(`canvas.${$CANVAS.canvas}`)).to.not.be.null;
		expect(container.querySelector("svg")).to.be.null;
		expect(container.querySelector(".bb-main")).to.be.null;
		expect(container.querySelector(".bb-axis")).to.be.null;
		expect(container.querySelector(".tick")).to.be.null;
		expect(container.querySelector(".bb-target")).to.be.null;
		expect(container.querySelector(".bb-shape")).to.be.null;
		expect(container.querySelector(".bb-bar")).to.be.null;
		expect(container.querySelector(".bb-text")).to.be.null;
	});

	it("should draw canvas data over the x axis when clipPath is false", () => {
		const clipRects: Array<{x: number, y: number, w: number, h: number}> = [];
		const pointArcs: Array<{r: number, y: number}> = [];
		const originalRect = CanvasRenderingContext2D.prototype.rect;
		const originalClip = CanvasRenderingContext2D.prototype.clip;
		const originalArc = CanvasRenderingContext2D.prototype.arc;
		let currentRect: {x: number, y: number, w: number, h: number} | null = null;
		const rect = vi.spyOn(CanvasRenderingContext2D.prototype, "rect")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				w: number,
				h: number
			) {
				currentRect = {x, y, w, h};

				return originalRect.call(this, x, y, w, h);
			});
		const clip = vi.spyOn(CanvasRenderingContext2D.prototype, "clip")
			.mockImplementation(function(this: CanvasRenderingContext2D, ...args) {
				currentRect && clipRects.push(currentRect);
				currentRect = null;

				return originalClip.apply(this, args as []);
			});
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				r: number,
				startAngle: number,
				endAngle: number,
				counterclockwise?: boolean
			) {
				if (r === 5) {
					pointArcs.push({r, y});
				}

				return originalArc.call(this, x, y, r, startAngle, endAngle, counterclockwise);
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["sample", 30, 200, 0, 400, 0, 250]
					],
					type: line()
				},
				axis: {
					y: {
						padding: {
							bottom: 0
						}
					}
				},
				point: {
					r: 5
				},
				clipPath: false
			});

			const {height, margin, width} = chart.internal.state;
			const hasMainPlotClip = clipRects.some(rect =>
				Math.abs(rect.x - margin.left) < 0.1 &&
				Math.abs(rect.y - margin.top) < 0.1 &&
				Math.abs(rect.w - width) < 0.1 &&
				Math.abs(rect.h - height) < 0.1
			);
			const bottomPoint = pointArcs.find(({r, y}) =>
				Math.abs(y - height) < 0.1 && y + r > height
			);

			expect(hasMainPlotClip).to.be.false;
			expect(bottomPoint).not.to.be.undefined;
		} finally {
			arc.mockRestore();
			clip.mockRestore();
			rect.mockRestore();
		}
	});

	it("should restore canvas min-height on destroy", () => {
		chart = generate(line());

		expect(container.style.minHeight).to.be.equal("240px");

		chart.destroy();
		chart = null;

		expect(container.style.minHeight).to.be.equal("");
		expect(container.getBoundingClientRect().height).to.be.equal(240);

		const height = container.getBoundingClientRect().height;

		chart = bb.generate({
			bindto: container,
			render: {
				mode: canvas()
			},
			size: {
				width: 320,
				height
			},
			data: {
				columns,
				type: line()
			}
		});

		expect(chart.$.canvas.node().style.height)
			.to.be.equal(`${chart.internal.getCanvasSurfaceHeight()}px`);
	});

	it("should sample large canvas x tick measurements", () => {
		let dummyXAxisTickInserts = 0;
		const insertBefore = SVGElement.prototype.insertBefore;

		vi.spyOn(SVGElement.prototype, "insertBefore").mockImplementation(function(
			node,
			child
		) {
			if (
				this.classList?.contains($AXIS.axisX) &&
				this.classList?.contains($COMMON.dummy) &&
				(node as SVGElement).tagName.toLowerCase() === "g"
			) {
				dummyXAxisTickInserts++;
			}

			return insertBefore.call(this, node, child);
		});

		const x: any[] = ["x"];
		const data: any[] = ["data1"];

		for (let i = 0; i < 2000; i++) {
			x.push(i);
			data.push(i % 100);
		}

		chart = generateWithOptions({
			data: {
				x: "x",
				columns: [x, data],
				type: scatter()
			}
		});

		const tickWidths = chart.internal.state.current.maxTickSize.x.ticks;

		expect(tickWidths).to.have.length(2000);
		expect(Object.keys(tickWidths).length).to.be.lessThan(100);
		expect(dummyXAxisTickInserts).to.be.lessThan(100);
	});

	it("should cull duplicate pixel centers for dense scatter point drawing", () => {
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc");
		const data: any[] = ["data1"];
		const pointCount = 100001;

		for (let i = 0; i < pointCount; i++) {
			data.push(i % 20);
		}

		chart = generateWithOptions({
			data: {
				columns: [data],
				type: scatter()
			}
		});

		expect(chart.internal.data.targets[0].values).to.have.length(pointCount);
		expect(arc.mock.calls.length).to.be.lessThan(pointCount / 2);

		arc.mockRestore();
	});

	it("should render canvas legend contents template into bindto with interactions", () => {
		const legendElement = document.createElement("div");

		document.body.appendChild(legendElement);

		try {
			chart = generateWithOptions({
				data: {
					columns,
					type: line()
				},
				legend: {
					contents: {
						bindto: legendElement,
						template: "<span style='color:{=COLOR}'>{=TITLE}</span>"
					}
				}
			});

			const item = legendElement.querySelector(".bb-legend-item-data1") as HTMLElement;

			expect(chart.$.legend.node()).to.be.equal(legendElement);
			expect(legendElement.textContent).to.contain("data1");
			expect(legendElement.textContent).to.contain("data2");
			expect(legendElement.classList.contains($CANVAS.legend)).to.be.false;
			expect(chart.internal.state.legendItemWidth).to.be.equal(0);
			expect(chart.internal.state.legendItemHeight).to.be.equal(0);

			item.dispatchEvent(new MouseEvent("click", {bubbles: true}));

			expect(chart.internal.state.hiddenTargetIds.has("data1")).to.be.true;
		} finally {
			legendElement.remove();
		}
	});

	it("should use canvas hover handlers for legend contents function template", () => {
		const legendElement = document.createElement("div");

		document.body.appendChild(legendElement);

		try {
			chart = generateWithOptions({
				data: {
					columns: [
						["data1", 100, 180, 140, 220],
						["data2", 300, 240, 280, 180],
						["data3", 200, 120, 160, 260]
					],
					type: line()
				},
				legend: {
					contents: {
						bindto: legendElement,
						template(id, color) {
							return id === "data2" ?
								"" :
								`<span style="background-color:${color};padding:10px">${id}</span>`;
						}
					}
				}
			});

			const item = legendElement.querySelector(".bb-legend-item-data1") as HTMLElement;

			expect(legendElement.querySelector(".bb-legend-item-data2")).to.be.null;
			expect(() => item.dispatchEvent(new MouseEvent("mouseover", {bubbles: true})))
				.not.toThrow();
			expect(item.classList.contains($FOCUS.legendItemFocused)).to.be.true;

			item.dispatchEvent(new MouseEvent("mouseout", {bubbles: true}));

			expect(item.classList.contains($FOCUS.legendItemFocused)).to.be.false;
		} finally {
			legendElement.remove();
		}
	});

	it("should apply hover opacity to other canvas template legend items", () => {
		const legendElement = document.createElement("div");

		document.body.appendChild(legendElement);

		try {
			chart = generateWithOptions({
				data: {
					columns,
					type: line()
				},
				legend: {
					contents: {
						bindto: legendElement,
						template: "<span>{=TITLE}</span>"
					}
				}
			});

			const item1 = legendElement.querySelector(".bb-legend-item-data1") as HTMLElement;
			const item2 = legendElement.querySelector(".bb-legend-item-data2") as HTMLElement;

			item1.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));

			expect(item1.classList.contains($FOCUS.legendItemFocused)).to.be.true;
			expect(item1.style.opacity).to.be.equal("");
			expect(item2.style.opacity).to.be.equal("0.3");

			item1.dispatchEvent(new MouseEvent("mouseout", {bubbles: true}));

			expect(item1.classList.contains($FOCUS.legendItemFocused)).to.be.false;
			expect(item2.style.opacity).to.be.equal("");
		} finally {
			legendElement.remove();
		}
	});

	it("should measure and wrap canvas template legend size when requested", () => {
		const legendElement = document.createElement("div");

		document.body.appendChild(legendElement);

		try {
			chart = generateWithOptions({
				data: {
					columns: [
						["data1", 100, 180, 140],
						["data2", 300, 240, 280],
						["data3", 200, 120, 160]
					],
					names: {
						data1: "Long template legend data 1",
						data2: "Long template legend data 2",
						data3: "Long template legend data 3"
					},
					type: line()
				},
				legend: {
					contents: {
						bindto: legendElement,
						template: "<span style='display:inline-block;width:180px;height:22px'>{=TITLE}</span>"
					}
				}
			});

			chart.internal.updateHtmlLegendSize(["data1", "data2", "data3"]);

			expect(chart.internal.state.legendItemWidth).to.be.equal(180);
			expect(chart.internal.state.legendItemHeight).to.be.equal(22);
			expect(chart.internal.state.legendStep).to.be.greaterThan(0);
		} finally {
			legendElement.remove();
		}
	});

	it("should sanitize canvas legend contents function template", () => {
		const legendElement = document.createElement("div");
		let templateThis;

		document.body.appendChild(legendElement);

		try {
			chart = generateWithOptions({
				data: {
					columns,
					type: line()
				},
				legend: {
					contents: {
						bindto: legendElement,
						template: function(id, color, values) {
							templateThis = this;

							expect(color).to.be.a("string");
							expect(values).to.be.an("array");

							return `<span onclick="alert(1)" style="color:${color}"><script>alert(1)</script>${id}</span>`;
						}
					}
				}
			});

			expect(templateThis).to.be.equal(chart);
			expect(legendElement.innerHTML).to.not.contain("<script>");
			expect(legendElement.innerHTML).to.not.contain("onclick");
			expect(legendElement.textContent).to.contain("data1");
		} finally {
			legendElement.remove();
		}
	});

	it("should render canvas legend usePoint tiles with point patterns", () => {
		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 130, 100, 200, 100],
					["data3", 60, 190, 320, 520],
					["data4", 80, 20, 250, 320]
				],
				type: line()
			},
			point: {
				pattern: [
					"circle",
					"rectangle",
					"<polygon points='4 0 0 8 8 8'></polygon>",
					"<polygon points='4 0 0 4 4 8 8 4 4 0'></polygon>"
				]
			},
			legend: {
				usePoint: true
			}
		});

		const tiles = Array.from(
			container.querySelectorAll(`.${$LEGEND.legendItemTile} svg`)
		) as SVGSVGElement[];

		expect(tiles).to.have.length(4);
		expect(tiles[0].querySelector("circle")).not.to.be.null;
		expect(tiles[1].querySelector("rect")).not.to.be.null;
		expect(tiles[2].querySelector("polygon")?.getAttribute("points"))
			.to.be.equal("4 0 0 8 8 8");
		expect(tiles[3].querySelector("polygon")?.getAttribute("points"))
			.to.be.equal("4 0 0 4 4 8 8 4 4 0");
		expect(tiles.every(svg => svg.parentElement?.style.backgroundColor === "")).to.be.true;
	});

	it("should draw step and area range derived types on canvas", () => {
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill");

		generate(step());

		expect(lineTo).toHaveBeenCalled();

		chart.destroy();
		container.remove();
		chart = null;
		container = null;
		lineTo.mockClear();
		fill.mockClear();

		generate(areaLineRange(), rangeColumns);

		expect(lineTo).toHaveBeenCalled();
		expect(fill).toHaveBeenCalled();

		chart.destroy();
		container.remove();
		chart = null;
		container = null;
		lineTo.mockClear();
		fill.mockClear();

		generate(areaStepRange(), rangeColumns);

		expect(lineTo).toHaveBeenCalled();
		expect(fill).toHaveBeenCalled();

		lineTo.mockRestore();
		fill.mockRestore();
	});

	it("should honor line step type options on canvas step charts", () => {
		(["step-before", "step-after"] as const).forEach(stepType => {
			const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");
			const generatedChart = generateWithOptions({
				data: {
					columns,
					type: step()
				},
				line: {
					step: {
						type: stepType
					}
				},
				axis: {
					x: {
						show: false
					},
					y: {
						show: false
					}
				},
				legend: {
					show: false
				},
				point: {
					show: false
				}
			});

			expect(generatedChart.internal.config.line_step_type).to.be.equal(stepType);
			expect(generatedChart.internal.getInterpolateType(generatedChart.internal.data.targets[0])).to.be.equal(
				stepType
			);
			expect(lineTo).toHaveBeenCalled();
			expect(container.querySelectorAll("canvas")).to.have.length(1);
			expect(container.querySelector("svg")).to.be.null;

			lineTo.mockRestore();
			generatedChart.destroy();
			container.remove();
			chart = null;
			container = null;
		});
	});

	it("should draw scatter and bubble points on canvas", () => {
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc");

		generate(scatter());
		expect(arc).toHaveBeenCalled();

		chart.destroy();
		container.remove();
		arc.mockClear();
		generate(bubble());

		expect(arc).toHaveBeenCalled();
		expect(chart.internal.getBubbleR).to.be.a("function");

		arc.mockRestore();
	});

	it("should draw candlesticks on canvas", () => {
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");
		const strokeRectRecords: Array<{lineWidth: number, strokeStyle: string}> = [];
		const originalStrokeRect = CanvasRenderingContext2D.prototype.strokeRect;
		const strokeRect = vi.spyOn(CanvasRenderingContext2D.prototype, "strokeRect")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				w: number,
				h: number
			) {
				strokeRectRecords.push({
					lineWidth: this.lineWidth,
					strokeStyle: String(this.strokeStyle)
				});

				return originalStrokeRect.call(this, x, y, w, h);
			});

		generate(candlestick(), candlestickColumns);

		expect(fillRect).toHaveBeenCalled();
		expect(lineTo).toHaveBeenCalled();
		expect(strokeRectRecords.some(({lineWidth, strokeStyle}) =>
			lineWidth === chart.internal.canvasTheme.style.shape.candlestickLineWidth &&
			strokeStyle === normalizeCanvasColor(
				chart.internal.canvasTheme.style.shape.candlestickStrokeColor
			)
		)).to.be.true;

		strokeRect.mockRestore();
		fillRect.mockRestore();
		lineTo.mockRestore();
	});

	it("should draw x focus grid line on canvas candlestick hover", () => {
		const strokeRecords: Array<{lineWidth: number, strokeStyle: string}> = [];
		const originalStroke = CanvasRenderingContext2D.prototype.stroke;
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D, ...args) {
				strokeRecords.push({
					lineWidth: this.lineWidth,
					strokeStyle: String(this.strokeStyle)
				});

				return originalStroke.apply(this, args as []);
			});

		generate(candlestick(), candlestickColumns);

		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
		const rect = canvasEl.getBoundingClientRect();
		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[0];
		const indices = chart.internal.getShapeIndices(chart.internal.isCandlestickType);
		const points = chart.internal.generateGetCandlestickPoints(indices, false)(d, 0);
		const center = getCanvasRectCenter([points[0], points[1]], false);
		const focusGrid = chart.internal.canvasTheme.style.focusGrid;
		const focusGridColor = normalizeCanvasColor(focusGrid.lineColor);

		strokeRecords.length = 0;
		canvasEl.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: rect.left + margin.left + center.x,
			clientY: rect.top + margin.top + center.y
		}));

		expect(strokeRecords.some(({lineWidth, strokeStyle}) =>
			lineWidth === focusGrid.lineWidth &&
			strokeStyle === focusGridColor
		)).to.be.true;

		stroke.mockRestore();
	});

	it("should draw treemap tiles on canvas without unsupported warnings", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generate(treemap());

		const messages = warn.mock.calls.map(([message]) => message).join("\n");

		expect(messages).not.to.contain("treemap chart");
		expect(fillRect).toHaveBeenCalled();
		expect(fillText).toHaveBeenCalled();
		expect(container.querySelector(".bb-legend")).to.be.null;

		fillText.mockRestore();
		fillRect.mockRestore();
		warn.mockRestore();
	});

	it("should not enable zoom on canvas treemap", () => {
		generate(treemap());

		expect(() => chart.zoom()).to.not.throw();
		expect(chart.zoom()).to.be.undefined;

		chart.zoom.enable(true);

		expect(chart.internal.config.zoom_enabled).to.be.false;
		expect(chart.internal.zoom).to.be.undefined;
	});

	it("should redraw and update legend state when target visibility toggles through API", () => {
		const chart = generate(line());
		const {state} = chart.internal;
		const initialRedraw = state.redrawGeneration;
		const legendItem = container.querySelector("button[data-id='data1']");

		expect(legendItem).to.not.be.null;
		expect(state.hiddenTargetIds.has("data1")).to.be.false;

		chart.toggle("data1");

		expect(state.hiddenTargetIds.has("data1")).to.be.true;
		expect(legendItem.classList.contains("bb-legend-item-hidden")).to.be.true;
		expect(state.redrawGeneration).to.be.greaterThan(initialRedraw);

		const hiddenRedraw = state.redrawGeneration;

		chart.toggle("data1");

		expect(state.hiddenTargetIds.has("data1")).to.be.false;
		expect(legendItem.classList.contains("bb-legend-item-hidden")).to.be.false;
		expect(state.redrawGeneration).to.be.greaterThan(hiddenRedraw);
	});

	it("should toggle target visibility from the HTML legend", () => {
		const chart = generate(line());
		const legendItem = container.querySelector("button[data-id='data1']");

		legendItem.dispatchEvent(new MouseEvent("click", {
			bubbles: true
		}));

		expect(chart.internal.state.hiddenTargetIds.has("data1")).to.be.true;
		expect(legendItem.classList.contains("bb-legend-item-hidden")).to.be.true;
	});

	it("should toggle only touched target from the HTML legend on touch input", () => {
		window.$$TEST$$.convertInputType = "touch";

		try {
			const chart = generateWithOptions({
				data: {
					columns,
					type: line()
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			});
			const item1 = container.querySelector("button[data-id='data1']") as HTMLElement;
			const item2 = container.querySelector("button[data-id='data2']") as HTMLElement;
			const {x, y} = item2.getBoundingClientRect();
			const legendTouch = new Touch({
				identifier: Date.now(),
				target: item2,
				clientX: x,
				clientY: y
			});
			const dispatchTouch = type => item2.dispatchEvent(new TouchEvent(type, {
				bubbles: true,
				cancelable: true,
				touches: type === "touchend" ? [] : [legendTouch],
				targetTouches: type === "touchend" ? [] : [legendTouch],
				changedTouches: [legendTouch]
			}));

			item2.dispatchEvent(new MouseEvent("mouseover", {
				bubbles: true
			}));

			expect(item1.style.opacity).to.be.equal("");

			const canvas = chart.$.canvas.node();
			const rect = canvas.getBoundingClientRect();
			const {margin} = chart.internal.state;
			const datum = chart.internal.data.targets[0].values[1];
			const canvasTouch = new Touch({
				identifier: Date.now() + 1,
				target: canvas,
				clientX: rect.left + margin.left + chart.internal.xx(datum),
				clientY: rect.top + margin.top + chart.internal.circleY(datum, datum.index)
			});

			canvas.dispatchEvent(new TouchEvent("touchstart", {
				bubbles: true,
				cancelable: true,
				touches: [canvasTouch],
				targetTouches: [canvasTouch],
				changedTouches: [canvasTouch]
			}));

			expect(chart.$.tooltip.style("display")).to.be.equal("block");

			dispatchTouch("touchstart");
			dispatchTouch("touchend");

			expect(chart.$.tooltip.style("display")).to.be.equal("none");
			expect(chart.internal.state.hiddenTargetIds.has("data2")).to.be.true;
			expect(item2.classList.contains("bb-legend-item-hidden")).to.be.true;
			expect(item1.style.opacity).to.be.equal("");

			item2.dispatchEvent(new MouseEvent("click", {
				bubbles: true
			}));

			expect(chart.internal.state.hiddenTargetIds.has("data2")).to.be.true;

			dispatchTouch("touchstart");
			dispatchTouch("touchend");

			expect(chart.internal.state.hiddenTargetIds.has("data2")).to.be.false;
			expect(item2.classList.contains("bb-legend-item-hidden")).to.be.false;
			expect(item1.style.opacity).to.be.equal("");
		} finally {
			delete window.$$TEST$$.convertInputType;
		}
	});

	it("should apply hover opacity to other canvas HTML legend items", () => {
		generate(line());

		const item1 = container.querySelector("button[data-id='data1']") as HTMLElement;
		const item2 = container.querySelector("button[data-id='data2']") as HTMLElement;

		item1.dispatchEvent(new MouseEvent("mouseover", {
			bubbles: true
		}));

		expect(item1.classList.contains($FOCUS.legendItemFocused)).to.be.true;
		expect(item1.style.opacity).to.be.equal("");
		expect(item2.style.opacity).to.be.equal("0.3");

		item1.dispatchEvent(new MouseEvent("mouseout", {
			bubbles: true
		}));

		expect(item1.classList.contains($FOCUS.legendItemFocused)).to.be.false;
		expect(item2.style.opacity).to.be.equal("");
	});

	it("should focus canvas target shapes from HTML legend hover", () => {
		const strokeRecords: Array<{
			strokeStyle: string,
			globalAlpha: number,
			lineWidth: number
		}> = [];
		const originalStroke = CanvasRenderingContext2D.prototype.stroke;
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D, path?: Path2D) {
				strokeRecords.push({
					strokeStyle: String(this.strokeStyle),
					globalAlpha: this.globalAlpha,
					lineWidth: this.lineWidth
				});

				return path ? originalStroke.call(this, path) : originalStroke.call(this);
			});

		try {
			generateWithOptions({
				data: {
					columns,
					type: line()
				},
				point: {
					show: false
				}
			});

			const item1 = container.querySelector("button[data-id='data1']") as HTMLElement;
			const data1Color = chart.internal.color("data1");
			const data2Color = chart.internal.color("data2");
			const {state} = chart.internal;
			const {shape} = chart.internal.canvasTheme.style;

			strokeRecords.length = 0;
			item1.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));

			expect(state.focusedTargetIds.has("data1")).to.be.true;
			expect(state.defocusedTargetIds.has("data2")).to.be.true;
			expect(strokeRecords.some(({strokeStyle, globalAlpha, lineWidth}) =>
				strokeStyle === data1Color &&
				globalAlpha === 1 &&
				lineWidth === shape.lineFocusedWidth
			)).to.be.true;
			expect(strokeRecords.some(({strokeStyle, globalAlpha}) =>
				strokeStyle === data2Color &&
				globalAlpha === shape.targetDefocusedOpacity
			)).to.be.true;

			strokeRecords.length = 0;
			item1.dispatchEvent(new MouseEvent("mouseout", {bubbles: true}));

			expect(state.focusedTargetIds.size).to.be.equal(0);
			expect(state.defocusedTargetIds.size).to.be.equal(0);
			expect(strokeRecords.some(({strokeStyle, globalAlpha, lineWidth}) =>
				strokeStyle === data2Color &&
				globalAlpha === 1 &&
				lineWidth === shape.lineWidth
			)).to.be.true;
		} finally {
			stroke.mockRestore();
		}
	});

	it("should hide canvas x axis ticks when all targets are hidden from the bottom legend", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");

		chart = generateWithOptions({
			data: {
				columns,
				type: line()
			},
			axis: {
				x: {
					tick: {
						format: value => `x:${value}`
					}
				},
				y: {
					tick: {
						format: value => `y:${value}`
					}
				}
			}
		});

		const legendItem1 = container.querySelector("button[data-id='data1']");
		const legendItem2 = container.querySelector("button[data-id='data2']");

		legendItem1.dispatchEvent(new MouseEvent("click", {
			bubbles: true
		}));

		fillText.mockClear();
		lineTo.mockClear();

		legendItem2.dispatchEvent(new MouseEvent("click", {
			bubbles: true
		}));

		const {height, margin, width} = chart.internal.state;
		const axisLineWidth = chart.internal.canvasTheme.style.axis.lineWidth;
		const axisY = getCrisp(margin.top + height, axisLineWidth);
		const xTickTexts = fillText.mock.calls
			.map(([text]) => String(text))
			.filter(text => text.indexOf("x:") === 0);
		const xTickLineCount = lineTo.mock.calls
			.filter(([x, y]) =>
				x >= margin.left - 1 &&
				x <= margin.left + width + 1 &&
				Math.abs(y - (axisY + AXIS_TICK_SIZE)) < 1.5
			).length;

		expect(chart.internal.filterTargetsToShow(chart.internal.data.targets)).to.have.length(0);
		expect(xTickTexts).to.have.length(0);
		expect(xTickLineCount).to.be.at.most(2);

		fillText.mockRestore();
		lineTo.mockRestore();
	});

	it("should keep canvas tick texts outside when inner ticks are enabled", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");
		const translate = vi.spyOn(CanvasRenderingContext2D.prototype, "translate");

		try {
			chart = generateWithOptions({
				data: {
					columns,
					type: line(),
					axes: {
						data2: "y2"
					}
				},
				axis: {
					x: {
						tick: {
							inner: true,
							format: value => `x:${value}`
						}
					},
					y: {
						tick: {
							inner: true,
							format: value => `y:${value}`
						}
					},
					y2: {
						show: true,
						tick: {
							inner: true,
							format: value => `y2:${value}`
						}
					}
				}
			});

			const {height, margin, width} = chart.internal.state;
			const axisLineWidth = chart.internal.canvasTheme.style.axis.lineWidth;
			const xAxisY = getCrisp(margin.top + height, axisLineWidth);
			const yAxisX = getCrisp(margin.left, axisLineWidth);
			const y2AxisX = getCrisp(margin.left + width, axisLineWidth);
			const hasInnerXTickLine = lineTo.mock.calls.some(([x, y]) =>
				Number(x) >= margin.left - 1 &&
				Number(x) <= margin.left + width + 1 &&
				Math.abs(Number(y) - (xAxisY - AXIS_TICK_SIZE)) < 1.5
			);
			const hasOuterXTickText = translate.mock.calls.some(([x, y]) =>
				Number(x) >= margin.left - 1 &&
				Number(x) <= margin.left + width + 1 &&
				Number(y) > xAxisY + AXIS_TICK_SIZE
			);
			const yTickTextX = fillText.mock.calls
				.filter(([text]) => String(text).indexOf("y:") === 0)
				.map(([, x]) => Number(x))
				.filter(Number.isFinite);
			const y2TickTextX = fillText.mock.calls
				.filter(([text]) => String(text).indexOf("y2:") === 0)
				.map(([, x]) => Number(x))
				.filter(Number.isFinite);

			expect(hasInnerXTickLine).to.be.true;
			expect(hasOuterXTickText).to.be.true;
			expect(yTickTextX.length).to.be.above(0);
			expect(yTickTextX.every(x => x < yAxisX)).to.be.true;
			expect(y2TickTextX.length).to.be.above(0);
			expect(y2TickTextX.every(x => x > y2AxisX)).to.be.true;
		} finally {
			fillText.mockRestore();
			lineTo.mockRestore();
			translate.mockRestore();
		}
	});

	it("should draw canvas axis edge ticks outside when inner ticks are enabled", () => {
		const segments: Array<{x1: number, y1: number, x2: number, y2: number}> = [];
		const originalMoveTo = CanvasRenderingContext2D.prototype.moveTo;
		const originalLineTo = CanvasRenderingContext2D.prototype.lineTo;
		const current = new WeakMap<CanvasRenderingContext2D, {x: number, y: number}>();
		const moveTo = vi.spyOn(CanvasRenderingContext2D.prototype, "moveTo")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				current.set(this, {x, y});

				return originalMoveTo.call(this, x, y);
			});
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				const start = current.get(this);

				if (start) {
					segments.push({
						x1: start.x,
						y1: start.y,
						x2: x,
						y2: y
					});
					current.set(this, {x, y});
				}

				return originalLineTo.call(this, x, y);
			});

		try {
			generateWithOptions({
				data: {
					columns,
					type: line(),
					axes: {
						data2: "y2"
					}
				},
				axis: {
					x: {
						tick: {
							inner: true
						}
					},
					y: {
						tick: {
							inner: true
						}
					},
					y2: {
						show: true,
						tick: {
							inner: true
						}
					}
				}
			});

			const {height, margin, width} = chart.internal.state;
			const {axis} = chart.internal.canvasTheme.style;
			const axisX = getCrisp(margin.left, axis.lineWidth);
			const axisY2X = getCrisp(margin.left + width, axis.lineWidth);
			const axisY = getCrisp(margin.top + height, axis.lineWidth);
			const top = margin.top;
			const bottom = margin.top + height;
			const left = margin.left;
			const right = margin.left + width;
			const close = (a, b) => Math.abs(a - b) < 0.1;
			const hasSegment = (x1, y1, x2, y2) => segments.some(segment =>
				close(segment.x1, x1) &&
				close(segment.y1, y1) &&
				close(segment.x2, x2) &&
				close(segment.y2, y2)
			);

			expect(hasSegment(left, axisY, left, axisY + AXIS_TICK_SIZE)).to.be.true;
			expect(hasSegment(right, axisY, right, axisY + AXIS_TICK_SIZE)).to.be.true;
			expect(hasSegment(left, axisY, left, axisY - AXIS_TICK_SIZE)).to.be.false;
			expect(hasSegment(right, axisY, right, axisY - AXIS_TICK_SIZE)).to.be.false;

			expect(hasSegment(axisX, top, axisX - AXIS_TICK_SIZE, top)).to.be.true;
			expect(hasSegment(axisX, bottom, axisX - AXIS_TICK_SIZE, bottom)).to.be.true;
			expect(hasSegment(axisX, top, axisX + AXIS_TICK_SIZE, top)).to.be.false;
			expect(hasSegment(axisX, bottom, axisX + AXIS_TICK_SIZE, bottom)).to.be.false;

			expect(hasSegment(axisY2X, top, axisY2X + AXIS_TICK_SIZE, top)).to.be.true;
			expect(hasSegment(axisY2X, bottom, axisY2X + AXIS_TICK_SIZE, bottom)).to.be.true;
			expect(hasSegment(axisY2X, top, axisY2X - AXIS_TICK_SIZE, top)).to.be.false;
			expect(hasSegment(axisY2X, bottom, axisY2X - AXIS_TICK_SIZE, bottom)).to.be.false;
		} finally {
			moveTo.mockRestore();
			lineTo.mockRestore();
		}
	});

	it("should split x tick text and align edge ticks when x tick text is inner", () => {
		const records: Array<{text: string, textAlign: string, textBaseline: string}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string) {
				records.push({
					text: String(text),
					textAlign: this.textAlign,
					textBaseline: this.textBaseline
				});
			});

		try {
			generateWithOptions({
				data: {
					x: "x",
					xFormat: "%Y",
					columns: [
						["x", "2020", "2021", "2022", "2023", "2024"],
						["data1", 30, 200, 100, 400, 150],
						["data2", 130, 340, 200, 500, 250]
					],
					type: line()
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							text: {
								inner: true
							},
							format: "%Y-%m-%d %H:%M:%S"
						}
					},
					y: {
						show: false
					}
				}
			});

			const firstDate = records.find(({text}) => text === "2020-01-01");
			const lastDate = records.find(({text}) => text === "2024-01-01");

			expect(records.some(({text}) => text === "00:00:00")).to.be.true;
			expect(records.some(({text}) => text === "2020-01-01 00:00:00")).to.be.false;
			expect(firstDate?.textAlign).to.be.equal("left");
			expect(lastDate?.textAlign).to.be.equal("right");
			expect(firstDate?.textBaseline).to.be.equal("top");
		} finally {
			fillText.mockRestore();
		}
	});

	it("should use SVG-like spacing for multiline canvas x tick text", () => {
		const records: Array<{text: string, y: number}> = [];
		const originalFillText = CanvasRenderingContext2D.prototype.fillText;
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text, x, y, ...args) {
				if (text === "line-two") {
					records.push({
						text: String(text),
						y: Number(y)
					});
				}

				return originalFillText.call(this, text, x, y, ...args);
			});

		try {
			generateWithOptions({
				data: {
					columns,
					type: line()
				},
				axis: {
					x: {
						tick: {
							format: () => "line-one\nline-two"
						}
					}
				}
			});

			expect(records.length).to.be.above(0);
			expect(records.every(({y}) => y >= 11.5)).to.be.true;
		} finally {
			fillText.mockRestore();
		}
	});

	it("should align only the last x tick text when x tick text inner.last is set", () => {
		const records: Array<{text: string, textAlign: string}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string) {
				records.push({
					text: String(text),
					textAlign: this.textAlign
				});
			});

		try {
			generateWithOptions({
				data: {
					x: "x",
					xFormat: "%Y",
					columns: [
						["x", "2020", "2021", "2022", "2023", "2024"],
						["data1", 30, 200, 100, 400, 150],
						["data2", 130, 340, 200, 500, 250]
					],
					type: line()
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							text: {
								inner: {
									last: true
								}
							},
							format: "%Y-%m-%d %H:%M:%S"
						}
					},
					y: {
						show: false
					}
				}
			});

			const firstDate = records.find(({text}) => text === "2020-01-01");
			const lastDate = records.find(({text}) => text === "2024-01-01");

			expect(firstDate?.textAlign).to.be.equal("center");
			expect(lastDate?.textAlign).to.be.equal("right");
		} finally {
			fillText.mockRestore();
		}
	});

	it("should show tooltip from canvas hover hit detection", () => {
		const chart = generate(line());
		const {margin} = chart.internal.state;
		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
		const tooltip = container.querySelector(".bb-tooltip-container");
		const x = margin.left + chart.internal.scale.x(1);
		const y = margin.top + chart.internal.scale.y(200);

		canvasEl.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: x,
			clientY: y
		}));

		expect(tooltip.style.display).to.not.be.equal("none");
		expect(tooltip.textContent).to.contain("data1");
	});

	it("should group canvas scatter hover when x axis is forced as single", () => {
		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			axis: {
				x: {
					forceAsSingle: true
				}
			},
			tooltip: {
				grouped: true
			}
		});

		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
		const tooltip = container.querySelector(".bb-tooltip-container");
		const rect = canvasEl.getBoundingClientRect();
		const {height, margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[1];

		canvasEl.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: rect.left + margin.left + chart.internal.scale.x(d.x),
			clientY: rect.top + margin.top + height + 5
		}));

		expect(tooltip.style.display).to.not.be.equal("none");
		expect(tooltip.textContent).to.contain("data1");
		expect(tooltip.textContent).to.contain("data2");
	});

	it("should draw focus points on line hover when points are focus-only", () => {
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 320,
				height: 240
			},
			data: {
				columns,
				type: line()
			},
			point: {
				focus: {
					only: true
				}
			}
		});

		expect(arc).not.toHaveBeenCalled();
		const draw = vi.spyOn(chart.internal.canvasRenderer, "draw");

		const {margin} = chart.internal.state;
		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);

		lineTo.mockClear();
		canvasEl.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: margin.left + chart.internal.scale.x(1),
			clientY: margin.top + chart.internal.scale.y(200)
		}));

		expect(arc).toHaveBeenCalled();
		const axisLineWidth = chart.internal.canvasTheme.style.axis.lineWidth;

		expect(lineTo.mock.calls.some(([x, y]) =>
			x === chart.internal.scale.x(1) &&
			y === getTranslatedCrisp(chart.internal.state.height, margin.top, axisLineWidth)
		)).to.be.true;
		expect(draw).not.toHaveBeenCalled();

		draw.mockRestore();
		arc.mockRestore();
		lineTo.mockRestore();
	});

	it("should use SVG focus grid CSS for canvas focus line", () => {
		const style = document.createElement("style");
		const strokes: Array<{lineWidth: number, dash: number[], strokeStyle: string}> = [];
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				strokes.push({
					lineWidth: this.lineWidth,
					dash: this.getLineDash(),
					strokeStyle: String(this.strokeStyle)
				});
			});

		generateWithOptions({
			data: {
				columns,
				type: line()
			},
			point: {
				show: false
			}
		});

		expect(chart.internal.canvasTheme.style.focusGrid.lineColor).to.be.equal("rgb(170, 170, 170)");

		chart.destroy();
		container.remove();
		chart = null;
		container = null;

		style.textContent = `
			.bb-xgrid-focus line,
			.bb-ygrid-focus line {
				stroke: rgb(1, 2, 3);
				stroke-width: 3px;
				stroke-dasharray: 4 2;
			}
		`;
		document.head.appendChild(style);

		generateWithOptions({
			data: {
				columns,
				type: line()
			},
			point: {
				show: false
			}
		});

		strokes.length = 0;

		const {margin} = chart.internal.state;
		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);

		canvasEl.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: margin.left + chart.internal.scale.x(1),
			clientY: margin.top + chart.internal.scale.y(200)
		}));

		expect(strokes.some(({lineWidth, dash, strokeStyle}) =>
			strokeStyle === "#010203" && lineWidth === 3 && dash[0] === 4 && dash[1] === 2
		)).to.be.true;

		style.remove();
		stroke.mockRestore();
	});

	it("should apply SVG CSS probes to canvas-only overlay styles", () => {
		const style = document.createElement("style");
		const fillTextRecords: Array<{text: string, fillStyle: string, font: string}> = [];
		const fillRectRecords: Array<{fillStyle: string, alpha: number}> = [];
		const strokeRectRecords: Array<{strokeStyle: string, lineWidth: number}> = [];
		const fillRecords: Array<{fillStyle: string}> = [];
		const strokeRecords: Array<{strokeStyle: string, lineWidth: number}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string) {
				fillTextRecords.push({
					text: String(text),
					fillStyle: String(this.fillStyle),
					font: this.font
				});
			});
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				fillRectRecords.push({
					fillStyle: String(this.fillStyle),
					alpha: this.globalAlpha
				});
			});
		const strokeRect = vi.spyOn(CanvasRenderingContext2D.prototype, "strokeRect")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				strokeRectRecords.push({
					strokeStyle: String(this.strokeStyle),
					lineWidth: this.lineWidth
				});
			});
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				fillRecords.push({
					fillStyle: String(this.fillStyle)
				});
			});
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				strokeRecords.push({
					strokeStyle: String(this.strokeStyle),
					lineWidth: this.lineWidth
				});
			});
		const destroyCurrent = () => {
			chart?.destroy();
			container?.remove();
			chart = null;
			container = null;
		};

		style.textContent = `
			.bb-grid text {
				fill: rgb(4, 5, 6);
				font-size: 17px;
				font-family: serif;
			}
			.bb-text.bb-empty {
				fill: rgb(7, 8, 9);
				font-size: 22px;
				font-family: serif;
			}
			.bb-zoom-brush {
				fill: rgb(10, 11, 12);
				fill-opacity: .35;
			}
			.bb-chart-treemaps rect {
				stroke: rgb(13, 14, 15);
				stroke-width: 4px;
			}
			.bb-selected-circle {
				fill: rgb(16, 17, 18);
				stroke: rgb(19, 20, 21);
				stroke-width: 5px;
			}
			.bb-circle._expanded_ {
				stroke: rgb(22, 23, 24) !important;
				stroke-width: 6px;
			}
			.bb-bar {
				stroke: rgb(25, 26, 27);
				stroke-width: 7px;
			}
			.bb-bar._expanded_ {
				fill-opacity: .42;
			}
			.bb-candlestick._expanded_ {
				fill-opacity: .43;
			}
			.bb-target.bb-focused path.bb-line {
				stroke-width: 9px;
			}
			.bb-target.bb-defocused {
				opacity: .44 !important;
			}
			.bb-circle {
				fill: rgb(28, 29, 30) !important;
				stroke: rgb(31, 32, 33);
				stroke-width: 8px;
			}
			.tick._active_ text {
				fill: rgb(34, 35, 36) !important;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns,
					type: bar()
				},
				grid: {
					x: {
						lines: [{value: 1, text: "x grid css"}]
					}
				}
			});

			const themeStyle = chart.internal.canvasTheme.style;

			expect(themeStyle.grid.labelColor).to.be.equal("rgb(4, 5, 6)");
			expect(themeStyle.emptyLabel.color).to.be.equal("rgb(7, 8, 9)");
			expect(themeStyle.zoomBrush.fill).to.be.equal("rgb(10, 11, 12)");
			expect(themeStyle.zoomBrush.opacity).to.be.equal(0.35);
			expect(themeStyle.treemap.stroke).to.be.equal("rgb(13, 14, 15)");
			expect(themeStyle.treemap.lineWidth).to.be.equal(4);
			expect(themeStyle.selectedPoint.fill).to.be.equal("rgb(16, 17, 18)");
			expect(themeStyle.selectedPoint.stroke).to.be.equal("rgb(19, 20, 21)");
			expect(themeStyle.selectedPoint.lineWidth).to.be.equal(5);
			expect(themeStyle.focusPoint.stroke).to.be.equal("rgb(22, 23, 24)");
			expect(themeStyle.focusPoint.lineWidth).to.be.equal(6);
			expect(themeStyle.shape.barStrokeColor).to.be.equal("rgb(0, 0, 0)");
			expect(themeStyle.shape.barLineWidth).to.be.equal(7);
			expect(themeStyle.shape.pointFillColor).to.be.equal("rgb(28, 29, 30)");
			expect(themeStyle.shape.pointStrokeColor).to.be.equal("rgb(31, 32, 33)");
			expect(themeStyle.shape.pointLineWidth).to.be.equal(8);
			expect(themeStyle.shape.barExpandedOpacity).to.be.equal(0.42);
			expect(themeStyle.shape.candlestickExpandedOpacity).to.be.equal(0.43);
			expect(themeStyle.shape.lineFocusedWidth).to.be.equal(9);
			expect(themeStyle.shape.targetDefocusedOpacity).to.be.equal(0.44);
			expect(themeStyle.axis.activeLabelColor).to.be.equal("rgb(34, 35, 36)");
			expect(fillTextRecords.some(({text, fillStyle, font}) =>
				text === "x grid css" && fillStyle === "#040506" && font.indexOf("17px") > -1
			)).to.be.true;
			expect(strokeRectRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === "#000000" && lineWidth === 7
			)).to.be.true;

			fillRectRecords.length = 0;
			chart.internal.canvasRenderer.drawZoomBrush(chart.internal, 10, 20);
			expect(fillRectRecords.some(({fillStyle, alpha}) =>
				fillStyle === "#0a0b0c" && alpha === 0.35
			)).to.be.true;

			destroyCurrent();
			fillTextRecords.length = 0;
			generateWithOptions({
				data: {
					columns: [],
					type: line(),
					empty: {
						label: {
							text: "No data css"
						}
					}
				}
			});
			expect(fillTextRecords.some(({text, fillStyle, font}) =>
				text === "No data css" && fillStyle === "#070809" && font.indexOf("22px") > -1
			)).to.be.true;

			destroyCurrent();
			strokeRectRecords.length = 0;
			generate(treemap());
			expect(strokeRectRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === "#0d0e0f" && lineWidth === 4
			)).to.be.true;

			destroyCurrent();
			fillRecords.length = 0;
			strokeRecords.length = 0;
			generateWithOptions({
				data: {
					columns,
					type: scatter(),
					selection: {
						enabled: true
					}
				}
			});
			chart.select("data1", [1]);
			expect(fillRecords.some(({fillStyle}) => fillStyle === "#101112")).to.be.true;
			expect(strokeRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === "#131415" && lineWidth === 5
			)).to.be.true;
			expect(fillRecords.some(({fillStyle}) => fillStyle === "#1c1d1e")).to.be.true;

			fillRecords.length = 0;
			strokeRecords.length = 0;

			const {margin} = chart.internal.state;
			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);

			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: margin.left + chart.internal.scale.x(1),
				clientY: margin.top + chart.internal.scale.y(200)
			}));

			expect(strokeRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === "#161718" && lineWidth === 6
			)).to.be.true;
		} finally {
			style.remove();
			fillText.mockRestore();
			fillRect.mockRestore();
			strokeRect.mockRestore();
			fill.mockRestore();
			stroke.mockRestore();
		}
	});

	it("should propagate canvas axis label theme overrides", () => {
		generateWithOptions({
			canvas: {
				theme: {
					axis: {
						labelFont: "700 18px serif",
						labelColor: "rgb(11, 12, 13)"
					}
				}
			},
			data: {
				columns,
				type: line()
			}
		});

		const {axis} = chart.internal.canvasTheme.style;

		expect(axis.labelFont).to.be.equal("700 18px serif");
		expect(axis.xTickFont).to.be.equal("700 18px serif");
		expect(axis.yTickFont).to.be.equal("700 18px serif");
		expect(axis.y2TickFont).to.be.equal("700 18px serif");
		expect(axis.labelColor).to.be.equal("rgb(11, 12, 13)");
		expect(axis.xLabelColor).to.be.equal("rgb(11, 12, 13)");
		expect(axis.yLabelColor).to.be.equal("rgb(11, 12, 13)");
		expect(axis.y2LabelColor).to.be.equal("rgb(11, 12, 13)");
	});

	it("should map canvas theme selector overrides to drawing styles", () => {
		generateWithOptions({
			canvas: {
				theme: {
					selectors: {
						".bb-axis path.domain": {
							stroke: "rgb(1, 2, 3)",
							strokeWidth: 2
						},
						".bb-axis .tick line": {
							stroke: "rgb(4, 5, 6)",
							"stroke-width": "3px"
						},
						".bb-axis .tick text": {
							fill: "rgb(7, 8, 9)",
							font: "700 11px serif"
						},
						".bb-axis-x-label": {
							fill: "rgb(10, 11, 12)",
							font: "600 12px sans-serif"
						},
						".bb-grid line": {
							stroke: "rgb(13, 14, 15)",
							strokeWidth: 4,
							strokeDasharray: "2 3"
						},
						".bb-grid text": {
							fill: "rgb(16, 17, 18)",
							fontSize: "13px",
							fontFamily: "monospace"
						},
						".bb-region rect": {
							fill: "rgb(19, 20, 21)",
							fillOpacity: 0.4
						},
						".bb-region text": {
							fill: "rgb(22, 23, 24)",
							font: "14px serif"
						},
						".bb-bar": {
							opacity: 0.9,
							stroke: "rgb(25, 26, 27)",
							strokeWidth: 5
						},
						".bb-bar._expanded_": {
							opacity: 0.8
						},
						".bb-line": {
							stroke: "rgb(28, 29, 30)",
							strokeWidth: 6
						},
						".bb-circle": {
							fill: "rgb(31, 32, 33)",
							stroke: "rgb(34, 35, 36)",
							strokeWidth: 7
						},
						".bb-selected-circle": {
							fill: "rgb(37, 38, 39)",
							stroke: "rgb(40, 41, 42)",
							strokeWidth: 8
						},
						".bb-circle._expanded_": {
							stroke: "rgb(43, 44, 45)",
							strokeWidth: 9
						},
						".bb-zoom-brush": {
							fill: "rgb(46, 47, 48)",
							fillOpacity: 0.3
						},
						".bb-brush .selection": {
							fill: "rgb(49, 50, 51)",
							opacity: 0.2
						},
						".bb-brush .handle--custom": {
							fill: "rgb(52, 53, 54)",
							stroke: "rgb(55, 56, 57)",
							strokeWidth: 10
						},
						".bb-chart-treemaps rect": {
							stroke: "rgb(58, 59, 60)",
							strokeWidth: 11
						},
						".bb-text.bb-empty": {
							fill: "rgb(61, 62, 63)",
							font: "15px sans-serif"
						},
						".bb-title": {
							fill: "rgb(64, 65, 66)",
							font: "16px sans-serif"
						}
					},
					shape: {
						barLineWidth: 12
					}
				}
			},
			data: {
				columns,
				type: bar()
			}
		});

		const {axis, grid, region, shape, selectedPoint, focusPoint, zoomBrush, subchartBrush,
			treemap, emptyLabel, title} = chart.internal.canvasTheme.style;

		expect(axis.lineColor).to.be.equal("rgb(1, 2, 3)");
		expect(axis.lineWidth).to.be.equal(2);
		expect(axis.tickColor).to.be.equal("rgb(4, 5, 6)");
		expect(axis.tickWidth).to.be.equal(3);
		expect(axis.labelColor).to.be.equal("rgb(7, 8, 9)");
		expect(axis.xTickFont).to.be.equal("700 11px serif");
		expect(axis.yTickFont).to.be.equal("700 11px serif");
		expect(axis.y2TickFont).to.be.equal("700 11px serif");
		expect(axis.labelFont).to.be.equal("600 12px sans-serif");
		expect(axis.xLabelColor).to.be.equal("rgb(10, 11, 12)");
		expect(grid.lineColor).to.be.equal("rgb(13, 14, 15)");
		expect(grid.lineWidth).to.be.equal(4);
		expect(grid.dashArray).to.be.deep.equal([2, 3]);
		expect(grid.labelColor).to.be.equal("rgb(16, 17, 18)");
		expect(grid.labelFont).to.be.equal("13px monospace");
		expect(region.fill).to.be.equal("rgb(19, 20, 21)");
		expect(region.opacity).to.be.equal(0.4);
		expect(region.labelColor).to.be.equal("rgb(22, 23, 24)");
		expect(region.labelFont).to.be.equal("14px serif");
		expect(shape.barOpacity).to.be.equal(0.9);
		expect(shape.barStrokeColor).to.be.equal("rgb(25, 26, 27)");
		expect(shape.barLineWidth).to.be.equal(12);
		expect(shape.barExpandedOpacity).to.be.equal(0.8);
		expect(shape.barConnectLineColor).to.be.equal("rgb(28, 29, 30)");
		expect(shape.barConnectLineWidth).to.be.equal(6);
		expect(shape.lineWidth).to.be.equal(6);
		expect(shape.pointFillColor).to.be.equal("rgb(31, 32, 33)");
		expect(shape.pointStrokeColor).to.be.equal("rgb(34, 35, 36)");
		expect(shape.pointLineWidth).to.be.equal(7);
		expect(selectedPoint.fill).to.be.equal("rgb(37, 38, 39)");
		expect(selectedPoint.stroke).to.be.equal("rgb(40, 41, 42)");
		expect(selectedPoint.lineWidth).to.be.equal(8);
		expect(focusPoint.stroke).to.be.equal("rgb(43, 44, 45)");
		expect(focusPoint.lineWidth).to.be.equal(9);
		expect(zoomBrush.fill).to.be.equal("rgb(46, 47, 48)");
		expect(zoomBrush.opacity).to.be.equal(0.3);
		expect(subchartBrush.fill).to.be.equal("rgb(49, 50, 51)");
		expect(subchartBrush.opacity).to.be.equal(0.2);
		expect(subchartBrush.handleFill).to.be.equal("rgb(52, 53, 54)");
		expect(subchartBrush.handleStroke).to.be.equal("rgb(55, 56, 57)");
		expect(subchartBrush.handleLineWidth).to.be.equal(10);
		expect(treemap.stroke).to.be.equal("rgb(58, 59, 60)");
		expect(treemap.lineWidth).to.be.equal(11);
		expect(emptyLabel.color).to.be.equal("rgb(61, 62, 63)");
		expect(emptyLabel.font).to.be.equal("15px sans-serif");
		expect(title.color).to.be.equal("rgb(64, 65, 66)");
		expect(title.font).to.be.equal("16px sans-serif");
	});

	it("should build canvas theme font from CSS longhand values", () => {
		const host = document.createElement("div");
		const originalGetComputedStyle = window.getComputedStyle.bind(window);
		const getComputedStyle = vi.spyOn(window, "getComputedStyle")
			.mockImplementation((el: Element) => {
				const style = originalGetComputedStyle(el);
				const isText = el.tagName.toLowerCase() === "text";
				const isEmptyLabel = el.classList.contains("bb-empty");

				return new Proxy(style, {
					get(target, prop) {
						if (prop === "getPropertyValue") {
							return (name: string) => {
								if (isText) {
									const values = {
										font: "",
										"font-size": isEmptyLabel ? "" : "13px",
										"font-family": isEmptyLabel ? "" : "serif",
										"font-style": "italic",
										"font-variant": "small-caps",
										"font-weight": "700",
										"line-height": "20px"
									} as Record<string, string>;

									if (name in values) {
										return values[name];
									}
								}

								return target.getPropertyValue(name);
							};
						}

						return target[prop as keyof CSSStyleDeclaration];
					}
				}) as CSSStyleDeclaration;
			});

		document.body.appendChild(host);

		try {
			const theme = new CanvasTheme();

			theme.load(host);

			expect(theme.style.axis.xTickFont).to.be.equal(
				"italic small-caps 700 13px/20px serif"
			);
			expect(theme.style.axis.yTickFont).to.be.equal(
				"italic small-caps 700 13px/20px serif"
			);
			expect(theme.style.label.font).to.be.equal(
				"italic small-caps 700 13px/20px serif"
			);
			expect(theme.style.emptyLabel.font).to.be.equal(theme.style.label.font);
		} finally {
			getComputedStyle.mockRestore();
			host.remove();
		}
	});

	it("should ignore per-node SVG CSS selectors for canvas-drawn primitives", () => {
		const style = document.createElement("style");

		style.textContent = `
			.bb-bar {
				stroke-width: 3px;
			}
			.bb-target-data1 .bb-bar,
			.bb-bar-0,
			.bb-shape-0 {
				stroke-width: 11px !important;
			}
		`;
		document.head.appendChild(style);

		try {
			generate(bar());

			expect(chart.internal.canvasTheme.style.shape.barLineWidth).to.be.equal(3);
			expect(chart.internal.canvasTheme.style.shape.barLineWidth).not.to.be.equal(11);
		} finally {
			style.remove();
		}
	});

	it("should draw bars and not draw line or area paths for bar targets", () => {
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke");

		generate(bar());

		expect(fillRect).toHaveBeenCalled();
		expect(stroke.mock.calls.filter(args => args.length).length).to.be.equal(0);

		fillRect.mockRestore();
		stroke.mockRestore();
	});

	it("should draw canvas bar connect lines", () => {
		const segments: Array<{
			x1: number,
			y1: number,
			x2: number,
			y2: number,
			lineWidth: number,
			strokeStyle: string
		}> = [];
		const originalMoveTo = CanvasRenderingContext2D.prototype.moveTo;
		const originalLineTo = CanvasRenderingContext2D.prototype.lineTo;
		let current: {x: number, y: number} | null = null;
		const moveTo = vi.spyOn(CanvasRenderingContext2D.prototype, "moveTo")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				const transform = this.getTransform();

				current = {
					x: transform.e + x,
					y: transform.f + y
				};

				return originalMoveTo.call(this, x, y);
			});
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				const transform = this.getTransform();

				if (current) {
					segments.push({
						x1: current.x,
						y1: current.y,
						x2: transform.e + x,
						y2: transform.f + y,
						lineWidth: this.lineWidth,
						strokeStyle: String(this.strokeStyle)
					});
				}

				return originalLineTo.call(this, x, y);
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", -30, [30, 200], 150, 400]
					],
					type: bar()
				},
				bar: {
					connectLine: "start-end"
				}
			});

			const {margin} = chart.internal.state;
			const target = chart.internal.data.targets[0];
			const indices = chart.internal.getShapeIndices(chart.internal.isBarType);
			const getPoints = chart.internal.generateGetBarPoints(indices, false);
			const getBox = (d, i) => {
				const points = getPoints(d, i);
				const pos = points[1][1];

				return {
					x: points[0][0],
					y: pos,
					width: points[2][0] - points[0][0],
					height: points[3][1] - pos
				};
			};
			const first = getBox(target.values[0], 0);
			const second = getBox(target.values[1], 1);
			const expected = {
				x1: margin.left + first.x + first.width,
				y1: margin.top + first.y + first.height,
				x2: margin.left + second.x,
				y2: margin.top + second.y
			};

			expect(segments.some(({x1, y1, x2, y2, lineWidth, strokeStyle}) =>
				Math.abs(x1 - expected.x1) < 0.1 &&
				Math.abs(y1 - expected.y1) < 0.1 &&
				Math.abs(x2 - expected.x2) < 0.1 &&
				Math.abs(y2 - expected.y2) < 0.1 &&
				lineWidth === chart.internal.canvasTheme.style.shape.barConnectLineWidth &&
				strokeStyle === "#000000"
			)).to.be.true;
		} finally {
			moveTo.mockRestore();
			lineTo.mockRestore();
		}
	});

	it("should honor bar radius options on canvas bars", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill");
		const quadraticCurveTo = vi.spyOn(CanvasRenderingContext2D.prototype, "quadraticCurveTo");

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, -200, 100, -400]
				],
				type: bar()
			},
			bar: {
				radius: {
					ratio: 0.5
				}
			},
			tooltip: {
				grouped: false
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[1];
		const indices = chart.internal.getShapeIndices(chart.internal.isBarType);
		const points = chart.internal.generateGetBarPoints(indices, false)(d, 1);
		const center = getCanvasRectCenter(points, false);

		expect(messages).not.to.contain("bar.radius");
		expect(chart.internal.config.bar_radius_ratio).to.be.equal(0.5);
		expect(quadraticCurveTo).toHaveBeenCalled();
		expect(fill).toHaveBeenCalled();
		expect(chart.internal.hitDetector.findNearest(
			margin.left + center.x,
			margin.top + center.y
		)).to.equal(d);

		fill.mockRestore();
		quadraticCurveTo.mockRestore();
		warn.mockRestore();
	});

	it("should draw x focus line on bar hover", () => {
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");
		const chart = generate(bar());
		const {margin} = chart.internal.state;
		const target = chart.internal.data.targets[0];
		const d = target.values[0];
		const indices = chart.internal.getShapeIndices(chart.internal.isBarType);
		const points = chart.internal.generateGetBarPoints(indices, false)(d, 0);
		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);

		lineTo.mockClear();
		canvasEl.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: margin.left + (points[0][0] + points[2][0]) / 2,
			clientY: margin.top + (points[0][1] + points[1][1]) / 2
		}));

		expect(lineTo.mock.calls.some(([, y]) => {
			const axisLineWidth = chart.internal.canvasTheme.style.axis.lineWidth;

			return y === getTranslatedCrisp(
				chart.internal.state.height,
				chart.internal.state.margin.top,
				axisLineWidth
			);
		})).to.be.true;

		lineTo.mockRestore();
	});

	it("should draw y focus line on canvas hover when grid focus y is enabled", () => {
		const segments: Array<{x1: number, y1: number, x2: number, y2: number}> = [];
		const originalMoveTo = CanvasRenderingContext2D.prototype.moveTo;
		const originalLineTo = CanvasRenderingContext2D.prototype.lineTo;
		let current: {x1: number, y1: number} | null = null;
		const moveTo = vi.spyOn(CanvasRenderingContext2D.prototype, "moveTo")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				current = {x1: x, y1: y};

				return originalMoveTo.call(this, x, y);
			});
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				current && segments.push({
					...current,
					x2: x,
					y2: y
				});

				return originalLineTo.call(this, x, y);
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", 300, 350, 300, 120, 220, 250],
					["data2", 130, 100, 140, 200, 150, 50]
				],
				type: line(),
				axes: {
					data2: "y2"
				}
			},
			axis: {
				y2: {
					show: true
				}
			},
			tooltip: {
				grouped: false
			},
			grid: {
				focus: {
					show: true,
					y: true,
					edge: true
				}
			}
		});

		const {height, margin, width} = chart.internal.state;
		const axisLineWidth = chart.internal.canvasTheme.style.axis.lineWidth;
		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
		const leftEdge = getTranslatedCrisp(0, margin.left, axisLineWidth);
		const rightEdge = getTranslatedCrisp(width, margin.left, axisLineWidth);
		const bottomEdge = getTranslatedCrisp(height, margin.top, axisLineWidth);
		const hasSegment = (expected: {x1: number, y1: number, x2: number, y2: number}) =>
			segments.some(segment =>
				Math.abs(segment.x1 - expected.x1) < 0.1 &&
				Math.abs(segment.y1 - expected.y1) < 0.1 &&
				Math.abs(segment.x2 - expected.x2) < 0.1 &&
				Math.abs(segment.y2 - expected.y2) < 0.1
			);
		const hover = d => {
			segments.length = 0;
			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: margin.left + chart.internal.scale.x(d.x),
				clientY: margin.top + chart.internal.getYScaleById(d.id)(d.value)
			}));
		};
		const yData = chart.internal.data.targets[0].values[2];
		const y2Data = chart.internal.data.targets[1].values[2];
		const yX = chart.internal.scale.x(yData.x);
		const yY = chart.internal.scale.y(yData.value);
		const y2X = chart.internal.scale.x(y2Data.x);
		const y2Y = chart.internal.scale.y2(y2Data.value);

		hover(yData);
		expect(hasSegment({x1: yX, y1: yY, x2: yX, y2: bottomEdge})).to.be.true;
		expect(hasSegment({x1: leftEdge, y1: yY, x2: yX, y2: yY})).to.be.true;

		hover(y2Data);
		expect(hasSegment({x1: y2X, y1: y2Y, x2: y2X, y2: bottomEdge})).to.be.true;
		expect(hasSegment({x1: y2X, y1: y2Y, x2: rightEdge, y2: y2Y})).to.be.true;

		lineTo.mockRestore();
		moveTo.mockRestore();
	});

	it("should render rotated line, area, scatter and bubble charts on canvas", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const cases = [
			[line(), columns],
			[area(), columns],
			[scatter(), columns],
			[
				bubble(),
				[["data1", {y: 20, z: 20}, {y: 80, z: 80}]]
			]
		];

		cases.forEach(([type, dataColumns]) => {
			generateWithOptions({
				data: {
					columns: dataColumns,
					type
				},
				axis: {
					rotated: true
				}
			});

			const d = chart.internal.data.targets[0].values[1];
			const {margin} = chart.internal.state;
			const x = margin.left + chart.internal.getYScaleById(d.id)(
				chart.internal.getBaseValue(d)
			);
			const y = margin.top + chart.internal.scale.x(d.x);

			expect(chart.internal.config.axis_rotated).to.be.true;
			expect(chart.internal.hitDetector.findNearest(x, y)).to.equal(d);
			expect(container.querySelectorAll("canvas")).to.have.length(1);
			expect(container.querySelector("svg")).to.be.null;

			chart.destroy();
			container.remove();
			chart = null;
			container = null;
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");

		expect(messages).not.to.contain("axis.rotated");

		warn.mockRestore();
	});

	it("should draw rotated bars and hit-test their swapped canvas bounds", () => {
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

		generateWithOptions({
			data: {
				columns,
				type: bar()
			},
			axis: {
				rotated: true
			},
			tooltip: {
				grouped: false
			}
		});

		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[1];
		const indices = chart.internal.getShapeIndices(chart.internal.isBarType);
		const points = chart.internal.generateGetBarPoints(indices, false)(d, 1);
		const center = getCanvasRectCenter(points, true);

		expect(fillRect).toHaveBeenCalled();
		expect(chart.internal.hitDetector.findNearest(
			margin.left + center.x,
			margin.top + center.y
		)).to.equal(d);

		fillRect.mockRestore();
	});

	it("should draw rotated candlesticks and hit-test their swapped canvas bounds", () => {
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

		generateWithOptions({
			data: {
				columns: candlestickColumns,
				type: candlestick()
			},
			axis: {
				rotated: true
			},
			tooltip: {
				grouped: false
			}
		});

		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[0];
		const indices = chart.internal.getShapeIndices(chart.internal.isCandlestickType);
		const points = chart.internal.generateGetCandlestickPoints(indices, false)(d, 0);
		const center = getCanvasRectCenter([points[0], points[1]], true);

		expect(fillRect).toHaveBeenCalled();
		expect(chart.internal.hitDetector.findNearest(
			margin.left + center.x,
			margin.top + center.y
		)).to.equal(d);

		fillRect.mockRestore();
	});

	it("should keep stacked area and bar geometry on rotated canvas charts", () => {
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

		generateWithOptions({
			data: {
				columns,
				type: area(),
				groups: [["data1", "data2"]]
			},
			axis: {
				rotated: true
			}
		});

		let indices = chart.internal.getShapeIndices(chart.internal.isAreaType);
		let getPoints = chart.internal.generateGetAreaPoints(indices, false);
		let y0 = chart.internal.scale.y(0);
		let stacked = chart.internal.data.targets
			.flatMap(target => target.values.map(datum => ({
				datum,
				points: getPoints(datum, datum.index)
			})))
			.find(({points}) => points[0][1] !== y0);

		expect(chart.internal.config.axis_rotated).to.be.true;
		expect(stacked).not.to.be.undefined;
		expect(fill).toHaveBeenCalled();

		chart.destroy();
		container.remove();
		chart = null;
		container = null;

		generateWithOptions({
			data: {
				columns,
				type: bar(),
				groups: [["data1", "data2"]]
			},
			axis: {
				rotated: true
			}
		});

		indices = chart.internal.getShapeIndices(chart.internal.isBarType);
		getPoints = chart.internal.generateGetBarPoints(indices, false);
		y0 = chart.internal.scale.y(0);
		stacked = chart.internal.data.targets
			.flatMap(target => target.values.map(datum => ({
				datum,
				points: getPoints(datum, datum.index)
			})))
			.find(({points}) => points[0][1] !== y0);

		expect(stacked).not.to.be.undefined;
		expect(fillRect).toHaveBeenCalled();

		fill.mockRestore();
		fillRect.mockRestore();
	});

	it("should show tooltip and horizontal focus line on rotated canvas hover", () => {
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");

		generateWithOptions({
			data: {
				columns,
				type: line()
			},
			axis: {
				rotated: true
			},
			point: {
				focus: {
					only: true
				}
			}
		});

		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[1];
		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
		const tooltip = container.querySelector(".bb-tooltip-container");
		const x = margin.left + chart.internal.scale.y(d.value);
		const y = margin.top + chart.internal.scale.x(d.x);

		lineTo.mockClear();
		canvasEl.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: x,
			clientY: y
		}));

		expect(tooltip.style.display).to.not.be.equal("none");
		expect(tooltip.textContent).to.contain("data1");
		expect(arc).toHaveBeenCalled();
		expect(lineTo.mock.calls.some(([, lineY]) =>
			lineY === chart.internal.scale.x(d.x)
		)).to.be.true;

		arc.mockRestore();
		lineTo.mockRestore();
	});

	it("should show current scale values for rotated canvas axis tooltip hover", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
		const setLineDash = vi.spyOn(CanvasRenderingContext2D.prototype, "setLineDash");

		try {
			generateWithOptions({
				data: {
					columns,
					type: line()
				},
				axis: {
					rotated: true,
					tooltip: {
						backgroundColor: {
							x: "red",
							y: "blue"
						}
					}
				}
			});

			const {margin} = chart.internal.state;
			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
			const xValue = 2.5;
			const yValue = 200;
			const localX = chart.internal.scale.y(yValue);
			const localY = chart.internal.scale.x(xValue);

			fillText.mockClear();
			fillRect.mockClear();
			setLineDash.mockClear();
			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: margin.left + localX,
				clientY: margin.top + localY
			}));

			const texts = fillText.mock.calls.map(([text]) => `${text}`);
			const values = texts.map(text => Number(text)).filter(Number.isFinite);

			expect(values.some(value => Math.abs(value - xValue) < 0.01)).to.be.true;
			expect(values.some(value => Math.abs(value - yValue) < 1)).to.be.true;
			expect(fillRect.mock.calls.some(([, , , h]) => h > 12)).to.be.true;
			expect(setLineDash.mock.calls.every(([segments]) => !segments.length)).to.be.true;
		} finally {
			setLineDash.mockRestore();
			fillRect.mockRestore();
			fillText.mockRestore();
		}
	});

	it("should format timeseries x and y2 values for canvas axis tooltip hover", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

		try {
			generateWithOptions({
				data: {
					x: "x",
					columns: [
						["x", "2024-01-01", "2024-01-02", "2024-01-03"],
						["data1", 30, 200, 100],
						["data2", 20, 40, 60]
					],
					axes: {
						data2: "y2"
					},
					type: line()
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					},
					y2: {
						show: true
					},
					tooltip: {
						backgroundColor: {
							x: "red",
							y: "blue",
							y2: "green"
						}
					}
				}
			});

			const {margin} = chart.internal.state;
			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
			const xValue = chart.internal.data.targets[0].values[1].x;
			const y2Value = chart.internal.data.targets[1].values[1].value;
			const localX = chart.internal.scale.x(xValue);
			const localY = chart.internal.scale.y2(y2Value);

			fillText.mockClear();
			fillRect.mockClear();
			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: margin.left + localX,
				clientY: margin.top + localY
			}));

			const texts = fillText.mock.calls.map(([text]) => `${text}`);
			const values = texts.map(text => Number(text)).filter(Number.isFinite);

			expect(texts).to.contain("2024-01-02");
			expect(values.some(value => Math.abs(value - y2Value) < 1)).to.be.true;
			expect(fillRect).toHaveBeenCalled();
		} finally {
			fillRect.mockRestore();
			fillText.mockRestore();
		}
	});

	it("should place rotated canvas y/y2 tick text next to tick lines", () => {
		const records: Array<{text: string, textBaseline: string, absY: number}> = [];
		const originalFillText = CanvasRenderingContext2D.prototype.fillText;
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(text, x, y, ...args) {
				const transform = this.getTransform();

				if (this.textAlign === "center" && /^(top|bottom)$/.test(this.textBaseline)) {
					records.push({
						text: String(text),
						textBaseline: this.textBaseline,
						absY: transform.b * Number(x) + transform.d * Number(y) + transform.f
					});
				}

				return originalFillText.call(this, text, x, y, ...args);
			});

		try {
			generateWithOptions({
				data: {
					columns,
					type: line()
				},
				axis: {
					rotated: true,
					y2: {
						show: true
					}
				}
			});

			const {height, margin} = chart.internal.state;
			const axisLineWidth = chart.internal.canvasTheme.style.axis.lineWidth;
			const yAxisLine = getCrisp(margin.top + height, axisLineWidth);
			const y2AxisLine = getCrisp(margin.top - 1, axisLineWidth);
			const yTicks = records.filter(({textBaseline}) => textBaseline === "top");
			const y2Ticks = records.filter(({textBaseline}) => textBaseline === "bottom");

			expect(yTicks.length).to.be.greaterThan(0);
			expect(y2Ticks.length).to.be.greaterThan(0);
			expect(yTicks.every(({absY}) =>
				Math.abs(absY - (yAxisLine + AXIS_TICK_SIZE)) < 0.01
			)).to.be.true;
			expect(y2Ticks.every(({absY}) =>
				Math.abs(absY - (y2AxisLine - AXIS_TICK_SIZE)) < 0.01
			)).to.be.true;
		} finally {
			fillText.mockRestore();
		}
	});

	it("should keep one canvas and restore the cached frame after hover overlays", () => {
		const drawImage = vi.spyOn(CanvasRenderingContext2D.prototype, "drawImage");

		try {
			generateWithOptions({
				data: {
					columns,
					type: line()
				},
				point: {
					focus: {
						only: true
					}
				}
			});

			const {margin} = chart.internal.state;
			const d = chart.internal.data.targets[0].values[1];
			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
			const before = countCanvasAlphaPixels(canvasEl);
			const x = margin.left + chart.internal.scale.x(d.x);
			const y = margin.top + chart.internal.scale.y(d.value);

			expect(drawImage).not.toHaveBeenCalled();

			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: x,
				clientY: y
			}));

			expect(container.querySelector(`canvas.${$CANVAS.overlay}`)).to.be.null;
			expect(container.querySelectorAll("canvas")).to.have.length(1);
			expect(countCanvasAlphaPixels(canvasEl)).to.be.greaterThan(before);
			expect(drawImage).toHaveBeenCalledTimes(1);

			canvasEl.dispatchEvent(new MouseEvent("mouseout", {bubbles: true}));

			expect(countCanvasAlphaPixels(canvasEl)).to.be.equal(before);
			expect(drawImage).toHaveBeenCalledTimes(2);
		} finally {
			drawImage.mockRestore();
		}
	});

	it("should cull dense canvas x ticks", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:360px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 360,
				height: 240
			},
			data: {
				columns: generateColumns(1, 1000),
				type: line()
			}
		});

		expect(fillText.mock.calls.length).to.be.lessThan(30);

		fillText.mockRestore();
	});

	it("should cull canvas y and y2 ticks like SVG", () => {
		const records: string[] = [];
		const originalFillText = CanvasRenderingContext2D.prototype.fillText;
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text, ...args) {
				records.push(String(text));

				return originalFillText.call(this, text, ...args);
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 250, 250, 150, 230, 300, 200, 300, 250, 150, 330, 100, 200, 100, 350, 50, 100, 200, 300, 250, 150]
					],
					axes: {
						data2: "y2"
					},
					types: {
						data1: bar(),
						data2: line()
					}
				},
				axis: {
					y: {
						tick: {
							culling: {
								max: 3
							},
							format: value => `y:${value}`
						}
					},
					y2: {
						show: true,
						tick: {
							culling: true,
							format: value => `y2:${value}`
						}
					}
				}
			});

			const yTexts = records.filter(text => text.indexOf("y:") === 0);
			const y2Texts = records.filter(text => text.indexOf("y2:") === 0);
			const {height, margin, width} = chart.internal.state;
			const axisY = getCrisp(margin.left, chart.internal.canvasTheme.style.axis.lineWidth);
			const axisY2 = getCrisp(
				margin.left + width,
				chart.internal.canvasTheme.style.axis.lineWidth
			);
			const getTickLinePositions = (x: number) => new Set(
				lineTo.mock.calls
					.filter(([tx, ty]) =>
						Math.abs(tx - x) < 1.5 &&
						ty >= margin.top - 1 &&
						ty <= margin.top + height + 1
					)
					.map(([, ty]) => Math.round(ty))
			);

			expect(yTexts).to.deep.equal(["y:0", "y:200", "y:400"]);
			expect(y2Texts).to.deep.equal(["y2:50", "y2:150", "y2:250", "y2:350"]);
			expect(getTickLinePositions(axisY - AXIS_TICK_SIZE).size).to.be.at.least(5);
			expect(getTickLinePositions(axisY2 + AXIS_TICK_SIZE).size).to.be.at.least(4);
		} finally {
			fillText.mockRestore();
			lineTo.mockRestore();
		}
	});

	it("should keep canvas x tick lines when x tick text is culled", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:360px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 360,
				height: 240
			},
			data: {
				columns: generateColumns(1, 20),
				type: line()
			},
			axis: {
				x: {
					tick: {
						format: v => `x:${v}`
					}
				},
				y: {
					tick: {
						format: v => `y:${v}`
					}
				}
			}
		});

		const {height, margin, width} = chart.internal.state;
		const axisY = margin.top + height;
		const xTickLinePositions = new Set(
			lineTo.mock.calls
				.filter(([x, y]) =>
					x >= margin.left - 1 &&
					x <= margin.left + width + 1 &&
					Math.abs(y - (axisY + AXIS_TICK_SIZE)) < 1.5
				)
				.map(([x]) => Math.round(x))
		);
		const xTickTexts = fillText.mock.calls
			.map(([text]) => String(text))
			.filter(text => text.indexOf("x:") === 0);

		expect(xTickTexts.length).to.be.lessThan(20);
		expect(xTickLinePositions.size).to.be.at.least(20);

		fillText.mockRestore();
		lineTo.mockRestore();
	});

	it("should cull overlapped canvas x tick lines with x tick text", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:360px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 360,
				height: 240
			},
			data: {
					columns: generateColumns(1, 500),
				type: line()
			},
			axis: {
				x: {
					tick: {
						format: v => `x:${v}`
					}
				},
				y: {
					tick: {
						format: v => `y:${v}`
					}
				}
			}
		});

		const {height, margin, width} = chart.internal.state;
		const axisY = margin.top + height;
		const xTickLinePositions = new Set(
			lineTo.mock.calls
				.filter(([x, y]) =>
					x >= margin.left - 1 &&
					x <= margin.left + width + 1 &&
					Math.abs(y - (axisY + AXIS_TICK_SIZE)) < 1.5
				)
				.map(([x]) => Math.round(x))
		);
		const xTickTexts = fillText.mock.calls
			.map(([text]) => String(text))
			.filter(text => text.indexOf("x:") === 0);

		expect(xTickTexts.length).to.be.lessThan(30);
		expect(xTickLinePositions.size).to.be.lessThan(30);

		fillText.mockRestore();
		lineTo.mockRestore();
	});

	it("should cull explicit canvas x tick values like SVG", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");
		const tickValues = Array.from({length: 50}, (_, i) => i);

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:360px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 360,
				height: 240
			},
			data: {
				columns: generateColumns(1, 50),
				type: line()
			},
			axis: {
				x: {
					tick: {
						values: tickValues,
						culling: {
							max: 5,
							lines: false
						},
						format: v => `x:${v}`
					}
				},
				y: {
					tick: {
						format: v => `y:${v}`
					}
				}
			}
		});

		const {height, margin, width} = chart.internal.state;
		const axisY = margin.top + height;
		const xTickLinePositions = new Set(
			lineTo.mock.calls
				.filter(([x, y]) =>
					x >= margin.left - 1 &&
					x <= margin.left + width + 1 &&
					Math.abs(y - (axisY + AXIS_TICK_SIZE)) < 1.5
				)
				.map(([x]) => Math.round(x))
		);
		const xTickTexts = new Set(fillText.mock.calls
			.map(([text]) => String(text))
			.filter(text => text.indexOf("x:") === 0));

		expect(xTickTexts.size).to.be.equal(5);
		expect(xTickLinePositions.size).to.be.at.most(xTickTexts.size + 2);

		fillText.mockRestore();
		lineTo.mockRestore();
	});

	it("should resize canvas backing and display size", () => {
		const chart = generate(area());
		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);

		chart.resize({width: 360, height: 260});

		expect(canvasEl.style.width).to.be.equal("360px");
		expect(canvasEl.style.height).to.be.equal(`${chart.internal.getCanvasSurfaceHeight()}px`);
		expect(container.style.minHeight).to.be.equal("260px");
		expect(canvasEl.width).to.be.greaterThan(0);
		expect(canvasEl.height).to.be.greaterThan(0);
	});

	it("should remeasure container size during initial canvas redraw", () => {
		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		let measuredWidth = 340;
		const getBoundingClientRect = vi
			.spyOn(container, "getBoundingClientRect")
			.mockImplementation(() => {
				const width = measuredWidth;

				measuredWidth = 320;

				return DOMRect.fromRect({
					width,
					height: 240
				});
			});

		chart = bb.generate({
			bindto: container,
			render: {
				mode: canvas()
			},
			size: {
				height: 240
			},
			data: {
				columns,
				axes: {
					data2: "y2"
				},
				type: bar()
			},
			axis: {
				y2: {
					show: true
				}
			}
		});

		expect(chart.internal.state.current.width).to.equal(320);
		expect(chart.internal.canvasEngine.canvas.style.width).to.equal("320px");

		getBoundingClientRect.mockRestore();
	});

	it("should load and unload data without SVG target joins", () => {
		const chart = generate(line());

		chart.load({
			columns: [
				["data3", 10, 30, 50, 70]
			]
		});

		expect(chart.internal.data.targets.some(t => t.id === "data3")).to.be.true;
		expect(container.querySelector("button[data-id='data3']")).to.not.be.null;
		expect(container.querySelector("svg")).to.be.null;

		chart.unload({
			ids: "data3"
		});

		expect(chart.internal.data.targets.some(t => t.id === "data3")).to.be.false;
		expect(container.querySelector("button[data-id='data3']")).to.be.null;
	});

	it("should export canvas data URL through exportApi", () => {
		const descriptor = Object.getOwnPropertyDescriptor(window, "devicePixelRatio");

		Object.defineProperty(window, "devicePixelRatio", {
			configurable: true,
			value: 2
		});

		try {
			const chart = generate(bar());
			const canvas = chart.$.canvas.node();
			const dataUrl = chart.export();
			const resizedDataUrl = chart.export({
				width: 500,
				height: 100,
				preserveAspectRatio: false
			});
			const surfaceHeight = chart.internal.getCanvasSurfaceHeight();

			expect(canvas.width).to.be.equal(640);
			expect(canvas.height).to.be.equal(surfaceHeight * 2);
			expect(/^data:image\/png;base64,.+/.test(dataUrl)).to.be.true;
			expect(getPngSize(dataUrl)).to.deep.equal({
				width: 320,
				height: surfaceHeight
			});
			expect(getPngSize(resizedDataUrl)).to.deep.equal({
				width: 500,
				height: 100
			});
		} finally {
			descriptor ?
				Object.defineProperty(window, "devicePixelRatio", descriptor) :
				delete window.devicePixelRatio;
		}
	});

	it("should draw data labels on canvas", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 320,
				height: 240
			},
			data: {
				columns,
				type: line(),
				labels: {
					format: v => `v:${v}`
				}
			}
		});

		expect(fillText.mock.calls.some(([text]) => text === "v:400")).to.be.true;

		fillText.mockRestore();
	});

	it("should align multiline canvas line data labels with SVG tspan offsets", () => {
		const records: Array<{text: string, textBaseline: string, absY: number}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string, x: number, y: number) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textBaseline: this.textBaseline,
					absY: transform.f + Number(y)
				});
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", 120]
				],
				type: line(),
				labels: {
					format: () => "first\nsecond"
				}
			}
		});

		const {margin} = chart.internal.state;
		const datum = chart.internal.data.targets[0].values[0];
		const lineHeight = parseFloat(chart.internal.canvasTheme.style.label.font) || 12;
		const anchorY = margin.top + chart.internal.circleY(datum, datum.index) - 6;
		const firstLine = records.find(({text}) => text === "first");
		const secondLine = records.find(({text}) => text === "second");

		expect(firstLine?.textBaseline).to.be.equal("bottom");
		expect(firstLine?.absY).to.be.closeTo(anchorY - lineHeight, 0.1);
		expect(secondLine?.textBaseline).to.be.equal("bottom");
		expect(secondLine?.absY).to.be.closeTo(anchorY, 0.1);

		fillText.mockRestore();
	});

	it("should place negative canvas line data labels below points", () => {
		const records: Array<{text: string, textBaseline: string, absY: number}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string, x: number, y: number) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textBaseline: this.textBaseline,
					absY: transform.f + Number(y)
				});
			});

		generateWithOptions({
			data: {
				columns: [
					["positive", 120],
					["negative", -120]
				],
				type: line(),
				labels: {
					format: (value, id) => `${id}:${value}`
				}
			}
		});

		const {margin} = chart.internal.state;
		const positive = chart.internal.data.targets
			.find(({id}) => id === "positive").values[0];
		const negative = chart.internal.data.targets
			.find(({id}) => id === "negative").values[0];
		const positiveLabel = records.find(({text}) => text === "positive:120");
		const negativeLabel = records.find(({text}) => text === "negative:-120");
		const positivePointY = margin.top + chart.internal.circleY(positive, positive.index);
		const negativePointY = margin.top + chart.internal.circleY(negative, negative.index);

		expect(positiveLabel?.textBaseline).to.be.equal("bottom");
		expect(positiveLabel?.absY).to.be.below(positivePointY);
		expect(negativeLabel?.textBaseline).to.be.equal("top");
		expect(negativeLabel?.absY).to.be.above(negativePointY);

		fillText.mockRestore();
	});

	it("should align rotated canvas bar data labels with SVG offsets", () => {
		const records: Array<{
			text: string,
			textAlign: string,
			absX: number,
			absY: number
		}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string, x: number, y: number) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textAlign: this.textAlign,
					absX: transform.a * Number(x) + transform.c * Number(y) + transform.e,
					absY: transform.b * Number(x) + transform.d * Number(y) + transform.f
				});
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", 90, 100, -100]
				],
				type: bar(),
				labels: {
					format: value => `label:${value}`,
					rotate: 90
				}
			},
			axis: {
				rotated: false
			}
		});

		const {margin} = chart.internal.state;
		const negative = chart.internal.data.targets[0].values[2];
		const indices = chart.internal.getShapeIndices(chart.internal.isBarType);
		const points = chart.internal.generateGetBarPoints(indices, false)(
			negative,
			negative.index
		);
		const center = getCanvasRectCenter(points, false);
		const negativeLabel = records.find(({text}) => text === "label:-100");
		const ctx = chart.$.canvas.node().getContext("2d");

		ctx.font = chart.internal.canvasTheme.style.label.font;
		const metrics = ctx.measureText("label:-100");
		const fontSize = parseFloat(ctx.font) || 12;
		const labelHeight = Math.max(
			fontSize,
			(metrics.fontBoundingBoxAscent || 0) + (metrics.fontBoundingBoxDescent || 0),
			metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || 0
		);

		expect(negativeLabel?.textAlign).to.be.equal("right");
		expect(negativeLabel?.absX).to.be.closeTo(margin.left + center.x - 4, 0.1);
		expect(negativeLabel?.absY).to.be.closeTo(
			margin.top + points[2][1] + labelHeight - 3 + 16,
			0.1
		);

		fillText.mockRestore();
	});

	it("should pass SVG-compatible values to canvas data label formatters", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				columns: [
					["data1", {y: 10, z: 40}, {y: 20, z: 80}]
				],
				type: bubble(),
				labels: {
					format: v => `z:${v}`
				}
			}
		});

		expect(fillText.mock.calls.some(([text]) => text === "z:80")).to.be.true;

		chart.destroy();
		container.remove();
		chart = null;
		container = null;
		fillText.mockClear();

		generateWithOptions({
			data: {
				columns: candlestickColumns,
				type: candlestick(),
				labels: {
					format: v => `close:${v}`
				}
			}
		});

		expect(fillText.mock.calls.some(([text]) => text === "close:1399")).to.be.true;

		fillText.mockRestore();
	});

	it("should position canvas candlestick data labels from wick endpoints", () => {
		const records: Array<{
			text: string,
			textAlign: CanvasTextAlign,
			textBaseline: CanvasTextBaseline,
			x: number,
			y: number
		}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textAlign: this.textAlign,
					textBaseline: this.textBaseline,
					x: transform.e,
					y: transform.f
				});
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1",
							[1300, 1369, 1200, 1339],
							[1348, 1371, 1271, 1320]
						]
					],
					type: candlestick(),
					labels: {
						format: (value, id, index) => `${id}:${index}:${value}`
					}
				}
			});

			const shape = chart.internal.state.canvasShape || chart.internal.getDrawShape();
			const getPoints = chart.internal.generateGetCandlestickPoints(
				shape.indices[TYPE.CANDLESTICK],
				false
			);
			const {margin} = chart.internal.state;
			const up = chart.internal.data.targets[0].values[0];
			const down = chart.internal.data.targets[0].values[1];
			const upPoints = getPoints(up, up.index);
			const downPoints = getPoints(down, down.index);
			const upLabel = records.find(({text}) => text === "data1:0:1339");
			const downLabel = records.find(({text}) => text === "data1:1:1320");

			expect(upLabel?.textAlign).to.be.equal("center");
			expect(upLabel?.textBaseline).to.be.equal("alphabetic");
			expect(upLabel?.x).to.be.closeTo(margin.left + upPoints[2][0], 0.1);
			expect(upLabel?.y).to.be.closeTo(margin.top + upPoints[2][2] - 3, 0.1);
			expect(downLabel?.textAlign).to.be.equal("center");
			expect(downLabel?.textBaseline).to.be.equal("alphabetic");
			expect(downLabel?.x).to.be.closeTo(margin.left + downPoints[2][0], 0.1);
			expect(downLabel?.y).to.be.closeTo(margin.top + downPoints[2][1] + 12, 0.1);
		} finally {
			fillText.mockRestore();
		}
	});

	it("should render category bubble ticks and centered labels on canvas", () => {
		const records: Array<{
			text: string,
			textAlign: string,
			textBaseline: string,
			absoluteX: number,
			absoluteY: number
		}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textAlign: this.textAlign,
					textBaseline: this.textBaseline,
					absoluteX: transform.e,
					absoluteY: transform.f
				});
			});
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");

		generateWithOptions({
			data: {
				columns: [
					["data1", 20, 30, 50, 80, 100],
					["data2", [350, 350], 230, [200, 100], [250, 150], [200, 200]]
				],
				type: bubble(),
				labels: true
			},
			bubble: {
				maxR: 50
			},
			axis: {
				x: {
					type: "category"
				},
				y: {
					max: 450
				}
			}
		});

		const xTickTexts = records
			.filter(({textAlign, textBaseline}) =>
				textAlign === "center" && textBaseline === "top"
			)
			.map(({text}) => text);
		const bubbleLabels = records.filter(({textAlign, textBaseline}) =>
			textAlign === "center" && textBaseline === "middle"
		);
		const xScale = chart.internal.scale.x;
		const rawXScale = xScale.orgScale();
		const categoryOffset = (rawXScale(1) - rawXScale(0)) / 2;
		const {height, margin} = chart.internal.state;
		const firstBubble = chart.internal.data.targets[0].values[0];
		const firstBubbleLabel = bubbleLabels.find(({text}) => text === "20");
		const xAxisTickYMin = margin.top + height;
		const xAxisTickXs = new Set(
			lineTo.mock.calls
				.filter(([, y]) => y > xAxisTickYMin && y <= xAxisTickYMin + AXIS_TICK_SIZE + 2)
				.map(([x]) => Math.round(x))
		);

		expect(xTickTexts).to.deep.equal(["0", "1", "2", "3", "4"]);
		expect(xScale(0)).to.be.closeTo(rawXScale(0) + categoryOffset, 1e-6);
		expect(xAxisTickXs.has(Math.round(margin.left + rawXScale(1)))).to.be.true;
		expect(xAxisTickXs.has(Math.round(margin.left + xScale(0)))).to.be.false;
		expect(bubbleLabels.some(({text}) => text === "20")).to.be.true;
		expect(bubbleLabels.some(({text}) => text === "350")).to.be.true;
		expect(firstBubbleLabel?.absoluteY - margin.top)
			.to.be.closeTo(chart.internal.circleY(firstBubble, firstBubble.index), 1e-6);

		fillText.mockRestore();
		lineTo.mockRestore();
	});

	it("should redraw focused bubble labels over canvas hover points", () => {
		const style = document.createElement("style");
		const fillTextRecords: Array<{
			text: string,
			textAlign: string,
			textBaseline: string,
			fillStyle: string,
			canvasClass: string,
			absoluteY: number,
			globalAlpha: number
		}> = [];
		const fillRecords: Array<{
			fillStyle: string,
			canvasClass: string,
			globalAlpha: number,
			lineWidth: number
		}> = [];
		const arcRecords: Array<{
			canvasClass: string,
			r: number,
			globalAlpha: number,
			lineWidth: number
		}> = [];
		const originalFill = CanvasRenderingContext2D.prototype.fill;
		const originalArc = CanvasRenderingContext2D.prototype.arc;
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string) {
				const transform = this.getTransform();

				fillTextRecords.push({
					text: String(text),
					textAlign: this.textAlign,
					textBaseline: this.textBaseline,
					fillStyle: String(this.fillStyle),
					canvasClass: String(this.canvas?.className || ""),
					absoluteY: transform.f,
					globalAlpha: this.globalAlpha
				});
			});
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill")
			.mockImplementation(function(this: CanvasRenderingContext2D, ...args) {
				fillRecords.push({
					fillStyle: String(this.fillStyle),
					canvasClass: String(this.canvas?.className || ""),
					globalAlpha: this.globalAlpha,
					lineWidth: this.lineWidth
				});

				return originalFill.apply(this, args as []);
			});
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				r: number,
				startAngle: number,
				endAngle: number,
				counterclockwise?: boolean
			) {
				arcRecords.push({
					canvasClass: String(this.canvas?.className || ""),
					r,
					globalAlpha: this.globalAlpha,
					lineWidth: this.lineWidth
				});

				return originalArc.call(this, x, y, r, startAngle, endAngle, counterclockwise);
			});

		style.textContent = `
			.bb-circle {
				fill: rgb(255, 255, 255) !important;
			}
			.bb-circle._expanded_ {
				fill: rgb(255, 255, 255) !important;
				stroke-width: 2px;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 20, 30, 50, 80, 100],
						["data2", [350, 350], 230, [200, 100], [250, 150], [200, 200]]
					],
					type: bubble(),
					labels: true
				},
				bubble: {
					maxR: 50
				},
				axis: {
					x: {
						type: "category"
					},
					y: {
						max: 450
					}
				}
			});

				const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
				const rect = canvasEl.getBoundingClientRect();
				const {margin} = chart.internal.state;
				const d = chart.internal.data.targets[0].values[0];
				const expectedExpandedRadius = chart.internal.pointExpandedR(d);

				fillTextRecords.length = 0;
			fillRecords.length = 0;
			arcRecords.length = 0;
			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: rect.left + margin.left + chart.internal.circleX(d, d.index),
				clientY: rect.top + margin.top + chart.internal.circleY(d, d.index)
			}));

			const focusLabel = fillTextRecords.find(({canvasClass, text}) =>
				canvasClass.includes($CANVAS.canvas) && text === "20"
			);
				const expandedPointFill = fillRecords.find(({canvasClass, fillStyle}) =>
					canvasClass.includes($CANVAS.canvas) &&
					fillStyle === "#ffffff"
				);
				const expandedPointArc = arcRecords.find(({canvasClass, r}) =>
					canvasClass.includes($CANVAS.canvas) &&
					Math.abs(r - expectedExpandedRadius) < 1e-6
				);
				const expandedPointArcs = arcRecords.filter(({canvasClass, r}) =>
					canvasClass.includes($CANVAS.canvas) &&
					Math.abs(r - expectedExpandedRadius) < 1e-6
				);

				expect(chart.internal.state.canvasFocusKey).to.contain("data1:0");
				expect(chart.internal.state.canvasFocusMainRedraw).to.be.false;
				expect(focusLabel).not.to.be.undefined;
				expect(focusLabel?.textAlign).to.be.equal("center");
			expect(focusLabel?.textBaseline).to.be.equal("middle");
			expect(focusLabel?.fillStyle).to.be.equal(chart.internal.color("data1"));
			expect(focusLabel?.globalAlpha).to.be.equal(1);
			expect(focusLabel?.absoluteY - margin.top)
				.to.be.closeTo(chart.internal.circleY(d, d.index), 1e-6);
				expect(expandedPointFill?.globalAlpha).to.be.equal(0.5);
				expect(expandedPointArc?.globalAlpha).to.be.equal(0.5);
				expect(expandedPointArcs).to.have.length(1);
			expect(container.querySelector(`canvas.${$CANVAS.overlay}`)).to.be.null;
			expect(container.querySelectorAll("canvas")).to.have.length(1);
		} finally {
			style.remove();
			arc.mockRestore();
			fill.mockRestore();
			fillText.mockRestore();
		}
	});

	it("should draw same-color focused bubble as one translucent shape", () => {
		const arcRecords: Array<{
			canvasClass: string,
			r: number,
			globalAlpha: number,
			lineWidth: number
		}> = [];
		const strokeRecords: Array<{
			canvasClass: string,
			strokeStyle: string,
			globalAlpha: number,
			lineWidth: number
		}> = [];
		const originalArc = CanvasRenderingContext2D.prototype.arc;
		const originalStroke = CanvasRenderingContext2D.prototype.stroke;
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				r: number,
				startAngle: number,
				endAngle: number,
				counterclockwise?: boolean
			) {
				arcRecords.push({
					canvasClass: String(this.canvas?.className || ""),
					r,
					globalAlpha: this.globalAlpha,
					lineWidth: this.lineWidth
				});

				return originalArc.call(this, x, y, r, startAngle, endAngle, counterclockwise);
			});
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D, ...args) {
				strokeRecords.push({
					canvasClass: String(this.canvas?.className || ""),
					strokeStyle: String(this.strokeStyle),
					globalAlpha: this.globalAlpha,
					lineWidth: this.lineWidth
				});

				return originalStroke.apply(this, args as []);
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 20, 30],
						["data2", 40, 50]
					],
					type: bubble(),
					labels: true
				},
				bubble: {
					maxR: 30
				}
			});

			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
			const rect = canvasEl.getBoundingClientRect();
			const {margin} = chart.internal.state;
			const d = chart.internal.data.targets[0].values[0];
			const color = chart.internal.color(d.id);
			const focusLineWidth = chart.internal.canvasTheme.style.focusPoint.lineWidth;

			arcRecords.length = 0;
			strokeRecords.length = 0;
			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: rect.left + margin.left + chart.internal.circleX(d, d.index),
				clientY: rect.top + margin.top + chart.internal.circleY(d, d.index)
			}));

			const expectedExpandedRadius = chart.internal.pointExpandedR(d) + focusLineWidth / 2;
				const expandedPointArcs = arcRecords.filter(({canvasClass, r}) =>
					canvasClass.includes($CANVAS.canvas) &&
					Math.abs(r - expectedExpandedRadius) < 1e-6
				);
				const expandedPointStroke = strokeRecords.find(({
					canvasClass,
					globalAlpha,
					lineWidth,
				strokeStyle
			}) =>
				canvasClass.includes($CANVAS.canvas) &&
				strokeStyle === color &&
				globalAlpha === 0.5 &&
				lineWidth === focusLineWidth
				);

				expect(chart.internal.state.canvasFocusKey).to.contain("data1:0");
				expect(chart.internal.state.canvasFocusMainRedraw).to.be.false;
				expect(expandedPointArcs).to.have.length(1);
			expect(expandedPointArcs[0].r)
				.to.be.closeTo(expectedExpandedRadius, 1e-6);
			expect(expandedPointArcs[0].globalAlpha).to.be.equal(0.5);
			expect(expandedPointStroke).to.be.undefined;
		} finally {
			stroke.mockRestore();
			arc.mockRestore();
		}
	});

	it("should honor point type and sensitivity options on canvas points", () => {
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			point: {
				r: 6,
				sensitivity: 1,
				type: "rectangle"
			},
			tooltip: {
				grouped: false
			}
		});

		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[1];
		const x = margin.left + chart.internal.scale.x(d.x);
		const y = margin.top + chart.internal.scale.y(d.value);

		expect(fillRect).toHaveBeenCalled();
		expect(arc).not.toHaveBeenCalled();
		expect(chart.internal.hitDetector.findNearest(x + 2, y)).to.be.null;
		expect(chart.internal.hitDetector.findNearest(x + 0.5, y)).to.equal(d);

		fillRect.mockRestore();
		arc.mockRestore();
	});

	it("should draw default canvas points with target-color stroke", () => {
		const pointStrokeRecords: Array<{strokeStyle: string, lineWidth: number}> = [];
		const originalBeginPath = CanvasRenderingContext2D.prototype.beginPath;
		const originalArc = CanvasRenderingContext2D.prototype.arc;
		const originalStroke = CanvasRenderingContext2D.prototype.stroke;
		let pathHasPointArc = false;
		const beginPath = vi.spyOn(CanvasRenderingContext2D.prototype, "beginPath")
			.mockImplementation(function(this: CanvasRenderingContext2D, ...args) {
				pathHasPointArc = false;

				return originalBeginPath.apply(this, args as []);
			});
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				r: number,
				startAngle: number,
				endAngle: number,
				counterclockwise?: boolean
			) {
				if (Math.abs(r - 2.5) < 1e-6) {
					pathHasPointArc = true;
				}

				return originalArc.call(this, x, y, r, startAngle, endAngle, counterclockwise);
			});
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D, ...args) {
				if (pathHasPointArc) {
					pointStrokeRecords.push({
						strokeStyle: String(this.strokeStyle),
						lineWidth: this.lineWidth
					});
				}

				return originalStroke.apply(this, args as []);
			});

		try {
			generateWithOptions({
				data: {
					columns,
					type: line()
				}
			});

			const color = chart.internal.color("data1");

			expect(chart.internal.canvasTheme.style.shape.pointStrokeColor).to.be.undefined;
			expect(pointStrokeRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === color && lineWidth === 1
			)).to.be.true;
		} finally {
			stroke.mockRestore();
			arc.mockRestore();
			beginPath.mockRestore();
		}
	});

	it("should keep target-color stroke when CSS overrides canvas point fill", () => {
		const style = document.createElement("style");
		const strokeRecords: Array<{strokeStyle: string, lineWidth: number}> = [];
		const originalStroke = CanvasRenderingContext2D.prototype.stroke;
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D, ...args) {
				strokeRecords.push({
					strokeStyle: String(this.strokeStyle),
					lineWidth: this.lineWidth
				});

				return originalStroke.apply(this, args as []);
			});

		style.textContent = `
			.bb-circle {
				fill: rgb(255, 255, 255) !important;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns,
					type: scatter()
				}
			});

			const color = chart.internal.color("data1");

			expect(chart.internal.canvasTheme.style.shape.pointFillColor)
				.to.be.equal("rgb(255, 255, 255)");
			expect(chart.internal.canvasTheme.style.shape.pointStrokeColor).to.be.undefined;
			expect(strokeRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === color && lineWidth === 1
			)).to.be.true;
		} finally {
			style.remove();
			stroke.mockRestore();
		}
	});

	it("should skip line data points on canvas subchart to match SVG", () => {
		const pointArcRecords: Array<{
			r: number,
			tx: number,
			ty: number
		}> = [];
		const originalArc = CanvasRenderingContext2D.prototype.arc;
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				r: number,
				startAngle: number,
				endAngle: number,
				counterclockwise?: boolean
			) {
				const transform = this.getTransform();

				pointArcRecords.push({r, tx: transform.e, ty: transform.f});

				return originalArc.call(this, x, y, r, startAngle, endAngle, counterclockwise);
			});

		try {
			generateWithOptions({
				data: {
					columns,
					type: line()
				},
				subchart: {
					show: true
				}
			});

			const {margin, margin2} = chart.internal.state;

			expect(pointArcRecords.some(({r, tx, ty}) =>
				r <= 3 &&
				Math.abs(tx - margin.left) < 0.1 &&
				Math.abs(ty - margin.top) < 0.1
			)).to.be.true;
			expect(pointArcRecords.some(({r, tx, ty}) =>
				r <= 3 &&
				Math.abs(tx - margin2.left) < 0.1 &&
				Math.abs(ty - margin2.top) < 0.1
			)).to.be.false;
		} finally {
			arc.mockRestore();
		}
	});

	it("should use target-color focus stroke when expanded point CSS omits stroke", () => {
		const style = document.createElement("style");
		const strokeRecords: Array<{strokeStyle: string, lineWidth: number}> = [];
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				strokeRecords.push({
					strokeStyle: String(this.strokeStyle),
					lineWidth: this.lineWidth
				});
			});

		style.textContent = `
			.bb-circle {
				fill: rgb(255, 255, 255) !important;
			}
			.bb-circle._expanded_ {
				stroke: none;
				stroke-width: 2px;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns,
					type: scatter()
				}
			});

			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
			const rect = canvasEl.getBoundingClientRect();
			const {margin} = chart.internal.state;
			const d = chart.internal.data.targets[0].values[1];
			const color = chart.internal.color("data1");

			strokeRecords.length = 0;
			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: rect.left + margin.left + chart.internal.scale.x(d.x),
				clientY: rect.top + margin.top + chart.internal.scale.y(d.value)
			}));

			expect(chart.internal.canvasTheme.style.focusPoint.stroke).to.be.undefined;
			expect(chart.internal.canvasTheme.style.focusPoint.fill)
				.to.be.equal("rgb(255, 255, 255)");
			expect(strokeRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === color && lineWidth === 2
			)).to.be.true;
		} finally {
			style.remove();
			stroke.mockRestore();
		}
	});

	it("should use focus fill override but target-color stroke like SVG point hover", () => {
		const style = document.createElement("style");
		const fillRecords: Array<{fillStyle: string, strokeStyle: string, lineWidth: number}> = [];
		const strokeRecords: Array<{strokeStyle: string, lineWidth: number}> = [];
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				fillRecords.push({
					fillStyle: String(this.fillStyle),
					strokeStyle: String(this.strokeStyle),
					lineWidth: this.lineWidth
				});
			});
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				strokeRecords.push({
					strokeStyle: String(this.strokeStyle),
					lineWidth: this.lineWidth
				});
			});

		style.textContent = `
			.bb-circle._expanded_ {
				fill: rgb(255, 255, 255) !important;
				stroke: rgb(255, 0, 0);
				stroke-width: 2px;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns,
					type: scatter()
				}
			});

			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
			const rect = canvasEl.getBoundingClientRect();
			const {margin} = chart.internal.state;
			const d = chart.internal.data.targets[0].values[1];
			const color = chart.internal.color("data1");

			fillRecords.length = 0;
			strokeRecords.length = 0;
			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: rect.left + margin.left + chart.internal.scale.x(d.x),
				clientY: rect.top + margin.top + chart.internal.scale.y(d.value)
			}));

			expect(chart.internal.canvasTheme.style.focusPoint.fill)
				.to.be.equal("rgb(255, 255, 255)");
			expect(chart.internal.canvasTheme.style.focusPoint.stroke).to.be.undefined;
			expect(fillRecords.some(({fillStyle, strokeStyle, lineWidth}) =>
				fillStyle === "#ffffff" && strokeStyle === color && lineWidth === 2
			)).to.be.true;
			expect(strokeRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === color && lineWidth === 2
			)).to.be.true;
		} finally {
			style.remove();
			fill.mockRestore();
			stroke.mockRestore();
		}
	});

	it("should honor radial gradient option on canvas points", () => {
		const createRadialGradient = vi.spyOn(
			CanvasRenderingContext2D.prototype,
			"createRadialGradient"
		);

		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			point: {
				r: 20,
				radialGradient: true
			}
		});

		const {cx, cy} = chart.internal.getDrawShape().pos;
		const d = chart.internal.data.targets[0].values[0];
		const x = cx(d);
		const y = cy(d);
		const gradientX = x + (0.3 - 0.5) * 20 * 2;
		const gradientY = y + (0.3 - 0.5) * 20 * 2;

		expect(createRadialGradient).toHaveBeenCalled();

		const args = createRadialGradient.mock.calls[0].map(Number);

		expect(args[0]).to.be.closeTo(gradientX, 0.1);
		expect(args[1]).to.be.closeTo(gradientY, 0.1);
		expect(args[2]).to.be.equal(0);
		expect(args[3]).to.be.closeTo(gradientX, 0.1);
		expect(args[4]).to.be.closeTo(gradientY, 0.1);
		expect(args[5]).to.be.closeTo(20 * 0.7 * 2, 0.1);

		createRadialGradient.mockRestore();
	});

	it("should honor scatter and bubble shape options in canvas geometry", () => {
		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			scatter: {
				zerobased: true
			}
		});

		expect(chart.internal.scale.y.domain()[0]).to.be.at.most(0);

		chart.destroy();
		container.remove();
		chart = null;
		container = null;

		generateWithOptions({
			data: {
				columns: [
					["data1", {y: 20, z: 20}, {y: 80, z: 80}]
				],
				type: bubble()
			},
			bubble: {
				maxR: 8,
				zerobased: true
			}
		});

		const radii = chart.internal.data.targets[0].values.map(d => chart.internal.pointR(d));

		expect(Math.max(...radii)).to.be.at.most(8.01);
		expect(chart.internal.scale.y.domain()[0]).to.be.at.most(0);
	});

	it("should honor candlestick width and down color options on canvas", () => {
		const colors: string[] = [];
		const fillRect = vi
			.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				colors.push(String(this.fillStyle));
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", [10, 15, 5, 7], [7, 12, 6, 10]]
				],
				type: candlestick()
			},
			candlestick: {
				width: {
					max: 4
				},
				color: {
					down: {
						data1: "#123456"
					}
				}
			}
		});

		const indices = chart.internal.getShapeIndices(chart.internal.isCandlestickType);
		const getPoints = chart.internal.generateGetCandlestickPoints(indices, false);
		const points = getPoints(chart.internal.data.targets[0].values[0], 0);
		const width = Math.abs(points[1][0] - points[0][0]);

		expect(width).to.be.at.most(4);
		expect(colors.some(color => color === "#123456" || color === "rgb(18, 52, 86)")).to.be.true;

		fillRect.mockRestore();
	});

	it("should honor treemap label options on canvas", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				columns: [
					["data1", 30],
					["data2", 10]
				],
				type: treemap()
			},
			treemap: {
				tile: "dice",
				label: {
					format: (value, ratio, id, size) =>
						`${id}:${value}:${ratio > 0}:${size.width > 0}`,
					threshold: 0
				}
			}
		});

		expect(chart.internal.config.treemap_tile).to.be.equal("dice");
		expect(fillText.mock.calls.some(([text]) => String(text).startsWith("data1:30:true:true")))
			.to.be.true;

		chart.destroy();
		container.remove();
		chart = null;
		container = null;
		fillText.mockClear();

		generateWithOptions({
			data: {
				columns: [
					["data1", 30],
					["data2", 10]
				],
				type: treemap()
			},
			treemap: {
				label: {
					show: false
				}
			}
		});

		expect(fillText).not.toHaveBeenCalled();

		fillText.mockRestore();
	});

	it("should draw treemap label images on canvas", async () => {
		const calls: Array<{
			type: string,
			text?: string,
			x?: number,
			y?: number,
			w?: number,
			h?: number,
			fillStyle?: string
		}> = [];
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

		const drawImage = vi
			.spyOn(CanvasRenderingContext2D.prototype, "drawImage")
			.mockImplementation(function(...args) {
				if (args.length === 5) {
					calls.push({
						type: "image",
						x: Number(args[1]),
						y: Number(args[2]),
						w: Number(args[3]),
						h: Number(args[4])
					});
				}
			});
		const fillText = vi
			.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(text, x, y) {
				const value = String(text);

				if (value === "data1" || value === "100.00%") {
					calls.push({
						type: "text",
						text: value,
						x: Number(x),
						y: Number(y),
						fillStyle: String(this.fillStyle)
					});
				}
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", 30]
				],
				type: treemap(),
				labels: {
					image: {
						url: "/treemap-{=ID}.png",
						width: 20,
						height: 10
					},
					centered: true
				}
			}
		});

		expect(calls.some(call => call.type === "image")).to.be.false;

		loadImage();
		await Promise.resolve();

		const imageIndex = calls.findIndex(call => call.type === "image");
		const textIndex = calls.findIndex((call, index) =>
			index > imageIndex && call.type === "text" && call.text === "data1"
		);
		const image = calls[imageIndex];
		const text = calls[textIndex];

		expect(imageIndex).to.be.greaterThan(-1);
		expect(textIndex).to.be.greaterThan(-1);
		expect(imageIndex).to.be.lessThan(textIndex);
		expect(image.w).to.be.equal(20);
		expect(image.h).to.be.equal(10);
		expect(image.y).to.be.lessThan(text.y);
		expect(text.y - (image.y + image.h)).to.be.lessThan(20);
		expect(text.fillStyle).to.be.equal("#000000");

		drawImage.mockRestore();
		fillText.mockRestore();
		vi.unstubAllGlobals();
	});

	it("should keep data groups for stacked area targets", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 320,
				height: 240
			},
			data: {
				columns,
				type: area(),
				groups: [["data1", "data2"]]
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const indices = chart.internal.getShapeIndices(chart.internal.isAreaType);
		const getPoints = chart.internal.generateGetAreaPoints(indices, false);
		const y0 = chart.internal.scale.y(0);
		const stacked = chart.internal.data.targets
			.flatMap(target => target.values.map(datum => ({
				datum,
				points: getPoints(datum, datum.index)
			})))
			.find(({points}) => points[0][1] !== y0);

		expect(messages).not.to.contain("data.groups");
		expect(chart.internal.config.data_groups).to.deep.equal([["data1", "data2"]]);
		expect(stacked).not.to.be.undefined;
		expect(stacked.points[1][1]).to.be.lessThan(chart.internal.scale.y(stacked.datum.value));
		expect(fill).toHaveBeenCalled();

		fill.mockRestore();
		warn.mockRestore();
	});

	it("should keep data groups for stacked bar targets", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 320,
				height: 240
			},
			data: {
				columns,
				type: bar(),
				groups: [["data1", "data2"]]
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const indices = chart.internal.getShapeIndices(chart.internal.isBarType);
		const getPoints = chart.internal.generateGetBarPoints(indices, false);
		const y0 = chart.internal.scale.y(0);
		const stacked = chart.internal.data.targets
			.flatMap(target => target.values.map(datum => ({
				datum,
				points: getPoints(datum, datum.index)
			})))
			.find(({points}) => points[0][1] !== y0);

		expect(messages).not.to.contain("data.groups");
		expect(chart.internal.config.data_groups).to.deep.equal([["data1", "data2"]]);
		expect(stacked).not.to.be.undefined;
		expect(stacked.points[1][1]).to.be.lessThan(chart.internal.scale.y(stacked.datum.value));
		expect(fillRect).toHaveBeenCalled();

		fillRect.mockRestore();
		warn.mockRestore();
	});

	it("should keep data groups for line, scatter, bubble and candlestick targets", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const cases = [
			{type: line()},
			{type: scatter()},
			{type: bubble()},
			{
				type: candlestick(),
				columns: [
					["data1", [10, 15, 5, 12], [12, 18, 8, 16]],
					["data2", [4, 8, 3, 7], [7, 10, 5, 9]]
				],
				candlestick: true
			}
		];

		for (const item of cases) {
			generateWithOptions({
				data: {
					columns: item.columns || columns,
					type: item.type,
					groups: [["data1", "data2"]]
				}
			});

			expect(chart.internal.config.data_groups).to.deep.equal([["data1", "data2"]]);

			if (item.candlestick) {
				const indices = chart.internal.getShapeIndices(chart.internal.isCandlestickType);
				const getPoints = chart.internal.generateGetCandlestickPoints(indices, false);
				const d = chart.internal.data.targets[1].values[0];
				const value = chart.internal.getCandlestickData(d);
				const points = getPoints(d, d.index);

				expect(points[0][1]).to.be.lessThan(chart.internal.scale.y(value.open));
				expect(points[1][1]).to.be.lessThan(chart.internal.scale.y(value.close));
			} else {
				const stacked = chart.internal.data.targets
					.flatMap(target => target.values)
					.find(d =>
						chart.internal.circleY(d, d.index) <
						chart.internal.scale.y(chart.internal.getBaseValue(d))
					);

				expect(stacked).not.to.be.undefined;
			}

			chart.destroy();
			container.remove();
			chart = null;
			container = null;
		}

		const messages = warn.mock.calls.map(([message]) => message).join("\n");

		expect(messages).not.to.contain("data.groups");

		warn.mockRestore();
	});

	it("should draw custom SVG point.pattern shapes on canvas", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const closePath = vi.spyOn(CanvasRenderingContext2D.prototype, "closePath");
		const scaleRecords: number[][] = [];
		const originalScale = CanvasRenderingContext2D.prototype.scale;
		const scale = vi.spyOn(CanvasRenderingContext2D.prototype, "scale")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				scaleRecords.push([x, y]);

				return originalScale.call(this, x, y);
			});

		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			point: {
				pattern: [
					"<polygon points='4 0 8 8 0 8'></polygon>"
				]
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");

		expect(messages).not.to.contain("point.pattern");
		expect(closePath).toHaveBeenCalled();
		expect(scaleRecords.some(([x, y]) => x === 1 && y === 1)).to.be.true;

		scale.mockRestore();
		closePath.mockRestore();
		warn.mockRestore();
	});

	it("should resolve local use, transform and style for custom SVG point.pattern", () => {
		const fillRecords: any[] = [];
		const strokeRecords: any[] = [];
		const transformRecords: any[] = [];
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				fillRecords.push({
					fillStyle: String(this.fillStyle),
					alpha: this.globalAlpha
				});
			});
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				strokeRecords.push({
					strokeStyle: String(this.strokeStyle),
					lineWidth: this.lineWidth,
					alpha: this.globalAlpha
				});
			});
		const transform = vi.spyOn(CanvasRenderingContext2D.prototype, "transform")
			.mockImplementation(function(...args) {
				transformRecords.push(args);
			});

		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			point: {
				pattern: [
					`<svg viewBox="0 0 10 10">
						<defs>
							<symbol id="tri">
								<polygon
									points="0 0 10 0 5 10"
									fill="rgb(1, 2, 3)"
									stroke="rgb(4, 5, 6)"
									stroke-width="2"
									opacity=".5">
								</polygon>
							</symbol>
						</defs>
						<g transform="translate(1, 1) scale(.8)">
							<use href="#tri"></use>
						</g>
					</svg>`
				]
			}
		});

		expect(transformRecords.some(([a, b, c, d, e, f]) =>
			a === 0.8 && b === 0 && c === 0 && d === 0.8 && e === 1 && f === 1
		)).to.be.true;
		expect(fillRecords.some(({fillStyle, alpha}) =>
			fillStyle === "#010203" && alpha < 1
		)).to.be.true;
		expect(strokeRecords.some(({strokeStyle, lineWidth, alpha}) =>
			strokeStyle === "#040506" && lineWidth === 2 && alpha < 1
		)).to.be.true;

		transform.mockRestore();
		stroke.mockRestore();
		fill.mockRestore();
	});

	it("should resolve local gradient paint servers and skew transforms for custom SVG point.pattern", () => {
		const transformRecords: any[] = [];
		const linearGradient = vi.spyOn(CanvasRenderingContext2D.prototype, "createLinearGradient");
		const radialGradient = vi.spyOn(CanvasRenderingContext2D.prototype, "createRadialGradient");
		const transform = vi.spyOn(CanvasRenderingContext2D.prototype, "transform")
			.mockImplementation(function(...args) {
				transformRecords.push(args);
			});

		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			point: {
				pattern: [
					`<svg viewBox="0 0 10 10">
						<defs>
							<linearGradient id="fill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stop-color="#ff0000" stop-opacity=".75"></stop>
								<stop offset="100%" stop-color="#0000ff"></stop>
							</linearGradient>
							<radialGradient id="stroke-gradient" cx="50%" cy="50%" r="50%">
								<stop offset="0" stop-color="#00ff00"></stop>
								<stop offset="1" stop-color="#000000"></stop>
							</radialGradient>
						</defs>
						<rect
							x="1"
							y="1"
							width="8"
							height="8"
							fill="url(#fill-gradient)"
							stroke="url(#stroke-gradient)"
							stroke-width="1"
							transform="skewX(10) skewY(5)">
						</rect>
					</svg>`
				]
			}
		});

		expect(linearGradient).toHaveBeenCalled();
		expect(radialGradient).toHaveBeenCalled();
		expect(transformRecords.some(([, b, c]) =>
			Math.abs(b) > 0.01 && Math.abs(c) > 0.01
		)).to.be.true;

		transform.mockRestore();
		radialGradient.mockRestore();
		linearGradient.mockRestore();
	});

	it("should draw circle, ellipse, line and path point.pattern shapes on canvas", () => {
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc");
		const ellipse = vi.spyOn(CanvasRenderingContext2D.prototype, "ellipse");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill");
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke");
		const transformRecords: any[] = [];
		const originalTransform = CanvasRenderingContext2D.prototype.transform;
		const transform = vi.spyOn(CanvasRenderingContext2D.prototype, "transform")
			.mockImplementation(function(...args) {
				transformRecords.push(args);

				return originalTransform.call(this, ...args);
			});

		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			point: {
				pattern: [
					`<svg viewBox="0 0 12 12">
						<g transform="matrix(1,0,0,1,1,2) rotate(15 6 6)">
							<circle cx="3" cy="3" r="2" fill="none" stroke="#111"></circle>
							<ellipse cx="8" cy="3" rx="2" ry="1" fill="#222" stroke="none"></ellipse>
							<line x1="1" y1="10" x2="11" y2="10" stroke="#333"></line>
							<path d="M2 6 L10 6" fill="none" stroke="#444"></path>
						</g>
					</svg>`
				]
			}
		});

		expect(arc).toHaveBeenCalled();
		expect(ellipse).toHaveBeenCalled();
		expect(lineTo).toHaveBeenCalled();
		expect(fill).toHaveBeenCalled();
		expect(stroke).toHaveBeenCalled();
		expect(transformRecords.some(([a, b, c, d, e, f]) =>
			Math.abs(a - 0.9659) < 0.01 &&
			Math.abs(b - 0.2588) < 0.01 &&
			Math.abs(c + 0.2588) < 0.01 &&
			Math.abs(d - 0.9659) < 0.01 &&
			e !== 0 &&
			f !== 0
		)).to.be.true;

		transform.mockRestore();
		stroke.mockRestore();
		fill.mockRestore();
		lineTo.mockRestore();
		ellipse.mockRestore();
		arc.mockRestore();
	});

	it("should fall back to default canvas point for unsupported point.pattern strings", () => {
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc");

		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			point: {
				pattern: ["unsupported-pattern"]
			}
		});

		expect(arc).toHaveBeenCalled();

		arc.mockRestore();
	});

	it("should draw data.empty.label.text on canvas", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				columns: [],
				type: line(),
				empty: {
					label: {
						text: "No data"
					}
				}
			}
		});

		expect(fillText.mock.calls.some(([text]) => text === "No data")).to.be.true;

		fillText.mockRestore();
	});

	it("should dispatch data callbacks from canvas hit targets", () => {
		const onclick = vi.fn();
		const onover = vi.fn();
		const onout = vi.fn();

		generateWithOptions({
			data: {
				columns,
				type: scatter(),
				onclick,
				onover,
				onout
			},
			tooltip: {
				grouped: false
			}
		});

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[0];
		const clientX = rect.left + margin.left + chart.internal.xx(d);
		const clientY = rect.top + margin.top + chart.internal.circleY(d, d.index);
		const eventOptions = {clientX, clientY, bubbles: true};

		canvas.dispatchEvent(new MouseEvent("mousemove", eventOptions));
		canvas.dispatchEvent(new MouseEvent("click", eventOptions));
		canvas.dispatchEvent(new MouseEvent("mouseout", {bubbles: true}));

		expect(onover).toHaveBeenCalledWith(d, canvas);
		expect(onclick).toHaveBeenCalledWith(d, canvas);
		expect(onout).toHaveBeenCalledWith(d, canvas);
	});

	it("should use point-based interaction for canvas scatter", () => {
		const onover = vi.fn();

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 350, 20, 10, 40]
				],
				type: scatter(),
				onover
			}
		});

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {height, margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[0];
		const pointX = rect.left + margin.left + chart.internal.xx(d);
		const pointY = rect.top + margin.top + chart.internal.circleY(d, d.index);
		const plotTop = rect.top + margin.top;
		const plotBottom = plotTop + height;
		const farY = pointY + 40 < plotBottom ? pointY + 40 : pointY - 40;

		canvas.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: pointX,
			clientY: farY
		}));

		expect(onover).not.toHaveBeenCalled();
		expect(chart.internal.state.canvasFocusKey).to.be.null;

		canvas.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: pointX,
			clientY: pointY
		}));

		expect(onover).toHaveBeenCalledWith(d, canvas);
		expect(chart.internal.state.canvasFocusKey).to.be.equal("data1:0");
	});

	it("should select grouped data and active x tick style from canvas x axis hover", () => {
		const onover = vi.fn();
		const style = document.createElement("style");
		const fillTextRecords: Array<{text: string, fillStyle: string}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string) {
				fillTextRecords.push({
					text: String(text),
					fillStyle: String(this.fillStyle)
				});
			});

		style.textContent = `
			.tick._active_ text {
				fill: rgb(1, 2, 3) !important;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns,
					type: line(),
					onover
				},
				axis: {
					x: {
						tick: {
							format: v => `x:${v}`
						}
					}
				}
			});

			const canvas = chart.$.canvas.node();
			const rect = canvas.getBoundingClientRect();
			const {height, margin, xAxisHeight} = chart.internal.state;
			const d = chart.internal.data.targets[0].values[1];
			const localX = margin.left + chart.internal.scale.x(d.x);
			const localY = margin.top + height + Math.min(Math.max(xAxisHeight / 2, 1), 12);

			canvas.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: rect.left + localX,
				clientY: rect.top + localY
			}));

			expect(onover).toHaveBeenCalledWith(d, canvas);
			expect(chart.internal.state.canvasFocusKey).to.be.equal("data1:1|data2:1");
			expect(fillTextRecords.some(({text, fillStyle}) =>
				text === "x:1" && fillStyle === "#010203"
			)).to.be.true;
		} finally {
			style.remove();
			fillText.mockRestore();
		}
	});

	it("should apply SVG expanded bar opacity from canvas x axis hover", () => {
		const onover = vi.fn();
		const style = document.createElement("style");
		const fillRectRecords: Array<{alpha: number, fillStyle: string}> = [];
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				fillRectRecords.push({
					alpha: this.globalAlpha,
					fillStyle: String(this.fillStyle)
				});
			});

		style.textContent = `
			.bb-bar._expanded_ {
				fill-opacity: .42 !important;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns,
					type: bar(),
					onover
				}
			});

			const canvas = chart.$.canvas.node();
			const rect = canvas.getBoundingClientRect();
			const {height, margin, xAxisHeight} = chart.internal.state;
			const d = chart.internal.data.targets[0].values[1];
			const localX = margin.left + chart.internal.scale.x(d.x);
			const localY = margin.top + height + Math.min(Math.max(xAxisHeight / 2, 1), 12);

			fillRectRecords.length = 0;
			canvas.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: rect.left + localX,
				clientY: rect.top + localY
			}));

			expect(onover).toHaveBeenCalledWith(d, canvas);
			expect(chart.internal.state.canvasFocusKey).to.be.equal("data1:1|data2:1");
			expect(fillRectRecords.filter(({alpha}) => alpha === 0.42).length)
				.to.be.at.least(2);
		} finally {
			style.remove();
			fillRect.mockRestore();
		}
	});

	it("should dispatch data callbacks from canvas touch events", () => {
		const onclick = vi.fn();
		const onover = vi.fn();
		const onout = vi.fn();

		generateWithOptions({
			data: {
				columns,
				type: scatter(),
				onclick,
				onover,
				onout
			},
			interaction: {
				inputType: {
					touch: true
				}
			},
			tooltip: {
				grouped: false
			}
		});

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[0];
		const clientX = rect.left + margin.left + chart.internal.xx(d);
		const clientY = rect.top + margin.top + chart.internal.circleY(d, d.index);
		const touch = new Touch({
			identifier: 1,
			target: canvas,
			clientX,
			clientY
		});
		const eventOptions = {
			cancelable: true,
			bubbles: true,
			touches: [touch],
			targetTouches: [touch],
			changedTouches: [touch]
		};

		canvas.dispatchEvent(new TouchEvent("touchstart", eventOptions));
		canvas.dispatchEvent(new TouchEvent("touchmove", eventOptions));
		canvas.dispatchEvent(new TouchEvent("touchend", {
			...eventOptions,
			touches: [],
			targetTouches: []
		}));

		expect(onover).toHaveBeenCalledWith(d, canvas);
		expect(onclick).toHaveBeenCalledWith(d, canvas);
		expect(onout).toHaveBeenCalledWith(d, canvas);
	});

	it("should keep canvas tooltip visible after touch drag ends", () => {
		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			interaction: {
				inputType: {
					touch: true
				}
			},
			tooltip: {
				grouped: false
			}
		});

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin} = chart.internal.state;
		const getTouch = (d, identifier = 1) => new Touch({
			identifier,
			target: canvas,
			clientX: rect.left + margin.left + chart.internal.xx(d),
			clientY: rect.top + margin.top + chart.internal.circleY(d, d.index)
		});
		const start = chart.internal.data.targets[0].values[0];
		const end = chart.internal.data.targets[0].values[1];
		const startTouch = getTouch(start);
		const endTouch = getTouch(end);
		const dispatchTouch = (type, touch) => canvas.dispatchEvent(new TouchEvent(type, {
			cancelable: true,
			bubbles: true,
			touches: type === "touchend" ? [] : [touch],
			targetTouches: type === "touchend" ? [] : [touch],
			changedTouches: [touch]
		}));

		dispatchTouch("touchstart", startTouch);
		dispatchTouch("touchmove", endTouch);

		expect(chart.$.tooltip.style("display")).to.be.equal("block");

		dispatchTouch("touchend", endTouch);

		expect(chart.$.tooltip.style("display")).to.be.equal("block");
	});

	it("should prevent default for canvas touch events when configured", () => {
		generateWithOptions({
			data: {
				columns,
				type: scatter()
			},
			interaction: {
				inputType: {
					touch: {
						preventDefault: true
					}
				}
			}
		});

		const canvas = chart.$.canvas.node();
		const touch = new Touch({
			identifier: 1,
			target: canvas,
			clientX: 10,
			clientY: 10
		});
		const event = new TouchEvent("touchmove", {
			cancelable: true,
			bubbles: true,
			touches: [touch],
			targetTouches: [touch],
			changedTouches: [touch]
		});

		canvas.dispatchEvent(event);

		expect(event.defaultPrevented).to.be.true;
	});

	it("should dispatch data callbacks from non-mouse pointer events", () => {
		const onclick = vi.fn();
		const onover = vi.fn();
		const onout = vi.fn();

		generateWithOptions({
			data: {
				columns,
				type: scatter(),
				onclick,
				onover,
				onout
			},
			tooltip: {
				grouped: false
			}
		});

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[0];
		const clientX = rect.left + margin.left + chart.internal.xx(d);
		const clientY = rect.top + margin.top + chart.internal.circleY(d, d.index);
		const eventOptions = {clientX, clientY, pointerType: "pen", bubbles: true};

		canvas.dispatchEvent(new PointerEvent("pointermove", eventOptions));
		canvas.dispatchEvent(new PointerEvent("pointerup", eventOptions));
		canvas.dispatchEvent(new PointerEvent("pointerleave", eventOptions));

		expect(onover).toHaveBeenCalledWith(d, canvas);
		expect(onclick).toHaveBeenCalledWith(d, canvas);
		expect(onout).toHaveBeenCalledWith(d, canvas);
	});

	it("should draw y2 axis and y2-bound data on canvas", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:360px;height:260px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 360,
				height: 260
			},
			data: {
				columns: [
					["data1", 10, 20, 30, 40],
					["data2", 1000, 2000, 3000, 4000]
				],
				type: line(),
				axes: {
					data2: "y2"
				}
			},
			axis: {
				y2: {
					show: true,
					tick: {
						format: v => `r:${v}`
					}
				}
			},
			point: {
				show: false
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const target = chart.internal.data.targets.find(({id}) => id === "data2");
		const datum = target.values[1];
		const y2Scaled = chart.internal.getYScaleById("data2")(datum.value);
		const canvasEl = container.querySelector("canvas") as HTMLCanvasElement;
		const ctx = canvasEl.getContext("2d")!;

		ctx.save();
		ctx.font = chart.internal.canvasAxisRenderer.theme.style.axis.labelFont;
		const y2TickTextRight = fillText.mock.calls
			.filter(([text]) => /^r:/.test(String(text)))
			.map(([text, x]) => Number(x) + ctx.measureText(String(text)).width);
		ctx.restore();

		expect(messages).not.to.contain("axis.y2");
		expect(chart.internal.config.axis_y2_show).to.be.true;
		expect(chart.internal.axis.getId("data2")).to.be.equal("y2");
		expect(chart.internal.scale.y2).to.be.a("function");
		expect(y2Scaled).to.be.equal(chart.internal.scale.y2(datum.value));
		expect(chart.internal.state.current.maxTickSize.y2.width).to.be.greaterThan(0);
		expect(fillText.mock.calls.some(([text]) => /^r:/.test(String(text)))).to.be.true;
		expect(Math.max(...y2TickTextRight)).to.be.at.most(chart.internal.state.current.width);
		expect(container.querySelectorAll("canvas")).to.have.length(1);
		expect(container.querySelector("svg")).to.be.null;

		fillText.mockRestore();
		warn.mockRestore();
	});

	it("should draw chart background color on canvas", () => {
		const fillRectRecords: Array<{fillStyle: string, x: number, y: number, w: number, h: number}> = [];
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				w: number,
				h: number
			) {
				fillRectRecords.push({
					fillStyle: String(this.fillStyle),
					x,
					y,
					w,
					h
				});
			});

		try {
			generateWithOptions({
				data: {
					columns,
					type: line()
				},
				background: {
					color: "lightcyan"
				}
			});

			const {margin, width, height} = chart.internal.state;

			expect(fillRectRecords.some(record =>
				record.fillStyle === "#e0ffff" &&
				record.x === margin.left &&
				record.y === margin.top &&
				record.w === width &&
				record.h === height
			)).to.be.true;
		} finally {
			fillRect.mockRestore();
		}
	});

	it("should apply background class opacity and CSS matrix transforms on canvas", () => {
		const style = document.createElement("style");
		const transformRecords: number[][] = [];
		const fillRectRecords: Array<{alpha: number, fillStyle: string}> = [];
		const originalTransform = CanvasRenderingContext2D.prototype.transform;
		const originalFillRect = CanvasRenderingContext2D.prototype.fillRect;
		const transform = vi.spyOn(CanvasRenderingContext2D.prototype, "transform")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				a: number,
				b: number,
				c: number,
				d: number,
				e: number,
				f: number
			) {
				transformRecords.push([a, b, c, d, e, f]);

				return originalTransform.call(this, a, b, c, d, e, f);
			});
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				w: number,
				h: number
			) {
				fillRectRecords.push({
					alpha: this.globalAlpha,
					fillStyle: String(this.fillStyle)
				});

				return originalFillRect.call(this, x, y, w, h);
			});
		const run = (className: string, expectedX: number, expectedY: number) => {
			transformRecords.length = 0;
			fillRectRecords.length = 0;

			generateWithOptions({
				data: {
					columns,
					type: line()
				},
				background: {
					class: className,
					color: "lightcyan"
				}
			});

			expect(transformRecords.some(([a, b, c, d, e, f]) =>
				a === 1 && b === 0 && c === 0 && d === 1 && e === expectedX && f === expectedY
			)).to.be.true;
			expect(fillRectRecords.some(({alpha, fillStyle}) =>
				fillStyle === "#e0ffff" && Math.abs(alpha - 0.5) < 0.01
			)).to.be.true;

			chart.destroy();
			container.remove();
			chart = null;
			container = null;
		};

		style.textContent = `
			.canvas-bg-matrix {
				opacity: .5;
				transform: matrix(1, 0, 0, 1, 2, 3);
			}
			.canvas-bg-matrix3d {
				opacity: .5;
				transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 5, 0, 1);
			}
		`;
		document.head.appendChild(style);

		try {
			run("canvas-bg-matrix", 2, 3);
			run("canvas-bg-matrix3d", 4, 5);
		} finally {
			style.remove();
			fillRect.mockRestore();
			transform.mockRestore();
		}
	});

	it("should draw chart background image on canvas preserving aspect ratio after load", () => new Promise(done => {
		const style = document.createElement("style");
		const drawImage = vi.spyOn(CanvasRenderingContext2D.prototype, "drawImage");
		const translate = vi.spyOn(CanvasRenderingContext2D.prototype, "translate");
		const transform = vi.spyOn(CanvasRenderingContext2D.prototype, "transform");

		style.textContent = ".canvas-bg-image-matrix { transform: matrix(1, 0, 0, 1, 2, 3); }";
		document.head.appendChild(style);

		generateWithOptions({
			data: {
				columns,
				type: line()
			},
			background: {
				class: "canvas-bg-image-matrix",
				imgUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='10'%3E%3Crect width='40' height='10' fill='red'/%3E%3C/svg%3E"
			}
		});

		setTimeout(() => {
			try {
				const backgroundCall = drawImage.mock.calls.find(call =>
					call.length === 5 &&
					call[1] === 0 &&
					call[2] === 80 &&
					call[3] === 320 &&
					call[4] === 80
				);
				const {margin} = chart.internal.state;

				expect(backgroundCall).not.to.be.undefined;
				expect(translate).toHaveBeenCalledWith(
					Math.ceil(margin.left) + 0.5,
					Math.ceil(margin.top) + 0.5
				);
				expect(transform).toHaveBeenCalledWith(1, 0, 0, 1, 2, 3);
				done();
			} catch (error) {
				done(error);
			} finally {
				style.remove();
				drawImage.mockRestore();
				translate.mockRestore();
				transform.mockRestore();
			}
		}, 50);
	}));

	it("should apply area and bar linear gradients on canvas", () => {
		const createLinearGradient = vi.spyOn(
			CanvasRenderingContext2D.prototype,
			"createLinearGradient"
		);

		try {
			generateWithOptions({
				data: {
					columns,
					types: {
						data1: bar(),
						data2: area()
					}
				},
				area: {
					linearGradient: true
				},
				bar: {
					linearGradient: {
						x: [1, 0],
						y: [0, 1],
						stops: [
							[0, null, 1],
							[1, "purple", 0.4]
						]
					}
				},
				point: {
					show: false
				}
			});

			expect(createLinearGradient.mock.calls.length).to.be.greaterThan(1);
		} finally {
			createLinearGradient.mockRestore();
		}
	});

	it("should follow bar.front layer order on canvas", () => {
		const calls: string[] = [];
		const originalFill = CanvasRenderingContext2D.prototype.fill;
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill")
			.mockImplementation(function(this: CanvasRenderingContext2D, path?: Path2D) {
				calls.push("area");

				return path ?
					originalFill.call(this, path) :
					originalFill.call(this);
			});
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				calls.push("bar");
			});

		try {
			generateWithOptions({
				data: {
					columns,
					types: {
						data1: bar(),
						data2: area()
					}
				},
				bar: {
					front: false
				},
				point: {
					show: false
				}
			});

			expect(calls.indexOf("bar")).to.be.lessThan(calls.indexOf("area"));

			chart.destroy();
			chart = null;
			container.remove();
			container = null;
			calls.length = 0;

			generateWithOptions({
				data: {
					columns,
					types: {
						data1: bar(),
						data2: area()
					}
				},
				bar: {
					front: true
				},
				point: {
					show: false
				}
			});

			expect(calls.indexOf("area")).to.be.lessThan(calls.indexOf("bar"));
		} finally {
			fill.mockRestore();
			fillRect.mockRestore();
		}
	});

	it("should apply color.onover to hovered canvas bars", () => {
		const fillRectRecords: string[] = [];
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				fillRectRecords.push(String(this.fillStyle));
			});

		try {
			generateWithOptions({
				data: {
					columns,
					type: bar()
				},
				color: {
					onover: {
						data1: "#010203",
						data2: "#040506"
					}
				}
			});

			const canvas = chart.$.canvas.node();
			const rect = canvas.getBoundingClientRect();
			const {height, margin, xAxisHeight} = chart.internal.state;
			const d = chart.internal.data.targets[0].values[1];
			const localX = margin.left + chart.internal.scale.x(d.x);
			const localY = margin.top + height + Math.min(Math.max(xAxisHeight / 2, 1), 12);

			fillRectRecords.length = 0;
			canvas.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: rect.left + localX,
				clientY: rect.top + localY
			}));

			expect(fillRectRecords).to.contain("#010203");
			expect(fillRectRecords).to.contain("#040506");
		} finally {
			fillRect.mockRestore();
		}
	});

	it("should align non-centered canvas bar data labels to SVG baseline", () => {
		const records: Array<{text: string, y: number, baseline: CanvasTextBaseline}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				text: string
			) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					y: transform.f,
					baseline: this.textBaseline
				});
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 33, -33]
					],
					type: bar(),
					labels: {
						format: value => `label:${value}`
					}
				}
			});

			const shape = chart.internal.state.canvasShape || chart.internal.getDrawShape();
			const getPoints = chart.internal.generateGetBarPoints(shape.indices[TYPE.BAR], false);
			const positive = chart.internal.data.targets[0].values[0];
			const negative = chart.internal.data.targets[0].values[1];
			const positiveEndY = chart.internal.state.margin.top + getPoints(positive, 0)[2][1];
			const negativeEndY = chart.internal.state.margin.top + getPoints(negative, 1)[2][1];
			const positiveLabel = records.find(({text}) => text === "label:33");
			const negativeLabel = records.find(({text}) => text === "label:-33");
			const ctx = chart.$.canvas.node().getContext("2d");
			const labelFont = chart.internal.canvasTheme.style.label.font;
			const getLabelHeight = (text: string) => {
				ctx.font = labelFont;

				const metrics = ctx.measureText(text);
				const fontSize = parseFloat(ctx.font) || 12;

				return Math.max(
					fontSize,
					(metrics.fontBoundingBoxAscent || 0) + (metrics.fontBoundingBoxDescent || 0),
					metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || 0
				);
			};

			expect(positiveLabel?.baseline).to.be.equal("alphabetic");
			expect(positiveLabel?.y).to.be.closeTo(positiveEndY - 3, 0.1);
			expect(negativeLabel?.baseline).to.be.equal("alphabetic");
			expect(negativeLabel?.y).to.be.closeTo(
				negativeEndY + getLabelHeight("label:-33") - 3,
				0.1
			);
		} finally {
			fillText.mockRestore();
		}
	});

	it("should apply axis-specific tick text fonts from SVG CSS probes", () => {
		const style = document.createElement("style");
		const records: Array<{text: string, font: string}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string) {
				records.push({
					text: String(text),
					font: this.font
				});
			});

		style.textContent = `
			.bb-axis-x .tick text {
				font-size: 20px;
				font-family: serif;
			}
			.bb-axis-y .tick text {
				font-size: 35px;
				font-family: serif;
			}
			.bb-axis-y2 .tick text {
				font-size: 25px;
				font-family: serif;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 50, 20, 10, 40]
					],
					type: line(),
					axes: {
						data2: "y2"
					}
				},
				axis: {
					x: {
						tick: {
							format: value => `x:${value}`
						}
					},
					y: {
						tick: {
							format: value => `y:${value}`
						}
					},
					y2: {
						show: true,
						tick: {
							format: value => `y2:${value}`
						}
					}
				}
			});

			const axisStyle = chart.internal.canvasTheme.style.axis;
			const findFont = (prefix: string) =>
				records.find(({text}) => text.startsWith(prefix))?.font || "";

			expect(axisStyle.xTickFont).to.contain("20px");
			expect(axisStyle.yTickFont).to.contain("35px");
			expect(axisStyle.y2TickFont).to.contain("25px");
			expect(findFont("x:")).to.contain("20px");
			expect(findFont("y:")).to.contain("35px");
			expect(findFont("y2:")).to.contain("25px");
		} finally {
			style.remove();
			fillText.mockRestore();
		}
	});

	it("should render category axis, grid lines and regions on canvas", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke");

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:360px;height:260px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 360,
				height: 260
			},
			data: {
				columns,
				type: bar()
			},
			axis: {
				x: {
					type: "category",
					categories: ["Jan", "Feb", "Mar", "Apr"]
				}
			},
			grid: {
				x: {
					show: true,
					lines: [{value: "Feb", text: "Feb grid"}]
				},
				y: {
					show: true,
					lines: [{value: 100, text: "Y grid"}]
				}
			},
			regions: [{
				axis: "x",
				start: "Feb",
				end: "Mar",
				class: "campaign",
				label: {
					text: "Campaign",
					center: "xy"
				}
			}]
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");

		expect(messages).not.to.contain("axis.x.type");
		expect(messages).not.to.contain("canvas mode: regions is not supported");
		expect(chart.internal.config.axis_x_type).to.be.equal("category");
		expect(chart.categories()).to.deep.equal(["Jan", "Feb", "Mar", "Apr"]);

		const xScale = chart.internal.scale.x;
		const rawXScale = xScale.orgScale();
		const categoryOffset = (rawXScale(1) - rawXScale(0)) / 2;

		expect(xScale(0)).to.be.closeTo(rawXScale(0) + categoryOffset, 1e-6);
		expect(xScale(1)).to.be.closeTo(rawXScale(1) + categoryOffset, 1e-6);

		expect(fillText.mock.calls.some(([text]) => text === "Feb")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "Feb grid")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "Campaign")).to.be.true;
		expect(fillRect).toHaveBeenCalled();
		expect(stroke).toHaveBeenCalled();

		fillText.mockClear();
		chart.xgrids([{value: "Mar", text: "API grid"}]);
		expect(chart.internal.config.grid_x_lines).to.deep.equal([{value: "Mar", text: "API grid"}]);
		expect(fillText.mock.calls.some(([text]) => text === "API grid")).to.be.true;

		chart.xgrids.remove({value: "Mar"});
		expect(chart.internal.config.grid_x_lines).to.deep.equal([]);

		chart.regions([{axis: "y", start: 100, end: 300, class: "y-band"}]);
		expect(chart.internal.config.regions).to.have.length(1);

		chart.regions.remove({classes: ["y-band"]});
		expect(chart.internal.config.regions).to.deep.equal([]);

		fillText.mockRestore();
		fillRect.mockRestore();
		stroke.mockRestore();
		warn.mockRestore();
	});

	it("should match SVG category region boundaries when end is numeric", () => {
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 100, 150, 130, 200, 220, 190]
					],
					type: line()
				},
				axis: {
					x: {
						type: "category",
						categories: ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"]
					}
				},
				regions: [
					{
						axis: "x",
						start: "cat2",
						end: "cat3"
					},
					{
						axis: "x",
						start: "cat5",
						end: 5
					}
				]
			});

			const {margin, height} = chart.internal.state;
			const xScale = chart.internal.scale.x;
			const tickOffset = chart.internal.axis.x.tickOffset() || ((xScale(1) - xScale(0)) / 2);
			const expectedStart = xScale(4) - tickOffset;
			const expectedEnd = xScale(5);
			const expectedX = margin.left + expectedStart;
			const expectedW = expectedEnd - expectedStart;
			const isClose = (a: number, b: number) => Math.abs(a - b) < 0.1;
			const regionCall = fillRect.mock.calls.find(([x, y, w, h]) =>
				isClose(x, expectedX) &&
				isClose(y, margin.top) &&
				isClose(w, expectedW) &&
				isClose(h, height)
			);

			expect(regionCall).not.to.be.undefined;
		} finally {
			fillRect.mockRestore();
		}
	});

	it("should draw explicit canvas grid lines with solid stroke", () => {
		const style = document.createElement("style");
		const dashRecords: number[][] = [];
		const originalSetLineDash = CanvasRenderingContext2D.prototype.setLineDash;
		const setLineDash = vi.spyOn(CanvasRenderingContext2D.prototype, "setLineDash")
			.mockImplementation(function(this: CanvasRenderingContext2D, segments: Iterable<number>) {
				dashRecords.push(Array.from(segments));

				return originalSetLineDash.call(this, segments);
			});

		style.textContent = `
			.bb-ygrid {
				stroke-dasharray: 3 3;
			}
		`;
		document.head.appendChild(style);

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 30, -200, -100, 400, 150, 250],
						["data2", -50, 150, -150, 150, -50, -150],
						["data3", -100, 100, -40, 100, -150, -50]
					],
					groups: [
						["data1", "data2"]
					],
					type: bar(),
					labels: true
				},
				grid: {
					y: {
						show: true,
						lines: [{value: 0}]
					}
				}
			});

			const gridDashIndex = dashRecords.findIndex(dash => dash.length > 0);
			const solidGridLineIndex = dashRecords.findIndex((dash, index) =>
				index > gridDashIndex && dash.length === 0
			);

			expect(chart.internal.canvasTheme.style.grid.dashArray).to.deep.equal([3, 3]);
			expect(gridDashIndex).not.to.be.equal(-1);
			expect(solidGridLineIndex).not.to.be.equal(-1);
		} finally {
			style.remove();
			setLineDash.mockRestore();
		}
	});

	it("should keep optional canvas y grid line coordinates like SVG", () => {
		const lineTos: Array<{x: number, y: number}> = [];
		const originalLineTo = CanvasRenderingContext2D.prototype.lineTo;
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				lineTos.push({x, y});

				return originalLineTo.call(this, x, y);
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 30, -200, -100, 400, 150, 250],
						["data2", -50, 150, -150, 150, -50, -150],
						["data3", -100, 100, -40, 100, -150, -50]
					],
					groups: [
						["data1", "data2"]
					],
					type: bar(),
					labels: true
				},
				grid: {
					y: {
						lines: [{value: 0}]
					}
				}
			});

			const {margin, width} = chart.internal.state;
			const expectedY = margin.top + chart.internal.scale.y(0);
			const crispY = getCrisp(expectedY, chart.internal.canvasTheme.style.grid.lineWidth);
			const optionalYLine = lineTos.find(({x, y}) =>
				Math.abs(x - (margin.left + width)) < 0.1 &&
				Math.abs(y - expectedY) < 0.1
			);

			expect(Math.abs(expectedY - crispY)).to.be.greaterThan(0.1);
			expect(optionalYLine).not.to.be.undefined;
		} finally {
			lineTo.mockRestore();
		}
	});

	it("should draw front optional canvas y grid lines over bar strokes", () => {
		const ops: Array<{
			type: "stroke" | "strokeRect",
			strokeStyle: string,
			x?: number,
			y?: number,
			w?: number,
			h?: number,
			lineTo?: {x: number, y: number}
		}> = [];
		const originalLineTo = CanvasRenderingContext2D.prototype.lineTo;
		const originalStroke = CanvasRenderingContext2D.prototype.stroke;
		const originalStrokeRect = CanvasRenderingContext2D.prototype.strokeRect;
		let currentLineTo: {x: number, y: number} | undefined;
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo")
			.mockImplementation(function(this: CanvasRenderingContext2D, x: number, y: number) {
				const transform = this.getTransform();

				currentLineTo = {
					x: transform.e + x,
					y: transform.f + y
				};

				return originalLineTo.call(this, x, y);
			});
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D, ...args) {
				ops.push({
					type: "stroke",
					strokeStyle: String(this.strokeStyle),
					lineTo: currentLineTo
				});
				currentLineTo = undefined;

				return originalStroke.apply(this, args as []);
			});
		const strokeRect = vi.spyOn(CanvasRenderingContext2D.prototype, "strokeRect")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				w: number,
				h: number
			) {
				const transform = this.getTransform();

				ops.push({
					type: "strokeRect",
					strokeStyle: String(this.strokeStyle),
					x: transform.e + x,
					y: transform.f + y,
					w,
					h
				});

				return originalStrokeRect.call(this, x, y, w, h);
			});

		try {
			generateWithOptions({
				canvas: {
					theme: {
						grid: {
							lineColor: "rgb(241, 241, 241)"
						},
						shape: {
							barLineWidth: 1,
							barStrokeColor: "rgb(0, 0, 0)"
						}
					}
				},
				data: {
					columns: [
						["data1", 30, -200, -100, 400, 150, 250],
						["data2", -50, 150, -150, 150, -50, -150],
						["data3", -100, 100, -40, 100, -150, -50]
					],
					groups: [
						["data1", "data2"]
					],
					type: bar()
				},
				grid: {
					y: {
						lines: [{value: 0}]
					}
				}
			});

			const {margin, width} = chart.internal.state;
			const zeroY = margin.top + chart.internal.scale.y(0);
			const isBlack = (color: string) => /^(#000(?:000)?|rgb\(0,\s*0,\s*0\))$/i.test(color);
			const isGridColor = (color: string) =>
				/^(#f1f1f1|rgb\(241,\s*241,\s*241\))$/i.test(color);
			const zeroBarStrokeIndex = ops.findIndex(op => {
				if (op.type !== "strokeRect" || !isBlack(op.strokeStyle)) {
					return false;
				}

				const y1 = op.y!;
				const y2 = op.y! + op.h!;

				return Math.abs(y1 - zeroY) < 0.1 || Math.abs(y2 - zeroY) < 0.1;
			});
			const frontGridLineIndex = ops.findIndex(op =>
				op.type === "stroke" &&
				isGridColor(op.strokeStyle) &&
				!!op.lineTo &&
				Math.abs(op.lineTo.x - (margin.left + width)) < 0.1 &&
				Math.abs(op.lineTo.y - zeroY) < 0.1
			);

			expect(zeroBarStrokeIndex).not.to.be.equal(-1);
			expect(frontGridLineIndex).to.be.greaterThan(zeroBarStrokeIndex);
		} finally {
			strokeRect.mockRestore();
			stroke.mockRestore();
			lineTo.mockRestore();
		}
	});

	it("should size canvas bars with the SVG axis tick interval", () => {
		const fillRects: Array<{x: number, y: number, w: number, h: number}> = [];
		const originalFillRect = CanvasRenderingContext2D.prototype.fillRect;
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				w: number,
				h: number
			) {
				if (w > 5 && h > 5) {
					fillRects.push({x, y, w, h});
				}

				return originalFillRect.call(this, x, y, w, h);
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["data1", 30, -200, -100, 400, 150, 250],
						["data2", -50, 150, -150, 150, -50, -150],
						["data3", -100, 100, -40, 100, -150, -50]
					],
					groups: [
						["data1", "data2"]
					],
					type: bar()
				}
			});

			const {config, state} = chart.internal;
			const indices = chart.internal.getShapeIndices(chart.internal.isBarType);
			const targetSlots = chart.internal.getIndicesMax(indices) + 1;
			const expectedWidth = state.width / chart.internal.getMaxDataCount() *
				config.bar_width_ratio / targetSlots;

			expect(chart.internal.axis.x.tickInterval(chart.internal.getMaxDataCount()))
				.to.be.closeTo(state.width / chart.internal.getMaxDataCount(), 0.1);
			expect(fillRects[0]?.w).to.be.closeTo(expectedWidth, 0.1);
		} finally {
			fillRect.mockRestore();
		}
	});

	it("should position optional canvas x grid line labels like SVG", () => {
		const records: Array<{
			text: string,
			textAlign: string,
			absX: number,
			absY: number
		}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string, x: number, y: number) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textAlign: this.textAlign,
					absX: transform.e + x,
					absY: transform.f + y
				});
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					],
					type: line()
				},
				grid: {
					x: {
						lines: [
							{value: 1, text: "Label 1"},
							{value: 3, text: "Label 3", position: "middle"},
							{value: 4.5, text: "Label 4.5", position: "start"}
						]
					}
				}
			});

			const {height, margin} = chart.internal.state;
			const scale = chart.internal.scale.x;
			const label1 = records.find(({text}) => text === "Label 1");
			const label3 = records.find(({text}) => text === "Label 3");
			const label45 = records.find(({text}) => text === "Label 4.5");

			expect(label1?.textAlign).to.be.equal("right");
			expect(label1?.absX).to.be.closeTo(margin.left + scale(1) - 5, 0.1);
			expect(label1?.absY).to.be.closeTo(margin.top + 4, 0.1);
			expect(label3?.textAlign).to.be.equal("center");
			expect(label3?.absY).to.be.closeTo(margin.top + height / 2, 0.1);
			expect(label45?.textAlign).to.be.equal("left");
			expect(label45?.absX).to.be.closeTo(margin.left + scale(4.5) - 5, 0.1);
			expect(label45?.absY).to.be.closeTo(margin.top + height - 4, 0.1);
		} finally {
			fillText.mockRestore();
		}
	});

	it("should position optional rotated canvas grid line labels like SVG", () => {
		const records: Array<{
			text: string,
			textAlign: string,
			absX: number,
			absY: number
		}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string, x: number, y: number) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textAlign: this.textAlign,
					absX: transform.a * Number(x) + transform.c * Number(y) + transform.e,
					absY: transform.b * Number(x) + transform.d * Number(y) + transform.f
				});
			});

		try {
			generateWithOptions({
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					],
					type: line()
				},
				axis: {
					rotated: true
				},
				grid: {
					x: {
						lines: [
							{value: 1, text: "Rotated X start", position: "start"},
							{value: 3, text: "Rotated X middle", position: "middle"}
						]
					},
					y: {
						lines: [
							{value: 100, text: "Rotated Y start", position: "start"},
							{value: 200, text: "Rotated Y middle", position: "middle"}
						]
					}
				}
			});

			const {height, margin, width} = chart.internal.state;
			const xScale = chart.internal.scale.x;
			const yScale = chart.internal.scale.y;
			const xStart = records.find(({text}) => text === "Rotated X start");
			const xMiddle = records.find(({text}) => text === "Rotated X middle");
			const yStart = records.find(({text}) => text === "Rotated Y start");
			const yMiddle = records.find(({text}) => text === "Rotated Y middle");

			expect(xStart?.textAlign).to.be.equal("left");
			expect(xStart?.absX).to.be.closeTo(margin.left + 4, 0.1);
			expect(xStart?.absY).to.be.closeTo(margin.top + xScale(1) - 5, 0.1);
			expect(xMiddle?.textAlign).to.be.equal("center");
			expect(xMiddle?.absX).to.be.closeTo(margin.left + width / 2, 0.1);
			expect(yStart?.textAlign).to.be.equal("left");
			expect(yStart?.absX).to.be.closeTo(margin.left + yScale(100) - 5, 0.1);
			expect(yStart?.absY).to.be.closeTo(margin.top + height - 4, 0.1);
			expect(yMiddle?.textAlign).to.be.equal("center");
			expect(yMiddle?.absY).to.be.closeTo(margin.top + height / 2, 0.1);
		} finally {
			fillText.mockRestore();
		}
	});

	it("should render timeseries axis, grid lines and regions on canvas", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke");

		generateWithOptions({
			data: {
				x: "x",
				columns: [
					["x", "2024-01-01", "2024-01-02", "2024-01-04", "2024-01-07"],
					["data1", 30, 200, 100, 400]
				],
				type: line()
			},
			axis: {
				x: {
					type: "timeseries",
					tick: {
						values: ["2024-01-01", "2024-01-04"],
						format: "%Y-%m-%d"
					}
				}
			},
			grid: {
				x: {
					show: true,
					lines: [{value: "2024-01-04", text: "Milestone"}]
				}
			},
			regions: [{
				axis: "x",
				start: "2024-01-02",
				end: "2024-01-04",
				label: {
					text: "Campaign",
					center: "xy"
				}
			}]
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");

		expect(messages).not.to.contain("axis.x.type");
		expect(chart.internal.config.axis_x_type).to.be.equal("timeseries");
		expect(chart.internal.data.targets[0].values[0].x).to.be.instanceOf(Date);
		expect(fillText.mock.calls.some(([text]) => text === "2024-01-01")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "Milestone")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "Campaign")).to.be.true;
		expect(fillRect).toHaveBeenCalled();
		expect(stroke).toHaveBeenCalled();

		fillText.mockRestore();
		fillRect.mockRestore();
		stroke.mockRestore();
		warn.mockRestore();
	});

	it("should update canvas axis labels through the axis.labels API", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				axes: {
					data1: "y",
					data2: "y2"
				},
				type: line()
			},
			axis: {
				y: {
					label: "Y Axis Label"
				},
				y2: {
					show: true,
					label: "Y2 Axis Label"
				}
			}
		});

		fillText.mockClear();

		expect(() => {
			chart.axis.labels({
				y2: "New Y2 Axis Label"
			});
			chart.axis.labels({
				y: "New Y Axis Label",
				y2: "New Y2 Axis Label Again"
			});
		}).not.toThrow();

		expect(chart.axis.labels()).to.deep.equal({
			y: "New Y Axis Label",
			y2: "New Y2 Axis Label Again"
		});
		expect(fillText.mock.calls.some(([text]) => text === "New Y Axis Label")).to.be.true;
		expect(fillText.mock.calls.some(([text]) =>
			text === "New Y2 Axis Label Again"
		)).to.be.true;

		fillText.mockRestore();
	});

	it("should show grouped canvas tooltip by timeseries x value", () => {
		generateWithOptions({
			data: {
				xs: {
					data1: "x1",
					data2: "x2"
				},
				columns: [
					["x1", "2024-01-01", "2024-01-04"],
					["x2", "2024-01-04", "2024-01-08"],
					["data1", 30, 100],
					["data2", 200, 50]
				],
				type: line()
			},
			axis: {
				x: {
					type: "timeseries"
				}
			}
		});

		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[1];
		const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
		const tooltip = container.querySelector(".bb-tooltip-container");

		canvasEl.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: margin.left + chart.internal.scale.x(d.x),
			clientY: margin.top + chart.internal.scale.y(d.value)
		}));

		expect(tooltip.style.display).to.not.be.equal("none");
		expect(tooltip.textContent).to.contain("data1");
		expect(tooltip.textContent).to.contain("100");
		expect(tooltip.textContent).to.contain("data2");
		expect(tooltip.textContent).to.contain("200");
		expect(tooltip.textContent).not.to.contain("50");
	});

	it("should expand only the hovered point for grouped multiple x canvas tooltip", () => {
		const arcRecords: Array<{canvasClass: string, r: number}> = [];
		const originalArc = CanvasRenderingContext2D.prototype.arc;
		const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc")
			.mockImplementation(function(
				this: CanvasRenderingContext2D,
				x: number,
				y: number,
				r: number,
				startAngle: number,
				endAngle: number,
				counterclockwise?: boolean
			) {
				arcRecords.push({
					canvasClass: String(this.canvas?.className || ""),
					r
				});

				return originalArc.call(this, x, y, r, startAngle, endAngle, counterclockwise);
			});

		try {
			generateWithOptions({
				data: {
					xs: {
						data1: "x1",
						data2: "x2"
					},
					columns: [
						["x1", 10, 30, 45],
						["x2", 30, 50, 75],
						["data1", 30, 200, 100],
						["data2", 20, 180, 240]
					],
					type: line()
				}
			});

			const canvasEl = container.querySelector(`canvas.${$CANVAS.canvas}`);
			const rect = canvasEl.getBoundingClientRect();
			const {margin} = chart.internal.state;
			const d = chart.internal.data.targets[0].values[1];
			const expandedR = chart.internal.pointExpandedR(d);
			const tooltip = container.querySelector(".bb-tooltip-container");

			arcRecords.length = 0;
			canvasEl.dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				clientX: rect.left + margin.left + chart.internal.circleX(d, d.index),
				clientY: rect.top + margin.top + chart.internal.circleY(d, d.index)
			}));

			const expandedPointArcs = arcRecords.filter(({canvasClass, r}) =>
				canvasClass.includes($CANVAS.canvas) &&
				Math.abs(r - expandedR) < 1e-6
			);

			expect(tooltip.textContent).to.contain("data1");
			expect(tooltip.textContent).to.contain("200");
			expect(tooltip.textContent).to.contain("data2");
			expect(tooltip.textContent).to.contain("20");
			expect(expandedPointArcs).to.have.length(1);
		} finally {
			arc.mockRestore();
		}
	});

	it("should show linked canvas tooltip by index", () => {
		generateWithOptions({
			data: {
				x: "x",
				columns: [
					["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04"],
					["source", 20, 30, 10, 40]
				],
				type: line()
			},
			axis: {
				x: {
					type: "timeseries"
				}
			},
			tooltip: {
				linked: true
			}
		});

		const linkedContainer = document.createElement("div");
		linkedContainer.style.cssText = "position:absolute;top:260px;left:0;width:320px;height:240px;";
		document.body.appendChild(linkedContainer);

		const linkedChart = bb.generate({
			bindto: linkedContainer,
			render: {
				mode: canvas()
			},
			size: {
				width: 320,
				height: 240
			},
			data: {
				x: "x",
				columns: [
					["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04"],
					["target", 10, 50, 100, 50]
				],
				type: line()
			},
			axis: {
				x: {
					type: "timeseries"
				}
			},
			tooltip: {
				linked: true
			}
		});

		try {
			const index = 2;

			chart.internal.state.event = {
				isTrusted: true
			};
			chart.internal._handleLinkedCharts(true, index);

			const tooltip = linkedContainer.querySelector(".bb-tooltip-container");

			expect(tooltip.style.display).to.not.be.equal("none");
			expect(tooltip.textContent).to.contain("target");
			expect(tooltip.textContent).to.contain("100");
			expect(linkedChart.internal.state.canvasFocusKey).to.be.equal(`target:${index}`);

			chart.internal._handleLinkedCharts(false, index);
			expect(tooltip.style.display).to.be.equal("none");

			expect(linkedChart.internal.showCanvasLinkedTooltip(99)).to.be.false;
			expect(tooltip.style.display).to.be.equal("none");
		} finally {
			linkedChart.destroy();
			linkedContainer.remove();
		}
	});

	it("should render log x axis, grid lines and regions on canvas", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke");

		generateWithOptions({
			data: {
				x: "x",
				columns: [
					["x", 1, 10, 100, 1000],
					["data1", 10, 30, 90, 270]
				],
				type: line()
			},
			axis: {
				x: {
					type: "log",
					tick: {
						values: [1, 10, 100, 1000],
						format: v => `x:${v}`
					}
				}
			},
			grid: {
				x: {
					show: true,
					lines: [{value: "100", text: "x grid"}]
				}
			},
			regions: [{
				axis: "x",
				start: "10",
				end: "100",
				label: {
					text: "x log",
					center: "xy"
				}
			}]
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const datum = chart.internal.data.targets[0].values[2];

		expect(messages).not.to.contain("axis.x.type");
		expect(chart.internal.config.axis_x_type).to.be.equal("log");
		expect(chart.internal.scale.x.type).to.be.equal("log");
		expect(chart.internal.xx(datum)).to.be.closeTo(chart.internal.scale.x(100), 0.1);
		expect(fillText.mock.calls.some(([text]) => text === "x:100")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "x grid")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "x log")).to.be.true;
		expect(fillRect).toHaveBeenCalled();
		expect(stroke).toHaveBeenCalled();

		fillText.mockRestore();
		fillRect.mockRestore();
		stroke.mockRestore();
		warn.mockRestore();
	});

	it("should render log y and y2 axes on canvas", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				columns: [
					["data1", 10, 100, 1000, 10000],
					["data2", 100, 1000, 10000, 100000]
				],
				type: line(),
				axes: {
					data2: "y2"
				}
			},
			axis: {
				y: {
					type: "log",
					tick: {
						values: [10, 100, 1000, 10000],
						format: v => `y:${v}`
					}
				},
				y2: {
					show: true,
					type: "log",
					tick: {
						values: [100, 1000, 10000, 100000],
						format: v => `y2:${v}`
					}
				}
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const datum = chart.internal.data.targets[1].values[2];

		expect(messages).not.to.contain("axis.y.type");
		expect(messages).not.to.contain("axis.y2.type");
		expect(chart.internal.config.axis_y_type).to.be.equal("log");
		expect(chart.internal.config.axis_y2_type).to.be.equal("log");
		expect(chart.internal.scale.y.type).to.be.equal("log");
		expect(chart.internal.scale.y2.type).to.be.equal("log");
		expect(chart.internal.getYScaleById("data2")(datum.value))
			.to.be.closeTo(chart.internal.scale.y2(10000), 0.1);
		expect(fillText.mock.calls.some(([text]) => text === "y:1000")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "y2:10000")).to.be.true;

		fillText.mockRestore();
		warn.mockRestore();
	});

	it("should render canvas log y ticks using SVG-compatible values", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				x: "x",
				columns: [
					["x", 100, 395, 740, 1500, 3000, 4500],
					["data1", 210, 1150, 12000, 100000, 1000000],
					["data2", 100, 200, 150, 90, 250]
				],
				axes: {
					data1: "y",
					data2: "y2"
				},
				types: {
					data1: bar(),
					data2: line()
				}
			},
			axis: {
				x: {
					type: "log",
					min: 50,
					max: 6000
				},
				y: {
					type: "log",
					max: 100000000
				},
				y2: {
					show: true,
					type: "indexed",
					min: 30,
					max: 300
				}
			}
		});

		const {scale, state: {margin}} = chart.internal;
		const yTickTexts = new Set(fillText.mock.calls
			.filter(([text, x]) => String(text) && Number(x) < margin.left)
			.map(([text]) => String(text)));
		const tick10 = fillText.mock.calls.find(([text, x]) =>
			String(text) === "10" && Number(x) < margin.left
		);

		["0", "10", "100", "1000", "10000", "100000", "1000000", "10000000", "100000000"]
			.forEach(tick => {
				expect(yTickTexts.has(tick)).to.be.true;
			});
		expect(yTickTexts.has("20000000")).to.be.false;
		expect(Number(tick10?.[2])).to.be.closeTo(margin.top + scale.y(10), 0.1);

		fillText.mockRestore();
	});

	it("should render additional x and y axes on canvas", () => {
		const records: Array<{
			text: string,
			textAlign: string,
			textBaseline: string,
			absX: number,
			absY: number
		}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string, x: number, y: number) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textAlign: this.textAlign,
					textBaseline: this.textBaseline,
					absX: transform.e + x,
					absY: transform.f + y
				});
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150],
					["data2", 50, 20, 10, 40, 15]
				],
				type: line()
			},
			axis: {
				x: {
					axes: [
						{
							tick: {
								outer: false,
								count: 9
							}
						},
						{
							tick: {
								values: [0.3, 1.4, 2.6, 3.1, 3.9]
							}
						}
					]
				},
				y: {
					axes: [
						{
							tick: {
								format: x => `${x}%`,
								count: 2
							}
						}
					]
				}
			}
		});

		const {height, margin} = chart.internal.state;
		const yAxisSize = chart.internal.getAxisSize("y");
		const extraXRows = Array.from(records
			.filter(({absY, textAlign, textBaseline}) =>
				textAlign === "center" &&
				textBaseline === "top" &&
				absY > margin.top + height + AXIS_TICK_SIZE + AXIS_TICK_PADDING
			)
			.reduce((rows, record) => {
				const key = Math.round(record.absY);
				const row = rows.get(key) || [];

				row.push(record.text);
				rows.set(key, row);

				return rows;
			}, new Map<number, string[]>()).values());
		const yAxisTexts = records
			.filter(({absX, text, textAlign}) =>
				text.endsWith("%") &&
				textAlign === "right" &&
				absX < margin.left - yAxisSize / 2
			)
			.map(({text}) => text);

		expect(extraXRows.some(row => row.includes("0.5") && row.includes("4"))).to.be.true;
		expect(extraXRows.some(row =>
			JSON.stringify(row) === JSON.stringify(["0.3", "1.4", "2.6", "3.1", "3.9"])
		)).to.be.true;
		expect(yAxisTexts).to.deep.equal(["0%", "200%", "400%"]);

		fillText.mockRestore();
	});

	it("should render rotated additional y2 axes on canvas", () => {
		const records: Array<{
			text: string,
			textAlign: string,
			textBaseline: string,
			absY: number
		}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text: string, x: number, y: number) {
				const transform = this.getTransform();

				records.push({
					text: String(text),
					textAlign: this.textAlign,
					textBaseline: this.textBaseline,
					absY: transform.f + y
				});
			});

		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150],
					["data2", 50, 20, 10, 40, 15]
				],
				type: bar(),
				axes: {
					data1: "y2",
					data2: "y2"
				}
			},
			axis: {
				rotated: true,
				y: {
					show: false
				},
				y2: {
					show: true,
					axes: [
						{
							tick: {
								outer: false,
								format: x => `${x}%`,
								count: 2
							}
						}
					]
				}
			}
		});

		const {margin} = chart.internal.state;
		const y2AxisTexts = records
			.filter(({absY, text, textAlign, textBaseline}) =>
				text.endsWith("%") &&
				textAlign === "center" &&
				textBaseline === "bottom" &&
				absY < margin.top
			)
			.map(({text}) => text);

		expect(y2AxisTexts).to.deep.equal(["0%", "200%", "400%"]);

		fillText.mockRestore();
	});

	it("should keep category bar width when x tick text is rotated on canvas", () => {
		const records: Array<{
			text: string,
			x: number,
			y: number,
			font: string,
			textAlign: string,
			textBaseline: string
		}> = [];
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(this: CanvasRenderingContext2D, text, x, y) {
				records.push({
					text: String(text),
					x: Number(x),
					y: Number(y),
					font: this.font,
					textAlign: this.textAlign,
					textBaseline: this.textBaseline
				});
			});

		try {
			generateWithOptions({
				data: {
					x: "x",
					columns: [
						[
							"x",
							"www.somesitename1.com",
							"www.somesitename2.com",
							"www.somesitename3.com",
							"www.somesitename4.com",
							"www.somesitename5.com",
							"www.somesitename6.com",
							"www.somesitename7.com",
							"www.somesitename8.com",
							"www.somesitename9.com",
							"www.somesitename10.com",
							"www.somesitename11.com",
							"www.somesitename12.com"
						],
						["pv", 90, 100, 140, 200, 100, 400, 90, 100, 140, 200, 100, 400]
					],
					type: bar()
				},
				axis: {
					x: {
						type: "category",
						tick: {
							rotate: -70,
							multiline: false,
							tooltip: true
						}
					}
				}
			});

			const $$ = chart.internal;
			const barIndices = $$.getShapeIndices($$.isBarType);
			const getPoints = $$.generateGetBarPoints(barIndices, false);
			const points = getPoints($$.data.targets[0].values[0], 0);
			const barWidth = Math.abs(points[2][0] - points[0][0]);
			const firstTick = records.find(({text}) => text === "www.somesitename1.com");
			const fontSize = parseFloat(/(\d+(?:\.\d+)?)px/.exec(firstTick?.font || "")?.[1] || "10");
			const rotate = -70;
			const expectedX = 8 * Math.sin(Math.PI * (rotate / 180));
			const expectedY = 11.5 - 2.5 * (rotate / 15) * -1 + (0.71 * fontSize);

			expect($$.axis.x.tickInterval($$.getMaxDataCount())).to.be.greaterThan(0);
			expect(barWidth).to.be.greaterThan(5);
			expect(firstTick?.textAlign).to.be.equal("right");
			expect(firstTick?.textBaseline).to.be.equal("alphabetic");
			expect(firstTick?.x).to.be.closeTo(expectedX, 0.1);
			expect(firstTick?.y).to.be.closeTo(expectedY, 1);
			expect(firstTick?.y).to.be.lessThan(AXIS_TICK_SIZE + AXIS_TICK_PADDING);
		} finally {
			fillText.mockRestore();
		}
	});

	it("should render timeseries y and y2 axes on canvas", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke");

		generateWithOptions({
			data: {
				columns: [
					["data1", 60000, 120000, 180000, 240000],
					["data2", 120000, 180000, 240000, 300000]
				],
				type: line(),
				axes: {
					data2: "y2"
				}
			},
			axis: {
				y: {
					type: "timeseries",
					tick: {
						format: v => `y:${+v}`,
						time: {
							value: d3TimeMinute.every(1)
						}
					}
				},
				y2: {
					show: true,
					type: "timeseries",
					tick: {
						values: [120000, 240000],
						format: v => `y2:${+v}`
					}
				}
			},
			grid: {
				y: {
					show: true,
					lines: [
						{value: "1970-01-01T00:03:00.000Z", text: "y time grid"},
						{axis: "y2", value: "1970-01-01T00:04:00.000Z", text: "y2 time grid"}
					]
				}
			},
			regions: [
				{
					axis: "y",
					start: "1970-01-01T00:02:00.000Z",
					end: "1970-01-01T00:03:00.000Z",
					label: {
						text: "y time region",
						center: "xy"
					}
				},
				{
					axis: "y2",
					start: "1970-01-01T00:03:00.000Z",
					end: "1970-01-01T00:04:00.000Z",
					label: {
						text: "y2 time region",
						center: "xy"
					}
				}
			]
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const datum = chart.internal.data.targets[1].values[2];

		expect(messages).not.to.contain("axis.y.type");
		expect(messages).not.to.contain("axis.y2.type");
		expect(chart.internal.config.axis_y_type).to.be.equal("timeseries");
		expect(chart.internal.config.axis_y2_type).to.be.equal("timeseries");
		expect(chart.internal.scale.y.type).to.be.equal("time");
		expect(chart.internal.scale.y2.type).to.be.equal("time");
		expect(chart.internal.getYScaleById("data2")(datum.value))
			.to.be.closeTo(chart.internal.scale.y2(240000), 0.1);
		expect(fillText.mock.calls.some(([text]) => text === "y:60000")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "y2:240000")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "y time grid")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "y2 time grid")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "y time region")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "y2 time region")).to.be.true;
		expect(fillRect).toHaveBeenCalled();
		expect(stroke).toHaveBeenCalled();

		fillText.mockRestore();
		fillRect.mockRestore();
		stroke.mockRestore();
		warn.mockRestore();
	});

	it("should render per-target data regions as dashed canvas line segments", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const setLineDash = vi.spyOn(CanvasRenderingContext2D.prototype, "setLineDash");
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo");

		generateWithOptions({
			data: {
				x: "x",
				columns: [
					["x", "2024-01-01", "2024-01-02", "2024-01-04", "2024-01-07"],
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: line(),
				regions: {
					data1: [{
						start: "2024-01-02",
						end: "2024-01-04",
						style: {
							dasharray: "5 3"
						}
					}]
				}
			},
			axis: {
				x: {
					type: "timeseries"
				}
			},
			tooltip: {
				grouped: false
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const {margin} = chart.internal.state;
		const d = chart.internal.data.targets[0].values[2];

		expect(messages).not.to.contain("data.regions");
		expect(chart.internal.config.data_regions.data1).to.have.length(1);
		expect(setLineDash.mock.calls.some(([dash]) => dash[0] === 5 && dash[1] === 3)).to.be.true;
		expect(lineTo).toHaveBeenCalled();
		expect(chart.internal.hitDetector.findNearest(
			margin.left + chart.internal.scale.x(d.x),
			margin.top + chart.internal.scale.y(d.value)
		)).to.equal(d);

		setLineDash.mockRestore();
		lineTo.mockRestore();
		warn.mockRestore();
	});

	it("should update per-target data regions through load API", () => new Promise(done => {
		const setLineDash = vi.spyOn(CanvasRenderingContext2D.prototype, "setLineDash");
		const regions = {
			data1: [{
				start: 1,
				end: 2,
				style: {
					dasharray: "4 2"
				}
			}]
		};

		generateWithOptions({
			data: {
				columns,
				type: line()
			},
			transition: {
				duration: 0
			}
		});

		setLineDash.mockClear();

		chart.load({
			columns: [
				["data1", 80, 120, 200, 160],
				["data2", 40, 90, 60, 110]
			],
			regions,
			done() {
				expect(chart.internal.config.data_regions).to.deep.equal(regions);
				expect(setLineDash.mock.calls.some(([dash]) => dash[0] === 4 && dash[1] === 2)).to.be.true;

				setLineDash.mockRestore();
				done(1);
			}
		});
	}));

	it("should support canvas data selection API and click toggling", () => {
		const onselected = vi.fn();
		const onunselected = vi.fn();

		chart = generateWithOptions({
			data: {
				columns,
				type: bar(),
				selection: {
					enabled: true
				},
				onselected,
				onunselected
			}
		});

		chart.select("data1", [1]);

		expect(chart.selected("data1").map(d => d.index)).to.deep.equal([1]);
		expect(onselected.mock.calls[0][0].id).to.be.equal("data1");

		chart.unselect("data1", [1]);

		expect(chart.selected()).to.have.length(0);
		expect(onunselected.mock.calls[0][0].id).to.be.equal("data1");

		const {internal} = chart;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const target = internal.data.targets[0];
		const shape = internal.state.canvasShape;
		const getPoints = internal.generateGetBarPoints(shape.indices[TYPE.BAR], false);
		const center = getCanvasRectCenter(getPoints(target.values[0], 0), false);

		canvas.dispatchEvent(new MouseEvent("click", {
			bubbles: true,
			clientX: rect.left + internal.state.margin.left + center.x,
			clientY: rect.top + internal.state.margin.top + center.y
		}));

		expect(chart.selected("data1").map(d => d.index)).to.deep.equal([0]);
	});

	it("should toggle the clicked canvas line point instead of another series at the same x", () => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250],
					["data2", 230, 280, 320, 218, 250, 150]
				],
				type: line(),
				selection: {
					enabled: true,
					draggable: true
				}
			}
		});

		const {internal} = chart;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const d = internal.data.targets[1].values[3];
		const x = internal.circleX(d, d.index);
		const y = internal.circleY(d, d.index);

		canvas.dispatchEvent(new MouseEvent("click", {
			bubbles: true,
			clientX: rect.left + internal.state.margin.left + x,
			clientY: rect.top + internal.state.margin.top + y
		}));

		expect(chart.selected("data1")).to.have.length(0);
		expect(chart.selected("data2").map(d => d.index)).to.deep.equal([3]);

		canvas.dispatchEvent(new MouseEvent("click", {
			bubbles: true,
			clientX: rect.left + internal.state.margin.left + x,
			clientY: rect.top + internal.state.margin.top + y
		}));

		expect(chart.selected()).to.have.length(0);
	});

	it("should support canvas data selection dragging", () => new Promise(done => {
		chart = generateWithOptions({
			data: {
				columns,
				type: bar(),
				selection: {
					enabled: true,
					draggable: true
				}
			}
		});

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin, width, height} = chart.internal.state;
		const x1 = rect.left + margin.left + 1;
		const y1 = rect.top + margin.top + 1;
		const x2 = rect.left + margin.left + width - 1;
		const y2 = rect.top + margin.top + height - 1;

		canvas.dispatchEvent(new MouseEvent("mousedown", {
			bubbles: true,
			button: 0,
			buttons: 1,
			clientX: x1,
			clientY: y1,
			view: window
		}));
		window.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			button: 0,
			buttons: 1,
			clientX: x2,
			clientY: y2,
			view: window
		}));
		window.dispatchEvent(new MouseEvent("mouseup", {
			bubbles: true,
			button: 0,
			clientX: x2,
			clientY: y2,
			view: window
		}));

		setTimeout(() => {
			expect(chart.selected()).to.have.length(8);
			expect(chart.internal.state.dragging).to.be.false;
			done(1);
		}, 20);
	}));

	it("should support canvas flow API with a final full redraw", () => new Promise(done => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 20, 30, 40]
				],
				type: line()
			}
		});

		chart.flow({
			columns: [
				["data1", 50, 60]
			],
			done() {
				const values = this.data("data1")[0].values.map(v => v.value);

				expect(values).to.deep.equal([40, 50, 60]);
				expect(container.querySelectorAll("canvas")).to.have.length(1);
				expect(this.internal.state.canvasShape).to.not.be.null;
				done(1);
			}
		});
	}));

	it("should animate canvas flow when duration is specified", () => new Promise(done => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 20, 30, 40]
				],
				type: line()
			}
		});

		const domains: number[][] = [];
		const originalRenderCanvasFrame = chart.internal.renderCanvasFrame;
		const render = vi.spyOn(chart.internal, "renderCanvasFrame")
			.mockImplementation(function(...args) {
				domains.push(this.scale.x.domain().map(Number));

				return originalRenderCanvasFrame.apply(this, args);
			});

		chart.flow({
			columns: [
				["data1", 50, 60]
			],
			duration: 30,
			done() {
				const values = this.data("data1")[0].values.map(v => v.value);

				expect(values).to.deep.equal([40, 50, 60]);
				expect(domains.length).to.be.greaterThan(1);
				expect(domains[0][0]).to.be.lessThan(domains[domains.length - 1][0]);
				expect(this.internal.state.flowing).to.be.false;

				render.mockRestore();
				done(1);
			}
		});
	}));

	it("should rescale y domain during animated canvas flow", () => new Promise(done => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 20, 30, 40]
				],
				type: line()
			}
		});

		const yDomains: number[][] = [];
		const originalRenderCanvasFrame = chart.internal.renderCanvasFrame;
		const render = vi.spyOn(chart.internal, "renderCanvasFrame")
			.mockImplementation(function(...args) {
				yDomains.push(this.scale.y.domain().map(Number));

				return originalRenderCanvasFrame.apply(this, args);
			});

		chart.flow({
			columns: [
				["data1", 500, 60]
			],
			duration: 30,
			done() {
				expect(yDomains.length).to.be.greaterThan(1);
				expect(yDomains[0][1]).to.be.at.least(500);

				render.mockRestore();
				done(1);
			}
		});
	}));

	it("should flush a pending canvas flow before starting another flow", () => new Promise(done => {
		const doneCalls: string[] = [];

		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 10, 20, 30, 40]
				],
				type: line()
			}
		});

		chart.flow({
			columns: [
				["data1", 50, 60]
			],
			duration: 80,
			done() {
				doneCalls.push("first");
			}
		});
		chart.flow({
			columns: [
				["data1", 70, 80]
			],
			duration: 80,
			done() {
				const values = this.data("data1")[0].values;
				const xs = values.map(v => v.x);
				const domain = this.internal.scale.x.domain().map(Number);

				doneCalls.push("second");
				expect(values.map(v => v.value)).to.deep.equal([50, 60, 70, 80]);
				expect(domain[0]).to.be.at.most(Math.min(...xs));
				expect(domain[1]).to.be.at.least(Math.max(...xs));
				expect(this.internal.state.canvasFlowFrame).to.be.null;
				expect(this.internal.state.canvasFlowFinish).to.be.null;
				expect(this.internal.state.flowing).to.be.false;
				expect(doneCalls).to.deep.equal(["first", "second"]);
				done(1);
			}
		});
	}));

	it("should keep canvas flow synchronous when only transition duration is configured", () => new Promise(done => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 20, 30, 40]
				],
				type: line()
			},
			transition: {
				duration: 30
			}
		});

		const frame = vi.spyOn(window, "requestAnimationFrame");
		const animate = vi.spyOn(chart.internal, "animateCanvasFlow");

		chart.flow({
			columns: [
				["data1", 50]
			],
			done() {
				const values = this.data("data1")[0].values.map(v => v.value);

				expect(values).to.deep.equal([30, 40, 50]);
				expect(animate).toHaveBeenCalledWith(expect.objectContaining({
					duration: 0
				}));
				expect(frame).not.toHaveBeenCalled();

				animate.mockRestore();
				frame.mockRestore();
				warn.mockRestore();
				done(1);
			}
		});
	}));

	it("should animate canvas flow on log x axis with positive domain interpolation", () => new Promise(done => {
		chart = generateWithOptions({
			axis: {
				x: {
					type: "log",
					tick: {
						values: [1, 10, 100, 1000, 10000]
					}
				}
			},
			data: {
				x: "x",
				columns: [
					["x", 1, 10, 100],
					["data1", 20, 30, 40]
				],
				type: line()
			}
		});

		const domains: number[][] = [];
		const originalRenderCanvasFrame = chart.internal.renderCanvasFrame;
		const render = vi.spyOn(chart.internal, "renderCanvasFrame")
			.mockImplementation(function(...args) {
				domains.push(this.scale.x.domain().map(Number));

				return originalRenderCanvasFrame.apply(this, args);
			});

		chart.flow({
			columns: [
				["x", 1000, 10000],
				["data1", 50, 60]
			],
			duration: 30,
			done() {
				const values = this.data("data1")[0].values.map(v => v.value);
				const xs = this.data("data1")[0].values.map(v => +v.x);

				expect(values).to.deep.equal([40, 50, 60]);
				expect(xs.every(x => x > 0)).to.be.true;
				expect(domains.length).to.be.greaterThan(1);
				expect(domains.every(domain => domain.every(value => value > 0))).to.be.true;
				expect(domains[0][0]).to.be.lessThan(domains[domains.length - 1][0]);
				expect(this.internal.state.flowing).to.be.false;

				render.mockRestore();
				done(1);
			}
		});
	}));

	it("should skip canvas flow animation for very large data", () => new Promise(done => {
		chart = generateWithOptions({
			axis: {
				x: {
					tick: {
						show: false
					}
				}
			},
			data: {
				columns: [
					["data1", 20, 30, 40]
				],
				type: line()
			},
			point: {
				show: false
			}
		});

		const target = chart.internal.data.targets[0];
		const template = target.values[0];

		target.values = Array.from({length: 100001}, (_, index) => ({
			...template,
			index,
			x: index,
			value: index % 100
		}));

		const render = vi.spyOn(chart.internal, "renderCanvasFrame");
		const redraw = vi.spyOn(chart.internal, "redraw")
			.mockImplementation(() => {});

		chart.flow({
			columns: [
				["data1", 101]
			],
			duration: 30,
			done() {
				const values = this.data("data1")[0].values;

				expect(render).not.toHaveBeenCalled();
				expect(redraw).toHaveBeenCalled();
				expect(values).to.have.length(100001);
				expect(values[0].index).to.be.equal(1);
				expect(values[values.length - 1].value).to.be.equal(101);

				redraw.mockRestore();
				render.mockRestore();
				done(1);
			}
		});
	}));

	it("should render canvas subchart overview and support programmatic range", () => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true,
				init: {
					range: [1, 3]
				}
			}
		});

		const {config, scale, state} = chart.internal;

		expect(config.subchart_show).to.be.true;
		expect(chart.subchart().map(Math.round)).to.deep.equal([1, 3]);
		expect(scale.x.domain().map(Math.round)).to.deep.equal([1, 3]);
		expect(state.height2).to.be.greaterThan(0);

		chart.subchart([2, 4]);

		expect(chart.subchart().map(Math.round)).to.deep.equal([2, 4]);
		expect(scale.x.domain().map(Math.round)).to.deep.equal([2, 4]);
	});

	it("should render canvas subchart line overview with data regions", () => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				regions: {
					data1: [{
						start: 1,
						end: 4,
						style: {
							dasharray: "3 3"
						}
					}]
				},
				type: line()
			},
			subchart: {
				show: true,
				init: {
					range: [1, 3]
				}
			}
		});

		expect(container.querySelectorAll("canvas")).to.have.length(1);
		expect(chart.subchart().map(Math.round)).to.deep.equal([1, 3]);
		expect(chart.internal.scale.x.domain().map(Math.round)).to.deep.equal([1, 3]);
	});

	it("should support mouse brushing on canvas subchart", () => {
		const onbrush = vi.fn();

		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true,
				onbrush
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin2, width2, height2} = internal.state;
		const start = {
			x: rect.left + margin2.left + width2 * 0.25,
			y: rect.top + margin2.top + height2 / 2
		};
		const end = {
			x: rect.left + margin2.left + width2 * 0.65,
			y: start.y
		};

		canvas.dispatchEvent(new MouseEvent("mousedown", {
			bubbles: true,
			clientX: start.x,
			clientY: start.y
		}));
		window.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: end.x,
			clientY: end.y
		}));
		window.dispatchEvent(new MouseEvent("mouseup", {
			bubbles: true,
			clientX: end.x,
			clientY: end.y
		}));

		expect(onbrush).toHaveBeenCalled();
		expect(internal.state.domain[0]).to.be.lessThan(internal.state.domain[1]);
		expect(internal.scale.x.domain()).to.deep.equal(internal.state.domain);
	});

	it("should support touch brushing on canvas subchart", () => {
		const onbrush = vi.fn();

		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true,
				onbrush
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin2, width2, height2} = internal.state;
		const start = {
			x: rect.left + margin2.left + width2 * 0.2,
			y: rect.top + margin2.top + height2 / 2
		};
		const end = {
			x: rect.left + margin2.left + width2 * 0.6,
			y: start.y
		};
		const touchStart = new Touch({
			identifier: 1,
			target: canvas,
			clientX: start.x,
			clientY: start.y
		});
		const touchEnd = new Touch({
			identifier: 1,
			target: canvas,
			clientX: end.x,
			clientY: end.y
		});

		canvas.dispatchEvent(new TouchEvent("touchstart", {
			bubbles: true,
			cancelable: true,
			touches: [touchStart],
			targetTouches: [touchStart],
			changedTouches: [touchStart]
		}));
		canvas.dispatchEvent(new TouchEvent("touchmove", {
			bubbles: true,
			cancelable: true,
			touches: [touchEnd],
			targetTouches: [touchEnd],
			changedTouches: [touchEnd]
		}));
		canvas.dispatchEvent(new TouchEvent("touchend", {
			bubbles: true,
			cancelable: true,
			touches: [],
			targetTouches: [],
			changedTouches: [touchEnd]
		}));

		expect(onbrush).toHaveBeenCalled();
		expect(internal.state.domain[0]).to.be.lessThan(internal.state.domain[1]);
		expect(internal.scale.x.domain()).to.deep.equal(internal.state.domain);
	});

	it("should support non-mouse pointer brushing on canvas subchart", () => {
		const onbrush = vi.fn();

		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true,
				onbrush
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin2, width2, height2} = internal.state;
		const start = {
			x: rect.left + margin2.left + width2 * 0.25,
			y: rect.top + margin2.top + height2 / 2
		};
		const end = {
			x: rect.left + margin2.left + width2 * 0.7,
			y: start.y
		};
		const eventOptions = {pointerId: 7, pointerType: "pen", bubbles: true};

		canvas.dispatchEvent(new PointerEvent("pointerdown", {
			...eventOptions,
			clientX: start.x,
			clientY: start.y
		}));
		window.dispatchEvent(new PointerEvent("pointermove", {
			...eventOptions,
			clientX: end.x,
			clientY: end.y
		}));
		window.dispatchEvent(new PointerEvent("pointerup", {
			...eventOptions,
			clientX: end.x,
			clientY: end.y
		}));

		expect(onbrush).toHaveBeenCalled();
		expect(internal.state.domain[0]).to.be.lessThan(internal.state.domain[1]);
		expect(internal.scale.x.domain()).to.deep.equal(internal.state.domain);
	});

	it("should cancel non-mouse pointer subchart brushing without onbrush callback", () => {
		const onbrush = vi.fn();

		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true,
				onbrush
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const setPointerCapture = vi.fn();
		const releasePointerCapture = vi.fn();
		const originalSetPointerCapture = canvas.setPointerCapture;
		const originalReleasePointerCapture = canvas.releasePointerCapture;
		const eventOptions = {pointerId: 11, pointerType: "pen", bubbles: true};
		const start = getCanvasSubchartClientPoint(internal.state.width2 * 0.25);
		const end = getCanvasSubchartClientPoint(internal.state.width2 * 0.7);

		canvas.setPointerCapture = setPointerCapture;
		canvas.releasePointerCapture = releasePointerCapture;

		try {
			canvas.dispatchEvent(new PointerEvent("pointerdown", {
				...eventOptions,
				clientX: start.x,
				clientY: start.y
			}));
			window.dispatchEvent(new PointerEvent("pointermove", {
				...eventOptions,
				clientX: end.x,
				clientY: end.y
			}));
			window.dispatchEvent(new PointerEvent("pointercancel", {
				...eventOptions,
				clientX: end.x,
				clientY: end.y
			}));

			expect(setPointerCapture).toHaveBeenCalledWith(11);
			expect(releasePointerCapture).toHaveBeenCalledWith(11);
			expect(onbrush).not.toHaveBeenCalled();
			expect(internal.state.canvasSubchartBrushDragging).to.be.false;
			expect(internal.state.dragging).to.be.false;
		} finally {
			canvas.setPointerCapture = originalSetPointerCapture;
			canvas.releasePointerCapture = originalReleasePointerCapture;
		}
	});

	it("should cancel touch subchart brushing without onbrush callback", () => {
		const onbrush = vi.fn();

		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true,
				onbrush
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const startPoint = getCanvasSubchartClientPoint(internal.state.width2 * 0.2);
		const endPoint = getCanvasSubchartClientPoint(internal.state.width2 * 0.65);
		const touchStart = new Touch({
			identifier: 5,
			target: canvas,
			clientX: startPoint.x,
			clientY: startPoint.y
		});
		const touchEnd = new Touch({
			identifier: 5,
			target: canvas,
			clientX: endPoint.x,
			clientY: endPoint.y
		});

		canvas.dispatchEvent(new TouchEvent("touchstart", {
			bubbles: true,
			cancelable: true,
			touches: [touchStart],
			targetTouches: [touchStart],
			changedTouches: [touchStart]
		}));
		canvas.dispatchEvent(new TouchEvent("touchmove", {
			bubbles: true,
			cancelable: true,
			touches: [touchEnd],
			targetTouches: [touchEnd],
			changedTouches: [touchEnd]
		}));
		canvas.dispatchEvent(new TouchEvent("touchcancel", {
			bubbles: true,
			cancelable: true,
			touches: [],
			targetTouches: [],
			changedTouches: [touchEnd]
		}));

		expect(onbrush).not.toHaveBeenCalled();
		expect(internal.state.canvasSubchartBrushDragging).to.be.false;
		expect(internal.state.dragging).to.be.false;
	});

	it("should clamp canvas subchart brushing to axis.x.extent", () => {
		const extent = [40, 120];

		chart = generateWithOptions({
			axis: {
				x: {
					extent
				}
			},
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250, 180, 230]
				],
				type: line()
			},
			subchart: {
				show: true
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin2, width2, height2} = internal.state;
		const startCoord = extent[0] + 10;
		const endCoord = Math.min(width2 - 1, extent[1] + 80);
		const y = rect.top + margin2.top + (height2 / 2);

		canvas.dispatchEvent(new MouseEvent("mousedown", {
			bubbles: true,
			clientX: rect.left + margin2.left + startCoord,
			clientY: y
		}));
		window.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: rect.left + margin2.left + endCoord,
			clientY: y
		}));
		window.dispatchEvent(new MouseEvent("mouseup", {
			bubbles: true,
			clientX: rect.left + margin2.left + endCoord,
			clientY: y
		}));

		const expected = [startCoord, extent[1]].map(internal.scale.subX.invert);

		expect(chart.subchart()[0]).to.be.closeTo(expected[0], 0.1);
		expect(chart.subchart()[1]).to.be.closeTo(expected[1], 0.1);
	});

	it("should clamp rotated canvas subchart brushing to axis.x.extent", () => {
		const extent = [30, 105];

		chart = generateWithOptions({
			axis: {
				rotated: true,
				x: {
					extent
				}
			},
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250, 180, 230]
				],
				type: line()
			},
			subchart: {
				show: true
			}
		});

		const internal = chart.internal;
		const startCoord = extent[0] + 8;
		const endCoord = Math.min(internal.state.height2 - 1, extent[1] + 70);
		const expected = [startCoord, extent[1]].map(internal.scale.subX.invert);

		dragCanvasSubchart(startCoord, endCoord);

		expect(chart.subchart()[0]).to.be.closeTo(expected[0], 0.1);
		expect(chart.subchart()[1]).to.be.closeTo(expected[1], 0.1);
	});

	it("should clamp timeseries canvas subchart brushing to string axis.x.extent", () => {
		chart = generateWithOptions({
			axis: {
				x: {
					type: "timeseries",
					extent: ["2020-01-02", "2020-01-05"]
				}
			},
			data: {
				x: "x",
				columns: [
					["x", "2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06"],
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true
			}
		});

		const internal = chart.internal;
		const extent = internal.axis.getExtent();
		const startCoord = extent[0] + 5;
		const endCoord = Math.min(internal.state.width2 - 1, extent[1] + 80);
		const expected = [startCoord, extent[1]].map(internal.scale.subX.invert);
		const extentDomain = extent.map(internal.scale.subX.invert).map(Number);

		dragCanvasSubchart(startCoord, endCoord);

		expect(+chart.subchart()[0]).to.be.at.least(extentDomain[0] - 1);
		expect(+chart.subchart()[0]).to.be.at.most(+expected[0] + 1);
		expect(+chart.subchart()[1]).to.be.closeTo(+expected[1], 1);
	});

	it("should keep category inverted canvas subchart brushing inside axis.x.extent", () => {
		const extent = [35, 120];

		chart = generateWithOptions({
			axis: {
				x: {
					type: "category",
					categories: ["a", "b", "c", "d", "e", "f"],
					inverted: true,
					extent
				}
			},
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true
			}
		});

		const internal = chart.internal;
		const startCoord = extent[0] + 10;
		const endCoord = Math.min(internal.state.width2 - 1, extent[1] + 60);
		const fillRectRecords: any[] = [];
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(this: CanvasRenderingContext2D, x, y, w, h) {
				fillRectRecords.push({
					x,
					y,
					w,
					h,
					alpha: this.globalAlpha,
					fillStyle: String(this.fillStyle)
				});
			});

		try {
			dragCanvasSubchart(startCoord, endCoord);

			const brushRect = fillRectRecords.find(({y, h, alpha}) =>
				y === internal.state.margin2.top &&
				h === internal.state.height2 &&
				alpha === internal.canvasTheme.style.subchartBrush.opacity
			);

			expect(brushRect).not.to.be.undefined;
			expect(brushRect.x - internal.state.margin2.left).to.be.at.least(extent[0] - 0.1);
			expect(brushRect.x + brushRect.w - internal.state.margin2.left).to.be.at.most(extent[1] + 0.1);
		} finally {
			fillRect.mockRestore();
		}
	});

	it("should match SVG default paint for canvas subchart handles", () => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				],
				type: line()
			},
			subchart: {
				show: true,
				showHandle: true,
				init: {
					range: [1, 3]
				}
			}
		});

		const {subchartBrush} = chart.internal.canvasTheme.style;
		const stroke = subchartBrush.handleStroke.replace(/\s/g, "");

		expect(subchartBrush.handleFill).to.be.equal("transparent");
		expect(stroke === "#000" || stroke === "#000000" || stroke === "black" || stroke === "rgb(0,0,0)")
			.to.be.true;
		expect(subchartBrush.handleOpacity).to.be.equal(1);
		expect(subchartBrush.handleLineWidth).to.be.equal(1);
	});

	it("should probe canvas subchart brush and handle CSS theme", () => {
		const style = document.createElement("style");
		const fillRectRecords: any[] = [];
		const fillRecords: any[] = [];
		const strokeRecords: any[] = [];
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				fillRectRecords.push({
					fillStyle: String(this.fillStyle),
					alpha: this.globalAlpha
				});
			});
		const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				fillRecords.push({
					fillStyle: String(this.fillStyle),
					alpha: this.globalAlpha
				});
			});
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				strokeRecords.push({
					strokeStyle: String(this.strokeStyle),
					lineWidth: this.lineWidth
				});
			});

		style.textContent = `
			.bb-brush .selection {
				fill: rgb(40, 41, 42);
				fill-opacity: .44;
			}
			.bb-brush path {
				fill: rgb(43, 44, 45);
				stroke: rgb(46, 47, 48);
				stroke-width: 3px;
			}
		`;
		document.head.appendChild(style);

		try {
			chart = generateWithOptions({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: line()
				},
				subchart: {
					show: true,
					showHandle: true,
					init: {
						range: [1, 3]
					}
				}
			});

			const themeStyle = chart.internal.canvasTheme.style;

			expect(themeStyle.subchartBrush.fill).to.be.equal("rgb(40, 41, 42)");
			expect(themeStyle.subchartBrush.opacity).to.be.equal(0.44);
			expect(themeStyle.subchartBrush.handleFill).to.be.equal("rgb(43, 44, 45)");
			expect(themeStyle.subchartBrush.handleStroke).to.be.equal("rgb(46, 47, 48)");
			expect(themeStyle.subchartBrush.handleLineWidth).to.be.equal(3);
			expect(fillRectRecords.some(({fillStyle, alpha}) =>
				fillStyle === "#28292a" && alpha === 0.44
			)).to.be.true;
			expect(fillRecords.some(({fillStyle}) => fillStyle === "#2b2c2d")).to.be.true;
			expect(strokeRecords.some(({strokeStyle, lineWidth}) =>
				strokeStyle === "#2e2f30" && lineWidth === 3
			)).to.be.true;
		} finally {
			style.remove();
			fillRect.mockRestore();
			fill.mockRestore();
			stroke.mockRestore();
		}
	});

	it("should move canvas subchart brush selection when dragging inside it", () => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250, 180, 230]
				],
				type: line()
			},
			subchart: {
				show: true,
				init: {
					range: [1, 3]
				}
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin2, height2} = internal.state;
		const before = chart.subchart();
		const startCoord = (internal.scale.subX(before[0]) + internal.scale.subX(before[1])) / 2;
		const endCoord = startCoord + (internal.state.width2 * 0.2);
		const y = rect.top + margin2.top + (height2 / 2);

		canvas.dispatchEvent(new MouseEvent("mousedown", {
			bubbles: true,
			clientX: rect.left + margin2.left + startCoord,
			clientY: y
		}));
		window.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: rect.left + margin2.left + endCoord,
			clientY: y
		}));
		window.dispatchEvent(new MouseEvent("mouseup", {
			bubbles: true,
			clientX: rect.left + margin2.left + endCoord,
			clientY: y
		}));

		const after = chart.subchart();

		expect(after[0]).to.be.greaterThan(before[0]);
		expect(after[1] - after[0]).to.be.closeTo(before[1] - before[0], 0.1);
		expect(internal.scale.x.domain()).to.deep.equal(internal.state.domain);
	});

	it("should resize canvas subchart brush selection from the edge handle", () => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250, 180, 230]
				],
				type: line()
			},
			subchart: {
				show: true,
				showHandle: true,
				init: {
					range: [1, 3]
				}
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin2, height2} = internal.state;
		const startCoord = internal.scale.subX(3);
		const endCoord = internal.scale.subX(5);
		const y = rect.top + margin2.top + (height2 / 2);

		canvas.dispatchEvent(new MouseEvent("mousedown", {
			bubbles: true,
			clientX: rect.left + margin2.left + startCoord,
			clientY: y
		}));
		window.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			clientX: rect.left + margin2.left + endCoord,
			clientY: y
		}));
		window.dispatchEvent(new MouseEvent("mouseup", {
			bubbles: true,
			clientX: rect.left + margin2.left + endCoord,
			clientY: y
		}));

		const after = chart.subchart();

		expect(after[0]).to.be.closeTo(1, 0.1);
		expect(after[1]).to.be.greaterThan(4.5);
	});

	it("should reset canvas subchart selection when clicking outside the selected brush", () => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250, 180, 230]
				],
				type: line()
			},
			subchart: {
				show: true,
				init: {
					range: [1, 3]
				}
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin2, width2, height2} = internal.state;
		const x = rect.left + margin2.left + (width2 * 0.9);
		const y = rect.top + margin2.top + (height2 / 2);

		canvas.dispatchEvent(new MouseEvent("mousedown", {
			bubbles: true,
			clientX: x,
			clientY: y
		}));
		window.dispatchEvent(new MouseEvent("mouseup", {
			bubbles: true,
			clientX: x,
			clientY: y
		}));

		expect(internal.state.domain).to.be.undefined;
		expect(chart.subchart().map(v => Math.round(v) || 0)).to.deep.equal([0, 7]);
		expect(internal.scale.x.domain().map(v => Math.round(v) || 0)).to.deep.equal([0, 7]);
	});

	it("should draw canvas subchart x-axis tick text", () => {
		chart = generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250, 180, 230]
				],
				type: line()
			},
			subchart: {
				show: true
			}
		});

		const internal = chart.internal;
		const canvas = chart.$.canvas.node();
		const ctx = canvas.getContext("2d");
		const {current, margin2, width2, height2} = internal.state;
		const dpr = canvas.width / current.width;
		const image = ctx.getImageData(
			Math.floor(margin2.left * dpr),
			Math.floor((margin2.top + height2 + 8) * dpr),
			Math.ceil(width2 * dpr),
			Math.ceil(18 * dpr)
		).data;
		let pixels = 0;

		for (let i = 3; i < image.length; i += 4) {
			image[i] > 0 && pixels++;
		}

		expect(pixels).to.be.greaterThan(0);
	});

	it("should support canvas zoom API and wheel interaction", () => {
		chart = generateWithOptions({
			data: {
				columns: generateColumns(2, 20),
				type: line()
			},
			zoom: {
				enabled: true
			}
		});

		chart.zoom([4, 10]);

		expect(chart.zoom().map(Math.round)).to.deep.equal([4, 10]);
		expect(chart.internal.scale.zoom).to.not.be.null;

		chart.unzoom();

		expect(chart.internal.scale.zoom).to.be.null;

		const before = chart.zoom();
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();

		canvas.dispatchEvent(new WheelEvent("wheel", {
			bubbles: true,
			cancelable: true,
			clientX: rect.left + chart.internal.state.margin.left + chart.internal.state.width / 2,
			clientY: rect.top + chart.internal.state.margin.top + chart.internal.state.height / 2,
			deltaY: -120
		}));

		const after = chart.zoom();

		expect(after[1] - after[0]).to.be.lessThan(before[1] - before[0]);
	});

	it("should redraw canvas x axis ticks from zoomed data x values and restore after unzoom", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const getXLabels = () => fillText.mock.calls
			.map(([text]) => String(text))
			.filter(text => text.indexOf("x:") === 0);

		chart = generateWithOptions({
			data: {
				columns: generateColumns(1, 40),
				type: line()
			},
			axis: {
				x: {
					tick: {
						format: v => `x:${Number(v).toFixed(1)}`
					}
				},
				y: {
					tick: {
						format: v => `y:${v}`
					}
				}
			},
			zoom: {
				enabled: true
			}
		});

		fillText.mockClear();
		chart.flush();
		const initialLabels = getXLabels();

		fillText.mockClear();
		chart.zoom([4, 10]);

		const labels = getXLabels();

		expect(labels.length).to.be.greaterThan(0);
		expect(labels).not.to.contain("x:0.0");
		expect(labels).not.to.contain("x:19.0");
		expect(labels).to.include.members(["x:4.0", "x:10.0"]);

		fillText.mockClear();
		chart.zoom([20, 27]);

		const narrowLabels = getXLabels();
		const maxVisibleTick = Math.max(
			...narrowLabels.map(text => Number(text.replace("x:", "")))
		);

		expect(narrowLabels.length).to.be.greaterThan(0);
		expect(narrowLabels.every(text => Number.isInteger(Number(text.replace("x:", ""))))).to.be.true;
		expect(maxVisibleTick).to.be.greaterThan(26.9);

		fillText.mockClear();
		chart.unzoom();

		expect(getXLabels()).to.deep.equal(initialLabels);

		fillText.mockRestore();
	});

	it("should clip canvas x axis ticks to plot range while zoom panning", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const rect = vi.spyOn(CanvasRenderingContext2D.prototype, "rect");

		chart = generateWithOptions({
			data: {
				columns: generateColumns(1, 40),
				type: line()
			},
			axis: {
				x: {
					tick: {
						format: value => `x:${Number(value).toFixed(1)}`
					}
				},
				y: {
					tick: {
						format: value => `y:${value}`
					}
				}
			},
			zoom: {
				enabled: true
			}
		});

		fillText.mockClear();
		rect.mockClear();
		chart.zoom([4.4, 10.6]);

		const labels = fillText.mock.calls
			.map(([text]) => String(text))
			.filter(text => text.indexOf("x:") === 0);
		const {current, margin, width} = chart.internal.state;

		expect(labels).to.include.members(["x:5.0", "x:10.0"]);
		expect(labels).not.to.contain("x:4.0");
		expect(labels).not.to.contain("x:11.0");
		expect(rect.mock.calls.some(([x, y, w, h]) =>
			x === margin.left - 20 && y === 0 && w === width + 40 && h === current.height
		)).to.be.true;

		rect.mockRestore();
		fillText.mockRestore();
	});

	it("should clip canvas data layer during zoom redraw", () => {
		const clip = vi.spyOn(CanvasRenderingContext2D.prototype, "clip");
		const rect = vi.spyOn(CanvasRenderingContext2D.prototype, "rect");

		chart = generateWithOptions({
			data: {
				columns: generateColumns(1, 20),
				type: line()
			},
			zoom: {
				enabled: true
			}
		});

		clip.mockClear();
		rect.mockClear();
		chart.zoom([4, 10]);

		const {margin, width, height} = chart.internal.state;

		expect(clip).toHaveBeenCalled();
		expect(rect.mock.calls.some(([x, y, w, h]) =>
			x === margin.left && y === margin.top && w === width && h === height
		)).to.be.true;

		clip.mockRestore();
		rect.mockRestore();
	});

	it("should support canvas drag zoom interaction", () => new Promise(done => {
		chart = generateWithOptions({
			data: {
				columns: generateColumns(2, 20),
				type: line()
			},
			zoom: {
				enabled: true,
				type: "drag"
			}
		});

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin, width, height} = chart.internal.state;
		const y = rect.top + margin.top + height / 2;
		const x1 = rect.left + margin.left + width * 0.25;
		const x2 = rect.left + margin.left + width * 0.75;

		canvas.dispatchEvent(new MouseEvent("mousedown", {
			bubbles: true,
			button: 0,
			buttons: 1,
			clientX: x1,
			clientY: y,
			view: window
		}));
		window.dispatchEvent(new MouseEvent("mousemove", {
			bubbles: true,
			button: 0,
			buttons: 1,
			clientX: x2,
			clientY: y,
			view: window
		}));
		window.dispatchEvent(new MouseEvent("mouseup", {
			bubbles: true,
			button: 0,
			clientX: x2,
			clientY: y,
			view: window
		}));

		setTimeout(() => {
			const domain = chart.zoom();

			expect(domain[1] - domain[0]).to.be.lessThan(
				chart.internal.org.xDomain[1] - chart.internal.org.xDomain[0]
			);
			done(1);
		}, 50);
	}));

	it("should support canvas pinch zoom interaction", () => new Promise(done => {
		chart = generateWithOptions({
			data: {
				columns: generateColumns(2, 20),
				type: line()
			},
			interaction: {
				inputType: {
					touch: true
				}
			},
			zoom: {
				enabled: true
			}
		});

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin, width, height} = chart.internal.state;
		const centerX = rect.left + margin.left + width / 2;
		const centerY = rect.top + margin.top + height / 2;
		const touchAStart = new Touch({
			identifier: 1,
			target: canvas,
			clientX: centerX - 30,
			clientY: centerY
		});
		const touchBStart = new Touch({
			identifier: 2,
			target: canvas,
			clientX: centerX + 30,
			clientY: centerY
		});
		const touchAEnd = new Touch({
			identifier: 1,
			target: canvas,
			clientX: centerX - 80,
			clientY: centerY
		});
		const touchBEnd = new Touch({
			identifier: 2,
			target: canvas,
			clientX: centerX + 80,
			clientY: centerY
		});
		const before = chart.zoom();

		canvas.dispatchEvent(new TouchEvent("touchstart", {
			bubbles: true,
			cancelable: true,
			touches: [touchAStart, touchBStart],
			targetTouches: [touchAStart, touchBStart],
			changedTouches: [touchAStart, touchBStart]
		}));
		canvas.dispatchEvent(new TouchEvent("touchmove", {
			bubbles: true,
			cancelable: true,
			touches: [touchAEnd, touchBEnd],
			targetTouches: [touchAEnd, touchBEnd],
			changedTouches: [touchAEnd, touchBEnd]
		}));
		canvas.dispatchEvent(new TouchEvent("touchend", {
			bubbles: true,
			cancelable: true,
			touches: [],
			targetTouches: [],
			changedTouches: [touchAEnd, touchBEnd]
		}));

		setTimeout(() => {
			const after = chart.zoom();

			expect(after[1] - after[0]).to.be.lessThan(before[1] - before[0]);
			done(1);
		}, 50);
	}));

	it("should support canvas touch pan zoom interaction", () => new Promise(done => {
		chart = generateWithOptions({
			data: {
				columns: generateColumns(2, 20),
				type: line()
			},
			interaction: {
				inputType: {
					touch: true
				}
			},
			zoom: {
				enabled: true
			}
		});

		chart.zoom([4, 10]);

		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();
		const {margin, width, height} = chart.internal.state;
		const startX = rect.left + margin.left + width / 2;
		const startY = rect.top + margin.top + height / 2;
		const before = chart.zoom();
		const touchStart = new Touch({
			identifier: 1,
			target: canvas,
			clientX: startX,
			clientY: startY
		});
		const touchEnd = new Touch({
			identifier: 1,
			target: canvas,
			clientX: startX + 60,
			clientY: startY
		});

		canvas.dispatchEvent(new TouchEvent("touchstart", {
			bubbles: true,
			cancelable: true,
			touches: [touchStart],
			targetTouches: [touchStart],
			changedTouches: [touchStart]
		}));
		canvas.dispatchEvent(new TouchEvent("touchmove", {
			bubbles: true,
			cancelable: true,
			touches: [touchEnd],
			targetTouches: [touchEnd],
			changedTouches: [touchEnd]
		}));
		canvas.dispatchEvent(new TouchEvent("touchend", {
			bubbles: true,
			cancelable: true,
			touches: [],
			targetTouches: [],
			changedTouches: [touchEnd]
		}));

		setTimeout(() => {
			const after = chart.zoom();

			expect(Math.abs(after[0] - before[0])).to.be.greaterThan(0.1);
			done(1);
		}, 50);
	}));

	it("should warn and ignore explicit transition.duration in canvas mode", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

		generateWithOptions({
			transition: {
				duration: 500
			},
			data: {
				columns,
				type: line()
			}
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");

		expect(messages).to.contain("canvas mode: transition.duration is ignored");
		expect(chart.internal.config.transition_duration).to.be.equal(0);

		warn.mockRestore();
	});

	it("should warn and ignore unsupported canvas options", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		chart = bb.generate({
			render: {
				mode: canvas()
			},
			bindto: container,
			size: {
				width: 320,
				height: 240
			},
			data: {
				columns,
				type: line(),
				groups: [["data1", "data2"]],
				selection: {
					enabled: true,
					draggable: true
				},
				regions: {
					data1: [{start: 1, end: 2}]
				}
			},
			subchart: {
				show: true
			},
			zoom: {
				enabled: true
			},
			bar: {
				radius: 4
			},
			regions: [{axis: "x", start: 1, end: 2}]
		});

		const messages = warn.mock.calls.map(([message]) => message).join("\n");
		const {config} = chart.internal;

		expect(messages).not.to.contain("subchart");
		expect(messages).not.to.contain("zoom");
		expect(messages).not.to.contain("data.groups");
		expect(messages).not.to.contain("data.selection");
		expect(messages).not.to.contain("data.regions");
		expect(messages).not.to.contain("bar.radius");
		expect(messages).not.to.contain("canvas mode: regions is not supported");
		expect(config.subchart_show).to.be.true;
		expect(config.zoom_enabled).to.be.true;
		expect(config.data_selection_enabled).to.be.true;
		expect(config.data_selection_draggable).to.be.true;
		expect(config.data_groups).to.deep.equal([["data1", "data2"]]);
		expect(config.bar_radius).to.be.equal(4);
		expect(config.data_regions).to.deep.equal({
			data1: [{start: 1, end: 2}]
		});
		expect(config.regions).to.deep.equal([{axis: "x", start: 1, end: 2}]);

		warn.mockRestore();
	});
});
