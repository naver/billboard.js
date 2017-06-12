/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {bb} from "../src/core";

describe("Generation", () => {
	it("Instance has been created?", () => {
		expect(bb).not.to.be.null;
		expect(typeof bb).to.be.equal("object");
	});
});
