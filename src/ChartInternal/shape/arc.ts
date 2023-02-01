/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {
	arc as d3Arc,
	pie as d3Pie
} from "d3-shape";
import {interpolate as d3Interpolate} from "d3-interpolate";
import {document} from "../../module/browser";
import {$ARC, $COMMON, $FOCUS, $GAUGE} from "../../config/classes";
import {callFn, endall, isFunction, isNumber, isObject, isUndefined, setTextValue} from "../../module/util";
import type {d3Selection} from "../../../types/types";
import type {IArcData, IArcDataRow, IData} from "../data/IData";

/**
 * Get radius functions
 * @param {number} expandRate Expand rate number.
 *   - If 0, means for "normal" radius.
 *   - If > 0, means for "expanded" radius.
 * @returns {object} radius functions
 * @private
 */
function getRadiusFn(expandRate = 0) {
	const $$ = this;
	const {config, state} = $$;
	const hasMultiArcGauge = $$.hasMultiArcGauge();
	const singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length;
	const expandWidth = expandRate ? (
		Math.min(
			state.radiusExpanded * expandRate - state.radius,
			singleArcWidth * 0.8 - (1 - expandRate) * 100
		)) : 0;

	return {
		/**
		 * Getter of arc innerRadius value
		 * @param {IArcData} d Data object
		 * @returns {number} innerRadius value
		 * @private
		 */
		inner(d: IArcData) {
			const {innerRadius} = $$.getRadius(d);

			return hasMultiArcGauge ?
				state.radius - singleArcWidth * (d.index + 1) :
				isNumber(innerRadius) ? innerRadius : 0;
		},

		/**
		 * Getter of arc outerRadius value
		 * @param {IArcData} d Data object
		 * @returns {number} outerRadius value
		 * @private
		 */
		outer(d: IArcData) {
			const {outerRadius} = $$.getRadius(d);
			let radius: number;

			if (hasMultiArcGauge) {
				radius = state.radius - singleArcWidth * d.index + expandWidth;
			} else if ($$.hasType("polar") && !expandRate) {
				radius = $$.getPolarOuterRadius(d, outerRadius);
			} else {
				radius = outerRadius;

				if (expandRate) {
					let {radiusExpanded} = state;

					if (state.radius !== outerRadius) {
						radiusExpanded -= Math.abs(state.radius - outerRadius);
					}

					radius = radiusExpanded * expandRate;
				}
			}

			return radius;
		},

		/**
		 * Getter of arc cornerRadius value
		 * @param {IArcData} d Data object
		 * @param {number} outerRadius outer radius value
		 * @returns {number} cornerRadius value
		 * @private
		 */
		corner(d: IArcData, outerRadius): number {
			const {
				arc_cornerRadius_ratio: ratio = 0,
				arc_cornerRadius: cornerRadius = 0
			} = config;
			const {data: {id}, value} = d;
			let corner = 0;

			if (ratio) {
				corner = ratio * outerRadius;
			} else {
				corner = isNumber(cornerRadius) ?
					cornerRadius : cornerRadius.call($$.api, id, value, outerRadius);
			}

			return corner;
		}
	};
}

/**
 * Get attrTween function to get interpolated value on transition
 * @param {Function} fn Arc function to execute
 * @returns {Function} attrTween function
 * @private
 */
function getAttrTweenFn(fn: (d: IArcData) => string) {
	return function(d: IArcData): (t: number) => string {
		const interpolate = d3Interpolate(this._current, d);

		this._current = d;

		return function(t: number): string {
			const interpolated = interpolate(t);

			return fn(interpolated);
		};
	};
}

