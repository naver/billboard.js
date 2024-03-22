/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
import * as interaction from "./config/resolver/interaction";
import * as shape from "./config/resolver/shape";

// extends shape modules
Object.keys(shape)
	.forEach(v => shape[v]());

// extends interaction modules
Object.keys(interaction)
	.forEach(v => interaction[v]());

export {bb, default} from "./core";
