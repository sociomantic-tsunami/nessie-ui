/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React          from 'react';
import PropTypes      from 'prop-types';

import { Text }       from '../index';
import { generateId } from '../utils';


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
        isChecked   : false,
        isDisabled  : false,
        isReadOnly  : false,
        label       : undefined,
        name        : undefined,
        onChange    : undefined,
        onMouseOut  : undefined,
        onMouseOver : undefined,
        type        : 'checkbox',
        value       : undefined,
    };

    inputRef = React.createRef();

    focus()
    {
        this.inputRef.current.focus();
    }

    render()
    {
        const {
            children,

            cssMap,
            id = generateId( 'Checkable' ),
            isDisabled,
            isChecked,
            isReadOnly,
            label,
            name,
            onBlur,
            onClick,
            onChange,
            onFocus,
            onMouseOut,
            onMouseOver,
            type,
            value,
        } = this.props;

        let labelContent = children || label;

        if ( typeof labelContent === 'string' )
        {
            labelContent =
                <Text className = { cssMap.labelText }>{ labelContent }</Text>;
        }

        return (
            <div
                className    = { cssMap.main }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }>
                <input
                    checked        = { isChecked }
                    className      = { cssMap.input }
                    disabled       = { isDisabled || isReadOnly }
                    id             = { id }
                    name           = { name }
                    onBlur         = { onBlur }
                    onClick        = { onClick }
                    onChange       = { onChange }
                    onFocus        = { onFocus }
                    ref            = { this.inputRef }
                    type           = { type }
                    value          = { value } />
                <label className = { cssMap.label } htmlFor = { id }>
                    <span className = { cssMap.labelContent }>
                        { labelContent }
                    </span>
                </label>
            </div>
        );
    }
}
