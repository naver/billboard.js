/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import type {d3Selection, DataRow} from "../../../types/types";
import {$BAR, $COMMON} from "../../config/classes";
import {getRandom, isNumber} from "../../module/util";
import type {IBarData} from "../data/IData";
import {getShapeColorWithGradient, updateTargetsForShape} from "./shape";
import type {IOffset} from "./shape";

type BarTypeDataRow = DataRow<number | number[]>;
type BarConnectLine = {x: number, y: number, width: number, height: number};
type BarPath = (string | BarConnectLine)[];

/**
 * Get the type of connect line for bar chart
 * @param {string} id Data id
 * @returns {string|null} Connect line type or null if not applicable
 * @private
 */
function _getConnectLineType(id: string): string | null {
	const connectLine = this.config.bar_connectLine;
	const type = connectLine?.[id] || connectLine;

	return (/^(start|end)\-(start|end)$/.test(type)) ? type : null;
}

export default {
	initBar(): void {
		const {$el, config, state: {clip}} = this;

		$el.bar = $el.main.select(`.${$COMMON.chart}`);
		$el.bar = config.bar_front ? $el.bar.append("g") : $el.bar.insert("g", ":first-child");

		$el.bar
			.attr("class", $BAR.chartBars)
			.call(this.setCssRule(false, `.${$BAR.chartBars}`, ["pointer-events:none"]));

		// set clip-path attribute when condition meet
		// https://github.com/naver/billboard.js/issues/2421
		if (
			config.clipPath === false && (
				config.bar_radius || config.bar_radius_ratio
			)
		) {
			$el.bar.attr("clip-path", clip.pathXAxis.replace(/#[^)]*/, `#${clip.id}`));
		}
	},

	updateTargetsForBar(targets: BarTypeDataRow[]): void {
		const $$ = this;
		const {config} = $$;
		const classBars = $$.getClass("bars", true);
		const isSelectable = config.interaction_enabled && config.data_selection_isselectable;

		const mainBarEnter = updateTargetsForShape.call($$, targets, {
			type: "Bar",
			elKey: "bar",
			containerClass: $BAR.chartBars,
			itemClass: $BAR.chartBar,
			initFn: $$.initBar
		});

		// Bars for each data
		mainBarEnter.append("g")
			.attr("class", classBars)
			.style("cursor", d => (isSelectable?.bind?.($$.api)(d) ? "pointer" : null))
			.call(selection => {
				$$.setCssRule(true, ` .${$BAR.bar}`, ["fill"], $$.color)(selection);

				// add bar connect line
				selection.each(function(d) {
					if (_getConnectLineType.call($$, d.id)) {
						d3Select(this).append("path")
							.attr("class", $BAR.barConnectLine);
					}
				});
			});
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
	updateBarColor(d: IBarData): string | null {
		const $$ = this;
		const fn = $$.getStylePropValue($$.color);

		return getShapeColorWithGradient.call($$, d, "bar_linearGradient", fn || (() => null));
	},

	/**
	 * Redraw function
	 * @param {function} drawFn Retuned function from .getDrawShape() => .generateDrawBar()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 * @private
	 */
	redrawBar(drawFn, withTransition?: boolean, isSub = false) {
		const $$ = this;
		const {bar} = isSub ? $$.$el.subchart : $$.$el;
		const barPath: BarConnectLine[] = [];

		return [
			$$.$T(bar, withTransition, getRandom())
				.attr("d", function(d, i, arr) {
					const path = (isNumber(d.value) || $$.isBarRangeType(d)) && drawFn(d, i);
					const connectLineType = _getConnectLineType.call($$, d.id);

					// for bar.coonectLine option
					if (path.length > 1) {
						barPath.push(path[1]);

						if (i === arr.length - 1) {
							const barConnectLineNode = $$.$T(
								d3Select(this.parentNode.querySelector(`.${$BAR.barConnectLine}`)),
								withTransition,
								getRandom()
							);

							$$.updateConnectLine(barConnectLineNode, connectLineType, barPath);
							barPath.splice(0);
						}
					}

					return path[0];
				})
				.style("fill", $$.updateBarColor.bind($$))
				.style("clip-path", d => d.clipPath)
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
	 * 		["data1", "data2"],
	 * 		["data3", "data4"]
	 * 	],
	 *
	 * Will be rendered as:
	 * 		data1 data3   data1 data3
	 * 		data2 data4   data2 data4
	 * 		-------------------------
	 * 			 0             1
	 * @param {boolean} isSub If is for subchart
	 * @returns {function}
	 * @private
	 */
	generateDrawBar(barIndices, isSub?: boolean): (d: IBarData, i: number) => BarPath {
		const $$ = this;
		const {config} = $$;
		const getPoints = $$.generateGetBarPoints(barIndices, isSub);
		const isRotated = config.axis_rotated;
		const barRadius = config.bar_radius;
		const barRadiusRatio = config.bar_radius_ratio;

		// get the bar radius
		const getRadius = isNumber(barRadius) && barRadius > 0 ? () => barRadius : (
			isNumber(barRadiusRatio) ? w => w * barRadiusRatio : null
		);

		return (d: IBarData, i: number): BarPath => {
			// 4 points that make a bar
			const points = getPoints(d, i);

			// switch points if axis is rotated, not applicable for sub chart
			const indexX = +isRotated;
			const indexY = +!indexX;

			const isUnderZero = d.value as number < 0;
			const isInverted = config[`axis_${$$.axis.getId(d.id)}_inverted`];
			const isNegative = (!isInverted && isUnderZero) || (isInverted && !isUnderZero);

			const pathRadius = ["", ""];
			const isGrouped = $$.isGrouped(d.id);
			const isRadiusData = getRadius && isGrouped ? $$.isStackingRadiusData(d) : false;
			const init = [
				points[0][indexX],
				points[0][indexY]
			];
			let radius = 0;

			// initialize as null to not set attribute if isn't needed
			d.clipPath = null;

			if (getRadius) {
				const index = isRotated ? indexY : indexX;
				const barW = points[2][index] - points[0][index];

				radius = !isGrouped || isRadiusData ? getRadius(barW) : 0;

				const arc = `a${radius} ${radius} ${isNegative ? `1 0 0` : `0 0 1`} `;

				pathRadius[+!isRotated] = `${arc}${radius},${radius}`;
				pathRadius[+isRotated] = `${arc}${
					[-radius, radius][isRotated ? "sort" : "reverse"]()
				}`;

				isNegative && pathRadius.reverse();
			}

			const pos = isRotated ?
				points[1][indexX] + (isNegative ? radius : -radius) :
				points[1][indexY] + (isNegative ? -radius : radius);

			// Apply clip-path in case of radius angle surpass the bar shape
			// https://github.com/naver/billboard.js/issues/3903
			if (radius) {
				let clipPath = "";

				if (isRotated) {
					if (isNegative && init[0] < pos) {
						clipPath = `0 ${pos - init[0]}px 0 0`;
					} else if (!isNegative && init[0] > pos) {
						clipPath = `0 0 0 ${init[0] - pos}px`;
					}
				} else {
					if (isNegative && init[1] > pos) {
						clipPath = `${init[1] - pos}px 0 0 0`;
					} else if (!isNegative && init[1] < pos) {
						clipPath = `0 0 ${pos - init[1]}px 0`;
					}
				}

				if (clipPath) {
					d.clipPath = `inset(${clipPath})`;
				}
			}

			// path string data shouldn't be containing new line chars
			// https://github.com/naver/billboard.js/issues/530
			const path = isRotated ?
				`H${pos} ${pathRadius[0]}V${points[2][indexY] - radius} ${pathRadius[1]}H${
					points[3][indexX]
				}` :
				`V${pos} ${pathRadius[0]}H${points[2][indexX] - radius} ${pathRadius[1]}V${
					points[3][indexY]
				}`;

			const coords: BarPath = [`M${points[0][indexX]},${points[0][indexY]}${path}z`];

			if (_getConnectLineType.call($$, d.id)) {
				coords.push(isRotated ?
					{
						x: points[0][indexX],
						y: points[0][indexY],
						width: points[0][indexX] - pos,
						height: points[2][indexY] - points[0][indexY]
					} :
					{
						x: points[0][indexX],
						y: pos,
						width: points[2][indexX] - points[0][indexX],
						height: points[3][indexY] - pos
					});
			}

			return coords;
		};
	},

	/**
	 * Determine if given stacking bar data is radius type
	 * @param {object} d Data row
	 * @returns {boolean}
	 */
	isStackingRadiusData(d: IBarData): boolean {
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
			.map(v =>
				v.values.filter(
					v2 =>
						v2.index === index && (
							isNumber(value) && value > 0 ? v2.value > 0 : v2.value < 0
						)
				)[0]
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
	generateGetBarPoints(barIndices,
		isSub?: boolean): (d: IBarData, i: number) => [number, number][] {
		const $$ = this;
		const {config} = $$;
		const axis = isSub ? $$.axis.subX : $$.axis.x;
		const barTargetsNum = $$.getIndicesMax(barIndices) + 1;
		const barW: IOffset = $$.getBarW("bar", axis, barTargetsNum);
		const barX = $$.getShapeX(barW, barIndices, !!isSub);
		const barY = $$.getShapeY(!!isSub);
		const barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d: IBarData, i: number) => {
			const {id} = d;
			const y0 = yScale.call($$, id, isSub)($$.getShapeYMin(id));
			const offset = barOffset(d, i) || y0; // offset is for stacked bar chart
			const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
			const isInverted = config[`axis_${$$.axis.getId(id)}_inverted`];
			const value = d.value as number;
			const posX = barX(d);
			let posY = barY(d);

			// fix posY not to overflow opposite quadrant
			if (
				config.axis_rotated && !isInverted && (
					(value > 0 && posY < y0) || (value < 0 && y0 < posY)
				)
			) {
				posY = y0;
			}

			if (!$$.isBarRangeType(d)) {
				posY -= y0 - offset;
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
	},

	/**
	 * Update the bar connect line path
	 * @param {d3Selection} node d3 selection of bar connect line
	 * @param {string} type Type of connect line, one of "start-start", "start-end", "end-start", "end-end"
	 * @param {Array} barPath d3 path data for the bar
	 */
	updateConnectLine(
		node: d3Selection,
		type: "start-start" | "start-end" | "end-start" | "end-end",
		barPath: BarConnectLine[]
	): void {
		const path = barPath.map((v: BarConnectLine, i: number, arr: BarConnectLine[]): string => {
			const isRotated = this.config.axis_rotated;
			const isStart = /^start-(start|end)$/.test(type);
			const isEnd = /^end-(start|end)$/.test(type);
			const path: string[] = [];

			const x = isRotated ? (isEnd ? v.x - v.width : v.x) : (v.x + v.width);
			const y = isRotated ? v.y + v.height : isStart ? v.y + v.height : v.y;

			if (i === 0) {
				path.push(`${x},${y}`);
			} else {
				path.push(
					isRotated ?
						`L${v.x - (/\w+-end$/.test(type) ? v.width : 0)},${v.y}` :
						`L${v.x},${v.y + (/\w+-start$/.test(type) ? v.height : 0)}`
				);

				if (i < arr.length - 1) {
					path.push(`M${x},${y}`);
				}
			}

			return path.join(" ");
		});

		node.attr("d", `M${path.join("")}z`);
	}
};
