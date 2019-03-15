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
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend, isFunction, isUndefined} from "../internals/util";

extend(ChartInternal.prototype, {
	initPie() {
		const $$ = this;
		const config = $$.config;
		const padding = config.pie_padding;

		const padAngle = $$.hasType("pie") && padding ?
			padding * 0.01 : config[`${config.data_type}_padAngle`] ?
				config[`${config.data_type}_padAngle`] : 0;

		$$.pie = d3Pie()
			.padAngle(padAngle)
			.value(d => d.values.reduce((a, b) => a + b.value, 0));

		!config.data_order && $$.pie.sort(null);
	},

	updateRadius() {
		const $$ = this;
		const config = $$.config;
		const radius = config.pie_innerRadius;
		const padding = config.pie_padding;
		const w = config.gauge_width || config.donut_width;

		$$.radiusExpanded = Math.min($$.arcWidth, $$.arcHeight) / 2;
		$$.radius = $$.radiusExpanded * 0.95;
		$$.innerRadiusRatio = w ? ($$.radius - w) / $$.radius : 0.6;

		const innerRadius = radius || (
			padding ? padding * ($$.innerRadiusRatio + 0.1) : 0
		);

		$$.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ?
			$$.radius * $$.innerRadiusRatio : innerRadius;
	},

	updateArc() {
		const $$ = this;

		$$.svgArc = $$.getSvgArc();
		$$.svgArcExpanded = $$.getSvgArcExpanded();
		$$.svgArcExpandedSub = $$.getSvgArcExpanded(0.98);
	},

	updateAngle(dValue) {
		const $$ = this;
		const config = $$.config;
		let d = dValue;
		let found = false;
		let index = 0;
		let gMin;
		let gMax;
		let gTic;
		let gValue;

		if (!config) {
			return null;
		}

		$$.pie($$.filterTargetsToShow($$.data.targets)).forEach(t => {
			if (!found && t.data.id === d.data.id) {
				found = true;
				d = t;
				d.index = index;
			}

			index++;
		});

		if (isNaN(d.startAngle)) {
			d.startAngle = 0;
		}

		if (isNaN(d.endAngle)) {
			d.endAngle = d.startAngle;
		}

		if ($$.isGaugeType(d.data)) {
			gMin = config.gauge_min;
			gMax = config.gauge_max;
			gTic = (Math.PI * (config.gauge_fullCircle ? 2 : 1)) / (gMax - gMin);

			gValue = d.value < gMin ?
				0 : (d.value < gMax ? d.value - gMin : (gMax - gMin));

			d.startAngle = config.gauge_startingAngle;
			d.endAngle = d.startAngle + gTic * gValue;
		}

		return found ? d : null;
	},

	getSvgArc() {
		const $$ = this;
		const arc = d3Arc()
			.outerRadius($$.radius)
			.innerRadius($$.innerRadius);

		const newArc = (d, withoutUpdate) => {
			let path = "M 0 0";

			if ("value" in d ? d.value > 0 : d.data) {
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

	getSvgArcExpanded(rate) {
		const $$ = this;
		const arc = d3Arc()
			.outerRadius($$.radiusExpanded * (rate || 1))
			.innerRadius($$.innerRadius);

		return function(d) {
			const updated = $$.updateAngle(d);

			return updated ? arc(updated) : "M 0 0";
		};
	},

	getArc(d, withoutUpdate, force) {
		return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
	},

	transformForArcLabel(d) {
		const $$ = this;
		const config = $$.config;
		const updated = $$.updateAngle(d);
		let translate = "";

		if (updated && !$$.hasType("gauge")) {
			const c = this.svgArc.centroid(updated);
			const x = isNaN(c[0]) ? 0 : c[0];
			const y = isNaN(c[1]) ? 0 : c[1];
			const h = Math.sqrt(x * x + y * y);

			let ratio = ($$.hasType("donut") && config.donut_label_ratio) ||
				($$.hasType("pie") && config.pie_label_ratio);

			if (ratio) {
				ratio = isFunction(ratio) ? ratio(d, $$.radius, h) : ratio;
			} else {
				ratio = $$.radius &&
					(h ? (36 / $$.radius > 0.375 ? 1.175 - 36 / $$.radius : 0.8) * $$.radius / h : 0);
			}

			translate = `translate(${x * ratio},${y * ratio})`;
		}

		return translate;
	},

	convertToArcData(d) {
		return this.addName({
			id: d.data.id,
			value: d.value,
			ratio: this.getRatio("arc", d),
			index: d.index,
		});
	},

	textForArcLabel(selection) {
		const $$ = this;

		if ($$.shouldShowArcLabel()) {
			selection.each(function(d) {
				const node = d3Select(this);
				const updated = $$.updateAngle(d);
				const value = updated ? updated.value : null;
				const ratio = $$.getRatio("arc", updated);
				const id = d.data.id;
				const isUnderThreshold = !(
					!$$.hasType("gauge") && !$$.meetsArcLabelThreshold(ratio)
				);

				if (isUnderThreshold) {
					const nodeText = node.text();
					const text = (
						$$.getArcLabelFormat() || $$.defaultArcValueFormat
					)(value, ratio, id).toString();

					if (text.indexOf("\n") === -1) {
						nodeText !== text && node.text(text);
					} else {
						const diff = [nodeText, text].map(v => v.replace(/[\s\n]/g, ""));

						if (diff[0] !== diff[1]) {
							const multiline = text.split("\n");
							const len = multiline.length - 1;

							// reset possible text
							node.html("");

							multiline.forEach((v, i) => {
								node.append("tspan")
									.attr("x", 0)
									.attr("dy", `${i === 0 ? -len : 1}em`)
									.text(v);
							});
						}
					}
				}
			});
		}
	},

	textForGaugeMinMax(value, isMax) {
		const format = this.getGaugeLabelExtents();

		return format ? format(value, isMax) : value;
	},

	expandArc(targetIds) {
		const $$ = this;

		// MEMO: avoid to cancel transition
		if ($$.transiting) {
			const interval = setInterval(() => {
				if (!$$.transiting) {
					clearInterval(interval);

					$$.legend.selectAll(`.${CLASS.legendItemFocused}`).size() > 0 &&
						$$.expandArc(targetIds);
				}
			}, 10);

			return;
		}

		const newTargetIds = $$.mapToTargetIds(targetIds);

		$$.svg.selectAll($$.selectorTargets(newTargetIds, `.${CLASS.chartArc}`))
			.each(function(d) {
				if (!$$.shouldExpand(d.data.id) || d.value === 0) {
					return;
				}

				const expandDuration = $$.expandDuration(d.data.id);

				d3Select(this).selectAll("path")
					.transition()
					.duration(expandDuration)
					.attr("d", $$.svgArcExpanded)
					.transition()
					.duration(expandDuration * 2)
					.attr("d", $$.svgArcExpandedSub);
			});
	},

	unexpandArc(targetIds) {
		const $$ = this;

		if ($$.transiting) {
			return;
		}

		const newTargetIds = $$.mapToTargetIds(targetIds);

		$$.svg.selectAll($$.selectorTargets(newTargetIds, `.${CLASS.chartArc}`))
			.selectAll("path")
			.transition()
			.duration(d => $$.expandDuration(d.data.id))
			.attr("d", $$.svgArc);

		$$.svg.selectAll(`${CLASS.arc}`)
			.style("opacity", "1");
	},

	expandDuration(id) {
		const $$ = this;
		const config = $$.config;
		let type;

		if ($$.isDonutType(id)) {
			type = "donut";
		} else if ($$.isGaugeType(id)) {
			type = "gauge";
		} else if ($$.isPieType(id)) {
			type = "pie";
		}

		return type ? config[`${type}_expand_duration`] : 50;
	},

	shouldExpand(id) {
		const $$ = this;
		const config = $$.config;

		return ($$.isDonutType(id) && config.donut_expand) ||
			($$.isGaugeType(id) && config.gauge_expand) ||
			($$.isPieType(id) && config.pie_expand);
	},

	shouldShowArcLabel() {
		const $$ = this;
		const config = $$.config;
		let shouldShow = true;

		if ($$.hasType("donut")) {
			shouldShow = config.donut_label_show;
		} else if ($$.hasType("pie")) {
			shouldShow = config.pie_label_show;
		}

		// when gauge, always true
		return shouldShow;
	},

	meetsArcLabelThreshold(ratio) {
		const $$ = this;
		const config = $$.config;
		const threshold = $$.hasType("donut") ? config.donut_label_threshold : config.pie_label_threshold;

		return ratio >= threshold;
	},

	getArcLabelFormat() {
		const $$ = this;
		const config = $$.config;
		let format = config.pie_label_format;

		if ($$.hasType("gauge")) {
			format = config.gauge_label_format;
		} else if ($$.hasType("donut")) {
			format = config.donut_label_format;
		}

		return format;
	},

	getGaugeLabelExtents() {
		const config = this.config;

		return config.gauge_label_extents;
	},

	getArcTitle() {
		const $$ = this;

		return $$.hasType("donut") ? $$.config.donut_title : "";
	},

	updateTargetsForArc(targets) {
		const $$ = this;
		const main = $$.main;
		const classChartArc = $$.classChartArc.bind($$);
		const classArcs = $$.classArcs.bind($$);
		const classFocus = $$.classFocus.bind($$);
		const mainPieUpdate = main.select(`.${CLASS.chartArcs}`)
			.selectAll(`.${CLASS.chartArc}`)
			.data($$.pie(targets))
			.attr("class", d => classChartArc(d) + classFocus(d.data));

		const mainPieEnter = mainPieUpdate.enter().append("g")
			.attr("class", classChartArc);

		mainPieEnter.append("g")
			.attr("class", classArcs)
			.merge(mainPieUpdate);

		mainPieEnter.append("text")
			.attr("dy", $$.hasType("gauge") ? "-.1em" : ".35em")
			.style("opacity", "0")
			.style("text-anchor", "middle")
			.style("pointer-events", "none");
		// MEMO: can not keep same color..., but not bad to update color in redraw
		// mainPieUpdate.exit().remove();
	},

	initArc() {
		const $$ = this;

		$$.arcs = $$.main.select(`.${CLASS.chart}`)
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

		if (title) {
			const multiline = title.split("\n");
			const text = $$.arcs.append("text")
				.attr("class", CLASS.chartArcsTitle)
				.style("text-anchor", "middle");

			// if is multiline text
			if (multiline.length > 1) {
				const fontSize = +text.style("font-size").replace("px", "");
				const height = Math.floor(
					text.text(".").node()
						.getBBox().height, text.text("")
				);

				multiline.forEach((v, i) =>
					text.insert("tspan")
						.text(v)
						.attr("x", 0)
						.attr("dy", i ? height : 0)
				);

				text.attr("y", `-${
					fontSize * (multiline.length - 2) ||
					fontSize / 2
				}`);
			} else {
				text.text(title);
			}
		}
	},

	redrawArc(duration, durationForExit, withTransform) {
		const $$ = this;
		const config = $$.config;
		const main = $$.main;
		const hasInteraction = config.interaction_enabled;

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
			.style("cursor", d => hasInteraction && (config.data_selection_isselectable(d) ? "pointer" : null))
			.style("opacity", "0")
			.each(function(d) {
				if ($$.isGaugeType(d.data)) {
					d.startAngle = config.gauge_startingAngle;
					d.endAngle = config.gauge_startingAngle;
				}

				this._current = d;
			})
			.merge(mainArc);

		mainArc
			.attr("transform", d => (!$$.isGaugeType(d.data) && withTransform ? "scale(0)" : ""))
			.style("opacity", function(d) {
				return d === this._current ? "0" : "1";
			})
			.each(() => {
				$$.transiting = true;
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
			.style("fill", d => ($$.levelColor ?
				$$.levelColor(d.data.values[0].value) : $$.color(d.data.id))
			)
			// Where gauge reading color would receive customization.
			.style("opacity", "1")
			.call($$.endall, () => {
				$$.transiting = false;
			});

		// bind arc events
		hasInteraction && $$.bindArcEvent(mainArc);

		$$.redrawArcText(duration);
	},

	bindArcEvent(arc) {
		const $$ = this;
		const isTouch = $$.inputType === "touch";
		const isMouse = $$.inputType === "mouse";

		function selectArc(_this, arcData, id) {
			// transitions
			$$.expandArc(id);
			$$.api.focus(id);
			$$.toggleFocusLegend(id, true);
			$$.showTooltip([arcData], _this);
		}

		function unselectArc(arcData) {
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
					$$.config.data_onclick.call($$.api, arcData, this);
				}
			});

		// mouse events
		if (isMouse) {
			arc
				.on("mouseover", function(d) {
					if ($$.transiting) { // skip while transiting
						return;
					}

					const updated = $$.updateAngle(d);
					const arcData = updated ? $$.convertToArcData(updated) : null;
					const id = (arcData && arcData.id) || undefined;

					selectArc(this, arcData, id);
					$$.setOverOut(true, arcData);
				})
				.on("mouseout", d => {
					if ($$.transiting) { // skip while transiting
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
				if ($$.transiting) { // skip while transiting
					return;
				}

				const eventArc = getEventArc();
				const datum = eventArc.datum();
				const updated = (datum && datum.data && datum.data.id) ? $$.updateAngle(datum) : null;
				const arcData = updated ? $$.convertToArcData(updated) : null;
				const id = (arcData && arcData.id) || undefined;

				$$.callOverOutForTouch(arcData);

				isUndefined(id) ?
					unselectArc() : selectArc(this, arcData, id);
			};

			$$.svg
				.on("touchstart", handler)
				.on("touchmove", handler);
		}
	},

	redrawArcText(duration) {
		const $$ = this;
		const config = $$.config;
		const main = $$.main;

		const text = main.selectAll(`.${CLASS.chartArc}`)
			.select("text")
			.style("opacity", "0")
			.attr("class", d => ($$.isGaugeType(d.data) ? CLASS.gaugeValue : null));

		config.gauge_fullCircle && text.attr("dy", `${Math.round($$.radius / 14)}`);

		text.call($$.textForArcLabel.bind($$))
			.attr("transform", $$.transformForArcLabel.bind($$))
			.style("font-size", d => ($$.isGaugeType(d.data) ? `${Math.round($$.radius / 5)}px` : ""))
			.transition()
			.duration(duration)
			.style("opacity", d => ($$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? "1" : "0"));

		main.select(`.${CLASS.chartArcsTitle}`)
			.style("opacity", $$.hasType("donut") || $$.hasType("gauge") ? "1" : "0");

		if ($$.hasType("gauge")) {
			const endAngle = (config.gauge_fullCircle ? -4 : -1) * config.gauge_startingAngle;

			$$.arcs.select(`.${CLASS.chartArcsBackground}`)
				.attr("d", () => {
					const d = {
						data: [{value: config.gauge_max}],
						startAngle: config.gauge_startingAngle,
						endAngle: endAngle
					};

					return $$.getArc(d, true, true);
				});

			$$.arcs.select(`.${CLASS.chartArcsGaugeUnit}`)
				.attr("dy", ".75em")
				.text(config.gauge_label_show ? config.gauge_units : "");

			if (config.gauge_label_show) {
				$$.arcs.select(`.${CLASS.chartArcsGaugeMin}`)
					.attr("dx", `${-1 * ($$.innerRadius + (($$.radius - $$.innerRadius) / (config.gauge_fullCircle ? 1 : 2)))}px`)
					.attr("dy", "1.2em")
					.text($$.textForGaugeMinMax(config.gauge_min, false));

				// show max text when isn't fullCircle
				!config.gauge_fullCircle && $$.arcs.select(`.${CLASS.chartArcsGaugeMax}`)
					.attr("dx", `${$$.innerRadius + (($$.radius - $$.innerRadius) / 2)}px`)
					.attr("dy", "1.2em")
					.text($$.textForGaugeMinMax(config.gauge_max, true));
			}
		}
	},

	initGauge() {
		const $$ = this;
		const config = $$.config;
		const arcs = $$.arcs;

		if ($$.hasType("gauge")) {
			arcs.append("path")
				.attr("class", CLASS.chartArcsBackground);

			arcs.append("text")
				.attr("class", CLASS.chartArcsGaugeUnit)
				.style("text-anchor", "middle")
				.style("pointer-events", "none");

			if (config.gauge_label_show) {
				arcs.append("text")
					.attr("class", CLASS.chartArcsGaugeMin)
					.style("text-anchor", "middle")
					.style("pointer-events", "none");

				!config.gauge_fullCircle && arcs.append("text")
					.attr("class", CLASS.chartArcsGaugeMax)
					.style("text-anchor", "middle")
					.style("pointer-events", "none");
			}
		}
	},

	getGaugeLabelHeight() {
		return this.config.gauge_label_show ? 20 : 0;
	}
});
