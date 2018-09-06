import React                             from 'react';
import PropTypes                         from 'prop-types';

import { generateId }                    from '../utils';
import { Column, InputField, Row, Text } from '../index';

const DimensionsInput = ( {
    className,
    forceHover,
    hasError,
    heightInputRef,
    heightPlaceholder,
    heightValue,
    id = generateId( 'DimensionsInput' ),
    isDisabled,
    isReadOnly,
    onBlur,
    onChange,
    onFocus,
    onMouseOut,
    onMouseOver,
    widthInputRef,
    widthPlaceholder,
    widthValue,
} ) => (
    <Row
        className     = { className }
        gutters       = "S"
        onMouseOut    = { onMouseOut }
        onMouseOver   = { onMouseOver }
        verticalAlign = "middle">
        <Column>
            <InputField
                autoCapitalize = "off"
                autoComplete   = "off"
                autoCorrect    = "off"
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
);

DimensionsInput.propTypes = {
    /**
     *  Extra CSS class name
     */
    className         : PropTypes.string,
    /**
     *  Display as hover when required from another component
     */
    forceHover        : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError          : PropTypes.bool,
    /**
     * Callback that receives the native height <input>:
     * ( focusFunc ) => { ... }
     */
    heightInputRef    : PropTypes.func,
    /**
    *  Height placeholder text
    */
    heightPlaceholder : PropTypes.string,
    /**
     * Width input string value
     */
    heightValue       : PropTypes.string,
    /**
     *  HTML id attribute
     */
    id                : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled        : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly        : PropTypes.bool,
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
     * Callback that receives the native width <input>:
     * ( focusFunc ) => { ... }
     */
    widthInputRef     : PropTypes.func,
    /**
    *  Width placeholder text
    */
    widthPlaceholder  : PropTypes.string,
    /**
     * Height input string value
     */
    widthValue        : PropTypes.string,
};

DimensionsInput.defaultProps = {
    className         : undefined,
    forceHover        : false,
    hasError          : false,
    heightInputRef    : undefined,
    heightPlaceholder : 'height',
    heightValue       : '',
    id                : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    onBlur            : undefined,
    onChange          : undefined,
    onFocus           : undefined,
    onMouseOut        : undefined,
    onMouseOver       : undefined,
    widthInputRef     : undefined,
    widthPlaceholder  : 'width',
    widthValue        : '',
};

export default DimensionsInput;
