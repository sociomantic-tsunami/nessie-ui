/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import styles               from './datePickerItem.css';
import { Text }             from '../index';


const DatePickerItem = ( {
    children,
    className,
    cssMap,
    forceHover,
    isDisabled,
    isSelected,
    isReadOnly,
    label,
    onClick,
    value,
    type,
} ) =>
{
    const handleClick = e =>
    {
        e.stopPropagation();
        e.preventDefault();
        if ( !isReadOnly && onClick )
        {
            onClick( value );
        }
    };

    return (
        <button
            aria-pressed = { isSelected }
            className    = { buildClassName( className, cssMap, {
                fakeHovered : forceHover,
                disabled    : isDisabled,
                selected    : isSelected,
                type        : type,
            } ) }
            disabled     = { isDisabled }
            onClick      = { handleClick }
            type         = "button"
            value        = { value }>
            <Text className = { cssMap.text }>{ children || label }</Text>
        </button>
    );
};

DatePickerItem.propTypes = {
    children   : PropTypes.node,
    className  : PropTypes.string,
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    forceHover : PropTypes.bool,
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    isReadOnly : PropTypes.bool,
    label      : PropTypes.string,
    onClick    : PropTypes.func,
    value      : PropTypes.string,
    type       : PropTypes.oneOf( [ 'day', 'month' ] ),
};

DatePickerItem.defaultProps = {
    children   : undefined,
    className  : undefined,
    cssMap     : styles,
    forceHover : false,
    isDisabled : false,
    isSelected : false,
    isReadOnly : false,
    label      : undefined,
    onClick    : undefined,
    value      : undefined,
    type       : 'day',
};

export default DatePickerItem;
