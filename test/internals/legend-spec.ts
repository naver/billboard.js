/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$FOCUS, $LEGEND} from "../../src/config/classes";
import {fireEvent} from "../assets/helper";

describe("LEGEND", () => {
	let chart;
	let args;

	afterAll(() => util.destroyAll());

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("legend when multiple charts rendered", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["long data name 1", 30],
						["long data name 2", 50],
						["long data name 3", 90],
					]
				}
			};
		});

		it("should have properly computed legend width", () => {
			const expectedLeft = [156, 266, 378];
			const expectedWidth = [112, 114, 104];

			chart.$.main.selectAll(".bb-legend-item").each(function(d, i) {
				const rect = d3Select(this)
					.node()
					.getBoundingClientRect();

				expect(rect.left).to.be.closeTo(expectedLeft[i], 20);
				expect(rect.width).to.be.closeTo(expectedWidth[i], 20);
			});
		});
	});

	describe("legend position", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				}
			};
		});

		it("should be located on the center of chart", () => {
			const box = chart.$.legend.node()
				.getBoundingClientRect();

			expect(box.left + box.right).to.be.closeTo(638, 3); // org : 640
		});

		it("set option legend.position='right'", () => {
			args.legend = {
				position: "right"
			};
		});

		it("should be located on the right of chart", () => {
			const x = util.parseNum(chart.$.legend.attr("transform"));

			expect(x).to.be.closeTo(584, 5);
		});
	});

	describe("legend as inset", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				legend: {
					position: "inset",
					inset: {
						step: null
					}
				}
			};
		});

		it("should be positioned properly", () => {
			const box = chart.internal.$el.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.top).to.be.equal(5.5);
			expect(box.left).to.be.above(30);
		});

		it("should have automatically calculated height", () => {
			const box = chart.internal.$el.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(48);
		});

		it("set options legend.inset.step=1", () => {
			args.legend.inset.step = 1;
		});

		it("should have automatically calculated height", () => {
			const box = chart.internal.$el.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(28);
		});

		it("set options legend.inset.step=2", () => {
			args.legend.inset.step = 2;
		});

		it("should have automatically calculated height", () => {
			const box = chart.internal.$el.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(48);
		});

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "A", "B", "C", "D", "E", "F"],
						["col1", 7, 8, 5, 4, 8, 9],
						["col2", 10, 6, 9, 1, 6, 8]
					],
					type: "radar", // for ESM specify as: radar()
					labels: true,
				},
				legend: {
					position: "inset",
					inset: {
						anchor: "bottom-right"
					}
				}
			}
		});

		it("shouldn't throw error for radar type", () => {
			expect(chart.$.legend.selectAll("g").empty()).to.be.false;
		});
	});

	describe("should update args to have only one series", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
					]
				},
				legend: {
					position: "inset"
				}
			};
		});

		it("should locate legend properly", () => {
			const box = chart.internal.$el.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(28);
			expect(box.width).to.be.above(61);  // org : 64
		});
	});

	describe("legend.hide", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					hide: true
				}
			};
		});

		it("should not show legends", () => {
			chart.internal.$el.svg.selectAll(".bb-legend-item").each(function() {
				expect(d3Select(this).style("visibility")).to.be.equal("hidden");
			});
		});

		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					hide: "data2"
				}
			};
		});

		it("should not show legends", () => {
			const svg = chart.internal.$el.svg;

			expect(svg.select(".bb-legend-item-data1").style("visibility")).to.be.equal("visible");
			expect(svg.select(".bb-legend-item-data2").style("visibility")).to.be.equal("hidden");
		});
	});

	describe("legend.show", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					show: false
				}
			};
		});

		it("should not initially have rendered any legend items", () => {
			expect(chart.internal.$el.svg.selectAll(".bb-legend-item").empty()).to.be.equal(true);
		});

		it("allows us to show the legend on showLegend call", function() {
			chart.legend.show();

			chart.internal.$el.svg.selectAll(".bb-legend-item").each(function() {
				expect(d3Select(this).style("visibility")).to.be.equal("visible");
				// This selects all the children, but we expect it to be empty
				expect(d3Select(this).size()).not.to.equal(0);
			});
		});
	});

	describe("custom legend settings", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					item: {
						tile: {
							width: 15,
							height: 2
						}
					}
				}
			};
		});

		it("renders the legend item with the correct width and height", () => {
			chart.internal.$el.svg.selectAll(".bb-legend-item-tile").each(function() {
				const el: any = d3Select(this);
				const tileWidth = el.attr("x2") - el.attr("x1");

				expect(el.style("stroke-width")).to.be.equal(`${args.legend.item.tile.height}px`);
				expect(tileWidth).to.be.equal(args.legend.item.tile.width);
			});
		});

		it("set options legend.padding=10", () => {
			args.legend = {
				padding: 10
			};
		});

		it("renders the correct amount of padding on the legend element", function() {
			chart.internal.$el.svg.selectAll(".bb-legend-item-padded1 .bb-legend-item-title, .bb-legend-item-padded2 .bb-legend-item-title")
				.each(function(v, i) {
					const parentNode = d3Select(this).node().parentNode;
					const itemWidth = parentNode.getBBox().width;
					const textBoxWidth = parentNode.querySelector("text").getBBox().width;
					const tileWidth = 15; // default value is 10, plus 5 more for padding
					const expectedWidth = textBoxWidth + tileWidth + (i ? 0 : 10) + args.legend.padding;

					expect(itemWidth).to.be.equal(expectedWidth);
				});
		});
	});

	describe("set legend using template", () => {
		const itemClass = "abcd";

		beforeAll(() => {
			util.sandbox("legend-wrapper").innerHTML = "<ul id='legend'></ul>";

			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					],
					colors: {
						data1: "rgb(42, 208, 255)",
						data2: "rgb(250, 113, 113)"
					}
				},
				legend: {
					contents: {
						bindto: "#legend",
						template: `<li style="background-color:{=COLOR}" class="${itemClass}">{=TITLE}</li>`
					}
				}
			};
		});

		it("check for legend template setting with template string", () => {
			const legend = d3Select("#legend");
			const items = legend.selectAll(`.${$LEGEND.legendItem}`);

			expect(legend.html()).not.to.be.null;

			items.each(function(v) {
				const item = d3Select(this);

				expect(item.html()).to.be.equal(v);
				expect(item.style("background-color")).to.be.equal(chart.color(v));

				// should keep class value
				expect(item.classed(itemClass)).to.be.true;

				// check for event bind
				expect(item.on("click")).not.be.null;
			});

			expect(items.size()).to.be.equal(2);
		});

		it("custom legend should behaves as normal legend", () => new Promise(done => {
			const selector = `.${$LEGEND.legendItem}-data1`;
			const legend = chart.$.legend.select(selector).node();
			const rect = legend.getBoundingClientRect();

			util.fireEvent(legend, "mouseover", {
				clientX: rect.x,
				clientY: rect.y
			}, chart);

			expect(legend.classList.contains($FOCUS.legendItemFocused)).to.be.true;

			util.fireEvent(legend, "click", {
				clientX: rect.x,
				clientY: rect.y
			}, chart);

			setTimeout(() => {
				expect(chart.$.legend.select(selector).classed($LEGEND.legendItemHidden)).to.be.true;
				done(1);
			}, 300);
		}));

		it("check for template update on dynamic loading", () => new Promise(done => {
			setTimeout(function() {
				chart.load({
					columns: [
						["data3", 200, 100, 300, 130, 20]
					],
					unload: true,
					done() {
						const legend = d3Select("#legend");

						expect(legend.selectAll("li").size()).to.be.equal(1);
						expect(legend.text()).to.be.equal("data3");
						
						done(1);
					}
				});
			}, 300);
		}));

		it("set options legend.content.template as function", () => {
			args.legend.contents.template = function(title, color, data) {
				if (title !== "data1") {
					return `<li style='background-color:${color}'>${title}-${data[0].value}</li>`;
				}
			}
		});

		it("check for legend template setting with template function callback", () => {
			const legend = d3Select("#legend");
			const items = legend.selectAll(`.${$LEGEND.legendItem}`);

			expect(legend.html()).not.to.be.null;

			items.each(function(v) {
				const item = d3Select(this);

				expect(item.html()).to.be.equal(`${v}-${chart.data.values(v)[0]}`);
				expect(item.style("background-color")).to.be.equal(chart.color(v));

				// check for event bind
				expect(item.on("click")).not.be.null;
			});

			expect(items.size()).to.be.equal(1);
		});

		it("check for resizing", () => {
			const newSize = {width: 1200, height: 1400};

			chart.resize(newSize);

			expect(chart.internal.getCurrentWidth()).to.be.equal(newSize.width);
			expect(chart.internal.getCurrentHeight()).to.be.equal(newSize.height);
		});

		it("set options: data.type='pie'", () => {
			args.data.type = "pie";
		});

		it("check for resizing for pie type", () => {
			const newSize = {width: 300, height: 300};
			const transform1 = chart.$.arc.attr("transform").split(",").map(util.parseNum);

			chart.resize(newSize);

			const transform2 = chart.$.arc.attr("transform").split(",").map(util.parseNum);

			expect(transform1).to.not.be.deep.equal(transform2);

			transform1.forEach((v, i) => {
				expect(v).to.be.above(transform2[i]);
			});
		});

		it("shoudn't throw error when contents.template isn't specified.", () => {
			expect(
				chart = util.generate({
					data: {
					columns: [
						["data1", 120]
					],
					type: "line", // for ESM specify as: line()
					},
					legend: {
						contents: {
							bindto: "#legend"
						}
					}
				})
			).to.not.throw;

			const template = chart.internal.config.legend_contents_template;

			expect(template).to.be.equal(
				"<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>"
			);
		});
	});

	describe("when using custom points", () => {
		beforeAll(() => {
			args = {
				data: {
				  columns: [
				    ["data1", 30, 200, 100, 400, 150, 250],
				    ["data2", 130, 100, 200, 100, 250, 150],
				    ["data_3", 60, 190, 320, 520, 20, 300],
				    ["data 4", 80, 20, 250, 320, 180, 50]
				  ]
				},
				legend: {
					usePoint: true
				},
				point: {
				  pattern: [
				    "circle",
				    "rectangle",
				    "<polygon points='2.5 0 0 5 5 5'></polygon>"
				  ]
				}
			};
		});

		it("should render custom points in legend", () => {
			const {$el} = chart.internal;
			const nodes = $el.svg.selectAll(`.${$LEGEND.legendItem} .${$LEGEND.legendItemPoint}`);
			const pointTagName = ["circle", "rect", "use", "circle"];

			nodes.each(function(data, idx, selection) {
				const node = selection[idx];
				const nodeName = node.nodeName.toLowerCase();

				// check if referenced defs node exists
				if (pointTagName[idx] === "use") {					
					expect($el.defs.select(this.getAttribute("href")).size()).to.be.equal(1);
				}

				expect(nodeName).to.be.equal(pointTagName[idx]);
			});

			expect(nodes.size()).to.be.equal(chart.data().length);
		});

		it("should defs element added removed on unload?", () => new Promise(done => {
			const {$el: {defs}} = chart.internal;
			const selector = "[id$=data-3]";
			const hasDefPoint = !defs.select(selector).empty();

			// when
			chart.unload({
				ids: ["data_3"],
				done() {
					expect(hasDefPoint).to.be.true;
					expect(defs.select(selector).empty()).to.be.true;

					done(1);
				}
			});
		}));
	});

	describe("legend item tile coloring with color_treshold", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["padded1", 100],
						["padded2", 90],
						["padded3", 50],
						["padded4", 20]
					],
					type: "gauge",
				},
				color: {
					pattern: ["#FF0000", "#F97600", "#F6C600", "#60B044"],
					threshold: {
						values: [30, 80, 95]
					}
				},
				gauge: {
					type: "multi"
				}
			};
		});

		// espacially for gauges with multiple arcs to have the same coloring between legend tiles, tooltip tiles and arc
		it('selects the color from color_pattern if color_treshold is given', function () {
			const tileColor: string[] = [];

			chart.internal.$el.svg.selectAll(`.${$LEGEND.legendItemTile}`).each(function () {
				tileColor.push(d3Select(this).style('stroke'));
			});

			expect(tileColor[0]).to.be.equal('rgb(96, 176, 68)');
			expect(tileColor[1]).to.be.equal('rgb(246, 198, 0)');
			expect(tileColor[2]).to.be.equal('rgb(249, 118, 0)');
			expect(tileColor[3]).to.be.equal('rgb(255, 0, 0)');
		});

		it("color.threshold should be generated without error when legend.show=false", () => new Promise(done => {
			const spy = sinon.spy(() => {
				expect(spy.called).to.be.true;
				done(1);
			});

			util.generate({
				data: {
					columns: [["col-0", 2.05]], 
					type: "gauge"
				},
				legend: {
					show: false
				},
				color: {
					pattern: ["#29BB9D", "#29BB9D", "#E7C248", "#FF9A0C", "#F56075"],
					threshold: {
						values: [20, 40, 60, 80, 100]
					}
				},
				onrendered: spy
			});
		}));
	});

	describe("legend item tile coloring without color_treshold", () => {
		beforeAll(function() {
			args = {
				data: {
					columns: [
						["padded1", 100],
						["padded2", 90],
						["padded3", 50],
						["padded4", 20]
					],
					colors: {
						"padded1": "#60b044",
						"padded4": "#8b008b"
					}
				}
			};
		});

		it("selects the color from data_colors, data_color or default", function() {
			const tileColor: string[] = [];

			chart.internal.$el.svg.selectAll(`.${$LEGEND.legendItemTile}`)
				.each(function() {
					tileColor.push(d3Select(this).style("stroke"));
				});

			expect(tileColor[0]).to.be.equal("rgb(96, 176, 68)");
			
			expect(
				(tileColor[1] === "rgb(31, 119, 180)") ||
				(tileColor[1] === "rgb(0, 199, 60)")
			).to.be.true;

			expect(
				(tileColor[2] === "rgb(255, 127, 14)") ||
				(tileColor[2] === "rgb(250, 113, 113)")
			).to.be.true;

			expect(tileColor[3]).to.be.equal("rgb(139, 0, 139)");
		});
	});

	describe("legend opacity onclick", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, -200, 100, 200, 190, 280],
						["data2", 30, 200, 120, 400, 150, 150]
					]
				}
			};
		});

		it("check legend item after click", () => {
			const legend = chart.$.legend.select(`.${$LEGEND.legendItem}-data2`);
			const {x, y} = legend.node().getBoundingClientRect();
			
			util.fireEvent(legend.node(), "mouseover", {
				clientX: x,
				clientY: y
			}, chart);

			util.fireEvent(legend.node(), "click", {
				clientX: x,
				clientY: y
			}, chart);

			expect(legend.classed($FOCUS.legendItemFocused)).to.false;
		});
	});

	describe("legend transition", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				subchart: {
					show: true
				},
				transition: {
					duration: 0
				}
			};
		});

		it("legend shouldn't be transitioned", () => new Promise(done => {
			chart.load({
				columns: [
					["data1", 130, 120, 150, 140, 160, 150],
					["data4", 30, 20, 50, 40, 60, 50]
				],
				//unload: ["data1", "data2"]
			});

			let cnt = 0
			const pos: string[] = [];
			const interval = setInterval(() => {
				if (cnt >= 5) {
					clearInterval(interval);
					expect(pos.every(v => v === pos[0])).to.be.true;

					done(1);
				}

				pos.push(chart.$.legend.select("text").attr("x"));
				cnt++;
			}, 50);
		}));
	});

	describe("item.tile.type option", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 100],
						["data2", 300],
						["data3", 200]
					],
					type: "pie", // for ESM specify as: pie()
				},
				legend: {
					item: {
						tile: {
							type: "circle"
						},
					}
				}
			};
		});

		it("should item tile's shapes are 'circle'?", () => {
			const legendItems = chart.$.legend.selectAll("circle");

			expect(legendItems.size()).to.be.equal(chart.data().length);
			
			legendItems.each(function() {
				expect(+this.getAttribute("r")).to.be.equal(5);
			});
		});

		it("set options: legend.item.tile.r=7", () => {
			args.legend.item.tile.r = 7;
		});

		it("check 'circle' item's radius", () => {
			const legendItems = chart.$.legend.selectAll("circle");

			expect(legendItems.size()).to.be.equal(chart.data().length);
			
			legendItems.each(function() {
				expect(+this.getAttribute("r")).to.be.equal(args.legend.item.tile.r);
			});
		});

		it("set options: legend.item.tile='rectangle'", () => {
			args.legend.item.tile = {
				type: "rectangle"
			};
		});

		it("should item tile's shapes are 'rectangle'?", () => {
			const legendItems = chart.$.legend.selectAll("line");

			expect(legendItems.size()).to.be.equal(chart.data().length);
		});
	});

	describe("legend item interaction", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 350, 300],
						["data2", 130, 100, 140]
					],
					type: "line"
				},
				legend: {
					item: {
						interaction: false
					}
				}
			};
		});

		it("shouldn't be interacted", () => {
			const {legend} = chart.$;

			chart.data().forEach(({id}) => {
				const item = legend.select(`.bb-legend-item-${id}`);

				expect(item.on("click mouseover mouseout")).to.be.undefined;
				expect(item.attr("style")).to.be.null;
			});
		});

		it("set options: legend.item.onclick", () => {
			args.legend.item.onclick = sinon.spy(() => {});
		});

		it("should only 'click' event lister bound", () => {
			const {legend} = chart.$;

			chart.data().forEach(({id}) => {
				const item = legend.select(`.bb-legend-item-${id}`);

				expect(item.on("mouseover mouseout")).to.be.undefined;
				expect(item.on("click")).to.not.be.undefined;
				expect(item.style("cursor")).to.be.equal("pointer");

				id === "data1" && chart.hide(id);

				fireEvent(item.node(), "click", {
					clientX: 2,
					clientY: 2
				}, chart);
			});

			// given visible state argguments?
			expect(args.legend.item.onclick.args)
				.to.be.deep.equal(chart.data().map(({id}) => [id, id === "data1" ? false : true]));
		});

		it("set options: legend.item.onover", () => {
			delete args.legend.item.onclick;
			args.legend.item.onover = sinon.spy(() => {});
		});

		it("should only 'mouseover' event lister bound", () => {
			const {legend} = chart.$;

			chart.data().forEach(({id}) => {
				const item = legend.select(`.bb-legend-item-${id}`);

				expect(item.on("click mouseout")).to.be.undefined;
				expect(item.on("mouseover")).to.not.be.undefined;
				expect(item.style("cursor")).to.be.equal("pointer");

				id === "data2" && chart.hide(id);

				fireEvent(item.node(), "mouseover", {
					clientX: 2,
					clientY: 2
				}, chart);
			});

			// given visible state argguments?
			expect(args.legend.item.onover.args)
				.to.be.deep.equal(chart.data().map(({id}) => [id, id === "data2" ? false : true]));
		});

		it("set options: legend.item.onout", () => {
			delete args.legend.item.onover;
			args.legend.item.onout = sinon.spy(() => {});
		});

		it("should only 'mouseout' event lister bound", () => {
			const {legend} = chart.$;

			chart.data().forEach(({id}) => {
				const item = legend.select(`.bb-legend-item-${id}`);

				expect(item.on("click mouseover")).to.be.undefined;
				expect(item.on("mouseout")).to.not.be.undefined;
				expect(item.style("cursor")).to.be.equal("pointer");

				id === "data1" && chart.hide(id);

				fireEvent(item.node(), "mouseout", {
					clientX: 2,
					clientY: 2
				}, chart);
			});

			// given visible state argguments?
			expect(args.legend.item.onout.args)
				.to.be.deep.equal(chart.data().map(({id}) => [id, id === "data1" ? false : true]));
		});

		it("set options: legend.item.interaction.dblclik=true", () => {
			args.legend.item.interaction = {
				dblclick: true
			};
		});

		it("check dblclick interaction", () => {
			const {$: {legend}, internal: {state}} = chart;

			chart.data().forEach(({id}) => {
				const item = legend.select(`.bb-legend-item-${id}`).node();

				// when double click
				fireEvent(item, "dblclick", undefined, chart);

				expect(state.hiddenTargetIds.length && state.hiddenTargetIds.indexOf(id) === -1).to.be.true;

				// when double click again, it should return to initial state
				fireEvent(item, "dblclick", undefined, chart);

				expect(state.hiddenTargetIds).to.be.empty;
			});
		});
	});

	describe("legend format", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1 data1 data1 data1 data1 data1 ", 2, 3, 5],
						["data2 data1 data1 data1 data1 data1", 1, 2, 2],
					],
					type: "line"
				},
				legend: {
					format: function(id) {
						if (id.length > 5) {
							id = id.substr(0, 5) + "...";
						}
			
						return id;
					}
				}
			};
		});

		it("legend text are formatted correctly?", () => {
			const formatted = chart.data().map(v => {
				return args.legend.format(v.id);
			});

			const legendText = chart.$.legend
				.selectAll("text").nodes()
				.map(v => v.textContent);

			expect(formatted).to.be.deep.equal(legendText);
			expect(chart.$.legend.selectAll("title").empty()).to.be.true;
		});

		it("set options: legend.format.tooltip=true", () => {
			args.legend.tooltip = true;
		});

		it("legend text title are set correctly?", () => {
			const dataIds = chart.data().map(v => v.id);
			const legendTitle = chart.$.legend.selectAll("title").nodes().map(v => v.textContent);

			expect(dataIds).to.be.deep.equal(legendTitle);
		});

		it("set options: data.names", () => {
			args = {
				data: {
					names: {
					  "data1": "Detailed Name",
					  "data2": "Name Detailed"
					},
					columns: [
					  ["data1", 71.4],
					  ["data2", 10],
					],
					type: "gauge"
				},
				legend: {
					format: id => id.substr(0, 2) + "...",
					tooltip: true
				}
			}
		});

		it("should legend title show data.names values.", () => {
			const legendTitle = chart.$.legend.selectAll("title").nodes().map(v => v.textContent);
			const dataNames = Object.values(chart.data.names());

			expect(legendTitle).to.be.deep.equal(dataNames);
		});

		it("set options: legend.format", () => {
			args.legend.format = function(id, dataId) {
				return id === "Name Detailed" ? dataId : id;
			};
		});

		it("should legend format function receive original data id.", () => {
			const legend = chart.$.legend.select("g:last-child");

			expect(legend.select("text").text()).to.be.equal("data2");
			expect(legend.select("title").text()).to.be.equal("Name Detailed");
		});
	});
});
