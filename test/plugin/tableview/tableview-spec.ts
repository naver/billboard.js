/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import TableView from "../../../src/Plugin/tableview";
import {defaultStyle} from "../../../src/Plugin/tableview/const";
import util from "../../assets/util";
import {toArray} from "../../../src/module/util";

describe("PLUGIN: TABLE-VIEW", () => {
	let chart;
	let args;
	const pluginArgs = {
		selector: <string|undefined> undefined,
		categoryTitle: <string|undefined> undefined,
		categoryFormat: <Function|undefined> undefined,
		class: <string|undefined> undefined,
		style: true,
		title: "어쩌고 저쩌고222",
		updateOnToggle: true
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("default style", () => {
		let spy;

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 20, 50],
						["data2", 200, 130, 90],
						["data3", 300, 200, 160]
					],
				},
				plugins: [
					new TableView(pluginArgs)
				]
			};
		});

		function checkDataRows(table) {
			const rows: any = [];

			toArray(table.querySelectorAll("tbody tr")).forEach(v => {
				toArray(v.querySelectorAll("td")).forEach((d, j) => {
					if (!rows[j]) {
						rows[j] = [];
					}

					rows[j].push(+d.innerHTML);
				});
			});

			rows.forEach((v, i) => {
				expect(v).to.deep.equal(chart.data.values(`data${i + 1}`));
			});
		}

		it("Table view generated correctly?", () => {
			const table = document.querySelector(`table.${defaultStyle.class}`) as HTMLTableElement;
			const rows = [];

			expect(table).to.be.ok;
			expect(table.querySelector("caption")?.innerHTML).to.be.equal(pluginArgs.title);

			// check if values are shown correctly
			checkDataRows(table);
		});

		it("should update on data toggle", ()=> {
			const table = document.querySelector(`table.${defaultStyle.class}`) as HTMLTableElement;
			const len = table.querySelectorAll("tbody td").length || 0;

			// when
			chart.hide("data3");

			expect(table.querySelectorAll("tbody td").length).to.be.below(len);

			// check if values are shown correctly
			checkDataRows(table);
		});

		it("set options", () => {
			pluginArgs.updateOnToggle = false;
		});

		it("shouldn't update on data toggle", ()=> {
			const table = document.querySelector(`table.${defaultStyle.class}`) as HTMLTableElement;
			const len = table.querySelectorAll("tbody td").length;

			// when
			chart.hide("data3");

			expect(table.querySelectorAll("tbody td").length).to.be.equal(len);

			// check if values are shown correctly
			checkDataRows(table);
		});

		it("set options", () => {
			pluginArgs.style = false;
			pluginArgs.class = "test-abcd";
			pluginArgs.categoryTitle = "MyCategory";
		});

		it("check if used defined options are applied", () => {
			const table = document.querySelector(`table.${pluginArgs.class}`) as HTMLTableElement;

			expect(table).to.be.ok;
			expect(table.querySelector("thead th")?.innerHTML).to.be.equal(pluginArgs.categoryTitle);
		});

		it("set options: categoryFormat", () => {
			spy = sinon.spy(v => `ab${v}`);
			pluginArgs.categoryFormat = spy;
		});

		it("should apply categoryFormat function value", () => {
			const table = document.querySelector(`table.${pluginArgs.class}`) as HTMLTableElement;

			// categoryFormat callback should be called as the data length's times
			expect(spy.callCount).to.be.equal(args.data.columns.length);

			toArray(table?.querySelectorAll("tbody th")).forEach((v, i) => {
				expect(v.innerHTML).to.be.equal(pluginArgs.categoryFormat?.(i));
			});
		});

		it("check if table resizes on body width's change", () => {
			const table = document.querySelector(`table.${pluginArgs.class}`) as HTMLTableElement;
			const width = 600;
			
			// when
			table.style.width = "100%";
			document.body.style.width = `${width}px`;

			expect(table.getBoundingClientRect().width).to.be.equal(width);

			// reset body width
			document.body.style.width = ``;
		});

		it("set options", () => {
			pluginArgs.categoryTitle = "<img src=''>MyCategory";
			pluginArgs.title = '<SCRIPT >alert(1)<\/SCRIPT>어쩌고 저쩌고222';
		});

		it("check if 'title' and 'categoryTitle' are escaped", () => {
			const table = document.querySelector(`table.${pluginArgs.class}`) as HTMLTableElement;

			expect(table.querySelector("caption")?.innerHTML).to.not.include("script");
			expect(table.querySelector("thead th")?.innerHTML).to.not.include("img");
		});
	});

	describe("Specify non table element as target", () => {
		const divId = "tableView_div_wrapper";

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 20, 50],
						["data2", 200, 130, 90],
						["data3", 300, 200, 160]
					],
				},
				plugins: [
					new TableView({
						selector: `#${divId}`
					})
				]
			};

			// append div for table view test
			const div = document.createElement("div");

			div.id = divId;

			document.body.appendChild(div);
		});

		afterAll(() => {
			document.getElementById(divId)?.remove();
		});

		it("check if table is generated on non <table> element", () => {
			const table = document.querySelector("table") as HTMLTableElement;

			expect(table.tagName).to.be.equal("TABLE");
			expect(document.getElementById(divId)?.querySelector("table")).to.be.ok;
		});
	});

	describe("different x axis types", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "Type A", "Type B", "Type C"],
						["data1", 30, 20, 50],
						["data2", 200, 130, 90],
						["data3", 300, 200, 160]
					],
				},
				axis: {
					x: {
						type: "category"
					}
				},
				plugins: [
					new TableView({
						style: true,
						title: "Category",
						updateOnToggle: true
					})
				]
			}
		});
		
		it("check if category names are displayed correctly.", () => {
			const table = document.querySelector(`table.${defaultStyle.class}`) as HTMLTableElement;
			const categories = chart.categories();

			table.querySelectorAll("th[scope=row]").forEach((th, i) => {
				expect(th.textContent).to.be.equal(categories[i]);
			});

			expect(table.querySelector("caption")?.innerHTML).to.be.equal(args.plugins[0].options.title);
		});

		it("set options: axis.x.type='timeseries'", () => {
			args.data = {
				x: "x",
				columns: [
					["x", "2023-08-08", "2023-08-09", "2023-08-10"],
					["data1", 30, 20, 50],
					["data2", 200, 130, 90],
					["data3", 300, 200, 160]
				]
			};
			args.axis.x.type = "timeseries";
		});

		it("check if dates are displayed correctly.", () => {
			const table = document.querySelector(`table.${defaultStyle.class}`) as HTMLTableElement;
			const dates = chart.x().data1.map(v => v.toLocaleDateString());

			table.querySelectorAll("th[scope=row]").forEach((th, i) => {
				expect(th.textContent).to.be.equal(dates[i]);
			});
		});

		it("when chart is destroyed, table also should destroyed.", () => {
			chart.internal.charts.length = 1;  // force to make remove style also
			chart.destroy();

			expect(document.querySelector(".bb-tableview")).to.be.null;
			expect(document.querySelector(`#${defaultStyle.id}`)).to.be.null;
		});
	});

	describe("nullString option", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2023", "2024", "2025", "2026"],
						["data1", 1230, null, null, 1238],
						["data2", 500, 120, 100, null]
					],
				},
				axis: {
					x: {
					  type: "category"
					}
				},
				plugins: [
					new TableView({
						title: "My Yearly Data List",
						categoryTitle: "Year",
						style: true
					})
				]
			};
		});

		it("check default nullString value: '-'", () => {
			const tr = document.querySelectorAll(".bb-tableview tr");

			[].slice.call(tr).forEach(v => {
				const x = v.querySelector("th").textContent;

				if (/202(4|5|6)/.test(x)) {
					expect(v.querySelectorAll("td")[x === "2026" ? 1 : 0].textContent).to.be.equal("-");
				}
			});
		});

		it("set options: nullString='N/A'", () => {
			args.plugins = [
				new TableView({
					title: "My Yearly Data List",
					categoryTitle: "Year",
					style: true,
					nullString: "N/A"
				})
			];
		});

		it("when nullString value is specified: 'N/A'", () => {
			const tr = document.querySelectorAll(".bb-tableview tr");

			[].slice.call(tr).forEach(v => {
				const x = v.querySelector("th").textContent;

				if (/202(4|5|6)/.test(x)) {
					expect(v.querySelectorAll("td")[x === "2026" ? 1 : 0].textContent).to.be.equal("N/A");
				}
			});
		});
	});
});
