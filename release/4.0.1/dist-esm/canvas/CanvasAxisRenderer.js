/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import { AXIS_TICK_SIZE, AXIS_TICK_PADDING } from '../config/const.js';
import { getSubXTickValues, normalizeXValue, getXTickValues, getYGridTickValues, normalizeYValue, getAdditionalAxisScale, getAdditionalAxisTickFormat, getAdditionalAxisTickValues, getXScale, getXTickLineValues, getXTickLinePosition, isSameTickValue, getYTickValues } from './axisTicks.js';
import CanvasPainter from './CanvasPainter.js';
import { getFontSize } from './util.js';

const X_AXIS_TICK_TEXT_HORIZONTAL_CLIP_PADDING = 20;
const X_AXIS_TICK_TEXT_VERTICAL_CLIP_PADDING = 15;
/**
 * Get x tick text direction. Text labels stay outside the chart even when tick lines are inner.
 * @param {boolean} isRotated Whether axis is rotated
 * @returns {number} Text direction multiplier
 * @private
 */
function getXTickTextDirection(isRotated) {
    return isRotated ? -1 : 1;
}
/**
 * Get y/y2 tick text direction. Text labels stay outside the chart even when tick lines are inner.
 * @param {boolean} isRotated Whether axis is rotated
 * @param {boolean} isY2 Whether axis is y2
 * @returns {number} Text direction multiplier
 * @private
 */
function getYTickTextDirection(isRotated, isY2) {
    return isRotated ? (isY2 ? -1 : 1) : (isY2 ? 1 : -1);
}
/**
 * Get horizontal x-axis clip rect with small text overflow tolerance.
 * @param {object} margin Chart margin
 * @param {number} width Plot width
 * @param {number} height Clip height
 * @returns {object} Clip rectangle
 * @private
 */
function getHorizontalXAxisClipRect(margin, width, height) {
    return {
        x: margin.left - X_AXIS_TICK_TEXT_HORIZONTAL_CLIP_PADDING,
        y: 0,
        w: width + (X_AXIS_TICK_TEXT_HORIZONTAL_CLIP_PADDING * 2),
        h: height
    };
}
/**
 * Get rotated x-axis clip rect with small text overflow tolerance.
 * @param {object} margin Chart margin
 * @param {number} width Clip width
 * @param {number} height Plot height
 * @returns {object} Clip rectangle
 * @private
 */
function getRotatedXAxisClipRect(margin, width, height) {
    return {
        x: 0,
        y: margin.top - X_AXIS_TICK_TEXT_VERTICAL_CLIP_PADDING,
        w: width,
        h: height + (X_AXIS_TICK_TEXT_VERTICAL_CLIP_PADDING * 2)
    };
}
/**
 * Get configured axis tooltip background color.
 * @param {object} $$ ChartInternal context
 * @param {string} id Axis id
 * @returns {string|null} Background color
 * @private
 */
function getAxisTooltipBackgroundColor($$, id) {
    const bgColor = $$.config.axis_tooltip?.backgroundColor ?? "black";
    return typeof bgColor === "string" ? bgColor : (bgColor?.[id] || null);
}
/**
 * Format canvas axis tooltip scale value.
 * @param {object} $$ ChartInternal context
 * @param {string} id Axis id
 * @param {number} value Scale coordinate
 * @returns {string|null} Formatted scale text
 * @private
 */
function formatAxisTooltipValue($$, id, value) {
    const scale = $$.scale[id];
    if (!scale?.invert) {
        return null;
    }
    const scaleValue = scale.invert(value);
    if (scaleValue === null || scaleValue === undefined) {
        return null;
    }
    if (id === "x" && $$.axis?.isTimeSeries?.()) {
        return $$.format.xAxisTick(scaleValue);
    }
    const numeric = Number(scaleValue);
    return Number.isFinite(numeric) ? numeric.toFixed(2) : `${scaleValue}`;
}
/**
 * Get the axis group origin in canvas coordinates.
 * @param {object} $$ ChartInternal context
 * @param {string} id Axis id
 * @returns {object} Axis group origin
 * @private
 */
function getAxisLabelBasePosition($$, id) {
    const { config, state: { height, margin, width } } = $$;
    const isRotated = config.axis_rotated;
    const base = {
        x: margin.left,
        y: margin.top
    };
    if (id === "x") {
        !isRotated && (base.y += height);
    }
    else if (id === "y") {
        isRotated && (base.y += height);
    }
    else if (isRotated) {
        base.y -= 1;
    }
    else {
        base.x += width;
    }
    return base;
}
/**
 * Convert SVG axis label local coordinates to canvas coordinates.
 * @param {object} base Axis group origin
 * @param {number} base.x Axis group origin x
 * @param {number} base.y Axis group origin y
 * @param {number} localX SVG local x coordinate
 * @param {number} localY SVG local y coordinate
 * @param {boolean} isRotated Whether SVG label has rotate(-90)
 * @returns {object} Canvas coordinates
 * @private
 */
function getAxisLabelCanvasPosition(base, localX, localY, isRotated) {
    return isRotated ?
        {
            x: base.x + localY,
            y: base.y - localX
        } :
        {
            x: base.x + localX,
            y: base.y + localY
        };
}
/**
 * Format tick value.
 * @param {function} format Format function
 * @param {number|Date|string} tick Tick value
 * @returns {string} Formatted tick
 * @private
 */
function formatTick(format, tick) {
    const value = format ? format(tick) : tick;
    return value == null ? "" : String(value);
}
/**
 * Get axis tick text font for a specific axis.
 * @param {object} axisStyle Canvas axis style
 * @param {string} id Axis id
 * @returns {string} Canvas font shorthand
 * @private
 */
function getAxisTickFont(axisStyle, id) {
    return axisStyle[`${id}TickFont`] || axisStyle.labelFont;
}
/**
 * Get SVG-like multiline x tick text line height.
 * @param {object} painter Canvas painter
 * @param {number} fontSize Current font size
 * @returns {number} Line height
 * @private
 */
function getXTickTextLineHeight(painter, fontSize) {
    const metrics = painter.measureText("0");
    const fontBoxHeight = (metrics.fontBoundingBoxAscent || 0) +
        (metrics.fontBoundingBoxDescent || 0);
    const actualBoxHeight = (metrics.actualBoundingBoxAscent || 0) +
        (metrics.actualBoundingBoxDescent || 0);
    const svgFallbackHeight = (fontSize || 10) * (11.5 / 10);
    return Math.max(fontSize, fontBoxHeight, actualBoxHeight, svgFallbackHeight);
}
/**
 * Get SVG-compatible y position for rotated bottom x-axis tick text.
 * @param {number} rotate Tick text rotation
 * @returns {number} Local SVG text y coordinate
 * @private
 */
