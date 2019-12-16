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

import { TextInput } from "..";

const currencyFormat = (number, currency, language = navigator.language) => {
  if (typeof number === "number") {
    return number.toLocaleString(
      language,
      currency
        ? { style: "currency", currency }
        : { maximumFractionDigits: 2, minimumFractionDigits: 2 }
    );
  }
};

const parseValue = value =>
  value
    ? Number(
        value
          .replace(/[^0-9.-]/g, "")
          .replace(".", "PLACEHOLDER")
          .replace(/\.\d+/g, "")
          .replace("PLACEHOLDER", ".")
      )
    : null;

const useValueState = (defaultValue, value) => {
  const [valueState, setValueState] = useState(defaultValue);
  return [typeof value === "number" ? value : valueState, setValueState];
};

const componentName = "CurrencyInput";

const CurrencyInput = forwardRef(
  (
    {
      currency,
      defaultValue,
      id,
      onBlur,
      onChange,
      style,
      value,
      ...restProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [valueState, setValueState] = useValueState(defaultValue, value);
    const formattedValue = currencyFormat(valueState, currency);
    const [editingValue, setEditingValue] = useState(formattedValue);

    const handleFocus = () => {
      setEditingValue(formattedValue);
      setIsFocused(true);
    };

    const handleBlur = () => {
      const newValue = parseValue(editingValue);

      if (typeof onBlur === "function") {
        onBlur();
      }
      if (typeof onChange === "function") {
        onChange({ value: newValue });
      }

      setValueState(newValue);
      setIsFocused(false);
    };

    const handleChange = ({ value: newValue }) => {
      if (
        typeof onChange === "function" &&
        parseValue(newValue) !== valueState
      ) {
        onChange({ value: newValue });
      }
      setEditingValue(newValue);
    };

    return (
      <TextInput
        {...restProps}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        id={id}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={ref}
        spellCheck={false}
        style={style}
        value={isFocused ? editingValue : formattedValue}
      />
    );
  }
);

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

CurrencyInput.displayName = componentName;

export default CurrencyInput;
