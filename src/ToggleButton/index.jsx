import React                           from 'react';
import PropTypes                       from 'prop-types';

import { buildClassName, generateId }  from '../utils';
import styles                          from './toggleButton.css';
import Icon                            from '../Icon/';

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
    subTitle
} ) => (
    <button
        aria-pressed = { isPressed ? 'true' : 'false' }
        className    = { buildClassName( className, cssMap, {
            disabled : isDisabled,
            pressed  : isPressed,
            iconPosition,
            role
        } ) }
        disabled     = { isDisabled }
        readOnly     = { isReadOnly }
        id           = { id }
        isPressed    = { isPressed }
        onBlur       = { onBlur }
        onClick      = { onClick }
        onFocus      = { onFocus }
        onMouseLeave = { onMouseOut }
        onMouseEnter = { onMouseOver }
        role         = { role }
        type         = "button" >
        <div className = { cssMap.inner }>
            { iconType && iconType !== 'none' &&
                <Icon
                    className = { cssMap.icon }
                    type      = { iconType }
                    size      =  "S" />
            }
            <div>{ children || label }</div>
        </div>
        { subTitle &&
            <div style = {{ color: '#98a8bc', marginTop: '5px', fontSize: '11px' }}>{ subTitle }</div>
        }
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
     *  ToggleButton content, replaces label in case of value/node
     */
    children     : PropTypes.node,
    /**
     *  Icon position relative to Button text
     */
    iconPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  Icon type to display
     */
    iconType     : PropTypes.oneOf( [
        'add',
        'alert',
        'approved',
        'calendar',
        'close',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'ended',
        'error',
        'info',
        'inspect',
        'left',
        'link',
        'pending',
        'preview',
        'reset',
        'right',
        'search',
        'up',
        'upload',
        'validation',
        'none'
    ] ),
    /**
     * HTML id attribute (overwrite default)
     */
    id          : PropTypes.string,
    /**
    *  Display as disabled
    */
    isDisabled  : PropTypes.bool,
    /**
    *  Display as read-only
    */
    isReadOnly  : PropTypes.bool,
    /**
    *  Display as pressed state
    */
    isPressed   : PropTypes.bool,
    /**
    *  Label text
    */
    label       : PropTypes.string,
    /**
     *  Button blur callback function: ( e ) => { ... }
     */
    onBlur      : PropTypes.func,
    /**
     *  Button click callback function: ( e ) => { ... }
     */
    onClick     : PropTypes.func,
    /**
     *  Button focus callback function: ( e ) => { ... }
     */
    onFocus     : PropTypes.func,
    /**
     *  Mouse out callback function: ( e ) => { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  Mouse over callback function: ( e ) => { ... }
     */
    onMouseOver : PropTypes.func,
    /**
    *  Button role/style
    */
    role        : PropTypes.oneOf( [ 'primary', 'secondary' ] ),
    /**
    *  Button subTitle
    */
    subTitle    : PropTypes.string
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
    role         : 'primary'
};

export default ToggleButton;
