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
 * Filters the dropdown options
 *
 * @param {Array} options Array of options
 *
 * @return {Array} filteredOptions Array of filtered options
 */
function handleOptions( options = [] )
{
    let filteredOptions =  options.map( option =>
    {
        if ( option.options )
        {
            return option.options.map( subOption => subOption );
        }

        return option;
    } );

    filteredOptions = [].concat( ...filteredOptions );

    return filteredOptions;
}

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

export default class ComboBoxState extends Component
{
    static propTypes =
    {
        /**
         *  HTML id attribute
         */
        id            : PropTypes.string,
        /**
         *  default option selected
         */
        defaultOption : PropTypes.string,
        /*
         * Dropdown list options
         */
        options       : PropTypes.arrayOf( PropTypes.object ),
    };

    static defaultProps =
    {
        id            : undefined,
        options       : undefined,
        defaultOption : undefined,
    };

    constructor()
    {
        super();

        this.state = {
            activeOption    : undefined,
            filteredOptions : undefined,
            inputValue      : undefined,
            isOpen          : undefined,
            options         : undefined,
            selection       : undefined,
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
            const filteredOptions = handleOptions( props.options );

            let defaultOption =
                              getOption( props.defaultOption, filteredOptions );

            defaultOption = defaultOption || filteredOptions[ 0 ];

            return {
                filteredOptions,
                inputValue : defaultOption.text,
                isOpen     : false,
                options    : props.options,
                selection  : defaultOption.id,
            };
        }
    }

    handleClickIcon( e )
    {
        e.stopPropagation();
        this.setState( prevState => ( { isOpen: !prevState.isOpen  } ) );
    }

    handleClickInput()
    {
        this.setState( prevState => ( { isOpen: !prevState.isOpen  } ) );
    }

    handleClickOption( e, id )
    {
        this.setState( prevState =>
        {
            const selectedOption = getOption( id, prevState.filteredOptions );
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
                    const maxIndex = prevState.filteredOptions.length - 1;

                    let activeIndex = getIndex(
                        prevState.activeOption,
                        prevState.filteredOptions,
                    );

                    activeIndex = key === 'ArrowUp' ?
                        Math.max( activeIndex - 1, minIndex ) :
                        Math.min( activeIndex + 1, maxIndex );

                    return {
                        activeOption :
                                  prevState.filteredOptions[ activeIndex ].id,
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
                    prevState.filteredOptions,
                ).id,
                inputValue :
                getOption(
                    prevState.activeOption,
                    prevState.filteredOptions,
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
                prevState.filteredOptions,
            ).id;

            return { activeOption };
        } );
    }

    render()
    {
        const {
            id = generateId( 'ComboBoxState' ),
            options,
        } = this.props;

        const {
            activeOption,
            inputValue,
            isOpen,
            selection,
        } = this.state;

        return (
            <ComboBox
                activeOption      = { activeOption }
                dropdownPosition  = "bottom"
                iconType          = { isOpen ? 'up' : 'down' }
                id                = { id }
                inputIsReadOnly
                inputValue        = { inputValue }
                isOpen            = { isOpen }
                onClickIcon       = { this.handleClickIcon }
                onClickInput      = { this.handleClickInput }
                onClickOption     = { this.handleClickOption }
                onKeyDown         = { this.handleKeyDown }
                onMouseOverOption = { this.handleMouseOverOption }
                options           = { options }
                selection         = { selection } />

        );
    }
}
