/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                                 from 'react';
import PropTypes                             from 'prop-types';

import { attachEvents, mapAria, generateId } from '../utils';
import ThemeContext                          from '../Theming/ThemeContext';
import { createCssMap }                      from '../Theming';


export default class InputField extends React.Component
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
        autoComplete : PropTypes.string,
        /**
         *  HTML attribute controlling input auto correct (Safari-specific)
         */
        autoCorrect  : PropTypes.oneOf( [ 'on', 'off' ] ),
        /**
         *  Extra CSS class name
         */
        className    : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap       : PropTypes.objectOf( PropTypes.string ),
        /**
         *  HTML element
         */
        element      : PropTypes.oneOf( [ 'input', 'textarea' ] ),
        /**
         *  Display as hover when required from another component
         */
        forceHover   : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError     : PropTypes.bool,
        /**
         *  Component id
         */
        id           : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled   : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly   : PropTypes.bool,
        /**
         * Sets the input to be vertically resizable (textarea element only)
         */
        isResizable  : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name         : PropTypes.string,
        /**
         *  Placeholder text
         */
        placeholder  : PropTypes.string,
        /**
         *  Number of rows (textarea element only)
         */
        rows         : PropTypes.number,
        /**
         *  HTML attribute controlling input spell check
         */
        spellCheck   : PropTypes.bool,
        /**
         *  Input text alignment
         */
        textAlign    : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  HTML type attribute (input element only)
         */
        type         : PropTypes.oneOf( [ 'text', 'password', 'number' ] ),
        /**
         *  Input string value
         */
        value        : PropTypes.string,
    };

    static defaultProps =
    {
        aria           : undefined,
        autoCapitalize : undefined,
        autoComplete   : undefined,
        autoCorrect    : undefined,
        className      : undefined,
        cssMap         : undefined,
        element        : 'input',
        forceHover     : false,
        hasError       : false,
        id             : undefined,
        isDisabled     : false,
        isReadOnly     : false,
        isResizable    : undefined,
        name           : undefined,
        placeholder    : undefined,
        rows           : undefined,
        spellCheck     : undefined,
        textAlign      : 'left',
        type           : 'text',
        value          : '',
    };

    static displayName = 'InputField';

    inputRef = React.createRef();

    focus()
    {
        this.inputRef.current.focus();
    }

    render()
    {
        const {
            aria,
            autoCapitalize,
            autoComplete,
            autoCorrect,
            cssMap = createCssMap( this.context.InputField, this.props ),
            element,
            id = generateId( 'InputField' ),
            isDisabled,
            isReadOnly,
            name,
            placeholder,
            rows,
            spellCheck,
            type,
            value,
        } = this.props;

        const InputElement = element || 'input';

        return (
            <InputElement
                { ...mapAria( aria ) }
                { ...attachEvents( this.props ) }
                autoCapitalize = { autoCapitalize }
                autoComplete   = { autoComplete }
                autoCorrect    = { autoCorrect }
                className      = { cssMap.main }
                disabled       = { isDisabled }
                id             = { id }
                name           = { name }
                placeholder    = { placeholder }
                readOnly       = { isReadOnly }
                ref            = { this.inputRef }
                rows           = { element === 'textarea' ? rows : null }
                spellCheck     = { spellCheck }
                type           = { element === 'input' ? type : null }
                value          = { value } />
        );
    }
}
