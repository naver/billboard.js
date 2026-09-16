/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
//#region src/config/Options/shape/bubble.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* bubble config options
*/
var bubble_default = {
	/**
	* Set bubble options
	* @name bubble
	* @memberof Options
	* @type {object}
	* @property {object} bubble bubble object
	* @property {number|function} [bubble.maxR=35] Set the max bubble radius value
	* @property {boolean} [bubble.zerobased=false] Set if min or max value will be 0 on bubble chart.
	* @example
	*  bubble: {
	*      // ex) If 100 is the highest value among data bound, the representation bubble of 100 will have radius of 50.
	*      // And the lesser will have radius relatively from the max value.
	*      maxR: 50,
	*
	*      // or set radius callback
	*      maxR: function(d) {
	*          // ex. of d param - {x: Fri Oct 06 2017 00:00:00 GMT+0900, value: 80, id: "data2", index: 5}
	*          ...
	*          return Math.sqrt(d.value * 2);
	*      },
	*      zerobased: false
	*  }
	*/
	bubble_maxR: 35,
	bubble_zerobased: false
};
//#endregion
export { bubble_default as default };
