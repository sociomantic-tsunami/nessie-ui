/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { attachEvents, generateId } from '../utils';

import { IconButton, InputField }   from '..';

import ThemeContext                 from '../Theming/ThemeContext';
import { createCssMap }             from '../Theming';


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
         *  Component id
         */
        id             : PropTypes.string,
        /**
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef       : PropTypes.func,
        /**
         *  HTML input type
         */
        inputType      : PropTypes.oneOf( [ 'text', 'password' ] ),
        /**
         *  Display as disabled
         */
        isDisabled     : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly     : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name           : PropTypes.string,
        /**
         *  Blur callback function
         */
        onBlur         : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChangeInput  : PropTypes.func,
        /**
         *  Click callback function
         */
        onClick        : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon    : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus        : PropTypes.func,
        /**
         *  Input key down callback function
         */
        onKeyDownInput : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut     : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver    : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder    : PropTypes.string,
        /**
         *  HTML attribute controlling input spell check
         */
        spellCheck     : PropTypes.bool,
        /**
         *  Input text alignment
         */
        textAlign      : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
        /**
         *  Input string value
         */
        value          : PropTypes.string,
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
        onChangeInput        : undefined,
        onClick              : undefined,
        onClickIcon          : undefined,
        onFocus              : undefined,
        onKeyDownInput       : undefined,
        onMouseOut           : undefined,
        onMouseOver          : undefined,
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
            onChangeInput,
            onClickIcon,
            onKeyDownInput,
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
            <div { ...attachEvents( this.props ) } className = { cssMap.main }>
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
                    onChange       = { onChangeInput }
                    onKeyDown      = { onKeyDownInput }
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
                        onClick     = { onClickIcon } />
                }
            </div>
        );
    }
}
