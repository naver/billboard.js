/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {HTMLProps} from "react";
import {createElement, forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import type {bb, Chart as BillboardChart, ChartOptions} from "../../types";
import type {ChartTypes} from "../../types/types";

export type {ChartOptions as IChartOptions};

export type ChartTypeResolver = () => ChartTypes;
export type ChartModuleResolver = () => unknown;

export interface IProp extends Pick<HTMLProps<HTMLDivElement>, "className" | "style"> {
	bb: typeof bb;
	options: ChartOptions;
	type?: ChartTypes | ChartTypeResolver;
	modules?: ChartModuleResolver[];
}

export interface IChart {
	instance: BillboardChart;
}

/**
 * Resolve chart type from a direct string or resolver function.
 * @param {string|function} [type] Chart type value or resolver
 * @returns {string|undefined} Chart type string
 * @private
 */
function resolveType(type?: IProp["type"]): ChartTypes | undefined {
	return typeof type === "function" ? type() : type;
}

/**
 * Clone options and apply the optional chart type helper.
 * @param {object} options Chart options
 * @param {string|function} [type] Chart type value or resolver
 * @returns {object} Chart options with resolved type
 * @private
 */
function getOptions(options: ChartOptions, type?: IProp["type"]): ChartOptions {
	const resolvedType = resolveType(type);

	return {
		...options,
		...(resolvedType ?
			{
				data: {
					...options.data,
					type: resolvedType
				}
			} :
			{})
	};
}

/**
 * React component wrapper for billboard.js.
 * @module billboard.js/react
 * @description
 * Use the `billboard.js/react` subpath to render billboard.js charts in React.
 * The component preserves the existing `ChartOptions` API and receives the
 * billboard namespace through the `bb` prop, so importing this React subpath
 * does not pull the root billboard.js bundle into non-React user bundles.
 * @example
 * import bb, {line} from "billboard.js";
 * import BillboardJS from "billboard.js/react";
 *
 * <BillboardJS
 *   bb={bb}
 *   options={{
 *     data: {
 *       columns: [["data1", 30, 120, 80]],
 *       type: line()
 *     }
 *   }}
 * />;
 * @example
 * import bb, {canvas, line} from "billboard.js/canvas";
 * import BillboardJS from "billboard.js/react";
 *
 * <BillboardJS
 *   bb={bb}
 *   type={line}
 *   modules={[canvas]}
 *   style={{
 *     width: "480px",
 *     height: "320px"
 *   }}
 *   options={{
 *     render: {
 *       mode: "canvas"
 *     },
 *     size: {
 *       width: 480,
 *       height: 320
 *     },
 *     data: {
 *       columns: [["data1", 30, 120, 80]]
 *     }
 *   }}
 * />;
 * @example
 * import bb, {line, zoom} from "billboard.js";
 * import {Chart} from "billboard.js/react";
 *
 * <Chart
 *   bb={bb}
 *   type={line}
 *   modules={[zoom]}
 *   options={{
 *     data: {
 *       columns: [["data1", 30, 120, 80]]
 *     },
 *     zoom: {
 *       enabled: true
 *     }
 *   }}
 * />;
 */
const Chart = forwardRef<IChart, IProp>((props, ref) => {
	const container = useRef<HTMLDivElement>(null);
	const instance = useRef<BillboardChart | null>(null);
	const {bb: billboard, options, type, modules, ...htmlDivProps} = props;

	useEffect(() => {
		if (!billboard || !options) {
			// eslint-disable-next-line no-console
			console.warn("Required props('bb' or 'options') are not defined.");
			return;
		}

		modules?.forEach(register => register());

		const chartOptions = getOptions(options, type);

		chartOptions.bindto = container.current;
		instance.current = billboard.generate(chartOptions);

		return () => {
			instance.current?.destroy();
			instance.current = null;
		};
	}, []);

	useImperativeHandle(
		ref,
		() => ({
			get instance() {
				return instance.current as BillboardChart;
			}
		}),
		[]
	);

	return createElement("div", {
		...htmlDivProps,
		ref: container
	});
});

export {Chart};
export default Chart;
