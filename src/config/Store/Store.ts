/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import element from "./element";
import state from "./state";
import {mergeObj} from "../../module/util";

export default class Store {
	private element;
	private state;

	constructor() {
		this.element = mergeObj({}, element);
		this.state = mergeObj({}, state);
	}

	getStore(name) {
		return this[name];
	}
}
