import React                          from 'react';
import PropTypes                      from 'prop-types';

import { buildClassName, generateId } from '../utils';
import styles                         from './timeInput.css';
import { Row, Column, Text }          from '../index';
import InputFrame                     from '../InputField/InputFrame';
import { eventHandler }               from './utils';

const TimeInput = ( {
    className,
    cssMap,
    hourPlaceholder,
    hourIsDisabled,
    hourValue,
    id,
    isActive,
    isDisabled,
    isReadOnly,
    onChange,
    onBlur,
    onFocus,
    onKeyPress,
    minuteIsDisabled,
    minutePlaceholder,
    minuteValue
} ) => (
    <InputFrame
        className = { buildClassName( className, cssMap ) }
        isActive  = { isActive }>
        <Row gutters = "S" verticalAlign = "middle">
            <Column>
                <input
                    className   = { cssMap.input }
                    id          = { `${id}-hour` }
                    type        = "text"
                    placeholder = { hourPlaceholder }
                    value       = { hourValue }
                    disabled    = { isDisabled || hourIsDisabled }
                    readOnly    = { isReadOnly }
                    onFocus     = { eventHandler( onFocus, 'hour' ) }
                    onBlur      = { eventHandler( onBlur, 'hour' ) }
                    onChange    = { eventHandler( onChange, 'hour' ) }
                    onKeyPress  = { eventHandler( onKeyPress, 'hour' ) } />
            </Column>
            <Column size = "content">
                <Text role = "subtle">:</Text>
            </Column>
            <Column>
                <input
                    id          = { `${id}-minute` }
                    type        = "text"
                    placeholder = { minutePlaceholder }
                    value       = { minuteValue }
                    disabled    = { isDisabled || minuteIsDisabled }
                    readOnly    = { isReadOnly }
                    onFocus     = { eventHandler( onFocus, 'minute' ) }
                    onBlur      = { eventHandler( onBlur, 'minute' ) }
                    onChange    = { eventHandler( onChange, 'minute' ) }
                    onKeyPress  = { eventHandler( onKeyPress, 'minute' ) } />
            </Column>
        </Row>
    </InputFrame>
);

TimeInput.propTypes = {
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    hourPlaceholder   : PropTypes.string,
    hourIsDisabled    : PropTypes.bool,
    hourValue         : PropTypes.string,
    id                : PropTypes.string,
    isActive          : PropTypes.bool,
    isDisabled        : PropTypes.bool,
    isReadOnly        : PropTypes.bool,
    onChange          : PropTypes.func,
    onBlur            : PropTypes.func,
    onFocus           : PropTypes.func,
    onKeyPress        : PropTypes.func,
    minuteIsDisabled  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,

};

TimeInput.defaultProps = {
    cssMap            : styles,
    hourPlaceholder   : null,
    hourIsDisabled    : false,
    hourValue         : null,
    id                : generateId( 'TimeInput' ),
    isActive          : false,
    isDisabled        : false,
    isReadOnly        : false,
    onChange          : null,
    onBlur            : null,
    onFocus           : null,
    onKeyPress        : null,
    minuteIsDisabled  : false,
    minutePlaceholder : null,
    minuteValue       : null,
};

export default TimeInput;
