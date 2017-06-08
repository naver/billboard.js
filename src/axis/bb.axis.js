/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	scaleLinear as d3ScaleLinear,
	select as d3Select
} from "d3";

// Features:
// 1. category axis
// 2. ceil values of translate/x/y to int for half pixel antialiasing
// 3. multiline tick text
let tickTextCharSize;

export default function(params = {}) {
	let scale = d3ScaleLinear();
	let orient = "bottom";
	const innerTickSize = 6;
	const outerTickSize = params.withOuterTick ? 6 : 0;
	const tickPadding = 3;
	let tickValues = null;
	let tickFormat;
	let tickArguments;
	let tickOffset = 0;
	let tickCulling = true;
	let tickCentered;
	let transition;

	function axisX(selection, x) {
		selection.attr("transform", d => `translate(${Math.ceil(x(d) + tickOffset)}, 0)`);
	}

	function axisY(selection, y) {
		selection.attr("transform", d => `translate(0,${Math.ceil(y(d))})`);
	}

	function scaleExtent(domain) {
		const start = domain[0];
		const stop = domain[domain.length - 1];

		return start < stop ? [start, stop] : [stop, start];
	}

	function generateTicks(scale) {
		const ticks = [];

		if (scale.ticks) {
			return scale.ticks(
				...(tickArguments ? Array.prototype.slice.call(tickArguments) : [])
			).map(v => (
				// round the tick value if is number
				/(string|number)/.test(typeof v) && !isNaN(v) ?
					Math.round(v * 10) / 10 : v
			));
		}

		const domain = scale.domain();

		for (let i = Math.ceil(domain[0]); i < domain[1]; i++) {
			ticks.push(i);
		}

		if (ticks.length > 0 && ticks[0] > 0) {
			ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));
		}

		return ticks;
	}

	function copyScale() {
		const newScale = scale.copy();

		if (params.isCategory || !newScale.domain().length) {
			const domain = scale.domain();

			newScale.domain([domain[0], domain[1] - 1]);
		}

		return newScale;
	}

	function textFormatted(v) {
		const formatted = tickFormat ? tickFormat(v) : v;

		return typeof formatted !== "undefined" ? formatted : "";
	}

	function getSizeFor1Char(tick) {
		if (tickTextCharSize) {
			return tickTextCharSize;
		}
		const size = {
			h: 11.5,
			w: 5.5,
		};

		tick.select("text")
			.text(textFormatted)
			.each(function(d) {
				const box = this.getBoundingClientRect();
				const text = textFormatted(d);
				const h = box.height;
				const w = text ? (box.width / text.length) : undefined;

				if (h && w) {
					size.h = h;
					size.w = w;
				}
			})
			.text("");

		tickTextCharSize = size;

		return size;
	}

	function transitionise(selection) {
		return params.withoutTransition ?
			selection : selection.transition(transition);
	}

	function axis(g) {
		g.each(function() {
			const g = d3Select(this);

			axis.g = g;

			let scale0 = this.__chart__ || scale;
			let scale1 = copyScale();

			this.__chart__ = scale1;

			// count of tick data in array
			const ticks = tickValues || generateTicks(scale1);

			// update selection
			let tick = g.selectAll(".tick")
				.data(ticks, scale1);

			// enter selection
			const tickEnter = tick
				.enter()
				.insert("g", ".domain")
				.attr("class", "tick")
				.style("opacity", "1");

			// MEMO: No exit transition. The reason is this transition affects max tick width calculation because old tick will be included in the ticks.
			const tickExit = tick.exit().remove();

			// enter + update selection
			tick = tickEnter.merge(tick);

			const tickUpdate = transitionise(tick).style("opacity", "1");
			let tickTransform;
			let tickX;
			let tickY;

			const range = scale.rangeExtent ? scale.rangeExtent() : scaleExtent(scale.range());

			// update selection - data join
			const path = g.selectAll(".domain").data([0]);

			// enter + update selection
			const pathUpdate = path.enter()
				.append("path")
				.attr("class", "domain")
				.merge(transitionise(path));

			tickEnter.append("line");
			tickEnter.append("text");

			const lineEnter = tickEnter.select("line");
			const lineUpdate = tickUpdate.select("line");
			const textEnter = tickEnter.select("text");
			const textUpdate = tickUpdate.select("text");

			if (params.isCategory) {
				tickOffset = Math.ceil((scale1(1) - scale1(0)) / 2);
				tickX = tickCentered ? 0 : tickOffset;
				tickY = tickCentered ? tickOffset : 0;
			} else {
				tickX = 0;
				tickOffset = tickX;
			}

			let tspan;
			const sizeFor1Char = getSizeFor1Char(g.select(".tick"));
			const counts = [];
			const tickLength = Math.max(innerTickSize, 0) + tickPadding;
			const isVertical = orient === "left" || orient === "right";

			// this should be called only when category axis
			function splitTickText(d, maxWidthValue) {
				const tickText = textFormatted(d);
				const splitted = [];
				let maxWidth = maxWidthValue;
				let subtext;
				let spaceIndex;
				let textWidth;

				if (Object.prototype.toString.call(tickText) === "[object Array]") {
					return tickText;
				}

				if (!maxWidth || maxWidth <= 0) {
					maxWidth = isVertical ?
						95 : params.isCategory ?
							(Math.ceil(scale1(ticks[1]) - scale1(ticks[0])) - 12) : 110;
				}

				function split(splitted, text) {
					spaceIndex = undefined;
					for (let i = 1; i < text.length; i++) {
						if (text.charAt(i) === " ") {
							spaceIndex = i;
						}
						subtext = text.substr(0, i + 1);
						textWidth = sizeFor1Char.w * subtext.length;

						// if text width gets over tick width, split by space index or crrent index
						if (maxWidth < textWidth) {
							return split(
								splitted.concat(text.substr(0, spaceIndex || i)),
								text.slice(spaceIndex ? spaceIndex + 1 : i)
							);
						}
					}

					return splitted.concat(text);
				}

				return split(splitted, String(tickText));
			}

			function tspanDy(d, i) {
				let dy = sizeFor1Char.h;

				if (i === 0) {
					dy = (orient === "left" || orient === "right") ?
						-((counts[d.index] - 1) * (sizeFor1Char.h / 2) - 3) :
						".71em";
				}

				return dy;
			}

			function tickSize(d) {
				const tickPosition = scale(d) + (tickCentered ? 0 : tickOffset);

				return range[0] < tickPosition && tickPosition < range[1] ?
					innerTickSize : 0;
			}

			const text = tick.select("text");

			tspan = text.selectAll("tspan")
				.data((d, i) => {
					const splitted = params.tickMultiline ?
						splitTickText(d, params.tickWidth) : [].concat(textFormatted(d));

					counts[i] = splitted.length;

					return splitted.map(s => ({
						index: i,
						splitted: s,
					}));
				});

			tspan.exit().remove();

			tspan = tspan
				.enter()
				.append("tspan")
				.merge(tspan)
				.text(d => d.splitted);

			const rotate = params.tickTextRotate;

			function textAnchorForText(r) {
				if (!r) {
					return "middle";
				}

				return r > 0 ? "start" : "end";
			}

			function textTransform(r) {
				return r ? `rotate(${r})` : "";
			}

			function dxForText(r) {
				if (!r) {
					return 0;
				}

				return 8 * Math.sin(Math.PI * (r / 180));
			}

			function yForText(r) {
				if (!r) {
					return tickLength;
				}

				return 11.5 - 2.5 * (r / 15) * (r > 0 ? 1 : -1);
			}

			switch (orient) {
				case "bottom":
					tickTransform = axisX;
					lineEnter.attr("y2", innerTickSize);
					textEnter.attr("y", tickLength);

					lineUpdate.attr("x1", tickX)
						.attr("x2", tickX)
						.attr("y2", tickSize);

					textUpdate.attr("x", 0)
						.attr("y", yForText(rotate))
						.style("text-anchor", textAnchorForText(rotate))
						.attr("transform", textTransform(rotate));

					tspan.attr("x", 0)
						.attr("dy", tspanDy)
						.attr("dx", dxForText(rotate));

					pathUpdate.attr("d", `M${range[0]},${outerTickSize}V0H${range[1]}V${outerTickSize}`);
					break;
				case "top":
					// @TODO: rotated tick text
					tickTransform = axisX;
					lineEnter.attr("y2", -innerTickSize);
					textEnter.attr("y", -tickLength);

					lineUpdate
						.attr("x2", 0)
						.attr("y2", -innerTickSize);

					textUpdate
						.attr("x", 0)
						.attr("y", -tickLength);

					text.style("text-anchor", "middle");

					tspan
						.attr("x", 0)
						.attr("dy", "0em");

					pathUpdate.attr("d", `M${range[0]},${-outerTickSize}V0H${range[1]}V${-outerTickSize}`);
					break;
				case "left":
					tickTransform = axisY;
					lineEnter.attr("x2", -innerTickSize);
					textEnter.attr("x", -tickLength);

					lineUpdate.attr("x2", -innerTickSize)
						.attr("y1", tickY)
						.attr("y2", tickY);

					textUpdate
						.attr("x", -tickLength)
						.attr("y", tickOffset);

					text.style("text-anchor", "end");

					tspan
						.attr("x", -tickLength)
						.attr("dy", tspanDy);

					pathUpdate.attr("d", `M${-outerTickSize},${range[0]}H0V${range[1]}H${-outerTickSize}`);
					break;
				case "right":
					tickTransform = axisY;
					lineEnter.attr("x2", innerTickSize);
					textEnter.attr("x", tickLength);

					lineUpdate
						.attr("x2", innerTickSize)
						.attr("y2", 0);

					textUpdate
						.attr("x", tickLength)
						.attr("y", 0);

					text.style("text-anchor", "start");

					tspan
						.attr("x", tickLength)
						.attr("dy", tspanDy);

					pathUpdate.attr("d", `M${outerTickSize},${range[0]}H0V${range[1]}H${outerTickSize}`);
			}

			if (scale1.bandwidth) {
				const x = scale1;
				const dx = x.bandwidth() / 2;

				scale0 = function(d) {
					return x(d) + dx;
				};
				scale1 = scale0;
			} else if (scale0.bandwidth) {
				scale0 = scale1;
			} else {
				tickExit.call(tickTransform, scale1);
			}

			tickEnter.call(tickTransform, scale0);
			tickUpdate.call(tickTransform, scale1);
		});
	}

	axis.scale = function(x) {
		if (!arguments.length) {
			return scale;
		}

		scale = x;

		return axis;
	};

	axis.orient = function(x) {
		if (!arguments.length) {
			return orient;
		}

		orient = x in {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1
		} ? String(x) : "bottom";

		return axis;
	};

	axis.tickFormat = function(format) {
		if (!arguments.length) {
			return tickFormat;
		}

		tickFormat = format;

		return axis;
	};

	axis.tickCentered = function(isCentered) {
		if (!arguments.length) {
			return tickCentered;
		}

		tickCentered = isCentered;

		return axis;
	};

	axis.tickOffset = function() {
		return tickOffset;
	};

	axis.tickInterval = function() {
		let interval;

		if (params.isCategory) {
			interval = tickOffset * 2;
		} else {
			const length = axis.g.select("path.domain")
				.node()
				.getTotalLength() - outerTickSize * 2;

			interval = length / axis.g.selectAll("line").size();
		}

		return interval === Infinity ? 0 : interval;
	};

	axis.ticks = function(...args) {
		if (!args.length) {
			return tickArguments;
		}

		tickArguments = Array.prototype.slice.call(args);

		return axis;
	};

	axis.tickCulling = function(culling) {
		if (!arguments.length) {
			return tickCulling;
		}

		tickCulling = culling;

		return axis;
	};

	axis.tickValues = function(x) {
		if (typeof x === "function") {
			tickValues = function() {
				return x(scale.domain());
			};
		} else {
			if (!arguments.length) {
				return tickValues;
			}

			tickValues = x;
		}

		return this;
	};

	axis.setTransition = function(t) {
		transition = t;
		return this;
	};

	return axis;
}