export default {
	initPie(): void {
		const $$ = this;
		const {config} = $$;
		const dataType = config.data_type;
		const padding = config[`${dataType}_padding`];
		const startingAngle = config[`${dataType}_startingAngle`] || 0;
		const padAngle = (
			padding ? padding * 0.01 :
				config[`${dataType}_padAngle`]
		) || 0;

		$$.pie = d3Pie()
			.startAngle(startingAngle)
			.endAngle(startingAngle + (2 * Math.PI))
			.padAngle(padAngle)
			.value((d: IData | any) => d.values.reduce((a, b) => a + b.value, 0))
			.sort($$.getSortCompareFn.bind($$)(true));
	},

	updateRadius(): void {
		const $$ = this;
		const {config, state} = $$;
		const dataType = config.data_type;
		const padding = config[`${dataType}_padding`];
		const w = config.gauge_width || config.donut_width;
		const gaugeArcWidth = $$.filterTargetsToShow($$.data.targets).length *
			config.gauge_arcs_minWidth;

		// determine radius
		state.radiusExpanded = Math.min(state.arcWidth, state.arcHeight) / 2 * (
			$$.hasMultiArcGauge() && config.gauge_label_show ? 0.85 : 1
		);

		state.radius = state.radiusExpanded * 0.95;
		state.innerRadiusRatio = w ? (state.radius - w) / state.radius : 0.6;

		state.gaugeArcWidth = w || (
			gaugeArcWidth <= state.radius - state.innerRadius ?
				state.radius - state.innerRadius :
				(gaugeArcWidth <= state.radius ? gaugeArcWidth : state.radius)
		);

		const innerRadius = config.pie_innerRadius || (
			padding ? padding * (state.innerRadiusRatio + 0.1) : 0
		);

		// NOTE: inner/outerRadius can be an object by user setting, only for 'pie' type
		state.outerRadius = config.pie_outerRadius;
		state.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ?
			state.radius * state.innerRadiusRatio : innerRadius;
	},

	/**
	 * Get pie's inner & outer radius value
	 * @param {object|undefined} d Data object
	 * @returns {object}
	 * @private
	 */
	getRadius(d: IArcData): {innerRadius: number, outerRadius: number} {
		const $$ = this;
		const data = d?.data;
		let {innerRadius, outerRadius} = $$.state;

		if (!isNumber(innerRadius) && data) {
			innerRadius = innerRadius[data.id] || 0;
		}

		if (isObject(outerRadius) && data && data.id in outerRadius) {
			outerRadius = outerRadius[data.id];
		} else if (!isNumber(outerRadius)) {
			outerRadius = $$.state.radius;
		}

		return {innerRadius, outerRadius};
	},

	updateArc(): void {
		const $$ = this;

		$$.updateRadius();
		$$.svgArc = $$.getSvgArc();
		$$.svgArcExpanded = $$.getSvgArcExpanded();
	},

	getArcLength(): number {
		const $$ = this;
		const {config} = $$;
		const arcLengthInPercent = config.gauge_arcLength * 3.6;
		let len = (2 * (arcLengthInPercent / 360));

		if (arcLengthInPercent < -360) {
			len = -2;
		} else if (arcLengthInPercent > 360) {
			len = 2;
		}

		return len * Math.PI;
	},

	getStartAngle(): number {
		const $$ = this;
		const {config} = $$;
		const isFullCircle = config.gauge_fullCircle;
		const defaultStartAngle = -1 * Math.PI / 2;
		const defaultEndAngle = Math.PI / 2;
		let startAngle = config.gauge_startingAngle;

		if (!isFullCircle && startAngle <= defaultStartAngle) {
			startAngle = defaultStartAngle;
		} else if (!isFullCircle && startAngle >= defaultEndAngle) {
			startAngle = defaultEndAngle;
		} else if (startAngle > Math.PI || startAngle < -1 * Math.PI) {
			startAngle = Math.PI;
		}

		return startAngle;
	},

	updateAngle(dValue) {
		const $$ = this;
		const {config, state} = $$;
		let pie = $$.pie;
		let d = dValue;
		let found = false;

		if (!config) {
			return null;
		}

		const gStart = $$.getStartAngle();
		const radius = config.gauge_fullCircle ? $$.getArcLength() : gStart * -2;

		if (d.data && $$.isGaugeType(d.data) && !$$.hasMultiArcGauge()) {
			const {gauge_min: min, gauge_max: max} = config;

			// to prevent excluding total data sum during the init(when data.hide option is used), use $$.rendered state value
			const totalSum = $$.getTotalDataSum(state.rendered);
			// https://github.com/naver/billboard.js/issues/2123
			const gEnd = radius * ((totalSum - min) / (max - min));

			pie = pie
				.startAngle(gStart)
				.endAngle(gEnd + gStart);
		}

		pie($$.filterTargetsToShow())
			.forEach((t, i) => {
				if (!found && t.data.id === d.data.id) {
					found = true;
					d = t;
					d.index = i;
				}
			});

		if (isNaN(d.startAngle)) {
			d.startAngle = 0;
		}

		if (isNaN(d.endAngle)) {
			d.endAngle = d.startAngle;
		}

		if (d.data && $$.hasMultiArcGauge()) {
			const gMin = config.gauge_min;
			const gMax = config.gauge_max;
			const gTic = radius / (gMax - gMin);
			const gValue = d.value < gMin ? 0 : d.value < gMax ? d.value - gMin : (gMax - gMin);

			d.startAngle = gStart;
			d.endAngle = gStart + gTic * gValue;
		}

		return found ? d : null;
	},

	getSvgArc(): Function {
		const $$ = this;
		const {inner, outer, corner} = getRadiusFn.call($$);

		const arc = d3Arc()
			.innerRadius(inner)
			.outerRadius(outer);

		const newArc = function(d, withoutUpdate) {
			let path: string | null = "M 0 0";

			if (d.value || d.data) {
				const data = withoutUpdate ? d : $$.updateAngle(d) ?? null;

				if (data) {
					path = arc.cornerRadius(
						corner(data, outer(data))
					)(data);
				}
			}

			return path;
		};

		// TODO: extends all function
		newArc.centroid = arc.centroid;

		return newArc;
	},

	/**
	 * Get expanded arc path function
	 * @param {number} rate Expand rate
	 * @returns {Function} Expanded arc path getter function
	 * @private
	 */
	getSvgArcExpanded(rate = 1): (d: IArcData) => string {
		const $$ = this;
		const {inner, outer, corner} = getRadiusFn.call($$, rate);

		const arc = d3Arc()
			.innerRadius(inner)
			.outerRadius(outer);

		return (d: IArcData): string => {
			const updated = $$.updateAngle(d);
			const outerR = outer(updated);
			let cornerR = 0;

			if (updated) {
				cornerR = corner(updated, outerR);
			}

			return updated ? <string>arc.cornerRadius(cornerR)(updated) : "M 0 0";
		};
	},

	getArc(d, withoutUpdate: boolean, force?: boolean): string {
		return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
	},

	/**
	 * Set transform attributes to arc label text
	 * @param {object} d Data object
	 * @returns {string} Translate attribute string
	 * @private
	 */
	transformForArcLabel(d: IArcData): string {
		const $$ = this;
		const {config, state: {radiusExpanded}} = $$;

		const updated = $$.updateAngle(d);
		let translate = "";

		if (updated) {
			if ($$.hasMultiArcGauge()) {
				const y1 = Math.sin(updated.endAngle - Math.PI / 2);

				const x = Math.cos(updated.endAngle - Math.PI / 2) * (radiusExpanded + 25);
				const y = y1 * (radiusExpanded + 15 - Math.abs(y1 * 10)) + 3;

				translate = `translate(${x},${y})`;
			} else if (!$$.hasType("gauge") || $$.data.targets.length > 1) {
				let {outerRadius} = $$.getRadius(d);

				if ($$.hasType("polar")) {
					outerRadius = $$.getPolarOuterRadius(d, outerRadius);
				}

				const c = this.svgArc.centroid(updated);
				const [x, y] = c.map(v => (isNaN(v) ? 0 : v));
				const h = Math.sqrt(x * x + y * y);

				let ratio = ["donut", "pie", "polar"]
					.filter($$.hasType.bind($$))
					.map(v => config[`${v}_label_ratio`])?.[0];

				if (ratio) {
					ratio = isFunction(ratio) ? ratio.bind($$.api)(d, outerRadius, h) : ratio;
				} else {
					ratio = outerRadius && (
						h ? (36 / outerRadius > 0.375 ? 1.175 - 36 / outerRadius : 0.8) * outerRadius / h : 0
					);
				}

				translate = `translate(${x * ratio},${y * ratio})`;
			}
		}

		return translate;
	},

	convertToArcData(d: IArcData | IArcDataRow): object {
		return this.addName({
			id: "data" in d ? d.data.id : d.id,
			value: d.value,
			ratio: this.getRatio("arc", d),
			index: d.index,
		});
	},

	textForArcLabel(selection: d3Selection): void {
		const $$ = this;
		const hasGauge = $$.hasType("gauge");

		if ($$.shouldShowArcLabel()) {
			selection
				.style("fill", $$.updateTextColor.bind($$))
				.attr("filter", $$.updateTextBacgroundColor.bind($$))
				.each(function(d) {
					const node = d3Select(this);
					const updated = $$.updateAngle(d);
					const ratio = $$.getRatio("arc", updated);
					const isUnderThreshold = $$.meetsLabelThreshold(ratio,
						["donut", "gauge", "pie", "polar"].filter($$.hasType.bind($$))?.[0]
					);

					if (isUnderThreshold) {
						const {value} = updated || d;
						const text = (
							$$.getArcLabelFormat() || $$.defaultArcValueFormat
						)(value, ratio, d.data.id).toString();

						setTextValue(node, text, [-1, 1], hasGauge);
					} else {
						node.text("");
					}
				});
		}
	},

	expandArc(targetIds: string[]): void {
		const $$ = this;
		const {state: {transiting}, $el} = $$;

		// MEMO: avoid to cancel transition
		if (transiting) {
			const interval = setInterval(() => {
				if (!transiting) {
					clearInterval(interval);

					$el.legend.selectAll(`.${$FOCUS.legendItemFocused}`).size() > 0 &&
						$$.expandArc(targetIds);
				}
			}, 10);

			return;
		}

		const newTargetIds = $$.mapToTargetIds(targetIds);

		$el.svg.selectAll($$.selectorTargets(newTargetIds, `.${$ARC.chartArc}`))
			.each(function(d) {
				if (!$$.shouldExpand(d.data.id)) {
					return;
				}

				const expandDuration = $$.getExpandConfig(d.data.id, "duration");
				const svgArcExpandedSub = $$.getSvgArcExpanded($$.getExpandConfig(d.data.id, "rate"));

				d3Select(this).selectAll("path")
					.transition()
					.duration(expandDuration)
					.attrTween("d", getAttrTweenFn($$.svgArcExpanded.bind($$)))
					.transition()
					.duration(expandDuration * 2)
					.attrTween("d", getAttrTweenFn(svgArcExpandedSub.bind($$)));
			});
	},

	unexpandArc(targetIds: string[]): void {
		const $$ = this;
		const {state: {transiting}, $el: {svg}} = $$;

		if (transiting) {
			return;
		}

		const newTargetIds = $$.mapToTargetIds(targetIds);

		svg.selectAll($$.selectorTargets(newTargetIds, `.${$ARC.chartArc}`))
			.selectAll("path")
			.transition()
			.duration(d => $$.getExpandConfig(d.data.id, "duration"))
			.attrTween("d", getAttrTweenFn($$.svgArc.bind($$)));

		svg.selectAll(`${$ARC.arc}`)
			.style("opacity", null);
	},

	/**
	 * Get expand config value
	 * @param {string} id data ID
	 * @param {string} key config key: 'duration | rate'
	 * @returns {number}
	 * @private
	 */
	getExpandConfig(id: string, key: "duration" | "rate"): number {
		const $$ = this;
		const {config} = $$;
		const def = {
			duration: 50,
			rate: 0.98
		};
		let type;

		if ($$.isDonutType(id)) {
			type = "donut";
		} else if ($$.isGaugeType(id)) {
			type = "gauge";
		} else if ($$.isPieType(id)) {
			type = "pie";
		}

		return type ? config[`${type}_expand_${key}`] : def[key];
	},

	shouldExpand(id: string): boolean {
		const $$ = this;
		const {config} = $$;

		return ($$.isDonutType(id) && config.donut_expand) ||
			($$.isGaugeType(id) && config.gauge_expand) ||
			($$.isPieType(id) && config.pie_expand);
	},

	shouldShowArcLabel(): boolean {
		const $$ = this;
		const {config} = $$;

		return ["donut", "gauge", "pie", "polar"]
			.some(v => $$.hasType(v) && config[`${v}_label_show`]);
	},

	getArcLabelFormat(): number | string {
		const $$ = this;
		const {config} = $$;
		let format = v => v;

		["donut", "gauge", "pie", "polar"]
			.filter($$.hasType.bind($$))
			.forEach(v => {
				format = config[`${v}_label_format`];
			});

		return isFunction(format) ? format.bind($$.api) : format;
	},

	getArcTitle(): string {
		const $$ = this;
		const type = ($$.hasType("donut") && "donut") || ($$.hasType("gauge") && "gauge");

		return type ? $$.config[`${type}_title`] : "";
	},

	updateTargetsForArc(targets: IData): void {
		const $$ = this;
		const {$el} = $$;
		const hasGauge = $$.hasType("gauge");
		const classChartArc = $$.getChartClass("Arc");
		const classArcs = $$.getClass("arcs", true);
		const classFocus = $$.classFocus.bind($$);
		const chartArcs = $el.main.select(`.${$ARC.chartArcs}`);

		const mainPieUpdate = chartArcs
			.selectAll(`.${$ARC.chartArc}`)
			.data($$.pie(targets))
			.attr("class", d => classChartArc(d) + classFocus(d.data));

		const mainPieEnter = mainPieUpdate.enter().append("g")
			.attr("class", classChartArc)
			.call(this.setCssRule(false, `.${$ARC.chartArcs} text`, ["pointer-events:none", "text-anchor:middle"]));

		mainPieEnter.append("g")
			.attr("class", classArcs)
			.merge(mainPieUpdate);

		mainPieEnter.append("text")
			.attr("dy", hasGauge && !$$.hasMultiTargets() ? "-.1em" : ".35em")
			.style("opacity", "0")
			.style("text-anchor", $$.getStylePropValue("middle"))
			.style("pointer-events", $$.getStylePropValue("none"));

		$el.text = chartArcs.selectAll(`.${$COMMON.target} text`);
		// MEMO: can not keep same color..., but not bad to update color in redraw
		// mainPieUpdate.exit().remove();
	},

	initArc(): void {
		const $$ = this;
		const {$el} = $$;

		$el.arcs = $el.main.select(`.${$COMMON.chart}`)
			.append("g")
			.attr("class", $ARC.chartArcs)
			.attr("transform", $$.getTranslate("arc"));

		$$.setArcTitle();
	},

	/**
	 * Set arc title text
	 * @private
	 */
	setArcTitle() {
		const $$ = this;
		const title = $$.getArcTitle();
		const hasGauge = $$.hasType("gauge");

		if (title) {
			const text = $$.$el.arcs.append("text")
				.attr("class", hasGauge ? $GAUGE.chartArcsGaugeTitle : $ARC.chartArcsTitle)
				.style("text-anchor", "middle");

			hasGauge && text.attr("dy", "-0.3em");

			setTextValue(text, title, hasGauge ? undefined : [-0.6, 1.35], true);
		}
	},

	redrawArc(duration: number, durationForExit: number, withTransform?: boolean): void {
		const $$ = this;
		const {config, state, $el: {main}} = $$;
		const hasInteraction = config.interaction_enabled;
		const isSelectable = hasInteraction && config.data_selection_isselectable;

		let mainArc = main.selectAll(`.${$ARC.arcs}`)
			.selectAll(`.${$ARC.arc}`)
			.data($$.arcData.bind($$));

		mainArc.exit()
			.transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		mainArc = mainArc.enter().append("path")
			.attr("class", $$.getClass("arc", true))
			.style("fill", d => $$.color(d.data))
			.style("cursor", d => (isSelectable?.bind?.($$.api)(d) ? "pointer" : null))
			.style("opacity", "0")
			.each(function(d) {
				if ($$.isGaugeType(d.data)) {
					d.startAngle = config.gauge_startingAngle;
					d.endAngle = config.gauge_startingAngle;
				}

				this._current = d;
			})
			.merge(mainArc);

		if ($$.hasType("gauge")) {
			$$.updateGaugeMax();
			$$.hasMultiArcGauge() && $$.redrawMultiArcGauge();
		}

		mainArc
			.attr("transform", d => (!$$.isGaugeType(d.data) && withTransform ? "scale(0)" : ""))
			.style("opacity", function(d) {
				return d === this._current ? "0" : null;
			})
			.each(() => {
				state.transiting = true;
			})
			.transition()
			.duration(duration)
			.attrTween("d", function(d) {
				const updated = $$.updateAngle(d);

				if (!updated) {
					return () => "M 0 0";
				}

				if (isNaN(this._current.startAngle)) {
					this._current.startAngle = 0;
				}

				if (isNaN(this._current.endAngle)) {
					this._current.endAngle = this._current.startAngle;
				}

				const interpolate = d3Interpolate(this._current, updated);

				this._current = interpolate(0);

				return function(t) {
					const interpolated = interpolate(t);

					interpolated.data = d.data; // data.id will be updated by interporator

					return $$.getArc(interpolated, true);
				};
			})
			.attr("transform", withTransform ? "scale(1)" : "")
			.style("fill", d => {
				let color;

				if ($$.levelColor) {
					color = $$.levelColor(d.data.values[0].value);

					// update data's color
					config.data_colors[d.data.id] = color;
				} else {
					color = $$.color(d.data);
				}

				return color;
			})
			// Where gauge reading color would receive customization.
			.style("opacity", null)
			.call(endall, function() {
				if ($$.levelColor) {
					const path = d3Select(this);
					const d: any = path.datum();

					$$.updateLegendItemColor(d.data.id, path.style("fill"));
				}

				state.transiting = false;
				callFn(config.onrendered, $$.api);
			});

		// bind arc events
		hasInteraction && $$.bindArcEvent(mainArc);

		$$.hasType("polar") && $$.redrawPolar();
		$$.hasType("gauge") && $$.redrawBackgroundArcs();

		$$.redrawArcText(duration);
	},

	redrawBackgroundArcs() {
		const $$ = this;
		const {config, state} = $$;
		const hasMultiArcGauge = $$.hasMultiArcGauge();
		const isFullCircle = config.gauge_fullCircle;
		const showEmptyTextLabel = $$.filterTargetsToShow($$.data.targets).length === 0 &&
			!!config.data_empty_label_text;

		const startAngle = $$.getStartAngle();
		const endAngle = isFullCircle ? startAngle + $$.getArcLength() : startAngle * -1;

		let backgroundArc = $$.$el.arcs.select(
			`${hasMultiArcGauge ? "g" : ""}.${$ARC.chartArcsBackground}`
		);

		if (hasMultiArcGauge) {
			let index = 0;

			backgroundArc = backgroundArc
				.selectAll(`path.${$ARC.chartArcsBackground}`)
				.data($$.data.targets);

			backgroundArc.enter()
				.append("path")
				.attr("class", (d, i) => `${$ARC.chartArcsBackground} ${$ARC.chartArcsBackground}-${i}`)
				.merge(backgroundArc)
				.style("fill", (config.gauge_background) || null)
				.attr("d", ({id}) => {
					if (showEmptyTextLabel || state.hiddenTargetIds.indexOf(id) >= 0) {
						return "M 0 0";
					}

					const d = {
						data: [{value: config.gauge_max}],
						startAngle,
						endAngle,
						index: index++
					};

					return $$.getArc(d, true, true);
				});

			backgroundArc.exit().remove();
		} else {
			backgroundArc.attr("d", showEmptyTextLabel ? "M 0 0" : () => {
				const d = {
					data: [{value: config.gauge_max}],
					startAngle,
					endAngle
				};

				return $$.getArc(d, true, true);
			});
		}
	},

	bindArcEvent(arc): void {
		const $$ = this;
		const {config, state} = $$;
		const isTouch = state.inputType === "touch";
		const isMouse = state.inputType === "mouse";

		// eslint-disable-next-line
		function selectArc(_this, arcData, id) {
			// transitions
			$$.expandArc(id);
			$$.api.focus(id);
			$$.toggleFocusLegend(id, true);
			$$.showTooltip([arcData], _this);
		}

		// eslint-disable-next-line
		function unselectArc(arcData?) {
			const id = arcData?.id || undefined;

			$$.unexpandArc(id);
			$$.api.revert();
			$$.revertLegend();
			$$.hideTooltip();
		}

		arc
			.on("click", function(event, d, i) {
				const updated = $$.updateAngle(d);
				let arcData;

				if (updated) {
					arcData = $$.convertToArcData(updated);

					$$.toggleShape?.(this, arcData, i);
					config.data_onclick.bind($$.api)(arcData, this);
				}
			});

		// mouse events
		if (isMouse) {
			arc
				.on("mouseover", function(event, d) {
					if (state.transiting) { // skip while transiting
						return;
					}

					state.event = event;
					const updated = $$.updateAngle(d);
					const arcData = updated ? $$.convertToArcData(updated) : null;
					const id = arcData?.id || undefined;

					selectArc(this, arcData, id);
					$$.setOverOut(true, arcData);
				})
				.on("mouseout", (event, d) => {
					if (state.transiting) { // skip while transiting
						return;
					}

					state.event = event;
					const updated = $$.updateAngle(d);
					const arcData = updated ? $$.convertToArcData(updated) : null;

					unselectArc();
					$$.setOverOut(false, arcData);
				})
				.on("mousemove", function(event, d) {
					const updated = $$.updateAngle(d);
					const arcData = updated ? $$.convertToArcData(updated) : null;

					state.event = event;
					$$.showTooltip([arcData], this);
				});
		}

		// touch events
		if (isTouch && $$.hasArcType() && !$$.radars) {
			const getEventArc = event => {
				const touch = event.changedTouches[0];
				const eventArc = d3Select(document.elementFromPoint(touch.clientX, touch.clientY));

				return eventArc;
			};

			$$.$el.svg
				.on("touchstart touchmove", function(event) {
					if (state.transiting) { // skip while transiting
						return;
					}

					state.event = event;

					const eventArc = getEventArc(event);
					const datum: any = eventArc.datum();
					const updated = (datum?.data && datum.data.id) ? $$.updateAngle(datum) : null;
					const arcData = updated ? $$.convertToArcData(updated) : null;
					const id = arcData?.id || undefined;

					$$.callOverOutForTouch(arcData);

					isUndefined(id) ?
						unselectArc() : selectArc(this, arcData, id);
				});
		}
	},

	redrawArcText(duration: number): void {
		const $$ = this;
		const {config, state, $el: {main, arcs}} = $$;
		const hasGauge = $$.hasType("gauge");
		const hasMultiArcGauge = $$.hasMultiArcGauge();
		let text;

		// for gauge type, update text when has no title & multi data
		if (!(hasGauge && $$.data.targets.length === 1 && config.gauge_title)) {
			text = main.selectAll(`.${$ARC.chartArc}`)
				.select("text")
				.style("opacity", "0")
				.attr("class", d => ($$.isGaugeType(d.data) ? $GAUGE.gaugeValue : null))
				.call($$.textForArcLabel.bind($$))
				.attr("transform", $$.transformForArcLabel.bind($$))
				.style("font-size", d => (
					$$.isGaugeType(d.data) && $$.data.targets.length === 1 && !hasMultiArcGauge ?
						`${Math.round(state.radius / 5)}px` : null
				))
				.transition()
				.duration(duration)
				.style("opacity", d => ($$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? null : "0"));

			hasMultiArcGauge && text.attr("dy", "-.1em");
		}

		main.select(`.${$ARC.chartArcsTitle}`)
			.style("opacity", $$.hasType("donut") || hasGauge ? null : "0");

		if (hasGauge) {
			const isFullCircle = config.gauge_fullCircle;

			isFullCircle && text?.attr("dy", `${hasMultiArcGauge ? 0 : Math.round(state.radius / 14)}`);

			if (config.gauge_label_show) {
				arcs.select(`.${$GAUGE.chartArcsGaugeUnit}`)
					.attr("dy", `${isFullCircle ? 1.5 : 0.75}em`)
					.text(config.gauge_units);

				arcs.select(`.${$GAUGE.chartArcsGaugeMin}`)
					.attr("dx", `${-1 * (state.innerRadius + ((state.radius - state.innerRadius) / (isFullCircle ? 1 : 2)))}px`)
					.attr("dy", "1.2em")
					.text($$.textForGaugeMinMax(config.gauge_min, false));

				// show max text when isn't fullCircle
				!isFullCircle && arcs.select(`.${$GAUGE.chartArcsGaugeMax}`)
					.attr("dx", `${state.innerRadius + ((state.radius - state.innerRadius) / 2)}px`)
					.attr("dy", "1.2em")
					.text($$.textForGaugeMinMax(config.gauge_max, true));
			}
		}
	}
};
