/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import { window as win } from '../module/browser.js';
import { withOpacity } from './color.js';
import { sanitize } from '../module/sanitize.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// Fallback coordinate box for custom SVG point patterns without a viewBox. SVG can
// render the markup directly; canvas needs an explicit box to normalize coordinates.
const DEFAULT_POINT_VIEWBOX = { x: 0, y: 0, w: 8, h: 8 };
const customPointPatternCache = new Map();
const IDENTITY_POINT_MATRIX = [1, 0, 0, 1, 0, 0];
/**
 * Check if point type can be drawn by the built-in point renderer.
 * @param {string} type Point type
 * @returns {boolean} Whether type is built-in
 * @private
 */
function isBuiltinPointType(type) {
    return type === "circle" || type === "rectangle";
}
/**
 * Get numeric SVG attribute.
 * @param {Element} node SVG element
 * @param {string} name Attribute name
 * @param {number} fallback Fallback value
 * @returns {number} Numeric attribute value
 * @private
 */
function getSvgNumber(node, name, fallback = 0) {
    const value = node.getAttribute(name);
    const parsed = value === null ? NaN : parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}
/**
 * Parse an SVG points attribute.
 * @param {string} value Points attribute
 * @returns {Array} Coordinate pairs
 * @private
 */
function parseSvgPoints(value) {
    const nums = (value.match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) || [])
        .map(Number)
        .filter(Number.isFinite);
    const points = [];
    for (let i = 0; i < nums.length - 1; i += 2) {
        points.push([nums[i], nums[i + 1]]);
    }
    return points;
}
/**
 * Parse an SVG viewBox attribute.
 * @param {string|null} value viewBox value
 * @returns {object|null} Parsed box
 * @private
 */
function parseViewBox(value) {
    const values = value?.trim().split(/[\s,]+/).map(Number).filter(Number.isFinite) || [];
    return values.length === 4 ?
        {
            x: values[0],
            y: values[1],
            w: values[2],
            h: values[3]
        } :
        null;
}
/**
 * Get bounds for coordinate pairs.
 * @param {Array} points Coordinate pairs
 * @returns {object} Bounds
 * @private
 */
function getPointsBox(points) {
    const xs = points.map(([x]) => x);
    const ys = points.map(([, y]) => y);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    return {
        x,
        y,
        w: Math.max(...xs) - x,
        h: Math.max(...ys) - y
    };
}
/**
 * Merge multiple bounds.
 * @param {Array} boxes Bounds
 * @returns {object} Merged bounds
 * @private
 */
function mergePointBoxes(boxes) {
    const validBoxes = boxes.filter(box => Number.isFinite(box.x) &&
        Number.isFinite(box.y) &&
        Number.isFinite(box.w) &&
        Number.isFinite(box.h));
    if (!validBoxes.length) {
        return { ...DEFAULT_POINT_VIEWBOX };
    }
    const x = Math.min(...validBoxes.map(box => box.x));
    const y = Math.min(...validBoxes.map(box => box.y));
    const right = Math.max(...validBoxes.map(box => box.x + box.w));
    const bottom = Math.max(...validBoxes.map(box => box.y + box.h));
    return {
        x,
        y,
        w: right - x,
        h: bottom - y
    };
}
/**
 * Multiply SVG affine matrices.
 * @param {Array} a Base matrix
 * @param {Array} b Matrix to append
 * @returns {Array} Combined matrix
 * @private
 */
function multiplyPointMatrix(a, b) {
    return [
        a[0] * b[0] + a[2] * b[1],
        a[1] * b[0] + a[3] * b[1],
        a[0] * b[2] + a[2] * b[3],
        a[1] * b[2] + a[3] * b[3],
        a[0] * b[4] + a[2] * b[5] + a[4],
        a[1] * b[4] + a[3] * b[5] + a[5]
    ];
}
/**
 * Parse SVG transform attribute into a canvas matrix.
 * @param {string|null} value Transform attribute
 * @returns {Array} Matrix
 * @private
 */
