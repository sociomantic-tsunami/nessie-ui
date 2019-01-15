/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { InputField }   from '../index';
import { generateId }   from '../utils';
import ThemeContext     from '../Theming/ThemeContext';
import { createCssMap } from '../Theming';

export default class ValuedTextInput extends React.Component
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
        autoComplete       : PropTypes.string,
        /**
         *  HTML attribute controlling input auto correct (Safari-specific)
         */
        autoCorrect        : PropTypes.oneOf( [ 'on', 'off' ] ),
        /**
         *  Extra CSS class name
         */
        className          : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap             : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Display as hover when required from another component
         */
        forceHover         : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError           : PropTypes.bool,
        /**
         *  HTML id attribute
         */
        id                 : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled         : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly         : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name               : PropTypes.string,
        /**
         *  Blur callback function
         */
        onBlur             : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange           : PropTypes.func,
        /**
         *  Input click callback function
         */
        onClick            : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus            : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown          : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress         : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp            : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut         : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver        : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder        : PropTypes.string,
        /**
         *  HTML attribute controlling input spell check
         */
        spellCheck         : PropTypes.bool,
        /**
         *  Input text alignment
         */
        textAlign          : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
        /**
         * Input value
         */
        value              : PropTypes.string,
        /**
         * Value label text
         */
        valueLabel         : PropTypes.string,
        /**
         * Position of the value label
         */
        valueLabelPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
    };

    static defaultProps =
    {
        aria               : undefined,
        autoCapitalize     : undefined,
        autoComplete       : undefined,
        autoCorrect        : undefined,
        className          : undefined,
        cssMap             : undefined,
        forceHover         : false,
        hasError           : false,
        id                 : undefined,
        isDisabled         : false,
        isReadOnly         : false,
        name               : undefined,
        onBlur             : undefined,
        onChange           : undefined,
        onClick            : undefined,
        onFocus            : undefined,
        onKeyDown          : undefined,
        onKeyPress         : undefined,
        onKeyUp            : undefined,
        onMouseOut         : undefined,
        onMouseOver        : undefined,
        placeholder        : undefined,
        spellCheck         : undefined,
        textAlign          : 'auto',
        value              : '',
        valueLabel         : undefined,
        valueLabelPosition : 'left',
    };

    static displayName = 'ValuedTextInput';

    inputRef = React.createRef();

    focus()
    {
        this.inputRef.current.focus();
    }

    render()
    {
        const {
            cssMap = createCssMap( this.context.ValuedTextInput, this.props ),
            forceHover,
            hasError,
            id = generateId( 'ValuedTextInput' ),
            isDisabled,
            onBlur,
            onFocus,
            onMouseOut,
            onMouseOver,
            textAlign,
            valueLabel,
            valueLabelPosition,
            ...props
        } = this.props;

        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = valueLabelPosition === 'left' ? 'right' : 'left';
        }

        return (
            <div
                className    = { cssMap.main }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }>
                <InputField
                    { ...props }
                    className    = { cssMap.input }
                    id           = { id }
                    onBlur       = { onBlur }
                    onFocus      = { onFocus }
                    ref          = { this.inputRef }
                    textAlign    = { alignText } />
                <label
                    className = { cssMap.valueLabel }
                    htmlFor   = { id }>
                    { valueLabel }
                </label>
            </div>
        );
    }
}
