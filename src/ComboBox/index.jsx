/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import PropTypes from "prop-types";
import { escapeRegExp } from "lodash";
import useUncontrolled from "uncontrollable/hook";

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
  handleAllEvents,
  callWithValue,
  mapAria,
  useId,
  useThemeClasses
} from "../utils";
import { addPrefix, prefixOptions, removePrefix } from "./utils";

/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
const getIndex = (id, options = []) => options.findIndex(opt => opt.id === id);

/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
const getOption = (id, options = []) => options.find(opt => opt.id === id);

/**
 * normalize array of options or value
 *
 * @param   {Array} options options to normalize
 *
 * @return  {Array} normalized options
 */
const normalizeOptions = options => {
  if (!Array.isArray(options)) return;

  return options.map(opt =>
    typeof opt === "object" ? opt : { id: opt, text: opt }
  );
};

/**
 * gives correct format to the filtered options
 *
 * @param {Array} filteredOptionsIds options ids after search filter
 * @param {Array} originalOptions original options
 *
 * @return {Array} formattedOptions filtered and formatted options
 */
const optionsFormatted = (filteredOptionsIds, originalOptions) =>
  originalOptions.reduce((formattedOptions, option) => {
    if (option.options) {
      const sectionOptions = optionsFormatted(
        filteredOptionsIds,
        option.options
      );

      if (sectionOptions.length) {
        const newOptions = { ...option, options: sectionOptions };
        formattedOptions.push(newOptions);
      }
    } else if (filteredOptionsIds.includes(option.id)) {
      formattedOptions.push(option);
    }
    return formattedOptions;
  }, []);

const componentName = "ComboBox";

