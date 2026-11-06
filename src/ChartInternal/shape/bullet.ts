/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {$BULLET, $COMMON} from "../../config/classes";
import {isArray, isFunction, isNumber, isObject} from "../../module/util";

interface IBulletRow {
	id: string;
	index: number;
	x: number;
	name: string;
	value: number;
	ranges: number[];
	target: number | null;
	domainMax: number;
}

/**
 * Get current size value
 * @returns {object} size object
 * @private
 */
function _getSize(): {width: number, height: number, left: number, top: number} {
	const $$ = this;
	const {config, state: {current: {width, height}}} = $$;
	const padding = $$.getCurrentPadding();
	const legendHeight = config.legend_show && config.legend_position === "bottom" ?
		$$.getLegendHeight() + 10 :
		0;

	return {
		width: Math.max(0, width - padding.left - padding.right),
		height: Math.max(0, height - legendHeight - padding.top - padding.bottom),
		left: padding.left,
		top: padding.top
	};
}

/**
 * Resolve the qualitative range thresholds for the given bullet row
 * @param {string} id Data id
 * @param {number} value Measure value
 * @returns {Array} Ascending range thresholds
 * @private
 */
function _getRanges(id: string, value: number): number[] {
	const ranges = this.config.bullet_ranges;
	let resolved: number[] = [];

	if (isFunction(ranges)) {
		resolved = ranges.call(this.api, id, value) || [];
	} else if (isArray(ranges)) {
		resolved = ranges;
	} else if (isObject(ranges) && isArray(ranges[id])) {
		resolved = ranges[id];
	}

	return resolved
		.filter(v => isNumber(v))
		.concat()
		.sort((a, b) => a - b);
}

/**
 * Resolve the comparative target value for the given bullet row
 * @param {string} id Data id
 * @param {number} value Measure value
 * @returns {number|null} Target value
 * @private
 */
function _getTarget(id: string, value: number): number | null {
	const target = this.config.bullet_target;
	let resolved: number | null = null;

	if (isFunction(target)) {
		resolved = target.call(this.api, id, value);
	} else if (isNumber(target)) {
		resolved = target;
	} else if (isObject(target) && isNumber(target[id])) {
		resolved = target[id];
	}

	return isNumber(resolved) ? resolved : null;
}

/**
 * Get the fill color for the given qualitative range band
 * @param {number} index Band index (0 = smallest range)
 * @param {number} length Total number of bands
 * @returns {string} Color string
 * @private
 */
function _getRangeColor(index: number, length: number): string {
	const colors = this.config.bullet_range_colors;

	if (isFunction(colors)) {
		return colors.call(this.api, index, length);
	} else if (isArray(colors) && colors[index]) {
		return colors[index];
	}

	// default grayscale: smaller range (index 0) is darkest
	const max = Math.max(length - 1, 1);
	const lightness = 55 + (index / max) * 35;

	return `hsl(0, 0%, ${lightness}%)`;
}

/**
 * Draw a single bullet row within its group
 * @param {d3Selection} g Bullet row group selection
 * @param {object} d Bullet row data
 * @private
 */
function _drawRow(g, d: IBulletRow): void {
	const $$ = this;
	const {config} = $$;
	const isRotated = config.bullet_rotated;
	const {width, height} = _getSize.call($$);
	const n = $$.getBulletData().length || 1;
	const padding = config.bullet_padding;
	const band = (isRotated ? width : height) / n;
	const bandInner = Math.max(0, band - padding);
	const axisLen = isRotated ? height : width;
	const domainMax = d.domainMax || 1;
	const measureThickness = bandInner * config.bullet_width_ratio;
	const targetLen = bandInner * config.bullet_target_width_ratio;
	const scale = (v: number): number => (v / domainMax) * axisLen;

	// qualitative range bands (draw largest first so smaller overlaps on top)
	const ranges = d.ranges.map((value, i) => ({value, index: i}))
		.sort((a, b) => b.value - a.value);

	const rangeSel = g.selectAll(`.${$BULLET.bulletRange}`)
		.data(ranges);

	rangeSel.exit().remove();

	rangeSel.enter()
		.append("rect")
		.attr("class", $BULLET.bulletRange)
		.merge(rangeSel)
		.each(function(range) {
			const rect = d3Select(this);
			const len = scale(range.value);
			const fill = _getRangeColor.call($$, range.index, ranges.length);

			if (isRotated) {
				rect.attr("x", 0)
					.attr("y", height - len)
					.attr("width", bandInner)
					.attr("height", len);
			} else {
				rect.attr("x", 0)
					.attr("y", 0)
					.attr("width", len)
					.attr("height", bandInner);
			}

			rect.style("fill", fill);
		});

	// measure (bar or dot)
	const isDot = config.bullet_type === "dot";
	const markerSize = config.bullet_marker_size || measureThickness / 2;
	const color = $$.color(d);

	g.select(`.${$BULLET.bulletMeasure}`).remove();

	const measure = g.append(isDot ? "circle" : "rect")
		.attr("class", $BULLET.bulletMeasure)
		.datum(d)
		.style("fill", color);

	if (isDot) {
		measure
			.attr("cx", isRotated ? bandInner / 2 : scale(d.value))
			.attr("cy", isRotated ? height - scale(d.value) : bandInner / 2)
			.attr("r", markerSize);
	} else if (isRotated) {
		const len = scale(d.value);

		measure
			.attr("x", (bandInner - measureThickness) / 2)
			.attr("y", height - len)
			.attr("width", measureThickness)
			.attr("height", len);
	} else {
		measure
			.attr("x", 0)
			.attr("y", (bandInner - measureThickness) / 2)
			.attr("width", scale(d.value))
			.attr("height", measureThickness);
	}

	// comparative target marker
	g.select(`.${$BULLET.bulletTarget}`).remove();

	if (isNumber(d.target)) {
		const pos = scale(d.target);
		const target = g.append("line")
			.attr("class", $BULLET.bulletTarget)
			.datum(d);

		if (isRotated) {
			target
				.attr("x1", (bandInner - targetLen) / 2)
				.attr("x2", (bandInner + targetLen) / 2)
				.attr("y1", height - pos)
				.attr("y2", height - pos);
		} else {
			target
				.attr("x1", pos)
				.attr("x2", pos)
				.attr("y1", (bandInner - targetLen) / 2)
				.attr("y2", (bandInner + targetLen) / 2);
		}
	}

	// measure value label
	g.select(`.${$BULLET.bulletLabel}`).remove();

	if (config.bullet_label_show) {
		const format = config.bullet_label_format;
		const text = isFunction(format) ? format.call($$.api, d.value, d.id) : d.value;
		const label = g.append("text")
			.attr("class", $BULLET.bulletLabel)
			.text(text as string);

		if (isRotated) {
			label
				.attr("x", bandInner / 2)
				.attr("y", height - scale(d.value) - 6)
				.style("text-anchor", "middle");
		} else {
			label
				.attr("x", scale(d.value) + 5)
				.attr("y", bandInner / 2)
				.style("dominant-baseline", "central");
		}
	}
}

