/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * http://naver.github.io/billboard.js/
 * 
 * @version 2.0.0-alpha
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bubblecompare", ["d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bubblecompare"] = factory(require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["bubblecompare"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BubbleCompare; });
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(d3_selection__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);





/**
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {object} options bubble compare plugin options
 * @augments Plugin
 * @returns {BubbleCompare}
 * @example
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
 * @example
 *	import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */

var BubbleCompare =
/*#__PURE__*/
function (_Plugin) {
  function BubbleCompare(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_this), "$$", void 0), Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_this) || Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_this);
  }

  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(BubbleCompare, _Plugin);

  var _proto = BubbleCompare.prototype;
  return _proto.$init = function $init() {
    var $$ = this.$$;
    $$.findClosest = this.findClosest.bind(this), $$.getBubbleR = this.getBubbleR.bind(this), $$.pointExpandedR = this.pointExpandedR.bind(this);
  }, _proto.pointExpandedR = function pointExpandedR(d) {
    var baseR = this.getBubbleR(d),
        _this$options$expandS = this.options.expandScale,
        expandScale = _this$options$expandS === void 0 ? 1 : _this$options$expandS;
    return BubbleCompare.raiseFocusedBubbleLayer(d), this.changeCursorPoint(), baseR * expandScale;
  }, BubbleCompare.raiseFocusedBubbleLayer = function raiseFocusedBubbleLayer(d) {
    d.raise && Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(d.node().parentNode.parentNode).raise();
  }, _proto.changeCursorPoint = function changeCursorPoint() {
    this.$$.$el.svg.select(".bb-event-rect").style("cursor", "pointer");
  }, _proto.findClosest = function findClosest(values, pos) {
    var _this2 = this,
        $$ = this.$$;

    return values.filter(function (v) {
      return v && !$$.isBarType(v.id);
    }).reduce(function (acc, cur) {
      var d = $$.dist(cur, pos);
      return d < _this2.getBubbleR(cur) ? cur : acc;
    }, 0);
  }, _proto.getBubbleR = function getBubbleR(d) {
    var _this3 = this,
        _this$options = this.options,
        minR = _this$options.minR,
        maxR = _this$options.maxR,
        curVal = this.getZData(d);

    if (!curVal) return minR;

    var _this$$$$data$targets = this.$$.data.targets.reduce(function (_ref, cur) {
      var accMin = _ref[0],
          accMax = _ref[1],
          val = _this3.getZData(cur.values[0]);

      return [Math.min(accMin, val), Math.max(accMax, val)];
    }, [1e4, 0]),
        min = _this$$$$data$targets[0],
        max = _this$$$$data$targets[1],
        size = min > 0 && max === min ? 0 : curVal / max;

    return Math.abs(size) * (maxR - minR) + minR;
  }, _proto.getZData = function getZData(d) {
    return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
  }, BubbleCompare;
}(_Plugin__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(BubbleCompare, "version", "0.0.1");



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */

/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
var Plugin =
/*#__PURE__*/
function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    options === void 0 && (options = {}), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "$$", void 0), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "options", void 0), this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  var _proto = Plugin.prototype;
  return _proto.$beforeInit = function $beforeInit() {}
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  , _proto.$init = function $init() {}
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  , _proto.$afterInit = function $afterInit() {}
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  , _proto.$redraw = function $redraw() {}
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  , _proto.$willDestroy = function $willDestroy() {
    var _this = this;

    Object.keys(this).forEach(function (key) {
      _this[key] = null, delete _this[key];
    });
  }, Plugin;
}();

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.0-alpha");



