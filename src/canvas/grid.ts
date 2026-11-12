/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {GridLineOptions} from "../../types/options";
import {getXTickValues, getYGridTickValues, normalizeYValue} from "./axisTicks";
import type CanvasAxisRenderer from "./CanvasAxisRenderer";
import {getXPosition, isDrawable} from "./CanvasAxisRenderer";
import type {CanvasStyle} from "./CanvasPainter";
import type {CanvasGridLineThemeStyle} from "./CanvasTheme";

type GridLine = Partial<GridLineOptions>;
type GridAxis = "x" | "y";

/**
 * Convert resolved grid line style to painter line style.
 * @param {object} style Grid line style
 * @returns {object|undefined} Canvas line style
 * @private
 */
function getGridLineCanvasStyle(style?: CanvasGridLineThemeStyle): CanvasStyle | undefined {
	return style ?
		{
			stroke: style.lineColor,
			lineWidth: style.lineWidth,
			lineDash: style.dashArray
		} :
		undefined;
}

/**
 * Convert resolved grid text style to painter text style.
 * @param {object} style Grid text style
 * @returns {object|undefined} Canvas text style
 * @private
 */
function getGridTextCanvasStyle(style?: CanvasGridLineThemeStyle): CanvasStyle | undefined {
	return style ?
		{
			fill: style.labelColor,
			font: style.labelFont
		} :
		undefined;
}

/**
 * Get a text position along a grid line.
 * @param {string} position Grid label position
 * @param {number} start Start coordinate
 * @param {number} end End coordinate
 * @returns {number} Label coordinate
 * @private
 */
function getLineTextPosition(position: string | undefined, start: number, end: number): number {
	if (position === "start") {
		return start + 4;
	}

	if (position === "middle") {
		return (start + end) / 2;
	}

	return end - 4;
}

/**
 * Get a text position for labels drawn with SVG-compatible rotate(-90).
 * @param {string} position Grid label position
 * @param {number} start Start coordinate
 * @param {number} end End coordinate
 * @returns {number} Label coordinate
 * @private
 */
function getRotatedLineTextPosition(position: string | undefined, start: number,
	end: number): number {
	if (position === "start") {
		return end - 4;
	}

	if (position === "middle") {
		return (start + end) / 2;
	}

	return start + 4;
}

/**
 * Draw configured x/y grid lines and labels.
 * @param {CanvasAxisRenderer} renderer Canvas axis renderer
 * @param {object} $$ ChartInternal instance
 * @private
 */
function drawGridLines(renderer: CanvasAxisRenderer, $$): void {
	const {ctx, painter, theme: {style: {axis, grid}}} = renderer;
	const {config, scale, state: {height, margin, width}} = $$;
	const isRotated = config.axis_rotated;
	const x1 = margin.left;
	const x2 = margin.left + width;
	const y1 = margin.top;
	const y2 = margin.top + height;

	if (!grid.lineColor) {
		return;
	}

	painter.withState(() => {
		ctx.strokeStyle = grid.lineColor;
		ctx.lineWidth = grid.lineWidth;
		ctx.font = grid.labelFont || axis.labelFont;
		ctx.fillStyle = grid.labelColor;
		ctx.textBaseline = "middle";
		ctx.setLineDash([]);

		const drawLabel = (
			text: string | undefined,
			x: number,
			y: number,
			rotated = false,
			style?: CanvasStyle
		): void => {
			if (!text) {
				return;
			}

			painter.text(text, x, y, {
				...style,
				angle: rotated ? -90 : 0
			});
		};

		const drawLine = (
			line: GridLine,
			axisId: GridAxis,
			draw: () => void
		): void => {
			const style = getGridLineCanvasStyle(
				renderer.theme.getGridLineStyle(axisId, line, "line")
			);

			painter.strokePath(draw, style);
		};
		const getTextStyle = (axisId: GridAxis, line: GridLine): CanvasStyle | undefined =>
			getGridTextCanvasStyle(renderer.theme.getGridLineStyle(axisId, line, "text"));

		const drawXLine = (line: GridLine): void => {
			if (line.value === undefined || !scale.x) {
				return;
			}

			const pos = getXPosition($$, line.value);

			if (!isDrawable(pos)) {
				return;
			}

			if (isRotated) {
				const y = margin.top + pos;

				drawLine(line, "x", () => {
					painter.traceLine(x1, y, x2, y);
				});
				ctx.textAlign = line.position === "start" ?
					"left" :
					(line.position === "middle" ? "center" : "right");
				drawLabel(
					line.text,
					getLineTextPosition(line.position, x1, x2),
					y - 5,
					false,
					getTextStyle("x", line)
				);
			} else {
				const x = margin.left + pos;

				drawLine(line, "x", () => {
					painter.traceLine(x, y1, x, y2);
				});
				ctx.textAlign = line.position === "start" ?
					"left" :
					(line.position === "middle" ? "center" : "right");
				drawLabel(
					line.text,
					x - 5,
					getRotatedLineTextPosition(line.position, y1, y2),
					true,
					getTextStyle("x", line)
				);
			}
		};

		const drawYLine = (line: GridLine): void => {
			const targetScale = line.axis === "y2" ? scale.y2 : scale.y;
			const axisId = line.axis === "y2" ? "y2" : "y";

			if (line.value === undefined || !targetScale) {
				return;
			}

			const value = normalizeYValue($$, line.value, axisId);
			const pos = targetScale(value);

			if (!isDrawable(pos)) {
				return;
			}

			if (isRotated) {
				const x = margin.left + pos;

				drawLine(line, "y", () => {
					painter.traceLine(x, y1, x, y2);
				});
				ctx.textAlign = line.position === "start" ?
					"left" :
					(line.position === "middle" ? "center" : "right");
				drawLabel(
					line.text,
					x - 5,
					getRotatedLineTextPosition(line.position, y1, y2),
					true,
					getTextStyle("y", line)
				);
			} else {
				const y = margin.top + pos;

				drawLine(line, "y", () => {
					painter.traceLine(x1, y, x2, y);
				});
				ctx.textAlign = line.position === "start" ?
					"left" :
					(line.position === "middle" ? "center" : "right");
				drawLabel(
					line.text,
					getLineTextPosition(line.position, x1, x2),
					y - 5,
					false,
					getTextStyle("y", line)
				);
			}
		};

		(config.grid_x_lines || []).forEach(drawXLine);
		(config.grid_y_lines || []).forEach(drawYLine);
	});
}

