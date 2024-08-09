/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global window */
import simulant from "simulant";
import Simulator from "./module/hammer-simulator";

export {
	doDrag,
	fireEvent,
	getBBox,
	hexToRgb,
	hoverChart,
	parseNum,
	parseSvgPath,
	simulator
};

/**
 * Dispatch an event
 * @param {HTMLElement|SVGElement} element DOM element to be dispatched
 * @param {String} name event name
 * @param {Object} options value to be set
 * @param {bb} chart billboard.js instance
 */
const fireEvent = (element, name, options: any = {}, chart?: Chart) => {
	let paddingLeft = 0;

	try {
		paddingLeft = chart.$.main.node().transform.baseVal.getItem(0).matrix.e;
	} catch (e) {}

	// adjust clientX/Y value
	"clientX" in options && (options.clientX += paddingLeft);
	"clientY" in options && (options.clientY += 5);

	element && simulant.fire(element, name, options);
};

/**
 * Run gesture simulator
 * @param {HTMLElement|SVGElement} el
 * @param {Object} option
 * @param {Function} callback
 */
const simulator = (el, option = {}, callback) => {
	Simulator.gestures.pan(el, Object.assign({
		pos: [50, 50],
		deltaX: -100,
		deltaY: 0,
		duration: 500,
		easing: "linear"
	}, option), callback);
};

/**
 * Hover on chart element
 * @param {Chart} hoverChart
 * @param {String} [eventName=mousemove]
 * @param {Object} [pos={clientX: 100, clientY: 100}]
 * @param {Number} [dataIndex=2]
 */
const hoverChart = (hoverChart, eventName = "mousemove", pos = {clientX: 100, clientY: 100}, target?: SVGElement) => {
	const {eventRect} = hoverChart.internal.$el;

	fireEvent(target ?? eventRect?.node(), eventName, pos, hoverChart);
};

// do mouse drag selection
const doDrag = (el, from = {clientX: 100, clientY: 100}, to = {clientX: 200, clientY: 200}, chart?) => {
	fireEvent(el, "mousedown", from, chart);
	fireEvent(el, "mousemove", to, chart);
	fireEvent(el, "mouseup", to, chart);
};

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
};

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = hex => {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const rx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
		hex.replace(rx, (m, r, g, b) => r + r + g + g + b + b)
	);

	return parsed ?
		`rgb(${parsed.splice(1).map(v => parseInt(v, 16)).join(", ")})`
		: null;
};

const parseNum = val => +val.replace(/(\(0|[a-z,()\s])/ig,"");
const getBBox = node => ("getBBox" in node ? node : node.node()).getBBox();
