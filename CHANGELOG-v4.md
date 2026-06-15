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

The following numbers are a local benchmark snapshot, not a release guarantee. They were measured in
Chromium headless against rebuilt local UMD bundles from the `3.18.0` tag and the current v4 branch
with one warmup run and three measured runs on 2026-06-15. Values are median elapsed time in
milliseconds.

The benchmark uses the public benchmark demo defaults where applicable: `1 x 10,000` data matrix,
`transition.duration=0`, `legend.show=false`, `axis.x.tick.show=false`, and `boost.useWorker=false`.
Line-like charts keep the default point rendering cost, matching the demo behavior rather than a
path-only micro-benchmark. Canvas-unsupported types are intentionally left blank in the canvas
column.

Simple averages below use the nine canvas-supported demo types so the SVG and canvas summaries are
compared over the same chart set:

- Initial render: 4.0 SVG is **60.4% faster** than 3.18.0; 4.0 canvas is **98.0% faster**.
- `chart.load()`: 4.0 SVG is **75.7% faster** than 3.18.0; 4.0 canvas is **97.5% faster**.
- `chart.resize()`: 4.0 SVG is **6.1% faster** than 3.18.0; 4.0 canvas is **87.3% faster**.

#### Initial render

Initial render is measured from `bb.generate()` start through the first `onrendered` callback.

| type | data matrix | 3.18.0 | 4.0 (svg) | 4.0 (canvas) |
| --- | ---: | ---: | ---: | ---: |
| `area` | 1 x 10,000 | 1138.1 ms | 439.5 ms | 25.1 ms |
| `area-spline` | 1 x 10,000 | 1103.6 ms | 417.5 ms | 22.7 ms |
| `area-step` | 1 x 10,000 | 1080.2 ms | 432.8 ms | 21.9 ms |
| `bar` | 1 x 10,000 | 1152.4 ms | 458.3 ms | 44.4 ms |
| `bubble` | 1 x 10,000 | 1330.8 ms | 511.9 ms | 20.1 ms |
| `donut` | 1 x 10,000 | 14.6 ms | 11.9 ms |  |
| `gauge` | 1 x 10,000 | 13.9 ms | 13.9 ms |  |
| `line` | 1 x 10,000 | 1098.3 ms | 447.4 ms | 16.7 ms |
| `pie` | 1 x 10,000 | 9.4 ms | 13.6 ms |  |
| `radar` | 1 x 10,000 | 5472.8 ms | 5333.5 ms |  |
| `scatter` | 1 x 10,000 | 1156.6 ms | 494.8 ms | 16.4 ms |
| `spline` | 1 x 10,000 | 1068.1 ms | 415.7 ms | 17.0 ms |
| `step` | 1 x 10,000 | 1069.0 ms | 422.2 ms | 17.0 ms |

#### Data loading

`chart.load()` is measured from `chart.load({columns})` start through the `done` callback.

| type | data matrix | 3.18.0 | 4.0 (svg) | 4.0 (canvas) |
| --- | ---: | ---: | ---: | ---: |
| `area` | 1 x 10,000 | 801.5 ms | 187.7 ms | 21.2 ms |
| `area-spline` | 1 x 10,000 | 795.5 ms | 206.7 ms | 21.1 ms |
| `area-step` | 1 x 10,000 | 827.1 ms | 205.6 ms | 20.3 ms |
| `bar` | 1 x 10,000 | 857.5 ms | 235.0 ms | 41.8 ms |
| `bubble` | 1 x 10,000 | 899.6 ms | 222.0 ms | 16.8 ms |
| `donut` | 1 x 10,000 | 1.9 ms | 1.9 ms |  |
| `gauge` | 1 x 10,000 | 1.9 ms | 2.0 ms |  |
| `line` | 1 x 10,000 | 808.0 ms | 197.2 ms | 15.3 ms |
| `pie` | 1 x 10,000 | 2.0 ms | 2.0 ms |  |
| `radar` | 1 x 10,000 | 135.5 ms | 132.3 ms |  |
| `scatter` | 1 x 10,000 | 885.0 ms | 202.6 ms | 17.0 ms |
| `spline` | 1 x 10,000 | 804.7 ms | 192.4 ms | 15.6 ms |
| `step` | 1 x 10,000 | 817.7 ms | 175.5 ms | 15.2 ms |

#### Resize

Resize is measured as synchronous `chart.resize({width, height})` elapsed time with transitions
disabled.

| type | data matrix | 3.18.0 | 4.0 (svg) | 4.0 (canvas) |
| --- | ---: | ---: | ---: | ---: |
| `area` | 1 x 10,000 | 94.0 ms | 124.2 ms | 13.8 ms |
| `area-spline` | 1 x 10,000 | 105.5 ms | 116.0 ms | 14.4 ms |
| `area-step` | 1 x 10,000 | 97.5 ms | 105.0 ms | 13.6 ms |
| `bar` | 1 x 10,000 | 132.7 ms | 96.6 ms | 34.8 ms |
| `bubble` | 1 x 10,000 | 165.6 ms | 88.8 ms | 10.3 ms |
| `donut` | 1 x 10,000 | 0.3 ms | 0.3 ms |  |
| `gauge` | 1 x 10,000 | 0.2 ms | 0.5 ms |  |
| `line` | 1 x 10,000 | 84.9 ms | 105.5 ms | 9.9 ms |
| `pie` | 1 x 10,000 | 0.2 ms | 0.3 ms |  |
| `radar` | 1 x 10,000 | 128.6 ms | 209.1 ms |  |
| `scatter` | 1 x 10,000 | 146.6 ms | 89.4 ms | 10.2 ms |
| `spline` | 1 x 10,000 | 86.6 ms | 107.4 ms | 9.9 ms |
| `step` | 1 x 10,000 | 85.7 ms | 105.1 ms | 9.9 ms |

The result shows two separate effects. The v4 SVG path is substantially faster than 3.18.0 for
node-heavy axis charts in initial render and `chart.load()`, while resize is also faster after
reusing unchanged SVG tick nodes and tick text during resize-only redraws. Canvas then gives another
large gain for supported high-density axis charts because those charts avoid per-point or per-shape
SVG nodes and defer clean-frame bitmap copies until an overlay is actually needed.

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
  - Implementation plan: profile `treemap`, dense tick generation, and focused bar redraws. Add
    optimizations only after SVG parity and regression tests are in place.

Each completed parity item should remove the corresponding `warnUnsupportedCanvasOptions()` warning,
update the canvas ESM exports when API surface changes, and add SVG-vs-canvas regression coverage.

## Previous major versions

- v2: [CHANGELOG-v2.md](./CHANGELOG-v2.md)
- Per-release entries: [CHANGELOG.md](./CHANGELOG.md)
