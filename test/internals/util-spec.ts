/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {describe, expect, it} from "vitest";
import sinon from "sinon";
import {timeParse as d3TimeParse} from "d3-time-format";
import {window} from "../../src/module/browser";
import {toArray, getBoundingRect, getCssRules, getPathBox, getPointer, getUnique, isArray, isNumber, sortValue, parseDate} from "../assets/module/util";

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

			// @ts-ignore
			expect(document.body.rect).to.be.deep.equal(rect);
		});
	});

	describe("getPathBox", () => {
		it("should return element's path box value", () => {
			const svg: SVGGraphicsElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			document.body.appendChild(svg);

			const pathBox = getPathBox(svg);

			for (let x in pathBox) {
				expect(isNumber(pathBox[x])).to.be.true;
			}

			svg.parentElement?.removeChild(svg);
		});
	});

	describe("getPointer", () => {
		it("should return numeric coordinate value", () => {			
			const touchObj = new Touch({
				identifier: Date.now(),
				target: document.body,
				radiusX: 2.5,
				radiusY: 2.5,
				rotationAngle: 10,
				force: 0.5,
				clientX: 100,
				clientY: 100
			});

			const touchEvent = new TouchEvent("touchstart", {
				cancelable: true,
				bubbles: true,
				touches: [touchObj],
				targetTouches: [],
				changedTouches: [touchObj],
				shiftKey: true,
			  });

			expect(getPointer(touchEvent, document.body)).to.be.deep.equal([100, 100]);

			// when has no touches object
			const touchEvent2 = new TouchEvent("touchstart", {
				cancelable: true,
				bubbles: true,
				targetTouches: [],
				changedTouches: [touchObj],
				shiftKey: true,
			  });

			expect(getPointer(touchEvent2, document.body)).to.be.deep.equal([0, 0]);
		});
	});

	describe("getUnique", () => {
		it("should return unique values", () => {
			let data: any = [1,3,2,4,5,1,2,3];

			expect(getUnique(data)).to.deep.equal([1, 3, 2, 4, 5]);

			// for string
			data = ["a", "b", "c", "a", "b"];
			expect(getUnique(data)).to.deep.equal(["a", "b", "c"]);

			// for datetime
			data = [new Date("2019-08-01"), new Date("2019-08-01"), new Date("2019-08-01")];
			expect(getUnique(data)).to.deep.equal([new Date("2019-08-01")]);
		});
	});

	describe("parseDate", () => {
		it("when Date object value is given, should return as is.", () =>  {
			const date = new Date();

			expect(date).to.be.equal(parseDate(date));
		});

		it("when string is given with parse specifier.", () => {
			const date = "2022-01-01";
			const parsedDate = new Date(date);

			const parsed = parseDate.call({
				config: "%Y-%m-%d",
				format: {
					dataTime: d3TimeParse
				}
			}, date);

			expect(parsed).to.be.deep.equal(parsedDate);
		});

		it("when string is given with mismatch parse specifier.", () => {
			const date = "2022-01-01 00:00:00";
			const parsedDate = new Date(date);

			const parsed = parseDate.call({
				config: "%Y-%m-%d",
				format: {
					dataTime: d3TimeParse
				}
			}, date);

			expect(parsed).to.be.deep.equal(parsedDate);
		});

		it("when numeric datetime is given.", () => {
			const datetime = 1648616365772;
			const parsed = parseDate(datetime);

			expect(parsed).to.be.deep.equal(new Date(datetime));
		});

		it("when non parsable string data is given.", () => {
			const date = "aaa";
			const console = window.console;

			window.console = {
				error: sinon.spy()
			};

			parseDate.call({
				config: "%Y-%m-%d",
				format: {
					dataTime: d3TimeParse
				}
			}, date);

			// console.error should be called
			expect(window.console.error.called).to.be.true;

			// rollback
			window.console = console;
		});
	});
});
