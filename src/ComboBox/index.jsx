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
    useState,
}                                   from 'react';
import PropTypes                    from 'prop-types';
import { castArray, escapeRegExp }  from 'lodash';

import {
    IconButton,
    ListBox,
    PopperWrapper,
    Popup,
    ScrollBox,
    Tag,
    Text,
} from '..';

import {
    attachEvents,
    callMultiple,
    mapAria,
    useId,
    useThemeClasses,
} from '../utils';
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
 * normalize array of options or value
 *
 * @param   {Array} options options to normalize
 *
 * @return  {Array} normalized options
 */
const normalizeOptions = ( options ) =>
{
    if ( !Array.isArray( options ) ) return;

    return options.map( opt => ( typeof opt === 'object' ?
        opt : { id: opt, text: opt } ) );
};

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

const useSelection = ( defaultValue, value, isMultiselect ) =>
{
    const validatedDefaultValue = isMultiselect && defaultValue ?
        castArray( defaultValue ) : defaultValue;
    const validatedValue = isMultiselect && value ? castArray( value ) : value;

    const [ selection, setSelection ] = useState( validatedDefaultValue );

    const validatedSelection = isMultiselect &&
      typeof selection !== 'undefined' ? castArray( selection ) : selection;

    const setter = ( newValue ) =>
    {
        if ( !value )
        {
            setSelection( newValue );
        }
    };

    return [ validatedValue || validatedSelection, setter ];
};


const componentName = 'ComboBox';

