/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { useContext } from "react";
import ThemeContext from "../Theming/ThemeContext";
import PropTypes from "prop-types";

const SpriteMap = ({ id = "nessie" }) => {
  const iconsObject = useContext(ThemeContext).icons;
  return (
    <svg display="none" height="0" width="0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {Object.keys(iconsObject).map((key, index) => (
          <symbol
            dangerouslySetInnerHTML={{ __html: iconsObject[key] }}
            id={`${id}-${key}`}
            key={key}
            viewBox="0 0 24 24"
          />
        ))}
      </defs>
    </svg>
  );
};

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
