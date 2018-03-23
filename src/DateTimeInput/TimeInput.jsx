import React                                        from 'react';
import PropTypes                                    from 'prop-types';

import { buildClassName, eventHandler, generateId } from '../utils';
import styles                                       from './timeInput.css';

const TimeInput = ( {
    className,
    cssMap,
    forceHover,
    hourPlaceholder,
    hourInputRef,
    hourIsDisabled,
    hourValue,
    id,
    isDisabled,
    isReadOnly,
    onChange,
    onBlur,
    onFocus,
    onKeyPress,
    minuteIsDisabled,
    minuteInputRef,
    minutePlaceholder,
    minuteValue
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            fakeHovered : forceHover
        } ) }>
        <input
            id          = { `${id}-input-hour` }
            type        = "text"
            placeholder = { hourPlaceholder }
            value       = { hourValue }
            className   = { cssMap.hour }
            disabled    = { isDisabled || hourIsDisabled }
            readOnly    = { isReadOnly }
            onFocus     = { eventHandler( onFocus, 'hour' ) }
            onBlur      = { eventHandler( onBlur, 'hour' ) }
            onChange    = { eventHandler( onChange, 'hour' ) }
            onKeyPress  = { eventHandler( onKeyPress, 'hour' ) }
            ref         = { hourInputRef } />
        <span>:</span>
        <input
            id          = { `${id}-input-minute` }
            type        = "text"
            placeholder = { minutePlaceholder }
            value       = { minuteValue }
            className   = { cssMap.min }
            disabled    = { isDisabled || minuteIsDisabled }
            readOnly    = { isReadOnly }
            onFocus     = { eventHandler( onFocus, 'minute' ) }
            onBlur      = { eventHandler( onBlur, 'minute' ) }
            onChange    = { eventHandler( onChange, 'minute' ) }
            onKeyPress  = { eventHandler( onKeyPress, 'minute' ) }
            ref         = { minuteInputRef } />
    </div>
);

TimeInput.propTypes = {
    className         : PropTypes.string,
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    forceHover        : PropTypes.bool,
    hourPlaceholder   : PropTypes.string,
    hourInputRef      : PropTypes.func,
    hourIsDisabled    : PropTypes.bool,
    hourValue         : PropTypes.string,
    id                : PropTypes.string,
    isDisabled        : PropTypes.bool,
    isReadOnly        : PropTypes.bool,
    onChange          : PropTypes.func,
    onBlur            : PropTypes.func,
    onFocus           : PropTypes.func,
    onKeyPress        : PropTypes.func,
    minuteIsDisabled  : PropTypes.bool,
    minuteInputRef    : PropTypes.func,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,

};

TimeInput.defaultProps = {
    className         : undefined,
    cssMap            : styles,
    forceHover        : false,
    hourPlaceholder   : undefined,
    hourInputRef      : undefined,
    hourIsDisabled    : false,
    hourValue         : undefined,
    id                : generateId( 'TimeInput' ),
    isDisabled        : false,
    isReadOnly        : false,
    onChange          : undefined,
    onBlur            : undefined,
    onFocus           : undefined,
    onKeyPress        : undefined,
    minuteIsDisabled  : false,
    minuteInputRef    : undefined,
    minutePlaceholder : undefined,
    minuteValue       : undefined,
};

export default TimeInput;
