/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { PasswordInput }    from '../index';

export default class PasswordInputStateful extends React.Component
{
    static propTypes =
    {
        /**
         *  ARIA properties
         */
        aria : PropTypes.objectOf( PropTypes.oneOfType( [
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
        ] ) ),
        /**
         *  Extra CSS class name
         */
        className            : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap               : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Display as hover when required from another component
         */
        forceHover           : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError             : PropTypes.bool,
        /**
         *  Display Button icon as disabled
         */
        iconButtonIsDisabled : PropTypes.bool,
        /**
         *  Alignment of the icon
         */
        iconPosition         : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Display the icon tooltip
         */
        iconTooltipIsVisible : PropTypes.bool,
        /**
         *  Icon Tooltip message text (string or JSX)
         */
        iconTooltipMessage   : PropTypes.node,
        /**
         *  Icon Tooltip position relative to icon
         */
        iconTooltipPosition  : PropTypes.oneOf( [
            'left',
            'right',
            'top',
            'bottom',
            'topLeft',
            'topRight',
        ] ),
        /**
         *  HTML id attribute
         */
        id               : PropTypes.string,
        /**
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef         : PropTypes.func,
        /**
         *  Display as disabled
         */
        isDisabled       : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly       : PropTypes.bool,
        /**
         *  Display as read-only for IconButton
         */
        isReadOnlyButton : PropTypes.bool,
        /**
         *  Display as read-only for TextInput
         */
        isReadOnlyInput  : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name             : PropTypes.string,
        /**
         *  Blur callback function
         */
        onBlur           : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange         : PropTypes.func,
        /**
         *  Input click callback function
         */
        onClick          : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon      : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus          : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown        : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress       : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp          : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut       : PropTypes.func,
        /**
         *  Icon mouse out callback function
         */
        onMouseOutIcon   : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver      : PropTypes.func,
        /**
         *  Icon mouse over callback function
         */
        onMouseOverIcon  : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder      : PropTypes.string,
        /**
         *  Input text alignment
         */
        textAlign        : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
        /**
         *  Input string value
         */
        value            : PropTypes.string,
    };

    static defaultProps =
    {
        aria                 : undefined,
        className            : undefined,
        cssMap               : undefined,
        forceHover           : false,
        hasError             : false,
        iconButtonIsDisabled : undefined,
        iconPosition         : 'right',
        iconTooltipIsVisible : undefined,
        iconTooltipMessage   : undefined,
        iconTooltipPosition  : undefined,
        id                   : undefined,
        inputRef             : undefined,
        isDisabled           : false,
        isReadOnly           : false,
        isReadOnlyButton     : undefined,
        isReadOnlyInput      : undefined,
        name                 : undefined,
        onBlur               : undefined,
        onChange             : undefined,
        onClickIcon          : undefined,
        onFocus              : undefined,
        onKeyDown            : undefined,
        onKeyPress           : undefined,
        onKeyUp              : undefined,
        onMouseOut           : undefined,
        onMouseOutIcon       : undefined,
        onMouseOver          : undefined,
        onMouseOverIcon      : undefined,
        placeholder          : undefined,
        textAlign            : 'auto',
        value                : '',
    };

    constructor()
    {
        super();

        this.state = {
            passwordIsVisible : false,
        };

        this.handleClickIcon = this.handleClickIcon.bind( this );
    }

    handleClickIcon( e )
    {
        const callback = this.props.onClickIcon;

        if ( callback )
        {
            callback( e );
        }

        this.setState( { passwordIsVisible: !this.state.passwordIsVisible } );
    }

    render()
    {
        const { props } = this;

        return (
            <PasswordInput
                { ...props }
                onClickIcon       = { this.handleClickIcon }
                passwordIsVisible = { this.state.passwordIsVisible } />
        );
    }
}
