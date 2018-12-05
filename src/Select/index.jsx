/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { generateId }       from '../utils';
import ComboBox             from '../ComboBox';


/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 *
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
 *
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
function getOption( id, options = [] )
{
    return options.find( opt => opt.id === id );
}

export default class Select extends Component
{
    static propTypes =
    {
        /**
         *  Display as read-only for IconButton
         */
        buttonIsReadOnly     : PropTypes.bool,
        /**
         *  Extra CSS class name
         */
        className            : PropTypes.string,
        /**
         *  default option selected
         */
        defaultOption        : PropTypes.string,
        /**
         * Placeholder text to show when no dropdown list options
         */
        dropdownPlaceholder  : PropTypes.string,
        /**
         * Position of the dropdown relative to the text input
         */
        dropdownPosition     : PropTypes.oneOf( [ 'top', 'bottom', 'auto' ] ),
        /**
         *  Display as hover when required from another component
         */
        forceHover           : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError             : PropTypes.bool,
        /**
         *  Display Button icon as disabled
         */
        iconButtonIsDisabled : PropTypes.bool,
        /**
         *  Alignment of the icon
         */
        iconPosition         : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  HTML id attribute
         */
        id                   : PropTypes.string,
        /**
         *  Placeholder text
         */
        inputPlaceholder     : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled           : PropTypes.bool,
        /**
         *  Dropdown list allows multiple selection
         */
        isMultiselect        : PropTypes.bool,
        /*
         * Dropdown is open
         */
        isOpen               : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly           : PropTypes.bool,
        /**
         *  Blur callback function
         */
        onBlur               : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChangeInput        : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon          : PropTypes.func,
        /*
         * On click callback function for input
         */
        onClickInput         : PropTypes.func,
        /*
         * On click callback function for dropdown option
         */
        onClickOption        : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus              : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown            : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress           : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp              : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut           : PropTypes.func,
        /**
         *  Icon mouse out callback function
         */
        onMouseOutIcon       : PropTypes.func,
        /*
         * On mouse out callback function for dropdown option
         */
        onMouseOutOption     : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver          : PropTypes.func,
        /**
         *  Icon mouse over callback function
         */
        onMouseOverIcon      : PropTypes.func,
        /*
         * On mouse over callback function for dropdown option
         */
        onMouseOverOption    : PropTypes.func,
        /*
         * On scroll dropdown list
         */
        onScroll             : PropTypes.func,
        /*
         * Dropdown list options
         */
        options              : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Selected option
         */
        selectedOption       : PropTypes.string,
        /**
         *  Input text alignment
         */
        textAlign            : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    };

    static defaultProps =
    {
        buttonIsReadOnly     : undefined,
        className            : undefined,
        defaultOption        : undefined,
        dropdownPlaceholder  : undefined,
        dropdownPosition     : 'auto',
        forceHover           : false,
        hasError             : false,
        iconButtonIsDisabled : undefined,
        iconPosition         : undefined,
        id                   : undefined,
        inputPlaceholder     : undefined,
        isDisabled           : false,
        isMultiselect        : false,
        isOpen               : undefined,
        isReadOnly           : undefined,
        onBlur               : undefined,
        onChangeInput        : undefined,
        onClickIcon          : undefined,
        onClickInput         : undefined,
        onClickOption        : undefined,
        onFocus              : undefined,
        onKeyDown            : undefined,
        onKeyPress           : undefined,
        onKeyUp              : undefined,
        onMouseOut           : undefined,
        onMouseOutIcon       : undefined,
        onMouseOutOption     : undefined,
        onMouseOver          : undefined,
        onMouseOverIcon      : undefined,
        onMouseOverOption    : undefined,
        onScroll             : undefined,
        options              : undefined,
        selectedOption       : undefined,
        textAlign            : 'auto',
    };

