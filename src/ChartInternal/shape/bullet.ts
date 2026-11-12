/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {axisBottom as d3AxisBottom, axisLeft as d3AxisLeft} from "d3-axis";
import {local as d3Local, select as d3Select} from "d3-selection";
import {$COMMON, $SHAPE} from "../../config/classes";
import {isObject} from "../../module/util";
import type {IBulletData} from "../data/IData";
import shapeBulletCommon, {$BULLET, type IBulletLayout} from "./core/bullet";

// what an axis group was drawn with.
// - rotated: d3-axis keeps the attributes of the other orientation on update
// - key: when it is the same, redrawing the axis would only replace its text nodes
const axisState = d3Local<{rotated: boolean, key: string}>();

/**
 * Get the row element of the given tag and class, creating it before the given siblings.
 * Elements are updated in place on redraw, instead of being recreated.
 * @param {d3Selection} g Bullet row group selection
 * @param {string} tag Element tag name
 * @param {string} cls Class name
 * @param {string|null} before Selector of the sibling to insert before: keeps the paint order
 * @returns {Array} Row element selection, and whether it was just created
 * @private
 */
function _upsert(g, tag: string, cls: string, before: string | null): [any, boolean] {
	const el = g.select(`${tag}.${cls}`);
	const isNew = el.empty();

	return [isNew ? g.insert(tag, before).classed(cls, true) : el, isNew];
}

/**
 * Set the attributes of an element: a new one is drawn at its place,
 * an existing one moves there with the chart transition, same as the data labels.
 * @param {ChartInternal} $$ ChartInternal instance
 * @param {d3Selection} el Element selection
 * @param {boolean} isNew Whether the element was just created
 * @param {boolean} withTransition Whether to transit
 * @param {object} attrs Attributes
 * @param {string|null} fill Fill color, null to remove it
 * @private
 */
function _move($$, el, isNew: boolean, withTransition: boolean | undefined, attrs, fill?: string) {
	const target = isNew ? el : $$.$T(el, withTransition);

	Object.keys(attrs).forEach(key => target.attr(key, attrs[key]));
	// null removes the color that was given before: the stylesheet draws it again
	fill !== undefined && target.style("fill", fill);
}

/**
 * Draw a single bullet row within its group
 * @param {d3Selection} g Bullet row group selection
 * @param {object} d Bullet row data
 * @param {object} layout Bullet layout
 * @param {boolean} withTransition Whether to transit
 * @private
 */
