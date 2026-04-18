# Module imports

billboard.js ships as a modular library. In **ESM** builds, each chart type,
interaction, and optional API must be imported and invoked explicitly so that
bundlers can tree-shake unused code. In **UMD** builds (`billboard.js`,
`billboard.pkgd.js`, CDN) every module is auto-included — UMD users can skip
this document.

> If you arrived here from a console error like
> `Please, make sure if 'xxx' module has been imported and specified correctly.`,
> jump to the matching module in the tables below and import it.

## How it works

Each module is exposed as a named export from `billboard.js`. Calling the
resolver function (e.g. `bar()`, `grid()`) registers the module onto the
`Chart` / `ChartInternal` prototype. The return value is safe to spread into
`bb.generate({...})` so the same call both *enables* the feature and
optionally *configures* it.

```js
import bb, {bar, grid} from "billboard.js";

bb.generate({
  ...bar(),       // enable "bar" chart type
  ...grid(),      // enable chart.xgrids() / chart.ygrids() + grid renderer
  data: { columns: [...] }
});
```

## Two usage patterns

Each resolver only needs to **run once per application** — the first call
registers the module onto the prototype; every later call is a no-op. This
gives you two equivalent styles, and you can mix them freely.

### Pattern A — inline spread (one chart)

Spreading `...bar()` / `...grid()` into `bb.generate(...)` both enables the
module *and* applies any default options it ships with. Convenient when a
file creates exactly one chart.

```js
import bb, {bar, grid} from "billboard.js";

bb.generate({
  ...bar(),
  ...grid(),
  data: { columns: [...] }
});
```

### Pattern B — init once, reuse everywhere (multiple charts)

If a file or app bootstrap creates several charts, call each resolver once
at the top of the module. After that, every subsequent `bb.generate({...})`
can use **plain config** — the usual `data.type: "bar"`, `grid: {...}`,
`regions: [...]`, etc. — exactly as in v3 and earlier.

```js
import bb, {bar, line, grid, regions} from "billboard.js";

// Run once per app — prototype registration is global and idempotent.
bar();
line();
grid();
regions();

// From here on, write config the familiar way.
const chartA = bb.generate({
  bindto: "#chartA",
  data: { type: "bar", columns: [["data1", 30, 200, 100, 400]] },
  grid: { x: { lines: [{ value: 2, text: "Mark" }] } }
});

const chartB = bb.generate({
  bindto: "#chartB",
  data: {
    types: { revenue: "bar", trend: "line" },
    columns: [["revenue", 300, 350, 300], ["trend", 130, 100, 140]]
  },
  regions: [{ axis: "x", start: 1, end: 2, class: "highlight" }]
});
```

Both charts share the same registered modules — no need to spread `...bar()`
or `...grid()` again. The resolvers can also live in a separate bootstrap
file (e.g. `src/chart-setup.js`) that you import once from your entry point.

## Cross-page / multi-route usage (SPA, Next.js, etc.)

`Chart.prototype` is a **single shared object** for every copy of
billboard.js in the same JavaScript runtime. Once a module's resolver has
been invoked, the registration is visible to **all future charts** created
anywhere in the app — different routes, components, lazy-loaded pages, etc.
Resolvers are also **idempotent**: calling `bar()` twice is safe, the
second call is a no-op.

This has three practical consequences.

### 1. Register modules once at app bootstrap (recommended)

Create a single setup file that imports and invokes every module your app
uses, then import it from your root entry. Route-level code then writes
plain `bb.generate({...})` without worrying about which module is needed.

```js
// src/chart-setup.js  — imported once from the app entry
import {bar, line, pie, grid, regions, category, zoom} from "billboard.js";

bar(); line(); pie();
grid(); regions(); category();
zoom();
```

```js
// src/main.js  (or pages/_app.tsx, app/layout.tsx, etc.)
import "./chart-setup";      // side-effect import — registers once
import bb from "billboard.js";
// …mount app…
```

```js
// src/pages/dashboard.js
import bb from "billboard.js";

// Nothing else to import. Write config the v3 way.
bb.generate({
  bindto: "#a",
  data: { type: "bar", columns: [...] },
  grid: { x: { lines: [...] } }
});
```

```js
// src/pages/report.js  — a totally different route
import bb from "billboard.js";

bb.generate({
  bindto: "#b",
  data: { type: "pie", columns: [...] }
});
// chart.regions([...]) also works here — registered by chart-setup.js
```

### 2. Or register per-feature, next to the code that uses it

If you prefer colocated imports, each module file can invoke its own
resolvers at top level. Because resolvers are idempotent, multiple files
invoking the same resolver is harmless — the first one wins, the rest are
no-ops.

```js
// src/widgets/SalesBar.js
import bb, {bar, grid} from "billboard.js";
bar(); grid();                        // safe even if another module also ran them

export function renderSalesBar(el) {
  return bb.generate({
    bindto: el,
    data: { type: "bar", columns: [...] },
    grid: { y: { lines: [...] } }
  });
}
```

### 3. Be aware of code-splitting order

The prototype is only extended **when the resolver is called** — not when
the module is merely imported. In bundlers that split chunks lazily
(React.lazy, dynamic `import()`, Next.js `dynamic`), if a chart on page A
needs `grid` but the `grid()` call lives in page B's chunk, page A will
throw the "please import grid" error because B hasn't loaded yet.