/**
 * Draw visible grid lines.
 * @param {CanvasAxisRenderer} renderer Canvas axis renderer
 * @param {object} $$ ChartInternal instance
 * @private
 */
function drawGrid(renderer: CanvasAxisRenderer, $$): void {
	const {ctx, painter, theme: {style: {grid}}} = renderer;
	const {config, scale, state: {height, margin, width}} = $$;

	if (!grid.lineColor) {
		return;
	}

	const isRotated = config.axis_rotated;
	const x1 = margin.left;
	const x2 = margin.left + width;
	const y1 = margin.top;
	const y2 = margin.top + height;

	painter.withState(() => {
		ctx.strokeStyle = grid.lineColor;
		ctx.lineWidth = grid.lineWidth;
		grid.dashArray.length && ctx.setLineDash(grid.dashArray);

		if (config.grid_x_show && scale.x) {
			painter.strokePath(() => {
				for (const tick of getXTickValues($$)) {
					const pos = getXPosition($$, tick);

					if (!isDrawable(pos)) {
						continue;
					}

					if (isRotated) {
						painter.traceCrispLine(
							x1,
							margin.top + pos,
							x2,
							margin.top + pos,
							grid.lineWidth
						);
					} else {
						painter.traceCrispLine(
							margin.left + pos,
							y1,
							margin.left + pos,
							y2,
							grid.lineWidth
						);
					}
				}
			});
		}

		if (config.grid_y_show && scale.y) {
			painter.strokePath(() => {
				for (const tick of getYGridTickValues($$)) {
					const value = normalizeYValue($$, tick);
					const pos = scale.y(value);

					if (!isDrawable(pos)) {
						continue;
					}

					if (isRotated) {
						painter.traceCrispLine(
							margin.left + pos,
							y1,
							margin.left + pos,
							y2,
							grid.lineWidth
						);
					} else {
						painter.traceCrispLine(
							x1,
							margin.top + pos,
							x2,
							margin.top + pos,
							grid.lineWidth
						);
					}
				}
			});
		}

		!config.grid_lines_front && drawGridLines(renderer, $$);
	});
}

/**
 * Canvas drawing of the grid lines and the grid line labels.
 * Added to the chart by grid(): bundles without the module do not carry it.
 * The functions are called with the chart (ChartInternal) as `this`.
 */
export default {
	/**
	 * Draw visible grid lines.
	 * @param {CanvasAxisRenderer} renderer Canvas axis renderer
	 * @private
	 */
	draw(renderer: CanvasAxisRenderer): void {
		drawGrid(renderer, this);
	},

	/**
	 * Draw configured x/y grid lines and labels.
	 * @param {CanvasAxisRenderer} renderer Canvas axis renderer
	 * @private
	 */
	drawLines(renderer: CanvasAxisRenderer): void {
		drawGridLines(renderer, this);
	}
};
