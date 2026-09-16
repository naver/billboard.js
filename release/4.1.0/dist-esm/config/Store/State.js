/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
//#region src/config/Store/State.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* State class.
* @class State
* @ignore
* @private
*/
var State = class {
	constructor() {
		return {
			width: 0,
			width2: 0,
			height: 0,
			height2: 0,
			margin: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			},
			margin2: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			},
			margin3: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			},
			arcWidth: 0,
			arcHeight: 0,
			xAxisHeight: 0,
			hasAxis: false,
			hasFunnel: false,
			hasRadar: false,
			hasTreemap: false,
			isCanvasMode: false,
			canvasShape: null,
			canvasFocusKey: null,
			canvasSubchartBrushDragging: false,
			canvasSubchartBrushMode: null,
			canvasSubchartBrushStart: null,
			canvasSubchartBrushOrigin: null,
			canvasSubchartBrushMoved: false,
			canvasFlowFrame: null,
			canvasFlowFinish: null,
			canvasFocusMainRedraw: false,
			cssRule: {},
			loading: void 0,
			domain: void 0,
			subchartSourceTypes: void 0,
			current: {
				domain: void 0,
				width: 0,
				height: 0,
				dataMax: 0,
				maxTickSize: {
					x: {
						width: 0,
						height: 0,
						ticks: [],
						clipPath: 0,
						domain: ""
					},
					y: {
						width: 0,
						height: 0,
						domain: ""
					},
					y2: {
						width: 0,
						height: 0,
						domain: ""
					}
				},
				types: [],
				needle: void 0,
				zoomDomain: null
			},
			isLegendRight: false,
			isLegendInset: false,
			isLegendTop: false,
			isLegendLeft: false,
			legendStep: 0,
			legendItemWidth: 0,
			legendItemHeight: 0,
			legendHasRendered: false,
			canvasInlineStyle: { minHeight: "" },
			canvasSelection: /* @__PURE__ */ new Set(),
			canvasSelectionDragStart: null,
			canvasSelectionDragIncluded: /* @__PURE__ */ new Set(),
			canvasSelectionDragging: false,
			canvasSelectionDragMoved: false,
			canvasSelectionDragMoveHandler: null,
			canvasSelectionDragEndHandler: null,
			eventReceiver: {
				currentIdx: -1,
				rect: {},
				data: [],
				coords: []
			},
			axis: { x: {
				padding: {
					left: 0,
					right: 0
				},
				tickCount: 0
			} },
			rotatedPadding: {
				left: 30,
				right: 0,
				top: 5
			},
			withoutFadeIn: {},
			inputType: "",
			datetimeId: "",
			clip: {
				id: "",
				idXAxis: "",
				idYAxis: "",
				idXAxisTickTexts: "",
				idGrid: "",
				idSubchart: "",
				path: "",
				pathXAxis: "",
				pathYAxis: "",
				pathXAxisTickTexts: "",
				pathGrid: ""
			},
			event: null,
			dragStart: null,
			dragging: false,
			flowing: false,
			cancelClick: false,
			mouseover: false,
			rendered: false,
			transiting: false,
			redrawing: false,
			resizing: false,
			resizePreview: false,
			resizeRedrawTime: 0,
			resizeLiveScale: null,
			toggling: false,
			zooming: false,
			hasNegativeValue: false,
			hasPositiveValue: true,
			orgAreaOpacity: "0.2",
			orgConfig: {},
			hiddenTargetIds: /* @__PURE__ */ new Set(),
			hiddenLegendIds: /* @__PURE__ */ new Set(),
			focusedTargetIds: /* @__PURE__ */ new Set(),
			defocusedTargetIds: /* @__PURE__ */ new Set(),
			radius: 0,
			innerRadius: 0,
			outerRadius: void 0,
			innerRadiusRatio: 0,
			gaugeArcWidth: 0,
			radiusExpanded: 0,
			xgridAttr: {
				x1: null,
				x2: null,
				y1: null,
				y2: null
			},
			pendingRaf: null,
			rafBatchQueue: [],
			dirty: {
				data: false,
				visibility: false,
				size: false
			},
			redrawGeneration: 0,
			dataGeneration: 0,
			_targetsToShow: null,
			_cachedDrawShape: null,
			_canvasVisibleRangeCache: null,
			_canvasXDataTickCache: null,
			_canvasXTickValuesCache: null,
			_eventRectFingerprint: null,
			_lastTooltipMouse: null,
			_gridFocusEl: null,
			generateClassCache: /* @__PURE__ */ new Map()
		};
	}
};
//#endregion
export { State as default };
