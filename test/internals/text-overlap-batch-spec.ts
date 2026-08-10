/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {select as d3Select} from "d3-selection";
import {describe, expect, it} from "vitest";

import textModule from "../../src/ChartInternal/internals/text";
import {$TEXT} from "../../src/config/classes";

describe("TEXT overlap batching", () => {
	it("batches text length reads before writing overlap classes", () => {
		const root = document.createElementNS("http://www.w3.org/2000/svg", "g");
		const ids = ["data1", "data2", "data3"];
		const readSawWrite: boolean[] = [];

		ids.forEach((id, index) => {
			const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

			text.__data__ = {data: {id}};
			text.setAttribute("class", "bb-gauge-value");
			text.setAttribute("transform", `translate(${index === 2 ? 100 : index * 5}, ${index * 5})`);
			text.style.fontSize = "20px";
			text.getComputedTextLength = () => {
				readSawWrite.push(ids.some((_, i) =>
					root.children[i].classList.contains($TEXT.TextOverlapping)
				));

				return 50;
			};

			root.appendChild(text);
		});

		textModule.markOverlapped("data1", {
			$el: {
				arcs: d3Select(root)
			}
		}, ".bb-gauge-value");

		expect(readSawWrite).to.be.deep.equal([false, false]);
		expect(root.children[1].classList.contains($TEXT.TextOverlapping)).to.be.true;
		expect(root.children[2].classList.contains($TEXT.TextOverlapping)).to.be.false;
	});
});
