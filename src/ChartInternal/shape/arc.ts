/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	event as d3Event
} from "d3-selection";
import {
	arc as d3Arc,
	pie as d3Pie
} from "d3-shape";
import {interpolate as d3Interpolate} from "d3-interpolate";
import {document} from "../../module/browser";
import CLASS from "../../config/classes";
import {callFn, endall, isFunction, isNumber, isUndefined, setTextValue} from "../../module/util";
import {d3Selection} from "../../../types/types";

export default {
	initPie(): void {
		const $$ = this;
		const {config} = $$;
		const dataType = config.data_type;
		const padding = config.pie_padding;
		const startingAngle = config[`${dataType}_startingAngle`] || 0;
		const padAngle = (
			$$.hasType("pie") && padding ? padding * 0.01 :
				config[`${dataType}_padAngle`]
		) || 0;
		const sortValue: any = $$.isOrderAsc() || $$.isOrderDesc() ?
			(a, b) => ($$.isOrderAsc() ? a - b : b - a) : null;

		$$.pie = d3Pie()
			.startAngle(startingAngle)
			.endAngle(startingAngle + (2 * Math.PI))
			.padAngle(padAngle)
			.sortValues(sortValue)
			.value((d: any) => d.values.reduce((a, b) => a + b.value, 0));
	},

	updateRadius(): void {
		const $$ = this;
		const {config, state} = $$;
		const radius = config.pie_innerRadius;
		const padding = config.pie_padding;
		const w = config.gauge_width || config.donut_width;
		const gaugeArcWidth = $$.filterTargetsToShow($$.data.targets).length *
			config.gauge_arcs_minWidth;

		state.radiusExpanded = Math.min(state.arcWidth, state.arcHeight) / 2 * (
			$$.hasMultiArcGauge() ? 0.85 : 1);
		state.radius = state.radiusExpanded * 0.95;
		state.innerRadiusRatio = w ? (state.radius - w) / state.radius : 0.6;
		state.gaugeArcWidth = w || (
			gaugeArcWidth <= state.radius - state.innerRadius ?
				state.radius - state.innerRadius :
				(gaugeArcWidth <= state.radius ? gaugeArcWidth : state.radius)
		);

		const innerRadius = radius || (
			padding ? padding * (state.innerRadiusRatio + 0.1) : 0
		);

		// NOTE: innerRadius can be an object by user setting, only for 'pie' type
		state.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ?
			state.radius * state.innerRadiusRatio : innerRadius;
	},

	getInnerRadius(d): number {
		const $$ = this;
		let {innerRadius} = $$.state;

		if (!isNumber(innerRadius) && d) {
			innerRadius = innerRadius[d.data.id] || 0;
		}

		return innerRadius;
	},

	updateArc(): void {
		const $$ = this;

		$$.svgArc = $$.getSvgArc();
		$$.svgArcExpanded = $$.getSvgArcExpanded();
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

		const radius = Math.PI * (config.gauge_fullCircle ? 2 : 1);
		const gStart = config.gauge_startingAngle;

		if (d.data && $$.isGaugeType(d.data) && !$$.hasMultiArcGauge()) {
			// to prevent excluding total data sum during the init(when data.hide option is used), use $$.rendered state value
			const totalSum = $$.getTotalDataSum(state.rendered);
			const gEnd = radius * (totalSum / (config.gauge_max - config.gauge_min));

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
		const {state} = $$;
		const ir = $$.getInnerRadius();
		const singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length;
		const hasMultiArcGauge = $$.hasMultiArcGauge();

		let arc = d3Arc()
			.outerRadius((d: any) => (
				hasMultiArcGauge ? (state.radius - singleArcWidth * d.index) : state.radius))
			.innerRadius((d: any) => (hasMultiArcGauge ?
				state.radius - singleArcWidth * (d.index + 1) :
				isNumber(ir) ? ir : 0));

		const newArc = function(d, withoutUpdate) {
			let path: string | null = "M 0 0";

			if (d.value || d.data) {
				if (!isNumber(ir)) {
					arc = arc.innerRadius($$.getInnerRadius(d));
				}

				const updated = !withoutUpdate && $$.updateAngle(d);

				if (withoutUpdate) {
					path = arc(d);
				} else if (updated) {
					path = arc(updated);
				}
			}

			return path;
		};

		// TODO: extends all function
		newArc.centroid = arc.centroid;

		return newArc;
	},

	getSvgArcExpanded(rate?: number): Function {
		const $$ = this;
		const {state} = $$;
		const newRate = rate || 1;
		const singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length;
		const hasMultiArcGauge = $$.hasMultiArcGauge();
		const expandWidth = Math.min(state.radiusExpanded * newRate - state.radius,
			singleArcWidth * 0.8 - (1 - newRate) * 100
		);

		const arc = d3Arc()
			.outerRadius((d: any) => (hasMultiArcGauge ?
				state.radius - singleArcWidth * d.index + expandWidth :
				state.radiusExpanded * newRate)
			)
			.innerRadius((d: any) => (hasMultiArcGauge ?
				state.radius - singleArcWidth * (d.index + 1) : state.innerRadius));

		return function(d) {
			const updated = $$.updateAngle(d);

			if (updated) {
				return (
					hasMultiArcGauge ? arc : arc.innerRadius($$.getInnerRadius(d))
				)(updated);
			} else {
				return "M 0 0";
			}
		};
	},

	getArc(d, withoutUpdate: boolean, force?: boolean): string {
		return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
	},

	transformForArcLabel(d): string {
		const $$ = this;
		const {config, state: {radius, radiusExpanded}} = $$;

		const updated = $$.updateAngle(d);
		let translate = "";

		if (updated) {
			if ($$.hasMultiArcGauge()) {
				const y1 = Math.sin(updated.endAngle - Math.PI / 2);

				const x = Math.cos(updated.endAngle - Math.PI / 2) * (radiusExpanded + 25);
				const y = y1 * (radiusExpanded + 15 - Math.abs(y1 * 10)) + 3;

				translate = `translate(${x},${y})`;
			} else if (!$$.hasType("gauge") || $$.data.targets.length > 1) {
				const c = this.svgArc.centroid(updated);
				const x = isNaN(c[0]) ? 0 : c[0];
				const y = isNaN(c[1]) ? 0 : c[1];
				const h = Math.sqrt(x * x + y * y);

				let ratio = ($$.hasType("donut") && config.donut_label_ratio) ||
					($$.hasType("pie") && config.pie_label_ratio);

				if (ratio) {
					ratio = isFunction(ratio) ? ratio.bind($$.api)(d, radius, h) : ratio;
				} else {
					ratio = radius && (
						h ? (36 / radius > 0.375 ? 1.175 - 36 / radius : 0.8) * radius / h : 0
					);
				}

				translate = `translate(${x * ratio},${y * ratio})`;
			}
		}

		return translate;
	},

	convertToArcData(d): object {
		return this.addName({
			id: d.data.id,
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
				.each(function(d) {
					const node = d3Select(this);
					const updated = $$.updateAngle(d);
					const ratio = $$.getRatio("arc", updated);
					const isUnderThreshold = $$.meetsLabelThreshold(ratio,
						($$.hasType("donut") && "donut") || ($$.hasType("gauge") && "gauge") || ($$.hasType("pie") && "pie")
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

	unexpandArc(targetIds: string[]): void {
		const $$ = this;
		const {state: {transiting}, $el: {svg}} = $$;

		if (transiting) {
			return;
		}

		const newTargetIds = $$.mapToTargetIds(targetIds);

		svg.selectAll($$.selectorTargets(newTargetIds, `.${CLASS.chartArc}`))
			.selectAll("path")
			.transition()
			.duration(d => $$.getExpandConfig(d.data.id, "duration"))
			.attr("d", $$.svgArc);

		svg.selectAll(`${CLASS.arc}`)
			.style("opacity", "1");
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

		return ["pie", "donut", "gauge"]
			.some(v => $$.hasType(v) && config[`${v}_label_show`]);
	},

	getArcLabelFormat(): number | string {
		const $$ = this;
		const {config} = $$;
		let format = config.pie_label_format;

		if ($$.hasType("gauge")) {
			format = config.gauge_label_format;
		} else if ($$.hasType("donut")) {
			format = config.donut_label_format;
		}

		return isFunction(format) ? format.bind($$.api) : format;
	},

	getArcTitle(): string {
		const $$ = this;
		const type = ($$.hasType("donut") && "donut") || ($$.hasType("gauge") && "gauge");

		return type ? $$.config[`${type}_title`] : "";
	},

	updateTargetsForArc(targets): void {
		const $$ = this;
		const {$el} = $$;
		const hasGauge = $$.hasType("gauge");
		const classChartArc = $$.classChartArc.bind($$);
		const classArcs = $$.classArcs.bind($$);
		const classFocus = $$.classFocus.bind($$);
		const chartArcs = $el.main.select(`.${CLASS.chartArcs}`);

		const mainPieUpdate = chartArcs
			.selectAll(`.${CLASS.chartArc}`)
			.data($$.pie(targets))
			.attr("class", d => classChartArc(d) + classFocus(d.data));

		const mainPieEnter = mainPieUpdate.enter().append("g")
			.attr("class", classChartArc);

		mainPieEnter.append("g")
			.attr("class", classArcs)
			.merge(mainPieUpdate);

		mainPieEnter.append("text")
			.attr("dy", hasGauge && !$$.hasMultiTargets() ? "-.1em" : ".35em")
			.style("opacity", "0")
			.style("text-anchor", "middle")
			.style("pointer-events", "none");

		$el.text = chartArcs.selectAll(`.${CLASS.target} text`);
		// MEMO: can not keep same color..., but not bad to update color in redraw
		// mainPieUpdate.exit().remove();
	},

	initArc(): void {
		const $$ = this;
		const {$el} = $$;

		$el.arcs = $el.main.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.chartArcs)
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
				.attr("class", CLASS[hasGauge ? "chartArcsGaugeTitle" : "chartArcsTitle"])
				.style("text-anchor", "middle");

			if (hasGauge) {
				text
					.attr("dy", "-0.3em")
					.style("font-size", "27px");
			}

			setTextValue(text, title, hasGauge ? undefined : [-0.6, 1.35], true);
		}
	},

	redrawArc(duration: number, durationForExit: number, withTransform?: boolean): void {
		const $$ = this;
		const {config, state, $el: {main}} = $$;
		const hasInteraction = config.interaction_enabled;
		const isSelectable = hasInteraction && config.data_selection_isselectable;

		let mainArc = main.selectAll(`.${CLASS.arcs}`)
			.selectAll(`.${CLASS.arc}`)
			.data($$.arcData.bind($$));

		mainArc.exit().transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		mainArc = mainArc.enter().append("path")
			.attr("class", $$.classArc.bind($$))
			.style("fill", d => $$.color(d.data))
			.style("cursor", d => (isSelectable && isSelectable.bind($$.api)(d) ? "pointer" : null))
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
				return d === this._current ? "0" : "1";
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
					color = $$.color(d.data.id);
				}

				return color;
			})
			// Where gauge reading color would receive customization.
			.style("opacity", "1")
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

		$$.redrawArcText(duration);
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
			const id = (arcData && arcData.id) || undefined;

			$$.unexpandArc(id);
			$$.api.revert();
			$$.revertLegend();
			$$.hideTooltip();
		}

		arc
			.on("click", function(d, i) {
				const updated = $$.updateAngle(d);
				let arcData;

				if (updated) {
					arcData = $$.convertToArcData(updated);

					$$.toggleShape && $$.toggleShape(this, arcData, i);
					config.data_onclick.bind($$.api)(arcData, this);
				}
			});

		// mouse events
		if (isMouse) {
			arc
				.on("mouseover", function(d) {
					if (state.transiting) { // skip while transiting
						return;
					}

					const updated = $$.updateAngle(d);
					const arcData = updated ? $$.convertToArcData(updated) : null;
					const id = (arcData && arcData.id) || undefined;

					selectArc(this, arcData, id);
					$$.setOverOut(true, arcData);
				})
				.on("mouseout", d => {
					if (state.transiting) { // skip while transiting
						return;
					}

					const updated = $$.updateAngle(d);
					const arcData = updated ? $$.convertToArcData(updated) : null;

					unselectArc();
					$$.setOverOut(false, arcData);
				})
				.on("mousemove", function(d) {
					const updated = $$.updateAngle(d);
					const arcData = updated ? $$.convertToArcData(updated) : null;

					$$.showTooltip([arcData], this);
				});
		}

		// touch events
		if (isTouch && $$.hasArcType() && !$$.radars) {
			const getEventArc = () => {
				const touch = d3Event.changedTouches[0];
				const eventArc = d3Select(document.elementFromPoint(touch.clientX, touch.clientY));

				return eventArc;
			};

			const handler = function() {
				if (state.transiting) { // skip while transiting
					return;
				}

				const eventArc = getEventArc();
				const datum: any = eventArc.datum();
				const updated = (datum && datum.data && datum.data.id) ? $$.updateAngle(datum) : null;
				const arcData = updated ? $$.convertToArcData(updated) : null;
				const id = (arcData && arcData.id) || undefined;

				$$.callOverOutForTouch(arcData);

				isUndefined(id) ?
					unselectArc() : selectArc(this, arcData, id);
			};

			$$.$el.svg
				.on("touchstart", handler)
				.on("touchmove", handler);
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
			text = main.selectAll(`.${CLASS.chartArc}`)
				.select("text")
				.style("opacity", "0")
				.attr("class", d => ($$.isGaugeType(d.data) ? CLASS.gaugeValue : null))
				.call($$.textForArcLabel.bind($$))
				.attr("transform", $$.transformForArcLabel.bind($$))
				.style("font-size", d => (
					$$.isGaugeType(d.data) && $$.data.targets.length === 1 && !hasMultiArcGauge ?
						`${Math.round(state.radius / 5)}px` : null
				))
				.transition()
				.duration(duration)
				.style("opacity", d => ($$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? "1" : "0"));

			hasMultiArcGauge && text.attr("dy", "-.1em");
		}

		main.select(`.${CLASS.chartArcsTitle}`)
			.style("opacity", $$.hasType("donut") || hasGauge ? "1" : "0");

		if (hasGauge) {
			const isFullCircle = config.gauge_fullCircle;
			const startAngle = -1 * Math.PI / 2;
			const endAngle = (isFullCircle ? -4 : -1) * startAngle;

			isFullCircle && text && text.attr("dy", `${Math.round(state.radius / 14)}`);

			let backgroundArc = $$.$el.arcs.select(
				`${hasMultiArcGauge ? "g" : ""}.${CLASS.chartArcsBackground}`
			);

			if (hasMultiArcGauge) {
				let index = 0;

				backgroundArc = backgroundArc
					.selectAll(`path.${CLASS.chartArcsBackground}`)
					.data($$.data.targets);

				backgroundArc.enter()
					.append("path")
					.attr("class", (d, i) => `${CLASS.chartArcsBackground} ${CLASS.chartArcsBackground}-${i}`)
					.style("fill", (config.gauge_background) || null)
					.merge(backgroundArc)
					.attr("d", d1 => {
						if (state.hiddenTargetIds.indexOf(d1.id) >= 0) {
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
				backgroundArc.attr("d", () => {
					const d = {
						data: [{value: config.gauge_max}],
						startAngle,
						endAngle
					};

					return $$.getArc(d, true, true);
				});
			}

			arcs.select(`.${CLASS.chartArcsGaugeUnit}`)
				.attr("dy", ".75em")
				.text(config.gauge_label_show ? config.gauge_units : "");

			if (config.gauge_label_show) {
				arcs.select(`.${CLASS.chartArcsGaugeMin}`)
					.attr("dx", `${-1 * (state.innerRadius + ((state.radius - state.innerRadius) / (isFullCircle ? 1 : 2)))}px`)
					.attr("dy", "1.2em")
					.text($$.textForGaugeMinMax(config.gauge_min, false));

				// show max text when isn't fullCircle
				!isFullCircle && arcs.select(`.${CLASS.chartArcsGaugeMax}`)
					.attr("dx", `${state.innerRadius + ((state.radius - state.innerRadius) / 2)}px`)
					.attr("dy", "1.2em")
					.text($$.textForGaugeMinMax(config.gauge_max, true));
			}
		}
	}
};
