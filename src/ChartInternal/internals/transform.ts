/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import CLASS from "../../config/classes";
import {asHalfPixel} from "../../module/util";

type TranslateParam = "main" | "context" | "legend" | "x" | "y" | "y2" | "subX" | "arc" | "radar";

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
			y = isRotated ? 1 - padding : 0;
		} else if (target === "subX") {
			x = 0;
			y = isRotated ? 0 : state.height2;
		} else if (target === "arc") {
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
		const {main} = $$.$el;
		let xAxis;
		let yAxis;
		let y2Axis;

		if (transitions && transitions.axisX) {
			xAxis = transitions.axisX;
		} else {
			xAxis = main.select(`.${CLASS.axisX}`);

			if (withTransition) {
				xAxis = xAxis.transition();
			}
		}

		if (transitions && transitions.axisY) {
			yAxis = transitions.axisY;
		} else {
			yAxis = main.select(`.${CLASS.axisY}`);

			if (withTransition) {
				yAxis = yAxis.transition();
			}
		}

		if (transitions && transitions.axisY2) {
			y2Axis = transitions.axisY2;
		} else {
			y2Axis = main.select(`.${CLASS.axisY2}`);

			if (withTransition) {
				y2Axis = y2Axis.transition();
			}
		}

		(withTransition ? main.transition() : main)
			.attr("transform", $$.getTranslate("main"));

		xAxis.attr("transform", $$.getTranslate("x"));
		yAxis.attr("transform", $$.getTranslate("y"));
		y2Axis.attr("transform", $$.getTranslate("y2"));

		main.select(`.${CLASS.chartArcs}`)
			.attr("transform", $$.getTranslate("arc"));
	},

	transformAll(withTransition: boolean, transitions): void {
		const $$ = this;
		const {config, state: {hasAxis}, $el} = $$;

		$$.transformMain(withTransition, transitions);

		hasAxis && config.subchart_show &&
			$$.transformContext(withTransition, transitions);

		$el.legend && $$.transformLegend(withTransition);
	}
};
