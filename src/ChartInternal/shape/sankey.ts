/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {$COMMON, $FOCUS, $SHAPE} from "../../config/classes";
import shapeSankeyCommon, {$SANKEY, type ISankeyLink, type ISankeyNode} from "./core/sankey";

export default {
	...shapeSankeyCommon,

	/**
	 * Initialize sankey
	 * @private
	 */
	initSankey(): void {
		const $$ = this;
		const {$el} = $$;

		$el.sankey = $el.main.select(`.${$COMMON.chart}`)
			.append("g")
			.classed($SANKEY.chartSankey, true);

		// the gradients of the links, for sankey.link.color="gradient"
		$el.sankey.append("defs");

		// the links are under the nodes
		$el.sankey.append("g").classed($SANKEY.sankeyLinks, true);
		$el.sankey.append("g").classed($SANKEY.sankeyNodes, true);

		$$.bindSankeyEvent();
	},

	/**
	 * Bind events
	 * @private
	 */
	bindSankeyEvent(): void {
		const $$ = this;
		const {$el: {sankey}, config, state} = $$;

		if (!config.interaction_enabled) {
			return;
		}

		const getTarget = event => {
			// events emulated by the tooltip API are dispatched on the group itself
			const target = event.target === sankey.node() ?
				state.eventReceiver.rect?.node?.() :
				event.target;

			if (target && /^(rect|path)$/i.test(target.tagName)) {
				const datum: any = d3Select(target).datum();

				if (datum?.sourceLinks) {
					state.event = event;
					return $$.getSankeyNodeData(datum);
				} else if (datum?.source) {
					state.event = event;
					return $$.getSankeyLinkData(datum);
				}
			}
		};

		const isTouch = state.inputType === "touch";

		sankey
			.on(isTouch ? "touchstart" : "mouseover mousemove", event => {
				const data = getTarget(event);

				if (data) {
					$$.showTooltip([data], $$.$el.svg.node());
					/^(touchstart|mouseover)$/.test(event.type) &&
						$$.setOverOut(true, data, event.target);
				}
			}, isTouch ? {passive: true} : undefined)
			.on(isTouch ? "touchend" : "mouseout", event => {
				const data = getTarget(event);

				if (config.interaction_onout) {
					$$.hideTooltip();
					$$.setOverOut(false, data, event.target);
				}
			})
			.on("click", event => {
				const data = getTarget(event);

				data && config.data_onclick.bind($$.api)(data, event.target);
			});
	},

	/**
	 * Update targets for sankey.
	 * The nodes and the links are made from all the series together, on redraw.
	 * @private
	 */
	updateTargetsForSankey(): void {
		const $$ = this;

		!$$.$el.sankey && $$.initSankey();
	},

	/**
	 * Set the defocused class of the links and the nodes, from the focus state.
	 * @private
	 */
	updateSankeyFocus(): void {
		const $$ = this;
		const isDefocused = d => $$.isSankeyDefocused(d);

		$$.$el.sankey?.selectAll(`.${$SANKEY.sankeyLink}, .${$SANKEY.sankeyNode}`)
			.classed($FOCUS.defocused, isDefocused);
	},

	/**
	 * Render sankey
	 * @param {boolean} withTransition Whether to transit
	 * @private
	 */
	redrawSankey(withTransition?: boolean): void {
		const $$ = this;
		const {$el: {sankey}, config, state} = $$;
		const {nodes, links} = $$.getSankeyLayout();
		const rotated = config.sankey_rotated;
		const borderWidth = config.sankey_node_border_width;
		const linkKey = (d: ISankeyLink) => `${d.source.id}\u0000${d.target.id}\u0000${d.index}`;
		const nodeKey = (d: ISankeyNode) => d.id;
		const gradientId = (d: ISankeyLink) => `${state.datetimeId}-sankey-link-${d.index}`;

		// sankey.link.opacity: the stylesheet reads it, and keeps the hover highlight over it
		sankey.style("--bb-sankey-link-opacity", config.sankey_link_opacity ?? null);

		// links
		const link = sankey.select(`.${$SANKEY.sankeyLinks}`)
			.selectAll(`.${$SANKEY.sankeyLink}`)
			.data(links, linkKey);

		link.exit().remove();

		const linkMerge = link.enter()
			.append("path")
			.style("opacity", "0")
			.merge(link)
			.attr("class", d => $$.generateClass($SANKEY.sankeyLink, d.source.id))
			.style("stroke", d => {
				const [start, end] = $$.getSankeyLinkColors(d);

				return start === end ? start : `url(#${gradientId(d)})`;
			});

		// a gradient along the flow for each link painted with two colors
		const gradient = sankey.select("defs")
			.selectAll("linearGradient")
			.data(links.filter(d => {
				const [start, end] = $$.getSankeyLinkColors(d);

				return start !== end;
			}));

		gradient.exit().remove();

		gradient.enter()
			.append("linearGradient")
			.attr("gradientUnits", "userSpaceOnUse")
			.call(g => {
				g.append("stop").attr("offset", "0");
				g.append("stop").attr("offset", "1");
			})
			.merge(gradient)
			.attr("id", d => gradientId(d))
			.each(function(d) {
				const [[start], , , [end]] = $$.getSankeyLinkPoints(d, true);
				const [along, across] = rotated ? ["y", "x"] : ["x", "y"];
				const colors = $$.getSankeyLinkColors(d);

				d3Select(this)
					.attr(`${along}1`, start)
					.attr(`${along}2`, end)
					.attr(`${across}1`, 0)
					.attr(`${across}2`, 0)
					.selectAll("stop")
					.attr("stop-color", (_, j) => colors[j]);
			});

		$$.$T(linkMerge, withTransition)
			.attr("d", d => $$.getSankeyLinkPath(d))
			.style("stroke-width", d => `${Math.max(1, d.width)}px`)
			.style("opacity", null);

		// nodes, and their names
		const node = sankey.select(`.${$SANKEY.sankeyNodes}`)
			.selectAll(`.${$SANKEY.sankeyNode}`)
			.data(nodes, nodeKey);

		node.exit().remove();

		const nodeEnter = node.enter().append("g");

		nodeEnter.append("rect").attr("class", $SHAPE.shape);
		nodeEnter.append("text").attr("class", $SANKEY.sankeyLabel);

		// the target class of the node id: show(), hide(), focus() and tooltip.show() find it so
		const nodeMerge = nodeEnter.merge(node)
			.attr("class", d => $SANKEY.sankeyNode + $$.classTarget(d.id));

		nodeMerge.select("rect")
			.datum(d => d)
			.style("fill", d => d.color)
			.style("stroke", borderWidth ? config.sankey_node_border_color : null)
			.style("stroke-width", borderWidth ? `${borderWidth}px` : null)
			.call(sel => {
				$$.$T(sel, withTransition)
					.attr("x", d => d.x0)
					.attr("y", d => d.y0)
					.attr("width", d => Math.max(1, d.x1 - d.x0))
					.attr("height", d => Math.max(1, d.y1 - d.y0));
			});

		nodeMerge.select("text")
			.datum(d => d)
			.each(function(d: ISankeyNode) {
				const label = $$.getSankeyLabel(d);
				const text = d3Select(this);

				if (label) {
					text.text(label.text)
						.attr("dy", {middle: ".35em", top: ".71em", bottom: "0"}[label.baseline])
						.style("text-anchor",
							{left: "start", right: "end", center: "middle"}[label.align]);

					$$.$T(text, withTransition)
						.attr("x", label.x)
						.attr("y", label.y);
				} else {
					text.text(null);
				}
			});

		// the classes are set again above: keep the focus state over a redraw
		$$.updateSankeyFocus();
	}
};
