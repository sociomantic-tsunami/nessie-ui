import React            from 'react';
import PropTypes        from 'prop-types';

import Component        from '../proto/Component';
import InputContainer   from '../proto/InputContainer';
import Css              from '../hoc/Css';
import InputField       from '../InputField';


export default class ValuedTextInput extends Component
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
            'right'
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
            'topLeft'
        ] ),
        /**
         * Initial input string value
         */
        defaultValue       : PropTypes.string,
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
            'right'
        ] ),
        /**
         * Input text alignment
         */
        textAlign : PropTypes.oneOf( [
            'auto',
            'left',
            'right'
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
        isDisabled            : false,
        isReadOnly            : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        valueLabelPosition    : 'left',
        textAlign             : 'auto',
        forceHover            : false,
        cssMap                : require( './valuedTextInput.css' )
    };

    constructor( props )
    {
        super( props );

        this.state = {
            ...this.state,
            isFocused : false,
            isHovered : false
        };

        this.handleFocus     = this.handleFocus.bind( this );
        this.handleBlur      = this.handleBlur.bind( this );
        this.handleMouseOver = this.handleMouseOver.bind( this );
        this.handleMouseOut  = this.handleMouseOut.bind( this );
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

    handleMouseOver( e )
    {
        const { onMouseOver } = this.props;
        this.setState( { isHovered: true } );
        if ( onMouseOver )
        {
            onMouseOver( e );
        }
    }

    handleMouseOut( e )
    {
        const { onMouseOut } = this.props;
        this.setState( { isHovered: false } );
        if ( onMouseOut )
        {
            onMouseOut( e );
        }
    }


    render()
    {
        const { className, cssMap, ...props } = this.props;
        const {
            forceHover,
            hasError,
            isDisabled,
            onMouseOut,
            onMouseOver,
            textAlign,
            valueLabel,
            valueLabelPosition
        } = props;

        const {
            id,
            isFocused,
            isHovered
        } = this.state;

        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = valueLabelPosition === 'left' ? 'right' : 'left';
        }

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    disabled    : isDisabled,
                    error       : hasError,
                    position    : valueLabelPosition,
                    fakeHovered : forceHover || isFocused || isHovered
                } }>
                <InputContainer
                    { ...props }
                    id        = { id }
                    className = { className }>
                    <div className = { cssMap.container }>
                        <InputField
                            { ...props }
                            id          = { id }
                            className   = { cssMap.input }
                            onFocus     = { this.handleFocus }
                            onBlur      = { this.handleBlur }
                            textAlign   = { alignText }
                            onMouseOver = { onMouseOver }
                            onMouseOut  = { onMouseOut } />
                        <label
                            className = { cssMap.valueLabel }
                            htmlFor   = { id }>
                            { valueLabel }
                        </label>
                    </div>
                </InputContainer>
            </Css>
        );
    }
}
