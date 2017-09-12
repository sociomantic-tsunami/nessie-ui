import React             from 'react';
import PropTypes         from 'prop-types';

import Component         from '../proto/Component';
import Css               from '../hoc/Css';
import TextInputWithIcon from '../TextInputWithIcon';


export default class PasswordInput extends Component
{
    static propTypes =
    {
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

    static defaultProps =
    {
        labelPosition         : 'top',
        isDisabled            : false,
        isReadOnly            : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        iconPosition          : 'right',
        textAlign             : 'auto',
        forceHover            : false,
        cssMap                : require( './passwordInput.css' ),
    };

    render()
    {
        const {
            className,
            cssMap,
            passwordIsVisible,
            ...props
        } = this.props;

        const { id } = this.state;

        return (
            <Css cssMap = { cssMap }>
                <TextInputWithIcon
                    { ...props }
                    className = { className }
                    id        = { id }
                    inputType = { passwordIsVisible ? 'text' : 'password' }
                    iconType  = { passwordIsVisible ? 'hide' : 'show' } />
            </Css>
        );
    }
}
