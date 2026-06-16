/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import { checkApiModuleImport } from '../../module/error.js';
import Chart from '../Chart.js';
import { extend } from '../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Self-installing stubs for optional API modules (export, flow, grid,
 * regions, category).
 *
 * Replaced by the real implementation when the matching resolver
 * (exportApi(), flow(), grid(), regions(), category()) is imported and
 * invoked. Until then, calling these chart methods surfaces an explicit
 * import-guidance error instead of the generic `is not a function` TypeError.
 *
 * Imported for side-effect only from the ESM entry (src/index.esm.ts).
 * UMD entry does not import this since it auto-installs the real APIs.
 * @private
 */
extend(Chart.prototype, [{
        export() {
            checkApiModuleImport("export");
        },
        flow() {
            checkApiModuleImport("flow");
        },
        xgrids() {
            checkApiModuleImport("xgrids");
        },
        ygrids() {
            checkApiModuleImport("ygrids");
        },
        regions() {
            checkApiModuleImport("regions");
        },
        category() {
            checkApiModuleImport("category");
        },
        categories() {
            checkApiModuleImport("categories");
        }
    }]);
