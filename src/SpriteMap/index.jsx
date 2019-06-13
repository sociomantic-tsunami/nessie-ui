/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { icons } from "feather-icons";

const SpriteMap = ({ id = "nessie" }) => (
  <svg display="none" height="0" width="0" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {Object.values(icons).map(({ name, contents }) => (
        <symbol
          dangerouslySetInnerHTML={{ __html: contents }}
          id={`${id}-${name}`}
          key={name}
          viewBox="0 0 24 24"
        />
      ))}
    </defs>
  </svg>
);

SpriteMap.propTypes = {
  /**
   *  Component id
   */
  id: PropTypes.string
};

SpriteMap.defaultProps = {
  id: undefined
};

SpriteMap.displayName = "SpriteMap";

export default SpriteMap;
