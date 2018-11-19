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
import Text               from '../Text';
import Tooltip            from '../Tooltip';

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
    noWarn,
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
    if ( !noWarn && !IconWithTooltip.didWarn )
    {
        console.warn( 'IconWithTooltip: this component is deprecated and will \
be removed in a future major release. Please compose from the Icon and Tooltip \
components instead.' );
        IconWithTooltip.didWarn = true;
    }

    let contentNode = children;

    if ( typeof children === 'string' )
    {
        contentNode = (
            <Text noWrap = { noWrap } overflowIsHidden = { overflowIsHidden }>
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
                    noWarn
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
        'left',
        'topLeft',
        'right',
        'topRight',
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
        'account',
        'add-circle',
        'add',
        'alert',
        'approved',
        'arrow',
        'arrow-up',
        'arrow-down',
        'bell',
        'board',
        'calendar',
        'close-circle',
        'close-thick',
        'close',
        'dash',
        'dashboard',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit-circle',
        'edit',
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
        'loader',
        'megaphone',
        'options',
        'paused',
        'pending',
        'preview',
        'puzzle-piece',
        'reset',
        'right',
        'search',
        'show',
        'star-stroke',
        'star',
        'sociomantic',
        'swap',
        'table',
        'up',
        'upload',
        'validation',
    ] ),
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
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom',
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

IconWithTooltip.displayName = 'IconWithTooltip';

export default IconWithTooltip;