const ComboBox = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);
  const id = useId(componentName, props);

  const [stateActiveOption, setActiveOption] = useState(undefined);
  const [isOpen, setIsOpen] = useState(undefined);
  const [searchValue, setSearchValue] = useState(undefined);

  const scrollBoxRef = useRef(null);

  const {
    dropdownPlaceholder,
    hasError,
    inputPlaceholder,
    isDisabled,
    isMultiselect,
    isReadOnly,
    isSearchable,
    onChange,
    onChangeInput,
    options,
    popperContainer,
    style,
    value,
    ...restProps
  } = useUncontrolled(props, { value: "onChange" });

  const flatOptions = useMemo(
    () => normalizeOptions(options).flatMap(o => o.options || o),
    [options]
  );

  const filteredOptions = useMemo(
    () =>
      searchValue &&
      flatOptions.filter(({ text }) =>
        text.match(new RegExp(escapeRegExp(searchValue), "i"))
      ),
    [flatOptions, searchValue]
  );

  const activeOption = useMemo(
    () =>
      searchValue && filteredOptions.length
        ? filteredOptions[0].id
        : stateActiveOption,
    [filteredOptions, searchValue, stateActiveOption]
  );

  useEffect(() => {
    if (scrollBoxRef.current && activeOption) {
      const activeEl = document.getElementById(addPrefix(activeOption, id));

      if (
        activeEl &&
        scrollBoxRef.current.scrollHeight > scrollBoxRef.current.offsetHeight
      ) {
        const pos = activeEl.offsetTop;
        const elHeight = activeEl.offsetHeight;
        const contHeight = scrollBoxRef.current.offsetHeight;

        const min = scrollBoxRef.current.scrollTop;
        const max = min + (scrollBoxRef.current.offsetHeight - elHeight);

        if (pos < min) {
          scrollBoxRef.current.scrollTop = pos;
        } else if (pos > max) {
          scrollBoxRef.current.scrollTop = pos - (contHeight - elHeight);
        }
      }
    }
  });

  const focus = useCallback(() => {
    document.getElementById(id).focus();
  }, [id]);

  const handleFocus = useCallback(() => {
    focus();

    if (isSearchable) {
      setSearchValue("");
    }
  }, [focus, isSearchable]);

  const handleClickIcon = useCallback(() => {
    focus();
    setIsOpen(!isOpen);
  }, [focus, isOpen]);

  const handleClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClickOption = useCallback(
    optId => {
      const unprefixedId = removePrefix(optId, id);

      let newSelection = !isReadOnly ? unprefixedId : value;

      if (isMultiselect) {
        if (value) {
          newSelection = value.includes(unprefixedId)
            ? value.filter(item => item !== unprefixedId)
            : [...value, unprefixedId];
        } else {
          newSelection = [unprefixedId];
        }
      }

      setIsOpen(false);
      setSearchValue(undefined);
      onChange(newSelection);
    },
    [id, isMultiselect, isReadOnly, onChange, value]
  );

  const handleClickClose = useCallback(
    tagId => {
      const newTags = value.filter(tag => tag !== tagId);

      onChange(newTags);
      setIsOpen(false);
    },
    [onChange, value]
  );

  const handleKeyDown = useCallback(
    e => {
      const { key } = e;

      if (key === "ArrowUp" || key === "ArrowDown") {
        e.preventDefault();

        const optionsToUse = filteredOptions || flatOptions;

        if (isOpen && optionsToUse.length) {
          const minIndex = 0;
          const maxIndex = optionsToUse.length - 1;

          let activeIndex = getIndex(activeOption || value, optionsToUse);

          activeIndex =
            key === "ArrowUp"
              ? Math.max(activeIndex - 1, minIndex)
              : Math.min(activeIndex + 1, maxIndex);

          setActiveOption(optionsToUse[activeIndex].id);
        }

        setIsOpen(true);
      } else if (key === "Escape") {
        setActiveOption(undefined);
        setIsOpen(false);
        setSearchValue(undefined);
      } else if (key === "Enter") {
        if (!isReadOnly) {
          let newSelection;

          if (activeOption && isMultiselect) {
            if (value) {
              newSelection = value.includes(activeOption)
                ? value.filter(item => item !== activeOption)
                : [...value, activeOption];
            } else {
              newSelection = [activeOption];
            }
          } else {
            newSelection = activeOption;
          }

          setActiveOption(undefined);
          setIsOpen(!isOpen);
          setSearchValue(undefined);

          if (newSelection) {
            onChange(newSelection);
          }
        }
      }
    },
    [
      activeOption,
      filteredOptions,
      flatOptions,
      isMultiselect,
      isOpen,
      isReadOnly,
      onChange,
      value
    ]
  );

  const handleMouseOutOption = useCallback(() => {
    setActiveOption(undefined);
  }, []);

  const handleMouseOverOption = useCallback(
    optId => {
      const unprefixedId = removePrefix(optId, id);

      setActiveOption(getOption(unprefixedId, flatOptions).id);
    },
    [flatOptions, id]
  );

  const handleBlur = useCallback(() => {
    setIsOpen(false);
    setActiveOption(undefined);
    setSearchValue(undefined);
  }, []);

  const selectedOption = getOption(value, flatOptions);
  const selectedText = selectedOption ? selectedOption.text : "";

  let tags;

  if (isMultiselect && value) {
    tags = value.reduce((result, itemId) => {
      const currentOption = getOption(itemId, flatOptions);
      if (currentOption) {
        result.push(
          <Tag
            id={itemId}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            key={itemId}
            label={currentOption.text}
            onClick={handleClickClose}
          />
        );
      }
      return result;
    }, []);
  }

  let optionsToShow = normalizeOptions(options) || [];

  if (filteredOptions) {
    optionsToShow = optionsFormatted(
      filteredOptions.map(option => option.id),
      normalizeOptions(options)
    );
  }

  let dropdownContent;

  if (optionsToShow.length) {
    dropdownContent = (
      <ScrollBox height="50vh" scroll="vertical" scrollBoxRef={scrollBoxRef}>
        <ListBox
          activeOption={addPrefix(activeOption, id)}
          id={addPrefix("listbox", id)}
          isFocusable={false}
          isMultiselect={isMultiselect}
          onClickOption={handleClickOption}
          onMouseOutOption={handleMouseOutOption}
          onMouseOverOption={handleMouseOverOption}
          options={prefixOptions(optionsToShow, id)}
          value={
            isMultiselect && value
              ? value.map(optId => addPrefix(optId, id))
              : addPrefix(value, id)
          }
        />
      </ScrollBox>
    );
  } else {
    dropdownContent = (
      <Text noWrap overflowIsHidden role="subtle" variant="RegularIt">
        {dropdownPlaceholder}
      </Text>
    );
  }

  return (
    <PopperWrapper
      popperContainer={popperContainer}
      isVisible={isOpen}
      matchRefWidth
      popper={popperProps => (
        <Popup
          {...popperProps}
          hasError={hasError}
          padding={optionsToShow.length ? "none" : "S"}
        >
          {dropdownContent}
        </Popup>
      )}
      popperOffset="s"
      popperPosition="bottom"
      ref={ref}
    >
      {({ ref: innerRef }) => (
        <label
          {...handleAllEvents(restProps)}
          className={cssMap.main}
          htmlFor={id}
          ref={innerRef}
          style={style}
        >
          {tags}
          <input
            {...mapAria({
              activeDescendant: activeOption && addPrefix(activeOption, id),
              autocomplete: "list",
              expanded: isOpen,
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
            onBlur={handleBlur}
            onChange={callWithValue(onChangeInput, newValue =>
              newValue.toLowerCase()
            )}
            onClick={handleClick}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={inputPlaceholder}
            readOnly={!isSearchable || !isOpen}
            spellCheck={false}
            value={isOpen && isSearchable ? searchValue : selectedText}
          />
          <IconButton
            className={cssMap.icon}
            iconType={isOpen ? "chevron-up" : "chevron-down"}
            isDisabled={isDisabled}
            isFocusable={false}
            onClick={handleClickIcon}
          />
        </label>
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
  options: [],
  popperContainer: undefined,
  style: undefined,
  value: undefined
};

ComboBox.displayName = componentName;

export default ComboBox;
