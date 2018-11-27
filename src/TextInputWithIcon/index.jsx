/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                               from 'react';
import PropTypes                           from 'prop-types';

import { buildClassName, generateId }      from '../utils';
import { IconButton, InputField, Tooltip } from '../index';
import ThemeContext                        from '../Theming/ThemeContext';
import { evalTheme }                       from '../Theming/withTheme';

export default class TextInputWithIcon extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  ARIA properties
         */
        aria : PropTypes.objectOf( PropTypes.oneOfType( [
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
        ] ) ),
        /**
         *  HTML attribute controlling input auto capitalize
         */
        autoCapitalize : PropTypes.oneOf( [
            'on',
            'off',
            'none',
            'sentences',
            'words',
            'characters',
        ] ),
        /**
         *  HTML attribute controlling input auto complete
         */
        autoComplete         : PropTypes.string,
        /**
         *  HTML attribute controlling input auto correct (Safari-specific)
         */
        autoCorrect          : PropTypes.oneOf( [ 'on', 'off' ] ),
        /**
         *  Extra CSS class name
         */
        className            : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap               : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Display as hover when required from another component
         */
        forceHover           : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError             : PropTypes.bool,
        /**
         *  Display Button icon as disabled
         */
        iconButtonIsDisabled : PropTypes.bool,
        /**
         *  Alignment of the icon
         */
        iconPosition         : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Display the icon tooltip
         */
        iconTooltipIsVisible : PropTypes.bool,
        /**
         *  icon Tooltip message text (string or JSX)
         */
        iconTooltipMessage   : PropTypes.node,
        /**
         *  Icon Tooltip position relative to icon
         */
        iconTooltipPosition  : PropTypes.oneOf( [
            'left',
            'right',
            'top',
            'bottom',
            'topLeft',
            'topRight',
        ] ),
        /**
         *  Icon type to display (overrides customIcon)
         */
        iconType : PropTypes.oneOf( [
            'account',
            'add-circle',
            'add',
            'alert',
            'approved',
            'arrow',
            'arrow-up',
            'arrow-down',
            'bell',
            'board',
            'calendar',
            'close-circle',
            'close-thick',
            'close',
            'dash',
            'dashboard',
            'declined',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit-circle',
            'edit',
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
            'loader',
            'megaphone',
            'options',
            'paused',
            'pending',
            'preview',
            'puzzle-piece',
            'reset',
            'right',
            'search',
            'show',
            'star-stroke',
            'star',
            'sociomantic',
            'swap',
            'table',
            'up',
            'upload',
            'validation',
            'none',
        ] ),
        /**
         *  HTML id attribute
         */
        id               : PropTypes.string,
        /**
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef         : PropTypes.func,
        /**
         *  HTML input type
         */
        inputType        : PropTypes.oneOf( [ 'text', 'password' ] ),
        /**
         *  Display as disabled
         */
        isDisabled       : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly       : PropTypes.bool,
        /**
         *  Display as read-only for IconButton
         */
        isReadOnlyButton : PropTypes.bool,
        /**
         *  is read only
         */
        isReadOnlyInput  : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name             : PropTypes.string,
        /**
         *  Blur callback function
         */
        onBlur           : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange         : PropTypes.func,
        /**
         *  Input click callback function
         */
        onClick          : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon      : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus          : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown        : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress       : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp          : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut       : PropTypes.func,
        /**
         *  Icon mouse out callback function
         */
        onMouseOutIcon   : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver      : PropTypes.func,
        /**
         *  Icon mouse over callback function
         */
        onMouseOverIcon  : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder      : PropTypes.string,
        /**
         *  HTML attribute controlling input spell check
         */
        spellCheck       : PropTypes.bool,
        /**
         *  Input text alignment
         */
        textAlign        : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
        /**
         *  Input string value
         */
        value            : PropTypes.string,
    };

    static defaultProps =
    {
        aria                 : undefined,
        autoCapitalize       : undefined,
        autoComplete         : undefined,
        autoCorrect          : undefined,
        className            : undefined,
        forceHover           : false,
        hasError             : false,
        iconButtonIsDisabled : false,
        iconPosition         : 'right',
        iconTooltipIsVisible : false,
        iconTooltipMessage   : undefined,
        iconTooltipPosition  : 'top',
        iconType             : 'none',
        id                   : undefined,
        inputRef             : undefined,
        inputType            : 'text',
        isDisabled           : false,
        isReadOnly           : false,
        isReadOnlyButton     : false,
        isReadOnlyInput      : false,
        name                 : undefined,
        onBlur               : undefined,
        onChange             : undefined,
        onClick              : undefined,
        onClickIcon          : undefined,
        onFocus              : undefined,
        onKeyDown            : undefined,
        onKeyPress           : undefined,
        onKeyUp              : undefined,
        onMouseOut           : undefined,
        onMouseOutIcon       : undefined,
        onMouseOver          : undefined,
        onMouseOverIcon      : undefined,
        placeholder          : undefined,
        spellCheck           : undefined,
        textAlign            : 'auto',
        value                : '',
    };

    static displayName = 'TextInputWithIcon';

    render()
    {
        const {
            aria,
            autoCapitalize,
            autoComplete,
            autoCorrect,
            className,
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
            spellCheck,
            textAlign,
            value,
        } = this.props;

        const cssMap = evalTheme( this.context.TextInputWithIcon, this.props );
        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = ( iconType !== 'none' && iconPosition === 'left' ) ?
                'right' : 'left';
        }

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    disabled : isDisabled,
                    error    : hasError,
                    position : iconPosition,
                } ) }
                cssMap      = { cssMap }
                onMouseOut  = { onMouseOut }
                onMouseOver = { onMouseOver }>
                <InputField
                    aria           = { aria }
                    autocapitalize = { autoCapitalize }
                    autoComplete   = { autoComplete }
                    autoCorrect    = { autoCorrect }
                    className      = { cssMap.input }
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
                    spellcheck     = { spellCheck }
                    textAlign      = { alignText }
                    type           = { inputType }
                    value          = { value } />
                { ( iconType && iconType !== 'none' ) &&
                <Tooltip
                    className   = { cssMap.icon }
                    hasError    = { hasError }
                    isDisabled  = { isDisabled }
                    isReadOnly  = { isReadOnly }
                    isVisible   = { iconTooltipIsVisible }
                    message     = { iconTooltipMessage }
                    onMouseOut  = { onMouseOutIcon }
                    onMouseOver = { onMouseOverIcon }
                    position    = { iconTooltipPosition } >
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
        );
    }
}
