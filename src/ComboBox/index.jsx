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
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
}                                                 from 'react';
import PropTypes                                  from 'prop-types';
import { castArray, escapeRegExp }                from 'lodash';

import { ListBox, ScrollBox, Text }               from '..';

import TextInputWithIcon                          from '../TextInputWithIcon';
import Popup                                      from '../Popup';
import PopperWrapper                              from '../PopperWrapper';
import { generateId }                             from '../utils';
import { addPrefix, prefixOptions, removePrefix } from './utils';

/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
const getIndex = ( id, options = [] ) => (
    options.findIndex( opt => opt.id === id ) );


/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
const getOption = ( id, options = [] ) => (
    options.find( opt => opt.id === id ) );


/**
 * gives correct format to the filtered options
 *
 * @param {Array} filteredOptionsIds options ids after search filter
 * @param {Array} originalOptions original options
 *
 * @return {Array} formattedOptions filtered and formatted options
 */
const optionsFormatted = ( filteredOptionsIds, originalOptions ) => (
    originalOptions.reduce( ( formattedOptions, option ) =>
    {
        if ( option.options )
        {
            const sectionOptions = optionsFormatted(
                filteredOptionsIds,
                option.options,
            );

            if ( sectionOptions.length )
            {
                const newOptions = { ...option, options: sectionOptions };
                formattedOptions.push( newOptions );
            }
        }
        else if ( filteredOptionsIds.includes( option.id ) )
        {
            formattedOptions.push( option );
        }
        return formattedOptions;
    }, [] ) );

const useSelectedOption = ( selectedOption ) =>
{
    const [ option, setOption ] = useState( undefined );

    const setter = ( value ) =>
    {
        if ( !selectedOption )
        {
            setOption( value );
        }
    };

    return [ selectedOption || option, setter ];
};

