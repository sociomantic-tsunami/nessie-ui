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
    onMouseOver,
    onMouseOut,
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
                        hasError     = { hasError }
                        id           = { id }
                        inputRef     = { inputRef }
                        isDisabled   = { isDisabled }
                        isReadOnly   = { isReadOnly }
                        placeholder  = { inputPlaceholder }
                        defaultValue = { inputDefaultValue }
                        forceHover   = { forceHover }
                        onBlur       = { onBlur }
                        onChange     = { onChange }
                        onFocus      = { onFocus }
                        name         = { name }
                        textAlign    = { alignText }
                        value        = { inputValue } />
                </Column>
                <Column size = "content">
                    <FlounderDropdown
                        data         = { dropdownData }
                        hasError     = { hasError }
                        isDisabled   = { isDisabled }
                        isReadOnly   = { isReadOnly }
                        placeholder  = { dropdownPlaceholder }
                        defaultValue = { dropdownDefaultValue }
                        value        = { dropdownValue }
                        forceHover   = { forceHover }
                        onBlur       = { onBlur }
                        onChange     = { onChange }
                        onFocus      = { onFocus } />
                </Column>
            </Row>
        </InputContainer>
    );
};


TextInputWithDropdown.propTypes =
{
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
     *  Error message is displayed
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
     * Display as hover when required from another component
     */
    forceHover        : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError          : PropTypes.bool,
    /**
     * HTML id attribute (overwrite default)
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
     *  Label text string or JSX node
     */
    label             : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition     : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     * HTML name attribute
     */
    name              : PropTypes.string,
    /**
     *  onBlur callback function: ( e ) => { ... }
     */
    onBlur            : PropTypes.func,
    /**
     *  onChange callback function: ( e ) => { ... }
     */
    onChange          : PropTypes.func,
    /**
     *  onFocus callback function: ( e ) => { ... }
     */
    onFocus           : PropTypes.func,
    /**
     *  onMouseOut callback function: ( e ) => { ... }
     */
    onMouseOut        : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) => { ... }
     */
    onMouseOver       : PropTypes.func,
    /**
     * Input text alignment
     */
    textAlign         : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
};

TextInputWithDropdown.defaultProps =
{
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
    textAlign             : 'auto',
};

export default TextInputWithDropdown;
