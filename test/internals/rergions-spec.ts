/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
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

	describe("regions", () => {
		before(() => {
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

		it("regions are generated correctly?", done => {
			const {$el, scale} = chart.internal;
			
			setTimeout(() => {
				$el.region.list.each(function(d) {
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
				
				done();
			}, 300);
		});
	});
});