const ComboBox = props =>
{
    const [ activeOption, setActiveOption ] = useState( undefined );
    const [ filteredOptions, setFilteredOptions ] = useState( undefined );
    const [ isOpen, setIsOpen ] = useState( undefined );
    const [ searchValue, setSearchValue ] = useState( undefined );

    const inputRef = useRef( null );
    const scrollBoxRef = useRef( null );
    const wrapperRef = useRef( null );

    const {
        className,
        dropdownPlaceholder,
        dropdownPosition,
        hasError,
        id,
        inputPlaceholder,
        isDisabled,
        isReadOnly,
        isSearchable,
        onChange,
        options,
        selectedOption,
    } = props;

    const [ optionSelected,
        setOptionSelected ] = useSelectedOption( selectedOption );

    const flatOptions = useMemo(
        () => ( options.flatMap( o => o.options || o ) ),
        [ options ],
    );

    const componentId = useMemo(
        () => ( id || generateId( 'ComoBox' ) ),
        [ id ],
    );

    useEffect( () =>
    {
        if ( scrollBoxRef.current && activeOption )
        {
            const activeEl =
                document.getElementById( addPrefix(
                    activeOption,
                    componentId,
                ) );

            if ( activeEl &&
                scrollBoxRef.current.scrollHeight >
                scrollBoxRef.current.offsetHeight )
            {
                const pos        = activeEl.offsetTop;
                const elHeight   = activeEl.offsetHeight;
                const contHeight = scrollBoxRef.current.offsetHeight;

                const min = scrollBoxRef.current.scrollTop;
                const max = min +
                  ( scrollBoxRef.current.offsetHeight - elHeight );

                if ( pos < min )
                {
                    scrollBoxRef.current.scrollTop = pos;
                }
                else if ( pos > max )
                {
                    scrollBoxRef.current.scrollTop =
                      pos - ( contHeight - elHeight );
                }
            }
        }
    } );

    const focus = useCallback( () =>
    {
        inputRef.current.focus();
    }, [ inputRef.current ] );

    const handleChangeInput = useCallback( ( { value } ) =>
    {
        const searchValueToUse = ( value || '' ).toLowerCase();

        const filteredOptionsToUse = flatOptions.filter( ( { text } ) =>
            !searchValueToUse || text.toLowerCase().indexOf(
                searchValueToUse,
            ) > -1 );

        const activeOptionToUse = ( searchValueToUse &&
            filteredOptionsToUse.length ) ?
            filteredOptionsToUse[ 0 ].id : undefined;

        setActiveOption( activeOptionToUse );
        setFilteredOptions( filteredOptionsToUse );
        setSearchValue( searchValueToUse );
    }, [ flatOptions ] );

    const handleClickIcon = useCallback( () =>
    {
        focus();
        setIsOpen( !isOpen );
    }, [ isOpen ] );

    const handleClickInput = () =>
    {
        setIsOpen( true );
    };

    const handleClickOption = useCallback( ( { id : optId } ) =>
    {
        const unprefixedId = removePrefix( optId, componentId );

        const selectedOptionToUse = !isReadOnly ? getOption(
            unprefixedId,
            flatOptions,
        ).id : optionSelected;

        if ( !isReadOnly && typeof onChange === 'function' )
        {
            onChange( { id, selectedOptionToUse } );
        }

        setActiveOption( selectedOptionToUse );
        setFilteredOptions( undefined );
        setIsOpen( false );
        setSearchValue( undefined );
        setOptionSelected( selectedOptionToUse );
    }, [ componentId, isReadOnly, flatOptions, optionSelected, onChange ] );

    const handleKeyDown = useCallback( ( { key, preventNessieDefault } ) =>
    {
        if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            preventNessieDefault();

            const optionsToUse = filteredOptions || flatOptions;

            if ( isOpen && optionsToUse.length )
            {
                const minIndex = 0;
                const maxIndex = optionsToUse.length - 1;

                let activeIndex = getIndex(
                    activeOption || optionSelected,
                    optionsToUse,
                );

                activeIndex = key === 'ArrowUp' ?
                    Math.max( activeIndex - 1, minIndex ) :
                    Math.min( activeIndex + 1, maxIndex );

                setActiveOption( optionsToUse[ activeIndex ].id );
            }

            setIsOpen( true );
        }
        else if ( key === 'Escape' )
        {
            setActiveOption( undefined );
            setFilteredOptions( undefined );
            setIsOpen( false );
            setSearchValue( undefined );
        }
        else if ( key === 'Enter' )
        {
            const selectedOptionToUse = !isReadOnly && activeOption ?
                activeOption : optionSelected;

            if ( !isReadOnly && typeof onChange === 'function' )
            {
                onChange( { id, selectedOptionToUse } );
            }

            setActiveOption( activeOption );
            setFilteredOptions( undefined );
            setIsOpen( !isOpen );
            setSearchValue( undefined );
            setOptionSelected( selectedOptionToUse );
        }
    }, [ filteredOptions, flatOptions, isOpen, activeOption, optionSelected,
        isReadOnly, onChange ] );

    const handleMouseOutOption = () =>
    {
        setActiveOption( undefined );
    };

    const handleMouseOverOption = useCallback( ( { id : optId } ) =>
    {
        const unprefixedId = removePrefix( optId, componentId );

        setActiveOption( getOption(
            unprefixedId,
            flatOptions,
        ).id );
    }, [ componentId, flatOptions ] );

    const handleBlur = () =>
    {
        setActiveOption( undefined );
        setIsOpen( false );
        setFilteredOptions( undefined );
        setSearchValue( undefined );
    };

    const optionVal = getOption( optionSelected, flatOptions ) ?
        getOption( optionSelected, flatOptions ).text : undefined;

    let optionsToShow = options;

    if ( filteredOptions )
    {
        optionsToShow = optionsFormatted(
            filteredOptions.map( option => option.id ),
            options,
        );
    }

    let dropdownContent;

    if ( optionsToShow.length )
    {
        dropdownContent = (
            <ScrollBox
                height       = "50vh"
                scroll       = "vertical"
                scrollBoxRef = { scrollBoxRef }>
                <ListBox
                    activeOption      = { addPrefix(
                        activeOption,
                        componentId,
                    ) }
                    id                = { addPrefix( 'listbox', componentId ) }
                    isFocusable       = { false }
                    onClickOption     = { handleClickOption }
                    onMouseOutOption  = { handleMouseOutOption }
                    onMouseOverOption = { handleMouseOverOption }
                    options           = {
                        prefixOptions( optionsToShow, componentId )
                    }
                    selection = { addPrefix( optionSelected, componentId ) } />
            </ScrollBox>
        );
    }
    else
    {
        dropdownContent = (
            <Text
                noWrap
                overflowIsHidden
                role    = "subtle"
                variant = "RegularIt">
                { dropdownPlaceholder }
            </Text>
        );
    }

    const popperChildren = (
        <TextInputWithIcon
            aria = { {
                activeDescendant :
                    activeOption && addPrefix( activeOption, id ),
                autocomplete : 'list',
                expanded     : isOpen,
                hasPopup     : 'listbox',
                owns         : addPrefix( 'listbox', id ),
                role         : 'combobox',
            } }
            autoCapitalize = "off"
            autoComplete   = "off"
            autoCorrect    = "off"
            className      = { className }
            hasError       = { hasError }
            iconType       = { isOpen ? 'chevron-up' : 'chevron-down' }
            id             = { id }
            inputRef       = { this.inputRef }
            isDisabled     = { isDisabled }
            isReadOnly     = { !isSearchable || !isOpen }
            onBlur         = { callMultiple(
                this.handleBlur,
                this.props.onBlur,
            ) } // temporary fix
            onChangeInput  = { this.handleChangeInput }
            onClick        = { callMultiple(
                this.handleClick,
                this.props.onClick,
            ) } // temporary fix
            onClickIcon    = { this.handleClickIcon }
            onFocus        = { this.props.onFocus } // temporary fix
            onKeyDown      = { callMultiple(
                this.handleKeyDown,
                this.props.onKeyDown,
            ) } // temporary fix
            placeholder    = { inputPlaceholder }
            spellCheck     = { false }
            value          = { ( isOpen && isSearchable ) ?
                searchValue : selectedText
            } />
    );

    const popperPopup = (
        <Popup
            hasError = { hasError }
            padding  = { optionsToShow.length ? 'none' : 'S' }>
            { dropdownContent }
        </Popup>
    );

    return (
        <PopperWrapper
            container      = { container || 'nessie-overlay' }
            isVisible      = { isOpen }
            matchRefWidth
            popper         = { popperPopup }
            popperOffset   = "S"
            popperPosition = "bottom">
            { popperChildren }
        </PopperWrapper>
    );
};

