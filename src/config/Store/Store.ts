/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Element from "./Element";
import State from "./State";

const classes = {
	element: Element,
	state: State
};

export default class Store {
	private element;
	private state;

	constructor() {
		this.element = new Element();
		this.state = new State();
	}

	getStore(name) {
		return this[name];
	}
}
