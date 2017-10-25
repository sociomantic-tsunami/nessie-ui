import React                 from 'react';
import PropTypes             from 'prop-types';

import { buildClassName }    from '../utils';
import styles                from './datePickerItem.css';
import { eventHandler }      from './utils';
import { wrapText }          from '../Text/utils';


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
    value
} ) => (
    <button
        aria-pressed = { isSelected }
        className    = { buildClassName( className, cssMap, {
            active   : isActive,
            disabled : isDisabled,
            selected : isSelected,
        } ) }
        disabled     = { isDisabled }
        onClick      = { !isReadOnly && eventHandler( onClick, value ) }
        type         = "button"
        value        = { value }>
        { wrapText( children || label ) }
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
};

export default DatePickerItem;
