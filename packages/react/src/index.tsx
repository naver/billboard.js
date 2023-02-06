/**
 * Copyright (c) 2022 ~ present NAVER Corp.
 * @billboard.js/react project is licensed under the MIT license
 */
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import type {bb, Chart, ChartOptions} from "billboard.js";

export {ChartOptions as IChartOptions};

export interface IProp {
	bb: typeof bb;
	options: ChartOptions;
}

export interface IChart {
	instance: Chart;
}

export default forwardRef<IChart, IProp>((props, ref) => {
	const container = useRef<HTMLDivElement>(null);
	const instance = useRef<Chart | null>();
	const {bb, options: {...options}} = props;

	// generate chart
	const generate = () => {
		if (!instance.current) {
			options.bindto = container.current;

			// generate chart
			instance.current = bb.generate(options);
		}
	};

	useEffect(() => {
		if (!bb || !options) {
			// eslint-disable-next-line no-console
			console.warn("Required props('bb' or 'options') are not defined.");
		} else {
			generate();
		}

		// cleanup
		return () => {
			if (instance.current) {
				instance.current.destroy();
				instance.current = null;
			}
		};
	}, []);

	// customize ref to return the chart instance
	useImperativeHandle(
		ref, () => ({
			get instance() {
				return instance.current as Chart;
			}
		})
	);

	return <div ref={container} />;
});
