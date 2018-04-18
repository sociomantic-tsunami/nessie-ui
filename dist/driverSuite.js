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
/******/ 	return __webpack_require__(__webpack_require__.s = 256);
/******/ })
/************************************************************************/
/******/ ({

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERRORS = {
    SCROLL_CANNOT_BE_CLICKED: function SCROLL_CANNOT_BE_CLICKED(prop) {
        return 'Button cannot be clicked since it doesn\'t have ' + prop + ' prop';
    }, // eslint-disable-line max-len
    CANNOT_SCROLL_IN_DIRECTION: function CANNOT_SCROLL_IN_DIRECTION(direction) {
        return 'Cannot scroll because scroll direction is neither \'' + direction + '\' nor \'both\'';
    } // eslint-disable-line max-len
};

var ScrollBoxDriver = function () {
    function ScrollBoxDriver(wrapper) {
        _classCallCheck(this, ScrollBoxDriver);

        this.wrapper = wrapper;
        this.props = this.wrapper.props();
    }

    _createClass(ScrollBoxDriver, [{
        key: 'clickScrollUp',
        value: function clickScrollUp() {
            if (!this.props.scrollUpIsVisible) {
                throw new Error(ERRORS.SCROLL_CANNOT_BE_CLICKED('scrollUpIsVisible'));
            }

            this.wrapper.find('.scrollBox__icon__up').first().simulate('click');
            return this;
        }
    }, {
        key: 'clickScrollRight',
        value: function clickScrollRight() {
            if (!this.props.scrollRightIsVisible) {
                throw new Error(ERRORS.SCROLL_CANNOT_BE_CLICKED('scrollRightIsVisible'));
            }

            this.wrapper.find('.scrollBox__icon__right').first().simulate('click');
            return this;
        }
    }, {
        key: 'clickScrollDown',
        value: function clickScrollDown() {
            if (!this.props.scrollDownIsVisible) {
                throw new Error(ERRORS.SCROLL_CANNOT_BE_CLICKED('scrollDownIsVisible'));
            }

            this.wrapper.find('.scrollBox__icon__down').first().simulate('click');
            return this;
        }
    }, {
        key: 'clickScrollLeft',
        value: function clickScrollLeft() {
            if (!this.props.scrollLeftIsVisible) {
                throw new Error(ERRORS.SCROLL_CANNOT_BE_CLICKED('scrollLeftIsVisible'));
            }

            this.wrapper.find('.scrollBox__icon__left').first().simulate('click');
            return this;
        }
    }, {
        key: 'scrollVertical',
        value: function scrollVertical(scrollOffset) {
            if (!(this.props.scroll === 'vertical' || this.props.scroll === 'both')) {
                throw new Error(ERRORS.CANNOT_SCROLL_IN_DIRECTION('vertical'));
            }

            this.wrapper.find('.scrollBox__scrollBox').simulate('scroll', {
                target: { scrollTop: scrollOffset }
            });
            return this;
        }
    }, {
        key: 'scrollHorizontal',
        value: function scrollHorizontal(scrollOffset) {
            if (!(this.props.scroll === 'horizontal' || this.props.scroll === 'both')) {
                throw new Error(ERRORS.CANNOT_SCROLL_IN_DIRECTION('horizontal'));
            }

            this.wrapper.find('.scrollBox__scrollBox').simulate('scroll', {
                target: { scrollLeft: scrollOffset }
            });
            return this;
        }
    }]);

    return ScrollBoxDriver;
}();

exports.default = ScrollBoxDriver;

/***/ }),

/***/ 106:
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

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERRORS = {
    DISABLED: function DISABLED(label, action) {
        return 'Slider ' + (label ? '\'' + label + '\'' : '') + ' cannot be ' + action + ' since it is disabled';
    }
};

var toArray = function toArray(value) {
    return Array.isArray(value) ? value : [value];
};

