/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

import { IconButton, ScrollBar } from "../index";
import { handleAllEvents, useThemeClasses } from "../utils";

const componentName = "ScrollBox";

const ScrollBox = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);

  const [dimensions, setDimensions] = useState({
    clientHeight: null,
    clientWidth: null,
    offsetHeight: null,
    offsetWidth: null,
    scrollHeight: null,
    scrollLeft: null,
    scrollTop: null,
    scrollWidth: null
  });

  const innerRef = useRef(null);

  useEffect(() => {
    const newDimensions = {};

    Object.keys(dimensions).forEach(key => {
      newDimensions[key] = innerRef.current[key];
    });

    if (!isEqual(dimensions, newDimensions)) {
      setDimensions(newDimensions);
    }
  });

  const {
    children,
    contentWidth,
    height,
    onClickScrollDown,
    onClickScrollLeft,
    onClickScrollRight,
    onClickScrollUp,
    onMouseOut,
    onMouseOver,
    onThumbDragEndX,
    onThumbDragEndY,
    onThumbDragStartX,
    onThumbDragStartY,
    scroll,
    scrollAmount,
    scrollBarsAreVisible,
    scrollBoxRef,
    scrollIndicatorVariant,
    style,
    ...restProps
  } = props;

  const handleClickScrollButton = useCallback(
    (dir, e) => {
      const callback = props[`onClickScroll${dir}`];
      if (callback) {
        callback(e);
      }

      if (dir === "Up" || dir === "Down") {
        let amount = dimensions.clientHeight;
        if (scrollAmount) {
          amount = Array.isArray(scrollAmount) ? scrollAmount[1] : scrollAmount;
        }

        const increment = dir === "Down" ? amount : -amount;
        innerRef.current.scrollTop = dimensions.scrollTop + increment;
      }

      if (dir === "Left" || dir === "Right") {
        let amount = dimensions.clientWidth;
        if (scrollAmount) {
          amount = Array.isArray(scrollAmount) ? scrollAmount[0] : scrollAmount;
        }

        const increment = dir === "Right" ? amount : -amount;
        innerRef.current.scrollLeft = dimensions.scrollLeft + increment;
      }
    },
    [
      dimensions.clientHeight,
      dimensions.clientWidth,
      dimensions.scrollLeft,
      dimensions.scrollTop,
      props,
      scrollAmount
    ]
  );

  const handleClickTrackX = useCallback(
    pos => {
      let amount = dimensions.clientWidth;
      if (scrollAmount) {
        amount = Array.isArray(scrollAmount) ? scrollAmount[0] : scrollAmount;
      }

      const increment = pos >= dimensions.scrollLeft ? amount : -amount;
      innerRef.current.scrollLeft = dimensions.scrollLeft + increment;
    },
    [dimensions.clientWidth, dimensions.scrollLeft, scrollAmount]
  );

  const handleClickTrackY = useCallback(
    pos => {
      let amount = dimensions.clientHeight;
      if (scrollAmount) {
        amount = Array.isArray(scrollAmount) ? scrollAmount[1] : scrollAmount;
      }

      const increment = pos >= dimensions.scrollTop ? amount : -amount;
      innerRef.current.scrollTop = dimensions.scrollTop + increment;
    },
    [dimensions.clientHeight, dimensions.scrollTop, scrollAmount]
  );

  const handleChangeX = useCallback(pos => {
    innerRef.current.scrollLeft = pos;
  }, []);

  const handleChangeY = useCallback(pos => {
    innerRef.current.scrollTop = pos;
  }, []);

  const handleRef = useCallback(
    ref => {
      if (typeof scrollBoxRef === "function") {
        scrollBoxRef(ref);
      }

      innerRef.current = ref;
    },
    [scrollBoxRef]
  );

  const handleScroll = useCallback(() => {
    setDimensions(dimensions);
  }, [dimensions]);

  const renderScrollButton = useCallback(
    dir => {
      if (dir === "Up" && dimensions.scrollTop === 0) {
        return false;
      }

      if (
        dir === "Down" &&
        dimensions.scrollTop + dimensions.clientHeight >=
          dimensions.scrollHeight
      ) {
        return false;
      }

      if (dir === "Left" && dimensions.scrollLeft === 0) {
        return false;
      }

      if (
        dir === "Right" &&
        dimensions.scrollLeft + dimensions.clientWidth >= dimensions.scrollWidth
      ) {
        return false;
      }

      return true;
    },
    [
      dimensions.scrollTop,
      dimensions.clientHeight,
      dimensions.scrollHeight,
      dimensions.scrollLeft,
      dimensions.clientWidth,
      dimensions.scrollWidth
    ]
  );

  const innerStyle = { maxHeight: height };

  if (innerRef.current) {
    // space taken by native scrollbars
    const diffX = dimensions.offsetWidth - dimensions.clientWidth;
    const diffY = dimensions.offsetHeight - dimensions.clientHeight;

    if (diffX || diffY) {
      Object.assign(innerStyle, {
        width: diffX ? `calc( 100% + ${diffX}px )` : null,
        height: diffY ? `calc( 100% + ${diffY}px )` : null,
        marginRight: diffX ? `-${diffX}px` : null,
        marginBottom: diffY ? `-${diffY}px` : null
      });
    } else {
      // compensate for macOS overlaid scrollbars
      const compo = 20;

      Object.assign(innerStyle, {
        padding: `${compo}px`,
        margin: `-${compo}px`
      });
    }
  }

  const scrollBars = [];

  if (scroll !== "vertical") {
    if (dimensions.scrollWidth > dimensions.clientWidth) {
      scrollBars.push(
        <ScrollBar
          className={cssMap.scrollBarHorizontal}
          key="horizontal"
          onChange={handleChangeX}
          onClickTrack={handleClickTrackX}
          onThumbDragEnd={onThumbDragEndX}
          onThumbDragStart={onThumbDragStartX}
          orientation="horizontal"
          scrollMax={dimensions.scrollWidth - dimensions.clientWidth}
          thumbSize={`${(dimensions.clientWidth / dimensions.scrollWidth) *
            100}%`}
          value={dimensions.scrollLeft}
        />
      );
    }
  }

  if (scroll !== "horizontal") {
    if (dimensions.scrollHeight > dimensions.clientHeight) {
      scrollBars.push(
        <ScrollBar
          className={cssMap.scrollBarVertical}
          key="vertical"
          length={`${dimensions.clientHeight}px`}
          onChange={handleChangeY}
          onClickTrack={handleClickTrackY}
          onThumbDragEnd={onThumbDragEndY}
          onThumbDragStart={onThumbDragStartY}
          orientation="vertical"
          scrollMax={dimensions.scrollHeight - dimensions.clientHeight}
          thumbSize={`${(dimensions.clientHeight / dimensions.scrollHeight) *
            100}%`}
          value={dimensions.scrollTop}
        />
      );
    }
  }

  const scrollButtons = [];

  ["Up", "Down", "Left", "Right"].forEach(dir => {
    if (props[`scroll${dir}IsVisible`]) {
      if (renderScrollButton(dir)) {
        scrollButtons.push(
          <IconButton
            className={cssMap[`icon${dir}`]}
            hasBackground={scrollIndicatorVariant === "circle"}
            iconSize="S"
            iconType={`chevron-${dir.toLowerCase()}`}
            key={dir}
            onClick={e => handleClickScrollButton(dir, e)}
          />
        );
      }
    }
  });

  return (
    <div
      {...handleAllEvents(restProps)}
      className={cssMap.main}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOut}
      ref={ref}
      style={{ maxHeight: height, ...style }}
    >
      <div
        className={cssMap.inner}
        onScroll={handleScroll}
        ref={handleRef}
        style={innerStyle}
      >
        <div
          className={cssMap.content}
          style={contentWidth && { width: contentWidth }}
        >
          {children}
        </div>
      </div>
      {scrollButtons}
      {scrollBarsAreVisible && scrollBars}
    </div>
  );
});

