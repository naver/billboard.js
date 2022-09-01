/// <reference types="vitest" />

import {mergeConfig} from "vite";
import {defineConfig} from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, defineConfig({
	root: "test",
	test: {
		testTimeout: 3_000,
		hookTimeout: 5_000,
		globals: true
	}
}));
