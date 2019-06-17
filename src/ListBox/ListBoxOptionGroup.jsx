/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { Text } from "..";

import { handleAllEvents, mapAria, useThemeClasses } from "../utils";

const componentName = "ListBoxOptionGroup";

const ListBoxOptionGroup = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);
  const { aria, children, header, options, style, ...restProps } = props;

  return (
    <li
      {...handleAllEvents(restProps)}
      {...mapAria({ ...aria, role: "none" })}
      className={cssMap.main}
      ref={ref}
      style={style}
    >
      <div className={cssMap.header}>
        <Text className={cssMap.headerText}>{header}</Text>
      </div>
      <ul
        {...mapAria({
          expanded: true,
          label: header,
          role: "group"
        })}
        className={cssMap.options}
      >
        {children || options}
      </ul>
    </li>
  );
});

ListBoxOptionGroup.propTypes = {
  aria: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node,
  className: PropTypes.string,
  cssMap: PropTypes.objectOf(PropTypes.string),
  header: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

ListBoxOptionGroup.defaultProps = {
  aria: undefined,
  children: undefined,
  className: undefined,
  cssMap: undefined,
  header: undefined,
  options: undefined,
  style: undefined
};

ListBoxOptionGroup.displayName = componentName;

export default ListBoxOptionGroup;
