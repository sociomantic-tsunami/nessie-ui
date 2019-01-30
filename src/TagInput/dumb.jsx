/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children } from 'react';
import PropTypes           from 'prop-types';

import {
    attachEvents,
    createEventHandler,
    generateId,
} from '../utils';
import { buildTagsFromValues } from './utils';
import ThemeContext            from '../Theming/ThemeContext';
import { createCssMap }        from '../Theming';


export default class DumbTagInput extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Node containing Tag components ( overrides tags prop )
         */
        children      : PropTypes.node,
        /**
         *  CSS class name
         */
        className     : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap        : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Display as error/invalid
         */
        hasError      : PropTypes.bool,
        /**
         *  Component id
         */
        id            : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled    : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly    : PropTypes.bool,
        /**
         *  Input change callback function: ( { value }) => ...
         */
        onChangeInput : PropTypes.func,
        /**
         *  Button click callback function: ( { } ) => ...
         */
        onClickClose  : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder   : PropTypes.string,
        /**
         * Array of strings to build Tag components
         */
        tags          : PropTypes.arrayOf( PropTypes.string ),
        /**
         * Input's value
         */
        inputValue    : PropTypes.string,
    };

    static defaultProps =
    {
        children      : undefined,
        className     : undefined,
        cssMap        : undefined,
        hasError      : false,
        id            : undefined,
        inputValue    : undefined,
        isDisabled    : false,
        isReadOnly    : false,
        onChangeInput : undefined,
        onClickClose  : undefined,
        placeholder   : undefined,
        tags          : undefined,
    };

    static displayName = 'DumbTagInput';

    inputRef = React.createRef();

    focus()
    {
        this.inputRef.current.focus();
    }

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.TagInput, this.props ),
            id = generateId( 'DumbTagInput' ),
            inputValue,
            isDisabled,
            isReadOnly,
            onChangeInput,
            onClickClose,
            placeholder,
            tags,
        } = this.props;

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
                { ...attachEvents( this.props ) }
                className = { cssMap.main }
                htmlFor   = { id }>
                { items }
                <input
                    className   = { cssMap.input }
                    disabled    = { isDisabled }
                    id          = { id }
                    onChange    = { createEventHandler( onChangeInput ) }
                    placeholder = { placeholder }
                    readOnly    = { isReadOnly }
                    ref         = { this.inputRef }
                    type        = "text"
                    value       = { inputValue } />
            </label>
        );
    }
}