    constructor()
    {
        super();

        this.state = {
            activeOption    : undefined,
            filteredOptions : undefined,
            flatOptions     : undefined,
            id              : undefined,
            isFocused       : false,
            isOpen          : undefined,
            options         : undefined,
            searchValue     : undefined,
            selection       : undefined,
        };

        this.handleChangeInput     = this.handleChangeInput.bind( this );
        this.handleClickIcon       = this.handleClickIcon.bind( this );
        this.handleClickInput      = this.handleClickInput.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
        this.handleOnFocus         = this.handleOnFocus.bind( this );
        this.handleOnBlur          = this.handleOnBlur.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        let { flatOptions } = state;
        const { defaultOption, selectedOption } = props;
        let optionId = selectedOption || state.selection || defaultOption;

        if ( props.options !== state.options )
        {
            flatOptions = props.options.flatMap( o => o.options || o );
        }

        if ( optionId )
        {
            optionId = getOption( optionId, flatOptions )
                ? getOption( optionId, flatOptions ).id : undefined;
        }

        return {
            flatOptions,
            filteredOptions : state.filteredOptions,
            id              : props.id || state.id || generateId( 'Select' ),
            isOpen          : typeof props.isOpen === 'undefined' ?
                state.isOpen : props.isOpen,
            options     : props.options,
            searchValue : state.searchValue,
            selection   : optionId,
        };
    }

    handleChangeInput( e )
    {
        const callback = this.props.onChangeInput;

        if ( callback )
        {
            callback( e );
        }

        const searchValue = ( e.target.value || '' ).toLowerCase();

        const filteredOptions = this.state.flatOptions.filter( ( {
            id,
            text,
        } ) => !searchValue || id.toLowerCase().indexOf( searchValue ) > -1 ||
                    text.toLowerCase().indexOf( searchValue ) > -1 );

        const activeOption = ( searchValue && filteredOptions.length ) ?
            filteredOptions[ 0 ].id : undefined;

        this.setState( {
            activeOption,
            filteredOptions,
            searchValue,
        } );
    }

