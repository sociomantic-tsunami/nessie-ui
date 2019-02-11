/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import moment                       from 'moment';
import _                            from 'lodash';

import { generateId }               from '../utils';
import copy                         from './copy.json';

import { DatePicker }               from '..';

import TextInputWithIcon            from '../TextInputWithIcon';
import Popup                        from '../Popup';
import PopperWrapper                from '../PopperWrapper';


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
 * @param {String}  format custom format (overrides default format)
 *
 * @return {Number} timestamp
 */
function tryParseInputValue( inputValue, timestamp, format )
{
    if ( !inputValue ) return null;

    let newTimestamp;

    if ( format )
    {
        newTimestamp = moment.utc( inputValue, format ).valueOf();
    }
    else
    {
        const parser =
            PARSE_FORMATTING.find( ( { predicate, requirePrecision } ) =>
                predicate.test( inputValue ) &&
                PRECISIONS.includes( requirePrecision ) );

        newTimestamp =
            moment.utc( inputValue, format || parser.format ).valueOf();
    }

    return _.isNaN( newTimestamp ) ? timestamp : newTimestamp;
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

export default class DateTimeInput extends Component
{
    static propTypes =
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

    static defaultProps =
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

        this.handleChangeHour   = this.handleChangeHour.bind( this );
        this.handleChangeInput  = this.handleChangeInput.bind( this );
        this.handleChangeMinute = this.handleChangeMinute.bind( this );
        this.handleClickCell    = this.handleClickCell.bind( this );
        this.handleClickIcon    = this.handleClickIcon.bind( this );
        this.handleClickNext    = this.handleClickNext.bind( this );
        this.handleClickOutSide = this.handleClickOutSide.bind( this );
        this.handleClickPrev    = this.handleClickPrev.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        let timestamp;

        if ( props.value )
        {
            timestamp = props.value;
        }
        else if ( props.value === null )
        {
            timestamp = undefined;
        }
        else
        {
            timestamp = state.editingTimestamp || state.timestamp;
        }

        return {
            id     : props.id || state.id || generateId( 'DateTimeInput' ),
            isOpen : Boolean( state.gridStartTimestamp ),
            timestamp,
        };
    }

    handleClickNext()
    {
        if ( !this.canGotoNext() ) return;

        this.setState( prevState => ( {
            gridStartTimestamp : $m( prevState.gridStartTimestamp )
                .add( 1, this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
        } ) );
    }

    handleClickPrev()
    {
        if ( !this.canGotoPrev() ) return;

        this.setState( prevState => ( {
            gridStartTimestamp : $m( prevState.gridStartTimestamp )
                .add( -1, this.props.mode === 'month' ? 'year' : 'month' )
                .valueOf(),
        } ) );
    }

    handleClickOutSide()
    {
        this.close();
    }

    canGotoNext()
    {
        const { max } = this.props;
        const nextGridStart = $m( this.state.gridStartTimestamp )
            .add( 1, this.props.mode === 'month' ? 'year' : 'month' ).valueOf();

        return !_.isNumber( max ) ||
            ( nextGridStart <= max );
    }

    canGotoPrev()
    {
        const min = this.props.min || now();
        const prevGridStart = $m( this.state.gridStartTimestamp )
            .add( -1, this.props.mode === 'month' ? 'year' : 'month' )
            .valueOf();
        const endOfPrev = $m( prevGridStart )
            .add( 1, this.props.mode === 'month' ? 'year' : 'month' )
            .valueOf();

        return !_.isNumber( min ) ||
            endOfPrev > min;
    }

    canEditHourOrMinute()
    {
        return _.isNumber( this.state.timestamp );
    }

    isUnitSelectable( timestamp, unit, allowFraction )
    {
        const { max } = this.props;
        const min = this.props.min || now();

        if ( timestamp > max ) return false;

        if ( !allowFraction ) return timestamp >= min;

        return $m( timestamp ).add( 1, unit ) > min;
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
                $m( startMonth ).add( dayIndex, 'day' ).valueOf() : null;

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

    handleClickCell( { value } )
    {
        const { isReadOnly } = this.props;

        if ( !isReadOnly )
        {
            this.setState( { timestamp: value } );
            const { onChange } = this.props;
            const { id } = this.state;
            if ( typeof onChange === 'function' )
            {
                onChange( { id, value } );
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

    handleChangeInput( { value } )
    {
        const trimmed = value.replace( /\s+/g, ' ' );
        const min = this.props.min || now();

        this.setState( prevState =>
        {
            let timestamp = tryParseInputValue(
                trimmed,
                prevState.timestamp,
                this.props.format,
            );

            if ( timestamp < min )
            {
                timestamp = min;
            }

            if ( this.props.max &&
                timestamp > this.props.max )
            {
                timestamp = this.props.max;
            }

            return {
                editingHourInputValue : !value ? undefined :
                    formatHours( value ),
                editingMainInputValue   : !value ? undefined : value,
                editingMinuteInputValue : !value ? undefined :
                    formatMinutes( value ),
                editingTimestamp : !value ? undefined : timestamp,
                timestamp        : !value ? undefined : timestamp,
            };
        } );
    }

    handleChangeHour( { value } )
    {
        const trimmed = value.trim().replace( /\s+/g, ' ' );

        let digits = Number( trimmed );

        this.setState( { editingHourInputValue: value } );

        if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 23 )
        {
            this.setState( prevState =>
            {
                const timestamp = $m( prevState.timestamp )
                    .set( 'hour', digits ).valueOf();

                return {
                    editingTimestamp      : timestamp,
                    editingMainInputValue : formatDateTime(
                        timestamp,
                        this.props.format || setPrecision( this.props.mode ),
                    ),
                };
            } );
        }
        else
        {
            digits = _.isNumber( this.state.timestamp ) &&
                $m( this.state.timestamp ).hour();

            if ( !_.isNaN( digits ) )
            {
                this.setState( prevState =>
                {
                    const timestamp = $m( prevState.timestamp )
                        .set( 'hour', digits ).valueOf();

                    return {
                        editingTimestamp      : timestamp,
                        editingMainInputValue : formatDateTime(
                            timestamp,
                            this.props.format ||
                                setPrecision( this.props.mode ),
                        ),
                    };
                } );
            }
        }
    }

    handleChangeMinute( { value } )
    {
        const trimmed = value.trim().replace( /\s+/g, ' ' );
        let digits = Number( trimmed );
        this.setState( { editingMinuteInputValue: value } );

        if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 59 )
        {
            this.setState( prevState =>
            {
                const timestamp = $m( prevState.timestamp )
                    .set( 'minute', digits ).valueOf();

                return {
                    editingTimestamp      : timestamp,
                    editingMainInputValue : formatDateTime(
                        timestamp,
                        this.props.format || setPrecision( this.props.mode ),
                    ),
                };
            } );
        }
        else
        {
            digits = _.isNumber( this.state.timestamp ) &&
                $m( this.state.timestamp ).minute();

            if ( !_.isNaN( digits ) )
            {
                this.setState( prevState =>
                {
                    const timestamp = $m( prevState.timestamp )
                        .set( 'minute', digits ).valueOf();

                    return {
                        editingTimestamp      : timestamp,
                        editingMainInputValue : formatDateTime(
                            timestamp,
                            this.props.format ||
                                setPrecision( this.props.mode ),
                        ),
                    };
                } );
            }
        }
    }

    open()
    {
        const { min } = this.props;
        let { timestamp } = this.state;

        timestamp = _.isNumber( timestamp ) ? timestamp : now();

        timestamp = ( _.isNumber( min ) &&
            min > timestamp ) ? min : timestamp;

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
            container,
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
                onChangeHour   = { this.handleChangeHour }
                onChangeMinute = { this.handleChangeMinute }
                onClickItem    = { this.handleClickCell }
                onClickNext    = { this.handleClickNext }
                onClickPrev    = { this.handleClickPrev }
                prevIsDisabled = { !this.canGotoPrev() }
                type           = { mode === 'month' ? 'month' : 'day' }
                year           = { this.yearLabel() } />
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
                onChangeInput   = { this.handleChangeInput }
                onClickIcon     = { this.handleClickIcon }
                placeholder     = { inputPlaceholder }
                spellCheck      = { false }
                value           = {
                    typeof editingMainInputValue === 'undefined' ?
                        formatDateTime( timestamp, this.props.format ||
                            setPrecision( this.props.mode ) ) :
                        editingMainInputValue
                }
                wrapperRef = { this.wrapperRef } />
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
                onClickOutside = { this.handleClickOutSide }
                popper         = { popperPopup }
                popperOffset   = "S"
                popperPosition = "bottom-start">
                { popperChildren }
            </PopperWrapper>
        );
    }
}
