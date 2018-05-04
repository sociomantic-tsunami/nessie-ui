import React                       from 'react';
import PropTypes                   from 'prop-types';

import Component                   from '../proto/Component';
import { buildClassName, mapAria } from '../utils';
import styles                      from './inputField.css';


export default class InputField extends Component
{
    static propTypes =
    {
        /**
         *  HTML element
         */
        element      : PropTypes.oneOf( [ 'input', 'textarea' ] ),
        /**
         *  HTML type attribute (input element only)
         */
        type         : PropTypes.oneOf( [ 'text', 'password', 'number' ] ),
        /**
         *  Placeholder text
         */
        placeholder  : PropTypes.string,
        /**
         *  Alignment of the input text
         */
        textAlign    : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Number of rows (textarea element only)
         */
        rows         : PropTypes.number,
        /**
         * Sets the text area to be vertically resizable
         */
        isResizable  : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled   : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly   : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError     : PropTypes.bool,
        /**
         *  Message to display in info icon
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
         * Callback that receives a ref to the <input>: ( ref ) => { ... }
         */
        inputRef     : PropTypes.func,
    };

    static defaultProps =
    {
        element    : 'input',
        type       : 'text',
        textAlign  : 'left',
        isDisabled : false,
        isReadOnly : false,
        hasError   : false,
        forceHover : false,
        cssMap     : styles,
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
            defaultValue,
            element,
            forceHover,
            hasError,
            inputRef,
            isDisabled,
            isReadOnly,
            isResizable,
            name,
            onBlur,
            onInput,
            onChange,
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
            value
        } = this.props;

        const id = this.state.id;

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
                    resizable   : element === 'textarea' && isResizable
                } ) }
                defaultValue = { defaultValue }
                disabled     = { isDisabled }
                id           = { id }
                name         = { name }
                onBlur       = { onBlur }
                onChange     = { onChange || onInput }
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
