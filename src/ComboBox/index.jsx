/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React, { Component }                       from 'react';
import PropTypes                                  from 'prop-types';

import { ListBox, ScrollBox, Text }               from '..';

import TextInputWithIcon                          from '../TextInputWithIcon';
import Popup                                      from '../Popup';
import PopperWrapper                              from '../PopperWrapper';
import { callMultiple, generateId }               from '../utils';
import { addPrefix, prefixOptions, removePrefix } from './utils';


/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
function getIndex( id, options = [] )
{
    return options.findIndex( opt => opt.id === id );
}

/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
function getOption( id, options = [] )
{
    return options.find( opt => opt.id === id );
}

/**
 * gives correct format to the filtered options
 *
 * @param {Array} filteredOptionsIds options ids after search filter
 * @param {Array} originalOptions original options
 *
 * @return {Array} formattedOptions filtered and formatted options
 */
function optionsFormatted( filteredOptionsIds, originalOptions )
{
    return originalOptions.reduce( ( formattedOptions, option ) =>
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
    }, [] );
}

export default class ComboBox extends Component
{
    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className           : PropTypes.string,
        /**
         *  id of the DOM element used as container for popup listBox
         */
        container           : PropTypes.string,
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
        /*
         * Dropdown list options
         */
        options             : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Selected option id
         */
        value               : PropTypes.string,
    };

    static defaultProps =
    {
        className           : undefined,
        container           : undefined,
        dropdownPlaceholder : undefined,
        hasError            : false,
        id                  : undefined,
        inputPlaceholder    : undefined,
        isDisabled          : false,
        isReadOnly          : undefined,
        isSearchable        : false,
        onChange            : undefined,
        options             : undefined,
        value               : undefined,
    };

    inputRef = React.createRef();
    scrollBoxRef = React.createRef();

    constructor()
    {
        super();

        this.state = {
            activeOption    : undefined,
            filteredOptions : undefined,
            flatOptions     : undefined,
            id              : undefined,
            isOpen          : undefined,
            options         : undefined,
            searchValue     : undefined,
            value           : undefined,
        };

        this.handleBlur            = this.handleBlur.bind( this );
        this.handleChangeInput     = this.handleChangeInput.bind( this );
        this.handleClick           = this.handleClick.bind( this );
        this.handleClickIcon       = this.handleClickIcon.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        let { flatOptions } = state;
        const { value } = props;
        let optionId = value || state.value;

        if ( props.options !== state.options )
        {
            flatOptions = props.options.flatMap( o => o.options || o );
        }

        if ( optionId )
        {
            optionId = getOption( optionId, flatOptions ) ?
                getOption( optionId, flatOptions ).id : undefined;
        }

        return {
            flatOptions,
            filteredOptions : state.filteredOptions,
            id              : props.id || state.id || generateId( 'ComboBox' ),
            options         : props.options,
            searchValue     : state.searchValue,
            value           : optionId,
        };
    }

    componentDidUpdate()
    {
        const { current: scrollBoxRef } = this.scrollBoxRef;
        const { activeOption, id } = this.state;

        if ( scrollBoxRef && activeOption )
        {
            const activeEl =
                document.getElementById( addPrefix( activeOption, id ) );

            if ( activeEl &&
                scrollBoxRef.scrollHeight > scrollBoxRef.offsetHeight )
            {
                const pos        = activeEl.offsetTop;
                const elHeight   = activeEl.offsetHeight;
                const contHeight = scrollBoxRef.offsetHeight;

                const min = scrollBoxRef.scrollTop;
                const max = min + ( scrollBoxRef.offsetHeight - elHeight );

                if ( pos < min )
                {
                    scrollBoxRef.scrollTop = pos;
                }
                else if ( pos > max )
                {
                    scrollBoxRef.scrollTop = pos - ( contHeight - elHeight );
                }
            }
        }
    }

    focus()
    {
        this.inputRef.current.focus();
    }

    handleChangeInput( { value } )
    {
        const searchValue = ( value || '' ).toLowerCase();

        this.setState( prevState =>
        {
            const filteredOptions =
                prevState.flatOptions.filter( ( { text } ) =>
                    !searchValue ||
                    text.toLowerCase().indexOf( searchValue ) > -1 );

            const activeOption = ( searchValue && filteredOptions.length ) ?
                filteredOptions[ 0 ].id : undefined;

            return { activeOption, filteredOptions, searchValue };
        } );
    }

    handleClickIcon()
    {
        this.focus();
        this.setState( prevState => ( { isOpen: !prevState.isOpen } ) );
    }

    handleClick()
    {
        this.setState( { isOpen: true  } );
    }

    handleClickOption( { id: optId } )
    {
        const { isReadOnly, onChange } = this.props;
        const { id } = this.state;
        const unprefixedId = removePrefix( optId, id );

        this.setState( prevState =>
        {
            const value = !isReadOnly ? getOption(
                unprefixedId,
                prevState.flatOptions,
            ).id : prevState.value;

            if ( !isReadOnly && typeof onChange === 'function' )
            {
                onChange( { id, value } );
            }

            return {
                activeOption    : value,
                filteredOptions : undefined,
                isOpen          : false,
                searchValue     : undefined,
                value,
            };
        } );
    }

    handleKeyDown( { key, preventNessieDefault } )
    {
        if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            preventNessieDefault();

            this.setState( prevState =>
            {
                const options = prevState.filteredOptions ||
                    prevState.flatOptions;

                if ( prevState.isOpen && options.length )
                {
                    const minIndex = 0;
                    const maxIndex = options.length - 1;

                    let activeIndex = getIndex(
                        prevState.activeOption || prevState.value,
                        options,
                    );

                    activeIndex = key === 'ArrowUp' ?
                        Math.max( activeIndex - 1, minIndex ) :
                        Math.min( activeIndex + 1, maxIndex );

                    return {
                        activeOption : options[ activeIndex ].id,
                    };
                }

                return { isOpen: true };
            } );
        }
        else if ( key === 'Escape' )
        {
            this.setState( {
                activeOption    : undefined,
                filteredOptions : undefined,
                isOpen          : false,
                searchValue     : undefined,
            } );
        }
        else if ( key === 'Enter' )
        {
            const { isReadOnly, onChange } = this.props;
            const { id } = this.state;

            this.setState( prevState =>
            {
                const value = !isReadOnly && prevState.activeOption ?
                    prevState.activeOption : prevState.value;

                if ( !isReadOnly && typeof onChange === 'function' )
                {
                    onChange( { id, value } );
                }
                return {
                    activeOption    : prevState.activeOption,
                    filteredOptions : undefined,
                    isOpen          : !prevState.isOpen,
                    searchValue     : undefined,
                    value,
                };
            } );
        }
    }

    handleMouseOutOption()
    {
        this.setState( { activeOption: undefined } );
    }

    handleMouseOverOption( { id : optId } )
    {
        const { id } = this.state;
        const unprefixedId = removePrefix( optId, id );

        this.setState( prevState =>
        {
            const activeOption = getOption(
                unprefixedId,
                prevState.flatOptions,
            ).id;
            return { activeOption };
        } );
    }

    handleBlur()
    {
        this.setState( {
            activeOption    : undefined,
            isOpen          : false,
            filteredOptions : undefined,
            searchValue     : undefined,
        } );
    }

    render()
    {
        const {
            className,
            container,
            dropdownPlaceholder,
            hasError,
            inputPlaceholder,
            isDisabled,
            isSearchable,
            options,
        } = this.props;

        const {
            activeOption,
            filteredOptions,
            flatOptions,
            id,
            isOpen,
            searchValue,
            value,
        } = this.state;

        const flatOption = getOption( value, flatOptions );
        const optionVal = flatOption ? flatOption.text : undefined;

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
                    scrollBoxRef = { this.scrollBoxRef }>
                    <ListBox
                        activeOption      = { addPrefix( activeOption, id ) }
                        id                = { addPrefix( 'listbox', id ) }
                        isFocusable       = { false }
                        onClickOption     = { this.handleClickOption }
                        onMouseOutOption  = { this.handleMouseOutOption }
                        onMouseOverOption = { this.handleMouseOverOption }
                        options           = {
                            prefixOptions( optionsToShow, id )
                        }
                        selection = { addPrefix( value, id ) } />
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
                iconType       = { isOpen ? 'up' : 'down' }
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
                onKeyDown      = { callMultiple(
                    this.handleKeyDown,
                    this.props.onKeyDown,
                ) } // temporary fix
                placeholder    = { inputPlaceholder }
                spellCheck     = { false }
                value          = { ( isOpen && isSearchable ) ?
                    searchValue : optionVal
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
    }
}
