/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './gridItem.css';

const GridItem = ( {
    align,
    children,
    className,
    columnEnd,
    columnStart,
    cssMap,
    justify,
    onMouseOut,
    onMouseOver,
    role,
    rowEnd,
    rowStart,
} ) =>
{
    const position = {
        'gridColumnStart' : `${columnStart}`,
        'gridColumnEnd'   : `${columnEnd}`,
        'gridRowStart'    : `${rowStart}`,
        'gridRowEnd'      : `${rowEnd}`,
    };

    return (
        <div
            className = { buildClassName( className, cssMap, {
                align,
                justify,
            } ) }
            style        = { position }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }
            role         = { role && role !== 'none' ? role : null }>
            { children }
        </div>
    );
};


GridItem.propTypes =
{
    /**
     * Vertical alignment of the GridItem content
     */
    align       : PropTypes.oneOf( [ 'start', 'end', 'center', 'stretch' ] ),
    /**
     *  GridItem content
     */
    children    : PropTypes.node,
    /**
     *  CSS class name
     */
    className   : PropTypes.string,
    /**
     *  Last column or span of GridItem
     */
    columnEnd   : PropTypes.string,
    /**
     *  First column of GridItem
     */
    columnStart : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    /**
     * Horizontal alignment of the GridItem content
     */
    justify     : PropTypes.oneOf( [ 'start', 'end', 'center', 'stretch' ] ),
    /**
     *  onMouseOut callback function:
     *  ( e ) => { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  onMouseOver callback function:
     *  ( e ) => { ... }
     */
    onMouseOver : PropTypes.func,
    /**
     *  GridItem role
     */
    role        : PropTypes.string,
    /**
     *  Last row or span of GridItem
     */
    rowEnd      : PropTypes.string,
    /**
     *  First row of GridItem
     */
    rowStart    : PropTypes.string,
};

GridItem.defaultProps =
{
    align       : 'start',
    children    : undefined,
    className   : undefined,
    columnEnd   : undefined,
    columnStart : undefined,
    cssMap      : styles,
    justify     : 'start',
    onMouseOut  : undefined,
    onMouseOver : undefined,
    role        : undefined,
    rowEnd      : undefined,
    rowStart    : undefined,
};

export default GridItem;