function parsePointTransform(value) {
    let matrix = [...IDENTITY_POINT_MATRIX];
    (value?.match(/[a-z]+\([^)]*\)/gi) || []).forEach(token => {
        const [, rawName, body] = token.match(/^([a-z]+)\(([^)]*)\)$/i) || [];
        const name = rawName?.toLowerCase();
        const values = (body?.match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) || [])
            .map(Number)
            .filter(Number.isFinite);
        let next = null;
        if (name === "matrix" && values.length >= 6) {
            next = values.slice(0, 6);
        }
        else if (name === "translate" && values.length) {
            next = [1, 0, 0, 1, values[0], values[1] || 0];
        }
        else if (name === "scale" && values.length) {
            next = [values[0], 0, 0, values[1] ?? values[0], 0, 0];
        }
        else if (name === "rotate" && values.length) {
            const angle = values[0] * Math.PI / 180;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const rotate = [cos, sin, -sin, cos, 0, 0];
            next = values.length >= 3 ?
                multiplyPointMatrix(multiplyPointMatrix([1, 0, 0, 1, values[1], values[2]], rotate), [1, 0, 0, 1, -values[1], -values[2]]) :
                rotate;
        }
        else if (name === "skewx" && values.length) {
            next = [1, 0, Math.tan(values[0] * Math.PI / 180), 1, 0, 0];
        }
        else if (name === "skewy" && values.length) {
            next = [1, Math.tan(values[0] * Math.PI / 180), 0, 1, 0, 0];
        }
        next && (matrix = multiplyPointMatrix(matrix, next));
    });
    return matrix;
}
/**
 * Read style or presentation attribute.
 * @param {Element} node SVG element
 * @param {string} name Property name
 * @returns {string|null} Property value
 * @private
 */
function getPointPresentationValue(node, name) {
    const style = node.getAttribute("style");
    const attr = node.getAttribute(name);
    const match = style?.match(new RegExp(`(?:^|;)\\s*${name}\\s*:\\s*([^;]+)`, "i"));
    return (match?.[1] || attr || "").trim() || null;
}
/**
 * Parse inherited point style from SVG presentation attributes.
 * @param {Element} node SVG element
 * @param {object} inherited Inherited style
 * @returns {object} Resolved style
 * @private
 */
function parsePointStyle(node, inherited) {
    const style = { ...inherited };
    const fill = getPointPresentationValue(node, "fill");
    const stroke = getPointPresentationValue(node, "stroke");
    const strokeWidth = getPointPresentationValue(node, "stroke-width");
    const opacity = getPointPresentationValue(node, "opacity");
    const fillOpacity = getPointPresentationValue(node, "fill-opacity");
    const strokeOpacity = getPointPresentationValue(node, "stroke-opacity");
    if (fill) {
        style.fill = fill === "none" ? null : fill;
    }
    if (stroke) {
        style.stroke = stroke === "none" ? null : stroke;
    }
    if (strokeWidth) {
        const lineWidth = parseFloat(strokeWidth);
        Number.isFinite(lineWidth) && (style.lineWidth = lineWidth);
    }
    [opacity, fillOpacity, strokeOpacity].forEach(value => {
        const alpha = value === null ? NaN : parseFloat(value);
        Number.isFinite(alpha) && (style.alpha = (style.alpha ?? 1) * alpha);
    });
    return style;
}
/**
 * Collect local SVG definitions addressable by id.
 * @param {Element} root SVG root element
 * @returns {Map} Local definition map
 * @private
 */
function collectPointDefs(root) {
    const defs = new Map();
    Array.from(root.querySelectorAll("[id]")).forEach(node => {
        const id = node.getAttribute("id");
        id && defs.set(id, node);
    });
    return defs;
}
/**
 * Parse SVG length or percentage for custom point paint coordinates.
 * @param {string|null} value SVG length value
 * @param {string|number} fallback Fallback value
 * @returns {string|number} Parsed value
 * @private
 */
function parsePointPaintLength(value, fallback) {
    const text = value?.trim();
    if (!text) {
        return fallback;
    }
    return /%$/.test(text) ? text : parseFloat(text);
}
/**
 * Convert SVG length/percentage into custom point coordinate space.
 * @param {string|number|undefined} value Length value
 * @param {number} origin Box origin
 * @param {number} size Box size
 * @param {number} fallback Fallback value
 * @returns {number} Coordinate
 * @private
 */
function pointPaintCoord(value, origin, size, fallback) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : fallback;
    }
    if (typeof value === "string" && /%$/.test(value)) {
        const percent = parseFloat(value);
        return Number.isFinite(percent) ? origin + size * percent / 100 : fallback;
    }
    const parsed = parseFloat(value ?? "");
    return Number.isFinite(parsed) ? parsed : fallback;
}
/**
 * Parse SVG gradient stop offset.
 * @param {string|null} value Stop offset
 * @returns {number} Offset
 * @private
 */
function parsePointPaintOffset(value) {
    const text = value?.trim() || "0";
    const parsed = parseFloat(text);
    const offset = /%$/.test(text) ? parsed / 100 : parsed;
    return Math.max(0, Math.min(1, Number.isFinite(offset) ? offset : 0));
}
/**
 * Parse SVG gradient stops.
 * @param {Element} node Gradient node
 * @returns {Array} Stops
 * @private
 */
