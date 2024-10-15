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
	 * @property {number} [legend.padding=0] Set padding value
	 * @property {boolean} [legend.item.interaction=true] Set legend item interaction.
	 *  - **NOTE:**
	 *    - This setting will not have effect on `.toggle()` method.
	 *    - `legend.item.onXXX` listener options will work if set, regardless of this option value.
	 * @property {boolean} [legend.item.interaction.dblclick=false] Set legend item to interact on double click.
	 *  - **NOTE:**
	 *    - Double clicking will make focused clicked dataseries only, hiding all others.
	 *      - for single click case, `click + altKey(Win)/optionKey(Mac OS)` to have same effect.
	 *    - To return initial state(which all dataseries are showing), double click current focused legend item again.
	 *      - for single click case, `click + altKey(Win)/optionKey(Mac OS)` to have same effect.
	 *    - In this case, default `click` interaction will be disabled.
	 * @property {Function} [legend.item.onclick=undefined] Set click event handler to the legend item.
	 *  - **NOTE:**
	 *    - When set, default `click` interaction will be disabled.
	 *    - When `interaction.dblclick=true` is set, will be called on double click.
	 * @property {Function} [legend.item.onover=undefined] Set mouse/touch over event handler to the legend item.
	 *  - **NOTE:** When set, default `mouseover` interaction will be disabled.
	 * @property {Function} [legend.item.onout=undefined] Set mouse/touch out event handler to the legend item.
	 *  - **NOTE:** When set, default `mouseout` interaction will be disabled.
	 * @property {number} [legend.item.tile.width=10] Set width for 'rectangle' legend item tile element.
	 * @property {number} [legend.item.tile.height=10] Set height for 'rectangle' legend item tile element.
	 * @property {number} [legend.item.tile.r=5] Set the radius for 'circle' legend item tile type.
	 * @property {string} [legend.item.tile.type="rectangle"] Set legend item shape type.<br>
	 * - **Available Values:**
	 *   - circle
	 *   - rectangle
	 * @property {boolean} [legend.format] Set formatter function for legend text.
	 * The argument:<br>
	 *  - `id`: Legend text value. When `data.names` is specified, will pass from it, otherwise will pass data id.
	 *  - `dataId`: When `data.names` specified, will pass the original data id. Otherwise will be undefined.
	 * @property {boolean} [legend.tooltip=false] Show full legend text value using system tooltip(via `<title>` element).
	 * @property {boolean} [legend.usePoint=false] Whether to use custom points in legend.
	 * @see [Demo: format](https://naver.github.io/billboard.js/demo/#Legend.LegendFormat)
	 * @see [Demo: item.interaction](https://naver.github.io/billboard.js/demo/#Legend.LegendItemInteraction)
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
	 *          // will disable default interaction
	 *          interaction: false,
	 *
	 *          // set legend interact on double click
	 *          // by double clicking, will make focused clicked dataseries only, hiding all others.
	 *          interaction: {
	 *            dblclick: true
	 *          }
	 *
	 *          // when set below callback, will disable corresponding default interactions
	 *          onclick: function(id, visible) {
	 *           	// toggle based on the data visibility
	 *           	this[visible ? "hide" : "show"](id);
	 *          },
	 *          onover: function(id, visible) { ... },
	 *          onout: function(id, visible) { ... },
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
	 *      format: function(id, dataId) {
	 *          // set ellipsis string when length is > 5
	 *          // to get full legend value, combine with 'legend.tooltip=true'
	 *          if (id.length > 5) {
	 *            	id = id.substr(0, 5) + "...";
	 *          }
	 *
	 *          return id;
	 *      },
	 *      tooltip: true,
	 *      usePoint: true
	 *  }
	 */
	legend_contents_bindto: <string | HTMLElement | undefined>undefined,
	legend_contents_template: <string | (() => string)
		| undefined>"<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>",
	legend_equally: false,
	legend_hide: false,
	legend_inset_anchor: <"top-left" | "top-right" | "bottom-left" | "bottom-right">"top-left",
	legend_inset_x: 10,
	legend_inset_y: 0,
	legend_inset_step: <number | undefined>undefined,
	legend_item_interaction: <boolean | {dblclick?: boolean}>true,
	legend_item_dblclick: false,
	legend_item_onclick: <Function | undefined>undefined,
	legend_item_onover: <Function | undefined>undefined,
	legend_item_onout: <Function | undefined>undefined,
	legend_item_tile_width: 10,
	legend_item_tile_height: 10,
	legend_item_tile_r: 5,
	legend_item_tile_type: <"rectangle" | "circle">"rectangle",
	legend_format: <Function | undefined>undefined,
	legend_padding: 0,
	legend_position: <"bottom" | "right" | "inset">"bottom",
	legend_show: true,
	legend_tooltip: false,
	legend_usePoint: false
};
