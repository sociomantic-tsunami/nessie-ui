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

import { Text } from "..";

import { handleAllEvents, useThemeClasses } from "../utils";

const componentName = "DatePickerItem";

const DatePickerItem = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);
  const {
    children,
    isDisabled,
    isSelected,
    label,
    style,
    value,
    ...restProps
  } = props;

  return (
    <button
      {...handleAllEvents(restProps)}
      aria-pressed={isSelected}
      className={cssMap.main}
      disabled={isDisabled}
      ref={ref}
      style={style}
      type="button"
    >
      <Text className={cssMap.text}>{children || label}</Text>
    </button>
  );
});

DatePickerItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssMap: PropTypes.objectOf(PropTypes.string),
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["day", "month"]),
  value: PropTypes.string,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

DatePickerItem.defaultProps = {
  children: undefined,
  className: undefined,
  cssMap: undefined,
  isDisabled: false,
  isSelected: false,
  label: undefined,
  onClick: undefined,
  style: undefined,
  type: "day",
  value: undefined
};

DatePickerItem.displayName = componentName;

export default DatePickerItem;
