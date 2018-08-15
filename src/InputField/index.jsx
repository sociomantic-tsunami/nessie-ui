import React                                   from 'react';
import PropTypes                               from 'prop-types';

import { buildClassName, mapAria, generateId } from '../utils';
import styles                                  from './inputField.css';


export default class InputField extends React.Component
{
    static propTypes =
    {
        /**
         *  HTML element
         */
        element     : PropTypes.oneOf( [ 'input', 'textarea' ] ),
        /**
         *  HTML type attribute (input element only)
         */
        type        : PropTypes.oneOf( [ 'text', 'password', 'number' ] ),
        /**
         *  Placeholder text
         */
        placeholder : PropTypes.string,
        /**
         *  Alignment of the input text
         */
        textAlign   : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Number of rows (textarea element only)
         */
        rows        : PropTypes.number,
        /**
         * Sets the text area to be vertically resizable
         */
        isResizable : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled  : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly  : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError    : PropTypes.bool,
        /**
         *  Input string value
         */
        value       : PropTypes.string,
        /**
         *  HTML id attribute (overwrite default)
         */
        id          : PropTypes.string,
        /**
         *  HTML name attribute
         */
        name        : PropTypes.string,
        /**
         *  Input change callback function
         */
        onChange    : PropTypes.func,
        /**
         *  Input click callback function
         */
        onClick     : PropTypes.func,
        /**
         *  Input focus callback function
         */
        onFocus     : PropTypes.func,
        /**
         *  Input blur callback function
         */
        onBlur      : PropTypes.func,
        /**
         * onKeyPress callback function
         */
        onKeyPress  : PropTypes.func,
        /**
         *  Input mouseOver callback function
         */
        onMouseOver : PropTypes.func,
        /**
         *  Input mouseOut callback function
         */
        onMouseOut  : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover  : PropTypes.bool,
        /**
         * Callback that receives a ref to the <input>: ( ref ) => { ... }
         */
        inputRef    : PropTypes.func,
    };

    static defaultProps =
    {
        element    : 'input',
        type       : 'text',
        textAlign  : 'left',
        id         : undefined,
        isDisabled : false,
        isReadOnly : false,
        hasError   : false,
        forceHover : false,
        cssMap     : styles,
        value      : '',
    };

    constructor( props )
    {
        super( props );

        if ( typeof onInput !== 'undefined' )
        {
            console.warn( `${this.constructor.name}: onInput prop is
deprecated. Please use onChange instead.` );
        }
    }

    render()
    {
        const {
            aria,
            className,
            cssMap,
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
            onInput,
            onChange,
            onClick,
            onFocus,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOver,
            placeholder,
            rows,
            textAlign,
            type,
            value,
        } = this.props;

        const InputElement = element || 'input';

        return (
            <InputElement
                { ...mapAria( aria ) }
                autoComplete = { element !== 'textarea' ? 'off' : null }
                className    = { buildClassName( className, cssMap, {
                    error       : !isDisabled && hasError,
                    disabled    : isDisabled,
                    fakeHovered : !isDisabled && forceHover,
                    align       : textAlign,
                    resizable   : element === 'textarea' && isResizable,
                } ) }
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
                onMouseLeave = { onMouseOut }
                onMouseEnter = { onMouseOver }
                placeholder  = { placeholder }
                readOnly     = { isReadOnly }
                ref          = { inputRef }
                rows         = { element === 'textarea' ? rows : null }
                type         = { element === 'input' ? type : null }
                value        = { value } />
        );
    }
}
