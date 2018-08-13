module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ComponentDriver=void 0;var n=i(t(1)),o=i(t(0));function i(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}r.default=o,r.ComponentDriver=n},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.extendEnzyme=function(e){e.ReactWrapper.prototype.driver=function(){if(0===this.length)throw new Error(o.BAD_DRIVER_NODE_COUNT({count:this.length}));var e=this.type(),r=n.get(e);if(!r)throw new Error(o.NO_DRIVER_FOUND({name:e.name}));return new r(this)},e.ShallowWrapper.prototype.driver=function(){throw new Error(o.SHALLOW_NOT_SUPPORTED)}},r.createDriverSuite=function(e){for(var r=arguments.length,t=Array(r>1?r-1:0),i=1;i<r;i++)t[i-1]=arguments[i];return{provideDrivers:function(){t.forEach(function(e){return e.provideDrivers()}),function(e){e.forEach(function(e){var r=e.Component,t=e.Driver;if("function"!=typeof r)throw new Error(o.BAD_SUITE_COMPONENT);if("function"!=typeof t)throw new Error(o.BAD_SUITE_DRIVER);n.set(r,t)})}(e)}}};var n=new WeakMap,o={BAD_DRIVER_NODE_COUNT:function(e){return"ReactWrapper::driver() requires the wrapper to contain exactly one node, but the wrapper contains "+e.count+" nodes"},SHALLOW_NOT_SUPPORTED:"ShallowWrapper::driver() is not supported.",NO_DRIVER_FOUND:function(e){return"Could not find driver for Component "+e.name},BAD_SUITE_COMPONENT:'Invalid driver suite specification; expect "Component" to be a function.',BAD_SUITE_DRIVER:'Invalid driver suite specification; expect "Driver" to be a function.'}}]);
//# sourceMappingURL=componentDriver.js.map