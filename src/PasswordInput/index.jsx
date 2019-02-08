/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                 from 'react';
import PropTypes             from 'prop-types';

import { TextInputWithIcon } from '..';

import { generateId }        from '../utils';


export default class PasswordInput extends React.Component
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
         *  Component id
         */
        id                   : PropTypes.string,
        /**
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef             : PropTypes.func,
        /**
         *  Display as disabled
         */
        isDisabled           : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly           : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name                 : PropTypes.string,
        /**
         *  Input change callback function
         */
        onChangeInput        : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon          : PropTypes.func,
        /**
         *  Show password as plain text
         */
        passwordIsVisible    : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder          : PropTypes.string,
        /**
         *  Input text alignment
         */
        textAlign            : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
        /**
         *  Input string value
         */
        value                : PropTypes.string,
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
        id                   : undefined,
        inputRef             : undefined,
        isDisabled           : false,
        isReadOnly           : false,
        name                 : undefined,
        onChangeInput        : undefined,
        onClickIcon          : undefined,
        passwordIsVisible    : false,
        placeholder          : undefined,
        textAlign            : 'auto',
        value                : '',
    };

    constructor( props )
    {
        super();

        this.state = {
            id                : props.id || generateId( 'PasswordInput' ),
            passwordIsVisible : false,
        };

        this.handleClickIcon = this.handleClickIcon.bind( this );
    }

    handleClickIcon( payload, e )
    {
        const { onClickIcon } = this.props;

        let nessieDefaultPrevented = false;

        if ( typeof onClickIcon === 'function' )
        {
            const { id } = this.state;

            onClickIcon(
                {
                    id,
                    preventNessieDefault()
                    {
                        nessieDefaultPrevented = true;
                    },
                },
                e,
            );
        }

        if ( !nessieDefaultPrevented )
        {
            this.setState( prevState => ( {
                passwordIsVisible : !prevState.passwordIsVisible,
            } ) );
        }
    }

    render()
    {
        const { props } = this;
        const { id } = this.state;

        const passwordIsVisible =
            this.props.passwordIsVisible || this.state.passwordIsVisible;

        return (
            <TextInputWithIcon
                { ...props }
                autoCapitalize = "off"
                autoComplete   = "off"
                autoCorrect    = "off"
                iconType       = { passwordIsVisible ? 'eye-off' : 'eye' }
                id             = { id }
                inputType      = { passwordIsVisible ? 'text' : 'password' }
                onClickIcon    = { this.handleClickIcon }
                spellCheck     = { false } />
        );
    }
}
