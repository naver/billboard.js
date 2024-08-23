import eslint from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ["**/*.*(m|c)js", "node_modules/"]
    },
    ...[
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        jsdoc.configs["flat/recommended"],
    ].map(conf => ({
        ...conf,
        files: ["src/**/*.ts"]
    })),
    {
        files: ["src/**/*.ts"],        
        plugins: {
            jsdoc,
            "@typescript-eslint": tseslint.plugin,
        },
        languageOptions: {
            sourceType: "module",
            // parser: "@typescript-eslint/parser",
            parser: tseslint.parser,
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: false
        },
        rules: {
            // deprecated rules
            // https://eslint.org/blog/2023/10/deprecating-formatting-rules/#the-deprecated-rules
            "linebreak-style": 0,
            "comma-dangle": 0,
            "array-element-newline": 0,
            "spaced-comment": ["error", "always", {
                exceptions: ["-", "+"],
                markers: ["/"]
            }],
            "indent": 0,
            "keyword-spacing": 0,
            // end of deprecated rules

            "array-bracket-newline": 0,
            "consistent-this": 0,
            "camelcase": 0,
            "no-nested-ternary": 0,
            "object-shorthand": 0,
            "no-lonely-if": 0,
            "no-shadow": 0,
            "default-case": 0,
            "class-methods-use-this": 0,
            "no-useless-escape": 0,
            "no-loop-func": 0,
            "no-use-before-define": 0,
            "no-console": [
                "error", {
                    allow: ["error"]
                }
            ],
            "import/prefer-default-export": 0,
            "no-constant-binary-expression": 0,
            "no-empty": 0,
            "no-sequences": 0,
            "no-unused-vars": "off",

            // typescript rules
            "@typescript-eslint/ban-ts-comment": 0,
            "@typescript-eslint/ban-types": 0,
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-this-alias": 0,
            "@typescript-eslint/no-unused-expressions": 0,
            "@typescript-eslint/no-unsafe-function-type": 0,
            "@typescript-eslint/no-unused-vars": [
                "error", {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: false
                }
            ],

            // jsdoc rules
            "jsdoc/newline-after-description": 0,
            "jsdoc/require-returns-description": 0,
            "jsdoc/no-undefined-types": 0,
            "jsdoc/valid-types": 0,
            "jsdoc/check-values": 0,
            "jsdoc/no-multi-asterisks": 0,
            "jsdoc/tag-lines": 0,
            "jsdoc/no-defaults": 0
        }
    }
];
