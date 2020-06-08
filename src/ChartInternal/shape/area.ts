/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {area as d3Area} from "d3-shape";
import {select as d3Select} from "d3-selection";
import CLASS from "../../config/classes";
import {getRandom, isFunction} from "../../module/util";

export default {
	initArea(mainLineEnter): void {
		const $$ = this;

		mainLineEnter
			.append("g")
			.attr("class", $$.classAreas.bind($$));
	},

	updateAreaGradient(): void {
		const $$ = this;
		const {config, state: {datetimeId}, $el: {defs}} = $$;

		$$.data.targets.forEach(d => {
			const id = `${datetimeId}-areaGradient${$$.getTargetSelectorSuffix(d.id)}`;

			if ($$.isAreaType(d) && defs.select(`#${id}`).empty()) {
				const color = $$.color(d);
				const {
					x = [0, 0],
					y = [0, 1],
					stops = [[0, color, 1], [1, color, 0]]
				} = config.area_linearGradient;

				const linearGradient = defs.append("linearGradient")
					.attr("id", `${id}`)
					.attr("x1", x[0])
					.attr("x2", x[1])
					.attr("y1", y[0])
					.attr("y2", y[1]);

				stops.forEach(v => {
					const stopColor = isFunction(v[1]) ? v[1].bind($$.api)(d.id) : v[1];

					linearGradient.append("stop")
						.attr("offset", v[0])
						.attr("stop-color", stopColor || color)
						.attr("stop-opacity", v[2]);
				});
			}
		});
	},

	updateAreaColor(d): string {
		const $$ = this;

		return $$.config.area_linearGradient ?
			`url(#${$$.state.datetimeId}-areaGradient${$$.getTargetSelectorSuffix(d.id)})` :
			$$.color(d);
	},

	updateArea(durationForExit: number): void {
		const $$ = this;
		const {config, state, $el} = $$;

		config.area_linearGradient && $$.updateAreaGradient();

		$el.area = $el.main.selectAll(`.${CLASS.areas}`)
			.selectAll(`.${CLASS.area}`)
			.data($$.lineData.bind($$));

		$el.area.exit().transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$el.area = $el.area.enter().append("path")
			.attr("class", $$.classArea.bind($$))
			.style("fill", $$.updateAreaColor.bind($$))
			.style("opacity", function() {
				state.orgAreaOpacity = d3Select(this).style("opacity");
				return "0";
			})
			.merge($el.area);

		$el.area
			.style("opacity", state.orgAreaOpacity);
	},

	redrawArea(drawArea, withTransition?: boolean) {
		const $$ = this;
		const {orgAreaOpacity} = $$.state;

		return [
			(withTransition ? $$.$el.area.transition(getRandom()) : $$.$el.area)
				.attr("d", drawArea)
				.style("fill", $$.updateAreaColor.bind($$))
				.style("opacity", d => String($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity))
		];
	},

	/**
	 * Generate area path data
	 * @param {object} areaIndices Indices
	 * @param {boolean} isSub Weather is sub axis
	 * @returns {Function}
	 * @private
	 */
	generateDrawArea(areaIndices, isSub?: boolean): (d) => string {
		const $$ = this;
		const {config} = $$;
		const lineConnectNull = config.line_connectNull;
		const isRotated = config.axis_rotated;

		const getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
		const value0 = (d, i) => ($$.isGrouped(d.id) ?
			getPoints(d, i)[0][1] :
			yScale(d.id, isSub)(
				$$.isAreaRangeType(d) ?
					$$.getAreaRangeData(d, "high") : $$.getShapeYMin(d.id)
			));
		const value1 = (d, i) => ($$.isGrouped(d.id) ?
			getPoints(d, i)[1][1] :
			yScale(d.id, isSub)(
				$$.isAreaRangeType(d) ?
					$$.getAreaRangeData(d, "low") : d.value
			));

		return d => {
			let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
			let x0 = 0;
			let y0 = 0;
			let path;

			if ($$.isAreaType(d)) {
				let area = d3Area();

				area = isRotated ?
					area.y(xValue)
						.x0(value0)
						.x1(value1) :
					area.x(xValue)
						// @ts-ignore
						.y0(config.area_above ? 0 : value0)
						.y1(value1);

				if (!lineConnectNull) {
					area = area.defined(d => $$.getBaseValue(d) !== null);
				}

				if ($$.isStepType(d)) {
					values = $$.convertValuesToStep(values);
				}

				path = area.curve($$.getCurve(d))(values);
			} else {
				if (values[0]) {
					x0 = $$.scale.x(values[0].x);
					y0 = $$.getYScaleById(d.id)(values[0].value);
				}

				path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
			}

			return path || "M 0 0";
		};
	},

	generateGetAreaPoints(areaIndices, isSub?: boolean): Function {
		// partial duplication of generateGetBarPoints
		const $$ = this;
		const {config} = $$;
		const x = $$.getShapeX(0, areaIndices, !!isSub);
		const y = $$.getShapeY(!!isSub);
		const areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, !!isSub);
		const yScale = $$.getYScaleById.bind($$);

		return function(d, i) {
			const y0 = yScale.call($$, d.id)($$.getShapeYMin(d.id));
			const offset = areaOffset(d, i) || y0; // offset is for stacked area chart
			const posX = x(d);
			let posY = y(d);

			// fix posY not to overflow opposite quadrant
			if (config.axis_rotated && (
				(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
			)) {
				posY = y0;
			}

			// 1 point that marks the area position
			return [
				[posX, offset],
				[posX, posY - (y0 - offset)],
				[posX, posY - (y0 - offset)], // needed for compatibility
				[posX, offset] // needed for compatibility
			];
		};
	}
};
