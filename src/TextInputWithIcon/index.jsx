import React                               from 'react';
import PropTypes                           from 'prop-types';

import { buildClassName, generateId }      from '../utils';
import styles                              from './textInputWithIcon.css';
import { IconButton, InputField, Tooltip } from '../index';
import InputContainer                      from '../proto/InputContainer';


const TextInputWithIcon = ( {
    aria,
    autoCorrect,
    autoCapitalize,
    spellCheck,
    className,
    cssMap,
    defaultValue,
    errorMessage,
    errorMessageIsVisible,
    errorMessagePosition,
    forceHover,
    hasError,
    iconButtonIsDisabled,
    iconPosition,
    iconTooltipIsVisible,
    iconTooltipMessage,
    iconTooltipPosition,
    iconType,
    id = generateId( 'TextInputWithIcon' ),
    inputRef,
    inputType,
    isDisabled,
    isReadOnly,
    isReadOnlyButton,
    isReadOnlyInput,
    label,
    labelPosition,
    name,
    onBlur,
    onChange,
    onClick,
    onClickIcon,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseOut,
    onMouseOutIcon,
    onMouseOver,
    onMouseOverIcon,
    placeholder,
    textAlign,
    value,
} ) =>
{
    let alignText = textAlign;

    if ( textAlign === 'auto' )
    {
        alignText = iconPosition === 'left' ? 'right' : 'left';
    }

    return (
        <InputContainer
            className = { buildClassName( className, cssMap, {
                disabled : isDisabled,
                error    : hasError,
                position : iconPosition,
            } ) }
            errorMessage          = { errorMessage }
            errorMessageIsVisible = { errorMessageIsVisible }
            errorMessagePosition  = { errorMessagePosition }
            hasError              = { hasError }
            id                    = { id }
            isDisabled            = { isDisabled }
            label                 = { label }
            labelPosition         = { labelPosition }
            onMouseOut            = { onMouseOut }
            onMouseOver           = { onMouseOver }>
            <div className = { cssMap.container }>
                <InputField
                    aria           = { aria }
                    className      = { cssMap.input }
                    defaultValue   = { defaultValue }
                    forceHover     = { forceHover }
                    hasError       = { hasError }
                    id             = { id }
                    inputRef       = { inputRef }
                    isDisabled     = { isDisabled }
                    isReadOnly     = { isReadOnlyInput || isReadOnly }
                    name           = { name }
                    onBlur         = { onBlur }
                    onChange       = { onChange }
                    onClick        = { onClick }
                    onFocus        = { onFocus }
                    onKeyDown      = { onKeyDown }
                    onKeyPress     = { onKeyPress }
                    onKeyUp        = { onKeyUp }
                    placeholder    = { placeholder }
                    textAlign      = { alignText }
                    type           = { inputType }
                    value          = { value }
                    autocorrect    = { autoCorrect }
                    autocapitalize = { autoCapitalize }
                    spellcheck     = { spellCheck } />
                { ( iconType && iconType !== 'none' ) &&
                    <Tooltip
                        className   = { cssMap.icon }
                        hasError    = { hasError }
                        isDisabled  = { isDisabled }
                        isReadOnly  = { isReadOnly }
                        isVisible   = { iconTooltipIsVisible }
                        message     = { iconTooltipMessage }
                        noWarn
                        onMouseOut  = { onMouseOutIcon }
                        onMouseOver = { onMouseOverIcon }
                        position    = { iconTooltipPosition }>
                        <IconButton
                            hasError    = { hasError }
                            iconType    = { iconType }
                            isDisabled  = { isDisabled || iconButtonIsDisabled }
                            isFocusable = { false }
                            isReadOnly  = { isReadOnlyButton || isReadOnly }
                            onClick     = { onClickIcon } />
                    </Tooltip>
                }
            </div>
        </InputContainer>
    );
};

TextInputWithIcon.propTypes =
{
    /**
     *  aria properties
     */
    aria : PropTypes.objectOf( PropTypes.oneOfType( [
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ] ) ),
    /**
     *  Extra CSS class name
     */
    className     : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Label text (string or JSX node)
     */
    label         : PropTypes.node,
    /**
     *  Label position
     */
    inputType     : PropTypes.oneOf( [ 'text', 'password' ] ),
    /**
     *  Label position
     */
    labelPosition : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     *  Placeholder text
     */
    placeholder   : PropTypes.string,
    /**
     *  Icon type to display (overrides customIcon)
     */
    iconType      : PropTypes.oneOf( [
        'account',
        'add',
        'add-circle',
        'alert',
        'approved',
        'arrow',
        'bell',
        'board',
        'calendar',
        'close',
        'close-circle',
        'close-thick',
        'dash',
        'dashboard',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'edit-circle',
        'ended',
        'error',
        'file',
        'graph',
        'hide',
        'info',
        'inspect',
        'left',
        'lightbulb',
        'link',
        'megaphone',
        'options',
        'pending',
        'preview',
        'puzzle-piece',
        'reset',
        'right',
        'search',
        'show',
        'star',
        'star-stroke',
        'swap',
        'table',
        'up',
        'upload',
        'validation',
        'none',
    ] ),
    /**
     *  Alignment of the icon
     */
    iconPosition        : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     * Input text alignment
     */
    textAlign           : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
    *  icon Tooltip position relative to icon
    */
    iconTooltipPosition : PropTypes.oneOf( [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'left',
        'right',
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
     *  Display as read-only for TextInput
     */
    isReadOnlyInput       : PropTypes.bool,
    /**
     *  Display as read-only for IconButton
     */
    isReadOnlyButton      : PropTypes.bool,
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
     *  Input click callback function
     */
    onClick               : PropTypes.func,
    /**
     * key down callback function
     */
    onKeyDown             : PropTypes.func,
    /**
     * key press callback function
     */
    onKeyPress            : PropTypes.func,
    /**
     * key up callback function
     */
    onKeyUp               : PropTypes.func,
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
    /**
     *  HTML attribute for disabling input auto correct when PasswordInput
     */
    autoCorrect           : PropTypes.string,
    /**
     * HTML attribute for disabling input auto capitalize when PasswordInput
     */
    autoCapitalize        : PropTypes.string,
    /**
     * HTML attribute for disabling input spell check when PasswordInput
     */
    spellCheck            : PropTypes.bool,
};

TextInputWithIcon.defaultProps =
{
    aria                  : undefined,
    className             : undefined,
    cssMap                : styles,
    defaultValue          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    iconButtonIsDisabled  : false,
    iconPosition          : 'right',
    iconTooltipIsVisible  : false,
    iconTooltipMessage    : undefined,
    iconTooltipPosition   : 'top',
    iconType              : 'none',
    id                    : undefined,
    inputType             : 'text',
    isDisabled            : false,
    isReadOnly            : false,
    isReadOnlyButton      : false,
    isReadOnlyInput       : false,
    label                 : undefined,
    labelPosition         : 'top',
    name                  : undefined,
    onBlur                : undefined,
    onChange              : undefined,
    onClickIcon           : undefined,
    onFocus               : undefined,
    onKeyDown             : undefined,
    onKeyPress            : undefined,
    onKeyUp               : undefined,
    onMouseOut            : undefined,
    onMouseOutIcon        : undefined,
    onMouseOver           : undefined,
    onMouseOverIcon       : undefined,
    placeholder           : undefined,
    textAlign             : 'auto',
    value                 : undefined,
};

export default TextInputWithIcon;
