/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children, forwardRef, useMemo, useState } from "react";
import PropTypes from "prop-types";
import useUncontrolled from "uncontrollable/hook";
import { escapeRegExp, uniq } from "lodash";

import { ListBox, ScrollBox } from "..";

import Popup from "../Popup";
import PopperWrapper from "../PopperWrapper";
import {
  handleAllEvents,
  callWithValue,
  useId,
  useThemeClasses
} from "../utils";
import { buildTagsFromValues } from "./utils";
import { addPrefix } from "../ComboBox/utils";

/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
function getIndex(id, options = []) {
  return options.findIndex(opt => opt.id === id);
}

/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
function getOption(id, options = []) {
  return options.find(opt => opt.id === id);
}

/**
 * normalize array of options or value
 *
 * @param   {Array} options options to normalize
 *
 * @return  {Array} normalized options
 */
function normalizeOptions(options) {
  if (!Array.isArray(options)) return;

  return options.map(opt =>
    typeof opt === "object" ? opt : { id: opt, text: opt }
  );
}

const componentName = "TagInput";

const TagInput = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);
  const id = useId(componentName, props);

  const {
    children,
    hasError,
    isDisabled,
    isReadOnly,
    onChange,
    onChangeInput,
    placeholder,
    popperContainer,
    style,
    value,
    ...restProps
  } = useUncontrolled(props, { value: "onChange" });

  const [activeOption, setActiveOption] = useState(undefined);
  const [filteredOptionsState, setFilteredOptionsState] = useState(undefined);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const options = useMemo(() => normalizeOptions(props.suggestions) || [], [
    props.suggestions
  ]);

  const filteredOptions = useMemo(() => filteredOptionsState || options, [
    options,
    filteredOptionsState
  ]);

  const enterTags = () => {
    let finalTags = [];

    if (props.split) {
      finalTags = inputValue
        .split(props.split)
        .map(singleValue => enterNewTag(singleValue));

      finalTags = finalTags.filter(item => typeof item !== "undefined");
      finalTags = uniq([...value, ...finalTags]);
    } else {
      finalTags = enterNewTag(inputValue);
      finalTags = finalTags ? [...value, enterNewTag(inputValue)] : value;
    }

    setActiveOption(undefined);
    setFilteredOptionsState(filterOptions(finalTags));
    setInputValue("");
    onChange(finalTags);
  };

  const enterNewTag = singleValue => {
    let newTag;

    if (!value.find(tag => tag === singleValue)) {
      if (activeOption) {
        const option = getOption(activeOption, filteredOptions);

        newTag = value.indexOf(activeOption) !== -1 ? inputValue : option.text;
      } else if (singleValue) {
        newTag = singleValue;
      }
    }

    return newTag;
  };

  const filterOptions = tags =>
    options.filter(option => !tags.includes(option.text));

  const handleBlur = () => {
    setIsOpen(false);
    enterTags();
  };

  const handleChangeInput = newValue => {
    const newFilteredOptions = options.filter(({ text }) =>
      text.match(new RegExp(escapeRegExp(newValue), "i"))
    );

    const newActiveOption =
      newValue && newFilteredOptions.length
        ? newFilteredOptions[0].id
        : undefined;

    setActiveOption(newActiveOption);
    setFilteredOptionsState(newFilteredOptions);
    setInputValue(newValue);
  };

  const handleClickClose = optId => {
    const newTags = value.filter(tag => tag !== optId);
    onChange(newTags);
    setFilteredOptionsState(filterOptions(newTags));
  };

  const handleClickOption = optId => {
    const option = getOption(optId, filteredOptions);
    const newTags = [...value, option.text];
    setActiveOption(undefined);
    setFilteredOptionsState(filterOptions(newTags));
    setInputValue("");
    onChange(newTags);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = e => {
    const { key } = e;

    if (key === "Backspace") {
      if (!inputValue) {
        const newTags = value.slice(0, -1);
        onChange(newTags);
        setFilteredOptionsState(filterOptions(newTags));
      }
    }
    if (key === "Enter") {
      enterTags();
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      e.preventDefault();

      if (isOpen && filteredOptions.length) {
        const minIndex = 0;
        const maxIndex = filteredOptions.length - 1;

        let activeIndex = getIndex(activeOption, filteredOptions);

        activeIndex =
          key === "ArrowUp"
            ? Math.max(activeIndex - 1, minIndex)
            : Math.min(activeIndex + 1, maxIndex);

        setActiveOption(filteredOptions[activeIndex].id);
      }

      setIsOpen(true);
    }
  };

  const handleMouseOutOption = () => {
    setActiveOption(undefined);
  };

  const handleMouseOverOption = optId => {
    setActiveOption(optId);
  };

  const listBoxOptions = filteredOptions.reduce((result, opt) => {
    if (!value.find(tag => tag === opt.id)) {
      result.push(opt);
    }
    return result;
  }, []);

  const dropdownContent = listBoxOptions.length > 0 && (
    <ScrollBox height="50vh" scroll="vertical">
      <ListBox
        activeOption={activeOption}
        id={addPrefix("listbox", id)}
        isFocusable={false}
        onClickOption={handleClickOption}
        onMouseOutOption={handleMouseOutOption}
        onMouseOverOption={handleMouseOverOption}
        options={listBoxOptions}
      />
    </ScrollBox>
  );

  let items = children
    ? Children.toArray(children)
    : buildTagsFromValues(value);

  items = items.map(tag =>
    React.cloneElement(tag, {
      ...tag.props,
      isDisabled: isDisabled || tag.props.isDisabled,
      isReadOnly: isReadOnly || tag.props.isReadOnly,
      onClick: handleClickClose
    })
  );

  return (
    <PopperWrapper
      popperContainer={popperContainer}
      isVisible={listBoxOptions.length > 0 && isOpen}
      matchRefWidth
      popper={popperProps => (
        <Popup hasError={hasError} {...popperProps}>
          {dropdownContent}
        </Popup>
      )}
      popperOffset="s"
      popperPosition="bottom"
      ref={ref}
      style={style}
    >
      {refProps => (
        <label
          {...handleAllEvents(restProps)}
          className={cssMap.main}
          htmlFor={id}
          {...refProps}
        >
          {items}
          <input
            className={cssMap.input}
            disabled={isDisabled}
            id={id}
            onBlur={handleBlur}
            onChange={callWithValue(handleChangeInput, onChangeInput)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly={isReadOnly}
            type="text"
            value={inputValue}
          />
        </label>
      )}
    </PopperWrapper>
  );
});

TagInput.propTypes = {
  /**
   * Node containing Tag components ( overrides value prop )
   */
  children: PropTypes.node,
  /**
   *  CSS class name
   */
  className: PropTypes.string,
  /**
   *  id of the DOM element used as container for popup listbox
   */
  popperContainer: PropTypes.string,
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
   *  Tag suggestions
   */
  suggestions: PropTypes.arrayOf(PropTypes.string),
  /**
   *  String or Regex Pattern to split tags from an unique value
   */
  split: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)])
  ),
  /**
   * Array of strings to build Tag components
   */
  value: PropTypes.arrayOf(PropTypes.string),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

TagInput.defaultProps = {
  children: undefined,
  className: undefined,
  cssMap: undefined,
  defaultValue: [],
  hasError: false,
  id: undefined,
  isDisabled: false,
  isReadOnly: false,
  onChange: undefined,
  placeholder: undefined,
  popperContainer: undefined,
  style: undefined,
  suggestions: undefined,
  split: undefined,
  value: undefined
};

TagInput.displayName = componentName;

export default TagInput;
