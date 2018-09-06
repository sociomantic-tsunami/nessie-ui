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
import styles             from './grid.css';

const Grid = ( {
    align,
    children,
    className,
    columns,
    cssMap,
    onClick,
    onMouseOut,
    onMouseOver,
    gutters,
    hasWrap,
    role,
    rows,
    spacing,
    verticalAlign,
} ) =>
{
    const layout = {
        'grid-template-columns' : `repeat( ${columns}, 1fr )`,
    };

    return (
        <div
            className = { buildClassName( className, cssMap, {
                alignX  : align,
                alignY  : verticalAlign,
                col     : columns,
                gutters : gutters !== 'none' && gutters,
                wrap    : hasWrap,
                row     : rows,
                spacing : spacing !== 'none' && spacing
            } ) }
            style        = { layout }
            onClick      = { onClick }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }
            role         = { role && role !== 'none' ? role : null }>
            { children }
        </div>
    );
};

Grid.propTypes =
{
    /**
     * Horizontal alignment of the columns (“auto” makes all columns equal
     * width)
     */
    align         : PropTypes.oneOf( [ 'auto', 'left', 'center', 'right' ] ),
    /**
     *  Grid content (Columns)
     */
    children      : PropTypes.node,
    /**
     *  CSS class name
     */
    className     : PropTypes.string,
    /**
     *  Number of columns
     */
    columns       : PropTypes.number,
    /**
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Gutter size
     */
    gutters       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     * Wrap content
     */
    hasWrap       : PropTypes.bool,
    /**
     *  onClick callback function:
     *  ( e ) => { ... }
     */
    onClick       : PropTypes.func,
    /**
     *  onMouseOut callback function:
     *  ( e ) => { ... }
     */
    onMouseOut    : PropTypes.func,
    /**
     *  onMouseOver callback function:
     *  ( e ) => { ... }
     */
    onMouseOver   : PropTypes.func,
    /**
     *  Grid role
     */
    role          : PropTypes.string,
    /**
     *  Number of rows
     */
    rows          : PropTypes.number,
    /**
     *  Row spacing
     */
    spacing       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     * Vertical alignment of the columns (“auto” makes all columns equal
     * height)
     */
    verticalAlign : PropTypes.oneOf( [ 'auto', 'top', 'middle', 'bottom' ] ),
};

Grid.defaultProps =
{
    align         : 'auto',
    children      : undefined,
    className     : undefined,
    columns       : 4,
    cssMap        : styles,
    gutters       : 'M',
    hasWrap       : true,
    onClick       : undefined,
    onMouseOut    : undefined,
    onMouseOver   : undefined,
    role          : undefined,
    rows          : 1,
    spacing       : 'M',
    verticalAlign : 'auto',
};

Grid.didWarn = {};

export default Grid;
