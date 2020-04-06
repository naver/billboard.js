/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {toArray, getBoundingRect, getCssRules, getPathBox, getUnique, isArray, isNumber, sortValue} from "../../src/module/util";

describe("UTIL", function() {
	describe("toArray", () => {
		it("should convert array like objects to arrays", () => {
			function argsToArray(one, two, three) {
				return toArray(arguments);
			}

			const args = argsToArray(1, 2, 3);

			expect(isArray(args));
			expect(args.length).to.be.equal(3);
		});
	});

	describe("getCssRules", () => {
		it("should return css rules as an array", () => {
			const rules1 = getCssRules(toArray(document.styleSheets));

			expect(isArray(rules1));
		});
	});

	describe("sortValue", () => {
		const value = [1362063600000, 1462063600000, 1562063600000];

		it("sort number", () => {
			// asc
			expect(sortValue(value)).to.be.deep.equal(value);

			// desc
			expect(sortValue(value, false)).to.be.deep.equal(value.concat().reverse());
		});

		it("sort date", () => {
			const data = value.map(v => new Date(v));

			// asc
			expect(sortValue(data)).to.be.deep.equal(data);

			// desc
			expect(sortValue(data, false)).to.be.deep.equal(data.reverse());
		});

		it("sort string", () => {
			const data = ["a", "j", "z"];

			// asc
			expect(sortValue(data)).to.be.deep.equal(data);

			// desc
			expect(sortValue(data, false)).to.be.deep.equal(data.reverse());
		});
	});

	describe("getBoundingRect", () => {
		it("should return element's getBoundingClientRect()", () => {
			const rect = getBoundingRect(document.body);

			["bottom", "height", "left", "right", "top", "width", "x", "y"].forEach(v => {
				expect(v in rect).to.be.true;
			});

			expect(document.body.rect).to.be.deep.equal(rect);
		});
	});

	describe("getPathBox", () => {
		it("should return element's path box value", () => {
			const pathBox = getPathBox(document.body.querySelector("svg"));

			for (let x in pathBox) {
				expect(isNumber(pathBox[x])).to.be.true;
			}
		});
	});

	describe("getUnique", () => {
		it("should return unique values", () => {
			let data = [1,3,2,4,5,1,2,3];

			expect(getUnique(data)).to.deep.equal([1, 3, 2, 4, 5]);

			// for string
			data = ["a","b","c","a","b"];
			expect(getUnique(data)).to.deep.equal(["a", "b", "c"]);

			// for datetime
			data = [new Date("2019-08-01"), new Date("2019-08-01"), new Date("2019-08-01")];
			expect(getUnique(data)).to.deep.equal([new Date("2019-08-01")]);
		});
	});
});
