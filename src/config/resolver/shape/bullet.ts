/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../../../ChartInternal/ChartInternal";
import shapeBullet from "../../../ChartInternal/shape/bullet";
import {customTypeHooks} from "../../../ChartInternal/shape/core/bullet";
import {extend} from "../../../module/util";
import Options from "../../Options/Options";
import optBullet from "../../Options/shape/bullet";
import {registerCustomType} from "../customType";

export let bullet = (): string => (
	extend(ChartInternal.prototype, [shapeBullet]),
		Options.setOptions([optBullet]),
		registerCustomType("bullet", {hooks: customTypeHooks}),
		(bullet = () => "bullet")()
);
