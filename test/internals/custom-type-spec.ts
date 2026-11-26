/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// the chart types of their own module are registered by name: they do not take the place of each other
import {describe, expect, it} from "vitest";
import {registerCustomType} from "../../src/config/resolver/customType";
import util from "../assets/util";

describe("custom type registry", () => {
	const fakeHooks = {themeTextColor: false, textAnchor: () => "end"};
	const fakeCanvas = {draw: () => {}, hits: () => {}, theme: {section: "fake"}};

	it("should keep the parts of a type when another type is registered after it", () => {
		registerCustomType("fake", {hooks: fakeHooks, canvas: fakeCanvas});

		const $$ = util.generate({data: {columns: [["data1", 30]], type: "bullet"}}).internal;

		// the hooks and the canvas parts are the ones of bullet, not of the type registered last
		expect($$.state.customType).to.be.equal("bullet");
		expect($$.customTypeHooks).to.not.be.equal(fakeHooks);
		expect($$.customTypeHooks.themeTextColor).to.be.true;
		expect($$.getCustomTypeParts().canvas.draw).to.be.a("function");
		expect($$.getCustomTypeParts().canvas.draw).to.not.be.equal(fakeCanvas.draw);
		expect($$.customTypes.fake.hooks).to.be.equal(fakeHooks);
	});

	it("should not pick a registered type the chart does not have", () => {
		registerCustomType("fake", {hooks: fakeHooks});

		const $$ = util.generate({data: {columns: [["data1", 30]], type: "line"}}).internal;

		expect($$.getCustomType()).to.be.null;
		expect($$.state.customType).to.be.null;
		expect($$.customTypeHooks).to.be.undefined;
		expect($$.getCustomTypeHooks({id: "data1"})).to.be.null;
	});

	it("should pick the type the chart has among the registered", () => {
		registerCustomType("fake", {hooks: fakeHooks});

		const $$ = util.generate({data: {columns: [["data1", 30]], type: "bullet"}}).internal;

		expect($$.getCustomType()).to.be.equal("bullet");
	});

	it("should add to the parts of a name that is registered again", () => {
		registerCustomType("merged", {hooks: fakeHooks});
		registerCustomType("merged", {canvas: fakeCanvas});

		const {merged} = (<any>util.generate({data: {columns: [["data1", 1]]}}).internal).customTypes;

		expect(merged.hooks).to.be.equal(fakeHooks);
		expect(merged.canvas).to.be.equal(fakeCanvas);

		registerCustomType("merged", {hooks: {}});

		// the parts that are given replace the same parts only
		expect((<any>util.generate({data: {columns: [["data1", 1]]}}).internal).customTypes.merged.canvas)
			.to.be.equal(fakeCanvas);
	});

	it("should keep the funnel and the bullet apart: each chart has the hooks of its own type", () => {
		const funnel = util.generate({data: {columns: [["data1", 30], ["data2", 20]], type: "funnel"}}).internal;
		const bullet = util.generate({data: {columns: [["data1", 30]], type: "bullet"}}).internal;

		expect(funnel.state.customType).to.be.equal("funnel");
		expect(bullet.state.customType).to.be.equal("bullet");
		expect(funnel.customTypeHooks).to.not.be.equal(bullet.customTypeHooks);
		// what only the funnel tells: canvas mode is not supported
		expect(funnel.customTypeHooks.canvasUnsupported).to.be.equal("funnel chart");
		expect(bullet.customTypeHooks.canvasUnsupported).to.be.undefined;
		// what only the bullet tells: it lays its legend out by itself
		expect(bullet.customTypeHooks.ownLegendLayout).to.be.true;
		expect(funnel.customTypeHooks.ownLegendLayout).to.be.undefined;
	});

	it("should not make the types of the axis, or the arcs, custom types", () => {
		["line", "bar", "pie"].forEach(type => {
			const $$ = util.generate({data: {columns: [["data1", 1]], type}}).internal;

			expect($$.state.customType, type).to.be.null;
			expect($$.getCustomTypeHooks({id: "data1"}), type).to.be.null;
		});
	});

	it("should not read the hooks from the prototype, as a chart that is not drawn has no state", () => {
		const $$ = util.generate({data: {columns: [["data1", 1]]}}).internal;
		const proto = Object.getPrototypeOf($$);

		expect(() => proto.customTypeHooks).to.not.throw();
		expect(proto.customTypeHooks).to.be.undefined;
	});
});
