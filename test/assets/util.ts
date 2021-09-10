/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global sandbox, window */
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
			style: "width:640px;height:480px;"
		});

		document.body.style.margin = "0px";
	}
};

/**
 * Generate chart
 * @param {Object} args chart options
 * @return {bb} billboard.js instance
 */
function generate(args) {
	let chart;
	let inputType = "mouse";

	if (args) {
		if (!args.bindto) {
			args.bindto = "#chart";
		}

		initDom(args.bindto);

		// when touch param is set, make to be 'touch' input mode
		if (args.interaction && args.interaction.inputType && args.interaction.inputType.touch) {
			inputType = "touch";
		}

		window.$$TEST$$.convertInputType = inputType;

		chart = bb.generate(args);
	}

	return chart;
};

function destroyAll() {
	bb.instance.forEach(v => v.destroy());
}

export default {
	destroyAll,
	doDrag,
	fireEvent,
	generate,
	getBBox,
	hexToRgb,
	hoverChart,
	parseNum,
	parseSvgPath,
	simulator
};
