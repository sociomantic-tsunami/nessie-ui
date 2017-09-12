import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Checkable            from '../proto/Checkable';

export default class Checkbox extends Component
{
    static propTypes =
    {
        /**
        *  Label text string
        */
        label       : PropTypes.string,
        /**
        *  Display as checked
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
        *  Display as error/invalid
        */
        hasError    : PropTypes.bool,
        /**
         * Display as hover when required from another component
         */
        forceHover  : PropTypes.bool,
        /**
        *  HTML value attribute
        */
        value       : PropTypes.string,
        /**
        *  HTML id attribute (override default)
        */
        id          : PropTypes.string,
        /**
        *  Checkbox group name
        */
        name        : PropTypes.string,
        /**
         *  OnChange callback function: ( e ) => { ... }
         */
        onChange    : PropTypes.func,
         /*  onMouseOver callback function : ( e ) => { ... }
         */
        onMouseOver : PropTypes.func,
        /**
         *  onMouseOut callback function : ( e ) => { ... }
         */
        onMouseOut  : PropTypes.func,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef    : PropTypes.func,
    };

    static defaultProps =
    {
        isChecked  : false,
        isDisabled : false,
        isReadOnly : false,
        hasError   : false,
        forceHover : false,
        cssMap     : require( './checkbox.css' )
    };

    render()
    {
        return (
            <Checkable { ...this.props } type = "checkbox" />
        );
    }
}
