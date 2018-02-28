/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {mouse as d3Mouse} from "d3-selection";
import CLASS from "../config/classes";
import ChartInternal from "../internals/ChartInternal";
import {extend, isValue, isNumber, getRectSegList} from "../internals/util";

extend(ChartInternal.prototype, {
	initBar() {
		const $$ = this;

		$$.main.select(`.${CLASS.chart}`).append("g")
			.attr("class", CLASS.chartBars);
	},

	updateTargetsForBar(targets) {
		const $$ = this;
		const config = $$.config;
		const classChartBar = $$.classChartBar.bind($$);
		const classBars = $$.classBars.bind($$);
		const classFocus = $$.classFocus.bind($$);
		const mainBarUpdate = $$.main.select(`.${CLASS.chartBars}`)
			.selectAll(`.${CLASS.chartBar}`)
			.data(targets)
			.attr("class", d => classChartBar(d) + classFocus(d));
		const mainBarEnter = mainBarUpdate.enter().append("g")
			.attr("class", classChartBar)
			.style("opacity", "0")
			.style("pointer-events", "none");

		// Bars for each data
		mainBarEnter.append("g")
			.attr("class", classBars)
			.style("cursor", d => (config.data_selection_isselectable(d) ? "pointer" : null));
	},

	updateBar(durationForExit) {
		const $$ = this;
		const barData = $$.barData.bind($$);
		const classBar = $$.classBar.bind($$);
		const initialOpacity = $$.initialOpacity.bind($$);
		const color = d => $$.color(d.id);

		$$.mainBar = $$.main.selectAll(`.${CLASS.bars}`).selectAll(`.${CLASS.bar}`)
			.data(barData);

		$$.mainBar.exit().transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$$.mainBar = $$.mainBar.enter().append("path")
			.attr("class", classBar)
			.style("stroke", color)
			.style("fill", color)
			.merge($$.mainBar)
			.style("opacity", initialOpacity);
	},

	redrawBar(drawBar, withTransition) {
		return [
			(withTransition ? this.mainBar.transition(Math.random().toString()) : this.mainBar)
				.attr("d", drawBar)
				.style("fill", this.color)
				.style("opacity", "1")
		];
	},

	getBarW(axis, barTargetsNum) {
		const $$ = this;
		const config = $$.config;
		const w = isNumber(config.bar_width) ?
			config.bar_width : barTargetsNum ?
				(axis.tickInterval($$.getMaxDataCount()) * config.bar_width_ratio) / barTargetsNum : 0;

		return config.bar_width_max && w > config.bar_width_max ?
			config.bar_width_max : w;
	},

	getBars(i, id) {
		const $$ = this;
		const suffix = (isValue(i) ? `-${i}` : ``);

		return (id ? $$.main
			.selectAll(`.${CLASS.bars}${$$.getTargetSelectorSuffix(id)}`) : $$.main)
			.selectAll(`.${CLASS.bar}${suffix}`);
	},

	expandBars(i, id, reset) {
		const $$ = this;

		if (reset) { $$.unexpandBars(); }
		$$.getBars(i, id).classed(CLASS.EXPANDED, true);
	},

	unexpandBars(i) {
		const $$ = this;

		$$.getBars(i).classed(CLASS.EXPANDED, false);
	},

	generateDrawBar(barIndices, isSub) {
		const $$ = this;
		const config = $$.config;
		const getPoints = $$.generateGetBarPoints(barIndices, isSub);

		return (d, i) => {
			// 4 points that make a bar
			const points = getPoints(d, i);

			// switch points if axis is rotated, not applicable for sub chart
			const indexX = config.axis_rotated ? 1 : 0;
			const indexY = +!indexX;

			return `M ${points[0][indexX]},${points[0][indexY]}
				L ${points[1][indexX]},${points[1][indexY]}
				L ${points[2][indexX]},${points[2][indexY]}
				L ${points[3][indexX]},${points[3][indexY]} z`;
		};
	},

	generateGetBarPoints(barIndices, isSub) {
		const $$ = this;
		const axis = isSub ? $$.subXAxis : $$.xAxis;
		const barTargetsNum = barIndices.__max__ + 1;
		const barW = $$.getBarW(axis, barTargetsNum);
		const barX = $$.getShapeX(barW, barTargetsNum, barIndices, !!isSub);
		const barY = $$.getShapeY(!!isSub);
		const barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub);
		const yScale = isSub ? $$.getSubYScale : $$.getYScale;

		return (d, i) => {
			const y0 = yScale.call($$, d.id)(0);
			const offset = barOffset(d, i) || y0; // offset is for stacked bar chart
			const posX = barX(d);
			let posY = barY(d);

			// fix posY not to overflow opposite quadrant
			if ($$.config.axis_rotated && (
				(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
			)) {
				posY = y0;
			}

			// 4 points that make a bar
			return [
				[posX, offset],
				[posX, posY - (y0 - offset)],
				[posX + barW, posY - (y0 - offset)],
				[posX + barW, offset]
			];
		};
	},

	isWithinBar(that) {
		const mouse = d3Mouse(that);
		const list = getRectSegList(that);
		const box = that.getBBox();
		const seg0 = list[0];
		const seg1 = list[1];
		const x = Math.min(seg0.x, seg1.x);
		const y = Math.min(seg0.y, seg1.y);
		const w = box.width;
		const h = box.height;
		const offset = 2;
		const sx = x - offset;
		const ex = x + w + offset;
		const sy = y + h + offset;
		const ey = y - offset;

		return sx < mouse[0] &&
			mouse[0] < ex &&
			ey < mouse[1] &&
			mouse[1] < sy;
	}
});

