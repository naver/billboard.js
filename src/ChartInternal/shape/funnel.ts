/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
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
function getSize(checkNeck = false): TSize {
	const $$ = this;
	const {config, state: {current: {width, height}}} = $$;
	const padding = $$.getCurrentPadding();

	const size = {
		width: width - (padding.left + padding.right),
		height: height - (config.legend_show ? $$.getLegendHeight() + 10 : 0) -
			(padding.top + padding.bottom),
		...padding
	};

	// determine if container width to not be less than neck width
	if (checkNeck) {
		const {width: neckWidth} = getNecklSize.call($$, {
			width: size.width,
			height: size.height
		});

		// prevent funnel width from being less than neck width
		if (size.width < neckWidth) {
			size.width = neckWidth;
		}
	}

	return size;
}

/**
 * Return neck size in pixels
 * @param {object} current Current size object
 * @returns {object} size object
 * @private
 */
function getNecklSize(current: TSizeCurrent) {
	const $$ = this;
	const {config} = $$;
	let width = config.funnel_neck_width;
	let height = config.funnel_neck_height;

	[width, height] = [width, height].map((v, i) => {
		let size = v;

		if (isObject(v)) {
			size = current[i ? "height" : "width"] * v.ratio;
		}

		return size;
	});

	return {
		width,
		height
	};
}

/**
 * Get coordinate points
 * @param {Array} d Data object
 * @returns {Array} Coordinate points
 * @private
 */
function getCoord(d: IFunnelData[]) {
	const $$ = this;
	const {top, width} = getSize.call($$, true);
	const coords: number[][][] = [];

	d.forEach((d, i) => {
		const {ratio} = d;
		const y = i > 0 ? coords[i - 1][2][1] : top;

		// (M)(4) ------------> (1)
		//   ˄                   |
		//   |                   |
		//   |                   ˅
		//  (3) <-------------- (2)
		coords.push(d.coords = [
			[0, y], // M
			[width, y], // 1
			[width, i > 0 ? ratio + y : ratio + top], // 2
			[0, i > 0 ? ratio + y : ratio + top], // 3
			[0, y] // 4
		]);
	});

	return coords;
}

/**
 * Get neck path
 * @returns {string} path
 * @private
 */
function getNeckPath() {
	const $$ = this;
	const {width, height, top, left} = getSize.call($$, true);
	const neck = getNecklSize.call($$, {width, height});

	const rightX = (width + neck.width) / 2;
	const leftX = (width - neck.width) / 2;
	const bodyHeigth = height - neck.height;

	const coords = [
		[0 + left, 0 + top], // M
		[width + left, 0 + top], // 1
		[rightX, bodyHeigth], // 2
		[rightX, height + top], // 3
		[leftX, height + top], // 4
		[leftX, bodyHeigth], // 5
		[0 + left, 0 + top] // 6
	];

	return `M${coords.join("L")}z`;
}

/**
 * Get funnel data
 * @param {object} d data object
 * @returns {Array}
 * @private
 */
function getFunnelData(d: IData[]): IFunnelData[] {
	const $$ = this;
	const {config} = $$;
	const data: IFunnelData[] = d.map(d => ({
		id: d.id,
		value: d.values.reduce((a, b) => a + <number>b.value, 0)
	}));

	if (config.data_order) {
		data.sort($$.getSortCompareFn.bind($$)(true));
	}

	return updateRatio.call($$, data);
}

/**
 * Update ratio value
 * @param {Array} data Data object
 * @returns {Array} Updated data object
 * @private
 */
function updateRatio(data) {
	const $$ = this;
	const {height} = getSize.call($$);
	const total = $$.getTotalDataSum(true);

	data.forEach(d => {
		// ratio = shape's height
		d.ratio = (d.value / total) * height;
	});

	return data;
}

export default {
	/**
	 * Initialize polar
	 * @private
	 */
	initFunnel(): void {
		const $$ = this;
		const {$el} = $$;

		$el.funnel = $el.main.select(`.${$COMMON.chart}`)
			.append("g")
			.classed($FUNNEL.chartFunnels, true);

		// define background to prevent shape overflow
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
		const getTarget = event => {
			const target = event.isTrusted ? event.target : state.eventReceiver.rect?.node();
			let data;

			if (/^path$/i.test(target.tagName)) {
				state.event = event;
				data = d3Select(target).datum();
			}

			return data;
		};

		if (config.interaction_enabled) {
			const isTouch = state.inputType === "touch";

			funnel
				.on(isTouch ? "touchstart" : "mouseover mousemove", event => {
					const data = getTarget(event);

					if (data) {
						$$.showTooltip([data], event.target);
						/^(touchstart|mouseover)$/.test(event.type) && $$.setOverOut(true, data);
					}
				})
				.on(isTouch ? "touchend" : "mouseout", event => {
					const data = getTarget(event);

					$$.hideTooltip();
					$$.setOverOut(false, data);
				});
		}
	},

	/**
	 * Update polar based on given data array
	 * @param {object} t Data object
	 * @private
	 */
	updateTargetsForFunnel(t: IData[]): void {
		const $$ = this;
		const {$el: {funnel}} = $$;
		const classChartFunnel = $$.getChartClass("Funnel");
		const classFunnel = $$.getClass("funnel", true);

		if (!funnel) {
			$$.initFunnel();
		}

		const targets = getFunnelData.call($$, t.filter($$.isFunnelType.bind($$)));

		const mainFunnelUpdate = funnel
			.selectAll(`.${$FUNNEL.chartFunnel}`)
			.data(targets);

		mainFunnelUpdate.exit().remove();

		const mainFunnelEnter = mainFunnelUpdate
			.enter()
			.insert("g", `.${$FUNNEL.funnelBackground}`);

		mainFunnelEnter
			.append("path");

		funnel.path = mainFunnelEnter
			.merge(mainFunnelUpdate)
			.attr("class", d => classChartFunnel(d))
			.select("path")
			.attr("class", classFunnel)
			.style("opacity", "0")
			.style("fill", $$.color);
	},

	/**
	 * Generate treemap coordinate points data
	 * @returns {Array} Array of coordinate points
	 * @private
	 */
	generateGetFunnelPoints(): (d: IDataRow) => [number, number][] {
		const $$ = this;
		const {$el: {funnel}} = $$;
		const targets = $$.filterTargetsToShow(funnel.path);
		const points = {};
		let accumulatedHeight = getSize.call($$).top ?? 0;

		targets.each((d, i) => {
			points[d.id] = [
				[0, accumulatedHeight],
				[0, accumulatedHeight += (targets?.[i] ?? d).ratio]
			];
		});

		return d => points[d.id];
	},

	/**
	 * Called whenever redraw happens
	 * @private
	 */
	redrawFunnel(): void {
		const $$ = this;
		const {$T, $el: {funnel}} = $$;
		const targets = $$.filterTargetsToShow(funnel.path);
		const coords = getCoord.call($$, updateRatio.call($$, targets.data()));

		// set neck path
		const neckPath = getNeckPath.bind($$)();

		funnel.attr("clip-path", `path('${neckPath}')`);
		funnel.background.attr("d", neckPath);

		$T(targets)
			.attr("d", (d, i) => `M${coords[i].join("L")}z`)
			.style("opacity", "1");

		funnel.selectAll("g").style("opacity", null);
	}
};
