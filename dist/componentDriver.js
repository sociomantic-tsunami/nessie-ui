module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ({

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extendEnzyme = extendEnzyme;
exports.createDriverSuite = createDriverSuite;
var Drivers = new WeakMap();

var Err = {
    BAD_DRIVER_NODE_COUNT: function BAD_DRIVER_NODE_COUNT(_ref) {
        var count = _ref.count;
        return 'ReactWrapper::driver() requires the wrapper to contain exactly one node, but the wrapper contains ' + count + ' nodes';
    },
    SHALLOW_NOT_SUPPORTED: 'ShallowWrapper::driver() is not supported.',
    NO_DRIVER_FOUND: function NO_DRIVER_FOUND(_ref2) {
        var name = _ref2.name;
        return 'Could not find driver for Component ' + name;
    },
    BAD_SUITE_COMPONENT: 'Invalid driver suite specification; expect "Component" to be a function.',
    BAD_SUITE_DRIVER: 'Invalid driver suite specification; expect "Driver" to be a function.'
};

function extendEnzyme(enzyme) {
    enzyme.ReactWrapper.prototype.driver = function () {
        if (this.length === 0) {
            throw new Error(Err.BAD_DRIVER_NODE_COUNT({ count: this.length }));
        }

        var componentConstructor = this.type();
        var Driver = Drivers.get(componentConstructor);

        if (!Driver) {
            throw new Error(Err.NO_DRIVER_FOUND({ name: componentConstructor.name }));
        }

        return new Driver(this);
    };

    enzyme.ShallowWrapper.prototype.driver = function () {
        throw new Error(Err.SHALLOW_NOT_SUPPORTED);
    };
}

function createDriverSuite(suiteSpec) {
    for (var _len = arguments.length, extensions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        extensions[_key - 1] = arguments[_key];
    }

    return {
        provideDrivers: function provideDrivers() {
            extensions.forEach(function (suite) {
                return suite.provideDrivers();
            });
            _provideDrivers(suiteSpec);
        }
    };
}

function _provideDrivers(suiteSpec) {
    suiteSpec.forEach(function (_ref3) {
        var Component = _ref3.Component,
            Driver = _ref3.Driver;

        if (!(typeof Component === 'function')) {
            throw new Error(Err.BAD_SUITE_COMPONENT);
        }

        if (!(typeof Driver === 'function')) {
            throw new Error(Err.BAD_SUITE_DRIVER);
        }

        Drivers.set(Component, Driver);
    });
}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentDriver = undefined;

var _ComponentDriver = __webpack_require__(106);

var ComponentDriver = _interopRequireWildcard(_ComponentDriver);

var _index = __webpack_require__(45);

var lib = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = lib;
exports.ComponentDriver = ComponentDriver;

/***/ })

/******/ });
//# sourceMappingURL=componentDriver.js.map