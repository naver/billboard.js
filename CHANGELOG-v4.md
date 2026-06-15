# v4 release notes

## Summary

v4 extracts five more API modules (`exportApi`, `flow`, `grid`, `regions`, `category`) out of the
default bundle into opt-in resolvers. ESM consumers get a smaller bundle; UMD consumers see no
change.

For the persistent guide on **how to import modules**, see [MODULE_IMPORTS.md](./MODULE_IMPORTS.md)
— that document is the canonical reference and is linked from runtime error messages.

## BREAKING CHANGES

### ESM: optional APIs require explicit import

The following modules are no longer auto-included in ESM builds. Import and invoke the resolver to
enable the corresponding chart method.

| Module | Chart method(s) | Internal effect |
| --- | --- | --- |
| `exportApi` | `chart.export()` | — |
| `flow` | `chart.flow()` | `flow` transition renderer |
| `grid` | `chart.xgrids()` / `chart.ygrids()` | Grid lines & grid-focus renderer |
| `regions` | `chart.regions()` | Region renderer |
| `category` | `chart.category()` / `chart.categories()` | — |

Previously, `grid`, `regions`, and `category` came bundled with any axis-based chart (via the axis
resolver), and `exportApi`/`flow` were installed unconditionally by the core Chart class. All five
are now independent resolvers exported from `billboard.js`.

**UMD users are unaffected.** The UMD entry auto-invokes all five resolvers.

### Migration (ESM only)

```diff
- import bb, {bar} from "billboard.js";
+ import bb, {bar, grid, regions, category, exportApi, flow} from "billboard.js";

  const chart = bb.generate({
+   ...grid(),
+   ...regions(),
+   ...category(),
+   ...exportApi(),
+   ...flow(),
    data: { type: bar(), columns: [...] },
    grid:    { x: { lines: [...] } },
    regions: [{ start: 1, end: 2 }]
  });

  chart.xgrids([...]);
  chart.regions([...]);
  chart.export();
  chart.flow({ columns: [...] });
```

Only import what you use — see [MODULE_IMPORTS.md](./MODULE_IMPORTS.md) for the full catalogue.
Missing imports surface an explicit runtime error instead of a generic `TypeError: chart.xxx is not
a function`.

## Bundle size impact

> **At a glance**: if you upgrade to v4 and don't import any of the five modules newly separated in
> this release (`exportApi`, `flow`, `grid`, `regions`, `category`), your ESM bundle drops by
> roughly **~19 KB minified / ~6.3 KB gzipped** vs v3 for the same chart (≈ 6.5–7 % of a minimal bar
> chart bundle).

Measured with `esbuild --bundle --minify --tree-shaking=true` on a minimal bar chart entry. Each row
adds only the named module to the baseline.

| Configuration | Minified | Gzipped |
| :--- | ---: | ---: |
| bar only (no optional modules) | `260,006 B` | `90,657 B` |
| bar + `grid()` | `268,212 B` (`+8,206`) | `93,157 B` (`+2,500`) |
| bar + `flow()` | `264,236 B` (`+4,230`) | `92,128 B` (`+1,471`) |
| bar + `regions()` | `263,131 B` (`+3,125`) | `91,718 B` (`+1,061`) |
| bar + `exportApi()` | `262,839 B` (`+2,833`) | `91,861 B` (`+1,204`) |
| bar + `category()` | `260,507 B` (`+501`) | `90,847 B` (`+190`) |
| **bar + all 5 v4-separated modules** | **`278,897 B`** (`+18,891`) | **`96,969 B`** (`+6,312`) |

When none of the five modules are imported, the ESM bundle shrinks by approximately
**19 KB minified / 6.3 KB gzipped** compared to v3 (where all five were auto-bundled). By individual
contribution: `grid` is the largest (~8 KB / 2.5 KB gzip), followed by `flow` (~4 KB / 1.5 KB gzip),
`regions` (~3 KB / 1 KB gzip), `exportApi` (~2.8 KB / 1.2 KB gzip), and `category` (~0.5 KB,
negligible).

Actual savings vary with bundler, minifier, and other features in use.

## Internal changes (contributor-facing)

To keep axis-based charts working when `grid` / `regions` resolvers aren't imported, shared call
sites now use optional chaining. These changes are transparent to end users but relevant if you
contribute to the rendering pipeline:

