import React                            from 'react';
import PropTypes                        from 'prop-types';

import { buildClassName, eventHandler } from '../utils';
import styles                           from './datePickerItem.css';
import { Text }                         from '../index';


const DatePickerItem = ( {
    children,
    className,
    cssMap,
    isActive,
    isDisabled,
    isSelected,
    isReadOnly,
    label,
    onClick,
    value,
    type,
} ) => (
    <button
        aria-pressed = { isSelected }
        className    = { buildClassName( className, cssMap, {
            active   : isActive,
            disabled : isDisabled,
            selected : isSelected,
            type     : type,
        } ) }
        disabled     = { isDisabled }
        onClick      = { !isReadOnly && eventHandler( onClick, value ) }
        type         = "button"
        value        = { value }>
        <Text className = { cssMap.text }>{ children || label }</Text>
    </button>
);

DatePickerItem.propTypes = {
    children   : PropTypes.node,
    className  : PropTypes.string,
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    isActive   : PropTypes.bool,
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    isReadOnly : PropTypes.bool,
    label      : PropTypes.string,
    onClick    : PropTypes.func,
    value      : PropTypes.string,
    type       : PropTypes.oneOf( [ 'day', 'month' ] ),
};

DatePickerItem.defaultProps = {
    children   : undefined,
    className  : undefined,
    cssMap     : styles,
    isActive   : false,
    isDisabled : false,
    isSelected : false,
    isReadOnly : false,
    label      : undefined,
    onClick    : undefined,
    value      : undefined,
    type       : 'day',
};

export default DatePickerItem;
