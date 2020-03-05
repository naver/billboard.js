/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {document, window} from "../internals/browser";
import {extend} from "./util";

extend(ChartInternal.prototype, {
	initClip() {
		const $$ = this;

		// MEMO: clipId needs to be unique because it conflicts when multiple charts exist
		$$.clipId = `${$$.datetimeId}-clip`;

		$$.clipIdForXAxis = `${$$.clipId}-xaxis`;
		$$.clipIdForYAxis = `${$$.clipId}-yaxis`;
		$$.clipIdForGrid = `${$$.clipId}-grid`;

		// Define 'clip-path' attribute values
		$$.clipPath = $$.getClipPath($$.clipId);
		$$.clipPathForXAxis = $$.getClipPath($$.clipIdForXAxis);
		$$.clipPathForYAxis = $$.getClipPath($$.clipIdForYAxis);
		$$.clipPathForGrid = $$.getClipPath($$.clipIdForGrid);
	},

	getClipPath(id) {
		const $$ = this;
		const config = $$.config;

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

	appendClip(parent, id) {
		return parent.append("clipPath")
			.attr("id", id)
			.append("rect");
	},

	getAxisClipX(forHorizontal) {
		// axis line width + padding for left
		const left = Math.max(30, this.margin.left);

		return forHorizontal ? -(1 + left) : -(left - 1);
	},

	getAxisClipY(forHorizontal) {
		return forHorizontal ? -20 : -this.margin.top;
	},

	getXAxisClipX() {
		const $$ = this;

		return $$.getAxisClipX(!$$.config.axis_rotated);
	},

	getXAxisClipY() {
		const $$ = this;

		return $$.getAxisClipY(!$$.config.axis_rotated);
	},

	getYAxisClipX() {
		const $$ = this;

		return $$.config.axis_y_inner ?
			-1 : $$.getAxisClipX($$.config.axis_rotated);
	},

	getYAxisClipY() {
		const $$ = this;

		return $$.getAxisClipY($$.config.axis_rotated);
	},

	getAxisClipWidth(forHorizontal) {
		const $$ = this;
		const left = Math.max(30, $$.margin.left);
		const right = Math.max(30, $$.margin.right);

		// width + axis line width + padding for left/right
		return forHorizontal ?
			$$.width + 2 + left + right : $$.margin.left + 20;
	},

	getAxisClipHeight(forHorizontal) {
		// less than 20 is not enough to show the axis label 'outer' without legend
		return (forHorizontal ? this.margin.bottom : (this.margin.top + this.height)) + 20;
	},

	getXAxisClipWidth() {
		const $$ = this;

		return $$.getAxisClipWidth(!$$.config.axis_rotated);
	},

	getXAxisClipHeight() {
		const $$ = this;

		return $$.getAxisClipHeight(!$$.config.axis_rotated);
	},

	getYAxisClipWidth() {
		const $$ = this;

		return $$.getAxisClipWidth($$.config.axis_rotated) + ($$.config.axis_y_inner ? 20 : 0);
	},

	getYAxisClipHeight() {
		const $$ = this;

		return $$.getAxisClipHeight($$.config.axis_rotated);
	},

	updateXAxisTickClip() {
		const $$ = this;
		const newXAxisHeight = $$.getHorizontalAxisHeight("x");

		$$.clipIdForXAxisTickTexts = `${$$.clipId}-xaxisticktexts`;
		$$.clipPathForXAxisTickTexts = $$.getClipPath($$.clipIdForXAxisTickTexts);

		if (!$$.config.axis_x_tick_multiline &&
			$$.getAxisTickRotate("x") &&
			newXAxisHeight !== $$.xAxisHeight
		) {
			$$.setXAxisTickClipWidth();
			$$.setXAxisTickTextClipPathWidth();
		}

		$$.xAxisHeight = newXAxisHeight;
	},

	setXAxisTickClipWidth() {
		const $$ = this;
		const config = $$.config;
		const xAxisTickRotate = $$.getAxisTickRotate("x");

		if (!config.axis_x_tick_multiline && xAxisTickRotate) {
			const sinRotation = Math.sin(Math.PI / 180 * Math.abs(xAxisTickRotate));

			$$.xAxisTickClipPathMaxWidth = ($$.getHorizontalAxisHeight("x") - 20) / sinRotation;
		} else {
			$$.xAxisTickClipPathMaxWidth = null;
		}
	},

	setXAxisTickTextClipPathWidth() {
		const $$ = this;

		if ($$.svg) {
			$$.svg.select(`#${$$.clipIdForXAxisTickTexts} rect`)
				.attr("width", $$.xAxisTickClipPathMaxWidth)
				.attr("height", 30);
		}
	}
});
