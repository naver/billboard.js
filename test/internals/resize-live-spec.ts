/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, describe, expect, it} from "vitest";
import bb from "../../src/index";
import {RESIZE_FRAME_BUDGET} from "../../src/config/const";

describe("resize.live", () => {
	let chart;
	let container;

	const INITIAL_WIDTH = 360;
	const RESIZED_WIDTH = 240;
	const TIMER = 500;

	afterEach(() => {
		chart?.destroy();
		container?.remove();
		chart = null;
		container = null;
	});

	/**
	 * Wait for the animation frame the live call is scheduled on.
	 */
	function nextFrame(): Promise<void> {
		return new Promise(resolve => {
			requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
		});
	}

	function settle(): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, TIMER + 300));
	}

	function generate(live) {
		container = document.createElement("div");
		container.style.cssText =
			`position:absolute;top:0;left:0;width:${INITIAL_WIDTH}px;height:260px;`;
		document.body.appendChild(container);

		return (chart = bb.generate({
			bindto: container,
			transition: {
				duration: 0
			},
			resize: {
				live,
				timer: TIMER
			},
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: "line"
			}
		}));
	}

	function shrink() {
		container.style.width = `${RESIZED_WIDTH}px`;
		chart.internal.resizeFunction();
	}

	describe("default(false)", () => {
		it("shouldn't reflect the size before the delayed resize runs", async () => {
			generate(false);

			const {svg} = chart.internal.$el;

			shrink();
			await nextFrame();

			expect(+svg.attr("width")).to.be.equal(INITIAL_WIDTH);
			expect(svg.attr("viewBox")).to.be.null;

			await settle();

			expect(+svg.attr("width")).to.be.equal(RESIZED_WIDTH);
		});
	});

	describe("true", () => {
		it("should redraw on the animation frame when it draws within a frame", async () => {
			generate(true);

			const {internal} = chart;
			const {svg} = internal.$el;

			shrink();
			await nextFrame();

			expect(+svg.attr("width")).to.be.equal(RESIZED_WIDTH);
			expect(internal.state.current.width).to.be.equal(RESIZED_WIDTH);

			// exact rendering: no stretching involved
			expect(svg.attr("viewBox")).to.be.null;
			expect(internal.state.resizePreview).to.be.false;
		});

		it("should measure the redraw to decide the strategy", async () => {
			generate(true);

			const {internal} = chart;

			expect(internal.state.resizeRedrawTime).to.be.equal(0);

			shrink();
			await nextFrame();

			// a chart this small draws well within a frame
			expect(internal.state.resizeRedrawTime).to.be.above(0);
			expect(internal.state.resizeRedrawTime).to.be.below(RESIZE_FRAME_BUDGET);
			expect(internal.state.resizeLiveScale).to.be.false;
		});

		it("should stretch instead when the redraw doesn't fit in a frame", async () => {
			generate(true);

			const {internal} = chart;
			const {svg} = internal.$el;

			// as if the previous redraw had been too expensive
			internal.state.resizeRedrawTime = RESIZE_FRAME_BUDGET + 1;

			shrink();
			await nextFrame();

			// stretched: layout box is the new size, drawn size kept as viewBox
			expect(+svg.attr("width")).to.be.equal(RESIZED_WIDTH);
			expect(svg.attr("viewBox")).to.be.equal(`0 0 ${INITIAL_WIDTH} 260`);
			expect(svg.attr("preserveAspectRatio")).to.be.equal("none");
			expect(internal.state.resizePreview).to.be.true;
			expect(internal.state.resizeLiveScale).to.be.true;

			// drawn geometry isn't touched until the resize settles
			expect(internal.state.current.width).to.be.equal(INITIAL_WIDTH);

			await settle();

			expect(svg.attr("viewBox")).to.be.null;
			expect(svg.attr("preserveAspectRatio")).to.be.null;
			expect(internal.state.current.width).to.be.equal(RESIZED_WIDTH);
			expect(internal.state.resizePreview).to.be.false;
			expect(internal.state.resizeLiveScale).to.be.null;
		});

		it("should switch to stretching once a redraw misses the frame", async () => {
			generate(true);

			const {internal} = chart;
			const {svg} = internal.$el;
			const redraw = internal.redraw;

			// make the redraw miss the frame budget
			internal.redraw = function(...args) {
				const end = Date.now() + RESIZE_FRAME_BUDGET + 5;

				while (Date.now() < end) {
					// busy wait
				}

				return redraw.apply(this, args);
			};

			shrink();
			await nextFrame();

			// the first frame still redraws: that's what measures the cost
			expect(internal.state.current.width).to.be.equal(RESIZED_WIDTH);
			expect(internal.state.resizeRedrawTime).to.be.above(RESIZE_FRAME_BUDGET);
			expect(internal.state.resizeLiveScale).to.be.true;

			// from here on the rendering is stretched instead
			container.style.width = "300px";
			chart.internal.resizeFunction();
			await nextFrame();

			expect(+svg.attr("width")).to.be.equal(300);
			expect(svg.attr("viewBox")).to.be.equal(`0 0 ${RESIZED_WIDTH} 260`);
			expect(internal.state.current.width).to.be.equal(RESIZED_WIDTH);

			internal.redraw = redraw;
		});

		it("should keep the strategy for the whole resize", async () => {
			generate(true);

			const {internal} = chart;

			internal.state.resizeRedrawTime = RESIZE_FRAME_BUDGET + 1;

			shrink();
			await nextFrame();

			expect(internal.state.resizeLiveScale).to.be.true;

			// a cheap measurement arriving mid resize must not flip the strategy
			internal.state.resizeRedrawTime = 0;

			container.style.width = "300px";
			chart.internal.resizeFunction();
			await nextFrame();

			expect(internal.state.resizeLiveScale).to.be.true;
			expect(internal.state.current.width).to.be.equal(INITIAL_WIDTH);
		});

		it("should redraw on settle even when the size returns to the drawn one", async () => {
			generate(true);

			const {internal} = chart;
			const {svg} = internal.$el;

			internal.state.resizeRedrawTime = RESIZE_FRAME_BUDGET + 1;

			shrink();
			await nextFrame();

			expect(internal.state.resizePreview).to.be.true;

			// back to the drawn size before the delayed resize runs
			container.style.width = `${INITIAL_WIDTH}px`;
			chart.internal.resizeFunction();

			await settle();

			expect(svg.attr("viewBox")).to.be.null;
			expect(+svg.attr("width")).to.be.equal(INITIAL_WIDTH);
			expect(internal.state.resizePreview).to.be.false;
		});

		it("should drop the stretched state on an explicit redraw", async () => {
			generate(true);

			const {internal} = chart;
			const {svg} = internal.$el;

			internal.state.resizeRedrawTime = RESIZE_FRAME_BUDGET + 1;

			shrink();
			await nextFrame();

			expect(internal.state.resizePreview).to.be.true;

			chart.flush();

			expect(svg.attr("viewBox")).to.be.null;
			expect(svg.attr("preserveAspectRatio")).to.be.null;
			expect(internal.state.resizePreview).to.be.false;
		});
	});
});