var SliderDriver = function () {
    function SliderDriver(wrapper) {
        _classCallCheck(this, SliderDriver);

        this.wrapper = wrapper;

        this.cssMap = wrapper.prop('cssMap');
        this.label = wrapper.prop('label');

        this.default = wrapper.find('.' + this.cssMap.default);
        this.inputContainer = wrapper.find('.' + this.cssMap.inputContainer);
        this.track = wrapper.find('.' + this.cssMap.track);
    }

    _createClass(SliderDriver, [{
        key: 'blur',
        value: function blur() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (this.wrapper.prop('isDisabled')) {
                throw new Error(ERRORS.DISABLED(this.label, 'blurred'));
            }

            this.inputContainer.childAt(index).simulate('blur');
            return this;
        }
    }, {
        key: 'change',
        value: function change(value) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (this.wrapper.prop('isDisabled')) {
                throw new Error(ERRORS.DISABLED(this.label, 'changed'));
            }

            this.inputContainer.childAt(index).simulate('change', {
                target: { value: value }
            });
            return this;
        }
    }, {
        key: 'click',
        value: function click() {
            if (this.wrapper.prop('isDisabled')) {
                throw new Error(ERRORS.DISABLED(this.label, 'clicked'));
            }

            this.track.simulate('click');
            return this;
        }
    }, {
        key: 'focus',
        value: function focus() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (this.wrapper.prop('isDisabled')) {
                throw new Error(ERRORS.DISABLED(this.label, 'focused'));
            }

            this.inputContainer.childAt(index).simulate('focus');
            return this;
        }
    }, {
        key: 'keyDown',
        value: function keyDown(keyCode) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (this.wrapper.prop('isDisabled')) {
                throw new Error(ERRORS.DISABLED(this.label, 'changed'));
            }

            this.inputContainer.childAt(index).simulate('keyDown', { keyCode: keyCode });
            return this;
        }
    }, {
        key: 'keyUp',
        value: function keyUp(keyCode) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (this.wrapper.prop('isDisabled')) {
                throw new Error(ERRORS.DISABLED(this.label, 'changed'));
            }

            this.inputContainer.childAt(index).simulate('keyUp', { keyCode: keyCode });
            return this;
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown() {
            this.track.simulate('mouseDown');
            return this;
        }
    }, {
        key: 'mouseOut',
        value: function mouseOut() {
            this.default.simulate('mouseLeave');
            return this;
        }
    }, {
        key: 'mouseOver',
        value: function mouseOver() {
            this.default.simulate('mouseEnter');
            return this;
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp() // not a React SyntheticEvent
        {
            this.wrapper.node.handleMouseUp();
            return this;
        }
    }, {
        key: 'setInputValue',
        value: function setInputValue(value) {
            var _this = this;

            var props = this.wrapper.props();

            if (props.isDisabled) {
                throw new Error(ERRORS.DISABLED(this.label, 'changed'));
            }

            var oldValues = toArray(props.value);
            var newValues = toArray(value);

            oldValues.forEach(function (val, i) {
                var newValue = newValues[i];
                if (Number.isFinite(newValue)) {
                    _this.change(newValues[i], i);
                }
            });

            return this;
        }
    }]);

    return SliderDriver;
}();

exports.default = SliderDriver;

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SliderGroupDriver = function () {
    function SliderGroupDriver(wrapper) {
        _classCallCheck(this, SliderGroupDriver);

        this.wrapper = wrapper;
    }

    _createClass(SliderGroupDriver, [{
        key: 'getSlider',
        value: function getSlider(index) {
            if (Array.isArray(index)) {
                var sliders = [];
                this.wrapper.find('Slider').map(function (item, i) {
                    if (index.includes(i)) {
                        sliders.push(item);
                    }
                });

                return sliders;
            }

            return this.wrapper.find('Slider').at(index);
        }
    }]);

    return SliderGroupDriver;
}();

exports.default = SliderGroupDriver;

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SorterDriver = function () {
    function SorterDriver(wrapper) {
        _classCallCheck(this, SorterDriver);

        this.wrapper = wrapper;
    }

    _createClass(SorterDriver, [{
        key: 'toggle',
        value: function toggle() {
            this.wrapper.simulate('click');
            return this;
        }
    }]);

    return SorterDriver;
}();

exports.default = SorterDriver;

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(7);

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

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERRORS = {
    CANNOT_BE_CLICKED: function CANNOT_BE_CLICKED() {
        return 'Button cannot be clicked because it is disabled';
    }
};

