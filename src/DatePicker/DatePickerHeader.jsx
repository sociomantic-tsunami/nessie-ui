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

import { IconButton, Text } from '../index';
import { buildClassName }   from '../utils';
import styles               from './datePickerHeader.css';
import TimeInput            from './TimeInput';

const DatePickerHeader = ( {
    className,
    cssMap,
    hourIsDisabled,
    hourPlaceholder,
    hourValue,
    isDisabled,
    isReadOnly,
    minuteIsDisabled,
    minutePlaceholder,
    minuteValue,
    hasTimeInput,
    month,
    onBlur,
    onChange,
    onFocus,
    onKeyPress,
    nextIsDisabled,
    onClickNext,
    onClickPrev,
    prevIsDisabled,
    year,
} ) => (
    <div className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.buttonsWrapper }>
            <IconButton
                className  = { cssMap.prev }
                iconType   = "left"
                isDisabled = { isDisabled || prevIsDisabled }
                isReadOnly = { isReadOnly }
                onClick    = { onClickPrev }
                role       = "inverted" />
            <IconButton
                className  = { cssMap.next }
                iconType   = "right"
                isDisabled = { isDisabled || nextIsDisabled }
                isReadOnly = { isReadOnly }
                onClick    = { onClickNext }
                role       = "inverted" />
        </div>
        <Text className = { cssMap.date }>
            { month }
            <span className = { cssMap.year }> { year } </span>
        </Text>
        { hasTimeInput &&
            <TimeInput
                hourIsDisabled    = { hourIsDisabled }
                hourPlaceholder   = { hourPlaceholder }
                hourValue         = { hourValue }
                isDisabled        = { isDisabled }
                isReadOnly        = { isReadOnly }
                minuteIsDisabled  = { minuteIsDisabled }
                minutePlaceholder = { minutePlaceholder }
                minuteValue       = { minuteValue }
                onBlur            = { onBlur }
                onChange          = { onChange }
                onFocus           = { onFocus }
                onKeyPress        = { onKeyPress } />
        }
    </div>
);

DatePickerHeader.propTypes = {
    className         : PropTypes.string,
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    hourIsDisabled    : PropTypes.bool,
    hourPlaceholder   : PropTypes.string,
    hourValue         : PropTypes.string,
    isDisabled        : PropTypes.bool,
    isReadOnly        : PropTypes.bool,
    minuteIsDisabled  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,
    hasTimeInput      : PropTypes.bool,
    month             : PropTypes.string,
    nextIsDisabled    : PropTypes.bool,
    onBlur            : PropTypes.func,
    onChange          : PropTypes.func,
    onClickNext       : PropTypes.func,
    onClickPrev       : PropTypes.func,
    onFocus           : PropTypes.func,
    onKeyPress        : PropTypes.func,
    prevIsDisabled    : PropTypes.bool,
    year              : PropTypes.string,
};

DatePickerHeader.defaultProps = {
    className         : undefined,
    cssMap            : styles,
    hourIsDisabled    : false,
    hourPlaceholder   : undefined,
    hourValue         : undefined,
    isDisabled        : undefined,
    isReadOnly        : undefined,
    minuteIsDisabled  : false,
    minutePlaceholder : undefined,
    minuteValue       : undefined,
    hasTimeInput      : true,
    month             : undefined,
    nextIsDisabled    : undefined,
    onBlur            : undefined,
    onChange          : undefined,
    onFocus           : undefined,
    onKeyPress        : undefined,
    onClickNext       : undefined,
    onClickPrev       : undefined,
    prevIsDisabled    : undefined,
    year              : undefined,
};

export default DatePickerHeader;
