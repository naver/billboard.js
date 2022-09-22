/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isDefined, isObjectType} from "../module/util";
import Options from "./Options/Options";
import type {ChartOptions} from "../../types/options";

/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
export function loadConfig(config: ChartOptions): void {
	const thisConfig: Options = this.config;
	let target;
	let keys;
	let read;

	const find = () => {
		const key = keys.shift();

		if (key && target && isObjectType(target) && key in target) {
			target = target[key];
			return find();
		} else if (!key) {
			return target;
		}

		return undefined;
	};

	Object.keys(thisConfig).forEach(key => {
		target = config;
		keys = key.split("_");
		read = find();

		if (isDefined(read)) {
			thisConfig[key] = read;
		}
	});

	// only should run in the ChartInternal context
	if (this.api) {
		this.state.orgConfig = config;
	}
}
