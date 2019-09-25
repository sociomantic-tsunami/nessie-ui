/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document, addEventListener, removeEventListener */

import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef
} from "react";
import ReactDOM from "react-dom";
import { Manager, Reference, Popper } from "react-popper";
import PropTypes from "prop-types";

import { useThemeVars } from "../utils";

const componentName = "PopperWrapper";

const PopperWrapper = forwardRef((props, forwardedRef) => {
  const {
    children,
    container,
    isVisible,
    matchRefWidth,
    onClickOutside,
    popper,
    popperOffset,
    popperPosition,
    ...restProps
  } = props;

  const referenceRef = useRef();
  const popperRef = useRef();

  const { spacing } = useThemeVars();
  const offset = spacing[popperOffset];

  useEffect(() => {
    if (isVisible && onClickOutside) {
      addEventListener("mousedown", handleClickOutSide);

      return () => {
        removeEventListener("mousedown", handleClickOutSide);
      };
    }
  }, [isVisible, onClickOutside, handleClickOutSide]);

  const handleClickOutSide = useCallback(
    e => {
      if (
        !(
          referenceRef.current.contains(e.target) ||
          popperRef.current.contains(e.target)
        )
      ) {
        onClickOutside();
      }
    },
    [onClickOutside]
  );

  const renderPopup = useCallback(
    ({ ref, style: popperStyle }) => {
      const popperProps = {
        style: {
          ...(matchRefWidth && { width: referenceRef.current.clientWidth }),
          ...popperStyle
        },
        ref
      };
      if (typeof popper === "function") {
        return popper(popperProps);
      }
      if (isValidElement(popper)) {
        return cloneElement(popper, popperProps);
      }
      return <div {...popperProps}>{children}</div>;
    },
    [children, matchRefWidth, popper]
  );

  const renderReference = useCallback(
    ({ ref }) => {
      const referenceProps = { ref, ...restProps };
      if (typeof children === "function") {
        return children(referenceProps);
      }
      if (isValidElement(children)) {
        return cloneElement(children, referenceProps);
      }
      return <div {...referenceProps}>{children}</div>;
    },
    [children, ...Object.values(restProps)]
  );

  let popup = popper && (
    <Popper
      key={offset}
      placement={popperPosition}
      innerRef={ref => {
        if (popper.ref) popper.ref.current = ref;
        popperRef.current = ref;
      }}
      modifiers={offset ? { offset: { offset: `0, ${offset}` } } : undefined}
    >
      {renderPopup}
    </Popper>
  );

  const containerEl = document.getElementById(container);
  popup = containerEl ? ReactDOM.createPortal(popup, containerEl) : popup;

  return (
    <Manager>
      <Reference
        innerRef={ref => {
          if (children.ref) children.ref.current = ref;
          referenceRef.current = ref;
          if (forwardedRef) {
            // eslint-disable-next-line no-param-reassign
            forwardedRef.current = ref;
          }
        }}
      >
        {renderReference}
      </Reference>
      {isVisible && popup}
    </Manager>
  );
});

PopperWrapper.propTypes = {
  /**
   *  Reference node (render function or element)
   */
  children: PropTypes.oneOfType(PropTypes.func, PropTypes.element),
  /**
   *  id of the DOM element used as container
   */
  container: PropTypes.string,
  /**
   *  Show / Hide popper
   */
  isVisible: PropTypes.bool,
  /**
   *  pop up width matches reference width
   */
  matchRefWidth: PropTypes.bool,
  /**
   *  Click Outside callback: ( e ) => ...
   */
  onClickOutside: PropTypes.func,
  /**
   *  Popper node (render function or element)
   */
  popper: PropTypes.oneOfType(PropTypes.func, PropTypes.element),
  /**
   *  Popper offset
   */
  popperOffset: PropTypes.oneOf(["s", "m", "l", "xl", "none"]),
  /**
   *  Popper position
   */
  popperPosition: PropTypes.oneOf([
    "auto",
    "auto-start",
    "auto-end",
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "right",
    "right-start",
    "right-end"
  ]),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

PopperWrapper.defaultProps = {
  children: undefined,
  container: "nessie-overlay",
  isVisible: false,
  matchRefWidth: undefined,
  onClickOutside: undefined,
  popper: undefined,
  popperOffset: "none",
  popperPosition: "auto",
  style: undefined
};

PopperWrapper.displayComponent = componentName;

export default PopperWrapper;
