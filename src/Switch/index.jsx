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
    isDefaultChecked,
    isDisabled,
    isReadOnly,
    name,
    offLabel,
    onBlur,
    onChange,
    onFocus,
    onLabel,
    onMouseOut,
    onMouseOver,
    showLabel,
    value,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            disabled    : isDisabled,
            fakeHovered : !isDisabled && forceHover
        } ) }
        onMouseEnter = { onMouseOver }
        onMouseLeave = { onMouseOut }>
        <input
            type           = "checkbox"
            name           = { name }
            id             = { id }
            className      = { cssMap.input }
            defaultChecked = { isDefaultChecked }
            onBlur         = { onBlur }
            onChange       = { !isReadOnly && onChange }
            onFocus        = { onFocus }
            checked        = { isChecked }
            disabled       = { isDisabled || isReadOnly }
            value          = { value } />
        <label
            htmlFor      = { id }
            className    = { cssMap.label }>
            <div className = { cssMap.on }>
                { showLabel && onLabel }
            </div>
            <div className = { cssMap.off }>
                { showLabel && offLabel }
            </div>
        </label>
    </div>
);

Switch.propTypes =
{
    /**
     * Display as hover when required from another component
     */
    forceHover       : PropTypes.bool,
    /**
     * HTML id attribute (overrides default)
     */
    id               : PropTypes.string,
    /**
     *  Display as checked/“on”
     */
    isChecked        : PropTypes.bool,
    /**
     *  Display as checked/“on” by default
     */
    isDefaultChecked : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly       : PropTypes.bool,
    /**
     *  input name
     */
    name             : PropTypes.string,
    /**
     *  “Off”/unchecked label text
     */
    offLabel         : PropTypes.string,
    /**
     * onBlur callback function: ( e ) => { ... }
     */
    onBlur           : PropTypes.func,
    /**
     * onChange callback function: ( e ) => { ... }
     */
    onChange         : PropTypes.func,
    /**
     *  onFocus callback function: ( e ) => { ... }
     */
    onFocus          : PropTypes.func,
    /**
     *  “On”/checked label text
     */
    onLabel          : PropTypes.string,
    /**
     *  onMouseOut callback function: ( e ) => { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) => { ... }
     */
    onMouseOver      : PropTypes.func,
    /**
     *  Show “on/off” label text
     */
    showLabel        : PropTypes.bool,
    /**
     * HTML value attribute
     */
    value            : PropTypes.string
};

Switch.defaultProps =
{
    className        : undefined,
    cssMap           : styles,
    forceHover       : false,
    id               : undefined,
    isChecked        : undefined,
    isDefaultChecked : false,
    isDisabled       : false,
    isReadOnly       : false,
    offLabel         : 'Off',
    onChange         : undefined,
    onLabel          : 'On',
    showLabel        : true,
    value            : undefined,
};

export default Switch;
