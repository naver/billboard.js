/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import CLASS from "../../config/classes";
import {getPointer, getRandom, getRectSegList, isNumber} from "../../module/util";

export default {
	initBar(): void {
		const {$el} = this;

		$el.bar = $el.main.select(`.${CLASS.chart}`)
			// should positioned at the beginning of the shape node to not overlap others
			.insert("g", ":first-child")
			.attr("class", CLASS.chartBars);
	},

	updateTargetsForBar(targets): void {
		const $$ = this;
		const {config, $el} = $$;
		const classChartBar = $$.getChartClass("Bar");
		const classBars = $$.getClass("bars", true);
		const classFocus = $$.classFocus.bind($$);
		const isSelectable = config.interaction_enabled && config.data_selection_isselectable;

		if (!$el.bar) {
			$$.initBar();
		}

		const mainBarUpdate = $$.$el.main.select(`.${CLASS.chartBars}`)
			.selectAll(`.${CLASS.chartBar}`)
			.data(
				// remove
				targets.filter(
					v => !v.values.every(d => !isNumber(d.value))
				)
			)
			.attr("class", d => classChartBar(d) + classFocus(d));

		const mainBarEnter = mainBarUpdate.enter().append("g")
			.attr("class", classChartBar)
			.style("opacity", "0")
			.style("pointer-events", "none");

		// Bars for each data
		mainBarEnter.append("g")
			.attr("class", classBars)
			.style("cursor", d => (isSelectable && isSelectable.bind($$.api)(d) ? "pointer" : null));
	},

	/**
	 * Generate/Update elements
	 * @param {number} durationForExit Transition duration for exit elements
	 * @param {boolean} isSub Subchart draw
	 * @private
	 */
	updateBar(durationForExit: number, isSub = false): void {
		const $$ = this;
		const $root = isSub ? $$.$el.subchart : $$.$el;
		const classBar = $$.getClass("bar", true);
		const initialOpacity = $$.initialOpacity.bind($$);

		const bar = $root.main.selectAll(`.${CLASS.bars}`)
			.selectAll(`.${CLASS.bar}`)
			.data($$.labelishData.bind($$));

		bar.exit().transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$root.bar = bar.enter().append("path")
			.attr("class", classBar)
			.style("fill", $$.color)
			.merge(bar)
			.style("opacity", initialOpacity);
	},

	/**
	 * Redraw function
	 * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 */
	redrawBar(drawFn, withTransition?: boolean, isSub = false) {
		const {bar} = (isSub ? this.$el.subchart : this.$el);

		return [
			(withTransition ? bar.transition(getRandom()) : bar)
				.attr("d", d => d.value && drawFn(d))
				.style("fill", this.color)
				.style("opacity", null)
		];
	},

	generateDrawBar(barIndices, isSub?: boolean): Function {
		const $$ = this;
		const {config} = $$;
		const getPoints = $$.generateGetBarPoints(barIndices, isSub);
		const isRotated = config.axis_rotated;
		const isGrouped = config.data_groups.length;
		const barRadius = config.bar_radius;
		const barRadiusRatio = config.bar_radius_ratio;

		// get the bar radius
		const getRadius = isNumber(barRadius) && barRadius > 0 ?
			() => barRadius : (
				isNumber(barRadiusRatio) ? w => w * barRadiusRatio : null
			);

		return (d, i) => {
			// 4 points that make a bar
			const points = getPoints(d, i);

			// switch points if axis is rotated, not applicable for sub chart
			const indexX = +isRotated;
			const indexY = +!indexX;

			const isNegative = d.value < 0;
			const pathRadius = ["", ""];
			let radius = 0;

			if (getRadius && !isGrouped) {
				const index = isRotated ? indexY : indexX;
				const barW = points[2][index] - points[0][index];

				radius = getRadius(barW);

				const arc = `a${radius},${radius} ${isNegative ? `1 0 0` : `0 0 1`} `;

				pathRadius[+!isRotated] = `${arc}${radius},${radius}`;
				pathRadius[+isRotated] = `${arc}${[-radius, radius][isRotated ? "sort" : "reverse"]()}`;

				isNegative && pathRadius.reverse();
			}

			// path string data shouldn't be containing new line chars
			// https://github.com/naver/billboard.js/issues/530
			const path = isRotated ?
				`H${points[1][indexX] - radius} ${pathRadius[0]}V${points[2][indexY] - radius} ${pathRadius[1]}H${points[3][indexX]}` :
				`V${points[1][indexY] + (isNegative ? -radius : radius)} ${pathRadius[0]}H${points[2][indexX] - radius} ${pathRadius[1]}V${points[3][indexY]}`;

			return `M${points[0][indexX]},${points[0][indexY]}${path}z`;
		};
	},

	generateGetBarPoints(barIndices, isSub?: boolean): Function {
		const $$ = this;
		const {config} = $$;
		const axis = isSub ? $$.axis.subX : $$.axis.x;
		const barTargetsNum = $$.getIndicesMax(barIndices) + 1;
		const barW = $$.getBarW("bar", axis, barTargetsNum);
		const barX = $$.getShapeX(barW, barIndices, !!isSub);
		const barY = $$.getShapeY(!!isSub);
		const barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d, i) => {
			const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
			const offset = barOffset(d, i) || y0; // offset is for stacked bar chart
			const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
			const posX = barX(d);
			let posY = barY(d);

			// fix posY not to overflow opposite quadrant
			if (config.axis_rotated && (
				(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
			)) {
				posY = y0;
			}

			posY -= (y0 - offset);

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

	isWithinBar(that): boolean {
		const mouse = getPointer(this.state.event, that);
		const list = getRectSegList(that);
		const [seg0, seg1] = list;
		const x = Math.min(seg0.x, seg1.x);
		const y = Math.min(seg0.y, seg1.y);
		const offset = this.config.bar_sensitivity;
		const {width, height} = that.getBBox();
		const sx = x - offset;
		const ex = x + width + offset;
		const sy = y + height + offset;
		const ey = y - offset;

		const isWithin = sx < mouse[0] &&
			mouse[0] < ex &&
			ey < mouse[1] &&
			mouse[1] < sy;

		return isWithin;
	}
};