    optionsFilter( filteredOptions )
    {
        const filteredOptionsIds = [];

        filteredOptions.map( filteredOption =>
            filteredOptionsIds.push( filteredOption.id ) );

        return this.props.options.reduce( ( formattedOptions, option ) =>
        {
            if ( option.options )
            {
                const sectionOptions = option.options.reduce( (
                    sectionFormattedOptions,
                    sectionOption,
                ) =>
                {
                    if ( filteredOptionsIds.includes( sectionOption.id ) )
                    {
                        sectionFormattedOptions.push( sectionOption );
                    }
                    return sectionFormattedOptions;
                }, [] );

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

    handleClickIcon( e )
    {
        const callback = this.props.onClickIcon;

        if ( callback )
        {
            callback( e );
        }

        this.inputRef.focus();
        this.setState( { isOpen: true } );
    }

    handleClickInput( e )
    {
        const callback = this.props.onClickInput;

        if ( callback )
        {
            callback( e );
        }

        this.setState( { isOpen: true  } );
    }

    handleClickOption( e, id )
    {
        const callback = this.props.onClickOption;

        if ( callback )
        {
            callback( e );
        }

        this.setState( prevState =>
        {
            const selectedOption = getOption( id, prevState.flatOptions );
            return {
                isOpen          : false,
                filteredOptions : undefined,
                selection       : selectedOption.id,
                searchValue     : undefined,
            };
        } );
    }

    handleKeyDown( e )
    {
        const callback = this.props.onKeyDown;

        if ( callback )
        {
            callback( e );
        }

        const { key } = e;

        if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            e.preventDefault();

            this.setState( prevState =>
            {
                if ( prevState.isOpen )
                {
                    const options = prevState.filteredOptions ||
                      prevState.flatOptions;
                    const minIndex = 0;
                    const maxIndex = options.length - 1;

                    let activeIndex = getIndex(
                        prevState.activeOption || prevState.selection,
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
            this.setState( { isOpen: false } );
        }
        else if ( key === 'Enter' )
        {
            this.setState( prevState => (
                {
                    activeOption : prevState.activeOption,
                    selection    : prevState.activeOption,
                    isOpen       : typeof isOpen === 'boolean' ?
                        this.state.isOpen : !prevState.isOpen,
                    filteredOptions : undefined,
                    searchValue     : undefined,
                } ) );
        }
    }

    handleMouseOutOption( e )
    {
        const callback = this.props.onMouseOutOption;

        if ( callback )
        {
            callback( e );
        }

        this.setState( { activeOption: undefined } );
    }

    handleMouseOverOption( e, id )
    {
        const callback = this.props.onMouseOverOption;

        if ( callback )
        {
            callback( e );
        }

        this.setState( prevState =>
        {
            const activeOption = getOption(
                id,
                prevState.flatOptions,
            ).id;

            return { activeOption };
        } );
    }

    handleOnFocus( e )
    {
        const callback = this.props.onFocus;

        if ( callback )
        {
            callback( e );
        }

        this.setState( {
            isFocused : true,
            isOpen    : true,
        } );
    }

    handleOnBlur( e )
    {
        const callback = this.props.onBlur;

        if ( callback )
        {
            callback( e );
        }

        this.setState( {
            activeOption    : undefined,
            isFocused       : false,
            isOpen          : false,
            filteredOptions : undefined,
            searchValue     : undefined,
        } );
    }

    render()
    {
        const {
            buttonIsReadOnly,
            className,
            dropdownPlaceholder,
            dropdownPosition,
            forceHover,
            hasError,
            iconButtonIsDisabled,
            iconPosition,
            inputPlaceholder,
            isDisabled,
            isMultiselect,
            isReadOnly,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOutIcon,
            onMouseOver,
            onMouseOverIcon,
            onScroll,
            options,
            textAlign,
        } = this.props;

        const {
            activeOption,
            filteredOptions,
            flatOptions,
            id,
            isFocused,
            isOpen,
            searchValue,
            selection,
        } = this.state;

        const optionVal = getOption( selection, flatOptions ) ?
            getOption( selection, flatOptions ).text : undefined;

        const optionsToShow = filteredOptions ?
            this.optionsFilter( filteredOptions ) : options;

        return (
            <ComboBox
                activeOption         = { activeOption }
                buttonIsReadOnly     = { buttonIsReadOnly }
                className            = { className }
                dropdownPlaceholder  = { dropdownPlaceholder }
                dropdownPosition     = { dropdownPosition }
                forceHover           = { forceHover }
                hasError             = { hasError }
                iconButtonIsDisabled = { iconButtonIsDisabled }
                iconPosition         = { iconPosition }
                iconType             = { isOpen ? 'up' : 'down' }
                id                   = { id }
                inputIsReadOnly      = { !isOpen }
                inputRef             = { ( ref ) =>
                {
                    this.inputRef = ref;
                } }
                inputPlaceholder     = { inputPlaceholder }
                inputValue           = { isFocused && isOpen ? searchValue :
                    optionVal }
                isDisabled           = { isDisabled }
                isMultiselect        = { isMultiselect }
                isOpen               = { isOpen }
                isReadOnly           = { isReadOnly }
                onBlur               = { this.handleOnBlur }
                onChangeInput        = { this.handleChangeInput }
                onClickIcon          = { this.handleClickIcon }
                onClickInput         = { this.handleClickInput }
                onClickOption        = { this.handleClickOption }
                onFocus              = { this.handleOnFocus }
                onKeyDown            = { this.handleKeyDown }
                onKeyPress           = { onKeyPress }
                onKeyUp              = { onKeyUp }
                onMouseOut           = { onMouseOut }
                onMouseOutIcon       = { onMouseOutIcon }
                onMouseOutOption     = { this.handleMouseOutOption }
                onMouseOver          = { onMouseOver }
                onMouseOverIcon      = { onMouseOverIcon }
                onMouseOverOption    = { this.handleMouseOverOption }
                onScroll             = { onScroll }
                options              = { optionsToShow }
                selection            = { selection }
                textAlign            = { textAlign } />
        );
    }
}
