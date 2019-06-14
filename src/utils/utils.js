/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import eventsList from "./eventsList";

/**
 * callMultiple( props )
 *
 * A temporary helper function that callls multiple callbacks, one after
 * the other.
 *
 * @return  {Function}    event handler
 */
function callMultiple(...callbacks) {
  return function eventHandler(...args) {
    callbacks.forEach(cb => typeof cb === "function" && cb(...args));
  };
}

/**
 * handleAllEvents( props )
 *
 * Returns a set of Nessie standardized event handlers based on props provided
 *
 * @param   {Object}    props   component props
 *
 * @return  {Object}    event handlers
 */
function handleAllEvents(props) {
  return Object.entries(props).reduce((result, [propName, propValue]) => {
    if (eventsList.includes(propName)) {
      result[propName] = createEventHandler(propValue);
    }
    return result;
  }, {});
}

const buildDisplayName = (WrapperComponent, WrappedComponent) => {
  const wrapperComponentName = getComponentName(WrapperComponent);
  const wrappedComponentName = getComponentName(WrappedComponent);

  return `${wrapperComponentName}(${wrappedComponentName})`;
};

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * createEventHandler( func, payload )
 *
 * Creates an function that invokes an event handler with a payload object.
 *  - Change events have the changed value as payloadt
 *  - Scroll events have the updated scroll position as payload
 *  - Mouse and focus events only fire when entering or leaving the current
 *    target; not when moving between descendent elements.
 *  - Stops propagation of all handled events
 *
 * @param   {Function}  func  consumer event handler
 *
 * @return  {Function}
 */
function createEventHandler(func) {
  if (typeof func !== "function") {
    return;
  }

  // construct standardized payload for consumer’s handler...
  return function eventHandler(e) {
    const { currentTarget, relatedTarget, type } = e;

    if (
      ["blur", "focus", "mouseout", "mouseover"].includes(type) &&
      currentTarget.contains(relatedTarget)
    ) {
      return; // don't fire when mouse/focus moves between descendants
    }

    // invoke consumer’s event handler
    func(...arguments);
  };
}

const getComponentName = Comp => Comp.displayName || Comp.name || "Component";

const generateId = componentName =>
  `${componentName}${Math.floor(Math.random() * 9e15 + 1e15)}`;

const killFocus = e => e.preventDefault();

const mapAria = (ariaObj = {}) => {
  const res = { role: ariaObj.role };

  Object.keys(ariaObj).forEach(key => {
    const value = ariaObj[key];
    if (key !== "role" && value) {
      res[`aria-${key.toLowerCase()}`] = ariaObj[key].toString();
    }
  });

  return res;
};

export {
  handleAllEvents,
  buildDisplayName,
  callMultiple,
  clamp,
  createEventHandler,
  generateId,
  killFocus,
  mapAria
};

export default {
  handleAllEvents,
  buildDisplayName,
  callMultiple,
  clamp,
  createEventHandler,
  generateId,
  killFocus,
  mapAria
};