ComboBox.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className           : PropTypes.string,
    /**
     * Placeholder text to show when no dropdown list options
     */
    dropdownPlaceholder : PropTypes.string,
    /**
     * Position of the dropdown relative to the text input
     */
    dropdownPosition    : PropTypes.oneOf( [ 'top', 'bottom' ] ),
    /**
     *  Display as error/invalid
     */
    hasError            : PropTypes.bool,
    /**
     *  Component id
     */
    id                  : PropTypes.string,
    /**
     *  Placeholder text
     */
    inputPlaceholder    : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled          : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly          : PropTypes.bool,
    /**
      *  input searchable
      */
    isSearchable        : PropTypes.bool,
    /**
     *  Change callback: ( { selectedOption } ) => ...
     */
    onChange            : PropTypes.func,
    /*
     * Dropdown list options
     */
    options             : PropTypes.arrayOf( PropTypes.object ),
    /**
     *  Selected option id
     */
    selectedOption      : PropTypes.string,
};

ComboBox.defaultProps =
{
    className           : undefined,
    dropdownPlaceholder : undefined,
    dropdownPosition    : 'bottom',
    hasError            : false,
    id                  : undefined,
    inputPlaceholder    : undefined,
    isDisabled          : false,
    isReadOnly          : undefined,
    isSearchable        : false,
    onChange            : undefined,
    options             : undefined,
    selectedOption      : undefined,
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
