/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                       from 'react';
import PropTypes                   from 'prop-types';

import { Text }                    from '..';

import { attachEvents, useTheme }  from '../utils';


const componentName = 'DatePickerItem';

const DatePickerItem = props =>
{
    const cssMap = useTheme( componentName, props );

    const {
        children,
        isDisabled,
        isSelected,
        label,
        value,
    } = props;

    return (
        <button
            { ...attachEvents( props, {
                onClick : { value },
            } ) }
            aria-pressed = { isSelected }
            className    = { cssMap.main }
            disabled     = { isDisabled }
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
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    label      : PropTypes.string,
    onClick    : PropTypes.func,
    value      : PropTypes.string,
    type       : PropTypes.oneOf( [ 'day', 'month' ] ),
};

DatePickerItem.defaultProps = {
    children   : undefined,
    className  : undefined,
    cssMap     : undefined,
    isDisabled : false,
    isSelected : false,
    label      : undefined,
    onClick    : undefined,
    value      : undefined,
    type       : 'day',
};

DatePickerItem.displayName = componentName;

export default DatePickerItem;
