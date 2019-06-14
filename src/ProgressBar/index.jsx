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

import { handleAllEvents, useThemeClasses } from "../utils";

const componentName = "ProgressBar";

const ProgressBar = forwardRef((props, ref) => {
  const { percentage, style, ...restProps } = props;

  const cssMap = useThemeClasses(componentName, props);

  return (
    <div
      {...handleAllEvents(restProps)}
      className={cssMap.default}
      style={style}
    >
      {percentage > 0 && (
        <div style={{ width: `${percentage}%` }} className={cssMap.fill} />
      )}
    </div>
  );
});

ProgressBar.propTypes = {
  /**
   *  Current percentage value
   */
  percentage: PropTypes.number,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

ProgressBar.defaultProps = {
  percentage: 0,
  style: undefined
};

ProgressBar.displayName = componentName;

export default ProgressBar;
