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

import ThemeContext                              from '../Theming/ThemeContext';
import { createCssMap }                          from '../Theming';

const currencyFormat = ( number, currency, language = navigator.language ) =>
    number.toLocaleString( language, currency ? { style: 'currency', currency } : {} );

export default class CurrencyInput extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
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
         *  Currencies
         */
        currency     : PropTypes.oneOf( [ 'USD', 'EUR', 'GBP' ] ),
        /**
         *  Display as error/invalid
         */
        hasError     : PropTypes.bool,
        /**
         *  HTML id attribute
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
         *  Blur callback function
         */
        onBlur       : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange     : PropTypes.func,
        /**
         *  Input click callback function
         */
        onClick      : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon  : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus      : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown    : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress   : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp      : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut   : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver  : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder  : PropTypes.string,
        /**
         *  HTML attribute controlling input spell check
         */
        spellCheck   : PropTypes.bool,
        /**
         *  Input text alignment
         */
        textAlign    : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Input string value
         */
        value        : PropTypes.string,
    };

    static defaultProps =
    {

        autoCapitalize : undefined,
        autoComplete   : undefined,
        autoCorrect    : undefined,
        className      : undefined,
        cssMap         : undefined,
        currency       : 'USD',
        hasError       : false,
        id             : undefined,
        isDisabled     : false,
        isReadOnly     : false,
        onBlur         : undefined,
        onChange       : undefined,
        onClick        : undefined,
        onClickIcon    : undefined,
        onFocus        : undefined,
        onKeyDown      : undefined,
        onKeyPress     : undefined,
        onKeyUp        : undefined,
        onMouseOut     : undefined,
        onMouseOver    : undefined,
        placeholder    : undefined,
        spellCheck     : undefined,
        textAlign      : 'left',
        value          : '',
    };


    static displayName = 'CurrencyInput';

    constructor( props )
    {
        super( props );
        this.state = {
            value          : '',
            valueFormatted : ''
        };
        this.handleBlur   = this.handleBlur.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    handleBlur( e )
    {
        const newVal = Number( e.target.value.replace( /[^0-9\.-]/g, '' ) );
        this.setState( { value: newVal } );
        this.setState( { valueFormatted: currencyFormat( newVal, this.props.currency ) } );
    }

    handleChange( e )
    {
        this.setState( { valueFormatted: e.target.value } );
    }

    render()
    {

        const {
            autoCapitalize,
            autoComplete,
            autoCorrect,
            cssMap = createCssMap( this.context.CurrencyInput, this.props ),
            currency,
            id = generateId( 'CurrencyInput' ),
            isDisabled,
            isReadOnly,
            placeholder,
            spellCheck,
        } = this.props;

        return (
            <TextInput
                autoCapitalize = { autoCapitalize }
                autoComplete   = { autoComplete }
                autoCorrect    = { autoCorrect }
                className      = { cssMap.main }
                disabled       = { isDisabled }
                id             = { id }
                placeholder    = { placeholder }
                readOnly       = { isReadOnly }
                ref            = { this.inputRef }
                spellCheck     = { spellCheck }
                onBlur         = { this.handleBlur }
                onChange       = { this.handleChange }
                value          = { currencyFormat( this.state.valueFormatted, currency )} />
        );
    }
}
