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

import { attachEvents, useThemeClasses } from "../utils";

const componentName = "Grid";

const Grid = forwardRef((props, ref) => {
  const {
    autoCols,
    autoRows,
    children,
    columns,
    customColumns,
    customRows,
    rows,
    style
  } = props;

  const cssMap = useThemeClasses(componentName, props);

  return (
    <div
      {...attachEvents(props)}
      className={cssMap.main}
      ref={ref}
      style={{
        gridAutoColumns: autoCols,
        gridAutoRows: autoRows,
        gridTemplateColumns: customColumns || `repeat( ${columns}, 1fr )`,
        gridTemplateRows: customRows || `repeat( ${rows}, 1fr )`,
        ...style
      }}
    >
      {children}
    </div>
  );
});

Grid.propTypes = {
  /**
   * Vertical alignment of the grid items
   */
  align: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  /**
   * Defines the size of implicitly set columns
   */
  autoCols: PropTypes.string,
  /**
   * Controls where to auto place new grid items if their place is
   * undefined
   */
  autoFlow: PropTypes.oneOf(["row", "col"]),
  /**
   * Defines the size of implicitly set rows
   */
  autoRows: PropTypes.string,
  /**
   *  Grid content (Columns)
   */
  children: PropTypes.node,
  /**
   *  CSS class name
   */
  className: PropTypes.string,
  /**
   *  Column gap
   */
  columnGap: PropTypes.oneOf(["none", "S", "M", "L"]),
  /**
   *  Number of columns - should be an integer > 0
   */
  columns: PropTypes.number,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Custom sizes of columns
   */
  customColumns: PropTypes.string,
  /**
   *  Custom sizes of rows
   */
  customRows: PropTypes.string,
  /**
   * Horizontal alignment of the grid items
   */
  justify: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  /**
   *  Row gap
   */
  rowGap: PropTypes.oneOf(["none", "S", "M", "L"]),
  /**
   *  Number of rows - should be an integer > 0
   */
  rows: PropTypes.number,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

Grid.defaultProps = {
  align: "stretch",
  autoCols: undefined,
  autoFlow: "row",
  autoRows: undefined,
  children: undefined,
  className: undefined,
  columnGap: "M",
  columns: undefined,
  cssMap: undefined,
  customColumns: undefined,
  customRows: undefined,
  justify: "stretch",
  rowGap: "M",
  rows: undefined,
  style: undefined
};

Grid.displayName = componentName;

export default Grid;
