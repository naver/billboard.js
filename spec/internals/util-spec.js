/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {toArray, getCssRules, isArray, sortValue} from "../../src/internals/util";

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
});
