import React                            from 'react';
import PropTypes                        from 'prop-types';

import { InputField, FlounderDropdown } from '../index';
import Component                        from '../proto/Component';
import InputContainer                   from '../proto/InputContainer';
import Css                              from '../hoc/Css';


export default class TextInputWithDropdown extends Component
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
         *  Input placeholder text
         */
        inputPlaceholder      : PropTypes.string,
        /**
         *  Dropdown placeholder text
         */
        dropdownPlaceholder   : PropTypes.string,
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
         *  Error message is displayed
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
            *  Array of strings or objects to build the dropdown
            */
        dropdownData : PropTypes.oneOfType( [
            PropTypes.arrayOf(
                PropTypes.shape( {
                    text        : PropTypes.string,
                    value       : PropTypes.string,
                    description : PropTypes.string,
                    disabled    : PropTypes.bool,
                    extraClass  : PropTypes.string,
                    icon        : PropTypes.string
                } )
            ),
            PropTypes.arrayOf( PropTypes.string )
        ] ),
        /**
         * Initial input string value
         */
        inputDefaultValue    : PropTypes.string,
        /**
         * Input string value
         */
        inputValue           : PropTypes.string,
        /**
         * Initial dropdown selected value
         */
        dropdownDefaultValue : PropTypes.string,
        /**
         * Dropdown selected value
         */
        dropdownValue        : PropTypes.string,
        /**
         * Position of the dropdown
         */
        dropdownPosition     : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         * Input text alignment
         */
        textAlign  : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
        /**
         * HTML id attribute (overwrite default)
         */
        id         : PropTypes.string,
         /**
         * HTML name attribute
         */
        name       : PropTypes.string,
        /**
         *  onChange callback function: ( e ) => { ... }
         */
        onChange   : PropTypes.func,
        /**
         *  onFocus callback function: ( e ) => { ... }
         */
        onFocus    : PropTypes.func,
        /**
         *  onBlur callback function: ( e ) => { ... }
         */
        onBlur     : PropTypes.func,
        /**
         *  onMouseOver callback function: ( e ) => { ... }
         */
        onMouseOve : PropTypes.func,
        /**
         *  onMouseOut callback function: ( e ) => { ... }
         */
        onMouseOut : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover : PropTypes.bool,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef   : PropTypes.func,
    };

    static defaultProps =
    {
        labelPosition         : 'top',
        isDisabled            : false,
        isReadOnly            : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        dropdownPosition      : 'right',
        textAlign             : 'auto',
        forceHover            : false,
        cssMap                : require( './textInputWithDropdown.css' ),
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
        this.setState( { isFocused: true  } );

        const { onFocus } = this.props;
        if ( onFocus )
        {
            onFocus( e );
        }
    }
    handleBlur( e )
    {
        this.setState( { isFocused: false  } );
        const { onBlur } = this.props;
        if ( onBlur )
        {
            onBlur( e );
        }
    }
    handleMouseOver( e )
    {
        this.setState( { isHovered: true  } );

        const { onMouseOver } = this.props;
        if ( onMouseOver )
        {
            onMouseOver( e );
        }
    }
    handleMouseOut( e )
    {
        this.setState( { isHovered: false } );

        const { onMouseOut } = this.props;
        if ( onMouseOut )
        {
            onMouseOut( e );
        }
    }

    render()
    {
        const { className, cssMap, label, ...props } = this.props;

        const {
            dropdownData,
            dropdownDefaultValue,
            dropdownPlaceholder,
            dropdownPosition,
            dropdownValue,
            forceHover,
            hasError,
            inputDefaultValue,
            inputPlaceholder,
            inputValue,
            isDisabled,
            labelPosition,
            textAlign
        } = props;

        const {
            id,
            isFocused,
            isHovered
        } = this.state;

        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = dropdownPosition === 'left' ? 'right' : 'left';
        }

        const fakeHovered = forceHover || isFocused || isHovered;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    labelPosition,
                    disabled : isDisabled,
                    position : dropdownPosition,
                    error    : hasError
                } }>
                <InputContainer
                    { ...props }
                    id        = { id }
                    className = { className }
                    label     = { label }>
                    <div className = { cssMap.container }>
                        <InputField
                            { ...props }
                            className    = { cssMap.input }
                            id           = { id }
                            placeholder  = { inputPlaceholder }
                            defaultValue = { inputDefaultValue }
                            value        = { inputValue }
                            textAlign    = { alignText }
                            forceHover   = { fakeHovered }
                            onMouseOver  = { this.handleMouseOver }
                            onMouseOut   = { this.handleMouseOut }
                            onFocus      = { this.handleFocus }
                            onBlur       = { this.handleBlur } />
                        <FlounderDropdown
                            { ...props }
                            className    = { cssMap.dropdown }
                            data         = { dropdownData }
                            placeholder  = { dropdownPlaceholder }
                            defaultValue = { dropdownDefaultValue }
                            value        = { dropdownValue }
                            forceHover   = { fakeHovered }
                            onMouseOver  = { this.handleMouseOver }
                            onMouseOut   = { this.handleMouseOut }
                            onFocus      = { this.handleFocus }
                            onBlur       = { this.handleBlur } />
                    </div>
                </InputContainer>
            </Css>
        );
    }
}
