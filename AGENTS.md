# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

billboard.js is a D3.js v6+ based JavaScript charting library (MIT). Written in TypeScript, it supports SVG rendering with modular ESM tree-shaking for chart types and interactions.

## Common Commands

```bash
# Dev server
npm start

# Build (full: production + packaged + theme + plugin + esm + cjs)
npm run build

# Build dev only
npm run build:dev

# Lint
npm run lint

# Format
npm run format

# Run all tests (vitest + playwright/chromium, browser mode)
npm test

# Run a single test file
npx vitest test/shape/bar-spec.ts

# Run tests matching a pattern
npx vitest -t "pattern"

# Coverage
npm run coverage
```

Package manager: `yarn@4.3.1` (corepack)

## Architecture

### Entry Points

- `src/index.ts` — Full bundle: auto-registers all shape/interaction modules
- `src/index.esm.ts` — ESM entry: exports individual shape types (`area`, `bar`, `line`, etc.) and interactions (`zoom`, `subchart`, `selection`) for tree-shaking
- `src/core.ts` — `bb` namespace object with `generate()`, `defaults()`, `instance[]`

### Core Classes

- **`Chart`** (`src/Chart/Chart.ts`) — Public API class returned by `bb.generate()`. Methods split across `src/Chart/api/*.ts` files (data, load, export, tooltip, zoom, etc.)
- **`ChartInternal`** (`src/ChartInternal/ChartInternal.ts`) — Internal implementation. Functionality mixed in via `extend()` from submodules:
  - `data/` — data conversion, loading
  - `interactions/` — drag, eventrect, flow, subchart, zoom
  - `internals/` — redraw, scale, domain, size, color, legend, tooltip, format, text, title, style, type, class, category, transform
  - `shape/` — rendering logic per chart type (arc, area, bar, bubble, candlestick, funnel, gauge, line, point, polar, radar, treemap)

### Module Resolution System

`src/config/resolver/shape.ts` and `interaction.ts` use a lazy self-replacing pattern: each exported function (e.g., `line()`, `bar()`) extends `ChartInternal.prototype` with the needed modules on first call, then replaces itself with a function returning the type constant. This enables tree-shaking — unused chart types are never loaded.

### Configuration

- `src/config/Options/` — Default option definitions organized by category (`axis/`, `common/`, `data/`, `interaction/`, `shape/`)
- `src/config/Store/` — State management
- `src/config/const.ts` — Chart type constants (`TYPE`)
- `src/config/classes.ts` — CSS class name constants

### Plugins

`src/Plugin/` — Plugin base class and built-in plugins (bubblecompare, sparkline, stanford, tableview, textoverlap). Each plugin extends `Plugin.ts`.

### Utilities

`src/module/` — Shared utilities: `util.ts` (main helpers), `Cache.ts`, `browser.ts` (window/document refs), `generator.ts`, `sanitize.ts`

### Styles

`src/scss/` — SCSS sources for base theme and theme variants (dark, datalab, graph, insight, modern)

## Test Structure

Tests use **Vitest** with `@vitest/browser` (Playwright/Chromium). Test files: `test/**/*-spec.ts`

Mirror structure: `test/shape/` for shape tests, `test/api/` for API tests, `test/interactions/` for interaction tests, `test/internals/` for internal logic tests.

Test timeout: 3500ms. Hook timeout: 5000ms.

## Commit Convention

Follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

Ref #<issue>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `skip`

Scope is typically the module name (e.g., `Axis`, `tooltip`, `data`).
