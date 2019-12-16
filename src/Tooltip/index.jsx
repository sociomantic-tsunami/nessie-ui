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

import { IconButton, Text } from "..";

import { attachEvents, useThemeClasses } from "../utils";

const componentName = "Tooltip";

const Tooltip = forwardRef((props, ref) => {
  const { children, id, isDismissible, message, onClickClose, style } = props;

  const cssMap = useThemeClasses(componentName, props);

  return (
    <div
      {...attachEvents(props)}
      className={cssMap.main}
      id={id}
      ref={ref}
      role="tooltip"
      style={style}
    >
      <div className={cssMap.message}>
        {children ||
          (typeof message === "string" ? <Text>{message}</Text> : message)}
      </div>
      {isDismissible && (
        <IconButton
          className={cssMap.close}
          iconSize="S"
          iconTheme="button"
          iconType="x"
          label="Close"
          onClick={onClickClose}
          role="inverted"
        />
      )}
    </div>
  );
});

Tooltip.propTypes = {
  /**
   *  Position of the tooltip’s arrow
   */
  arrowPosition: PropTypes.oneOf([
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "right",
    "right-start",
    "right-end"
  ]),
  /**
   *  Tooltip message (JSX node; overrides message prop)
   */
  children: PropTypes.node,
  /**
   * Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   * Component id
   */
  id: PropTypes.string,
  /**
   *  Display the tooltip as user dismissible
   */
  isDismissible: PropTypes.bool,
  /**
   *  Tooltip message (string)
   */
  message: PropTypes.string,
  /**
   *  Function to call on “Close” button click: ( e ) => { ... }
   */
  onClickClose: PropTypes.func,
  /**
   *  onMouseOver callback function: ( e ) => { ... }
   */
  onMouseOver: PropTypes.func,
  /**
   *  onMouseOut callback function: ( e ) => { ... }
   */
  onMouseOut: PropTypes.func,
  /**
   *  Tooltip role/style
   */
  role: PropTypes.oneOf(["default", "critical", "promoted", "warning"]),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

Tooltip.defaultProps = {
  arrowPosition: "bottom",
  children: undefined,
  className: undefined,
  cssMap: undefined,
  id: undefined,
  isDismissible: undefined,
  message: undefined,
  onClickClose: undefined,
  onMouseOut: undefined,
  onMouseOver: undefined,
  role: "default",
  style: undefined
};

Tooltip.displayName = componentName;

export default Tooltip;
