# @billboard.js/react

React component for billboard.js

## Installation

```bash
# Install billboard.js together if you don't have it already
$ npm install billboard.js @billboard.js/react
```

## How to use

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
    const chartComponent = useRef<IChart>();
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

    return <div style={{width: "500px"}}>
        <BillboardJS bb={bb} options={options} ref={chartComponent} />
    </div>;
}
```
