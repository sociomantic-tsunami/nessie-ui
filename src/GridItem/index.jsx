/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */
import React, { cloneElement, forwardRef, isValidElement } from "react";
import PropTypes from "prop-types";

const componentName = "GridItem";

const GridItem = forwardRef(
  (
    { align, children, colSpan, justify, rowSpan, style, ...restProps },
    ref
  ) => {
    if (!children) return;

    const childProps = {
      style: {
        ...(align && { alignSelf: align }),
        ...(justify && { justifySelf: justify }),
        ...(colSpan && { gridColumn: `span ${colSpan}` }),
        ...(rowSpan && { gridRow: `span ${rowSpan}` }),
        ...style
      },
      ...restProps
    };

    if (typeof children === "function") {
      return children(childProps);
    }
    if (isValidElement(children)) {
      return cloneElement(children, childProps);
    }
    return <div {...childProps}>{children}</div>;
  }
);

GridItem.propTypes = {
  /**
   * Block-axis (usually vertical) alignment of the item
   */
  align: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  /**
   *  Grid item content: React node or render function
   */
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.func),
  /**
   *  Grid column span: should be an integer > 0
   */
  colSpan: PropTypes.number,
  /**
   * Inline-axis (usually horizontal) alignment of the item
   */
  justify: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  /**
   * Grid row span: should be an integer > 0
   */
  rowSpan: PropTypes.number,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

GridItem.defaultProps = {
  align: undefined,
  children: undefined,
  colSpan: undefined,
  justify: undefined,
  rowSpan: undefined,
  style: undefined
};

GridItem.displayName = componentName;

export default GridItem;
