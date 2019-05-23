/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## addPrefix
 * Adds a prefix to a string or array of strings
 *
 * @param   {String|Array}  str     string or array to add the prefix to
 * @param   {String}        prefix  prefix to add
 *
 * @return  {String}
 *
 */
function addPrefix(str, prefix) {
  if (Array.isArray(str)) {
    return str.map(s => addPrefix(s, prefix));
  }

  return str && prefix ? `${prefix}-${str}` : str;
}

/**
 * ## prefixOptions
 * Adds prefixes to all option id’s
 *
 * @param   {Array}     options     option objects
 * @param   {String}    [prefix]    prefix to add to id’s
 *
 * @return  {Array}
 *
 */
function prefixOptions(options = [], prefix) {
  return options.map((option = {}) => {
    if (option.header) {
      const { options: groupOptions } = option;

      return {
        ...option,
        options: prefixOptions(groupOptions, prefix)
      };
    }

    return {
      ...option,
      id: addPrefix(option.id, prefix)
    };
  });
}

/**
 * ## removePrefix
 * Removes a prefix from a string
 *
 * @param   {String}    str     string to remove the prefix from
 * @param   {String}    prefix  prefix to remove
 *
 * @return  {String}
 *
 */
function removePrefix(str, prefix) {
  return str && prefix ? str.replace(`${prefix}-`, "") : str;
}

export { addPrefix, prefixOptions, removePrefix };
