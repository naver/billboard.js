/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import { getFontSize } from './util.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Centralized canvas drawing gateway.
 * @private
 */
class CanvasPainter {
    ctx;
    /**
     * Constructor.
     * @param {CanvasRenderingContext2D} ctx Canvas drawing context
     * @private
     */
    constructor(ctx) {
        this.ctx = ctx;
    }
    /**
     * Get current drawing context.
     * @returns {CanvasRenderingContext2D} Canvas drawing context
     * @private
     */
    get context() {
        return this.ctx;
    }
    /**
     * Run a draw operation on another canvas context.
     * @param {CanvasRenderingContext2D} ctx Canvas drawing context
     * @param {function} draw Draw callback
     * @private
     */
    withContext(ctx, draw) {
        const prev = this.ctx;
        this.ctx = ctx;
        try {
            draw();
        }
        finally {
            this.ctx = prev;
        }
    }
    /**
     * Run a draw operation in an isolated canvas state.
     * @param {DrawCallback} draw Draw callback
     * @private
     */
    withState(draw) {
        const { ctx } = this;
        ctx.save();
        try {
            draw(ctx);
        }
        finally {
            ctx.restore();
        }
    }
    /**
     * Run a draw operation with a translated origin.
     * @param {number} x Translation x
     * @param {number} y Translation y
     * @param {DrawCallback} draw Draw callback
     * @private
     */
    withTranslation(x, y, draw) {
        this.withState(ctx => {
            ctx.translate(x, y);
            draw(ctx);
        });
    }
    /**
     * Run a draw operation clipped to a rectangle.
     * @param {object} rect Clip rectangle
     * @param {DrawCallback} draw Draw callback
     * @private
     */
    clipRect(rect, draw) {
        this.withState(ctx => {
            ctx.beginPath();
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
            ctx.clip();
            draw(ctx);
        });
    }
    /**
     * Measure text using the current canvas state.
     * @param {string} text Text value
     * @returns {TextMetrics} Text metrics
     * @private
     */
    measureText(text) {
        return this.ctx.measureText(text);
    }
    /**
     * Add a line segment to the current path.
     * @param {number} x1 Start x
     * @param {number} y1 Start y
     * @param {number} x2 End x
     * @param {number} y2 End y
     * @private
     */
    traceLine(x1, y1, x2, y2) {
        const { ctx } = this;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    }
    /**
     * Add a crisp line segment to the current path.
     * @param {number} x1 Start x
     * @param {number} y1 Start y
     * @param {number} x2 End x
     * @param {number} y2 End y
     * @param {number} lineWidth Stroke width
     * @private
     */
    traceCrispLine(x1, y1, x2, y2, lineWidth) {
        this.traceLine(this.crisp(x1, lineWidth), this.crisp(y1, lineWidth), this.crisp(x2, lineWidth), this.crisp(y2, lineWidth));
    }
    /**
     * Add a circle to the current path.
     * @param {number} x Center x
     * @param {number} y Center y
     * @param {number} r Radius
     * @private
     */
    traceCircle(x, y, r) {
        this.ctx.moveTo(x + r, y);
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    /**
     * Stroke a path.
     * @param {DrawCallback} draw Path callback
     * @param {object} style Optional style
     * @private
     */
    strokePath(draw, style) {
        this.withStyle(style, ctx => {
            ctx.beginPath();
            draw(ctx);
            ctx.stroke();
        });
    }
    /**
     * Fill a path.
     * @param {DrawCallback} draw Path callback
     * @param {object} style Optional style
     * @private
     */
    fillPath(draw, style) {
        this.withStyle(style, ctx => {
            ctx.beginPath();
            draw(ctx);
            ctx.fill();
        });
    }
    /**
     * Fill a rectangle.
     * @param {object} rect Rectangle
     * @param {object} style Optional style
     * @private
     */
    fillRect(rect, style) {
        this.withStyle(style, ctx => {
            ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        });
    }
    /**
     * Fill a rectangle with optional corner radii.
     * @param {object} rect Rectangle
     * @param {number|object} radius Corner radius
     * @param {object} style Optional style
     * @private
     */
    fillRoundRect(rect, radius = 0, style) {
        const normalized = this.normalizeRect(rect);
        const corners = this.getRectRadii(normalized, radius);
        if (!corners.tl && !corners.tr && !corners.br && !corners.bl) {
            this.fillRect(normalized, style);
            return;
        }
        this.fillPath(ctx => {
            this.traceRoundRect(ctx, normalized, corners);
        }, style);
    }
    /**
     * Stroke a rectangle with optional corner radii.
     * @param {object} rect Rectangle
     * @param {number|object} radius Corner radius
     * @param {object} style Optional style
     * @private
     */
    strokeRoundRect(rect, radius = 0, style) {
        const normalized = this.normalizeRect(rect);
        const corners = this.getRectRadii(normalized, radius);
        if (!corners.tl && !corners.tr && !corners.br && !corners.bl) {
            this.strokeRect(normalized, style);
            return;
        }
        this.strokePath(ctx => {
            this.traceRoundRect(ctx, normalized, corners);
        }, style);
    }
    /**
     * Stroke a rectangle.
     * @param {object} rect Rectangle
     * @param {object} style Optional style
     * @private
     */
    strokeRect(rect, style) {
        this.withStyle(style, ctx => {
            ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
        });
    }
    /**
     * Draw text.
     * @param {string} text Text value
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {object} style Optional style
     * @private
     */
    text(text, x, y, style) {
        const fillText = (ctx, textX, textY) => {
            style?.maxWidth === undefined ?
                ctx.fillText(text, textX, textY) :
                ctx.fillText(text, textX, textY, style.maxWidth);
        };
        const draw = (ctx) => {
            if (style?.angle) {
                ctx.translate(x, y);
                ctx.rotate(style.angle * Math.PI / 180);
                fillText(ctx, 0, 0);
            }
            else {
                fillText(ctx, x, y);
            }
        };
        if (style?.angle) {
            this.withState(ctx => {
                this.applyStyle(style);
                draw(ctx);
            });
        }
        else {
            this.withStyle(style, draw);
        }
    }
    /**
     * Draw a possibly rotated multiline text block.
     * @param {string} text Text value
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {object} style Optional style
     * @private
     */
    textLines(text, x, y, style) {
        this.withState(ctx => {
            const lines = text.split("\n");
            const lineHeight = getFontSize(style?.font || ctx.font);
            const firstLineY = lines.length > 1 ? -((lines.length - 1) * lineHeight) : 0;
            this.applyStyle(style);
            ctx.translate(x, y);
            style?.angle && ctx.rotate(style.angle * Math.PI / 180);
            lines.forEach((line, i) => {
                const lineY = firstLineY + (i * lineHeight);
                style?.maxWidth === undefined ?
                    ctx.fillText(line, 0, lineY) :
                    ctx.fillText(line, 0, lineY, style.maxWidth);
            });
        });
    }
    /**
     * Draw a point shape.
     * @param {string} type Point shape
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {number} r Radius
     * @param {object} style Optional style
     * @private
     */
    point(type, x, y, r, style) {
        this.withStyle(style, ctx => {
            const shouldFill = !style?.stroke || style.fill !== undefined;
            const shouldStroke = style?.stroke !== undefined;
            if (type === "rectangle") {
                const size = r * 2;
                const rect = { x: x - r, y: y - r, w: size, h: size };
                shouldFill && ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
                shouldStroke && ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
            }
            else {
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                shouldFill && ctx.fill();
                shouldStroke && ctx.stroke();
            }
        });
    }
    /**
     * Normalize rounded rectangle corner radii.
     * @param {object} rect Rectangle
     * @param {number|object} radius Corner radius
     * @returns {object} Corner radii
     * @private
     */
    getRectRadii(rect, radius) {
        const base = typeof radius === "number" ?
            { tl: radius, tr: radius, br: radius, bl: radius } :
            {
                tl: radius.tl || 0,
                tr: radius.tr || 0,
                br: radius.br || 0,
                bl: radius.bl || 0
            };
        const max = Math.max(0, Math.min(Math.abs(rect.w), Math.abs(rect.h)) / 2);
        return {
            tl: Math.max(0, Math.min(base.tl, max)),
            tr: Math.max(0, Math.min(base.tr, max)),
            br: Math.max(0, Math.min(base.br, max)),
            bl: Math.max(0, Math.min(base.bl, max))
        };
    }
    /**
     * Add a rounded rectangle to the current path.
     * @param {CanvasRenderingContext2D} ctx Canvas context
     * @param {object} rect Rectangle
     * @param {object} radius Corner radii
     * @private
     */
    traceRoundRect(ctx, rect, radius) {
        const { x, y, w, h } = rect;
        const right = x + w;
        const bottom = y + h;
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(right - radius.tr, y);
        radius.tr ? ctx.quadraticCurveTo(right, y, right, y + radius.tr) : ctx.lineTo(right, y);
        ctx.lineTo(right, bottom - radius.br);
        radius.br ?
            ctx.quadraticCurveTo(right, bottom, right - radius.br, bottom) :
            ctx.lineTo(right, bottom);
        ctx.lineTo(x + radius.bl, bottom);
        radius.bl ? ctx.quadraticCurveTo(x, bottom, x, bottom - radius.bl) : ctx.lineTo(x, bottom);
        ctx.lineTo(x, y + radius.tl);
        radius.tl ? ctx.quadraticCurveTo(x, y, x + radius.tl, y) : ctx.lineTo(x, y);
        ctx.closePath();
    }
    /**
     * Normalize rectangle coordinates for path drawing.
     * @param {object} rect Rectangle
     * @returns {object} Normalized rectangle
     * @private
     */
    normalizeRect(rect) {
        const x = rect.w < 0 ? rect.x + rect.w : rect.x;
        const y = rect.h < 0 ? rect.y + rect.h : rect.y;
        return {
            x,
            y,
            w: Math.abs(rect.w),
            h: Math.abs(rect.h)
        };
    }
    /**
     * Apply drawing style.
     * @param {object} style Drawing style
     * @private
     */
    applyStyle(style) {
        if (!style) {
            return;
        }
        const { ctx } = this;
        style.fill !== undefined && (ctx.fillStyle = style.fill);
        style.stroke !== undefined && (ctx.strokeStyle = style.stroke);
        style.lineWidth !== undefined && (ctx.lineWidth = style.lineWidth);
        style.alpha !== undefined && (ctx.globalAlpha = style.alpha);
        style.font !== undefined && (ctx.font = style.font);
        style.textAlign !== undefined && (ctx.textAlign = style.textAlign);
        style.textBaseline !== undefined && (ctx.textBaseline = style.textBaseline);
        style.lineDash !== undefined && ctx.setLineDash(style.lineDash);
    }
    /**
     * Run with optional style state.
     * @param {object} style Optional drawing style
     * @param {DrawCallback} draw Draw callback
     * @private
     */
    withStyle(style, draw) {
        if (style) {
            this.withState(ctx => {
                this.applyStyle(style);
                draw(ctx);
            });
        }
        else {
            draw(this.ctx);
        }
    }
    /**
     * Get crisp canvas coordinate for axis/grid strokes.
     * @param {number} value Coordinate value
     * @param {number} lineWidth Stroke width
     * @returns {number} Crisp coordinate
     * @private
     */
    crisp(value, lineWidth) {
        return lineWidth % 2 ? Math.round(value) + 0.5 : Math.round(value);
    }
}

export { CanvasPainter as default };
