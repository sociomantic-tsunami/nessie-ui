/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children, Component } from 'react';
import PropTypes                      from 'prop-types';

import {
    buildClassName,
    createEventHandler,
    generateId,
} from '../utils';
import { buildTagsFromValues } from './utils';
import styles                  from './tagInput.css';


export default class TagInput extends Component
{
    static propTypes =
    {
        /**
         * Node containing Tag components ( overrides tags prop )
         */
        children     : PropTypes.node,
        /**
         *  CSS class name
         */
        className    : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap       : PropTypes.objectOf( PropTypes.string ),
        /**
         * Display as hover when required from another component
         */
        forceHover   : PropTypes.bool,
        /**
        *  specifies the height for the tag input (CSS length value)
        */
        height       : PropTypes.string,
        /**
         *  Display as error/invalid
         */
        hasError     : PropTypes.bool,
        /**
         *  HTML id attribute
         */
        id           : PropTypes.string,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef     : PropTypes.func,
        /**
         *  Display as disabled
         */
        isDisabled   : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly   : PropTypes.bool,
        /**
        *  Allows container to be resize by the user
        */
        isResizable  : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name         : PropTypes.string,
        /**
         * onBlur callback function
         */
        onBlur       : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange     : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClickClose : PropTypes.func,
        /**
         * onFocus callback function
         */
        onFocus      : PropTypes.func,
        /**
         * onKeyDown callback function
         */
        onKeyDown    : PropTypes.func,
        /**
         * onKeyPress callback function
         */
        onKeyUp      : PropTypes.func,
        /**
         * onKeyUp callback function
         */
        onKeyPress   : PropTypes.func,
        /**
         *  Input mouseOut callback function
         */
        onMouseOut   : PropTypes.func,
        /**
         *  Input mouseOver callback function
         */
        onMouseOver  : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder  : PropTypes.string,
        /**
         * Array of strings to build Tag components
         */
        tags         : PropTypes.arrayOf( PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.object,
        ] ) ),
        /**
         * Input's value
         */
        value : PropTypes.string,
    };

    static defaultProps =
    {
        children     : undefined,
        className    : undefined,
        cssMap       : styles,
        forceHover   : false,
        hasError     : false,
        height       : undefined,
        id           : undefined,
        inputRef     : undefined,
        isDisabled   : false,
        isReadOnly   : false,
        isResizable  : false,
        name         : undefined,
        onBlur       : undefined,
        onChange     : undefined,
        onClickClose : undefined,
        onFocus      : undefined,
        onKeyDown    : undefined,
        onKeyPress   : undefined,
        onKeyUp      : undefined,
        onMouseOut   : undefined,
        onMouseOver  : undefined,
        placeholder  : undefined,
        tags         : undefined,
        value        : undefined,
    };

    constructor()
    {
        super();

        this.state = {
            id        : generateId( 'TagInput' ),
            isFocused : false,
        };

        this.handleBlur  = this.handleBlur.bind( this );
        this.handleFocus = this.handleFocus.bind( this );
    }

    handleBlur( event )
    {
        const { onBlur } = this.props;
        const { id } = this.state;

        if ( onBlur )
        {
            createEventHandler( onBlur, { id } )( event );
        }

        this.setState( { isFocused: false } );
    }

    handleFocus( event )
    {
        const { onFocus } = this.props;
        const { id } = this.state;

        if ( onFocus )
        {
            createEventHandler( onFocus, { id } )( event );
        }

        this.setState( { isFocused: true } );
    }

    render()
    {
        const {
            children,
            className,
            cssMap,
            forceHover,
            hasError,
            height,
            inputRef,
            isDisabled,
            isReadOnly,
            isResizable,
            name,
            onChange,
            onClickClose,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOver,
            placeholder,
            tags,
            value,
        } = this.props;

        const { id, isFocused } = this.state;

        let items = children ?
            Children.toArray( children ) : buildTagsFromValues( tags );

        items = items.map( tag =>
        {
            let handleClick;

            if ( !onClickClose )
            {
                handleClick = tag.props.onClick;
            }
            else if ( !tag.props.onClick )
            {
                handleClick =  onClickClose;
            }
            else
            {
                handleClick = ( ...args ) =>
                {
                    onClickClose( args );
                    tag.props.onClick( args );
                };
            }

            return React.cloneElement( tag, {
                ...tag.props,
                isDisabled : isDisabled || tag.props.isDisabled,
                isReadOnly : isReadOnly || tag.props.isReadOnly,
                onClick    : handleClick,
            } );
        } );

        return (
            <label
                className = { buildClassName( className, cssMap, {
                    disabled    : isDisabled,
                    error       : !isDisabled && hasError,
                    fakeHovered : !isDisabled && ( forceHover || isFocused ),
                    resizable   : isResizable,
                } ) }
                htmlFor     = { id }
                onBlur      = { this.handleBlur }
                onChange    = { createEventHandler( onChange, { id } ) }
                onFocus     = { this.handleFocus }
                onKeyDown   = { createEventHandler( onKeyDown, { id } ) }
                onKeyPress  = { createEventHandler( onKeyPress, { id } ) }
                onKeyUp     = { createEventHandler( onKeyUp, { id } ) }
                onMouseOut  = { createEventHandler( onMouseOut, { id } ) }
                onMouseOver = { createEventHandler( onMouseOver, { id } ) }
                style       = { { height } }>
                { items }
                <input
                    className   = { cssMap.input }
                    disabled    = { isDisabled }
                    id          = { id }
                    name        = { name }
                    placeholder = { placeholder }
                    readOnly    = { isReadOnly }
                    ref         = { inputRef }
                    type        = "text"
                    value       = { value } />
            </label>
        );
    }
}
