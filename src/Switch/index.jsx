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

import {
  handleAllEvents,
  createChangeHandler,
  useId,
  useThemeClasses
} from "../utils";

const componentName = "Switch";

const Switch = forwardRef((props, ref) => {
  const {
    isChecked,
    isDisabled,
    label,
    onChange,
    style,
    ...restProps
  } = useUncontrolled(props, { isChecked: "onChange" });

  const cssMap = useThemeClasses(componentName, props);
  const id = useId(componentName, props);

  return (
    <div
      {...handleAllEvents(restProps)}
      className={cssMap.main}
      ref={ref}
      style={style}
    >
      <input
        checked={isChecked}
        className={cssMap.input}
        disabled={isDisabled}
        id={id}
        onChange={createChangeHandler(onChange)}
        type="checkbox"
      />
      <label aria-label={label} className={cssMap.label} htmlFor={id} />
    </div>
  );
});

Switch.propTypes = {
  /**
   * Extra CSS classname
   */
  className: PropTypes.string,
  /**
   * CSS classname map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Display as checked by default (uncontrolled input)
   */
  defaultIsChecked: PropTypes.bool,
  /**
   * HTML id attribute
   */
  id: PropTypes.string,
  /**
   *  Display as checked/“on”
   */
  isChecked: PropTypes.bool,

  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  switch label (used as aria-label)
   */
  label: PropTypes.string,
  /**
   * onBlur callback function: () => { ... }
   */
  onBlur: PropTypes.func,
  /**
   * onChange callback function: () => { ... }
   */
  onChange: PropTypes.func,
  /**
   *  onFocus callback function: ( { isChecked } ) => { ... }
   */
  onFocus: PropTypes.func,
  /**
   *  onMouseOut callback function: () => { ... }
   */
  onMouseOut: PropTypes.func,
  /**
   *  onMouseOver callback function: () => { ... }
   */
  onMouseOver: PropTypes.func,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

Switch.defaultProps = {
  className: undefined,
  cssMap: undefined,
  defaultIsChecked: undefined,
  id: undefined,
  isChecked: undefined,
  isDisabled: false,
  label: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  onMouseOut: undefined,
  onMouseOver: undefined,
  style: undefined
};

Switch.displayName = componentName;

export default Switch;
