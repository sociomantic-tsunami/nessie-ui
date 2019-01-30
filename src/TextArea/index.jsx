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


export default class TextArea extends React.Component
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
         *  Extra CSS class name
         */
        className   : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap      : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Display as error/invalid
         */
        hasError    : PropTypes.bool,
        /**
         *  HTML id attribute
         */
        id          : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled  : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly  : PropTypes.bool,
        /**
         *  Blur callback function
         */
        onBlur      : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange    : PropTypes.func,
        /**
         *  Input click callback function
         */
        onClick     : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus     : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown   : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress  : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp     : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut  : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder : PropTypes.string,
        /**
         *  TextArea resize handle
         */
        resize      : PropTypes.oneOf(
            [
                'horizontal',
                'vertical',
                'both',
                'none',
            ],
        ),
        /**
         *  The visible number of lines in a text area
         */
        rows      : PropTypes.number,
        /**
         *  Input text alignment
         */
        textAlign : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Input string value
         */
        value     : PropTypes.string,
    };

    static defaultProps =
    {
        aria        : undefined,
        className   : undefined,
        cssMap      : undefined,
        hasError    : false,
        id          : undefined,
        isDisabled  : false,
        isReadOnly  : false,
        onBlur      : undefined,
        onChange    : undefined,
        onClick     : undefined,
        onClickIcon : undefined,
        onFocus     : undefined,
        onKeyDown   : undefined,
        onKeyPress  : undefined,
        onKeyUp     : undefined,
        onMouseOut  : undefined,
        onMouseOver : undefined,
        placeholder : undefined,
        resize      : undefined,
        rows        : 2,
        textAlign   : 'left',
        value       : '',
    };

    static displayName = 'TextArea';

    textAreaRef = React.createRef();

    focus()
    {
        this.textAreaRef.current.focus();
    }

    render()
    {
        const {
            aria,
            cssMap = createCssMap( this.context.TextArea, this.props ),
            id = generateId( 'TextArea' ),
            rows,
            value,
        } = this.props;

        return (
            <textarea
                { ...mapAria( aria ) }
                { ...attachEvents( this.props ) }
                { ...this.props }
                autoCapitalize = "off"
                autoComplete   = "off"
                autoCorrect    = "off"
                spellCheck     = { false }
                className      = { cssMap.main }
                id             = { id }
                ref            = { this.textAreaRef }
                rows           = { rows }
                value          = { value } />
        );
    }
}
