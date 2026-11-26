/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * sankey config options
 */
export default {
	/**
	 * Set sankey options.<br>
	 * A data series is a source node: its values are the links to the nodes named by `data.x`.
	 * A node can be a source and a target at once, which makes a flow of many steps.
	 * - **NOTE:** The links can't make a cycle (A → B → A). When they do, an error is logged and nothing is drawn.
	 * - **NOTE:** `data.x` is required. Without it, the target nodes are named by their indexes.
	 * - **NOTE:** The legend shows the source nodes only. A node that is only a target can't be toggled from the legend.
	 *
	 * The interactions:
	 * - [data.onover](#.data․onover), [data.onout](#.data․onout) and [data.onclick](#.data․onclick) are called with the data of a node `{id, index, value, name}`,
	 *  or of a link `{id, x, index, value, name, source, target}`, where `id` is the source node, `x` the target node and `name` is "source → target".
	 * - `.hide(id)` removes the node and all the links of it, the incoming links included.
	 * - `.focus(id)` and the legend hover dim the other nodes and their links.
	 *  A node that is only a target is dimmed when all the links coming to it are.
	 * @name sankey
	 * @memberof Options
	 * @type {object}
	 * @property {object} sankey Sankey object
	 * @property {boolean} [sankey.rotated=false] Make the flow go down instead of to the right.
	 *  The nodes of a step are then in a row, and the steps go from the top to the bottom.
	 * @property {number} [sankey.node.width=20] The thickness of the nodes along the flow in pixels: the height of the nodes when rotated.
	 * @property {number} [sankey.node.padding=10] The space between the nodes of a step in pixels.
	 * @property {string} [sankey.node.align="justify"] How the nodes are placed in the columns.
	 *  - **justify**: as `left`, and the nodes without outgoing links go to the last column
	 *  - **left**: by the number of the links from the sources
	 *  - **right**: by the number of the links to the last nodes
	 *  - **center**: as `left`, and the nodes without incoming links go next to their targets
	 * @property {string} [sankey.link.color="source"] The color of the links.
	 *  - **source**: the color of the source node
	 *  - **target**: the color of the target node
	 *  - **gradient**: a gradient from the color of the source node to the color of the target node
	 * @property {number} [sankey.link.opacity] The opacity of the links, from 0 to 1.
	 *  When it isn't set, the opacity is of the stylesheet (0.4 by the default themes). In SVG, a hovered link is 0.3 more opaque.
	 * @property {string|function} [sankey.node.sort="auto"] The order of the nodes in a step.
	 *  - **auto**: the layout orders them, to have less crossing links
	 *  - **data**: the order the nodes appear in the data: a series, then the nodes of its links, then the next series
	 *  - **asc**, **desc**: by the value of the nodes
	 *  - **function(a, b)**: a comparator of the data of two nodes `{id, index, value, name}`, as for `Array.sort()`
	 *  - **NOTE:** A set order (other than "auto") is kept: the layout moves the nodes, but doesn't change their order.
	 * @property {number} [sankey.node.border.width=0] The width of the border of the nodes in pixels.
	 * @property {string} [sankey.node.border.color="#000"] The color of the border of the nodes.
	 * @property {number} [sankey.iterations=6] The number of the passes to place the nodes vertically.
	 * @property {boolean} [sankey.label.show=true] Show the names of the nodes.
	 * @property {function} [sankey.label.format] Set the formatter of the node names.
	 *  - **NOTE:** The arguments are the name, the value and the id of the node.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.SankeyChart)
	 * @example
	 *  data: {
	 *      x: "x",
	 *      columns: [
	 *          // the target nodes
	 *          ["x", "B", "C", "D"],
	 *          // the links of the source node A: A → B 5, A → C 3
	 *          ["A", 5, 3, 0],
	 *          // B is a target and a source
	 *          ["B", 0, 2, 4]
	 *      ],
	 *      type: "sankey"  // for ESM, import {sankey} from "billboard.js" and do type: sankey()
	 *  },
	 *  sankey: {
	 *      node: {
	 *          width: 20,
	 *          padding: 15,
	 *          align: "left",
	 *          sort: "desc",
	 *          border: {
	 *              width: 1,
	 *              color: "#fff"
	 *          }
	 *      },
	 *      rotated: true,
	 *      link: {
	 *          color: "gradient",
	 *          opacity: 0.6
	 *      },
	 *      iterations: 10,
	 *      label: {
	 *          show: true,
	 *          format: function(name, value, id) {
	 *              return name + " (" + value + ")";
	 *          }
	 *      }
	 *  }
	 */
	sankey_rotated: false,
	sankey_node_width: 20,
	sankey_node_padding: 10,
	sankey_node_align: <"justify" | "left" | "right" | "center">"justify",
	sankey_node_sort: <"auto" | "data" | "asc" | "desc" | ((a, b) => number)>"auto",
	sankey_node_border_width: 0,
	sankey_node_border_color: "#000",
	sankey_link_color: <"source" | "target" | "gradient">"source",
	sankey_link_opacity: <number | undefined>undefined,
	sankey_iterations: 6,
	sankey_label_show: true,
	sankey_label_format: <
		| ((name: string, value: number, id: string) => string)
		| undefined
	>undefined
};
