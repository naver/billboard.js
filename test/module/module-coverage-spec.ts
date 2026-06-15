/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {select} from "d3-selection";
import {afterEach, describe, expect, it, vi} from "vitest";

import Cache from "../../src/module/Cache";
import {csvParse, csvParseRows, tsvParse, tsvParseRows} from "../../src/module/dsv";
import {checkApiModuleImport, checkModuleImport, logError} from "../../src/module/error";
import {generateResize, generateWait} from "../../src/module/generator";
import {polygonArea, polygonCentroid} from "../../src/module/polygon";
import {window} from "../../src/module/browser";
import {cleanupWorkers, getWorker, runWorker} from "../../src/module/worker";
import {
	addCssRules,
	brushEmpty,
	callFn,
	camelize,
	convertInputType,
	deepClone,
	emulateEvent,
	endall,
	extend,
	findIndex,
	getBBox,
	getBrushSelection,
	getBoundingRect,
	getCssRules,
	getElementPos,
	getMinMax,
	getOption,
	getPathBox,
	getPointer,
	getRange,
	getScrollPosition,
	getTransformCTM,
	getTranslation,
	hasStyle,
	hasValue,
	hasViewBox,
	isTabVisible,
	mergeArray,
	mergeObj,
	parseShorthand,
	scheduleRAFUpdate,
	setTextValue,
	toMap,
	toSet,
	tplProcess
} from "../../src/module/util";

