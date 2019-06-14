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
import _ from "lodash";
import moment from "moment";
import useUncontrolled from "uncontrollable/hook";

import DatePickerHeader from "./DatePickerHeader";
import DatePickerItem from "./DatePickerItem";
import { handleAllEvents, useThemeClasses } from "../utils";

const componentName = "DatePicker";

const DatePicker = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);
  const {
    hasTimeInput,
    hourIsDisabled,
    hourIsReadOnly,
    hourPlaceholder,
    isDisabled,
    isReadOnly,
    minuteIsDisabled,
    minuteIsReadOnly,
    minutePlaceholder,
    moment,
    onChange,
    style,
    type,
    value,
    weekLabel,
    ...restProps
  } = useUncontrolled(props, { value: "onChange" });

  const [gridStartState, setGridStartState] = useState(null);
  const [hourValue, setHourValue] = useState(undefined);
  const [minuteValue, setMinuteValue] = useState(undefined);

  const $m = timestamp => moment(timestamp).utc();

  const isTimestampEqual = (ts1, ts2, precision) =>
    $m(ts1).isSame($m(ts2), precision);

  const formatHours = timestamp => {
    if (!_.isNumber(timestamp)) return "";
    return $m(timestamp).format("HH");
  };

  const formatMinutes = timestamp => {
    if (!_.isNumber(timestamp)) return "";
    return $m(timestamp).format("mm");
  };

  const gridStartTimestamp =
    gridStartState ||
    $m(value)
      .startOf(props.type === "month" ? "year" : "month")
      .valueOf();

  const isUnitSelectable = (itemTimestamp, unit) => {
    const { max } = props;
    const min = props.min || Date.now();

    if (itemTimestamp > max) return false;

    return $m(itemTimestamp).add(1, unit) > min;
  };

  const dayMatrix = () => {
    const startMonth = gridStartTimestamp;

    if (!startMonth) return;

    const offset = $m(startMonth).weekday() % 7;
    const daysInMonth = $m(startMonth).daysInMonth();

    const days = _.range(-offset, daysInMonth).map(dayIndex => {
      const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
      const label = hasDate ? String(dayIndex + 1) : "";
      const dayValue = hasDate
        ? $m(startMonth)
            .add(dayIndex, "day")
            .valueOf()
        : null;

      const isDisabled = hasDate && !isUnitSelectable(dayValue, "day");
      const isToday = hasDate && isTimestampEqual(dayValue, Date.now(), "day");
      const isSelected =
        hasDate &&
        _.isNumber(value) &&
        isTimestampEqual(dayValue, value, "day");

      return {
        isDisabled,
        isSelected,
        isToday,
        label,
        value: dayValue
      };
    });

    return _.chunk(days, 7);
  };

  const weekMatrix = () => {
    const mappedDays = dayMatrix();

    const weekDays = mappedDays.map(week => {
      const firstWeekday = week.find(weekDay => weekDay.value !== null);
      const currentDay = week.find(weekDay => weekDay.isDisabled === false);

      const isDisabledWeek = !week.find(
        weekDay => weekDay.isDisabled === false && weekDay.value !== null
      );

      const isSelectedWeek = !!week.find(
        weekDay => weekDay.isSelected === true
      );

      const weekNumber = {
        label: $m(firstWeekday.value).week(),
        isSelectedWeek,
        isDisabled: isDisabledWeek,
        value: currentDay ? currentDay.value : firstWeekday.value
      };

      return [weekNumber, ...week];
    });

    return weekDays;
  };

  const monthMatrix = () => {
    const startYear = gridStartTimestamp;

    if (!startYear) return;

    const months = _.range(0, 12).map(month => {
      const label = moment()
        .month(month)
        .format("MMM");
      const value = $m(startYear)
        .add(month, "month")
        .valueOf();

      const isDisabled = !isUnitSelectable(value, "month");

      const isToday = isTimestampEqual(value, Date.now(), "month");
      const isSelected =
        _.isNumber(value) && isTimestampEqual(value, value, "month");
      return {
        isDisabled,
        isSelected,
        isToday,
        label,
        value
      };
    });

    return _.chunk(months, 4);
  };

  const canGotoNext = () => {
    const { max } = props;
    const nextGridStart = $m(gridStartTimestamp)
      .add(1, props.type === "month" ? "year" : "month")
      .valueOf();

    return !_.isNumber(max) || nextGridStart <= max;
  };

  const canGoToPrev = () => {
    const min = props.min || Date.now();
    const prevGridStart = $m(gridStartTimestamp)
      .add(-1, props.type === "month" ? "year" : "month")
      .valueOf();
    const endOfPrev = $m(prevGridStart)
      .add(1, props.type === "month" ? "year" : "month")
      .valueOf();

    return !_.isNumber(min) || endOfPrev > min;
  };

  const handleClickNext = () => {
    if (!canGotoNext()) return;

    setGridStartState(
      $m(gridStartTimestamp)
        .add(1, props.type === "month" ? "year" : "month")
        .valueOf()
    );
  };

  const handleClickPrev = () => {
    if (!canGoToPrev()) return;

    setGridStartState(
      $m(gridStartTimestamp)
        .add(-1, props.type === "month" ? "year" : "month")
        .valueOf()
    );
  };

  const handleChangeHour = newValue => {
    const trimmed = newValue.trim().replace(/\s+/g, " ");
    let digits = Number(trimmed);

    setHourValue(newValue);

    if (/^\d\d?$/.test(trimmed) && digits >= 0 && digits <= 23) {
      const newTimestamp = $m(newValue)
        .set("hour", digits)
        .valueOf();

      onChange(newTimestamp);
    } else {
      digits = _.isNumber(newValue) && $m(newValue).hour();

      if (!_.isNaN(digits)) {
        const newTimestamp = $m(newValue)
          .set("hour", digits)
          .valueOf();

        onChange(newTimestamp);
      }
    }
  };

  const handleChangeMinute = newValue => {
    const trimmed = newValue.trim().replace(/\s+/g, " ");
    let digits = Number(trimmed);

    setMinuteValue(newValue);

    if (/^\d\d?$/.test(trimmed) && digits >= 0 && digits <= 59) {
      const newTimestamp = $m(newValue)
        .set("minute", digits)
        .valueOf();

      onChange(newTimestamp);
    } else {
      digits = _.isNumber(newValue) && $m(newValue).minute();

      if (!_.isNaN(digits)) {
        const newTimestamp = $m(newValue)
          .set("minute", digits)
          .valueOf();

        onChange(newTimestamp);
      }
    }
  };

  let items;
  switch (type) {
    case "month":
      items = monthMatrix();
      break;
    case "week":
      items = weekMatrix();
      break;
    default:
      items = dayMatrix();
  }

  return (
    <div
      {...handleAllEvents(restProps)}
      className={cssMap.main}
      ref={ref}
      style={style}
    >
      <DatePickerHeader
        hasTimeInput={type === "day" && hasTimeInput}
        hourIsDisabled={hourIsDisabled}
        hourIsReadOnly={hourIsReadOnly}
        hourPlaceholder={hourPlaceholder}
        hourValue={hourValue || formatHours(value)}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        minuteIsDisabled={minuteIsDisabled}
        minuteIsReadOnly={minuteIsReadOnly}
        minutePlaceholder={minutePlaceholder}
        minuteValue={minuteValue || formatMinutes(value)}
        month={$m(gridStartTimestamp).format("MMMM")}
        nextIsDisabled={!canGotoNext()}
        onChangeHour={handleChangeHour}
        onChangeMinute={handleChangeMinute}
        onClickNext={handleClickNext}
        onClickPrev={handleClickPrev}
        prevIsDisabled={!canGoToPrev()}
        year={$m(gridStartTimestamp)
          .year()
          .toString()}
      />

      {items && (
        <table className={cssMap.calendar}>
          {type !== "month" && (
            <thead className={cssMap.calendarHeader}>
              <tr>
                {type === "week" && (
                  <th>
                    <span>{weekLabel}</span>
                  </th>
                )}
                {_.range(0, 7).map(day => {
                  const label = moment()
                    .weekday(day)
                    .format("ddd");
                  return (
                    <th key={label}>
                      <span>{label}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                {item.map((item, j) => (
                  <td key={j}>
                    {item.value && (
                      <DatePickerItem
                        {...item}
                        onClick={() => onChange(item.value)}
                        type={type}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
});

DatePicker.propTypes = {
  className: PropTypes.string,
  cssMap: PropTypes.objectOf(PropTypes.string),
  defaultValue: PropTypes.number,
  hasTimeInput: PropTypes.bool,
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  hourIsDisabled: PropTypes.bool,
  hourIsReadOnly: PropTypes.bool,
  hourPlaceholder: PropTypes.string,
  hourValue: PropTypes.string,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  minuteIsDisabled: PropTypes.bool,
  minuteIsReadOnly: PropTypes.bool,
  minutePlaceholder: PropTypes.string,
  minuteValue: PropTypes.string,
  onChange: PropTypes.func,
  onChangeHour: PropTypes.func,
  onChangeMinute: PropTypes.func,
  onClickItem: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string),
  type: PropTypes.oneOf(["day", "week", "month"]),
  value: PropTypes.number,
  weekLabel: PropTypes.string
};

DatePicker.defaultProps = {
  className: undefined,
  cssMap: undefined,
  defaultValue: undefined,
  hasTimeInput: true,
  headers: undefined,
  hourIsDisabled: false,
  hourIsReadOnly: false,
  hourPlaceholder: undefined,
  hourValue: undefined,
  isDisabled: false,
  isReadOnly: false,
  max: undefined,
  min: undefined,
  minuteIsDisabled: false,
  minuteIsReadOnly: false,
  minutePlaceholder: undefined,
  minuteValue: undefined,
  moment,
  onChange: undefined,
  onChangeHour: undefined,
  onChangeMinute: undefined,
  onClickItem: undefined,
  onClickNext: undefined,
  onClickPrev: undefined,
  style: undefined,
  type: "day",
  value: undefined,
  weekLabel: "week"
};

DatePicker.displayName = componentName;

export default DatePicker;
