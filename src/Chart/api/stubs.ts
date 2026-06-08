/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {checkApiModuleImport} from "../../module/error";
import {extend} from "../../module/util";
import Chart from "../Chart";

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
	export(): void {
		checkApiModuleImport("export");
	},
	flow(): void {
		checkApiModuleImport("flow");
	},
	xgrids(): void {
		checkApiModuleImport("xgrids");
	},
	ygrids(): void {
		checkApiModuleImport("ygrids");
	},
	regions(): void {
		checkApiModuleImport("regions");
	},
	category(): void {
		checkApiModuleImport("category");
	},
	categories(): void {
		checkApiModuleImport("categories");
	}
}]);
