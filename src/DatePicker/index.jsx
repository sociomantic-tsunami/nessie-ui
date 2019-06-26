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
    hourIsDisabled,
    hourIsReadOnly,
    hourPlaceholder,
    isDisabled,
    isReadOnly,
    max,
    min,
    minuteIsDisabled,
    minuteIsReadOnly,
    minutePlaceholder,
    mode,
    moment,
    onChange,
    style,
    type,
    value,
    weekLabel,
    ...restProps
  } = useUncontrolled(props, { value: "onChange" });

  const [gridStartState, setGridStartState] = useState(null);
  const [editingHourValue, setEditingHourValue] = useState(undefined);
  const [editingMinuteValue, setEditingMinuteValue] = useState(undefined);

  const now = () => moment().valueOf();

  const isTimestampEqual = (ts1, ts2, precision) =>
    moment(ts1).isSame(moment(ts2), precision);

  const formatHours = timestamp => {
    if (!_.isNumber(timestamp)) return "";
    return moment(timestamp).format("HH");
  };

  const formatMinutes = timestamp => {
    if (!_.isNumber(timestamp)) return "";
    return moment(timestamp).format("mm");
  };

  const gridStartTimestamp =
    gridStartState ||
    moment(value)
      .startOf(mode === "month" ? "year" : "month")
      .valueOf();

  const isUnitSelectable = timestamp => {
    const minOrNow = typeof min === "number" ? min : Date.now();
    return timestamp >= minOrNow && timestamp <= (max || Infinity);
  };

  const dayMatrix = () => {
    const startMonth = gridStartTimestamp;

    if (!startMonth) return;

    const offset = moment(startMonth).weekday() % 7;
    const daysInMonth = moment(startMonth).daysInMonth();

    const days = _.range(-offset, daysInMonth).map(dayIndex => {
      const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
      const label = hasDate ? String(dayIndex + 1) : "";
      const dayValue = hasDate
        ? moment(startMonth)
            .add(dayIndex, "day")
            .valueOf()
        : null;

      const isDisabled = hasDate && !isUnitSelectable(dayValue, "day");
      const isToday = hasDate && isTimestampEqual(dayValue, now(), "day");
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
        label: String(moment(firstWeekday.value).week()),
        isSelectedWeek,
        isDisabled: isDisabledWeek,
        value:
          currentDay && currentDay.value !== null
            ? currentDay.value
            : firstWeekday.value
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
      const value = moment(startYear)
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
    if (typeof max !== "number") return true;

    const maxOrInfinity = typeof max === "number" ? max : Infinity;
    const nextGridStart = moment(gridStartTimestamp)
      .add(1, mode === "month" ? "year" : "month")
      .valueOf();

    return nextGridStart <= maxOrInfinity;
  };

  const canGoToPrev = () => {
    const minOrNow = typeof min === "number" ? min : Date.now();
    const prevGridStart = moment(gridStartTimestamp)
      .add(-1, mode === "month" ? "year" : "month")
      .valueOf();
    const endOfPrev = moment(prevGridStart)
      .add(1, mode === "month" ? "year" : "month")
      .valueOf();

    return endOfPrev > minOrNow;
  };

  const handleClickNext = () => {
    if (!canGotoNext()) return;

    setGridStartState(
      moment(gridStartTimestamp)
        .add(1, mode === "month" ? "year" : "month")
        .valueOf()
    );
  };

  const handleClickPrev = () => {
    if (!canGoToPrev()) return;

    setGridStartState(
      moment(gridStartTimestamp)
        .add(-1, mode === "month" ? "year" : "month")
        .valueOf()
    );
  };

  const handleChangeHour = newInputValue => {
    const hour = _.clamp(Number(newInputValue), 0, 23);
    const newTimestamp = moment(value)
      .set("hour", hour)
      .valueOf();

    onChange(newTimestamp || value);
    setEditingHourValue(newInputValue);
  };

  const handleChangeMinute = newInputValue => {
    const minute = _.clamp(Number(newInputValue), 0, 59);
    const newTimestamp = moment(value)
      .set("minute", minute)
      .valueOf();

    onChange(newTimestamp || value);
    setEditingMinuteValue(newInputValue);
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
        hasTimeInput={["minute", "hour"].includes(mode)}
        hourIsDisabled={hourIsDisabled}
        hourIsReadOnly={hourIsReadOnly}
        hourPlaceholder={hourPlaceholder}
        hourValue={editingHourValue || formatHours(value)}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        minuteIsDisabled={minuteIsDisabled}
        minuteIsReadOnly={minuteIsReadOnly}
        minutePlaceholder={minutePlaceholder}
        minuteValue={editingMinuteValue || formatMinutes(value)}
        month={moment(gridStartTimestamp).format("MMMM")}
        nextIsDisabled={!canGotoNext()}
        onChangeHour={handleChangeHour}
        onChangeMinute={handleChangeMinute}
        onClickNext={handleClickNext}
        onClickPrev={handleClickPrev}
        prevIsDisabled={!canGoToPrev()}
        year={moment(gridStartTimestamp)
          .year()
          .toString()}
      />

      {items && (
        <table className={cssMap.calendar}>
          {mode !== "month" && (
            <thead className={cssMap.calendarHeader}>
              <tr>
                {mode === "week" && (
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
                        onClick={() => {
                          onChange(item.value);
                          setEditingMinuteValue("");
                          setEditingHourValue("");
                        }}
                        type={mode === "month" ? "month" : "day"}
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
  hourIsReadOnly: PropTypes.bool,
  hourPlaceholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  minutePlaceholder: PropTypes.string,
  mode: PropTypes.oneOf(["minute", "hour", "day", "week", "month"]),
  onChange: PropTypes.func,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.number,
  weekLabel: PropTypes.string
};

DatePicker.defaultProps = {
  className: undefined,
  cssMap: undefined,
  defaultValue: undefined,
  hourPlaceholder: undefined,
  isDisabled: false,
  isReadOnly: false,
  max: undefined,
  min: undefined,
  minutePlaceholder: undefined,
  mode: "minute",
  moment,
  onChange: undefined,
  style: undefined,
  value: undefined,
  weekLabel: "week"
};

DatePicker.displayName = componentName;

export default DatePicker;
