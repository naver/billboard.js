/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, afterEach, describe, expect, it} from "vitest";
import {window} from "../../src/module/browser";
import util from "../assets/util";

// exported to be used from /test/api/region-spec.ts
export function testRegions(ctx) {
	const {scale} = ctx.internal;

	return function(d) {
		const axis = scale[d.axis];
		const isX = d.axis === "x";
		const rect = this.querySelector("rect");
		const start = +rect.getAttribute(isX ? "x" : "y");
		const size = +rect.getAttribute(isX ? "width" : "height");

		// check the diemsion
		expect(start).to.be.equal(axis(isX ? d.start : d.end));
		expect(start + size).to.be.equal(axis(isX ? d.end : d.start));

		d.class && expect(this.getAttribute("class").indexOf(d.class) > -1).to.be.true;	

		if (d.label) {
			const node = this.querySelector("text");
			const {text, x = 0, y = 0, color, rotated} = d.label;

			expect(node.textContent).to.be.equal(text);

			const transform = node.getAttribute("transform").replace(/(\d+)\.\d+/g, "$1");
			const start = Math.round(axis(d.start));
			const end = Math.round(axis(d.end));

			if (isX) {
				expect(transform).to.be
					.equal(`translate(${start + x}, ${y})${rotated ? ` rotate(-90)` : ``}`);
			} else {
				expect(transform).to.be
					.equal(`translate(${x}, ${end + y})${rotated ? ` rotate(-90)` : ``}`);
			}

			color && expect(node.style.fill).to.be.equal(color);

		// when has no label, <text> element should not be generated
		} else {
			expect(this.querySelector("text")).to.be.null;
		}	
	};
}

