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
    cssMap,
    gridCol,
    gridRow,
    justify,
    onMouseOut,
    onMouseOver,
} ) =>
{
    const position = {
        'gridColumn' : `${gridCol}`,
        'gridRow'    : `${gridRow}`,
    };

    return (
        <div
            className = { buildClassName( className, cssMap, {
                align,
                justify,
            } ) }
            style        = { position }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
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
     *  CSS class map
     */
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    /**
     * Column position of the GridItem: <start-line> / <end-line>
     */
    gridCol     : PropTypes.string,
    /**
     * Row position of the GridItem: <start-line> / <end-line>
     */
    gridRow     : PropTypes.string,
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
};

GridItem.defaultProps =
{
    align       : 'start',
    children    : undefined,
    className   : undefined,
    cssMap      : styles,
    justify     : 'start',
    gridCol     : undefined,
    gridRow     : undefined,
    onMouseOut  : undefined,
    onMouseOver : undefined,
};

export default GridItem;
