/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {document, window} from "../../module/browser";

export default {
	initClip(): void {
		const $$ = this;
		const {clip, datetimeId} = $$.state;

		// MEMO: clipId needs to be unique because it conflicts when multiple charts exist
		clip.id = `${datetimeId}-clip`;

		clip.idXAxis = `${clip.id}-xaxis`;
		clip.idYAxis = `${clip.id}-yaxis`;
		clip.idGrid = `${clip.id}-grid`;

		// Define 'clip-path' attribute values
		clip.path = $$.getClipPath(clip.id);
		clip.pathXAxis = $$.getClipPath(clip.idXAxis);
		clip.pathYAxis = $$.getClipPath(clip.idYAxis);
		clip.pathGrid = $$.getClipPath(clip.idGrid);
	},

	getClipPath(id: string): string | null {
		const $$ = this;
		const {config} = $$;

		if ((!config.clipPath && /-clip$/.test(id)) ||
			(!config.axis_x_clipPath && /-clip-xaxis$/.test(id)) ||
			(!config.axis_y_clipPath && /-clip-yaxis$/.test(id))) {
			return null;
		}

		const isIE9 = window.navigator ?
			window.navigator.appVersion
				.toLowerCase().indexOf("msie 9.") >= 0 : false;

		return `url(${(isIE9 ? "" : document.URL.split("#")[0])}#${id})`;
	},

	appendClip(parent, id: string): void {
		id && parent.append("clipPath")
			.attr("id", id)
			.append("rect");
	},

	/**
	 * Set x Axis clipPath dimension
	 * @param {d3Selecton} node clipPath <rect> selection
	 * @private
	 */
	setXAxisClipPath(node): void {
		const $$ = this;
		const {config, state: {margin, width, height}} = $$;
		const isRotated = config.axis_rotated;
		const left = Math.max(30, margin.left) - (isRotated ? 0 : 20);

		const x = isRotated ? -(1 + left) : -(left - 1);
		const y = -Math.max(15, margin.top);
		const w = isRotated ? margin.left + 20 : width + 10 + left;

		// less than 20 is not enough to show the axis label 'outer' without legend
		const h = (isRotated ? (margin.top + height) + 10 : margin.bottom) + 20;

		node
			.attr("x", x)
			.attr("y", y)
			.attr("width", w)
			.attr("height", h);
	},

	/**
	 * Set y Axis clipPath dimension
	 * @param {d3Selecton} node clipPath <rect> selection
	 * @private
	 */
	setYAxisClipPath(node): void {
		const $$ = this;
		const {config, state: {margin, width, height}} = $$;
		const isRotated = config.axis_rotated;
		const left = Math.max(30, margin.left) - (isRotated ? 20 : 0);
		const isInner = config.axis_y_inner;

		const x = isInner && !isRotated ? (config.axis_y_label.text ? -20 : -1) :
			(isRotated ? -(1 + left) : -(left - 1));
		const y = -(isRotated ? 20 : margin.top);
		const w = (isRotated ? width + 15 + left : margin.left + 20) + (isInner ? 20 : 0);
		const h = (isRotated ? margin.bottom + (config.padding?.mode === "fit" ? 10 : 0) : (margin.top + height)) + 10;

		node
			.attr("x", x)
			.attr("y", y)
			.attr("width", w)
			.attr("height", h);
	},

	updateXAxisTickClip(): void {
		const $$ = this;
		const {config, state: {clip, xAxisHeight}, $el: {defs}} = $$;
		const newXAxisHeight = $$.getHorizontalAxisHeight("x");

		if (defs && !clip.idXAxisTickTexts) {
			const clipId = `${clip.id}-xaxisticktexts`;

			$$.appendClip(defs, clipId);
			clip.pathXAxisTickTexts = $$.getClipPath(clip.idXAxisTickTexts);
			clip.idXAxisTickTexts = clipId;
		}

		if (!config.axis_x_tick_multiline &&
			$$.getAxisTickRotate("x") &&
			newXAxisHeight !== xAxisHeight
		) {
			$$.setXAxisTickClipWidth();
			$$.setXAxisTickTextClipPathWidth();
		}

		$$.state.xAxisHeight = newXAxisHeight;
	},

	setXAxisTickClipWidth(): void {
		const $$ = this;
		const {config, state: {current: {maxTickWidths}}} = $$;

		const xAxisTickRotate = $$.getAxisTickRotate("x");

		if (!config.axis_x_tick_multiline && xAxisTickRotate) {
			const sinRotation = Math.sin(Math.PI / 180 * Math.abs(xAxisTickRotate));

			maxTickWidths.x.clipPath = ($$.getHorizontalAxisHeight("x") - 20) / sinRotation;
		} else {
			maxTickWidths.x.clipPath = null;
		}
	},

	setXAxisTickTextClipPathWidth(): void {
		const $$ = this;
		const {state: {clip, current}, $el: {svg}} = $$;

		if (svg) {
			svg.select(`#${clip.idXAxisTickTexts} rect`)
				.attr("width", current.maxTickWidths.x.clipPath)
				.attr("height", 30);
		}
	}
};
