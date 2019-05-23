/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React from "react";

import { Tag } from "../index";

/**
 * ## buildTagsFromValues
 * Builds an array of Tags components from an array of values
 *
 * @param   {Array.<String>|Array.<Object>} values  array of values
 *
 * @return  {Array.<ReactElement>}
 *
 */
function buildTagsFromValues(values = []) {
  return values.map(value => {
    const props =
      typeof value === "object"
        ? value
        : {
            id: value,
            label: value,
            key: value,
            value
          };

    return <Tag {...props} />;
  });
}

export { buildTagsFromValues };
