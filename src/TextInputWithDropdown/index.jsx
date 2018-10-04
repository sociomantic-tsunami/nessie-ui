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

import {
    Column,
    FlounderDropdown,
    InputField,
    Row,
} from '../index';
import { buildClassName, generateId } from '../utils';
import styles                         from './textInputWithDropdown.css';
import InputContainer                 from '../proto/InputContainer';


const TextInputWithDropdown = ( {
    autoCapitalize,
    autoComplete,
    autoCorrect,
    className,
    cssMap,
    dropdownData,
    dropdownDefaultValue,
    dropdownPlaceholder,
    dropdownPosition,
    dropdownValue,
    errorMessage,
    errorMessageIsVisible,
    errorMessagePosition,
    forceHover,
    hasError,
    id = generateId( 'TextInputWithDropdown' ),
    inputDefaultValue,
    inputPlaceholder,
    inputRef,
    inputValue,
    isDisabled,
    isReadOnly,
    label,
    labelPosition,
    name,
    onBlur,
    onChange,
    onFocus,
    onMouseOut,
    onMouseOver,
    spellCheck,
    textAlign,
} ) =>
{
    if ( !TextInputWithDropdown.didWarn )
    {
        console.warn( 'TextInputWithDropdown: This component is deprecated and will be \
removed in the next major release.' );
        TextInputWithDropdown.didWarn = true;
    }

    let alignText = textAlign;

    if ( textAlign === 'auto' )
    {
        alignText = dropdownPosition === 'left' ? 'right' : 'left';
    }

    return (
        <InputContainer
            className = { buildClassName( className, cssMap, {
                position : dropdownPosition,
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
            <Row
                className    = { cssMap.row }
                gutters      = "S"
                onMouseOut   = { onMouseOut }
                onMouseOver  = { onMouseOver }
                verticalAlign = "middle">
                <Column>
                    <InputField
                        autoCapitalize = { autoCapitalize }
                        autoComplete   = { autoComplete }
                        autoCorrect    = { autoCorrect }
                        defaultValue   = { inputDefaultValue }
                        forceHover     = { forceHover }
                        hasError       = { hasError }
                        id             = { id }
                        inputRef       = { inputRef }
                        isDisabled     = { isDisabled }
                        isReadOnly     = { isReadOnly }
                        name           = { name }
                        onBlur         = { onBlur }
                        onChange       = { onChange }
                        onFocus        = { onFocus }
                        placeholder    = { inputPlaceholder }
                        spellCheck     = { spellCheck }
                        textAlign      = { alignText }
                        value          = { inputValue } />
                </Column>
                <Column size = "content">
                    <FlounderDropdown
                        data         = { dropdownData }
                        defaultValue = { dropdownDefaultValue }
                        forceHover   = { forceHover }
                        hasError     = { hasError }
                        isDisabled   = { isDisabled }
                        isReadOnly   = { isReadOnly }
                        onBlur       = { onBlur }
                        onChange     = { onChange }
                        onFocus      = { onFocus }
                        placeholder  = { dropdownPlaceholder }
                        value        = { dropdownValue } />
                </Column>
            </Row>
        </InputContainer>
    );
};


TextInputWithDropdown.propTypes =
{
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
    autoComplete : PropTypes.string,
    /**
     *  HTML attribute controlling input auto correct (Safari-specific)
     */
    autoCorrect  : PropTypes.oneOf( [ 'on', 'off' ] ),
    /**
     *  Extra CSS class name
     */
    className    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Array of strings or objects to build the dropdown
     */
    dropdownData : PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.object ),
        PropTypes.arrayOf( PropTypes.string ),
    ] ),
    /**
     * Initial dropdown selected value
     */
    dropdownDefaultValue  : PropTypes.string,
    /**
     *  Dropdown placeholder text
     */
    dropdownPlaceholder   : PropTypes.string,
    /**
     * Position of the dropdown
     */
    dropdownPosition      : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     * Dropdown selected value
     */
    dropdownValue         : PropTypes.string,
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
    forceHover        : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError          : PropTypes.bool,
    /**
     *  HTML id attribute
     */
    id                : PropTypes.string,
    /**
     * Initial input string value
     */
    inputDefaultValue : PropTypes.string,
    /**
     *  Input placeholder text
     */
    inputPlaceholder  : PropTypes.string,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef          : PropTypes.func,
    /**
     * Input string value
     */
    inputValue        : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled        : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly        : PropTypes.bool,
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
     *  Focus callback function
     */
    onFocus           : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut        : PropTypes.func,
    /**
     *  Mouse over  callback function
     */
    onMouseOver       : PropTypes.func,
    /**
     *  HTML attribute controlling input spell check
     */
    spellCheck        : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign         : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
};

TextInputWithDropdown.defaultProps =
{
    autoCapitalize        : undefined,
    autoComplete          : undefined,
    autoCorrect           : undefined,
    className             : undefined,
    cssMap                : styles,
    dropdownData          : undefined,
    dropdownDefaultValue  : undefined,
    dropdownPlaceholder   : undefined,
    dropdownPosition      : 'right',
    dropdownValue         : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    id                    : undefined,
    inputDefaultValue     : undefined,
    inputPlaceholder      : undefined,
    inputRef              : undefined,
    inputValue            : undefined,
    isDisabled            : false,
    isReadOnly            : false,
    label                 : undefined,
    labelPosition         : 'top',
    name                  : undefined,
    onBlur                : undefined,
    onChange              : undefined,
    onFocus               : undefined,
    onMouseOut            : undefined,
    onMouseOver           : undefined,
    spellCheck            : undefined,
    textAlign             : 'auto',
};

export default TextInputWithDropdown;
