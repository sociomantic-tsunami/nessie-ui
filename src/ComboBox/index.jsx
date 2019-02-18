/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import { castArray, escapeRegExp }  from 'lodash';

import {
    IconButton,
    ListBox,
    ScrollBox,
    Text,
    TextInput,
} from '..';

import Popup                                      from '../Popup';
import PopperWrapper                              from '../PopperWrapper';
import { attachEvents, callMultiple, generateId } from '../utils';
import { addPrefix, prefixOptions, removePrefix } from './utils';
import { buildTagsFromValues }                    from '../TagInput/utils';

/**
 * normalize array of options or value
 *
 * @param   {Array} options options to normalize
 *
 * @return  {Array} normalized options
 */
function normalizeOptions( options )
{
    if ( !Array.isArray( options ) ) return;

    return options.map( opt => ( typeof opt === 'object' ?
        opt : { id: opt, text: opt } ) );
}

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
        options             : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Selected option id(s)
         */
        value               : PropTypes.oneOfType(
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string ),
        ),
    };

    static defaultProps =
    {
        className           : undefined,
        container           : undefined,
        defaultValue        : [],
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
        options             : undefined,
        value               : undefined,
    };

    inputRef = React.createRef();
    scrollBoxRef = React.createRef();

    constructor( { defaultValue, isMultiselect } )
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
            selection       : isMultiselect ?
                castArray( defaultValue ) : defaultValue,
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

        const options = normalizeOptions( props.options ) ||
            state.options || [];

        if ( options && options !== state.options )
        {
            flatOptions = options.flatMap( o => o.options || o );
        }

        let { selection } = state;
        if ( props.value )
        {
            selection = props.value;
        }

        if ( props.isMultiselect )
        {
            selection = castArray( selection );
        }

        const filteredOptions = state.searchValue && (
            flatOptions.filter( ( { text } ) => (
                text.match( new RegExp(
                    escapeRegExp( state.searchValue ),
                    'i',
                ) )
            ) )
        );

        const activeOption = ( state.searchValue && filteredOptions.length ) ?
            filteredOptions[ 0 ].id : state.activeOption;

        return {
            activeOption,
            flatOptions,
            filteredOptions,
            id : props.id || state.id || generateId( 'ComboBox' ),
            options,
            selection,
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


    handleChangeInput( { value }, ...args )
    {
        const { onChangeInput } = this.props;
        if ( typeof onChangeInput === 'function' )
        {
            onChangeInput( { value }, ...args );
        }

        this.setState( { searchValue: value } );
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

    handleClickOption( { id: prefixedId } )
    {
        this.setState( ( { id, selection } ) =>
        {
            const optId = removePrefix( prefixedId, id );
            const { isMultiselect, onChange } = this.props;
            let newSelection = optId;
            if ( isMultiselect )
            {
                newSelection = selection.includes( optId ) ?
                    selection.filter( item => item !== optId ) :
                    [ ...selection, optId ];
            }

            if ( typeof onChange === 'function' )
            {
                onChange( { value: newSelection } );
            }

            return {
                activeOption    : optId,
                filteredOptions : undefined,
                isOpen          : false,
                searchValue     : '',
                selection       : newSelection,
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
                        prevState.activeOption,
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
            if ( !this.props.isReadOnly )
            {
                this.setState( ( { activeOption, isOpen, selection } ) =>
                {
                    let newSelection = activeOption;
                    if ( newSelection && this.props.isMultiselect )
                    {
                        newSelection = selection.includes( newSelection ) ?
                            selection.filter( item => item !== newSelection ) :
                            [ ...selection, newSelection ];
                    }
                    newSelection = newSelection || selection;

                    const { onChange } = this.props;
                    if ( typeof onChange === 'function' )
                    {
                        onChange( { value: newSelection } );
                    }

                    return {
                        activeOption    : undefined,
                        filteredOptions : undefined,
                        isOpen          : !isOpen,
                        searchValue     : '',
                        selection       : newSelection,
                    };
                } );
            }
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
            isMultiselect,
            isReadOnly,
            isSearchable,
        } = this.props;

        const {
            activeOption,
            filteredOptions,
            flatOptions,
            id,
            isOpen,
            searchValue,
            options,
            selection,
        } = this.state;

        const selectedOption = getOption( selection, flatOptions );
        const selectedText = selectedOption ? selectedOption.text : '';

        let optionsToShow = options || [];

        if ( filteredOptions )
        {
            optionsToShow = optionsFormatted(
                filteredOptions.map( option => option.id ),
                options,
            );
        }

        let dropdownContent;

        if ( optionsToShow !== undefined && optionsToShow.length )
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
                        isMultiselect     = { isMultiselect }
                        onClickOption     = { !isReadOnly &&
                            this.handleClickOption }
                        onMouseOutOption  = { this.handleMouseOutOption }
                        onMouseOverOption = { this.handleMouseOverOption }
                        options           = {
                            prefixOptions( optionsToShow, id )
                        }
                        selection = { isMultiselect ? selection.map( optId =>
                            addPrefix( optId, id ) ) :
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

        const popperChildren = (
            <div { ...attachEvents( this.props ) }>
                { isMultiselect && buildTagsFromValues( selection ) }
                <TextInput
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
                    onFocus        = { this.props.onFocus } // temporary fix
                    onKeyDown      = { callMultiple(
                        this.handleKeyDown,
                        this.props.onKeyDown,
                    ) } // temporary fix
                    placeholder    = { inputPlaceholder }
                    spellCheck     = { false }
                    value          = { ( isOpen && isSearchable ) ?
                        searchValue : selectedText } />
                <IconButton
                    className   = { className }
                    iconType    = { isOpen ? 'chevron-up' : 'chevron-down' }
                    onClickIcon = { this.handleClickIcon } />
            </div>
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
