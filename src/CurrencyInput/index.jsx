/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                                     from 'react';
import PropTypes                                 from 'prop-types';

import { attachEvents, mapAria, generateId }     from '../utils';

import { TextInput }                             from '..';


const currencyFormat = ( number, currency, language = navigator.language ) =>
    number.toLocaleString( language, currency ? { style: 'currency', currency } : {} );

export default class CurrencyInput extends React.Component
{
    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className   : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap      : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Currencies
         */
        currency    : PropTypes.oneOf( [ 'USD', 'EUR', 'GBP' ] ),
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
         *  Input text alignment
         */
        textAlign   : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Input string value
         */
        value       : PropTypes.string,
    };

    static defaultProps =
    {
        className   : undefined,
        cssMap      : undefined,
        currency    : undefined,
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
        textAlign   : 'left',
        value       : '',
    };


    static displayName = 'CurrencyInput';

    constructor( props )
    {
        super( props );
        this.state = {
            valueFormatted : '',
        };
        this.handleBlur   = this.handleBlur.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    handleBlur()
    {
        const newVal = Number( this.state.valueFormatted.replace( /[^0-9\.-]/g, '' ) );
        this.setState( {
            valueFormatted : newVal,
        } );
        if ( typeof this.props.onBlur === 'function' )
        {
            this.props.onBlur();
        }
    }

    handleChange( { value } )
    {
        this.setState( { valueFormatted: value } );
        if ( typeof this.props.onChange === 'function' )
        {
            this.props.onChange( { value } );
        }
    }

    render()
    {
        const {
            currency,
            id = generateId( 'CurrencyInput' ),
        } = this.props;

        return (
            <TextInput
                { ...this.props }
                autoCapitalize = "off"
                autoComplete   = "off"
                autoCorrect    = "off"
                spellCheck     = { false }
                id             = { id }
                onBlur         = { this.handleBlur }
                onChange       = { this.handleChange }
                value          = { currencyFormat( this.state.valueFormatted, currency ) } />
        );
    }
}
