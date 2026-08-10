/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {describe, expect, it, vi} from "vitest";

import {batchGetBBox} from "../../src/ChartInternal/internals/text.util";

describe("TEXT utility", () => {
	describe("batchGetBBox", () => {
		it("measures every element once and keeps the bbox mapped by element", () => {
			const elements = [0, 1, 2].map(() =>
				document.createElementNS("http://www.w3.org/2000/svg", "text")
			) as SVGTextElement[];
			const boxes = [
				{x: 0, y: 0, width: 12, height: 10},
				{x: 1, y: 2, width: 24, height: 11},
				{x: 3, y: 4, width: 36, height: 12}
			] as DOMRect[];

			elements.forEach((element, i) => {
				element.getBBox = vi.fn(() => boxes[i]);
			});

			const result = batchGetBBox(elements);

			elements.forEach((element, i) => {
				expect(result.get(element)).to.be.equal(boxes[i]);
				expect(element.getBBox).toHaveBeenCalledTimes(1);
			});
		});
	});
});
