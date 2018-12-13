/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Options from "./Options";
import ChartInternal from "../internals/ChartInternal";
import {isDefined, isObjectType, extend} from "../internals/util";

extend(ChartInternal.prototype, {
	getOptions() {
		return new Options();
	},

	/**
	 * Load configuration option
	 * @param {Object} config User's generation config value
	 * @private
	 */
	loadConfig(config) {
		const thisConfig = this.config;
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
	}
});
