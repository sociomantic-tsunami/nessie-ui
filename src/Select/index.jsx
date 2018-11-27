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
         *  default option selected
         */
        defaultOption     : PropTypes.string,
        /**
         * Position of the dropdown relative to the text input
         */
        dropdownPosition  : PropTypes.oneOf( [ 'top', 'bottom', 'auto' ] ),
        /**
         *  HTML id attribute
         */
        id                : PropTypes.string,
        /*
         * Dropdown is open
         */
        isOpen            : PropTypes.bool,
        /**
         *  Blur callback function
         */
        onBlur            : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChangeInput     : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon       : PropTypes.func,
        /*
         * On click callback function for input
         */
        onClickInput      : PropTypes.func,
        /*
         * On click callback function for dropdown option
         */
        onClickOption     : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus           : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown         : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress        : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp           : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut        : PropTypes.func,
        /**
         *  Icon mouse out callback function
         */
        onMouseOutIcon    : PropTypes.func,
        /*
         * On mouse out callback function for dropdown option
         */
        onMouseOutOption  : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver       : PropTypes.func,
        /**
         *  Icon mouse over callback function
         */
        onMouseOverIcon   : PropTypes.func,
        /*
         * On mouse over callback function for dropdown option
         */
        onMouseOverOption : PropTypes.func,
        /*
         * On scroll dropdown list
         */
        onScroll          : PropTypes.func,
        /*
         * Dropdown list options
         */
        options           : PropTypes.arrayOf( PropTypes.object ),
    };

    static defaultProps =
    {
        defaultOption     : undefined,
        dropdownPosition  : 'auto',
        id                : undefined,
        isOpen            : false,
        onBlur            : undefined,
        onChangeInput     : undefined,
        onClickIcon       : undefined,
        onClickInput      : undefined,
        onClickOption     : undefined,
        onFocus           : undefined,
        onKeyDown         : undefined,
        onKeyPress        : undefined,
        onKeyUp           : undefined,
        onMouseOut        : undefined,
        onMouseOutIcon    : undefined,
        onMouseOutOption  : undefined,
        onMouseOver       : undefined,
        onMouseOverIcon   : undefined,
        onMouseOverOption : undefined,
        onScroll          : undefined,
        options           : undefined,
    };

    constructor()
    {
        super();

        this.state = {
            activeOption : undefined,
            flatOptions  : undefined,
            id           : undefined,
            inputValue   : undefined,
            isOpen       : undefined,
            options      : undefined,
            selection    : undefined,
        };

        this.handleClickIcon       = this.handleClickIcon.bind( this );
        this.handleClickInput      = this.handleClickInput.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        if ( props.options !== state.options )
        {
            const flatOptions = props.options.flatMap( o => o.options || o );

            let defaultOption = getOption( props.defaultOption, flatOptions );

            defaultOption = defaultOption || flatOptions[ 0 ];

            return {
                flatOptions,
                id         : props.id || generateId( 'Select' ),
                inputValue : defaultOption.text,
                isOpen     : props.isOpen,
                options    : props.options,
                selection  : defaultOption.id,
            };
        }
    }

    handleClickIcon( e )
    {
        const callback = this.props.onClickIcon;

        if ( callback )
        {
            callback( e );
        }

        e.stopPropagation();
        this.setState( prevState => ( { isOpen: !prevState.isOpen  } ) );
    }

    handleClickInput( e )
    {
        const callback = this.props.onClickInput;

        if ( callback )
        {
            callback( e );
        }

        this.setState( prevState => ( { isOpen: !prevState.isOpen  } ) );
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
        this.setState( prevState =>
        {
            const activeOption = getOption(
                id,
                prevState.flatOptions,
            ).id;

            return { activeOption };
        } );
    }

    render()
    {
        const {
            dropdownPosition,
            onBlur,
            onChangeInput,
            onClickIcon,
            onClickInput,
            onFocus,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOutIcon,
            onMouseOutOption,
            onMouseOver,
            onMouseOverIcon,
            onScroll,
            options,
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
                activeOption      = { activeOption }
                dropdownPosition  = { dropdownPosition }
                iconType          = { isOpen ? 'up' : 'down' }
                id                = { id }
                inputIsReadOnly
                inputValue        = { inputValue }
                isOpen            = { isOpen }
                onBlur            = { onBlur }
                onChangeInput     = { onChangeInput }
                onClickIcon       = { this.handleClickIcon }
                onClickInput      = { this.handleClickInput }
                onClickOption     = { this.handleClickOption }
                onFocus           = { onFocus }
                onKeyDown         = { this.handleKeyDown }
                onKeyPress        = { onKeyPress }
                onKeyUp           = { onKeyUp }
                onMouseOut        = { onMouseOut }
                onMouseOutIcon    = { onMouseOutIcon }
                onMouseOutOption  = { onMouseOutOption }
                onMouseOver       = { onMouseOver }
                onMouseOverIcon   = { onMouseOverIcon }
                onMouseOverOption = { this.handleMouseOverOption }
                onScroll          = { onScroll }
                options           = { options }
                selection         = { selection } />

        );
    }
}
