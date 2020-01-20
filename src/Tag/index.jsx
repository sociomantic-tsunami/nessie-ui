/*
 * Copyright (c) 2017-2020 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { Icon, Text } from "..";

import { useThemeClasses } from "../utils";

const Tag = forwardRef((props, ref) => {
  const { children, isDisabled, label, onClickDelete, style, value } = props;

  const cssMap = useThemeClasses(Tag.displayName, props);

  return (
    <div className={cssMap.main} ref={ref} style={style}>
      <Text className={cssMap.value} overflowIsHidden>
        {children || label || value}
      </Text>
      <button
        className={cssMap.delete}
        disabled={isDisabled}
        onClick={onClickDelete ? () => onClickDelete(value) : undefined}
      >
        <Icon type="x" size="XXS" />
      </button>
    </div>
  );
});

Tag.propTypes = {
  /**
   *  Tag display value / label (JSX node; overrides label prop)
   */
  children: PropTypes.node,
  /**
   *  CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  Tag display value
   */
  label: PropTypes.string,
  /**
   *   onClick callback function for delete icon
   */
  onClick: PropTypes.func,
  /**
   *  Role/style
   */
  role: PropTypes.oneOf(["primary", "danger", "warning"]),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string),
  /**
   *  Tag value (string)
   */
  value: PropTypes.string
};

Tag.defaultProps = {
  children: undefined,
  className: undefined,
  cssMap: undefined,
  isDisabled: false,
  label: undefined,
  onClick: undefined,
  role: "primary",
  style: undefined,
  value: undefined
};

Tag.displayName = "Tag";

export default Tag;
