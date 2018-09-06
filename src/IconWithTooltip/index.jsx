/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import Icon               from '../Icon';
import Tooltip            from '../Tooltip';
import Text               from '../Text';

const IconWithTooltip = ( {
    children,
    className,
    cssMap,
    iconIsVisible,
    iconPosition,
    iconRole,
    iconSize,
    iconType,
    isDisabled,
    message,
    noWrap,
    onMouseOut,
    onMouseOutIcon,
    onMouseOver,
    onMouseOverIcon,
    overflowIsHidden,
    tooltipIsVisible,
    tooltipPosition,
} ) =>
{
    let contentNode = children;

    if ( typeof children === 'string' )
    {
        contentNode = (
            <Text
                overflowIsHidden = { overflowIsHidden }
                noWrap           = { noWrap }>
                { children }
            </Text>
        );
    }

    return (
        <div
            className = { buildClassName( className, cssMap, {
                iconVisible : iconIsVisible,
                position    : !!children && iconPosition,
            } ) }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
            { children &&
                <div className = { cssMap.content }>
                    { contentNode }
                </div>
            }
            { iconIsVisible &&
                <Tooltip
                    className   = { cssMap.iconWithTooltip }
                    isVisible   = { tooltipIsVisible }
                    message     = { message }
                    onMouseOut  = { onMouseOutIcon }
                    onMouseOver = { onMouseOverIcon }
                    position    = { tooltipPosition }>
                    <Icon
                        className  = { cssMap.icon }
                        iconRole   = { iconRole }
                        isDisabled = { isDisabled }
                        role       = { iconRole }
                        size       = { iconSize }
                        type       = { iconType } />
                </Tooltip>
            }
        </div>
    );
};

IconWithTooltip.propTypes =
{
    /**
     *  Node that the Tooltip wraps
     */
    children      : PropTypes.node,
    /**
     * Icon visibility
     */
    iconIsVisible : PropTypes.bool,
    /**
     *  Icon position relative to wrapped component
     */
    iconPosition  : PropTypes.oneOf( [
        'right',
        'left',
        'topRight',
        'topLeft',
    ] ),
    /**
     *  Icon role
     */
    iconRole : PropTypes.oneOf( [
        'default',
        'critical',
        'promoted',
        'warning',
    ] ),
    /**
     *  Icon size
     */
    iconSize : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'XXL' ] ),
    /**
     *  Icon to show
     */
    iconType : PropTypes.oneOf( [
        'info',
        'alert',
        'error',
        'approved',
        'declined',
        'pending',
        'ended',
        'validation' ] ),
    /**
     * is disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  Tooltip message text (string or JSX)
     */
    message          : PropTypes.node,
    /**
     *  Display the tooltip
     */
    tooltipIsVisible : PropTypes.bool,
    /**
     *  Tooltip position relative to the icon
     */
    tooltipPosition  : PropTypes.oneOf( [
        'left',
        'right',
        'top',
        'bottom',
        'topLeft',
        'topRight',
    ] ),
    /**
     *  onMouseOut callback function: ( e ) = { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     *  onMouseOut callback function for icon: ( e ) = { ... }
     */
    onMouseOutIcon   : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) = { ... }
     */
    onMouseOver      : PropTypes.func,
    /**
     *  onMouseOver callback function for icon: ( e ) = { ... }
     */
    onMouseOverIcon  : PropTypes.func,
    /**
     *  Hides wrapped content overflow
     */
    overflowIsHidden : PropTypes.bool,
    /**
     *  Text won´t wrap to the next line.
     */
    noWrap           : PropTypes.bool,
};

IconWithTooltip.defaultProps =
{
    cssMap           : require( './iconWithTooltip.css' ),
    iconIsVisible    : true,
    iconPosition     : 'right',
    iconSize         : 'M',
    iconType         : 'info',
    isDisabled       : false,
    noWrap           : false,
    overflowIsHidden : false,
    tooltipIsVisible : false,
    tooltipPosition  : 'top',
};

export default IconWithTooltip;
