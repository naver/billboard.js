/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Element from "./Element";
import State from "./State";

// mapping
const classes = {
	element: Element,
	state: State
};

export default class Store {
	constructor() {
		Object.keys(classes).forEach(v => {
			this[v] = new classes[v]();
		});
	}

	getStore(name) {
		return this[name];
	}
}
