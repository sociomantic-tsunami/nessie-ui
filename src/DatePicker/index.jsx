/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                          from 'react';
import PropTypes                      from 'prop-types';

import { buildClassName }             from '../utils';
import styles                         from './datePicker.css';
import DatePickerItem                 from './DatePickerItem';
import DatePickerHeader               from './DatePickerHeader';


const DatePicker = ( {
    className,
    cssMap,
    month,
    year,
    headers,
    hourIsDisabled,
    hourPlaceholder,
    hourValue,
    isDisabled,
    isReadOnly,
    items,
    label,
    minuteIsDisabled,
    minutePlaceholder,
    minuteValue,
    hasTimeInput,
    nextIsDisabled,
    onBlur,
    onChange,
    onFocus,
    onKeyPress,
    onClickItem,
    onClickNext,
    onClickPrev,
    prevIsDisabled,
    type,
} ) => (
    <div className = { buildClassName( className, cssMap ) }>
        <DatePickerHeader
            isDisabled     = { isDisabled }
            isReadOnly     = { isReadOnly }
            label          = { label }
            month          = { month }
            year           = { year }
            nextIsDisabled = { nextIsDisabled }
            onClickNext    = { onClickNext }
            onClickPrev    = { onClickPrev }
            prevIsDisabled = { prevIsDisabled }
            hourIsDisabled    = { hourIsDisabled }
            hourPlaceholder   = { hourPlaceholder }
            hourValue         = { hourValue }
            minuteIsDisabled  = { minuteIsDisabled }
            minutePlaceholder = { minutePlaceholder }
            minuteValue       = { minuteValue }
            hasTimeInput      = { hasTimeInput }
            onBlur            = { onBlur }
            onChange          = { onChange }
            onFocus           = { onFocus }
            onKeyPress        = { onKeyPress } />

        { items &&
            <table className = { cssMap.calendar }>
                { headers &&
                    <thead className = { cssMap.calendarHeader }>
                        <tr>
                            { headers.map( ( header, i ) =>
                                <th key = { i }>
                                    <span title = { header.title }>
                                        { header.label }
                                    </span>
                                </th> ) }
                        </tr>
                    </thead>
                }
                <tbody>
                    { items.map( ( item, i ) =>
                        <tr key = { i }>
                            { item.map( ( item, j ) =>
                                <td key = { j }>
                                    { item.value &&
                                        <DatePickerItem
                                            { ...item }
                                            onClick = { onClickItem }
                                            type    = { type } />
                                    }
                                </td> ) }
                        </tr> ) }
                </tbody>
            </table>
        }
    </div>
);

DatePicker.propTypes = {
    className         : PropTypes.string,
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    headers           : PropTypes.arrayOf( PropTypes.objectOf( PropTypes.string ) ),
    hourIsDisabled    : PropTypes.bool,
    hourPlaceholder   : PropTypes.string,
    hourValue         : PropTypes.string,
    isDisabled        : PropTypes.bool,
    isReadOnly        : PropTypes.bool,
    items             : PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.object ) ),
    label             : PropTypes.string,
    minuteIsDisabled  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,
    hasTimeInput      : PropTypes.bool,
    month             : PropTypes.string,
    nextIsDisabled    : PropTypes.bool,
    onBlur            : PropTypes.func,
    onChange          : PropTypes.func,
    onClickItem       : PropTypes.func,
    onClickNext       : PropTypes.func,
    onClickPrev       : PropTypes.func,
    onFocus           : PropTypes.func,
    onKeyPress        : PropTypes.func,
    prevIsDisabled    : PropTypes.bool,
    type              : PropTypes.oneOf( [ 'day', 'month' ] ),
    year              : PropTypes.string,
};

DatePicker.defaultProps = {
    className         : undefined,
    cssMap            : styles,
    headers           : undefined,
    hourIsDisabled    : false,
    hourPlaceholder   : undefined,
    hourValue         : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    items             : undefined,
    label             : undefined,
    minuteIsDisabled  : false,
    minutePlaceholder : undefined,
    minuteValue       : undefined,
    hasTimeInput      : true,
    month             : undefined,
    nextIsDisabled    : false,
    onBlur            : undefined,
    onChange          : undefined,
    onClickItem       : undefined,
    onClickNext       : undefined,
    onClickPrev       : undefined,
    onFocus           : undefined,
    onKeyPress        : undefined,
    prevIsDisabled    : false,
    type              : 'day',
    year              : undefined,
};

export default DatePicker;