export default {
	/**
	 * Initialize bullet
	 * @private
	 */
	initBullet(): void {
		const $$ = this;
		const {$el} = $$;

		$el.bullet = $el.main.select(`.${$COMMON.chart}`)
			.append("g")
			.classed($BULLET.chartBullets, true);

		$$.bindBulletEvent();
	},

	/**
	 * Bind events
	 * @private
	 */
	bindBulletEvent(): void {
		const $$ = this;
		const {$el: {bullet}, config, state} = $$;

		if (!config.interaction_enabled) {
			return;
		}

		const getTarget = event => {
			const target = event.target ?? state.eventReceiver.rect?.node?.();

			if (target && /^(rect|circle|line)$/i.test(target.tagName)) {
				const datum: any = d3Select(target).datum();

				if (datum && isObject(datum) && "value" in datum) {
					state.event = event;
					return datum;
				}
			}
		};

		const isTouch = state.inputType === "touch";

		bullet
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
	 * Get bullet rows data
	 * @returns {Array} Bullet rows
	 * @private
	 */
	getBulletData(): IBulletRow[] {
		const $$ = this;
		const targets = $$.data.targets.filter($$.isBulletType.bind($$));

		return targets.map((t, index) => {
			const value = t.values.reduce((a, b) => a + (<number>b.value || 0), 0);
			const ranges = _getRanges.call($$, t.id, value);
			const target = _getTarget.call($$, t.id, value);
			let domainMax = Math.max(value, target ?? 0, ...ranges);

			if (domainMax <= 0) {
				domainMax = 1;
			}

			// when no ranges given, generate 3 bands from the domain
			const resolvedRanges = ranges.length ?
				ranges :
				[domainMax * 0.5, domainMax * 0.75, domainMax];

			return {
				id: t.id,
				index,
				x: index,
				name: t.id,
				value,
				ranges: resolvedRanges,
				target,
				domainMax
			};
		});
	},

	/**
	 * Update targets for bullet
	 * @private
	 */
	updateTargetsForBullet(): void {
		const $$ = this;
		const {$el} = $$;

		if (!$el.bullet) {
			$$.initBullet();
		}

		const bulletData = $$.getBulletData();
		const classChartBullet = $$.getChartClass("Bullet");

		const groups = $el.bullet
			.selectAll(`.${$BULLET.chartBullet}`)
			.data(bulletData, d => d.id);

		groups.exit().remove();

		groups.enter()
			.append("g")
			.merge(groups)
			.attr("class", classChartBullet);
	},

	/**
	 * Render bullet
	 * @private
	 */
	redrawBullet(): void {
		const $$ = this;
		const {$el: {bullet}, config} = $$;
		const isRotated = config.bullet_rotated;
		const {width, height, left, top} = _getSize.call($$);
		const n = $$.getBulletData().length || 1;
		const band = (isRotated ? width : height) / n;

		bullet.attr("transform", `translate(${left}, ${top})`);

		bullet.selectAll(`.${$BULLET.chartBullet}`)
			.attr("transform",
				(d: IBulletRow) =>
					isRotated ?
						`translate(${d.index * band}, 0)` :
						`translate(0, ${d.index * band})`)
			.each(function(d: IBulletRow) {
				_drawRow.call($$, d3Select(this), d);
			});
	}
};
