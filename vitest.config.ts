import {resolve} from "node:path";
import {defineConfig} from "vitest/config";
import {playwright} from "@vitest/browser-playwright";

const utilAliasPlugin = {
    name: "util-alias-resolver",
    enforce: "pre" as const,
    resolveId(source: string, importer: string | undefined) {
        if (/\/module\/util/i.test(source) && importer) {
            const cleanImporter = importer.split("?")[0];

            // Only redirect src/ imports to the test stub;
            // let the test stub itself resolve to the real src/module/util
            if (/\/src\//.test(cleanImporter) && !/test\/assets/.test(cleanImporter)) {
                return resolve(__dirname, "./test/assets/module/util.ts");
            }
        }
    }
};

export default defineConfig({
    plugins: [utilAliasPlugin],
    optimizeDeps: {
        include: ["@vitest/coverage-istanbul"]
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["legacy-js-api"]
            }
        }
    },
    test: {
        testTimeout: 3_500,
        hookTimeout: 5_000,
        globals: true,
        coverage: {
            provider: "istanbul",
            reporter: ["text-summary", "html", "lcovonly"],
            enabled: true,
            include: [
                `src/**/**.{ts, tsx}`,
            ]
        },
        include: [
            "test/**/*-spec.ts"
        ],
        exclude: [
            "src/**/**",
            "demo/**/**",
            "config/**/**",
            "packages/**/**",
        ],
        setupFiles: [
            "test/assets/common.css",
            "src/scss/billboard.scss"
        ],
        pool: "threads",
        browser: {
            enabled: true,
            provider:  playwright(),
            headless: true,
            viewport: {
                width: 800,
                height: 600
            },
            instances: [
                {
                    browser: "chromium"
                }
            ],
            screenshotFailures: false
        },
        css: {
            include: [
                /.+/
            ]
        },
        open: true
    }
});
