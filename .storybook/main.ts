import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../stories/**/*.stories.@(ts|tsx)"],
	addons: [],
	framework: {
		name: "@storybook/react-vite",
		options: {}
	},
	typescript: {
		reactDocgen: false
	}
};

export default config;
