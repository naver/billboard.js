/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * scatter config options
 */
var optScatter = {
    /**
     * Set scatter options
     * @name scatter
     * @memberof Options
     * @type {object}
     * @property {object} [scatter] scatter object
     * @property {boolean} [scatter.zerobased=false] Set if min or max value will be 0 on scatter chart.
     * @example
     *  scatter: {
     *      connectNull: true,
     *      step: {
     *          type: "step-after"
     *      },
     *
     *      // hide all data points ('point.show=false' also has similar effect)
     *      point: false,
     *
     *      // show data points for only indicated data
     *      point: [
     *          "data1", "data3"
     *      ],
     *
     *      zerobased: false
     *  }
     */
    scatter_zerobased: false
};

export { optScatter as default };
