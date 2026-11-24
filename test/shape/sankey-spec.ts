/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {afterEach, beforeAll, beforeEach, describe, expect, it, vi} from "vitest";
import util from "../assets/util";
import bb, {canvas, sankey as canvasSankey} from "../../src/index.canvas";
import {$CANVAS} from "../../src/canvas/classes";
import {$SANKEY} from "../../src/ChartInternal/shape/core/sankey";

// A → B → D, A → C → D, B → E
const columns = [
	["x", "B", "C", "D", "E"],
	["A", 5, 3, null, null],
	["B", null, null, 2, 3],
	["C", null, null, 3, 0]
];

describe("SHAPE SANKEY", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("layout", () => {
		beforeAll(() => {
			args = {
				data: {x: "x", columns, type: "sankey"}
			};
		});

		it("should make the nodes from the series and the x, and the links from the values", () => {
			const {nodes, links} = chart.internal.getSankeyLayout();

			expect(nodes.map(d => d.id)).to.deep.equal(["A", "B", "C", "D", "E"]);
			// null and 0 are not links
			expect(links.map(d => `${d.source.id}-${d.target.id}:${d.value}`))
				.to.deep.equal(["A-B:5", "A-C:3", "B-D:2", "B-E:3", "C-D:3"]);
		});

		it("should place the nodes in columns by their depth", () => {
			const {nodes, area} = chart.internal.getSankeyLayout();
			const x = id => nodes.find(d => d.id === id).x0;

			expect(x("A")).to.be.equal(area.left);
			expect(x("B")).to.be.equal(x("C"));
			expect(x("D")).to.be.equal(x("E"));
			expect(x("D")).to.be.closeTo(area.left + area.width - 20, 0.001);
		});

		it("should size the nodes and the links by their value", () => {
			const {nodes, links} = chart.internal.getSankeyLayout();
			const a = nodes.find(d => d.id === "A");
			const b = nodes.find(d => d.id === "B");
			const ky = (a.y1 - a.y0) / 8;

			expect(a.value).to.be.equal(8);
			expect(b.value).to.be.equal(5);
			expect(b.y1 - b.y0).to.be.closeTo(5 * ky, 0.001);
			links.forEach(link => {
				expect(link.width).to.be.closeTo(link.value * ky, 0.001);
			});
		});

		it("should keep the nodes of a column apart and inside of the area", () => {
			const {nodes, area} = chart.internal.getSankeyLayout();
			const columnsOf = {};

			nodes.forEach(d => (columnsOf[d.layer] = columnsOf[d.layer] || []).push(d));

			Object.values(columnsOf).forEach((list: any[]) => {
				list.sort((a, b) => a.y0 - b.y0).forEach((d, i) => {
					expect(d.y0).to.be.at.least(area.top - 0.001);
					expect(d.y1).to.be.at.most(area.top + area.height + 0.001);
					i && expect(d.y0 - list[i - 1].y1).to.be.at.least(10 - 0.001);
				});
			});
		});

		it("should render a path per link and a node per node, with their names", () => {
			const {sankey} = chart.internal.$el;

			expect(sankey.selectAll(`path.${$SANKEY.sankeyLink}`).size()).to.be.equal(5);
			expect(sankey.selectAll(`.${$SANKEY.sankeyNode} rect`).size()).to.be.equal(5);
			expect(sankey.selectAll(`.${$SANKEY.sankeyLabel}`).nodes().map(el => el.textContent))
				.to.deep.equal(["A", "B", "C", "D", "E"]);
		});

		it("should color the links by their source", () => {
			const {internal} = chart;
			const link = internal.$el.sankey.select(`path.${$SANKEY.sankeyLink}`);

			expect(link.style("stroke")).to.be.equal(
				internal.$el.sankey.select(`.${$SANKEY.sankeyNode} rect`).style("fill")
			);
		});

		it("should color the links by sankey.link.color", () => {
			const colorOf = (c, id) => c.internal.$el.sankey
				.select(`.${$SANKEY.sankeyNode}.bb-target-${id} rect`).style("fill");
			const strokes = c => c.internal.$el.sankey
				.selectAll(`path.${$SANKEY.sankeyLink}`).nodes().map(el => el.style.stroke);

			chart = util.generate({data: args.data, sankey: {link: {color: "target"}}});

			// links: A-B, A-C, B-D, B-E, C-D
			expect(strokes(chart)).to.deep.equal(["B", "C", "D", "E", "D"].map(id => colorOf(chart, id)));
			expect(chart.internal.$el.sankey.selectAll("linearGradient").size()).to.be.equal(0);

			chart = util.generate({data: args.data, sankey: {link: {color: "gradient"}}});

			const {sankey} = chart.internal.$el;
			const {links} = chart.internal.getSankeyLayout();
			const gradients = sankey.selectAll("linearGradient").nodes();

			expect(gradients.length).to.be.equal(links.length);
			strokes(chart).forEach((stroke, i) => {
				const el = gradients[i];
				const link = links[i];

				expect(stroke).to.be.equal(`url("#${el.id}")`);
				expect(+el.getAttribute("x1")).to.be.equal(link.source.x1);
				expect(+el.getAttribute("x2")).to.be.equal(link.target.x0);
				expect([...el.querySelectorAll("stop")].map(v => v.getAttribute("stop-color")))
					.to.deep.equal([link.source.color, link.target.color]);
			});
		});

		it("should remove a hidden node with its links, and the nodes left without a link", () => {
			chart.hide("B");

			const {nodes, links} = chart.internal.getSankeyLayout();

			// E is linked only from B
			expect(nodes.map(d => d.id)).to.deep.equal(["A", "C", "D"]);
			expect(links.map(d => `${d.source.id}-${d.target.id}`)).to.deep.equal(["A-C", "C-D"]);

			chart.show("B");

			expect(chart.internal.getSankeyLayout().nodes).to.have.length(5);
		});

		it("set options: data.names, sankey.label.format", () => {
			args = {
				data: {x: "x", columns, type: "sankey", names: {A: "Start", E: "End"}},
				sankey: {
					label: {
						format: (name, value) => `${name}=${value}`
					}
				}
			};
		});

		it("should use data.names for every node, and sankey.label.format", () => {
			expect(chart.internal.$el.sankey.selectAll(`.${$SANKEY.sankeyLabel}`).nodes()
				.map(el => el.textContent))
				.to.deep.equal(["Start=8", "B=5", "C=3", "D=5", "End=3"]);
		});

		it("set options: sankey.node.align='left'", () => {
			args = {
				data: {x: "x", columns, type: "sankey"},
				sankey: {node: {align: "left"}}
			};
		});

		it("should keep a node without a link to the next column at its depth", () => {
			args = {
				data: {
					x: "x",
					columns: [["x", "B", "C"], ["A", 2, 1], ["B", 0, 1]],
					type: "sankey"
				},
				sankey: {node: {align: "left"}}
			};
			chart = util.generate(args);

			const {nodes} = chart.internal.getSankeyLayout();

			// left: C is linked from A (depth 1) and B (depth 1): it is at depth 2
			expect(nodes.map(d => d.layer)).to.deep.equal([0, 1, 2]);
		});
	});

	describe("input that can't be drawn", () => {
		it("should not draw links that make a cycle", () => {
			const spy = vi.spyOn(console, "error").mockImplementation(() => {});

			chart = util.generate({
				data: {x: "x", columns: [["x", "B", "A"], ["A", 1, 0], ["B", 0, 1]], type: "sankey"}
			});

			expect(chart.internal.getSankeyLayout().nodes).to.have.length(0);
			expect(spy.mock.calls.join(" ")).to.contain("cycle");
			spy.mockRestore();
		});
	});

	describe("input values", () => {
		it("should not draw the links of the values that are not positive numbers", () => {
			chart = util.generate({
				data: {
					x: "x",
					columns: [
						["x", "B", "C", "D", "E", "F"],
						["A", -1, NaN, "text", Infinity, 2],
						["B", 0, 0, 0, 0, 0]
					],
					type: "sankey"
				}
			});

			const {nodes, links} = chart.internal.getSankeyLayout();

			expect(links.map(d => `${d.source.id}-${d.target.id}`)).to.deep.equal(["A-F"]);
			// B has no link: it is not drawn
			expect(nodes.map(d => d.id)).to.deep.equal(["A", "F"]);
		});
	});

	describe("link hit test", () => {
		it("should not hit a point out of the flow range of the link", () => {
			chart = util.generate({data: {x: "x", columns, type: "sankey"}});

			const $$ = chart.internal;
			const link = $$.getSankeyLayout().links[0];
			const [p0, , , p3] = $$.getSankeyLinkPoints(link);
			const y = (p0[1] + p3[1]) / 2;

			expect($$.isSankeyLinkHit(link, (p0[0] + p3[0]) / 2, y)).to.be.true;
			expect($$.isSankeyLinkHit(link, p0[0] - 1, p0[1])).to.be.false;
			expect($$.isSankeyLinkHit(link, p3[0] + 1, p3[1])).to.be.false;
		});

		it("should hit the link thinner than 1px as it is drawn", () => {
			chart = util.generate({
				data: {
					x: "x",
					columns: [["x", "B", "C"], ["A", 10000, 1], ["B", 0, 0]],
					type: "sankey"
				}
			});

			const $$ = chart.internal;
			const link = $$.getSankeyLayout().links.find(d => d.target.id === "C");
			const [p0] = $$.getSankeyLinkPoints(link);

			expect(link.width).to.be.below(1);
			// the drawn link is 1px thick: 0.4px from its center is on it
			expect($$.isSankeyLinkHit(link, p0[0], p0[1] + 0.4)).to.be.true;
		});
	});

	describe("options", () => {
		beforeAll(() => {
			args = {
				data: {x: "x", columns, type: "sankey"}
			};
		});

		const gen = (options = {}) => {
			chart = util.generate({data: args.data, ...options});

			return chart.internal;
		};

		it("should place the nodes in the columns by sankey.node.align", () => {
			// Z links to the last step only, W is linked from the first step only
			const data = {
				x: "x",
				columns: [
					["x", "B", "C", "D", "W"],
					["A", 1, 0, 0, 1],
					["B", 0, 1, 0, 0],
					["C", 0, 0, 1, 0],
					["Z", 0, 0, 1, 0]
				],
				type: "sankey"
			};
			const layers = align => {
				chart = util.generate({data, sankey: {node: {align}}});

				const {nodes} = chart.internal.getSankeyLayout();

				return ["Z", "W"].map(id => nodes.find(d => d.id === id).layer);
			};

			expect(layers("left")).to.deep.equal([0, 1]);
			expect(layers("justify")).to.deep.equal([0, 3]);
			expect(layers("right")).to.deep.equal([2, 3]);
			expect(layers("center")).to.deep.equal([2, 1]);
		});

		it("should keep sankey.node.padding between the nodes of a step", () => {
			const {nodes} = gen({sankey: {node: {padding: 30}}}).getSankeyLayout();
			const [b, c] = ["B", "C"].map(id => nodes.find(d => d.id === id))
				.sort((x, y) => x.y0 - y.y0);

			expect(c.y0 - b.y1).to.be.at.least(30 - 1e-6);
		});

		it("should place the nodes evenly before relaxing them, by sankey.iterations=0", () => {
			const {nodes, area} = gen({sankey: {iterations: 0, node: {padding: 10}}}).getSankeyLayout();
			const [b, c] = ["B", "C"].map(id => nodes.find(d => d.id === id));

			// the space above, between and below the nodes of a step is the same, and padding is in between
			expect(c.y0 - b.y1 - 10).to.be.closeTo(b.y0 - area.top, 1e-6);
			expect(c.y0 - b.y1 - 10).to.be.closeTo(area.top + area.height - c.y1, 1e-6);

			// the nodes move by the relaxation, when they have room to
			const data = {
				x: "x",
				columns: [
					["x", "Electricity", "Heat", "Industry", "Homes", "Transport", "Loss"],
					["Coal", 120, 40, 0, 0, 0, 0],
					["Gas", 90, 70, 0, 0, 0, 0],
					["Oil", 10, 0, 30, 0, 140, 0],
					["Electricity", 0, 0, 80, 90, 10, 40],
					["Heat", 0, 0, 50, 60, 0, 0]
				],
				type: "sankey"
			};
			const y0s = iterations => {
				chart = util.generate({data, sankey: {iterations}});

				return chart.internal.getSankeyLayout().nodes.map(d => d.y0);
			};

			expect(y0s(0)).to.not.deep.equal(y0s(6));
		});

		it("should not draw the names by sankey.label.show=false", () => {
			const $$ = gen({sankey: {label: {show: false}}});
			const {nodes} = $$.getSankeyLayout();

			expect($$.getSankeyLabel(nodes[0])).to.be.null;
			$$.$el.sankey.selectAll(`.${$SANKEY.sankeyLabel}`).each(function() {
				expect(this.textContent).to.be.equal("");
			});
		});

		it("should show the tooltip of a rotated node at its bottom center", () => {
			const $$ = gen({sankey: {rotated: true}});
			const node = $$.getSankeyLayout().nodes.find(d => d.id === "A");

			expect($$.customTypeHooks.tooltipTarget($$, {data: {id: "A"}}).point)
				.to.deep.equal([(node.x0 + node.x1) / 2, node.y1]);
		});

		it("should lay out the rotated flow as the transpose of the flow to the right", () => {
			const legend = {show: false};
			const $r = gen({
				size: {width: 640, height: 400},
				padding: {top: 10, right: 20, bottom: 30, left: 40},
				legend,
				sankey: {rotated: true}
			});
			const rotated = $r.getSankeyLayout();
			const $h = gen({
				size: {width: 400, height: 640},
				padding: {top: 40, right: 30, bottom: 20, left: 10},
				legend
			});
			const flat = $h.getSankeyLayout();

			rotated.nodes.forEach((d, i) => {
				const e = flat.nodes[i];

				expect([d.x0, d.x1, d.y0, d.y1]).to.deep.equal([e.y0, e.y1, e.x0, e.x1]);
			});

			rotated.links.forEach((d, i) => {
				const e = flat.links[i];
				const points = $r.getSankeyLinkPoints(d);

				expect(points).to.deep.equal($h.getSankeyLinkPoints(e).map(([x, y]) => [y, x]));

				// the center of the link and a point out of its band
				const [x, y] = points[0].map((v, j) => (v + points[3][j]) / 2);

				expect($r.isSankeyLinkHit(d, x, y)).to.be.true;
				expect($h.isSankeyLinkHit(e, y, x)).to.be.true;
				expect($r.isSankeyLinkHit(d, x + d.width * 2, y)).to.be.equal($h.isSankeyLinkHit(e, y, x + d.width * 2));
			});

			// the labels are under the nodes of the upper half, and over the others
			const top = rotated.nodes.find(d => d.id === "A");
			const label = $r.getSankeyLabel(top);

			expect(label).to.include({align: "center", baseline: "top", y: top.y1 + 6});
			expect($r.getSankeyLabel(rotated.nodes.find(d => d.id === "D")).baseline).to.be.equal("bottom");
		});

		it("should draw the rotated links and gradients along the flow", () => {
			const $$ = gen({sankey: {rotated: true, link: {color: "gradient"}}});
			const {links} = $$.getSankeyLayout();
			const el = $$.$el.sankey.select("linearGradient").node();
			const path = $$.$el.sankey.select(`path.${$SANKEY.sankeyLink}`).attr("d");
			const [p0, , , p3] = $$.getSankeyLinkPoints(links[0]);

			expect(+el.getAttribute("y1")).to.be.equal(p0[1]);
			expect(+el.getAttribute("y2")).to.be.equal(p3[1]);
			expect(+el.getAttribute("x1")).to.be.equal(0);
			expect(path.startsWith(`M${p0}C`)).to.be.true;
		});

		it("should keep the order of sankey.node.sort", () => {
			const order = (sort, layer = 1) => {
				const {nodes} = gen({sankey: {node: {sort}}}).getSankeyLayout();

				return nodes.filter(d => d.layer === layer)
					.sort((a, b) => a.y0 - b.y0)
					.map(d => d.id);
			};

			// B (5) and C (3) in the column of the layer 1
			expect(order("data")).to.deep.equal(["B", "C"]);
			expect(order("asc")).to.deep.equal(["C", "B"]);
			expect(order("desc")).to.deep.equal(["B", "C"]);
			expect(order((a, b) => b.name.localeCompare(a.name))).to.deep.equal(["C", "B"]);

			const sort = vi.fn(() => 0);

			order(sort);
			expect(sort.mock.calls[0][0]).to.have.all.keys("id", "index", "value", "name");
		});

		it("should draw the border of the nodes and the opacity of the links", () => {
			const $$ = gen({
				sankey: {node: {border: {width: 2, color: "red"}}, link: {opacity: 0.6}}
			});
			const rect = $$.$el.sankey.select(`.${$SANKEY.sankeyNode} rect`).node();
			const link = $$.$el.sankey.select(`path.${$SANKEY.sankeyLink}`).node();

			expect(getComputedStyle(rect).strokeWidth).to.be.equal("2px");
			expect(getComputedStyle(rect).stroke).to.be.equal("rgb(255, 0, 0)");
			expect(+getComputedStyle(link).strokeOpacity).to.be.closeTo(0.6, 0.001);

			// no border, and the opacity of the stylesheet
			const $default = gen();

			expect($default.$el.sankey.select(`.${$SANKEY.sankeyNode} rect`).node().style.strokeWidth)
				.to.be.equal("");
			expect(+getComputedStyle($default.$el.sankey.select(`path.${$SANKEY.sankeyLink}`).node()).strokeOpacity)
				.to.be.closeTo(0.4, 0.001);
		});
	});

	describe("interaction", () => {
		beforeAll(() => {
			args = {
				data: {x: "x", columns, type: "sankey", onclick: vi.fn()}
			};
		});

		it("should show the tooltip of a node and of a link", () => {
			const {sankey} = chart.internal.$el;
			const node = sankey.select(`.${$SANKEY.sankeyNode} rect`).node();
			const link = sankey.select(`path.${$SANKEY.sankeyLink}`).node();

			util.fireEvent(node, "mouseover");
			expect(chart.$.tooltip.html()).to.contain("A").and.to.contain("8");

			util.fireEvent(link, "mouseover");
			expect(chart.$.tooltip.html()).to.contain("A → B").and.to.contain("5");
		});

		it("should call data.onclick with the data of a target only node", () => {
			const {sankey} = chart.internal.$el;
			const rect = sankey.selectAll(`.${$SANKEY.sankeyNode} rect`).nodes()[3];

			util.fireEvent(rect, "click");

			expect(args.data.onclick.mock.calls[0][0]).to.include({id: "D", value: 5});
		});

		it("should show the tooltip of a target only node and call data.onover", () => {
			const onover = vi.fn();
			const spy = vi.spyOn(console, "error");

			chart = util.generate({data: {x: "x", columns, type: "sankey", onover}});

			const rect = chart.internal.$el.sankey.selectAll(`.${$SANKEY.sankeyNode} rect`).nodes()[3];

			util.fireEvent(rect, "mouseover");

			expect(chart.$.tooltip.html()).to.contain("D");
			expect(onover.mock.calls[0][0]).to.include({id: "D"});
			expect(spy).not.toHaveBeenCalled();
			spy.mockRestore();
		});

		it("should hide the tooltip and call data.onout when the pointer leaves a node or a link", () => {
			const onout = vi.fn();

			chart = util.generate({data: {x: "x", columns, type: "sankey", onout}});

			const {sankey} = chart.internal.$el;
			const targets = [
				sankey.select(`.${$SANKEY.sankeyNode} rect`).node(),
				sankey.select(`path.${$SANKEY.sankeyLink}`).node()
			];

			targets.forEach((el, i) => {
				util.fireEvent(el, "mouseover");
				expect(chart.$.tooltip.style("display")).to.not.be.equal("none");

				util.fireEvent(el, "mouseout");
				expect(chart.$.tooltip.style("display")).to.be.equal("none");
				expect(onout).toHaveBeenCalledTimes(i + 1);
			});

			expect(onout.mock.calls[0][0]).to.include({id: "A"});
			expect(onout.mock.calls[1][0]).to.have.property("source");
		});

		it("should not bind the events by interaction.enabled=false", () => {
			const onclick = vi.fn();

			chart = util.generate({
				data: {x: "x", columns, type: "sankey", onclick},
				interaction: {enabled: false}
			});

			const rect = chart.internal.$el.sankey.select(`.${$SANKEY.sankeyNode} rect`).node();

			util.fireEvent(rect, "mouseover");
			util.fireEvent(rect, "click");

			expect(chart.$.tooltip.style("display")).to.be.equal("none");
			expect(onclick).not.toHaveBeenCalled();
		});

		it("should draw no data label of the values, and keep the node names", () => {
			chart = util.generate({data: {x: "x", columns, type: "sankey", labels: true}});

			expect(chart.$.main.selectAll(".bb-chart-texts text").size()).to.be.equal(0);
			expect(chart.internal.$el.sankey.selectAll(`.${$SANKEY.sankeyLabel}`).size()).to.be.equal(5);
		});

		it("should defocus the links and the target only nodes by chart.focus()", () => {
			const defocused = selector => [...chart.$.main.selectAll(selector).nodes()]
				.filter(el => el.classList.contains("bb-defocused"))
				.map(el => el.__data__);
			const linkName = d => `${d.source.id}-${d.target.id}`;

			chart.focus("B");

			expect(defocused(".bb-sankey-node").map(d => d.id).sort()).to.be.deep.equal(["A", "C"]);
			expect(defocused(".bb-sankey-link").map(linkName).sort())
				.to.be.deep.equal(["A-B", "A-C", "C-D"]);

			chart.focus("A");

			expect(defocused(".bb-sankey-node").map(d => d.id).sort())
				.to.be.deep.equal(["B", "C", "D", "E"]);

			chart.revert();

			expect(defocused(".bb-sankey-node, .bb-sankey-link").length).to.be.equal(0);
		});

		it("should keep the colors of the nodes whatever is hidden at the start", () => {
			// E is linked from B, which comes before C that links D: E gets its color before D
			const data = {
				x: "x",
				columns: [["x", "B", "C", "D", "E"], ["A", 5, 3, 0, 0], ["B", 0, 0, 0, 3], ["C", 0, 0, 3, 0]],
				type: "sankey"
			};
			const colors = c => Object.fromEntries(c.internal.getSankeyLayout().nodes.map(d => [d.id, d.color]));
			const expected = colors(util.generate({data}));

			chart = util.generate({data: {...data, hide: ["B"]}});
			chart.show("B");

			expect(colors(chart)).to.deep.equal(expected);
		});

		it("should hide and show a target only node", () => {
			const linkNames = () => chart.internal.getSankeyLayout().links
				.map(d => `${d.source.id}-${d.target.id}`);

			chart.hide("D");
			expect(linkNames()).to.deep.equal(["A-B", "A-C", "B-E"]);

			chart.show("D");
			expect(linkNames()).to.deep.equal(["A-B", "A-C", "B-D", "B-E", "C-D"]);
		});

		it("should lay out again on load() and unload()", () => new Promise(done => {
			const linkNames = () => chart.internal.getSankeyLayout().links
				.map(d => `${d.source.id}-${d.target.id}`);

			chart.load({
				columns: [["x", "B", "C", "D", "E"], ["C", null, null, 3, 4]],
				done() {
					expect(linkNames()).to.include("C-E");

					chart.unload({
						ids: "B",
						done() {
							const {nodes} = chart.internal.getSankeyLayout();

							// B is a target of A: it is still there, without its links
							expect(nodes.map(d => d.id)).to.include("B");
							expect(linkNames().filter(v => v.startsWith("B-"))).to.have.length(0);
							done(1);
						}
					});
				}
			});
		}));

		it("should dim the other nodes and their links on the legend hover", () => {
			const defocused = selector => chart.$.main.selectAll(selector).nodes()
				.filter(el => el.classList.contains("bb-defocused"))
				.map(el => el.__data__);
			const legend = chart.$.legend.select(".bb-legend-item-B").node();

			chart.internal.state.transiting = false;
			util.fireEvent(legend, "mouseover", {clientX: 0, clientY: 0}, chart);

			expect(defocused(".bb-sankey-node").map(d => d.id).sort()).to.deep.equal(["A", "C"]);
			expect(defocused(".bb-sankey-link").length).to.be.equal(3);

			util.fireEvent(legend, "mouseout", {clientX: 0, clientY: 0}, chart);

			expect(defocused(".bb-sankey-node, .bb-sankey-link").length).to.be.equal(0);
		});

		it("should keep the focus state over a redraw", () => {
			chart.focus("B");
			chart.resize({width: 500, height: 300});
			chart.internal.redrawSankey();

			const nodes = chart.$.main.selectAll(".bb-sankey-node.bb-defocused").nodes().map(el => el.__data__.id);

			expect(nodes.sort()).to.deep.equal(["A", "C"]);
		});

		it("should show the tooltip of a node by tooltip.show()", () => {
			chart.tooltip.show({data: {id: "E"}});

			expect(chart.$.tooltip.style("display")).to.not.be.equal("none");
			expect(chart.$.tooltip.html()).to.contain("E");
		});
	});

	describe("onover", () => {
		beforeAll(() => {
			args = {
				data: {x: "x", columns, type: "sankey", onover: vi.fn(), onout: vi.fn()}
			};
		});

		it("should give the hovered link or node as the element of onover and onout", () => {
			const {onover, onout} = args.data;
			const {sankey} = chart.internal.$el;
			const link = sankey.select(`path.${$SANKEY.sankeyLink}`).node() as Element;
			const node = sankey.select(`.${$SANKEY.sankeyNode} rect`).node() as Element;

			link.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));
			link.dispatchEvent(new MouseEvent("mouseout", {bubbles: true}));
			node.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));

			expect(onover.mock.calls[0][1]).to.be.equal(link);
			expect(onout.mock.calls[0][1]).to.be.equal(link);
			expect(onover.mock.calls[1][1]).to.be.equal(node);
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
				data: {x: "x", columns, type: canvasSankey()},
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

		it("should draw on canvas without a fallback to svg", () => {
			const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
			const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
			const bezier = vi.spyOn(CanvasRenderingContext2D.prototype, "bezierCurveTo");

			chart = generate();

			expect(container.querySelector(`canvas.${$CANVAS.canvas}`)).to.not.be.null;
			expect(container.querySelector("svg")).to.be.null;
			expect(spy.mock.calls.join(" ")).to.not.contain("sankey");

			const {nodes, links} = chart.internal.getSankeyLayout();

			expect(bezier.mock.calls.length).to.be.at.least(links.length);
			nodes.forEach(d => {
				expect(fillRect.mock.calls.some(([x, y]) => x === d.x0 && y === d.y0)).to.be.true;
			});

			[spy, fillRect, bezier].forEach(v => v.mockRestore());
		});

		it("should draw the links with a gradient by sankey.link.color", () => {
			const gradient = vi.spyOn(CanvasRenderingContext2D.prototype, "createLinearGradient");

			chart = generate({sankey: {link: {color: "gradient"}}});

			const {links} = chart.internal.getSankeyLayout();

			expect(gradient.mock.calls.length).to.be.at.least(links.length);
			links.forEach(link => {
				const [p0, , , p3] = chart.internal.getSankeyLinkPoints(link);

				expect(gradient.mock.calls.some(([x0, , x1]) => x0 === p0[0] && x1 === p3[0])).to.be.true;
			});

			gradient.mockRestore();
		});

		it("should draw the border of the nodes and the opacity of the links", () => {
			const strokeRect = vi.spyOn(CanvasRenderingContext2D.prototype, "strokeRect");
			const alphas: number[] = [];
			const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
				.mockImplementation(function() {
					alphas.push(this.globalAlpha);
				});

			chart = generate({sankey: {node: {border: {width: 2}}, link: {opacity: 0.6}}});

			const {nodes, links} = chart.internal.getSankeyLayout();

			expect(strokeRect.mock.calls.length).to.be.at.least(nodes.length);
			expect(alphas.length).to.be.at.least(links.length);
			alphas.forEach(v => expect(v).to.be.closeTo(0.6, 0.001));

			// the opacity of the stylesheet, read through its variable
			chart.destroy();
			alphas.length = 0;
			chart = generate();

			expect(alphas.length).to.be.at.least(links.length);
			alphas.forEach(v => expect(v).to.be.closeTo(0.4, 0.001));

			[strokeRect, stroke].forEach(v => v.mockRestore());
		});

		it("should take the link opacity and the name style from canvas.theme.selectors", () => {
			const alphas: number[] = [];
			const fills: string[] = [];
			const fonts: string[] = [];
			const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
				.mockImplementation(function() {
					alphas.push(this.globalAlpha);
				});
			const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
				.mockImplementation(function() {
					fills.push(this.fillStyle);
					fonts.push(this.font);
				});

			chart = generate({
				canvas: {
					theme: {
						selectors: {
							".bb-sankey-link": {"stroke-opacity": 0.25},
							".bb-sankey-label": {fill: "#ff0000", font: "bold 14px serif"}
						}
					}
				}
			});

			expect(alphas.length).to.be.at.least(1);
			alphas.forEach(v => expect(v).to.be.closeTo(0.25, 1e-6));
			expect(new Set(fills)).to.deep.equal(new Set(["#ff0000"]));
			expect(fonts.every(v => v.includes("14px") && v.includes("serif"))).to.be.true;

			[stroke, fillText].forEach(v => v.mockRestore());
		});

		it("should hit the rotated links", () => {
			chart = generate({sankey: {rotated: true}});

			const $$ = chart.internal;
			const link = $$.getSankeyLayout().links[0];
			const [x, y] = $$.getSankeyLinkPoints(link)
				.reduce((acc, p, i) => (i % 3 ? acc : [acc[0] + p[0] / 2, acc[1] + p[1] / 2]), [0, 0]);
			const onclick = vi.fn();

			chart.config("data.onclick", onclick);
			chart.$.canvas.node().dispatchEvent(
				new MouseEvent("click", {bubbles: true, ...canvasPoint(chart, x, y)})
			);

			expect(onclick.mock.calls[0]?.[0]).to.include({id: link.source.id, x: link.target.id});
		});

		it("should draw the rotated gradients and names along the flow", () => {
			const gradient = vi.spyOn(CanvasRenderingContext2D.prototype, "createLinearGradient");
			const aligns: string[] = [];
			const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
				.mockImplementation(function() {
					aligns.push(`${this.textAlign} ${this.textBaseline}`);
				});

			chart = generate({sankey: {rotated: true, link: {color: "gradient"}}});

			const {links} = chart.internal.getSankeyLayout();

			links.forEach(link => {
				const [p0, , , p3] = chart.internal.getSankeyLinkPoints(link);

				expect(gradient.mock.calls.some(v => v.join() === [0, p0[1], 0, p3[1]].join())).to.be.true;
			});

			expect(aligns).to.include("center top");
			expect(aligns).to.include("center bottom");

			[gradient, fillText].forEach(v => v.mockRestore());
		});

		it("should not draw the names by sankey.label.show=false", () => {
			const texts: string[] = [];
			const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText")
				.mockImplementation(text => {
					texts.push(text);
				});

			chart = generate({sankey: {label: {show: false}}});

			["A", "B", "C", "D", "E"].forEach(id => expect(texts).to.not.include(id));
			fillText.mockRestore();
		});

		it("should dim the links with sankey.link.opacity, on the legend hover", () => {
			chart = generate({sankey: {link: {opacity: 0.6}}});

			const alphas: number[] = [];
			const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
				.mockImplementation(function() {
					alphas.push(this.globalAlpha);
				});
			const legend = container.querySelector(".bb-legend-item-B");

			chart.internal.state.transiting = false;
			legend.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));

			const dimmed = chart.internal.canvasTheme.style.shape.targetDefocusedOpacity * 0.6;

			// 2 links of B, and 3 of the others
			expect(alphas.filter(v => Math.abs(v - 0.6) < 1e-6).length).to.be.equal(2);
			expect(alphas.filter(v => Math.abs(v - dimmed) < 1e-6).length).to.be.equal(3);

			stroke.mockRestore();
		});

		it("should hit the node and the link under the pointer", () => {
			const onclick = vi.fn();

			chart = generate({data: {x: "x", columns, type: canvasSankey(), onclick}});

			const $$ = chart.internal;
			const {nodes, links} = $$.getSankeyLayout();
			const canvasEl = chart.$.canvas.node();
			const click = (x, y) => canvasEl.dispatchEvent(
				new MouseEvent("click", {bubbles: true, ...canvasPoint(chart, x, y)})
			);
			const a = nodes[0];

			click((a.x0 + a.x1) / 2, (a.y0 + a.y1) / 2);
			expect(onclick.mock.calls[0][0]).to.include({id: "A", value: 8});

			// the middle of the link A → C
			const link = links[1];
			const [p0, , , p3] = $$.getSankeyLinkPoints(link);

			click((p0[0] + p3[0]) / 2, (p0[1] + p3[1]) / 2);
			expect(onclick.mock.calls[1][0]).to.include({source: "A", target: "C", value: 3});
		});

		it("should draw with data.labels=true", () => {
			const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, "fillText");

			chart = generate({data: {x: "x", columns, type: canvasSankey(), labels: true}});

			const texts = fillText.mock.calls.map(([text]) => text);

			["A", "B", "C", "D", "E"].forEach(name => expect(texts).to.include(name));
			fillText.mockRestore();
		});

		it("should show the name of the link in the tooltip", () => {
			chart = generate();

			const $$ = chart.internal;
			const link = $$.getSankeyLayout().links[0];
			const [p0, , , p3] = $$.getSankeyLinkPoints(link);

			chart.$.canvas.node().dispatchEvent(new MouseEvent("mousemove", {
				bubbles: true,
				...canvasPoint(chart, (p0[0] + p3[0]) / 2, (p0[1] + p3[1]) / 2)
			}));

			expect(chart.$.tooltip.html()).to.contain("A → B");
		});

		it("should dim the defocused nodes and links by chart.focus()", () => {
			chart = generate();

			const alphas = new Map();
			const {nodes} = chart.internal.getSankeyLayout();
			const record = function(x, y) {
				alphas.set(`${x},${y}`, this.globalAlpha);
			};
			const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect")
				.mockImplementation(record);
			const stroke = vi.spyOn(CanvasRenderingContext2D.prototype, "stroke")
				.mockImplementation(function() {
					alphas.set(`stroke${alphas.size}`, this.globalAlpha);
				});

			chart.focus("B");

			const alphaOf = id => {
				const d = nodes.find(v => v.id === id);

				return alphas.get(`${d.x0},${d.y0}`);
			};

			// B and the target only nodes its links come to
			["B", "D", "E"].forEach(id => expect(alphaOf(id)).to.be.equal(1));
			["A", "C"].forEach(id => expect(alphaOf(id)).to.be.below(1));

			// links: 2 of B, 3 of A and C, dimmed below the link opacity
			const strokeAlphas = [...alphas].filter(([k]) => k.startsWith("stroke")).map(([, v]) => v);
			const max = Math.max(...strokeAlphas);

			expect(strokeAlphas.filter(v => v === max).length).to.be.equal(2);
			expect(strokeAlphas.filter(v => v < max).length).to.be.equal(3);

			alphas.clear();
			chart.revert();

			expect(alphaOf("A")).to.be.equal(1);
			expect(alphaOf("D")).to.be.equal(1);

			[fillRect, stroke].forEach(v => v.mockRestore());
		});

		it("should not hit a link out of its band, inside of its box", () => {
			chart = generate();

			const $$ = chart.internal;
			const link = $$.getSankeyLayout().links[1];
			const [p0, , , p3] = $$.getSankeyLinkPoints(link);
			const x = p0[0] + (p3[0] - p0[0]) * 0.1;

			// near the source the band is flat at y0
			expect($$.isSankeyLinkHit(link, x, link.y0)).to.be.true;
			expect($$.isSankeyLinkHit(link, x, link.y0 + link.width)).to.be.false;
		});
	});
});