- `ChartInternal/internals/redraw.ts` — `hasGrid?.()`, `updateGrid?.()`, `updateRegion?.()`, guards
  for `redrawGrid` / `redrawRegion` / `updateGridFocus`
- `ChartInternal/interactions/eventrect.ts` — `showGridFocus?.()`, `hideGridFocus?.()`
- `ChartInternal/interactions/flow.ts` — `hideGridFocus?.()`
- `ChartInternal/ChartInternal.ts` — `initGrid?.()`, `initRegion?.()`

The axis resolver (`src/config/resolver/axis.ts`) no longer imports `apiGrid`, `apiRegion`,
`apiCategory`, or the internal `grid` / `region` renderers.

## Canvas rendering mode

v4 adds an opt-in canvas rendering path for high-density axis charts. ESM consumers can import from
the canvas entry and enable the renderer with `canvas()`:

```js
import bb, {bar, canvas} from "billboard.js/canvas";

const chart = bb.generate({
  render: {
    mode: canvas()
  },
  data: {
    columns: [
      ["data1", 30, 200, 100, 400]
    ],
    type: bar()
  }
});
```

The `/canvas` entry is a tree-shaking entry, not the runtime switch itself. The renderer switches to
canvas only when `render.mode` is set from `canvas()`. Shape resolvers imported from
`billboard.js/canvas` install canvas-compatible shape modules and options without importing the SVG
shape renderers. Importing the same shape resolver from `billboard.js` keeps the SVG resolver path.

The canvas entry also re-exports optional API resolvers. `category()`, `grid()`, `regions()`,
`exportApi()`, and `flow()` are supported in canvas mode. `selection()`, `subchart()`, and `zoom()`
can be imported from the same entry and are canvas-compatible.

```js
import bb, {
  bar,
  canvas,
  category,
  exportApi,
  flow,
  grid,
  regions,
  subchart
} from "billboard.js/canvas";

const chart = bb.generate({
  render: {
    mode: canvas()
  },
  ...category(),
  ...exportApi(),
  ...flow(),
  ...grid(),
  ...regions(),
  data: {
    columns: [
      ["data1", 30, 200, 100, 400]
    ],
    type: bar()
  },
  axis: {
    x: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr"]
    }
  },
  grid: {
    x: {show: true, lines: [{value: "Feb", text: "Milestone"}]},
    y: {show: true}
  },
  regions: [
    {axis: "x", start: "Feb", end: "Mar", label: {text: "Campaign"}}
  ],
  subchart: {
    show: subchart()
  }
});

chart.xgrids([{value: "Mar", text: "API grid"}]);
chart.regions([{axis: "x", start: "Jan", end: "Feb"}]);
chart.flow({columns: [["data1", 120]]});
chart.export();
```

Canvas interactions now cover mouse, pointer, and touch tooltip/focus flows, including grouped
x-index hover over the plot or x-axis tick band. The canvas path dispatches `data.onover`,
`data.onout`, and `data.onclick` from the canvas surface. `selection()` supports `chart.select()`,
`chart.unselect()`, `chart.selected()`, click toggling, grouped selection, and draggable selection.
Draggable selection is intentionally disabled when `zoom.enabled` is also true to avoid gesture
conflicts.

`zoom()` supports the same canvas data/domain redraw path for API zoom, wheel zoom, drag zoom, pinch
zoom, and touch pan on axis charts. Canvas zoom redraws the x axis from the zoomed data domain,
clips data and tick rendering to the plot range, and draws the drag-zoom brush on top of the cached
canvas frame. Non-axis charts such as `treemap` remain non-zoomable, matching SVG behavior.

`subchart()` supports the canvas overview area, `subchart.init.range`, programmatic
`chart.subchart([min, max])`, `chart.subchart.reset()`, show/hide/toggle, mouse brush selection,
dragging the selected brush range, resizing from brush handles, outside-click reset, and subchart
x-axis tick rendering. `flow()` mutates data through the same append/trim/domain rules as the SVG API
and then renders the final canvas frame without transition animation.

Canvas mode keeps geometry and data calculations shared with SVG renderers. Common path, geometry,
and shape helper modules live under `src/ChartInternal/shape/core`, while renderer-specific drawing
code stays under `src/canvas` or the existing SVG shape modules. This keeps SVG-only rendering code
tree-shakeable when `canvas()` is not imported, and keeps canvas-only drawing code out of the
default SVG ESM path.

Supported canvas chart types:

