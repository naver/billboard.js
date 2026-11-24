/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type CanvasRenderer from "./CanvasRenderer";
import type {CanvasThemeExtension} from "./CanvasTheme";
import type HitDetector from "./HitDetector";

// the section of the canvas theme for sankey: read from the same stylesheet as SVG
const sankeyTheme: CanvasThemeExtension = {
	section: "sankey",

	probe({probeIn, axisFont, toColor, toNumber}) {
		const link = probeIn("bb-chart-sankey", "path", "bb-sankey-link", ["stroke-opacity"]);
		const label = probeIn("bb-chart-sankey", "text", "bb-sankey-label", ["fill", "font"]);

		return {
			linkOpacity: toNumber(link["stroke-opacity"], 0.4),
			labelFont: label.font || axisFont,
			labelColor: toColor(label.fill, "#000")
		};
	},

	selectors: {
		".bb-sankey-link": (style, {readNumberValue}) => ({
			linkOpacity: readNumberValue(style, "stroke-opacity")
		}),
		".bb-sankey-label": (style, {readColorValue, readFontValue}) => ({
			labelColor: readColorValue(style, "fill"),
			labelFont: readFontValue(style)
		})
	},

	normalize(section, {toNumber}) {
		section.linkOpacity = toNumber(section.linkOpacity, 0.4);
	}
};

/**
 * Canvas drawing, hit detection and theme of the sankey type.
 * Added to the chart by sankey(): bundles without sankey do not carry it.
 */
export default {
	theme: sankeyTheme,

	/**
	 * Draw the links, the nodes and their names on canvas.
	 * Layout comes from the shared sankey layout, same as SVG rendering.
	 * @param {CanvasRenderer} renderer Canvas renderer
	 * @private
	 */
	draw(renderer: CanvasRenderer): void {
		const $$ = this;
		const {painter, theme: {style: {sankey, shape}}} = renderer;
		const {config} = $$;
		const {nodes, links} = $$.getSankeyLayout();
		const rotated = config.sankey_rotated;
		const linkOpacity = config.sankey_link_opacity ?? sankey.linkOpacity;
		const borderWidth = config.sankey_node_border_width;
		// focus: same opacity as the SVG elements of the bb-defocused class
		const getAlpha = d => ($$.isSankeyDefocused(d) ? shape.targetDefocusedOpacity : 1);

		links.forEach(link => {
			const [p0, p1, p2, p3] = $$.getSankeyLinkPoints(link);
			const [start, end] = $$.getSankeyLinkColors(link);
			let stroke: string | CanvasGradient = start;

			if (start !== end) {
				// along the flow
				stroke = rotated ?
					painter.context.createLinearGradient(0, p0[1], 0, p3[1]) :
					painter.context.createLinearGradient(p0[0], 0, p3[0], 0);
				stroke.addColorStop(0, start);
				stroke.addColorStop(1, end);
			}

			painter.strokePath(ctx => {
				ctx.moveTo(p0[0], p0[1]);
				ctx.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
			}, {stroke, lineWidth: Math.max(1, link.width), alpha: linkOpacity * getAlpha(link)});
		});

		nodes.forEach(node => {
			const alpha = getAlpha(node);

			const rect = {
				x: node.x0,
				y: node.y0,
				w: Math.max(1, node.x1 - node.x0),
				h: Math.max(1, node.y1 - node.y0)
			};

			painter.fillRect(rect, {fill: node.color, alpha});
			borderWidth && painter.strokeRect(rect, {
				stroke: config.sankey_node_border_color,
				lineWidth: borderWidth,
				alpha
			});

			const label = $$.getSankeyLabel(node);

			label?.text && painter.text(label.text, label.x, label.y, {
				fill: sankey.labelColor,
				alpha,
				font: sankey.labelFont,
				textAlign: label.align,
				textBaseline: label.baseline
			});
		});
	},

	/**
	 * Add the hit items of the nodes, then of the links: a node wins over the links under it,
	 * and a link over the links painted before it.
	 * @param {HitDetector} detector Hit detector
	 * @private
	 */
	hits(detector: HitDetector): void {
		const $$ = this;
		const {nodes, links} = $$.getSankeyLayout();

		nodes.forEach(node => {
			detector.addBar({
				x: node.x0,
				y: node.y0,
				w: Math.max(1, node.x1 - node.x0),
				h: Math.max(1, node.y1 - node.y0),
				data: $$.getSankeyNodeData(node)
			});
		});

		const rotated = $$.config.sankey_rotated;

		links.slice().reverse().forEach(link => {
			const [[fs, c0], , , [ft, c1]] = $$.getSankeyLinkPoints(link, true);
			const half = Math.max(1, link.width) / 2;
			// the curve stays between its ends: the box of the ends holds the whole band
			const c = Math.min(c0, c1) - half;
			const box = {f: fs, c, df: ft - fs, dc: Math.max(c0, c1) + half - c};

			detector.addBar({
				x: rotated ? box.c : box.f,
				y: rotated ? box.f : box.c,
				w: rotated ? box.dc : box.df,
				h: rotated ? box.df : box.dc,
				data: $$.getSankeyLinkData(link),
				hit: (x, y) => $$.isSankeyLinkHit(link, x, y)
			});
		});
	}
};
