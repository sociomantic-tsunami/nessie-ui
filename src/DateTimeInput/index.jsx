/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";

import { DatePicker } from "..";

import TextInputWithIcon from "../TextInputWithIcon";
import Popup from "../Popup";
import PopperWrapper from "../PopperWrapper";

const componentName = "DateTimeInput";

const DISPLAY_FORMATTING = {
  month: "YYYY/MM",
  week: "YYYY/MM/DD ww",
  day: "YYYY/MM/DD",
  hour: "YYYY/MM/DD HH:00",
  minute: "YYYY/MM/DD HH:mm"
};

const DEFAULT_FORMAT = "YYYY/M/D H:m";

/**
 * returns the timestamp of the current moment
 *
 * @return {Number} timestamp
 */
function now() {
  return new Date().getTime();
}

/**
 * set precision for formatting and comparing
 *
 * @param {String}  mode  date time input mode
 *
 * @return {String} date / time format
 */
function setPrecision(mode) {
  let format;

  switch (mode) {
    case "date":
      format = "day";
      break;
    case "week":
      format = "week";
      break;
    case "month":
      format = "month";
      break;
    default:
      format = "minute";
  }

  return DISPLAY_FORMATTING[format];
}

const useTimestamp = (defaultValue, value) => {
  const [timestamp, setTimestamp] = useState(defaultValue);

  const setter = newValue => {
    if (value === undefined) {
      setTimestamp(newValue);
    }
  };

  return [value || timestamp, setter];
};

const DateTimeInput = forwardRef((props, ref) => {
  const { moment } = props;
  const [editingMainInputValue, setEditingMainInputValue] = useState(undefined);
  const [gridStartTimestamp, setGridStartTimestamp] = useState(undefined);
  const [timestamp, setTimestamp] = useTimestamp(
    props.defaultValue,
    props.value
  );

  const isOpen = Boolean(gridStartTimestamp);

  /**
   * returns utc of the timestamp passed
   *
   * @param {Number} timestamp passed
   *
   * @return {Number} UTC timestamp
   */
  function $m(timestamp) {
    return moment(timestamp).utc();
  }

  /**
   * Human date ( input value ) conversion to timestamp,
   * returns current timestamp if invalid input value
   *
   * @param {String}  inputValue human readable date
   * @param {Number}  timestamp current timestamp
   * @param {String}  format date format
   *
   * @return {Number} timestamp
   */
  function tryParseInputValue(inputValue, timestamp, format = DEFAULT_FORMAT) {
    if (!inputValue) return null;

    return moment.utc(inputValue, format).valueOf() || timestamp;
  }

  /**
   * Timestamp conversion to Human date
   *
   * @param {Number}  timestamp timestamp
   * @param {String}  precision precision for formatting
   *
   * @return {String} human readable date
   */
  function formatDateTime(timestamp, precision) {
    if (!_.isNumber(timestamp)) return String(timestamp || "");
    return $m(timestamp).format(precision);
  }

  const handleClickIcon = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [close, isOpen, open]);

  const handleChangeInput = useCallback(
    ({ value }) => {
      const trimmedValue = value.replace(/\s+/g, " ");
      const min = props.min || now();
      let newTimestamp = tryParseInputValue(
        trimmedValue,
        timestamp,
        props.format
      );

      if (props.min !== null) {
        if (newTimestamp !== null && newTimestamp < min) {
          newTimestamp = min;
        }
      }

      if (props.max) {
        if (newTimestamp !== null && newTimestamp > props.max) {
          newTimestamp = props.max;
        }
      }

      if (typeof onChange === "function") {
        onChange(newTimestamp);
      }

      setEditingMainInputValue(!value ? undefined : value);
      setTimestamp(!value ? undefined : newTimestamp);
    },
    [
      onChange,
      props.format,
      props.max,
      props.min,
      setTimestamp,
      timestamp,
      tryParseInputValue
    ]
  );

  const handleOnBlur = useCallback(() => {
    if (!gridStartTimestamp) {
      purgeEdits();
    }
  }, [gridStartTimestamp, purgeEdits]);

  const handleChange = ({ value }) => {
    if (typeof onChange === "function") {
      onChange(value);
    }

    setTimestamp(value);
  };

  const canEditHourOrMinute = useCallback(() => _.isNumber(timestamp), [
    timestamp
  ]);

  const purgeEdits = useCallback(() => {
    setEditingMainInputValue(undefined);
  }, []);

  const open = useCallback(() => {
    const { min } = props;
    let newTimestamp;

    newTimestamp = _.isNumber(timestamp) ? timestamp : now();

    newTimestamp = _.isNumber(min) && min > timestamp ? min : timestamp;

    setGridStartTimestamp(
      $m(newTimestamp)
        .startOf(props.mode === "month" ? "year" : "month")
        .valueOf()
    );
  }, [$m, props, timestamp]);

  const close = useCallback(() => {
    purgeEdits();
    setGridStartTimestamp(null);
  }, [purgeEdits]);

  const {
    className,
    disableDayOfWeek,
    format,
    hasError,
    id,
    inputPlaceholder,
    inputIsReadOnly,
    inputIconLabel,
    isDisabled,
    isReadOnly,
    max,
    min,
    mode,
    onChange,
    popperContainer,
    style,
    weekLabel
  } = props;

  let datePickerType = "day";

  if (mode === "week") {
    datePickerType = "week";
  } else if (mode === "month") {
    datePickerType = "month";
  }

  const datePicker = (
    <DatePicker
      moment={moment}
      disableDayOfWeek={disableDayOfWeek}
      hasTimeInput={mode === "default"}
      hourIsReadOnly={!canEditHourOrMinute()}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      max={max}
      min={min}
      minuteIsReadOnly={!canEditHourOrMinute()}
      mode={mode}
      onChange={handleChange}
      type={datePickerType}
      value={timestamp}
      weekLabel={weekLabel}
    />
  );

  return (
    <PopperWrapper
      isVisible={isOpen}
      onClickOutside={close}
      popper={popperProps => (
        <Popup hasError={hasError} size="content" {...popperProps}>
          {datePicker}
        </Popup>
      )}
      container={popperContainer}
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
          iconLabel={inputIconLabel}
          iconType="calendar"
          id={id}
          isDisabled={isDisabled}
          isReadOnly={inputIsReadOnly || isReadOnly}
          onBlur={handleOnBlur}
          onChangeInput={handleChangeInput}
          onClickIcon={handleClickIcon}
          placeholder={inputPlaceholder}
          spellCheck={false}
          value={
            editingMainInputValue ||
            formatDateTime(timestamp, format || setPrecision(mode))
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
   *  Disable defined weekdays (locale aware)
   */
  disableDayOfWeek: PropTypes.arrayOf(PropTypes.number),
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
   *  Display input as read-only
   */
  inputIsReadOnly: PropTypes.bool,
  /**
   *  label of the input icon
   */
  inputIconLabel: PropTypes.string,
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
  mode: PropTypes.oneOf(["default", "date", "week", "month"]),
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
  disableDayOfWeek: undefined,
  format: undefined,
  hasError: false,
  id: undefined,
  inputIsReadOnly: false,
  inputIconLabel: undefined,
  inputPlaceholder: undefined,
  isDisabled: false,
  isReadOnly: false,
  max: undefined,
  min: undefined,
  mode: "default",
  onChange: undefined,
  popperContainer: undefined,
  style: undefined,
  value: undefined,
  weekLabel: "week",
  moment
};

DateTimeInput.displayName = componentName;

export default DateTimeInput;