describe("MODULE coverage helpers", () => {
	afterEach(() => {
		cleanupWorkers();
		vi.restoreAllMocks();
	});

	describe("DSV parser", () => {
		it("parses CSV rows with BOM, CRLF, quoted values and callbacks", () => {
			const rows = csvParseRows("\ufeffname,value\r\n\"a,b\",\"escaped \"\"quote\"\"\"\r\nlast,\n");

			expect(rows).to.be.deep.equal([
				["name", "value"],
				["a,b", "escaped \"quote\""],
				["last", ""]
			]);

			expect(csvParseRows("a,b\n1,2\n3,4", (row, i) => (
				i ? `${row[0]}:${row[1]}` : null
			))).to.be.deep.equal(["1:2", "3:4"]);
		});

		it("parses CSV and TSV objects with callbacks and missing values", () => {
			const columnsSeen: string[][] = [];
			const csv = csvParse("name,value\nfoo,1\nbar", (row, i, columns) => {
				columnsSeen.push(columns);
				return {...row, i};
			});

			expect(csv).to.be.deep.equal([
				{name: "foo", value: "1", i: 0},
				{name: "bar", value: "", i: 1}
			]);
			expect(columnsSeen[0]).to.be.deep.equal(["name", "value"]);

			expect(tsvParseRows("a\tb\r\nc\td")).to.be.deep.equal([["a", "b"], ["c", "d"]]);
			expect(tsvParse("name\tvalue\nfoo\t2")).to.be.deep.equal([{name: "foo", value: "2"}]);
		});
	});

	describe("Cache", () => {
		it("tracks keys, resets prefixed entries and preserves excluded prefixes", () => {
			const cache = new Cache();

			cache.add("$domain", 1);
			cache.add("$keep.domain", 2);
			cache.add("plain", 3);

			expect(cache.has("$domain")).to.be.true;
			expect(cache.getKeys()).to.have.members(["$domain", "$keep.domain", "plain"]);

			cache.reset(false, ["$keep"]);

			expect(cache.get("$domain")).to.be.null;
			expect(cache.get("$keep.domain")).to.be.equal(2);
			expect(cache.get("plain")).to.be.equal(3);

			cache.reset(true);
			expect(cache.getKeys()).to.be.empty;
		});

		it("clones data targets when storing data typed cache entries", () => {
			const cache = new Cache();
			const target = {
				id: "data1",
				id_org: "Data 1",
				values: [{x: 0, value: 10, id: "data1", index: 0}]
			};
			const stored = cache.add("data1", target, true);

			target.values[0].value = 99;

			expect(stored.values[0]).to.be.deep.equal({x: 0, value: 10, id: "data1"});
			expect(cache.get(["missing", "data1"], true)).to.be.deep.equal([stored]);
		});
	});

	describe("worker", () => {
		it("returns null for missing cached workers", () => {
			expect(getWorker("__missing__", "blob:missing")).to.be.null;
		});

		it("runs cached workers and cleans up object URLs", () => new Promise(done => {
			const OriginalWorker = window.Worker;
			const originalCreateObjectURL = window.URL.createObjectURL;
			const originalRevokeObjectURL = window.URL.revokeObjectURL;
			const created: string[] = [];
			const revoked: string[] = [];
			const terminated: string[] = [];

			class MockWorker {
				onerror = null;
				src;
				listeners: Function[] = [];

				constructor(src) {
					this.src = src;
					created.push(src);
				}

				addEventListener(type, fn) {
					this.listeners.push(fn);
				}

				removeEventListener(type, fn) {
					this.listeners = this.listeners.filter(f => f !== fn);
				}

				postMessage(data) {
					setTimeout(() => {
						const e = {data: {id: data.id, result: data.args[0] * 3}};

						this.listeners.slice().forEach(fn => fn(e));
					});
				}

				terminate() {
					terminated.push(this.src);
				}
			}

			window.Worker = MockWorker;
			window.URL.createObjectURL = () => "blob:worker";
			window.URL.revokeObjectURL = url => revoked.push(url);

			runWorker(true, value => value * 3, value => {
				try {
					expect(value).to.be.equal(12);
					expect(created).to.be.deep.equal(["blob:worker"]);

					cleanupWorkers();

					expect(terminated).to.be.deep.equal(["blob:worker"]);
					expect(revoked).to.be.deep.equal(["blob:worker"]);
				} finally {
					window.Worker = OriginalWorker;
					window.URL.createObjectURL = originalCreateObjectURL;
					window.URL.revokeObjectURL = originalRevokeObjectURL;
				}
				done(1);
			})(4);
		}));

		it("falls back to sync execution when worker resources cannot be created", () => {
			const OriginalWorker = window.Worker;
			const originalCreateObjectURL = window.URL.createObjectURL;
			const values: number[] = [];

			try {
				window.Worker = class {};
				window.URL.createObjectURL = () => {
					throw new Error("CSP blocked");
				};

				runWorker(true, value => value * 2, value => values.push(value))(5);

				expect(values).to.be.deep.equal([10]);
			} finally {
				window.Worker = OriginalWorker;
				window.URL.createObjectURL = originalCreateObjectURL;
			}
		});

		it("falls back to sync execution when Worker construction fails", () => {
			const OriginalWorker = window.Worker;
			const originalCreateObjectURL = window.URL.createObjectURL;
			const originalRevokeObjectURL = window.URL.revokeObjectURL;
			const values: number[] = [];

			try {
				window.Worker = class {
					constructor() {
						throw new Error("Worker blocked");
					}
				};
				window.URL.createObjectURL = () => "blob:blocked";
				window.URL.revokeObjectURL = () => {};

				runWorker(true, value => value + 1, value => values.push(value))(5);

				expect(values).to.be.deep.equal([6]);
			} finally {
				cleanupWorkers();
				window.Worker = OriginalWorker;
				window.URL.createObjectURL = originalCreateObjectURL;
				window.URL.revokeObjectURL = originalRevokeObjectURL;
			}
		});

	});

	describe("geometry and brush helpers", () => {
		it("computes polygon area and centroid", () => {
			const square = [[0, 0], [4, 0], [4, 4], [0, 4]];

			expect(polygonArea(square)).to.be.equal(-16);
			expect(polygonCentroid(square)).to.be.deep.equal([2, 2]);
		});

		it("reads brush selection from current event", () => {
			const ctx = {
				event: {type: "brush", selection: [2, 8]},
				$el: {subchart: {main: null}, main: null}
			};

			expect(getBrushSelection(ctx)).to.be.deep.equal([2, 8]);
			expect(brushEmpty(ctx)).to.be.false;
			expect(brushEmpty({...ctx, event: {type: "brush", selection: [4, 4]}})).to.be.true;
			expect(brushEmpty({event: null, $el: {subchart: {main: null}, main: null}})).to.be.true;
		});
	});

	describe("generator helpers", () => {
		it("queues resize callbacks and supports remove and clear", () => new Promise(done => {
			const resize = generateResize(1);
			const calls: string[] = [];
			const removed = () => calls.push("removed");

			resize.add(() => calls.push("first"));
			resize.add(removed);
			resize.remove(removed);
			resize();

			setTimeout(() => {
				expect(calls).to.be.deep.equal(["first"]);

				resize.add(() => calls.push("cleared"));
				resize();
				resize.clear();

				setTimeout(() => {
					expect(calls).to.be.deep.equal(["first"]);
					done(1);
				}, 20);
			}, 20);
		}));

		it("runs resize callbacks through requestIdleCallback when option is false", () => new Promise(done => {
			const resize = generateResize(false);

			resize.add(() => {
				expect(true).to.be.true;
				done(1);
			});
			resize();
		}));

		it("waits until queued transitions are complete", () => new Promise(done => {
			const wait = generateWait();
			const transition = {
				empty: () => true,
				transition: () => {
					throw new Error("already ended");
				}
			};

			wait.add([true, transition]);
			wait(null, () => {
				expect(true).to.be.true;
				done(1);
			});
		}));
	});

	describe("error helpers", () => {
		it("throws module import errors with formatted module names", () => {
			vi.spyOn(window.console, "error").mockImplementation(() => {});
			vi.spyOn(window.console, "info").mockImplementation(() => {});

			expect(() => checkApiModuleImport("export")).to.throw("'exportApi'");
			expect(() => logError("Please, make sure if %cline", "tail", "info")).to.throw("'line'");
		});

		it("checks missing chart type module imports", () => {
			vi.spyOn(window.console, "error").mockImplementation(() => {});
			vi.spyOn(window.console, "info").mockImplementation(() => {});

			expect(() => checkModuleImport({
				config: {data_type: null, data_types: null},
				hasType: () => false
			})).to.throw("'line'");

			expect(() => checkModuleImport({
				config: {data_type: "bar", data_types: null},
				hasType: type => type === "bar"
			})).to.throw("'bar'");
		});
	});

	describe("object utilities", () => {
		it("covers option, value, function, string and array helpers", () => {
			const context = {value: 0};

			expect(getOption({a: false}, "a", true)).to.be.false;
			expect(getOption({}, "missing", "fallback")).to.be.equal("fallback");
			expect(hasValue({a: 1, b: 2}, 2)).to.be.true;
			expect(hasValue({a: 1}, 3)).to.be.false;
			expect(callFn(function(value) {
				this.value = value;
			}, context, 7)).to.be.true;
			expect(context.value).to.be.equal(7);
			expect(callFn(null, context)).to.be.false;
			expect(camelize("DATA-VALUE")).to.be.equal("dataValue");
			expect(camelize("data_value", "_")).to.be.equal("dataValue");
			expect(mergeArray([[1], [2, 3]])).to.be.deep.equal([1, 2, 3]);
			expect(mergeArray([])).to.be.deep.equal([]);
		});

		it("deep clones, extends and merges objects without prototype pollution", () => {
			const source = {nested: {value: 1}};
			const clone = deepClone(source);

			clone.nested.value = 2;

			expect(source.nested.value).to.be.equal(1);
			expect(extend({a: 1}, [{b: 2}, {a: 3, 0: "skip", c: 4}]))
				.to.be.deep.equal({a: 1, b: 2, c: 4});
			expect(mergeObj({a: {b: 1}}, {a: {c: 2}, arr: [1]}, {"__proto__": {polluted: true}}))
				.to.be.deep.equal({a: {b: 1, c: 2}, arr: [1]});
			expect(({} as any).polluted).to.be.undefined;

			const date = new Date(1234);
			const merged = mergeObj({}, {date, nested: {date}});

			expect(merged.date).to.be.instanceOf(Date);
			expect(+merged.date).to.be.equal(+date);
			expect(merged.date).not.to.be.equal(date);
			expect(merged.nested.date).to.be.instanceOf(Date);
		});

		it("gets ranges, min/max values and binary-search indexes", () => {
			const dates = [new Date(5), new Date(1), null, new Date(3)];
			const boxes = [{x: 0, w: 5}, {x: 10, w: 3}, {x: 20, w: 2}];
			const rotatedBoxes = [{y: 0, h: 5}, {y: 10, h: 3}, {y: 20, h: 2}];

			expect(getMinMax("min", [null, 5, 2, 9])).to.be.equal(2);
			expect(getMinMax("max", [null, 5, 2, 9])).to.be.equal(9);
			expect(getMinMax("min", dates)).to.be.deep.equal(new Date(1));
			expect(getMinMax("max", [])).to.be.undefined;
			expect(getRange(0, 5)).to.be.deep.equal([0, 1, 2, 3, 4]);
			expect(getRange(1, 6, 2)).to.be.deep.equal([1, 3, 5]);
			expect(findIndex(boxes, 11, 0, boxes.length - 1, false)).to.be.equal(1);
			expect(findIndex(boxes, 7, 0, boxes.length - 1, false)).to.be.equal(-1);
			expect(findIndex(rotatedBoxes, 21, 0, rotatedBoxes.length - 1, true)).to.be.equal(2);
		});

		it("processes templates, shorthand values, sets, maps and runUntil", () => new Promise(done => {
			expect(tplProcess("<b>{=name}</b>{=missing}", {name: "safe"})).to.be.equal("<b>safe</b>");
			expect(parseShorthand({top: 1, left: 4})).to.be.deep.equal({
				top: 1,
				right: 0,
				bottom: 0,
				left: 4
			});
			expect(parseShorthand("1 2 3")).to.be.deep.equal({top: 1, right: 2, bottom: 3, left: 2});
			expect(parseShorthand(5)).to.be.deep.equal({top: 5, right: 5, bottom: 5, left: 5});
				expect(Array.from(toSet([{id: "a"}, null, {id: "b"}], item => item.id)))
					.to.be.deep.equal(["a", "b"]);
				expect(Array.from(toSet(["", 0, false, null, undefined])))
					.to.be.deep.equal(["", 0, false]);
				expect(Array.from(toMap([{id: "a", value: 1}, null, {id: "b", value: 2}],
					item => item.id, item => item.value).entries()))
					.to.be.deep.equal([["a", 1], ["b", 2]]);
				expect(Array.from(toMap(["", 0, false, null], item => String(item)).entries()))
					.to.be.deep.equal([["", ""], ["0", 0], ["false", false]]);

				let ready = false;

			setTimeout(() => {
				ready = true;
			}, 5);

			import("../../src/module/util").then(({runUntil}) => {
				runUntil(() => {
					expect(ready).to.be.true;
					done(1);
				}, () => ready);
			});
		}));

		it("calls transition completion callbacks through endall", () => {
			const transition = {
				each(callback) {
					callback();
					callback();
					return this;
				},
				on(name, callback) {
					expect(name).to.be.equal("end");
					callback.call({id: 1}, ["a"]);
					callback.call({id: 2}, ["b"]);
					return this;
				},
				duration() {}
			};
			const called: string[] = [];

			endall(transition, function(value) {
				called.push(`${this.id}:${value}`);
			});

			expect(called).to.be.deep.equal(["2:b"]);

			endall({call: callback => callback.call({id: 3}, ["c"])}, function(value) {
				called.push(`${this.id}:${value}`);
			});
			expect(called).to.be.deep.equal(["2:b", "3:c"]);
		});
	});

	describe("DOM utilities", () => {
		it("sets single and multiline text values", () => {
			const svg = select(document.body).append("svg");
			const text = svg.append("text");

			setTextValue(null, "ignored");
			setTextValue(text, 123);
			setTextValue(text, "single");
			expect(text.text()).to.be.equal("single");

			setTextValue(text, "one\ntwo\nthree", [-0.5, 1.5], true);
			setTextValue(text, "one\ntwo\nthree", [-0.5, 1.5], true);

			expect(text.selectAll("tspan").nodes()).to.have.length(3);
			expect(text.select("tspan").attr("dy")).to.be.equal("-1em");

			svg.remove();
		});

		it("adds css rules and reads style conditions", () => {
			const style = document.createElement("style");

			document.head.appendChild(style);

			const index = addCssRules({
				rootSelector: ".bb",
				sheet: style.sheet
			}, "bb-chart .bb-line", ["stroke: red"]);

			expect(index).to.be.equal(0);
			expect(style.sheet.cssRules[0].cssText).to.include(".bb .bb-chart .bb-line");
			expect(getCssRules([style.sheet])).to.have.length(1);

			const fakeSheet = {
				cssRules: [],
				addRule(rule, index) {
					this.cssRules.splice(index, 0, {cssText: rule});

					return index;
				}
			};

			expect(addCssRules({sheet: fakeSheet}, "bb-axis..bb-y", ["fill: blue"]))
				.to.be.equal(0);
			expect(fakeSheet.cssRules[0].cssText).to.include(".bb-axis.bb-y");

			const div = document.createElement("div");

			div.style.color = "red";
			expect(hasStyle(div, {color: "red"})).to.be.true;
			expect(hasStyle(div, {color: "red", display: "block"}, true)).to.be.false;

			style.remove();
		});

		it("reads element positions, viewBox, scroll and RAF updates", () => new Promise(done => {
			const svg = select(document.body).append("svg").attr("viewBox", "0 0 100 100");
			const group = svg.append("g").attr("transform", "translate(12,34)");
			const rect = svg.append("rect").attr("x", "7").attr("y", "9").node();

			expect(hasViewBox(svg)).to.be.true;
			expect(getElementPos(rect, "x")).to.be.equal(7);
			expect(getElementPos(group.node(), "x")).to.be.equal(12);
			expect(getElementPos(group.node(), "y")).to.be.equal(34);
			expect(getElementPos(undefined, "x")).to.be.equal(0);

			const scroller = {scrollLeft: 3, scrollTop: 4};
			expect(getScrollPosition(scroller)).to.include({x: window.pageXOffset + 3});
			expect(getScrollPosition(scroller)).to.include({y: window.pageYOffset + 4});
			expect(getScrollPosition({})).to.include({x: window.pageXOffset});
			expect(getScrollPosition({})).to.include({y: window.pageYOffset});

			const state = {pendingRaf: null};
			let calls = 0;

			scheduleRAFUpdate(state, () => calls++);
			scheduleRAFUpdate(state, () => calls++);

			setTimeout(() => {
				expect(calls).to.be.equal(2);
				svg.remove();
				done(1);
			}, 30);
		}));

		it("emulates mouse and touch events", () => {
			const div = document.createElement("div");
			const events: string[] = [];

			div.addEventListener("click", () => events.push("click"));
			div.addEventListener("touchstart", event => {
				events.push(`${event.type}:${event.changedTouches[0].clientX}`);
			});

			emulateEvent.mouse(div, "click", {
				bubbles: true,
				cancelable: true,
				screenX: 1,
				screenY: 2,
				clientX: 3,
				clientY: 4
			});
			emulateEvent.touch(div, "touchstart", {clientX: 9, clientY: 10});

			expect(events).to.be.deep.equal(["click", "touchstart:9"]);
		});

		it("covers rect caches, pointer fallback and transform helpers", () => {
			const svg = select(document.body).append("svg");
			const rect = svg.append("rect").attr("width", 10).node();
			const bbox = {x: 1, y: 2, width: 10, height: 20};
			const clientRect = {x: 3, y: 4, width: 30, height: 40};

			rect.getBBox = vi.fn(() => bbox);
			rect.getBoundingClientRect = vi.fn(() => clientRect);

			expect(getBBox(rect)).to.be.equal(bbox);
			expect(getBBox(rect)).to.be.equal(bbox);
			rect.setAttribute("width", "11");
			expect(getBBox(rect).width).to.be.equal(10);
			expect(getBBox(rect, true)).to.be.equal(bbox);
			expect(getBoundingRect(rect)).to.be.equal(clientRect);
			expect(getBoundingRect(rect, true)).to.be.equal(clientRect);

			const circle = svg.append("circle").node();

			circle.getBBox = vi.fn(() => bbox);
			expect(getBBox(circle)).to.be.equal(bbox);
			expect(getBBox(circle)).to.be.equal(bbox);

			const pathBox = getPathBox(rect);

			expect(pathBox).to.include({x: 1, y: 2, width: 30, height: 40});
			expect(getPointer(null)).to.deep.equal([0, 0]);
			expect(getPointer({touches: [{clientX: NaN, clientY: NaN}]}, rect)).to.deep.equal([0, 0]);
			expect(getPointer({sourceEvent: {touches: [{clientX: 4, clientY: 5}]}}, rect))
				.to.have.length(2);
			expect(getTranslation(null)).to.include({e: 0, f: 0});
			expect(getTranslation({
				transform: {
					baseVal: {
						numberOfItems: 1,
						getItem: () => ({matrix: {e: 5, f: 6}})
					}
				}
			})).to.include({e: 5, f: 6});
			expect(hasViewBox(svg.attr("viewBox", "bad"))).to.be.false;
			expect(isTabVisible()).to.be.true;

			const ctmNode = rect as any;

			ctmNode.getScreenCTM = () => new DOMMatrix().translate(10, 20);
			ctmNode.getBoundingClientRect = () => ({x: 2, y: 3, width: 10, height: 10});
			expect(Math.round(getTransformCTM(ctmNode, 12, 23, false).x)).to.be.equal(20);
			expect(Math.round(getTransformCTM(ctmNode, 12, 23).x)).to.be.equal(2);

			svg.remove();
		});

		it("covers css rule error and input type detection branches", () => {
			const warn = vi.spyOn(window.console, "warn").mockImplementation(() => {});
			const throwingSheet = {
				href: "mock.css",
				get cssRules() {
					throw new Error("blocked");
				}
			};

			expect(getCssRules([throwingSheet])).to.deep.equal([]);
			expect(warn).toHaveBeenCalled();

			const originalMatchMedia = window.matchMedia;
			const originalNavigator = window.navigator;

			window.matchMedia = query => ({
				matches: query.includes("fine"),
				media: query
			});
			expect(convertInputType(true, false)).to.be.equal("mouse");

			Object.defineProperty(window, "navigator", {
				configurable: true,
				value: {
					maxTouchPoints: 1,
					userAgent: "Mock"
				}
			});
			window.matchMedia = query => ({
				matches: query.includes("coarse"),
				media: query
			});
			expect(convertInputType(true, true)).to.be.equal("touch");

			Object.defineProperty(window, "navigator", {
				configurable: true,
				value: {
					userAgent: "iPhone"
				}
			});
			window.matchMedia = () => ({matches: false});
			expect(convertInputType(false, true)).to.be.equal("touch");

			Object.defineProperty(window, "navigator", {
				configurable: true,
				value: originalNavigator
			});
			window.matchMedia = originalMatchMedia;
		});
	});
});
