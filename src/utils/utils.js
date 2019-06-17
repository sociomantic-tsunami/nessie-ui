/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import eventsList from "./eventsList";

export function callAll(...callbacks) {
  return function handler(...args) {
    callbacks.forEach(cb => typeof cb === "function" && cb(...args));
  };
}

/**
 * callWithValue( ...callbacks )
 *
 * Creates an onChange handler that calls one or more callbacks with the changed
 * value.
 *
 * @param   {...[Function]} callbacks event callbacks
 *
 * @return  {Function}      event handler
 */
export function callWithValue(...callbacks) {
  return function handler({ target: { type, value, checked } }) {
    const newValue = ["checkbox", "radio"].includes(type) ? checked : value;
    callbacks.forEach(cb => typeof cb === "function" && cb(newValue));
  };
}

export const generateId = componentName =>
  `${componentName}${Math.floor(Math.random() * 9e15 + 1e15)}`;

/**
 * handleAllEvents( props )
 *
 * Handles all events, filters out the rest
 *
 * @param   {Object}    props   componenet props
 *
 * @return  {Object}    event handlers
 */
export function handleAllEvents(props) {
  return Object.entries(props).reduce((result, [propName, propValue]) => {
    if (eventsList.includes(propName)) {
      result[propName] = propValue;
    }
    return result;
  }, {});
}

export function mapAria(ariaObj = {}) {
  const res = { role: ariaObj.role };

  Object.keys(ariaObj).forEach(key => {
    const value = ariaObj[key];
    if (key !== "role" && value) {
      res[`aria-${key.toLowerCase()}`] = ariaObj[key].toString();
    }
  });

  return res;
}
