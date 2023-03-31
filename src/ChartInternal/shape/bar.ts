/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {DataRow} from "../../../types/types";
import {$BAR, $COMMON} from "../../config/classes";
import {getRandom, isNumber} from "../../module/util";
import type {IDataRow} from "../data/IData";
import type {IOffset} from "./shape";

type BarTypeDataRow = DataRow<number | number[]>;

export default {
	initBar(): void {
		const {$el, config, state: {clip}} = this;

		$el.bar = $el.main.select(`.${$COMMON.chart}`)
			// should positioned at the beginning of the shape node to not overlap others
			.insert("g", ":first-child")
			.attr("class", $BAR.chartBars)
			.call(this.setCssRule(false, `.${$BAR.chartBars}`, ["pointer-events:none"]));

		// set clip-path attribute when condition meet
		// https://github.com/naver/billboard.js/issues/2421
		if (config.clipPath === false && (
			config.bar_radius || config.bar_radius_ratio
		)) {
			$el.bar.attr("clip-path", clip.pathXAxis.replace(/#[^)]*/, `#${clip.id}`));
		}
	},

	updateTargetsForBar(targets: BarTypeDataRow[]): void {
		const $$ = this;
		const {config, $el} = $$;
		const classChartBar = $$.getChartClass("Bar");
		const classBars = $$.getClass("bars", true);
		const classFocus = $$.classFocus.bind($$);
		const isSelectable = config.interaction_enabled && config.data_selection_isselectable;

		if (!$el.bar) {
			$$.initBar();
		}

		const mainBarUpdate = $el.main.select(`.${$BAR.chartBars}`)
			.selectAll(`.${$BAR.chartBar}`)
			.data(
				// remove
				targets.filter(
					v => v.values.some(d => (isNumber(d.value) || $$.isBarRangeType(d)))
				)
			)
			.attr("class", d => classChartBar(d) + classFocus(d));

		const mainBarEnter = mainBarUpdate.enter().append("g")
			.attr("class", classChartBar)
			.style("opacity", "0")
			.style("pointer-events", $$.getStylePropValue("none"));

		// Bars for each data
		mainBarEnter.append("g")
			.attr("class", classBars)
			.style("cursor", d => (isSelectable?.bind?.($$.api)(d) ? "pointer" : null))
			.call($$.setCssRule(true, ` .${$BAR.bar}`, ["fill"], $$.color));
	},

	/**
	 * Generate/Update elements
	 * @param {boolean} withTransition Transition for exit elements
	 * @param {boolean} isSub Subchart draw
	 * @private
	 */
	updateBar(withTransition: boolean, isSub = false): void {
		const $$ = this;
		const {config, $el, $T} = $$;
		const $root = isSub ? $el.subchart : $el;
		const classBar = $$.getClass("bar", true);
		const initialOpacity = $$.initialOpacity.bind($$);

		config.bar_linearGradient && $$.updateLinearGradient();

		const bar = $root.main.selectAll(`.${$BAR.bars}`)
			.selectAll(`.${$BAR.bar}`)
			.data($$.labelishData.bind($$));

		$T(bar.exit(), withTransition)
			.style("opacity", "0")
			.remove();

		$root.bar = bar.enter().append("path")
			.attr("class", classBar)
			.style("fill", $$.updateBarColor.bind($$))
			.merge(bar)
			.style("opacity", initialOpacity);

		// calculate ratio if grouped data exists
		$$.setRatioForGroupedData($root.bar.data());
	},

	/**
	 * Update bar color
	 * @param {object} d Data object
	 * @returns {string} Color string
	 * @private
	 */
	updateBarColor(d: IDataRow): string {
		const $$ = this;
		const fn = $$.getStylePropValue($$.color);

		return $$.config.bar_linearGradient ?
			$$.getGradienColortUrl(d.id) : (fn ? fn(d) : null);
	},

	/**
	 * Redraw function
	 * @param {Function} drawFn Retuned function from .getDrawShape() => .generateDrawBar()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 * @private
	 */
	redrawBar(drawFn, withTransition?: boolean, isSub = false) {
		const $$ = this;
		const {bar} = (isSub ? $$.$el.subchart : $$.$el);

		return [
			$$.$T(bar, withTransition, getRandom())
				.attr("d", d => (isNumber(d.value) || $$.isBarRangeType(d)) && drawFn(d))
				.style("fill", $$.updateBarColor.bind($$))
				.style("opacity", null)
		];
	},

	/**
	 * Generate draw function
	 * @param {object} barIndices data order within x axis.
	 * barIndices ==> {data1: 0, data2: 0, data3: 1, data4: 1, __max__: 1}
	 *
	 * When gropus given as:
	 *  groups: [
	 *		["data1", "data2"],
	 *		["data3", "data4"]
	 *	],
	 *
	 * Will be rendered as:
	 * 		data1 data3   data1 data3
	 *		data2 data4   data2 data4
	 *		-------------------------
	 *			 0             1
	 * @param {boolean} isSub If is for subchart
	 * @returns {Function}
	 * @private
	 */
	generateDrawBar(barIndices, isSub?: boolean): (d: IDataRow, i: number) => string {
		const $$ = this;
		const {config} = $$;
		const getPoints = $$.generateGetBarPoints(barIndices, isSub);
		const isRotated = config.axis_rotated;
		const barRadius = config.bar_radius;
		const barRadiusRatio = config.bar_radius_ratio;

		// get the bar radius
		const getRadius = isNumber(barRadius) && barRadius > 0 ?
			() => barRadius : (
				isNumber(barRadiusRatio) ? w => w * barRadiusRatio : null
			);

		return (d: IDataRow, i: number) => {
			// 4 points that make a bar
			const points = getPoints(d, i);

			// switch points if axis is rotated, not applicable for sub chart
			const indexX = +isRotated;
			const indexY = +!indexX;

			const isUnderZero = d.value as number < 0;
			const isInverted = config[`axis_${$$.axis.getId(d.id)}_inverted`];
			const isNegative = (!isInverted && isUnderZero) || (isInverted && !isUnderZero);

			const pathRadius = ["", ""];
			let radius = 0;

			const isGrouped = $$.isGrouped(d.id);
			const isRadiusData = getRadius && isGrouped ? $$.isStackingRadiusData(d) : false;

			if (getRadius) {
				const index = isRotated ? indexY : indexX;
				const barW = points[2][index] - points[0][index];

				radius = !isGrouped || isRadiusData ? getRadius(barW) : 0;

				const arc = `a${radius},${radius} ${isNegative ? `1 0 0` : `0 0 1`} `;

				pathRadius[+!isRotated] = `${arc}${radius},${radius}`;
				pathRadius[+isRotated] = `${arc}${[-radius, radius][isRotated ? "sort" : "reverse"]()}`;

				isNegative && pathRadius.reverse();
			}

			// path string data shouldn't be containing new line chars
			// https://github.com/naver/billboard.js/issues/530
			const path = isRotated ?
				`H${points[1][indexX] + (isNegative ? radius : -radius)} ${pathRadius[0]}V${points[2][indexY] - radius} ${pathRadius[1]}H${points[3][indexX]}` :
				`V${points[1][indexY] + (isNegative ? -radius : radius)} ${pathRadius[0]}H${points[2][indexX] - radius} ${pathRadius[1]}V${points[3][indexY]}`;

			return `M${points[0][indexX]},${points[0][indexY]}${path}z`;
		};
	},

	/**
	 * Determine if given stacking bar data is radius type
	 * @param {object} d Data row
	 * @returns {boolean}
	 */
	isStackingRadiusData(d: IDataRow): boolean {
		const $$ = this;
		const {$el, config, data, state} = $$;
		const {id, index, value} = d;

		// when the data is hidden, check if has rounded edges
		if (state.hiddenTargetIds.indexOf(id) > -1) {
			const target = $el.bar.filter(d => d.id === id && d.value === value);

			return !target.empty() && /a\d+/i.test(target.attr("d"));
		}

		// Find same grouped ids
		const keys = config.data_groups.find(v => v.indexOf(id) > -1);

		// Get sorted list
		const sortedList = $$.orderTargets(
			$$.filterTargetsToShow(data.targets.filter($$.isBarType, $$))
		).filter(v => keys.indexOf(v.id) > -1);

		// Get sorted Ids. Filter positive or negative values Ids from given value
		const sortedIds = sortedList
			.map(v => v.values.filter(
				v2 => v2.index === index && (
					isNumber(value) && value > 0 ? v2.value > 0 : v2.value < 0
				))[0]
			)
			.filter(Boolean)
			.map(v => v.id);

		// If the given id stays in the last position, then radius should be applied.
		return value !== 0 && (sortedIds.indexOf(id) === sortedIds.length - 1);
	},

	/**
	 * Generate bar coordinate points data
	 * @param {object} barIndices Data order within x axis.
	 * @param {boolean} isSub If is for subchart
	 * @returns {Array} Array of coordinate points
	 * @private
	 */
	generateGetBarPoints(barIndices, isSub?: boolean): (d: IDataRow, i: number) => [number, number][] {
		const $$ = this;
		const {config} = $$;
		const axis = isSub ? $$.axis.subX : $$.axis.x;
		const barTargetsNum = $$.getIndicesMax(barIndices) + 1;
		const barW: IOffset = $$.getBarW("bar", axis, barTargetsNum);
		const barX = $$.getShapeX(barW, barIndices, !!isSub);
		const barY = $$.getShapeY(!!isSub);
		const barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d: IDataRow, i: number) => {
			const {id} = d;
			const y0 = yScale.call($$, id, isSub)($$.getShapeYMin(id));
			const offset = barOffset(d, i) || y0; // offset is for stacked bar chart
			const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
			const isInverted = config[`axis_${$$.axis.getId(id)}_inverted`];
			const value = d.value as number;
			const posX = barX(d);
			let posY = barY(d);

			// fix posY not to overflow opposite quadrant
			if (config.axis_rotated && !isInverted && (
				(value > 0 && posY < y0) || (value < 0 && y0 < posY)
			)) {
				posY = y0;
			}

			if (!$$.isBarRangeType(d)) {
				posY -= (y0 - offset);
			}

			const startPosX = posX + width;

			// 4 points that make a bar
			return [
				[posX, offset],
				[posX, posY],
				[startPosX, posY],
				[startPosX, offset]
			];
		};
	}
};
