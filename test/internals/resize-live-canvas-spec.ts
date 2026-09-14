/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, beforeAll, describe, expect, it} from "vitest";
import bb, {canvas, line} from "../../src/index.canvas";
import {RESIZE_FRAME_BUDGET} from "../../src/config/const";

describe("resize.live - canvas", () => {
	let chart;
	let container;

	const INITIAL_WIDTH = 360;
	const RESIZED_WIDTH = 240;
	const TIMER = 500;

	beforeAll(() => {
		canvas();
	});

	afterEach(() => {
		chart?.destroy();
		container?.remove();
		chart = null;
		container = null;
	});

	function nextFrame(): Promise<void> {
		return new Promise(resolve => {
			requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
		});
	}

	function generate(live) {
		container = document.createElement("div");
		container.style.cssText =
			`position:absolute;top:0;left:0;width:${INITIAL_WIDTH}px;height:260px;`;
		document.body.appendChild(container);

		return (chart = bb.generate({
			bindto: container,
			render: {
				mode: canvas()
			},
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
				type: line()
			}
		}));
	}

	function shrink() {
		container.style.width = `${RESIZED_WIDTH}px`;
		chart.internal.resizeFunction();
	}

	it("should stretch the surface without resizing the backing store when too slow", async () => {
		generate(true);

		const {internal} = chart;
		const canvasEl = internal.canvasEngine.canvas;
		const backingWidth = canvasEl.width;

		// as if the previous redraw had been too expensive to run per frame
		internal.state.resizeRedrawTime = RESIZE_FRAME_BUDGET + 1;

		shrink();
		await nextFrame();

		// CSS box follows the container, drawn bitmap is left as is
		expect(canvasEl.style.width).to.be.equal(`${RESIZED_WIDTH}px`);
		expect(canvasEl.width).to.be.equal(backingWidth);
		expect(internal.state.current.width).to.be.equal(INITIAL_WIDTH);
		expect(internal.state.resizePreview).to.be.true;

		await new Promise(resolve => setTimeout(resolve, TIMER + 300));

		expect(canvasEl.style.width).to.be.equal(`${RESIZED_WIDTH}px`);
		expect(canvasEl.width).to.be.below(backingWidth);
		expect(internal.state.current.width).to.be.equal(RESIZED_WIDTH);
		expect(internal.state.resizePreview).to.be.false;
	});

	it("should resize the backing store on the animation frame when fast enough", async () => {
		generate(true);

		const {internal} = chart;
		const canvasEl = internal.canvasEngine.canvas;
		const backingWidth = canvasEl.width;

		shrink();
		await nextFrame();

		expect(canvasEl.width).to.be.below(backingWidth);
		expect(internal.state.current.width).to.be.equal(RESIZED_WIDTH);
		expect(internal.state.resizePreview).to.be.false;
	});

	it("should follow the container's height when it shrinks", async () => {
		generate(false);

		const {internal} = chart;

		expect(Math.round(internal.state.current.height)).to.be.equal(260);

		container.style.height = "180px";
		chart.internal.resizeFunction();

		await new Promise(resolve => setTimeout(resolve, TIMER + 300));

		// the min-height reserved for the surface must not become the floor here
		expect(Math.round(internal.state.current.height)).to.be.equal(180);
		expect(+internal.canvasEngine.canvas.style.height.replace("px", ""))
			.to.be.below(180 + 1);
	});

	it("should keep the height of a container sized by its content", async () => {
		container = document.createElement("div");
		container.style.cssText = `position:absolute;top:0;left:0;width:${INITIAL_WIDTH}px;`;
		document.body.appendChild(container);

		chart = bb.generate({
			bindto: container,
			render: {mode: canvas()},
			transition: {duration: 0},
			resize: {timer: TIMER},
			legend: {position: "bottom"},
			data: {
				columns: [
					["data1", 30, 200, 100, 400],
					["data2", 50, 20, 10, 40]
				],
				type: line()
			}
		});

		const {internal} = chart;
		const height = internal.state.current.height;

		expect(height).to.be.above(0);

		// the container has no height of its own: repeated resizes must not drift
		for (let i = 0; i < 3; i++) {
			container.style.width = `${INITIAL_WIDTH - (i + 1) * 40}px`;
			chart.internal.resizeFunction();

			await new Promise(resolve => setTimeout(resolve, TIMER + 200));

			expect(internal.state.current.height).to.be.equal(height);
		}
	});

	it("shouldn't touch the surface before the delayed resize on default", async () => {
		generate(false);

		const {internal} = chart;
		const canvasEl = internal.canvasEngine.canvas;
		const backingWidth = canvasEl.width;

		shrink();
		await nextFrame();

		expect(canvasEl.width).to.be.equal(backingWidth);
		expect(internal.state.current.width).to.be.equal(INITIAL_WIDTH);
	});
});
