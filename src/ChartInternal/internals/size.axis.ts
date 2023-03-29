/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {AxisType} from "../../../types/types";

export default {
	/**
	 * Get Axis size according its position
	 * @param {string} id Axis id value - x, y or y2
	 * @returns {number} size Axis size value
	 * @private
	 */
	getAxisSize(id: AxisType): number {
		const $$ = this;
		const isRotated = $$.config.axis_rotated;

		return (isRotated && id === "x") || (!isRotated && /y2?/.test(id)) ?
			$$.getAxisWidthByAxisId(id, true) :
			$$.getHorizontalAxisHeight(id);
	},

	getAxisWidthByAxisId(id: AxisType, withoutRecompute?: boolean): number {
		const $$ = this;

		if ($$.axis) {
			const position = $$.axis?.getLabelPositionById(id);
			const width = $$.axis.getMaxTickWidth(id, withoutRecompute);
			const gap = width === 0 ? 0.5 : 0;

			return width + (
				$$.config.padding?.mode === "fit" ?
					position.isInner ? (10 + gap) : 10 :
					position.isInner ? (20 + gap) : 40
			);
		} else {
			return 40;
		}
	},

	getHorizontalAxisHeight(id: AxisType): number {
		const $$ = this;
		const {config, state} = $$;
		const {current, rotatedPadding, isLegendRight, isLegendInset} = state;
		const isRotated = config.axis_rotated;
		const isFitPadding = config.padding?.mode === "fit";
		const isInner = config[`axis_${id}_inner`];
		const hasLabelText = config[`axis_${id}_label`].text;
		let h = config.padding?.mode === "fit" ? (isInner && !hasLabelText ? (id === "y" ? 1 : 0) : 20) : 30;

		if (id === "x" && !config.axis_x_show) {
			return 8;
		}

		if (id === "x" && config.axis_x_height) {
			return config.axis_x_height;
		}

		if (id === "y" && !config.axis_y_show) {
			return config.legend_show &&
				!isLegendRight &&
				!isLegendInset ? 10 : 1;
		}

		if (id === "y2" && !config.axis_y2_show) {
			return isFitPadding ? 0 : rotatedPadding.top;
		}

		const rotate = $$.getAxisTickRotate(id);

		// Calculate x/y axis height when tick rotated
		if (
			((id === "x" && !isRotated) || (/y2?/.test(id) && isRotated)) && rotate
		) {
			h = 30 +
				$$.axis.getMaxTickWidth(id) *
				Math.cos(Math.PI * (90 - Math.abs(rotate)) / 180);

			if (!config.axis_x_tick_multiline && current.height) {
				if (h > current.height / 2) {
					h = current.height / 2;
				}
			}
		}

		return h +
			($$.axis.getLabelPositionById(id).isInner ? 0 : 10) +
			(id === "y2" && !isRotated ? -10 : 0);
	},

	getEventRectWidth(): number {
		const $$ = this;
		const {config, axis} = $$;
		const isInverted = config.axis_x_inverted;
		const tickInterval = axis.x.tickInterval();

		return Math.max(0, isInverted ? Math.abs(tickInterval) : tickInterval);
	},

	/**
	 * Get axis tick test rotate value
	 * @param {string} id Axis id
	 * @returns {number} rotate value
	 * @private
	 */
	getAxisTickRotate(id: AxisType): number {
		const $$ = this;
		const {axis, config, state, $el} = $$;
		let rotate = config[`axis_${id}_tick_rotate`];

		if (id === "x") {
			const allowedXAxisTypes = axis.isCategorized() || axis.isTimeSeries();

			if (config.axis_x_tick_fit && allowedXAxisTypes) {
				const xTickCount = config.axis_x_tick_count;
				const currentXTicksLength = state.current.maxTickWidths.x.ticks.length;
				let tickCount = 0;

				if (xTickCount) {
					tickCount = xTickCount > currentXTicksLength ? currentXTicksLength : xTickCount;
				} else if (currentXTicksLength) {
					tickCount = currentXTicksLength;
				}

				if (tickCount !== state.axis.x.tickCount) {
					const {targets} = $$.data;

					state.axis.x.padding = $$.getXDomainPadding([
						$$.getXDomainMinMax(targets, "min"),
						$$.getXDomainMinMax(targets, "max")
					], tickCount);
				}

				state.axis.x.tickCount = tickCount;
			}

			if ($el.svg &&
				config.axis_x_tick_fit &&
				!config.axis_x_tick_multiline &&
				!config.axis_x_tick_culling &&
				config.axis_x_tick_autorotate &&
				allowedXAxisTypes
			) {
				rotate = $$.needToRotateXAxisTickTexts() ?
					config.axis_x_tick_rotate : 0;
			}
		}

		return rotate;
	},

	/**
	 * Check weather axis tick text needs to be rotated
	 * @returns {boolean}
	 * @private
	 */
	needToRotateXAxisTickTexts(): boolean {
		const $$ = this;
		const {state: {axis, current}} = $$;
		const xAxisLength = current.width -
			$$.getCurrentPaddingLeft(false) - $$.getCurrentPaddingRight();
		const tickCountWithPadding = axis.x.tickCount +
			axis.x.padding.left + axis.x.padding.right;

		const maxTickWidth = $$.axis.getMaxTickWidth("x");
		const tickLength = tickCountWithPadding ? xAxisLength / tickCountWithPadding : 0;

		return maxTickWidth > tickLength;
	}
};
