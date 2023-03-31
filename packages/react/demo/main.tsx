import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";

const options = {
	data: {
		columns: [
			["data1", 30, 200, 100, 400, 150, 250],
			["data2", 50, 20, 10, 40, 15, 25],
		],
		type: "area",
		empty: {
			label: {
				text: "No Data",
			},
		},
	}
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App {...options}/>
	</React.StrictMode>
);