function _drawRow(g, d: IBulletData, layout: IBulletLayout, withTransition?: boolean): void {
	const $$ = this;
	const {offset, ranges, isDot, measure, color, targets, axis, title} = $$.getBulletRowGeometry(d,
		layout);
	const sel = {
		target: `.${$BULLET.bulletTarget}`,
		axis: `.${$BULLET.bulletAxis}`
	};

	_move($$, g, g.attr("transform") === null, withTransition, {
		transform: `translate(${offset.x}, ${offset.y})`
	});

	const rangeSel = g.selectAll(`.${$BULLET.bulletRange}`)
		.data(ranges);
	const rangeAttrs = ({x, y, width, height}) => ({x, y, width, height});
	// without bullet.range.colors the stylesheet draws the band, from its position (--bb-t)
	const rangeTheme = (el, {fill, t}) => el.style("--bb-t", fill ? null : t);

	rangeSel.exit().remove();

	rangeSel.each(function(range) {
		const el = d3Select(this);

		_move($$, el, false, withTransition, rangeAttrs(range), range.fill);
		rangeTheme(el, range);
	});

	// insert before the measure: a range added on redraw must not be painted over it
	rangeSel.enter()
		.insert("rect", `.${$BULLET.bulletMeasure}`)
		.attr("class", $BULLET.bulletRange)
		.each(function(range) {
			const el = d3Select(this);

			_move($$, el, true, withTransition, rangeAttrs(range), range.fill);
			rangeTheme(el, range);
		});

	// measure: bar and dot are different elements
	const measureTag = isDot ? "circle" : "rect";

	g.selectAll(`.${$BULLET.bulletMeasure}`)
		.filter(function() {
			return this.tagName.toLowerCase() !== measureTag;
		})
		.remove();

	const [measureEl, isNewMeasure] = _upsert(g, measureTag, $BULLET.bulletMeasure,
		`${sel.target}, ${sel.axis}`);

	measureEl
		// same shape classes as the other types: bb-shape, bb-shape-<index>, bb-bullet, bb-bullet-<id>
		.attr("class", [
			$BULLET.bulletMeasure,
			$$.generateClass($SHAPE.shape, d.index),
			$$.generateClass($BULLET.bullet, d.id)
		].join("").replace(/\s+/g, " ").trim())
		.datum(d);

	_move($$, measureEl, isNewMeasure, withTransition, measure, color);

	// comparative target markers: one line per target, kept in place on redraw
	const targetEls = g.selectAll(`line${sel.target}`).nodes();

	targetEls.slice(targets.length).forEach(el => el.remove());

	targets.forEach((target, i) => {
		const isNewTarget = !targetEls[i];
		const targetEl = isNewTarget ?
			g.insert("line", sel.axis).classed($BULLET.bulletTarget, true) :
			d3Select(targetEls[i]);

		targetEl.datum(d);

		_move($$, targetEl, isNewTarget, withTransition, target);
	});

	// quantitative scale axis
	let axisEl = g.select(sel.axis);

	if (axis && !axisEl.empty() && axisState.get(axisEl.node())?.rotated !== axis.rotated) {
		axisEl.remove();
		axisEl = g.select(sel.axis);
	}

	if (axis) {
		const isNewAxis = axisEl.empty();

		if (isNewAxis) {
			axisEl = g.append("g").attr("class", $BULLET.bulletAxis);
		}

		if (axis.rotated) {
			axisEl.attr("transform", null);
		} else {
			_move($$, axisEl, isNewAxis, withTransition, {
				transform: `translate(${axis.x}, ${axis.y})`
			});
		}

		// the labels are in the key: the format can change on redraw
		const {key} = axis;

		if (axisState.get(axisEl.node())?.key !== key) {
			(isNewAxis ? axisEl : $$.$T(axisEl, withTransition))
				.call(
					(axis.rotated ? d3AxisLeft : d3AxisBottom)(axis.scale)
						.tickValues(axis.ticks)
						.tickFormat(axis.format)
						.tickSizeOuter(0)
				);

			// d3-axis sets the font on every call: let the stylesheet decide
			axisEl
				.attr("font-family", null)
				.attr("font-size", null);

			axisState.set(axisEl.node(), {rotated: axis.rotated, key});
		}
	} else {
		axisEl.remove();
	}

	// title of the row: inside the row group, so it hides with the row
	if (title) {
		const [titleEl, isNewTitle] = _upsert(g, "text", $BULLET.bulletTitle, null);

		titleEl
			.text(title.text)
			.style("text-anchor", title.anchor)
			// beside the plot it is centered on the row
			.attr("dy", title.anchor === "end" ? ".35em" : null);

		_move($$, titleEl, isNewTitle, withTransition, {x: title.x, y: title.y});
	} else {
		g.select(`.${$BULLET.bulletTitle}`).remove();
	}
}

export default {
	...shapeBulletCommon,

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
			// events emulated by the tooltip API are dispatched on the group itself
			const target = event.target === bullet.node() ?
				state.eventReceiver.rect?.node?.() :
				event.target;

			if (target && /^(rect|circle|line)$/i.test(target.tagName)) {
				const datum: any = d3Select(target).datum();

				if (datum && isObject(datum) && "id" in datum) {
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
					// the rows are translated inside the svg: measure the pointer against the svg
					// itself, and apply data.names to the tooltip like the other types
					$$.showTooltip([$$.addName(data)], $$.$el.svg.node());
					/^(touchstart|mouseover)$/.test(event.type) && $$.setOverOut(true, data);
				}
			}, isTouch ? {passive: true} : undefined)
			.on(isTouch ? "touchend" : "mouseout", event => {
				const data = getTarget(event);

				if (config.interaction_onout) {
					$$.hideTooltip();
					$$.setOverOut(false, data);
				}
			})
			// the measure and the target markers are the data of the row: the range bands are not
			.on("click", event => {
				const data = getTarget(event);

				data && config.data_onclick.bind($$.api)(data, event.target);
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
		const classChartBullet = d => $BULLET.chartBullet + $$.classTarget(d.id);

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
	 * @param {boolean} withTransition Whether to transit
	 * @private
	 */
	redrawBullet(withTransition?: boolean): void {
		const $$ = this;
		const {$el: {bullet}} = $$;
		const layout = $$.getBulletLayout();
		const {left, top} = layout.area;

		bullet.attr("transform", `translate(${left}, ${top})`);

		// bind the current rows: ranges, targets and values can change without a data update
		bullet.selectAll(`.${$BULLET.chartBullet}`)
			.data(layout.rows, d => d.id)
			.each(function(d: IBulletData) {
				_drawRow.call($$, d3Select(this), d, layout, withTransition);
			});
	}
};
