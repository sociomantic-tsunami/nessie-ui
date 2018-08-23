import React                            from 'react';
import PropTypes                        from 'prop-types';

import { generateId, buildClassName }   from '../utils';
import InputField                       from '../InputField';
import InputContainer                   from '../proto/InputContainer';
import styles                           from './textInput.css';


const TextInput = ( {
    className,
    cssMap,
    id = generateId( 'TextInput' ),
    onMouseOut,
    onMouseOver,
    ...props
} ) => (
    <InputContainer
        { ...props }
        id          = { id }
        className   = { buildClassName( className, cssMap ) }
        onMouseOut  = { onMouseOut }
        onMouseOver = { onMouseOver }>
        <InputField { ...props } id = { id } />
    </InputContainer>
);

TextInput.propTypes =
{
    /**
     *  aria properties
     */
    aria : PropTypes.objectOf( PropTypes.oneOfType( [
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ] ) ),
    /**
     *  CSS class map
     */
    cssMap                : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Label text (string or JSX node)
     */
    label                 : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     *  Placeholder text
     */
    placeholder           : PropTypes.string,
    /**
     *  Alignment of the input text
     */
    textAlign             : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  Display as disabled
     */
    isDisabled            : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly            : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
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
     *  Initial input string value
     */
    defaultValue : PropTypes.string,
    /**
     *  Input string value
     */
    value        : PropTypes.string,
    /**
     *  HTML id attribute (overwrite default)
     */
    id           : PropTypes.string,
    /**
     *  HTML name attribute
     */
    name         : PropTypes.string,
    /**
     *  Input click callback function
     */
    onClick      : PropTypes.func,
    /**
     *  Input change callback function
     */
    onChange     : PropTypes.func,
    /**
     *  Input focus callback function
     */
    onFocus      : PropTypes.func,
    /**
     *  Input blur callback function
     */
    onBlur       : PropTypes.func,
    /**
     * onInput callback function
     */
    onInput      : PropTypes.func,
    /**
     * onKeyPress callback function
     */
    onKeyPress   : PropTypes.func,
    /**
     *  Input mouseOver callback function
     */
    onMouseOver  : PropTypes.func,
    /**
     *  Input mouseOut callback function
     */
    onMouseOut   : PropTypes.func,
    /**
     * Display as hover when required from another component
     */
    forceHover   : PropTypes.bool,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef     : PropTypes.func,
};

TextInput.defaultProps =
{
    aria                  : undefined,
    cssMap                : styles,
    defaultValue          : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    id                    : undefined,
    inputRef              : undefined,
    isDisabled            : false,
    isReadOnly            : false,
    label                 : undefined,
    labelPosition         : 'top',
    name                  : undefined,
    onBlur                : undefined,
    onChange              : undefined,
    onClick               : undefined,
    onFocus               : undefined,
    onInput               : undefined,
    onKeyPress            : undefined,
    onMouseOut            : undefined,
    onMouseOver           : undefined,
    textAlign             : undefined,
    value                 : undefined,
};

export default TextInput;
