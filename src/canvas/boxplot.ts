/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {getRenderPoint, getRenderRect} from "../ChartInternal/shape/core/geometry";
import {getCanvasTargetFocusOpacity, isCanvasRenderableTarget} from "./CanvasRenderer";
import type CanvasRenderer from "./CanvasRenderer";
import type {CanvasThemeExtension} from "./CanvasTheme";
import type HitDetector from "./HitDetector";
import {getCanvasShapeIndices, getCanvasTargetVisibleRange} from "./util";

// the section of the canvas theme for boxplot: read from the same stylesheet as SVG
const boxplotTheme: CanvasThemeExtension = {
	section: "boxplot",

	probe({probeIn, toColor, toNumber}) {
		const box = probeIn("bb-chart-boxplot", "path", "bb-boxplot-box", [
			"stroke",
			"stroke-width",
			"fill-opacity"
		]);
		const whisker = probeIn("bb-chart-boxplot", "path", "bb-boxplot-whisker", ["stroke-width"]);
		const median = probeIn("bb-chart-boxplot", "path", "bb-boxplot-median", ["stroke-width"]);
		const outlier = probeIn("bb-chart-boxplot", "path", "bb-boxplot-outlier", [
			"stroke-width"
		]);
		const mean = probeIn("bb-chart-boxplot", "path", "bb-boxplot-mean", ["fill"]);

		return {
			stroke: toColor(box.stroke, "#000"),
			boxLineWidth: toNumber(box["stroke-width"], 1),
			boxOpacity: toNumber(box["fill-opacity"], 0.7),
			whiskerLineWidth: toNumber(whisker["stroke-width"], 1),
			medianLineWidth: toNumber(median["stroke-width"], 2),
			outlierLineWidth: toNumber(outlier["stroke-width"], 1),
			meanFill: toColor(mean.fill, "#fff")
		};
	},

	selectors: {
		".bb-boxplot-box": (style, {readColorValue, readNumberValue}) => ({
			stroke: readColorValue(style, "stroke"),
			boxLineWidth: readNumberValue(style, "stroke-width"),
			boxOpacity: readNumberValue(style, "fill-opacity")
		}),
		".bb-boxplot-whisker": (style, {readNumberValue}) => ({
			whiskerLineWidth: readNumberValue(style, "stroke-width")
		}),
		".bb-boxplot-median": (style, {readNumberValue}) => ({
			medianLineWidth: readNumberValue(style, "stroke-width")
		}),
		".bb-boxplot-outlier": (style, {readNumberValue}) => ({
			outlierLineWidth: readNumberValue(style, "stroke-width")
		}),
		".bb-boxplot-mean": (style, {readColorValue}) => ({
			meanFill: readColorValue(style, "fill")
		})
	}
};

/**
 * Get the box geometry of a data row, in the coordinates of the canvas.
 * @param {object} $$ ChartInternal instance
 * @param {function} getPoints Function from generateGetBoxplotPoints()
 * @param {object} d Data row
 * @param {number} i Data index
 * @returns {object|null} Box, median and whisker
 * @private
 */
function getGeometry($$, getPoints, d, i: number) {
	const points = getPoints(d, i);

	if (!points) {
		return null;
	}

	const [[x0, q1], [x1, q3], [xc, min, max], [median], outliers, mean] = points;
	const R = (x: number, y: number) => getRenderPoint($$, [x, y]);
	const cap = (x1 - x0) * $$.config.boxplot_whisker_width / 2;
	const m = $$.config.boxplot_mean_r;

	return {
		box: getRenderRect($$, [[x0, q1], [x1, q3]]),
		median: [R(x0, median), R(x1, median)],
		whisker: [
			[R(xc, max), R(xc, q3)],
			[R(xc, q1), R(xc, min)],
			...(cap > 0 ?
				[
					[R(xc - cap, max), R(xc + cap, max)],
					[R(xc - cap, min), R(xc + cap, min)]
				] :
				[])
		],
		outliers: outliers.map(v => R(xc, v)),
		mean: mean.map(v => [R(xc - m, v), R(xc, v - m), R(xc + m, v), R(xc, v + m)])
	};
}

/**
 * Canvas drawing, hit detection and theme of the boxplot type.
 * Added to the chart by boxplot(): bundles without boxplot do not carry it.
 */
