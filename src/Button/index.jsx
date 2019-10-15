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

import { Icon, Spinner } from "..";

import { attachEvents, useThemeClasses } from "../utils";

const componentName = "Button";

const Button = forwardRef((props, ref) => {
  const {
    children,
    iconType,
    id,
    isDisabled,
    isLoading,
    label,
    style,
    type
  } = props;

  const cssMap = useThemeClasses(componentName, props);
  return (
    <button
      {...attachEvents(props)}
      className={cssMap.main}
      disabled={isDisabled}
      id={id}
      ref={ref}
      style={style}
      type={type || "button"}
    >
      <div className={cssMap.content}>
        {iconType && iconType !== "none" && (
          <Icon className={cssMap.icon} size="S" type={iconType} />
        )}
        <div className={cssMap.label}>{children || label}</div>
      </div>
      {isLoading && !isDisabled && (
        <div className={cssMap.loadingOverlay}>
          <Spinner className={cssMap.spinner} size="S" />
        </div>
      )}
    </button>
  );
});

Button.displayName = componentName;

Button.propTypes = {
  /**
   *  Label text (React node; overrides label prop)
   */
  children: PropTypes.node,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Icon position relative to label
   */
  iconPosition: PropTypes.oneOf(["left", "right"]),
  /**
   *  Icon type to display (see https://feathericons.com/)
   */
  iconType: PropTypes.string,
  /**
   * Component identifier
   */
  id: PropTypes.string,
  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  Display as loading
   */
  isLoading: PropTypes.bool,
  /**
   *  Label text
   */
  label: PropTypes.string,
  /**
   *  click callback function: ( { id } ) => ...
   */
  onClick: PropTypes.func,
  /**
   *  mouse out callback function: ( { id } ) => ...
   */
  onMouseOut: PropTypes.func,
  /**
   *  mouse over callback function: ( { id } ) => ...
   */
  onMouseOver: PropTypes.func,
  /**
   *  Role/style
   */
  role: PropTypes.oneOf(["primary", "success", "danger", "info"]),
  /**
   *  Variant
   */
  variant: PropTypes.oneOf(["filled", "outlined", "clear", "icon"]),
  /**
   *  Variant
   */
  size: PropTypes.oneOf(["S", "L"]),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string),
  /**
   *  Button type
   */
  type: PropTypes.objectOf(PropTypes.string)
};

Button.defaultProps = {
  children: undefined,
  cssMap: undefined,
  iconPosition: "left",
  iconType: "none",
  id: undefined,
  isDisabled: false,
  isLoading: false,
  label: undefined,
  onClick: undefined,
  onMouseOut: undefined,
  onMouseOver: undefined,
  role: "primary",
  variant: "filled",
  size: undefined,
  style: undefined,
  type: undefined
};

export default Button;
