/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
import {exportApi} from "./config/resolver/export";
import {flow} from "./config/resolver/flow";
import * as interaction from "./config/resolver/interaction";
import * as shape from "./config/resolver/shape";

// extends shape modules
Object.keys(shape)
	.forEach(v => shape[v]());

// extends interaction modules
Object.keys(interaction)
	.forEach(v => interaction[v]());

// always include optional API modules in UMD bundle
exportApi();
flow();

export {bb, default} from "./core";
