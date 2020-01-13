/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children, forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { uniq } from "lodash";

import { attachEvents, callMultiple, useId, useThemeClasses } from "../utils";
import { buildTagsFromValues, useValueState } from "./utils";

const TagInput = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(TagInput.displayName, props);
  const id = useId(TagInput.displayName, props);
  const [valueState, handleChange] = useValueState(props);

  const {
    children,
    isDisabled,
    isReadOnly,
    onBlur,
    onKeyDown,
    placeholder,
    split,
    style,
    value
  } = props;

  const [inputValue, setInputValue] = useState("");

  const parseInput = () =>
    (split ? inputValue.split(split) : [inputValue]).filter(Boolean);

  const handleBlurInput = () => {
    if (!inputValue) {
      return;
    }
    const newValues = uniq([...valueState, ...parseInput()]);
    handleChange(newValues);
    setInputValue("");
  };
  const handleClickDelete = removedValue => {
    if (isReadOnly) {
      return;
    }
    const newValues = valueState.filter(value => value !== removedValue);
    handleChange(newValues);
  };

  const handleKeyDownInput = ({ key }) => {
    if (key === "Backspace" && !inputValue) {
      const newValues = valueState.slice(0, -1);
      handleChange(newValues);
    } else if (key === "Enter" && inputValue) {
      const newValues = uniq([...valueState, ...parseInput()]);
      handleChange(newValues);
      setInputValue("");
    }
  };

  const tags = children
    ? Children.toArray(children)
    : buildTagsFromValues(value || valueState);

  return (
    <label
      {...attachEvents(props)}
      className={cssMap.main}
      htmlFor={id}
      ref={ref}
      style={style}
    >
      {tags.map(tag =>
        React.cloneElement(tag, {
          ...tag.props,
          isDisabled: isDisabled || tag.props.isDisabled,
          onClickDelete: handleClickDelete
        })
      )}
      <input
        autoComplete="off"
        className={cssMap.input}
        disabled={isDisabled}
        id={id}
        onBlur={callMultiple(handleBlurInput, onBlur)}
        onChange={e => {
          e.stopPropagation();
          setInputValue(e.target.value);
        }}
        onKeyDown={callMultiple(handleKeyDownInput, onKeyDown)}
        placeholder={tags && tags.length ? undefined : placeholder}
        readOnly={isReadOnly}
        type="text"
        value={inputValue}
      />
    </label>
  );
});

TagInput.propTypes = {
  /**
   * Tag components ( overrides value prop )
   */
  children: PropTypes.node,
  /**
   *  CSS class name
   */
  className: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Initial value (when component is uncontrolled)
   */
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  /**
   *  Display as error/invalid
   */
  hasError: PropTypes.bool,
  /**
   *  Component id
   */
  id: PropTypes.string,
  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  Display as read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   *  Change callback function
   */
  onChange: PropTypes.func,
  /**
   *  Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   *  String or regex pattern to split text input into tags
   */
  split: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)]),
  /**
   * Array of strings or objects to build Tag components
   */
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

TagInput.defaultProps = {
  children: undefined,
  className: undefined,
  cssMap: undefined,
  defaultValue: undefined,
  hasError: false,
  id: undefined,
  isDisabled: false,
  isReadOnly: false,
  onChange: undefined,
  placeholder: undefined,
  split: undefined,
  style: undefined,
  value: undefined
};

TagInput.displayName = "TagInput";

export default TagInput;
