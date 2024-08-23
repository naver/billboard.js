/// <reference types="vitest" />

import {mergeConfig} from "vite";
import {defineConfig} from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, defineConfig({
	root: "test",
	test: {
		testTimeout: 3_000,
		hookTimeout: 5_000,
		globals: true,
		coverage: {
            provider: "istanbul",
            reporter: ["text-summary", "html", "lcovonly"],
            enabled: true,
            include: [
                "src/**/**",
            ],
            extension: ["ts"]
        }
	}
}));
