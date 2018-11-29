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
            activeOption   : undefined,
            flatOptions    : undefined,
            id             : undefined,
            inputValue     : undefined,
            isOpen         : undefined,
            options        : undefined,
            selection      : undefined,
            prevInputValue : undefined,
            prevSelection  : undefined,
        };

        this.handleChangeInput     = this.handleChangeInput.bind( this );
        this.handleClickIcon       = this.handleClickIcon.bind( this );
        this.handleClickInput      = this.handleClickInput.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
        this.handleOnFocus         = this.handleOnFocus.bind( this );
        this.handleOnBlur          = this.handleOnBlur.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        let { flatOptions } = state;
        const { defaultOption, selectedOption } = props;
        const optionId = selectedOption || state.selection || defaultOption;

        if ( props.options !== state.options )
        {
            flatOptions = props.options.flatMap( o => o.options || o );
        }

        const currentOption = optionId ? getOption( optionId, flatOptions ) :
            optionId;

        const selection = currentOption ? currentOption.id : currentOption;
        const inputValue = currentOption ? currentOption.text : currentOption;

        console.log( state.inputValue, 'BB')

        return {
            flatOptions,
            id         : props.id || state.id || generateId( 'Select' ),
            inputValue : state.inputValue,
            isOpen     : typeof props.isOpen === 'undefined' ? state.isOpen :
                props.isOpen,
            options   : props.options,
            selection,
        };
    }

    handleChangeInput( e )
    {
        const callback = this.props.onChangeInput;

        if ( callback )
        {
            callback( e );
        }

        const { value } = e.target;

        this.setState( prevState =>
        {
            return {
                inputValue : value,
            };
        } );
    }

    handleClickIcon( e )
    {
        const callback = this.props.onClickIcon;

        if ( callback )
        {
            callback( e );
        }

        e.stopPropagation();
        // this.setState( prevState => ( { isOpen: !prevState.isOpen  } ) );
    }

    handleClickInput( e )
    {
        const callback = this.props.onClickInput;

        if ( callback )
        {
            callback( e );
        }

        // this.setState( prevState => ( { isOpen: !prevState.isOpen  } ) );
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
                isOpen     : false,
                inputValue : selectedOption.text,
                selection  : selectedOption.id,
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
                    const minIndex = 0;
                    const maxIndex = prevState.flatOptions.length - 1;

                    let activeIndex = getIndex(
                        prevState.activeOption,
                        prevState.flatOptions,
                    );

                    activeIndex = key === 'ArrowUp' ?
                        Math.max( activeIndex - 1, minIndex ) :
                        Math.min( activeIndex + 1, maxIndex );

                    return {
                        activeOption : prevState.flatOptions[ activeIndex ].id,
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
            this.setState( prevState => ( {
                selection :
                getOption(
                    prevState.activeOption,
                    prevState.flatOptions,
                ).id,
                inputValue :
                getOption(
                    prevState.activeOption,
                    prevState.flatOptions,
                ).text,
                isOpen : typeof isOpen === 'boolean' ?
                    this.state.isOpen : !prevState.isOpen,
            } ) );
        }
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


        this.setState( prevState =>
        {
            return {
                inputValue : undefined,
                isOpen : true,
            };
        }  );
    }

    handleOnBlur( e )
    {
        const callback = this.props.onBlur;

        if ( callback )
        {
            callback( e );
        }

        console.log( 'BLUR' );
        this.setState( prevState =>
        {
            return {
                isOpen     : false,
                inputValue : getOption( prevState.selection, prevState.flatOptions ).text,

            };
        } );
    }

    render()
    {
        const {
            buttonIsReadOnly,
            className,
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
            onMouseOutOption,
            onMouseOver,
            onMouseOverIcon,
            onScroll,
            options,
            textAlign,
        } = this.props;

        const {
            activeOption,
            id,
            inputValue,
            isOpen,
            selection,
        } = this.state;

        return (
            <ComboBox
                activeOption         = { activeOption }
                buttonIsReadOnly     = { buttonIsReadOnly }
                className            = { className }
                dropdownPosition     = { dropdownPosition }
                forceHover           = { forceHover }
                hasError             = { hasError }
                iconButtonIsDisabled = { iconButtonIsDisabled }
                iconPosition         = { iconPosition }
                iconType             = { isOpen ? 'up' : 'down' }
                id                   = { id }
                inputPlaceholder     = { inputPlaceholder }
                inputValue           = { inputValue }
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
                onMouseOutOption     = { onMouseOutOption }
                onMouseOver          = { onMouseOver }
                onMouseOverIcon      = { onMouseOverIcon }
                onMouseOverOption    = { this.handleMouseOverOption }
                onScroll             = { onScroll }
                options              = { options }
                selection            = { selection }
                textAlign            = { textAlign } />
        );
    }
}
