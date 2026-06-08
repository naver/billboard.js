# Canvas Theme Selector Reference

Canvas mode renders chart primitives into a canvas, so SVG DOM nodes such as
`.bb-bar-0` or `.bb-target-data1 .bb-bar` do not exist as styleable elements. Use
`canvas.theme.selectors` to map supported billboard.js SVG selectors to canvas drawing styles.

```js
bb.generate({
  render: {
    mode: "canvas"
  },
  canvas: {
    theme: {
      selectors: {
        ".bb-axis .tick text": {
          fill: "#555",
          font: "12px sans-serif"
        },
        ".bb-grid line": {
          stroke: "#ddd",
          "stroke-width": 1,
          "stroke-dasharray": "2 2"
        },
        ".bb-bar": {
          stroke: "#fff",
          "stroke-width": 1
        }
      }
    }
  }
});
```

`canvas.theme.selectors` is a compatibility mapping, not a full CSS selector engine.
Unsupported selectors are ignored. CSS property names can be written in kebab-case or camelCase,
for example `"stroke-width"` or `strokeWidth`. Comma-separated selector groups are supported.

Direct `canvas.theme` keys are still available as an advanced override. When both selector
overrides and direct keys are provided, direct keys take precedence.

## Supported Selectors

### Axis

| Selector | Supported properties | Applies to |
| --- | --- | --- |
| `.bb-axis path.domain` | `stroke`, `stroke-width` | Axis domain line |
| `.bb-axis .domain` | `stroke`, `stroke-width` | Axis domain line |
| `.bb-axis-x path.domain` | `stroke`, `stroke-width` | X axis domain line |
| `.bb-axis-x .domain` | `stroke`, `stroke-width` | X axis domain line |
| `.bb-axis-y path.domain` | `stroke`, `stroke-width` | Y axis domain line |
| `.bb-axis-y .domain` | `stroke`, `stroke-width` | Y axis domain line |
| `.bb-axis-y2 path.domain` | `stroke`, `stroke-width` | Y2 axis domain line |
| `.bb-axis-y2 .domain` | `stroke`, `stroke-width` | Y2 axis domain line |
| `.bb-axis line` | `stroke`, `stroke-width` | Axis tick lines |
| `.bb-axis .tick line` | `stroke`, `stroke-width` | Axis tick lines |
| `.bb-axis-x line` | `stroke`, `stroke-width` | X axis tick lines |
| `.bb-axis-x .tick line` | `stroke`, `stroke-width` | X axis tick lines |
| `.bb-axis-y line` | `stroke`, `stroke-width` | Y axis tick lines |
| `.bb-axis-y .tick line` | `stroke`, `stroke-width` | Y axis tick lines |
| `.bb-axis-y2 line` | `stroke`, `stroke-width` | Y2 axis tick lines |
| `.bb-axis-y2 .tick line` | `stroke`, `stroke-width` | Y2 axis tick lines |
| `.bb-axis text` | `fill`, `font`, font longhands | All axis tick text |
| `.bb-axis .tick text` | `fill`, `font`, font longhands | All axis tick text |
| `.bb-axis-x text` | `fill`, `font`, font longhands | X axis tick text |
| `.bb-axis-x .tick text` | `fill`, `font`, font longhands | X axis tick text |
| `.bb-axis-y text` | `fill`, `font`, font longhands | Y axis tick text |
| `.bb-axis-y .tick text` | `fill`, `font`, font longhands | Y axis tick text |
| `.bb-axis-y2 text` | `fill`, `font`, font longhands | Y2 axis tick text |
| `.bb-axis-y2 .tick text` | `fill`, `font`, font longhands | Y2 axis tick text |
| `.tick._active_ text` | `fill` | Active x tick text |
| `.bb-axis .tick._active_ text` | `fill` | Active x tick text |
| `.bb-axis-x .tick._active_ text` | `fill` | Active x tick text |
| `.bb-axis-x-label` | `fill`, `font`, font longhands | X axis title |
| `.bb-axis-x .bb-axis-x-label` | `fill`, `font`, font longhands | X axis title |
| `.bb-axis-y-label` | `fill`, `font`, font longhands | Y axis title |
| `.bb-axis-y .bb-axis-y-label` | `fill`, `font`, font longhands | Y axis title |
| `.bb-axis-y2-label` | `fill`, `font`, font longhands | Y2 axis title |
| `.bb-axis-y2 .bb-axis-y2-label` | `fill`, `font`, font longhands | Y2 axis title |

Font longhands are `font-size`, `font-family`, `font-style`, `font-variant`, `font-weight`, and
`line-height`.

### Grid And Regions