- `line`
- `spline`
- `step`
- `area`
- `area-line-range`
- `area-spline`
- `area-spline-range`
- `area-step`
- `area-step-range`
- `bar`
- `scatter`
- `bubble`
- `candlestick`
- `treemap`

Shape-specific options are mapped to the same shared calculations used by SVG where possible,
including grouped `area` / `bar`, `line.step.type`, `spline.interpolation.type`, area range values,
`bubble.maxR`, `scatter.zerobased`, `candlestick.width`, `candlestick.color.down`, `treemap.tile`,
`treemap.label.*`, `bar.radius`, and `bar.radius.ratio`.

Canvas shape parity also covers `area.front`, `bar.front`, `area.linearGradient`,
`bar.linearGradient`, `color.onover`, `background.color`, and `background.imgUrl`, matching SVG
layer ordering and hover/background rendering for supported axis charts.

Point options such as `point.r`, `point.type`, built-in `point.pattern` entries (`circle`, `rect`,
`rectangle`), custom SVG `point.pattern` strings, `point.opacity`, `point.radialGradient`,
`point.focus.*`, `point.focus.only`, and `point.sensitivity` are handled by the canvas renderer and
hit detector. Data label support includes label text, label colors, positive/negative bar label
positioning, rotated labels, centered labels, label background colors, label borders, and cached
label images.

Axis and layout support now includes `axis.rotated`, `axis.x.type="category"`,
`axis.x.type="timeseries"`, `axis.x.type="log"`, `axis.y.type="log"`, `axis.y.type="timeseries"`,
`axis.y2`, `axis.y2.type="log"`, `axis.y2.type="timeseries"`, `axis.*.tick.inner`,
`axis.*.tick.text.inner`, axis-specific tick text CSS sizing for `axis.evalTextSize`, SVG-parity
axis padding, and the HTML legend kept outside the canvas drawing surface.

Canvas mode also supports `grid.x/y.show`, `grid.x/y.lines`, `chart.xgrids()`, `chart.ygrids()`,
focused grid lines, global `regions`, `chart.regions()`, per-target `data.regions`, category /
timeseries / log grid and region values, and the optional `category`, `exportApi`, `grid`, and
`regions` API resolvers from the canvas ESM entry. `chart.export()` returns the current canvas frame
as a data URL in canvas mode.

X tick text and tick-line culling follow the SVG axis culling options. Dense x tick lines are culled
when adjacent line intervals overlap, so high-density data does not render a visually thick axis
band.

Unlike SVG rendering, canvas mode does not create one DOM element per shape, axis tick, grid line,
or label. CSS selectors such as `.bb-line`, `.bb-bar`, `.bb-axis .tick text`, or per-target
generated classes cannot be applied directly to individual canvas-drawn primitives after rendering.

Canvas mode reads supported theme values from SVG CSS probes during initialization and resize, then
draws pixels with the resolved values. Current probes include baseline axis/grid/shape/text styles,
axis-specific tick text fonts, focus grid styles, selected/focused point styles, active x tick text
(`.tick._active_ text`), expanded bar / candlestick opacity (`.bb-bar._expanded_`,
`.bb-candlestick._expanded_`), and HTML legend point styles. Style customization should therefore
use chart options, supported CSS theme defaults, or `canvas.theme.selectors` overrides rather than
relying on direct per-node SVG CSS styling.
See [`CANVAS_THEME_SELECTORS.md`](./CANVAS_THEME_SELECTORS.md) for the supported selector,
CSS property, and direct override key list.

```js
bb.generate({
  render: {
    mode: canvas()
  },
  canvas: {
    theme: {
      selectors: {
        ".bb-axis .tick text": {fill: "#555", font: "12px sans-serif"},
        ".bb-grid line": {stroke: "#ddd", "stroke-width": 1},
        ".bb-bar": {stroke: "#fff", "stroke-width": 1}
      }
    }
  },
  data: {
    columns: [
      ["data1", 30, 200, 100, 400]
    ],
    type: bar()
  }
});
```

Canvas drawing internals:

- `src/canvas/CanvasEngine.ts` (`CanvasEngine`) owns the canvas element, DPR scaling, frame
  capture, and focus frame restore.
- `src/canvas/CanvasAxisRenderer.ts` (`CanvasAxisRenderer`) and `src/canvas/CanvasRenderer.ts`
  (`CanvasRenderer`) keep geometry and layer ordering.
