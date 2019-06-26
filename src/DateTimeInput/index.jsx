/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import useUncontrolled from "uncontrollable/hook";

import { DatePicker, PopperWrapper, Popup, TextInputWithIcon } from "..";

const FORMATS = {
  minute: "YYYY/MM/DD HH:mm",
  hour: "YYYY/MM/DD HH:00",
  day: "YYYY/MM/DD",
  week: "YYYY/MM/DD ww",
  month: "YYYY/MM"
};

const DateTimeInput = forwardRef((props, ref) => {
  const {
    className,
    format,
    hasError,
    id,
    inputPlaceholder,
    isDisabled,
    isReadOnly,
    min,
    max,
    mode,
    moment,
    onChange,
    popperContainer,
    style,
    value,
    weekLabel,
    ...restProps
  } = useUncontrolled(props, { value: "onChange" });

  const [editingInputValue, setEditingInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    setEditingInputValue("");
  };

  const close = () => {
    setIsOpen(false);
    setEditingInputValue("");
  };

  const handleChangeInput = newInputValue => {
    let newValue = newInputValue
      ? moment(newInputValue, format || FORMATS[format]).valueOf() || value
      : undefined;

    const minOrNow = typeof min === "number" ? min : Date.now();
    if (newValue < minOrNow) {
      newValue = minOrNow;
    }
    if (typeof max === "number" && newValue > max) {
      newValue = max;
    }

    setEditingInputValue(newInputValue);
    onChange(newValue);
  };

  return (
    <PopperWrapper
      {...restProps}
      isVisible={isOpen}
      onClickOutside={close}
      popper={popperProps => (
        <Popup hasError={hasError} size="content" {...popperProps}>
          <DatePicker
            isDisabled={isDisabled}
            max={max}
            min={min}
            mode={mode}
            moment={moment}
            onChange={onChange}
            type={mode === "week" || mode === "month" ? mode : "day"}
            value={value}
            weekLabel={weekLabel}
          />
        </Popup>
      )}
      popperContainer={popperContainer}
      popperOffset="s"
      popperPosition="bottom-start"
      ref={ref}
      style={style}
    >
      {refProps => (
        <TextInputWithIcon
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className={className}
          hasError={hasError}
          iconType="calendar"
          id={id}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          onBlur={close}
          onChangeInput={handleChangeInput}
          onClickIcon={() => (isOpen ? close() : open())}
          placeholder={inputPlaceholder}
          spellCheck={false}
          value={
            editingInputValue ||
            (value && moment(value).format(format || FORMATS[mode]))
          }
          {...refProps}
        />
      )}
    </PopperWrapper>
  );
});

DateTimeInput.propTypes = {
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  Default timestamp value
   */
  defaultValue: PropTypes.number,
  /**
   *  id of the DOM element used as container for popup datepicker
   */
  popperContainer: PropTypes.string,
  /**
   *  Date time format
   */
  format: PropTypes.string,
  /**
   *  Display as error/invalid
   */
  hasError: PropTypes.bool,
  /**
   *  Component id
   */
  id: PropTypes.string,
  /**
   *  Main input placeholder text
   */
  inputPlaceholder: PropTypes.string,
  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  Display as read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   *  Maximum timestamp selectable
   */
  max: PropTypes.number,
  /**
   *  Minimum timestamp selectable
   */
  min: PropTypes.number,
  /**
   *  Picker mode
   */
  mode: PropTypes.oneOf(["minute", "hour", "day", "week", "month"]),
  /**
   *  Change callback: ( { value } ) => ...
   */
  onChange: PropTypes.func,
  /**
   *  Selected timestamp
   */
  value: PropTypes.number,
  /**
   *  Week label when mode=week
   */
  weekLabel: PropTypes.string,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

DateTimeInput.defaultProps = {
  className: undefined,
  defaultValue: undefined,
  format: undefined,
  hasError: false,
  id: undefined,
  inputPlaceholder: undefined,
  isDisabled: false,
  isReadOnly: false,
  max: undefined,
  min: undefined,
  mode: "minute",
  moment,
  onChange: undefined,
  popperContainer: undefined,
  style: undefined,
  value: undefined,
  weekLabel: "week"
};

DateTimeInput.displayName = "DateTimeInput";

export default DateTimeInput;
