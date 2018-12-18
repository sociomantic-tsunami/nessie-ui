/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

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
        predicate        : /^\d{4}\/\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{1,2}(:\d{1,2})?$/,
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
 * gets the index of the option by the passed id
 *
 * @param {Number}
 *
 * @return {Number} index of the option
 */
function $m( timestamp )
{
    return moment( timestamp ).utc();
}

/**
 * gets the index of the option by the passed id
 *
 * @param {Number}  ts1 dffdfd
 * @param {Number}  ts2 dffdfd
 * @param {String}  precision dffdfd
 *
 * @return {Number} index of the option
 */
function isTimestampEqual( ts1, ts2, precision )
{
    return $m( ts1 ).isSame( $m( ts2 ), precision );
}

/**
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
 */
function comparePrecision( precision )
{
    const queryPrecisionCode = PRECISIONS.indexOf( precision );
    const currentPrecisionCode = PRECISIONS.indexOf( this.precision );
    return queryPrecisionCode < 0 ? null :
        currentPrecisionCode - queryPrecisionCode;
}

/**
 */
function tryFormatMainInput( timestamp, precision )
{
    if ( !_.isNumber( timestamp ) ) return String( timestamp || '' );
    return $m( timestamp ).format( precision );
}

/**
 */
function tryFormatHourInput( timestamp )
{
    if ( !_.isNumber( timestamp ) ) return '';
    return $m( timestamp ).format( 'HH' );
}

/**
 */
function tryFormatMinuteInput( timestamp )
{
    if ( !_.isNumber( timestamp ) ) return '';
    return $m( timestamp ).format( 'mm' );
}

/**
 */
