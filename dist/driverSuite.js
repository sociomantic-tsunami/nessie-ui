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
/******/ 	return __webpack_require__(__webpack_require__.s = 240);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SectionDriver = function () {
    function SectionDriver(wrapper) {
        _classCallCheck(this, SectionDriver);

        this.wrapper = wrapper;
        this.cssMap = wrapper.props().cssMap;
    }

    _createClass(SectionDriver, [{
        key: "getContent",
        value: function getContent() {
            return this.wrapper.find("." + this.cssMap.content).children();
        }
    }]);

    return SectionDriver;
}();

exports.default = SectionDriver;

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(9);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line max-len

var ERRORS = {
    SWITCH_CANNOT_BE_TOGGLED: function SWITCH_CANNOT_BE_TOGGLED(state) {
        return 'Switch cannot be toggled since it is ' + state;
    } // eslint-disable-line max-len
};

var SwitchDriver = function (_SimpleComponentDrive) {
    _inherits(SwitchDriver, _SimpleComponentDrive);

    function SwitchDriver(wrapper) {
        _classCallCheck(this, SwitchDriver);

        return _possibleConstructorReturn(this, (SwitchDriver.__proto__ || Object.getPrototypeOf(SwitchDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.default));
    }

    _createClass(SwitchDriver, [{
        key: 'toggle',
        value: function toggle() {
            var props = this.wrapper.props();

            if (props.isDisabled) {
                throw new Error(ERRORS.SWITCH_CANNOT_BE_TOGGLED('disabled'));
            }
            if (props.isReadOnly) {
                throw new Error(ERRORS.SWITCH_CANNOT_BE_TOGGLED('readonly'));
            }

            this.input.simulate('change', { target: { checked: !props.isChecked } });

            return this.wrapper;
        }
    }, {
        key: 'input',
        get: function get() {
            return this.wrapper.find('.' + this.cssMap.input);
        }
    }]);

    return SwitchDriver;
}(_simpleComponentDriver2.default);

exports.default = SwitchDriver;

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputComponentDriver = __webpack_require__(29);

var _inputComponentDriver2 = _interopRequireDefault(_inputComponentDriver);

var _nessieUi = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInputWithIconDriver = function (_InputComponentDriver) {
    _inherits(TextInputWithIconDriver, _InputComponentDriver);

    function TextInputWithIconDriver() {
        _classCallCheck(this, TextInputWithIconDriver);

        return _possibleConstructorReturn(this, (TextInputWithIconDriver.__proto__ || Object.getPrototypeOf(TextInputWithIconDriver)).apply(this, arguments));
    }

    _createClass(TextInputWithIconDriver, [{
        key: 'getErrorMessage',
        value: function getErrorMessage() {
            var iconWithTooltip = this.wrapper.children().filter(_nessieUi.IconWithTooltip);
            return iconWithTooltip.driver().getMessage();
        }
    }, {
        key: 'getIconTooltipMessage',
        value: function getIconTooltipMessage() {
            // TODO: getIconTooltipMessage
            throw new Error('Not implemented yet.');
        }
    }]);

    return TextInputWithIconDriver;
}(_inputComponentDriver2.default);

exports.default = TextInputWithIconDriver;

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _simpleComponentDriver = __webpack_require__(9);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line max-len

var ERRORS = {
    TOOLTIP_HAS_NO_CONTENT: function TOOLTIP_HAS_NO_CONTENT(action) {
        return 'Cannot ' + action + ' on tooltip. No content available';
    }
};
/**
 * This driver simulate actions on the content rather than on the tooltip
 * itself, as this is how a user would act.
 */

var TooltipDriver = function (_SimpleComponentDrive) {
    _inherits(TooltipDriver, _SimpleComponentDrive);

    function TooltipDriver(wrapper) {
        _classCallCheck(this, TooltipDriver);

        return _possibleConstructorReturn(this, (TooltipDriver.__proto__ || Object.getPrototypeOf(TooltipDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.content));
    }

    _createClass(TooltipDriver, [{
        key: 'mouseOver',
        value: function mouseOver() {
            checkContentAccessiblity(this, 'mouseover');
            return _get(TooltipDriver.prototype.__proto__ || Object.getPrototypeOf(TooltipDriver.prototype), 'mouseOver', this).call(this);
        }
    }, {
        key: 'mouseOut',
        value: function mouseOut() {
            checkContentAccessiblity(this, 'mouseout');
            return _get(TooltipDriver.prototype.__proto__ || Object.getPrototypeOf(TooltipDriver.prototype), 'mouseOut', this).call(this);
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            return this.control.children();
        }
    }, {
        key: 'getMessage',
        value: function getMessage() {
            return this.wrapper.find('.' + this.cssMap.message).children();
        }
    }]);

    return TooltipDriver;
}(_simpleComponentDriver2.default);

exports.default = TooltipDriver;


function checkContentAccessiblity(driver, method) {
    if (driver.control.length === 0) {
        throw new Error(ERRORS.TOOLTIP_HAS_NO_CONTENT(method));
    }
}

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

module.exports = require("nessie-ui/dist/componentDriver.js");

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("nessie-ui/dist/index.js");

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(9);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClickableComponentDriver = function (_SimpleComponentDrive) {
    _inherits(ClickableComponentDriver, _SimpleComponentDrive);

    function ClickableComponentDriver() {
        _classCallCheck(this, ClickableComponentDriver);

        return _possibleConstructorReturn(this, (ClickableComponentDriver.__proto__ || Object.getPrototypeOf(ClickableComponentDriver)).apply(this, arguments));
    }

    _createClass(ClickableComponentDriver, [{
        key: 'click',
        value: function click() {
            this.control.simulate('click');
            return this;
        }
    }]);

    return ClickableComponentDriver;
}(_simpleComponentDriver2.default);

exports.default = ClickableComponentDriver;

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputComponentDriver = exports.ClickableComponentDriver = exports.SimpleComponentDriver = undefined;

var _componentDriver = __webpack_require__(121);

var _nessieUi = __webpack_require__(14);

var _driver = __webpack_require__(57);

var _driver2 = _interopRequireDefault(_driver);

var _driver3 = __webpack_require__(79);

var _driver4 = _interopRequireDefault(_driver3);

var _driver5 = __webpack_require__(74);

var _driver6 = _interopRequireDefault(_driver5);

var _driver7 = __webpack_require__(117);

var _driver8 = _interopRequireDefault(_driver7);

var _driver9 = __webpack_require__(75);

var _driver10 = _interopRequireDefault(_driver9);

var _driver11 = __webpack_require__(68);

var _driver12 = _interopRequireDefault(_driver11);

var _driver13 = __webpack_require__(116);

var _driver14 = _interopRequireDefault(_driver13);

var _driver15 = __webpack_require__(93);

var _driver16 = _interopRequireDefault(_driver15);

var _driver17 = __webpack_require__(100);

var _driver18 = _interopRequireDefault(_driver17);

var _driver19 = __webpack_require__(72);

var _driver20 = _interopRequireDefault(_driver19);

var _driver21 = __webpack_require__(70);

var _driver22 = _interopRequireDefault(_driver21);

var _driver23 = __webpack_require__(82);

var _driver24 = _interopRequireDefault(_driver23);

var _driver25 = __webpack_require__(85);

var _driver26 = _interopRequireDefault(_driver25);

var _driver27 = __webpack_require__(77);

var _driver28 = _interopRequireDefault(_driver27);

var _driver29 = __webpack_require__(105);

var _driver30 = _interopRequireDefault(_driver29);

var _simpleComponentDriver = __webpack_require__(9);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

var _clickableComponentDriver = __webpack_require__(23);

var _clickableComponentDriver2 = _interopRequireDefault(_clickableComponentDriver);

var _inputComponentDriver = __webpack_require__(29);

var _inputComponentDriver2 = _interopRequireDefault(_inputComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line max-len

// eslint-disable-line max-len
var drivers = [{
    Component: _nessieUi.Button,
    Driver: _driver2.default
}, {
    Component: _nessieUi.Module,
    Driver: _driver4.default
}, {
    Component: _nessieUi.TextInputWithIcon,
    Driver: _driver14.default
}, {
    Component: _nessieUi.PasswordInput,
    Driver: _driver16.default
}, {
    Component: _nessieUi.Icon,
    Driver: _driver6.default
}, {
    Component: _nessieUi.Tooltip,
    Driver: _driver8.default
}, {
    Component: _nessieUi.IconWithTooltip,
    Driver: _driver10.default
}, {
    Component: _nessieUi.IconButton,
    Driver: _driver2.default
}, {
    Component: _nessieUi.FlounderDropdown,
    Driver: _driver12.default
}, {
    Component: _nessieUi.TextInput,
    Driver: _inputComponentDriver2.default
}, {
    Component: _nessieUi.Section,
    Driver: _driver18.default
}, {
    Component: _nessieUi.Grid,
    Driver: _driver20.default
}, {
    Component: _nessieUi.Row,
    Driver: _driver20.default
}, {
    Component: _nessieUi.Column,
    Driver: _driver20.default
}, {
    Component: _nessieUi.Form,
    Driver: _driver22.default
}, {
    Component: _nessieUi.NavItem,
    Driver: _driver24.default
}, {
    Component: _nessieUi.NotificationBar,
    Driver: _driver26.default
}, {
    Component: _nessieUi.ModalDialog,
    Driver: _driver28.default
}, {
    Component: _nessieUi.Switch,
    Driver: _driver30.default
}]; // eslint-disable-line max-len
exports.SimpleComponentDriver = _simpleComponentDriver2.default;
exports.ClickableComponentDriver = _clickableComponentDriver2.default;
exports.InputComponentDriver = _inputComponentDriver2.default;
exports.default = _componentDriver.ComponentDriver.createDriverSuite(drivers);

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _clickableComponentDriver = __webpack_require__(23);

var _clickableComponentDriver2 = _interopRequireDefault(_clickableComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ERRORS = {
    INPUT_CANNOT_BE_CLICKED: function INPUT_CANNOT_BE_CLICKED(label, state) {
        return 'Input \'' + label + '\' cannot be clicked since it is ' + state;
    },
    INPUT_CANNOT_CHANGE_VALUE: function INPUT_CANNOT_CHANGE_VALUE(label, state) {
        return 'Input \'' + label + '\' value cannot be changed since it is ' + state;
    },
    INPUT_CANNOT_PRESS_KEY: function INPUT_CANNOT_PRESS_KEY(label, state) {
        return 'Cannot press a key on Input \'' + label + '\' since it is ' + state;
    }
};

var InputComponentDriver = function (_ClickableComponentDr) {
    _inherits(InputComponentDriver, _ClickableComponentDr);

    function InputComponentDriver(wrapper) {
        _classCallCheck(this, InputComponentDriver);

        return _possibleConstructorReturn(this, (InputComponentDriver.__proto__ || Object.getPrototypeOf(InputComponentDriver)).call(this, wrapper, 'input'));
    }

    /**
     * Simulates a full transaction of value input: focus, value change, blur.
     * This is useful for fields as part of form that require a blur to complete
     * the change of value.
     * In order to set a value on its own please see inputValue()
     * @param {String|Integer} value the value to set.
     * @return {InputComponentDriver} this driver (for chaining commands)
     */


    _createClass(InputComponentDriver, [{
        key: 'setInputValue',
        value: function setInputValue(value) {
            checkIfSimulationIsValid(this.wrapper, ERRORS.INPUT_CANNOT_CHANGE_VALUE);

            var newValue = value == null ? '' : String(value);
            var $input = this.control;
            this.focus();
            $input.node.value = value;
            $input.simulate('change', { target: { value: newValue } });
            this.blur();

            return this;
        }
    }, {
        key: 'clearInputValue',
        value: function clearInputValue() {
            return this.setInputValue('');
        }

        /**
         * Simulates the pressing of a give key. In case of a printible character
         * the input will be updated accordingly as well.
         * @param {Integer} keyCode the integer code of a key
         * @return {InputComponentDriver} this driver (for chaining commands)
         */

    }, {
        key: 'pressKey',
        value: function pressKey(keyCode) {
            checkIfSimulationIsValid(this.wrapper, ERRORS.INPUT_CANNOT_PRESS_KEY);

            this.control.simulate('keyDown', { which: keyCode });
            this.control.simulate('keyPress', { which: keyCode });

            if (isCharPrintable(keyCode)) {
                this.control.node.value += String.fromCharCode(keyCode);
                this.control.simulate('change', {
                    target: { value: this.control.node.value }
                });
            }

            this.control.simulate('keyUp', { which: keyCode });
            return this;
        }

        /**
         * Pressing each character of the value one by one.
         * @param {String} value a value press
         * @return {InputComponentDriver} this driver (for chaining commands)
         */

    }, {
        key: 'inputValue',
        value: function inputValue(value) {
            var _this2 = this;

            var FIRST_CHARACTER = 0;
            var keys = value.toString().split('');

            keys.forEach(function (key) {
                var keyCode = key.charCodeAt(FIRST_CHARACTER);
                _this2.pressKey(keyCode);
            });

            return this;
        }

        /**
         * the Nessie component can behave as either a controlled or uncontrolled
         * input. This depends on whether you set the value prop (controlled) or
         * defaultValue prop (uncontrolled).
         * In case the Nessie Component is used in a controlled manner, it is
         * possible and recommneded to retreive it through the component's
         * properties.
         * For Uncotrolled value, this function is essential in order to retreive
         * the value.
         * @return {String} the input value
         */

    }, {
        key: 'getInputValue',
        value: function getInputValue() {
            return this.control.node.value;
        }
    }, {
        key: 'click',
        value: function click() {
            checkIfSimulationIsValid(this.wrapper, ERRORS.INPUT_CANNOT_BE_CLICKED);

            return _get(InputComponentDriver.prototype.__proto__ || Object.getPrototypeOf(InputComponentDriver.prototype), 'click', this).call(this);
        }
    }]);

    return InputComponentDriver;
}(_clickableComponentDriver2.default);

/**
 * Checks the state of the input, and throws an error in case the state is not
 * permiting the simulated action.
 * @param {Object} wrapper - The warpper object that is being simulated.
 * @param {Function} errorIfInvalid - The error to throw in case the object is
 * not avilable for a simulation.
 */


exports.default = InputComponentDriver;
function checkIfSimulationIsValid(wrapper, errorIfInvalid) {
    var props = wrapper.props();
    var label = props.label;

    if (props.isDisabled) {
        throw new Error(errorIfInvalid(label, 'disabled'));
    } else if (props.isReadOnly) {
        throw new Error(errorIfInvalid(label, 'read only'));
    }
}

/**
 * Checks if a character is printable. (partial black listing of keys)
 * @param {Integer} keyCode the key code to check
 */
function isCharPrintable(keyCode) {
    var blackList = [13];

    return !blackList.includes(keyCode);
}

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _clickableComponentDriver = __webpack_require__(23);

var _clickableComponentDriver2 = _interopRequireDefault(_clickableComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line max-len

var ERRORS = {
    BUTTON_CANNOT_BE_CLICKED: function BUTTON_CANNOT_BE_CLICKED(label, state) {
        return 'Button \'' + label + '\' cannot be clicked since it is ' + state;
    } // eslint-disable-line max-len
};

var ButtonDriver = function (_ClickableComponentDr) {
    _inherits(ButtonDriver, _ClickableComponentDr);

    function ButtonDriver(wrapper) {
        _classCallCheck(this, ButtonDriver);

        return _possibleConstructorReturn(this, (ButtonDriver.__proto__ || Object.getPrototypeOf(ButtonDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.default));
    }

    _createClass(ButtonDriver, [{
        key: 'click',
        value: function click() {
            var props = this.wrapper.props();
            var label = props.label;

            if (props.isDisabled) {
                throw new Error(ERRORS.BUTTON_CANNOT_BE_CLICKED(label, 'disabled'));
            }
            if (props.isLoading) {
                throw new Error(ERRORS.BUTTON_CANNOT_BE_CLICKED(label, 'loading'));
            }

            return _get(ButtonDriver.prototype.__proto__ || Object.getPrototypeOf(ButtonDriver.prototype), 'click', this).call(this);
        }
    }]);

    return ButtonDriver;
}(_clickableComponentDriver2.default);

exports.default = ButtonDriver;

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERRORS = {
    CANNOT_SELECT_ITEMS: function CANNOT_SELECT_ITEMS(byWhat, index) {
        return 'Item(s) not found by ' + byWhat + ': ' + index + '. item(s) cannot selected.';
    },
    CANNOT_DESELECT_TAGS: 'Cannot deselect tags when flounder dropdown is \
not configured with multipleTags',
    DROPDOWN_DISABLED: 'Cannot change the flounder dropdown value since \
it is disabled',
    DROPDOWN_READ_ONLY: 'Cannot change the flounder dropdown value since \
it is read-only'
};

/**
 * Driver for flounder dropdown driver. The flounder dropdown uses currently
 * a non React control. This renders Enzyme useless in many cases and a manual
 * approach is used. If the control changes to React please extend
 * InputComponentDriver.
 * When this will happen the following methods could be developed easily:
 * Search, SearchAndChoose (through change text)
 * ToggleDropdownOptions (through click/hover)
 *
 * otherwise I think it's possible to change the elements through
 * this.flounderControl.refs and re-render the wrapper.
 */

var FlounderDropdownDriver = function () {
    function FlounderDropdownDriver(wrapper) {
        _classCallCheck(this, FlounderDropdownDriver);

        // Nessie Control
        this.wrapper = wrapper;
        // the 3rd party control
        this.innerFlounderComponent = wrapper.node.flounderInstance;
    }

    /**
     * Choosing Item in an opened Dropdown.
     * @param {String|String[]} value - value or array of values of the selected
     * items
     * @return {Object} wrapper
     */


    _createClass(FlounderDropdownDriver, [{
        key: 'chooseItemByValue',
        value: function chooseItemByValue(value) {
            var _this = this;

            return chooseItem(function () {
                var _innerFlounderCompone;

                return (_innerFlounderCompone = _this.innerFlounderComponent).clickByValue.apply(_innerFlounderCompone, arguments);
            }, value, 'value', this.wrapper);
        }

        /**
         * Choosing Item in an opened Dropdown.
         * @param {String|String[]} text - text or array of texts of the selected
         * items
         * @return {Object} wrapper
         */

    }, {
        key: 'chooseItemByText',
        value: function chooseItemByText(text) {
            var _this2 = this;

            return chooseItem(function () {
                var _innerFlounderCompone2;

                return (_innerFlounderCompone2 = _this2.innerFlounderComponent).clickByText.apply(_innerFlounderCompone2, arguments);
            }, text, 'text', this.wrapper);
        }

        /**
        * Click dropdown option(s) by index
        * @param {int|int[]} index - index or array of indexes of the selected
        * items
        * @return {Object} wrapper
        */

    }, {
        key: 'chooseItemByIndex',
        value: function chooseItemByIndex(index) {
            var _this3 = this;

            /* since the placeholder is always at index 0 in Flounder’s internal
             * representation we increment the index (or indices) by 1
             */
            var internalIndex = Array.isArray(index) ? index.map(function (i) {
                return i + 1;
            }) : index + 1;

            return chooseItem(function () {
                var _innerFlounderCompone3;

                return (_innerFlounderCompone3 = _this3.innerFlounderComponent).clickByIndex.apply(_innerFlounderCompone3, arguments);
            }, internalIndex, 'index', this.wrapper);
        }

        /**
         * Removes all tags by clicking on them (only for flounder configured for
         * tags)
         * @return {Object} wrapper
         */

    }, {
        key: 'removeAllTags',
        value: function removeAllTags() {
            if (this.wrapper.prop('isDisabled')) {
                throw new Error(ERRORS.DROPDOWN_DISABLED);
            }

            if (this.wrapper.prop('isReadOnly')) {
                throw new Error(ERRORS.DROPDOWN_READ_ONLY);
            }

            if (!this.wrapper.prop('multipleTags')) {
                throw new Error(ERRORS.CANNOT_DESELECT_TAGS);
            }

            var tagWrapper = this.innerFlounderComponent.refs.multiTagWrapper;

            var tags = Array.prototype.slice.call(tagWrapper.children, 0, -1);

            tags.forEach(function (el) {
                el.children[0].click();
            });

            return this;
        }
    }, {
        key: 'getFlounderAPI',
        value: function getFlounderAPI() {
            return this.innerFlounderComponent;
        }
    }, {
        key: 'getSelectedValues',
        value: function getSelectedValues() {
            return this.innerFlounderComponent.getSelectedValues();
        }
    }, {
        key: 'getSelectedItems',
        value: function getSelectedItems() {
            return this.innerFlounderComponent.getSelected();
        }
    }, {
        key: 'getErrorMessage',
        value: function getErrorMessage() {
            return this.wrapper.find('IconWithTooltip').driver().getMessage();
        }
    }]);

    return FlounderDropdownDriver;
}();

/**
 * General Method for selecting items
 * @param {Function} method - The flounder method to choose items with
 * @param {String|String[]|Number|Number[]} searchTerm - index/text/value
 * @param {String} errorByWhat - string representation of index/text/value
 * @param {Object} wrapper - the Enzyme ReactWrapper
 * @return {Object} wrapper
 */


exports.default = FlounderDropdownDriver;
function chooseItem(method, searchTerm, errorByWhat, wrapper) {
    if (wrapper.prop('isDisabled')) {
        throw new Error(ERRORS.DROPDOWN_DISABLED);
    }

    if (wrapper.prop('isReadOnly')) {
        throw new Error(ERRORS.DROPDOWN_READ_ONLY);
    }

    var multiple = Array.isArray(searchTerm);
    var selected = method(searchTerm, multiple);

    if (selected == null || selected instanceof Array && selected.indexOf(null) >= 0) {
        throw new Error(ERRORS.CANNOT_SELECT_ITEMS(errorByWhat, searchTerm));
    }
    return this;
}

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormDriver = function () {
    function FormDriver(wrapper) {
        _classCallCheck(this, FormDriver);

        this.wrapper = wrapper;
        this.cssMap = wrapper.prop('cssMap');
    }

    _createClass(FormDriver, [{
        key: 'submit',
        value: function submit() {
            this.wrapper.simulate('submit');
            return this.wrapper;
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            return this.wrapper.find('.' + this.cssMap.content).children();
        }
    }]);

    return FormDriver;
}();

exports.default = FormDriver;

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GridColumnDriver = function () {
    function GridColumnDriver(wrapper) {
        _classCallCheck(this, GridColumnDriver);

        this.wrapper = wrapper;
    }

    _createClass(GridColumnDriver, [{
        key: "getContent",
        value: function getContent() {
            return this.wrapper.children();
        }
    }]);

    return GridColumnDriver;
}();

exports.default = GridColumnDriver;

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _simpleComponentDriver = __webpack_require__(9);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-next-line max-len


var IconDriver = function (_SimpleComponentDrive) {
    _inherits(IconDriver, _SimpleComponentDrive);

    function IconDriver(wrapper) {
        _classCallCheck(this, IconDriver);

        var _this = _possibleConstructorReturn(this, (IconDriver.__proto__ || Object.getPrototypeOf(IconDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.default));

        _this.button = _this.control;
        return _this;
    }

    return IconDriver;
}(_simpleComponentDriver2.default);

exports.default = IconDriver;

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(9);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-next-line max-len


var IconWithTooltipDriver = function (_SimpleComponentDrive) {
    _inherits(IconWithTooltipDriver, _SimpleComponentDrive);

    function IconWithTooltipDriver(wrapper) {
        _classCallCheck(this, IconWithTooltipDriver);

        var _this = _possibleConstructorReturn(this, (IconWithTooltipDriver.__proto__ || Object.getPrototypeOf(IconWithTooltipDriver)).call(this, wrapper, 'IconWithTooltip > Tooltip'));

        _this.tooltip = _this.control;
        return _this;
    }

    _createClass(IconWithTooltipDriver, [{
        key: 'getContent',
        value: function getContent() {
            return this.wrapper.find('.' + this.cssMap.content).children();
        }
    }, {
        key: 'getMessage',
        value: function getMessage() {
            return this.tooltip.driver().getMessage();
        }
    }]);

    return IconWithTooltipDriver;
}(_simpleComponentDriver2.default);

exports.default = IconWithTooltipDriver;

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nessieUi = __webpack_require__(14);

var _simpleComponentDriver = __webpack_require__(9);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ERR = {
    NOT_A_CAROUSEL: function NOT_A_CAROUSEL(item) {
        return 'Cannot trigger click on the "' + item + '" because the modal is not a Carousel';
    }
};

var ModalDialogDriver = function (_SimpleComponentDrive) {
    _inherits(ModalDialogDriver, _SimpleComponentDrive);

    function ModalDialogDriver(wrapper) {
        _classCallCheck(this, ModalDialogDriver);

        var _this = _possibleConstructorReturn(this, (ModalDialogDriver.__proto__ || Object.getPrototypeOf(ModalDialogDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.content));

        _this.overlay = wrapper.find('.' + _this.cssMap.default);

        _this.closeButton = wrapper.find('.' + _this.cssMap.header).find(_nessieUi.IconButton);

        _this.prevButton = wrapper.find('.' + _this.cssMap.navigation).find(_nessieUi.IconButton).first();

        _this.nextButton = wrapper.find('.' + _this.cssMap.navigation).find(_nessieUi.IconButton).last();
        return _this;
    }

    _createClass(ModalDialogDriver, [{
        key: 'getContent',
        value: function getContent() {
            return this.control.children();
        }
    }, {
        key: 'clickOverlay',
        value: function clickOverlay() {
            this.overlay.simulate('click');
        }
    }, {
        key: 'clickClose',
        value: function clickClose() {
            if (this.wrapper.prop('type') !== 'carousel') {
                throw new Error(ERR.NOT_A_CAROUSEL('Close Button'));
            }
            this.closeButton.driver().click();
        }
    }, {
        key: 'clickPrev',
        value: function clickPrev() {
            if (this.wrapper.prop('type') !== 'carousel') {
                throw new Error(ERR.NOT_A_CAROUSEL('Prev Button'));
            }
            this.prevButton.driver().click();
        }
    }, {
        key: 'clickNext',
        value: function clickNext() {
            if (this.wrapper.prop('type') !== 'carousel') {
                throw new Error(ERR.NOT_A_CAROUSEL('Next Button'));
            }
            this.nextButton.driver().click();
        }
    }]);

    return ModalDialogDriver;
}(_simpleComponentDriver2.default);

exports.default = ModalDialogDriver;

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable valid-jsdoc, no-magic-numbers */


var _nessieUi = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable max-len */
var ERRORS = {
    MODULE_NOT_COLLAPSIBLE: 'Module is not collapsible. Cannot simulate toggle.',
    MODULE_HAS_NO_DELETE: 'Module has no delete button. Cannot simulate delete.',
    MODULE_HAS_NO_CUSTOM_HEADER: 'Module has no customHeader. Cannot get contents.'
};
/* eslint-disable max-len */

var ModuleDriver = function () {
    function ModuleDriver(wrapper) {
        _classCallCheck(this, ModuleDriver);

        this.wrapper = wrapper;
        this.cssMap = wrapper.props().cssMap;
    }

    /**
     * Simulate human toggle by clicking on the arrow.
     */


    _createClass(ModuleDriver, [{
        key: 'toggle',
        value: function toggle() {
            var toggle = this.wrapper.find(_nessieUi.IconButton).last();

            if (toggle.length === 0) {
                throw new Error(ERRORS.MODULE_NOT_COLLAPSIBLE);
            }

            toggle.simulate('click');
            return this.wrapper;
        }

        /**
         * Simulate clicking on the module's delete button (if applicable)
         */

    }, {
        key: 'clickDelete',
        value: function clickDelete() {
            if (!this.wrapper.prop('isDeletable')) {
                throw new Error(ERRORS.MODULE_HAS_NO_DELETE);
            }

            var deleteButton = this.wrapper.find(_nessieUi.IconButton).first();

            deleteButton.driver().click();

            return this.wrapper;
        }
    }, {
        key: 'getCustomHeader',
        value: function getCustomHeader() {
            if (!this.wrapper.props().customHeader) {
                throw new Error(ERRORS.MODULE_HAS_NO_CUSTOM_HEADER);
            }
            return this.wrapper.find('.' + this.cssMap.header).children();
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            return this.wrapper.find('.' + this.cssMap.content).children();
        }
    }]);

    return ModuleDriver;
}();

exports.default = ModuleDriver;

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clickableComponentDriver = __webpack_require__(23);

var _clickableComponentDriver2 = _interopRequireDefault(_clickableComponentDriver);

var _nessieUi = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-next-line max-len


var NavItemDriver = function (_ClickableComponentDr) {
    _inherits(NavItemDriver, _ClickableComponentDr);

    function NavItemDriver(wrapper) {
        _classCallCheck(this, NavItemDriver);

        return _possibleConstructorReturn(this, (NavItemDriver.__proto__ || Object.getPrototypeOf(NavItemDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.link));
    }

    _createClass(NavItemDriver, [{
        key: 'getLabel',
        value: function getLabel() {
            return this.wrapper.find('.' + this.cssMap.link + ' span').first().children();
        }
    }, {
        key: 'getChildNavItems',
        value: function getChildNavItems() {
            var dropdown = this.wrapper.find(_nessieUi.NavDropdown);
            if (dropdown.length !== 1) {
                return [];
            }

            return dropdown.children(_nessieUi.NavItem);
        }
    }]);

    return NavItemDriver;
}(_clickableComponentDriver2.default);

exports.default = NavItemDriver;

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(9);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-next-line max-len


var ERR = {
    NOTIFICATION_NOT_DISMISSIBLE: 'The NotificationBar is not dismissible'
};

var NotificationBarDriver = function (_SimpleComponentDrive) {
    _inherits(NotificationBarDriver, _SimpleComponentDrive);

    function NotificationBarDriver(wrapper) {
        _classCallCheck(this, NotificationBarDriver);

        return _possibleConstructorReturn(this, (NotificationBarDriver.__proto__ || Object.getPrototypeOf(NotificationBarDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.default));
    }

    _createClass(NotificationBarDriver, [{
        key: 'clickClose',
        value: function clickClose() {
            if (!this.wrapper.props().isDismissible) {
                throw new Error(ERR.NOTIFICATION_NOT_DISMISSIBLE);
            }

            this.wrapper.find('.' + this.cssMap.close).simulate('click');
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            return this.wrapper.find('.' + this.cssMap.message).children();
        }
    }]);

    return NotificationBarDriver;
}(_simpleComponentDriver2.default);

exports.default = NotificationBarDriver;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleComponentDriver = function () {
    function SimpleComponentDriver(wrapper, selector) {
        _classCallCheck(this, SimpleComponentDriver);

        this.wrapper = wrapper;
        this.control = wrapper.find(selector).first();
        this.cssMap = this.wrapper.props().cssMap;
    }

    _createClass(SimpleComponentDriver, [{
        key: 'focus',
        value: function focus() {
            this.control.simulate('focus');
            return this;
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.control.simulate('blur');
            return this;
        }
    }, {
        key: 'mouseOver',
        value: function mouseOver() {
            this.control.simulate('mouseover');
            return this;
        }
    }, {
        key: 'mouseOut',
        value: function mouseOut() {
            this.control.simulate('mouseout');
            return this;
        }
    }]);

    return SimpleComponentDriver;
}();

exports.default = SimpleComponentDriver;

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nessieUi = __webpack_require__(14);

var _inputComponentDriver = __webpack_require__(29);

var _inputComponentDriver2 = _interopRequireDefault(_inputComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PasswordInput = function (_InputComponentDriver) {
    _inherits(PasswordInput, _InputComponentDriver);

    function PasswordInput() {
        _classCallCheck(this, PasswordInput);

        return _possibleConstructorReturn(this, (PasswordInput.__proto__ || Object.getPrototypeOf(PasswordInput)).apply(this, arguments));
    }

    _createClass(PasswordInput, [{
        key: 'getErrorMessage',
        value: function getErrorMessage() {
            var textInputWithIcon = this.wrapper.find(_nessieUi.TextInputWithIcon);
            return textInputWithIcon.driver().getErrorMessage();
        }
    }]);

    return PasswordInput;
}(_inputComponentDriver2.default);

exports.default = PasswordInput;

/***/ })

/******/ });
//# sourceMappingURL=driverSuite.js.map