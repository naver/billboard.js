module.exports = {
	"stories": [
		"../stories/**/*.stories.mdx",
		"../stories/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-console",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions"
	],
	"framework": "@storybook/react",
	"core": {
		"builder": "@storybook/builder-vite"
	},
	"features": {
		"storyStoreV7": true
	},
	"reactOptions": {
		"legacyRootApi": false
	}
}