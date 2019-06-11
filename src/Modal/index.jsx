/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { attachEvents, useThemeClasses } from "../utils";

const componentName = "Modal";

const Modal = forwardRef((props, ref) => {
  const handleClickOverlay = ({ target, currentTarget }) => {
    if (target !== currentTarget) return;

    const { onClickOverlay } = props;
    if (onClickOverlay) {
      onClickOverlay();
    }
  };

  const { children, style } = props;

  const cssMap = useThemeClasses(componentName, props);

  return (
    <div
      {...attachEvents(props, { onClick: false })}
      className={cssMap.main}
      onClick={handleClickOverlay}
      ref={ref}
      style={style}
    >
      <div className={cssMap.content}>{children}</div>
    </div>
  );
});

Modal.propTypes = {
  /**
   *  Dialog Content
   */
  children: PropTypes.node,
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Overlay onClick callback function
   */
  onClickOverlay: PropTypes.func,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

Modal.defaultProps = {
  children: undefined,
  className: undefined,
  cssMap: undefined,
  onClickOverlay: undefined,
  style: undefined
};

Modal.displayName = componentName;

export default Modal;
