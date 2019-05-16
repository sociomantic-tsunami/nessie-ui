/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { useState, forwardRef }                     from 'react';
import PropTypes                                           from 'prop-types';


import { TextInput }                                       from '..';

import { useThemeClasses }                                 from '../utils';


const componentName = 'unitInput';
const UnitInput = forwardRef( ( props, ref ) =>
{
    const [ isFocused, setIsFocused ] = useState( false );
    const {
        hasError,
        id,
        isDisabled,
        textAlign,
        onBlur,
        onChange,
        onFocus,
        placeholder,
        value,
        valueLabel,
        valueLabelPosition,
    } = props;

    const handleFocus = ( e ) =>
    {
        setIsFocused( true );
        if ( onFocus )
        {
            onFocus( e );
        }
    };

    const handleBlur = ( e ) =>
    {
        setIsFocused( false );
        if ( onBlur )
        {
            onBlur( e );
        }
    };


    let alignText = textAlign;

    if ( textAlign === 'auto' )
    {
        alignText = valueLabelPosition === 'left' ? 'right' : 'left';
    }

    const cssMap = useThemeClasses( componentName, props );

    return (
        <div
            className   = {
                `${cssMap.main} ${isFocused && cssMap.fakeHovered}` }
            ref = { ref }>
            <div className = { cssMap.container }>
                <TextInput
                    className    = { cssMap.input }
                    id           = { id }
                    isDisabled   = { isDisabled }
                    hasError     = { hasError }
                    onBlur       = { handleBlur }
                    onChange     = { onChange }
                    onFocus      = { handleFocus }
                    textAlign    = { alignText }
                    placeholder  = { placeholder }
                    value        = { value } />
                <label
                    className = { cssMap.valueLabel }
                    htmlFor   = { id }>
                    { valueLabel }
                </label>
            </div>
        </div>
    );
} );

UnitInput.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className          : PropTypes.string,
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
     *  Input text alignment
     */
    textAlign          : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Input string value
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

UnitInput.defaultProps =
{
    className          : undefined,
    forceHover         : false,
    hasError           : false,
    id                 : undefined,
    isDisabled         : false,
    onBlur             : undefined,
    onChange           : undefined,
    onClick            : undefined,
    onFocus            : undefined,
    onMouseOut         : undefined,
    onMouseOver        : undefined,
    placeholder        : undefined,
    textAlign          : 'auto',
    value              : undefined,
    valueLabel         : undefined,
    valueLabelPosition : 'left',
};

export default UnitInput;
