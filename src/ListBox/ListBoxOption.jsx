/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { Icon, Text } from "..";

import { attachEvents, mapAria, useId, useThemeClasses } from "../utils";

const componentName = "ListBoxOption";

const ListBoxOption = forwardRef((props, ref) => {
  const {
    aria,
    children,
    description,
    iconSize,
    iconType,
    isSelected,
    style,
    text,
    value
  } = props;

  const cssMap = useThemeClasses(componentName, props);
  const id = useId(componentName, props);

  let label;

  if (children) {
    label = children;
  } else {
    label = typeof text !== "undefined" ? text : value;
    label = String(label);
  }

  label =
    typeof label === "string" ? (
      <Text className={cssMap.optionText} noWrap overflowIsHidden>
        {label}
      </Text>
    ) : (
      label
    );

  return (
    <li
      {...attachEvents(props, {
        onClick: { id },
        onMouseOut: { id },
        onMouseOver: { id }
      })}
      {...mapAria({
        ...aria,
        role: "option",
        selected: isSelected
      })}
      className={cssMap.main}
      id={id}
      ref={ref}
      style={style}
    >
      {iconType && iconType !== "none" && (
        <Icon
          className={cssMap.icon}
          size={iconSize || "S"}
          type={iconType}
          variant="stroke"
        />
      )}
      <div className={cssMap.textContainer}>
        {label}
        {description && (
          <Text className={cssMap.description} overflowIsHidden>
            {description}
          </Text>
        )}
      </div>
    </li>
  );
});

ListBoxOption.propTypes = {
  aria: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node,
  className: PropTypes.string,
  cssMap: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.string,
  iconSize: PropTypes.oneOf(["S", "M", "L", "XL", "XXL"]),
  iconType: PropTypes.string,
  id: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.string,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

ListBoxOption.defaultProps = {
  aria: undefined,
  children: undefined,
  className: undefined,
  cssMap: undefined,
  description: undefined,
  iconSize: undefined,
  iconType: "none",
  id: undefined,
  isActive: false,
  isDisabled: false,
  isSelected: false,
  onClick: undefined,
  onMouseOut: undefined,
  onMouseOver: undefined,
  style: undefined,
  text: undefined,
  value: undefined
};

ListBoxOption.displayName = componentName;

export default ListBoxOption;
