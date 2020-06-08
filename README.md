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
Reorganized `selection` and `state` variables. (Note: Even is accessible, do not use nor access private values)

- All states are member of `state` prop.
- All selections are member of `$el` prop.

```js
const chart = bb.generate({});

chart.internal.width;
// --> chart.internal.state.width

chart.internal.selectChart;
// --> chart.internal.$el.chart
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

### Node structure updates

- Dettach `<circle>` point elements separately from being line's children.
- chart.$.line.circles
  --> chart.$.circles
 - chart.element (removed)
   --> chart.$.chart.node()

### Callbacks context
- Make consistent context for all callback-ish options.
```js
tooltip: {
    position: function() {
        this;  // <-- should point current chart instance
    }
}
```

Full affected lists:

```sh
# Options

area.linearGradient

axis.x.extent

axis.x.axes.tick.format
axis.y.axes.tick.format
axis.y2.axes.tick.format

axis.x.tick.values
axis.y.tick.values
axis.y2.tick.values

axis.x.tick.format
axis.y.tick.format
axis.y2.tick.format

bubble.maxR

data.color
data.colors
data.onout
data.onover
color.onover
color.tiles
data.filter
data.idConverter
data.labels.format
data.order
data.selection.isselectable
data.onclick
data.onmax
data.onmin
data.onselected
data.onunselected

donut.label.format
donut.label.ratio

gauge.label.format
gauge.label.extents

legend.contents.template
legend.item.onclick
legend.item.onover
legend.item.onout

pie.label.format
pie.label.ratio

point.r
radar.level.text.format
subchart.onbrush

tooltip.format.title
tooltip.format.name
tooltip.format.value
tooltip.order
tooltip.contents
tooltip.position

zoom.onzoomstart
zoom.onzoom
zoom.onzoomend
zoom.resetButton.onclick

--------------

# ctx param removes

onafterinit(ctx)
onbeforeinit(ctx)
oninit(ctx)
onout(ctx)
onover(ctx)
onrendered(ctx)
onresize(ctx)
onresized(ctx)
tooltip.onshow(ctx)
tooltip.onshown(ctx)
tooltip.onhide(ctx)
tooltip.onhidden(ctx)

--------------

# APIs

export.callback
flow.done
load.done
unload.done
```

## New option

- `point.focus.only`<br>
  Show point only when is focused.<br>
  This option will generate one `<circle>` node per data series and can make more performant when dealing with big amount of data.

  ```js
  point: {
      focus: {
          only: true
      }
  }
  ```
  
 - Enable shoing point by default for `step` type<br>
   By default, data point will be shown for step types. If want to hide, set `point.show=false`.
   ```js
   point: {
       show: false
   }
   ```
## Modularization by its functionality

`1.x` wasn't providing the way to cut the bundle size, and included all shape types codes even  they aren't used.<br>
This was problematic delivering unused codes for all circumstances.

To improve this, `v2.0` will export each chart types as named binding module function. If you use certain types only, just import the type and run once or specify as `data.type` or `data.types` option value.

```js
import bb, {
  area,
  areaLineRange,
  areaSpline,
  areaSplineRange,
  areaStep,
  bar,
  bubble,
  donut,
  gauge,
  line,
  pie,
  radar,
  scatter,
  spline,
  step
}

bb.generate({
  ...,
  data: {
    // by calling `line()`, will make internally extend 'line' type related functionality.
    // line() will return "line" string.
    type: line(),
    
    // or spcifying type for each data
    types: {
      data1: bar(),
      data1: spline()
    }
  }
});
```

### Example of size reduction by types

Take as a reference the amount of bundle size reduction by types.
In an internal test, we got from 10 ~ 43% size reduction.

> The bundle size will vary depending the bundler and the envrionments that is used.


Shape | Rollup.js (reduced) | wepack (reduced)
--- | --- | --- 
**Full size** | `208kb` | `210kb`
area | 184kb (-10.57%) | 186kb (-11.42%)
area-spline | 184kb (-10.57%) | 186kb (-11.42%)
area-step | 184kb (-10.57%) | 186kb (-11.42%)
area-line-range | 184kb (-10.57%) | 186kb (-11.42%)
area-spline-range | 184kb (-10.57%) | 186kb (-11.42%)
bar | 170kb (-18.26%) | 171kb (-18.57%)
bubble | 175kb (-15.86%) | 177kb (-15.71%)
donut | 118kb (-43.26%) | 138kb (-34.28%)
gauge | 119kb (-42.78%) | 138kb (-34.28%)
line | 181kb  (-12.98%) | 183kb (-12.85%)
pie | 118kb (-43.26%) | 138kb (-34.28%)
radar | 132kb (-36.53%) | 152kb (-27.61%)
scatter | 175kb (-15.86%) | 176kb (-16.19%)
spline | 181kb (-12.98%) | 183kb (-12.85%)
step | 181kb (-12.98%) | 183kb (-12.85%)