function parsePointPaintStops(node) {
    return Array.from(node.children || [])
        .filter(child => child.tagName.toLowerCase() === "stop")
        .map(stop => {
        const color = getPointPresentationValue(stop, "stop-color") || "#000";
        const opacity = getPointPresentationValue(stop, "stop-opacity");
        const parsedOpacity = opacity === null ? NaN : parseFloat(opacity);
        return {
            offset: parsePointPaintOffset(stop.getAttribute("offset")),
            color,
            opacity: Number.isFinite(parsedOpacity) ? parsedOpacity : undefined
        };
    });
}
/**
 * Collect local linear/radial gradients addressable by id.
 * @param {Map} defs Local definition map
 * @returns {Map} Paint map
 * @private
 */
function collectPointPaints(defs) {
    const paints = new Map();
    defs.forEach((node, id) => {
        const tagName = node.tagName.toLowerCase();
        const stops = parsePointPaintStops(node);
        if (!stops.length) {
            return;
        }
        if (tagName === "lineargradient") {
            paints.set(id, {
                type: "linearGradient",
                x1: parsePointPaintLength(node.getAttribute("x1"), "0%"),
                y1: parsePointPaintLength(node.getAttribute("y1"), "0%"),
                x2: parsePointPaintLength(node.getAttribute("x2"), "100%"),
                y2: parsePointPaintLength(node.getAttribute("y2"), "0%"),
                stops
            });
        }
        else if (tagName === "radialgradient") {
            paints.set(id, {
                type: "radialGradient",
                cx: parsePointPaintLength(node.getAttribute("cx"), "50%"),
                cy: parsePointPaintLength(node.getAttribute("cy"), "50%"),
                r: parsePointPaintLength(node.getAttribute("r"), "50%"),
                fx: parsePointPaintLength(node.getAttribute("fx"), "50%"),
                fy: parsePointPaintLength(node.getAttribute("fy"), "50%"),
                fr: parsePointPaintLength(node.getAttribute("fr"), 0),
                stops
            });
        }
    });
    return paints;
}
/**
 * Parse custom SVG point element into canvas drawable shapes.
 * @param {Element} node SVG element
 * @param {object} fallbackBox Fallback bounds for path-only shapes
 * @param {Map} defs Local definitions
 * @param {Array} matrix Current transform matrix
 * @param {object} inheritedStyle Current inherited style
 * @param {Set} seen Already resolved definition ids
 * @returns {Array} Parsed shapes
 * @private
 */
function parseCustomPointNode(node, fallbackBox, defs, matrix = IDENTITY_POINT_MATRIX, inheritedStyle = {}, seen = new Set()) {
    const tagName = node.tagName.toLowerCase();
    const children = Array.from(node.children || []);
    const style = parsePointStyle(node, inheritedStyle);
    const transform = multiplyPointMatrix(matrix, parsePointTransform(node.getAttribute("transform")));
    const shapeBase = { matrix: transform, style };
    if (tagName === "defs") {
        return [];
    }
    if (tagName === "svg" || tagName === "g" || tagName === "symbol") {
        return children.reduce((shapes, child) => shapes.concat(parseCustomPointNode(child, fallbackBox, defs, transform, style, seen)), []);
    }
    if (tagName === "use") {
        const href = node.getAttribute("href") || node.getAttribute("xlink:href") || "";
        const id = href.charAt(0) === "#" ? href.slice(1) : "";
        const target = id && defs.get(id);
        if (!target || seen.has(id)) {
            return [];
        }
        const x = getSvgNumber(node, "x", 0);
        const y = getSvgNumber(node, "y", 0);
        const useTransform = multiplyPointMatrix(transform, [1, 0, 0, 1, x, y]);
        seen.add(id);
        const shapes = parseCustomPointNode(target, fallbackBox, defs, useTransform, style, seen);
        seen.delete(id);
        return shapes;
    }
    if (tagName === "polygon" || tagName === "polyline") {
        const points = parseSvgPoints(node.getAttribute("points") || "");
        return points.length ?
            [{
                    type: tagName,
                    points,
                    box: getPointsBox(points),
                    ...shapeBase
                }] :
            [];
    }
    if (tagName === "circle") {
        const cx = getSvgNumber(node, "cx", 0);
        const cy = getSvgNumber(node, "cy", 0);
        const r = getSvgNumber(node, "r", 0);
        return r > 0 ?
            [{
                    type: "circle",
                    cx,
                    cy,
                    r,
                    box: { x: cx - r, y: cy - r, w: r * 2, h: r * 2 },
                    ...shapeBase
                }] :
            [];
    }
    if (tagName === "ellipse") {
        const cx = getSvgNumber(node, "cx", 0);
        const cy = getSvgNumber(node, "cy", 0);
        const rx = getSvgNumber(node, "rx", 0);
        const ry = getSvgNumber(node, "ry", 0);
        return rx > 0 && ry > 0 ?
            [{
                    type: "ellipse",
                    cx,
                    cy,
                    rx,
                    ry,
                    box: { x: cx - rx, y: cy - ry, w: rx * 2, h: ry * 2 },
                    ...shapeBase
                }] :
            [];
    }
    if (tagName === "rect") {
        const x = getSvgNumber(node, "x", 0);
        const y = getSvgNumber(node, "y", 0);
        const w = getSvgNumber(node, "width", 0);
        const h = getSvgNumber(node, "height", 0);
        return w > 0 && h > 0 ?
            [{
                    type: "rect",
                    x,
                    y,
                    w,
                    h,
                    box: { x, y, w, h },
                    ...shapeBase
                }] :
            [];
    }
    if (tagName === "line") {
        const x1 = getSvgNumber(node, "x1", 0);
        const y1 = getSvgNumber(node, "y1", 0);
        const x2 = getSvgNumber(node, "x2", 0);
        const y2 = getSvgNumber(node, "y2", 0);
        return [{
                type: "line",
                x1,
                y1,
                x2,
                y2,
                box: getPointsBox([[x1, y1], [x2, y2]]),
                ...shapeBase
            }];
    }
    if (tagName === "path") {
        const d = node.getAttribute("d") || "";
        return d ?
            [{
                    type: "path",
                    d,
                    box: fallbackBox,
                    ...shapeBase
                }] :
            [];
    }
    return [];
}
/**
 * Parse a custom SVG point pattern string.
 * @param {string} pattern SVG pattern
 * @returns {object|null} Parsed pattern
 * @private
 */
