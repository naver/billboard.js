/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import CLASS from "../../config/classes";
import {getPointer, getRandom, getRectSegList, isNumber, isObjectType, isValue} from "../../module/util";

export default {
	initCandlestick(): void {
		const {$el} = this;

		$el.candlestick = $el.main.select(`.${CLASS.chart}`)
			// should positioned at the beginning of the shape node to not overlap others
			.insert("g", ":first-child")
			.attr("class", CLASS.chartCandlesticks);
	},

	// called from: updateTargets
	updateTargetsForCandlestick(targets): void {
		const $$ = this;
		const {config, $el} = $$;
		const classChart = $$.getChartClass("Candlestick");
		const classCandlesticks = $$.getClass("candlesticks", true);
		const classFocus = $$.classFocus.bind($$);

		console.log("updateTargets", targets)
		// const classChartBar = $$.classChartBar.bind($$);
		// const classBars = $$.classBars.bind($$);
		// const classFocus = $$.classFocus.bind($$);

		if (!$el.candlestick) {
			$$.initCandlestick();
		}

		const mainUpdate = $$.$el.main.select(`.${CLASS.chartCandlesticks}`)
			.selectAll(`.${CLASS.chartCandlestick}`)
			.data(targets)
			.attr("class", d => classChart(d) + classFocus(d));

		const mainEnter = mainUpdate.enter().append("g")
			.attr("class", classChart)
			.style("opacity", "0")
			.style("pointer-events", "none");

		// // Bars for each data
		mainEnter.append("g")
			.attr("class", classCandlesticks);
			//.style("cursor", d => (isSelectable && isSelectable.bind($$.api)(d) ? "pointer" : null));
	},

	generateDrawCandlestick() {
		console.log("generate")

		return (d, i) => {
			console.log(d, i)

			return `M0,0`;
		};
	},

	generateGetCandlestickPoints() {
		console.log("generate points")
	},

	redrawCandlestick() {
		console.log("redraw")
	}
};
