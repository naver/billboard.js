/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* global sandbox, window */
import * as d3 from "d3";
import {bb} from "../../src/core";

const initDom = () => {
	const $el = sandbox("chart");

	$el.style.width = "640px";
	$el.style.height = "480px";

	document.body.style.margin = "0px";
};

const setMouseEvent = (chart, name, x, y, element) => {
	const paddingLeft = chart.internal.main.node().transform.baseVal.getItem(0).matrix.e;
	const event = document.createEvent("MouseEvents");

	event.initMouseEvent(name, true, true, window,
		0, 0, 0, x + paddingLeft, y + 5,
		false, false, false, false, 0, null);

	d3.event = event;

	if (element) {
		element.dispatchEvent(event);
	}
};

const initChart = (chart, args, done) => {
	if (typeof chart === "undefined") {
		initDom();
	}

	if (args) {
		if (!args.bindto) {
			args.bindto = "#chart";
		}

		window.d3 = d3;
		chart = bb.generate(args);

		/* window.d3.select(".jasmine_html-reporter")
			.style("position", "absolute")
			.style("width", "640px")
			.style("right", 0);*/
	}

	done && window.setTimeout(done, 10);

	return chart;
}

/**
 * Parse the d property of an SVG path into an array of drawing commands.
 * @param  {String} d SvgPath d attribute.]
 * @return {Array} an array of drawing commands.
 */

const parseSvgPath = d => {
	const commands = [];
	const commandTokens = ["M","L","I","H","V","C","S","Q","T","A"];
	let command;
	let inX = false;
	let inY = false;
	let x = "";
	let y = "";
	let i = 0;

	for (; i <= d.length; i++) {
		if (commandTokens.indexOf(d[i]) !== -1) {
			if (inX || inY) {
				commands.push({
					command: command,
					x: x,
					y: y
				});

				x = "";
				y = "";
			}

			command = d[i];
			inX = true;
			inY = false;
		} else {
			if (d[i] === ",") {
				if (inY) {
					commands.push({
						command: command,
						x: x,
						y: y
					});

					x = "";
					y = "";
				}

				inX = !inX;
				inY = !inY;
			} else if (inX) {
				x += d[i];
			} else if (inY) {
				y += d[i];
			}
		}
	}

	if (d[i] !== "," && inY) {
		commands.push({
			command: command, x: x, y: y
		});
	}

	return commands;
}

export default {
	initDom,
	setMouseEvent,
	initChart,
	parseSvgPath
};
