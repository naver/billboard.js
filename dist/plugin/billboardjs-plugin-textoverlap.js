/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 4.0.3-nightly-20260801010035
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-delaunay"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-delaunay"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-delaunay"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["textoverlap"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__9__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	!function() {
/******/ 		var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; }; });
/******/ 			}
/******/ 			def['default'] = function() { return value; };
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ TextOverlap; }
});

;// ./src/module/polygon.ts
function polygonArea(polygon) {
  const n = polygon.length;
  let area = 0;
  let b = polygon[n - 1];
  for (let i = 0; i < n; i++) {
    const a = b;
    b = polygon[i];
    area += a[1] * b[0] - a[0] * b[1];
  }
  return area / 2;
}
function polygonCentroid(polygon) {
  const n = polygon.length;
  let x = 0;
  let y = 0;
  let k = 0;
  let b = polygon[n - 1];
  for (let i = 0; i < n; i++) {
    const a = b;
    b = polygon[i];
    const c = a[0] * b[1] - b[0] * a[1];
    k += c;
    x += (a[0] + b[0]) * c;
    y += (a[1] + b[1]) * c;
  }
  k *= 3;
  return [x / k, y / k];
}

;// ./src/module/util/type-checks.ts
const isValue = (v) => v || v === 0;
const isFunction = (v) => typeof v === "function";
const isString = (v) => typeof v === "string";
const isNumber = (v) => typeof v === "number";
const isUndefined = (v) => typeof v === "undefined";
const isDefined = (v) => typeof v !== "undefined";
const isBoolean = (v) => typeof v === "boolean";
const ceil10 = (v) => Math.ceil(v / 10) * 10;
const asHalfPixel = (n) => Math.ceil(n) + 0.5;
const diffDomain = (d) => d[1] - d[0];
const isObjectType = (v) => typeof v === "object";
const isEmptyObject = (obj) => {
  for (const x in obj) {
    return false;
  }
  return true;
};
const isEmpty = (o) => isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && isEmptyObject(o) || isNumber(o) && isNaN(o);
const notEmpty = (o) => !isEmpty(o);
const isArray = (arr) => Array.isArray(arr);
const isObject = (obj) => obj && !(obj == null ? void 0 : obj.nodeType) && isObjectType(obj) && !isArray(obj);


;// ./src/config/config.ts

function loadConfig(config) {
  const thisConfig = this.config;
  let target;
  let keys;
  let read;
  const find = () => {
    const key = keys.shift();
    if (key && target && isObjectType(target) && key in target) {
      target = target[key];
      return find();
    } else if (!key) {
      return target;
    }
    return void 0;
  };
  Object.keys(thisConfig).forEach((key) => {
    target = config;
    keys = key.split("_");
    read = find();
    if (isDefined(read)) {
      thisConfig[key] = read;
    }
  });
  if (this.api) {
    this.state.orgConfig = config;
  }
}

;// ./src/Plugin/Plugin.ts
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

class Plugin {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  constructor(options = {}) {
    __publicField(this, "$$");
    __publicField(this, "options");
    __publicField(this, "config");
    this.options = options;
  }
  /**
   * Load plugin config from options
   * @private
   */
  loadConfig() {
    loadConfig.call(this, this.options);
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */
  $beforeInit() {
  }
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  $init() {
  }
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  $afterInit() {
  }
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  $redraw() {
  }
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  $willDestroy() {
    Object.keys(this).forEach((key) => {
      this[key] = null;
      delete this[key];
    });
  }
}
__publicField(Plugin, "version", "4.0.3-nightly-20260801010035");

;// ./src/Plugin/textoverlap/Options.ts
class Options {
  constructor() {
    return {
      /**
       * Selector string for target text nodes within chart element.
       * - **NOTE:** If no value is given, defaults to data label text elements.
       * @name selector
       * @memberof plugin-textoverlap
       * @type {string}
       * @default undefined
       * @example
       *  // selector for data label text nodes
       * selector: ".bb-texts text"
       */
      selector: void 0,
      /**
       * Extent of label overlap prevention.
       * @name extent
       * @memberof plugin-textoverlap
       * @type {number}
       * @default 1
       * @example
       * 	extent: 1
       */
      extent: 1,
      /**
       * Minimum area needed to show a data label.
       * @name area
       * @memberof plugin-textoverlap
       * @type {number}
       * @default 0
       * @example
       * 	area: 0
       */
      area: 0
    };
  }
}

;// ./src/Plugin/textoverlap/index.ts
var textoverlap_defProp = Object.defineProperty;
var textoverlap_defNormalProp = (obj, key, value) => key in obj ? textoverlap_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var textoverlap_publicField = (obj, key, value) => textoverlap_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};



let d3Delaunay = null;
function getDelaunay() {
  return d3Delaunay != null ? d3Delaunay : d3Delaunay = Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 9, 23)).then(({ Delaunay }) => Delaunay);
}
class TextOverlap extends Plugin {
  constructor(options) {
    super(options);
    textoverlap_publicField(this, "redrawId", 0);
    this.config = new Options();
    return this;
  }
  $init() {
    this.loadConfig();
  }
  $redraw() {
    const { $$: { $el }, config: { selector } } = this;
    const text = selector ? $el.main.selectAll(selector) : $el.text;
    const redrawId = ++this.redrawId;
    if (!text.empty()) {
      void this.preventLabelOverlap(text, redrawId);
    }
  }
  /**
   * Generates the voronoi layout for data labels
   * @param {Array} points Indices values
   * @returns {object} Voronoi layout points and corresponding Data points
   * @private
   */
  generateVoronoi(points) {
    return __async(this, null, function* () {
      const { $$ } = this;
      const { scale } = $$;
      const [min, max] = ["x", "y"].map((v) => scale[v].domain());
      const Delaunay = yield getDelaunay();
      [min[1], max[0]] = [max[0], min[1]];
      return Delaunay.from(points).voronoi([
        ...min,
        ...max
      ]);
    });
  }
  /**
   * Set text label's position to preventg overlap.
   * @param {d3Selection} text target text selection
   * @param {number} redrawId Redraw request identifier
   * @private
   */
  preventLabelOverlap(_0) {
    return __async(this, arguments, function* (text, redrawId = this.redrawId) {
      const { extent, area } = this.config;
      const points = text.data().map((v) => [v.index, v.value]);
      const voronoi = yield this.generateVoronoi(points).catch(() => null);
      let i = 0;
      if (!voronoi || redrawId !== this.redrawId) {
        return;
      }
      text.each(function() {
        const cell = voronoi.cellPolygon(i);
        if (cell && this) {
          const [x, y] = points[i];
          const [cx, cy] = polygonCentroid(cell);
          const cellArea = Math.abs(polygonArea(cell));
          const angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2);
          const xTranslate = extent * (angle === 0 ? 1 : -1);
          const yTranslate = angle === -1 ? -extent : extent + 5;
          const txtAnchor = Math.abs(angle) === 1 ? "middle" : angle === 0 ? "start" : "end";
          this.style.display = cellArea < area ? "none" : "";
          this.setAttribute("text-anchor", txtAnchor);
          this.setAttribute("dy", `0.${angle === 1 ? 71 : 35}em`);
          this.setAttribute("transform", `translate(${xTranslate}, ${yTranslate})`);
        }
        i++;
      });
    });
  }
}

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});