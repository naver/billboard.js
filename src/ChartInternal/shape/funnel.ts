/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {line as d3Line} from "d3-shape";
import {curveLinear as d3CurveLinear} from "d3-shape";
import {$COMMON, $FUNNEL} from "../../config/classes";
import {isObject} from "../../module/util";
import type {IData, IDataRow, IFunnelData} from "../data/IData";

type TSize = { [key in "width" | "height" | "top" | "left"]: number };
type TSizeCurrent = Pick<TSize, "width" | "height">;

/**
 * Get current size value
 * @param {boolean} checkNeck Determine if container width to not be less than neck width
 * @returns {object} size object
 * @private
 */
function _getSize(checkNeck = false): TSize {
	const $$ = this;
	const {config, state: {current: {width, height}}} = $$;
	const padding = $$.getCurrentPadding();

	const size = {
		width: width - padding.left - padding.right,
		height: height - (config.legend_show ? $$.getLegendHeight() + 10 : 0) -
			padding.top - padding.bottom,
		...padding
	};

	if (checkNeck) {
		const neck = _getNeckSize.call($$, size);
		const isRotated = config.funnel_rotated;

		// Use Math.max to ensure size is not less than neck
		size.width = Math.max(size.width, isRotated ? neck.height : neck.width);
		size.height = Math.max(size.height, isRotated ? neck.width : neck.height);
	}

	return size;
}

/**
 * Return neck size in pixels
 * @param {object} current Current size object
 * @returns {object} size object
 * @private
 */
function _getNeckSize(current: TSizeCurrent) {
	const $$ = this;
	const {config} = $$;
	const isRotated = config.funnel_rotated;
	const [w, h] = [config.funnel_neck_width, config.funnel_neck_height].map((v, i) =>
		isObject(v) ? current[isRotated !== !i ? "width" : "height"] * v.ratio : v
	);

	return {width: w, height: h};
}

/**
 * Get coordinate points
 * @param {Array} d Data object
 * @returns {Array} Coordinate points
 * @private
 */
function _getCoord(d: IFunnelData[]) {
	const $$ = this;
	const isRotated = $$.config.funnel_rotated;
	const {width, height} = _getSize.call($$, true);
	const coords: number[][][] = [];

	// Use relative coordinates (0, 0) as origin within the funnel group
	d.forEach((item, i) => {
		const {ratio = 0} = item;
		const prev = i > 0 ? coords[i - 1][2][isRotated ? 0 : 1] : 0;
		const end = ratio + prev;

		// coords: [M(start), 1(end-start), 2(end-end), 3(start-end), 4(close)]
		coords.push(item.coords = isRotated ?
			[
				[prev, 0],
				[end, 0],
				[end, height],
				[prev, height],
				[prev, 0]
			] :
			[
				[0, prev],
				[width, prev],
				[width, end],
				[0, end],
				[0, prev]
			]);
	});

	return coords;
}

/**
 * Get clip path
 * @returns {string} path
 * @private
 */
function _getClipPath(): string {
	const $$ = this;
	const isRotated = $$.config.funnel_rotated;
	const {width, height} = _getSize.call($$, true);
	const neck = _getNeckSize.call($$, {width, height});

	// Use relative coordinates (0, 0) as origin within the funnel group
	let middleCoords: number[][];

	if (isRotated) {
		const neckY = (height - neck.width) / 2;
		const bodyW = width - neck.height;

		middleCoords = [
			[bodyW, neckY],
			[width, neckY],
			[width, height - neckY],
			[bodyW, height - neckY],
			[0, height]
		];
	} else {
		const neckX = (width - neck.width) / 2;
		const bodyH = height - neck.height;

		middleCoords = [
			[width, 0],
			[width - neckX, bodyH],
			[width - neckX, height],
			[neckX, height],
			[neckX, bodyH]
		];
	}

	return `M${[[0, 0], ...middleCoords, [0, 0]].join("L")}z`;
}

/**
 * Get funnel data
 * @param {object} d data object
 * @returns {Array}
 * @private
 */
function _getFunnelData(d: IData[]): IFunnelData[] {
	const $$ = this;
	const {config} = $$;
	const data: IFunnelData[] = d.map(d => ({
		id: d.id,
		value: d.values.reduce((a, b) => a + <number>b.value, 0)
	}));

	config.data_order && data.sort($$.getSortCompareFn.bind($$)(true));

	return _updateRatio.call($$, data);
}

/**
 * Update ratio value
 * @param {Array} data Data object
 * @returns {Array} Updated data object
 * @private
 */
