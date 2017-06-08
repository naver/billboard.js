/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {extend} from "./util";

extend(ChartInternal.prototype, {
	isSafari() {
		const ua = window.navigator.userAgent;

		return ua.indexOf("Safari") >= 0 &&
			ua.indexOf("Chrome") < 0;
	},

	isChrome() {
		return window.navigator.userAgent
			.indexOf("Chrome") >= 0;
	}
});
