import React, {useEffect, useRef} from "react";

import bb, {bar, line} from "billboard.js";
import * as BB from "billboard.js";
import "billboard.js/dist/billboard.css";
import BillboardJS, {IChart} from "../src/index";
// import BillboardJS, {IChart} from "@billboard.js/react";

/**
 * Default App
 * @param {object} props props given to the component
 * @returns {JSX.Element}
 */
function App(props) {
	const chartComponent = useRef<IChart>(null);

	const d = {
		data: {
			columns: [
				["data1", 300, 350, 300],
				["data4", 30, 20, 50]
			],
			type: line()
		}
	};

	const d2 = {
		data: {
			columns: [
				["data1", 100, 250, 100],
				["data2", 300, 120, 250]
			],
			type: bar()
		}
	};

	BB[props.data.type]();

	// if (props.data?.type === "area") {
	// 	area();
	// }

	useEffect(() => {
		const chart = chartComponent.current?.instance;

		if (chart) {
			chart.load({
				columns: [
					["data1", 130, 120, 150],
					["data4", 30, 20, 50]
				],
				unload: true
			});
		}

		// @ts-ignore
		// expose all instances to global
		window.charts = chart.internal.charts;
	}, []);

	return (
		<div className="App" style={{width: "500px"}}>
			<BillboardJS bb={bb} options={d} ref={chartComponent} />
			<BillboardJS bb={bb} options={d2} style={{
				width: "800px",
				border: "solid 1px red"
			}} />

			{/* passing given props */}
			<BillboardJS bb={bb} options={props} className={"bb my-class"} />
		</div>
	);
}

export default App;