export default {
	theme: boxplotTheme,

	/**
	 * Draw the boxes on canvas.
	 * @param {CanvasRenderer} renderer Canvas renderer
	 * @param {object} shape Cached draw shape object
	 * @private
	 */
	draw(renderer: CanvasRenderer, shape): void {
		const $$ = this;
		const {ctx, painter, theme: {style: {boxplot}}} = renderer;
		const {margin} = $$.state;
		const r = $$.config.boxplot_outlier_r;
		const isBoxplot = $$.isBoxplotType.bind($$);
		const getPoints = $$.generateGetBoxplotPoints(
			getCanvasShapeIndices($$, shape, "boxplot", isBoxplot),
			false
		);

		painter.withTranslation(margin.left, margin.top, () => {
			$$.filterTargetsToShow()
				.filter(isBoxplot)
				.filter(target => isCanvasRenderableTarget($$, target))
				.forEach(target => {
					const range = getCanvasTargetVisibleRange($$, target);
					const alpha = getCanvasTargetFocusOpacity($$, target);

					for (let i = range.start; i < range.end; i++) {
						const d = target.values[i];
						const geometry = getGeometry($$, getPoints, d, i);

						if (!geometry) {
							continue;
						}

						const stroke = boxplot.stroke;

						ctx.strokeStyle = stroke;
						ctx.globalAlpha = alpha;

						boxplot.whiskerLineWidth > 0 && painter.strokePath(() => {
							geometry.whisker.forEach(([a, b]) =>
								painter.traceLine(a[0], a[1], b[0], b[1])
							);
						}, {lineWidth: boxplot.whiskerLineWidth, stroke, alpha});

						painter.fillRect(geometry.box, {
							fill: $$.color(d),
							alpha: boxplot.boxOpacity * alpha
						});
						boxplot.boxLineWidth > 0 && painter.strokeRect(geometry.box, {
							stroke,
							lineWidth: boxplot.boxLineWidth,
							alpha
						});

						const [a, b] = geometry.median;

						painter.strokePath(() => painter.traceLine(a[0], a[1], b[0], b[1]), {
							lineWidth: boxplot.medianLineWidth,
							stroke,
							alpha
						});

						geometry.outliers.length && painter.strokePath(() => {
							geometry.outliers.forEach(([x, y]) => {
								ctx.moveTo(x + r, y);
								ctx.arc(x, y, r, 0, Math.PI * 2);
							});
						}, {lineWidth: boxplot.outlierLineWidth, stroke, alpha});

						geometry.mean.forEach(([p0, p1, p2, p3]) => {
							ctx.beginPath();
							ctx.moveTo(p0[0], p0[1]);
							[p1, p2, p3].forEach(p => ctx.lineTo(p[0], p[1]));
							ctx.closePath();
							ctx.globalAlpha = alpha;
							ctx.fillStyle = boxplot.meanFill;
							ctx.fill();
							ctx.strokeStyle = stroke;
							ctx.lineWidth = boxplot.boxLineWidth;
							ctx.stroke();
						});
					}
					ctx.globalAlpha = 1;
				});
		});
	},

	/**
	 * Add the hit items of the boxes.
	 * @param {HitDetector} detector Hit detector
	 * @param {object} context Shape, targets, margin and the index registration of the detector
	 * @param {object} context.shape Shape helpers of the chart
	 * @param {Array} context.targets Data targets
	 * @param {object} context.margin Margin of the chart
	 * @param {function} context.addIndex Register the index of a hit item
	 * @private
	 */
	hits(detector: HitDetector, {shape, targets, margin, addIndex}): void {
		const $$ = this;
		const isBoxplot = $$.isBoxplotType.bind($$);
		const getPoints = $$.generateGetBoxplotPoints(
			getCanvasShapeIndices($$, shape, "boxplot", isBoxplot),
			false
		);

		targets.filter(isBoxplot).forEach(target => {
			const range = getCanvasTargetVisibleRange($$, target);

			for (let i = range.start; i < range.end; i++) {
				const d = target.values[i];
				const geometry = getGeometry($$, getPoints, d, i);

				if (!geometry) {
					continue;
				}

				const {x, y, w, h} = geometry.box;

				detector.addBar({x: margin.left + x, y: margin.top + y, w, h, data: d});
				addIndex(margin.left + x + w / 2, margin.top + y + h / 2, d);
			}
		});
	}
};
