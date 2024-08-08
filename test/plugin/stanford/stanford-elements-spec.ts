/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../../assets/util";
import Stanford from "../../../src/Plugin/stanford/index";
import CLASS from "../../../src/Plugin/stanford/classes";

describe("PLUGIN: STANFORD ELEMENTS", () => {
	let chart;
	const expectedLines = [
		{x1: 0, y1: 0, x2: 65, y2: 65, class: "line1"},
		{x1: 0, x2: 65, y1: 40, y2: 40, class: "line2"},
		{x1: 40, x2: 40, y1: 0, y2: 40}
	];
	const expectedRegions = [
		{
			points: [
				{x: 0, y: 0},
				{x: 40, y: 40},
				{x: 0, y: 40}
			],
			text: function (value, percentage) {
				return `MI: ${value} (${percentage}%)`;
			},
			opacity: 0.5,
			class: "region1"
		},
		{
			points: [
				{ x: 40, y: 0 },
				{ x: 65, y: 0 },
				{ x: 65, y: 40 },
				{ x: 40, y: 40 }
			]
		},
		{
			points: [
				{ x: 40, y: 40 },
				{ x: 65, y: 40 },
				{ x: 65, y: 65 }
			]
		}
	];
	const expectedTexts = [
		{x: 5, y: 15, content: "Hello World 1", class: "text1"},
		{x: 40, y: 15, content: "Hello World 2", class: "text2"},
		{x: 5, y: 65, content: "Hello World 3"}
	];
	let args: any = {
		data: {
			x: "x",
			columns: [
				["x", 25, 35],
				["y", 25, 33]
			],
			type: "scatter"
		},
		plugins: [
			new Stanford({
				epochs: [30, 35],
				lines: expectedLines,
				regions: expectedRegions,
				texts: expectedTexts
			})
		]
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("stanford lines", () => {
		it("should show stanford lines", () => {
			expect(chart.$.main.selectAll(`.${CLASS.stanfordLines} .${CLASS.stanfordLine} line`).size()).to.be.equal(3);
		});
	});

	describe("stanford regions", () => {
		it("should create the stanford region polygon", () => {
			expect(chart.$.main.selectAll(`.${CLASS.stanfordRegions} .${CLASS.stanfordRegion} polygon`).size()).to.be.equal(3);
		});
		it("should create the stanford region text", () => {
			expect(chart.$.main.selectAll(`.${CLASS.stanfordRegions} .${CLASS.stanfordRegion} text`).size()).to.be.equal(3);
		});
	});

	describe("timseries axis", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "Datetime",
					columns: [
						[
						"Datetime",
							new Date("2023-08-25"),
							new Date("2023-08-26"),
							new Date("2023-08-27")
						],
						[
						"Pressure",
							1,
							2.04,
							2.96
						],
					],
					type: "scatter"
				},
				axis: {
					x: {
						label: "Datetime",
						tick: {
							format: '%d/%m/%y'
						},
						type: "timeseries"
					}
				},
				plugins: [
					new Stanford({
						epochs: [
							34.794, 34.787, 34.791
						],
						scale: {
							min: 34.79,
							max: 35.139,
							width: 10
						},
						lines: [
							{
								x1: new Date("2023-08-25"),
								y1: 1,
								x2: new Date("2023-08-27"),
								y2: 3,
								class: "line"
							}
						]
					})
				]
			};
		});

		it("check line position", () => new Promise(done => {
			const {$el: {main}} = chart.internal;
			const line = main.selectAll(".bb-stanford-line line");
			const expected = [6, 543, 391, 30];

			setTimeout(() => {
				const pos = [
					line.attr("x1"),
					line.attr("x2"),
					line.attr("y1"),
					line.attr("y2")
				].map(Number);
				
				expect(line.size()).to.be.equal(1);

				pos.forEach((v, i) => {
					expect(v).to.be.closeTo(expected[i], 10);
				});

				done(1);
			}, 100);			
		}));

		it("set options: axis.rotated=true", () => {
			args.axis.rotated = true;			
		});

		it("check rotated axis line position", () => new Promise(done => {
			const {$el: {main}} = chart.internal;
			const line = main.selectAll(".bb-stanford-line line");
			const expected = [43, 476, 6, 421];

			setTimeout(() => {
				const pos = [
					line.attr("x1"),
					line.attr("x2"),
					line.attr("y1"),
					line.attr("y2")
				].map(Number);
				
				expect(line.size()).to.be.equal(1);

				pos.forEach((v, i) => {
					expect(v).to.be.closeTo(expected[i], 3);
				});

				done(1);
			}, 100);			
		}));
	});

	describe("category axis", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "a", "b", "c", "d"],
						["Pressure", 1, 2.04, 2.96]
					],
					type: "scatter"
				},
				axis: {
					_rotated: true,
					x: {
						label: "x",			
						type: "category"
					}
				},
				plugins: [
					new Stanford({
						epochs: [
							34.794, 34.787, 34.791
						],
						scale: {
							min: 34.79,
							max: 35.139,
							width: 10
						},
						lines: [
							{
								x1: 0,
								y1: 1,
								x2: 10,
								y2: 2,
								class: "line"
							}
						]
					})
				]
			};
		});

		it("", () => new Promise(done => {
			const {$el: {main}} = chart.internal;
			const line = main.selectAll(".bb-stanford-line line");
			const expected = [69, 1439, 391, 210];

			setTimeout(() => {
				const pos = [
					line.attr("x1"),
					line.attr("x2"),
					line.attr("y1"),
					line.attr("y2")
				].map(Number);
				
				expect(line.size()).to.be.equal(1);

				pos.forEach((v, i) => {
					expect(v).to.be.closeTo(expected[i], 3);
				});

				expect(chart.categories()).to.be.deep.equal(["a", "b", "c", "d"]);

				done(1);
			}, 100);	
		}));
	});
});