/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL2J1YmJsZWNvbXBhcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtc2VsZWN0aW9uXCIsXCJjb21tb25qczJcIjpcImQzLXNlbGVjdGlvblwiLFwiYW1kXCI6XCJkMy1zZWxlY3Rpb25cIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL1BsdWdpbi50cyJdLCJuYW1lcyI6WyJCdWJibGVDb21wYXJlIiwib3B0aW9ucyIsIiRpbml0IiwiJCQiLCJmaW5kQ2xvc2VzdCIsImJpbmQiLCJnZXRCdWJibGVSIiwicG9pbnRFeHBhbmRlZFIiLCJkIiwiYmFzZVIiLCJleHBhbmRTY2FsZSIsInJhaXNlRm9jdXNlZEJ1YmJsZUxheWVyIiwiY2hhbmdlQ3Vyc29yUG9pbnQiLCJyYWlzZSIsImQzU2VsZWN0Iiwibm9kZSIsInBhcmVudE5vZGUiLCIkZWwiLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsInZhbHVlcyIsInBvcyIsImZpbHRlciIsInYiLCJpc0JhclR5cGUiLCJpZCIsInJlZHVjZSIsImFjYyIsImN1ciIsImRpc3QiLCJtaW5SIiwibWF4UiIsImN1clZhbCIsImdldFpEYXRhIiwiZGF0YSIsInRhcmdldHMiLCJhY2NNaW4iLCJhY2NNYXgiLCJ2YWwiLCJNYXRoIiwibWluIiwibWF4Iiwic2l6ZSIsImFicyIsImlzQnViYmxlWlR5cGUiLCJnZXRCdWJibGVaRGF0YSIsInZhbHVlIiwiUGx1Z2luIiwiJGJlZm9yZUluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7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T0FBTCxHQUFlQSxPQURVO0FBRXpCO0FBRUQ7Ozs7Ozs7Z0JBSUFnRCxXLEdBQUEsdUJBQWMsQ0FBRTtBQUVoQjs7OztXQUlBL0MsSyxHQUFBLGlCQUFRLENBQUU7QUFFVjs7OztXQUlBZ0QsVSxHQUFBLHNCQUFhLENBQUU7QUFFZjs7OztXQUlBQyxPLEdBQUEsbUJBQVUsQ0FBRTtBQUVaOzs7O1dBSUFDLFksR0FBQSx3QkFBZTtBQUFBOztBQUNkQyxVQUFNLENBQUNDLElBQVAsQ0FBWSxJQUFaLEVBQWtCQyxPQUFsQixDQUEwQixVQUFBQyxHQUFHLEVBQUk7QUFDaEMsV0FBSSxDQUFDQSxHQUFELENBQUosR0FBWSxJQURvQixFQUVoQyxPQUFPLEtBQUksQ0FBQ0EsR0FBRCxDQUZxQjtBQUdoQyxLQUhELENBRGM7QUFLZCxHOzs7a0dBL0NtQlIsTSxhQUdILGEiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLWJ1YmJsZWNvbXBhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJidWJibGVjb21wYXJlXCIsIFtcImQzLXNlbGVjdGlvblwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJidWJibGVjb21wYXJlXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJidWJibGVjb21wYXJlXCJdID0gZmFjdG9yeShyb290W1wiZDNcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHtzZWxlY3QgYXMgZDNTZWxlY3R9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcclxuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XHJcblxyXG4vKipcclxuICogQnViYmxlIGNvbXBhcmUgZGlhZ3JhbSBwbHVnaW4uPGJyPlxyXG4gKiBDb21wYXJlIGRhdGEgMy1kaW1lbnNpb25hbCB3YXlzOiB4LWF4aXMsIHktYXhpcyAmIGJ1YmJsZS1zaXplLlxyXG4gKiAtICoqTk9URToqKlxyXG4gKiAgIC0gUGx1Z2lucyBhcmVuJ3QgYnVpbHQtaW4uIE5lZWQgdG8gYmUgbG9hZGVkIG9yIGltcG9ydGVkIHRvIGJlIHVzZWQuXHJcbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxyXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxyXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcclxuICogQGNsYXNzIHBsdWdpbi1idWJibGVjb21wYXJlXHJcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYnViYmxlIGNvbXBhcmUgcGx1Z2luIG9wdGlvbnNcclxuICogQGF1Z21lbnRzIFBsdWdpblxyXG4gKiBAcmV0dXJucyB7QnViYmxlQ29tcGFyZX1cclxuICogQGV4YW1wbGVcclxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcclxuICogICAgIGRhdGE6IHtcclxuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXHJcbiAqICAgICAgICB0eXBlOiBcImJ1YmJsZVwiXHJcbiAqICAgICB9XHJcbiAqICAgICAuLi5cclxuICogICAgIHBsdWdpbnM6IFtcclxuICogICAgICAgIG5ldyBiYi5wbHVnaW4uYnViYmxlY29tcGFyZSh7XHJcbiAqICAgICAgICAgIG1pblI6IDExLFxyXG4gKiAgICAgICAgICBtYXhSOiA3NCxcclxuICogICAgICAgICAgZXhwYW5kU2NhbGU6IDEuMVxyXG4gKiAgICAgICAgfSksXHJcbiAqICAgICBdXHJcbiAqICB9KTtcclxuICogQGV4YW1wbGVcclxuICpcdGltcG9ydCB7YmJ9IGZyb20gXCJiaWxsYm9hcmQuanNcIjtcclxuICogaW1wb3J0IEJ1YmJsZUNvbXBhcmUgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi1idWJibGVjb21wYXJlXCI7XHJcbiAqXHJcbiAqIGJiLmdlbmVyYXRlKHtcclxuICogICAgIHBsdWdpbnM6IFtcclxuICogICAgICAgIG5ldyBCdWJibGVDb21wYXJlKHsgLi4uIH0pXHJcbiAqICAgICBdXHJcbiAqIH0pXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnViYmxlQ29tcGFyZSBleHRlbmRzIFBsdWdpbiB7XHJcblx0c3RhdGljIHZlcnNpb24gPSBgMC4wLjFgO1xyXG5cdHB1YmxpYyAkJDtcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQkaW5pdCgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xyXG5cclxuXHRcdCQkLmZpbmRDbG9zZXN0ID0gdGhpcy5maW5kQ2xvc2VzdC5iaW5kKHRoaXMpO1xyXG5cdFx0JCQuZ2V0QnViYmxlUiA9IHRoaXMuZ2V0QnViYmxlUi5iaW5kKHRoaXMpO1xyXG5cdFx0JCQucG9pbnRFeHBhbmRlZFIgPSB0aGlzLnBvaW50RXhwYW5kZWRSLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwb2ludEV4cGFuZGVkUihkKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IGJhc2VSID0gdGhpcy5nZXRCdWJibGVSKGQpO1xyXG5cdFx0Y29uc3Qge2V4cGFuZFNjYWxlID0gMX0gPSB0aGlzLm9wdGlvbnM7XHJcblxyXG5cdFx0QnViYmxlQ29tcGFyZS5yYWlzZUZvY3VzZWRCdWJibGVMYXllcihkKTtcclxuXHRcdHRoaXMuY2hhbmdlQ3Vyc29yUG9pbnQoKTtcclxuXHJcblx0XHRyZXR1cm4gYmFzZVIgKiBleHBhbmRTY2FsZTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyByYWlzZUZvY3VzZWRCdWJibGVMYXllcihkKTogdm9pZCB7XHJcblx0XHRkLnJhaXNlICYmIGQzU2VsZWN0KGQubm9kZSgpLnBhcmVudE5vZGUucGFyZW50Tm9kZSkucmFpc2UoKTtcclxuXHR9XHJcblxyXG5cdGNoYW5nZUN1cnNvclBvaW50KCk6IHZvaWQge1xyXG5cdFx0dGhpcy4kJC4kZWwuc3ZnLnNlbGVjdChgLmJiLWV2ZW50LXJlY3RgKS5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XHJcblx0fVxyXG5cclxuXHRmaW5kQ2xvc2VzdCh2YWx1ZXMsIHBvcyk6IG51bWJlciB7XHJcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcclxuXHJcblx0XHRyZXR1cm4gdmFsdWVzXHJcblx0XHRcdC5maWx0ZXIodiA9PiB2ICYmICEkJC5pc0JhclR5cGUodi5pZCkpXHJcblx0XHRcdC5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgZCA9ICQkLmRpc3QoY3VyLCBwb3MpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZCA8IHRoaXMuZ2V0QnViYmxlUihjdXIpID8gY3VyIDogYWNjO1xyXG5cdFx0XHR9LCAwKTtcclxuXHR9XHJcblxyXG5cdGdldEJ1YmJsZVIoZCk6IG51bWJlciB7XHJcblx0XHRjb25zdCB7bWluUiwgbWF4Un0gPSB0aGlzLm9wdGlvbnM7XHJcblx0XHRjb25zdCBjdXJWYWwgPSB0aGlzLmdldFpEYXRhKGQpO1xyXG5cclxuXHRcdGlmICghY3VyVmFsKSByZXR1cm4gbWluUjtcclxuXHJcblx0XHRjb25zdCBbbWluLCBtYXhdID0gdGhpcy4kJC5kYXRhLnRhcmdldHMucmVkdWNlKFxyXG5cdFx0XHQoW2FjY01pbiwgYWNjTWF4XSwgY3VyKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgdmFsID0gdGhpcy5nZXRaRGF0YShjdXIudmFsdWVzWzBdKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIFtNYXRoLm1pbihhY2NNaW4sIHZhbCksIE1hdGgubWF4KGFjY01heCwgdmFsKV07XHJcblx0XHRcdH0sXHJcblx0XHRcdFsxMDAwMCwgMF1cclxuXHRcdCk7XHJcblx0XHRjb25zdCBzaXplID0gbWluID4gMCAmJiBtYXggPT09IG1pbiA/IDAgOiBjdXJWYWwgLyBtYXg7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguYWJzKHNpemUpICogKG1heFIgLSBtaW5SKSArIG1pblI7XHJcblx0fVxyXG5cclxuXHRnZXRaRGF0YShkKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiQkLmlzQnViYmxlWlR5cGUoZCkgP1xyXG5cdFx0XHR0aGlzLiQkLmdldEJ1YmJsZVpEYXRhKGQudmFsdWUsIFwielwiKSA6XHJcblx0XHRcdGQudmFsdWU7XHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxyXG4gKiBAY2xhc3MgUGx1Z2luXHJcbiAqL1xyXG4vKipcclxuICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXHJcbiAqIEBuYW1lIHZlcnNpb25cclxuICogQHN0YXRpY1xyXG4gKiBAbWVtYmVyb2YgUGx1Z2luXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBleGFtcGxlXHJcbiAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XHJcblx0cHVibGljICQkO1xyXG5cdHB1YmxpYyBvcHRpb25zO1xyXG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjAuMC1hbHBoYVwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvclxyXG5cdCAqIEBwYXJhbSB7QW55fSBvcHRpb25zIGNvbmZpZyBvcHRpb24gb2JqZWN0XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGJlZm9yZUluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQkYWZ0ZXJJbml0KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JHJlZHJhdygpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JHdpbGxEZXN0cm95KCkge1xyXG5cdFx0T2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xyXG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=