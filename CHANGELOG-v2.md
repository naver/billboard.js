# General direction

- Move codebase to TypeScript
- Restructure of file system & class architecture
- Make smaller build & run faster
- Do not break backward compatibility

# BREAKING CHANGES

## Updates on private state variables
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

## Do not extend APIs as own member
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

## Node structure updates

- Changes of `<circle>` point elements position.
  - for `line`, `area`(area-line-range, area-spline, area-spline-range, area-step) types, stays as is.
  - for `bubble`, `scatter` types, they will be child nodes of newly added `<g class='bb-chart-circles'>` node.
  - for `radar` type, will be positioned as child of `<g class='bb-target-*'>` node.

- chart.$.line.circles
  --> chart.$.circles
 - chart.element (removed)
   --> chart.$.chart.node()

## Callbacks context
- Make consistent context for all callback-ish options and removed passing "context" param to callback function.
```js
tooltip: {
    position: function() {
        this;  // <-- should point current chart instance
    },

    // v1
    onshow: function(ctx, selectedData) { ... },

    // v2
    onshow: function(selectedData) { ... }
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
tooltip.onshow
tooltip.onshown
tooltip.onhide
tooltip.onhidden
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

## Enabled showing data points by default for `step`.
By default, data point will be shown for step types. If want to hide, set `point.show=false`.
```js
point: {
    show: false
}
```

## Interface changes

- `zoom.enabled.type`<br>
  To simply and align with other interaction options format, moved the `type` field from being member of 'enabled' to member of 'zoom'.

  ```js
  // v1.x
  zoom: {
    enabled: {
      type: "drag"
    }
  }

  // v2
    zoom: {
    enabled: true,
    type: "drag" // if omit, 'wheel' will set by default
  }

  // There's no need to update if 'wheel' zoom type is used
  // v1.x
  zoom: {
    enabled: true
  }

  // v2
  zoom: {
    enabled: true
  }
  ```

# New options

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
  
 - `label.threshold` for bar and gauge<br>
   Label threshold option to configure the visibility of data text label by its value.
   ```js
   bar|gauge: {
     label: {
       // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the y Axis domain range(for bar) or total value(for gauge) value.
       // if data value is below than 0.1, text label will be hidden.
       threshold: 0.1
     }
   }
   ```

 - Log scale for x/y Axes
   New log scale for x/y Axes. 
   - **NOTE:** The values specified for axes, must be:
     - Exclusively-positive.
     - Min value should be > 0, otherwise will be set `1`.

   ```js
    axis: {
	    x | y: {
	      type: "log"
	    }
	 }
   ```

# Modularization by its functionality

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
  step,

  // interaction modules
  selection, subchart, zoom
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
    },

    selection: {
      enabled: selection() // selection() will return 'true'
    }
  },

  subchart: {
    show: subchart()  // subchart() will return 'true'
  },

  zoom: {
    enabled: zoom() // zoom() will return 'true'
  }
});
```

## Example of size reduction by types

