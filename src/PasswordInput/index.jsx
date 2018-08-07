import React                          from 'react';
import PropTypes                      from 'prop-types';

import { generateId, buildClassName } from '../utils';
import { TextInputWithIcon }          from '../index';
import styles                         from './passwordInput.css';


const PasswordInput = ( {
    className,
    cssMap,
    id = generateId( 'PasswordInput' ),
    passwordIsVisible,
    ...props
} ) => (
    <TextInputWithIcon
        { ...props }
        className = { buildClassName( className, cssMap ) }
        id        = { id }
        inputType = { passwordIsVisible ? 'text' : 'password' }
        iconType  = { passwordIsVisible ? 'hide' : 'show' } />
);


PasswordInput.propTypes =
{
    /**
     * Extra CSS class name
     */
    className             : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap                : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Label text string or JSX node
     */
    label                 : PropTypes.node,
    /**
     *  alternates input and icon types accordingly.
     */
    passwordIsVisible     : PropTypes.bool,
    /**
     *  Label position
     */
    labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     *  Placeholder text
     */
    placeholder           : PropTypes.string,
    /**
     *  Display as disabled/read-only
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
     *  Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Error message position relative to the icon
     */
    errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
    /**
     * Initial input string value
     */
    defaultValue          : PropTypes.string,
    /**
     * Input string value
     */
    value                 : PropTypes.string,
    /**
     * HTML id attribute (overwrite default)
     */
    id                    : PropTypes.string,
    /**
     *  HTML name attribute
     */
    name                  : PropTypes.string,
    /**
     *  Alignment of the show/hide icon
     */
    iconPosition          : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     * Input text alignment
     */
    textAlign             : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Input change callback function
     */
    onChange              : PropTypes.func,
    /**
     *  input callback function
     */
    onInput               : PropTypes.func,
    /**
     * keyPress callback function
     */
    onKeyPress            : PropTypes.func,
    /**
     *  focus callback function
     */
    onFocus               : PropTypes.func,
    /**
     *  blur callback function
     */
    onBlur                : PropTypes.func,
    /**
     *  mouseOver callback function
     */
    onMouseOver           : PropTypes.func,
    /**
     *  mouseOut callback function
     */
    onMouseOut            : PropTypes.func,
    /**
     *  Icon click callback function
     */
    onClickIcon           : PropTypes.func,
    /**
     *  Icon focus callback function
     */
    onFocusIcon           : PropTypes.func,
    /**
     *  Icon blur callback function
     */
    onBlurIcon            : PropTypes.func,
    /**
     *  Icon mouseOver callback function
     */
    onMouseOverIcon       : PropTypes.func,
    /**
     *  Icon mouseOut callback function
     */
    onMouseOutIcon        : PropTypes.func,
    /**
     * Display as hover when required from another component
     */
    forceHover            : PropTypes.bool,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef              : PropTypes.func,
};

PasswordInput.defaultProps =
{
    className             : undefined,
    cssMap                : styles,
    defaultValue          : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    iconPosition          : 'right',
    id                    : undefined,
    inputRef              : undefined,
    isDisabled            : false,
    isReadOnly            : false,
    label                 : undefined,
    labelPosition         : 'top',
    name                  : undefined,
    onBlur                : undefined,
    onBlurIcon            : undefined,
    onChange              : undefined,
    onClickIcon           : undefined,
    onFocus               : undefined,
    onInput               : undefined,
    onKeyPress            : undefined,
    onMouseOut            : undefined,
    onMouseOutIcon        : undefined,
    onMouseOver           : undefined,
    onMouseOverIcon       : undefined,
    passwordIsVisible     : undefined,
    placeholder           : undefined,
    textAlign             : 'auto',
    value                 : undefined,
};

export default PasswordInput;
