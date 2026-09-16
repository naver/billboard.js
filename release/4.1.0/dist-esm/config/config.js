/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isDefined, isObjectType } from "../module/util/type-checks.js";
//#region src/config/config.ts
/**
* Load configuration option
* @param {object} config User's generation config value
* @private
*/
function loadConfig(config) {
	const thisConfig = this.config;
	let target;
	let keys;
	let read;
	const find = () => {
		const key = keys.shift();
		if (key && target && isObjectType(target) && key in target) {
			target = target[key];
			return find();
		} else if (!key) return target;
	};
	Object.keys(thisConfig).forEach((key) => {
		target = config;
		keys = key.split("_");
		read = find();
		if (isDefined(read)) thisConfig[key] = read;
	});
	if (this.api) this.state.orgConfig = config;
}
//#endregion
export { loadConfig };
