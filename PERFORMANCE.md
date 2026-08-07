# Performance Notes

This document records implementation notes for dependency reduction and DOM
batching work that can affect rendering behavior.

## D3 Dependency Reduction

> **Do not re-attempt the in-tree d3 ports.** An earlier revision of this branch
> replaced `d3-scale`, `d3-axis`, `d3-shape`, `d3-path`, `d3-time`,
> `d3-time-format` and `d3-hierarchy` with modules under `src/module/`. Those
> modules were *adapted from* d3's ISC-licensed source, which makes them
> derivative works: shipping them obliges us to carry d3's copyright and
> permission notice, and the code cannot sit under billboard.js' own copyright.
> That was judged unacceptable, so the ports were reverted and the packages
> restored.
>
> A rewrite does not fix this. Paraphrasing source you have read is still
> copying; only a clean-room implementation - written by someone who has never
> seen d3's source, from an independently written specification - produces a
> non-derivative work. The output also has to stay byte-identical to d3 for
> backward compatibility, which in practice forces d3's exact algorithms
> (`ticks()` rounding, the tick interval table, the 18 curve constructions).
> Weigh that cost before revisiting.

What survives is the one replacement that was **not** derived from d3:

- `d3-delaunay` is gone. The TextOverlap plugin needed exactly one call,
  `voronoi().cellPolygon(i)`. `src/module/voronoi.ts` computes bounded cells by
  half-plane clipping - the clip rectangle is clipped against the perpendicular
  bisector to every other site (Sutherland-Hodgman, published 1974), which *is*
  the cell by definition. That is a different algorithm from d3-delaunay's
  Delaunay triangulation, written from the geometric definition rather than
  adapted from its source. O(n^2) rather than O(n log n), which is the right
  trade at label counts.
- The plugin dropped its dynamic `import()` with it, so `preventLabelOverlap()`
  is synchronous again and the two lazy chunks it used to emit are gone.
- `d3-delaunay` is kept as a **devDependency** to drive
  `test/module/voronoi-parity-spec.ts`, which asserts the cells match.

## Release-over-release benchmark (4.0.3 -> HEAD)

**Method.** Published `billboard.js@4.0.3` from npm versus HEAD. Rebuilding the
4.0.3 tag with the current devDependencies reproduces the published
`billboard.pkgd.min.js` **byte-for-byte** (sha256 `492c3aa6...`), so every delta
is a source change, not a build change. Runtime figures come from
`benchmark/perf.spec.ts` against `dist/billboard.pkgd.min.js` in headless
Chromium - 2 warmup + 5 iterations, run twice, reported as the median of the
pooled 10. Bundle figures are `gzip -9`.

### Delivered bytes

| gzip | 4.0.3 | HEAD | delta |
|---|---:|---:|---:|
| ESM app bundle<sup>*</sup> | 120,049 | 121,827 | +1,778 |
| `billboard.pkgd.min.js` | 264,577 | 270,413 | +5,836 |
| `billboard.min.js` | 149,512 | 156,826 | +7,314 |
| d3-family packages installed | 19 | 19 | 0 |

<sup>*</sup> rolldown `{format: "esm", minify: true}` over an entry that imports **and
uses** `bb, {bar, line, area, pie, zoom}` - a bare import would be tree-shaken away.
Each version is installed in its own project so it brings its own dependency tree,
4.0.3 from npm and HEAD from `npm pack` of the working tree. Everything resolves into
one chunk, with no bare imports left unbundled.

Use `gzip -9 -n`, not `gzip -9 <file>`: the latter stores the filename and mtime in the
header, so the figure moves with the filename.

The growth is the post-4.0.3 feature work - configurable subchart rendering,
canvas grid selectors, the React subpath and the pre-bundled worker. The
dependency graph is unchanged: `d3-delaunay` was never a declared dependency, so
removing it does not move the install count.

### Runtime

At parity. Every scenario lands within +/-4% except five rows that crossed +/-5%
in the standard harness; all of them collapsed when re-measured at 40 samples
with builds interleaved round-robin:

| Scenario | metric | standard harness | 40 samples |
|---|---|---:|---:|
| SVG 5x5000 area | generate | +13.5% | -3.7% |
| SVG 5x10000 area | load | +7.5% | -10.9% |
| Canvas 5x5000 line | load | +8.6% | -0.5% |
| SVG 5x1000 stacked bar | load | +6.1% | +1.6% |
| SVG 5x5000 line | load | +5.0% | -1.4% |

No reproducible regression against 4.0.3 remains.

### The canvas regression, bisected

`feat(subchart)` introduced a 7-13% canvas line/area regression that shipped
unnoticed. Building all nine commits between 4.0.3 and this branch and running a
focused round-robin (3 warmup + 8 iterations x 3 rounds, interleaved so machine
drift hits every build equally) put the entire jump on one commit:

| commit | Canvas 5x1000 area generate | Canvas 5x5000 line generate |
|---|---:|---:|
| `0b7255c96` | 11.05 | 29.60 |
| `37ec4b7c8` feat(subchart) | 12.65 **(+14.5%)** | 31.50 **(+6.4%)** |
| `2762d0240` ... `401c13b2d` | flat | flat |

