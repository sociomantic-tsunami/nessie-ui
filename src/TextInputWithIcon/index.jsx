/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { attachEvents, useTheme }   from '../utils';

import { IconButton, TextInput }    from '..';


const componentName = 'TextInputWithIcon';

const TextInputWithIcon = ( props ) =>
{
    const cssMap = useTheme( componentName, props );

    const {
        aria,
        autoCapitalize,
        autoComplete,
        autoCorrect,
        defaultValue,
        forceHover,
        hasError,
        iconButtonIsDisabled,
        iconPosition,
        iconType,
        id,
        inputRef,
        inputType,
        isDisabled,
        isReadOnly,
        name,
        onChangeInput,
        onClickIcon,
        onKeyDownInput,
        placeholder,
        spellCheck,
        textAlign,
        value,
    } = props;

    let alignText = textAlign;

    if ( textAlign === 'auto' )
    {
        alignText = ( iconType !== 'none' && iconPosition === 'left' ) ?
            'right' : 'left';
    }

    return (
        <div { ...attachEvents( props ) } className = { cssMap.main }>
            <TextInput
                aria           = { aria }
                autocapitalize = { autoCapitalize }
                autoComplete   = { autoComplete }
                autoCorrect    = { autoCorrect }
                className      = { cssMap.input }
                defaultValue   = { defaultValue }
                forceHover     = { forceHover }
                hasError       = { hasError }
                id             = { id }
                isDisabled     = { isDisabled }
                isReadOnly     = { isReadOnly }
                name           = { name }
                onChange       = { onChangeInput }
                onKeyDown      = { onKeyDownInput }
                placeholder    = { placeholder }
                ref            = { inputRef }
                spellcheck     = { spellCheck }
                textAlign      = { alignText }
                type           = { inputType }
                value          = { value } />
            { ( iconType && iconType !== 'none' ) &&
                <IconButton
                    className   = { cssMap.icon }
                    hasError    = { hasError }
                    iconType    = { iconType }
                    isDisabled  = { isDisabled || iconButtonIsDisabled }
                    isFocusable = { false }
                    onClick     = { onClickIcon } />
            }
        </div>
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
    autoComplete         : PropTypes.string,
    /**
     *  HTML attribute controlling input auto correct (Safari-specific)
     */
    autoCorrect          : PropTypes.oneOf( [ 'on', 'off' ] ),
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
     *  Icon type to display (see https://feathericons.com/)
     */
    iconType             : PropTypes.string,
    /**
     *  Component id
     */
    id                   : PropTypes.string,
    /**
     *  Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef             : PropTypes.func,
    /**
     *  HTML input type
     */
    inputType            : PropTypes.oneOf( [ 'text', 'password' ] ),
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
     *  Blur callback function
     */
    onBlur               : PropTypes.func,
    /**
     *  Input change callback function
     */
    onChangeInput        : PropTypes.func,
    /**
     *  Click callback function
     */
    onClick              : PropTypes.func,
    /**
     *  Icon click callback function
     */
    onClickIcon          : PropTypes.func,
    /**
     *  Focus callback function
     */
    onFocus              : PropTypes.func,
    /**
     *  Input key down callback function
     */
    onKeyDownInput       : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut           : PropTypes.func,
    /**
     *  Mouse over  callback function
     */
    onMouseOver          : PropTypes.func,
    /**
     *  Placeholder text
     */
    placeholder          : PropTypes.string,
    /**
     *  HTML attribute controlling input spell check
     */
    spellCheck           : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign            : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Input string value
     */
    value                : PropTypes.string,
};

TextInputWithIcon.defaultProps =
{
    aria                 : undefined,
    autoCapitalize       : undefined,
    autoComplete         : undefined,
    autoCorrect          : undefined,
    className            : undefined,
    cssMap               : undefined,
    defaultValue         : undefined,
    forceHover           : false,
    hasError             : false,
    iconButtonIsDisabled : false,
    iconPosition         : 'right',
    iconType             : 'none',
    id                   : undefined,
    inputRef             : undefined,
    inputType            : 'text',
    isDisabled           : false,
    isReadOnly           : false,
    name                 : undefined,
    onBlur               : undefined,
    onChangeInput        : undefined,
    onClick              : undefined,
    onClickIcon          : undefined,
    onFocus              : undefined,
    onKeyDownInput       : undefined,
    onMouseOut           : undefined,
    onMouseOver          : undefined,
    placeholder          : undefined,
    spellCheck           : undefined,
    textAlign            : 'auto',
    value                : undefined,
};

TextInputWithIcon.displayName = componentName;

export default TextInputWithIcon;
