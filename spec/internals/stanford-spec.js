/* eslint-disable */
import {compareEpochs, getCentroid, getRegionArea, pointInRegion} from "../../src/internals/stanford";
import util from "../assets/util";

describe("STANFORD", () => {
	let chart;
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
			type: "stanford",
		}
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

			const result = chart.internal.countEpochsInRegion(region);

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

			const result = chart.internal.countEpochsInRegion(region);

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
});
