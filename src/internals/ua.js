/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {extend} from "./util";

const ua = window.navigator.userAgent;

extend(ChartInternal.prototype, {
	isSafari() {
		return ua.indexOf("Safari") > -1 && !this.isChrome();
	},

	isChrome() {
		return ua.indexOf("Chrome") > -1;
	},

	isMobile() {
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
		return ua.indexOf("Mobi") > -1;
	}
});
