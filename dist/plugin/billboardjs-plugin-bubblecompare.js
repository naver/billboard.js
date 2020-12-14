/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 2.1.4-nightly-20201214172013
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["bubblecompare"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ BubbleCompare
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
;// CONCATENATED MODULE: ./src/Plugin/Plugin.ts
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
var Plugin = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    options === void 0 && (options = {}), this.$$ = void 0, this.options = void 0, this.options = options;
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

Plugin.version = "2.1.4";

;// CONCATENATED MODULE: ./src/Plugin/bubblecompare/index.ts




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
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-bubblecompare.js"></script>
 *
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
 * import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare.esm";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */

var BubbleCompare = /*#__PURE__*/function (_Plugin) {
  function BubbleCompare(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, _this.$$ = void 0, _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }

  _inheritsLoose(BubbleCompare, _Plugin);

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
    d.raise && (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(d.node().parentNode.parentNode).raise();
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
}(Plugin);

BubbleCompare.version = "0.0.1";


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()
.default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL2J1YmJsZWNvbXBhcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtc2VsZWN0aW9uXCIsXCJjb21tb25qczJcIjpcImQzLXNlbGVjdGlvblwiLFwiYW1kXCI6XCJkMy1zZWxlY3Rpb25cIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbIlBsdWdpbiIsIm9wdGlvbnMiLCIkJCIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwidmVyc2lvbiIsIkJ1YmJsZUNvbXBhcmUiLCJmaW5kQ2xvc2VzdCIsImJpbmQiLCJnZXRCdWJibGVSIiwicG9pbnRFeHBhbmRlZFIiLCJkIiwiYmFzZVIiLCJleHBhbmRTY2FsZSIsInJhaXNlRm9jdXNlZEJ1YmJsZUxheWVyIiwiY2hhbmdlQ3Vyc29yUG9pbnQiLCJyYWlzZSIsImQzU2VsZWN0Iiwibm9kZSIsInBhcmVudE5vZGUiLCIkZWwiLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsInZhbHVlcyIsInBvcyIsImZpbHRlciIsInYiLCJpc0JhclR5cGUiLCJpZCIsInJlZHVjZSIsImFjYyIsImN1ciIsImRpc3QiLCJtaW5SIiwibWF4UiIsImN1clZhbCIsImdldFpEYXRhIiwiZGF0YSIsInRhcmdldHMiLCJhY2NNaW4iLCJhY2NNYXgiLCJ2YWwiLCJNYXRoIiwibWluIiwibWF4Iiwic2l6ZSIsImFicyIsImlzQnViYmxlWlR5cGUiLCJnZXRCdWJibGVaRGF0YSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7O0FDVmU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOztBQ05lO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsQzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsTTtBQUtwQjtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Msa0JBQVlDLE9BQVosRUFBMEI7QUFBZEEsV0FBYyxnQkFBZEEsT0FBYyxHQUFKLEVBQUksUUFUbkJDLEVBU21CLGdCQVJuQkQsT0FRbUIsV0FDekIsS0FBS0EsT0FBTCxHQUFlQSxPQURVO0FBRXpCO0FBRUQ7QUFDRDtBQUNBO0FBQ0E7Ozs7Z0JBQ0NFLFcsR0FBQSx1QkFBYyxDQUFFO0FBRWhCO0FBQ0Q7QUFDQTtBQUNBO1dBQ0NDLEssR0FBQSxpQkFBUSxDQUFFO0FBRVY7QUFDRDtBQUNBO0FBQ0E7V0FDQ0MsVSxHQUFBLHNCQUFhLENBQUU7QUFFZjtBQUNEO0FBQ0E7QUFDQTtXQUNDQyxPLEdBQUEsbUJBQVUsQ0FBRTtBQUVaO0FBQ0Q7QUFDQTtBQUNBO1dBQ0NDLFksR0FBQSx3QkFBZTtBQUFBOztBQUNkQyxVQUFNLENBQUNDLElBQVAsQ0FBWSxJQUFaLEVBQWtCQyxPQUFsQixDQUEwQixVQUFBQyxHQUFHLEVBQUk7QUFDaEMsV0FBSSxDQUFDQSxHQUFELENBQUosR0FBWSxJQURvQixFQUVoQyxPQUFPLEtBQUksQ0FBQ0EsR0FBRCxDQUZxQjtBQUdoQyxLQUhELENBRGM7QUFLZCxHOzs7QUEvQ21CWCxNLENBR2JZLE8sR0FBVSxPOzs7OztBQ3BCbEI7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQyxhO0FBSXBCLHlCQUFZWixPQUFaLEVBQXFCO0FBQUE7O0FBR3BCLG1CQUZBLG1CQUFNQSxPQUFOLENBRUEsZ0JBTE1DLEVBS047QUFDQTs7Ozs7Z0JBRURFLEssR0FBQSxpQkFBYztBQUFBLFFBQ05GLEVBRE0sR0FDQSxJQURBLENBQ05BLEVBRE07QUFHYkEsTUFBRSxDQUFDWSxXQUFILEdBQWlCLEtBQUtBLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLElBQXRCLENBSEosRUFJYmIsRUFBRSxDQUFDYyxVQUFILEdBQWdCLEtBQUtBLFVBQUwsQ0FBZ0JELElBQWhCLENBQXFCLElBQXJCLENBSkgsRUFLYmIsRUFBRSxDQUFDZSxjQUFILEdBQW9CLEtBQUtBLGNBQUwsQ0FBb0JGLElBQXBCLENBQXlCLElBQXpCLENBTFA7QUFNYixHLFNBRURFLGMsR0FBQSx3QkFBZUMsQ0FBZixFQUEwQjtBQUNuQixRQUFBQyxLQUFLLEdBQUcsS0FBS0gsVUFBTCxDQUFnQkUsQ0FBaEIsQ0FBUjtBQUFBLGdDQUNvQixLQUFLakIsT0FEekIsQ0FDQ21CLFdBREQ7QUFBQSxRQUNDQSxXQURELHNDQUNlLENBRGY7QUFNTixXQUhBUCxhQUFhLENBQUNRLHVCQUFkLENBQXNDSCxDQUF0QyxDQUdBLEVBRkEsS0FBS0ksaUJBQUwsRUFFQSxFQUFPSCxLQUFLLEdBQUdDLFdBQWY7QUFDQSxHLGdCQUVNQyx1QixHQUFQLGlDQUErQkgsQ0FBL0IsRUFBd0M7QUFDdkNBLEtBQUMsQ0FBQ0ssS0FBRixJQUFXQywwRkFBUSxDQUFDTixDQUFDLENBQUNPLElBQUYsR0FBU0MsVUFBVCxDQUFvQkEsVUFBckIsQ0FBUixDQUF5Q0gsS0FBekMsRUFENEI7QUFFdkMsRyxTQUVERCxpQixHQUFBLDZCQUEwQjtBQUN6QixTQUFLcEIsRUFBTCxDQUFReUIsR0FBUixDQUFZQyxHQUFaLENBQWdCQyxNQUFoQixtQkFBeUNDLEtBQXpDLENBQStDLFFBQS9DLEVBQXlELFNBQXpELENBRHlCO0FBRXpCLEcsU0FFRGhCLFcsR0FBQSxxQkFBWWlCLE1BQVosRUFBb0JDLEdBQXBCLEVBQWlDO0FBQUE7QUFBQSxRQUN6QjlCLEVBRHlCLEdBQ25CLElBRG1CLENBQ3pCQSxFQUR5Qjs7QUFHaEMsV0FBTzZCLE1BQU0sQ0FDWEUsTUFESyxDQUNFLFVBQUFDLENBQUM7QUFBQSxhQUFJQSxDQUFDLElBQUksQ0FBQ2hDLEVBQUUsQ0FBQ2lDLFNBQUgsQ0FBYUQsQ0FBQyxDQUFDRSxFQUFmLENBQVY7QUFBQSxLQURILEVBRUxDLE1BRkssQ0FFRSxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNyQixVQUFNckIsQ0FBQyxHQUFHaEIsRUFBRSxDQUFDc0MsSUFBSCxDQUFRRCxHQUFSLEVBQWFQLEdBQWIsQ0FBVjtBQUVBLGFBQU9kLENBQUMsR0FBRyxNQUFJLENBQUNGLFVBQUwsQ0FBZ0J1QixHQUFoQixDQUFKLEdBQTJCQSxHQUEzQixHQUFpQ0QsR0FBeEM7QUFDQSxLQU5LLEVBTUgsQ0FORyxDQUFQO0FBT0EsRyxTQUVEdEIsVSxHQUFBLG9CQUFXRSxDQUFYLEVBQXNCO0FBQUE7QUFBQSx3QkFDQSxLQUFLakIsT0FETDtBQUFBLFFBQ2R3QyxJQURjLGlCQUNkQSxJQURjO0FBQUEsUUFDUkMsSUFEUSxpQkFDUkEsSUFEUTtBQUFBLFFBRWZDLE1BRmUsR0FFTixLQUFLQyxRQUFMLENBQWMxQixDQUFkLENBRk07O0FBSXJCLFFBQUksQ0FBQ3lCLE1BQUwsRUFBYSxPQUFPRixJQUFQOztBQUpRLGdDQU1GLEtBQUt2QyxFQUFMLENBQVEyQyxJQUFSLENBQWFDLE9BQWIsQ0FBcUJULE1BQXJCLENBQ2xCLGdCQUFtQkUsR0FBbkIsRUFBMkI7QUFBQSxVQUF6QlEsTUFBeUI7QUFBQSxVQUFqQkMsTUFBaUI7QUFBQSxVQUNwQkMsR0FEb0IsR0FDZCxNQUFJLENBQUNMLFFBQUwsQ0FBY0wsR0FBRyxDQUFDUixNQUFKLENBQVcsQ0FBWCxDQUFkLENBRGM7O0FBRzFCLGFBQU8sQ0FBQ21CLElBQUksQ0FBQ0MsR0FBTCxDQUFTSixNQUFULEVBQWlCRSxHQUFqQixDQUFELEVBQXdCQyxJQUFJLENBQUNFLEdBQUwsQ0FBU0osTUFBVCxFQUFpQkMsR0FBakIsQ0FBeEIsQ0FBUDtBQUNBLEtBTGlCLEVBTWxCLENBQUMsR0FBRCxFQUFRLENBQVIsQ0FOa0IsQ0FORTtBQUFBLFFBTWRFLEdBTmM7QUFBQSxRQU1UQyxHQU5TO0FBQUEsUUFjZkMsSUFkZSxHQWNSRixHQUFHLEdBQUcsQ0FBTixJQUFXQyxHQUFHLEtBQUtELEdBQW5CLEdBQXlCLENBQXpCLEdBQTZCUixNQUFNLEdBQUdTLEdBZDlCOztBQWdCckIsV0FBT0YsSUFBSSxDQUFDSSxHQUFMLENBQVNELElBQVQsS0FBa0JYLElBQUksR0FBR0QsSUFBekIsSUFBaUNBLElBQXhDO0FBQ0EsRyxTQUVERyxRLEdBQUEsa0JBQVMxQixDQUFULEVBQW9CO0FBQ25CLFdBQU8sS0FBS2hCLEVBQUwsQ0FBUXFELGFBQVIsQ0FBc0JyQyxDQUF0QixJQUNOLEtBQUtoQixFQUFMLENBQVFzRCxjQUFSLENBQXVCdEMsQ0FBQyxDQUFDdUMsS0FBekIsRUFBZ0MsR0FBaEMsQ0FETSxHQUVOdkMsQ0FBQyxDQUFDdUMsS0FGSDtBQUdBLEc7RUF2RXlDekQsTTs7QUFBdEJhLGEsQ0FDYkQsTzs7Ozs7OztBQzlDUixnRDs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLWJ1YmJsZWNvbXBhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYlwiLCBbXCJkMy1zZWxlY3Rpb25cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcImJ1YmJsZWNvbXBhcmVcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xX18pIHtcbnJldHVybiAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG4vKipcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuICogQG5hbWUgdmVyc2lvblxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBsdWdpblxuICogQHR5cGUge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdHB1YmxpYyAkJDtcblx0cHVibGljIG9wdGlvbnM7XG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjEuNFwiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJpbXBvcnQge3NlbGVjdCBhcyBkM1NlbGVjdH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5cbi8qKlxuICogQnViYmxlIGNvbXBhcmUgZGlhZ3JhbSBwbHVnaW4uPGJyPlxuICogQ29tcGFyZSBkYXRhIDMtZGltZW5zaW9uYWwgd2F5czogeC1heGlzLCB5LWF4aXMgJiBidWJibGUtc2l6ZS5cbiAqIC0gKipOT1RFOioqXG4gKiAgIC0gUGx1Z2lucyBhcmVuJ3QgYnVpbHQtaW4uIE5lZWQgdG8gYmUgbG9hZGVkIG9yIGltcG9ydGVkIHRvIGJlIHVzZWQuXG4gKiAgIC0gTm9uIHJlcXVpcmVkIG1vZHVsZXMgZnJvbSBiaWxsYm9hcmQuanMgY29yZSwgbmVlZCB0byBiZSBpbnN0YWxsZWQgc2VwYXJhdGVseS5cbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcbiAqIEBjbGFzcyBwbHVnaW4tYnViYmxlY29tcGFyZVxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYnViYmxlIGNvbXBhcmUgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtCdWJibGVDb21wYXJlfVxuICogQGV4YW1wbGVcbiAqIC8vIFBsdWdpbiBtdXN0IGJlIGxvYWRlZCBiZWZvcmUgdGhlIHVzZS5cbiAqIDxzY3JpcHQgc3JjPVwiJFlPVVJfUEFUSC9wbHVnaW4vYmlsbGJvYXJkanMtcGx1Z2luLWJ1YmJsZWNvbXBhcmUuanNcIj48L3NjcmlwdD5cbiAqXG4gKiAgdmFyIGNoYXJ0ID0gYmIuZ2VuZXJhdGUoe1xuICogICAgIGRhdGE6IHtcbiAqICAgICAgICBjb2x1bW5zOiBbIC4uLiBdLFxuICogICAgICAgIHR5cGU6IFwiYnViYmxlXCJcbiAqICAgICB9XG4gKiAgICAgLi4uXG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBiYi5wbHVnaW4uYnViYmxlY29tcGFyZSh7XG4gKiAgICAgICAgICBtaW5SOiAxMSxcbiAqICAgICAgICAgIG1heFI6IDc0LFxuICogICAgICAgICAgZXhwYW5kU2NhbGU6IDEuMVxuICogICAgICAgIH0pLFxuICogICAgIF1cbiAqICB9KTtcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgQnViYmxlQ29tcGFyZSBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLWJ1YmJsZWNvbXBhcmUuZXNtXCI7XG4gKlxuICogYmIuZ2VuZXJhdGUoe1xuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgQnViYmxlQ29tcGFyZSh7IC4uLiB9KVxuICogICAgIF1cbiAqIH0pXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnViYmxlQ29tcGFyZSBleHRlbmRzIFBsdWdpbiB7XG5cdHN0YXRpYyB2ZXJzaW9uID0gYDAuMC4xYDtcblx0cHVibGljICQkO1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGluaXQoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHQkJC5maW5kQ2xvc2VzdCA9IHRoaXMuZmluZENsb3Nlc3QuYmluZCh0aGlzKTtcblx0XHQkJC5nZXRCdWJibGVSID0gdGhpcy5nZXRCdWJibGVSLmJpbmQodGhpcyk7XG5cdFx0JCQucG9pbnRFeHBhbmRlZFIgPSB0aGlzLnBvaW50RXhwYW5kZWRSLmJpbmQodGhpcyk7XG5cdH1cblxuXHRwb2ludEV4cGFuZGVkUihkKTogbnVtYmVyIHtcblx0XHRjb25zdCBiYXNlUiA9IHRoaXMuZ2V0QnViYmxlUihkKTtcblx0XHRjb25zdCB7ZXhwYW5kU2NhbGUgPSAxfSA9IHRoaXMub3B0aW9ucztcblxuXHRcdEJ1YmJsZUNvbXBhcmUucmFpc2VGb2N1c2VkQnViYmxlTGF5ZXIoZCk7XG5cdFx0dGhpcy5jaGFuZ2VDdXJzb3JQb2ludCgpO1xuXG5cdFx0cmV0dXJuIGJhc2VSICogZXhwYW5kU2NhbGU7XG5cdH1cblxuXHRzdGF0aWMgcmFpc2VGb2N1c2VkQnViYmxlTGF5ZXIoZCk6IHZvaWQge1xuXHRcdGQucmFpc2UgJiYgZDNTZWxlY3QoZC5ub2RlKCkucGFyZW50Tm9kZS5wYXJlbnROb2RlKS5yYWlzZSgpO1xuXHR9XG5cblx0Y2hhbmdlQ3Vyc29yUG9pbnQoKTogdm9pZCB7XG5cdFx0dGhpcy4kJC4kZWwuc3ZnLnNlbGVjdChgLmJiLWV2ZW50LXJlY3RgKS5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XG5cdH1cblxuXHRmaW5kQ2xvc2VzdCh2YWx1ZXMsIHBvcyk6IG51bWJlciB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHRyZXR1cm4gdmFsdWVzXG5cdFx0XHQuZmlsdGVyKHYgPT4gdiAmJiAhJCQuaXNCYXJUeXBlKHYuaWQpKVxuXHRcdFx0LnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcblx0XHRcdFx0Y29uc3QgZCA9ICQkLmRpc3QoY3VyLCBwb3MpO1xuXG5cdFx0XHRcdHJldHVybiBkIDwgdGhpcy5nZXRCdWJibGVSKGN1cikgPyBjdXIgOiBhY2M7XG5cdFx0XHR9LCAwKTtcblx0fVxuXG5cdGdldEJ1YmJsZVIoZCk6IG51bWJlciB7XG5cdFx0Y29uc3Qge21pblIsIG1heFJ9ID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IGN1clZhbCA9IHRoaXMuZ2V0WkRhdGEoZCk7XG5cblx0XHRpZiAoIWN1clZhbCkgcmV0dXJuIG1pblI7XG5cblx0XHRjb25zdCBbbWluLCBtYXhdID0gdGhpcy4kJC5kYXRhLnRhcmdldHMucmVkdWNlKFxuXHRcdFx0KFthY2NNaW4sIGFjY01heF0sIGN1cikgPT4ge1xuXHRcdFx0XHRjb25zdCB2YWwgPSB0aGlzLmdldFpEYXRhKGN1ci52YWx1ZXNbMF0pO1xuXG5cdFx0XHRcdHJldHVybiBbTWF0aC5taW4oYWNjTWluLCB2YWwpLCBNYXRoLm1heChhY2NNYXgsIHZhbCldO1xuXHRcdFx0fSxcblx0XHRcdFsxMDAwMCwgMF1cblx0XHQpO1xuXHRcdGNvbnN0IHNpemUgPSBtaW4gPiAwICYmIG1heCA9PT0gbWluID8gMCA6IGN1clZhbCAvIG1heDtcblxuXHRcdHJldHVybiBNYXRoLmFicyhzaXplKSAqIChtYXhSIC0gbWluUikgKyBtaW5SO1xuXHR9XG5cblx0Z2V0WkRhdGEoZCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuJCQuaXNCdWJibGVaVHlwZShkKSA/XG5cdFx0XHR0aGlzLiQkLmdldEJ1YmJsZVpEYXRhKGQudmFsdWUsIFwielwiKSA6XG5cdFx0XHRkLnZhbHVlO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzFfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4iXSwic291cmNlUm9vdCI6IiJ9