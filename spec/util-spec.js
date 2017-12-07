/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {asArray, getCssRules, isArray} from "../src/internals/util";

describe("UTIL", function() {

	describe("asArray", () => {
		it("should convert array like objects to arrays", () => {

			function argsToArray(one, two, three) {
				return asArray(arguments);
			}

			const args = argsToArray(1, 2, 3);
			expect(isArray(args));
			expect(args.length).to.be.equal(3);
		});
	});

	describe("getCssRules", () => {
		it("should return css rules as an array", () => {

			const rules1 = getCssRules(asArray(document.styleSheets));
			expect(isArray(rules1));

		});
	});

});
