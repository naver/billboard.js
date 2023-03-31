# @billboard.js/react

React component for billboard.js

## Installation

```bash
# Install billboard.js together if you don't have it already
$ npm install billboard.js @billboard.js/react
```

## How to use

> ℹ️ The component will create a `<div>` element and append it to the parent element and [`bindto`](https://naver.github.io/billboard.js/release/latest/doc/Options.html#.bindto) option is not supported in this case.

### Basic Usage

```jsx
import React, {useEffect, useRef} from "react";

// import billboard.js
import bb, {line} from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

// import react wrapper
import BillboardJS, {IChart} from "@billboard.js/react";
// const BillboardJS = require("@billboard.js/react");  // for CJS

function App() {
    // to get the instance, create ref and pass it to the component
    const chartComponent = useRef<IChart>(null);
    const options = {
        data: {
            columns: [
                ["data1", 300, 350, 300]
            ],
            type: line()
        }
    };

    useEffect(() => {
        // get the instance from ref
		const chart = chartComponent.current?.instance;

        // call APIs
        if (chart) {
            chart.load( ... );
        }
    }, []);

    return <BillboardJS 
        bb={bb}
        options={options}
        ref={chartComponent}

        /* The values will be specified to the bound element as inlined styles */
        style={{
            width: "500px",
            ...
        }}

        /* When class name doesn't contains `bb`,
           then you also need to update the default CSS to be rendered correctly. */
        className={"bb my-classname"}
    />;
}
```

### Using `props` passed to the component

When the options are passed to the "chart" component.

```js
// index.tsx
import App from "./App.tsx";

const options = {
    data: {
        columns: [
            ["data1", 300, 350, 300]
        ],
        type: "bar"
    }
};

<App {...options} />

// or
// <App data={
//     columns: [
//         ["data1", 300, 350, 300]
//     ],
//     type: "bar"
// } />

// App.tsx
import * as Chart from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css
import BillboardJS, {IChart, IChartOptions} from "../src/index";

export function App(props: IChartOptions) {
    const chartComponent = useRef<IChart>(null);

    // when chart "type" is passed from props, chart types need to be initialized separately.
    // in this scenario, can't be "tree-shaken" only used chart type modules.
    Chart[props.data.type]();

    useEffect(() => {
        const chart = chartComponent.current?.instance;

        if (chart) {
            chart.load( ... );
        }
    }, []);

    return <BillboardJS 
        bb={Chart.bb} 
        options={props} 
        ref={chartComponent}
     />;
}
```

### TypeScript Interfaces

```ts
// chart options
interface IChartOptions;

// @billboard.js/react props
interface IProp extends Pick<HTMLProps<HTMLDivElement>, "className" | "style"> {
	bb: typeof bb;
	options: ChartOptions;
}

// Chart instance
interface IChart {
	instance: Chart;
}
```
