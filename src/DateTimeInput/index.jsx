/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, {
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import PropTypes            from 'prop-types';
import moment               from 'moment';
import _                    from 'lodash';

import { generateId }       from '../utils';
import copy                 from './copy.json';

import { DatePicker }       from '..';

import TextInputWithIcon    from '../TextInputWithIcon';
import Popup                from '../Popup';
import PopperWrapper        from '../PopperWrapper';

const componentName = 'DateTimeInput';

const DISPLAY_FORMATTING = {
    month  : 'YYYY/MM',
    day    : 'YYYY/MM/DD',
    hour   : 'YYYY/MM/DD HH:00',
    minute : 'YYYY/MM/DD HH:mm',
};

const DEFAULT_FORMAT = 'YYYY/M/D H:m';

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
 * Human date ( input value ) conversion to timestamp,
 * returns current timestamp if invalid input value
 *
 * @param {String}  inputValue human readable date
 * @param {Number}  timestamp current timestamp
 * @param {String}  format date format
 *
 * @return {Number} timestamp
 */
function tryParseInputValue( inputValue, timestamp, format = DEFAULT_FORMAT )
{
    if ( !inputValue ) return null;

    return moment.utc( inputValue, format ).valueOf() || timestamp;
}

/**
 * Timestamp conversion to Human date
 *
 * @param {Number}  timestamp timestamp
 * @param {String}  precision precision for formatting
 *
 * @return {String} human readable date
 */
function formatDateTime( timestamp, precision )
{
    if ( !_.isNumber( timestamp ) ) return String( timestamp || '' );
    return $m( timestamp ).format( precision );
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

/**
 * set precision for formatting and comparing
 *
 * @param {String}  mode  date time input mode
 *
 * @return {String} date / time format
 */
function setPrecision( mode )
{
    let format = 'minute';

    if ( mode === 'date' )
    {
        format = 'day';
    }
    else if ( mode === 'month' )
    {
        format = 'month';
    }

    return DISPLAY_FORMATTING[ format ];
}

const DateTimeInput = React.forwardRef( ( props, ref ) =>
{
    const inputRef = useRef();

    useImperativeHandle( ref, () => ( {
        focus : () => inputRef.current.focus(),
    } ) );

    const [ editingHourInputValue, setEditingHourInputValue ] =
        useState( undefined );
    const [ editingMainInputValue, setEditingMainInputValue ] =
        useState( undefined );
    const [ editingMinuteInputValue, setEditingMinuteInputValue ] =
        useState( undefined );
    const [ editingTimestamp, setEditingTimestamp ] = useState( undefined );
    const [ gridStartTimestamp, setGridStartTimestamp ] = useState( undefined );
    const [ isOpen, setIsOpen ] = useState( undefined );
    const [ timestamp, setTimestamp ] = useState( undefined );

    const id =  useMemo( () => (
        props.id || generateId( componentName )
    ), [ props.id ] );

    // static getDerivedStateFromProps( props, state )
    // {
    //     let timestamp;
    //
    //     if ( props.value )
    //     {
    //         timestamp = props.value;
    //     }
    //     else if ( props.value === null )
    //     {
    //         timestamp = undefined;
    //     }
    //     else
    //     {
    //         timestamp = state.editingTimestamp || state.timestamp;
    //     }
    //
    //     return {
    //         id     : props.id || state.id || generateId( componentName ),
    //         isOpen : Boolean( state.gridStartTimestamp ),
    //         timestamp,
    //     };
    // }

    const handleClickCell = useCallback( ( { value } ) =>
    {
        const { isReadOnly } = props;

        if ( !isReadOnly )
        {
            setTimestamp( value );
            const { onChange } = props;

            if ( typeof onChange === 'function' )
            {
                onChange( { id, value } );
            }
        }

        purgeEdits();
    }, [ timestamp ] );

    const handleClickNext = useCallback( () =>
    {
        if ( !canGotoNext() ) return;

        setGridStartTimestamp( $m( gridStartTimestamp )
            .add( 1, props.mode === 'month' ? 'year' : 'month' )
            .valueOf() );
    }, [ gridStartTimestamp ] );

    const handleClickOutSide = useCallback( () =>
    {
        close();
    }, [ isOpen ] );

    const handleClickPrev = useCallback( () =>
    {
        if ( !canGotoPrev() ) return;

        setGridStartTimestamp( $m( gridStartTimestamp )
            .add( -1, props.mode === 'month' ? 'year' : 'month' )
            .valueOf() );
    }, [ gridStartTimestamp ] );

    const handleClickIcon = useCallback( () =>
    {
        if ( isOpen )
        {
            close();
        }
        else
        {
            open();
        }
    }, [ isOpen ] );

    const handleChangeInput = useCallback( ( { value } ) =>
    {
        const trimmed = value.replace( /\s+/g, ' ' );
        const min = props.min || now();

        let time = tryParseInputValue(
            trimmed,
            timestamp,
            props.format,
        );

        if ( time < min )
        {
            time = min;
        }

        if ( props.max && time > props.max )
        {
            time = props.max;
        }

        setEditingHourInputValue( !value ? undefined : formatHours( value ) );
        setEditingMainInputValue( !value ? undefined : value );
        setEditingMinuteInputValue( !value ? undefined :
            formatMinutes( value ) );
        setEditingTimestamp( !value ? undefined : timestamp );
        setTimestamp( !value ? undefined : timestamp );
    }, [
        editingHourInputValue,
        editingMainInputValue,
        editingMinuteInputValue,
        editingTimestamp,
        timestamp,
    ] );

    const handleChangeHour = useCallback( ( { value } ) =>
    {
        const trimmed = value.trim().replace( /\s+/g, ' ' );
        let digits = Number( trimmed );

        setEditingHourInputValue( value );

        if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 23 )
        {
            const time = $m( timestamp ).set( 'hour', digits ).valueOf();

            setEditingTimestamp( time );
            setEditingMainInputValue( formatDateTime(
                time,
                props.format || setPrecision( props.mode ),
            ) );
        }
        else
        {
            digits = _.isNumber( timestamp ) && $m( timestamp ).hour();

            if ( !_.isNaN( digits ) )
            {
                const time = $m( timestamp ).set( 'hour', digits ).valueOf();

                setEditingTimestamp( time );
                setEditingMainInputValue( formatDateTime(
                    time,
                    props.format || setPrecision( props.mode ),
                ) );
            }
        }
    },
    [
        editingTimestamp,
        editingHourInputValue,
        editingMainInputValue,
        timestamp,
    ] );

    const handleChangeMinute = useCallback( ( { value } ) =>
    {
        const trimmed = value.trim().replace( /\s+/g, ' ' );
        let digits = Number( trimmed );

        setEditingMinuteInputValue( value );

        if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 59 )
        {
            const time = $m( timestamp ).set( 'minute', digits ).valueOf();

            setEditingTimestamp( time );
            setEditingMainInputValue( formatDateTime(
                time,
                props.format || setPrecision( props.mode ),
            ) );
        }
        else
        {
            digits = _.isNumber( timestamp ) && $m( timestamp ).minute();

            if ( !_.isNaN( digits ) )
            {
                const time = $m( timestamp ).set( 'minute', digits ).valueOf();

                setEditingTimestamp( time );
                setEditingMainInputValue( formatDateTime(
                    time,
                    props.format || setPrecision( props.mode ),
                ) );
            }
        }
    },
    [
        editingTimestamp,
        editingMainInputValue,
        editingMinuteInputValue,
        timestamp,
    ] );

    // const handleInputFocus = useCallback( () =>
    // {
    //     open();
    // }, [ isOpen ] );


    const canGotoNext = useCallback( () =>
    {
        const { max } = props;
        const nextGridStart = $m( gridStartTimestamp )
            .add( 1, props.mode === 'month' ? 'year' : 'month' ).valueOf();

        return !_.isNumber( max ) ||
            ( nextGridStart <= max );
    }, [ gridStartTimestamp ] );

    const canGotoPrev = useCallback( () =>
    {
        const min = props.min || now();
        const prevGridStart = $m( gridStartTimestamp )
            .add( -1, props.mode === 'month' ? 'year' : 'month' )
            .valueOf();
        const endOfPrev = $m( prevGridStart )
            .add( 1, props.mode === 'month' ? 'year' : 'month' )
            .valueOf();

        return !_.isNumber( min ) ||
            endOfPrev > min;
    }, [ gridStartTimestamp ] );

    const canEditHourOrMinute = useCallback( () =>
        _.isNumber( timestamp ),
    [
        editingHourInputValue,
        editingMinuteInputValue,
    ] );

    const isUnitSelectable = useCallback( (
        time = timestamp,
        unit,
        allowFraction,
    ) =>
    {
        const { max } = props;
        const min = props.min || now();

        if ( time > max ) return false;

        if ( !allowFraction ) return time >= min;

        return $m( time ).add( 1, unit ) > min;
    }, [ timestamp ] );


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

            const isDisabled = hasDate && !isUnitSelectable(
                value,
                'day',
                props.mode === 'default',
            );

            const isCurrent = hasDate &&
                isTimestampEqual( value, now(), 'day' );
            const isSelected = hasDate && _.isNumber( timestamp ) &&
                isTimestampEqual( timestamp, value, 'day' );
            return {
                label,
                value,
                isDisabled,
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

            const isDisabled = !isUnitSelectable( value, 'month' );

            const isCurrent = isTimestampEqual( value, now(), 'month' );
            const isSelected = _.isNumber( timestamp ) &&
                isTimestampEqual( timestamp, value, 'month' );
            return {
                label,
                value,
                isDisabled,
                isCurrent,
                isSelected,
            };
        } );

        return _.chunk( months, 4 );
    };


    const monthLabel = () =>
    {
        const month = $m( gridStartTimestamp ).month();
        return copy.months[ month ];
    };

    const yearLabel = () => $m( gridStartTimestamp ).year().toString();


    const purgeEdits = () =>
    {
        setEditingHourInputValue( undefined );
        setEditingMainInputValue( undefined );
        setEditingMinuteInputValue( undefined );
        setEditingTimestamp( undefined );
    };


    const open = () =>
    {
        const { min } = props;
        let time;

        time = _.isNumber( timestamp ) ? timestamp : now();

        time = ( _.isNumber( min ) && min > timestamp ) ? min : timestamp;

        setGridStartTimestamp( $m( time )
            .startOf( props.mode === 'month' ? 'year' : 'month' )
            .valueOf() );
        setIsOpen( true );
    };

    const close = () =>
    {
        purgeEdits();
        setGridStartTimestamp( null );
        setIsOpen( false );
    };

    const {
        className,
        container,
        format,
        hasError,
        hourPlaceholder,
        inputPlaceholder,
        isDisabled,
        minutePlaceholder,
        mode,
    } = props;

    const datePicker = (
        <DatePicker
            hasTimeInput    = { mode === 'default' }
            headers         = { mode !== 'month' && DAY_LABELS }
            hourIsReadOnly  = { !canEditHourOrMinute() }
            hourPlaceholder = { hourPlaceholder }
            hourValue       = { editingHourInputValue ||
                formatHours( timestamp )
            }
            isDisabled = { isDisabled }
            items      = { mode === 'month' ?
                monthMatrix() : dayMatrix()
            }
            minuteIsReadOnly  = { !canEditHourOrMinute() }
            minutePlaceholder = { minutePlaceholder }
            minuteValue       =  { editingMinuteInputValue ||
                formatMinutes( timestamp )
            }
            mode           = { mode }
            month          = { mode !== 'month' && monthLabel() }
            nextIsDisabled = { !canGotoNext() }
            onChangeHour   = { handleChangeHour }
            onChangeMinute = { handleChangeMinute }
            onClickItem    = { handleClickCell }
            onClickNext    = { handleClickNext }
            onClickPrev    = { handleClickPrev }
            prevIsDisabled = { !canGotoPrev() }
            type           = { mode === 'month' ? 'month' : 'day' }
            year           = { yearLabel() } />
    );

    const popperChildren = (
        <TextInputWithIcon
            autoCapitalize  = "off"
            autoComplete    = "off"
            autoCorrect     = "off"
            className       = { className }
            forceHover      = { isOpen }
            hasError        = { hasError }
            iconType        = "calendar"
            id              = { id }
            isDisabled      = { isDisabled }
            onChangeInput   = { handleChangeInput }
            onClickIcon     = { handleClickIcon }
            // onFocus         = { handleInputFocus }
            placeholder     = { inputPlaceholder }
            spellCheck      = { false }
            value           = {
                typeof editingMainInputValue === 'undefined' ?
                    formatDateTime( timestamp, format ||
                        setPrecision( mode ) ) :
                    editingMainInputValue
            }
            inputRef = { inputRef } />
    );

    const popperPopup = (
        <Popup
            hasError = { hasError }>
            { datePicker }
        </Popup>
    );

    return (
        <PopperWrapper
            container      = { container || 'nessie-overlay' }
            isVisible      = { isOpen }
            onClickOutside = { handleClickOutSide }
            popper         = { popperPopup }
            popperOffset   = "S"
            popperPosition = "bottom-start">
            { popperChildren }
        </PopperWrapper>
    );
} );

