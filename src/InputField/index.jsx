import React                                   from 'react';
import PropTypes                               from 'prop-types';

import { buildClassName, mapAria, generateId } from '../utils';
import styles                                  from './inputField.css';


const InputField = ( {
    aria,
    autoCapitalize,
    autoComplete,
    autoCorrect,
    className,
    cssMap,
    defaultValue,
    element,
    forceHover,
    hasError,
    id = generateId( 'InputField' ),
    inputRef,
    isDisabled,
    isReadOnly,
    isResizable,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onInput,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseOut,
    onMouseOver,
    placeholder,
    rows,
    spellCheck,
    textAlign,
    type,
    value,
} ) =>
{
    if ( !InputField.didWarn && onInput )
    {
        console.warn( 'InputField: onInput prop is deprecated. Please use \
onChange instead.' );
        InputField.didWarn = true;
    }

    const InputElement = element || 'input';

    return (
        <InputElement
            { ...mapAria( aria ) }
            autoCapitalize = { autoCapitalize }
            autoComplete   = { autoComplete }
            autoCorrect    = { autoCorrect }
            className      = { buildClassName( className, cssMap, {
                align       : textAlign,
                disabled    : isDisabled,
                error       : !isDisabled && hasError,
                fakeHovered : !isDisabled && forceHover,
                resizable   : element === 'textarea' && isResizable,
            } ) }
            defaultValue = { defaultValue }
            disabled     = { isDisabled }
            id           = { id }
            name         = { name }
            onBlur       = { onBlur }
            onChange     = { onChange || onInput }
            onClick      = { onClick }
            onFocus      = { onFocus }
            onKeyDown    = { onKeyDown }
            onKeyPress   = { onKeyPress }
            onKeyUp      = { onKeyUp }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }
            placeholder  = { placeholder }
            readOnly     = { isReadOnly }
            ref          = { inputRef }
            rows         = { element === 'textarea' ? rows : null }
            spellCheck   = { spellCheck }
            type         = { element === 'input' ? type : null }
            value        = { value } />
    );
};

InputField.propTypes =
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
     *  Initial input string value
     */
    defaultValue : PropTypes.string,
    /**
     *  HTML element
     */
    element      : PropTypes.oneOf( [ 'input', 'textarea' ] ),
    /**
     *  Display as hover when required from another component
     */
    forceHover   : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError     : PropTypes.bool,
    /**
     *  HTML id attribute
     */
    id           : PropTypes.string,
    /**
     *  Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef     : PropTypes.func,
    /**
     *  Display as disabled
     */
    isDisabled   : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly   : PropTypes.bool,
    /**
     * Sets the input to be vertically resizable (textarea element only)
     */
    isResizable  : PropTypes.bool,
    /**
     *  HTML name attribute
     */
    name         : PropTypes.string,
    /**
     *  Blur callback function
     */
    onBlur       : PropTypes.func,
    /**
     *  Input change callback function
     */
    onChange     : PropTypes.func,
    /**
     *  Input click callback function
     */
    onClick      : PropTypes.func,
    /**
     *  Icon click callback function
     */
    onClickIcon  : PropTypes.func,
    /**
     *  Focus callback function
     */
    onFocus      : PropTypes.func,
    /**
     *  Key down callback function
     */
    onKeyDown    : PropTypes.func,
    /**
     *  Key press callback function
     */
    onKeyPress   : PropTypes.func,
    /**
     *  Key up callback function
     */
    onKeyUp      : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut   : PropTypes.func,
    /**
     *  Mouse over  callback function
     */
    onMouseOver  : PropTypes.func,
    /**
     *  Placeholder text
     */
    placeholder  : PropTypes.string,
    /**
     *  Number of rows (textarea element only)
     */
    rows         : PropTypes.number,
    /**
     *  HTML attribute controlling input spell check
     */
    spellCheck   : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign    : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  HTML type attribute (input element only)
     */
    type         : PropTypes.oneOf( [ 'text', 'password', 'number' ] ),
    /**
     *  Input string value
     */
    value        : PropTypes.string,
};

InputField.defaultProps =
{
    aria           : undefined,
    autoCapitalize : undefined,
    autoComplete   : undefined,
    autoCorrect    : undefined,
    className      : undefined,
    cssMap         : styles,
    defaultValue   : undefined,
    element        : 'input',
    forceHover     : false,
    hasError       : false,
    id             : undefined,
    inputRef       : undefined,
    isDisabled     : false,
    isReadOnly     : false,
    isResizable    : undefined,
    name           : undefined,
    onBlur         : undefined,
    onChange       : undefined,
    onClick        : undefined,
    onFocus        : undefined,
    onKeyDown      : undefined,
    onKeyPress     : undefined,
    onKeyUp        : undefined,
    onMouseOut     : undefined,
    onMouseOver    : undefined,
    placeholder    : undefined,
    rows           : undefined,
    spellCheck     : undefined,
    textAlign      : 'left',
    type           : 'text',
    value          : undefined,
};

export default InputField;
