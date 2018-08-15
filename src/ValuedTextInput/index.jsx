import React                            from 'react';
import PropTypes                        from 'prop-types';

import { generateId, buildClassName }   from '../utils';
import InputContainer                   from '../proto/InputContainer';
import InputField                       from '../InputField';


export default class ValuedTextInput extends React.Component
{
    static propTypes =
    {
        /**
         *  Label text string or JSX node
         */
        label         : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition : PropTypes.oneOf( [
            'top',
            'left',
            'right',
        ] ),
        /**
         *  Placeholder text
         */
        placeholder           : PropTypes.string,
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
         *  error message is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
         *  Error message position relative to the icon
         */
        errorMessagePosition  : PropTypes.oneOf( [
            'top',
            'topLeft',
        ] ),
        /**
         * Input string value
         */
        value              : PropTypes.string,
        /**
         * Value label text
         */
        valueLabel         : PropTypes.string,
        /**
         * Position of the value label
         */
        valueLabelPosition : PropTypes.oneOf( [
            'left',
            'right',
        ] ),
        /**
         * Input text alignment
         */
        textAlign : PropTypes.oneOf( [
            'auto',
            'left',
            'right',
        ] ),
        /**
         * HTML id attribute of TextInput (overwrite default)
         */
        id          : PropTypes.string,
        /**
         * HTML name attribute
         */
        name        : PropTypes.string,
        /**
         *  Input click callback function
         */
        onClick     : PropTypes.func,
        /**
         * onChange callback function: ( e ) => { ... }
         */
        onChange    : PropTypes.func,
        /**
         * onKeyPress callback function: ( e ) => { ... }
         */
        onKeyPress  : PropTypes.func,
        /**
         * onFocus callback function: ( e ) => { ... }
         */
        onFocus     : PropTypes.func,
        /**
         * onBlur callback function: ( e ) => { ... }
         */
        onBlur      : PropTypes.func,
        /**
         * onMouseOver callback function: ( e ) => { ... }
         */
        onMouseOver : PropTypes.func,
        /**
         * onMouseOut callback function: ( e ) => { ... }
         */
        onMouseOut  : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover  : PropTypes.bool,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef    : PropTypes.func,
    };

    static defaultProps =
    {
        labelPosition         : 'top',
        id                    : undefined,
        isDisabled            : false,
        isReadOnly            : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        valueLabelPosition    : 'left',
        textAlign             : 'auto',
        forceHover            : false,
        cssMap                : require( './valuedTextInput.css' ),
        value                 : '',
    };

    constructor( props )
    {
        super( props );

        this.state = {
            ...this.state,
            isFocused : false,
        };

        this.handleFocus     = this.handleFocus.bind( this );
        this.handleBlur      = this.handleBlur.bind( this );
    }

    handleFocus( e )
    {
        const { onFocus } = this.props;
        this.setState( { isFocused: true  } );
        if ( onFocus )
        {
            onFocus( e );
        }
    }

    handleBlur( e )
    {
        const { onBlur } = this.props;
        this.setState( { isFocused: false } );
        if ( onBlur )
        {
            onBlur( e );
        }
    }

    render()
    {
        const {
            className,
            cssMap,
            onMouseOut,
            onMouseOver,
            ...props
        } = this.props;

        const {
            forceHover,
            hasError,
            id = generateId( 'ValuedTextInput' ),
            isDisabled,
            textAlign,
            valueLabel,
            valueLabelPosition,
        } = props;

        const { isFocused } = this.state;

        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = valueLabelPosition === 'left' ? 'right' : 'left';
        }

        return (

            <InputContainer
                { ...props }
                className   = { buildClassName( className, cssMap, {
                    disabled    : isDisabled,
                    error       : hasError,
                    position    : valueLabelPosition,
                    fakeHovered : forceHover || isFocused,
                }  ) }
                id          = { id }
                onMouseOver = { onMouseOver }
                onMouseOut  = { onMouseOut }>
                <div className = { cssMap.container }>
                    <InputField
                        { ...props }
                        id           = { id }
                        className    = { cssMap.input }
                        onFocus      = { this.handleFocus }
                        onBlur       = { this.handleBlur }
                        textAlign    = { alignText }  />
                    <label
                        className = { cssMap.valueLabel }
                        htmlFor   = { id }>
                        { valueLabel }
                    </label>
                </div>
            </InputContainer>

        );
    }
}
