/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React        from 'react';
import PropTypes    from 'prop-types';

import { TagInput } from '../index';


export default class TagInputStateful extends React.Component
{
    static propTypes =
    {
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
        className    : undefined,
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

    constructor( props )
    {
        super( props );

        this.state = {
            tags  : props.tags,
            value : props.value,
        };

        this.handleClickClose = this.handleClickClose.bind( this );
        this.handleKeyPress = this.handleKeyPress.bind( this );
    }

    handleClickClose( e )
    {
        const { tags } = this.state;
        const callback = this.props.onClickClose;

        if ( callback )
        {
            callback( e.target.value );
        }

        const closeTag = e.target.value;

        const newItems = tags.filter( ( item ) => ( typeof item === 'string' ?
            item !== closeTag : item.value !== closeTag ) );

        this.setState( { tags: newItems } );
    }

    handleKeyPress( e )
    {
        const { value } = this.state;
        const callback = this.props.onKeyPress;

        if ( callback )
        {
            callback( e );
        }

        if ( e.keyCode === 8 && value === '' )
        {
            this.handleClickClose();
        }
    }

    render()
    {
        const { props } = this;

        return (
            <TagInput
                { ...props }
                onClickClose = { this.handleClickClose }
                onKeyPress   = { this.handleKeyPress }
                tags         = { this.state.tags }
                value        = { this.state.value } />
        );
    }
}
