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

import { generateId, buildClassName } from '../utils';
import { TextInputWithIcon }          from '../index';
import styles                         from './passwordInput.css';


const PasswordInput = ( {
    className,
    cssMap,
    id = generateId( 'PasswordInput' ),
    passwordIsVisible,
    ...props
} ) => (
    <TextInputWithIcon
        { ...props }
        autoCapitalize = "off"
        autoComplete   = "off"
        autoCorrect    = "off"
        className      = { buildClassName( className, cssMap ) }
        iconType       = { passwordIsVisible ? 'hide' : 'show' }
        id             = { id }
        inputType      = { passwordIsVisible ? 'text' : 'password' }
        spellCheck     = { false } />
);


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
    className             : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap                : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Initial input string value
     */
    defaultValue          : PropTypes.string,
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
     *  Error Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
    *   Error message position relative to the icon
    */
    errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
    /**
     *  Display as hover when required from another component
     */
    forceHover            : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     *  Display Button icon as disabled
     */
    iconButtonIsDisabled  : PropTypes.bool,
    /**
     *  Alignment of the icon
     */
    iconPosition          : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  Display the icon tooltip
     */
    iconTooltipIsVisible  : PropTypes.bool,
    /**
     *  icon Tooltip message text (string or JSX)
     */
    iconTooltipMessage    : PropTypes.node,
    /**
     *  Icon Tooltip position relative to icon
     */
    iconTooltipPosition   : PropTypes.oneOf( [
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
    id                : PropTypes.string,
    /**
     *  Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef          : PropTypes.func,
    /**
     *  Display as disabled
     */
    isDisabled        : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly        : PropTypes.bool,
    /**
     *  Display as read-only for IconButton
     */
    isReadOnlyButton  : PropTypes.bool,
    /**
     *  Display as read-only for TextInput
     */
    isReadOnlyInput   : PropTypes.bool,
    /**
     *  Label text (string or JSX node)
     */
    label             : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition     : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     *  HTML name attribute
     */
    name              : PropTypes.string,
    /**
     *  Blur callback function
     */
    onBlur            : PropTypes.func,
    /**
     *  Input change callback function
     */
    onChange          : PropTypes.func,
    /**
     *  Input click callback function
     */
    onClick           : PropTypes.func,
    /**
     *  Icon click callback function
     */
    onClickIcon       : PropTypes.func,
    /**
     *  Focus callback function
     */
    onFocus           : PropTypes.func,
    /**
     *  Key down callback function
     */
    onKeyDown         : PropTypes.func,
    /**
     *  Key press callback function
     */
    onKeyPress        : PropTypes.func,
    /**
     *  Key up callback function
     */
    onKeyUp           : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut        : PropTypes.func,
    /**
     *  Icon mouse out callback function
     */
    onMouseOutIcon    : PropTypes.func,
    /**
     *  Mouse over  callback function
     */
    onMouseOver       : PropTypes.func,
    /**
     *  Icon mouse over callback function
     */
    onMouseOverIcon   : PropTypes.func,
    /**
     *  alternates input and icon types accordingly.
     */
    passwordIsVisible : PropTypes.bool,
    /**
     *  Placeholder text
     */
    placeholder       : PropTypes.string,
    /**
     *  Input text alignment
     */
    textAlign         : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Input string value
     */
    value             : PropTypes.string,
};

PasswordInput.defaultProps =
{
    aria                  : undefined,
    className             : undefined,
    cssMap                : styles,
    defaultValue          : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    iconButtonIsDisabled  : undefined,
    iconPosition          : 'right',
    iconTooltipIsVisible  : undefined,
    iconTooltipMessage    : undefined,
    iconTooltipPosition   : undefined,
    id                    : undefined,
    inputRef              : undefined,
    isDisabled            : false,
    isReadOnly            : false,
    isReadOnlyButton      : undefined,
    isReadOnlyInput       : undefined,
    label                 : undefined,
    labelPosition         : 'top',
    name                  : undefined,
    onBlur                : undefined,
    onChange              : undefined,
    onClickIcon           : undefined,
    onFocus               : undefined,
    onKeyDown             : undefined,
    onKeyPress            : undefined,
    onKeyUp               : undefined,
    onMouseOut            : undefined,
    onMouseOutIcon        : undefined,
    onMouseOver           : undefined,
    onMouseOverIcon       : undefined,
    passwordIsVisible     : undefined,
    placeholder           : undefined,
    textAlign             : 'auto',
    value                 : undefined,
};

export default PasswordInput;
