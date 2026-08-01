import type {Meta, StoryObj} from "@storybook/react-vite";

import canvasBb, {
	canvas as canvasRenderer,
	grid as canvasGrid,
	line as canvasLine,
	selection as canvasSelection
} from "../../src/index.canvas";
import bb, {area, bar, grid, line, selection, zoom} from "../../src/index.esm";
import BillboardJS, {type IProp} from "../../src/react";

const chartStyle = {
	width: "720px",
	height: "360px"
};

const billboard = bb as unknown as IProp["bb"];
const canvasBillboard = canvasBb as unknown as IProp["bb"];
const lineType = line as IProp["type"];
const barType = bar as IProp["type"];
const areaType = area as IProp["type"];
const canvasLineType = canvasLine as IProp["type"];
const gridModule = grid as NonNullable<IProp["modules"]>[number];
const selectionModule = selection as NonNullable<IProp["modules"]>[number];
const zoomModule = zoom as NonNullable<IProp["modules"]>[number];
const canvasRendererModule = canvasRenderer as NonNullable<IProp["modules"]>[number];
const canvasGridModule = canvasGrid as NonNullable<IProp["modules"]>[number];
const canvasSelectionModule = canvasSelection as NonNullable<IProp["modules"]>[number];

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
		modules: [gridModule],
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
				r: 4
			}
		}
	}
};

export const Bar: Story = {
	args: {
		type: barType,
		modules: [gridModule],
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
		modules: [gridModule],
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

export const SelectableLine: Story = {
	args: {
		type: lineType,
		modules: [gridModule, selectionModule],
		options: {
			data: {
				columns: [
					["visits", 80, 160, 120, 240, 210, 310],
					["orders", 30, 60, 70, 110, 130, 170]
				],
				selection: {
					enabled: true,
					multiple: false
				}
			},
			axis: {
				x: {
					type: "category",
					categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
				}
			},
			point: {
				r: 5
			}
		}
	}
};

export const WithZoomModule: Story = {
	args: {
		type: lineType,
		modules: [gridModule, zoomModule],
		options: {
			data: {
				columns: [
					["sessions", 30, 120, 80, 170, 210, 260, 230, 310, 380, 420],
					["orders", 20, 40, 35, 60, 75, 90, 110, 120, 150, 170]
				]
			},
			zoom: {
				enabled: true,
				type: "drag"
			},
			point: {
				r: 4
			}
		}
	}
};

export const CanvasLine: Story = {
	args: {
		bb: canvasBillboard,
		type: canvasLineType,
		modules: [canvasRendererModule, canvasGridModule, canvasSelectionModule],
		options: {
			render: {
				mode: "canvas"
			},
			size: {
				width: 720,
				height: 360
			},
			transition: {
				duration: 0
			},
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250],
					["data2", 130, 100, 140, 200, 150, 50]
				],
				selection: {
					enabled: true,
					multiple: false
				}
			}
		}
	}
};
