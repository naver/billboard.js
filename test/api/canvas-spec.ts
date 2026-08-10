/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, afterEach, beforeAll, it, expect */
import {afterEach, beforeAll, describe, expect, it, vi} from "vitest";
import bb, {
	area,
	bar,
	canvas,
	category,
	exportApi,
	flow,
	grid,
	line,
	regions,
	scatter,
	selection,
	subchart,
	zoom
} from "../../src/index.canvas";
import {$FOCUS, $LEGEND} from "../../src/config/classes";

describe("API canvas", () => {
	let chart;
	let container;

	const columns = [
		["data1", 30, 200, 100, 400],
		["data2", 50, 20, 10, 40]
	];

	beforeAll(() => {
		area();
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
		vi.restoreAllMocks();
	});

	function generateWithOptions(options = {}) {
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
			transition: {
				duration: 0
			},
			data: {
				columns,
				type: line()
			},
			...options
		}));
	}

	function legendItem(id: string): HTMLButtonElement {
		return container.querySelector(`button[data-id="${id}"]`);
	}

	it("updates data, color, name and visibility APIs without SVG targets", () => {
		generateWithOptions({
			data: {
				columns,
				type: line()
			}
		});

		const {internal} = chart;
		const initialGeneration = internal.state.redrawGeneration;

		expect(chart.data.values("data1")).to.deep.equal([30, 200, 100, 400]);
		expect(container.querySelector("svg")).to.be.null;
		expect(legendItem("data1")).not.to.be.null;

		expect(chart.data.names({data1: "Alpha"})).to.deep.include({data1: "Alpha"});
		expect(legendItem("data1").textContent).to.contain("Alpha");

		chart.data.colors({data1: "#123456"});
		expect(chart.data.colors().data1).to.be.equal("#123456");
		expect(legendItem("data1").querySelector(`.${$LEGEND.legendItemTile}`)?.style.backgroundColor)
			.to.be.equal("rgb(18, 52, 86)");

		chart.hide("data1");
		expect(internal.state.hiddenTargetIds.has("data1")).to.be.true;
		expect(legendItem("data1").classList.contains($LEGEND.legendItemHidden)).to.be.true;

		chart.show("data1");
		expect(internal.state.hiddenTargetIds.has("data1")).to.be.false;
		expect(legendItem("data1").classList.contains($LEGEND.legendItemHidden)).to.be.false;

		chart.toggle("data2");
		expect(internal.state.hiddenTargetIds.has("data2")).to.be.true;

		expect(internal.state.redrawGeneration).to.be.greaterThan(initialGeneration);
	});

	it("updates canvas HTML legend through legend.show/hide APIs", () => {
		generateWithOptions();

		const {internal} = chart;
		const item = legendItem("data1");
		const initialGeneration = internal.state.redrawGeneration;

		chart.legend.hide("data1");
		expect(internal.state.hiddenLegendIds.has("data1")).to.be.true;
		expect(item.style.visibility).to.be.equal("hidden");
		expect(item.style.opacity).to.be.equal("0");

		chart.legend.show("data1");
		expect(internal.state.hiddenLegendIds.has("data1")).to.be.false;
		expect(item.style.visibility).to.be.equal("");
		expect(item.style.opacity).to.be.equal("");
		expect(internal.state.redrawGeneration).to.be.greaterThan(initialGeneration);
	});

	it("applies focus, defocus and revert APIs to canvas focus state and legend", () => {
		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40],
					["data3", 70, 90, 60, 120]
				],
				type: line()
			}
		});

		const {internal} = chart;
		const draw = vi.spyOn(internal.canvasRenderer, "draw");

		chart.focus("data2");
		expect(internal.state.focusedTargetIds.has("data2")).to.be.true;
		expect(internal.state.defocusedTargetIds.has("data1")).to.be.true;
		expect(legendItem("data2").classList.contains($FOCUS.legendItemFocused)).to.be.true;
		expect(draw).toHaveBeenCalled();

		draw.mockClear();

		chart.defocus(["data1", "data3"]);
		expect(internal.state.defocusedTargetIds.has("data1")).to.be.true;
		expect(internal.state.defocusedTargetIds.has("data3")).to.be.true;
		expect(legendItem("data1").style.opacity).to.be.equal("0.3");
		expect(draw).toHaveBeenCalled();

		draw.mockClear();

		chart.revert();
		expect(internal.state.focusedTargetIds.size).to.be.equal(0);
		expect(internal.state.defocusedTargetIds.size).to.be.equal(0);
		expect(legendItem("data1").style.opacity).to.be.equal("");
		expect(draw).toHaveBeenCalled();
	});

	it("updates axis labels, domains and ranges through axis APIs", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				columns,
				axes: {
					data1: "y",
					data2: "y2"
				},
				type: line()
			},
			axis: {
				y: {
					label: "Y"
				},
				y2: {
					show: true,
					label: "Y2"
				}
			}
		});

		fillText.mockClear();

		const labels = chart.axis.labels({
			y: "Canvas Y",
			y2: "Canvas Y2"
		});

		expect(labels).to.deep.equal({
			y: "Canvas Y",
			y2: "Canvas Y2"
		});
		expect(fillText.mock.calls.some(([text]) => text === "Canvas Y")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "Canvas Y2")).to.be.true;

		chart.axis.min({x: -1, y: 0, y2: 5});
		chart.axis.max({x: 10, y: 500, y2: 100});
		expect(chart.axis.min()).to.deep.equal({x: -1, y: 0, y2: 5});
		expect(chart.axis.max()).to.deep.equal({x: 10, y: 500, y2: 100});

		chart.axis.range({min: {y: -20}, max: {y: 600}});
		expect(chart.axis.range()).to.deep.include({
			min: {x: -1, y: -20, y2: 5},
			max: {x: 10, y: 600, y2: 100}
		});
	});

	it("updates x, category, group and config APIs in canvas mode", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		generateWithOptions({
			data: {
				x: "x",
				columns: [
					["x", "a", "b", "c", "d"],
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: bar()
			},
			axis: {
				x: {
					type: "category"
				}
			}
		});

		expect(chart.x()).to.deep.equal(["a", "b", "c", "d"]);
		expect(chart.categories()).to.deep.equal(["a", "b", "c", "d"]);

		fillText.mockClear();

		const categories = ["A", "B", "C", "D"];

		expect(chart.categories(categories)).to.deep.equal(categories);
		expect(chart.category(1, "Beta")).to.be.equal("Beta");
		expect(chart.categories()).to.deep.equal(["A", "Beta", "C", "D"]);
		expect(fillText.mock.calls.some(([text]) => text === "Beta")).to.be.true;

		const xValues = ["Q1", "Q2", "Q3", "Q4"];

		expect(chart.x(xValues)).to.deep.equal(xValues);
		expect(chart.x()).to.deep.equal(xValues);

		expect(chart.groups()).to.deep.equal([]);
		chart.groups([["data1", "data2"]]);
		expect(chart.groups()).to.deep.equal([["data1", "data2"]]);

		expect(chart.config("axis.x.type")).to.be.equal("category");
		expect(chart.config("axis.x.label", "Canvas X", true)).to.be.equal("Canvas X");
		expect(chart.config("axis.x.label")).to.be.equal("Canvas X");
		expect(fillText.mock.calls.some(([text]) => text === "Canvas X")).to.be.true;
	});

	it("updates xs API in canvas mode", () => {
		generateWithOptions({
			data: {
				xs: {
					data1: "x1",
					data2: "x2"
				},
				columns: [
					["x1", 10, 30, 45, 60],
					["x2", 20, 40, 55, 80],
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: line()
			}
		});

		expect(chart.xs()).to.deep.equal({
			data1: [10, 30, 45, 60],
			data2: [20, 40, 55, 80]
		});

		const xs = {
			data1: [15, 35, 58, 70],
			data2: [25, 45, 68, 90]
		};

		expect(chart.xs(xs)).to.deep.equal(xs);
		expect(chart.xs()).to.deep.equal(xs);
	});

	it("updates grid and region APIs on the canvas frame", () => {
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");
		const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

		generateWithOptions({
			data: {
				columns,
				type: line()
			}
		});

		chart.xgrids([{value: 1, text: "X one"}]);
		chart.ygrids.add({value: 100, text: "Y one"});
		expect(chart.xgrids()).to.deep.equal([{value: 1, text: "X one"}]);
		expect(chart.ygrids()).to.deep.equal([{value: 100, text: "Y one"}]);
		expect(fillText.mock.calls.some(([text]) => text === "X one")).to.be.true;
		expect(fillText.mock.calls.some(([text]) => text === "Y one")).to.be.true;

		chart.ygrids.remove({value: 100});
		expect(chart.ygrids()).to.deep.equal([]);

		chart.regions([
			{axis: "y", start: 100, end: 200, class: "region-y"}
		]);
		expect(chart.regions()).to.deep.equal([
			{axis: "y", start: 100, end: 200, class: "region-y"}
		]);
		expect(fillRect).toHaveBeenCalled();

		chart.regions.remove({classes: ["region-y"]});
		expect(chart.regions()).to.deep.equal([]);
	});

	it("loads, unloads and flows data through canvas APIs", () => new Promise(done => {
		generateWithOptions({
			data: {
				columns,
				type: line()
			}
		});

		chart.load({
			columns: [
				["data3", 10, 30, 50, 70]
			],
			done() {
				expect(chart.data.values("data3")).to.deep.equal([10, 30, 50, 70]);
				expect(legendItem("data3")).not.to.be.null;
				expect(container.querySelector("svg")).to.be.null;

				chart.unload({
					ids: "data3",
					done() {
						expect(chart.data("data3")).to.deep.equal([]);
						expect(legendItem("data3")).to.be.null;

						chart.flow({
							columns: [
								["data1", 500],
								["data2", 60]
							],
							done() {
								expect(chart.data.values("data1").at(-1)).to.be.equal(500);
								done(1);
							}
						});
					}
				});
			}
		});
	}));

	it("selects and unselects canvas data through selection APIs", () => {
		generateWithOptions({
			data: {
				columns,
				type: bar(),
				selection: {
					enabled: true
				}
			}
		});

		chart.select("data1", [1, 3], true);
		expect(chart.selected().map(d => `${d.id}:${d.index}`)).to.deep.equal([
			"data1:1",
			"data1:3"
		]);
		expect(chart.internal.state.canvasSelection.has("data1:1")).to.be.true;
		expect(chart.internal.state.canvasSelection.has("data1:3")).to.be.true;

		chart.unselect("data1", [1]);
		expect(chart.selected().map(d => `${d.id}:${d.index}`)).to.deep.equal(["data1:3"]);
		expect(chart.internal.state.canvasSelection.has("data1:1")).to.be.false;

		chart.unselect();
		expect(chart.selected()).to.deep.equal([]);
		expect(chart.internal.state.canvasSelection.size).to.be.equal(0);
	});

	it("canvas select() API respects data.selection.multiple=false", () => {
		generateWithOptions({
			data: {
				columns,
				type: line(),
				selection: {
					enabled: true,
					multiple: false
				}
			}
		});

		// only the latest selection survives
		chart.select("data1", [2]);
		chart.select("data2", [3]);
		expect(chart.selected().map(d => `${d.id}:${d.index}`)).to.deep.equal(["data2:3"]);

		// batch/no-arg selection also collapses to a single point
		chart.select("data1", [0, 1, 3]);
		expect(chart.selected().length).to.be.equal(1);

		chart.select("missing", [0]);
		expect(chart.selected().map(d => `${d.id}:${d.index}`)).to.deep.equal(["data1:0"]);

		chart.select("data1", [99]);
		expect(chart.selected().map(d => `${d.id}:${d.index}`)).to.deep.equal(["data1:0"]);

		chart.unselect();
		chart.select();
		expect(chart.selected().length).to.be.equal(1);
	});

	it("canvas grouped select() API keeps only one x-index group when multiple=false", () => {
		generateWithOptions({
			data: {
				columns,
				type: line(),
				selection: {
					enabled: true,
					grouped: true,
					multiple: false
				}
			}
		});

		chart.select("data1", [1]);
		chart.select("data2", [3]);

		const selected = chart.selected();

		expect(selected.length).to.be.equal(2);
		expect(selected.every(d => d.index === 3)).to.be.true;
	});

	it("canvas select()/unselect() APIs work with point.focus.only=true", () => {
		generateWithOptions({
			data: {
				columns,
				type: line(),
				selection: {
					enabled: true
				}
			},
			point: {
				focus: {
					only: true
				}
			}
		});

		// focus.only renders a single shared point per series, but canvas selection
		// is data-key based, so the selection APIs remain unaffected
		chart.select("data1", [1, 3], true);
		expect(chart.selected().map(d => `${d.id}:${d.index}`)).to.deep.equal([
			"data1:1",
			"data1:3"
		]);

		chart.unselect("data1", [1]);
		expect(chart.selected().map(d => `${d.id}:${d.index}`)).to.deep.equal(["data1:3"]);

		chart.unselect();
		expect(chart.selected()).to.deep.equal([]);
	});

	it("shows and hides canvas tooltip through tooltip APIs", () => {
		generateWithOptions({
			data: {
				x: "x",
				columns: [
					["x", "a", "b", "c", "d"],
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: scatter()
			},
			axis: {
				x: {
					type: "category"
				}
			}
		});

		chart.tooltip.show({
			index: 1,
			mouse: [chart.internal.state.margin.left + 50, chart.internal.state.margin.top + 50]
		});

		expect(chart.$.tooltip.style("display")).to.be.equal("block");
		expect(chart.$.tooltip.text()).to.contain("data1");
		expect(chart.internal.state.canvasFocusKey).not.to.be.null;

		chart.tooltip.hide();
		expect(chart.$.tooltip.style("display")).to.be.equal("none");
		expect(chart.internal.state.canvasFocusKey).to.be.null;
	});

	it("supports zoom, unzoom, subchart, resize and export APIs in canvas mode", () => {
		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250],
					["data2", 50, 20, 10, 40, 80, 60]
				],
				type: line()
			},
			zoom: {
				enabled: true
			},
			subchart: {
				show: true
			}
		});

		chart.zoom([1, 4]);
		expect(chart.zoom().map(Math.round)).to.deep.equal([1, 4]);

		chart.unzoom();
		expect(chart.internal.scale.zoom).to.be.null;

		expect(() => chart.subchart.show()).to.not.throw();
		expect(() => chart.subchart.hide()).to.not.throw();

		expect(() => chart.flush()).to.not.throw();

		chart.resize({width: 420, height: 280});
		expect(chart.internal.state.current.width).to.be.equal(420);
		expect(chart.$.canvas.node().style.width).to.be.equal("420px");

		const dataUrl = chart.export();
		expect(/^data:image\/png;base64,/.test(dataUrl)).to.be.true;
	});

	it("supports subchart type option in canvas mode", () => {
		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: line()
			},
			subchart: {
				show: true,
				type: bar(),
				types: {
					data2: line()
				}
			}
		});

		const $$ = chart.internal;

		expect($$.getSubchartTargetType("data1")).to.be.equal("bar");
		expect($$.getSubchartTargetType("data2")).to.be.equal("line");
		expect(chart.config("data.type")).to.be.equal("line");
		expect(() => $$.canvasRenderer.drawSubchart($$, $$.getDrawShape())).to.not.throw();
		expect(chart.config("data.type")).to.be.equal("line");
	});

	it("renders subchart area from the subchart bottom in canvas mode", () => {
		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: line()
			},
			subchart: {
				show: true,
				type: area()
			}
		});

		const lineTos: Array<[number, number]> = [];
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo")
			.mockImplementation(function(x, y) {
				lineTos.push([x, y]);
			});

		chart.internal.canvasRenderer.drawSubchart(chart.internal, chart.internal.getDrawShape());

		const yValues = lineTos.map(([, y]) => y).filter(Number.isFinite);

		expect(Math.max(...yValues)).to.be.closeTo(chart.internal.state.height2, 0.5);

		lineTo.mockRestore();
	});

	it("supports subchart y/y2 axes in canvas mode", () => {
		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 130, 100, 140, 160]
				],
				axes: {
					data2: "y2"
				},
				type: line()
			},
			subchart: {
				show: true,
				axis: {
					y: {
						show: true,
						tick: {
							count: 3
						}
					},
					y2: {
						show: true,
						tick: {
							count: 4
						}
					}
				}
			}
		});

		const $$ = chart.internal;
		const drawSubYAxes = vi.spyOn($$.canvasAxisRenderer, "drawSubYAxes");
		const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

		expect($$.scale.subY).to.not.be.undefined;
		expect($$.scale.subY2).to.not.be.undefined;
		expect(() => $$.renderCanvasFrame()).to.not.throw();
		expect(drawSubYAxes).toHaveBeenCalled();

		fillText.mockClear();
		$$.canvasAxisRenderer.drawSubYAxes($$);

		expect(fillText).toHaveBeenCalledTimes(7);
	});

	it("renders subchart x axis line once with the main axis style in canvas mode", () => {
		const strokes: Array<{
			alpha: number,
			dash: number[],
			lineWidth: number,
			segments: Array<{x1: number, y1: number, x2: number, y2: number}>
		}> = [];
		let currentPoint: [number, number] | null = null;
		let currentSegments: Array<{x1: number, y1: number, x2: number, y2: number}> = [];
		const crisp = (value: number, lineWidth: number) => (
			lineWidth % 2 ? Math.round(value) + 0.5 : Math.round(value)
		);
		const beginPath = vi.spyOn(CanvasRenderingContext2D.prototype, "beginPath")
			.mockImplementation(function() {
				currentPoint = null;
				currentSegments = [];
			});
		const moveTo = vi.spyOn(CanvasRenderingContext2D.prototype, "moveTo")
			.mockImplementation(function(x, y) {
				currentPoint = [x, y];
			});
		const lineTo = vi.spyOn(CanvasRenderingContext2D.prototype, "lineTo")
			.mockImplementation(function(x, y) {
				if (currentPoint) {
					currentSegments.push({
						x1: currentPoint[0],
						y1: currentPoint[1],
						x2: x,
						y2: y
					});
				}

				currentPoint = [x, y];
			});
		const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
			.mockImplementation(function(this: CanvasRenderingContext2D) {
				strokes.push({
					alpha: this.globalAlpha,
					dash: this.getLineDash(),
					lineWidth: this.lineWidth,
					segments: currentSegments.slice()
				});
			});

		generateWithOptions({
			data: {
				columns,
				type: bar()
			},
			subchart: {
				show: true
			}
		});

		const {margin2, width2, height2} = chart.internal.state;
		const axisStyle = chart.internal.canvasTheme.style.axis;
		const y = crisp(margin2.top + height2, axisStyle.lineWidth);
		const subXAxisStrokes = strokes.filter(({segments}) =>
			segments.some(({x1, y1, x2, y2}) =>
				Math.abs(x1 - margin2.left) < 0.5 &&
				Math.abs(x2 - (margin2.left + width2)) < 0.5 &&
				Math.abs(y1 - y) < 0.5 &&
				Math.abs(y2 - y) < 0.5
			)
		);

		expect(subXAxisStrokes).to.have.length(1);
		expect(subXAxisStrokes[0].lineWidth).to.be.equal(axisStyle.lineWidth);
		expect(subXAxisStrokes[0].dash).to.have.length(0);
		expect(subXAxisStrokes[0].alpha).to.be.equal(1);

		stroke.mockRestore();
		lineTo.mockRestore();
		moveTo.mockRestore();
		beginPath.mockRestore();
	});

	it("supports disabling subchart brush interaction in canvas mode", () => {
		generateWithOptions({
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: line()
			},
			subchart: {
				show: true,
				brush: {
					enabled: false
				}
			}
		});

		const $$ = chart.internal;
		const focusData = [$$.data.targets[0].values[1]];
		const drawSubchartFocus = vi.spyOn($$.canvasRenderer, "drawSubchartFocus");
		const canvas = chart.$.canvas.node();
		const rect = canvas.getBoundingClientRect();

		expect($$.startCanvasSubchartBrush(new MouseEvent("mousedown"))).to.be.false;
		expect($$.updateCanvasSubchartCursor(new MouseEvent("mousemove"))).to.be.false;
		expect(() => $$.canvasRenderer.drawSubchartBrush($$)).to.not.throw();

		$$.renderCanvasFocus(focusData);

		expect(drawSubchartFocus).toHaveBeenCalledWith($$, focusData);

		canvas.dispatchEvent(new MouseEvent("mousemove", {
			clientX: rect.left + $$.state.margin2.left + $$.scale.subX(1),
			clientY: rect.top + $$.state.margin2.top + ($$.state.height2 / 2)
		}));

		expect($$.state.canvasFocusKey).to.contain("data1:1");
	});
});
