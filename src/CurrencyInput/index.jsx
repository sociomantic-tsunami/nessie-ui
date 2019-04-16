/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global navigator */

import React, { useState } from 'react';
import PropTypes           from 'prop-types';

import { TextInput }       from '..';


const currencyFormat = ( number, currency, language = navigator.language ) =>
    number.toLocaleString( language, currency ?
        { style: 'currency', currency } : {} );

const pattern = /[^0-9.-]/g;


const componentName = 'CurrencyInput';

const CurrencyInput = ( props ) =>
{
    const {
        currency,
        defaultValue,
        id,
        style,
        value,
        ...restProps
    } = props;

    const [ valueState, setValue ] = useState( defaultValue );

    const handleBlur = () =>
    {
        const newVal = Number( String( valueState ).replace( pattern, '' ) );

        setValue( newVal );

        if ( typeof props.onBlur === 'function' )
        {
            props.onBlur( { } );
        }

        if ( typeof props.onChange === 'function' )
        {
            props.onChange( { value: newVal } );
        }
    };

    const handleChange = ( { value: scopedValue } ) =>
    {
        setValue( scopedValue );
    };

    return (
        <TextInput
            { ...restProps }
            autoCapitalize = "off"
            autoComplete   = "off"
            autoCorrect    = "off"
            id             = { id }
            spellCheck     = { false }
            onBlur         = { handleBlur }
            onChange       = { handleChange }
            style          = { style }
            value          = { currencyFormat( Number( value
                .replace( pattern, '' ) ) || valueState, currency ) } />
    );
};

CurrencyInput.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Currency to display
     */
    currency     : PropTypes.oneOf( [ 'USD', 'EUR', 'GBP' ] ),
    /**
     *  Default input string value
     */
    defaultValue : PropTypes.string,
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
     *  Input text alignment
     */
    textAlign    : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  Input string value
     */
    value        : PropTypes.string,
    /**
     *  Style overrides
     */
    style        : PropTypes.objectOf( PropTypes.string ),
};

CurrencyInput.defaultProps =
{
    className    : undefined,
    cssMap       : undefined,
    currency     : undefined,
    defaultValue : '',
    hasError     : false,
    id           : undefined,
    isDisabled   : false,
    isReadOnly   : false,
    onBlur       : undefined,
    onChange     : undefined,
    onClick      : undefined,
    onFocus      : undefined,
    onKeyDown    : undefined,
    onKeyPress   : undefined,
    onKeyUp      : undefined,
    onMouseOut   : undefined,
    onMouseOver  : undefined,
    placeholder  : undefined,
    textAlign    : 'left',
    value        : '',
    style        : undefined,
};

CurrencyInput.displayName = componentName;

export default CurrencyInput;
