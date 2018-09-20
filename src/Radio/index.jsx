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

import Checkable      from '../proto/Checkable';
import { generateId } from '../utils';
import styles         from './radio.css';


export default class Radio extends React.Component
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
         *  Radio group name
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
         *  HTML value attribute
         */
        value       : PropTypes.string,
    };

    static defaultProps =
    {
        children    : undefined,
        className   : undefined,
        cssMap      : styles,
        forceHover  : false,
        hasError    : false,
        id          : undefined,
        isDisabled  : false,
        isChecked   : false,
        isReadOnly  : false,
        label       : undefined,
        name        : undefined,
        onBlur      : undefined,
        onChange    : undefined,
        onClick     : undefined,
        onFocus     : undefined,
        onMouseOut  : undefined,
        onMouseOver : undefined,
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
            id = generateId( 'Radio' ),
            ...props
        } = this.props;

        return (
            <Checkable
                { ...props }
                id   = { id }
                ref  = { this.inputRef }
                type = "radio" />
        );
    }
}
