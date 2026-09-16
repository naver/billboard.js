/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isFunction } from "../../module/util/type-checks.js";
import { $ARC, $COMMON, $GAUGE } from "../../config/classes.js";
import { select } from "d3-selection";
//#region src/ChartInternal/shape/gauge.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
var gauge_default = {
	initGauge() {
		const $$ = this;
		const { config, $el: { arcs } } = $$;
		const appendText = (className = null, value = "") => {
			arcs.append("text").attr("class", className).style("text-anchor", "middle").style("pointer-events", "none").text(value);
		};
		if ($$.hasType("gauge")) {
			const hasMulti = $$.hasMultiArcGauge();
			arcs.append(hasMulti ? "g" : "path").attr("class", $ARC.chartArcsBackground).style("fill", !hasMulti && config.gauge_background || null);
			config.gauge_units && appendText($GAUGE.chartArcsGaugeUnit);
			if (config.gauge_label_show) {
				appendText($GAUGE.chartArcsGaugeMin);
				!config.gauge_fullCircle && appendText($GAUGE.chartArcsGaugeMax);
			}
		}
	},
	updateGaugeMax() {
		const $$ = this;
		const { config, state } = $$;
		const max = $$.hasMultiArcGauge() ? $$.getMinMaxData().max[0].value : $$.getTotalDataSum(state.rendered);
		if (!config.gauge_enforceMinMax && max + config.gauge_min * (config.gauge_min > 0 ? -1 : 1) > config.gauge_max) config.gauge_max = max - config.gauge_min;
	},
	redrawArcGaugeLine() {
		const $$ = this;
		const { config, state, $el } = $$;
		const { hiddenTargetIds } = $$.state;
		const arcLabelLines = $el.main.selectAll(`.${$ARC.arcs}`).selectAll(`.${$ARC.arcLabelLine}`).data($$.arcData.bind($$));
		arcLabelLines.enter().append("rect").attr("class", (d) => `${$ARC.arcLabelLine} ${$COMMON.target} ${$COMMON.target}-${d.data.id}`).merge(arcLabelLines).style("fill", (d) => $$.levelColor ? $$.levelColor(d.data.values[0].value) : $$.color(d.data)).style("display", config.gauge_label_show ? null : "none").each(function(d) {
			let lineLength = 0;
			const lineThickness = 2;
			let x = 0;
			let y = 0;
			let transform = "";
			if (!hiddenTargetIds.has(d.data.id)) {
				const updated = $$.updateAngle(d);
				const innerLineLength = state.gaugeArcWidth / $$.getTargetsToShow().length * (updated.index + 1);
				const lineAngle = updated.endAngle - Math.PI / 2;
				const arcInnerRadius = state.radius - innerLineLength;
				const linePositioningAngle = lineAngle - (arcInnerRadius === 0 ? 0 : 1 / arcInnerRadius);
				lineLength = state.radiusExpanded - state.radius + innerLineLength;
				x = Math.cos(linePositioningAngle) * arcInnerRadius;
				y = Math.sin(linePositioningAngle) * arcInnerRadius;
				transform = `rotate(${lineAngle * 180 / Math.PI}, ${x}, ${y})`;
			}
			select(this).attr("x", x).attr("y", y).attr("width", lineLength).attr("height", lineThickness).attr("transform", transform).style("stroke-dasharray", `0, ${lineLength + lineThickness}, 0`);
		});
	},
	textForGaugeMinMax(value, isMax) {
		const $$ = this;
		const { config } = $$;
		const format = config.gauge_label_extents;
		return isFunction(format) ? format.bind($$.api)(value, isMax) : value;
	},
	getGaugeLabelHeight() {
		const { config } = this;
		return this.config.gauge_label_show && !config.gauge_fullCircle ? 20 : 0;
	},
	getPaddingBottomForGauge() {
		return this.getGaugeLabelHeight() * 2;
	}
};
//#endregion
export { gauge_default as default };
