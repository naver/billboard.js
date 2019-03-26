import {range as d3Range} from "d3-array";
import {axisRight as d3AxisRight} from "d3-axis";
import {format as d3Format} from "d3-format";
import {scaleSequential as d3ScaleSequential, scaleLog as d3ScaleLog} from "d3-scale";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend, isFunction} from "./util";

extend(ChartInternal.prototype, {
	drawColorScale() {
		const $$ = this;
		const config = $$.config;
		const target = $$.data.targets[0];
		const height = $$.height - config.stanford_padding.bottom - config.stanford_padding.top;
		const barWidth = config.stanford_scaleWidth;
		const barHeight = 5;
		const points = d3Range(config.stanford_padding.bottom, height, barHeight);

		const inverseScale = d3ScaleSequential(target.colors)
			.domain([points[points.length - 1], points[0]]);

		if ($$.colorScale) {
			$$.colorScale.remove();
		}

		$$.colorScale = $$.svg.append("g")
			.attr("width", 50)
			.attr("height", height)
			.attr("class", CLASS.colorScale);

		$$.colorScale.append("g")
			.attr("transform", `translate(0, ${config.stanford_padding.top})`)
			.selectAll("bars")
			.data(points)
			.enter()
			.append("rect")
			.attr("y", (d, i) => i * barHeight)
			.attr("x", 0)
			.attr("width", barWidth)
			.attr("height", barHeight)
			.attr("fill", d => inverseScale(d));

		// Legend Axis
		const axisScale = d3ScaleLog()
			.domain([target.minEpochs, target.maxEpochs])
			.range([
				points[0] + config.stanford_padding.top + points[points.length - 1] + barHeight - 1,
				points[0] + config.stanford_padding.top
			]);

		const legendAxis = d3AxisRight(axisScale);

		if (config.stanford_scaleFormat === "pow10") {
			legendAxis.tickValues([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]);
		} else if (isFunction(config.stanford_scaleFormat)) {
			legendAxis.tickFormat(config.stanford_scaleFormat);
		} else {
			legendAxis.tickFormat(d3Format("d"));
		}

		// Draw Axis
		const axis = $$.colorScale.append("g")
			.attr("class", "legend axis")
			.attr("transform", `translate(${barWidth},0)`)
			.call(legendAxis);

		if (config.stanford_scaleFormat === "pow10") {
			axis.selectAll(".tick text")
				.text(null)
				.filter(d => d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1) // Power of Ten
				.text(10)
				.append("tspan")
				.attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
				.text(d => Math.round(Math.log(d) / Math.LN10));
		}

		$$.colorScale.attr("transform", `translate(${$$.currentWidth - $$.xForColorScale()}, 0)`);
	},
	xForColorScale() {
		const $$ = this;

		return $$.config.stanford_padding.right + $$.colorScale.node().getBBox().width;
	},
	getColorScalePadding() {
		const $$ = this;

		return $$.xForColorScale() + $$.config.stanford_padding.left + 20;
	}
});
