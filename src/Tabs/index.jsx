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
import useUncontolled from "uncontrollable/hook";

import { ScrollBox, TabButton } from "..";

import { handleAllEvents, useThemeClasses } from "../utils";

const componentName = "Tabs";

const Tabs = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);
  const {
    children,
    onChange,
    secondaryControls,
    style,
    value,
    ...restProps
  } = useUncontolled(props, { value: "onChange" });

  const tabs = React.Children.toArray(children);

  const tabButtons = tabs.map((tab, index) => {
    const { isDisabled, label } = tab.props;
    const isActive = value === index;

    return (
      <TabButton
        isActive={isActive}
        isDisabled={isDisabled || isActive}
        key={label || index}
        label={label}
        onClick={() => onChange(index)}
      />
    );
  });

  return (
    <div
      {...handleAllEvents(restProps)}
      className={cssMap.main}
      ref={ref}
      style={style}
    >
      <div className={cssMap.header}>
        <ScrollBox className={cssMap.tabsContainer} scroll="horizontal">
          <div className={cssMap.tabs}>{tabButtons}</div>
        </ScrollBox>
        {secondaryControls && (
          <div className={cssMap.secondaryControls}>{secondaryControls}</div>
        )}
      </div>
      <div className={cssMap.content}>{tabs[value]}</div>
    </div>
  );
});

Tabs.propTypes = {
  /**
   *  A set of <Tab> components
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
   *  Default tab index (when uncontrolled)
   */
  defaultValue: PropTypes.number,
  /**
   *  Change callback function: ( newValue ) => ...
   */
  onChange: PropTypes.func,
  /**
   *   Tab padding
   */
  padding: PropTypes.oneOfType([
    PropTypes.oneOf(["none", "S", "M", "L", "XL", "XXL"]),
    PropTypes.arrayOf(PropTypes.oneOf(["none", "S", "M", "L", "XL", "XXL"]))
  ]),
  /**
   *  Secondary controls to add to tabs header
   */
  secondaryControls: PropTypes.node,
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string),
  /**
   *  The active tab index
   */
  value: PropTypes.number
};

Tabs.defaultProps = {
  children: undefined,
  defaultValue: 0,
  className: undefined,
  cssMap: undefined,
  onChange: undefined,
  padding: ["none", "M"],
  secondaryControls: undefined,
  style: undefined,
  value: undefined
};

Tabs.displayName = componentName;

export default Tabs;