var TabButtonDriver = function () {
    function TabButtonDriver(wrapper) {
        _classCallCheck(this, TabButtonDriver);

        this.wrapper = wrapper;
    }

    _createClass(TabButtonDriver, [{
        key: 'click',
        value: function click() {
            if (this.wrapper.props().isDisabled) {
                throw new Error(ERRORS.CANNOT_BE_CLICKED());
            }

            return this.wrapper.simulate('click');
        }
    }]);

    return TabButtonDriver;
}();

exports.default = TabButtonDriver;

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TabsDriver = function () {
    function TabsDriver(wrapper) {
        _classCallCheck(this, TabsDriver);

        this.wrapper = wrapper;
    }

    _createClass(TabsDriver, [{
        key: 'getTabButtons',
        value: function getTabButtons() {
            return this.wrapper.find('TabButton');
        }
    }, {
        key: 'getTabButtonsByIndex',
        value: function getTabButtonsByIndex(index) {
            if (Array.isArray(index)) {
                var tabButtons = [];

                index.forEach(function (i) {
                    tabButtons.push(index[i]);
                });

                return tabButtons;
            }

            return this.wrapper.find('TabButton').at(index);
        }
    }, {
        key: 'getTabButtonsByLabel',
        value: function getTabButtonsByLabel(label) {
            return this.wrapper.findWhere(function (n) {
                return n.prop('label') === label;
            }).first();
        }
    }, {
        key: 'getTabContent',
        value: function getTabContent() {
            return this.wrapper.find('Tab').driver().getContent();
        }
    }]);

    return TabsDriver;
}();

exports.default = TabsDriver;

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagDriver = function () {
    function TagDriver(wrapper) {
        _classCallCheck(this, TagDriver);

        this.wrapper = wrapper;
    }

    _createClass(TagDriver, [{
        key: 'clickClose',
        value: function clickClose() {
            this.wrapper.find('IconButton').first().driver().click();
            return this;
        }
    }]);

    return TagDriver;
}();

exports.default = TagDriver;

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagInputDriver = function () {
    function TagInputDriver(wrapper) {
        _classCallCheck(this, TagInputDriver);

        this.wrapper = wrapper;
    }

    _createClass(TagInputDriver, [{
        key: 'clickClose',
        value: function clickClose() {
            this.wrapper.find('Tag').first().driver().clickClose();
            return this;
        }
    }, {
        key: 'mouseOut',
        value: function mouseOut() {
            this.wrapper.simulate('mouseleave');
            return this;
        }
    }, {
        key: 'mouseOver',
        value: function mouseOver() {
            this.wrapper.simulate('mouseenter');
            return this;
        }
    }]);

    return TagInputDriver;
}();

exports.default = TagInputDriver;

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WrapperDriver = function () {
    function WrapperDriver(wrapper) {
        _classCallCheck(this, WrapperDriver);

        this.wrapper = wrapper;
        this.cssMap = this.wrapper.props().cssMap;
    }

    _createClass(WrapperDriver, [{
        key: "getContent",
        value: function getContent() {
            return this.wrapper.find("." + this.cssMap.default).first().children();
        }
    }]);

    return WrapperDriver;
}();

exports.default = WrapperDriver;

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextDriver = function () {
    function TextDriver(wrapper) {
        _classCallCheck(this, TextDriver);

        this.wrapper = wrapper;
        this.cssMap = wrapper.prop('cssMap');
    }

    _createClass(TextDriver, [{
        key: 'getContent',
        value: function getContent() {
            if (this.wrapper.prop('children')) {
                return this.wrapper.find('.' + this.cssMap.default).children();
            }

            return this.wrapper.find('.' + this.cssMap.default).text();
        }
    }]);

    return TextDriver;
}();

exports.default = TextDriver;

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputComponentDriver = __webpack_require__(23);

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
            var iconWithTooltip = this.wrapper.find(_nessieUi.IconWithTooltip).first();
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

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(7);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line max-len

/**
 * This driver simulate actions on the content rather than on the tooltip
 * itself, as this is how a user would act.
 */