function getRotatedXTickTextY(rotate) {
    const r2 = rotate / 15;
    return 11.5 - 2.5 * r2 * (rotate > 0 ? 1 : -1);
}
/**
 * Get SVG-compatible tspan dx for rotated bottom x-axis tick text.
 * @param {number} rotate Tick text rotation
 * @returns {number} Local tspan dx
 * @private
 */
function getRotatedXTickTextDx(rotate) {
    return 8 * Math.sin(Math.PI * (rotate / 180));
}
/**
 * Resolve SVG-like dx/dy values for canvas text.
 * @param {number|string} value Offset value
 * @param {number} fontSize Current font size
 * @returns {number} Pixel offset
 * @private
 */
function resolveTextOffset(value, fontSize) {
    if (typeof value === "number") {
        return value;
    }
    if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isFinite(parsed)) {
            return 0;
        }
        return /em$/.test(value.trim()) ? parsed * fontSize : parsed;
    }
    return 0;
}
/**
 * Split tick text by configured width.
 * @param {string} text Tick text
 * @param {number} width Max width
 * @param {object} painter Canvas painter
 * @returns {Array} Text lines
 * @private
 */
function splitTickTextByWidth(text, width, painter) {
    if (!width) {
        return [text];
    }
    const charWidth = painter.measureText("0").width || 5.5;
    /**
     * Split a text fragment recursively.
     * @param {Array} lines Accumulated text lines
     * @param {string} value Remaining text fragment
     * @returns {Array} Text lines
     * @private
     */
    function split(lines, value) {
        let spaceIndex;
        for (let i = 1; i < value.length; i++) {
            if (value.charAt(i) === " ") {
                spaceIndex = i;
            }
            if (width < charWidth * (i + 1)) {
                const splitIndex = spaceIndex || i;
                return split(lines.concat(value.slice(0, splitIndex)), value.slice(spaceIndex ? spaceIndex + 1 : i));
            }
        }
        return lines.concat(value);
    }
    return split([], text);
}
/**
 * Get max width for splitting canvas x axis tick text.
 * @param {object} $$ ChartInternal context
 * @param {Array} ticks X-axis tick values
 * @param {boolean} isRotated Whether axis is rotated
 * @param {function} targetScale X scale
 * @returns {number} Max tick text width
 * @private
 */
function getXTickTextWidth($$, ticks, isRotated, targetScale) {
    const configured = $$.config.axis_x_tick_width;
    if (configured && configured > 0) {
        return configured;
    }
    if (isRotated) {
        return 95;
    }
    if ($$.axis?.isCategorized?.() && ticks.length > 1) {
        const start = targetScale(normalizeXValue($$, ticks[0]));
        const end = targetScale(normalizeXValue($$, ticks[1]));
        return Math.max(0, Math.abs(end - start) - 12);
    }
    return 110;
}
/**
 * Get rendered x-axis tick text lines.
 * @param {object} $$ ChartInternal context
 * @param {object} painter Canvas painter
 * @param {function} format Tick formatter
 * @param {number|Date|string} tick Tick value
 * @param {Array} ticks X-axis tick values
 * @param {boolean} isRotated Whether axis is rotated
 * @param {function} targetScale X scale
 * @param {number} [maxWidth] Pre-computed max tick text width (invariant per draw pass)
 * @returns {Array} Tick text lines
 * @private
 */
function getXTickTextLines($$, painter, format, tick, ticks = [], isRotated = false, targetScale = getXScale($$), maxWidth) {
    const value = format ? format(tick) : tick;
    if (value == null) {
        return [""];
    }
    if (Array.isArray(value)) {
        return value.map(v => String(v));
    }
    const text = String(value);
    if (text.indexOf("\n") > -1) {
        return text.split("\n");
    }
    return $$.config.axis_x_tick_multiline ?
        splitTickTextByWidth(text, maxWidth ?? getXTickTextWidth($$, ticks, isRotated, targetScale), painter) :
        [text];
}
/**
 * Get canvas text alignment for x-axis tick text.
 * @param {object} $$ ChartInternal context
 * @param {object} options X-axis drawing options
 * @returns {string} Canvas text alignment
 * @private
 */
function getXTickTextAlign($$, options) {
    const { isRotated, tickCount, tickIndex, tickRotate, tickTextDirection } = options;
    const inner = $$.config.axis_x_tick_text_inner;
    let align = isRotated ?
        (tickTextDirection > 0 ? "left" : "right") :
        (tickRotate ? (tickRotate > 0 ? "left" : "right") : "center");
    if (!isRotated && tickIndex === 0 && (inner === true || inner?.first)) {
        align = "left";
    }
    else if (!isRotated &&
        tickIndex === tickCount - 1 &&
        (inner === true || inner?.last)) {
        align = "right";
    }
    return align;
}
/**
 * Get title x position and text alignment.
 * @param {string} position Title position option
 * @param {number} width Chart width
 * @returns {object} Position and alignment
 * @private
 */
function getTitleTextPosition(position, width) {
    if ((position?.indexOf("center") ?? -1) > -1) {
        return { x: width / 2, align: "center" };
    }
    if ((position?.indexOf("right") ?? -1) > -1) {
        return { x: width, align: "right" };
    }
    return { x: 0, align: "left" };
}
/**
 * Check if position can be drawn.
 * @param {number} value Coordinate value
 * @returns {boolean} Whether coordinate is finite
 * @private
 */
function isDrawable(value) {
    return Number.isFinite(value);
}
/**
 * Check if position is within an axis drawing range.
 * @param {number} value Coordinate value
 * @param {number} start Range start
 * @param {number} end Range end
 * @returns {boolean} Whether coordinate is finite and in range
 * @private
 */
function isInAxisRange(value, start, end) {
    return isDrawable(value) &&
        value >= Math.min(start, end) &&
        value <= Math.max(start, end);
}
/**
 * Get outer x tick direction following SVG axis orientation.
 * @param {boolean} isRotated Whether axis is rotated
 * @returns {number} Outer tick direction
 * @private
 */
