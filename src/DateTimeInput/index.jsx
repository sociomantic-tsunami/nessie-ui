/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { DatePicker }               from '../index';
import TextInputWithIcon            from '../TextInputWithIcon';
import withDropdown                 from '../Addons/withDropdown';
import { eventHandler, generateId } from '../utils';


const InputWithDropdown = withDropdown( TextInputWithIcon );

const DateTimeInput = React.forwardRef( ( {
    className,
    currentMonth,
    currentYear,
    days,
    forceHover,
    hasError,
    hourIsDisabled,
    hourPlaceholder,
    hourValue,
    id = generateId( 'DateTimeInput' ),
    inputPlaceholder,
    inputValue,
    isDisabled,
    isOpen,
    isReadOnly,
    isReadOnlyButton,
    isReadOnlyInput,
    minuteIsDisabled,
    minutePlaceholder,
    minuteValue,
    mode,
    months,
    nextIsDisabled,
    onBlur,
    onChange,
    onClickCell,
    onClickIcon,
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
    textAlign,
    weeks,
    wrapperRef,
}, ref ) =>

{
    const datePicker = (
        <DatePicker
            headers           = { mode !== 'month' ? days : undefined }
            hourIsDisabled    = { hourIsDisabled }
            hourPlaceholder   = { hourPlaceholder }
            hourValue         = { hourValue }
            isDisabled        = { isDisabled }
            isReadOnly        = { isReadOnly }
            items             = { mode === 'month' ? months : weeks }
            key               = "datePicker"
            minuteIsDisabled  = { minuteIsDisabled }
            minutePlaceholder = { minutePlaceholder }
            minuteValue       = { minuteValue }
            mode              = { mode }
            month             = { currentMonth }
            nextIsDisabled    = { nextIsDisabled }
            onBlur            = { onBlur }
            onChange          = { onChange }
            onClickItem       = { onClickCell }
            onClickNext       = { onClickNext }
            onClickPrev       = { onClickPrev }
            onFocus           = { onFocus }
            onKeyPress        = { onKeyPress }
            prevIsDisabled    = { prevIsDisabled }
            type              = { mode === 'month' ? 'month' : 'day' }
            year              = { currentYear } />
    );

    const dropdownProps = {
        children : datePicker,
        hasError,
        padding  : 'none',
        size     : 'content',
    };

    return (
        <InputWithDropdown
            autoCapitalize   = "off"
            autoComplete     = "off"
            autoCorrect      = "off"
            className        = { className }
            dropdownIsOpen   = { isOpen }
            dropdownProps    = { dropdownProps }
            forceHover       = { forceHover || isOpen }
            hasError         = { hasError }
            iconType         = "calendar"
            id               = { id }
            isDisabled       = { isDisabled }
            isReadOnly       = { isReadOnly }
            isReadOnlyButton = { isReadOnlyButton }
            isReadOnlyInput  = { isReadOnlyInput }
            onBlur           = { eventHandler( onBlur, 'main' ) }
            onChange         = { eventHandler( onChange, 'main' ) }
            onClickIcon      = { onClickIcon }
            onFocus          = { eventHandler( onFocus, 'main' ) }
            onKeyDown        = { onKeyDown }
            onKeyPress       = { eventHandler( onKeyPress, 'main' ) }
            onKeyUp          = { onKeyUp }
            onMouseOut       = { onMouseOut }
            onMouseOutIcon   = { onMouseOutIcon }
            onMouseOver      = { onMouseOver }
            onMouseOverIcon  = { onMouseOverIcon }
            placeholder      = { inputPlaceholder }
            ref              = { ref }
            spellCheck       = { false }
            textAlign        = { textAlign }
            value            = { inputValue }
            wrapperRef       = { wrapperRef } />
    );
} );

DateTimeInput.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className         : PropTypes.string,
    /**
     *  Current month to disaplay in default/day mode
     */
    currentMonth      : PropTypes.string,
    /**
     *  Current year to display
     */
    currentYear       : PropTypes.string,
    /**
     *  Days of week to display
     */
    days              : PropTypes.arrayOf( PropTypes.object ),
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
     *  Hour input value
     */
    hourValue         : PropTypes.string,
    /**
     *  HTML id attribute
     */
    id                : PropTypes.string,
    /**
     *  Main input placeholder text
     */
    inputPlaceholder  : PropTypes.string,
    /**
     *  Main input value
     */
    inputValue        : PropTypes.string,
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
     *  Display as read-only for TextInput
     */
    isReadOnlyInput   : PropTypes.bool,
    /**
     *  Hour input is read only
     */
    hourIsReadOnly    : PropTypes.bool,
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
     *  Minute input value
     */
    minuteValue       : PropTypes.string,
    /**
     *  Picker mode
     */
    mode              : PropTypes.oneOf( [ 'default', 'date', 'month' ] ),
    /**
     *  Months to display in month mode
     */
    months            : PropTypes.arrayOf( PropTypes
        .arrayOf( PropTypes.object ) ),
    /**
     *  “Next” button is disabled
     */
    nextIsDisabled  : PropTypes.bool,
    /**
     *  “Next” button is read only
     */
    nextIsReadOnly  : PropTypes.bool,
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
     *  onClick callback function for “Previous” button
     */
    onClickNext     : PropTypes.func,
    /**
     *  onClick callback function for “Next” button
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
     *  “Previous” button is read only
     */
    prevIsReadOnly  : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign       : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Weeks to display in default/day mode
     */
    weeks           : PropTypes.arrayOf( PropTypes
        .arrayOf( PropTypes.object ) ),
    /**
     *  Callback function that receives a ref to the outer wrapper div
     */
    wrapperRef : PropTypes.func,
};

DateTimeInput.defaultProps =
{
    className         : undefined,
    currentMonth      : undefined,
    currentYear       : undefined,
    days              : undefined,
    forceHover        : false,
    hasError          : false,
    hourIsDisabled    : false,
    hourPlaceholder   : undefined,
    hourValue         : undefined,
    id                : undefined,
    inputPlaceholder  : undefined,
    inputValue        : undefined,
    isDisabled        : false,
    isOpen            : false,
    isReadOnly        : false,
    isReadOnlyButton  : undefined,
    isReadOnlyInput   : undefined,
    minuteIsDisabled  : false,
    minutePlaceholder : undefined,
    minuteValue       : undefined,
    mode              : 'default',
    months            : undefined,
    nextIsDisabled    : false,
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
    prevIsDisabled    : false,
    textAlign         : 'auto',
    weeks             : undefined,
};

DateTimeInput.displayName = 'DateTimeInput';

export default DateTimeInput;
