/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global window */
import bb from "../../src/";
import {
	doDrag,
	fireEvent,
	getBBox,
	hexToRgb,
	hoverChart,
	parseNum,
	parseSvgPath,
	simulator
} from "./helper";

//-------
import * as shape from "../../src/config/resolver/shape";
import * as interaction from "../../src/config/resolver/interaction";

Object.keys(shape).forEach(v => shape[v]());
Object.keys(interaction).forEach(v => interaction[v]());
//-------

/**
 * Create a DOM element
 * @param {String} idValue id value
 */
function initDom(idValue) {
	const id = idValue && idValue.replace && idValue.replace("#", "");

	if (!document.getElementById(id)) {
		sandbox(id, {
			style: "position:absolute;top:0;left:0;width:640px;height:480px;"
		});

		document.body.style.margin = "0px";
	}
};

/**
 * Generate chart
 * @param {Object} args chart options
 * @param {boolean} raw Generate with only given options
 * @return {bb} billboard.js instance
 */
function generate(args, raw = false) {
	let chart;
	let inputType = "mouse";

	if (args) {
		if (!raw) {
			if (!args.bindto) {
				args.bindto = "#chart";
			}

			initDom(args.bindto);

			// when touch param is set, make to be 'touch' input mode
			if (args.interaction?.inputType?.touch) {
				inputType = "touch";
			}

			if (window?.$$TEST$$) {
				window.$$TEST$$.convertInputType = inputType;
			}
		}

		chart = bb.generate(args);
	}

	return chart;
};

function destroyAll() {
	bb.instance.forEach(v => v.destroy());
}

const print = {
	arg(param) {
		const msg = JSON.stringify(param, null, 2)
			.replace(/\"([a-zA-Z_]+)\":/g, "$1:");

		console.log(msg);
	},
	path(selection, log = true) {
		const p = [];

		selection.each(function() {
			p.push(this.getAttribute("d"));
		});

		log && console.log(`"${p.join("\",\r\n\"")}"`);

		return p;
	}
}

function sandbox(obj: string | HTMLDivElement, prop?): HTMLDivElement {
	var tmp = document.createElement("div");
	tmp.className = "_tempSandbox_";
	
	if (typeof obj === "string") {
			tmp.id = obj;
	} else {
			tmp.id = "sandbox";
	}

	if (typeof obj === "object" || typeof prop === "object") {
			var attrs = typeof prop === "object" ? prop : obj;
			for(var p in attrs) {
					if(/class|className/.test(p)) {
							tmp.setAttribute(p, attrs[p] + " _tempSandbox_");
					} else {
							tmp.setAttribute(p, attrs[p]);
					}
			}
	}

	return document.body.appendChild(tmp);
}

// test should executed from 'coverage:ci' command
const isCI = process.env.NODE_ENV === "CI";
const ceil = v => Math.ceil(v);

export default {
	ceil,
	destroyAll,
	doDrag,
	fireEvent,
	generate,
	getBBox,
	hexToRgb,
	hoverChart,
	isCI,
	parseNum,
	parseSvgPath,
	print,
	sandbox,
	simulator
};