Take as a reference the amount of bundle size reduction by types.
In an internal test, we got from `10 ~ 43%` size (minified with [terser](https://github.com/terser/terser)) reduction.

> The bundle size will vary depending the bundler and the envrionments that is used.

Type | Rollup.js (<sup>*</sup>reduced) | gzipped | Webpack (<sup>*</sup>reduced) | gzipped
:---: | :---: | :---: | :---: | :---:
<sup>**</sup> **Full size**| `208kb` | 63kb | `210kb` | 63kb
<sup>***</sup> **Full size 2** | `193kb` | 59kb | `196kb` | 60kb
area | 168kb `(-19.23%)` | 52kb | 170kb `(-19.04%)` | 52kb
area-spline | 168kb `(-19.23%)` | 52kb | 170kb `(-19.04%)` | 52kb
area-step | 168kb `(-19.23%)` | 52kb | 170kb `(-19.04%)` | 52kb
area-line-range | 168kb `(-19.23%)` | 52kb | 170kb `(-19.04%)` | 52kb
area-spline-range | 168kb `(-19.23%)` | 52kb | 170kb `(-19.04%)` | 52kb
bar | 156kb `(-25%)` | 48kb | 158kb `(-24.76%)` | 49kb
bubble | 161kb `(-22.59%)` | 50kb | 164kb `(-21.90%)` | 50kb
donut | 119kb `(-42.78%)` | 37kb | 140kb `(-33.33%)` | 44kb
gauge | 119kb `(-42.78%)` | 37kb | 140kb `(-33.33%)` | 44kb
line | 165kb  `(-20.67%)` | 51kb | 167kb `(-20.47%)` | 52kb
pie | 119kb `(-42.78%)` | 37kb | 140kb `(-33.33%)` | 44kb
radar | 134kb `(-35.57%)` | 41kb | 155kb `(-26.19%)` | 48kb
scatter | 161kb `(-22.59%)` | 50kb | 163kb `(-22.38%)` | 50kb
spline | 165kb `(-20.67%)` | 51kb | 167kb `(-20.47%)` | 52kb
step | 165kb `(-20.67%)` | 51kb | 167kb `(-20.47%)` | 52kb

- <sup>*</sup> Reduced percentage based on build size with interaction modules.
- <sup>**</sup> Build size with interaction (selection, subchart and zoom) modules.
- <sup>***</sup> Build size w/o interaction (selection, subchart and zoom) modules.

<details>
	<summary>Expand to see generation option used for the test result</summary>

  ```js
  bb.generate({
    data: {
      columns: [
        ["data1", 30, 20, 50, 40, 60, 50],
        ["data2", 200, 130, 90, 240, 130, 220],
        ["data3", 300, 200, 160, 400, 250, 250],
        ["data4", 200, 130, 90, 240, 130, 220],
        ["data5", 130, 120, 150, 140, 160, 150],
        ["data6", 90, 70, 20, 50, 60, 120],
        ["data7", 283, 170, 275, 143, 220, 255],

        /* for area-line-range and area-spline-range
        ["data8",
          [150, 140, 110],
          [155, 130, 115],
          [160, 135, 120],
          [135, 120, 110],
          [180, 150, 130],
          [199, 160, 125]
        ],
        */
      ]
    },
    type: "..."
  });
  ```
</details>

# Reduced node generation

`v2` minimize generating redundant nodes, generating necessary nodes by its types.
Following is the test example measuring generated DOM length by chart types.

The result show a size reduction of DOM lengths, in a range of `4 ~ 53%`.

Type | v1.12 | v2 | Reduction rate
:---: | :---: | :---: | :---:
area | 24,585 | 22,948 | `-6.65%`
area-spline | 27,021 | 25,411 | `-5.95%`
area-step | 26,659 | 24,082 | `-9.66%`
area-line-range | 15,589 | 14,800 | `-5.06%`
area-spline-range | 17,553 | 16,715 | `-4.77%`
bar | 19,437 | 17,855 | `-8.13%`
bubble | 20,323 | 17,129 | `-15.71%`
donut | 16,978 | 7,947 | `-53.19%`
gauge | 17,430 | 8,726 | `-49.93%`
line | 23,393 | 20,616 | `-11.87%`
pie | 15,851 | 7,463 | `-52.91%`
radar | 24,579 | 16,619 | `-32.38%`
scatter | 19,726 | 16,229 | `-17.72%`
spline | 24,954 | 22,169 | `-11.16%`
step | 24,452 | 20,650 | `-15.54%`

<details>
	<summary>Expand to see generation option used for the test result</summary>

  ```js
  bb.generate({
    data: {
      columns: [
        ["data1", 30, 20, 50, 40, 60, 50],
        ["data2", 200, 130, 90, 240, 130, 220],
        ["data3", 300, 200, 160, 400, 250, 250],
        ["data4", 200, 130, 90, 240, 130, 220],
        ["data5", 130, 120, 150, 140, 160, 150],
        ["data6", 90, 70, 20, 50, 60, 120],
        ["data7", 283, 170, 275, 143, 220, 255],

        /* for area-line-range and area-spline-range
        ["data1",
          [150, 140, 110],
          [155, 130, 115],
          [160, 135, 120],
          [135, 120, 110],
          [180, 150, 130],
          [199, 160, 125]
        ],
        ["data2", [220, 215, 205], [240, 225, 215], [260, 235, 225], [280, 245, 235], [270, 255, 225], [240, 225, 215]],
        ["data3",
          {high: 155, low: 145, mid: 150},
          {high: 200, mid: 190, low: 150},
          {high: 230, mid: 215, low: 200},
          {high: 210, mid: 200, low: 180},
          {high: 220, mid: 210, low: 190},
          {high: 200, mid: 180, low: 160}
        ]
        */
      ]
    },
    type: "..."
  });
  ```
</details>

# Benchmark

Try small benchmark by yourself by executing a test to load random data and resize.
- https://output.jsbin.com/pecafih

> The runtime performance can be measured via chrome's devtool [Performance Monitor](https://developers.google.com/web/updates/2017/11/devtools-release-notes#perf-monitor).


# Deprecation

As anticipated by [#801](https://github.com/naver/billboard.js/issues/801), removed the `.transform()` API.