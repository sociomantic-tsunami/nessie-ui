/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { useState }  from 'react';
import PropTypes            from 'prop-types';

import { useTheme }         from '../utils';


const componentName = 'TimeInput';

const TimeInput = props =>
{
    const [ hourValue, setHourValue ] = useState( undefined );
    const [ minuteValue, setMinuteValue ] = useState( undefined );

    const cssMap = useTheme( componentName, props );


    const handleChangeHour = ( e ) =>
    {
        const { value } = e.target;
        const { onChangeHour } = props;

        if ( onChangeHour )
        {
            onChangeHour( value );
        }

        setHourValue( value );
    };

    const handleChangeMinute = ( e ) =>
    {
        const { value } = e.target;
        const { onChangeMinute } = props;

        if ( onChangeMinute )
        {
            onChangeMinute( value );
        }

        setMinuteValue( value );
    };


    const {
        hourIsDisabled,
        hourIsReadOnly,
        hourPlaceholder,
        id,
        isDisabled,
        isReadOnly,
        minuteIsDisabled,
        minuteIsReadOnly,
        minutePlaceholder,
    } = props;

    return (
        <div className = { cssMap.main }>
            <input
                className   = { cssMap.hour }
                disabled    = { isDisabled || hourIsDisabled }
                id          = { `${id}-hour` }
                onChange    = { handleChangeHour }
                placeholder = { hourPlaceholder }
                readOnly    = { isReadOnly || hourIsReadOnly }
                type        = "text"
                value       = { hourValue } />
            <span>:</span>
            <input
                className   = { cssMap.min }
                disabled    = { isDisabled || minuteIsDisabled }
                id          = { `${id}-minute` }
                onChange    = { handleChangeMinute }
                placeholder = { minutePlaceholder }
                readOnly    = { isReadOnly || minuteIsReadOnly }
                type        = "text"
                value       = { minuteValue } />
        </div>
    );
};

TimeInput.propTypes =
{
    className         : PropTypes.string,
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    hourIsDisabled    : PropTypes.bool,
    hourIsReadOnly    : PropTypes.bool,
    hourPlaceholder   : PropTypes.string,
    hourValue         : PropTypes.string,
    id                : PropTypes.string,
    isDisabled        : PropTypes.bool,
    isReadOnly        : PropTypes.bool,
    minuteIsDisabled  : PropTypes.bool,
    minuteIsReadOnly  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,
    onChangeHour      : PropTypes.func,
    onChangeMinute    : PropTypes.func,
};

TimeInput.defaultProps =
{
    className         : undefined,
    cssMap            : undefined,
    hourIsDisabled    : false,
    hourIsReadOnly    : false,
    hourPlaceholder   : 'HH',
    hourValue         : undefined,
    id                : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    minuteIsDisabled  : false,
    minuteIsReadOnly  : false,
    minutePlaceholder : 'mm',
    minuteValue       : undefined,
    onChangeHour      : undefined,
    onChangeMinute    : undefined,
};

TimeInput.displayName = componentName;

export default TimeInput;
