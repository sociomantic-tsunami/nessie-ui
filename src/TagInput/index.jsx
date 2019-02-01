/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';
import { escapeRegExp } from 'lodash';

import {
    ListBox,
    ScrollBox,
} from '../index';
import withDropdown                  from '../Addons/withDropdown';
import { callMultiple, generateId }  from '../utils';
import { addPrefix }                 from '../ComboBox/utils';
import DumbTagInput                  from './dumb';


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
 * normalize array of options or tags
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

const TagInputwithDropdown = withDropdown( DumbTagInput );

export default class TagInputStateful extends React.Component
{
    static propTypes =
    {
        /**
         *  CSS class name
         */
        className        : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap           : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Initial tags (when component is uncontrolled)
         */
        defaultTags      : PropTypes.arrayOf( PropTypes.string ),
        /**
         *  Position of the dropdown relative to the input
         */
        dropdownPosition : PropTypes.oneOf( [ 'top', 'bottom' ] ),
        /**
         *  Display as error/invalid
         */
        hasError         : PropTypes.bool,
        /**
         *  Component id
         */
        id               : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled       : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly       : PropTypes.bool,
        /**
         *  Change callback function
         */
        onChange         : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder      : PropTypes.string,
        /**
         *  Tag suggestions
         */
        suggestions      : PropTypes.arrayOf( PropTypes.string ),
        /**
         *  Current tags
         */
        tags             : PropTypes.arrayOf( PropTypes.string ),
    };

    static defaultProps =
    {
        className        : undefined,
        cssMap           : undefined,
        defaultTags      : undefined,
        dropdownPosition : 'bottom',
        hasError         : false,
        id               : undefined,
        isDisabled       : false,
        isReadOnly       : false,
        onChange         : undefined,
        placeholder      : undefined,
        suggestions      : undefined,
        tags             : undefined,
    };

    constructor( props )
    {
        super( props );

        this.state = {
            activeOption    : undefined,
            filteredOptions : undefined,
            id              : undefined,
            inputValue      : '',
            isOpen          : false,
            tags            : props.defaultTags,
        };

        this.handleBlur            = this.handleBlur.bind( this );
        this.handleChangeInput     = this.handleChangeInput.bind( this );
        this.handleClickClose      = this.handleClickClose.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleFocus           = this.handleFocus.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        const options =
            normalizeOptions( props.suggestions ) || state.options || [];

        return {
            filteredOptions : state.inputValue ?
                state.filteredOptions : options,
            id   : props.id || state.id || generateId( 'TagInput' ),
            options,
            tags : props.tags || state.tags || [],
        };
    }

    handleBlur()
    {
        this.setState( { isOpen: false } );
    }

    handleChangeInput( { value } )
    {
        this.setState( ( { options } ) =>
        {
            const filteredOptions = options.filter( ( { text } ) =>
                text.match( new RegExp( escapeRegExp( value ), 'i' ) ) );

            const activeOption = ( value && filteredOptions.length ) ?
                filteredOptions[ 0 ].id : undefined;

            return {
                activeOption,
                filteredOptions,
                inputValue : value,
            };
        } );
    }

    handleClickClose( { value } )
    {
        this.setState( ( { tags } ) =>
        {
            const newTags = tags.filter( tag => tag !== value );

            const { onChange } = this.props;
            if ( typeof onChange === 'function' )
            {
                onChange( { tags: newTags } );
            }

            return { tags: newTags };
        } );
    }

    handleClickOption( { id } )
    {
        this.setState( ( { filteredOptions, tags } ) =>
        {
            const option = getOption( id, filteredOptions );
            const newTags = [ ...tags, option.text ];

            const { onChange } = this.props;
            if ( typeof onChange === 'function' )
            {
                onChange( { tags: newTags } );
            }

            return {
                activeOption    : undefined,
                filteredOptions : undefined,
                inputValue      : '',
                tags            : newTags,
            };
        } );
    }

