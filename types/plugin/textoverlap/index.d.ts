/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {Plugin} from "../plugin.js";
import {TextOverlapOptions} from "./options.js";

export default class TextOverlap extends Plugin {
	/**
	 * Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
     */
	constructor(options?: TextOverlapOptions);
}
