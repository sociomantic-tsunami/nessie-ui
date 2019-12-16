/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { useMemo, useState } from "react";

import { Tag } from "../index";

/**
 * ## buildTagsFromValues
 * Builds an array of Tags components from an array of values
 *
 * @param   {Array.<String>|Array.<Object>} values  array of values
 *
 * @return  {Array.<ReactElement>}
 *
 */
export function buildTagsFromValues(values = []) {
  return values.map(value => {
    const props = typeof value === "object" ? value : { value: value };

    return <Tag {...props} key={props.value} />;
  });
}

export function useValueState({ children, defaultValue, onChange, value }) {
  const [state, setState] = useState(defaultValue || []);

  const result = useMemo(() => {
    if (children) {
      return children.map(child => child.props.value);
    }
    if (Array.isArray(value)) {
      return value.map(item => (typeof item === "object" ? item.value : item));
    }
    if (value === "" || value === null) {
      return [];
    }
    return state;
  }, [children, value, state]);

  const handleChange = newValue => {
    if (typeof onChange === "function") {
      onChange({ value: newValue });
    }
    setState(newValue);
  };

  return [result, handleChange];
}
