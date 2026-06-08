import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
	testDir: "./",
	testMatch: "perf.spec.ts",
	timeout: 300_000,
	reporter: [["list"]],
	workers: 1, // sequential for stable measurements
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				headless: true
			}
		}
	]
});
