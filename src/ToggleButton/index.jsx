import React               from 'react';
import PropTypes           from 'prop-types';

import { buildClassName }  from '../utils';
import styles              from './toggleButton.css';
import Icon                from '../Icon/';

const ToggleButton = ( {
    className,
    cssMap,
    children,
    iconPosition,
    iconType,
    iconSize,
    id,
    isDisabled,
    isReadOnly,
    isPressed,
    label,
    onBlur,
    onClick,
    onFocus,
    onMouseOut,
    onMouseOver,
    role

} ) =>
    (
        <button
            className = { buildClassName( className, cssMap, {
                isDisabled,
                isPressed,
                iconPosition,
                role,
            } ) }
            disabled = { isDisabled }
            readOnly = { isReadOnly }
            onBlur = { onBlur }
            onClick = { onClick }
            onFocus = { onFocus }
            onMouseOut = { onMouseOut }
            onMouseOver = { onMouseOver }
        >
            { iconType && iconType !== 'none' &&
            <Icon
                className =  { cssMap.icon }
                type = { iconType }
                size = { iconSize }
            />
            }
            <div>{ label }</div>

        </button>
    );

ToggleButton.propTypes =
{
    /**
     *  CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Children 1 description
     */
    children  : PropTypes.string,
    /**
     *  IconPosition 2 description
     */

    id           : PropTypes.string,
    isDisabled   : PropTypes.bool,
    isReadOnly   : PropTypes.bool,
    isPressed    : PropTypes.bool,
    label        : PropTypes.string,
    onBlur       : PropTypes.func,
    onClick      : PropTypes.func,
    onFocus      : PropTypes.func,
    onMouseOut   : PropTypes.func,
    onMouseOver  : PropTypes.func,
    role         : PropTypes.oneOf( [ 'primary', 'secondary' ] ),
    iconPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
    iconSize     : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'XXL' ] ),
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
    ] )
};

ToggleButton.defaultProps =
{
    className    : undefined,
    cssMap       : styles,
    children     : undefined,
    iconType     : 'add',
    iconPosition : 'right',
    iconSize     : 'M',
    id           : undefined,
    isDisabled   : false,
    isReadOnly   : false,
    isPressed    : false,
    label        : 'Toggle',
    onBlur       : undefined,
    onClick      : undefined,
    onFocus      : undefined,
    onMouseOut   : undefined,
    onMouseOver  : undefined,
    role         : 'primary'
};

export default ToggleButton;
