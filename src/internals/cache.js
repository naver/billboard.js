/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {extend} from "./util";

extend(ChartInternal.prototype, {
	hasCaches(ids) {
		for (let i = 0; i < ids.length; i++) {
			if (!(ids[i] in this.cache)) {
				return false;
			}
		}

		return true;
	},

	addCache(id, target) {
		this.cache[id] = this.cloneTarget(target);
	},

	getCaches(ids) {
		const targets = [];

		for (let i = 0; i < ids.length; i++) {
			if (ids[i] in this.cache) {
				targets.push(this.cloneTarget(this.cache[ids[i]]));
			}
		}
		return targets;
	}
});
