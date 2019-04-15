/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, {
    useState,
    useCallback,
    forwardRef,
}                               from 'react';
import PropTypes                from 'prop-types';

import { TextInputWithIcon }    from '..';


const componentName = 'PasswordInput';

const PasswordInput = forwardRef( ( props, ref ) =>
{
    const [ passwordIsVisibleState,
        setPasswordIsVisibleState ] = useState( false );

    const passwordIsVisible =
        props.passwordIsVisible || passwordIsVisibleState;

    const {
        id,
        onClickIcon,
        style,
    } = props;

    const handleClickIcon = useCallback( ( payload, e ) =>
    {
        let nessieDefaultPrevented = false;

        if ( typeof onClickIcon === 'function' )
        {
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
            setPasswordIsVisibleState( !passwordIsVisibleState );
        }
    }, [ id, onClickIcon, passwordIsVisibleState ] );

    return (
        <TextInputWithIcon
            { ...props }
            autoCapitalize = "off"
            autoComplete   = "off"
            autoCorrect    = "off"
            iconType       = { passwordIsVisible ? 'eye-off' : 'eye' }
            id             = { id }
            inputType      = { passwordIsVisible ? 'text' : 'password' }
            onClickIcon    = { handleClickIcon }
            ref            = { ref }
            spellCheck     = { false }
            style          = { style } />
    );
} );

PasswordInput.displayComponent = componentName;

PasswordInput.propTypes =
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
     *  Default input string value
     */
    defaultValue         : PropTypes.string,
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
    passwordIsVisible    : PropTypes.bool,
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
    /**
     *  Style overrides
     */
    style                : PropTypes.objectOf( PropTypes.string ),
};

PasswordInput.defaultProps =
{
    aria                 : undefined,
    className            : undefined,
    cssMap               : undefined,
    defaultValue         : undefined,
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
    style                : undefined,
    textAlign            : 'auto',
    value                : undefined,
};

export default PasswordInput;
