import React                                from 'react';
import PropTypes                            from 'prop-types';

import { DatePicker }                       from '../index';
import TextInputWithIcon                    from '../TextInputWithIcon';
import withDropdown                         from '../Dropdown/withDropdown';
import { eventHandler }                     from '../utils';


const InputWithDropdown = withDropdown( TextInputWithIcon );

const DateTimeInput = ( {
    currentMonth,
    currentYear,
    days,
    forceHover,
    hasError,
    hourIsDisabled,
    hourInputRef,
    hourPlaceholder,
    hourValue,
    inputPlaceholder,
    inputRef,
    isDisabled,
    isOpen,
    isReadOnly,
    minuteIsDisabled,
    minuteInputRef,
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
    onKeyPress,
    onMouseOut,
    onMouseOver,
    prevIsDisabled,
    inputValue,
    weeks,
} ) =>
{
    const datePicker = (
        <DatePicker
            key            = "datePicker"
            headers        = { mode !== 'month' ? days : undefined }
            isDisabled     = { isDisabled }
            isReadOnly     = { isReadOnly }
            items          = { mode === 'month' ? months : weeks }
            month          = { currentMonth }
            year           = { currentYear }
            onClickNext    = { onClickNext }
            onClickPrev    = { onClickPrev }
            nextIsDisabled = { nextIsDisabled }
            prevIsDisabled = { prevIsDisabled }
            onClickItem    = { onClickCell }
            type           = { mode === 'month' ? 'month' : 'day' }
            hourIsDisabled    = { hourIsDisabled }
            hourInputRef      = { hourInputRef }
            hourPlaceholder   = { hourPlaceholder }
            hourValue         = { hourValue }
            minuteIsDisabled  = { minuteIsDisabled }
            minuteInputRef    = { minuteInputRef }
            minutePlaceholder = { minutePlaceholder }
            minuteValue       = { minuteValue }
            mode              = { mode }
            onBlur            = { onBlur }
            onChange          = { onChange }
            onFocus           = { onFocus }
            onKeyPress        = { onKeyPress } />
    );

    const dropdownProps = {
        children : datePicker,
        hasError,
        padding  : 'none',
        size     : 'content',
    };

    return (
        <InputWithDropdown
            dropdownProps  = { dropdownProps }
            dropdownIsOpen = { isOpen }
            forceHover     = { forceHover || isOpen }
            hasError       = { hasError }
            iconType       = "calendar"
            isDisabled     = { isDisabled }
            isReadOnly     = { isReadOnly }
            inputRef       = { inputRef }
            onBlur         = { eventHandler( onBlur, 'main' ) }
            onChange       = { eventHandler( onChange, 'main' ) }
            onClickIcon    = { onClickIcon }
            onFocus        = { eventHandler( onFocus, 'main' ) }
            onKeyPress     = { eventHandler( onKeyPress, 'main' ) }
            onMouseOut     = { onMouseOut }
            onMouseOver    = { onMouseOver }
            placeholder    = { inputPlaceholder }
            value          = { inputValue } />
    );
};

DateTimeInput.propTypes =
{
    /**
    *  Label text
    */
    label                 : PropTypes.string,
    /**
     *  Label position
     */
    labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
    *  Display as disabled
    */
    isDisabled            : PropTypes.bool,
    /**
    *  Display as read-only
    */
    isReadOnly            : PropTypes.bool,
    /**
     *  Display as disabled
     */
    hasError              : PropTypes.bool,
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
     *  Error Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Main input placeholder text
     */
    inputPlaceholder      : PropTypes.string,
    /**
     *  Hour input placeholder text
     */
    hourPlaceholder       : PropTypes.string,
    /**
     *  Minute input placeholder text
     */
    minutePlaceholder     : PropTypes.string,
    /**
     *  Main input value
     */
    inputValue            : PropTypes.string,
    /**
     *  Hour input value
     */
    hourValue             : PropTypes.string,
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
        'month'
    ] ),
    /**
     *  “Previous” button is disabled
     */
    prevIsDisabled   : PropTypes.bool,
    /**
     *  “Next” button is disabled
     */
    nextIsDisabled   : PropTypes.bool,
    /**
     *  Hour input is disabled
     */
    hourIsDisabled   : PropTypes.bool,
    /**
     *  Minute input is disabled
     */
    minuteIsDisabled : PropTypes.bool,
    /**
     *  Picker is open
     */
    isOpen           : PropTypes.bool,
    /**
     *  Days of week to display
     */
    days             : PropTypes.arrayOf( PropTypes.object ),
    /**
     *  Weeks to display in default/day mode
     */
    weeks            : PropTypes.arrayOf(
        PropTypes.arrayOf( PropTypes.object )
    ),
    /**
     *  Months to display in month mode
     */
    months         : PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.object ) ),
    /**
     *  Current month to disaplay in default/day mode
     */
    currentMonth   : PropTypes.string,
    /**
     *  Current year to display
     */
    currentYear    : PropTypes.string,
    /**
     *  Display as hovered
     */
    forceHover     : PropTypes.bool,
    /**
     *  onChange callback function
     */
    onChange       : PropTypes.func,
    /**
     *  onKeyPress callback function
     */
    onKeyPress     : PropTypes.func,
    /**
     *  onFocus callback function
     */
    onFocus        : PropTypes.func,
    /**
     *  onBlur callback function
     */
    onBlur         : PropTypes.func,
    /**
     *  onMouseOver callback function
     */
    onMouseOver    : PropTypes.func,
    /**
     *  onMouseOut callback function
     */
    onMouseOut     : PropTypes.func,
    /**
     *  onClick callback function for “Next” button
     */
    onClickPrev    : PropTypes.func,
    /**
     *  onClick callback function for “Previous” button
     */
    onClickNext    : PropTypes.func,
    /**
     *  onClick callback function for calendar icon
     */
    onClickIcon    : PropTypes.func,
    /**
     *  onClick callback function for calendar date cell
     */
    onClickCell    : PropTypes.func,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef       : PropTypes.func,
    /**
     *  Hour input ref callback function:
     *  ( ref ) = { ... }
     */
    hourInputRef   : PropTypes.func,
    /**
     *  Minute input ref callback function:
     *  ( ref ) = { ... }
     */
    minuteInputRef : PropTypes.func,
};

DateTimeInput.defaultProps =
{
    currentMonth      : undefined,
    currentYear       : undefined,
    days              : undefined,
    forceHover        : false,
    hasError          : false,
    hourIsDisabled    : false,
    hourInputRef      : undefined,
    hourPlaceholder   : undefined,
    hourValue         : undefined,
    inputPlaceholder  : undefined,
    isDisabled        : false,
    isOpen            : false,
    isReadOnly        : false,
    inputRef          : undefined,
    minuteIsDisabled  : false,
    minuteInputRef    : undefined,
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
    onKeyPress        : undefined,
    onMouseOut        : undefined,
    onMouseOver       : undefined,
    prevIsDisabled    : false,
    inputValue        : undefined,
    weeks             : undefined,
};


export default DateTimeInput;
