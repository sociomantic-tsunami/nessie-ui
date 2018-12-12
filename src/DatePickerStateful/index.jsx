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
    month  : 'YYYY/M',
    day    : 'YYYY/MM/DD',
    hour   : 'YYYY/MM/DD HH:00',
    minute : 'YYYY/MM/DD HH:mm',
};


/**
 * returns the timestamp of the current moment
 *
 * @return {Number} timestamp
 */
function now()
{
    return Math.floor( new Date().getTime() / 1000 / 60 ) * 60;
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
    return moment.unix( timestamp ).utc();
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
 * gets the index of the option by the passed id
 *
 *
 * @return {Number} index of the option
 */
function tryFormatMainInput( timestamp, precision )
{
    if ( !_.isNumber( timestamp ) ) return String( timestamp || '' );
    return $m( timestamp ).format( precision );
}

/**
 * gets the index of the option by the passed id
 *
 *
 * @return {Number} index of the option
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
            gridStartTimestamp : undefined,
            id         : undefined,
            inputValue : undefined,
            isOpen     : undefined,
            value      : undefined,
        };

        this.handleClickIcon = this.handleClickIcon.bind( this );
        this.handleClickCell = this.handleClickCell.bind( this );
        this.handleOnBlur    = this.handleOnBlur.bind( this );
        this.setInputRef     = this.setInputRef.bind( this );
    }

    static getDerivedStateFromProps( props, state )
    {
        return {
            id         : props.id || state.id || generateId( 'Select' ),
            inputValue : tryFormatMainInput( state.value, precision( props.mode ) ),
            isOpen     : typeof props.isOpen === 'undefined' ?
                Boolean( state.gridStartTimestamp ) : props.isOpen,
            value : now(),
        };
    }

    setInputRef( ref )
    {
        this.inputRef = ref;
    }

    dayMatrix()
    {
        const startMonth = this.state.gridStartTimestamp;

        if ( !startMonth ) return;

        const { value } = this.state;
        // const field = this.fields.default;

        const offset = ( $m( startMonth ).weekday() + 6 ) % 7;
        const daysInMonth = $m( startMonth ).daysInMonth();

        const days = _.range( -offset, daysInMonth ).map( dayIndex =>
        {
            const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
            const label = hasDate ? String( dayIndex + 1 ) : '';
            const dayValue = hasDate ?
                $m( startMonth ).add( dayIndex, 'day' ).unix().toString() :
                null;

            const isDisabled = false;
            // const isDisabled = hasDate && !isUnitSelectable( field, value, 'day', this.mode === 'default' );

            const isCurrent = hasDate &&
                isTimestampEqual( dayValue, now(), 'day' );
            const isSelected = hasDate && _.isNumber( value ) &&
                isTimestampEqual( value, dayValue, 'day' );
            return {
                label,
                value : dayValue,
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

        const { value } = this.state;

        // const field = this.fields.default;

        const months = _.range( 0, 12 ).map( month =>
        {
            const label = copy.shortMonths[ month ];
            const monthValue = $m( startYear ).add( month, 'month' )
                .unix().toString();

            const isDisabled = false;
            // const isDisabled = !isUnitSelectable( field, value, 'month' );

            const isCurrent = isTimestampEqual( monthValue, now(), 'month' );
            const isSelected = _.isNumber( value ) &&
                isTimestampEqual( value, monthValue, 'month' );
            return {
                label,
                value : monthValue,
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

        // this.setState( { inputValue: moment.unix( value ).utc()  } );

        this.setState( { value: parseInt( value ) } );
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

    open()
    {
        this.inputRef.focus();

        // let timestamp = this.displayTimestamp;

        // let timestamp = this.fields.default.value;
        // const min = this.fields.default.min;

        // timestamp = _.isNumber( timestamp ) ? timestamp : now();

        // timestamp = _.isNumber( min ) && min > timestamp ? min : timestamp;

        this.setState( {
            gridStartTimestamp : $m( this.state.value )
                .startOf( this.props.mode === 'month' ? 'year' : 'month' )
                .unix(),
        } );
    }

    close()
    {
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
            hourIsReadOnly,
            hourInputRef,
            hourPlaceholder,
            hourValue,
            id,
            inputPlaceholder,
            isDisabled,
            isReadOnly,
            isReadOnlyButton,
            isReadOnlyInput,
            minuteIsDisabled,
            minuteIsReadOnly,
            minuteInputRef,
            minutePlaceholder,
            minuteValue,
            mode,
            nextIsDisabled,
            nextIsReadOnly,
            onChange,
            onClickNext,
            onClickPrev,
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
            inputValue,
            isOpen,
        } = this.state;

        return (
            <DateTimeInput
                className         = { className }
                currentMonth      = { this.monthLabel() }
                currentYear       = { this.yearLabel() }
                days              = { this.dayLabels() }
                forceHover        = { forceHover }
                hasError          = { hasError }
                hourIsDisabled    = { hourIsDisabled }
                hourIsReadOnly    = { hourIsReadOnly }
                hourInputRef      = { hourInputRef }
                hourPlaceholder   = { hourPlaceholder }
                hourValue         = { hourValue }
                id                = { id }
                inputPlaceholder  = { inputPlaceholder }
                inputRef          = { this.setInputRef }
                inputValue        = { inputValue }
                isDisabled        = { isDisabled }
                isOpen            = { isOpen }
                isReadOnly        = { isReadOnly }
                isReadOnlyButton  = { isReadOnlyButton }
                isReadOnlyInput   = { isReadOnlyInput }
                minuteIsDisabled  = { minuteIsDisabled }
                minuteIsReadOnly  = { minuteIsReadOnly }
                minuteInputRef    = { minuteInputRef }
                minutePlaceholder = { minutePlaceholder }
                minuteValue       = { minuteValue }
                mode              = { mode }
                months            = { this.monthMatrix() }
                nextIsDisabled    = { nextIsDisabled }
                nextIsReadOnly    = { nextIsReadOnly }
                onBlur            = { this.handleOnBlur }
                onChange          = { onChange }
                onClickCell       = { this.handleClickCell }
                onClickIcon       = { this.handleClickIcon }
                onClickNext       = { onClickNext }
                onClickPrev       = { onClickPrev }
                onFocus           = { onFocus }
                onKeyDown         = { onKeyDown }
                onKeyPress        = { onKeyPress }
                onKeyUp           = { onKeyUp }
                onMouseOut        = { onMouseOut }
                onMouseOutIcon    = { onMouseOutIcon }
                onMouseOver       = { onMouseOver }
                onMouseOverIcon   = { onMouseOverIcon }
                prevIsDisabled    = { prevIsDisabled }
                prevIsReadOnly    = { prevIsReadOnly }
                textAlign         = { textAlign }
                weeks             = { this.dayMatrix() } />
        );
    }
}
