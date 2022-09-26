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
	 * - **NOTE:** Should be used along with `legend.contents.template`.
	 * @property {string|Function} [legend.contents.template="<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>"] Set item's template.<br>
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
	 * @property {number} [legend.item.tile.width=10] Set width for 'rectangle' legend item tile element.
	 * @property {number} [legend.item.tile.height=10] ㄹ
	 * @property {number} [legend.item.tile.r=5] Set the radius for 'circle' legend item tile type.
	 * @property {string} [legend.item.tile.type="rectangle"] Set legend item shape type.<br>
	 * - **Available Values:**
	 *   - circle
	 *   - rectangle
	 * @property {boolean} [legend.usePoint=false] Whether to use custom points in legend.
	 * @see [Demo: item.tile.type](https://naver.github.io/billboard.js/demo/#Legend.LegendItemTileType)
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
	 *              // set tile type
	 *              type: "circle"  // or "rectangle" (default)
	 *
	 *              // width & height, are only applicable for 'rectangle' legend type
	 *              width: 15,
	 *              height: 15
	 *
	 *              // radis is only applicable for 'circle' legend type
	 *              r: 10
	 *          }
	 *      },
	 *      usePoint: true
	 *  }
	 */
	legend_show: true,
	legend_hide: false,
	legend_contents_bindto: <string|HTMLElement|undefined> undefined,
	legend_contents_template: <string|(() => string)|undefined> "<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>",
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
	legend_item_tile_r: 5,
	legend_item_tile_type: <"rectangle"|"circle"> "rectangle",
	legend_usePoint: false
};
