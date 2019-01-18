/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global addEventListener, removeEventListener */

import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import moment                       from 'moment';
import _                            from 'lodash';

import { generateId }               from '../utils';
import copy                         from './copy.json';

import { DatePicker }               from '..';

import TextInputWithIcon            from '../TextInputWithIcon';
import withDropdown                 from '../Addons/withDropdown';


const DISPLAY_FORMATTING = {
    month  : 'YYYY/MM',
    day    : 'YYYY/MM/DD',
    hour   : 'YYYY/MM/DD HH:00',
    minute : 'YYYY/MM/DD HH:mm',
};

const PARSE_FORMATTING = [
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

const DAY_LABELS = _.range( 0, 7 ).map( day => ( {
    label : copy.dayHeaders[ day ]
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
 *
 * @return {Number} timestamp
 */
function tryParseInputValue( inputValue, timestamp )
{
    if ( !inputValue ) return null;

    const parser = PARSE_FORMATTING.find( ( { predicate, requirePrecision } ) =>
        predicate.test( inputValue ) &&
            PRECISIONS.includes( requirePrecision ) );

    if ( !parser
        || _.isNaN( moment.utc( inputValue, parser.format ).valueOf() ) )
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

const InputWithDropdown = withDropdown( TextInputWithIcon );

export default class DateTimeInput extends Component
{
    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className         : PropTypes.string,
        /**
         *  Display as error/invalid
         */
        hasError          : PropTypes.bool,
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
         *  Display as read-only
         */
        isReadOnly        : PropTypes.bool,
        /**
         *  Maximum timestamp selectable
         */
        maxDateSelectable : PropTypes.number,
        /**
         *  Minimum timestamp selectable
         */
        minDateSelectable : PropTypes.number,
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

    static defaultProps =
    {
        className         : undefined,
        hasError          : false,
        hourPlaceholder   : undefined,
        id                : undefined,
        inputPlaceholder  : undefined,
        isDisabled        : false,
        isReadOnly        : false,
        maxDateSelectable : undefined,
        minDateSelectable : undefined,
        minutePlaceholder : undefined,
        mode              : 'default',
        onChange          : undefined,
        value             : undefined,
    };

    static displayName = 'DateTimeInput';

    wrapperRef = React.createRef();

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

        this.handleChangeDatePicker = this.handleChangeDatePicker.bind( this );
        this.handleChangeInput      = this.handleChangeInput.bind( this );
        this.handleClickCell        = this.handleClickCell.bind( this );
        this.handleClickIcon        = this.handleClickIcon.bind( this );
        this.handleClickNext        = this.handleClickNext.bind( this );
        this.handleClickOutSide     = this.handleClickOutSide.bind( this );
        this.handleClickPrev        = this.handleClickPrev.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        return {
            id        : props.id || state.id || generateId( 'Select' ),
            isOpen    : Boolean( state.gridStartTimestamp ),
            timestamp : props.value || displayTimestamp(
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


    handleClickNext()
    {
        if ( !this.canGotoNext() ) return;

        this.setState( {
            gridStartTimestamp : $m( this.state.gridStartTimestamp )
                .add( 1, this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
        } );
    }

    handleClickPrev()
    {
        if ( !this.canGotoPrev() ) return;

        this.setState( {
            gridStartTimestamp : $m( this.state.gridStartTimestamp )
                .add( -1, this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
        } );
    }

    handleClickOutSide( e )
    {
        if ( !this.wrapperRef.current.contains( e.target ) )
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
            ( nextGridStart <= maxDateSelectable );
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

        return !_.isNumber( minDateSelectable )
            || endOfPrev > minDateSelectable;
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

        const days = _.range( -offset, daysInMonth ).map( dayIndex => {
            const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
            const label = hasDate ? String( dayIndex + 1 ) : '';
            const value = hasDate ?
                $m( startMonth ).add( dayIndex, 'day' ).valueOf() : null;

            const isDisabled = hasDate && !this.isUnitSelectable(
                value,
                'day',
                this.props.mode === 'default',
            );

            const isCurrent = hasDate
                && isTimestampEqual( value, now(), 'day' );
            const isSelected = hasDate && _.isNumber( timestamp )
                && isTimestampEqual( timestamp, value, 'day' );
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

        const months = _.range( 0, 12 ).map( month => {
            const label = copy.shortMonths[ month ];
            const value = $m( startYear ).add( month, 'month' ).valueOf();

            const isDisabled = !this.isUnitSelectable( value, 'month' );

            const isCurrent = isTimestampEqual( value, now(), 'month' );
            const isSelected = _.isNumber( timestamp )
                && isTimestampEqual( timestamp, value, 'month' );
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

    handleClickCell( { value } )
    {
        const { isReadOnly } = this.props;

        if ( !isReadOnly )
        {
            this.setState( { timestamp: value } );

            const { onChange } = this.props;
            if ( typeof onChange === 'function' )
            {
                onChange( { value } );
            }
        }

        this.purgeEdits();
    }

    purgeEdits()
    {
        this.setState( {
            editingHourInputValue   : undefined,
            editingMainInputValue   : undefined,
            editingMinuteInputValue : undefined,
            editingTimestamp        : undefined,
        } );
    }

    handleClickIcon()
    {
        if ( this.state.isOpen )
        {
            this.close();
        }
        else
        {
            this.open();
        }
    }

    handleChangeInput( event )
    {
        const trimmed = event.target.value.trim().replace( /\s+/g, ' ' );
        const min = this.props.minDateSelectable || now();

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
            editingHourInputValue   : formatHours( value ),
            editingMinuteInputValue : formatMinutes( value ),
            editingMainInputValue   : event.target.value,
        } );
    }

    handleChangeDatePicker( event, sender )
    {
        const trimmed = event.target.value.trim().replace( /\s+/g, ' ' );

        if ( sender === 'hour' )
        {
            let digits = Number( trimmed );

            this.setState( { editingHourInputValue: event.target.value } );

            if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 23 )
            {
                const value = $m( this.state.timestamp ).set( 'hour', digits )
                    .valueOf();

                this.setState( {
                    editingTimestamp      : value,
                    editingMainInputValue : formatDateTime(
                        value,
                        setPrecision( this.props.mode ),
                    ),
                } );
            }
            else
            {
                digits = _.isNumber( this.state.timestamp )
                    && $m( this.state.timestamp ).hour();

                if ( !_.isNaN( digits ) )
                {
                    const value = $m( this.state.timestamp )
                        .set( 'hour', digits ).valueOf();

                    this.setState( {
                        editingTimestamp      : value,
                        editingMainInputValue : formatDateTime(
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
                    editingMainInputValue : formatDateTime(
                        value,
                        setPrecision( this.props.mode ),
                    ),
                } );
            }
            else
            {
                digits = _.isNumber( this.state.timestamp )
                    && $m( this.state.timestamp ).minute();

                if ( !_.isNaN( digits ) )
                {
                    const value = $m( this.state.timestamp )
                        .set( 'minute', digits ).valueOf();

                    this.setState( {
                        editingTimestamp      : value,
                        editingMainInputValue : formatDateTime(
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

        timestamp = _.isNumber( minDateSelectable )
            && minDateSelectable > timestamp ? minDateSelectable : timestamp;

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
            hasError,
            hourPlaceholder,
            id = generateId( 'DateTimeInput' ),
            inputPlaceholder,
            isDisabled,
            minutePlaceholder,
            mode,
        } = this.props;

        const {
            editingHourInputValue,
            editingMainInputValue,
            editingMinuteInputValue,
            isOpen,
            timestamp,
        } = this.state;

        const datePicker = (
            <DatePicker
                hasTimeInput    = { mode === 'default' }
                headers         = { mode !== 'month' && DAY_LABELS }
                hourIsReadOnly  = { !this.canEditHourOrMinute() }
                hourPlaceholder = { hourPlaceholder }
                hourValue       = { editingHourInputValue ||
                    formatHours( timestamp )
                }
                isDisabled = { isDisabled }
                items      = { mode === 'month' ?
                    this.monthMatrix() : this.dayMatrix()
                }
                minuteIsReadOnly  = { !this.canEditHourOrMinute() }
                minutePlaceholder = { minutePlaceholder }
                minuteValue       =  { editingMinuteInputValue ||
                    formatMinutes( timestamp )
                }
                mode           = { mode }
                month          = { mode !== 'month' && this.monthLabel() }
                nextIsDisabled = { !this.canGotoNext() }
                onChange       = { this.handleChangeDatePicker }
                onClickItem    = { this.handleClickCell }
                onClickNext    = { this.handleClickNext }
                onClickPrev    = { this.handleClickPrev }
                prevIsDisabled = { !this.canGotoPrev() }
                type           = { mode === 'month' ? 'month' : 'day' }
                year           = { this.yearLabel() } />
        );

        const dropdownProps = {
            children : datePicker,
            hasError,
            padding  : 'none',
            size     : 'content',
        };

        return (
            <InputWithDropdown
                autoCapitalize  = "off"
                autoComplete    = "off"
                autoCorrect     = "off"
                className       = { className }
                dropdownIsOpen  = { isOpen }
                dropdownProps   = { dropdownProps }
                forceHover      = { isOpen }
                hasError        = { hasError }
                iconType        = "calendar"
                id              = { id }
                isDisabled      = { isDisabled }
                onChange        = { this.handleChangeInput }
                onClickIcon     = { this.handleClickIcon }
                placeholder     = { inputPlaceholder }
                spellCheck      = { false }
                value           = { typeof editingMainInputValue === 'undefined'
                    ? formatDateTime( timestamp, setPrecision( mode ) ) :
                    editingMainInputValue }
                wrapperRef = { this.wrapperRef } />
        );
    }
}