function getXOuterTickDirection(isRotated) {
    return isRotated ? -1 : 1;
}
/**
 * Get outer y/y2 tick direction following SVG axis orientation.
 * @param {object} config Chart config
 * @param {boolean} isRotated Whether axis is rotated
 * @param {boolean} isY2 Whether axis is y2
 * @returns {number} Outer tick direction
 * @private
 */
function getYOuterTickDirection(config, isRotated, isY2) {
    if (isRotated) {
        return isY2 ? (config.axis_y2_inner ? 1 : -1) : (config.axis_y_inner ? -1 : 1);
    }
    return isY2 ? (config.axis_y2_inner ? -1 : 1) : (config.axis_y_inner ? 1 : -1);
}
/**
 * Resolve x coordinate from an x/category value.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value X value
 * @param {function} targetScale X scale
 * @returns {number} Pixel coordinate relative to plot area
 * @private
 */
function getXPosition($$, value, targetScale = getXScale($$)) {
    return targetScale(normalizeXValue($$, value));
}
/**
 * Resolve x region boundary value, matching SVG region category semantics.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value X boundary value
 * @returns {number|Date|string} Scale-compatible value
 * @private
 */
function normalizeXRegionBoundaryValue($$, value) {
    if ($$.axis?.isCategorized?.() && typeof value === "string" && Number.isNaN(Number(value))) {
        return $$.config.axis_x_categories.indexOf(value);
    }
    return normalizeXValue($$, value);
}
/**
 * Resolve whether category region boundary needs tick offset.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value X boundary value
 * @returns {boolean}
 * @private
 */
function hasCategoryRegionBoundaryOffset($$, value) {
    return Boolean($$.axis?.isCategorized?.() && Number.isNaN(Number(value)));
}
/**
 * Resolve x boundary coordinate for category-aware regions.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string|undefined} value X value
 * @param {number} fallback Fallback coordinate
 * @param {string} key Region boundary key
 * @returns {number} Pixel coordinate relative to plot area
 * @private
 */
function getXBoundary($$, value, fallback, key) {
    if (value === undefined) {
        return fallback;
    }
    let pos = getXScale($$)(normalizeXRegionBoundaryValue($$, value));
    if (hasCategoryRegionBoundaryOffset($$, value)) {
        const xScale = getXScale($$);
        const tickOffset = $$.axis.x?.tickOffset?.() || ((xScale(1) - xScale(0)) / 2);
        pos += tickOffset * (key === "start" ? -1 : 1);
    }
    return pos;
}
/**
 * Resolve y coordinate from y/y2 value.
 * @param {object} $$ ChartInternal context
 * @param {number|Date|string} value Y value
 * @param {string} axis Axis id
 * @returns {number} Pixel coordinate relative to plot area
 * @private
 */
function getYPosition($$, value, axis = "y") {
    return $$.scale[axis || "y"](normalizeYValue($$, value, axis));
}
/**
 * Get a text position along a grid line.
 * @param {string} position Grid label position
 * @param {number} start Start coordinate
 * @param {number} end End coordinate
 * @returns {number} Label coordinate
 * @private
 */
