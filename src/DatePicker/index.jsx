/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { useMemo, useState } from 'react';
import PropTypes                    from 'prop-types';
import moment                       from 'moment';
import _                            from 'lodash';

import copy                         from './copy.json';
import DatePickerItem               from './DatePickerItem';
import DatePickerHeader             from './DatePickerHeader';
import { attachEvents, useTheme }   from '../utils';


const DAY_LABELS = _.range( 0, 7 ).map( day => ( {
    label : copy.dayHeaders[ day ],
} ) );

/**
 * returns the timestamp of the current moment
 *
 * @return {Number} timestamp
 */
function now()
{
    return new Date().getTime();
}

/**
 * returns utc of the timestamp passed
 *
 * @param {Number} timestamp passed
 *
 * @return {Number} UTC timestamp
 */
function $m( timestamp )
{
    return moment( timestamp ).utc();
}

/**
 * checks if 2 timestamp are equal
 *
 * @param {Number}  ts1 timestamp
 * @param {Number}  ts2 timestamp
 * @param {String}  precision precision to compare
 *
 * @return {Boolean}
 */
function isTimestampEqual( ts1, ts2, precision )
{
    return $m( ts1 ).isSame( $m( ts2 ), precision );
}

/**
 * Timestamp conversion to Human time ( hours )
 *
 * @param {Number}  timestamp timestamp
 *
 * @return {String} human readable time ( hours )
 */
function formatHours( timestamp )
{
    if ( !_.isNumber( timestamp ) ) return '';
    return $m( timestamp ).format( 'HH' );
}

/**
 * Timestamp conversion to Human time ( minutes )
 *
 * @param {Number}  timestamp timestamp
 *
 * @return {String} human readable time ( minutes )
 */
function formatMinutes( timestamp )
{
    if ( !_.isNumber( timestamp ) ) return '';
    return $m( timestamp ).format( 'mm' );
}


const componentName = 'DatePicker';

const DatePicker = props =>
{
    const [ gridStartTimestamp, setGridStartTimestamp ] = useState( undefined );
    const [ timestamp, setTimestamp ] = useState( undefined );
    const [ hourValue, setHourValue ] = useState( undefined );
    const [ minuteValue, setMinuteValue ] = useState( undefined );

    const cssMap = useTheme( componentName, props );
    const timeValue = useMemo( () =>
    {
        if ( props.value )
        {
            setTimestamp( props.value );
        }
    }, [ props.value, timestamp ] );


    if ( !timestamp && !timeValue )
    {
        setTimestamp( now() );
    }

    if ( !gridStartTimestamp )
    {
        setGridStartTimestamp( $m( timestamp )
            .startOf( props.type === 'month' ? 'year' : 'month' )
            .valueOf() );
    }

    const dayMatrix = () =>
    {
        const startMonth = gridStartTimestamp;

        if ( !startMonth ) return;

        const offset = ( $m( startMonth ).weekday() + 6 ) % 7;
        const daysInMonth = $m( startMonth ).daysInMonth();

        const days = _.range( -offset, daysInMonth ).map( dayIndex =>
        {
            const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
            const label = hasDate ? String( dayIndex + 1 ) : '';
            const value = hasDate ?
                $m( startMonth ).add( dayIndex, 'day' ).valueOf() : null;

            const isCurrent = hasDate &&
                isTimestampEqual( value, now(), 'day' );
            const isSelected = hasDate && _.isNumber( timestamp ) &&
                isTimestampEqual( timestamp, value, 'day' );
            return {
                label,
                value,
                isCurrent,
                isSelected,
            };
        } );

        return _.chunk( days, 7 );
    };


    const monthMatrix = () =>
    {
        const startYear = gridStartTimestamp;

        if ( !startYear ) return;

        const months = _.range( 0, 12 ).map( month =>
        {
            const label = copy.shortMonths[ month ];
            const value = $m( startYear ).add( month, 'month' ).valueOf();

            const isCurrent = isTimestampEqual( value, now(), 'month' );
            const isSelected = _.isNumber( timestamp ) &&
                isTimestampEqual( timestamp, value, 'month' );
            return {
                label,
                value,
                isCurrent,
                isSelected,
            };
        } );

        return _.chunk( months, 4 );
    };


    const monthLabel = copy.months[ $m( gridStartTimestamp ).month() ];

    const yearLabel = () => $m( gridStartTimestamp ).year().toString();


    const handleClickNext = () =>
    {
        if ( nextIsDisabled ) return;

        setGridStartTimestamp( $m( gridStartTimestamp )
            .add( 1, props.type === 'month' ? 'year' : 'month' )
            .valueOf() );
    };

    const handleClickPrev = () =>
    {
        if ( prevIsDisabled ) return;

        setGridStartTimestamp( $m( gridStartTimestamp )
            .add( -1, props.type === 'month' ? 'year' : 'month' )
            .valueOf() );
    };

    const handleChangeHour = ( { value } ) =>
    {
        const trimmed = value.trim().replace( /\s+/g, ' ' );
        let digits = Number( trimmed );

        setHourValue( value );

        if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 23 )
        {
            const newTimestamp = $m( timestamp ).set( 'hour', digits )
                .valueOf();

            setTimestamp( newTimestamp );
        }
        else
        {
            digits = _.isNumber( timestamp ) && $m( timestamp ).hour();

            if ( !_.isNaN( digits ) )
            {
                const newTimestamp = $m( timestamp ).set( 'hour', digits )
                    .valueOf();

                setTimestamp( newTimestamp );
            }
        }
    };

    const handleChangeMinute = ( { value } ) =>
    {
        const trimmed = value.trim().replace( /\s+/g, ' ' );
        let digits = Number( trimmed );

        setMinuteValue( value );

        if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 59 )
        {
            const newTimestamp = $m( timestamp ).set( 'minute', digits )
                .valueOf();

            setTimestamp( newTimestamp );
        }
        else
        {
            digits = _.isNumber( timestamp ) && $m( timestamp ).minute();

            if ( !_.isNaN( digits ) )
            {
                const newTimestamp = $m( timestamp ).set( 'minute', digits )
                    .valueOf();

                setTimestamp( newTimestamp );
            }
        }
    };

    const handleClickItem = ( { value } ) =>
    {
        setTimestamp( value );

        // const { onClickItem } = props;
        //
        // if ( typeof onClickItem === 'function' )
        // {
        //     onClickItem( { value } );
        // }

        purgeEdits();
    };


    const purgeEdits = () =>
    {
        setHourValue( undefined );
        setMinuteValue( undefined );
    };


    const {
        hasTimeInput,
        hourIsDisabled,
        hourIsReadOnly,
        hourPlaceholder,
        isDisabled,
        isReadOnly,
        label,
        minuteIsDisabled,
        minuteIsReadOnly,
        minutePlaceholder,
        nextIsDisabled,
        prevIsDisabled,
        type,
    } = props;

    const headers = type !== 'month' && DAY_LABELS;

    const items = type === 'month' ? monthMatrix() : dayMatrix();

    return (
        <div { ...attachEvents( props ) } className = { cssMap.main }>
            <DatePickerHeader
                hasTimeInput      = { hasTimeInput }
                hourIsDisabled    = { hourIsDisabled }
                hourIsReadOnly    = { hourIsReadOnly }
                hourPlaceholder   = { hourPlaceholder }
                hourValue         = { hourValue || formatHours( timestamp ) }
                isDisabled        = { isDisabled }
                isReadOnly        = { isReadOnly }
                label             = { label }
                minuteIsDisabled  = { minuteIsDisabled }
                minuteIsReadOnly  = { minuteIsReadOnly }
                minutePlaceholder = { minutePlaceholder }
                minuteValue       = { minuteValue ||
                    formatMinutes( timestamp ) }
                month             = { monthLabel }
                nextIsDisabled    = { nextIsDisabled }
                onChangeHour      = { handleChangeHour }
                onChangeMinute    = { handleChangeMinute }
                onClickNext       = { handleClickNext }
                onClickPrev       = { handleClickPrev }
                prevIsDisabled    = { prevIsDisabled }
                year              = { yearLabel() } />

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
                                                onClick = { handleClickItem }
                                                type    = { type } />
                                        }
                                    </td> ) }
                            </tr> ) }
                    </tbody>
                </table>
            }
        </div>
    );
};