function _updateRatio(data: IFunnelData[]): IFunnelData[] {
	const $$ = this;
	const {width, height} = _getSize.call($$);
	const total = $$.getTotalDataSum(true);
	const dimension = $$.config.funnel_rotated ? width : height;

	data.forEach(d => {
		d.ratio = (d.value / total) * dimension;
	});

	return data;
}

/**
 * Easing function for smooth curve generation (ease-in-out cubic)
 * @param {number} t Progress value between 0 and 1
 * @returns {number} Eased value
 * @private
 */
function _easeInOutCubic(t: number): number {
	return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Generate smooth edge points for spline funnel
 * @param {number} start Start position
 * @param {number} end End position
 * @param {number} startEdge Start edge position
 * @param {number} endEdge End edge position
 * @param {boolean} isRotated Whether funnel is rotated
 * @returns {Array} Array of [x, y] points
 * @private
 */
function _generateSmoothEdgePoints(
	start: number,
	end: number,
	startEdge: number,
	endEdge: number,
	isRotated: boolean
): [number, number][] {
	const points: [number, number][] = [];
	// 20 segments provide smooth cubic easing curve without unnecessary overhead
	const SPLINE_POINTS = 20;

	for (let i = 0; i <= SPLINE_POINTS; i++) {
		const t = i / SPLINE_POINTS;
		const pos = start + (end - start) * t;
		const edge = startEdge + (endEdge - startEdge) * _easeInOutCubic(t);

		points.push(isRotated ? [pos, edge] : [edge, pos]);
	}

	return points;
}

/**
 * Generate spline clip path for funnel with smooth curved outer edges
 * @returns {string} SVG path string
 * @private
 */
function _getSplineClipPath(): string {
	const $$ = this;
	const isRotated = $$.config.funnel_rotated;
	const {width, height} = _getSize.call($$, true);
	const neck = _getNeckSize.call($$, {width, height});

	const lineGen = d3Line<[number, number]>()
		.x(d => d[0])
		.y(d => d[1])
		.curve(d3CurveLinear);

	// Use relative coordinates (0, 0) as origin within the funnel group
	// Common calculations
	const neckHalf = (isRotated ? height - neck.width : width - neck.width) / 2;
	const bodySize = isRotated ? width - neck.height : height - neck.height;

	// Generate edge points based on orientation
	const edge1 = _generateSmoothEdgePoints(
		0,
		bodySize,
		isRotated ? 0 : width,
		isRotated ? neckHalf : width - neckHalf,
		isRotated
	);

	const edge2: [number, number][] = [];

	// Add neck points if neck exists
	if (neck.height > 0) {
		edge1.push(isRotated ? [width, neckHalf] : [width - neckHalf, height]);
		edge2.push(isRotated ? [width, height - neckHalf] : [neckHalf, height]);
	}

	// Generate opposite edge
	edge2.push(..._generateSmoothEdgePoints(
		bodySize,
		0,
		isRotated ? height - neckHalf : neckHalf,
		isRotated ? height : 0,
		isRotated
	));

	// Insert corner points to maintain flat top/left edges
	// isRotated: swap indices for horizontal vs vertical corner points
	if (edge1.length > 1) {
		const [a, b] = isRotated ? [1, 0] : [0, 1];

		edge1.splice(1, 0, [edge1[a][0], edge1[b][1]]);

		const lastIdx = edge2.length - 1;

		if (lastIdx > 0) {
			edge2.splice(lastIdx, 0, [edge2[lastIdx - a][0], edge2[lastIdx - b][1]]);
		}
	}

	const path1 = lineGen(edge1) || "";
	const path2 = lineGen(edge2)?.replace(/^M/, "L") || "";

	return isRotated ? `${path1}${path2}z` : `M0,0${path1.replace(/^M/, "L")}${path2}z`;
}

export default {
	/**
	 * Initialize funnel
	 * @private
	 */
	initFunnel(): void {
		const $$ = this;
		const {$el} = $$;

		$el.funnel = $el.main.select(`.${$COMMON.chart}`)
			.append("g")
			.classed($FUNNEL.chartFunnels, true);

		$el.funnel.background = $el.funnel.append("path")
			.classed($FUNNEL.funnelBackground, true);

		$$.bindFunnelEvent();
	},

	/**
	 * Bind events
	 * @private
	 */
	bindFunnelEvent(): void {
		const $$ = this;
		const {$el: {funnel}, config, state} = $$;

		if (!config.interaction_enabled) {
			return;
		}

		const getTarget = event => {
			const target = event.isTrusted ? event.target : state.eventReceiver.rect?.node();

			if (/^path$/i.test(target.tagName)) {
				state.event = event;
				return d3Select(target).datum();
			}
		};

		const isTouch = state.inputType === "touch";

		funnel
			.on(isTouch ? "touchstart" : "mouseover mousemove", event => {
				const data = getTarget(event);

				if (data) {
					$$.showTooltip([data], event.target);
					/^(touchstart|mouseover)$/.test(event.type) && $$.setOverOut(true, data);
				}
			}, isTouch ? {passive: true} : undefined)
			.on(isTouch ? "touchend" : "mouseout", event => {
				const data = getTarget(event);

				if (config.interaction_onout) {
					$$.hideTooltip();
					$$.setOverOut(false, data);
				}
			});
	},

	/**
	 * Update targets for funnel
	 * @param {object} t Data object
	 * @private
	 */
	updateTargetsForFunnel(t: IData[]): void {
		const $$ = this;
		const {$el: {funnel}} = $$;

		if (!funnel) {
			$$.initFunnel();
		}

		const classChartFunnel = $$.getChartClass("Funnel");
		const classFunnel = $$.getClass("funnel", true);
		const targets = _getFunnelData.call($$, t.filter($$.isFunnelType.bind($$)));

		const mainFunnelUpdate = $$.filterNullish(targets);
		const mainFunnel = funnel
			.selectAll(`.${$FUNNEL.chartFunnel}`)
			.data(mainFunnelUpdate);

		mainFunnel.exit().remove();

		const mainFunnelEnter = mainFunnel.enter()
			.insert("g", `.${$FUNNEL.funnelBackground}`);

		mainFunnelEnter.append("path");

		funnel.path = mainFunnelEnter
			.merge(mainFunnel)
			.attr("class", classChartFunnel)
			.select("path")
			.attr("class", classFunnel)
			.style("opacity", "0")
			.style("fill", $$.color);
	},

	/**
	 * Update funnel path selection
	 * @param {object} targets Updated target data
	 * @private
	 */
	updateFunnel(targets: IData[]): void {
		const $$ = this;
		const {$el: {funnel}} = $$;
		const targetIds = targets.map(({id}) => id);

		funnel.path = funnel.path.filter(d => targetIds.includes(d.id));
	},

	/**
	 * Generate funnel coordinate points data for text labels
	 * @returns {(d: IDataRow) => [number, number][]} Point getter function
	 * @private
	 */
	generateGetFunnelPoints(): (d: IDataRow) => [number, number][] {
		const $$ = this;
		const {config, $el: {funnel}} = $$;
		const isRotated = config.funnel_rotated;
		const targets = $$.filterTargetsToShow(funnel.path);
		const {top, left, width, height} = _getSize.call($$);
		const points = {};

		let accumulated = 0;

		targets.each((d, i) => {
			const start = accumulated;
			const ratio = (targets?.[i] ?? d).ratio;

			accumulated += ratio;

			// For rotated: x is main axis, y is center
			// For non-rotated: y is main axis, x is center
			const offset = isRotated ? left : top;
			const segmentStart = offset + start;
			const segmentEnd = offset + accumulated;
			const center = (segmentStart + segmentEnd) / 2;
			const crossCenter = isRotated ? top + height / 2 : left + width / 2;

			points[d.id] = isRotated ?
				[[segmentStart, crossCenter], [segmentEnd, crossCenter], [center, crossCenter]] :
				[[crossCenter, segmentStart], [crossCenter, segmentEnd], [crossCenter, center]];
		});

		return d => points[d.id];
	},

	/**
	 * Called whenever redraw happens
	 * @private
	 */
	redrawFunnel(): void {
		const $$ = this;
		const {config, $T, $el: {funnel}} = $$;
		const targets = $$.filterTargetsToShow(funnel.path);
		const coords = _getCoord.call($$, _updateRatio.call($$, targets.data()));
		const {top, left} = _getSize.call($$);
		const clipPath = (config.funnel_spline ? _getSplineClipPath : _getClipPath).call($$);

		// Apply transform to position the funnel group
		funnel.attr("transform", `translate(${left}, ${top})`)
			.attr("clip-path", `path('${clipPath}')`);

		funnel.background.attr("d", clipPath);

		$T(targets)
			.attr("d", (_, i) => `M${coords[i].join("L")}z`)
			.style("opacity", "1");

		funnel.selectAll("g").style("opacity", null);
	}
};
