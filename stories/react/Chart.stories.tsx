import type {Meta, StoryObj} from "@storybook/react-vite";

import bb, {area, bar, line, zoom} from "../../src/index.esm";
import BillboardJS, {type IProp} from "../../src/react";

const chartStyle = {
	width: "720px",
	height: "360px"
};

const billboard = bb as unknown as IProp["bb"];
const lineType = line as IProp["type"];
const barType = bar as IProp["type"];
const areaType = area as IProp["type"];
const zoomModule = zoom as NonNullable<IProp["modules"]>[number];

const meta = {
	title: "React/Chart",
	component: BillboardJS,
	parameters: {
		layout: "centered"
	},
	args: {
		bb: billboard,
		style: chartStyle
	}
} satisfies Meta<typeof BillboardJS>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Line: Story = {
	args: {
		type: lineType,
		options: {
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250],
					["data2", 130, 100, 140, 200, 150, 50]
				]
			},
			axis: {
				x: {
					type: "category",
					categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
				}
			},
			point: {
				show: false
			}
		}
	}
};

export const Bar: Story = {
	args: {
		type: barType,
		options: {
			data: {
				columns: [
					["desktop", 180, 240, 290, 380, 420, 470],
					["mobile", 120, 180, 240, 300, 360, 410]
				]
			},
			axis: {
				x: {
					type: "category",
					categories: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"]
				}
			}
		}
	}
};

export const Area: Story = {
	args: {
		type: areaType,
		options: {
			data: {
				columns: [
					["search", 120, 160, 140, 220, 260, 300],
					["direct", 80, 110, 150, 170, 220, 250]
				]
			},
			axis: {
				x: {
					type: "category",
					categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
				}
			}
		}
	}
};

export const WithZoomModule: Story = {
	args: {
		type: lineType,
		modules: [zoomModule],
		options: {
			data: {
				columns: [
					["sessions", 30, 120, 80, 170, 210, 260, 230, 310, 380, 420],
					["orders", 20, 40, 35, 60, 75, 90, 110, 120, 150, 170]
				]
			},
			zoom: {
				enabled: true
			},
			point: {
				show: false
			}
		}
	}
};
