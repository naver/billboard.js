import type {Preview} from "@storybook/react-vite";

import "../src/scss/billboard.scss";

const preview: Preview = {
	parameters: {
		controls: {
			expanded: true
		},
		layout: "centered"
	}
};

export default preview;
