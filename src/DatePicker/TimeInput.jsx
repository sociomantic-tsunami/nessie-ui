import React                                        from 'react';
import PropTypes                                    from 'prop-types';

import { buildClassName, eventHandler, generateId } from '../utils';
import styles                                       from './timeInput.css';

const TimeInput = ( {
    className,
    cssMap,
    forceHover,
    hourPlaceholder,
    hourIsDisabled,
    hourIsReadOnly,
    hourValue,
    id = generateId( 'TimeInput' ),
    isDisabled,
    isReadOnly,
    onChange,
    onBlur,
    onFocus,
    onKeyPress,
    minuteIsDisabled,
    minuteIsReadOnly,
    minutePlaceholder,
    minuteValue,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            fakeHovered : forceHover,
        } ) }>
        <input
            id          = { `${id}-input-hour` }
            type        = "text"
            placeholder = { hourPlaceholder }
            value       = { hourValue }
            className   = { cssMap.hour }
            disabled    = { isDisabled || hourIsDisabled }
            readOnly    = { isReadOnly || hourIsReadOnly }
            onFocus     = { eventHandler( onFocus, 'hour' ) }
            onBlur      = { eventHandler( onBlur, 'hour' ) }
            onChange    = { eventHandler( onChange, 'hour' ) }
            onKeyPress  = { eventHandler( onKeyPress, 'hour' ) } />
        <span>:</span>
        <input
            id          = { `${id}-input-minute` }
            type        = "text"
            placeholder = { minutePlaceholder }
            value       = { minuteValue }
            className   = { cssMap.min }
            disabled    = { isDisabled || minuteIsDisabled }
            readOnly    = { isReadOnly || minuteIsReadOnly }
            onFocus     = { eventHandler( onFocus, 'minute' ) }
            onBlur      = { eventHandler( onBlur, 'minute' ) }
            onChange    = { eventHandler( onChange, 'minute' ) }
            onKeyPress  = { eventHandler( onKeyPress, 'minute' ) } />
    </div>
);

TimeInput.propTypes = {
    className         : PropTypes.string,
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    forceHover        : PropTypes.bool,
    hourPlaceholder   : PropTypes.string,
    hourIsDisabled    : PropTypes.bool,
    hourIsReadOnly    : PropTypes.bool,
    hourValue         : PropTypes.string,
    id                : PropTypes.string,
    isDisabled        : PropTypes.bool,
    isReadOnly        : PropTypes.bool,
    onChange          : PropTypes.func,
    onBlur            : PropTypes.func,
    onFocus           : PropTypes.func,
    onKeyPress        : PropTypes.func,
    minuteIsDisabled  : PropTypes.bool,
    minuteIsReadOnly  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,

};

TimeInput.defaultProps = {
    className         : undefined,
    cssMap            : styles,
    forceHover        : false,
    hourPlaceholder   : 'HH',
    hourIsDisabled    : false,
    hourIsReadOnly    : false,
    hourValue         : undefined,
    id                : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    onChange          : undefined,
    onBlur            : undefined,
    onFocus           : undefined,
    onKeyPress        : undefined,
    minuteIsDisabled  : false,
    minuteIsReadOnly  : false,
    minutePlaceholder : 'MM',
    minuteValue       : undefined,
};

export default TimeInput;
