/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { useThemeClasses } from "../utils";

import { Icon } from "..";

const componentName = "Spinner";

const Spinner = forwardRef((props, ref) => {
  const { size, style } = props;

  const cssMap = useThemeClasses(componentName, props);

  return (
    <Icon
      className={cssMap.main}
      ref={ref}
      size={size}
      style={style}
      type="loading"
    />
  );
});

Spinner.propTypes = {
  /**
   *  Size of the Spinner
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Size of the Spinner
   */
  size: PropTypes.oneOf(["S", "M", "L", "XL"]),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

Spinner.defaultProps = {
  cssMap: undefined,
  size: "M",
  style: undefined
};

Spinner.displayName = componentName;

export default Spinner;