describe("REGIONS", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	afterEach(() => {
		chart.destroy();
	});

	describe("regions", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 100, 150, 130, 200, 220, 190],
					],
					axes: {
						data2: "y2",
					},
					type: "line",
					colors: {
						data1: "#ff0000"
					}
				},
				axis: {
					y2: {
						show: true
					}
				},
				regions: [
					{
						axis: "x",
						start: 1,
						end: 2,
						class: "regions_class1",
						label: {
							text: "Regions 1",
							x: 0,
							y: 0,
							color: "red"
						}
					},
					{
						axis: "x",
						start: 3,
						end: 5,
						class: "regions_class2",
						label: {
							text: "Regions 2",
							rotated: true
						}						
					},
					{
						axis: "y",
						start: 100,
						end: 300,
						class: "regions_class3"
					},
					{
						axis: "y2",
						start: 200,
						end: 220,
						class: "regions_class4",
						label: {
							text: "Regions 4",
							x: 100,
							y: 100
						}
					}
				]
			};
		});

		it("regions are generated correctly?", () => new Promise(done => {
			const {$el, scale} = chart.internal;
			
			setTimeout(() => {
				$el.region.list.each(function(d, i) {
					const axis = scale[d.axis];
					const isX = d.axis === "x";
					const rect = this.querySelector("rect");
					const start = +rect.getAttribute(isX ? "x" : "y");
					const size = +rect.getAttribute(isX ? "width" : "height");

					// first <rect> should apply .regions_class1 rule
					if (i === 0) {
						const {fill} = window.getComputedStyle(this.querySelector("rect"));

						expect(fill).to.be.equal("rgb(70, 130, 180)");
					}

					// check the diemsion
					expect(start).to.be.equal(axis(isX ? d.start : d.end));
					expect(start + size).to.be.equal(axis(isX ? d.end : d.start));

					d.class && expect(this.getAttribute("class").indexOf(d.class) > -1).to.be.true;
					

					if (d.label) {
						const node = this.querySelector("text");
						const {text, x = 0, y = 0, color, rotated} = d.label;

						expect(node.textContent).to.be.equal(text);

						if (isX) {
							expect(node.getAttribute("transform")).to.be
								.equal(`translate(${axis(d.start) + x}, ${y})${rotated ? ` rotate(-90)` : ``}`);
						} else {
							expect(node.getAttribute("transform")).to.be
								.equal(`translate(${y}, ${axis(d.end) + x})${rotated ? ` rotate(-90)` : ``}`);
						}

						color && expect(node.style.fill).to.be.equal(color);

					// when has no label, <text> element should not be generated
					} else {
						expect(this.querySelector("text")).to.be.null;
					}
				});
				
				done(1);
			}, 300);
		}));
	});

	describe("regions with dasharray", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2023-08-25", "2023-08-26", "2023-08-27", "2023-08-28", "2023-08-29"],
						["data1", 50, 20, 10, null, 20, 30]
					],
					regions: {
						data1: [{
							start: "2023-08-26",
							end: "2023-08-27",
							style: {
								dasharray: "5 2"
							}
						}]
					}
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d",
						}
					}
				}
			};
		});

		it("should regions applied for timeseries chart.", () => {
			const lCnt = chart.$.line.lines.attr("d").split("L").length;

			expect(lCnt).to.be.above(19);
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", null, 200, 100, 152, 150, 250, 30]
					],
					type: "line",
					regions: {
						data1: [
							{
								start: 1,
								end: 2,
								style: {
									dasharray: "5 3"
								}
							},
							{
								start: 3,
								end: 4,
								style: {
									dasharray: "10 5"
								}
							}
						]
					}
				},
				axis: {
					y: {
						show: false
					}
				},
				point: {
					show: false
				}
			};
		});

		it("shouldn't have any overflowed dashed lines.", () => {
			const path = chart.$.line.lines.attr("d").split("M").map(v => {
				return v && v.split("L").map(v2 => +v2.replace(/,.*/,""))
			}).filter(Boolean);

			const hasOverflow = path.some((v, i, arr) => {
				if (v.length > 2) {
					return arr[i - 1][1] > v[0];
				}

				return false;
			});

			expect(hasOverflow).to.be.false;
		});

		it("set options", () => {
			args.axis.rotated = true;
			args.data.regions.data1 = [
				{
					start: 1,
					end: 2,
					style: {
						dasharray: "10 2"
					}
				},
				{
					start: 3,
					end: 4,
					style: {
						dasharray: "9 2"
					}
				}
			];
		});

		it("shouldn't have any overflowed dashed lines on rotated axis.", () => {
			const path = chart.$.line.lines.attr("d").split("M").map(v => {
				return v && v.split("L").map(v2 => +v2.replace(/,.*/,""))
			}).filter(Boolean);

			const hasOverflow = path.some((v, i, arr) => {
				if (v.length > 2) {
					return v[0] > arr[i-1][1];
				}

				return false;
			});

			expect(hasOverflow).to.be.false;
		});
	});

	describe("category type", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 100, 150, 130, 200, 220, 190]
					],
					axes: {
						data2: "y2"
					},
					type: "line",
					colors: {
						data1: "#ff0000"
					}
				},
				axis: {
					x: {
						type: "category",
						categories: [
							"cat1",
							"cat2",
							"cat3",
							"cat4",
							"cat5",
							"cat6"
					  ]
					},
					y2: {
					  show: true
					}
				},
				regions: [
					{
					  axis: "x",
					  start: "cat1",
					  end: "cat2",
					  class: "regions_class1",
					  label: {
						text: "Regions 1",
						color: "red"
					  }
					},
					{
					  axis: "x",
					  start: "cat4",
					  end: "cat4",
					  class: "regions_class4",
					  label: {
						text: "Regions 4",
						color: "blue"
					  }
					}
				]
			};
		});

		it("should render regions correctly", () => {
			const {region: {list}} = chart.internal.$el;
			const {x} = chart.internal.scale;
			const expected = [
				{start: -0.5, end: 1.5},
				{start: 2.5, end: 3.5}
			];

			list.select("rect").each(function(d, i) {
				const {start, end} = expected[i];
				const xPos = +this.getAttribute("x");
				const width = +this.getAttribute("width");

				expect(x(start)).to.be.equal(xPos);
				expect(x(end)).to.be.equal(xPos + width);
			});
		});

		it("set options: regions", () => {
			args.regions = [
				{
					axis: "x",
					start: 1,
					end: "cat3"
				},
				{
					axis: "x",
					start: "cat5",
					end: 4.5
				}
			];
		});

		it("should render regions correctly", () => {
			const {region: {list}} = chart.internal.$el;
			const {x} = chart.internal.scale;
			const expected = [
				{start: 1, end: 2.5},
				{start: 3.5, end: 4.5}
			];

			list.select("rect").each(function(d, i) {
				const {start, end} = expected[i];
				const xPos = +this.getAttribute("x");
				const width = +this.getAttribute("width");

				expect(x(start)).to.be.closeTo(xPos, 0.1);
				expect(x(end)).to.be.closeTo(xPos + width, 0.1);
			});
		});
	});
});
