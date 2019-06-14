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
import useUncontrolled from "uncontrollable/hook";

import { Text } from "..";

import {
  handleAllEvents,
  createChangeHandler,
  useId,
  useThemeClasses
} from "../utils";

const componentName = "Checkbox";

const Checkbox = forwardRef((props, ref) => {
  const id = useId(componentName, props);
  const cssMap = useThemeClasses(componentName, props);
  const {
    children,
    isChecked,
    isDisabled,
    label,
    onChange,
    style,
    ...restProps
  } = useUncontrolled(props, { isChecked: "onChange" });

  let labelContent = children || label;
  if (typeof labelContent === "string") {
    labelContent = <Text className={cssMap.labelText}>{labelContent}</Text>;
  }

  return (
    <div className={cssMap.main} ref={ref} style={style}>
      <input
        {...handleAllEvents(restProps)}
        checked={isChecked}
        className={cssMap.input}
        disabled={isDisabled}
        id={id}
        onChange={createChangeHandler(onChange)}
        type="checkbox"
      />
      <label className={cssMap.label} htmlFor={id}>
        {labelContent && (
          <span className={cssMap.labelContent}>{labelContent}</span>
        )}
      </label>
    </div>
  );
});

Checkbox.propTypes = {
  /**
   *  Label content (React node; overrides label prop)
   */
  children: PropTypes.node,
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Display as checked by default (uncontrolled input)
   */
  defaultIsChecked: PropTypes.bool,
  /**
   *  Display as error/invalid
   */
  hasError: PropTypes.bool,
  /**
   *  Component id
   */
  id: PropTypes.string,
  /**
   *  Display as checked (controlled input)
   */
  isChecked: PropTypes.bool,
  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  Label content (string)
   */
  label: PropTypes.string,
  /**
   *  change callback prop
   */
  onChange: PropTypes.func,
  /**
   *  click callback prop
   */
  onClick: PropTypes.func,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

Checkbox.defaultProps = {
  children: undefined,
  className: undefined,
  cssMap: undefined,
  defaultIsChecked: undefined,
  hasError: false,
  id: undefined,
  isChecked: undefined,
  isDisabled: false,
  label: undefined,
  onChange: undefined,
  onClick: undefined,
  style: undefined
};

Checkbox.displayName = componentName;

export default Checkbox;
