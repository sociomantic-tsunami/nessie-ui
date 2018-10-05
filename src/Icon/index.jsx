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
    label,
    role,
    size,
    type,
} ) => (
    <svg
        aria-label = { children || label }
        className  = { buildClassName( className, cssMap, { role, size } ) }>
        { ( type !== 'none' ) && <use xlinkHref = { `#icon__${type}` } /> }
    </svg>
);


Icon.propTypes =
{
    /**
     * Icon label (overrides label prop)
     */
    children  : PropTypes.string,
    /**
     *  CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     * Icon label
     */
    label     : PropTypes.string,
    /**
     *  Icon role
     */
    role      : PropTypes.oneOf( [
        'default',
        'critical',
        'promoted',
        'warning',
    ] ),
    /**
     *  Icon size
     */
    size : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL' ] ),
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
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    label     : undefined,
    role      : 'default',
    size      : 'S',
    type      : 'none',
};

export default Icon;
