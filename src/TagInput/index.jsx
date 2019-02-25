/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children } from 'react';
import PropTypes           from 'prop-types';
import { escapeRegExp }    from 'lodash';

import {
    ListBox,
    ScrollBox,
} from '../index';
import Popup               from '../Popup';
import PopperWrapper       from '../PopperWrapper';
import {
    attachEvents,
    callMultiple,
    generateId,
}  from '../utils';
import { buildTagsFromValues } from './utils';
import ThemeContext            from '../Theming/ThemeContext';
import { createCssMap }        from '../Theming';
import { addPrefix }           from '../ComboBox/utils';


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

export default class TagInput extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Node containing Tag components ( overrides value prop )
         */
        children     : PropTypes.node,
        /**
         *  CSS class name
         */
        className    : PropTypes.string,
        /**
         *  id of the DOM element used as container for popup listbox
         */
        container    : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap       : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Initial value (when component is uncontrolled)
         */
        defaultValue : PropTypes.arrayOf( PropTypes.string ),
        /**
         *  Display as error/invalid
         */
        hasError     : PropTypes.bool,
        /**
         *  Component id
         */
        id           : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled   : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly   : PropTypes.bool,
        /**
         *  Change callback function
         */
        onChange     : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder  : PropTypes.string,
        /**
         *  Tag suggestions
         */
        suggestions  : PropTypes.arrayOf( PropTypes.string ),
        /**
         * Array of strings to build Tag components
         */
        value        : PropTypes.arrayOf( PropTypes.string ),
    };

    static defaultProps =
    {
        children     : undefined,
        className    : undefined,
        container    : undefined,
        cssMap       : undefined,
        defaultValue : undefined,
        hasError     : false,
        id           : undefined,
        isDisabled   : false,
        isReadOnly   : false,
        onChange     : undefined,
        placeholder  : undefined,
        suggestions  : undefined,
        value        : undefined,
    };

    static displayName = 'TagInput';

    inputRef = React.createRef();
    outerRef = React.createRef();

    constructor( props )
    {
        super( props );

        this.state = {
            activeOption    : undefined,
            filteredOptions : undefined,
            id              : undefined,
            inputValue      : '',
            isOpen          : false,
            value           : Array.isArray( props.defaultValue ) ?
                props.defaultValue : [],
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
            filteredOptions : state.filteredOptions || options,
            id              : props.id || state.id || generateId( 'TagInput' ),
            options,
            value           : ( Array.isArray( props.value ) && props.value ) ||
                  state.value,
        };
    }

    enterNewTag()
    {
        this.setState( ( {
            activeOption,
            filteredOptions,
            inputValue,
            value,
        } ) =>
        {
            let newTag;

            if ( !value.find( tag => tag === inputValue ) )
            {
                if ( activeOption )
                {
                    const option =
                        getOption( activeOption, filteredOptions );

                    newTag = value.indexOf( activeOption ) !== -1 ?
                        inputValue : option.text;
                }
                else if ( inputValue )
                {
                    newTag = inputValue;
                }
            }

            let newTags = value;
            if ( newTag )
            {
                newTags = [ ...value, newTag ];

                const { onChange } = this.props;
                if ( typeof onChange === 'function' )
                {
                    onChange( { value: newTags } );
                }
            }

            return {
                activeOption    : undefined,
                filteredOptions : this.filterOptions( newTags ),
                inputValue      : '',
                value           : newTags,
            };
        } );
    }

    focus()
    {
        this.inputRef.current.focus();
    }

    filterOptions( tags )
    {
        return this.state.options.filter( option =>
            !tags.includes( option.text ) );
    }

    handleBlur()
    {
        this.setState( { isOpen: false } );
        this.enterNewTag();
    }

    handleChangeInput( e )
    {
        e.stopPropagation();
        const { value } = e.target;

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

    handleClickClose( { id } )
    {
        this.setState( ( { value } ) =>
        {
            const newTags = value.filter( tag => tag !== id );

            const { onChange } = this.props;
            if ( typeof onChange === 'function' )
            {
                onChange( { value: newTags } );
            }

            return {
                value           : newTags,
                filteredOptions : this.filterOptions( newTags ),
            };
        } );
    }

    handleClickOption( { id } )
    {
        this.setState( ( { filteredOptions, value } ) =>
        {
            const option = getOption( id, filteredOptions );
            const newTags = [ ...value, option.text ];

            const { onChange } = this.props;
            if ( typeof onChange === 'function' )
            {
                onChange( { value: newTags } );
            }

            return {
                activeOption    : undefined,
                filteredOptions : this.filterOptions( newTags ),
                inputValue      : '',
                value           : newTags,
            };
        } );
    }

    handleFocus()
    {
        this.setState( { isOpen: true } );
    }

    handleKeyDown( e )
    {
        const { key } = e;

        if ( key === 'Backspace' )
        {
            this.setState( ( { inputValue, value } ) =>
            {
                let newTags = value;
                if ( !inputValue )
                {
                    newTags = value.slice( 0, -1 );

                    const { onChange } = this.props;
                    if ( typeof onChange === 'function' )
                    {
                        onChange( { value: newTags } );
                    }
                }

                return {
                    value           : newTags,
                    filteredOptions : this.filterOptions( newTags ),
                };
            } );
        }
        else if ( key === 'Enter' )
        {
            this.enterNewTag();
        }
        else if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            e.preventDefault();

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
        const {
            children,
            container,
            cssMap = createCssMap( this.context.TagInput, this.props ),
            hasError,
            isDisabled,
            isReadOnly,
            placeholder,
        } = this.props;

        const {
            activeOption,
            filteredOptions,
            id,
            inputValue,
            isOpen,
            value,
        } = this.state;

        const listBoxOptions = filteredOptions.reduce( ( result, opt ) =>
        {
            if ( !value.find( tag => tag === opt.id  ) )
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

        let items = children ?
            Children.toArray( children ) : buildTagsFromValues( value );

        items = items.map( tag => (
            React.cloneElement( tag, {
                ...tag.props,
                isDisabled : isDisabled || tag.props.isDisabled,
                isReadOnly : isReadOnly || tag.props.isReadOnly,
                onClick    : this.handleClickClose,
            } )
        ) );

        const popperChildren = (
            <label
                { ...attachEvents( this.props ) }
                className = { cssMap.main }
                htmlFor   = { id }
                ref       = { this.outerRef }>
                { items }
                <input
                    className   = { cssMap.input }
                    disabled    = { isDisabled }
                    id          = { id }
                    onBlur      = { callMultiple(
                        this.handleBlur,
                        this.props.onBlur,
                    ) } // temporary fix
                    onChange    = { this.handleChangeInput }
                    onFocus     = { callMultiple(
                        this.handleFocus,
                        this.props.onFocus,
                    ) } // temporary fix
                    onKeyDown   = { callMultiple(
                        this.handleKeyDown,
                        this.props.onKeyDown,
                    ) } // temporary fix
                    placeholder = { placeholder }
                    readOnly    = { isReadOnly }
                    ref         = { this.inputRef }
                    type        = "text"
                    value       = { inputValue } />
            </label>
        );

        const popperPopup = (
            <Popup
                hasError = { hasError }>
                { dropdownContent }
            </Popup>
        );

        return (
            <PopperWrapper
                container      = { container || 'nessie-overlay' }
                isVisible      = { listBoxOptions.length > 0 && isOpen }
                matchRefWidth
                popper         = { popperPopup }
                popperOffset   = "S"
                popperPosition = "bottom">
                { popperChildren }
            </PopperWrapper>
        );
    }
}