**Root cause**: `getTargetValueMinMax()` in `internals/domain.ts` called
`$$.getSubchartCandlestickShapeValue?.(row, true)` from inside the per-data-point
loop, with `isSub` hardcoded to `true`. That helper's first act is to return
early when `!isSub` - hardcoding `true` defeated it, so every main-chart domain
pass walked the subchart type chain (`isCandlestickType` ->
`isSubchartSourceTypeOf` -> `getSubchartSourceTargetType` -> `getTargetType`)
once per data point. The projection is keyed by target id, so it is now resolved
once per target and skipped per row.

**Second cost**: `getShapeYMin()` ran per data point from the area `y0` accessor
in `shape/core/path.ts`, resolving a scale through `getYScaleById()` and slicing
its domain (`scale.domain()` returns a copy) each time. It depends only on the
target id, so it is memoized per series - the pattern `generateGetAreaPoints()`
already used through its `y0Cache`, which `generateGetLinePoints()` was missing
and now has too. That call predates the subchart commit, so fixing it took canvas
area below 4.0.3.

Two false leads, both instructive:

- A CPU profile of the pre-regression parent against HEAD appeared to blame the
  shape generators, because an in-tree port's function names had replaced
  `d3-shape`'s in the profile. **The names had simply moved.** A profile diff
  across two different implementations cannot attribute anything on its own -
  only a controlled A/B (swap one import, change nothing else) can.
- `hasCanvasDrawableValue()`, which the commit adds to several canvas loops,
  looked like the area-specific cost. It is not: `drawAreas()` is byte-identical
  between `0b7255c96` and `37ec4b7c8`.

### Noise floor of `benchmark/perf.spec.ts`

The default 2 warmup + 5 iterations resolves roughly ±5–8% on the bar scenarios.
Two rows crossed the ✗ threshold in the full harness and both evaporated when
re-run at 40 samples with builds interleaved round-robin:

| Scenario | metric | full harness | 40 samples |
|---|---|---:|---:|
| 5x1000 stacked bar | generate | +8.7% | +1.5% |
| Canvas 5x5000 bar | load | +8.8% | +1.3% |

Treat a single-run ✗ as a hypothesis, not a finding. Re-measure with builds
interleaved before acting on it.

## DOM Read/Write Batching

- Axis tick size calculation uses a hidden dummy axis, cached fingerprints, and
  batched bounding-rect reads before removing the dummy node.
- Text overlap marking reads text lengths first and applies overlap classes in a
  separate write phase.
- Keep future layout-sensitive changes in the same read-then-write shape:
  collect all `getBBox()`, `getBoundingClientRect()`, `offsetWidth`, and
  `getComputedTextLength()` reads before changing attributes, styles, or classes.

## Worker Safety

- **The worker source is pre-bundled at build time, never derived from
  `Function.prototype.toString()`.** `src/module/worker.entry.ts` is bundled by
  `config/worker-src.js` (rolldown, minified IIFE) and injected as a string constant
  by all three pipelines: webpack `DefinePlugin`, the `bb-worker-src` rolldown plugin,
  and vitest `define`. Work is addressed by **op name** (`json`, `rows`, `columns`), so
  no application function is ever stringified or evaluated.
  - Bundled with rolldown, which the ESM build already uses. **Do not reach for another
    bundler here**: it would become a declared devDependency for this single call, and
    every bundler already in the tree is reached indirectly, through a loader or plugin.
  - `getWorkerSource()` is therefore **async** - rolldown has no `buildSync`. It
    memoizes the promise, so the worker is bundled at most once per process, and
    `vitest.config.ts` exports an async config to await it.
- Why this matters: stringifying a live function carries whatever the host
  toolchain injected into its body - coverage counters, babel helpers,
  bundler-hoisted module scope - into a context where those bindings don't exist.
  `test/module/worker-real-spec.ts` reproduced exactly that, failing with
  `cov_xxx is not defined` under istanbul instrumentation until the source was
  pre-bundled. That is the same failure class reported for React/webpack setups.
- The rolldown injection is **textual**. Never name the injected constant outside
  its single reference in `getWorkerSrc()` - even a mention in a comment inlines
  the entire worker source a second time.
- Worker data conversion must always fall back to the main thread on creation
  failure, postMessage failure, worker error, unknown op, timeout, or parity
  mismatch.
- **The parity self-test runs on a sampled payload, not the real one.** The first
  time a worker is asked for an op, `startVerify()` posts a truncated copy of the
  arguments (3 leading entries, 3 leading cells each) and compares the reply with
  the main thread's result for that same sample. A mismatch disables the worker for
  the session and the real payload falls back.
  - The sample is posted *before* the real request. The worker answers in order, so
    the check overlaps the real conversion instead of adding a round trip after it,
    and a cold worker shows two replies rather than one.
  - The question the check answers is "does this worker implement this op the way
    the main thread does", which a sample settles as well as the full dataset. Do
    not restore the full re-parse: it costs one whole main-thread conversion, which
    is the exact work the offload exists to avoid, and `boost.useWorker` only covers
    the initial conversion — so a single-chart page paid it every time and came out
    behind `useWorker: false`.
  - Truncation is shape-generic on purpose: `args[0]` is the data array for all three
    ops, so slicing it (and its entries, when they are arrays) stays valid for
    `columns`, `rows` and `json` alike without per-op fixtures.
  - Guarded by "self-tests on a sampled payload, not the full one" in
    `test/module/module-coverage-spec.ts`, which asserts the main-thread converter
    sees 3x3 cells while the worker gets the whole payload.
