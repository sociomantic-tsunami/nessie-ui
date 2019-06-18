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
import useUncontrolled from "uncontrollable/hook";

import { TextInput } from "..";

import { handleAllEvents, useId, useThemeClasses } from "../utils";

const componentName = "UnitInput";

const UnitInput = forwardRef((props, ref) => {
  const id = useId(componentName, props);
  const cssMap = useThemeClasses(componentName, props);

  const {
    hasError,
    isDisabled,
    textAlign,
    onChange,
    placeholder,
    value,
    valueLabel,
    valueLabelPosition,
    ...restProps
  } = useUncontrolled(props, { value: "onChange" });

  let alignText = textAlign;
  if (textAlign === "auto") {
    alignText = valueLabelPosition === "left" ? "right" : "left";
  }

  return (
    <div {...handleAllEvents(restProps)} className={cssMap.main} ref={ref}>
      <div className={cssMap.container}>
        <TextInput
          className={cssMap.input}
          hasError={hasError}
          id={id}
          isDisabled={isDisabled}
          onChange={onChange}
          placeholder={placeholder}
          textAlign={alignText}
          value={value}
        />
        <label className={cssMap.valueLabel} htmlFor={id}>
          {valueLabel}
        </label>
      </div>
    </div>
  );
});

UnitInput.propTypes = {
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  Display as error/invalid
   */
  hasError: PropTypes.bool,
  /**
   *  HTML id attribute
   */
  id: PropTypes.string,
  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  Blur callback function
   */
  onBlur: PropTypes.func,
  /**
   *  Input change callback function
   */
  onChange: PropTypes.func,
  /**
   *  Input click callback function
   */
  onClick: PropTypes.func,
  /**
   *  Focus callback function
   */
  onFocus: PropTypes.func,
  /**
   *  Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   *  Input text alignment
   */
  textAlign: PropTypes.oneOf(["auto", "left", "right"]),
  /**
   *  Input string value
   */
  value: PropTypes.string,
  /**
   * Value label text
   */
  valueLabel: PropTypes.string,
  /**
   * Position of the value label
   */
  valueLabelPosition: PropTypes.oneOf(["left", "right"])
};

UnitInput.defaultProps = {
  className: undefined,
  hasError: false,
  id: undefined,
  isDisabled: false,
  onBlur: undefined,
  onChange: undefined,
  onClick: undefined,
  onFocus: undefined,
  placeholder: undefined,
  textAlign: "auto",
  value: undefined,
  valueLabel: undefined,
  valueLabelPosition: "left"
};

export default UnitInput;
