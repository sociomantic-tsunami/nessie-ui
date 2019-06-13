/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { buildOptions, updateOptions } from "./utils";
import {
  attachEvents as handleAllEvents,
  killFocus,
  mapAria,
  useThemeClasses
} from "../utils";

const componentName = "ListBox";

const ListBox = forwardRef((props, ref) => {
  const {
    activeOption,
    aria,
    children,
    id,
    isFocusable,
    isMultiselect,
    onClickOption,
    onMouseOutOption,
    onMouseOverOption,
    options,
    style,
    value,
    ...restProps
  } = props;

  const cssMap = useThemeClasses(componentName, props);

  return (
    <ul
      {...handleAllEvents(restProps)}
      {...mapAria({
        ...aria,
        activeDescendant: isFocusable ? activeOption : null,
        multiSelectable: isMultiselect,
        role: "listbox"
      })}
      className={cssMap.main}
      id={id}
      onMouseDown={!isFocusable ? killFocus : undefined}
      ref={ref}
      style={style}
      tabIndex={isFocusable ? "0" : "-1"}
    >
      {updateOptions(children || buildOptions(options), {
        activeOption,
        onClickOption,
        onMouseOutOption,
        onMouseOverOption,
        value
      })}
    </ul>
  );
});

ListBox.propTypes = {
  aria: PropTypes.objectOf(PropTypes.string),
  /**
   *  Highlights option
   */
  activeOption: PropTypes.string,
  children: PropTypes.node,
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  isFocusable: PropTypes.bool,
  isMultiselect: PropTypes.bool,
  /**
   *  ListBox ID
   */
  id: PropTypes.string,
  /**
   *  Array of strings or objects (to build the options)
   */
  options: PropTypes.arrayOf(PropTypes.object),
  /**
   *  onClickOption callback function ( e ) => { ... }
   */
  onClickOption: PropTypes.func,
  /**
   *  onMouseOutOption callback function ( e ) => { ... }
   */
  onMouseOutOption: PropTypes.func,
  /**
   *  onMouseOverOption callback function ( e ) => { ... }
   */
  onMouseOverOption: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

ListBox.defaultProps = {
  activeOption: undefined,
  aria: undefined,
  children: undefined,
  className: undefined,
  cssMap: undefined,
  id: undefined,
  isFocusable: true,
  isMultiselect: false,
  onClickOption: undefined,
  onMouseOutOption: undefined,
  onMouseOverOption: undefined,
  options: undefined,
  style: undefined,
  value: undefined
};

ListBox.displayName = componentName;

export default ListBox;
