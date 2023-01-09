/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import sinon from "sinon";
import util from "../../assets/util";
import Stanford from "../../../src/Plugin/stanford/index";
import CLASS from "../../../src/Plugin/stanford/classes";
import {compareEpochs, getCentroid, getRegionArea, pointInRegion} from "../../../src/Plugin/stanford/util";

describe("PLUGIN: STANFORD", () => {
	let chart;
	let stanford = new Stanford({ epochs: [30, 35] });
	let args: any = {
		data: {
			x: "x",
			columns: [
				["x", 25, 35],
				["y", 25, 33]
			],
			type: "scatter"
		},
		plugins: [stanford]
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("countEpochsInRegion", () => {
		it("should return 0 if the region has no epochs", () => {
			const region = [
				{x: 0, y: 0},
				{x: 20, y: 0},
				{x: 20, y: 20},
				{x: 0, y: 20}
			];

			const stanford = chart.plugins[0];
			const result = stanford.countEpochsInRegion.bind(stanford.$$)(region);

			expect(result.percentage).to.be.equal(0);
			expect(result.value).to.be.equal(0);
		});

		it("should return 100% if the region has all the epochs", () => {
			const region = [
				{x: 0, y: 0},
				{x: 60, y: 0},
				{x: 60, y: 60},
				{x: 0, y: 60}
			];

			const stanford = chart.plugins[0];
			const result = stanford.countEpochsInRegion.bind(stanford.$$)(region);

			expect(Number(result.percentage)).to.be.equal(100);
			expect(result.value).to.be.equal(65);
		});
	});

	describe("getCentroid", () => {
		const region = [ // a 20 x 20 square
			{x: 0, y: 0},
			{x: 20, y: 0},
			{x: 20, y: 20},
			{x: 0, y: 20}
		];

		it("should return the centroid of a polygon", () => {
			const result = getCentroid(region);

			expect(result.x).to.be.equal(10);
			expect(result.y).to.be.equal(10);
		});
	});

	describe("getRegionArea", () => {
		const square = [ // a 20 x 20 square
			{x: 0, y: 0},
			{x: 20, y: 0},
			{x: 20, y: 20},
			{x: 0, y: 20}
		];

		const squareArea = 400;

		const triangle = [ // A = b * h / 2
			{x: 0, y: 0},
			{x: 20, y: 20},
			{x: 0, y: 20},
		];

		const triangleArea = 200;

		it("should return the correct area for a square", () => {
			expect(Math.abs(getRegionArea(square))).to.be.equal(squareArea);
		});

		it("should return the correct area for a triangle", () => {
			expect(Math.abs(getRegionArea(triangle))).to.be.equal(triangleArea);
		});
	});

	describe("compareEpochs", () => {
		const dataBigger = {epochs: 2};
		const dataLower = {epochs: 1};

		it("should return -1 if epochs are smaller", () => {
			expect(compareEpochs(dataLower, dataBigger)).to.be.equal(-1);
		});

		it("should return 1 if epochs are bigger", () => {
			expect(compareEpochs(dataBigger, dataLower)).to.be.equal(1);
		});

		it("should return 0 if epochs are equal", () => {
			expect(compareEpochs(dataLower, dataLower)).to.be.equal(0);
		});
	});

	describe("pointInRegion", () => {
		const region = [
			{x: 0, y: 0},
			{x: 20, y: 0},
			{x: 20, y: 20},
			{x: 20, y: 20}
		];

		const pointInside = {x: 0, value: 0};
		const pointOutInside = {x: 21, value: 0};

		it("should return true if point is inside region", () => {
			expect(pointInRegion(pointInside, region)).to.be.true;
		});

		it("should return false if point is outside region", () => {
			expect(pointInRegion(pointOutInside, region)).to.be.false;
		});
	});

	describe("regions", () => {
		before(() => {
			args.plugins = [
				new Stanford({
					epochs: [30, 35],
					regions: [
						{
							points: [
									{
										x: 0,
										y: 0
									},
									{
										x: 50,
										y: 50
									},
									{
										x: 30,
										y: 40
									}
							],
							text: sinon.spy(function (value, percentage) {
								return "Normal Operations: "+ value +" "+ percentage +"%";
							}),
							opacity: 0.1
						}
					]
				})
			];
		})

		it("check for text function arguments data type", () => {
			chart.plugins[0].options.regions[0].text.args.forEach(v => {
				expect(v.every(t => typeof t === "number")).to.be.true;
			});
		});
	});

	describe("tooltip", () => {
		before(() => {
			args = {
				data: {
					x: "Datetime",
					columns: [
					  [
						"Datetime",
						1650965572,
						1650965572,
						1650965572
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
							fit: true,
							count: 30,
							format: '%d/%m/%y',
							culling: {
								max: 6
							}
						},
						type: 'timeseries'
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
						}
					})
				]
			};
		});

		it("sholud tooltip name and value display correctly for timeseries.", () => {
			const {tooltip} = chart.$;

			chart.tooltip.show({
				data: {
					x: new Date(1650965572),  // x Axis value
					id: "Pressure",
					value: 1
				}
			});

			tooltip.selectAll("th:first-child").each(function(d, i) {
				expect(this.textContent).to.be.equal(args.data.columns[i][0]);
			});

			expect(tooltip.select(".value").text()).to.be.equal("20/01/70");
			expect(tooltip.select(".name").text()).to.be.equal("Epochs");
		});
	});

	describe("scale", () => {
		before(() => {
			args = {
				data: {
					x: "HPE",
					columns: [
						["HPE", 2.5, 2.5, 3.5],
						["HPL", 24.5, 24, 67.5]
					],
					type: "scatter"
				},
				plugins: [
					new Stanford({
						epochs: [
							1,
							32,
							103,
							124
						],
						scale: {
							min: 0,
							max: 10000,
							format: "pow10"
						},
						padding: {
							top: 15
						}
					})
				]
			};
		});

		it("specifying 0(zero) for min value", () => {
			chart.$.svg.selectAll(`.${CLASS.colorScale} .tick text`).each(function(d, i) {
				expect(this.textContent).to.be.equal(`10${i}`);
			});
		});
	});
});