const ComboBox = forwardRef( ( props, ref ) =>
{
    const cssMap = useThemeClasses( componentName, props );
    const id = useId( componentName, props );

    const [ stateActiveOption, setActiveOption ] = useState( undefined );
    const [ isOpen, setIsOpen ] = useState( undefined );
    const [ searchValue, setSearchValue ] = useState( undefined );

    const scrollBoxRef = useRef( null );

    const {
        defaultValue,
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
    } = props;

    const [ selection, setSelection ] = useSelection(
        defaultValue,
        value,
        isMultiselect,
    );

    const flatOptions = useMemo(
        () => ( normalizeOptions( options ).flatMap( o => o.options || o ) ),
        [ options ],
    );

    const filteredOptions = useMemo(
        () => ( searchValue && ( flatOptions.filter( ( { text } ) => (
            text.match( new RegExp( escapeRegExp( searchValue ), 'i' ) ) ) )
        ) ),
        [ flatOptions, searchValue ],
    );

    const activeOption = useMemo(
        () => ( ( searchValue && filteredOptions.length ) ?
            filteredOptions[ 0 ].id : stateActiveOption ),
        [ filteredOptions, searchValue, stateActiveOption ],
    );

    useEffect( () =>
    {
        if ( scrollBoxRef.current && activeOption )
        {
            const activeEl =
                document.getElementById( addPrefix(
                    activeOption,
                    id,
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
        document.getElementById( id ).focus();
    }, [ id ] );

    const handleFocus = useCallback( () =>
    {
        focus();

        if ( isSearchable )
        {
            setSearchValue( '' );
        }
    }, [ focus, isSearchable ] );

    const handleChangeInput = useCallback( ( e ) =>
    {
        e.stopPropagation();

        const searchValueToUse = ( e.target.value || '' ).toLowerCase();

        if ( typeof onChangeInput === 'function' )
        {
            onChangeInput( { value: e.target.value }, e );
        }

        setSearchValue( searchValueToUse );
    }, [ onChangeInput ] );

    const handleClickIcon = useCallback( () =>
    {
        focus();
        setIsOpen( !isOpen );
    }, [ focus, isOpen ] );

    const handleClick = useCallback( () =>
    {
        setIsOpen( true );
    }, [] );

    const handleClickOption = useCallback( ( { id : optId } ) =>
    {
        const unprefixedId = removePrefix( optId, id );

        let newSelection = !isReadOnly ? unprefixedId : selection;

        if ( isMultiselect )
        {
            if ( selection )
            {
                newSelection = selection.includes( unprefixedId ) ?
                    selection.filter( item => item !== unprefixedId ) :
                    [ ...selection, unprefixedId ];
            }
            else
            {
                newSelection = [ unprefixedId ];
            }
        }

        if ( !isReadOnly && typeof onChange === 'function' )
        {
            onChange( { id, value: newSelection } );
        }

        setIsOpen( false );
        setSearchValue( undefined );
        setSelection( newSelection );
    }, [ id, isReadOnly, selection, isMultiselect, onChange, setSelection ] );

    const handleClickClose = useCallback( ( { id : tagId } ) =>
    {
        const newTags = selection.filter( tag => tag !== tagId );

        if ( typeof onChange === 'function' )
        {
            onChange( { value: newTags } );
        }

        setSelection( newTags );
        setIsOpen( false );
    }, [ selection, onChange, setSelection ] );

    const handleKeyDown = useCallback( ( e ) =>
    {
        const { key } = e;

        if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            e.preventDefault();

            const optionsToUse = filteredOptions || flatOptions;

            if ( isOpen && optionsToUse.length )
            {
                const minIndex = 0;
                const maxIndex = optionsToUse.length - 1;

                let activeIndex = getIndex(
                    activeOption || selection,
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
            setIsOpen( false );
            setSearchValue( undefined );
        }
        else if ( key === 'Enter' )
        {
            if ( !isReadOnly )
            {
                let newSelection;

                if ( activeOption && isMultiselect )
                {
                    if ( selection )
                    {
                        newSelection = selection.includes(
                            activeOption,
                        ) ? selection.filter(
                                item => item !== activeOption,
                            ) : [ ...selection, activeOption ];
                    }
                    else
                    {
                        newSelection = [ activeOption ];
                    }
                }
                else
                {
                    newSelection = activeOption;
                }

                setActiveOption( undefined );
                setIsOpen( !isOpen );
                setSearchValue( undefined );

                if ( newSelection )
                {
                    if ( typeof onChange === 'function' )
                    {
                        onChange( { id, newSelection } );
                    }

                    setSelection( newSelection );
                }
            }
        }
    }, [
        activeOption,
        filteredOptions,
        flatOptions,
        id,
        isMultiselect,
        isOpen,
        isReadOnly,
        onChange,
        selection,
        setSelection,
    ] );

    const handleMouseOutOption = useCallback( () =>
    {
        setActiveOption( undefined );
    }, [] );

    const handleMouseOverOption = useCallback( ( { id : optId } ) =>
    {
        const unprefixedId = removePrefix( optId, id );

        setActiveOption( getOption(
            unprefixedId,
            flatOptions,
        ).id );
    }, [ id, flatOptions ] );

    const handleBlur = useCallback( () =>
    {
        setIsOpen( false );
        setActiveOption( undefined );
        setSearchValue( undefined );
    }, [] );

    const selectedOption = getOption( selection, flatOptions );
    const selectedText = selectedOption ? selectedOption.text : '';

    let tags;

    if ( isMultiselect )
    {
        tags = selection && selection.map( itemId => (
            <Tag
                id = { itemId }
                isDisabled = { isDisabled }
                isReadOnly = { isReadOnly }
                key = { itemId }
                label = { getOption( itemId, flatOptions ).text }
                onClick  = { handleClickClose }
            />
        ) );
    }

    let optionsToShow = normalizeOptions( options ) || [];

    if ( filteredOptions )
    {
        optionsToShow = optionsFormatted(
            filteredOptions.map( option => option.id ),
            normalizeOptions( options ),
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
                        id,
                    ) }
                    id                = { addPrefix( 'listbox', id ) }
                    isFocusable       = { false }
                    isMultiselect     = { isMultiselect }
                    onClickOption     = { handleClickOption }
                    onMouseOutOption  = { handleMouseOutOption }
                    onMouseOverOption = { handleMouseOverOption }
                    options           = {
                        prefixOptions( optionsToShow, id )
                    }
                    selection = { isMultiselect && selection ?
                        selection.map( optId => addPrefix( optId, id ) ) :
                        addPrefix( selection, id )
                    } />
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

    return (
        <PopperWrapper
            popperContainer = { popperContainer }
            isVisible       = { isOpen }
            matchRefWidth
            popper          = { ( { ...popperProps } ) => (
                <Popup
                    { ...popperProps }
                    hasError = { hasError }
                    padding  = { optionsToShow.length ? 'none' : 'S' }>
                    { dropdownContent }
                </Popup>
            ) }
            popperOffset    = "S"
            popperPosition  = "bottom"
            ref             = { ref }
            style           = { style }>
            { ( { ref: innerRef } ) => (
                <label
                    { ...attachEvents( props ) }
                    className = { cssMap.main }
                    htmlFor   = { id }
                    ref       = { innerRef }>
                    { tags }
                    <input
                        { ...mapAria( {
                            activeDescendant :
                              activeOption && addPrefix( activeOption, id ),
                            autocomplete : 'list',
                            expanded     : isOpen,
                            hasPopup     : 'listbox',
                            owns         : addPrefix( 'listbox', id ),
                            role         : 'combobox',
                        } ) }
                        autoCapitalize = "off"
                        autoComplete   = "off"
                        autoCorrect    = "off"
                        className      = { cssMap.input }
                        disabled       = { isDisabled }
                        id             = { id }
                        onBlur         = { callMultiple(
                            handleBlur,
                            props.onBlur,
                        ) } // temporary fix
                        onChange       = { handleChangeInput }
                        onClick        = { callMultiple(
                            handleClick,
                            props.onClick,
                        ) } // temporary fix
                        onFocus        = { callMultiple(
                            handleFocus,
                            props.onFocus,
                        ) } // temporary fix
                        onKeyDown      = { callMultiple(
                            handleKeyDown,
                            props.onKeyDown,
                        ) } // temporary fix
                        placeholder    = { inputPlaceholder }
                        readOnly       = { !isSearchable || !isOpen }
                        spellCheck     = { false }
                        value          = { ( isOpen && isSearchable ) ?
                            searchValue : selectedText } />
                    <IconButton
                        className   = { cssMap.icon }
                        iconType    = { isOpen ? 'chevron-up' : 'chevron-down' }
                        isFocusable = { false }
                        onClick     = { handleClickIcon } />
                </label>
            ) }
        </PopperWrapper>
    );
} );

ComboBox.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className    : PropTypes.string,
    /**
     *  Default selected option id(s) (when uncontrolled)
     */
    defaultValue : PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string ),
    ),
    /**
     *  id of the DOM element used as container for popup listBox
     */
    popperContainer     : PropTypes.string,
    /**
     * Placeholder text to show when no dropdown list options
     */
    dropdownPlaceholder : PropTypes.string,
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
     *  Enables multi-select behavior
     */
    isMultiselect       : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly          : PropTypes.bool,
    /**
      *  input searchable
      */
    isSearchable        : PropTypes.bool,
    /**
     *  Change callback: ( { value } ) => ...
     */
    onChange            : PropTypes.func,
    /**
     *  Input field change callback: ( { value } ) => ...
     */
    onChangeInput       : PropTypes.func,
    /*
     * Dropdown list options
     */
    options             : PropTypes.arrayOf( PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.object,
    ) ),
    /**
     *  Selected option id(s)
     */
    value : PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string ),
    ),
    /**
     *  Style overrides
     */
    style : PropTypes.objectOf( PropTypes.string ),
};

ComboBox.defaultProps =
{
    className           : undefined,
    popperContainer     : undefined,
    defaultValue        : undefined,
    dropdownPlaceholder : 'No results to show',
    hasError            : false,
    id                  : undefined,
    inputPlaceholder    : undefined,
    isDisabled          : false,
    isMultiselect       : false,
    isReadOnly          : undefined,
    isSearchable        : false,
    onChange            : undefined,
    onChangeInput       : undefined,
    options             : [],
    value               : undefined,
    style               : undefined,
};

ComboBox.displayName = componentName;

export default ComboBox;
