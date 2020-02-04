<img src="https://naver.github.io/billboard.js/img/logo/billboard.js.svg" width="350" alt="billboard.js"><br>

# v2.0 dev branch

Branch for next major release 2.0.
> DO NOT use for production.

## Installation

### Directly from the github repository
```sh
# Run install command from shell
$ npm install git+https://github.com/naver/billboard.js.git#v2 --save
```

## Main Goals
- Move codebase to TypeScript
- Restructure of file system & class architecture
- Make smaller build & run faster
- Do not break backward compatibility

## Breaking Changes

### Updates on private state variables
Reorganized `state` variables. (Note: Even is accessible, do not use nor access private values)
```js
const chart = bb.generate({});

chart.internal.width;
// --> chart.internal.state.width;
```

### Do not extend APIs as own member
When chart is instantiated, APIs were assigned as own member to the instance. The reason mainly comes to handle namespaced APIs, like `.data.shown()`.

```js
const chart = bb.generate({});

chart;
```

`1.x` was extending methods from Chart.prototype, to its instance.
```js
// 1.x
Chart { ... }
plugins: []
internal: ChartInternal {api: Chart, config: {…}, data: {…}, cache: {…}, axes: {…}, …}
$: {chart: Selection, svg: Selection, defs: Selection, main: Selection, tooltip: Selection, …}
element: div.bb
focus: ƒ ()
defocus: ƒ ()
...
```

`2.x` avoid extending as possible. Only will extend those namespaced APIs to keep the backward compatibility.
```js
// 2.x
Chart { ... }
plugins: []
internal: ChartInternal {api: Chart, config: {…}, cache: Cache, state: {…}, charts: Array(1), …}
axis: {labels: ƒ, min: ƒ, max: ƒ, range: ƒ}
data: ƒ ()
xgrids: ƒ ()
ygrids: ƒ ()
legend: {show: ƒ, hide: ƒ}
regions: ƒ ()
tooltip: {show: ƒ, hide: ƒ}
zoom: ƒ ()
$: {chart: Selection, svg: Selection, defs: Selection, main: Selection, tooltip: Selection, …}
element: div.bb
```
