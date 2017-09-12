import React            from 'react';
import PropTypes        from 'prop-types';

import Component        from '../proto/Component';
import Css              from '../hoc/Css';
import InputField       from '../InputField';
import InputContainer   from '../proto/InputContainer';

export default class DimensionsInput extends Component
{
    static propTypes =
    {
        /**
         *  Label text string or JSX node
         */
        label                 : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
        /**
        *  Width placeholder text
        */
        widthPlaceholder      : PropTypes.string,
        /**
        *  Height placeholder text
        */
        heightPlaceholder     : PropTypes.string,
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
         * Initial height input string value
         */
        widthDefaultValue     : PropTypes.string,
        /**
         * Height input string value
         */
        widthValue            : PropTypes.string,
        /**
         * Initial width input string value
         */
        heightDefaultValue    : PropTypes.string,
        /**
         * Width input string value
         */
        heightValue           : PropTypes.string,
        /**
         * HTML id attribute (overwrite default)
         */
        id                    : PropTypes.string,
        /**
        *  onChange callback function: ( e ) => { ... }
        */
        onChange              : PropTypes.func,
        /**
        *  onFocus callback function: ( e ) => { ... }
        */
        onFocus               : PropTypes.func,
        /**
        *  onBlur callback function: ( e ) => { ... }
        */
        onBlur                : PropTypes.func,
        /**
        *  onMouseOver callback function: ( e ) => { ... }
        */
        onMouseOver           : PropTypes.func,
        /**
        *  onMouseOut callback function: ( e ) => { ... }
        */
        onMouseOut            : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover            : PropTypes.bool,
        /**
         * Callback that receives the native width <input>:
         * ( focusFunc ) => { ... }
         */
        widthInputRef         : PropTypes.func,
        /**
         * Callback that receives the native height <input>:
         * ( focusFunc ) => { ... }
         */
        heightInputRef        : PropTypes.func,
    };

    static defaultProps =
    {
        widthPlaceholder      : 'width',
        heightPlaceholder     : 'height',
        hasError              : false,
        errorMessageIsVisible : false,
        isDisabled            : false,
        isReadOnly            : false,
        forceHover            : false,
        cssMap                : require( './dimensionsInput.css' ),
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
        this.setState( { isFocused: true } );
        this.lastFocused = e.target;

        const { relatedTarget } = e;
        const { widthInput, heightInput } = this;

        if ( relatedTarget )
        {
            if ( relatedTarget === widthInput || relatedTarget === heightInput )
            {
                e.stopPropagation();
                return;
            }
        }

        const { onFocus } = this.props;
        if ( onFocus )
        {
            onFocus( e );
        }
    }

    handleBlur( e )
    {
        this.setState( { isFocused: false } );

        const { relatedTarget } = e;
        const { widthInput, heightInput } = this;

        if ( relatedTarget )
        {
            if ( relatedTarget === widthInput || relatedTarget === heightInput )
            {
                e.stopPropagation();
                return;
            }
        }

        const { onBlur } = this.props;
        if ( onBlur )
        {
            onBlur( e );
        }
    }


    render()
    {
        const { className, cssMap, forceHover, label, ...props } = this.props;

        const {
            hasError,
            heightDefaultValue,
            heightInputRef,
            heightPlaceholder,
            heightValue,
            isDisabled,
            widthDefaultValue,
            widthInputRef,
            widthPlaceholder,
            widthValue
        } = props;

        const { id, isFocused } = this.state;

        const inputFieldCssMap = { 'default': cssMap.inputDefault };

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    disabled    : isDisabled,
                    error       : !isDisabled && hasError,
                    fakeHovered : !isDisabled && ( isFocused || forceHover )
                } }>
                <InputContainer
                    { ...props }
                    id        = { id }
                    className = { className }
                    label     = { label }>
                    <div className = { cssMap.container }>
                        <InputField
                            { ...props }
                            inputRef     = { widthInputRef }
                            cssMap       = { inputFieldCssMap }
                            id           = { `${id}-width` }
                            placeholder  = { widthPlaceholder }
                            defaultValue = { widthDefaultValue }
                            value        = { widthValue }
                            onFocus      = { this.handleFocus }
                            onBlur       = { this.handleBlur } />
                        <div className = { cssMap.icon }>✕</div>
                        <InputField
                            { ...props }
                            inputRef     = { heightInputRef }
                            cssMap       = { inputFieldCssMap }
                            id           = { `${id}-height` }
                            placeholder  = { heightPlaceholder }
                            defaultValue = { heightDefaultValue }
                            value        = { heightValue }
                            onFocus      = { this.handleFocus }
                            onBlur       = { this.handleBlur } />
                    </div>
                </InputContainer>
            </Css>
        );
    }
}
