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
    useRef,
    useState,
} from 'react';
import PropTypes            from 'prop-types';
import moment               from 'moment';
import _                    from 'lodash';

// import copy                 from '../DatePicker/copy.json';

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

// const DAY_LABELS = _.range( 0, 7 ).map( day => ( {
//     label : copy.dayHeaders[ day ],
// } ) );


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

// /**
//  * checks if 2 timestamp are equal
//  *
//  * @param {Number}  ts1 timestamp
//  * @param {Number}  ts2 timestamp
//  * @param {String}  precision precision to compare
//  *
//  * @return {Boolean}
//  */
// function isTimestampEqual( ts1, ts2, precision )
// {
//     return $m( ts1 ).isSame( $m( ts2 ), precision );
// }

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


const useTimestamp = ( defaultValue, value ) =>
{
    const [ timestamp, setTimestamp ] = useState( defaultValue );

    const setter = ( newValue ) =>
    {
        if ( value === undefined )
        {
            setTimestamp( newValue );
        }
    };

    return [ value || timestamp, setter ];
};


const DateTimeInput = React.forwardRef( ( props, ref ) =>
{
    const inputRef = useRef();

    useImperativeHandle( ref, () => ( {
        focus : () => inputRef.current.focus(),
    } ) );

    // const [ editingHourInputValue, setEditingHourInputValue ] =
    //     useState( undefined );
    const [ editingMainInputValue, setEditingMainInputValue ] =
        useState( undefined );
    // const [ editingMinuteInputValue, setEditingMinuteInputValue ] =
    //     useState( undefined );
    const [ gridStartTimestamp, setGridStartTimestamp ] = useState( undefined );
    const [ timestamp, setTimestamp ] = useTimestamp( undefined, props.value );

    const isOpen = Boolean( gridStartTimestamp );


    // const handleClickCell = useCallback( ( { value } ) =>
    // {
    //     const { isReadOnly } = props;
    //
    //     if ( !isReadOnly )
    //     {
    //         setTimestamp( value );
    //         const { onChange } = props;
    //
    //         if ( typeof onChange === 'function' )
    //         {
    //             onChange( { id, value } );
    //         }
    //     }
    //
    //     purgeEdits();
    // }, [ props.id, props.isReadOnly, props.onChange, timestamp ] );


    // const handleClickNext = useCallback( () =>
    // {
    //     if ( !canGotoNext() ) return;
    //
    //     setGridStartTimestamp( $m( gridStartTimestamp )
    //         .add( 1, props.mode === 'month' ? 'year' : 'month' )
    //         .valueOf() );
    // }, [ gridStartTimestamp, props.mode ] );
    //
    //
    // const handleClickPrev = useCallback( () =>
    // {
    //     if ( !canGotoPrev() ) return;
    //
    //     setGridStartTimestamp( $m( gridStartTimestamp )
    //         .add( -1, props.mode === 'month' ? 'year' : 'month' )
    //         .valueOf() );
    // }, [ gridStartTimestamp, props.mode ] );


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
    }, [ inputRef.current, isOpen ] );


    const handleChangeInput = useCallback( ( { value } ) =>
    {
        const trimmed = value.replace( /\s+/g, ' ' );
        const min = props.min || now();

        let newTimestamp = tryParseInputValue(
            trimmed,
            timestamp,
            props.format,
        );

        if ( newTimestamp < min )
        {
            newTimestamp = min;
        }

        if ( props.max && newTimestamp > props.max )
        {
            newTimestamp = props.max;
        }

        // setEditingHourInputValue( !value ? undefined : formatHours( value ) );
        setEditingMainInputValue( !value ? undefined : value );
        // setEditingMinuteInputValue( !value ? undefined :
        //     formatMinutes( value ) );
        setTimestamp( !value ? undefined : newTimestamp );
    }, [ props.format, props.max, props.min, timestamp ] );


    // const handleChangeHour = useCallback( ( { value } ) =>
    // {
    //     const trimmed = value.trim().replace( /\s+/g, ' ' );
    //     let digits = Number( trimmed );
    //
    //     setEditingHourInputValue( value );
    //
    //     if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 23 )
    //     {
    //         const newTimestamp = $m( timestamp ).set( 'hour', digits )
    //             .valueOf();
    //
    //         setTimestamp( newTimestamp );
    //         setEditingMainInputValue( formatDateTime(
    //             newTimestamp,
    //             props.format || setPrecision( props.mode ),
    //         ) );
    //     }
    //     else
    //     {
    //         digits = _.isNumber( timestamp ) && $m( timestamp ).hour();
    //
    //         if ( !_.isNaN( digits ) )
    //         {
    //             const newTimestamp = $m( timestamp ).set( 'hour', digits )
    //                 .valueOf();
    //
    //             setTimestamp( newTimestamp );
    //             setEditingMainInputValue( formatDateTime(
    //                 newTimestamp,
    //                 props.format || setPrecision( props.mode ),
    //             ) );
    //         }
    //     }
    // }, [ props.format, props.mode, timestamp ] );
    //
    //
    // const handleChangeMinute = useCallback( ( { value } ) =>
    // {
    //     const trimmed = value.trim().replace( /\s+/g, ' ' );
    //     let digits = Number( trimmed );
    //
    //     setEditingMinuteInputValue( value );
    //
    //     if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 59 )
    //     {
    //         const newTimestamp = $m( timestamp ).set( 'minute', digits )
    //             .valueOf();
    //
    //         setTimestamp( newTimestamp );
    //         setEditingMainInputValue( formatDateTime(
    //             newTimestamp,
    //             props.format || setPrecision( props.mode ),
    //         ) );
    //     }
    //     else
    //     {
    //         digits = _.isNumber( timestamp ) && $m( timestamp ).minute();
    //
    //         if ( !_.isNaN( digits ) )
    //         {
    //             const newTimestamp = $m( timestamp ).set( 'minute', digits )
    //                 .valueOf();
    //
    //             setTimestamp( newTimestamp );
    //             setEditingMainInputValue( formatDateTime(
    //                 newTimestamp,
    //                 props.format || setPrecision( props.mode ),
    //             ) );
    //         }
    //     }
    // }, [ props.format, props.mode, timestamp ] );

    const handleOnBlur = useCallback( () =>
    {
        if ( !gridStartTimestamp )
        {
            purgeEdits();
        }
    }, [] );

    const canGotoNext = useCallback( () =>
    {
        const { max } = props;
        const nextGridStart = $m( gridStartTimestamp )
            .add( 1, props.mode === 'month' ? 'year' : 'month' ).valueOf();

        return !_.isNumber( max ) || ( nextGridStart <= max );
    }, [ gridStartTimestamp, props.mode, props.max ] );


    const canGotoPrev = useCallback( () =>
    {
        const min = props.min || now();
        const prevGridStart = $m( gridStartTimestamp )
            .add( -1, props.mode === 'month' ? 'year' : 'month' )
            .valueOf();
        const endOfPrev = $m( prevGridStart )
            .add( 1, props.mode === 'month' ? 'year' : 'month' )
            .valueOf();

        return !_.isNumber( min ) || endOfPrev > min;
    }, [ gridStartTimestamp, props.mode, props.min ] );


    const canEditHourOrMinute = useCallback( () =>
        _.isNumber( timestamp ), [ timestamp ] );


    // const isUnitSelectable = useCallback( (
    //     newTimestamp = timestamp,
    //     unit,
    //     allowFraction,
    // ) =>
    // {
    //     const { max } = props;
    //     const min = props.min || now();
    //
    //     if ( newTimestamp > max ) return false;
    //
    //     if ( !allowFraction ) return newTimestamp >= min;
    //
    //     return $m( newTimestamp ).add( 1, unit ) > min;
    // }, [ timestamp, props.max, props.min ] );


    // const dayMatrix = () =>
    // {
    //     const startMonth = gridStartTimestamp;
    //
    //     if ( !startMonth ) return;
    //
    //     const offset = ( $m( startMonth ).weekday() + 6 ) % 7;
    //     const daysInMonth = $m( startMonth ).daysInMonth();
    //
    //     const days = _.range( -offset, daysInMonth ).map( dayIndex =>
    //     {
    //         const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
    //         const label = hasDate ? String( dayIndex + 1 ) : '';
    //         const value = hasDate ?
    //             $m( startMonth ).add( dayIndex, 'day' ).valueOf() : null;
    //
    //         const isDisabled = hasDate && !isUnitSelectable(
    //             value,
    //             'day',
    //             props.mode === 'default',
    //         );
    //
    //         const isCurrent = hasDate &&
    //             isTimestampEqual( value, now(), 'day' );
    //         const isSelected = hasDate && _.isNumber( timestamp ) &&
    //             isTimestampEqual( timestamp, value, 'day' );
    //         return {
    //             label,
    //             value,
    //             isDisabled,
    //             isCurrent,
    //             isSelected,
    //         };
    //     } );
    //
    //     return _.chunk( days, 7 );
    // };
    //
    //
    // const monthMatrix = () =>
    // {
    //     const startYear = gridStartTimestamp;
    //
    //     if ( !startYear ) return;
    //
    //     const months = _.range( 0, 12 ).map( month =>
    //     {
    //         const label = copy.shortMonths[ month ];
    //         const value = $m( startYear ).add( month, 'month' ).valueOf();
    //
    //         const isDisabled = !isUnitSelectable( value, 'month' );
    //
    //         const isCurrent = isTimestampEqual( value, now(), 'month' );
    //         const isSelected = _.isNumber( timestamp ) &&
    //             isTimestampEqual( timestamp, value, 'month' );
    //         return {
    //             label,
    //             value,
    //             isDisabled,
    //             isCurrent,
    //             isSelected,
    //         };
    //     } );
    //
    //     return _.chunk( months, 4 );
    // };
    //
    //
    // const monthLabel = copy.months[ $m( gridStartTimestamp ).month() ];
    //
    // const yearLabel = () => $m( gridStartTimestamp ).year().toString();


    const purgeEdits = useCallback( () =>
    {
        // setEditingHourInputValue( undefined );
        setEditingMainInputValue( undefined );
        // setEditingMinuteInputValue( undefined );
    }, [] );


    const open = useCallback( () =>
    {
        const { min } = props;
        let newTimestamp;

        newTimestamp = _.isNumber( timestamp ) ? timestamp : now();

        newTimestamp = ( _.isNumber( min ) && min > timestamp ) ?
            min : timestamp;

        setGridStartTimestamp( $m( newTimestamp )
            .startOf( props.mode === 'month' ? 'year' : 'month' )
            .valueOf() );
    }, [ props.min, props.mode, timestamp ] );


    const close = useCallback( () =>
    {
        purgeEdits();
        setGridStartTimestamp( null );
    }, [] );


    const {
        className,
        popperContainer,
        format,
        hasError,
        id,
        inputPlaceholder,
        isDisabled,
        mode,
    } = props;

    const datePicker = (
        <DatePicker
            hasTimeInput    = { mode === 'default' }
            // headers         = { mode !== 'month' && DAY_LABELS }
            hourIsReadOnly  = { !canEditHourOrMinute() }
            hourValue       = { editingHourInputValue ||
                formatHours( timestamp )
            }
            isDisabled = { isDisabled }
            // items      = { mode === 'month' ?
            //     monthMatrix() : dayMatrix()
            // }
            minuteIsReadOnly  = { !canEditHourOrMinute() }
            minuteValue       = { editingMinuteInputValue ||
                formatMinutes( timestamp )
            }
            mode           = { mode }
            // month          = { mode !== 'month' && monthLabel }
            nextIsDisabled = { !canGotoNext() }
            // onClickItem    = { handleClickCell }
            onClickNext    = { handleClickNext }
            onClickPrev    = { handleClickPrev }
            prevIsDisabled = { !canGotoPrev() }
            type           = { mode === 'month' ? 'month' : 'day' }
            /* year           = { yearLabel() } */ />
    );

    const popperChildren = (
        <TextInputWithIcon
            autoCapitalize = "off"
            autoComplete   = "off"
            autoCorrect    = "off"
            className      = { className }
            hasError       = { hasError }
            iconType       = "calendar"
            id             = { id }
            inputRef       = { inputRef }
            isDisabled     = { isDisabled }
            onBlur         = { handleOnBlur }
            onChangeInput  = { handleChangeInput }
            onClickIcon    = { handleClickIcon }
            placeholder    = { inputPlaceholder }
            spellCheck     = { false }
            value          = { editingMainInputValue ||
                formatDateTime( timestamp, format || setPrecision( mode ) )
            } />
    );

    const popperPopup = (
        <Popup
            hasError = { hasError }>
            { datePicker }
        </Popup>
    );

    return (
        <PopperWrapper
            popperContainer = { popperContainer }
            isVisible       = { isOpen }
            onClickOutside  = { close }
            popper          = { popperPopup }
            popperOffset    = "S"
            popperPosition  = "bottom-start">
            { popperChildren }
        </PopperWrapper>
    );
} );