function parseCustomPointPattern(pattern) {
    if (!/^</.test(pattern)) {
        return null;
    }
    if (customPointPatternCache.has(pattern)) {
        return customPointPatternCache.get(pattern) || null;
    }
    let parsed = null;
    try {
        const doc = new win.DOMParser().parseFromString(sanitize(pattern), "image/svg+xml");
        const root = doc.documentElement;
        const fallbackBox = parseViewBox(root.getAttribute("viewBox")) || DEFAULT_POINT_VIEWBOX;
        const defs = collectPointDefs(root);
        const shapes = parseCustomPointNode(root, fallbackBox, defs);
        if (shapes.length) {
            parsed = {
                shapes,
                box: root.tagName.toLowerCase() === "svg" ?
                    fallbackBox :
                    mergePointBoxes(shapes.map(shape => shape.box)),
                paints: collectPointPaints(defs)
            };
        }
    }
    catch {
        parsed = null;
    }
    customPointPatternCache.set(pattern, parsed);
    return parsed;
}
/**
 * Trace a parsed custom SVG point shape.
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {object} shape Parsed shape
 * @private
 */
function traceCustomPointShape(ctx, shape) {
    if (shape.type === "polygon" || shape.type === "polyline") {
        const [start, ...rest] = shape.points;
        ctx.moveTo(start[0], start[1]);
        rest.forEach(([x, y]) => ctx.lineTo(x, y));
        shape.type === "polygon" && ctx.closePath();
    }
    else if (shape.type === "circle") {
        ctx.moveTo(shape.cx + shape.r, shape.cy);
        ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2);
    }
    else if (shape.type === "ellipse") {
        ctx.moveTo(shape.cx + shape.rx, shape.cy);
        ctx.ellipse(shape.cx, shape.cy, shape.rx, shape.ry, 0, 0, Math.PI * 2);
    }
    else if (shape.type === "rect") {
        ctx.rect(shape.x, shape.y, shape.w, shape.h);
    }
    else if (shape.type === "line") {
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
    }
}
/**
 * Extract local SVG paint server id.
 * @param {string|null|undefined} value Paint value
 * @returns {string|null} Paint id
 * @private
 */
