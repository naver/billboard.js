/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isNumber} from "../module/util";
import type CanvasPainter from "./CanvasPainter";
import type CanvasRenderer from "./CanvasRenderer";
import {getCanvasTargetFocusOpacity} from "./CanvasRenderer";
import type {CanvasThemeExtension} from "./CanvasTheme";
import type HitDetector from "./HitDetector";
import {getLabelPosition, getLabelText} from "./labels";

/**
 * Draw the quantitative scale axis of a bullet row, mirroring the d3 axis used by SVG.
 * @param {CanvasPainter} painter Canvas painter
 * @param {object} axis Bullet axis geometry
 * @param {object} style Bullet theme style
 * @private
 */
function drawAxis(painter: CanvasPainter, axis, style): void {
	const {scale, ticks, format, rotated, x, y} = axis;
	const [start, end] = scale.range();
	const tickSize = 6;
	const textStyle = {
		fill: style.axisColor,
		font: style.axisFont,
		textAlign: rotated ? "right" : "center",
		textBaseline: rotated ? "middle" : "top"
	} as const;

	painter.withTranslation(x, y, () => {
		painter.strokePath(() => {
			// domain line, then a tick per value
			rotated ? painter.traceLine(0, start, 0, end) : painter.traceLine(start, 0, end, 0);

			ticks.forEach(value => {
				const pos = scale(value);

				rotated ?
					painter.traceLine(0, pos, -tickSize, pos) :
					painter.traceLine(pos, 0, pos, tickSize);
			});
		}, {stroke: style.axisColor, lineWidth: 1});

		ticks.forEach(value => {
			const pos = scale(value);

			rotated ?
				painter.text(format(value), -(tickSize + 3), pos, textStyle) :
				painter.text(format(value), pos, tickSize + 3, textStyle);
		});
	});
}

// the section of the canvas theme for bullet: read from the same stylesheet as SVG
const bulletTheme: CanvasThemeExtension = {
	section: "bullet",

	probe({probeIn, probeInNested, axisFont, toColor, toNumber}) {
		const target = probeIn("bb-chart-bullets", "line", "bb-bullet-target", [
			"stroke",
			"stroke-width"
		]);
		const title = probeIn("bb-chart-bullets", "text", "bb-bullet-title", ["fill", "font"]);
		const range = probeIn("bb-chart-bullets", "rect", "bb-bullet-range", [
			"--bb-bullet-range-min",
			"--bb-bullet-range-max"
		]);
		const axis = probeInNested("bb-chart-bullets", "bb-bullet-axis", "text", "", [
			"fill",
			"font"
		]);

		return {
			targetStroke: toColor(target.stroke, "#000"),
			targetLineWidth: toNumber(target["stroke-width"], 2),
			// lightness (%) of the first and the last default range band
			rangeMin: toNumber(range["--bb-bullet-range-min"], 55),
			rangeMax: toNumber(range["--bb-bullet-range-max"], 90),
			axisFont: axis.font || axisFont,
			axisColor: toColor(axis.fill, "#000"),
			titleFont: title.font || axis.font || axisFont,
			titleColor: toColor(title.fill, "#000")
		};
	},

	selectors: {
		".bb-chart-bullets .bb-bullet-target": (style, {readColorValue, readNumberValue}) => ({
			targetStroke: readColorValue(style, "stroke"),
			targetLineWidth: readNumberValue(style, "stroke-width")
		}),
		".bb-bullet-target": (style, {readColorValue, readNumberValue}) => ({
			targetStroke: readColorValue(style, "stroke"),
			targetLineWidth: readNumberValue(style, "stroke-width")
		}),
		".bb-chart-bullets .bb-bullet-axis text": (style, {readColorValue, readFontValue}) => ({
			axisColor: readColorValue(style, "fill"),
			axisFont: readFontValue(style)
		}),
		".bb-bullet-axis text": (style, {readColorValue, readFontValue}) => ({
			axisColor: readColorValue(style, "fill"),
			axisFont: readFontValue(style)
		}),
		".bb-chart-bullets .bb-bullet-title": (style, {readColorValue, readFontValue}) => ({
			titleColor: readColorValue(style, "fill"),
			titleFont: readFontValue(style)
		}),
		".bb-bullet-title": (style, {readColorValue, readFontValue}) => ({
			titleColor: readColorValue(style, "fill"),
			titleFont: readFontValue(style)
		})
	},

	normalize(section, {toNumber}) {
		section.targetLineWidth = toNumber(section.targetLineWidth, 2);
	}
};

/**
 * Canvas drawing, hit detection and theme of the bullet type.
 * Added to the chart by bullet(): bundles without bullet do not carry it.
 */