DateTimeInput.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className        : PropTypes.string,
    /**
     *  id of the DOM element used as container for popup datepicker
     */
    popperContainer  : PropTypes.string,
    /**
     *  Date time format
     */
    format           : PropTypes.string,
    /**
     *  Display as error/invalid
     */
    hasError         : PropTypes.bool,
    /**
     *  Component id
     */
    id               : PropTypes.string,
    /**
     *  Main input placeholder text
     */
    inputPlaceholder : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly       : PropTypes.bool,
    /**
     *  Maximum timestamp selectable
     */
    max              : PropTypes.number,
    /**
     *  Minimum timestamp selectable
     */
    min              : PropTypes.number,
    /**
     *  Picker mode
     */
    mode             : PropTypes.oneOf( [ 'default', 'date', 'month' ] ),
    /**
     *  Change callback: ( { value } ) => ...
     */
    onChange         : PropTypes.func,
    /**
     *  Selected timestamp
     */
    value            : PropTypes.number,
};

DateTimeInput.defaultProps =
{
    className        : undefined,
    popperContainer  : undefined,
    format           : undefined,
    hasError         : false,
    id               : undefined,
    inputPlaceholder : undefined,
    isDisabled       : false,
    isReadOnly       : false,
    max              : undefined,
    min              : undefined,
    mode             : 'default',
    onChange         : undefined,
    value            : undefined,
};

DateTimeInput.displayName = componentName;

export default DateTimeInput;
