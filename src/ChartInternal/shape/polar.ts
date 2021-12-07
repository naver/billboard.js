import {select as d3Select} from "d3-selection";
import {arc as d3Arc, pie as d3Pie} from "d3-shape";
import CLASS from "../../config/classes";
import {getRange} from "../../module/util";

export default {
	initPolar(): void {
		const $$ = this;
		const {config, state: {current}, $el} = $$;
		const depth = config.polar_level_depth;
		const ceilDataMax = Math.ceil($$.getMinMaxData().max[0].value / depth) * depth;

		$el.polar = $el.main.select(`.${CLASS.chart}`).append("g")
			.attr("class", CLASS.chartPolars);

		// level
		$el.polar.levels = $el.polar.append("g")
			.attr("class", CLASS.levels);

		// arcs
		$el.polar.arcs = $el.polar.append("g")
			.attr("class", CLASS.chartPolarArcs);

		// Let every data is less or equal to dataMax and each level has integer value
		current.dataMax = config.polar_size_max || ceilDataMax;
		// Let each value be 1, thus every arc has same central angle
		// To match central angle with specific data, change "1" to specific function.
		$$.polarPie = d3Pie().value(1);
	},

	getPolarSize(): [number, number] {
		const $$ = this;
		const {state: {arcWidth, arcHeight}} = $$;
		const size = (Math.min(arcWidth, arcHeight) - 10) / 2;

		return [size, size];
	},

	getPolarArc(d): string {
		const $$ = this;
		const {state: {current}} = $$;
		const [width, height] = $$.getPolarSize();
		const radius = Math.min(width, height);

		return d3Arc()
			.innerRadius(0)
			.outerRadius((d: any) => d.data.values.reduce((a, b) => a + b.value, 0) / current.dataMax * radius)(d) || "M 0 0";
	},

	updateTargetsForPolarArc(targets): void {
		const $$ = this;
		const {$el} = $$;

		const classChartArc = $$.getChartClass("Arc");
		const classArcs = $$.getClass("arcs", true);
		const classFocus = $$.classFocus.bind($$);
		const chartArcs = $el.polar.arcs;

		const mainPieUpdate = chartArcs
			.selectAll(`.${CLASS.chartArc}`)
			.data($$.polarPie(targets))
			.attr("class", d => classChartArc(d) + classFocus(d.data));

		const mainPieEnter = mainPieUpdate.enter().append("g")
			.attr("class", classChartArc);

		mainPieEnter.append("g")
			.attr("class", classArcs)
			.merge(mainPieUpdate);
	},

	redrawPolar(): void {
		const $$ = this;
		const {config} = $$;
		const {polar} = $$.$el;
		const translate = $$.getTranslate("polar");
		const hasInteraction = config.interaction_enabled;

		if (translate) {
			polar.attr("transform", translate);

			$$.updatePolarLevel();
		}

		let mainArc = polar.arcs
			.selectAll(`.${CLASS.arcs}`)
			.selectAll(`.${CLASS.arc}`)
			.data($$.arcData.bind($$));

		mainArc.exit().remove();

		mainArc = mainArc.enter().append("path")
			.attr("class", $$.getClass("arc", true))
			.style("fill", d => $$.color(d.data))
			.each(function(d) { this._current = d; })
			.merge(mainArc)
			.attr("d", d => $$.getPolarArc(d));

		hasInteraction && $$.bindPolarEvent(mainArc);
	},


	updatePolarLevel(): void {
		const $$ = this;
		const {config, state, $el: {polar}} = $$;
		const [width, height] = $$.getPolarSize();
		const depth = config.polar_level_depth;

		const polarLevels = polar.levels;
		const levelData = getRange(0, depth);

		const radius = Math.min(width, height);
		const levelRatio = levelData.map(l => radius * ((l + 1) / depth));

		const level = polarLevels
			.selectAll(`.${CLASS.level}`)
			.data(levelData);

		level.exit().remove();

		const levelEnter = level.enter().append("g")
			.attr("class", (d, i) => `${CLASS.level} ${CLASS.level}-${i}`);

		// cx, cy, translate: Set center as origin (0,0) so that it can share same center with arcs
		levelEnter.append("circle")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", d => levelRatio[d]);

		levelEnter.append("text")
			.style("text-anchor", "middle")
			.attr("dy", "0.5rem")
			.attr("transform", d => `translate(0, ${-levelRatio[d]})`)
			.text(d => state.current.dataMax / levelData.length * (d + 1));

		levelEnter.merge(level);
	},

	bindPolarEvent(polar): void {
		const $$ = this;
		const {state} = $$;
		const isMouse = state.inputType === "mouse";

		// eslint-disable-next-line
		function selectPolar(_this, polarData, id) {
			// transitions
			$$.expandPolar(id);
			$$.api.focus(id);
			$$.showTooltip([polarData], _this);
		}

		// eslint-disable-next-line
		function unselectPolar(polarData?) {
			const id = polarData?.id || undefined;

			$$.unexpandPolar(id);
			$$.api.revert();
			$$.hideTooltip();
		}

		// mouse events
		if (isMouse) {
			polar
				.on("mouseover", function(event, d) {
					if (state.transiting) { // skip while transiting
						return;
					}

					state.event = event;
					const id = d.data.id;
					const polarData = $$.convertToPolarData(d);

					selectPolar(this, polarData, id);
					$$.setOverOut(true, polarData);
				})
				.on("mouseout", (event, d) => {
					if (state.transiting) { // skip while transiting
						return;
					}
					unselectPolar();
					state.event = event;
					const polarData = $$.convertToPolarData(d);

					$$.setOverOut(false, polarData);
				})
				.on("mousemove", function(event, d) {
					state.event = event;
					const polarData = $$.convertToPolarData(d);

					$$.showTooltip([polarData], this);
				});
		}
	},

	convertToPolarData(d): object {
		return this.addName({
			id: d.data ? d.data.id : d.id,
			value: d.data.values[0].value,
			// ratio: d.data.values[0].value,
			index: d.index,
		});
	},

	expandPolar(targetIds: string[]): void {
		const $$ = this;
		const {state: {transiting}, $el} = $$;

		// MEMO: avoid to cancel transition
		if (transiting) {
			const interval = setInterval(() => {
				if (!transiting) {
					clearInterval(interval);

					$el.legend.selectAll(`.${CLASS.legendItemFocused}`).size() > 0 &&
						$$.expandArc(targetIds);
				}
			}, 10);

			return;
		}

		const newTargetIds = $$.mapToTargetIds(targetIds);

		$el.svg.selectAll($$.selectorTargets(newTargetIds, `.${CLASS.chartArc}`))
			.each(function(d) {
				if (!$$.shouldExpand(d.data.id)) {
					return;
				}

				const expandDuration = $$.getExpandConfig(d.data.id, "duration");
				const svgArcExpandedSub = $$.getSvgArcExpanded($$.getExpandConfig(d.data.id, "rate"));

				d3Select(this).selectAll("path")
					.transition()
					.duration(expandDuration)
					.attr("d", $$.svgArcExpanded)
					.transition()
					.duration(expandDuration * 2)
					.attr("d", svgArcExpandedSub);
			});
	},

	unexpandPolar(): void {
		const $$ = this;
		const {state: {transiting}, $el: {svg}} = $$;

		if (transiting) {
			return;
		}

		svg.selectAll(`${CLASS.arc}`)
			.style("opacity", null);
	},
};
