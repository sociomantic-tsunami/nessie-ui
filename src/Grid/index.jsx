/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { attachEvents, useThemeClasses, useThemeVars } from "../utils";

const componentName = "Grid";

const Grid = forwardRef((props, ref) => {
  const {
    alignContent,
    alignItems,
    autoColumns,
    autoFlow,
    autoRows,
    children,
    columns,
    gap,
    justifyContent,
    justifyItems,
    rows,
    style,
    templateColumns,
    templateRows
  } = props;

  const cssMap = useThemeClasses(componentName, props);
  const { spacing } = useThemeVars();

  return (
    <div
      {...attachEvents(props)}
      className={cssMap.main}
      ref={ref}
      style={{
        alignContent,
        alignItems,
        gridAutoColumns: autoColumns,
        gridAutoFlow: autoFlow,
        gridAutoRows: autoRows,
        gridGap: Array.isArray(gap)
          ? `${spacing[gap[0]]} ${spacing[gap[1]]}`
          : spacing[gap],
        gridTemplateColumns:
          templateColumns ||
          (columns ? `repeat( ${columns}, 1fr )` : undefined),
        gridTemplateRows:
          templateRows || (rows ? `repeat( ${rows}, 1fr )` : undefined),
        justifyContent,
        justifyItems,
        ...style
      }}
    >
      {children}
    </div>
  );
});

Grid.propTypes = {
  /**
   * Block-axis (usually vertical) alignment of the grid content
   */
  alignContent: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  /**
   * Block-axis (usually vertical) alignment of the grid items
   */
  alignItems: PropTypes.oneOf(["start", "center", "end", "stretch"]),

  /**
   * Defines the size of implicit grid columns
   */
  autoColumns: PropTypes.string,
  /**
   * Controls placement of items outside the explicit grid
   */
  autoFlow: PropTypes.oneOf(["row", "column"]),
  /**
   * Defines the size of implicit grid rows
   */
  autoRows: PropTypes.string,
  /**
   *  Grid content
   */
  children: PropTypes.node,
  /**
   *  CSS class name
   */
  className: PropTypes.string,
  /**
   *  Number of columns in explicit grid (integer > 0)
   */
  columns: PropTypes.number,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Gap between rows and/or columns
   */
  gap: PropTypes.oneOfType(
    PropTypes.oneOf(["none", "s", "m", "l", "xl"]),
    PropTypes.arrayOf([PropTypes.oneOf(["none", "s", "m", "l", "xl"])])
  ),
  /**
   * Inline-axis (usually horizontal) alignment of the grid content
   */
  justifyContent: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  /**
   * Inline-axis (usually horizontal) alignment of the grid items
   */
  justifyItems: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  /**
   *  Number of rows in explcit grid (integer > 0)
   */
  rows: PropTypes.number,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string),
  /**
   *  Column definitions for explicit grid
   */
  templateColumns: PropTypes.string,
  /**
   *  Row definitions for explicit grid
   */
  templateRows: PropTypes.string
};

Grid.defaultProps = {
  alignContent: undefined,
  alignItems: undefined,
  autoColumns: undefined,
  autoFlow: undefined,
  autoRows: undefined,
  children: undefined,
  className: undefined,
  columns: undefined,
  cssMap: undefined,
  gap: "m",
  justifyContent: undefined,
  justifyItems: undefined,
  rows: undefined,
  style: undefined,
  templateColumns: undefined,
  templateRows: undefined
};

Grid.displayName = componentName;

export default Grid;
