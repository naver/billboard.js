/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {$COMMON} from "../../config/classes";
import {getRandom} from "../../module/util";
import shapeBoxplotCommon, {$BOXPLOT} from "./core/boxplot";

export default {
	...shapeBoxplotCommon,

	/**
	 * Initialize the container of the boxplot elements
	 * @private
	 */
	initBoxplot(): void {
		const $$ = this;
		const {$el} = $$;

		$el.boxplot = $el.main.select(`.${$COMMON.chart}`)
			.append("g")
			.attr("class", $BOXPLOT.chartBoxplots);
	},

	/**
	 * Update targets by its data
	 * @param {Array} targets Filtered target by type
	 * @private
	 */
	updateTargetsForBoxplot(targets): void {
		const $$ = this;
		const {$el} = $$;

		!$$.$el.boxplot && $$.initBoxplot();

		const update = $el.main.select(`.${$BOXPLOT.chartBoxplots}`)
			.selectAll(`.${$BOXPLOT.chartBoxplot}`)
			.data($$.filterNullish(targets))
			.attr("class", d => $BOXPLOT.chartBoxplot + $$.classTarget(d.id));

		update.enter().append("g")
			.attr("class", d => $BOXPLOT.chartBoxplot + $$.classTarget(d.id))
			.style("pointer-events", "none");
	},

	/**
	 * Generate/Update elements
	 * @param {boolean} withTransition Transition for exit elements
	 * @private
	 */
	updateBoxplot(withTransition: boolean): void {
		const $$ = this;
		const {$el, $T} = $$;
		const boxplot = $el.main.selectAll(`.${$BOXPLOT.chartBoxplot}`)
			.selectAll(`.${$BOXPLOT.boxplot}`)
			.data(d => $$.getBoxplotRows(d));

		$T(boxplot.exit(), withTransition)
			.style("opacity", "0")
			.remove();

		const enter = boxplot.enter()
			.append("g")
			.attr("class", d => $$.generateClass($BOXPLOT.boxplot, d.index).trim());

		enter.append("path").attr("class", $BOXPLOT.boxplotWhisker);
		enter.append("path").attr("class", $BOXPLOT.boxplotBox);
		enter.append("path").attr("class", $BOXPLOT.boxplotMedian);

		$el.boxplot = boxplot.merge(enter)
			.attr("class", d => $$.generateClass($BOXPLOT.boxplot, d.index).trim())
			.style("opacity", $$.initialOpacity.bind($$));
	},

	/**
	 * Get the rows of a target that have a boxplot value
	 * @param {object} d Target
	 * @returns {Array} Data rows
	 * @private
	 */
	getBoxplotRows(d) {
		return this.isBoxplotType(d) ? d.values.filter(v => this.getBoxplotData(v)) : [];
	},

	/**
	 * Get draw function
	 * @param {object} indices Indice data
	 * @param {boolean} isSub Subchart draw
	 * @returns {function}
	 * @private
	 */
	generateDrawBoxplot(indices, isSub) {
		const $$ = this;
		const getPoints = $$.generateGetBoxplotPoints(indices, isSub);
		// [index position, value position] to [x, y]
		const P = $$.config.axis_rotated ?
			(i: number, v: number) => `${v},${i}` :
			(i: number, v: number) => `${i},${v}`;

		return (d, i, g) => {
			const points = getPoints(d, i);

			if (!points) {
				return;
			}

			const {config} = $$;
			const [[x0, q1], [x1, q3], [xc, min, max], [median], outliers, mean] = points;
			const cap = (x1 - x0) * config.boxplot_whisker_width / 2;
			const capPath = cap > 0 ?
				`M${P(xc - cap, max)}L${P(xc + cap, max)}M${P(xc - cap, min)}L${P(xc + cap, min)}` :
				"";

			g.select(`.${$BOXPLOT.boxplotBox}`)
				.attr("d", `M${P(x0, q1)}L${P(x1, q1)}L${P(x1, q3)}L${P(x0, q3)}z`)
				.style("fill", $$.color(d));

			g.select(`.${$BOXPLOT.boxplotMedian}`)
				.attr("d", `M${P(x0, median)}L${P(x1, median)}`);

			g.select(`.${$BOXPLOT.boxplotWhisker}`)
				.attr("d", `M${P(xc, max)}L${P(xc, q3)}M${P(xc, q1)}L${P(xc, min)}${capPath}`);

			// the outliers and the mean: elements are added and removed by their number
			const el = d3Select(g.node());
			const r = config.boxplot_outlier_r;
			const m = config.boxplot_mean_r;

			// a circle drawn as a path, to get the stroke of the theme as the other parts do
			el.selectAll(`.${$BOXPLOT.boxplotOutlier}`)
				.data<number>(outliers)
				.join("path")
				.attr("class", $BOXPLOT.boxplotOutlier)
				.attr("d", v => {
					const [cx, cy] = config.axis_rotated ? [v, xc] : [xc, v];

					return `M${cx - r},${cy}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${
						-2 * r
					},0`;
				});

			el.selectAll(`.${$BOXPLOT.boxplotMean}`)
				.data<number>(mean)
				.join("path")
				.attr("class", $BOXPLOT.boxplotMean)
				.attr("d",
					v => `M${P(xc - m, v)}L${P(xc, v - m)}L${P(xc + m, v)}L${P(xc, v + m)}z`);
		};
	},

	/**
	 * Redraw function
	 * @param {function} drawFn Returned function from .generateDrawBoxplot()
	 * @param {boolean} withTransition With or without transition
	 * @returns {Array}
	 * @private
	 */
	redrawBoxplot(drawFn, withTransition?: boolean) {
		const $$ = this;
		const {$el, $T} = $$;
		const rand = getRandom(true);

		return [
			$el.boxplot
				.each(function(d, i) {
					drawFn(d, i, $T(d3Select(this), withTransition, rand));
				})
				.style("opacity", null)
		];
	}
};
