/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { useContext, useMemo } from "react";

import ThemeContext from "../Theming/ThemeContext";

import { generateId } from ".";

/**
 * Builds class names from theme
 *
 * @param {String} displayName component's displayName
 * @param {Object} props component's props
 *
 * @return {Object} cssMap containing component's styles
 */
export function useThemeClasses(displayName, props) {
  const { classNames } = useContext(ThemeContext);
  const { [displayName]: cssMap } = classNames;

  return (
    props.cssMap || (typeof cssMap === "function" ? cssMap(props) : cssMap)
  );
}

/**
 * Returns Theme variables
 *
 * @return {Object} Theme variables
 */
export function useThemeVars() {
  return useContext(ThemeContext).variables;
}

/**
 * Builds ID for given component
 *
 * @param {String} displayName component's displayName
 * @param {Object} props component's props
 *
 * @return {String} generated ID
 */
export function useId(displayName, props) {
  return useMemo(() => props.id || generateId(displayName), [
    displayName,
    props.id
  ]);
}
