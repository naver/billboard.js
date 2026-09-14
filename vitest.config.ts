import {resolve} from "node:path";
import {defineConfig} from "vitest/config";
import {playwright} from "@vitest/browser-playwright";
import {getWorkerSource} from "./config/worker-src.js";

// Inject the separately bundled worker source the same way config/rolldown/esm.js
// does. `define` can't do it under Vite 8: the transform-time replacement quotes
// string values on its own, so a pre-stringified source lands double-encoded and
// the Blob ends up holding a string literal instead of the worker code.
// split/join rather than a regex: the minified source contains `${...}` sequences.
const workerSrcPlugin = {
    name: "bb-worker-src",
    async transform(code: string) {
        if (code.includes("__WORKER_SRC__")) {
            return {
                code: code.split("__WORKER_SRC__").join(JSON.stringify(await getWorkerSource())),
                map: null
            };
        }
    }
};

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

export default defineConfig(() => ({
    plugins: [utilAliasPlugin, workerSrcPlugin],
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
        testTimeout: 10_000,
        hookTimeout: 10_000,
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
        api: {
            host: "127.0.0.1"
        },
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
        open: !process.env.CI
    }
}));
