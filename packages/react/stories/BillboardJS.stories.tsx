import React, {ComponentStory, ComponentMeta} from "@storybook/react";

import bb, {bar, line, pie} from "billboard.js";
import "billboard.js/dist/billboard.css";
import BillboardJS from "../src/index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "@billboard.js/react",
	component: BillboardJS,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		backgroundColor: {control: "color"},
	},
} as ComponentMeta<typeof BillboardJS>;

const columns = [
	["data1", 30, 200, 100, 400, 150, 250],
	["data2", 130, 100, 140, 200, 150, 50]
];

const SingleTemplate: ComponentStory<any> =
	args => <BillboardJS bb={bb} options={args} />;

const MultiTemplate: ComponentStory<any> = args => <>
	{Object.keys(args).map((v, i) => <BillboardJS bb={bb} options={args[v]} key={i} />)}
</>;

export const Line = SingleTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Line.args = {
	data: {
		columns,
		type: line()
	}
};

export const Bar = SingleTemplate.bind({});
Bar.args = {
	data: {
		columns,
		type: bar()
	}
};

export const Pie = SingleTemplate.bind({});
Pie.args = {
	data: {
		columns,
		type: pie()
	}
};

export const Combination = SingleTemplate.bind({});
Combination.args = {
	data: {
		columns,
		types: {
			data1: bar(),
			data2: line()
		}
	}
};

export const Multiple = MultiTemplate.bind({});
Multiple.args = [
	{
		data: {
			columns,
			type: bar()
		}
	},
	{
		data: {
			columns,
			type: line()
		}
	}
];
