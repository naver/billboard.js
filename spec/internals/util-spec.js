/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {toArray, getCssRules, isArray} from "../../src/internals/util";

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
});
