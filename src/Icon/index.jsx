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
import styles             from './icon.css';


const Icon = ( {
    children,
    className,
    cssMap,
    forceHover,
    isDisabled,
    label,
    onMouseOut,
    onMouseOver,
    size,
    theme,
    type,
} ) =>
{
    let xLink;

    if ( type !== 'none' )
    {
        xLink = `#icon__${type}`;
    }

    return (
        <svg
            aria-label   = { children || label }
            className = { buildClassName( className, cssMap, {
                disabled    : isDisabled,
                fakeHovered : !isDisabled && forceHover,
                size,
                theme,
                type,
            } ) }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
            { xLink && <use xlinkHref = { xLink } /> }
        </svg>
    );
};

Icon.propTypes =
{
    /**
     * Icon label (overrides label prop)
     */
    children    : PropTypes.node,
    /**
     *  CSS class name
     */
    className   : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    /**
     * Display as hover when required from another component
     */
    forceHover  : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled  : PropTypes.bool,
    /**
     * Icon label
     */
    label       : PropTypes.string,
    /**
     *  onMouseOut callback function: ( e ) = { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) = { ... }
     */
    onMouseOver : PropTypes.func,
    /**
     *  Icon size
     */
    size        : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL' ] ),
    /**
     *  Icon theme
     */
    theme       : PropTypes.oneOf( [
        'light',
        'dark',
        'control',
        'button',
        'navigation',
    ] ),
    /**
     *  Icon to show
     */
    type : PropTypes.oneOf( [
        'account',
        'add-circle',
        'add',
        'alert',
        'approved',
        'arrow-down',
        'arrow-up',
        'arrow',
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
        'sociomantic',
        'star-stroke',
        'star',
        'swap',
        'table',
        'up',
        'upload',
        'validation',
        'none',
    ] ),
};

Icon.defaultProps =
{
    children    : undefined,
    className   : undefined,
    cssMap      : styles,
    forceHover  : false,
    isDisabled  : false,
    label       : undefined,
    onMouseOut  : undefined,
    onMouseOver : undefined,
    size        : 'S',
    theme       : 'light',
    type        : 'none',
};

export default Icon;
