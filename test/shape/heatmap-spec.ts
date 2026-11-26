/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, beforeAll, beforeEach, describe, expect, it, vi} from "vitest";
import util from "../assets/util";
import bb, {canvas, heatmap as canvasHeatmap} from "../../src/index.canvas";
import {heatmap} from "../../src/config/resolver/shape";
import {$CANVAS} from "../../src/canvas/classes";
import {$HEATMAP} from "../../src/ChartInternal/shape/core/heatmap";

// 3 rows x 4 columns, one cell without a value
const columns = [
	["x", "Mon", "Tue", "Wed", "Thu"],
	["Morning", 1, 2, 3, 4],
	["Noon", 5, null, 7, 8],
	["Evening", 9, 10, 11, 12]
];

describe("SHAPE HEATMAP", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("layout", () => {
		beforeAll(() => {
			args = {
				data: {x: "x", columns, type: "heatmap"}
			};
		});

		it("should make a cell per value, and one for a null as the color of none", () => {
			const {cells, rows, columns: cols} = chart.internal.getHeatmapLayout();

			expect(rows).to.deep.equal(["Morning", "Noon", "Evening"]);
			expect(cols).to.deep.equal(["Mon", "Tue", "Wed", "Thu"]);
			expect(cells.length).to.be.equal(12);

			const none = cells.find(d => d.id === "Noon" && d.x === "Tue");

			expect(none.value).to.be.null;
			expect(none.color).to.be.equal("#ebedf0");
		});

		it("should size the cells to fill the plot, row by row", () => {
			const {cells, plot} = chart.internal.getHeatmapLayout();
			const first = cells[0];
			const last = cells[cells.length - 1];

			expect(first.x0).to.be.closeTo(plot.left, 0.001);
			expect(first.y0).to.be.closeTo(plot.top, 0.001);
			expect(last.x1).to.be.closeTo(plot.left + plot.width, 0.001);
			expect(last.y1).to.be.closeTo(plot.top + plot.height, 0.001);
			expect(first.x1 - first.x0).to.be.closeTo(plot.width / 4, 0.001);
			expect(first.y1 - first.y0).to.be.closeTo(plot.height / 3, 0.001);
		});

		it("should color the min and the max values with the ends of the range", () => {
			const {cells, domain} = chart.internal.getHeatmapLayout();
			const color = v => cells.find(d => d.value === v).color;

			expect(domain).to.deep.equal([1, 12]);
			expect(color(1)).to.be.equal("rgb(246, 239, 166)");
			expect(color(12)).to.be.equal("rgb(191, 68, 76)");
		});

		it("should render a rect per cell, in a row group of the target class", () => {
			const {heatmap} = chart.internal.$el;

			expect(heatmap.selectAll(`.${$HEATMAP.heatmapRow}`).size()).to.be.equal(3);
			expect(heatmap.selectAll(`rect.${$HEATMAP.heatmapCell}`).size()).to.be.equal(12);
			expect(heatmap.select(`.${$HEATMAP.heatmapRow}.bb-target-Noon`).node()).to.not.be.null;
		});

		it("should render the names of the columns, of the rows and of the color bar", () => {
			const texts = chart.internal.$el.heatmap.selectAll(`text.${$HEATMAP.heatmapAxis}`)
				.nodes().map(el => el.textContent);

			expect(texts).to.deep.equal([
				"Mon", "Tue", "Wed", "Thu", "Morning", "Noon", "Evening", "1", "12"
			]);
		});

		it("should put the color bar at the right of the cells, with the max value on the top", () => {
			const {colorbar, plot} = chart.internal.getHeatmapLayout();

			expect(colorbar.x).to.be.at.least(plot.left + plot.width);
			expect(colorbar.height).to.be.equal(plot.height);
			expect(colorbar.stops[0][1]).to.be.equal("#bf444c");
			expect(colorbar.labels.map(d => d.text)).to.deep.equal(["1", "12"]);
			expect(colorbar.labels[1].y).to.be.below(colorbar.labels[0].y);
		});

		it("should remove a row on hide(), and keep the colors of the other cells", () => {
			const before = chart.internal.getHeatmapLayout().cells.find(d => d.value === 12).color;

			chart.hide("Noon");

			const {rows, cells} = chart.internal.getHeatmapLayout();

			expect(rows).to.deep.equal(["Morning", "Evening"]);
			expect(chart.internal.$el.heatmap.selectAll(`.${$HEATMAP.heatmapRow}`).size()).to.be.equal(2);
			expect(cells.find(d => d.value === 12).color).to.be.equal(before);

			chart.show("Noon");

			expect(chart.internal.getHeatmapLayout().rows.length).to.be.equal(3);
		});

		it("should paint the swatches of the legend and of the tooltip with the colors of the cells", () => {
			const cells = chart.internal.getHeatmapLayout().cells;
			const swatch = id => {
				const tile = chart.$.legend.select(`.bb-legend-item-${id} .bb-legend-item-tile`);

				return tile.style("background-color") === "rgba(0, 0, 0, 0)" ?
					tile.style("stroke") :
					tile.style("background-color");
			};
			const {scale} = chart.internal.getHeatmapScale();

			// Evening: 9, 10, 11, 12 (mean 10.5)
			expect(swatch("Evening")).to.be.equal(scale(10.5));

			chart.tooltip.show({data: {id: "Evening"}, index: 3});
			expect(chart.$.tooltip.select("span, rect").node()).to.not.be.null;
			expect(chart.$.tooltip.html()).to.contain(cells.find(d => d.value === 12).color);
		});

		it("should dim the other rows on focus()", () => {
			chart.focus("Noon");

			const defocused = chart.internal.$el.heatmap
				.selectAll(`.${$HEATMAP.heatmapRow}.bb-defocused`).nodes().map(el => el.classList.contains("bb-target-Noon"));

			// the two other rows
			expect(defocused).to.deep.equal([false, false]);

			chart.revert();
			expect(chart.internal.$el.heatmap.selectAll(".bb-defocused").size()).to.be.equal(0);
		});

		it("should show the tooltip of a cell by tooltip.show()", () => {
			chart.tooltip.show({data: {id: "Evening"}, index: 2});

			const tooltip = chart.$.tooltip.node();

			expect(tooltip.style.display).to.not.be.equal("none");
			expect(tooltip.textContent).to.contain("Evening");
			expect(tooltip.textContent).to.contain("11");
			expect(tooltip.textContent).to.contain("Wed");
		});
	});

	describe("options", () => {
		it("should take the color range, min and max", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {color: {range: ["#000000", "#ffffff"], min: 0, max: 20}}
			};
			chart = util.generate(args);

			const {cells, domain} = chart.internal.getHeatmapLayout();

			expect(domain).to.deep.equal([0, 20]);
			expect(cells.find(d => d.value === 10).color).to.be.equal("rgb(128, 128, 128)");
		});

		it("should color by the ranges, and draw a band of the color bar for each range", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {
					color: {
						ranges: [
							{to: 4, color: "#111111", name: "low"},
							{from: 5, to: 9, color: "#222222"},
							{from: 10, color: "#333333"}
						],
						none: null
					}
				}
			};
			chart = util.generate(args);

			const {cells, colorbar} = chart.internal.getHeatmapLayout();
			const color = v => cells.find(d => d.value === v).color;

			expect(color(1)).to.be.equal("#111111");
			expect(color(4)).to.be.equal("#111111");
			expect(color(5)).to.be.equal("#222222");
			expect(color(9)).to.be.equal("#222222");
			expect(color(12)).to.be.equal("#333333");
			// the null has no color
			expect(cells.length).to.be.equal(11);

			// the bands, the max on the top
			expect(colorbar.labels.map(d => d.text)).to.deep.equal(["low", "5 - 9", "≥ 10"]);
			expect(colorbar.labels[2].y).to.be.below(colorbar.labels[0].y);
			expect(colorbar.stops.map(d => d[1])).to.deep.equal([
				"#333333", "#333333", "#222222", "#222222", "#111111", "#111111"
			]);
		});

		it("should use the color of none for a value in no range", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {color: {ranges: [{to: 4, color: "#111111"}], none: "#eeeeee"}}
			};
			chart = util.generate(args);

			const {cells} = chart.internal.getHeatmapLayout();

			expect(cells.find(d => d.value === 8).color).to.be.equal("#eeeeee");
		});

		it("should draw no cell for a null when color.none is null", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {color: {none: null}}
			};
			chart = util.generate(args);

			expect(chart.internal.getHeatmapLayout().cells.length).to.be.equal(11);
		});

		it("should take the cell padding, radius and border", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {cell: {padding: 4, radius: 3, border: {width: 2, color: "#f00"}}}
			};
			chart = util.generate(args);

			const {cells, plot} = chart.internal.getHeatmapLayout();
			const rect = chart.internal.$el.heatmap.select(`rect.${$HEATMAP.heatmapCell}`);

			expect(cells[0].x1 - cells[0].x0).to.be.closeTo(plot.width / 4 - 4, 0.001);
			expect(rect.attr("rx")).to.be.equal("3");
			expect(rect.style("stroke-width")).to.be.equal("2px");
			expect(rect.style("stroke")).to.be.equal("rgb(255, 0, 0)");
		});

		it("should make the cells of the ratio, the biggest that fit", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {cell: {ratio: 1}}
			};
			chart = util.generate(args);

			let {cells, plot} = chart.internal.getHeatmapLayout();
			const size = cells[0].x1 - cells[0].x0;

			expect(cells[0].y1 - cells[0].y0).to.be.closeTo(size, 0.001);
			expect(plot.width).to.be.closeTo(size * 4, 0.001);
			expect(plot.height).to.be.closeTo(size * 3, 0.001);
			// the color bar follows the plot
			expect(chart.internal.getHeatmapLayout().colorbar.x).to.be.at.least(plot.left + plot.width);

			chart.destroy();
			args.heatmap = {cell: {ratio: 2}};
			chart = util.generate(args);
			({cells} = chart.internal.getHeatmapLayout());

			expect((cells[0].x1 - cells[0].x0) / (cells[0].y1 - cells[0].y0)).to.be.closeTo(2, 0.001);
		});

		it("should lay out again by the size on resize, and fill the width when the height is enough", () => {
			args = {
				size: {width: 400, height: 400},
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {cell: {ratio: 1}}
			};
			chart = util.generate(args);

			const widthOf = () => {
				const {plot, colorbar} = chart.internal.getHeatmapLayout();

				return plot.left + plot.width + (colorbar ? colorbar.width : 0);
			};
			const rect = () => chart.internal.$el.heatmap.select(`rect.${$HEATMAP.heatmapCell}`);
			const wide = {plot: chart.internal.getHeatmapLayout().plot, w: +rect().attr("width")};

			chart.resize({width: 200, height: 400});

			const narrow = chart.internal.getHeatmapLayout().plot;

			// the plot follows the width, and the drawn cells follow the plot
			expect(narrow.width).to.be.below(wide.plot.width);
			expect(+rect().attr("width")).to.be.below(wide.w);
			expect(+rect().attr("width")).to.be.closeTo(narrow.width / 4, 0.5);
			expect(widthOf()).to.be.at.most(200);

			chart.resize({width: 400, height: 400});
			expect(chart.internal.getHeatmapLayout().plot.width).to.be.closeTo(wide.plot.width, 0.001);
		});

		it("should follow the width of the container when it is resized", async () => {
			const box = document.createElement("div");

			box.style.width = "600px";
			document.body.appendChild(box);

			const c = bb.generate({
				bindto: box,
				size: {height: 400},
				data: {x: "x", columns, type: heatmap()},
				heatmap: {cell: {ratio: 1}}
			});
			const before = c.internal.getHeatmapLayout().plot.width;

			box.style.width = "300px";
			// the chart follows the window resize event
			window.dispatchEvent(new Event("resize"));
			await new Promise(r => setTimeout(r, 500));

			const after = c.internal.getHeatmapLayout().plot;
			const rect = c.internal.$el.heatmap.select(`rect.${$HEATMAP.heatmapCell}`);

			expect(after.width).to.be.below(before);
			expect(+rect.attr("width")).to.be.closeTo(after.width / 4, 0.5);

			c.destroy();
			box.remove();
		});

		it("should make the chart as high as the cells need with the ratio, and follow the width", async () => {
			const box = document.createElement("div");

			box.style.width = "800px";
			document.body.appendChild(box);

			const c = bb.generate({
				bindto: box,
				data: {x: "x", columns, type: heatmap()},
				heatmap: {cell: {ratio: 1}},
				legend: {show: false}
			});
			const check = () => {
				const {cells, plot} = c.internal.getHeatmapLayout();
				const svg = box.querySelector("svg") as SVGElement;

				expect((cells[0].x1 - cells[0].x0) / (cells[0].y1 - cells[0].y0)).to.be.closeTo(1, 0.001);
				// no space under the names of the columns
				expect(svg.getBoundingClientRect().height - (plot.top + plot.height + 18)).to.be.below(2);

				return svg.getBoundingClientRect().height;
			};
			const tall = check();

			box.style.width = "400px";
			window.dispatchEvent(new Event("resize"));
			await new Promise(r => setTimeout(r, 500));

			expect(check()).to.be.below(tall);

			c.destroy();
			box.remove();
		});

		it("should fit the height after the first draw, with the legend of any position", async () => {
			for (const position of ["bottom", "right"]) {
				const box = document.createElement("div");

				box.style.width = "600px";
				document.body.appendChild(box);

				const c = bb.generate({
					bindto: box,
					data: {x: "x", columns, type: heatmap()},
					heatmap: {cell: {ratio: 1}},
					legend: {position}
				});

				await new Promise(r => setTimeout(r, 600));

				const {height, plot} = c.internal.getHeatmapLayout();
				const svg = box.querySelector("svg") as SVGElement;
				const {cells} = c.internal.getHeatmapLayout();

				// the chart is as high as the cells need, once everything is there to measure
				expect(Math.abs(svg.getBoundingClientRect().height - height)).to.be.below(2);
				expect((cells[0].x1 - cells[0].x0) / (cells[0].y1 - cells[0].y0)).to.be.closeTo(1, 0.001);
				expect(plot.width).to.be.above(0);

				c.destroy();
				box.remove();
			}
		});

		it("should not put the legend on the right over the names of the rows", () => {
			args = {
				size: {width: 600, height: 300},
				data: {x: "x", columns, type: "heatmap"},
				legend: {position: "right"}
			};
			chart = util.generate(args);

			const names = chart.internal.$el.heatmap.selectAll(`text.${$HEATMAP.heatmapAxis}`).nodes()
				.filter(el => ["r", "Morning", "Noon", "Evening"].some(n => el.textContent === n));
			const nameLeft = Math.min(...names.map(el => el.getBoundingClientRect().left));
			const svgLeft = (chart.$.chart.select("svg").node() as Element).getBoundingClientRect().left;
			const legend = chart.$.legend.node().getBoundingClientRect();
			const {plot} = chart.internal.getHeatmapLayout();

			// the names start inside the chart, and the legend is at the right of the cells
			expect(nameLeft).to.be.at.least(svgLeft - 0.5);
			expect(legend.left - svgLeft).to.be.at.least(plot.left + plot.width);
		});

		it("should keep a gap between the color bar and the legend on the right, with padding.mode fit", () => {
			args = {
				size: {width: 500, height: 320},
				padding: {mode: "fit"},
				data: {x: "x", columns, type: "heatmap"},
				legend: {position: "right"}
			};
			chart = util.generate(args);

			const svg = (chart.$.chart.select("svg").node() as Element).getBoundingClientRect();
			const legend = chart.$.legend.node().getBoundingClientRect();
			const labels = chart.internal.$el.heatmap.selectAll(`.${$HEATMAP.heatmapColorbar} text`).nodes();
			const right = Math.max(...labels.map(el => (el as Element).getBoundingClientRect().right)) - svg.left;

			expect(legend.left - svg.left - right).to.be.at.least(2);
		});

		it("should address a cell by tooltip.show() with the index in data, or the x", () => {
			args = {
				size: {width: 400, height: 300},
				data: {x: "x", columns, type: "heatmap"}
			};
			chart = util.generate(args);

			const text = () => chart.$.tooltip.node().textContent;

			chart.tooltip.show({data: {id: "Evening", index: 2}});
			expect(text()).to.contain("Wed");
			expect(text()).to.contain("11");

			chart.tooltip.hide();
			chart.tooltip.show({data: {id: "Morning"}, x: "Thu"});
			expect(text()).to.contain("Thu");
			expect(text()).to.contain("4");
		});

		it("should paint the swatches of a value in no range with the color of none", () => {
			args = {
				size: {width: 400, height: 300},
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {color: {ranges: [{to: 4, color: "#111111"}], none: "#eeeeee"}}
			};
			chart = util.generate(args);

			chart.tooltip.show({data: {id: "Evening"}, index: 3});
			expect(chart.$.tooltip.html()).to.contain("#eeeeee");
		});

		it("should keep the height of size.height with the ratio", () => {
			args = {
				size: {width: 400, height: 300},
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {cell: {ratio: 1}}
			};
			chart = util.generate(args);

			expect(chart.internal.state.current.height).to.be.equal(300);
		});

		it("should show the values in the cells, with a text color to read", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {label: {show: true, format: (v, x, id) => `${v}${id[0]}`}}
			};
			chart = util.generate(args);

			const labels = chart.internal.$el.heatmap.selectAll(`.${$HEATMAP.heatmapLabel}`);

			// no label for the null
			expect(labels.size()).to.be.equal(11);
			expect(labels.nodes()[0].textContent).to.be.equal("1M");
			// light cell: black, dark cell: white
			expect(labels.nodes()[0].style.fill).to.be.equal("rgb(0, 0, 0)");
			expect(labels.nodes()[10].style.fill).to.be.equal("rgb(255, 255, 255)");
		});

		it("should move the names of the columns to the top, and hide the axes and the bar", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {axis: {x: {position: "top"}}}
			};
			chart = util.generate(args);

			const {axisX, plot} = chart.internal.getHeatmapLayout();

			expect(axisX[0].y).to.be.below(plot.top);

			chart.destroy();
			args.heatmap = {axis: {x: {show: false}, y: {show: false}}, colorbar: {show: false}};
			chart = util.generate(args);

			const layout = chart.internal.getHeatmapLayout();

			expect(layout.axisX.length + layout.axisY.length).to.be.equal(0);
			expect(layout.colorbar).to.be.null;
		});

		it("should put the color bar under or above the cells, from the min at the left", () => {
			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {colorbar: {position: "bottom"}}
			};
			chart = util.generate(args);

			let {colorbar, plot, axisX} = chart.internal.getHeatmapLayout();

			expect(colorbar.horizontal).to.be.true;
			expect(colorbar.width).to.be.equal(plot.width);
			// under the names of the columns
			expect(colorbar.y).to.be.at.least(axisX[0].y);
			expect(colorbar.stops[0][1]).to.be.equal("#f6efa6");
			expect(colorbar.labels.map(d => d.text)).to.deep.equal(["1", "12"]);
			expect(colorbar.labels[0].x).to.be.below(colorbar.labels[1].x);
			expect(chart.internal.$el.heatmap.select("linearGradient").attr("x2")).to.be.equal("1");

			chart.destroy();
			args.heatmap = {colorbar: {position: "top"}};
			chart = util.generate(args);
			({colorbar, plot} = chart.internal.getHeatmapLayout());

			expect(colorbar.y + colorbar.height).to.be.below(plot.top);
		});

		it("should show the tooltip 15px under the pointer, as the other types without axis", () => {
			args = {
				size: {width: 400, height: 300},
				data: {x: "x", columns, type: "heatmap"}
			};
			chart = util.generate(args);

			const rect = chart.internal.$el.heatmap.selectAll(`rect.${$HEATMAP.heatmapCell}`).nodes()[0] as Element;
			const box = rect.getBoundingClientRect();
			const point = {clientX: box.left + box.width / 2, clientY: box.top + box.height / 2};

			rect.dispatchEvent(new MouseEvent("mousemove", {bubbles: true, ...point}));

			const tip = chart.$.tooltip.node().getBoundingClientRect();

			expect(tip.top - point.clientY).to.be.closeTo(15, 1.5);
		});

		it("should give the hovered cell, not the first of the row, as the element of onover and onout", () => {
			const onover = vi.fn();
			const onout = vi.fn();

			args = {
				data: {x: "x", columns, type: "heatmap", onover, onout}
			};
			chart = util.generate(args);

			const rects = chart.internal.$el.heatmap.selectAll(`rect.${$HEATMAP.heatmapCell}`).nodes();
			// Evening, Wed
			const rect = rects[10] as Element;

			rect.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));
			rect.dispatchEvent(new MouseEvent("mouseout", {bubbles: true}));

			expect(onover.mock.calls[0][1]).to.be.equal(rect);
			expect(onout.mock.calls[0][1]).to.be.equal(rect);
			expect(onover.mock.calls[0][0].x).to.be.equal("Wed");
		});

		it("should ignore color.min and color.max when the min is over the max, and tell it once", () => {
			const error = vi.spyOn(console, "error").mockImplementation(() => {});

			args = {
				data: {x: "x", columns, type: "heatmap"},
				heatmap: {color: {min: 10, max: 1}}
			};
			chart = util.generate(args);

			expect(chart.internal.getHeatmapLayout().domain).to.deep.equal([1, 12]);
			// the min of the data has the first color
			expect(chart.internal.getHeatmapLayout().cells[0].color).to.be.equal("rgb(246, 239, 166)");
			expect(error.mock.calls.filter(v => /heatmap.color.min/.test(v[0])).length).to.be.equal(1);

			error.mockRestore();
		});

		it("should call data.onclick and data.onover with the data of a cell", () => {
			const onclick = vi.fn();
			const onover = vi.fn();

			args = {
				data: {x: "x", columns, type: "heatmap", onclick, onover}
			};
			chart = util.generate(args);

			const rect = chart.internal.$el.heatmap.selectAll(`rect.${$HEATMAP.heatmapCell}`).nodes()[6];

			rect.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));
			rect.dispatchEvent(new MouseEvent("click", {bubbles: true}));

			const expected = {id: "Noon", x: "Wed", index: 2, value: 7, name: "Noon / Wed"};

			expect(onclick.mock.calls[0][0]).to.deep.equal(expected);
			expect(onover.mock.calls[0][0]).to.deep.equal(expected);
		});
	});

	describe("canvas", () => {
		let container;

		const generate = (options = {}) => {
			container = document.createElement("div");
			document.body.appendChild(container);

			return bb.generate({
				bindto: container,
				render: {mode: canvas()},
				size: {width: 320, height: 240},
				data: {x: "x", columns, type: canvasHeatmap()},
				...options
			});
		};

		const canvasPoint = (c, x, y) => {
			const rect = c.$.canvas.node().getBoundingClientRect();

			return {clientX: rect.left + x, clientY: rect.top + y};
		};

		afterEach(() => {
			chart?.destroy();
			container?.remove();
		});

		it("should draw the cells on canvas without a fallback to svg", () => {
			const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
			const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");

			chart = generate();

			expect(container.querySelector(`canvas.${$CANVAS.canvas}`)).to.not.be.null;
			expect(container.querySelector("svg")).to.be.null;
			expect(warn.mock.calls.join(" ")).to.not.contain("heatmap");

			chart.internal.getHeatmapLayout().cells.forEach(d => {
				expect(fillRect.mock.calls.some(([x, y]) => x === d.x0 && y === d.y0)).to.be.true;
			});

			[warn, fillRect].forEach(v => v.mockRestore());
		});

		it("should draw the names, the values and the gradient of the color bar", () => {
			const texts: string[] = [];
			const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
				.mockImplementation((t: string) => {
					texts.push(t);
				});
			const gradient = vi.spyOn(CanvasRenderingContext2D.prototype, "createLinearGradient");

			chart = generate({heatmap: {label: {show: true}}});

			["Mon", "Thu", "Morning", "Evening", "12", "1"].forEach(t => expect(texts).to.include(t));
			expect(gradient.mock.calls.length).to.be.at.least(1);
			// the values: 11 cells have one
			expect(texts.filter(t => /^(2|3|4|5|7|8|9|10|11)$/.test(t)).length).to.be.at.least(9);

			[fillText, gradient].forEach(v => v.mockRestore());
		});

		it("should show the tooltip and call data.onclick of the hovered cell", () => {
			const onclick = vi.fn();

			chart = generate({data: {x: "x", columns, type: canvasHeatmap(), onclick}});

			const cell = chart.internal.getHeatmapLayout().cells.find(d => d.value === 7);
			const point = canvasPoint(chart, (cell.x0 + cell.x1) / 2, (cell.y0 + cell.y1) / 2);

			chart.$.canvas.node().dispatchEvent(new MouseEvent("mousemove", {bubbles: true, ...point}));

			const tooltip = container.querySelector(".bb-tooltip-container") as HTMLElement;

			expect(tooltip.textContent).to.contain("Noon");
			expect(tooltip.textContent).to.contain("Wed");
			expect(tooltip.textContent).to.contain("7");

			chart.$.canvas.node().dispatchEvent(new MouseEvent("click", {bubbles: true, ...point}));
			expect(onclick.mock.calls[0][0]).to.deep.include({id: "Noon", x: "Wed", index: 2, value: 7});
		});

		it("should not hit a cell without a value", () => {
			const onclick = vi.fn();

			chart = generate({data: {x: "x", columns, type: canvasHeatmap(), onclick}});

			const cell = chart.internal.getHeatmapLayout().cells.find(d => d.value === null);

			chart.$.canvas.node().dispatchEvent(new MouseEvent("click", {
				bubbles: true,
				...canvasPoint(chart, (cell.x0 + cell.x1) / 2, (cell.y0 + cell.y1) / 2)
			}));

			expect(onclick).not.toHaveBeenCalled();
		});
	});
});
