/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/*  global addEventListener, removeEventListener */

import React, { Component }      from 'react';
import PropTypes                 from 'prop-types';
import moment                    from 'moment';
import _                         from 'lodash';

import { generateId }            from '../utils';
import DateTimeInput             from '../DateTimeInput';
import copy                      from './copy.json';

const DISPLAY_FORMATTING =
{
    month  : 'YYYY/MM',
    day    : 'YYYY/MM/DD',
    hour   : 'YYYY/MM/DD HH:00',
    minute : 'YYYY/MM/DD HH:mm',
};

const PARSE_FORMATTING =
[
    {
        predicate        : /^\d{4}\/\d{1,2}$/,
        requirePrecision : 'month',
        format           : 'YYYY/M',
    },
    {
        predicate        : /^\d{4}\/\d{1,2}\/\d{1,2}$/,
        requirePrecision : 'day',
        format           : 'YYYY/M/D',
    },
    {
        predicate :
            /^\d{4}\/\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{1,2}(:\d{1,2})?$/,
        requirePrecision : 'minute',
        format           : 'YYYY/M/D H:m',
    },
];

const PRECISIONS = [ 'minute', 'hour', 'day', 'month' ];

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
 *
 * @return {Number} timestamp
 */
function tryParseInputValue( inputValue, timestamp )
{
    if ( !inputValue ) return null;

    const parser = PARSE_FORMATTING.find( ( { predicate, requirePrecision } ) =>
        predicate.test( inputValue ) &&
              PRECISIONS.includes( requirePrecision ) );

    if ( !parser ||
         _.isNaN( moment.utc( inputValue, parser.format ).valueOf() ) )
    {
        return timestamp;
    }

    return moment.utc( inputValue, parser.format ).valueOf();
}

/**
 * Timestamp conversion to Human date
 *
 * @param {Number}  timestamp timestamp
 * @param {String}  precision precision for formatting
 *
 * @return {String} human readable date
 */
function tryFormatMainInput( timestamp, precision )
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
function tryFormatHourInput( timestamp )
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
function tryFormatMinuteInput( timestamp )
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

/**
 * returns editing timestamp when editing date time input,
 * otherwise returns the current timestamp
 *
 * @param {Number}  editingTimestamp timestamp
 * @param {Number}  timestamp timestamp
 *
 * @return {Number} timestamp
 */
function displayTimestamp( editingTimestamp, timestamp )
{
    if ( typeof editingTimestamp !== 'undefined' )
    {
        return editingTimestamp;
    }
    return timestamp;
}