var TooltipDriver = function (_SimpleComponentDrive) {
    _inherits(TooltipDriver, _SimpleComponentDrive);

    function TooltipDriver(wrapper) {
        _classCallCheck(this, TooltipDriver);

        return _possibleConstructorReturn(this, (TooltipDriver.__proto__ || Object.getPrototypeOf(TooltipDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.default));
    }

    _createClass(TooltipDriver, [{
        key: 'getContent',
        value: function getContent() {
            return this.wrapper.find('.' + this.cssMap.content).children();
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

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UploaderDriver = function () {
    function UploaderDriver(wrapper) {
        _classCallCheck(this, UploaderDriver);

        this.wrapper = wrapper;
    }

    _createClass(UploaderDriver, [{
        key: 'click',
        value: function click() {
            this.wrapper.find('Button').simulate('click');
            return this;
        }
    }, {
        key: 'clickSecondary',
        value: function clickSecondary() {
            this.wrapper.find('IconButton').simulate('click');
            return this;
        }
    }]);

    return UploaderDriver;
}();

exports.default = UploaderDriver;

/***/ }),

/***/ 137:
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _clickableComponentDriver = __webpack_require__(29);

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

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WrapperDriver = exports.SimpleComponentDriver = exports.InputComponentDriver = exports.ClickableComponentDriver = undefined;

var _componentDriver = __webpack_require__(137);

var _nessieUi = __webpack_require__(14);

var _driver = __webpack_require__(57);

var _driver2 = _interopRequireDefault(_driver);

var _driver3 = __webpack_require__(58);

var _driver4 = _interopRequireDefault(_driver3);

var _driver5 = __webpack_require__(60);

var _driver6 = _interopRequireDefault(_driver5);

var _clickableComponentDriver = __webpack_require__(29);

var _clickableComponentDriver2 = _interopRequireDefault(_clickableComponentDriver);

var _driver7 = __webpack_require__(63);

var _driver8 = _interopRequireDefault(_driver7);

var _driver9 = __webpack_require__(67);

var _driver10 = _interopRequireDefault(_driver9);

var _driver11 = __webpack_require__(72);

var _driver12 = _interopRequireDefault(_driver11);

var _driver13 = __webpack_require__(74);

var _driver14 = _interopRequireDefault(_driver13);

var _driver15 = __webpack_require__(76);

var _driver16 = _interopRequireDefault(_driver15);

var _driver17 = __webpack_require__(78);

var _driver18 = _interopRequireDefault(_driver17);

var _driver19 = __webpack_require__(79);

var _driver20 = _interopRequireDefault(_driver19);

var _inputComponentDriver = __webpack_require__(23);

var _inputComponentDriver2 = _interopRequireDefault(_inputComponentDriver);

var _driver21 = __webpack_require__(81);

var _driver22 = _interopRequireDefault(_driver21);

var _driver23 = __webpack_require__(83);

var _driver24 = _interopRequireDefault(_driver23);

var _driver25 = __webpack_require__(86);

var _driver26 = _interopRequireDefault(_driver25);

var _driver27 = __webpack_require__(89);

var _driver28 = _interopRequireDefault(_driver27);

var _driver29 = __webpack_require__(96);

var _driver30 = _interopRequireDefault(_driver29);

var _driver31 = __webpack_require__(98);

var _driver32 = _interopRequireDefault(_driver31);

var _driver33 = __webpack_require__(104);

var _driver34 = _interopRequireDefault(_driver33);

var _driver35 = __webpack_require__(106);

var _driver36 = _interopRequireDefault(_driver35);

var _simpleComponentDriver = __webpack_require__(7);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

var _driver37 = __webpack_require__(108);

var _driver38 = _interopRequireDefault(_driver37);

var _driver39 = __webpack_require__(109);

var _driver40 = _interopRequireDefault(_driver39);

var _driver41 = __webpack_require__(111);

var _driver42 = _interopRequireDefault(_driver41);

var _driver43 = __webpack_require__(114);

var _driver44 = _interopRequireDefault(_driver43);

var _driver45 = __webpack_require__(117);

var _driver46 = _interopRequireDefault(_driver45);

var _driver47 = __webpack_require__(119);

var _driver48 = _interopRequireDefault(_driver47);

var _driver49 = __webpack_require__(121);

var _driver50 = _interopRequireDefault(_driver49);

var _driver51 = __webpack_require__(123);

var _driver52 = _interopRequireDefault(_driver51);

var _driver53 = __webpack_require__(127);

var _driver54 = _interopRequireDefault(_driver53);

var _driver55 = __webpack_require__(131);

var _driver56 = _interopRequireDefault(_driver55);

var _driver57 = __webpack_require__(132);

var _driver58 = _interopRequireDefault(_driver57);

var _driver59 = __webpack_require__(133);

var _driver60 = _interopRequireDefault(_driver59);

var _wrapperDriver = __webpack_require__(125);

var _wrapperDriver2 = _interopRequireDefault(_wrapperDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drivers = [{
    Component: _nessieUi.Button,
    Driver: _driver2.default
}, {
    Component: _nessieUi.CheckableGroup,
    Driver: _driver4.default
}, {
    Component: _nessieUi.Checkbox,
    Driver: _driver6.default
}, {
    Component: _nessieUi.CheckboxGroup,
    Driver: _driver4.default
}, {
    Component: _nessieUi.CodeEditor,
    Driver: _driver8.default
}, {
    Component: _nessieUi.Column,
    Driver: _driver16.default
}, {
    Component: _nessieUi.DateTimeInput,
    Driver: _driver10.default
}, {
    Component: _nessieUi.DragNDrop,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.Fieldset,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.FlounderDropdown,
    Driver: _driver12.default
}, {
    Component: _nessieUi.Form,
    Driver: _driver14.default
}, {
    Component: _nessieUi.Grid,
    Driver: _driver16.default
}, {
    Component: _nessieUi.H1,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.H2,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.H3,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.H4,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.Icon,
    Driver: _driver18.default
}, {
    Component: _nessieUi.IconButton,
    Driver: _driver2.default
}, {
    Component: _nessieUi.IconWithTooltip,
    Driver: _driver20.default
}, {
    Component: _nessieUi.InputField,
    Driver: _inputComponentDriver2.default
}, {
    Component: _nessieUi.Label,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.MessageBox,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.ModalDialog,
    Driver: _driver22.default
}, {
    Component: _nessieUi.Module,
    Driver: _driver24.default
}, {
    Component: _nessieUi.NavBar,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.NavDropdown,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.NavItem,
    Driver: _driver26.default
}, {
    Component: _nessieUi.NavList,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.NotificationBar,
    Driver: _driver28.default
}, {
    Component: _nessieUi.Page,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.PageContent,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.PageContentHeader,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.PageFooter,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.PageHeader,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.Paginator,
    Driver: _driver30.default
}, {
    Component: _nessieUi.PasswordInput,
    Driver: _driver32.default
}, {
    Component: _nessieUi.Radio,
    Driver: _driver6.default
}, {
    Component: _nessieUi.RadioGroup,
    Driver: _driver4.default
}, {
    Component: _nessieUi.Required,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.Row,
    Driver: _driver16.default
}, {
    Component: _nessieUi.ScrollBox,
    Driver: _driver34.default
}, {
    Component: _nessieUi.Section,
    Driver: _driver36.default
}, {
    Component: _nessieUi.Slider,
    Driver: _driver38.default
}, {
    Component: _nessieUi.SliderGroup,
    Driver: _driver40.default
}, {
    Component: _nessieUi.Sorter,
    Driver: _driver42.default
}, {
    Component: _nessieUi.StatusIndicator,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.Switch,
    Driver: _driver44.default
}, {
    Component: _nessieUi.Tab,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.TabButton,
    Driver: _driver46.default
}, {
    Component: _nessieUi.Tabs,
    Driver: _driver48.default
}, {
    Component: _nessieUi.Table,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.TableCell,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.TableRow,
    Driver: _wrapperDriver2.default
}, {
    Component: _nessieUi.Tag,
    Driver: _driver50.default
}, {
    Component: _nessieUi.TagInput,
    Driver: _driver52.default
}, {
    Component: _nessieUi.Text,
    Driver: _driver54.default
}, {
    Component: _nessieUi.TextArea,
    Driver: _inputComponentDriver2.default
}, {
    Component: _nessieUi.TextInput,
    Driver: _inputComponentDriver2.default
}, {
    Component: _nessieUi.TextInputWithDropdown,
    Driver: _inputComponentDriver2.default
}, {
    Component: _nessieUi.TextInputWithIcon,
    Driver: _driver56.default
}, {
    Component: _nessieUi.Tooltip,
    Driver: _driver58.default
}, {
    Component: _nessieUi.Uploader,
    Driver: _driver60.default
}, {
    Component: _nessieUi.ValuedTextInput,
    Driver: _inputComponentDriver2.default
}];

exports.ClickableComponentDriver = _clickableComponentDriver2.default;
exports.InputComponentDriver = _inputComponentDriver2.default;
exports.SimpleComponentDriver = _simpleComponentDriver2.default;
exports.WrapperDriver = _wrapperDriver2.default;
exports.default = _componentDriver.ComponentDriver.createDriverSuite(drivers);

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(7);

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

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _clickableComponentDriver = __webpack_require__(29);

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

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckableGroupDriver = function () {
    function CheckableGroupDriver(wrapper) {
        _classCallCheck(this, CheckableGroupDriver);

        this.wrapper = wrapper;
    }

    _createClass(CheckableGroupDriver, [{
        key: 'getContent',
        value: function getContent() {
            var items = this.wrapper.find('li');
            return items.map(function (item) {
                return item.childAt(0);
            });
        }
    }, {
        key: 'selectByIndex',
        value: function selectByIndex(index) {
            var items = this.getContent();

            if (Array.isArray(index)) {
                index.forEach(function (i) {
                    items[i].driver().setChecked();
                });
            } else {
                items[index].driver().setChecked();
            }

            return this;
        }
    }, {
        key: 'selectByValue',
        value: function selectByValue(value) {
            var _this = this;

            if (Array.isArray(value)) {
                value.forEach(function (i) {
                    var item = _this.wrapper.findWhere(function (n) {
                        return n.prop('value') === i;
                    }).first();
                    item.driver().setChecked();
                });
            } else {
                var item = this.wrapper.findWhere(function (n) {
                    return n.prop('value') === value;
                }).first();
                item.driver().setChecked();
            }

            return this;
        }
    }, {
        key: 'getSelectedValues',
        value: function getSelectedValues() {
            var items = this.wrapper.findWhere(function (n) {
                return n.node.checked === true;
            });

            return items.map(function (item) {
                return item.prop('value');
            });
        }
    }, {
        key: 'mouseOver',
        value: function mouseOver() {
            this.wrapper.simulate('mouseenter');
            return this;
        }
    }, {
        key: 'mouseOut',
        value: function mouseOut() {
            this.wrapper.simulate('mouseleave');
            return this;
        }
    }]);

    return CheckableGroupDriver;
}();

exports.default = CheckableGroupDriver;

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputComponentDriver = __webpack_require__(23);

var _inputComponentDriver2 = _interopRequireDefault(_inputComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxDriver = function (_InputComponentDriver) {
    _inherits(CheckboxDriver, _InputComponentDriver);

    function CheckboxDriver(wrapper) {
        _classCallCheck(this, CheckboxDriver);

        var _this = _possibleConstructorReturn(this, (CheckboxDriver.__proto__ || Object.getPrototypeOf(CheckboxDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.input));

        _this.outer = wrapper.find('.' + wrapper.props().cssMap.default);
        return _this;
    }

    _createClass(CheckboxDriver, [{
        key: 'setChecked',
        value: function setChecked() {
            this.control.node.checked = true;
            var value = this.control.node.value;
            this.control.simulate('change', { target: { checked: true, value: value } });
            return this;
        }
    }, {
        key: 'setUnchecked',
        value: function setUnchecked() {
            this.control.node.checked = false;
            var value = this.control.node.value;
            this.control.simulate('change', { target: { checked: false, value: value } });
            return this;
        }
    }, {
        key: 'toggleChecked',
        value: function toggleChecked() {
            var status = this.getChecked();
            var value = this.control.node.value;
            this.control.node.checked = !status;
            this.control.simulate('change', { target: { checked: !status, value: value } });
            return this;
        }
    }, {
        key: 'getChecked',
        value: function getChecked() {
            return this.control.getNode().checked;
        }
    }, {
        key: 'mouseOver',
        value: function mouseOver() {
            this.outer.simulate('mouseenter');
            return this;
        }
    }, {
        key: 'mouseOut',
        value: function mouseOut() {
            this.outer.simulate('mouseleave');
            return this;
        }
    }]);

    return CheckboxDriver;
}(_inputComponentDriver2.default);

exports.default = CheckboxDriver;

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERRORS = {
    EDITOR_READ_ONLY: 'Cannot change the CodeEditor value since it is read-only' // eslint-disable-line max-len
};

var CodeEditorDriver = function () {
    function CodeEditorDriver(wrapper) {
        _classCallCheck(this, CodeEditorDriver);

        // Nessie Control
        this.wrapper = wrapper;
        // the 3rd party control
        this.control = wrapper.node.codeMirror;
    }

    _createClass(CodeEditorDriver, [{
        key: 'focus',
        value: function focus() {
            this.control.focus();
            return this;
        }
    }, {
        key: 'blur',
        value: function blur() {
            /* eslint-disable no-undef */
            if (this.control.hasFocus() && Boolean(document) && Boolean(document.activeElement)) {
                document.activeElement.blur();
            }
            /* eslint-enable no-undef */
            return this;
        }
    }, {
        key: 'setInputValue',
        value: function setInputValue(value) {
            if (this.isReadOnly()) {
                throw new Error(ERRORS.EDITOR_READ_ONLY);
            }

            this.focus();
            this.control.setValue(value);
            this.blur();
            return this;
        }
    }, {
        key: 'clearInputValue',
        value: function clearInputValue() {
            return this.setInputValue('');
        }
    }, {
        key: 'getInputValue',
        value: function getInputValue() {
            return this.control.getValue();
        }
    }, {
        key: 'isReadOnly',
        value: function isReadOnly() {
            return Boolean(this.control.options.readOnly) && !this.isDisabled();
        }
    }, {
        key: 'isDisabled',
        value: function isDisabled() {
            return this.control.options.readOnly === 'nocursor';
        }
    }]);

    return CodeEditorDriver;
}();

exports.default = CodeEditorDriver;

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateTimeInputDriver = function () {
    function DateTimeInputDriver(wrapper) {
        _classCallCheck(this, DateTimeInputDriver);

        this.wrapper = wrapper;
        this.cssMap = wrapper.props().cssMap;
        this.mainInput = wrapper.find('input').at(0);
        this.hourInput = wrapper.find('input').at(1);
        this.minuteInput = wrapper.find('input').at(2);
        this.calendar = wrapper.find('table button');
        this.prev = wrapper.find('button').at(1);
        this.next = wrapper.find('button').at(2);
    }

    _createClass(DateTimeInputDriver, [{
        key: 'getMainInputValue',
        value: function getMainInputValue() {
            return this.mainInput.node.value;
        }
    }, {
        key: 'setMainInputValue',
        value: function setMainInputValue(value) {
            var newValue = value == null ? '' : String(value);

            this.mainInput.node.value = value;
            this.mainInput.simulate('change', { target: { value: newValue } });

            return this;
        }
    }, {
        key: 'blurMainInput',
        value: function blurMainInput() {
            this.mainInput.simulate('blur');
            return this;
        }
    }, {
        key: 'focusMainInput',
        value: function focusMainInput() {
            this.mainInput.simulate('focus');
            return this;
        }
    }, {
        key: 'getHourInputValue',
        value: function getHourInputValue() {
            return this.hourInput.node.value;
        }
    }, {
        key: 'setHourInputValue',
        value: function setHourInputValue(value) {
            var newValue = value == null ? '' : String(value);

            this.hourInput.node.value = value;
            this.hourInput.simulate('change', { target: { value: newValue } });

            return this;
        }
    }, {
        key: 'blurHourInput',
        value: function blurHourInput() {
            this.hourInput.simulate('blur');
            return this;
        }
    }, {
        key: 'focusHourInput',
        value: function focusHourInput() {
            this.hourInput.simulate('focus');
            return this;
        }
    }, {
        key: 'getMinuteInputValue',
        value: function getMinuteInputValue() {
            return this.minuteInput.node.value;
        }
    }, {
        key: 'setMinuteInputValue',
        value: function setMinuteInputValue(value) {
            var newValue = value == null ? '' : String(value);

            this.minuteInput.node.value = value;
            this.minuteInput.simulate('change', { target: { value: newValue } });

            return this;
        }
    }, {
        key: 'blurMinuteInput',
        value: function blurMinuteInput() {
            this.minuteInput.simulate('blur');
            return this;
        }
    }, {
        key: 'focusMinuteInput',
        value: function focusMinuteInput() {
            this.minuteInput.simulate('focus');
            return this;
        }
    }, {
        key: 'clickCellByIndex',
        value: function clickCellByIndex(index) {
            var day = this.calendar.at(index);
            day.simulate('click');
            return this;
        }
    }, {
        key: 'clickCellByValue',
        value: function clickCellByValue(value) {
            var day = this.calendar.findWhere(function (n) {
                return n.prop('value') === value;
            }).first();
            day.simulate('click');
            return this;
        }
    }, {
        key: 'clickPrev',
        value: function clickPrev() {
            this.prev.simulate('click');
            return this;
        }
    }, {
        key: 'clickNext',
        value: function clickNext() {
            this.next.simulate('click');
            return this;
        }
    }]);

    return DateTimeInputDriver;
}();

exports.default = DateTimeInputDriver;

/***/ }),

/***/ 7:
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
            this.control.simulate('mouseenter');
            return this;
        }
    }, {
        key: 'mouseOut',
        value: function mouseOut() {
            this.control.simulate('mouseleave');
            return this;
        }
    }]);

    return SimpleComponentDriver;
}();

