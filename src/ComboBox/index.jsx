/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import { castArray, clamp, escapeRegExp, xor } from "lodash";
import { useUncontrolled } from "uncontrollable";

import {
  IconButton,
  ListBox,
  PopperWrapper,
  Popup,
  ScrollBox,
  Tag,
  Text
} from "..";

import {
  attachEvents,
  callMultiple,
  mapAria,
  useId,
  useThemeClasses
} from "../utils";

import { addPrefix, removePrefix } from "./utils";

const ComboBox = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(ComboBox.displayName, props);
  const id = useId(ComboBox.displayName, props);

  const {
    defaultValue,
    dropdownPlaceholder,
    hasError,
    inputPlaceholder,
    isDisabled,
    isMultiselect,
    isReadOnly,
    isSearchable,
    onBlur,
    onChange,
    onChangeInput,
    onClick,
    onFocus,
    options: rawOptions,
    popperContainer,
    style,
    value: rawValue,
    ...restProps
  } = useUncontrolled(props, { value: "onChange" });

  // normalize the options passed as prop
  const options = useMemo(
    () =>
      Array.isArray(rawOptions)
        ? rawOptions.map(opt =>
            typeof opt === "object"
              ? opt
              : { id: String(opt), text: String(opt) }
          )
        : [],
    [rawOptions]
  );

  // flat array of all options
  const flatOptions = useMemo(
    () => options.flatMap(opt => opt.options || opt),
    [options]
  );

  // normalize the value passed as prop
  const value = rawValue ? castArray(rawValue) : [];

  // flat array of selected options
  const selectedOptions = useMemo(
    () =>
      value.map(
        optId =>
          flatOptions.find(({ id }) => id === optId) || {
            id: optId,
            text: optId
          }
      ),
    [flatOptions, value]
  );

  // reducer is defined inline to make use of prop values. it should still be a
  // pure function tho, so make sure to handle side effects elsewhere!
  const reducer = (state, action) => {
    // uncomment to log all actions
    // console.log(action);
    switch (action.type) {
      case "toggle": {
        return {
          ...state,
          isOpen: action.payload !== undefined ? action.payload : !state.isOpen
        };
      }
      case "clickOption": {
        return {
          ...state,
          ...((!isMultiselect || state.inputValue) && { activeIndex: null }),
          ...(!isMultiselect && { isOpen: false }),
          inputValue: "",
          matchedOptions: flatOptions
        };
      }
      case "arrowUp": {
        return {
          ...state,
          activeIndex: clamp(
            state.activeIndex - 1,
            0,
            state.matchedOptions.length - 1
          ),
          isOpen: true
        };
      }
      case "arrowDown": {
        return {
          ...state,
          activeIndex: clamp(
            state.activeIndex + 1,
            0,
            state.matchedOptions.length - 1
          ),
          isOpen: true
        };
      }
      case "mouseOverOption": {
        return {
          ...state,
          activeIndex: action.payload
        };
      }
      case "escape": {
        return {
          ...state,
          activeIndex: null,
          inputValue: "",
          isOpen: false,
          matchedOptions: flatOptions
        };
      }
      case "enter": {
        return {
          ...state,
          ...((!isMultiselect || state.inputValue) && { activeIndex: null }),
          inputValue: "",
          isOpen: isMultiselect ? true : !state.isOpen,
          matchedOptions: flatOptions
        };
      }
      case "focus":
        return {
          ...state,
          activeIndex: null,
          inputValue: "",
          matchedOptions: flatOptions
        };
      case "blur":
        return {
          ...state,
          activeIndex: null,
          inputValue: "",
          isOpen: false,
          matchedOptions: flatOptions
        };
      case "type": {
        const newValue = action.payload;
        const trimmed = newValue.trim();
        const pattern = trimmed ? new RegExp(escapeRegExp(trimmed), "i") : null;

        const matchedOptions = pattern
          ? flatOptions.filter(opt => opt.text.match(pattern))
          : flatOptions;

        return {
          ...state,
          activeIndex: matchedOptions.length ? 0 : null,
          inputValue: newValue,
          matchedOptions
        };
      }
      default:
        return state;
    }
  };
  const initialState = {
    activeIndex: null,
    matchedOptions: flatOptions,
    inputValue: "",
    isOpen: false
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const activeOption =
    state.activeIndex > -1 ? state.matchedOptions[state.activeIndex] : null;

  // util to toggle option in current selection
  const changeValue = optId => {
    return isMultiselect ? xor(value, [optId]) : optId;
  };

  // “actions creators” with side effects
  const toggle = open => {
    dispatch({ type: "toggle", ...(open !== undefined && { payload: open }) });
    document.getElementById(id).focus();
  };
  const clickOption = optId => {
    if (!isReadOnly) {
      onChange({ value: changeValue(optId) });
    }
    dispatch({ type: "clickOption", payload: optId });
    document.getElementById(id).focus();
  };
  const enter = () => {
    if (!isReadOnly && activeOption) {
      onChange({ value: changeValue(activeOption.id) });
    }
    dispatch({ type: "enter" });
  };

  // recursive util for creating options to pass to the ListBox
  const createOptions = options =>
    options.reduce((result, opt) => {
      if (opt.options) {
        const filteredOptions = createOptions(opt.options);
        if (filteredOptions.length) {
          result.push({ ...opt, options: filteredOptions });
        }
      } else {
        const index = state.matchedOptions.indexOf(opt);
        if (index > -1) {
          result.push({
            ...opt,
            id: addPrefix(opt.id, id),
            isSelected: value.includes(opt.id),
            onClick: ({ id: optId }) => clickOption(removePrefix(optId, id)),
            onMouseOver: () =>
              dispatch({
                type: "mouseOverOption",
                payload: index
              })
          });
        }
      }
      return result;
    }, []);

  const popupContent = state.matchedOptions.length ? (
    <ScrollBox height="50vh" scroll="vertical">
      <ListBox
        activeOption={activeOption ? addPrefix(activeOption.id, id) : null}
        id={addPrefix("listbox", id)}
        isFocusable={false}
        isMultiselect={isMultiselect}
        options={createOptions(options)}
        value={value.map(optId => addPrefix(optId, id))}
      />
    </ScrollBox>
  ) : (
    <Text noWrap overflowIsHidden role="subtle" variant="RegularIt">
      {dropdownPlaceholder}
    </Text>
  );

  const displayValue =
    !isMultiselect && selectedOptions[0] ? selectedOptions[0].text : "";

  return (
    <PopperWrapper
      container={popperContainer}
      isVisible={state.isOpen}
      matchRefWidth
      popper={popperProps => (
        <Popup
          {...popperProps}
          padding={state.matchedOptions.length ? "none" : "S"}
        >
          {popupContent}
        </Popup>
      )}
      popperOffset="s"
      popperPosition="bottom"
      ref={ref}
    >
      {refProps => (
        <div
          {...refProps}
          {...attachEvents(restProps)}
          className={cssMap.main}
          onBlur={callMultiple(onBlur, () => dispatch({ type: "blur" }))}
          onClick={callMultiple(onClick, () => toggle(true))}
          onFocus={callMultiple(onFocus, () => dispatch({ type: "focus" }))}
        >
          {isMultiselect &&
            selectedOptions.map(option => (
              <Tag
                id={option.id}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
                key={option.id}
                label={option.text}
                onClick={(_, e) => {
                  e.stopPropagation();
                  clickOption(option.id);
                }}
              />
            ))}
          <input
            {...mapAria({
              activeDescendant: activeOption && addPrefix(activeOption.id, id),
              autocomplete: "list",
              expanded: state.isOpen,
              hasPopup: "listbox",
              owns: addPrefix("listbox", id),
              role: "combobox"
            })}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className={cssMap.input}
            disabled={isDisabled}
            id={id}
            onChange={callMultiple(onChangeInput, ({ target: { value } }) =>
              dispatch({ type: "type", payload: value })
            )}
            onKeyDown={e => {
              switch (e.key) {
                case "ArrowUp": {
                  e.preventDefault();
                  dispatch({ type: "arrowUp" });
                  return;
                }
                case "ArrowDown": {
                  e.preventDefault();
                  dispatch({ type: "arrowDown" });
                  return;
                }
                case "Escape":
                  dispatch({ type: "escape" });
                  return;
                case "Enter":
                  enter();
                  return;
                default:
                  return;
              }
            }}
            placeholder={inputPlaceholder}
            readOnly={!isSearchable || !state.isOpen}
            spellCheck={false}
            value={
              isSearchable && state.isOpen ? state.inputValue : displayValue
            }
          />
          <IconButton
            className={cssMap.icon}
            iconType={state.isOpen ? "chevron-up" : "chevron-down"}
            isDisabled={isDisabled}
            isFocusable={false}
            onClick={(_, e) => {
              e.stopPropagation();
              toggle();
            }}
          />
        </div>
      )}
    </PopperWrapper>
  );
});

