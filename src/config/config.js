/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Options from "./Options";
import ChartInternal from "../internals/ChartInternal";
import {isDefined, isObjectType, merge, extend} from "../internals/util";

extend(ChartInternal.prototype, {
	getOptions() {
		const config = new Options();

		return merge(
			config.value,
			this.additionalConfig
		);
	},

	additionalConfig: {},

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

