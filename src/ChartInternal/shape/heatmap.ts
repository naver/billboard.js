/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {$COMMON, $FOCUS, $SHAPE} from "../../config/classes";
import shapeHeatmapCommon, {$HEATMAP, type IHeatmapCell, type IHeatmapText} from "./core/heatmap";

const ANCHOR = {left: "start", right: "end", center: "middle"};
const DY = {middle: ".35em", top: ".71em", bottom: "0"};

export default {
	...shapeHeatmapCommon,

	/**
	 * Initialize heatmap
	 * @private
	 */
	initHeatmap(): void {
		const $$ = this;
		const {$el} = $$;

		$el.heatmap = $el.main.select(`.${$COMMON.chart}`)
			.append("g")
			.classed($HEATMAP.chartHeatmap, true);

		// the gradient of the color bar
		$el.heatmap.append("defs");
		$el.heatmap.append("g").classed($HEATMAP.heatmapRows, true);
		$el.heatmap.append("g").classed($HEATMAP.heatmapNames, true);
		$el.heatmap.append("g").classed($HEATMAP.heatmapColorbar, true);

		$$.bindHeatmapEvent();
	},

	/**
	 * Bind events
	 * @private
	 */
	bindHeatmapEvent(): void {
		const $$ = this;
		const {$el: {heatmap}, config, state} = $$;

		if (!config.interaction_enabled) {
			return;
		}

		const getTarget = event => {
			// events emulated by the tooltip API are dispatched on the group itself
			const target = event.target === heatmap.node() ?
				state.eventReceiver.rect?.node?.() :
				event.target;

			if (target && /^rect$/i.test(target.tagName)) {
				const datum: IHeatmapCell | undefined = d3Select(target).datum() as any;

				// a cell without a value is not hit
				if (datum?.id !== undefined && datum.value !== undefined && datum.value !== null) {
					state.event = event;
					return $$.getHeatmapCellData(datum);
				}
			}
		};

		const isTouch = state.inputType === "touch";

		heatmap
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
	 * Update targets for heatmap.
	 * The cells are made from all the series together, on redraw.
	 * @private
	 */
	updateTargetsForHeatmap(): void {
		const $$ = this;

		!$$.$el.heatmap && $$.initHeatmap();
	},

	/**
	 * Draw a text of the axis or of the color bar
	 * @param {d3Selection} sel Text selection
	 * @param {boolean} withTransition Whether to transit
	 * @private
	 */
	setHeatmapText(sel, withTransition?: boolean): void {
		const $$ = this;

		sel.each(function(d: IHeatmapText) {
			d3Select(this)
				.attr("class", $HEATMAP.heatmapAxis)
				.text(d.text)
				.attr("dy", DY[d.baseline])
				.style("text-anchor", ANCHOR[d.align]);
		});

		$$.$T(sel, withTransition)
			.attr("x", d => d.x)
			.attr("y", d => d.y);
	},

	/**
	 * Render heatmap
	 * @param {boolean} withTransition Whether to transit
	 * @private
	 */
	redrawHeatmap(withTransition?: boolean): void {
		const $$ = this;
		const {$el: {heatmap}, config, state} = $$;
		const {cells, rows, axisX, axisY, colorbar} = $$.getHeatmapLayout();
		const radius = config.heatmap_cell_radius;
		const borderWidth = config.heatmap_cell_border_width;
		const byRow = new Map<string, IHeatmapCell[]>(rows.map(id => [id, []]));

		cells.forEach(d => byRow.get(d.id)?.push(d));

		// rows: the target class of the id makes show(), hide(), focus() and tooltip.show() find it
		const row = heatmap.select(`.${$HEATMAP.heatmapRows}`)
			.selectAll(`.${$HEATMAP.heatmapRow}`)
			.data(rows, d => d);

		row.exit().remove();

		const rowMerge = row.enter().append("g").merge(row)
			.attr("class", id => $HEATMAP.heatmapRow + $$.classTarget(id));

		rowMerge.each(function(id) {
			const g = d3Select(this);
			const rowCells = byRow.get(id) as IHeatmapCell[];
			const cell = g.selectAll<SVGRectElement, IHeatmapCell>(`.${$HEATMAP.heatmapCell}`)
				.data(rowCells, d => d.index);

			cell.exit().remove();

			const cellMerge = cell.enter()
				.append("rect")
				.style("opacity", "0")
				.merge(cell)
				.attr("class",
					d => `${$SHAPE.shape} ${$SHAPE.shape}-${d.index} ${$HEATMAP.heatmapCell}`)
				.style("fill", d => d.color)
				.style("stroke", <any>(borderWidth ? config.heatmap_cell_border_color : null))
				.style("stroke-width", <any>(borderWidth ? `${borderWidth}px` : null))
				.attr("rx", radius || null);

			$$.$T(cellMerge, withTransition)
				.attr("x", d => d.x0)
				.attr("y", d => d.y0)
				.attr("width", d => Math.max(0, d.x1 - d.x0))
				.attr("height", d => Math.max(0, d.y1 - d.y0))
				.style("opacity", null);

			// the values in the cells
			const label = g.selectAll<SVGTextElement, IHeatmapCell>(`.${$HEATMAP.heatmapLabel}`)
				.data(config.heatmap_label_show ? rowCells.filter(d => d.value !== null) : [],
					d => d.index);

			label.exit().remove();
			label.enter().append("text").merge(label)
				.attr("class", $HEATMAP.heatmapLabel)
				.attr("x", d => (d.x0 + d.x1) / 2)
				.attr("y", d => (d.y0 + d.y1) / 2)
				.attr("dy", ".35em")
				.style("text-anchor", "middle")
				.style("fill", d => $$.getHeatmapLabelColor(d))
				.text(d => $$.getHeatmapLabel(d));
		});

		// the names of the columns and of the rows
		const axis = heatmap.select(`.${$HEATMAP.heatmapNames}`)
			.selectAll("text")
			.data(axisX.concat(axisY), (d: IHeatmapText) => `${d.align}${d.text}`);

		axis.exit().remove();
		$$.setHeatmapText(axis.enter().append("text").merge(axis), withTransition);

		// the color bar
		const bar = heatmap.select(`.${$HEATMAP.heatmapColorbar}`);
		const gradientId = `${state.datetimeId}-heatmap-colorbar`;

		bar.selectAll("*").remove();
		heatmap.select("defs").selectAll("*").remove();

		if (colorbar) {
			heatmap.select("defs")
				.append("linearGradient")
				.attr("id", gradientId)
				.attr("x1", 0).attr("x2", colorbar.horizontal ? 1 : 0).attr("y1", 0).attr("y2",
					colorbar.horizontal ? 0 : 1)
				.selectAll("stop")
				.data(colorbar.stops)
				.enter()
				.append("stop")
				.attr("offset", d => d[0])
				.attr("stop-color", d => d[1]);

			bar.append("rect")
				.attr("x", colorbar.x)
				.attr("y", colorbar.y)
				.attr("width", colorbar.width)
				.attr("height", colorbar.height)
				.style("fill", `url(#${gradientId})`);

			$$.setHeatmapText(bar.selectAll("text").data(colorbar.labels).enter().append("text"));
		}

		$$.fitHeatmapHeight();

		// the classes are set again above: keep the focus state over a redraw
		heatmap.selectAll(`.${$HEATMAP.heatmapRow}`)
			.classed($FOCUS.defocused, id => $$.isHeatmapDefocused(id as string));
	}
};