function getLineTextPosition(position, start, end) {
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
function getRotatedLineTextPosition(position, start, end) {
    if (position === "start") {
        return end - 4;
    }
    if (position === "middle") {
        return (start + end) / 2;
    }
    return start + 4;
}
/**
 * Get global region rectangle.
 * @param {object} $$ ChartInternal context
 * @param {object} region Region option
 * @returns {object|null} Region rectangle relative to plot area
 * @private
 */
function getRegionRect($$, region) {
    const { config, scale, state: { width, height } } = $$;
    const axis = region.axis || "x";
    const isRotated = config.axis_rotated;
    if (axis === "x") {
        const start = getXBoundary($$, region.start, 0, "start");
        const end = getXBoundary($$, region.end, isRotated ? height : width, "end");
        const min = Math.min(start, end);
        const size = Math.abs(end - start);
        return isRotated ? { x: 0, y: min, w: width, h: size } : { x: min, y: 0, w: size, h: height };
    }
    if (!scale[axis]) {
        return null;
    }
    const start = region.start === undefined ?
        (isRotated ? 0 : height) :
        getYPosition($$, region.start, axis);
    const end = region.end === undefined ?
        (isRotated ? width : 0) :
        getYPosition($$, region.end, axis);
    const min = Math.min(start, end);
    const size = Math.abs(end - start);
    return isRotated ? { x: min, y: 0, w: size, h: height } : { x: 0, y: min, w: width, h: size };
}
/**
 * Draw axes and grid lines on canvas.
 * @private
 */
class CanvasAxisRenderer {
    engine;
    theme;
    painter;
    /**
     * Constructor.
     * @param {CanvasEngine} engine Canvas drawing engine
     * @param {CanvasTheme} theme Canvas theme resolver
     * @private
     */
    constructor(engine, theme) {
        this.engine = engine;
        this.theme = theme;
        this.painter = new CanvasPainter(engine.ctx);
    }
    /**
     * Get the drawing context for the main canvas.
     * @returns {CanvasRenderingContext2D} Canvas drawing context
     * @private
     */
    get ctx() {
        return this.painter.context;
    }
    /**
     * Run axis renderer draw calls on another canvas context.
     * @param {CanvasRenderingContext2D} ctx Canvas drawing context
     * @param {function} draw Draw callback
     * @private
     */
    withContext(ctx, draw) {
        this.painter.withContext(ctx, draw);
    }
    /**
     * Draw grid and axis layers.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    draw($$) {
        this.drawRegions($$);
        this.drawGrid($$);
        this.drawAxis($$);
    }
    /**
     * Draw visible axes.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    drawAxis($$) {
        const { config } = $$;
        config.axis_x_show && this.drawXAxis($$);
        config.axis_y_show && this.drawYAxis($$);
        config.axis_y2_show && $$.scale.y2 && this.drawYAxis($$, "y2");
        this.drawAdditionalAxes($$);
        this.drawAxisLabels($$);
    }
    /**
     * Draw the canvas subchart x axis.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    drawSubXAxis($$) {
        const { ctx, painter, theme: { style: { axis } } } = this;
        const { config, format, scale, state: { current, margin2, width2, height2 } } = $$;
        if (!config.subchart_show ||
            !config.subchart_axis_x_show ||
            !scale.subX ||
            width2 <= 0 ||
            height2 <= 0) {
            return;
        }
        const isRotated = config.axis_rotated;
        const x = painter.crisp(margin2.left, axis.lineWidth);
        const y = painter.crisp(margin2.top + height2, axis.lineWidth);
        const x1 = margin2.left;
        const x2 = margin2.left + width2;
        const y1 = margin2.top;
        const y2 = margin2.top + height2;
        const rangeStart = isRotated ? y1 : x1;
        const rangeEnd = isRotated ? y2 : x2;
        const ticks = getSubXTickValues($$);
        const tickDirection = isRotated ?
            (config.axis_x_tick_inner ? 1 : -1) :
            (config.axis_x_tick_inner ? -1 : 1);
        const outerTickDirection = getXOuterTickDirection(isRotated);
        const tickTextDirection = getXTickTextDirection(isRotated);
        const tickTextPosition = config.axis_x_tick_text_position;
        const tickRotate = !isRotated ? ($$.getAxisTickRotate?.("x") || 0) : 0;
        const tickFormat = format.subXAxisTick || $$.axis?.getXAxisTickFormat?.(true);
        painter.clipRect(isRotated ? getRotatedXAxisClipRect(margin2, current.width, height2) : {
            ...getHorizontalXAxisClipRect(margin2, width2, current.height - margin2.top),
            y: margin2.top
        }, () => {
            ctx.strokeStyle = axis.lineColor;
            ctx.lineWidth = axis.lineWidth;
            painter.strokePath(() => {
                if (isRotated) {
                    painter.traceLine(x, y1, x, y2);
                }
                else {
                    painter.traceLine(x1, y, x2, y);
                }
                if (config.axis_x_tick_outer) {
                    if (isRotated) {
                        painter.traceLine(x, y1, x + (AXIS_TICK_SIZE * outerTickDirection), y1);
                        painter.traceLine(x, y2, x + (AXIS_TICK_SIZE * outerTickDirection), y2);
                    }
                    else {
                        painter.traceLine(x1, y, x1, y + (AXIS_TICK_SIZE * outerTickDirection));
                        painter.traceLine(x2, y, x2, y + (AXIS_TICK_SIZE * outerTickDirection));
                    }
                }
            });
            const tickFont = getAxisTickFont(axis, "x");
            ctx.font = tickFont;
            ctx.fillStyle = axis.labelColor;
            ctx.textAlign = isRotated ? (tickTextDirection > 0 ? "left" : "right") : "center";
            ctx.textBaseline = isRotated ?
                "middle" :
                (tickTextDirection > 0 ? "top" : "bottom");
            ctx.strokeStyle = axis.tickColor;
            ctx.lineWidth = axis.tickWidth;
            // invariant across ticks: measure/resolve once per draw pass
            const lineHeight = getXTickTextLineHeight(painter, getFontSize(tickFont));
            const tickTextWidth = getXTickTextWidth($$, ticks, isRotated, scale.subX);
            for (const tick of ticks) {
                const tickPos = scale.subX(normalizeXValue($$, tick));
                const tx = margin2.left + tickPos;
                const ty = margin2.top + tickPos;
                const pos = isRotated ? ty : tx;
                if (!isInAxisRange(pos, rangeStart, rangeEnd)) {
                    continue;
                }
                if (config.subchart_axis_x_tick_show) {
                    painter.strokePath(() => {
                        if (isRotated) {
                            painter.traceLine(x, ty, x + (AXIS_TICK_SIZE * tickDirection), ty);
                        }
                        else {
                            painter.traceLine(tx, y, tx, y + (AXIS_TICK_SIZE * tickDirection));
                        }
                    });
                }
                if (!config.subchart_axis_x_tick_text_show) {
                    continue;
                }
                const lines = getXTickTextLines($$, painter, tickFormat, tick, ticks, isRotated, scale.subX, tickTextWidth);
                let textX;
                let textY;
                if (isRotated) {
                    textX = x + ((AXIS_TICK_SIZE + AXIS_TICK_PADDING) * tickTextDirection) +
                        (tickTextPosition.x || 0);
                    textY = ty + (tickTextPosition.y || 0);
                    ctx.textAlign = tickTextDirection > 0 ? "left" : "right";
                    ctx.textBaseline = "middle";
                }
                else {
                    textX = tx + (tickTextPosition.x || 0);
                    textY = y + ((AXIS_TICK_SIZE + AXIS_TICK_PADDING) * tickTextDirection) +
                        (tickTextPosition.y || 0);
                    ctx.textAlign = tickRotate ? (tickRotate > 0 ? "left" : "right") : "center";
                    ctx.textBaseline = tickTextDirection > 0 ? "top" : "bottom";
                }
                painter.withState(textCtx => {
                    textCtx.translate(textX, textY);
                    tickRotate && textCtx.rotate(tickRotate * Math.PI / 180);
                    lines.forEach((line, i) => {
                        textCtx.fillText(line, 0, i * lineHeight);
                    });
                });
            }
        });
    }
    /**
     * Draw chart title.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    drawTitle($$) {
        const { ctx, painter, theme: { style: { title } } } = this;
        const { config, state: { current } } = $$;
        if (!config.title_text) {
            return;
        }
        const lines = String(config.title_text).split("\n");
        const fontSize = getFontSize(title.font);
        const lineHeight = fontSize * 1.5;
        const { x, align } = getTitleTextPosition(config.title_position, current.width);
        const titleHeight = $$.getCanvasTitleHeight?.() ?? fontSize;
        const y = (config.title_padding.top || 0) + titleHeight;
        painter.withState(() => {
            ctx.font = title.font;
            ctx.fillStyle = title.color;
            ctx.textAlign = align;
            ctx.textBaseline = "alphabetic";
            lines.forEach((line, i) => {
                ctx.fillText(line, x, y + (i ? fontSize + ((i - 1) * lineHeight) : 0));
            });
        });
    }
    /**
     * Draw axis labels.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    drawAxisLabels($$) {
        const { ctx, painter, theme: { style: { axis: style } } } = this;
        const { axis, config } = $$;
        const fontSize = getFontSize(style.labelFont);
        const ids = ["x", "y", "y2"];
        const labelColorById = {
            x: style.xLabelColor,
            y: style.yLabelColor,
            y2: style.y2LabelColor
        };
        const alignMap = {
            start: "left",
            middle: "center",
            end: "right"
        };
        if (!axis) {
            return;
        }
        painter.withState(() => {
            ctx.font = style.labelFont;
            ctx.textBaseline = "alphabetic";
            ids.forEach(id => {
                const text = axis.getLabelText(id);
                if (!text ||
                    !config[`axis_${id}_show`] ||
                    (id === "y2" && !$$.scale.y2)) {
                    return;
                }
                const isRotatedLabel = (id === "x" && config.axis_rotated) ||
                    (id !== "x" && !config.axis_rotated);
                const base = getAxisLabelBasePosition($$, id);
                const localX = axis.xForAxisLabel(id) +
                    resolveTextOffset(axis.dxForAxisLabel(id), fontSize);
                const localY = resolveTextOffset(axis.dyForAxisLabel(id), fontSize);
                const { x, y } = getAxisLabelCanvasPosition(base, localX, localY, isRotatedLabel);
                const anchor = axis.textAnchorForAxisLabel(id);
                ctx.fillStyle = labelColorById[id] || style.labelColor;
                ctx.textAlign = alignMap[anchor] || "center";
                painter.text(String(text), x, y, {
                    angle: isRotatedLabel ? -90 : 0
                });
            });
        });
    }
    /**
     * Draw visible grid lines.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    drawGrid($$) {
        const { ctx, painter, theme: { style: { grid } } } = this;
        const { config, scale, state: { height, margin, width } } = $$;
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
                            painter.traceCrispLine(x1, margin.top + pos, x2, margin.top + pos, grid.lineWidth);
                        }
                        else {
                            painter.traceCrispLine(margin.left + pos, y1, margin.left + pos, y2, grid.lineWidth);
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
                            painter.traceCrispLine(margin.left + pos, y1, margin.left + pos, y2, grid.lineWidth);
                        }
                        else {
                            painter.traceCrispLine(x1, margin.top + pos, x2, margin.top + pos, grid.lineWidth);
                        }
                    }
                });
            }
            !config.grid_lines_front && this.drawGridLines($$);
        });
    }
    /**
     * Draw configured global regions.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    drawRegions($$) {
        const { ctx, painter, theme: { style: { region: style } } } = this;
        const { config, state: { height, margin, width } } = $$;
        const regions = config.regions || [];
        if (!regions.length) {
            return;
        }
        painter.clipRect({ x: margin.left, y: margin.top, w: width, h: height }, () => {
            ctx.fillStyle = style.fill;
            ctx.font = style.labelFont;
            ctx.textBaseline = "top";
            for (const region of regions) {
                const rect = getRegionRect($$, region);
                if (!rect || !isDrawable(rect.x) || !isDrawable(rect.y) || !rect.w || !rect.h) {
                    continue;
                }
                const x = margin.left + rect.x;
                const y = margin.top + rect.y;
                const w = rect.w;
                const h = rect.h;
                ctx.globalAlpha = Number.isFinite(region.opacity) ? region.opacity : style.opacity;
                painter.fillRect({ x, y, w, h });
                if (region.label?.text) {
                    const label = region.label;
                    const center = label.center || "";
                    const text = String(label.text);
                    const textWidth = painter.measureText(text).width;
                    const lineHeight = parseFloat(ctx.font) || 12;
                    let tx = x + (label.x || 0);
                    let ty = y + (label.y || 0);
                    if (center.indexOf("x") > -1) {
                        tx += (w - textWidth) / 2;
                    }
                    if (center.indexOf("y") > -1) {
                        ty += (h - lineHeight) / 2;
                    }
                    painter.text(text, tx, ty, {
                        angle: label.rotated ? -90 : 0,
                        alpha: 1,
                        fill: label.color || style.labelColor
                    });
                }
            }
        });
    }
    /**
     * Draw configured x/y grid lines and labels.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    drawGridLines($$) {
        const { ctx, painter, theme: { style: { axis, grid } } } = this;
        const { config, scale, state: { height, margin, width } } = $$;
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
            const drawLabel = (text, x, y, rotated = false) => {
                if (!text) {
                    return;
                }
                painter.text(text, x, y, {
                    angle: rotated ? -90 : 0
                });
            };
            const drawXLine = (line) => {
                if (line.value === undefined || !scale.x) {
                    return;
                }
                const pos = getXPosition($$, line.value);
                if (!isDrawable(pos)) {
                    return;
                }
                if (isRotated) {
                    const y = margin.top + pos;
                    painter.strokePath(() => {
                        painter.traceLine(x1, y, x2, y);
                    });
                    ctx.textAlign = line.position === "start" ?
                        "left" :
                        (line.position === "middle" ? "center" : "right");
                    drawLabel(line.text, getLineTextPosition(line.position, x1, x2), y - 5);
                }
                else {
                    const x = margin.left + pos;
                    painter.strokePath(() => {
                        painter.traceLine(x, y1, x, y2);
                    });
                    ctx.textAlign = line.position === "start" ?
                        "left" :
                        (line.position === "middle" ? "center" : "right");
                    drawLabel(line.text, x - 5, getRotatedLineTextPosition(line.position, y1, y2), true);
                }
            };
            const drawYLine = (line) => {
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
                    painter.strokePath(() => {
                        painter.traceLine(x, y1, x, y2);
                    });
                    ctx.textAlign = line.position === "start" ?
                        "left" :
                        (line.position === "middle" ? "center" : "right");
                    drawLabel(line.text, x - 5, getRotatedLineTextPosition(line.position, y1, y2), true);
                }
                else {
                    const y = margin.top + pos;
                    painter.strokePath(() => {
                        painter.traceLine(x1, y, x2, y);
                    });
                    ctx.textAlign = line.position === "start" ?
                        "left" :
                        (line.position === "middle" ? "center" : "right");
                    drawLabel(line.text, getLineTextPosition(line.position, x1, x2), y - 5);
                }
            };
            (config.grid_x_lines || []).forEach(drawXLine);
            (config.grid_y_lines || []).forEach(drawYLine);
        });
    }
    /**
     * Draw axes configured with axis.x/y/y2.axes.
     * @param {object} $$ ChartInternal instance
     * @private
     */
    drawAdditionalAxes($$) {
        ["x", "y", "y2"].forEach(id => {
            const axesConfig = $$.config[`axis_${id}_axes`] || [];
            if (!axesConfig.length || !$$.scale[id] || !$$.config[`axis_${id}_show`]) {
                return;
            }
            axesConfig.forEach((axisConfig, index) => {
                const scale = getAdditionalAxisScale($$, id, axisConfig);
                if (!scale) {
                    return;
                }
                const options = {
                    scale,
                    ticks: getAdditionalAxisTickValues($$, id, scale, axisConfig),
                    format: getAdditionalAxisTickFormat($$, axisConfig),
                    index: index + 1,
                    outerTick: axisConfig.tick?.outer !== false
                };
                id === "x" ?
                    this.drawXAxis($$, options) :
                    this.drawYAxis($$, id, options);
            });
        });
    }
    /**
     * Draw the x axis.
     * @param {object} $$ ChartInternal instance
     * @param {object} axisOptions Additional axis options
     * @private
     */
    drawXAxis($$, axisOptions) {
        const { ctx, painter, theme: { style: { axis } } } = this;
        const { axis: axisInstance, config, state: { current, margin, width, height } } = $$;
        const isRotated = config.axis_rotated;
        const axisOffset = axisOptions?.index ? $$.getAxisSize("x") * axisOptions.index : 0;
        const targetScale = axisOptions?.scale || getXScale($$);
        const x = painter.crisp(margin.left - (isRotated ? axisOffset : 0), axis.lineWidth);
        const y = painter.crisp(margin.top + height + (isRotated ? 0 : axisOffset), axis.lineWidth);
        const x1 = margin.left;
        const x2 = margin.left + width;
        const y1 = margin.top;
        const y2 = margin.top + height;
        const rangeStart = isRotated ? y1 : x1;
        const rangeEnd = isRotated ? y2 : x2;
        const ticks = axisOptions?.ticks || getXTickValues($$);
        const lineTicks = axisOptions?.ticks ||
            getXTickLineValues($$, ticks, axis.tickWidth);
        const format = axisOptions?.format || axisInstance.getXAxisTickFormat();
        const outerTick = axisOptions ? axisOptions.outerTick : config.axis_x_tick_outer;
        const tickDirection = isRotated ?
            (config.axis_x_tick_inner ? 1 : -1) :
            (config.axis_x_tick_inner ? -1 : 1);
        const outerTickDirection = getXOuterTickDirection(isRotated);
        const tickTextDirection = getXTickTextDirection(isRotated);
        const tickTextPosition = config.axis_x_tick_text_position;
        const tickRotate = !isRotated ? ($$.getAxisTickRotate?.("x") || 0) : 0;
        painter.clipRect(isRotated ?
            getRotatedXAxisClipRect(margin, current.width, height) :
            getHorizontalXAxisClipRect(margin, width, current.height), () => {
            ctx.strokeStyle = axis.lineColor;
            ctx.lineWidth = axis.lineWidth;
            painter.strokePath(() => {
                if (isRotated) {
                    painter.traceLine(x, y1, x, y2);
                }
                else {
                    painter.traceLine(x1, y, x2, y);
                }
                if (outerTick) {
                    if (isRotated) {
                        painter.traceLine(x, y1, x + (AXIS_TICK_SIZE * outerTickDirection), y1);
                        painter.traceLine(x, y2, x + (AXIS_TICK_SIZE * outerTickDirection), y2);
                    }
                    else {
                        painter.traceLine(x1, y, x1, y + (AXIS_TICK_SIZE * outerTickDirection));
                        painter.traceLine(x2, y, x2, y + (AXIS_TICK_SIZE * outerTickDirection));
                    }
                }
            });
            ctx.font = getAxisTickFont(axis, "x");
            ctx.fillStyle = axis.labelColor;
            ctx.textAlign = isRotated ? (tickTextDirection > 0 ? "left" : "right") : "center";
            ctx.textBaseline = isRotated ?
                "middle" :
                (tickTextDirection > 0 ? "top" : "bottom");
            ctx.strokeStyle = axis.tickColor;
            ctx.lineWidth = axis.tickWidth;
            if (config.axis_x_tick_show) {
                painter.strokePath(() => {
                    for (const tick of lineTicks) {
                        const tickPos = getXTickLinePosition($$, tick, targetScale);
                        const tx = margin.left + tickPos;
                        const ty = margin.top + tickPos;
                        const pos = isRotated ? ty : tx;
                        if (!isInAxisRange(pos, rangeStart, rangeEnd)) {
                            continue;
                        }
                        if (isRotated) {
                            painter.traceLine(x, ty, x + (AXIS_TICK_SIZE * tickDirection), ty);
                        }
                        else {
                            painter.traceLine(tx, y, tx, y + (AXIS_TICK_SIZE * tickDirection));
                        }
                    }
                });
            }
            if (!axisOptions && !config.axis_x_tick_text_show) {
                return;
            }
            // invariant across ticks: measure/resolve once per draw pass
            const tickFont = getAxisTickFont(axis, "x");
            const tickLineHeight = getXTickTextLineHeight(painter, getFontSize(tickFont));
            const tickTextWidth = getXTickTextWidth($$, ticks, isRotated, targetScale);
            ticks.forEach((tick, tickIndex) => {
                this.drawXAxisTickText($$, tick, format, axis.labelColor, {
                    isRotated,
                    rangeEnd,
                    rangeStart,
                    tickCount: ticks.length,
                    tickFont,
                    tickIndex,
                    tickLineHeight,
                    tickTextDirection,
                    tickTextWidth,
                    tickRotate,
                    tickTextPosition,
                    targetScale,
                    ticks,
                    x,
                    y
                });
            });
        });
    }
    /**
     * Draw the focused x-axis tick text with the SVG active tick color.
     * @param {object} $$ ChartInternal instance
     * @param {Array} focusData Focused data rows
     * @private
     */
    drawFocusedXAxisTick($$, focusData) {
        const { painter, theme: { style: { axis } } } = this;
        const { axis: axisInstance, config, state: { current, margin, width, height } } = $$;
        const focusX = focusData?.[0]?.x;
        if (focusX === undefined ||
            !axisInstance ||
            !config.axis_x_show ||
            !config.axis_x_tick_text_show ||
            !axis.activeLabelColor ||
            axis.activeLabelColor === axis.labelColor) {
            return;
        }
        const ticks = getXTickValues($$);
        const tickIndex = ticks.findIndex(value => isSameTickValue(value, focusX));
        const tick = ticks[tickIndex];
        if (tick === undefined) {
            return;
        }
        const isRotated = config.axis_rotated;
        const x = painter.crisp(margin.left, axis.lineWidth);
        const y = painter.crisp(margin.top + height, axis.lineWidth);
        const rangeStart = isRotated ? margin.top : margin.left;
        const rangeEnd = isRotated ? margin.top + height : margin.left + width;
        const format = axisInstance.getXAxisTickFormat();
        const tickTextDirection = getXTickTextDirection(isRotated);
        painter.clipRect(isRotated ?
            getRotatedXAxisClipRect(margin, current.width, height) :
            getHorizontalXAxisClipRect(margin, width, current.height), () => {
            this.drawXAxisTickText($$, tick, format, axis.activeLabelColor, {
                isRotated,
                rangeEnd,
                rangeStart,
                targetScale: getXScale($$),
                tickCount: ticks.length,
                tickIndex,
                tickTextDirection,
                tickRotate: !isRotated ? ($$.getAxisTickRotate?.("x") || 0) : 0,
                tickTextPosition: config.axis_x_tick_text_position,
                ticks,
                x,
                y
            });
        });
    }
    /**
     * Draw axis tooltip guide lines and scale labels on canvas overlay.
     * @param {object} $$ ChartInternal instance
     * @param {Array} point Canvas-local pointer coordinate
     * @private
     */
    drawAxisTooltip($$, point) {
        const { ctx, painter, theme: { style: { axis, grid } } } = this;
        const { config, state: { margin, width, height } } = $$;
        if (!config.axis_tooltip || !point) {
            return;
        }
        const isRotated = config.axis_rotated;
        const localX = point[0] - margin.left;
        const localY = point[1] - margin.top;
        const isInXRange = localX >= 0 && localX <= width;
        const isInYRange = localY >= 0 && localY <= height;
        if (!isInXRange && !isInYRange) {
            return;
        }
        const absX = margin.left + localX;
        const absY = margin.top + localY;
        const fontSize = getFontSize(axis.labelFont);
        const lineHeight = fontSize || 10;
        const drawLabel = (id, scaleValue, x, y, textAlign) => {
            const bg = getAxisTooltipBackgroundColor($$, id);
            const text = bg && formatAxisTooltipValue($$, id, scaleValue);
            if (!text) {
                return;
            }
            ctx.font = axis.labelFont;
            ctx.textAlign = textAlign;
            ctx.textBaseline = "alphabetic";
            const metrics = ctx.measureText(text);
            const textWidth = metrics.width;
            const ascent = metrics.actualBoundingBoxAscent || lineHeight * 0.8;
            const descent = metrics.actualBoundingBoxDescent || lineHeight * 0.2;
            const paddingX = Math.max(2, textWidth * 0.15);
            const paddingY = Math.max(3, lineHeight * 0.25);
            const textLeft = textAlign === "right" ?
                x - textWidth :
                textAlign === "center" ?
                    x - textWidth / 2 :
                    x;
            const textTop = y - ascent;
            ctx.fillStyle = bg;
            ctx.fillRect(textLeft - paddingX, textTop - paddingY, textWidth + paddingX * 2, ascent + descent + paddingY * 2);
            ctx.fillStyle = "#fff";
            ctx.fillText(text, x, y);
        };
        painter.withState(() => {
            ctx.strokeStyle = grid.lineColor;
            ctx.lineWidth = grid.lineWidth;
            ctx.setLineDash([]);
            painter.strokePath(() => {
                if (isInXRange) {
                    painter.traceLine(absX, margin.top, absX, margin.top + height);
                }
                if (isInYRange) {
                    painter.traceLine(margin.left, absY, margin.left + width, absY);
                }
            });
            ctx.setLineDash([]);
            if (isRotated) {
                isInYRange && config.axis_x_show &&
                    drawLabel("x", localY, margin.left - fontSize * 0.3, absY + fontSize * 0.4, "right");
                isInXRange && config.axis_y_show &&
                    drawLabel("y", localX, absX - fontSize * 1.3, margin.top + height + fontSize * 1.15, "left");
                isInXRange && config.axis_y2_show && $$.scale.y2 &&
                    drawLabel("y2", localX, absX - fontSize * 1.3, margin.top - fontSize * 0.4, "left");
            }
            else {
                isInXRange && config.axis_x_show &&
                    drawLabel("x", localX, absX - fontSize, margin.top + height + fontSize * 1.15, "left");
                isInYRange && config.axis_y_show &&
                    drawLabel("y", localY, margin.left - fontSize * 0.4, absY + fontSize * 0.3, "right");
                isInYRange && config.axis_y2_show && $$.scale.y2 &&
                    drawLabel("y2", localY, margin.left + width + fontSize * 0.4, absY + fontSize * 0.3, "left");
            }
        });
    }
    /**
     * Draw one x-axis tick text using the same layout as SVG axis ticks.
     * @param {object} $$ ChartInternal instance
     * @param {number|string|Date} tick Tick value
     * @param {function} format Tick formatter
     * @param {string} fill Text fill color
     * @param {object} options X-axis drawing options
     * @private
     */
    drawXAxisTickText($$, tick, format, fill, options) {
        const { ctx, painter, theme: { style: { axis } } } = this;
        const { state: { margin } } = $$;
        const { isRotated, rangeEnd, rangeStart, tickTextDirection, tickRotate, tickTextPosition, targetScale, ticks, x, y } = options;
        const tickPos = getXPosition($$, tick, targetScale);
        const tx = margin.left + tickPos;
        const ty = margin.top + tickPos;
        const pos = isRotated ? ty : tx;
        if (!isInAxisRange(pos, rangeStart, rangeEnd)) {
            return;
        }
        const tickFont = options.tickFont ?? getAxisTickFont(axis, "x");
        ctx.font = tickFont;
        ctx.fillStyle = fill;
        const lines = getXTickTextLines($$, painter, format, tick, ticks, isRotated, targetScale, options.tickTextWidth);
        const lineHeight = options.tickLineHeight ??
            getXTickTextLineHeight(painter, getFontSize(tickFont));
        let textX;
        let textY;
        if (isRotated) {
            textX = x + ((AXIS_TICK_SIZE + AXIS_TICK_PADDING) * tickTextDirection) +
                (tickTextPosition.x || 0);
            textY = ty + (tickTextPosition.y || 0);
            ctx.textAlign = getXTickTextAlign($$, options);
            ctx.textBaseline = "middle";
        }
        else if (tickRotate) {
            const fontSize = getFontSize(tickFont);
            const firstDy = tickTextPosition.y ?
                resolveTextOffset(tickTextPosition.y, fontSize) :
                0.71 * fontSize;
            const textDx = getRotatedXTickTextDx(tickRotate) +
                (tickTextPosition.x || 0);
            const textY = getRotatedXTickTextY(tickRotate) + firstDy;
            ctx.textAlign = getXTickTextAlign($$, options);
            ctx.textBaseline = "alphabetic";
            painter.withState(textCtx => {
                textCtx.translate(tx, y);
                textCtx.rotate(tickRotate * Math.PI / 180);
                lines.forEach((line, i) => {
                    textCtx.fillText(line, textDx, textY + (i * lineHeight));
                });
            });
            return;
        }
        else {
            textX = tx + (tickTextPosition.x || 0);
            textY = y + ((AXIS_TICK_SIZE + AXIS_TICK_PADDING) * tickTextDirection) +
                (tickTextPosition.y || 0);
            ctx.textAlign = getXTickTextAlign($$, options);
            ctx.textBaseline = tickTextDirection > 0 ? "top" : "bottom";
        }
        painter.withState(textCtx => {
            textCtx.translate(textX, textY);
            tickRotate && textCtx.rotate(tickRotate * Math.PI / 180);
            lines.forEach((line, i) => {
                textCtx.fillText(line, 0, i * lineHeight);
            });
        });
    }
    /**
     * Draw the y axis.
     * @param {object} $$ ChartInternal instance
     * @param {string} id Axis id
     * @param {object} axisOptions Additional axis options
     * @private
     */
    drawYAxis($$, id = "y", axisOptions) {
        const { ctx, painter, theme: { style: { axis } } } = this;
        const { config, scale, state: { margin, width, height } } = $$;
        const prefix = `axis_${id}`;
        const targetScale = axisOptions?.scale || scale[id];
        const isY2 = id === "y2";
        const isRotated = config.axis_rotated;
        const axisOffset = axisOptions?.index ? $$.getAxisSize(id) * axisOptions.index : 0;
        const x = painter.crisp(margin.left + (isY2 ? width + (isRotated ? 0 : axisOffset) : -axisOffset), axis.lineWidth);
        const y = painter.crisp(margin.top + (isRotated ? (isY2 ? -axisOffset - 1 : height + axisOffset) : 0), axis.lineWidth);
        const x1 = margin.left;
        const x2 = margin.left + width;
        const y1 = margin.top;
        const y2 = margin.top + height;
        const ticks = axisOptions?.ticks || getYTickValues($$, id);
        const lineTicks = axisOptions?.ticks || (config[`${prefix}_tick_culling`] && config[`${prefix}_tick_culling_lines`] !== false ?
            getYTickValues($$, id, undefined, false) :
            ticks);
        const format = axisOptions?.format || $$.axis?.[id]?.tickFormat?.() ||
            config[`${prefix}_tick_format`]?.bind($$.api) ||
            (v => v);
        const outerTick = axisOptions ? axisOptions.outerTick : config[`${prefix}_tick_outer`];
        const tickDirection = isRotated ?
            (isY2 ? (config.axis_y2_tick_inner ? 1 : -1) : (config.axis_y_tick_inner ? -1 : 1)) :
            (isY2 ? (config.axis_y2_tick_inner ? -1 : 1) : (config.axis_y_tick_inner ? 1 : -1));
        const outerTickDirection = getYOuterTickDirection(config, isRotated, isY2);
        const tickTextDirection = getYTickTextDirection(isRotated, isY2);
        const tickTextPosition = config[`${prefix}_tick_text_position`];
        painter.withState(() => {
            ctx.strokeStyle = axis.lineColor;
            ctx.lineWidth = axis.lineWidth;
            painter.strokePath(() => {
                if (isRotated) {
                    painter.traceLine(x1, y, x2, y);
                }
                else {
                    painter.traceLine(x, y1, x, y2);
                }
                if (outerTick) {
                    if (isRotated) {
                        painter.traceLine(x1, y, x1, y + (AXIS_TICK_SIZE * outerTickDirection));
                        painter.traceLine(x2, y, x2, y + (AXIS_TICK_SIZE * outerTickDirection));
                    }
                    else {
                        painter.traceLine(x, y1, x + (AXIS_TICK_SIZE * outerTickDirection), y1);
                        painter.traceLine(x, y2, x + (AXIS_TICK_SIZE * outerTickDirection), y2);
                    }
                }
            });
            const tickFont = getAxisTickFont(axis, id);
            ctx.font = tickFont;
            ctx.fillStyle = axis.labelColor;
            ctx.textAlign = isRotated ? "center" : (tickTextDirection > 0 ? "left" : "right");
            ctx.textBaseline = isRotated ? (tickTextDirection > 0 ? "top" : "bottom") : "middle";
            ctx.strokeStyle = axis.tickColor;
            ctx.lineWidth = axis.tickWidth;
            const drawableTicks = [];
            const drawableLineTicks = [];
            const addDrawableTick = (tick, target) => {
                const value = normalizeYValue($$, tick, id);
                const tx = margin.left + targetScale(value);
                const ty = margin.top + targetScale(value);
                const pos = isRotated ? tx : ty;
                if (!isDrawable(pos)) {
                    return;
                }
                target.push({ tick, tx, ty });
            };
            for (const tick of ticks) {
                addDrawableTick(tick, drawableTicks);
            }
            for (const tick of lineTicks) {
                addDrawableTick(tick, drawableLineTicks);
            }
            if (axisOptions || config[`${prefix}_tick_show`]) {
                painter.strokePath(() => {
                    for (const { tx, ty } of drawableLineTicks) {
                        if (isRotated) {
                            painter.traceLine(tx, y, tx, y + (AXIS_TICK_SIZE * tickDirection));
                        }
                        else {
                            painter.traceLine(x, ty, x + (AXIS_TICK_SIZE * tickDirection), ty);
                        }
                    }
                });
            }
            if (axisOptions || config[`${prefix}_tick_text_show`]) {
                for (const { tick, tx, ty } of drawableTicks) {
                    if (isRotated) {
                        painter.text(formatTick(format, tick), tx + (tickTextPosition.x || 0), y + (AXIS_TICK_SIZE * tickTextDirection) +
                            (tickTextPosition.y || 0));
                    }
                    else {
                        painter.text(formatTick(format, tick), x + ((AXIS_TICK_SIZE + AXIS_TICK_PADDING) * tickTextDirection) +
                            (tickTextPosition.x || 0), ty + (tickTextPosition.y || 0));
                    }
                }
            }
        });
    }
}

export { CanvasAxisRenderer as default };
