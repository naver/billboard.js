/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../../../ChartInternal/ChartInternal";
import shapeBullet from "../../../ChartInternal/shape/bullet";
import {extend} from "../../../module/util";
import Options from "../../Options/Options";
import optBullet from "../../Options/shape/bullet";

export let bullet = (): string => (
	extend(ChartInternal.prototype, [shapeBullet]),
		Options.setOptions([optBullet]),
		(bullet = () => "bullet")()
);
