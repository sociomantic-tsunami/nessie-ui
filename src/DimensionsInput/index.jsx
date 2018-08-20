import React                                             from 'react';
import PropTypes                                         from 'prop-types';

import { generateId, buildClassName }                    from '../utils';
import { Column, InputField, Row, Text }                 from '../index';
import InputContainer                                    from '../proto/InputContainer';

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
    onChange,
    onBlur,
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
                    defaultValue = { widthDefaultValue }
                    forceHover   = { forceHover }
                    hasError     = { hasError }
                    id           = { `${id}-width` }
                    isDisabled   = { isDisabled }
                    isReadOnly   = { isReadOnly }
                    inputRef     = { widthInputRef }
                    onChange     = { onChange }
                    onBlur       = { onBlur }
                    onFocus      = { onFocus }
                    placeholder  = { widthPlaceholder }
                    value        = { widthValue } />
            </Column>
            <Column size = "content">
                <Text>✕</Text>
            </Column>
            <Column>
                <InputField
                    defaultValue = { heightDefaultValue }
                    forceHover   = { forceHover }
                    hasError     = { hasError }
                    id           = { `${id}-height` }
                    isDisabled   = { isDisabled }
                    isReadOnly   = { isReadOnly }
                    inputRef     = { heightInputRef }
                    onChange     = { onChange }
                    onBlur       = { onBlur }
                    onFocus      = { onFocus }
                    placeholder  = { heightPlaceholder }
                    value        = { heightValue } />
            </Column>
        </Row>
    </InputContainer>
);

DimensionsInput.propTypes = {
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
    errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
    /**
     * Display as hover when required from another component
     */
    forceHover            : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     * Initial width input string value
     */
    heightDefaultValue    : PropTypes.string,
    /**
     * Callback that receives the native height <input>:
     * ( focusFunc ) => { ... }
     */
    heightInputRef        : PropTypes.func,
    /**
    *  Height placeholder text
    */
    heightPlaceholder     : PropTypes.string,
    /**
     * Width input string value
     */
    heightValue           : PropTypes.string,
    /**
     * HTML id attribute (overwrite default)
     */
    id                    : PropTypes.string,
    /**
    *  Display as disabled
    */
    isDisabled            : PropTypes.bool,
    /**
    *  Display as read-only
    */
    isReadOnly            : PropTypes.bool,
    /**
     *  Label text string or JSX node
     */
    label                 : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
    *  onChange callback function: ( e ) => { ... }
    */
    onChange              : PropTypes.func,
    /**
    *  onBlur callback function: ( e ) => { ... }
    */
    onBlur                : PropTypes.func,
    /**
    *  onFocus callback function: ( e ) => { ... }
    */
    onFocus               : PropTypes.func,
    /**
    *  onMouseOut callback function: ( e ) => { ... }
    */
    onMouseOut            : PropTypes.func,
    /**
    *  onMouseOver callback function: ( e ) => { ... }
    */
    onMouseOver           : PropTypes.func,
    /**
     * Initial height input string value
     */
    widthDefaultValue     : PropTypes.string,
    /**
     * Callback that receives the native width <input>:
     * ( focusFunc ) => { ... }
     */
    widthInputRef         : PropTypes.func,
    /**
    *  Width placeholder text
    */
    widthPlaceholder      : PropTypes.string,
    /**
     * Height input string value
     */
    widthValue            : PropTypes.string,
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
    onChange              : undefined,
    onBlur                : undefined,
    onFocus               : undefined,
    onMouseOut            : undefined,
    onMouseOver           : undefined,
    widthDefaultValue     : undefined,
    widthInputRef         : undefined,
    widthPlaceholder      : 'width',
    widthValue            : undefined,
};

export default DimensionsInput;