DatePicker.propTypes = {
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    headers   : PropTypes.arrayOf( PropTypes
        .objectOf( PropTypes.string ) ),
    hourIsDisabled  : PropTypes.bool,
    hourIsReadOnly  : PropTypes.bool,
    hourPlaceholder : PropTypes.string,
    hourValue       : PropTypes.string,
    isDisabled      : PropTypes.bool,
    isReadOnly      : PropTypes.bool,
    items           : PropTypes.arrayOf( PropTypes
        .arrayOf( PropTypes.object ) ),
    hasTimeInput      : PropTypes.bool,
    label             : PropTypes.string,
    minuteIsDisabled  : PropTypes.bool,
    minuteIsReadOnly  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,
    nextIsDisabled    : PropTypes.bool,
    onChangeHour      : PropTypes.func,
    onChangeMinute    : PropTypes.func,
    onClickItem       : PropTypes.func,
    onClickNext       : PropTypes.func,
    onClickPrev       : PropTypes.func,
    prevIsDisabled    : PropTypes.bool,
    type              : PropTypes.oneOf( [ 'day', 'month' ] ),
    value             : PropTypes.string,
};

DatePicker.defaultProps = {
    className         : undefined,
    cssMap            : undefined,
    hasTimeInput      : true,
    headers           : undefined,
    hourIsDisabled    : false,
    hourIsReadOnly    : false,
    hourPlaceholder   : undefined,
    hourValue         : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    items             : undefined,
    label             : undefined,
    minuteIsDisabled  : false,
    minuteIsReadOnly  : false,
    minutePlaceholder : undefined,
    minuteValue       : undefined,
    nextIsDisabled    : false,
    onChangeHour      : undefined,
    onChangeMinute    : undefined,
    onClickItem       : undefined,
    onClickNext       : undefined,
    onClickPrev       : undefined,
    prevIsDisabled    : false,
    type              : 'day',
    value             : undefined,
};

DatePicker.displayName = componentName;

export default DatePicker;
