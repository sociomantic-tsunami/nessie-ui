/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                               from 'react';
import PropTypes                           from 'prop-types';

import { buildClassName, generateId }      from '../utils';
import styles                              from './textInputWithIcon.css';
import { IconButton, InputField, Tooltip } from '../index';
import InputContainer                      from '../proto/InputContainer';


const TextInputWithIcon = ( {
    aria,
    autoCapitalize,
    autoComplete,
    autoCorrect,
    className,
    cssMap,
    defaultValue,
    errorMessage,
    errorMessageIsVisible,
    errorMessagePosition,
    forceHover,
    hasError,
    iconButtonIsDisabled,
    iconPosition,
    iconTooltipIsVisible,
    iconTooltipMessage,
    iconTooltipPosition,
    iconType,
    id = generateId( 'TextInputWithIcon' ),
    inputRef,
    inputType,
    isDisabled,
    isReadOnly,
    isReadOnlyButton,
    isReadOnlyInput,
    label,
    labelPosition,
    name,
    onBlur,
    onChange,
    onClick,
    onClickIcon,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseOut,
    onMouseOutIcon,
    onMouseOver,
    onMouseOverIcon,
    placeholder,
    spellCheck,
    textAlign,
    value,
} ) =>
{
    let alignText = textAlign;

    if ( textAlign === 'auto' )
    {
        alignText = ( iconType !== 'none' && iconPosition === 'left' ) ?
            'right' : 'left';
    }

    return (
        <InputContainer
            className = { buildClassName( className, cssMap, {
                disabled : isDisabled,
                error    : hasError,
                position : iconPosition,
            } ) }
            errorMessage          = { errorMessage }
            errorMessageIsVisible = { errorMessageIsVisible }
            errorMessagePosition  = { errorMessagePosition }
            hasError              = { hasError }
            id                    = { id }
            isDisabled            = { isDisabled }
            label                 = { label }
            labelPosition         = { labelPosition }
            onMouseOut            = { onMouseOut }
            onMouseOver           = { onMouseOver }>
            <div className = { cssMap.container }>
                <InputField
                    aria           = { aria }
                    autocapitalize = { autoCapitalize }
                    autoComplete   = { autoComplete }
                    autoCorrect    = { autoCorrect }
                    className      = { cssMap.input }
                    defaultValue   = { defaultValue }
                    forceHover     = { forceHover }
                    hasError       = { hasError }
                    id             = { id }
                    inputRef       = { inputRef }
                    isDisabled     = { isDisabled }
                    isReadOnly     = { isReadOnlyInput || isReadOnly }
                    name           = { name }
                    onBlur         = { onBlur }
                    onChange       = { onChange }
                    onClick        = { onClick }
                    onFocus        = { onFocus }
                    onKeyDown      = { onKeyDown }
                    onKeyPress     = { onKeyPress }
                    onKeyUp        = { onKeyUp }
                    placeholder    = { placeholder }
                    spellcheck     = { spellCheck }
                    textAlign      = { alignText }
                    type           = { inputType }
                    value          = { value } />
                { ( iconType && iconType !== 'none' ) &&
                    <Tooltip
                        className   = { cssMap.icon }
                        hasError    = { hasError }
                        isDisabled  = { isDisabled }
                        isReadOnly  = { isReadOnly }
                        isVisible   = { iconTooltipIsVisible }
                        message     = { iconTooltipMessage }
                        noWarn
                        onMouseOut  = { onMouseOutIcon }
                        onMouseOver = { onMouseOverIcon }
                        position    = { iconTooltipPosition }>
                        <IconButton
                            hasError    = { hasError }
                            iconType    = { iconType }
                            isDisabled  = { isDisabled || iconButtonIsDisabled }
                            isFocusable = { false }
                            isReadOnly  = { isReadOnlyButton || isReadOnly }
                            onClick     = { onClickIcon } />
                    </Tooltip>
                }
            </div>
        </InputContainer>
    );
};

TextInputWithIcon.propTypes =
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
     *  HTML attribute controlling input auto capitalize
     */
    autoCapitalize : PropTypes.oneOf( [
        'on',
        'off',
        'none',
        'sentences',
        'words',
        'characters',
    ] ),
    /**
     *  HTML attribute controlling input auto complete
     */
    autoComplete          : PropTypes.string,
    /**
     *  HTML attribute controlling input auto correct (Safari-specific)
     */
    autoCorrect           : PropTypes.oneOf( [ 'on', 'off' ] ),
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
     *  Error message position relative to the icon
     */
    errorMessagePosition  : PropTypes.oneOf( [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom',
    ] ),
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
     *  icon Tooltip message text (string or JSX)
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
     *  Icon type to display (overrides customIcon)
     */
    iconType : PropTypes.oneOf( [
        'account',
        'add-circle',
        'add',
        'alert',
        'approved',
        'arrow',
        'bell',
        'board',
        'calendar',
        'close-circle',
        'close-thick',
        'close',
        'dash',
        'dashboard',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit-circle',
        'edit',
        'ended',
        'error',
        'file',
        'graph',
        'hide',
        'info',
        'inspect',
        'left',
        'lightbulb',
        'link',
        'megaphone',
        'options',
        'pending',
        'preview',
        'puzzle-piece',
        'reset',
        'right',
        'search',
        'show',
        'star-stroke',
        'star',
        'swap',
        'table',
        'up',
        'upload',
        'validation',
        'none',
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
     *  HTML input type
     */
    inputType        : PropTypes.oneOf( [ 'text', 'password' ] ),
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
     *  is read only
     */
    isReadOnlyInput  : PropTypes.bool,
    /**
     *  Label text (string or JSX node)
     */
    label            : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition    : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
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
     *  HTML attribute controlling input spell check
     */
    spellCheck       : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign        : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Input string value
     */
    value            : PropTypes.string,
};

TextInputWithIcon.defaultProps =
{
    aria                  : undefined,
    autoCapitalize        : undefined,
    autoComplete          : undefined,
    autoCorrect           : undefined,
    className             : undefined,
    cssMap                : styles,
    defaultValue          : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    iconButtonIsDisabled  : false,
    iconPosition          : 'right',
    iconTooltipIsVisible  : false,
    iconTooltipMessage    : undefined,
    iconTooltipPosition   : 'top',
    iconType              : 'none',
    id                    : undefined,
    inputRef              : undefined,
    inputType             : 'text',
    isDisabled            : false,
    isReadOnly            : false,
    isReadOnlyButton      : false,
    isReadOnlyInput       : false,
    label                 : undefined,
    labelPosition         : 'top',
    name                  : undefined,
    onBlur                : undefined,
    onChange              : undefined,
    onClick               : undefined,
    onClickIcon           : undefined,
    onFocus               : undefined,
    onKeyDown             : undefined,
    onKeyPress            : undefined,
    onKeyUp               : undefined,
    onMouseOut            : undefined,
    onMouseOutIcon        : undefined,
    onMouseOver           : undefined,
    onMouseOverIcon       : undefined,
    placeholder           : undefined,
    spellCheck            : undefined,
    textAlign             : 'auto',
    value                 : undefined,
};

export default TextInputWithIcon;
