import React            from 'react';
import PropTypes        from 'prop-types';

import Component        from '../proto/Component';
import Css              from '../hoc/Css';
import InputField       from '../InputField';
import InputContainer   from '../proto/InputContainer';

export default class TextInput extends Component
{
    static propTypes =
    {
        /**
         *  Label text (string or JSX node)
         */
        label         : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition : PropTypes.oneOf( [
            'top',
            'left',
            'right'
        ] ),
        /**
         *  Placeholder text
         */
        placeholder : PropTypes.string,
        /**
         *  Alignment of the input text
         */
        textAlign   : PropTypes.oneOf( [
            'left',
            'right'
        ] ),
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
        errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
        /**
         *  Initial input string value
         */
        defaultValue          : PropTypes.string,
        /**
         *  Input string value
         */
        value                 : PropTypes.string,
        /**
         *  HTML id attribute (overwrite default)
         */
        id                    : PropTypes.string,
        /**
         *  HTML name attribute
         */
        name                  : PropTypes.string,
        /**
         *  Input change callback function
         */
        onChange              : PropTypes.func,
        /**
         *  Input focus callback function
         */
        onFocus               : PropTypes.func,
        /**
         *  Input blur callback function
         */
        onBlur                : PropTypes.func,
        /**
         * onInput callback function
         */
        onInput               : PropTypes.func,
        /**
         * onKeyPress callback function
         */
        onKeyPress            : PropTypes.func,
        /**
         *  Input mouseOver callback function
         */
        onMouseOver           : PropTypes.func,
        /**
         *  Input mouseOut callback function
         */
        onMouseOut            : PropTypes.func,
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
        forceHover            : false,
        cssMap                : require( './textInput.css' )
    };


    render()
    {
        const {
            className,
            cssMap,
            ...props
        } = this.props;
        const { id } = this.state;

        return (
            <Css cssMap = { cssMap }>
                <InputContainer
                    { ...props }
                    id        = { id }
                    className = { className }>
                    <InputField { ...props } id = { id } />
                </InputContainer>
            </Css>
        );
    }
}