- `src/canvas/CanvasPainter.ts` (`CanvasPainter`) centralizes primitive canvas operations such as
  state isolation, clipping, path fill/stroke, rectangles, text, points, and crisp line coordinates.
  This keeps direct `CanvasRenderingContext2D` drawing calls out of feature renderers while avoiding
  a retained command-object layer.
- `src/canvas/CanvasTheme.ts` (`CanvasTheme`) resolves canvas drawing styles from the active SVG
  CSS theme probes, with `config.canvas.theme` overrides applied on top.
- `src/canvas/HitDetector.ts` builds spatial hit-test indexes for bars, points, candlesticks, and
  treemap tiles.
- `src/canvas/geometry.ts` shares canvas geometry extraction for bar and candlestick rendering /
  hit detection.
- `src/canvas/util.ts` contains canvas target-type predicates, grouped-target support checks, shape
  index lookup, and coordinate guards shared by render and hit-test code.

### Canvas benchmark snapshot

The following numbers are a local benchmark snapshot, not a release guarantee. They were measured in Chromium headless against rebuilt local UMD bundles from the `3.18.0` tag and the current v4 branch with one warmup run and three measured runs on 2026-06-15. Values are median elapsed time in milliseconds.

The benchmark uses the public benchmark demo defaults where applicable: `1 x 10,000` data matrix, `transition.duration=0`, `legend.show=false`, `axis.x.tick.show=false`, and `boost.useWorker=false`.
Line-like charts keep the default point rendering cost, matching the demo behavior rather than a
path-only micro-benchmark. Canvas-unsupported types are intentionally left blank in the canvas
column.

Simple averages below use the nine canvas-supported demo types so the SVG and canvas summaries are compared over the same chart set:

- Initial render: 4.0 SVG is **62.8% faster** than 3.18.0; 4.0 canvas is **94.8% faster**.
- `chart.load()`: 4.0 SVG is **75.9% faster** than 3.18.0; 4.0 canvas is **63.9% faster**.
- `chart.resize()`: 4.0 SVG is **54.9% slower** than 3.18.0; 4.0 canvas is **125.2% slower**,
  mainly from the current area-family canvas path.

#### Initial render

Initial render is measured from `bb.generate()` start through the first `onrendered` callback.

| type | data matrix | 3.18.0 | 4.0 (svg) | 4.0 (canvas) |
| --- | ---: | ---: | ---: | ---: |
| `area` | 1 x 10,000 | 1109.6 ms | 402.0 ms | 108.5 ms |
| `area-spline` | 1 x 10,000 | 1096.3 ms | 414.1 ms | 130.7 ms |
| `area-step` | 1 x 10,000 | 1134.1 ms | 424.8 ms | 109.3 ms |
| `bar` | 1 x 10,000 | 1146.4 ms | 460.9 ms | 53.3 ms |
| `bubble` | 1 x 10,000 | 1322.9 ms | 449.7 ms | 57.1 ms |
| `donut` | 1 x 10,000 | 10.3 ms | 11.0 ms |  |
| `gauge` | 1 x 10,000 | 13.9 ms | 14.0 ms |  |
| `line` | 1 x 10,000 | 1090.6 ms | 390.0 ms | 19.3 ms |
| `pie` | 1 x 10,000 | 14.4 ms | 11.2 ms |  |
| `radar` | 1 x 10,000 | 6810.3 ms | 5376.7 ms |  |
| `scatter` | 1 x 10,000 | 1277.4 ms | 483.1 ms | 25.4 ms |
| `spline` | 1 x 10,000 | 1081.7 ms | 412.0 ms | 20.2 ms |
| `step` | 1 x 10,000 | 1095.7 ms | 411.9 ms | 19.0 ms |

#### Data loading

`chart.load()` is measured from `chart.load({columns})` start through the `done` callback.

