/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$ARC, $AXIS} from "../../config/classes";
import {asHalfPixel} from "../../module/util";

type TranslateParam = "main" | "context" | "legend" | "x" | "y" | "y2" | "subX" | "arc" | "radar" | "polar";

export default {
	getTranslate(target: TranslateParam, index = 0): string {
		const $$ = this;
		const {config, state} = $$;
		const isRotated = config.axis_rotated;
		let padding = 0;
		let x;
		let y;

		if (index && /^(x|y2?)$/.test(target)) {
			padding = $$.getAxisSize(target) * index;
		}

		if (target === "main") {
			x = asHalfPixel(state.margin.left);
			y = asHalfPixel(state.margin.top);
		} else if (target === "context") {
			x = asHalfPixel(state.margin2.left);
			y = asHalfPixel(state.margin2.top);
		} else if (target === "legend") {
			x = state.margin3.left;
			y = state.margin3.top;
		} else if (target === "x") {
			x = isRotated ? -padding : 0;
			y = isRotated ? 0 : state.height + padding;
		} else if (target === "y") {
			x = isRotated ? 0 : -padding;
			y = isRotated ? state.height + padding : 0;
		} else if (target === "y2") {
			x = isRotated ? 0 : state.width + padding;
			y = isRotated && padding ? 1 - padding : 0;
		} else if (target === "subX") {
			x = 0;
			y = isRotated ? 0 : state.height2;
		} else if (target === "arc") {
			x = state.arcWidth / 2;
			y = state.arcHeight / 2;
		} else if (target === "polar") {
			x = state.arcWidth / 2;
			y = state.arcHeight / 2;
		} else if (target === "radar") {
			const [width] = $$.getRadarSize();

			x = state.width / 2 - width;
			y = asHalfPixel(state.margin.top);
		}

		return `translate(${x}, ${y})`;
	},

	transformMain(withTransition: boolean, transitions): void {
		const $$ = this;
		const {$el: {main}, $T} = $$;

		const xAxis = transitions?.axisX ?
			transitions.axisX :
			$T(main.select(`.${$AXIS.axisX}`), withTransition);

		const yAxis = transitions?.axisY ?
			transitions.axisY :
			$T(main.select(`.${$AXIS.axisY}`), withTransition);


		const y2Axis = transitions?.axisY2 ?
			transitions.axisY2 :
			$T(main.select(`.${$AXIS.axisY2}`), withTransition);

		$T(main, withTransition)
			.attr("transform", $$.getTranslate("main"));

		xAxis.attr("transform", $$.getTranslate("x"));
		yAxis.attr("transform", $$.getTranslate("y"));
		y2Axis.attr("transform", $$.getTranslate("y2"));

		main.select(`.${$ARC.chartArcs}`)
			.attr("transform", $$.getTranslate("arc"));
	},

	transformAll(withTransition: boolean, transitions): void {
		const $$ = this;
		const {config, state: {hasAxis, hasTreemap}, $el} = $$;

		!hasTreemap && $$.transformMain(withTransition, transitions);

		hasAxis && config.subchart_show &&
			$$.transformContext(withTransition, transitions);

		$el.legend && $$.transformLegend(withTransition);
	}
};
