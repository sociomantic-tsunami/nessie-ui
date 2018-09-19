/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                          from 'react';
import PropTypes                      from 'prop-types';

import Text                           from '../Text';
import { buildClassName, generateId } from '../utils';


export default class Checkable extends React.Component
{
    static propTypes =
    {
        /**
         *  Label content (JSX node; overrides label prop)
         */
        children    : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className   : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap      : PropTypes.objectOf( PropTypes.string ),
        /**
         * Display as hover when required from another component
         */
        forceHover  : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError    : PropTypes.bool,
        /**
         *  HTML id attribute
         */
        id          : PropTypes.string,
        /**
         *  Display as checked (controlled input)
         */
        isChecked   : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled  : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly  : PropTypes.bool,
        /**
         *  Label content (string)
         */
        label       : PropTypes.string,
        /**
         *  Checkbox group name
         */
        name        : PropTypes.string,
        /**
         *  OnBlur callback function: ( e ) => { ... }
         */
        onBlur      : PropTypes.func,
        /**
         *  OnClick callback function: ( e ) => { ... }
         */
        onClick     : PropTypes.func,
        /**
         *  OnChange callback function: ( e ) => { ... }
         */
        onChange    : PropTypes.func,
        /**
         *  onFocus callback function: ( e ) => { ... }
         */
        onFocus     : PropTypes.func,
        /**
         *  onMouseOut callback function : ( e ) => { ... }
         */
        onMouseOut  : PropTypes.func,
        /**
         *  onMouseOver callback function : ( e ) => { ... }
         */
        onMouseOver : PropTypes.func,
        /**
         *  Input type
         */
        type        : PropTypes.oneOf( [ 'checkbox', 'radio' ] ),
        /**
         *  HTML value attribute
         */
        value       : PropTypes.string,
    };

    static defaultProps =
    {
        children    : undefined,
        className   : undefined,
        cssMap      : undefined,
        forceHover  : false,
        hasError    : false,
        id          : undefined,
        isDisabled  : false,
        isChecked   : false,
        isReadOnly  : false,
        label       : undefined,
        name        : undefined,
        onChange    : undefined,
        onMouseOut  : undefined,
        onMouseOver : undefined,
        type        : 'checkbox',
        value       : undefined,
    };

    constructor( props )
    {
        super();

        this.props = props;

        this.handleClick = this.handleClick.bind( this );
        this.handleFocus = this.handleFocus.bind( this );
    }

    handleFocus( event )
    {
        const { onFocus } = this.props;

        if ( onFocus )
        {
            onFocus( event );
        }

        if ( event.defaultPrevented || this.props.isDisabled )
        {
            return;
        }
    }

    handleChange( event )
    {
        const { onChange } = this.props;

        if ( onChange )
        {
            onChange( event );
        }

        if ( event.defaultPrevented || this.props.isDisabled )
        {
            return;
        }
    }

    handleClick( event )
    {
        const { onClick } = this.props;

        if ( onClick )
        {
            onClick( event );
        }

        if ( event.defaultPrevented || this.props.isDisabled )
        {
            return;
        }
    }

    render()
    {
        const {
            children,
            className,
            cssMap,
            forceHover,
            hasError,
            id = generateId( 'Checkable' ),
            isDisabled,
            isChecked,
            isReadOnly,
            label,
            name,
            onBlur,
            onChange,
            onMouseOut,
            onMouseOver,
            type,
            value,
        } = this.props;

        let labelText = children || label;

        if ( typeof labelText === 'string' )
        {
            labelText =
                <Text className = { cssMap.labelText }>{ labelText }</Text>;
        }

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    disabled    : isDisabled,
                    error       : !isDisabled && hasError,
                    fakeHovered : !isDisabled && forceHover,
                } ) }
                onMouseLeave = { onMouseOut }
                onMouseEnter = { onMouseOver }>
                <input
                    checked        = { isChecked }
                    className      = { cssMap.input }
                    disabled       = { isDisabled || isReadOnly }
                    id             = { id }
                    name           = { name }
                    onClick        = { this.handleClick }
                    onChange       = { onChange }
                    onFocus        = { this.handleFocus }
                    onBlur         = { onBlur }
                    type           = { type }
                    value          = { value } />
                <label className = { cssMap.label } htmlFor = { id }>
                    { labelText }
                </label>
            </div>
        );
    }
}
