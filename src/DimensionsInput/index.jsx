/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                             from 'react';
import PropTypes                         from 'prop-types';

import { generateId }                    from '../utils';
import { Column, InputField, Row, Text } from '../index';
import InputContainer                    from '../proto/InputContainer';

const DimensionsInput = ( {
    className,
    errorMessage,
    errorMessageIsVisible,
    errorMessagePosition,
    forceHover,
    hasError,
    heightDefaultValue,
    heightInputRef,
    heightPlaceholder,
    heightValue,
    id = generateId( 'DimensionsInput' ),
    isDisabled,
    isReadOnly,
    label,
    labelPosition,
    onBlur,
    onChange,
    onFocus,
    onMouseOut,
    onMouseOver,
    widthDefaultValue,
    widthInputRef,
    widthPlaceholder,
    widthValue,
} ) => (
    <InputContainer
        className             = { className }
        errorMessage          = { errorMessage }
        errorMessageIsVisible = { errorMessageIsVisible }
        errorMessagePosition  = { errorMessagePosition }
        hasError              = { hasError }
        id                    = { `${id}-width` }
        isDisabled            = { isDisabled }
        label                 = { label }
        labelPosition         = { labelPosition }
        onMouseOut            = { onMouseOut }
        onMouseOver           = { onMouseOver }>
        <Row
            gutters       = "S"
            onMouseOut    = { onMouseOut }
            onMouseOver   = { onMouseOver }
            verticalAlign = "middle">
            <Column>
                <InputField
                    autoCapitalize = "off"
                    autoComplete   = "off"
                    autoCorrect    = "off"
                    defaultValue   = { widthDefaultValue }
                    forceHover     = { forceHover }
                    hasError       = { hasError }
                    id             = { `${id}-width` }
                    inputRef       = { widthInputRef }
                    isDisabled     = { isDisabled }
                    isReadOnly     = { isReadOnly }
                    onBlur         = { onBlur }
                    onChange       = { onChange }
                    onFocus        = { onFocus }
                    placeholder    = { widthPlaceholder }
                    spellCheck     = { false }
                    value          = { widthValue } />
            </Column>
            <Column size = "content">
                <Text>✕</Text>
            </Column>
            <Column>
                <InputField
                    autoCapitalize = "off"
                    autoComplete   = "off"
                    autoCorrect    = "off"
                    defaultValue   = { heightDefaultValue }
                    forceHover     = { forceHover }
                    hasError       = { hasError }
                    id             = { `${id}-height` }
                    inputRef       = { heightInputRef }
                    isDisabled     = { isDisabled }
                    isReadOnly     = { isReadOnly }
                    onBlur         = { onBlur }
                    onChange       = { onChange }
                    onFocus        = { onFocus }
                    placeholder    = { heightPlaceholder }
                    spellCheck     = { false }
                    value          = { heightValue } />
            </Column>
        </Row>
    </InputContainer>
);

DimensionsInput.propTypes = {
    /**
     *  Extra CSS class name
     */
    className             : PropTypes.string,
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
     *  Error Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Error Tooltip position relative to error icon
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
    forceHover         : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError           : PropTypes.bool,
    /**
     * Initial width input string value
     */
    heightDefaultValue : PropTypes.string,
    /**
     * Callback that receives the native height <input>:
     * ( focusFunc ) => { ... }
     */
    heightInputRef     : PropTypes.func,
    /**
    *  Height placeholder text
    */
    heightPlaceholder  : PropTypes.string,
    /**
     * Width input string value
     */
    heightValue        : PropTypes.string,
    /**
     *  HTML id attribute
     */
    id                 : PropTypes.string,
    /**
    *  Display as disabled
    */
    isDisabled         : PropTypes.bool,
    /**
    *  Display as read-only
    */
    isReadOnly         : PropTypes.bool,
    /**
     *  Label text (string or JSX node)
     */
    label              : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition      : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
    *  onChange callback function: ( e ) => { ... }
    */
    onChange           : PropTypes.func,
    /**
    *  onBlur callback function: ( e ) => { ... }
    */
    onBlur             : PropTypes.func,
    /**
    *  onFocus callback function: ( e ) => { ... }
    */
    onFocus            : PropTypes.func,
    /**
    *  onMouseOut callback function: ( e ) => { ... }
    */
    onMouseOut         : PropTypes.func,
    /**
    *  onMouseOver callback function: ( e ) => { ... }
    */
    onMouseOver        : PropTypes.func,
    /**
     * Initial height input string value
     */
    widthDefaultValue  : PropTypes.string,
    /**
     * Callback that receives the native width <input>:
     * ( focusFunc ) => { ... }
     */
    widthInputRef      : PropTypes.func,
    /**
    *  Width placeholder text
    */
    widthPlaceholder   : PropTypes.string,
    /**
     * Height input string value
     */
    widthValue         : PropTypes.string,
};

DimensionsInput.defaultProps = {
    className             : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    heightDefaultValue    : undefined,
    heightInputRef        : undefined,
    heightPlaceholder     : 'height',
    heightValue           : undefined,
    id                    : undefined,
    isDisabled            : false,
    isReadOnly            : false,
    label                 : undefined,
    labelPosition         : 'top',
    onBlur                : undefined,
    onChange              : undefined,
    onFocus               : undefined,
    onMouseOut            : undefined,
    onMouseOver           : undefined,
    widthDefaultValue     : undefined,
    widthInputRef         : undefined,
    widthPlaceholder      : 'width',
    widthValue            : undefined,
};

export default DimensionsInput;
