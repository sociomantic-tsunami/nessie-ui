import React                          from 'react';
import PropTypes                      from 'prop-types';

import { buildClassName, generateId } from '../utils';
import styles                         from './switch.css';


const Switch = ( {
    className,
    cssMap,
    forceHover,
    id,
    isDefaultChecked,
    isChecked,
    isDisabled,
    isReadOnly,
    name,
    onChange,
    onLabel,
    offLabel,
    showLabel,
    value,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            disabled    : isDisabled,
            fakeHovered : !isDisabled && forceHover
        } ) }>
        <input
            className      = { cssMap.input }
            defaultChecked = { isDefaultChecked }
            defaultValue   = { value }
            disabled       = { isDisabled || isReadOnly }
            checked        = { isChecked }
            id             = { id }
            name           = { name }
            onChange       = { !isReadOnly && onChange }
            type           = "checkbox" />
        <label
            className = { cssMap.label }
            htmlFor   = { id }>
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
     *  Extra CSS class name
     */
    className        : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     * Display as hover when required from another component
     */
    forceHover       : PropTypes.bool,
    /**
     * HTML id attribute (overrides default)
     */
    id               : PropTypes.string,
    /**
     *  Display as checked/“on” by default (uncontrolled input)
     */
    isDefaultChecked : PropTypes.bool,
    /**
     *  Display as checked/“on” (controlled input)
     */
    isChecked        : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly       : PropTypes.bool,
    /**
     * onChange callback function: ( e ) => { ... }
     */
    onChange         : PropTypes.func,
    /**
     *  “On”/checked label text
     */
    onLabel          : PropTypes.string,
    /**
     *  “Off”/unchecked label text
     */
    offLabel         : PropTypes.string,
    /**
     *  HTML name attribute for input
     */
    name             : PropTypes.string,
    /**
     *  Show “on/off” label text
     */
    showLabel        : PropTypes.bool,
    /**
     * HTML value attribute for input
     */
    value            : PropTypes.string,
};

Switch.defaultProps =
{
    className        : undefined,
    cssMap           : styles,
    forceHover       : false,
    id               : generateId( 'Switch' ),
    isDefaultChecked : false,
    isChecked        : undefined,
    isDisabled       : false,
    isReadOnly       : false,
    onChange         : undefined,
    onLabel          : 'On',
    offLabel         : 'Off',
    showLabel        : true,
    value            : undefined,
};

export default Switch;