DateTimeInput.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className         : PropTypes.string,
    /**
     *  id of the DOM element used as container for popup datepicker
     */
    container         : PropTypes.string,
    /**
     *  Date time format
     */
    format            : PropTypes.string,
    /**
     *  Display as error/invalid
     */
    hasError          : PropTypes.bool,
    /**
     *  Hour input placeholder text
     */
    hourPlaceholder   : PropTypes.string,
    /**
     *  Component id
     */
    id                : PropTypes.string,
    /**
     *  Main input placeholder text
     */
    inputPlaceholder  : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled        : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly        : PropTypes.bool,
    /**
     *  Maximum timestamp selectable
     */
    max               : PropTypes.number,
    /**
     *  Minimum timestamp selectable
     */
    min               : PropTypes.number,
    /**
     *  Minute input placeholder text
     */
    minutePlaceholder : PropTypes.string,
    /**
     *  Picker mode
     */
    mode              : PropTypes.oneOf( [ 'default', 'date', 'month' ] ),
    /**
     *  Change callback: ( { value } ) => ...
     */
    onChange          : PropTypes.func,
    /**
     *  Selected timestamp
     */
    value             : PropTypes.number,
};

DateTimeInput.defaultProps =
{
    className         : undefined,
    container         : undefined,
    format            : undefined,
    hasError          : false,
    hourPlaceholder   : undefined,
    id                : undefined,
    inputPlaceholder  : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    max               : undefined,
    min               : undefined,
    minutePlaceholder : undefined,
    mode              : 'default',
    onChange          : undefined,
    value             : undefined,
};

DateTimeInput.displayName = componentName;

export default DateTimeInput;