export default class DatePickerStateful extends Component
{
    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className         : PropTypes.string,
        /**
         *  Display as hover when required from another component
         */
        forceHover        : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError          : PropTypes.bool,
        /**
         *  Hour input is disabled
         */
        hourIsDisabled    : PropTypes.bool,
        /**
         *  Hour input placeholder text
         */
        hourPlaceholder   : PropTypes.string,
        /**
         *  HTML id attribute
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
         *  Picker is open
         */
        isOpen            : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly        : PropTypes.bool,
        /**
         *  Display as read-only for IconButton
         */
        isReadOnlyButton  : PropTypes.bool,
        /**
         *  “Previous” button is read only
         */
        prevIsReadOnly    : PropTypes.bool,
        /**
         *  Display as read-only for TextInput
         */
        isReadOnlyInput   : PropTypes.bool,
        /**
         *  “Next” button is read only
         */
        nextIsReadOnly    : PropTypes.bool,
        /**
         *  Hour input is read only
         */
        hourIsReadOnly    : PropTypes.bool,
        /**
         *  Maximun date selectable
         */
        maxDateSelectable : PropTypes.number,
        /**
         *  Minimun date Selectable
         */
        minDateSelectable : PropTypes.number,
        /**
         *  Minute input is disabled
         */
        minuteIsDisabled  : PropTypes.bool,
        /**
         *  Minute input is read only
         */
        minuteIsReadOnly  : PropTypes.bool,
        /**
         *  Minute input placeholder text
         */
        minutePlaceholder : PropTypes.string,
        /**
         *  Picker mode
         */
        mode              : PropTypes.oneOf( [
            'default',
            'date',
            'month',
        ] ),
        /**
         *  “Next” button is disabled
         */
        nextIsDisabled  : PropTypes.bool,
        /**
         *  Blur callback function
         */
        onBlur          : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange        : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon     : PropTypes.func,
        /**
         *  onClick callback function for calendar date cell
         */
        onClickCell     : PropTypes.func,
        /**
         *  onClick callback function for “Next” button
         */
        onClickNext     : PropTypes.func,
        /**
         *  onClick callback function for “Previous” button
         */
        onClickPrev     : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus         : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown       : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress      : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp         : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut      : PropTypes.func,
        /**
         *  Icon mouse out callback function
         */
        onMouseOutIcon  : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver     : PropTypes.func,
        /**
         *  Icon mouse over callback function
         */
        onMouseOverIcon : PropTypes.func,
        /**
         *  “Previous” button is disabled
         */
        prevIsDisabled  : PropTypes.bool,
        /**
         *  Input text alignment
         */
        textAlign       : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    };

    static defaultProps =
    {
        className         : undefined,
        forceHover        : false,
        hasError          : false,
        hourIsDisabled    : false,
        hourIsReadOnly    : undefined,
        hourPlaceholder   : undefined,
        id                : undefined,
        inputPlaceholder  : undefined,
        isDisabled        : false,
        isOpen            : undefined,
        isReadOnly        : false,
        isReadOnlyButton  : undefined,
        isReadOnlyInput   : undefined,
        maxDateSelectable : undefined,
        minDateSelectable : undefined,
        minuteIsDisabled  : false,
        minuteIsReadOnly  : undefined,
        minutePlaceholder : undefined,
        mode              : 'default',
        nextIsDisabled    : undefined,
        onBlur            : undefined,
        onChange          : undefined,
        onClickCell       : undefined,
        onClickIcon       : undefined,
        onClickNext       : undefined,
        onClickPrev       : undefined,
        onFocus           : undefined,
        onKeyDown         : undefined,
        onKeyPress        : undefined,
        onKeyUp           : undefined,
        onMouseOut        : undefined,
        onMouseOutIcon    : undefined,
        onMouseOver       : undefined,
        onMouseOverIcon   : undefined,
        prevIsDisabled    : undefined,
        textAlign         : 'auto',
    };

    constructor()
    {
        super();

        this.state = {
            editingHourInputValue   : undefined,
            editingMainInputValue   : undefined,
            editingMinuteInputValue : undefined,
            editingTimestamp        : undefined,
            gridStartTimestamp      : undefined,
            id                      : undefined,
            isOpen                  : undefined,
            timestamp               : undefined,
        };

        this.gotoNext           = this.gotoNext.bind( this );
        this.gotoPrev           = this.gotoPrev.bind( this );
        this.handleChange       = this.handleChange.bind( this );
        this.handleClickCell    = this.handleClickCell.bind( this );
        this.handleClickIcon    = this.handleClickIcon.bind( this );
        this.handleClickOutSide = this.handleClickOutSide.bind( this );
        this.setWrapperRef      = this.setWrapperRef.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        return {
            id     : props.id || state.id || generateId( 'Select' ),
            isOpen : typeof props.isOpen === 'undefined' ?
                Boolean( state.gridStartTimestamp ) : props.isOpen,
            timestamp : displayTimestamp(
                state.editingTimestamp,
                state.timestamp,
            ),
        };
    }

    componentDidMount()
    {
        addEventListener( 'mousedown', this.handleClickOutSide, false );
    }

    componentWillUnmount()
    {
        removeEventListener( 'mousedown', this.handleClickOutSide, false );
    }

    setWrapperRef( ref )
    {
        this.wrapperRef = ref;
    }

    gotoNext( e )
    {
        const callback = this.props.onClickNext;

        if ( callback )
        {
            callback( e );
        }

        if ( !this.canGotoNext() ) return;

        this.setState( {
            gridStartTimestamp : $m( this.state.gridStartTimestamp )
                .add( 1, this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
        } );
    }

    gotoPrev( e )
    {
        const callback = this.props.onClickPrev;

        if ( callback )
        {
            callback( e );
        }

        if ( !this.canGotoPrev() ) return;

        this.setState( {
            gridStartTimestamp : $m( this.state.gridStartTimestamp )
                .add( -1, this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
        } );
    }

    handleClickOutSide( e )
    {
        if ( !this.wrapperRef.contains( e.target ) )
        {
            this.close();
        }
    }

    canGotoNext()
    {
        const { maxDateSelectable } = this.props;
        const nextGridStart = $m( this.state.gridStartTimestamp )
            .add( 1, this.props.mode === 'month' ? 'year' : 'month' ).valueOf();

        return !_.isNumber( maxDateSelectable ) ||
            nextGridStart <= maxDateSelectable;
    }

    canGotoPrev()
    {
        const minDateSelectable = this.props.minDateSelectable || now();
        const prevGridStart = $m( this.state.gridStartTimestamp )
            .add( -1, this.props.mode === 'month' ? 'year' : 'month' )
            .valueOf();
        const endOfPrev = $m( prevGridStart )
            .add( 1, this.props.mode === 'month' ? 'year' : 'month' )
            .valueOf();

        return !_.isNumber( minDateSelectable ) ||
            endOfPrev > minDateSelectable;
    }

    canEditHourOrMinute()
    {
        return _.isNumber( this.state.timestamp );
    }

    isUnitSelectable( timestamp, unit, allowFraction )
    {
        const { maxDateSelectable } = this.props;
        const minDateSelectable = this.props.minDateSelectable || now();

        if ( timestamp > maxDateSelectable ) return false;

        if ( !allowFraction ) return timestamp >= minDateSelectable;

        return $m( timestamp ).add( 1, unit ) > minDateSelectable;
    }

    dayMatrix()
    {
        const startMonth = this.state.gridStartTimestamp;

        if ( !startMonth ) return;

        const { timestamp } = this.state;

        const offset = ( $m( startMonth ).weekday() + 6 ) % 7;
        const daysInMonth = $m( startMonth ).daysInMonth();

        const days = _.range( -offset, daysInMonth ).map( dayIndex =>
        {
            const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
            const label = hasDate ? String( dayIndex + 1 ) : '';
            const value = hasDate ?
                $m( startMonth ).add( dayIndex, 'day' ).valueOf() :
                null;

            const isDisabled = hasDate && !this.isUnitSelectable(
                value,
                'day',
                this.props.mode === 'default',
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
    }

    monthMatrix()
    {
        const startYear = this.state.gridStartTimestamp;

        if ( !startYear ) return;

        const { timestamp } = this.state;

        const months = _.range( 0, 12 ).map( month =>
        {
            const label = copy.shortMonths[ month ];
            const value = $m( startYear ).add( month, 'month' ).valueOf();

            const isDisabled = !this.isUnitSelectable( value, 'month' );

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
    }

    monthLabel()
    {
        const month = $m( this.state.gridStartTimestamp ).month();
        return copy.months[ month ];
    }

    yearLabel()
    {
        return $m( this.state.gridStartTimestamp ).year().toString();
    }

    dayLabels()
    {
        return _.range( 0, 7 ).map( day =>
            ( { label: copy.dayHeaders[ day ] } ) );
    }

    handleClickCell( value )
    {
        const callback = this.props.onClickCell;

        if ( callback )
        {
            callback( value );
        }

        this.setState( { timestamp: parseInt( value ) } );
        this.purgeEdits();
    }

    purgeEdits()
    {
        this.setState( {
            editingTimestamp        : undefined,
            editingMainInputValue   : undefined,
            editingHourInputValue   : undefined,
            editingMinuteInputValue : undefined,
        } );
    }

    handleClickIcon( e )
    {
        const callback = this.props.onClickIcon;

        if ( callback )
        {
            callback( e );
        }

        if ( this.state.isOpen )
        {
            this.close();
        }
        else
        {
            this.open();
        }
    }

    handleChange( event, sender )
    {
        const trimmed = event.target.value.trim().replace( /\s+/g, ' ' );
        const min = this.props.minDateSelectable || now();

        if ( sender === 'main' )
        {
            let value = tryParseInputValue( trimmed, this.state.timestamp );

            if ( value < min )
            {
                value = min;
            }

            if ( this.props.maxDateSelectable &&
                    value > this.props.maxDateSelectable )
            {
                value = this.props.maxDateSelectable;
            }

            this.setState( {
                editingTimestamp        : value,
                editingHourInputValue   : tryFormatHourInput( value ),
                editingMinuteInputValue : tryFormatMinuteInput( value ),
                editingMainInputValue   : event.target.value,
            } );
        }
        else if ( sender === 'hour' )
        {
            let digits = Number( trimmed );

            this.setState( { editingHourInputValue: event.target.value } );

            if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 23 )
            {
                const value = $m( this.state.timestamp ).set( 'hour', digits )
                    .valueOf();

                this.setState( {
                    editingTimestamp      : value,
                    editingMainInputValue : tryFormatMainInput(
                        value,
                        setPrecision( this.props.mode ),
                    ),
                } );
            }
            else
            {
                digits = _.isNumber( this.state.timestamp ) &&
                    $m( this.state.timestamp ).hour();

                if ( !_.isNaN( digits ) )
                {
                    const value = $m( this.state.timestamp )
                        .set( 'hour', digits ).valueOf();

                    this.setState( {
                        editingTimestamp      : value,
                        editingMainInputValue : tryFormatMainInput(
                            value,
                            setPrecision( this.props.mode ),
                        ),
                    } );
                }
            }
        }
        else if ( sender === 'minute' )
        {
            let digits = Number( trimmed );
            this.setState( { editingMinuteInputValue: event.target.value } );

            if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 59 )
            {
                const value = $m( this.state.timestamp ).set( 'minute', digits )
                    .valueOf();

                this.setState( {
                    editingTimestamp      : value,
                    editingMainInputValue : tryFormatMainInput(
                        value,
                        setPrecision( this.props.mode ),
                    ),
                } );
            }
            else
            {
                digits = _.isNumber( this.state.timestamp ) &&
                    $m( this.state.timestamp ).minute();

                if ( !_.isNaN( digits ) )
                {
                    const value = $m( this.state.timestamp )
                        .set( 'minute', digits ).valueOf();

                    this.setState( {
                        editingTimestamp      : value,
                        editingMainInputValue : tryFormatMainInput(
                            value,
                            setPrecision( this.props.mode ),
                        ),
                    } );
                }
            }
        }
    }

    open()
    {
        const { minDateSelectable } = this.props;
        let { timestamp } = this.state;

        timestamp = _.isNumber( timestamp ) ? timestamp : now();

        timestamp = _.isNumber( minDateSelectable ) &&
            minDateSelectable > timestamp ? minDateSelectable : timestamp;

        this.setState( {
            gridStartTimestamp : $m( timestamp )
                .startOf( this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
            timestamp,
        } );
    }

    close()
    {
        this.purgeEdits();
        this.setState( { gridStartTimestamp: null } );
    }

    render()
    {
        const {
            className,
            forceHover,
            hasError,
            hourIsDisabled,
            hourIsReadOnly,
            hourPlaceholder,
            id,
            inputPlaceholder,
            isDisabled,
            isReadOnly,
            isReadOnlyButton,
            isReadOnlyInput,
            minuteIsDisabled,
            minuteIsReadOnly,
            minutePlaceholder,
            mode,
            nextIsDisabled,
            nextIsReadOnly,
            onBlur,
            onFocus,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOutIcon,
            onMouseOver,
            onMouseOverIcon,
            prevIsDisabled,
            prevIsReadOnly,
            textAlign,
        } = this.props;

        const {
            editingHourInputValue,
            editingMainInputValue,
            editingMinuteInputValue,
            isOpen,
            timestamp,
        } = this.state;

        return (
            <DateTimeInput
                className         = { className }
                currentMonth      = { mode !== 'month' ? this.monthLabel() :
                    undefined }
                currentYear       = { this.yearLabel() }
                days              = { this.dayLabels() }
                forceHover        = { forceHover }
                hasError          = { hasError }
                hourIsDisabled    = { hourIsDisabled }
                hourIsReadOnly    = { typeof hourIsReadOnly === 'undefined' ?
                    !this.canEditHourOrMinute() : hourIsReadOnly }
                hourPlaceholder   = { hourPlaceholder }
                hourValue         = { editingHourInputValue ||
                    tryFormatHourInput( timestamp ) }
                id                = { id }
                inputPlaceholder  = { inputPlaceholder }
                inputValue        = { typeof editingMainInputValue ===
                  'undefined' ? tryFormatMainInput(
                        timestamp,
                        setPrecision( mode ),
                    ) : editingMainInputValue }
                isDisabled        = { isDisabled }
                isOpen            = { isOpen }
                isReadOnly        = { isReadOnly }
                isReadOnlyButton  = { isReadOnlyButton }
                isReadOnlyInput   = { isReadOnlyInput }
                minuteIsDisabled  = { minuteIsDisabled }
                minuteIsReadOnly  = { typeof minuteIsReadOnly === 'undefined' ?
                    !this.canEditHourOrMinute() : minuteIsReadOnly }
                minutePlaceholder = { minutePlaceholder }
                minuteValue       = { editingMinuteInputValue ||
                    tryFormatMinuteInput( timestamp ) }
                mode              = { mode }
                months            = { this.monthMatrix() }
                nextIsDisabled    = { typeof nextIsDisabled === 'undefined' ?
                    !this.canGotoNext() : nextIsDisabled }
                nextIsReadOnly    = { nextIsReadOnly }
                onBlur            = { onBlur }
                onChange          = { this.handleChange }
                onClickCell       = { this.handleClickCell }
                onClickIcon       = { this.handleClickIcon }
                onClickNext       = { this.gotoNext }
                onClickPrev       = { this.gotoPrev }
                onFocus           = { onFocus }
                onKeyDown         = { onKeyDown }
                onKeyPress        = { onKeyPress }
                onKeyUp           = { onKeyUp }
                onMouseOut        = { onMouseOut }
                onMouseOutIcon    = { onMouseOutIcon }
                onMouseOver       = { onMouseOver }
                onMouseOverIcon   = { onMouseOverIcon }
                prevIsDisabled    = { typeof prevIsDisabled === 'undefined' ?
                    !this.canGotoPrev() : prevIsDisabled }
                prevIsReadOnly    = { prevIsReadOnly }
                textAlign         = { textAlign }
                weeks             = { this.dayMatrix() }
                wrapperRef        = { this.setWrapperRef } />
        );
    }
}