function precision( mode )
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
        className             : PropTypes.string,
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
         *  Error Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
        *   Error message position relative to the icon
        */
        errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
        /**
         *  Current month to disaplay in default/day mode
         */
        currentMonth          : PropTypes.string,
        /**
         *  Current year to display
         */
        currentYear           : PropTypes.string,
        /**
         *  Days of week to display
         */
        days                  : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Display as hover when required from another component
         */
        forceHover            : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Hour input ref callback function:
         *  ( ref ) = { ... }
         */
        hourInputRef          : PropTypes.func,
        /**
         *  Hour input is disabled
         */
        hourIsDisabled        : PropTypes.bool,
        /**
         *  Hour input placeholder text
         */
        hourPlaceholder       : PropTypes.string,
        /**
         *  Hour input value
         */
        hourValue             : PropTypes.string,
        /**
         *  HTML id attribute
         */
        id                    : PropTypes.string,
        /**
         *  Main input placeholder text
         */
        inputPlaceholder      : PropTypes.string,
        /**
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef              : PropTypes.func,
        /**
         *  Main input value
         */
        inputValue            : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled            : PropTypes.bool,
        /**
         *  Picker is open
         */
        isOpen                : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly            : PropTypes.bool,
        /**
         *  Display as read-only for IconButton
         */
        isReadOnlyButton      : PropTypes.bool,
        /**
         *  “Previous” button is read only
         */
        prevIsReadOnly        : PropTypes.bool,
        /**
         *  Display as read-only for TextInput
         */
        isReadOnlyInput       : PropTypes.bool,
        /**
         *  “Next” button is read only
         */
        nextIsReadOnly        : PropTypes.bool,
        /**
         *  Label text (string or JSX node)
         */
        label                 : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
        /**
         *  Minute input ref callback function:
         *  ( ref ) = { ... }
         */
        minuteInputRef        : PropTypes.func,
        /**
         *  Hour input is read only
         */
        hourIsReadOnly        : PropTypes.bool,
        /**
         *  Maximun date selectable
         */
        maxDateSelectable     : PropTypes.number,
        /**
         *  Minimun date Selectable
         */
        minDateSelectable     : PropTypes.number,
        /**
         *  Minute input is disabled
         */
        minuteIsDisabled      : PropTypes.bool,
        /**
         *  Minute input is read only
         */
        minuteIsReadOnly      : PropTypes.bool,
        /**
         *  Minute input placeholder text
         */
        minutePlaceholder     : PropTypes.string,
        /**
         *  Minute input value
         */
        minuteValue           : PropTypes.string,
        /**
         *  Picker mode
         */
        mode                  : PropTypes.oneOf( [
            'default',
            'date',
            'month',
        ] ),
        /**
         *  Months to display in month mode
         */
        months          : PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.object ) ),
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
        /**
         *  Weeks to display in default/day mode
         */
        weeks           : PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.object ) ),
    };

    static defaultProps =
    {
        className             : undefined,
        currentMonth          : undefined,
        currentYear           : undefined,
        days                  : undefined,
        errorMessage          : undefined,
        errorMessageIsVisible : undefined,
        errorMessagePosition  : undefined,
        forceHover            : false,
        hasError              : false,
        hourInputRef          : undefined,
        hourIsDisabled        : false,
        hourPlaceholder       : undefined,
        hourValue             : undefined,
        id                    : undefined,
        inputPlaceholder      : undefined,
        inputRef              : undefined,
        inputValue            : undefined,
        isDisabled            : false,
        isOpen                : undefined,
        isReadOnly            : false,
        isReadOnlyButton      : undefined,
        isReadOnlyInput       : undefined,
        label                 : undefined,
        labelPosition         : undefined,
        maxDateSelectable     : undefined,
        minDateSelectable     : undefined,
        minuteInputRef        : undefined,
        minuteIsDisabled      : false,
        minutePlaceholder     : undefined,
        minuteValue           : undefined,
        mode                  : 'default',
        months                : undefined,
        nextIsDisabled        : false,
        onBlur                : undefined,
        onChange              : undefined,
        onClickCell           : undefined,
        onClickIcon           : undefined,
        onClickNext           : undefined,
        onClickPrev           : undefined,
        onFocus               : undefined,
        onKeyDown             : undefined,
        onKeyPress            : undefined,
        onKeyUp               : undefined,
        onMouseOut            : undefined,
        onMouseOutIcon        : undefined,
        onMouseOver           : undefined,
        onMouseOverIcon       : undefined,
        prevIsDisabled        : false,
        textAlign             : 'auto',
        weeks                 : undefined,
    };

    constructor()
    {
        super();

        this.state = {
            editingHourInputValue   : undefined,
            editingMainInputValue   : undefined,
            editingMinuteInputValue : undefined,
            gridStartTimestamp      : undefined,
            id                      : undefined,
            isOpen                  : undefined,
            timestamp               : undefined,
        };

        this.gotoNext        = this.gotoNext.bind( this );
        this.gotoPrev        = this.gotoPrev.bind( this );
        this.handleClickIcon = this.handleClickIcon.bind( this );
        this.handleClickCell = this.handleClickCell.bind( this );
        this.handleOnBlur    = this.handleOnBlur.bind( this );
        this.setInputRef     = this.setInputRef.bind( this );
        this.setHourRef      = this.setHourRef.bind( this );
        this.setMinuteRef    = this.setMinuteRef.bind( this );
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

    setInputRef( ref )
    {
        this.inputRef = ref;
    }

    setHourRef( ref )
    {
        this.inputHourRef = ref;
    }

    setMinuteRef( ref )
    {
        this.inputMinuteRef = ref;
    }

    gotoNext()
    {
        if ( !this.canGotoNext() ) return;

        this.setState( {
            gridStartTimestamp : $m( this.state.gridStartTimestamp )
                .add( 1, this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
        } );
    }

    gotoPrev()
    {
        if ( !this.canGotoPrev() ) return;

        this.setState( {
            gridStartTimestamp : $m( this.state.gridStartTimestamp )
                .add( -1, this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
        } );
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
            ( { label : copy.dayHeaders[ day ] } ) );
    }

    handleClickCell( value )
    {
        // const callback = this.props.onClickCell;
        //
        // if ( callback )
        // {
        //     callback( e );
        // }

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

    handleChange( inputValue, sender )
    {
        const trimmed = inputValue.trim().replace( /\s+/g, ' ' );

        if ( sender === 'main' )
        {
            const value = tryParseInputValue( trimmed, this.state.timestamp );

            this.setState( {
                editingTimestamp        : value,
                editingHourInputValue   : tryFormatHourInput( value ),
                editingMinuteInputValue : tryFormatMinuteInput( value ),
                editingMainInputValue   : inputValue,
            } );
        }
        else if ( sender === 'hour' )
        {
            const digits = Number( trimmed );

            this.setState( { editingHourInputValue: inputValue } );

            if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 23 )
            {
                const value = $m( this.state.timestamp ).set( 'hour', digits ).valueOf();

                this.setState( {
                    editingTimestamp      : value,
                    editingMainInputValue : tryFormatMainInput( value, precision( this.props.mode ) ),
                } );
            }
            else
            {
                const digits = _.isNumber( this.state.timestamp ) &&
                    $m( this.state.timestamp ).hour();

                if ( !_.isNaN( digits ) )
                {
                    const value = $m( this.state.timestamp ).set( 'hour', digits ).valueOf();

                    this.setState( {
                        editingTimestamp      : value,
                        editingMainInputValue : tryFormatMainInput( value, precision( this.props.mode ) ),
                    } );
                }
            }
        }
        else if ( sender === 'minute' )
        {
            const digits = Number( trimmed );
            this.setState( { editingMinuteInputValue: inputValue } );

            if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 59 )
            {
                const value = $m( this.state.timestamp ).set( 'minute', digits ).valueOf();

                this.setState( {
                    editingTimestamp      : value,
                    editingMainInputValue : tryFormatMainInput( value, precision( this.props.mode ) ),
                } );
            }
            else
            {
                const digits = _.isNumber( this.state.timestamp ) &&
                    $m( this.state.timestamp ).minute();

                if ( !_.isNaN( digits ) )
                {
                    const value = $m( this.state.timestamp ).set( 'minute', digits ).valueOf();

                    this.setState( {
                        editingTimestamp      : value,
                        editingMainInputValue : tryFormatMainInput( value, precision( this.props.mode ) ),
                    } );
                }
            }
        }
    }

    open()
    {
        this.inputRef.focus();

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

    handleOnBlur( e )
    {
        const callback = this.props.onBlur;

        if ( callback )
        {
            callback( e );
        }

        if ( !e.relatedTarget )// needs to be fixed
        {
            this.purgeEdits();
            this.setState( { gridStartTimestamp: null } );
        }
    }

    render()
    {
        const {
            className,
            forceHover,
            hasError,
            hourIsDisabled,
            hourPlaceholder,
            id,
            inputPlaceholder,
            isDisabled,
            isReadOnly,
            isReadOnlyButton,
            isReadOnlyInput,
            minuteIsDisabled,
            minutePlaceholder,
            mode,
            nextIsReadOnly,
            onFocus,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOutIcon,
            onMouseOver,
            onMouseOverIcon,
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
                hourIsReadOnly    = { !this.canEditHourOrMinute() }
                hourInputRef      = { this.setHourRef }
                hourPlaceholder   = { hourPlaceholder }
                hourValue         = { editingHourInputValue ||
                    tryFormatHourInput( timestamp ) }
                id                = { id }
                inputPlaceholder  = { inputPlaceholder }
                inputRef          = { this.setInputRef }
                inputValue        = { editingMainInputValue ||
                    tryFormatMainInput( timestamp, precision( mode ) ) }
                isDisabled        = { isDisabled }
                isOpen            = { isOpen }
                isReadOnly        = { isReadOnly }
                isReadOnlyButton  = { isReadOnlyButton }
                isReadOnlyInput   = { isReadOnlyInput }
                minuteIsDisabled  = { minuteIsDisabled }
                minuteIsReadOnly  = { !this.canEditHourOrMinute() }
                minuteInputRef    = { this.setMinuteRef }
                minutePlaceholder = { minutePlaceholder }
                minuteValue       = { editingMinuteInputValue ||
                    tryFormatMinuteInput( timestamp ) }
                mode              = { mode }
                months            = { this.monthMatrix() }
                nextIsDisabled    = { !this.canGotoNext() }
                nextIsReadOnly    = { nextIsReadOnly }
                onBlur            = { this.handleOnBlur }
                onChange          = { ( ev, sender ) => this.handleChange( ev.target.value, sender ) }
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
                prevIsDisabled    = { !this.canGotoPrev() }
                prevIsReadOnly    = { prevIsReadOnly }
                textAlign         = { textAlign }
                weeks             = { this.dayMatrix() } />
        );
    }
}