| Selector | Supported properties | Applies to |
| --- | --- | --- |
| `.bb-grid line` | `stroke`, `stroke-width`, `stroke-dasharray` | Grid lines |
| `.bb-grid .bb-xgrid` | `stroke`, `stroke-width`, `stroke-dasharray` | X grid lines |
| `.bb-grid .bb-ygrid` | `stroke`, `stroke-width`, `stroke-dasharray` | Y grid lines |
| `.bb-xgrid` | `stroke`, `stroke-width`, `stroke-dasharray` | X grid lines |
| `.bb-ygrid` | `stroke`, `stroke-width`, `stroke-dasharray` | Y grid lines |
| `.bb-grid text` | `fill`, `font`, font longhands | Optional grid labels |
| `.bb-xgrid-focus line` | `stroke`, `stroke-width`, `stroke-dasharray` | Focus grid line |
| `.bb-grid .bb-xgrid-focus line` | `stroke`, `stroke-width`, `stroke-dasharray` | Focus grid line |
| `.bb-grid .bb-xgrid-focus` | `stroke`, `stroke-width`, `stroke-dasharray` | Focus grid line |
| `.bb-region rect` | `fill`, `opacity`, `fill-opacity` | Regions |
| `.bb-region` | `fill`, `opacity`, `fill-opacity` | Regions |
| `.bb-region text` | `fill`, `font`, font longhands | Region labels |

### Shapes

| Selector | Supported properties | Applies to |
| --- | --- | --- |
| `.bb-bar` | `opacity`, `fill-opacity`, `stroke`, `stroke-width` | Bars |
| `.bb-bar._expanded_` | `opacity`, `fill-opacity` | Focused bars |
| `.bb-candlestick` | `stroke-width` | Candlesticks |
| `.bb-candlestick._expanded_` | `opacity`, `fill-opacity` | Focused candlesticks |
| `.bb-line` | `stroke`, `stroke-width` | Lines and bar connect lines |
| `.bb-target.bb-focused .bb-line` | `stroke-width` | Focused lines |
| `.bb-target.bb-focused path.bb-line` | `stroke-width` | Focused lines |
| `.bb-target.bb-defocused` | `opacity` | Defocused targets |
| `.bb-area` | `opacity`, `fill-opacity` | Areas |
| `.bb-circle` | `fill`, `stroke`, `stroke-width` | Points |
| `.bb-selected-circle` | `fill`, `stroke`, `stroke-width` | Selected points |
| `.bb-circle._expanded_` | `fill`, `stroke`, `stroke-width` | Focused points |
| `.bb-chart-treemaps rect` | `stroke`, `stroke-width` | Treemap tile borders |
| `.bb-chart-treemaps` | `stroke`, `stroke-width` | Treemap tile borders |

### Brushes And Text

| Selector | Supported properties | Applies to |
| --- | --- | --- |
| `.bb-zoom-brush` | `fill`, `opacity`, `fill-opacity` | Zoom brush |
| `.bb-brush .extent` | `fill`, `opacity`, `fill-opacity` | Subchart brush |
| `.bb-brush .selection` | `fill`, `opacity`, `fill-opacity` | Subchart brush |
| `.bb-brush .handle--custom` | `fill`, `opacity`, `fill-opacity`, `stroke`, `stroke-width` | Subchart brush handles |
| `.bb-text.bb-empty` | `fill`, `font`, font longhands | Empty-data label |
| `.bb-text .bb-empty` | `fill`, `font`, font longhands | Empty-data label |
| `.bb-empty` | `fill`, `font`, font longhands | Empty-data label |
| `.bb-text` | `fill`, `font`, font longhands | Data labels |
| `.bb-title` | `fill`, `font`, font longhands | Chart title |

## Direct Override Keys

Direct keys are lower-level canvas drawing slots. Prefer `selectors` for user-facing styling and use
direct keys only when a selector alias is not specific enough.

| Key | Fields |
| --- | --- |
| `axis` | `lineColor`, `lineWidth`, `tickColor`, `tickWidth`, `labelFont`, `xTickFont`, `yTickFont`, `y2TickFont`, `labelColor`, `xLabelColor`, `yLabelColor`, `y2LabelColor`, `activeLabelColor` |
| `grid` | `lineColor`, `lineWidth`, `dashArray`, `labelFont`, `labelColor` |
| `focusGrid` | `lineColor`, `lineWidth`, `dashArray` |
| `emptyLabel` | `font`, `color` |
| `region` | `fill`, `opacity`, `labelFont`, `labelColor` |
| `shape` | `barOpacity`, `barExpandedOpacity`, `barStrokeColor`, `barLineWidth`, `barConnectLineColor`, `barConnectLineWidth`, `candlestickLineWidth`, `candlestickExpandedOpacity`, `lineWidth`, `lineFocusedWidth`, `areaOpacity`, `targetDefocusedOpacity`, `pointFillColor`, `pointStrokeColor`, `pointLineWidth` |
| `selectedPoint` | `fill`, `stroke`, `lineWidth` |
| `focusPoint` | `fill`, `stroke`, `lineWidth` |
| `zoomBrush` | `fill`, `opacity` |
| `subchartBrush` | `fill`, `opacity`, `handleFill`, `handleOpacity`, `handleStroke`, `handleLineWidth` |
| `treemap` | `stroke`, `lineWidth` |
| `label` | `font`, `color` |
| `title` | `font`, `color` |

Example:

```js
bb.generate({
  render: {
    mode: "canvas"
  },
  canvas: {
    theme: {
      selectors: {
        ".bb-grid line": {
          stroke: "#ddd",
          "stroke-width": 1
        }
      },
      grid: {
        lineWidth: 2
      }
    }
  }
});
```

In the example above, `grid.lineWidth` wins over the value mapped from `.bb-grid line`.
