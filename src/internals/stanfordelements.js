import {extend} from "./util";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {getCentroid} from "./stanford";

extend(ChartInternal.prototype, {
	initStanfordElements() {
		const $$ = this;

		// MEMO: Avoid blocking eventRect
		$$.stanfordElements = $$.main.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.stanfordElements);

		$$.stanfordElements.append("g").attr("class", CLASS.stanfordLines);
		$$.stanfordElements.append("g").attr("class", CLASS.stanfordRegions);
	},
	updateStanfordLines(duration) {
		const $$ = this;
		const main = $$.main;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const xvCustom = $$.xvCustom.bind($$);
		const yvCustom = $$.yvCustom.bind($$);

		// Stanford-Lines
		const stanfordLine = main.select(`.${CLASS.stanfordLines}`)
			.style("shape-rendering", "geometricprecision")
			.selectAll(`.${CLASS.stanfordLine}`)
			.data(config.stanford_lines);

		// exit
		stanfordLine.exit().transition()
			.duration(duration)
			.style("opacity", 0)
			.remove();

		// enter
		const stanfordLineEnter = stanfordLine.enter().append("g");

		stanfordLineEnter.append("line")
			.style("opacity", 0);

		$$.stanfordLines = stanfordLineEnter.merge(stanfordLine);

		// update
		$$.stanfordLines
			.attr("class", d => CLASS.stanfordLine + (d.class ? ` ${d.class}` : ""))
			.select("line")
			.transition()
			.duration(duration)
			.attr("x1", d => (isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1")))
			.attr("x2", d => (isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2")))
			.attr("y1", d => (isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1")))
			.attr("y2", d => (isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2")))
			.transition()
			.style("opacity", 1);
	},
	updateStanfordRegions(duration) {
		const $$ = this;
		const main = $$.main;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const xvCustom = $$.xvCustom.bind($$);
		const yvCustom = $$.yvCustom.bind($$);
		const countPointsInRegion = $$.countEpochsInRegion.bind($$);

		// Stanford-Regions
		const stanfordRegion = main.select(`.${CLASS.stanfordRegions}`).selectAll(`.${CLASS.stanfordRegion}`)
			.data(config.stanford_regions);

		// exit
		stanfordRegion.exit().transition()
			.duration(duration)
			.style("opacity", 0)
			.remove();

		// enter
		const stanfordRegionEnter = stanfordRegion.enter().append("g");

		stanfordRegionEnter.append("polygon")
			.style("opacity", 0);

		stanfordRegionEnter.append("text")
			.attr("transform", isRotated ? "rotate(-90)" : "")
			.style("opacity", 0);

		$$.stanfordRegions = stanfordRegionEnter.merge(stanfordRegion);

		// update
		$$.stanfordRegions
			.attr("class", d => CLASS.stanfordRegion + (d.class ? ` ${d.class}` : ""))
			.select("polygon")
			.transition()
			.duration(duration)
			.attr("points", d => d.points.map(value => [
				isRotated ? yvCustom(value, "y") : xvCustom(value, "x"),
				isRotated ? xvCustom(value, "x") : yvCustom(value, "y")
			].join(",")).join(" "))
			.transition()
			.style("opacity", d => (d.opacity ? d.opacity : 0.2));

		$$.stanfordRegions.select("text")
			.transition()
			.duration(duration)
			.attr("x", d => (isRotated ? yvCustom(getCentroid(d.points), "y") : xvCustom(getCentroid(d.points), "x")))
			.attr("y", d => (isRotated ? xvCustom(getCentroid(d.points), "x") : yvCustom(getCentroid(d.points), "y")))
			.text(d => {
				if (d.text) {
					if ($$.hasType("stanford")) {
						const {value, percentage} = countPointsInRegion(d.points);

						return d.text(value, percentage);
					}

					return d.text();
				}

				return "";
			})
			.attr("text-anchor", "middle")
			.attr("dominant-baseline", "middle")
			.transition()
			.style("opacity", 1);
	},
	updateStanfordElements(duration) {
		this.updateStanfordLines(duration);
		this.updateStanfordRegions(duration);
	}
});