exports.default = SimpleComponentDriver;

/***/ }),

/***/ 72:
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

/***/ 74:
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

/***/ 76:
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

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _simpleComponentDriver = __webpack_require__(7);

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

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(7);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconWithTooltipDriver = function (_SimpleComponentDrive) {
    _inherits(IconWithTooltipDriver, _SimpleComponentDrive);

    function IconWithTooltipDriver(wrapper) {
        _classCallCheck(this, IconWithTooltipDriver);

        var _this = _possibleConstructorReturn(this, (IconWithTooltipDriver.__proto__ || Object.getPrototypeOf(IconWithTooltipDriver)).call(this, wrapper, '.' + wrapper.prop('cssMap').default));

        _this.tooltip = wrapper.find('IconWithTooltip > Tooltip').first();
        return _this;
    }

    _createClass(IconWithTooltipDriver, [{
        key: 'mouseOverIcon',
        value: function mouseOverIcon() {
            this.tooltip.driver().mouseOver();
            return this;
        }
    }, {
        key: 'mouseOutIcon',
        value: function mouseOutIcon() {
            this.tooltip.driver().mouseOut();
            return this;
        }
    }, {
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

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nessieUi = __webpack_require__(14);

var _simpleComponentDriver = __webpack_require__(7);

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

/***/ 83:
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

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nessieUi = __webpack_require__(14);

var _simpleComponentDriver = __webpack_require__(7);

var _simpleComponentDriver2 = _interopRequireDefault(_simpleComponentDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavItemDriver = function (_SimpleComponentDrive) {
    _inherits(NavItemDriver, _SimpleComponentDrive);

    function NavItemDriver(wrapper) {
        _classCallCheck(this, NavItemDriver);

        return _possibleConstructorReturn(this, (NavItemDriver.__proto__ || Object.getPrototypeOf(NavItemDriver)).call(this, wrapper, '.' + wrapper.props().cssMap.default));
    }

    _createClass(NavItemDriver, [{
        key: 'click',
        value: function click() {
            return this.wrapper.find('.' + this.cssMap.link).first().simulate('click');
        }
    }, {
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
}(_simpleComponentDriver2.default);

exports.default = NavItemDriver;

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleComponentDriver = __webpack_require__(7);

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

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaginatorDriver = function () {
    function PaginatorDriver(wrapper) {
        _classCallCheck(this, PaginatorDriver);

        this.wrapper = wrapper;
        this.cssMap = this.wrapper.props().cssMap;
    }

    _createClass(PaginatorDriver, [{
        key: 'clickPrev',
        value: function clickPrev() {
            this.wrapper.find('.' + this.cssMap.arrows).first().simulate('click');
            return this;
        }
    }, {
        key: 'clickNext',
        value: function clickNext() {
            this.wrapper.find('.' + this.cssMap.arrows).last().simulate('click');
            return this;
        }
    }, {
        key: 'clickPage',
        value: function clickPage(i) {
            this.wrapper.find('.' + this.cssMap.pageButton).at(i).simulate('click');
            return this;
        }
    }]);

    return PaginatorDriver;
}();

exports.default = PaginatorDriver;

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nessieUi = __webpack_require__(14);

var _inputComponentDriver = __webpack_require__(23);

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