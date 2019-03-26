/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("STANFORD ELEMENTS", () => {
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
	const args = {
		data: {
			x: "x",
			y: "y",
			epochs: "epochs",
			columns: [
				["x", 25, 35],
				["y", 25, 33],
				["epochs", 30, 35]
			],
			type: "stanford"
		},
		stanford: {
			lines: expectedLines,
			regions: expectedRegions,
			texts: expectedTexts
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("stanford lines", () => {
		it("should show stanford lines", () => {
			expect(chart.internal.main.selectAll(`.${CLASS.stanfordLines} .${CLASS.stanfordLine} line`).size()).to.be.equal(3);
		});
	});

	describe("stanford regions", () => {
		it("should create the stanford region polygon", () => {
			expect(chart.internal.main.selectAll(`.${CLASS.stanfordRegions} .${CLASS.stanfordRegion} polygon`).size()).to.be.equal(3);
		});
		it("should create the stanford region text", () => {
			expect(chart.internal.main.selectAll(`.${CLASS.stanfordRegions} .${CLASS.stanfordRegion} text`).size()).to.be.equal(3);
		});
	});
});
