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

import { handleAllEvents, useThemeClasses } from "../utils";

const componentName = "Icon";

const Icon = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);
  const { children, label, style, type, ...restProps } = props;

  return (
    <svg
      {...handleAllEvents(restProps)}
      aria-label={children || label}
      className={cssMap.main}
      ref={ref}
      style={style}
    >
      {type !== "none" && <use xlinkHref={`#nessie-${type}`} />}
    </svg>
  );
});

Icon.propTypes = {
  /**
   * Icon label (overrides label prop)
   */
  children: PropTypes.string,
  /**
   *  CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   * Icon label
   */
  label: PropTypes.string,
  /**
   *  Icon role
   */
  role: PropTypes.oneOf(["default", "critical", "promoted", "warning"]),
  /**
   *  Icon size
   */
  size: PropTypes.oneOf(["S", "M", "L", "XL"]),
  /**
   *  Icon to show (see https://feathericons.com/)
   */
  type: PropTypes.string,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

Icon.defaultProps = {
  children: undefined,
  className: undefined,
  cssMap: undefined,
  label: undefined,
  role: "default",
  size: "S",
  style: undefined,
  type: "none"
};

Icon.displayName = componentName;

export default Icon;
