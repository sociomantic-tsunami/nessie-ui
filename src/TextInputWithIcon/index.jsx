/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                      from 'react';
import PropTypes                  from 'prop-types';

import { IconButton, InputField } from '..';

import ThemeContext               from '../Theming/ThemeContext';
import { generateId }             from '../utils';
import { createCssMap }           from '../Theming';


export default class TextInputWithIcon extends React.Component
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
         *  Icon type to display (overrides customIcon)
         */
        iconType             : PropTypes.oneOf( [
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
        id              : PropTypes.string,
        /**
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef        : PropTypes.func,
        /**
         *  HTML input type
         */
        inputType       : PropTypes.oneOf( [ 'text', 'password' ] ),
        /**
         *  Display as disabled
         */
        isDisabled      : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly      : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name            : PropTypes.string,
        /**
         *  Blur callback function
         */
        onBlur          : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange        : PropTypes.func,
        /**
         *  Input click callback function
         */
        onClick         : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon     : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus         : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown       : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress      : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp         : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut      : PropTypes.func,
        /**
         *  Icon mouse out callback function
         */
        onMouseOutIcon  : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver     : PropTypes.func,
        /**
         *  Icon mouse over callback function
         */
        onMouseOverIcon : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder     : PropTypes.string,
        /**
         *  HTML attribute controlling input spell check
         */
        spellCheck      : PropTypes.bool,
        /**
         *  Input text alignment
         */
        textAlign       : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
        /**
         *  Input string value
         */
        value           : PropTypes.string,
    };

    static defaultProps =
    {
        aria                 : undefined,
        autoCapitalize       : undefined,
        autoComplete         : undefined,
        autoCorrect          : undefined,
        className            : undefined,
        cssMap               : undefined,
        forceHover           : false,
        hasError             : false,
        iconButtonIsDisabled : false,
        iconPosition         : 'right',
        iconType             : 'none',
        id                   : undefined,
        inputRef             : undefined,
        inputType            : 'text',
        isDisabled           : false,
        isReadOnly           : false,
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
            cssMap = createCssMap( this.context.TextInputWithIcon, this.props ),
            forceHover,
            hasError,
            iconButtonIsDisabled,
            iconPosition,
            iconType,
            id = generateId( 'TextInputWithIcon' ),
            inputRef,
            inputType,
            isDisabled,
            isReadOnly,
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

        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = ( iconType !== 'none' && iconPosition === 'left' ) ?
                'right' : 'left';
        }

        return (
            <div
                className    = { cssMap.main }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }>
                <InputField
                    aria           = { aria }
                    autocapitalize = { autoCapitalize }
                    autoComplete   = { autoComplete }
                    autoCorrect    = { autoCorrect }
                    className      = { cssMap.input }
                    forceHover     = { forceHover }
                    hasError       = { hasError }
                    id             = { id }
                    isDisabled     = { isDisabled }
                    isReadOnly     = { isReadOnly }
                    name           = { name }
                    onBlur         = { onBlur }
                    onChange       = { onChange }
                    onClick        = { onClick }
                    onFocus        = { onFocus }
                    onKeyDown      = { onKeyDown }
                    onKeyPress     = { onKeyPress }
                    onKeyUp        = { onKeyUp }
                    placeholder    = { placeholder }
                    ref            = { inputRef }
                    spellcheck     = { spellCheck }
                    textAlign      = { alignText }
                    type           = { inputType }
                    value          = { value } />
                { ( iconType && iconType !== 'none' ) &&
                    <IconButton
                        className   = { cssMap.icon }
                        hasError    = { hasError }
                        iconType    = { iconType }
                        isDisabled  = { isDisabled || iconButtonIsDisabled }
                        isFocusable = { false }
                        onClick     = { onClickIcon }
                        onMouseOut  = { onMouseOutIcon }
                        onMouseOver = { onMouseOverIcon } />
                }
            </div>
        );
    }
}
