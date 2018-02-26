import React                          from 'react';
import PropTypes                      from 'prop-types';

import { buildClassName, generateId } from '../utils';
import styles                         from './dimensionsInput.css';
import { InputField, Text }           from '../index';
import withInputContainer             from '../proto/withInputContainer';

const DimensionsInput = ( {
    className,
    cssMap,
    forceHover,
    hasError,
    heightDefaultValue,
    heightInputRef,
    heightPlaceholder,
    heightValue,
    id,
    isDisabled,
    isReadOnly,
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
    <div
        className = { buildClassName( className, cssMap, {
            disabled    : isDisabled,
            error       : !isDisabled && hasError,
            fakeHovered : !isDisabled && forceHover,
        } ) }
        onMouseOut  = { onMouseOut }
        onMouseOver = { onMouseOver }>
        <InputField
            className    = { cssMap.input }
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
        <Text className = { cssMap.text }>✕</Text>
        <InputField
            className    = { cssMap.input }
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
    </div>
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
    cssMap                : styles,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    heightDefaultValue    : undefined,
    heightInputRef        : undefined,
    heightPlaceholder     : 'height',
    heightValue           : undefined,
    id                    : generateId( 'DimensionsInput' ),
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

export default withInputContainer( DimensionsInput );
