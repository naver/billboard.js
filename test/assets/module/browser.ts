/**
 * Test purpose to be consumed from module replacement: /src/module/util.ts
 */
/* eslint-disable */
// @ts-nocheck
export {window, document, requestAnimationFrame, requestIdleCallback} from "../../../src/module/browser";
