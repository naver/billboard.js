import {API_MODULE_NEEDED, TYPE_METHOD_NEEDED} from "../config/const";
import {window} from "./browser";
import {camelize, isEmpty} from "./util";

/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint no-console: "off" */
export {checkApiModuleImport, checkModuleImport, getTypeMethod, logError};

const MODULE_IMPORT_DOC = "https://github.com/naver/billboard.js/blob/master/MODULE_IMPORTS.md";

/**
 * Check chart type module imports.
 * The module of a type is there when the method it provides is: it is the same for the types
 * built in and for the types of their own module.
 * @param {ChartInternal} ctx Context
 * @private
 */
function checkModuleImport(ctx) {
	const $$ = ctx;
	const {config} = $$;
	// the types that are given: data.types takes precedence over data.type, and it is line by default
	const given =
		(isEmpty(config.data_types) ? [config.data_type] : Object.values(config.data_types))
			.filter(type => !isEmpty(type));
	const type = (given.length ? given : ["line"])
		.find(name => TYPE_METHOD_NEEDED[name] && !$$[TYPE_METHOD_NEEDED[name]]);

	type &&
		logError(`Please, make sure if %c${camelize(type)}`,
			"module has been imported and specified correctly.", MODULE_IMPORT_DOC);
}

/**
 * Get a method of a chart type module, for the part of the chart that is drawn by the mode.
 * It is not there when only a part of the module was imported: the types of "billboard.js/canvas"
 * have no part for the svg mode, for example.
 * @param {ChartInternal} ctx Context
 * @param {string} name Method name
 * @returns {function} Method
 * @private
 */
function getTypeMethod(ctx, name: string): (...args: any[]) => any {
	if (!ctx[name]) {
		logError(`Please, make sure if the module of %c${name}`,
			`is imported for render.mode='${ctx.config.render_mode}'. ` +
				"The modules of \"billboard.js/canvas\" draw only with render.mode='canvas'.",
			MODULE_IMPORT_DOC);
	}

	return ctx[name];
}

/**
 * Check optional API module import (e.g. export, flow).
 * Invoked by stubs on Chart.prototype when the corresponding resolver module
 * was not imported. Throws a helpful error pointing to the module the user
 * needs to import.
 * @param {string} apiName API name (key of API_MODULE_NEEDED)
 * @private
 */
function checkApiModuleImport(apiName: string): void {
	const moduleName = API_MODULE_NEEDED[apiName];

	moduleName &&
		logError(`Please, make sure if %c${moduleName}`,
			"module has been imported and specified correctly.", MODULE_IMPORT_DOC);
}

/**
 * Log error and throw error
 * @param {string} head Message header
 * @param {string} tail Message tail
 * @param {string} info Info message
 * @private
 */
function logError(head: string, tail?: string, info?: string): never {
	const prefix = "[billboard.js]";
	const hasConsole = window.console?.error;

	if (hasConsole) {
		const tailMsg = tail ?
			["background:red;color:white;display:block;font-size:15px", tail] :
			[];

		console.error(`❌ ${prefix} ${head}`,
			"background:red;color:white;display:block;font-size:15px", ...tailMsg);
		info && console.info("%cℹ️", "font-size:15px", info);
	}

	throw Error(`${prefix} ${head.replace(/\%c([a-z-]+)/i, "'$1'")}${tail ? ` ${tail}` : ""}`);
}
