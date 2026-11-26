/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import canvasBulletDraw from "../../canvas/bullet";
import shapeBulletCommon, {customTypeHooks} from "../../ChartInternal/shape/core/bullet";
import optBullet from "../Options/shape/bullet";
import {extendAxisModules} from "./axis.core";
import {registerCustomType} from "./customType";

/**
 * Register modules and options required for canvas bullet charts.
 * Canvas mode draws bullets through the module of the type: bundles without it do not carry it.
 * @returns {string} Bullet chart type
 */
export let bullet = (): string => (
	extendAxisModules([shapeBulletCommon], [optBullet]),
		registerCustomType("bullet", {hooks: customTypeHooks, canvas: canvasBulletDraw}),
		(bullet = () => "bullet")()
);
