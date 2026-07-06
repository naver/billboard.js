/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
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
class State {
    constructor() {
        return {
            // chart drawn area dimension, excluding axes
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
            // for data CSS rule index (used when boost.useCssRule is true)
            cssRule: {},
            // Data loading state (used in scale calculation)
            loading: undefined,
            // Zoom/subchart domain (different from current.domain which is for rendering)
            domain: undefined,
            current: {
                // current domain value. Assigned when is zoom is called
                domain: undefined,
                // chart whole dimension
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
                    y: { width: 0, height: 0, domain: "" },
                    y2: { width: 0, height: 0, domain: "" }
                },
                // current used chart type list
                types: [],
                needle: undefined, // arc needle current value
                zoomDomain: null // zoomed domain value
            },
            // legend
            isLegendRight: false,
            isLegendInset: false,
            isLegendTop: false,
            isLegendLeft: false,
            legendStep: 0,
            legendItemWidth: 0,
            legendItemHeight: 0,
            legendHasRendered: false,
            canvasInlineStyle: {
                minHeight: ""
            },
            canvasSelection: new Set(),
            canvasSelectionDragStart: null,
            canvasSelectionDragIncluded: new Set(),
            canvasSelectionDragging: false,
            canvasSelectionDragMoved: false,
            canvasSelectionDragMoveHandler: null,
            canvasSelectionDragEndHandler: null,
            eventReceiver: {
                currentIdx: -1, // current event interaction index
                rect: {}, // event rect's clientBoundingRect
                data: [], // event data bound of previoous eventRect
                coords: [] // coordination value of previous eventRect
            },
            axis: {
                x: {
                    padding: { left: 0, right: 0 },
                    tickCount: 0
                }
            },
            rotatedPadding: {
                left: 30,
                right: 0,
                top: 5
            },
            withoutFadeIn: {},
            inputType: "",
            datetimeId: "",
            // clip id string
            clip: {
                id: "",
                idXAxis: "",
                idYAxis: "",
                idXAxisTickTexts: "",
                idGrid: "",
                idSubchart: "", // clipIdForSubchart
                path: "",
                pathXAxis: "",
                pathYAxis: "",
                pathXAxisTickTexts: "",
                pathGrid: ""
            },
            // state
            event: null, // event object
            dragStart: null,
            dragging: false,
            flowing: false,
            cancelClick: false,
            mouseover: false,
            rendered: false,
            transiting: false,
            redrawing: false, // if redraw() is on process
            resizing: false, // resize event called
            toggling: false, // legend toggle
            zooming: false,
            hasNegativeValue: false,
            hasPositiveValue: true,
            orgAreaOpacity: "0.2",
            orgConfig: {}, // user original genration config
            // ID strings (Set for O(1) lookup — see isTargetToShow, classFocused, etc.)
            hiddenTargetIds: new Set(),
            hiddenLegendIds: new Set(),
            focusedTargetIds: new Set(),
            defocusedTargetIds: new Set(),
            // value for Arc
            radius: 0,
            innerRadius: 0,
            outerRadius: undefined,
            innerRadiusRatio: 0,
            gaugeArcWidth: 0,
            radiusExpanded: 0,
            // xgrid attribute
            xgridAttr: {
                x1: null,
                x2: null,
                y1: null,
                y2: null
            },
            // RAF batching for zoom/drag interactions
            pendingRaf: null,
            rafBatchQueue: [],
            // Dirty flags for selective redraw
            dirty: {
                data: false, // data changed (load/unload)
                visibility: false, // show/hide toggled
                size: false // dimensions changed
            },
            // Performance: generation counters for cache invalidation
            redrawGeneration: 0, // increments every redraw (for per-redraw caches)
            dataGeneration: 0, // increments on data/visibility changes (for data-dependent caches)
            // Performance: cached values for reuse within redraw cycle
            _targetsToShow: null,
            _cachedDrawShape: null,
            _canvasVisibleRangeCache: null,
            _canvasXDataTickCache: null,
            _canvasXTickValuesCache: null,
            _eventRectFingerprint: null,
            // Performance: throttle tooltip position updates on mousemove
            _lastTooltipMouse: null,
            // Performance: cached grid focus D3 selection
            _gridFocusEl: null,
            // Performance: generateClass() result cache (series IDs are fixed per chart)
            generateClassCache: new Map()
        };
    }
}

export { State as default };
