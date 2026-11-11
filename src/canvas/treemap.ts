/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {getTreemapLabelText, getTreemapNodeRect} from "../ChartInternal/shape/core/geometry";
import type CanvasRenderer from "./CanvasRenderer";
import type HitDetector from "./HitDetector";
import {drawLabelDecorations, getLabelColor} from "./labels";
import {getFontSize, isCanvasTreemapType, isFiniteCanvasCoordinate} from "./util";

/**
 * Canvas drawing and hit detection of the treemap type.
 * Added to the chart by treemap(): bundles without treemap do not carry it.
 */
export default {
	// treemap is laid out over the whole chart: nothing of the axis types is drawn with it
	exclusive: true,

	/**
	 * Draw treemap tiles and labels on canvas.
	 * @param {CanvasRenderer} renderer Canvas renderer
	 * @private
	 */
	draw(renderer: CanvasRenderer): void {
		const $$ = this;
		const {ctx, painter, theme: {style}} = renderer;
		const {config} = $$;
		const root = $$.getTreemapRoot?.($$.data.targets);
		const nodes = root?.children || [];

		painter.withState(() => {
			ctx.lineWidth = style.treemap.lineWidth;
			ctx.strokeStyle = style.treemap.stroke;

			for (const node of nodes) {
				const {data} = node;

				if (!isCanvasTreemapType($$, data)) {
					continue;
				}

				const {x, y, w, h} = getTreemapNodeRect($$, node, root, true);

				if (
					!isFiniteCanvasCoordinate(x, y) ||
					!isFiniteCanvasCoordinate(x + w, y + h) ||
					w <= 0 ||
					h <= 0
				) {
					continue;
				}

				const rect = {x, y, w, h};

				ctx.fillStyle = $$.color(data.name);
				painter.fillRect(rect);
				painter.strokeRect(rect);

				if (
					!config.treemap_label_show ||
					(data.ratio || 0) < (config.treemap_label_threshold || 0)
				) {
					continue;
				}

				const label = getTreemapLabelText($$, data, w, h);

				if (!label) {
					continue;
				}

				const lines = label.split("\n");
				const isCentered = !!config.data_labels.centered;

				ctx.font = style.label.font;
				const lineHeight = getFontSize(ctx.font);
				const metrics = ctx.measureText(lines[0] ?? "");
				const fontBoundingHeight = (
					(metrics.fontBoundingBoxAscent || 0) +
					(metrics.fontBoundingBoxDescent || 0)
				) || (
					(metrics.actualBoundingBoxAscent || 0) +
					(metrics.actualBoundingBoxDescent || 0)
				);
				const textHeight = Math.max(lineHeight, fontBoundingHeight) +
					((lines.length - 1) * lineHeight);
				const blockY = isCentered ? y + h / 2 : y + textHeight + 5;
				let textX = isCentered ? x + w / 2 : x + 5;
				let textY = blockY - (lines.length - 1) * lineHeight / (isCentered ? 2 : 1);

				ctx.textAlign = isCentered ? "center" : "left";
				ctx.textBaseline = isCentered ? "middle" : "alphabetic";
				({x: textX, y: textY} = renderer.drawLabelImage($$, data, label, textX, textY));
				ctx.fillStyle = getLabelColor($$, data, style.label.color);
				drawLabelDecorations(
					$$,
					painter,
					data,
					label,
					textX,
					isCentered ? textY + ((lines.length - 1) * lineHeight / 2) : blockY
				);

				lines.forEach((line, i) => {
					painter.text(line, textX, textY + i * lineHeight, {
						maxWidth: Math.max(0, w - 8)
					});
				});
			}
		});
	},

	/**
	 * Add hit items of each treemap tile.
	 * @param {HitDetector} detector Hit detector
	 * @private
	 */
	hits(detector: HitDetector): void {
		const $$ = this;
		const root = $$.getTreemapRoot?.($$.data.targets);
		const nodes = root?.children || [];

		for (const node of nodes) {
			const {data} = node;

			if (!isCanvasTreemapType($$, data)) {
				continue;
			}

			const {x, y, w, h} = getTreemapNodeRect($$, node, root, true);

			if (
				!isFiniteCanvasCoordinate(x, y) ||
				!isFiniteCanvasCoordinate(x + w, y + h)
			) {
				continue;
			}

			detector.addBar({x, y, w, h, data});
		}
	}
};
