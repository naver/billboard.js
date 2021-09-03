import {select as d3Select} from "d3-selection";
import Plugin from "../Plugin";

/**
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {object} options bubble compare plugin options
 * @augments Plugin
 * @returns {BubbleCompare}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-bubblecompare.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */

export default class BubbleCompare extends Plugin {
	static version = `0.0.1`;
	public $$;

	constructor(options) {
		super(options);

		return this;
	}

	$init(): void {
		const {$$} = this;

		$$.findClosest = this.findClosest.bind(this);
		$$.getBubbleR = this.getBubbleR.bind(this);
		$$.pointExpandedR = this.pointExpandedR.bind(this);
	}

	pointExpandedR(d): number {
		const baseR = this.getBubbleR(d);
		const {expandScale = 1} = this.options;

		BubbleCompare.raiseFocusedBubbleLayer(d);
		this.changeCursorPoint();

		return baseR * expandScale;
	}

	static raiseFocusedBubbleLayer(d): void {
		d.raise && d3Select(d.node().parentNode.parentNode).raise();
	}

	changeCursorPoint(): void {
		this.$$.$el.svg.select(`.bb-event-rect`).style("cursor", "pointer");
	}

	findClosest(values, pos): number {
		const {$$} = this;

		return values
			.filter(v => v && !$$.isBarType(v.id))
			.reduce((acc, cur) => {
				const d = $$.dist(cur, pos);

				return d < this.getBubbleR(cur) ? cur : acc;
			}, 0);
	}

	getBubbleR(d): number {
		const {minR, maxR} = this.options;
		const curVal = this.getZData(d);

		if (!curVal) return minR;

		const [min, max] = this.$$.data.targets.reduce(
			([accMin, accMax], cur) => {
				const val = this.getZData(cur.values[0]);

				return [Math.min(accMin, val), Math.max(accMax, val)];
			},
			[10000, 0]
		);
		const size = min > 0 && max === min ? 0 : curVal / max;

		return Math.abs(size) * (maxR - minR) + minR;
	}

	getZData(d): number {
		return this.$$.isBubbleZType(d) ?
			this.$$.getBubbleZData(d.value, "z") :
			d.value;
	}
}