export default {
	customCanvasTheme: bulletTheme,

	/**
	 * Draw bullet rows on canvas.
	 * Layout comes from the shared bullet row geometry, same as SVG rendering.
	 * @param {CanvasRenderer} renderer Canvas renderer
	 * @private
	 */
	drawCustomTypeOnCanvas(renderer: CanvasRenderer): void {
		const $$ = this;
		const {ctx, painter, theme: {style}} = renderer;
		const {bullet} = style;
		const {config} = $$;
		// the layout is computed once: it is the same for every row
		const layout = $$.getBulletLayout();
		// the data label of a bullet is for its measure: the last value, same as SVG
		const lastValues: Map<string, any> | null = $$.hasDataLabel() && config.bullet_label_show ?
			new Map(
				$$.data.targets.filter($$.isBulletType, $$)
					.map((t): [string, any] => [t.id, t.values[t.values.length - 1]])
			) :
			null;
		const texts = {size: () => layout.rows.length};

		for (const d of layout.rows) {
			// a hidden row keeps its slot, same as SVG
			if (!$$.isTargetToShow(d.id)) {
				continue;
			}

			const {area, offset, ranges, isDot, measure, color, targets, axis, label, title} = $$
				.getBulletRowGeometry(d, layout);

			painter.withState(() => {
				ctx.globalAlpha = getCanvasTargetFocusOpacity($$, d);
				ctx.translate(area.left + offset.x, area.top + offset.y);

				// qualitative range bands
				ranges.forEach(({x, y, width, height, fill, t}) => {
					painter.fillRect({x, y, w: width, h: height}, {
						fill: fill ??
							`hsl(0, 0%, ${
								bullet.rangeMin + t * (bullet.rangeMax - bullet.rangeMin)
							}%)`
					});
				});

				// measure (bar or dot)
				if (isDot) {
					painter.fillPath(() => painter.traceCircle(measure.cx, measure.cy, measure.r), {
						fill: color
					});
				} else {
					painter.fillRect(
						{x: measure.x, y: measure.y, w: measure.width, h: measure.height},
						{fill: color}
					);
				}

				// comparative target markers
				targets.forEach(target => {
					painter.strokePath(
						() => painter.traceLine(target.x1, target.y1, target.x2, target.y2),
						{stroke: bullet.targetStroke, lineWidth: bullet.targetLineWidth}
					);
				});

				axis && drawAxis(painter, axis, bullet);

				title && painter.text(title.text, title.x, title.y, {
					fill: bullet.titleColor,
					font: bullet.titleFont,
					textAlign: title.anchor === "end" ? "right" : "center",
					textBaseline: title.anchor === "end" ? "middle" : "alphabetic"
				});

				const datum = lastValues?.get(d.id);
				const text = datum && (isNumber(datum.value) || datum.value) ?
					getLabelText($$, datum) :
					null;

				if (text) {
					const centered = config.data_labels.centered;
					const anchor = centered ? label.center : label;
					const isRotated = config.bullet_rotated;

					ctx.font = style.label.font;
					ctx.textAlign = centered || isRotated ? "center" : "left";
					// beside the measure the label is centered on the row, above it on the baseline
					ctx.textBaseline = centered || !isRotated ? "middle" : "alphabetic";

					renderer.drawDataLabel(
						$$,
						datum,
						text,
						anchor.x + getLabelPosition($$, datum, "x", texts),
						anchor.y + getLabelPosition($$, datum, "y", texts)
					);
				}
			});
		}
	},

	/**
	 * Add hit items of each visible bullet row: the measure and the target marker.
	 * Range bands are intentionally not hit targets, same as SVG.
	 * @param {HitDetector} detector Hit detector
	 * @private
	 */
	addCustomTypeHitsOnCanvas(detector: HitDetector): void {
		const $$ = this;
		const layout = $$.getBulletLayout();
		const margin = 4;

		layout.rows.forEach(d => {
			if (!$$.isTargetToShow(d.id)) {
				return;
			}

			const {area, offset, isDot, measure, targets} = $$.getBulletRowGeometry(d, layout);
			const left = area.left + offset.x;
			const top = area.top + offset.y;
			const rect = isDot ?
				{
					x: measure.cx - measure.r,
					y: measure.cy - measure.r,
					w: measure.r * 2,
					h: measure.r * 2
				} :
				{x: measure.x, y: measure.y, w: measure.width, h: measure.height};

			detector.addBar({x: left + rect.x, y: top + rect.y, w: rect.w, h: rect.h, data: d});

			// widen the thin target lines so they can be hovered
			targets.forEach(target => {
				detector.addBar({
					x: left + Math.min(target.x1, target.x2) - margin,
					y: top + Math.min(target.y1, target.y2) - margin,
					w: Math.abs(target.x2 - target.x1) + margin * 2,
					h: Math.abs(target.y2 - target.y1) + margin * 2,
					data: d
				});
			});
		});
	}
};
