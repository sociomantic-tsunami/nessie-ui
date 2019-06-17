/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global navigator */

import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import useUncontrolled from "uncontrollable/hook";

import { TextInput } from "..";
import { callAll } from "../utils";

const format = (num, currency = "USD", language = navigator.language) => {
  if (typeof num !== "number") return "";

  return num.toLocaleString(
    language,
    currency ? { style: "currency", currency } : {}
  );
};

const parse = str => (str ? Number(str.replace(/[^0-9.-]/g, "")) : undefined);

const CurrencyInput = forwardRef((props, ref) => {
  const { currency, onBlur, onChange, value, ...restProps } = useUncontrolled(
    props,
    { value: "onChange" }
  );

  const [editingValue, setEditingValue] = useState(null);
  const handleBlur = () => setEditingValue(null);

  return (
    <TextInput
      {...restProps}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      onBlur={callAll(onBlur, handleBlur)}
      onChange={newValue => {
        setEditingValue(newValue);
        onChange(parse(newValue));
      }}
      ref={ref}
      spellCheck={false}
      value={editingValue || format(value, currency)}
    />
  );
});

CurrencyInput.propTypes = {
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Currency to display
   */
  currency: PropTypes.oneOf(["USD", "EUR", "GBP"]),
  /**
   *  Default currency value (number)
   */
  defaultValue: PropTypes.number,
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
   *  Display as read-only
   */
  isReadOnly: PropTypes.bool,
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
   *  Key down callback function
   */
  onKeyDown: PropTypes.func,
  /**
   *  Key press callback function
   */
  onKeyPress: PropTypes.func,
  /**
   *  Key up callback function
   */
  onKeyUp: PropTypes.func,
  /**
   *  Mouse out callback function
   */
  onMouseOut: PropTypes.func,
  /**
   *  Mouse over  callback function
   */
  onMouseOver: PropTypes.func,
  /**
   *  Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   *  Input text alignment
   */
  textAlign: PropTypes.oneOf(["left", "right"]),
  /**
   *  Currency value (number)
   */
  value: PropTypes.number,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

CurrencyInput.defaultProps = {
  className: undefined,
  cssMap: undefined,
  currency: undefined,
  defaultValue: undefined,
  hasError: false,
  id: undefined,
  isDisabled: false,
  isReadOnly: false,
  onBlur: undefined,
  onChange: undefined,
  onClick: undefined,
  onFocus: undefined,
  onKeyDown: undefined,
  onKeyPress: undefined,
  onKeyUp: undefined,
  onMouseOut: undefined,
  onMouseOver: undefined,
  placeholder: undefined,
  style: undefined,
  textAlign: "left",
  value: undefined
};

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
