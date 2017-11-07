import React, { Component }             from 'react';
import PropTypes                        from 'prop-types';

import { buildClassName, generateId }   from '../utils';
import styles                           from './textInputWithIcon.css';
import InputField                       from '../InputField';
import IconButton                       from '../IconButton';
import Tooltip                          from '../Tooltip';


export default class TextInputWithIcon extends Component
{
    static propTypes =
    {
        /**
         *  Label text (string or JSX node)
         */
        label     : PropTypes.node,
        /**
         *  Label position
         */
        inputType : PropTypes.oneOf( [
            'text',
            'password'
        ] ),
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
         *  Icon type to display (overrides customIcon)
         */
        iconType    : PropTypes.oneOf( [
            'account',
            'add',
            'calendar',
            'close',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit',
            'info',
            'hide',
            'inspect',
            'left',
            'link',
            'preview',
            'reset',
            'right',
            'search',
            'show',
            'up',
            'upload',
            'validation',
            'none'
        ] ),
        /**
         *  Alignment of the icon
         */
        iconPosition : PropTypes.oneOf( [
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
        *  icon Tooltip position relative to icon
        */
        iconTooltipPosition : PropTypes.oneOf( [
            'left',
            'right',
            'top',
            'bottom',
            'topLeft',
            'topRight'
        ] ),
        /**
         *  Display the icon tooltip
         */
        iconTooltipIsVisible  : PropTypes.bool,
        /**
         *  icon Tooltip message text (string or JSX)
         */
        iconTooltipMessage    : PropTypes.node,
        /**
         *  Display as disabled
         */
        isDisabled            : PropTypes.bool,
        /**
         *  Display Button icon as disabled
         */
        iconButtonIsDisabled  : PropTypes.bool,
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
        errorMessagePosition  : PropTypes.oneOf( [
            'top',
            'topLeft'
        ] ),
        /**
         *  Initial input string value
         */
        defaultValue    : PropTypes.string,
        /**
         *  Input string value
         */
        value           : PropTypes.string,
        /**
         *  HTML id attribute (overwrite default)
         */
        id              : PropTypes.string,
        /**
         *  HTML name attribute
         */
        name            : PropTypes.string,
        /**
         *  Input change callback function
         */
        onChange        : PropTypes.func,
        /**
         *  input callback function
         */
        onInput         : PropTypes.func,
        /**
         * keyPress callback function
         */
        onKeyPress      : PropTypes.func,
        /**
         *  focus callback function
         */
        onFocus         : PropTypes.func,
        /**
         *  blur callback function
         */
        onBlur          : PropTypes.func,
        /**
         *  mouseOver callback function
         */
        onMouseOver     : PropTypes.func,
        /**
         *  mouseOut callback function
         */
        onMouseOut      : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon     : PropTypes.func,
        /**
         *  Icon focus callback function
         */
        onFocusIcon     : PropTypes.func,
        /**
         *  Icon blur callback function
         */
        onBlurIcon      : PropTypes.func,
        /**
         *  Icon mouseOver callback function
         */
        onMouseOverIcon : PropTypes.func,
        /**
         *  Icon mouseOut callback function
         */
        onMouseOutIcon  : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover      : PropTypes.bool,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef        : PropTypes.func,
    };

    static defaultProps =
    {
        defaultValue          : undefined,
        label                 : undefined,
        labelPosition         : 'top',
        placeholder           : undefined,
        id                    : generateId( 'TextInputWithIcon' ),
        isDisabled            : false,
        isReadOnly            : false,
        iconButtonIsDisabled  : false,
        iconType              : 'none',
        iconTooltipPosition   : 'top',
        iconTooltipIsVisible  : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        iconPosition          : 'right',
        textAlign             : 'auto',
        forceHover            : false,
        cssMap                : styles,
        className             : undefined,
        iconTooltipMessage    : undefined,
        inputType             : 'text',
        onClickIcon           : undefined,
        value                 : undefined,
        name                  : undefined,
        onChange              : undefined,
        onKeyPress            : undefined,
        onBlur                : undefined,
        onFocus               : undefined,
        onInput               : undefined,
        onMouseOut            : undefined,
        onMouseOutIcon        : undefined,
        onMouseOver           : undefined,
        onMouseOverIcon       : undefined,
    };

    constructor( props )
    {
        super( props );

        this.state = {
            ...this.state,
            iconIsFocused : false,
            iconIsHovered : false
        };

        this.handleFocus         = this.handleFocus.bind( this );
        this.handleBlur          = this.handleBlur.bind( this );
        this.handleFocusIcon     = this.handleFocusIcon.bind( this );
        this.handleBlurIcon      = this.handleBlurIcon.bind( this );
        this.handleMouseOverIcon = this.handleMouseOverIcon.bind( this );
        this.handleMouseOutIcon  = this.handleMouseOutIcon.bind( this );
        this.handleInputRef      = this.handleInputRef.bind( this );
        this.handleButtonRef     = this.handleButtonRef.bind( this );
    }

    handleFocus( e )
    {
        const { relatedTarget } = e;
        const { button, input } = this;

        if ( relatedTarget )
        {
            if ( relatedTarget === button || relatedTarget === input )
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
        const { relatedTarget } = e;
        const { button, input } = this;

        if ( relatedTarget )
        {
            if ( relatedTarget === button || relatedTarget === input )
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

    handleFocusIcon( e )
    {
        const { onFocusIcon } = this.props;
        if ( onFocusIcon ) onFocusIcon( e );

        this.handleFocus( e );

        this.setState( { iconIsFocused: true } );
    }

    handleBlurIcon( e )
    {
        const { onBlurIcon } = this.props;
        if ( onBlurIcon ) onBlurIcon( e );

        this.handleBlur( e );

        this.setState( { iconIsFocused: false } );
    }

    handleMouseOverIcon( e )
    {
        const { onMouseOver, onMouseOverIcon } = this.props;
        if ( onMouseOverIcon ) onMouseOverIcon( e );

        this.setState( { iconIsHovered: true  } );

        if ( onMouseOver ) onMouseOver( e );
    }

    handleMouseOutIcon( e )
    {
        const { onMouseOut, onMouseOutIcon } = this.props;
        if ( onMouseOutIcon ) onMouseOutIcon( e );

        this.setState( { iconIsHovered: false  } );

        if ( onMouseOut ) onMouseOut( e );
    }

    handleInputRef( ref )
    {
        this.input = ref;
        const { inputRef } = this.props;
        if ( inputRef )
        {
            inputRef( ref );
        }
    }

    handleButtonRef( ref )
    {
        this.button = ref;
    }

    render()
    {
        const {
            className,
            cssMap,
            defaultValue,
            forceHover,
            hasError,
            id,
            iconButtonIsDisabled,
            iconPosition,
            iconTooltipIsVisible,
            iconTooltipMessage,
            iconTooltipPosition,
            iconType,
            inputType,
            isDisabled,
            isReadOnly,
            name,
            onChange,
            onClickIcon,
            onKeyPress,
            onInput,
            onMouseOut,
            onMouseOver,
            placeholder,
            textAlign,
            value,
        } = this.props;

        const {
            iconIsFocused,
            iconIsHovered
        } = this.state;

        const forceHoverInput = forceHover || iconIsFocused || iconIsHovered;

        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = iconPosition === 'left' ? 'right' : 'left';
        }

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    disabled : isDisabled,
                    error    : hasError,
                    position : iconPosition
                } ) }>
                <InputField
                    className    = { cssMap.input }
                    defaultValue = { defaultValue }
                    forceHover   = { forceHoverInput }
                    hasError     = { hasError }
                    id           = { id }
                    inputRef     = { this.handleInputRef }
                    isDisabled   = { isDisabled }
                    isReadOnly   = { isReadOnly }
                    name         = { name }
                    onBlur       = { this.handleBlur }
                    onChange     = { onChange }
                    onFocus      = { this.handleFocus }
                    onKeyPress   = { onKeyPress }
                    onInput      = { onInput }
                    onMouseOut   = { onMouseOut }
                    onMouseOver  = { onMouseOver }
                    placeholder  = { placeholder }
                    textAlign    = { alignText }
                    type         = { inputType }
                    value        = { value } />
                { ( iconType && iconType !== 'none' ) &&
                    <Tooltip
                        className   = { cssMap.icon }
                        isDisabled  = { isDisabled }
                        isReadOnly  = { isReadOnly }
                        isVisible   = { iconTooltipIsVisible }
                        hasError    = { hasError }
                        message     = { iconTooltipMessage }
                        onMouseOut  = { this.handleMouseOutIcon }
                        onMouseOver = { this.handleMouseOverIcon }
                        position    = { iconTooltipPosition } >
                        <IconButton
                            forceHover  = { forceHover }
                            buttonRef   = { this.handleButtonRef }
                            iconType    = { iconType }
                            isDisabled  = { isDisabled || iconButtonIsDisabled }
                            isReadOnly  = { isReadOnly }
                            hasError    = { hasError }
                            onClick     = { onClickIcon }
                            onFocus     = { this.handleFocusIcon }
                            onBlur      = { this.handleBlurIcon }
                            onMouseOut  = { onMouseOut }
                            onMouseOver = { onMouseOver } />
                    </Tooltip>
                }
            </div>
        );
    }
}
