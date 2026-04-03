/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Linear gradient option type for bar and area charts
 * @see [MDN's &lt;linearGradient>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient)
 */
export type LinearGradientOption = boolean | {
	x?: [number, number],
	y?: [number, number],
	stops?: [number, string | null | Function, number][]
};

/**
 * Configuration for initShapeElement
 */
export interface ShapeElementConfig {
	/** Element key in $el (e.g., 'bar', 'line', 'candlestick') */
	elKey: string;
	/** Class name for the container (e.g., $BAR.chartBars) */
	className: string;
	/** CSS rules to apply (e.g., ["pointer-events:none"]) */
	cssRules?: string[];
	/** Insert position: 'append' (default) or 'first' for :first-child */
	position?: "append" | "first";
}

/**
 * Configuration for updateTargetsForShape
 */
export interface UpdateTargetsConfig {
	/** Shape type name (e.g., 'Bar', 'Line', 'Candlestick') */
	type: string;
	/** Element key in $el */
	elKey: string;
	/** Container class (e.g., $BAR.chartBars) */
	containerClass: string;
	/** Individual item class (e.g., $BAR.chartBar) */
	itemClass: string;
	/** Init function to call if element doesn't exist */
	initFn: () => void;
	/** Whether to add classFocus */
	withFocus?: boolean;
	/** Whether to add opacity and pointer-events styles */
	withStyles?: boolean;
}

/**
 * Shape offset interface for bar width calculations
 */
export interface IOffset {
	_$width: number;
	_$total: number[];
}
