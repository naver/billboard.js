import {select as d3Select} from "d3-selection";
import {arc as d3Arc, pie as d3Pie} from "d3-shape";
import CLASS from "../../config/classes";
import {getRange} from "../../module/util";

export default {
	initPolar(): void {
		const $$ = this;
		const {config, $el} = $$;
		const startingAngle = config.polar_startingAngle || 0;
		// TODO: remove magic number
		const padding = config.polar_padding;
		const padAngle = (
			padding ? padding * 0.01 : config.polar_padAngle
		) || 0;

		$el.polar = $el.main.select(`.${CLASS.chart}`).append("g")
			.attr("class", CLASS.chartPolars);

		// level
		$el.polar.levels = $el.polar.append("g")
			.attr("class", CLASS.levels);

		// arcs
		$el.polar.arcs = $el.polar.append("g")
			.attr("class", CLASS.chartPolarArcs);

		// Let each value be 1, thus every arc has same central angle
		// To match central angle with specific data, change "1" to specific function.
		$$.polarPie = d3Pie()
			.value(1);
	},

	getPolarSize(): [number, number] {
		const $$ = this;
		const {state: {arcWidth, arcHeight}} = $$;
		const size = (Math.min(arcWidth, arcHeight) - 10) / 2;

		return [size, size];
	},

	getPolarArc(d): string {
		const $$ = this;
		const {config} = $$;
		const [width, height] = $$.getPolarSize();
		const radius = config.polar_size_ratio * Math.min(width, height);
		const ceilDataMax = $$.getMinMaxData().max[0].value;
		const dataMax = config.polar_level_max || ceilDataMax;

		// TODO: remove magic number
		const innerRadius = config.polar_size_ratio * config.polar_padding * 0.75;

		return d3Arc()
			.innerRadius((d: any) => innerRadius * d.data.values.reduce((a, b) => a + b.value, 0) / dataMax)
			.outerRadius((d: any) => d.data.values.reduce((a, b) => a + b.value, 0) / dataMax * radius)(d) || "M 0 0";
	},

	updateTargetsForPolarArc(): void {
		// stay empty
	},

	redrawPolar(): void {
		const $$ = this;
		const {config} = $$;
		const {polar} = $$.$el;
		const translate = $$.getTranslate("polar");
		const classChartArc = $$.getChartClass("Arc");
		const hasInteraction = config.interaction_enabled;
		const startingAngle = config.polar_startingAngle || 0;
		const padding = config.polar_padding;
		const padAngle = (
			padding ? padding * 0.01 : config.polar_padAngle
		) || 0;

		polar.attr("transform", translate);
		$$.updatePolarLevel();

		let polarPie = $$.polarPie;

		polarPie = polarPie
			.startAngle(startingAngle)
			.endAngle(startingAngle + (2 * Math.PI))
			.padAngle(padAngle);

		polar.arcs.selectAll("g").data([]).exit().remove();

		let mainArc = polar.arcs
			.selectAll("g")
			.data(polarPie($$.filterTargetsToShow()));

		const mainArcEnter = mainArc.enter().append("g")
			.attr("class", classChartArc);

		mainArcEnter.append("path");

		mainArc = mainArcEnter
			.selectAll("path")
			.attr("class", $$.getClass("arc", true))
			.style("fill", d => $$.color(d.data))
			.attr("d", d => $$.getPolarArc(d));

		mainArc.exit().remove();

		hasInteraction && $$.bindPolarEvent(mainArc);
	},

	updatePolarLevel(): void {
		const $$ = this;
		const {config, $el: {polar}} = $$;
		const [width, height] = $$.getPolarSize();

		const depth = config.polar_level_depth;
		const ceilDataMax = $$.getMinMaxData().max[0].value;
		const dataMax = config.polar_level_max || ceilDataMax;

		const polarLevels = polar.levels;
		const levelData = getRange(0, depth);

		const radius = config.polar_size_ratio * Math.min(width, height);
		const levelRatio = levelData.map(l => radius * ((l + 1) / depth));
		const levelTextFormat = (config.polar_level_text_format || function() {}).bind($$.api);

		const level = polarLevels
			.selectAll(`.${CLASS.level}`)
			.data(levelData);

		level.exit().remove();

		const levelEnter = level.enter().append("g")
			.attr("class", (_d, i) => `${CLASS.level} ${CLASS.level}-${i}`);

		// cx, cy, translate: Set center as origin (0,0) so that it can share same center with arcs
		levelEnter.append("circle");

		levelEnter
			.merge(level)
			.selectAll("circle")
			.style("visibility", config.polar_level_show ? null : "hidden")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", d => levelRatio[d]);

		if (config.polar_level_text_show) {
			levelEnter.append("text")
				.style("text-anchor", "middle");

			levelEnter
				.merge(level)
				.selectAll("text")
				.attr("dy", d => -levelRatio[d] + 5)
				.text(d => levelTextFormat(dataMax / levelData.length * (d + 1)));
		}
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
