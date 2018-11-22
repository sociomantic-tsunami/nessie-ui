/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                            from 'react';
import PropTypes                        from 'prop-types';

import { InputField }                   from '../index';
import { generateId, buildClassName }   from '../utils';


export default class ValuedTextInput extends React.Component
{
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
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef           : PropTypes.func,
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
        forceHover         : false,
        hasError           : false,
        id                 : undefined,
        inputRef           : undefined,
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

    constructor( props )
    {
        super( props );

        this.state = { ...this.state, isFocused: false };

        this.handleFocus = this.handleFocus.bind( this );
        this.handleBlur  = this.handleBlur.bind( this );
    }

    handleFocus( e )
    {
        const { onFocus } = this.props;
        this.setState( { isFocused: true  } );
        if ( onFocus )
        {
            onFocus( e );
        }
    }

    handleBlur( e )
    {
        const { onBlur } = this.props;
        this.setState( { isFocused: false } );
        if ( onBlur )
        {
            onBlur( e );
        }
    }

    render()
    {
        const {
            className,
            cssMap,
            forceHover,
            hasError,
            id = generateId( 'ValuedTextInput' ),
            isDisabled,
            onMouseOut,
            onMouseOver,
            textAlign,
            valueLabel,
            valueLabelPosition,
            ...props
        } = this.props;

        const { isFocused } = this.state;

        let alignText = textAlign;

        if ( textAlign === 'auto' )
        {
            alignText = valueLabelPosition === 'left' ? 'right' : 'left';
        }

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    disabled    : isDisabled,
                    error       : hasError,
                    fakeHovered : forceHover || isFocused,
                    position    : valueLabelPosition,
                }  ) }
                onMouseOut  = { onMouseOut }
                onMouseOver = { onMouseOver }>
                <InputField
                    { ...props }
                    className    = { cssMap.input }
                    id           = { id }
                    onBlur       = { this.handleBlur }
                    onFocus      = { this.handleFocus }
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