- `boost.workerUrl` can point to a static worker script for strict CSP
  environments that disallow Blob worker URLs. `dist/billboard.worker.js` is
  emitted for exactly this purpose (703 bytes gzip). The protocol is
  `{id, op, args}` in, `{id, result}` or `{id, error}` out - **no `eval()` on the
  worker side**, which the previous `{id, fn, deps, args}` protocol required and
  which strict CSP would have blocked anyway.
- `boost.useWorker` accepts `"auto"`, which offloads only past
  `WORKER_CELL_THRESHOLD` (5,000 cells in `convert.ts`). Below that, structured
  cloning the payload costs more than the parsing it saves.
- **The default is still `false`.** Everything the plan required before flipping it
  is now in place and covered by `test/internals/boost-worker-env-spec.ts` (real
  worker, static worker script, blocked Worker constructor, blocked blob URL,
  missing Worker/Blob, plus both `"auto"` branches - all rendering identical
  results). The one remaining consideration is semantic, not safety: offloading
  makes the initial data conversion asynchronous, so code that reads chart data
  synchronously right after `bb.generate()` would change behavior for large
  datasets. Flipping the default to `"auto"` is a one-line change in
  `src/config/Options/common/boost.ts` once that trade-off is accepted.

## Worker Environment Matrix

Verified in a real Chromium page through the Vite pipeline
(`test/internals/boost-worker-env-spec.ts`). Each row must end with the same
rendered chart:

| Environment | Path taken |
|---|---|
| Worker available | pre-bundled blob worker |
| `blob:` refused (CSP `script-src`) | main thread |
| Worker construction refused (CSP `worker-src 'none'`) | main thread |
| `boost.workerUrl` set | static `dist/billboard.worker.js` |
| No `Worker`/`Blob` (SSR-shaped runtime) | main thread |
| `"auto"` under threshold | main thread, no worker created |
| `"auto"` over threshold | worker |

Not covered here: real CRA / Next.js / Vite application builds. Those need
installed fixture apps; the failure mode they would expose (host toolchain
rewriting function bodies) is what the pre-bundled worker source structurally
eliminates.

## Verification

Use targeted tests for the affected paths before running the full suite:

```bash
# the one in-tree replacement left, and its reference implementation
pnpm exec vitest test/module/voronoi-parity-spec.ts
# worker
pnpm exec vitest test/module/worker-real-spec.ts test/internals/boost-worker-env-spec.ts
pnpm exec vitest test/module/module-coverage-spec.ts -t worker
pnpm run lint
pnpm test
pnpm run build
```

Keep `d3-delaunay` in `devDependencies`: `voronoi-parity-spec.ts` imports it as
the reference implementation. Removing it silently guts the safety net.

### Release-over-release compatibility check

A unit-level parity suite compares a module against the package it replaced. It
cannot catch a difference that only appears once the module is wired into a
chart, so before shipping any replacement, diff the rendered output of the last
published build against the build under test:

1. `npm pack billboard.js@<last release>` and unpack, or build the release tag —
   the two are byte-identical for `billboard.pkgd.min.js`, so either works.
2. Load each bundle in a headless page with `dist/billboard.css` applied,
   `bb.generate()` the same option object, and compare the bind element's
   `innerHTML` after normalizing instance ids (`bb-\d{10,}`), `url(#…)`
   references and float noise past 3 decimals.
3. Cover at minimum: every chart type, all 18 `spline.interpolation.type` curves,
   all 6 `treemap.tile` algorithms, timeseries formatting, `log` scale,
   `data.json`/`rows`/`xFormat` parsing, and the `stanford` / `textoverlap`
   plugin bundles.
4. Where the DOM legitimately differs, fall back to a screenshot diff — a DOM
   difference is not automatically a visual one.

Also diff the public surface, which is cheap and catches accidental removals:
`bb.generate()` a chart on each build and compare `Object.keys(chart.internal.config)`,
the chart API method list and `Object.keys(bb)`.

The last such run (4.0.3 → HEAD) came out identical on 38/39 core scenarios,
both plugins and all 6 treemap tiles, with no config key or API method removed.
The one differing scenario is `subchart`, where `feat(subchart)` adds a
`bb-event-rects-subchart` group — additive, `fill-opacity: 0` and
`pointer-events: none`, and pixel-identical in the screenshot diff. Separately,
the `axis.*.axes` sub-axes differ; written up in
[CHANGELOG-v4.md](./CHANGELOG-v4.md#behavior-changes-to-check); the DOM diff
there looked alarming (four presentation attributes gone) and the screenshot
diff reduced it to a 0.5px tick shift that *removed* a pre-existing misalignment
with the main axis.
