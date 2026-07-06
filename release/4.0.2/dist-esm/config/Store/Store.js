/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import Element from './Element.js';
import State from './State.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// mapping
const classes = {
    element: Element,
    state: State
};
/**
 * Internal store class.
 * @class Store
 * @ignore
 * @private
 */
class Store {
    constructor() {
        Object.keys(classes).forEach(v => {
            this[v] = new classes[v]();
        });
    }
    getStore(name) {
        return this[name];
    }
}

export { Store as default };
