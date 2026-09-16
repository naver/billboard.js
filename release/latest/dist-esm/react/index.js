/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { createElement, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
//#region src/react/index.ts
/**
* Resolve chart type from a direct string or resolver function.
* @param {string|function} [type] Chart type value or resolver
* @returns {string|undefined} Chart type string
* @private
*/
function resolveType(type) {
	return typeof type === "function" ? type() : type;
}
/**
* Clone options and apply the optional chart type helper.
* @param {object} options Chart options
* @param {string|function} [type] Chart type value or resolver
* @returns {object} Chart options with resolved type
* @private
*/
function getOptions(options, type) {
	const resolvedType = resolveType(type);
	return {
		...options,
		...resolvedType ? { data: {
			...options.data,
			type: resolvedType
		} } : {}
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
* @example
* // UMD: 'dist/billboard.react.js' exposes the 'BillboardReact' global, holding
* // the same component as both '.Chart' and '.default'. React is expected on the
* // page as the 'React' global, so this path needs a UMD build of React - React
* // 18 and below ship one, React 19 does not.
* <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
* <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
*
* <link rel="stylesheet" href="$YOUR_PATH/billboard.css">
* <script src="$YOUR_PATH/billboard.pkgd.js"><\/script>
* <script src="$YOUR_PATH/billboard.react.js"><\/script>
*
* <div id="root"></div>
* <script>
*   const {Chart} = BillboardReact;
*
*   ReactDOM.createRoot(document.getElementById("root")).render(
*     React.createElement(Chart, {
*       bb,
*       options: {
*         data: {
*           columns: [["data1", 30, 120, 80]],
*           type: "line"
*         }
*       }
*     })
*   );
* <\/script>
*/
const Chart = forwardRef((props, ref) => {
	const container = useRef(null);
	const instance = useRef(null);
	const { bb: billboard, options, type, modules, ...htmlDivProps } = props;
	useEffect(() => {
		if (!billboard || !options) {
			console.warn("Required props('bb' or 'options') are not defined.");
			return;
		}
		modules?.forEach((register) => register());
		const chartOptions = getOptions(options, type);
		chartOptions.bindto = container.current;
		instance.current = billboard.generate(chartOptions);
		return () => {
			instance.current?.destroy();
			instance.current = null;
		};
	}, []);
	useImperativeHandle(ref, () => ({ get instance() {
		return instance.current;
	} }), []);
	return createElement("div", {
		...htmlDivProps,
		ref: container
	});
});
//#endregion
export { Chart, Chart as default };
