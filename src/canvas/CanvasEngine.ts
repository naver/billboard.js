/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {document, window} from "../module/browser";
import {$CANVAS} from "./classes";

/**
 * Manage canvas element sizing, frame buffering and drawing context state.
 * @private
 */
export default class CanvasEngine {
	public canvas!: HTMLCanvasElement;
	public ctx!: CanvasRenderingContext2D;

	private dpr = 1;
	private frame: HTMLCanvasElement | null = null;
	private frameCtx: CanvasRenderingContext2D | null = null;
	private frameValid = false;

	/**
	 * Create and attach the canvas element.
	 * @param {HTMLElement} container Chart container
	 * @param {number} w Canvas width
	 * @param {number} h Canvas height
	 * @private
	 */
	init(container: HTMLElement, w: number, h: number): void {
		this.canvas = document.createElement("canvas");
		this.canvas.className = $CANVAS.canvas;
		this.canvas.style.display = "block";

		container.appendChild(this.canvas);

		this.dpr = window.devicePixelRatio || 1;
		this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		this.resize(w, h);
	}

	/**
	 * Resize the canvas backing store and CSS box.
	 * @param {number} w Canvas width
	 * @param {number} h Canvas height
	 * @private
	 */
	resize(w: number, h: number): void {
		const width = Math.max(0, w);
		const height = Math.max(0, h);

		// re-read: dpr changes when the window moves across monitors or zoom changes
		this.dpr = window.devicePixelRatio || 1;

		this.canvas.width = width * this.dpr;
		this.canvas.height = height * this.dpr;
		this.canvas.style.width = `${width}px`;
		this.canvas.style.height = `${height}px`;
		this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
		this.frame = null;
		this.frameCtx = null;
		this.frameValid = false;
	}

	/**
	 * Clear transient overlay drawings by restoring the captured frame.
	 * @private
	 */
	clearOverlay(): void {
		this.frameValid && this.restoreFrame();
	}

	/**
	 * Draw transient overlay content on the single visible canvas.
	 * @param {function} draw Draw callback
	 * @private
	 */
	withOverlay(draw: (ctx: CanvasRenderingContext2D) => void): void {
		const {ctx} = this;
		const hasFrame = this.frameValid;

		if (hasFrame) {
			this.clearOverlay();
		} else {
			// Copy the clean frame only when an overlay is actually requested.
			// Large filled charts make eager full-canvas copies expensive.
			this.captureFrame();
		}
		ctx.save();
		ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
		try {
			draw(ctx);
		} finally {
			ctx.restore();
		}
	}

	/**
	 * Prepare the context for a new frame.
	 * @param {number} w Canvas width
	 * @param {number} h Canvas height
	 * @private
	 */
	beginFrame(w: number, h: number): void {
		const {ctx} = this;

		this.frameValid = false;
		ctx.save();
		ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
		ctx.clearRect(0, 0, w, h);
	}

	/**
	 * Restore context state after drawing a frame.
	 * @private
	 */
	endFrame(): void {
		this.ctx.restore();
	}

	/**
	 * Capture the rendered frame for focus overlay restoration.
	 * @private
	 */
	captureFrame(): void {
		const {canvas} = this;

		this.frameValid = false;

		if (canvas.width && canvas.height) {
			let {frame, frameCtx} = this;

			if (!frame) {
				const newFrame = document.createElement("canvas") as HTMLCanvasElement;

				frame = newFrame;
				frameCtx = newFrame.getContext("2d");
				this.frame = frame;
				this.frameCtx = frameCtx;
			}

			if (!frame || !frameCtx) {
				return;
			}

			// assigning width/height reallocates and clears the backing store,
			// so only assign on size change and clearRect otherwise
			frameCtx.setTransform(1, 0, 0, 1, 0, 0);

			if (frame.width !== canvas.width || frame.height !== canvas.height) {
				frame.width = canvas.width;
				frame.height = canvas.height;
			} else {
				frameCtx.clearRect(0, 0, canvas.width, canvas.height);
			}

			frameCtx.drawImage(canvas, 0, 0);
			this.frameValid = true;
		}
	}

	/**
	 * Restore the latest captured frame.
	 * @private
	 */
	restoreFrame(): void {
		if (!this.frameValid || !this.frame || !this.frameCtx) {
			return;
		}

		const {canvas, ctx} = this;

		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(this.frame, 0, 0);
		ctx.restore();
		ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
	}

	/**
	 * Remove canvas resources.
	 * @private
	 */
	destroy(): void {
		this.canvas?.remove();
		this.frame = null;
		this.frameCtx = null;
		this.frameValid = false;
	}
}
