/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type CanvasRenderer from "./CanvasRenderer";
import type {CanvasThemeExtension} from "./CanvasTheme";
import type HitDetector from "./HitDetector";

// the section of the canvas theme for heatmap: read from the same stylesheet as SVG
const heatmapTheme: CanvasThemeExtension = {
	section: "heatmap",

	probe({probeIn, axisFont, toColor}) {
		const axis = probeIn("bb-chart-heatmap", "text", "bb-heatmap-axis", ["fill", "font"]);
		const label = probeIn("bb-chart-heatmap", "text", "bb-heatmap-label", ["font"]);

		return {
			axisFont: axis.font || axisFont,
			axisColor: toColor(axis.fill, "#000"),
			labelFont: label.font || axisFont
		};
	},

	selectors: {
		".bb-heatmap-axis": (style, {readColorValue, readFontValue}) => ({
			axisColor: readColorValue(style, "fill"),
			axisFont: readFontValue(style)
		}),
		".bb-heatmap-label": (style, {readFontValue}) => ({
			labelFont: readFontValue(style)
		})
	}
};

// the offset of the baseline from the position, as the dy of the SVG text (em): the same place in both
const BASELINE_DY = {middle: 0.35, top: 0.71, bottom: 0};

/**
 * Draw a text at the place the SVG text is: on the alphabetic baseline, moved by the same dy.
 * The baselines of canvas (the box of the font) are not the ones of SVG, and differ by a pixel or two.
 * @param {CanvasRenderer} renderer Canvas renderer
 * @param {object} d Text with its position, alignment and baseline
 * @param {object} style Font, color and alpha
 * @param {string} style.font Font of the text
 * @param {string} style.fill Color of the text
 * @param {number} [style.alpha] Opacity of the text
 * @private
 */
function drawText(renderer: CanvasRenderer, d,
	style: {font: string, fill: string, alpha?: number}) {
	const size = parseFloat(/(\d+(?:\.\d+)?)px/.exec(style.font)?.[1] ?? "10");

	renderer.painter.text(d.text, d.x, d.y + BASELINE_DY[d.baseline] * size, {
		...style,
		textAlign: d.align,
		textBaseline: "alphabetic"
	});
}

/**
 * Canvas drawing, hit detection and theme of the heatmap type.
 * Added to the chart by heatmap(): bundles without heatmap do not carry it.
 */
export default {
	theme: heatmapTheme,

	/**
	 * Draw the cells, the names and the color bar on canvas.
	 * Layout comes from the shared heatmap layout, same as SVG rendering.
	 * @param {CanvasRenderer} renderer Canvas renderer
	 * @private
	 */
	draw(renderer: CanvasRenderer): void {
		const $$ = this;
		const {painter, theme: {style: {heatmap, shape}}} = renderer;
		const {config} = $$;
		const {cells, axisX, axisY, colorbar} = $$.getHeatmapLayout();
		const radius = config.heatmap_cell_radius;
		const borderWidth = config.heatmap_cell_border_width;

		cells.forEach(d => {
			const rect = {
				x: d.x0,
				y: d.y0,
				w: Math.max(0, d.x1 - d.x0),
				h: Math.max(0, d.y1 - d.y0)
			};
			// focus: same opacity as the SVG elements of the bb-defocused class
			const alpha = $$.isHeatmapDefocused(d.id) ? shape.targetDefocusedOpacity : 1;

			painter.fillRoundRect(rect, radius, {fill: d.color, alpha});
			borderWidth && painter.strokeRoundRect(rect, radius, {
				stroke: config.heatmap_cell_border_color,
				lineWidth: borderWidth,
				alpha
			});

			const text = $$.getHeatmapLabel(d);

			text && drawText(renderer, {
				text,
				x: (d.x0 + d.x1) / 2,
				y: (d.y0 + d.y1) / 2,
				align: "center",
				baseline: "middle"
			}, {fill: $$.getHeatmapLabelColor(d), alpha, font: heatmap.labelFont});
		});

		const drawName = d =>
			drawText(renderer, d, {fill: heatmap.axisColor, font: heatmap.axisFont});

		axisX.forEach(drawName);
		axisY.forEach(drawName);

		if (colorbar) {
			const {x, y, width, height, stops, horizontal} = colorbar;
			const gradient = horizontal ?
				painter.context.createLinearGradient(x, 0, x + width, 0) :
				painter.context.createLinearGradient(0, y, 0, y + height);

			stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
			painter.fillRect({x, y, w: width, h: height}, {fill: gradient});
			colorbar.labels.forEach(drawName);
		}

		$$.fitHeatmapHeight();
	},

	/**
	 * Add the hit items of the cells that have a value.
	 * @param {HitDetector} detector Hit detector
	 * @private
	 */
	hits(detector: HitDetector): void {
		const $$ = this;

		$$.getHeatmapLayout().cells.forEach(d => {
			d.value !== null && detector.addBar({
				x: d.x0,
				y: d.y0,
				w: Math.max(1, d.x1 - d.x0),
				h: Math.max(1, d.y1 - d.y0),
				data: $$.getHeatmapCellData(d)
			});
		});
	}
};
