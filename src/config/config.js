/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Options from "./Options";
import ChartInternal from "../internals/ChartInternal";
import {isDefined, merge, extend} from "../internals/util";

extend(ChartInternal.prototype, {
	getOptions() {
		const config = new Options();

		return merge(
			config.value,
			this.additionalConfig
		);
	},

	additionalConfig: {},

	loadConfig(config) {
		const thisConfig = this.config;
		let target;
		let keys;
		let read;

		function find() {
			const key = keys.shift();

			if (key && target && typeof target === "object" && key in target) {
				target = target[key];
				return find();
			} else if (!key) {
				return target;
			} else {
				return undefined;
			}
		}

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

