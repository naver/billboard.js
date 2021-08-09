/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import sinon from "sinon";
import TableView from "../../../src/Plugin/tableview";
import util from "../../assets/util";
import {toArray} from "../../../src/module/util";

describe("PLUGIN: TABLE-VIEW", () => {
	let chart;
	const pluginArgs = {
		selector: undefined,
		title: "어쩌고 저쩌고222",
		categoryTitle: undefined,
		categoryFormat: undefined,
		class: undefined,
		style: true,
		updateOnToggle: true
	};
	const args = {
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
	let spy;

	beforeEach(() => {
		chart = util.generate(args);
	});

	function checkDataRows(table) {
		const rows = [];

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
		const table = document.querySelector(`table.bb-tableview`);
		const rows = [];

		expect(table).to.be.ok;
		expect(table.querySelector("caption").innerHTML).to.be.equal(pluginArgs.title);

		// check if values are shown correctly
		checkDataRows(table);
	});

	it("should update on data toggle", ()=> {
		const table = document.querySelector(`table.bb-tableview`);
		const len = table.querySelectorAll("tbody td").length;

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
		const table = document.querySelector(`table.bb-tableview`);
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
		const table = document.querySelector(`table.${pluginArgs.class}`);

		expect(table).to.be.ok;
		expect(table.querySelector("thead th").innerHTML).to.be.equal(pluginArgs.categoryTitle);
	});

	it("set options: categoryFormat", () => {
		spy = sinon.spy(v => `ab${v}`);
		pluginArgs.categoryFormat = spy;
	});

	it("should apply categoryFormat function value", () => {
		const table = document.querySelector(`table.${pluginArgs.class}`);

		// categoryFormat callback should be called as the data length's times
		expect(spy.callCount).to.be.equal(args.data.columns.length);

		toArray(table.querySelectorAll("tbody th")).forEach((v, i) => {
			expect(v.innerHTML).to.be.equal(pluginArgs.categoryFormat(i));
		});

	});
});