    handleFocus()
    {
        this.setState( { isOpen: true } );
    }

    handleKeyDown( { preventNessieDefault, key } )
    {
        if ( key === 'Backspace' )
        {
            this.setState( ( { inputValue, tags } ) =>
            {
                let newTags = tags;
                if ( !inputValue )
                {
                    newTags = tags.slice( 0, -1 );

                    const { onChange } = this.props;
                    if ( typeof onChange === 'function' )
                    {
                        onChange( { tags: newTags } );
                    }
                }

                return { tags: newTags };
            } );
        }
        else if ( key === 'Enter' )
        {
            this.setState( ( {
                activeOption,
                filteredOptions,
                inputValue,
                tags,
            } ) =>
            {
                let newTag;

                if ( !tags.find( tag => tag === inputValue ) )
                {
                    if ( activeOption )
                    {
                        const option =
                            getOption( activeOption, filteredOptions );

                        newTag = option.text;
                    }
                    else if ( inputValue )
                    {
                        newTag = inputValue;
                    }
                }

                let newTags = tags;
                if ( newTag )
                {
                    newTags = [ ...tags, newTag ];

                    const { onChange } = this.props;
                    if ( typeof onChange === 'function' )
                    {
                        onChange( { tags: newTags } );
                    }
                }

                return {
                    activeOption    : undefined,
                    filteredOptions : undefined,
                    inputValue      : '',
                    tags            : newTags,
                };
            } );
        }
        else if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            preventNessieDefault();

            this.setState( ( { activeOption, isOpen } ) =>
            {
                const { filteredOptions } = this.state;

                if ( isOpen && filteredOptions.length )
                {
                    const minIndex = 0;
                    const maxIndex = filteredOptions.length - 1;

                    let activeIndex = getIndex( activeOption, filteredOptions );

                    activeIndex = key === 'ArrowUp' ?
                        Math.max( activeIndex - 1, minIndex ) :
                        Math.min( activeIndex + 1, maxIndex );

                    return {
                        activeOption : filteredOptions[ activeIndex ].id,
                    };
                }

                return { isOpen: true };
            } );
        }
    }

    handleMouseOutOption()
    {
        this.setState( { activeOption: undefined } );
    }

    handleMouseOverOption( { id } )
    {
        this.setState( { activeOption: id } );
    }

    render()
    {
        const { onChange, ...props } = this.props;

        const {
            activeOption,
            filteredOptions,
            id,
            inputValue,
            isOpen,
            tags,
        } = this.state;

        const listBoxOptions = filteredOptions.reduce( ( result, opt ) =>
        {
            if ( !tags.find( tag => tag === opt.id  ) )
            {
                result.push( opt );
            }
            return result;
        }, [] );

        const dropdownContent = listBoxOptions.length > 0 && (
            <ScrollBox height = "50vh" scroll = "vertical">
                <ListBox
                    activeOption      = { activeOption }
                    id                = { addPrefix( 'listbox', id ) }
                    isFocusable       = { false }
                    onClickOption     = { this.handleClickOption }
                    onMouseOutOption  = { this.handleMouseOutOption }
                    onMouseOverOption = { this.handleMouseOverOption }
                    options           = { listBoxOptions } />
            </ScrollBox>
        );


        return (
            <TagInputwithDropdown
                { ...props }
                dropdownIsOpen   = { listBoxOptions.length > 0 && isOpen }
                dropdownProps    = { { children: dropdownContent } }
                id               = { id }
                inputValue       = { inputValue }
                onBlur           = { callMultiple( this.handleBlur, this.props.onBlur ) } // temporary fix
                onChangeInput    = { this.handleChangeInput }
                onClickClose     = { this.handleClickClose }
                onFocus          = { callMultiple( this.handleFocus, this.props.onFocus ) } // temporary fix
                onKeyDown        = { callMultiple( this.handleKeyDown, this.props.onKeyDown ) } // temporary fix
                tags             = { tags } />
        );
    }
}