function getCustomPointPaintId(value) {
    const match = value?.match(/^url\(#([^)]+)\)$/);
    return match?.[1] || null;
}
/**
 * Create canvas gradient for a local custom point paint server.
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {object} paint Paint server
 * @param {object} box Pattern box
 * @returns {CanvasGradient} Canvas gradient
 * @private
 */
function createCustomPointPaint(ctx, paint, box) {
    const { x, y, w, h } = box;
    const gradient = paint.type === "linearGradient" ?
        ctx.createLinearGradient(pointPaintCoord(paint.x1, x, w, x), pointPaintCoord(paint.y1, y, h, y), pointPaintCoord(paint.x2, x, w, x + w), pointPaintCoord(paint.y2, y, h, y)) :
        ctx.createRadialGradient(pointPaintCoord(paint.fx, x, w, x + w / 2), pointPaintCoord(paint.fy, y, h, y + h / 2), pointPaintCoord(paint.fr, x, Math.max(w, h), 0), pointPaintCoord(paint.cx, x, w, x + w / 2), pointPaintCoord(paint.cy, y, h, y + h / 2), Math.max(0.01, pointPaintCoord(paint.r, 0, Math.max(w, h), Math.max(w, h) / 2)));
    paint.stops.forEach(({ offset, color, opacity }) => {
        gradient.addColorStop(offset, opacity === undefined ? color : withOpacity(color, opacity));
    });
    return gradient;
}
/**
 * Resolve custom SVG point shape style against the caller-provided canvas style.
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {object} base Base canvas style
 * @param {object} shapeStyle SVG shape style
 * @param {Map} paints Local paint servers
 * @param {object} box Pattern box
 * @returns {object} Draw style and paint flags
 * @private
 */
function getCustomPointDrawStyle(ctx, base, shapeStyle, paints, box) {
    const style = { ...(base || {}) };
    if (shapeStyle.fill !== undefined) {
        if (shapeStyle.fill === null) {
            delete style.fill;
        }
        else if (getCustomPointPaintId(shapeStyle.fill)) {
            const paint = paints.get(getCustomPointPaintId(shapeStyle.fill));
            paint && (style.fill = createCustomPointPaint(ctx, paint, box));
        }
        else if (!/^url\(/.test(shapeStyle.fill)) {
            style.fill = shapeStyle.fill;
        }
    }
    if (shapeStyle.stroke !== undefined) {
        if (shapeStyle.stroke === null) {
            delete style.stroke;
        }
        else if (getCustomPointPaintId(shapeStyle.stroke)) {
            const paint = paints.get(getCustomPointPaintId(shapeStyle.stroke));
            paint && (style.stroke = createCustomPointPaint(ctx, paint, box));
        }
        else if (!/^url\(/.test(shapeStyle.stroke)) {
            style.stroke = shapeStyle.stroke;
        }
    }
    shapeStyle.lineWidth !== undefined && (style.lineWidth = shapeStyle.lineWidth);
    return {
        style,
        shouldFill: shapeStyle.fill !== null && (!style.stroke || style.fill !== undefined),
        shouldStroke: shapeStyle.stroke !== null && style.stroke !== undefined,
        alpha: shapeStyle.alpha
    };
}
/**
 * Draw built-in or custom SVG point pattern.
 * @param {CanvasPainter} painter Canvas painter
 * @param {string} pattern Point type or SVG pattern
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} r Radius
 * @param {object} style Optional style
 * @param {number} baseR Unexpanded radius used to resolve custom pattern scale
 * @private
 */
function drawPointPattern(painter, pattern, x, y, r, style, baseR = r) {
    if (isBuiltinPointType(pattern)) {
        painter.point(pattern, x, y, r, style);
        return;
    }
    const parsed = parseCustomPointPattern(pattern);
    if (!parsed || r <= 0) {
        painter.point("circle", x, y, r, style);
        return;
    }
    painter.withState(ctx => {
        const { box, paints, shapes } = parsed;
        const scale = baseR > 0 ? r / baseR : 1;
        const drawShape = (shape) => {
            const { style: drawStyle, shouldFill, shouldStroke, alpha } = getCustomPointDrawStyle(ctx, style, shape.style, paints, box);
            ctx.save();
            painter.applyStyle(drawStyle);
            alpha !== undefined && (ctx.globalAlpha *= alpha);
            ctx.transform(...shape.matrix);
            ctx.beginPath();
            if (shape.type === "path") {
                if (win.Path2D) {
                    const path = shape.path2D || (shape.path2D = new win.Path2D(shape.d));
                    shouldFill && ctx.fill(path);
                    shouldStroke && ctx.stroke(path);
                }
            }
            else {
                traceCustomPointShape(ctx, shape);
                shouldFill && ctx.fill();
                shouldStroke && ctx.stroke();
            }
            ctx.restore();
        };
        ctx.translate(x - (box.x + box.w / 2) * scale, y - (box.y + box.h / 2) * scale);
        ctx.scale(scale, scale);
        shapes.forEach(drawShape);
    });
}

export { drawPointPattern };
