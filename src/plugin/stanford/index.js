/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	min as d3Min,
	max as d3Max
} from "d3-array";
import {interpolateHslLong as d3InterpolateHslLong} from "d3-interpolate";
import {hsl as d3Hsl} from "d3-color";
import {scaleSequentialLog as d3ScaleSequentialLog} from "d3-scale";
import CLASS from "../../config/classes";
import {isEmpty, isFunction, isString} from "../../internals/util";
import Plugin from "../Plugin";
import Options from "./Options";
import Elements from "./Elements";
import ColorScale from "./ColorScale";
import {pointInRegion, compareEpochs} from "./util";

/**
 * Stanford diagram plugin
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Is preferable use `scatter` as data.type
 * @class plugin-stanford
 * @param {Object} options Stanford plugin options
 * @extends Plugin
 * @return {Stanford}
 * @example
 *  var chart = bb.generate({
 *     data: {
 *     	  columns: [ ... ],
 *        type: "scatter"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.stanford({
 *           colors: d3.interpolateHslLong(
 *              d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
 *           ),
 *           epochs: [ 1, 1, 2, 2, ... ],
 *           lines: [
 *                  { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
 *                  { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
 *           ],
 *           scale: {
 *           	max: 10000,
 *             	min: 1,
 *           	width: 500,
 *             	format: 'pow10',
 *           },
 *           padding: {
 *           	top: 15,
 *           	right: 0,
 *           	bottom: 0,
 *           	left: 0
 *           },
 *           regions: [
 *           	{
 *               	points: [ // add points counter-clockwise
 *               		{ x: 0, y: 0 },
 *               		{ x: 40, y: 40 },
 *               		{ x: 0, y: 40 }
 *               	],
 *               	text: function (value, percentage) {
 *               		return `Normal Operations: ${value} (${percentage}%)`;
 *               	},
 *               	opacity: 0.2, // 0 to 1
 *               	class: "test-polygon1"
 *              },
 *             	...
 *           ]
 *        }
 *     ]
 *  });
 */
export default class Stanford extends Plugin {
	constructor(options) {
		super(options);
		this.config = new Options();

		return this;
	}

	$beforeInit() {
		const $$ = this.$$;

		// override on config values & methods
		$$.config.data_xSort = false;
		$$.isMultipleX = () => true;
		$$.showXGridFocus = () => {};
		$$.labelishData = d => d.values;
		$$.opacityForCircle = () => 1;

		const getCurrentPaddingRight = $$.getCurrentPaddingRight.bind($$);

		$$.getCurrentPaddingRight = () => (
			getCurrentPaddingRight() + (
				this.colorScale ? this.colorScale.getColorScalePadding() : 0
			)
		);
	}

	$init() {
		const $$ = this.$$;

		$$.loadConfig.bind(this)(this.options);
		$$.color = this.getStanfordPointColor.bind($$);

		this.colorScale = new ColorScale(this);
		this.elements = new Elements(this);

		this.convertData();
		this.initStanfordData();
		this.setStanfordTooltip();
		this.colorScale.drawColorScale();

		this.$redraw();
	}

	$redraw(duration) {
		this.colorScale && this.colorScale.drawColorScale();
		this.elements && this.elements.updateStanfordElements(duration);
	}

	getOptions() {
		return new Options();
	}

	convertData() {
		const data = this.$$.data.targets;
		const epochs = this.options.epochs;

		data.forEach(d => {
			d.values.forEach((v, i) => {
				v.epochs = epochs[i];
			});

			d.minEpochs = undefined;
			d.maxEpochs = undefined;
			d.colors = undefined;
			d.colorscale = undefined;
		});
	}

	xvCustom(d, xyValue) {
		const $$ = this;

		let value = xyValue ? d[xyValue] : $$.getBaseValue(d);

		if ($$.isTimeSeries()) {
			value = $$.parseDate(value);
		} else if ($$.isCategorized() && isString(value)) {
			value = $$.config.axis_x_categories.indexOf(d.value);
		}

		return Math.ceil($$.x(value));
	}

	yvCustom(d, xyValue) {
		const $$ = this;
		const yScale = d.axis && d.axis === "y2" ? $$.y2 : $$.y;
		const value = xyValue ? d[xyValue] : $$.getBaseValue(d);

		return Math.ceil(yScale(value));
	}

	initStanfordData() {
		const config = this.config;
		const target = this.$$.data.targets[0];

		// TODO STANFORD see if (data.js -> orderTargets)+ can be used instead
		// Make larger values appear on top
		target.values.sort(compareEpochs);

		// Get array of epochs
		const epochs = target.values.map(a => a.epochs);

		target.minEpochs = !isNaN(config.scale_min) ? config.scale_min : d3Min(epochs);
		target.maxEpochs = !isNaN(config.scale_max) ? config.scale_max : d3Max(epochs);

		target.colors = isFunction(config.colors) ?
			config.colors : d3InterpolateHslLong(d3Hsl(250, 1, 0.5), d3Hsl(0, 1, 0.5));

		target.colorscale = d3ScaleSequentialLog(target.colors)
			.domain([target.minEpochs, target.maxEpochs]);
	}

	getStanfordPointColor(d) {
		const target = this.data.targets[0];

		return target.colorscale(d.epochs);
	}

	setStanfordTooltip() {
		const config = this.$$.config;

		if (isEmpty(config.tooltip_contents)) {
			config.tooltip_contents = function(d, defaultTitleFormat, defaultValueFormat, color) {
				let html = `<table class="${CLASS.tooltip}"><tbody>`;

				d.forEach(v => {
					html += `<tr>
							<th>${defaultTitleFormat(this.config.data_x)}</th>
							<th class="value">${defaultValueFormat(v.x)}</th>
						</tr>
						<tr>
							<th>${defaultTitleFormat(v.id)}</th>
							<th class="value">${defaultValueFormat(v.value)}</th>
						</tr>
						<tr class="${CLASS.tooltipName}-${v.id}">
							<td class="name"><span style="background-color:${color(v)}"></span>${defaultTitleFormat("Epochs")}</td>
							<td class="value">${defaultValueFormat(v.epochs)}</td>
						</tr>`;
				});

				return `${html}</tbody></table>`;
			};
		}
	}

	countEpochsInRegion(region) {
		const $$ = this;
		const target = $$.data.targets[0];

		const total = target.values.reduce((accumulator, currentValue) =>
			accumulator + Number(currentValue.epochs), 0);

		const value = target.values.reduce((accumulator, currentValue) => {
			if (pointInRegion(currentValue, region)) {
				return accumulator + Number(currentValue.epochs);
			}

			return accumulator;
		}, 0);

		return {
			value,
			percentage: value !== 0 ? +(value / total * 100).toFixed(1) : 0
		};
	}
}
