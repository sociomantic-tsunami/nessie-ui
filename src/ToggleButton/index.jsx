/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                           from 'react';
import PropTypes                       from 'prop-types';

import { buildClassName, generateId }  from '../utils';
import styles                          from './toggleButton.css';
import { Icon }                        from '../index';


const ToggleButton = ( {
    children,
    className,
    cssMap,
    iconPosition,
    iconType,
    id = generateId( 'ToggleButton' ),
    isDisabled,
    isPressed,
    isReadOnly,
    label,
    onBlur,
    onClick,
    onFocus,
    onMouseOut,
    onMouseOver,
    role,
    subLabel,
} ) => (
    <button
        aria-pressed = { isPressed ? 'true' : 'false' }
        className    = { buildClassName( className, cssMap, {
            disabled : isDisabled,
            pressed  : isPressed,
            iconPosition,
            role,
        } ) }
        disabled     = { isDisabled }
        readOnly     = { isReadOnly }
        id           = { id }
        onBlur       = { onBlur }
        onClick      = { onClick }
        onFocus      = { onFocus }
        onMouseLeave = { onMouseOut }
        onMouseEnter = { onMouseOver }
        role         = { role }
        type         = "button" >
        <div className = { cssMap.flexContainer }>
            { iconType !== 'none' &&
                <Icon
                    className = { cssMap.icon }
                    type      = { iconType }
                    size      =  "S" />
            }
            <div className = { cssMap.labelContainer }>
                <div className = { cssMap.title }>
                    { children || label }
                </div>
                <div className = { cssMap.subLabel }>
                    { subLabel }
                </div>
            </div>
        </div>

    </button>
);

ToggleButton.propTypes =
{
    /**
     *  CSS class name
     */
    className    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  label content (JSX node; overrides label prop)
     */
    children     : PropTypes.node,
    /**
     *  icon position relative to text
     */
    iconPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  icon type to display
     */
    iconType     : PropTypes.oneOf( [
        'account',
        'add',
        'add-circle',
        'alert',
        'approved',
        'arrow',
        'bell',
        'board',
        'calendar',
        'close',
        'close-circle',
        'close-thick',
        'dash',
        'dashboard',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'edit-circle',
        'ended',
        'error',
        'file',
        'graph',
        'hide',
        'info',
        'inspect',
        'left',
        'lightbulb',
        'link',
        'megaphone',
        'options',
        'pending',
        'preview',
        'puzzle-piece',
        'reset',
        'right',
        'search',
        'show',
        'star',
        'star-stroke',
        'swap',
        'table',
        'up',
        'upload',
        'validation',
        'none',
    ] ),
    /**
     * HTML id attribute
     */
    id          : PropTypes.string,
    /**
    *  display as disabled
    */
    isDisabled  : PropTypes.bool,
    /**
     *  display as read-only
     */
    isReadOnly  : PropTypes.bool,
    /**
     *  display with pressed state
     */
    isPressed   : PropTypes.bool,
    /**
     *  label text
     */
    label       : PropTypes.string,
    /**
     *  blur callback function: ( e ) => { ... }
     */
    onBlur      : PropTypes.func,
    /**
     *  click callback function: ( e ) => { ... }
     */
    onClick     : PropTypes.func,
    /**
     *  focus callback function: ( e ) => { ... }
     */
    onFocus     : PropTypes.func,
    /**
     *  mouse out callback function: ( e ) => { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  mouse over callback function: ( e ) => { ... }
     */
    onMouseOver : PropTypes.func,
    /**
    *  ToggleButton role (style)
    */
    role        : PropTypes.oneOf( [ 'primary', 'secondary' ] ),
    /**
     *  sub-label text
     */
    subLabel    : PropTypes.string,
};

ToggleButton.defaultProps =
{
    children     : undefined,
    className    : undefined,
    cssMap       : styles,
    iconPosition : 'left',
    iconType     : 'none',
    id           : undefined,
    isDisabled   : false,
    isPressed    : false,
    isReadOnly   : false,
    label        : undefined,
    onBlur       : undefined,
    onClick      : undefined,
    onFocus      : undefined,
    onMouseOut   : undefined,
    onMouseOver  : undefined,
    role         : 'primary',
};

export default ToggleButton;