ScrollBox.propTypes = {
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  ScrollBox content
   */
  children: PropTypes.node,
  /**
   *  ScrollBox content width, any CSS length string
   */
  contentWidth: PropTypes.string,
  /**
   *  ScrollBox height, any CSS length string
   */
  height: PropTypes.string,
  /**
   *  mouseOver callback function
   */
  onMouseOver: PropTypes.func,
  /**
   *  mouseOut callback function
   */
  onMouseOut: PropTypes.func,
  /**
   *  on Thumb Drag Start horizontal callback function
   */
  onThumbDragStartX: PropTypes.func,
  /**
   *  on Thumb Drag End horizontal callback function
   */
  onThumbDragEndX: PropTypes.func,
  /**
   *  on Thumb Drag Start vertical callback function
   */
  onThumbDragStartY: PropTypes.func,
  /**
   *  on Thumb Drag End vertical callback function
   */
  onThumbDragEndY: PropTypes.func,
  /**
   *  scroll down button click callback function
   */
  onClickScrollDown: PropTypes.func,
  /**
   *  scroll left button click callback function
   */
  onClickScrollLeft: PropTypes.func,
  /**
   *  scroll right button click callback function
   */
  onClickScrollRight: PropTypes.func,
  /**
   *  scroll up button click callback function
   */
  onClickScrollUp: PropTypes.func,
  /**
   *  Scroll direction
   */
  scroll: PropTypes.oneOf(["horizontal", "vertical", "both"]),
  /**
   *  Amount of pixels to scroll by
   */
  scrollAmount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  /**
   *   ScrollBox padding
   */
  padding: PropTypes.oneOfType([
    PropTypes.oneOf(["none", "S", "M", "L", "XL", "XXL"]),
    PropTypes.arrayOf(PropTypes.oneOf(["none", "S", "M", "L", "XL", "XXL"]))
  ]),
  /**
   *  Display Scroll bars
   */
  scrollBarsAreVisible: PropTypes.bool,
  /**
   * DOM element "Scrollbox inner"
   */
  scrollBoxRef: PropTypes.string,
  /**
   *  Display Scroll down icon
   */
  scrollDownIsVisible: PropTypes.bool,
  /**
   *  Display Scroll down icon
   */
  scrollIndicatorVariant: PropTypes.oneOf(["circle", "gradient"]),
  /**
   *  Display Scroll left icon
   */
  scrollLeftIsVisible: PropTypes.bool,
  /**
   *  Display Scroll right icon
   */
  scrollRightIsVisible: PropTypes.bool,
  /**
   *  Display Scroll up icon
   */
  scrollUpIsVisible: PropTypes.bool,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

ScrollBox.defaultProps = {
  children: undefined,
  className: undefined,
  contentWidth: undefined,
  cssMap: undefined,
  height: undefined,
  onClickScrollDown: undefined,
  onClickScrollLeft: undefined,
  onClickScrollRight: undefined,
  onClickScrollUp: undefined,
  onMouseOut: undefined,
  onMouseOver: undefined,
  onThumbDragEndX: undefined,
  onThumbDragEndY: undefined,
  onThumbDragStartX: undefined,
  onThumbDragStartY: undefined,
  padding: "none",
  scroll: "both",
  scrollAmount: undefined,
  scrollBarsAreVisible: true,
  scrollBoxRef: undefined,
  scrollDownIsVisible: false,
  scrollIndicatorVariant: "circle",
  scrollLeftIsVisible: false,
  scrollRightIsVisible: false,
  scrollUpIsVisible: false,
  style: undefined
};

ScrollBox.displayName = componentName;

export default ScrollBox;
