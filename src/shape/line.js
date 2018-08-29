/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	area as d3Area,
	line as d3Line
} from "d3-shape";
import {
	mouse as d3Mouse,
	select as d3Select
} from "d3-selection";
import CLASS from "../config/classes";
import ChartInternal from "../internals/ChartInternal";
import {extend, isArray, isDefined, isFunction, isUndefined, isValue} from "../internals/util";

extend(ChartInternal.prototype, {
	initLine() {
		const $$ = this;

		$$.main.select(`.${CLASS.chart}`).append("g")
			.attr("class", CLASS.chartLines);
	},

	updateTargetsForLine(targets) {
		const $$ = this;
		const config = $$.config;
		const classChartLine = $$.classChartLine.bind($$);
		const classLines = $$.classLines.bind($$);
		const classAreas = $$.classAreas.bind($$);
		const classCircles = $$.classCircles.bind($$);
		const classFocus = $$.classFocus.bind($$);

		const mainLineUpdate = $$.main.select(`.${CLASS.chartLines}`)
			.selectAll(`.${CLASS.chartLine}`)
			.data(targets)
			.attr("class", d => classChartLine(d) + classFocus(d));

		const mainLineEnter = mainLineUpdate.enter().append("g")
			.attr("class", classChartLine)
			.style("opacity", "0")
			.style("pointer-events", "none");

		// Lines for each data
		mainLineEnter.append("g")
			.attr("class", classLines);

		// Areas
		mainLineEnter.append("g")
			.attr("class", classAreas);

		if (config.point_show) {
			// Circles for each data point on lines
			config.data_selection_enabled && mainLineEnter.append("g")
				.attr("class", d => $$.generateClass(CLASS.selectedCircles, d.id));

			mainLineEnter.append("g")
				.attr("class", classCircles)
				.style("cursor", d => (config.data_selection_isselectable(d) ? "pointer" : null));
		}

		// Update date for selected circles
		targets.forEach(t => {
			$$.main.selectAll(`.${CLASS.selectedCircles}${$$.getTargetSelectorSuffix(t.id)}`)
				.selectAll(`${CLASS.selectedCircle}`)
				.each(d => {
					d.value = t.values[d.index].value;
				});
		});

		// MEMO: can not keep same color...
		// mainLineUpdate.exit().remove();
	},

	updateLine(durationForExit) {
		const $$ = this;

		$$.mainLine = $$.main
			.selectAll(`.${CLASS.lines}`)
			.selectAll(`.${CLASS.line}`)
			.data($$.lineData.bind($$));

		$$.mainLine.exit().transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$$.mainLine = $$.mainLine.enter()
			.append("path")
			.attr("class", d => `${$$.classLine.bind($$)(d)} ${$$.extraLineClasses(d) || ""}`)
			.style("stroke", $$.color)
			.merge($$.mainLine)
			.style("opacity", $$.initialOpacity.bind($$))
			.style("shape-rendering", d => ($$.isStepType(d) ? "crispEdges" : ""))
			.attr("transform", null);
	},

	redrawLine(drawLine, withTransition) {
		return [
			(withTransition ? this.mainLine.transition(Math.random().toString()) : this.mainLine)
				.attr("d", drawLine)
				.style("stroke", this.color)
				.style("opacity", "1")
		];
	},

	/**
	 * Get the curve interpolate
	 * @param {Array} d Data object
	 * @return {Function}
	 * @private
	 */
	getCurve(d) {
		const $$ = this;
		const isRotatedStepType = $$.config.axis_rotated && $$.isStepType(d);

		// when is step & rotated, should be computed in different way
		// https://github.com/naver/billboard.js/issues/471
		return isRotatedStepType ? context => {
			const step = $$.getInterpolate(d)(context);

			// keep the original method
			step.orgPoint = step.point;

			// to get rotated path data
			step.pointRotated = function(x, y) {
				this._point === 1 && (this._point = 2);

				const y1 = this._y * (1 - this._t) + y * this._t;

				this._context.lineTo(this._x, y1);
				this._context.lineTo(x, y1);

				this._x = x;
				this._y = y;
			};

			step.point = function(x, y) {
				this._point === 0 ? this.orgPoint(x, y) : this.pointRotated(x, y);
			};

			return step;
		} : $$.getInterpolate(d);
	},

	generateDrawLine(lineIndices, isSub) {
		const $$ = this;
		const config = $$.config;
		const lineConnectNull = config.line_connectNull;
		const isRotated = config.axis_rotated;

		const getPoints = $$.generateGetLinePoints(lineIndices, isSub);
		const yScaleGetter = isSub ? $$.getSubYScale : $$.getYScale;

		const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
		const yValue = (d, i) => (config.data_groups.length > 0 ?
			getPoints(d, i)[0][1] :
			yScaleGetter.call($$, d.id)($$.getBaseValue(d))
		);

		let line = d3Line();

		line = isRotated ?
			line.x(yValue).y(xValue) : line.x(xValue).y(yValue);

		if (!lineConnectNull) {
			line = line.defined(d => $$.getBaseValue(d) !== null);
		}

		return d => {
			const x = isSub ? $$.x : $$.subX;
			const y = yScaleGetter.call($$, d.id);
			let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
			let x0 = 0;
			let y0 = 0;
			let path;

			if ($$.isLineType(d)) {
				if (config.data_regions[d.id]) {
					path = $$.lineWithRegions(values, x, y, config.data_regions[d.id]);
				} else {
					if ($$.isStepType(d)) {
						values = $$.convertValuesToStep(values);
					}

					path = line.curve($$.getCurve(d))(values);
				}
			} else {
				if (values[0]) {
					x0 = x(values[0].x);
					y0 = y(values[0].value);
				}

				path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
			}

			return path || "M 0 0";
		};
	},

	generateGetLinePoints(lineIndices, isSubValue) { // partial duplication of generateGetBarPoints
		const $$ = this;
		const config = $$.config;
		const lineTargetsNum = lineIndices.__max__ + 1;
		const isSub = !!isSubValue;
		const x = $$.getShapeX(0, lineTargetsNum, lineIndices, isSub);
		const y = $$.getShapeY(isSub);
		const lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, isSub);
		const yScale = isSub ? $$.getSubYScale : $$.getYScale;

		return (d, i) => {
			const y0 = yScale.call($$, d.id)(0);
			const offset = lineOffset(d, i) || y0; // offset is for stacked area chart
			const posX = x(d);
			let posY = y(d);

			// fix posY not to overflow opposite quadrant
			if (config.axis_rotated && (
				(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
			)) {
				posY = y0;
			}

			// 1 point that marks the line position
			const point = [posX, posY - (y0 - offset)];

			return [
				point,
				point, // from here and below, needed for compatibility
				point,
				point
			];
		};
	},

	lineWithRegions(d, x, y, _regions) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const isTimeSeries = $$.isTimeSeries();
		const xOffset = $$.isCategorized() ? 0.5 : 0;
		const regions = [];
		const dasharray = "2 2"; // default value

		let xp;
		let yp;
		let diff;
		let diffx2;

		// check weather data is within region
		const isWithinRegions = (withinX, withinRegions) => {
			for (let i = 0, reg; (reg = withinRegions[i]); i++) {
				if (reg.start < withinX && withinX <= reg.end) {
					return reg.style;
				}
			}

			return false;
		};

		// Check start/end of regions
		if (isDefined(_regions)) {
			const getValue = (v, def) => (
				isUndefined(v) ? def : (isTimeSeries ? $$.parseDate(v) : v)
			);

			for (let i = 0, reg; (reg = _regions[i]); i++) {
				const start = getValue(reg.start, d[0].x);
				const end = getValue(reg.end, d[d.length - 1].x);
				const style = reg.style || {dasharray};

				regions[i] = {start, end, style};
			}
		}

		// Set scales
		const xValue = isRotated ? dt => y(dt.value) : dt => x(dt.x);
		const yValue = isRotated ? dt => x(dt.x) : dt => y(dt.value);

		// Define svg generator function for region
		const generateM = points => `M${points[0][0]},${points[0][1]}L${points[1][0]},${points[1][1]}`;

		const sWithRegion = isTimeSeries ? (d0, d1, k, timeseriesDiff) => {
			const x0 = d0.x.getTime();
			const xDiff = d1.x - d0.x;
			const xv0 = new Date(x0 + xDiff * k);
			const xv1 = new Date(x0 + xDiff * (k + timeseriesDiff));

			const points = isRotated ?
				[[y(yp(k)), x(xv0)], [y(yp(k + diff)), x(xv1)]] :
				[[x(xv0), y(yp(k))], [x(xv1), y(yp(k + diff))]];

			return generateM(points);
		} : (d0, d1, k, otherDiff) => {
			const points = isRotated ?
				[[y(yp(k), true), x(xp(k))], [y(yp(k + otherDiff), true), x(xp(k + otherDiff))]] :
				[[x(xp(k), true), y(yp(k))], [x(xp(k + otherDiff), true), y(yp(k + otherDiff))]];

			return generateM(points);
		};

		// Generate
		let path = "M";

		for (let i = 0, data; (data = d[i]); i++) {
			const prevData = d[i - 1];
			let style = isWithinRegions(data.x, regions);

			// Draw as normal
			if (isUndefined(regions) || !style) {
				path += `${i ? "L" : ""}${xValue(data)},${yValue(data)}`;
			} else {
				try {
					style = style.dasharray.split(" ");
				} catch (e) {
					style = dasharray.split(" ");
				}

				// Draw with region // TODO: Fix for horizotal charts
				xp = $$.getScale(prevData.x + xOffset, data.x + xOffset, isTimeSeries);
				yp = $$.getScale(prevData.value, data.value);

				const dx = x(data.x) - x(prevData.x);
				const dy = y(data.value) - y(prevData.value);
				const dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

				diff = style[0] / dd;
				diffx2 = diff * style[1];

				for (let j = diff; j <= 1; j += diffx2) {
					path += sWithRegion(prevData, data, j, diff);

					// to make sure correct line drawing
					if (j + diffx2 >= 1) {
						path += sWithRegion(prevData, data, 1, 0);
					}
				}
			}
		}

		return path;
	},

	updateArea(durationForExit) {
		const $$ = this;

		$$.mainArea = $$.main.selectAll(`.${CLASS.areas}`)
			.selectAll(`.${CLASS.area}`)
			.data($$.lineData.bind($$));

		$$.mainArea.exit().transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$$.mainArea = $$.mainArea.enter().append("path")
			.attr("class", $$.classArea.bind($$))
			.style("fill", $$.color)
			.style("opacity", function() {
				$$.orgAreaOpacity = d3Select(this).style("opacity");
				return "0";
			})
			.merge($$.mainArea);

		$$.mainArea
			.style("opacity", $$.orgAreaOpacity);
	},

	redrawArea(drawArea, withTransition) {
		const $$ = this;

		return [
			(withTransition ? this.mainArea.transition(Math.random().toString()) : this.mainArea)
				.attr("d", drawArea)
				.style("fill", this.color)
				.style("opacity", d => ($$.isAreaRangeType(d) ? $$.orgAreaOpacity / 1.75 : $$.orgAreaOpacity))
		];
	},

	/**
	 * Generate area path data
	 * @param areaIndices
	 * @param isSub
	 * @return {function(*=): (*|string)}
	 * @private
	 */
	generateDrawArea(areaIndices, isSub) {
		const $$ = this;
		const config = $$.config;
		const lineConnectNull = config.line_connectNull;
		const isRotated = config.axis_rotated;
		const isGrouped = config.data_groups.length > 0;

		const getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
		const yScaleGetter = isSub ? $$.getSubYScale : $$.getYScale;

		const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
		const value0 = (d, i) => (isGrouped ?
			getPoints(d, i)[0][1] :
			yScaleGetter.call($$, d.id)(
				$$.isAreaRangeType(d) ?
					$$.getAreaRangeData(d, "high") : $$.getAreaBaseValue(d.id)
			));
		const value1 = (d, i) => (isGrouped ?
			getPoints(d, i)[1][1] :
			yScaleGetter.call($$, d.id)(
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
					x0 = $$.x(values[0].x);
					y0 = $$.getYScale(d.id)(values[0].value);
				}

				path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
			}

			return path || "M 0 0";
		};
	},

	getAreaBaseValue() {
		return 0;
	},

	generateGetAreaPoints(areaIndices, isSub) {
		// partial duplication of generateGetBarPoints
		const $$ = this;
		const config = $$.config;
		const areaTargetsNum = areaIndices.__max__ + 1;
		const x = $$.getShapeX(0, areaTargetsNum, areaIndices, !!isSub);
		const y = $$.getShapeY(!!isSub);
		const areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, !!isSub);
		const yScale = isSub ? $$.getSubYScale : $$.getYScale;

		return function(d, i) {
			const y0 = yScale.call($$, d.id)(0);
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
	},

	updateCircle() {
		const $$ = this;

		if (!$$.config.point_show) {
			return;
		}

		$$.mainCircle = $$.main.selectAll(`.${CLASS.circles}`).selectAll(`.${CLASS.circle}`)
			.data(d => !$$.isBarType(d) && (!$$.isLineType(d) || $$.shouldDrawPointsForLine(d)) &&
				$$.labelishData(d));

		$$.mainCircle.exit().remove();

		$$.mainCircle = $$.mainCircle.enter()
			.append($$.point("create", this, $$.classCircle.bind($$), $$.pointR.bind($$), $$.color))
			.merge($$.mainCircle)
			.style("stroke", $$.color)
			.style("opacity", $$.initialOpacityForCircle.bind($$));
	},

	redrawCircle(cx, cy, withTransition, flow) {
		const $$ = this;
		const selectedCircles = $$.main.selectAll(`.${CLASS.selectedCircle}`);

		if (!$$.config.point_show) {
			return [];
		}

		const mainCircles = [];

		$$.mainCircle.each(function(d) {
			const fn = $$.point("update", $$, cx, cy, $$.opacityForCircle.bind($$), $$.color, withTransition, flow, selectedCircles).bind(this);
			const result = fn(d);

			mainCircles.push(result);
		});

		const posAttr = $$.isCirclePoint() ? "c" : "";

		return [
			mainCircles,
			selectedCircles
				.attr(`${posAttr}x`, cx)
				.attr(`${posAttr}y`, cy)
		];
	},

	circleX(d) {
		const $$ = this;
		const hasValue = isValue(d.x);

		return $$.config.zoom_enabled && $$.zoomScale ?
			(hasValue ? $$.zoomScale(d.x) : null) :
			(hasValue ? $$.x(d.x) : null);
	},

	updateCircleY() {
		const $$ = this;
		let lineIndices;
		let getPoints;

		if ($$.config.data_groups.length > 0) {
			lineIndices = $$.getShapeIndices($$.isLineType);
			getPoints = $$.generateGetLinePoints(lineIndices);

			$$.circleY = (d, i) => getPoints(d, i)[0][1];
		} else {
			$$.circleY = d => $$.getYScale(d.id)($$.getBaseValue(d));
		}
	},

	getCircles(i, id) {
		const $$ = this;
		const suffix = (isValue(i) ? `-${i}` : ``);

		return (id ? $$.main.selectAll(`.${CLASS.circles}${$$.getTargetSelectorSuffix(id)}`) : $$.main)
			.selectAll(`.${CLASS.circle}${suffix}`);
	},

	expandCircles(i, id, reset) {
		const $$ = this;
		const r = $$.pointExpandedR.bind($$);

		reset && $$.unexpandCircles();

		const circles = $$.getCircles(i, id).classed(CLASS.EXPANDED, true);
		const scale = r(circles) / $$.config.point_r;

		if ($$.isCirclePoint()) {
			circles.attr("r", r);
		} else {
			// transform must be applied to each node individually
			circles.each(function() {
				const point = d3Select(this);

				const box = this.getBBox();
				const x1 = box.x + (box.width * 0.5);
				const y1 = box.y + (box.height * 0.5);
				const x2 = (1 - scale) * x1;
				const y2 = (1 - scale) * y1;

				this.tagName === "circle" ?
					point.attr("r", r) :
					point.style("transform", `translate(${x2}px, ${y2}px) scale(${scale})`);
			});
		}
	},

	unexpandCircles(i) {
		const $$ = this;
		const r = $$.pointR.bind($$);

		const circles = $$.getCircles(i)
			.filter(function() {
				return d3Select(this).classed(CLASS.EXPANDED);
			})
			.classed(CLASS.EXPANDED, false);

		circles.attr("r", r);

		!$$.isCirclePoint() &&
			circles.style("transform", `scale(${r(circles) / $$.config.point_r})`);
	},

	pointR(d) {
		const $$ = this;
		const config = $$.config;
		const pointR = config.point_r;
		let r = pointR;

		if ($$.isStepType(d)) {
			r = 0;
		} else if ($$.isBubbleType(d)) {
			r = $$.getBubbleR(d);
		} else if (isFunction(pointR)) {
			r = pointR(d);
		}

		return r;
	},

	pointExpandedR(d) {
		const $$ = this;
		const config = $$.config;
		const scale = $$.isBubbleType(d) ? 1.15 : 1.75;

		return config.point_focus_expand_enabled ?
			(config.point_focus_expand_r || $$.pointR(d) * scale) : $$.pointR(d);
	},

	pointSelectR(d) {
		const $$ = this;
		const selectR = $$.config.point_select_r;

		return isFunction(selectR) ?
			selectR(d) : (selectR || $$.pointR(d) * 4);
	},

	isWithinCircle(node, r) {
		const mouse = d3Mouse(node);
		const element = d3Select(node);
		const prefix = this.isCirclePoint() ? "c" : "";

		let cx = +element.attr(`${prefix}x`);
		let cy = +element.attr(`${prefix}y`);

		// if node don't have cx/y or x/y attribute value
		if (!(cx || cy) && node.nodeType === 1) {
			const domRect = node.getBBox ? node.getBBox() : node.getBoundingClientRect();

			cx = domRect.x;
			cy = domRect.y;
		}

		return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < r;
	},

	isWithinStep(that, y) {
		return Math.abs(y - d3Mouse(that)[1]) < 30;
	},

	shouldDrawPointsForLine(d) {
		const linePoint = this.config.line_point;

		return linePoint === true ||
			(isArray(linePoint) && linePoint.indexOf(d.id) !== -1);
	},
});
