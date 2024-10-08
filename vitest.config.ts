import {resolve} from "node:path";
import {defineConfig} from "vitest/config";

export default defineConfig({
    optimizeDeps: {
        include: ["@vitest/coverage-istanbul"]
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
                silenceDeprecations: ["legacy-js-api"]
            }        
        }
    },
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
            provider: "playwright",
            name: "chromium",
            headless: true,
            viewport: {
                width: 800,
                height: 600
            },
            providerOptions: {
                launch: {
                  devtools: true
                }
            },
            screenshotFailures: false
        },
        alias: [
            {
                find: /(.*)\/module\/util/i,
                replacement: "./test/assets/module/util",
                customResolver(source, importer, options) {
                    if (/src/.test(<string>importer)) {
                        return resolve(__dirname, source + ".ts");
                    }
                },
            }
        ],
        css: {
            include: [
                /.+/
            ]
        },
        open: true
    }
});