**Safest pattern**: put module registrations in the shared bootstrap chunk
(Pattern 1 above) so every route gets them eagerly. Only push a resolver
into a lazy chunk if that feature is genuinely used by that chunk alone.

```js
// ❌ Broken — grid registration only happens when /report loads
// src/routes/report.lazy.js
import {grid} from "billboard.js";
grid();
// If the user hits /dashboard first and it uses chart.xgrids(), error.

// ✅ Safe — registered eagerly in shared bootstrap
// src/chart-setup.js
import {grid} from "billboard.js";
grid();
```

### Separate bundles / micro-frontends

If two parts of a page ship as independent bundles (e.g. host app + MFE
widget via different `<script>` tags or different ESM graphs), each bundle
has **its own copy** of billboard.js and its own `Chart.prototype`.
Registration done in bundle A does not reach bundle B. Each bundle must
invoke the resolvers it needs.

> If a chart method works on one page but throws
> `Please, make sure if '…' module has been imported` on another, the
> cause is almost always (a) the bootstrap was lazy-loaded and the error
> page loaded first, or (b) a separate bundle needs its own registration.

## Module catalogue

### Chart types

Import the type(s) you use and pass the return value as `data.type` /
`data.types`.

| Module | `data.type` value |
| --- | --- |
| `area` | `"area"` |
| `areaLineRange` | `"area-line-range"` |
| `areaSpline` | `"area-spline"` |
| `areaSplineRange` | `"area-spline-range"` |
| `areaStep` | `"area-step"` |
| `areaStepRange` | `"area-step-range"` |
| `bar` | `"bar"` |
| `bubble` | `"bubble"` |
| `candlestick` | `"candlestick"` |
| `donut` | `"donut"` |
| `funnel` | `"funnel"` |
| `gauge` | `"gauge"` |
| `line` | `"line"` |
| `pie` | `"pie"` |
| `polar` | `"polar"` |
| `radar` | `"radar"` |
| `scatter` | `"scatter"` |
| `spline` | `"spline"` |
| `step` | `"step"` |
| `treemap` | `"treemap"` |

```js
import bb, {bar, line} from "billboard.js";

bb.generate({
  data: {
    type: bar(),          // single type
    types: { data2: line() },
    columns: [["data1", 30, 200], ["data2", 100, 50]]
  }
});
```

### Interaction modules

| Module | Enables |
| --- | --- |
| `selection` | `data.selection.enabled` + `chart.select/unselect/selected` |
| `subchart` | `subchart.show` + `chart.subchart.*` |
| `zoom` | `zoom.enabled` + `chart.zoom.*` |

```js
import bb, {bar, zoom} from "billboard.js";

bb.generate({
  zoom: { enabled: zoom() },
  data: { type: bar(), columns: [...] }
});
```

### Optional API modules

| Module | Chart method(s) | Internal effect |
| --- | --- | --- |
| `exportApi` | `chart.export()` | — |
| `flow` | `chart.flow()` | `flow` transition renderer |
| `grid` | `chart.xgrids()` / `chart.ygrids()` | Grid lines & grid-focus renderer |
| `regions` | `chart.regions()` | Region renderer |
| `category` | `chart.category()` / `chart.categories()` | — |

```js
import bb, {bar, grid, regions, category, exportApi, flow} from "billboard.js";

const chart = bb.generate({
  ...grid(),
  ...regions(),
  ...category(),
  ...exportApi(),
  ...flow(),
  data: { type: bar(), columns: [...] },
  grid:    { x: { lines: [...] } },
  regions: [{ start: 1, end: 2 }]
});

chart.xgrids([...]);
chart.regions([...]);
chart.category(0);
chart.export();
chart.flow({ columns: [...] });
```

## Error message reference

When an optional API method is called without its module imported, the
following error is thrown:

```
❌ [billboard.js] Please, make sure if '<module>' module has been imported and specified correctly.
```

Mapping from chart method → required module:

| If you call … | Import and invoke … |
| --- | --- |
| `chart.export()` | `exportApi()` |
| `chart.flow(...)` | `flow()` |
| `chart.xgrids(...)` / `chart.ygrids(...)` | `grid()` |
| `chart.regions(...)` | `regions()` |
| `chart.category(...)` / `chart.categories(...)` | `category()` |

Chart type modules surface a similar error at chart initialization time when
`data.type` is set to a type whose resolver was not imported:

```
❌ [billboard.js] Please, make sure if '<typeName>' module has been imported and specified correctly.
```

## UMD / CDN

No changes are required. The UMD entry auto-invokes every resolver at load
time, so `chart.xgrids()`, `chart.export()`, etc. work out of the box:

```html
<script src="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.pkgd.min.js"></script>
<script>
  const chart = bb.generate({
    data: { type: "bar", columns: [["data1", 30, 200, 100]] }
  });
  chart.xgrids([{ value: 1, text: "L1" }]); // works without extra setup
</script>
```

## See also

- Release-specific changes: [CHANGELOG-v4.md](./CHANGELOG-v4.md),
  [CHANGELOG-v2.md](./CHANGELOG-v2.md)
- Per-release entries: [CHANGELOG.md](./CHANGELOG.md)
