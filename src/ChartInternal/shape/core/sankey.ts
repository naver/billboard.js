/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * The node layout is ported from d3-sankey (https://github.com/d3/d3-sankey)
 * Copyright 2015, Mike Bostock. Released under the BSD-3-Clause license.
 */
import {isFunction} from "../../../module/util";

// class names of the sankey elements
export const $SANKEY = {
	chartSankey: "bb-chart-sankey",
	sankeyLinks: "bb-sankey-links",
	sankeyLink: "bb-sankey-link",
	sankeyNodes: "bb-sankey-nodes",
	sankeyNode: "bb-sankey-node",
	sankeyLabel: "bb-sankey-label"
};

export interface ISankeyNode {
	id: string;
	name: string;
	index: number;
	value: number;
	color: string;
	sourceLinks: ISankeyLink[];
	targetLinks: ISankeyLink[];
	depth: number;
	height: number;
	layer: number;
	x0: number;
	x1: number;
	y0: number;
	y1: number;
}

export interface ISankeyLink {
	source: ISankeyNode;
	target: ISankeyNode;
	value: number;
	index: number;
	// the thickness of the link, and its center across the flow at the source and the target:
	// y when the flow goes to the right, x when it goes down (sankey.rotated)
	width: number;
	y0: number;
	y1: number;
}

export interface ISankeyLayout {
	nodes: ISankeyNode[];
	links: ISankeyLink[];
	area: {left: number, top: number, width: number, height: number};
}

export interface ISankeyLabel {
	text: string;
	x: number;
	y: number;
	align: "left" | "right" | "center";
	baseline: "middle" | "top" | "bottom";
}

type TAlign = (node: ISankeyNode, n: number) => number;

const ALIGN: {[key: string]: TAlign} = {
	left: node => node.depth,
	right: (node, n) => n - 1 - node.height,
	justify: (node, n) => (node.sourceLinks.length ? node.depth : n - 1),
	center: node => (
		node.targetLinks.length ?
			node.depth :
			(node.sourceLinks.length ?
				Math.min(...node.sourceLinks.map(l => l.target.depth)) - 1 :
				0)
	)
};

// the property of the object itself: "constructor" or "toString" as a data id is not a key
const own = (obj, key: string) =>
	obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : undefined;

const sum = (list: ISankeyLink[]) => list.reduce((acc, l) => acc + l.value, 0);
const byBreadth = (a: ISankeyNode, b: ISankeyNode) => a.y0 - b.y0;
const bySourceBreadth = (a: ISankeyLink, b: ISankeyLink) =>
	byBreadth(a.source, b.source) || a.index - b.index;
const byTargetBreadth = (a: ISankeyLink, b: ISankeyLink) =>
	byBreadth(a.target, b.target) || a.index - b.index;

// a link is drawn for a positive finite value only
const _isLinkValue = (value: number): boolean => value > 0 && Number.isFinite(value);

/**
 * Get the nodes and the links from the data.
 * A data series is a source node, and its values are the links to the nodes named by their x.
 * @returns {object} Nodes and links
 * @private
 */
function _getGraph(): {nodes: ISankeyNode[], links: ISankeyLink[]} {
	const $$ = this;
	const {config} = $$;
	const targets = $$.data.targets.filter($$.isSankeyType.bind($$));
	const nodeMap = new Map<string, ISankeyNode>();
	const nodes: ISankeyNode[] = [];
	const links: ISankeyLink[] = [];

	// the series get their colors in the data order first, shown or not:
	// the colors of the nodes do not depend on what is hidden, nor on the renderer
	targets.forEach(t => $$.color(t.id));

	// then the nodes that are only targets, in the order their links are in the data
	targets.forEach(t =>
		t.values.forEach(v => _isLinkValue(Number(v.value)) && $$.color(String(v.x)))
	);

	const getNode = (id: string): ISankeyNode => {
		let node = nodeMap.get(id);

		if (!node) {
			node = {
				id,
				name: String(own(config.data_names, id) ?? id),
				index: nodes.length,
				value: 0,
				color: $$.color(id),
				sourceLinks: [],
				targetLinks: [],
				depth: 0,
				height: 0,
				layer: 0,
				x0: 0,
				x1: 0,
				y0: 0,
				y1: 0
			};

			nodeMap.set(id, node);
			nodes.push(node);
		}

		return node;
	};

	// a hidden series is a hidden node: the links to it are not there as well
	targets.filter(t => $$.isTargetToShow(t.id)).forEach(t => {
		t.values.forEach(v => {
			const value = Number(v.value);

			// a link that can not be drawn is not there
			if (!_isLinkValue(value) || !$$.isTargetToShow(String(v.x))) {
				return;
			}

			const source = getNode(t.id);
			const target = getNode(String(v.x));
			const link = {source, target, value, index: links.length, width: 0, y0: 0, y1: 0};

			source.sourceLinks.push(link);
			target.targetLinks.push(link);
			links.push(link);
		});
	});

	nodes.forEach(node => {
		node.value = Math.max(sum(node.sourceLinks), sum(node.targetLinks));
	});

	return {nodes, links};
}

/**
 * Set the depth (from the sources) or the height (from the sinks) of the nodes.
 * @param {Array} nodes Nodes
 * @param {string} key "depth" or "height"
 * @returns {boolean} false when the links make a cycle
 * @private
 */
function _setDepth(nodes: ISankeyNode[], key: "depth" | "height"): boolean {
	const linksKey = key === "depth" ? "sourceLinks" : "targetLinks";
	const nodeKey = key === "depth" ? "target" : "source";
	let current = new Set(nodes);
	let x = 0;

	while (current.size) {
		const next = new Set<ISankeyNode>();

		current.forEach(node => {
			node[key] = x;
			node[linksKey].forEach(link => next.add(link[nodeKey]));
		});

		// a node is deeper than the number of the nodes only in a cycle
		if (++x > nodes.length) {
			return false;
		}

		current = next;
	}

	return true;
}

/**
 * Get the order of the nodes in a column, by sankey.node.sort.
 * @returns {function|null} Comparator, null when the layout orders them ("auto")
 * @private
 */
function _getNodeSort(): ((a: ISankeyNode, b: ISankeyNode) => number) | null {
	const $$ = this;
	const sort = $$.config.sankey_node_sort;
	const byIndex = (a: ISankeyNode, b: ISankeyNode) => a.index - b.index;

	if (isFunction(sort)) {
		return (a, b) =>
			sort.call($$.api, $$.getSankeyNodeData(a), $$.getSankeyNodeData(b)) ||
			byIndex(a, b);
	}

	return own({
		data: byIndex,
		asc: (a: ISankeyNode, b: ISankeyNode) => a.value - b.value || byIndex(a, b),
		desc: (a: ISankeyNode, b: ISankeyNode) => b.value - a.value || byIndex(a, b)
	}, sort) ?? null;
}

/**
 * Lay out the nodes and the links in the given area.
 * @param {Array} nodes Nodes
 * @param {Array} links Links
 * @param {object} area Area to lay out in
 * @private
 */
function _layout(nodes: ISankeyNode[], links: ISankeyLink[], area): void {
	const $$ = this;
	const {config} = $$;
	const x0 = area.left;
	const y0 = area.top;
	const x1 = x0 + area.width;
	const y1 = y0 + area.height;
	const dx = config.sankey_node_width;
	const align = ALIGN[config.sankey_node_align] ?? ALIGN.justify;
	const sort = _getNodeSort.call($$);

	// layers: the columns of the nodes
	const n = Math.max(...nodes.map(d => d.depth)) + 1;
	const kx = n > 1 ? (x1 - x0 - dx) / (n - 1) : 0;
	const columns: ISankeyNode[][] = Array.from({length: n}, () => []);

	nodes.forEach(node => {
		const i = Math.max(0, Math.min(n - 1, Math.floor(align(node, n))));

		node.layer = i;
		node.x0 = x0 + i * kx;
		node.x1 = node.x0 + dx;
		columns[i].push(node);
	});

	// as d3-sankey nodeSort: a set order is kept, the layout does not sort the columns again
	sort && columns.forEach(column => column.sort(sort));

	const maxLength = Math.max(...columns.map(c => c.length));
	const py = Math.min(config.sankey_node_padding,
		maxLength > 1 ? (y1 - y0) / (maxLength - 1) : Infinity);

	const reorderLinks = (node: ISankeyNode) => {
		node.sourceLinks.sort(byTargetBreadth);
		node.targetLinks.sort(bySourceBreadth);
	};

	// the links of the nodes linked to the node are sorted again, after it moved
	const reorderNodeLinks = (node: ISankeyNode) => {
		node.targetLinks.forEach(l => l.source.sourceLinks.sort(byTargetBreadth));
		node.sourceLinks.forEach(l => l.target.targetLinks.sort(bySourceBreadth));
	};

	// initial breadths: the nodes of each column are stacked, and the column is centered
	const ky = Math.min(...columns.map(c =>
		(y1 - y0 - (c.length - 1) * py) /
		c.reduce((acc, d) => acc + d.value, 0)
	));

	columns.forEach(column => {
		let y = y0;

		column.forEach(node => {
			node.y0 = y;
			node.y1 = y + node.value * ky;
			y = node.y1 + py;
			node.sourceLinks.forEach(link => {
				link.width = link.value * ky;
			});
		});

		const offset = (y1 - y + py) / (column.length + 1);

		column.forEach((node, i) => {
			node.y0 += offset * (i + 1);
			node.y1 += offset * (i + 1);
		});

		column.forEach(reorderLinks);
	});

	const move = (node: ISankeyNode, dy: number) => {
		node.y0 += dy;
		node.y1 += dy;
	};

	const toBottom = (column: ISankeyNode[], y: number, i: number, alpha: number) => {
		for (; i < column.length; i++) {
			const node = column[i];
			const dy = (y - node.y0) * alpha;

			dy > 1e-6 && move(node, dy);
			y = node.y1 + py;
		}
	};

	const toTop = (column: ISankeyNode[], y: number, i: number, alpha: number) => {
		for (; i >= 0; i--) {
			const node = column[i];
			const dy = (node.y1 - y) * alpha;

			dy > 1e-6 && move(node, -dy);
			y = node.y0 - py;
		}
	};

	const resolveCollisions = (column: ISankeyNode[], alpha: number) => {
		const i = column.length >> 1;
		const subject = column[i];

		toTop(column, subject.y0 - py, i - 1, alpha);
		toBottom(column, subject.y1 + py, i + 1, alpha);
		toTop(column, y1, column.length - 1, alpha);
		toBottom(column, y0, 0, alpha);
	};

	// the y of the link at the target, when it would be at the place of the source
	const targetTop = (source: ISankeyNode, target: ISankeyNode) => {
		let y = source.y0 - (source.sourceLinks.length - 1) * py / 2;

		for (const {target: node, width} of source.sourceLinks) {
			if (node === target) {
				break;
			}

			y += width + py;
		}

		for (const {source: node, width} of target.targetLinks) {
			if (node === source) {
				break;
			}

			y -= width;
		}

		return y;
	};

	const sourceTop = (source: ISankeyNode, target: ISankeyNode) => {
		let y = target.y0 - (target.targetLinks.length - 1) * py / 2;

		for (const {source: node, width} of target.targetLinks) {
			if (node === source) {
				break;
			}

			y += width + py;
		}

		for (const {target: node, width} of source.sourceLinks) {
			if (node === target) {
				break;
			}

			y -= width;
		}

		return y;
	};

	// move each node toward the weighted center of the nodes linked to it
	const relax = (column: ISankeyNode[], toRight: boolean, alpha: number, beta: number) => {
		column.forEach(node => {
			let y = 0;
			let w = 0;

			(toRight ? node.targetLinks : node.sourceLinks).forEach(link => {
				const v = link.value * (link.target.layer - link.source.layer);

				y += (toRight ? targetTop(link.source, node) : sourceTop(node, link.target)) * v;
				w += v;
			});

			if (w > 0) {
				move(node, (y / w - node.y0) * alpha);
				reorderNodeLinks(node);
			}
		});

		sort || column.sort(byBreadth);
		resolveCollisions(column, beta);
	};

	const iterations = config.sankey_iterations;

	for (let i = 0; i < iterations; i++) {
		const alpha = 0.99 ** i;
		const beta = Math.max(1 - alpha, (i + 1) / iterations);

		for (let c = columns.length - 2; c >= 0; c--) {
			relax(columns[c], false, alpha, beta);
		}

		for (let c = 1; c < columns.length; c++) {
			relax(columns[c], true, alpha, beta);
		}
	}

	// the links are stacked on their nodes, in the order of the nodes at the other end
	nodes.forEach(node => {
		let ys = node.y0;
		let yt = node.y0;

		node.sourceLinks.forEach(link => {
			link.y0 = ys + link.width / 2;
			ys += link.width;
		});

		node.targetLinks.forEach(link => {
			link.y1 = yt + link.width / 2;
			yt += link.width;
		});
	});
}

/**
 * Get the area the sankey is drawn in, in chart coordinates.
 * @returns {object} Area
 * @private
 */
function _getArea(): {left: number, top: number, width: number, height: number} {
	const $$ = this;
	const {config, state: {current: {width, height}, isCanvasMode, isLegendRight}} = $$;
	const padding = $$.getCurrentPadding();
	// canvas mode draws the legend as HTML outside of its drawing surface: only the gap is needed
	const legendHeight = config.legend_show && config.legend_position === "bottom" ?
		(isCanvasMode ? 0 : $$.getLegendHeight()) + 10 :
		0;
	const legendRight = config.legend_show && isLegendRight ?
		$$.getLegendWidth() + (config.padding?.mode === "fit" ? 0 : 20) :
		0;
	const surfaceHeight = isCanvasMode ? $$.getCanvasSurfaceHeight() : height;

	return {
		left: padding.left,
		top: padding.top,
		width: Math.max(0, width - padding.left - padding.right - legendRight),
		height: Math.max(0, surfaceHeight - padding.top - padding.bottom - legendHeight)
	};
}

/**
 * Swap the x and the y of an area.
 * @param {object} area Area
 * @returns {object} Transposed area
 * @private
 */
function _transpose(area) {
	return {left: area.top, top: area.left, width: area.height, height: area.width};
}

/**
 * Swap the x and the y of a node.
 * @param {object} node Node
 * @private
 */
function _transposeNode(node: ISankeyNode): void {
	const {x0, x1, y0, y1} = node;

	Object.assign(node, {x0: y0, x1: y1, y0: x0, y1: x1});
}

/**
 * Get the point on the link at the given position along the flow.
 * The link is the cubic bezier curve of linkHorizontal (linkVertical when rotated).
 * @param {Array} points Start, control 1, control 2 and end point, along the flow and across it
 * @param {number} width Thickness of the link
 * @param {number} f Position along the flow
 * @returns {object} Position across the flow of the center line, and the half of the thickness there
 * @private
 */
function _getLinkPointAt(points: [number, number][], width: number,
	f: number): {c: number, half: number} {
	const [[fs, c0], [fm], , [ft, c1]] = points;
	const bf = (t: number) => (
		(1 - t) ** 3 * fs + 3 * (1 - t) * t * fm + t ** 3 * ft
	);

	// the flow position of the curve is monotone: find its t by bisection
	let lo = 0;
	let hi = 1;

	for (let i = 0; i < 20; i++) {
		const mid = (lo + hi) / 2;

		(bf(mid) < f) === (fs < ft) ? (lo = mid) : (hi = mid);
	}

	const t = (lo + hi) / 2;
	const df = 3 * (1 - t) ** 2 * (fm - fs) + 3 * t ** 2 * (ft - fm);
	const dc = 6 * t * (1 - t) * (c1 - c0);
	const slope = df ? dc / df : 0;

	return {
		c: c0 + (c1 - c0) * (3 * t ** 2 - 2 * t ** 3),
		half: width / 2 * Math.sqrt(1 + slope * slope)
	};
}

/**
 * How the sankey differs from the other types for the shared code.
 * It asks these through `getCustomTypeHooks()` (they are registered with the type name).
 * @private
 */
export const customTypeHooks = {
	// the data of the nodes and the links have their names (data.names applied, "A → B")
	namedData: true,

	// svg: the links and the target only nodes are not of the target classes focus() finds
	afterFocus($$): void {
		$$.updateSankeyFocus?.();
	},

	// the names of the nodes are drawn by the type: there are no data labels of the values
	labelData(): [] {
		return [];
	},

	// the tooltip of a node, addressed by its id (tooltip.show({data: {id}})) or by its index
	tooltipTarget($$, args) {
		const {nodes} = $$.getSankeyLayout();
		const node = args.data?.id ? nodes.find(d => d.id === args.data.id) : nodes[args.index];
		const data = node ? [$$.getSankeyNodeData(node)] : [];

		const point = node &&
			($$.config.sankey_rotated ?
				[(node.x0 + node.x1) / 2, node.y1] :
				[node.x1, (node.y0 + node.y1) / 2]);

		return {data, point};
	}
};

export default {
	/**
	 * Whether the data belongs to the sankey type.
	 * @param {object} d Data object
	 * @returns {boolean}
	 * @private
	 */
	isSankeyType(d): boolean {
		return this.isTypeOf(d, "sankey");
	},

	/**
	 * Get the layout of the nodes and the links, in chart coordinates.
	 * Shared by the SVG and the canvas renderer.
	 * @returns {object} Sankey layout
	 * @private
	 */
	getSankeyLayout(): ISankeyLayout {
		const $$ = this;
		const area = _getArea.call($$);
		const {nodes, links} = _getGraph.call($$);

		if (nodes.length) {
			if (_setDepth(nodes, "depth") && _setDepth(nodes, "height")) {
				const rotated = $$.config.sankey_rotated;

				// rotated: laid out along the flow as it goes to the right, then turned to go down
				_layout.call($$, nodes, links, rotated ? _transpose(area) : area);
				rotated && nodes.forEach(_transposeNode);
			} else {
				// not thrown: the other parts of the chart keep working
				console.error(
					"[billboard.js] The links of the sankey chart make a cycle: it can't be drawn."
				);

				return {nodes: [], links: [], area};
			}
		}

		return {nodes, links, area};
	},

	/**
	 * Get the points of a link: the same curve as d3-shape linkHorizontal (linkVertical when rotated).
	 * @param {object} link Link
	 * @param {boolean} [flow=false] Whether to get them as [along the flow, across it], for any rotation
	 * @returns {Array} Start, control 1, control 2 and end point
	 * @private
	 */
	getSankeyLinkPoints(link: ISankeyLink, flow = false): [number, number][] {
		const rotated = this.config.sankey_rotated;
		const fs = rotated ? link.source.y1 : link.source.x1;
		const ft = rotated ? link.target.y0 : link.target.x0;
		const fm = (fs + ft) / 2;
		const points: [number, number][] = [[fs, link.y0], [fm, link.y0], [fm, link.y1], [
			ft,
			link.y1
		]];

		return rotated && !flow ? points.map(([f, c]) => [c, f]) : points;
	},

	/**
	 * Get the SVG path of a link.
	 * @param {object} link Link
	 * @returns {string} Path
	 * @private
	 */
	getSankeyLinkPath(link: ISankeyLink): string {
		const [p0, p1, p2, p3] = this.getSankeyLinkPoints(link);

		return `M${p0}C${p1},${p2},${p3}`;
	},

	/**
	 * Whether the point is on the link.
	 * @param {object} link Link
	 * @param {number} x X coordinate
	 * @param {number} y Y coordinate
	 * @returns {boolean}
	 * @private
	 */
	isSankeyLinkHit(link: ISankeyLink, x: number, y: number): boolean {
		const points = this.getSankeyLinkPoints(link, true);
		const [f, c] = this.config.sankey_rotated ? [y, x] : [x, y];

		if (f < points[0][0] || f > points[3][0]) {
			return false;
		}

		// the thinnest link is drawn 1px thick
		const point = _getLinkPointAt(points, Math.max(1, link.width), f);

		return Math.abs(c - point.c) <= point.half;
	},

	/**
	 * Get the label of a node: its name, or the text of sankey.label.format.
	 * @param {object} node Node
	 * @returns {object|null} Text, position and alignment, null when it is not shown
	 * @private
	 */
	getSankeyLabel(node: ISankeyNode): ISankeyLabel | null {
		const $$ = this;
		const {config} = $$;

		if (!config.sankey_label_show) {
			return null;
		}

		const format = config.sankey_label_format;
		const text = String(
			(isFunction(format) ?
				format.call($$.api, node.name, node.value, node.id) :
				node.name) ?? ""
		);
		// on the inner side of the node: the nodes of the far half have it before them
		const area = _getArea.call($$);

		if (config.sankey_rotated) {
			const isEnd = node.y0 > area.top + area.height / 2;

			return {
				text,
				x: (node.x0 + node.x1) / 2,
				y: isEnd ? node.y0 - 6 : node.y1 + 6,
				align: "center",
				baseline: isEnd ? "bottom" : "top"
			};
		}

		const isEnd = node.x0 > area.left + area.width / 2;

		return {
			text,
			x: isEnd ? node.x0 - 6 : node.x1 + 6,
			y: (node.y0 + node.y1) / 2,
			align: isEnd ? "right" : "left",
			baseline: "middle"
		};
	},

	/**
	 * Get the colors a link is painted with, by the sankey.link.color option.
	 * @param {object} link Link
	 * @returns {Array} The color at the source end and the color at the target end
	 * @private
	 */
	getSankeyLinkColors(link: ISankeyLink): [string, string] {
		const {source: {color: source}, target: {color: target}} = link;

		return {
			source: [source, source],
			target: [target, target],
			gradient: [source, target]
		}[this.config.sankey_link_color] || [source, source];
	},

	/**
	 * Check whether a node or a link is defocused by focus(), defocus() or a legend hover.
	 * A link follows its source series. A target only node has no series, so it is defocused
	 * when all the links coming to it are.
	 * @param {object} d Node or link
	 * @returns {boolean} Whether it is defocused
	 * @private
	 */
	isSankeyDefocused(d: ISankeyNode | ISankeyLink): boolean {
		const $$ = this;
		const ids: Set<string> | undefined = $$.state.defocusedTargetIds;

		if (!ids?.size) {
			return false;
		}

		if ("source" in d) {
			return ids.has(d.source.id);
		}

		return ids.has(d.id) || (
			d.targetLinks.length > 0 &&
			!$$.data.targets.some(t => t.id === d.id) &&
			d.targetLinks.every(link => ids.has(link.source.id))
		);
	},

	/**
	 * Get the data of a node, for the tooltip and the events.
	 * @param {object} node Node
	 * @returns {object} Data
	 * @private
	 */
	getSankeyNodeData(node: ISankeyNode) {
		return {id: node.id, index: node.index, value: node.value, name: node.name};
	},

	/**
	 * Get the data of a link, for the tooltip and the events.
	 * It is of the series of the source: the name tells the source and the target.
	 * @param {object} link Link
	 * @returns {object} Data
	 * @private
	 */
	getSankeyLinkData(link: ISankeyLink) {
		const {source, target, value, index} = link;

		return {
			id: source.id,
			x: target.id,
			index,
			value,
			name: `${source.name} → ${target.name}`,
			source: source.id,
			target: target.id
		};
	},

	/**
	 * The data labels of the values are not drawn for the sankey (see customTypeHooks.labelData).
	 * The shared data label code asks the points of every type, so it is there.
	 * @returns {function} Point getter
	 * @private
	 */
	generateGetSankeyPoints(): () => undefined {
		return () => undefined;
	}
};
