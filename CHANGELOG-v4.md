# v4 release notes

## Summary

v4 extracts five more API modules (`exportApi`, `flow`, `grid`, `regions`,
`category`) out of the default bundle into opt-in resolvers. ESM consumers
get a smaller bundle; UMD consumers see no change.

For the persistent guide on **how to import modules**, see
[MODULE_IMPORTS.md](./MODULE_IMPORTS.md) — that document is the canonical
reference and is linked from runtime error messages.

## BREAKING CHANGES

### ESM: optional APIs require explicit import

The following modules are no longer auto-included in ESM builds. Import and
invoke the resolver to enable the corresponding chart method.

| Module | Chart method(s) | Internal effect |
| --- | --- | --- |
| `exportApi` | `chart.export()` | — |
| `flow` | `chart.flow()` | `flow` transition renderer |
| `grid` | `chart.xgrids()` / `chart.ygrids()` | Grid lines & grid-focus renderer |
| `regions` | `chart.regions()` | Region renderer |
| `category` | `chart.category()` / `chart.categories()` | — |

Previously, `grid`, `regions`, and `category` came bundled with any
axis-based chart (via the axis resolver), and `exportApi`/`flow` were
installed unconditionally by the core Chart class. All five are now
independent resolvers exported from `billboard.js`.

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

Only import what you use — see [MODULE_IMPORTS.md](./MODULE_IMPORTS.md) for
the full catalogue. Missing imports surface an explicit runtime error
instead of a generic `TypeError: chart.xxx is not a function`.

## Bundle size impact

> **At a glance**: if you upgrade to v4 and don't import any of the five
> modules newly separated in this release (`exportApi`, `flow`, `grid`,
> `regions`, `category`), your ESM bundle drops by roughly **~19 KB minified
> / ~6.3 KB gzipped** vs v3 for the same chart (≈ 6.5–7 % of a minimal bar
> chart bundle).

Measured with `esbuild --bundle --minify --tree-shaking=true` on a minimal
bar chart entry. Each row adds only the named module to the baseline.

| Configuration | Minified | Gzipped |
| :--- | ---: | ---: |
| bar only (no optional modules) | `260,006 B` | `90,657 B` |
| bar + `grid()` | `268,212 B` (`+8,206`) | `93,157 B` (`+2,500`) |
| bar + `flow()` | `264,236 B` (`+4,230`) | `92,128 B` (`+1,471`) |
| bar + `regions()` | `263,131 B` (`+3,125`) | `91,718 B` (`+1,061`) |
| bar + `exportApi()` | `262,839 B` (`+2,833`) | `91,861 B` (`+1,204`) |
| bar + `category()` | `260,507 B` (`+501`) | `90,847 B` (`+190`) |
| **bar + all 5 v4-separated modules** | **`278,897 B`** (`+18,891`) | **`96,969 B`** (`+6,312`) |

When none of the five modules are imported, the ESM bundle shrinks by
approximately **19 KB minified / 6.3 KB gzipped** compared to v3 (where
all five were auto-bundled). By individual contribution: `grid` is the
largest (~8 KB / 2.5 KB gzip), followed by `flow` (~4 KB / 1.5 KB gzip),
`regions` (~3 KB / 1 KB gzip), `exportApi` (~2.8 KB / 1.2 KB gzip), and
`category` (~0.5 KB, negligible).

Actual savings vary with bundler, minifier, and other features in use.

## Internal changes (contributor-facing)

To keep axis-based charts working when `grid` / `regions` resolvers aren't
imported, shared call sites now use optional chaining. These changes are
transparent to end users but relevant if you contribute to the rendering
pipeline:

- `ChartInternal/internals/redraw.ts` — `hasGrid?.()`, `updateGrid?.()`,
  `updateRegion?.()`, guards for `redrawGrid` / `redrawRegion` /
  `updateGridFocus`
- `ChartInternal/interactions/eventrect.ts` — `showGridFocus?.()`,
  `hideGridFocus?.()`
- `ChartInternal/interactions/flow.ts` — `hideGridFocus?.()`
- `ChartInternal/ChartInternal.ts` — `initGrid?.()`, `initRegion?.()`

The axis resolver (`src/config/resolver/axis.ts`) no longer imports
`apiGrid`, `apiRegion`, `apiCategory`, or the internal `grid` / `region`
renderers.

## Previous major versions

- v2: [CHANGELOG-v2.md](./CHANGELOG-v2.md)
- Per-release entries: [CHANGELOG.md](./CHANGELOG.md)
