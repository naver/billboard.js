/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	event as d3Event
} from "d3-selection";
import {
	max as d3Max,
	range as d3Range
} from "d3-array";
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend, isEmpty} from "../internals/util";

/**
 * Get the position value
 * @param {String} type Coordinate type 'x' or 'y'
 * @param {Number} edge Number of edge
 * @param {Number} pos The indexed position
 * @param {Number} range
 * @param {Number} ratio
 * @return {number}
 * @private
 */
function getPosition(type, edge, pos, range, ratio = 1) {
	const r = 2 * Math.PI;
	const func = type === "x" ? Math.sin : Math.cos;

	return range * (1 - ratio * func(pos * r / edge));
}

// cache key
const cacheKey = "$radarPoints";

extend(ChartInternal.prototype, {
	initRadar() {
		const $$ = this;
		const config = $$.config;

		if ($$.hasType("radar")) {
			$$.radars = $$.main.select(`.${CLASS.chart}`).append("g")
				.attr("class", CLASS.chartRadars);

			$$.maxValue = config.radar_axis_max || $$.getMinMaxData().max[0].value;
		}
	},

	getRadarSize() {
		const $$ = this;
		const config = $$.config;

		const padding = config.axis_x_categories.length < 4 ? -20 : 10;
		const size = (this.arcHeight - padding) / 2;

		return [size, size];
	},

	updateTargetsForRadar(targets) {
		const $$ = this;
		const config = $$.config;

		if (isEmpty(config.axis_x_categories)) {
			config.axis_x_categories = d3Range(0, d3Max(targets).values.length);
		}

		$$.generateRadarPoints();
		$$.updateRadarLevel();
		$$.updateRadarAxes();
		$$.updateRadarShape();
	},

	/**
	 * Generate data points
	 * @private
	 */
	generateRadarPoints() {
		const $$ = this;
		const config = $$.config;
		const targets = $$.data.targets;

		const edge = config.axis_x_categories.length;
		const [width, height] = $$.getRadarSize();

		const points = {};
		const getRatio = v => (parseFloat(Math.max(v, 0)) / $$.maxValue) * config.radar_size_ratio;

		targets.forEach(d => {
			const point = [];

			d.values.forEach((v, i) => {
				point.push([
					getPosition("x", edge, i, width, getRatio(v.value)),
					getPosition("y", edge, i, height, getRatio(v.value))
				]);
			});

			points[d.id] = point;
		});

		$$.addCache(cacheKey, points);
	},

	redrawRadar() {
		const $$ = this;
		const translate = $$.getTranslate("radar");

		// Adjust radar, circles and texts' position
		if (translate) {
			$$.radars.attr("transform", translate);
			$$.main.selectAll(`.${CLASS.circles}`).attr("transform", translate);
			$$.main.select(`.${CLASS.chartTexts}`).attr("transform", translate);
		}
	},

	generateGetRadarPoints() {
		const $$ = this;
		const points = $$.getCaches(cacheKey);

		return (d, i) => {
			const point = points[d.id][i];

			return [
				point,
				point,
				point,
				point
			];
		};
	},

	updateRadarLevel() {
		const $$ = this;
		const config = $$.config;
		const [width, height] = $$.getRadarSize();
		const depth = config.radar_level_depth;
		const edge = config.axis_x_categories.length;

		const levels = d3Range(0, depth);

		const radius = config.radar_size_ratio * Math.min(width, height);
		const levelRatio = levels.map(l => radius * ((l + 1) / depth));
		const levelTextFormat = config.radar_level_text_format;

		// Generate points
		const points = levels.map(v => {
			const pos = [];

			d3Range(0, edge).forEach(i => {
				pos.push(`${getPosition("x", edge, i, levelRatio[v])},${getPosition("y", edge, i, levelRatio[v])}`);
			});

			return pos.join(" ");
		});

		const radars = $$.radars.append("g")
			.attr("class", CLASS.levels)
			.selectAll(`.${CLASS.level}`)
			.data(levels);

		const radarsEnter = radars.enter().append("g")
			.attr("class", (d, i) => `${CLASS.level}-${i}`)
			.merge(radars)
			.attr("transform", d => `translate(${width - levelRatio[d]}, ${height - levelRatio[d]})`);

		radarsEnter.append("polygon")
			.attr("points", d => points[d])
			.style("visibility", config.radar_level_show ? null : "hidden");

		// level text
		if (config.radar_level_text_show) {
			$$.radars.select(`.${CLASS.levels}`)
				.append("text")
				.attr("x", width)
				.attr("y", height)
				.attr("dx", "-.5em")
				.attr("dy", "-.7em")
				.style("text-anchor", "end")
				.text(() => levelTextFormat(0));

			radarsEnter.append("text")
				.attr("x", d => points[d].split(",")[0])
				.attr("y", 0)
				.attr("dx", "-.5em")
				.style("text-anchor", "end")
				.text(d => levelTextFormat(
					$$.maxValue / levels.length * (d + 1)
				));
		}
	},

	updateRadarAxes() {
		const $$ = this;
		const config = $$.config;
		const [width, height] = $$.getRadarSize();
		const ratio = config.radar_size_ratio;
		const categories = config.axis_x_categories;
		const edge = categories.length;

		let axis = $$.radars.append("g")
			.attr("class", CLASS.axis)
			.selectAll(".axis")
			.data(categories);

		const newAxis = axis.enter().append("g");

		axis.exit().remove();

		config.radar_axis_line_show && newAxis.append("line");
		config.radar_axis_text_show && newAxis.append("text");

		axis = axis.merge(newAxis)
			.attr("class", (d, i) => `${CLASS.axis}-${i}`);

		// axis line
		if (config.radar_axis_line_show) {
			axis.select("line")
				.attr("x1", width)
				.attr("y1", height)
				.attr("x2", (d, i) => getPosition("x", edge, i, width, ratio))
				.attr("y2", (d, i) => getPosition("y", edge, i, height, ratio));
		}

		// axis text
		if (config.radar_axis_text_show) {
			axis.select("text")
				.style("text-anchor", "middle")
				.attr("dy", ".5em")
				.text(d => d)
				.datum((d, i) => ({index: i}))
				.attr("x", (d, i) => getPosition("x", edge, i, width))
				.attr("y", (d, i) => getPosition("y", edge, i, height));
		}

		$$.bindEvent();
	},

	bindEvent() {
		const $$ = this;
		const config = $$.config;

		if (config.interaction_enabled) {
			const isMouse = $$.inputType === "mouse";

			$$.radars.select(`.${CLASS.axis}`)
				.on(`${isMouse ? "mouseover " : ""}click`, () => {
					if ($$.transiting) { // skip while transiting
						return;
					}

					const target = d3Select(d3Event.target);
					const index = target.datum().index;

					$$.selectRectForSingle($$.svg.node(), null, index);
					$$.setOver(index);
				})
				.on("mouseout", isMouse ? () => {
					this.hideTooltip();
					this.unexpandCircles();
				} : null);
		}
	},

	updateRadarShape() {
		const $$ = this;
		const targets = $$.data.targets;
		const points = $$.getCaches(cacheKey);

		const areas = $$.radars.append("g")
			.attr("class", CLASS.shapes)
			.selectAll("polygon")
			.data(targets);

		const areasEnter = areas.enter().append("g")
			.attr("class", $$.classChartRadar.bind($$));

		areas.exit().remove();

		areasEnter
			.append("polygon")
			.merge(areas)
			.style("fill", d => $$.color(d))
			.style("stroke", d => $$.color(d))
			.attr("points", d => points[d.id].join(" "));
	},

	/**
	 * Get data point x coordinate
	 * @param {Object} d Data object
	 * @return {Number}
	 * @private
	 */
	radarCircleX(d) {
		return this.getCaches(cacheKey)[d.id][d.index][0];
	},

	/**
	 * Get data point y coordinate
	 * @param {Object} d Data object
	 * @return {Number}
	 * @private
	 */
	radarCircleY(d) {
		return this.getCaches(cacheKey)[d.id][d.index][1];
	}
});
