/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * legend config options
 */
export default {
	/**
	 * Legend options
	 * @name legend
	 * @memberof Options
	 * @type {object}
	 * @property {object} legend Legend object
	 * @property {boolean} [legend.show=true] Show or hide legend.
	 * @property {boolean} [legend.hide=false] Hide legend
	 *  If true given, all legend will be hidden. If string or array given, only the legend that has the id will be hidden.
	 * @property {string|HTMLElement} [legend.contents.bindto=undefined] Set CSS selector or element reference to bind legend items.
	 * @property {string|Function} [legend.contents.template=undefined] Set item's template.<br>
	 *  - If set `string` value, within template the 'color' and 'title' can be replaced using template-like syntax string:
	 *    - {=COLOR}: data color value
	 *    - {=TITLE}: data title value
	 *  - If set `function` value, will pass following arguments to the given function:
	 *   - title {string}: data's id value
	 *   - color {string}: color string
	 *   - data {Array}: data array
	 * @property {string} [legend.position=bottom] Change the position of legend.<br>
	 *  Available values are: `bottom`, `right` and `inset` are supported.
	 * @property {object} [legend.inset={anchor: 'top-left',x: 10,y: 0,step: undefined}] Change inset legend attributes.<br>
	 *  This option accepts object that has the keys `anchor`, `x`, `y` and `step`.
	 *  - **anchor** decides the position of the legend:
	 *   - top-left
	 *   - top-right
	 *   - bottom-left
	 *   - bottom-right
	 *  - **x** and **y**:
	 *   - set the position of the legend based on the anchor.
	 *  - **step**:
	 *   - defines the max step the legend has (e.g. If 2 set and legend has 3 legend item, the legend 2 columns).
	 * @property {boolean} [legend.equally=false] Set to all items have same width size.
	 * @property {boolean} [legend.padding=0] Set padding value
	 * @property {Function} [legend.item.onclick=undefined] Set click event handler to the legend item.
	 * @property {Function} [legend.item.onover=undefined] Set mouse/touch over event handler to the legend item.
	 * @property {Function} [legend.item.onout=undefined] Set mouse/touch out event handler to the legend item.
	 * @property {number} [legend.item.tile.width=10] Set width of item tile element
	 * @property {number} [legend.item.tile.height=10] Set height of item tile element
	 * @property {boolean} [legend.usePoint=false] Whether to use custom points in legend.
	 * @see [Demo: position](https://naver.github.io/billboard.js/demo/#Legend.LegendPosition)
	 * @see [Demo: contents.template](https://naver.github.io/billboard.js/demo/#Legend.LegendTemplate1)
	 * @see [Demo: usePoint](https://naver.github.io/billboard.js/demo/#Legend.usePoint)
	 * @example
	 *  legend: {
	 *      show: true,
	 *      hide: true,
	 *      //or hide: "data1"
	 *      //or hide: ["data1", "data2"]
	 *      contents: {
	 *          bindto: "#legend",   // <ul id='legend'></ul>
	 *
	 *          // will be as: <li style='background-color:#1f77b4'>data1</li>
	 *          template: "<li style='background-color:{=COLOR}'>{=TITLE}</li>"
	 *
	 *          // or using function
	 *          template: function(id, color, data) {
	 *               // if you want omit some legend, return falsy value
	 *               if (id !== "data1") {
	 *                    return "<li style='background-color:"+ color +">"+ id +"</li>";
	 *               }
	 *          }
	 *      },
	 *      position: "bottom",  // bottom, right, inset
	 *      inset: {
	 *          anchor: "top-right"  // top-left, top-right, bottom-left, bottom-right
	 *          x: 20,
	 *          y: 10,
	 *          step: 2
	 *      },
	 *      equally: false,
	 *      padding: 10,
	 *      item: {
	 *          onclick: function(id) { ... },
	 *          onover: function(id) { ... },
	 *          onout: function(id) { ... },
	 *
	 *          // set tile's size
	 *          tile: {
	 *              width: 20,
	 *              height: 15
	 *          }
	 *      },
	 *      usePoint: true
	 *  }
	 */
	legend_show: true,
	legend_hide: false,
	legend_contents_bindto: <string|HTMLElement|undefined> undefined,
	legend_contents_template: <string|(() => string)|undefined>undefined,
	legend_position: <"bottom"|"right"|"inset"> "bottom",
	legend_inset_anchor: <"top-left"|"top-right"|"bottom-left"|"bottom-right"> "top-left",
	legend_inset_x: 10,
	legend_inset_y: 0,
	legend_inset_step: <number|undefined> undefined,
	legend_item_onclick: <Function|undefined> undefined,
	legend_item_onover: <Function|undefined> undefined,
	legend_item_onout: <Function|undefined> undefined,
	legend_equally: false,
	legend_padding: 0,
	legend_item_tile_width: 10,
	legend_item_tile_height: 10,
	legend_usePoint: false
};
