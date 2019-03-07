/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { useId, useTheme }  from '../utils';


const componentName = 'Switch';

const Switch = props =>
{
    const {
        isChecked,
        isDefaultChecked,
        isDisabled,
        label,
        onBlur,
        onChange,
        onFocus,
        onMouseOut,
        onMouseOver,
    } = props;

    const cssMap = useTheme( componentName, props );
    const id = useId( componentName, props );

    return (
        <div
            className    = { cssMap.main }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
            <input
                checked        = { isChecked }
                className      = { cssMap.input }
                disabled       = { isDisabled }
                id             = { id }
                defaultChecked = { isDefaultChecked }
                onBlur         = { onBlur }
                onChange       = { onChange }
                onFocus        = { onFocus }
                type           = "checkbox" />
            <label
                aria-label = { label }
                className  = { cssMap.label }
                htmlFor    = { id } />
        </div>
    );
};

Switch.propTypes =
{
    /**
     * Extra CSS classname
     */
    className        : PropTypes.string,
    /**
     * CSS classname map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     * Display as hover when required from another component
     */
    forceHover       : PropTypes.bool,
    /**
     * HTML id attribute
     */
    id               : PropTypes.string,
    /**
     *  Display as checked/“on”
     */
    isChecked        : PropTypes.bool,
    /**
     *  Display as checked by default (uncontrolled input)
     */
    isDefaultChecked : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  switch label (used as aria-label)
     */
    label            : PropTypes.string,
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
     *  onMouseOut callback function: ( e ) => { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) => { ... }
     */
    onMouseOver      : PropTypes.func,
};

Switch.defaultProps =
{
    className        : undefined,
    cssMap           : undefined,
    forceHover       : false,
    id               : undefined,
    isChecked        : undefined,
    isDefaultChecked : undefined,
    isDisabled       : false,
    label            : undefined,
    onBlur           : undefined,
    onChange         : undefined,
    onFocus          : undefined,
    onMouseOut       : undefined,
    onMouseOver      : undefined,
};

Switch.displayName = componentName;

export default Switch;