ComboBox.propTypes = {
  /**
   *  Extra CSS class name
   */
  className: PropTypes.string,
  /**
   *  Default selected option id(s) (when uncontrolled)
   */
  defaultValue: PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ),
  /**
   *  id of the DOM element used as container for popup listBox
   */
  popperContainer: PropTypes.string,
  /**
   * Placeholder text to show when no dropdown list options
   */
  dropdownPlaceholder: PropTypes.string,
  /**
   *  Display as error/invalid
   */
  hasError: PropTypes.bool,
  /**
   *  Component id
   */
  id: PropTypes.string,
  /**
   *  Placeholder text
   */
  inputPlaceholder: PropTypes.string,
  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  Enables multi-select behavior
   */
  isMultiselect: PropTypes.bool,
  /**
   *  Display as read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   *  input searchable
   */
  isSearchable: PropTypes.bool,
  /**
   *  Change callback: ( { value } ) => ...
   */
  onChange: PropTypes.func,
  /**
   *  Input field change callback: ( { value } ) => ...
   */
  onChangeInput: PropTypes.func,
  /*
   * Dropdown list options
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType(PropTypes.string, PropTypes.object)
  ),
  /**
   *  Selected option id(s)
   */
  value: PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

ComboBox.defaultProps = {
  className: undefined,
  defaultValue: undefined,
  dropdownPlaceholder: "No results to show",
  hasError: false,
  id: undefined,
  inputPlaceholder: undefined,
  isDisabled: false,
  isMultiselect: false,
  isReadOnly: undefined,
  isSearchable: false,
  onChange: undefined,
  onChangeInput: undefined,
  options: undefined,
  popperContainer: undefined,
  style: undefined,
  value: undefined
};

ComboBox.displayName = "ComboBox";

export default ComboBox;
