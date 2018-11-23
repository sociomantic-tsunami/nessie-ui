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

    constructor( props )
    {
        super();

        const filteredOptions = this.handleOptions( props.options );

        let defaultOption =
                         this.getOption( props.defaultOption, filteredOptions );

        defaultOption = defaultOption || filteredOptions[ 0 ];

        this.state = {
            activeOption : undefined,
            filteredOptions,
            inputValue   : defaultOption.text,
            isOpen       : false,
            selection    : defaultOption.id,
        };

        this.handleClickIcon       = this.handleClickIcon.bind( this );
        this.handleClickInput      = this.handleClickInput.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
    }

    getIndex( id, options = this.state.filteredOptions )
    {
        return options.findIndex( opt => opt.id === id );
    }

    getOption( id, options = this.state.filteredOptions )
    {
        return options.find( opt => opt.id === id );
    }

    handleClickIcon( e )
    {
        e.stopPropagation();
        this.setState( prevState => ( { isOpen: !prevState.isOpen  } ) );
    }

    handleClickInput( e )
    {
        this.setState( prevState => ( { isOpen: !prevState.isOpen  } ) );
    }

    handleClickOption( e, id )
    {
        this.setState( prevState =>
        {
            const selectedOption =
                                this.getOption( id, prevState.filteredOptions );
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

                    let activeIndex = this.getIndex(
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
                this.getOption(
                    prevState.activeOption,
                    prevState.filteredOptions,
                ).id,
                inputValue :
                this.getOption(
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
            const activeOption = this.getOption(
                id,
                prevState.filteredOptions,
            ).id;

            return { activeOption };
        } );
    }

    handleOptions( options = this.state.options )
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
