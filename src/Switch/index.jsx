import React                          from 'react';
import PropTypes                      from 'prop-types';

import { buildClassName, generateId } from '../utils';
import styles                         from './switch.css';

const Switch = ( {
    className,
    cssMap,
    forceHover,
    id = generateId( 'Switch' ),
    isChecked,
    isDisabled,
    isReadOnly,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    onMouseOut,
    onMouseOver,
    value,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            disabled    : isDisabled,
            fakeHovered : !isDisabled && forceHover,
        } ) }
        onMouseEnter = { onMouseOver }
        onMouseLeave = { onMouseOut }>
        <input
            checked        = { isChecked }
            className      = { cssMap.input }
            disabled       = { isDisabled || isReadOnly }
            id             = { id }
            name           = { name }
            onBlur         = { onBlur }
            onChange       = { !isReadOnly && onChange }
            onFocus        = { onFocus }
            type           = "checkbox"
            value          = { value } />
        <label
            aria-label = { label }
            className  = { cssMap.label }
            htmlFor    = { id } />
    </div>
);

Switch.propTypes =
{
    /**
     * extra CSS classname
     */
    className   : PropTypes.string,
    /**
     * CSS classname map
     */
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    /**
     * Display as hover when required from another component
     */
    forceHover  : PropTypes.bool,
    /**
     * HTML id attribute (overrides default)
     */
    id          : PropTypes.string,
    /**
     *  Display as checked/“on”
     */
    isChecked   : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled  : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly  : PropTypes.bool,
    /**
     *  switch label (used as aria-label)
     */
    label       : PropTypes.string,
    /**
     *  input name
     */
    name        : PropTypes.string,
    /**
     * onBlur callback function: ( e ) => { ... }
     */
    onBlur      : PropTypes.func,
    /**
     * onChange callback function: ( e ) => { ... }
     */
    onChange    : PropTypes.func,
    /**
     *  onFocus callback function: ( e ) => { ... }
     */
    onFocus     : PropTypes.func,
    /**
     *  onMouseOut callback function: ( e ) => { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) => { ... }
     */
    onMouseOver : PropTypes.func,
    /**
     * HTML value attribute
     */
    value       : PropTypes.string,
};

Switch.defaultProps =
{
    className  : undefined,
    cssMap     : styles,
    forceHover : false,
    id         : undefined,
    isChecked  : false,
    isDisabled : false,
    isReadOnly : false,
    label      : undefined,
    onChange   : undefined,
    value      : undefined,
};

export default Switch;
