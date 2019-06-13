/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global addEventListener removeEventListener */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import useUncontrolled from "uncontrollable/hook";

import {
  attachEvents as handleAllEvents,
  clamp,
  useThemeClasses
} from "../utils";

const componentName = "ScrollBar";

const ScrollBar = forwardRef((props, forwardedRef) => {
  const {
    onChange,
    onClickTrack,
    orientation,
    scrollBoxId,
    scrollMax,
    scrollMin,
    style,
    thumbSize,
    value,
    ...restProps
  } = useUncontrolled(props, { value: "onChange" });

  const cssMap = useThemeClasses(componentName, props);
  const isVertical = orientation === "vertical";
  const scrollLength = Math.abs(scrollMax - scrollMin);
  const thumbOffset = `calc( ${value /
    scrollLength} * ( 100% - ${thumbSize} ) )`;

  const trackRef = React.useRef();
  const thumbRef = React.useRef();

  const handleClick = e => {
    if (e.target !== e.currentTarget || !onClickTrack) {
      return;
    }

    const trackLength = isVertical
      ? trackRef.current.clientHeight
      : trackRef.current.clientWidth;
    const clickOffset = isVertical
      ? e.nativeEvent.offsetY
      : e.nativeEvent.offsetX;

    const scale = scrollLength / trackLength;
    const newValue = clickOffset * scale;

    onClickTrack(newValue);
  };

  const handleMouseDown = md => {
    md.preventDefault();
    const initialMouse = isVertical ? md.clientY : md.clientX;
    const trackLength = isVertical
      ? trackRef.current.clientHeight
      : trackRef.current.clientWidth;

    const thumbLength = isVertical
      ? thumbRef.current.clientHeight
      : thumbRef.current.clientWidth;

    const scale = scrollLength / (trackLength - thumbLength);

    const handleMouseMove = mv => {
      const mouse = isVertical ? mv.clientY : mv.clientX;
      const mouseDiff = mouse - initialMouse;
      const scrollDiff = mouseDiff * scale;

      const newValue = clamp(value + scrollDiff, scrollMin, scrollMax);
      onChange(newValue);
    };

    addEventListener("mousemove", handleMouseMove);
    addEventListener("mouseup", function handleMouseUp() {
      removeEventListener("mousemove", handleMouseMove);
      removeEventListener("mouseup", handleMouseUp);
    });
  };

  return (
    <div
      {...handleAllEvents(restProps)}
      aria-controls={scrollBoxId}
      aria-orientation={orientation}
      aria-valuemax={scrollMax}
      aria-valuemin={scrollMin}
      aria-valuenow={value}
      className={cssMap.main}
      onClick={handleClick}
      ref={ref => {
        trackRef.current = ref;
        if (forwardedRef) {
          forwardedRef.current = ref;
        }
      }}
      role="scrollbar"
      style={style}
    >
      <div
        className={cssMap.thumb}
        onMouseDown={handleMouseDown}
        ref={thumbRef}
        style={{
          [isVertical ? "height" : "width"]: thumbSize,
          [isVertical ? "top" : "left"]: thumbOffset
        }}
      />
    </div>
  );
});

ScrollBar.propTypes = {
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Default scroll position (when uncontrolled)
   */
  defaultValue: PropTypes.number,
  /**
   *  orientation of the ScrollBar
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   *  scroll position change callback function: ( { value } ) => ...
   */
  onChange: PropTypes.func,
  /**
   *  scroll track click callback function: ( { value } ) => ...
   */
  onClickTrack: PropTypes.func,
  /**
   *  id of the ScrollBox controlled by this ScrollBar
   */
  scrollBoxId: PropTypes.string,
  /**
   *  Max scroll value
   */
  scrollMax: PropTypes.number,
  /**
   *  Min scroll value
   */
  scrollMin: PropTypes.number,
  /**
   *  Scroll thumb size (CSS unit)
   */
  thumbSize: PropTypes.string,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string),
  /**
   *  Current scroll position
   */
  value: PropTypes.number
};

ScrollBar.defaultProps = {
  className: undefined,
  cssMap: undefined,
  defaultValue: 0,
  onChange: undefined,
  onClickTrack: undefined,
  orientation: "horizontal",
  scrollBoxId: undefined,
  scrollMax: 0,
  scrollMin: 0,
  style: undefined,
  thumbSize: "20px",
  value: undefined
};

ScrollBar.displayName = componentName;

export default ScrollBar;