| type | data matrix | 3.18.0 | 4.0 (svg) | 4.0 (canvas) |
| --- | ---: | ---: | ---: | ---: |
| `area` | 1 x 10,000 | 812.4 ms | 203.8 ms | 878.6 ms |
| `area-spline` | 1 x 10,000 | 810.8 ms | 204.1 ms | 774.5 ms |
| `area-step` | 1 x 10,000 | 804.9 ms | 202.2 ms | 840.4 ms |
| `bar` | 1 x 10,000 | 848.3 ms | 229.5 ms | 51.2 ms |
| `bubble` | 1 x 10,000 | 912.5 ms | 195.8 ms | 54.9 ms |
| `donut` | 1 x 10,000 | 1.7 ms | 1.8 ms |  |
| `gauge` | 1 x 10,000 | 2.0 ms | 2.0 ms |  |
| `line` | 1 x 10,000 | 830.5 ms | 201.1 ms | 22.3 ms |
| `pie` | 1 x 10,000 | 1.8 ms | 1.8 ms |  |
| `radar` | 1 x 10,000 | 141.7 ms | 157.5 ms |  |
| `scatter` | 1 x 10,000 | 865.5 ms | 192.7 ms | 24.0 ms |
| `spline` | 1 x 10,000 | 790.3 ms | 178.7 ms | 28.6 ms |
| `step` | 1 x 10,000 | 780.9 ms | 191.1 ms | 19.9 ms |

#### Resize

Resize is measured as synchronous `chart.resize({width, height})` elapsed time with transitions
disabled.

| type | data matrix | 3.18.0 | 4.0 (svg) | 4.0 (canvas) |
| --- | ---: | ---: | ---: | ---: |
| `area` | 1 x 10,000 | 100.9 ms | 174.8 ms | 773.3 ms |
| `area-spline` | 1 x 10,000 | 99.3 ms | 199.8 ms | 619.9 ms |
| `area-step` | 1 x 10,000 | 98.5 ms | 166.8 ms | 774.4 ms |
| `bar` | 1 x 10,000 | 129.6 ms | 203.9 ms | 43.0 ms |
| `bubble` | 1 x 10,000 | 194.7 ms | 203.6 ms | 49.6 ms |
| `donut` | 1 x 10,000 | 0.2 ms | 0.2 ms |  |
| `gauge` | 1 x 10,000 | 0.2 ms | 0.2 ms |  |
| `line` | 1 x 10,000 | 89.8 ms | 160.8 ms | 16.0 ms |
| `pie` | 1 x 10,000 | 0.2 ms | 0.1 ms |  |
| `radar` | 1 x 10,000 | 140.0 ms | 135.6 ms |  |
| `scatter` | 1 x 10,000 | 146.4 ms | 179.8 ms | 18.8 ms |
| `spline` | 1 x 10,000 | 83.8 ms | 156.5 ms | 21.9 ms |
| `step` | 1 x 10,000 | 92.0 ms | 156.8 ms | 13.5 ms |

The result shows two separate effects. The v4 SVG path is substantially faster than 3.18.0 for
node-heavy axis charts in initial render and `chart.load()`. Canvas then gives another large gain
for line, spline, step, bar, bubble, and scatter because those charts avoid per-point or per-shape
SVG nodes. The current area-family canvas path is faster for initial render, but `chart.load()` and
resize are still optimization candidates.

Canvas parity scope:

Canvas rendering is focused on high-density axis charts where reducing SVG node count gives a
measurable benefit. Arc-family charts (`pie`, `donut`, `gauge`, and `polar`) remain SVG-only by
design because they typically have a small DOM surface and do not benefit enough from a parallel
canvas renderer. `radar` and `funnel` are also kept SVG-only unless a concrete high-density use case
appears.

Current SVG parity backlog and implementation plan:

- Remaining SVG-specific visuals
  - Current canvas behavior: canvas supports common theme probes, custom SVG point patterns, label
    background/border/image drawing, selected/focused point styles, active x tick text, and expanded
    bar opacity. Arbitrary per-node SVG CSS selectors still cannot affect already drawn pixels.
  - Implementation plan: continue adding explicit CSS probes only for stable SVG class semantics
    that map cleanly to canvas drawing state. Prefer chart options and `canvas.theme.selectors`
    overrides for style customization.
- Canvas performance candidates
  - Current canvas behavior: canvas is faster for many node-heavy shapes, but some paths still
    redraw more than necessary. Bar/candlestick focus currently redraws the focused frame so
    expanded opacity matches SVG.
  - Implementation plan: profile `area`, `treemap`, dense tick generation, and focused bar redraws.
    Add optimizations only after SVG parity and regression tests are in place.

Each completed parity item should remove the corresponding `warnUnsupportedCanvasOptions()` warning,
update the canvas ESM exports when API surface changes, and add SVG-vs-canvas regression coverage.

## Previous major versions

- v2: [CHANGELOG-v2.md](./CHANGELOG-v2.md)
- Per-release entries: [CHANGELOG.md](./CHANGELOG.md)
