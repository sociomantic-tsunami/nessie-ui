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
    customColumns,
    customRows,
    cssMap,
    hasCustomColumns,
    hasCustomRows,
    onClick,
    onMouseOut,
    onMouseOver,
    columnGap,
    role,
    rows,
    rowGap,
    verticalAlign,
} ) =>
{
    const layout = {
        'gridTemplateColumns' : hasCustomColumns ?
            `${customColumns}` : `repeat( ${columns}, 1fr )`,
        'gridTemplateRows' : hasCustomRows ?
            `${customRows}` : `repeat( ${rows}, 1fr )`,
    };

    return (
        <div
            className = { buildClassName( className, cssMap, {
                alignX : align,
                alignY : verticalAlign,
                col    : columns,
                row    : rows,
                columnGap,
                rowGap,
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
     * Horizontal alignment of the grid items
     */
    align : PropTypes
        .oneOf( [ 'left', 'center', 'right', 'stretch' ] ),
    /**
     *  Grid content (Columns)
     */
    children         : PropTypes.node,
    /**
     *  CSS class name
     */
    className        : PropTypes.string,
    /**
     *  Column gap
     */
    columnGap        : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     *  Number of columns
     */
    columns          : PropTypes.number,
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Custom sizes of columns
     */
    customColumns    : PropTypes.string,
    /**
     *  Custom sizes of rows
     */
    customRows       : PropTypes.string,
    /**
     *  If it has custom columns
     */
    hasCustomColumns : PropTypes.bool,
    /**
     *  If it has custom rows
     */
    hasCustomRows    : PropTypes.bool,
    /**
     *  onClick callback function:
     *  ( e ) => { ... }
     */
    onClick          : PropTypes.func,
    /**
     *  onMouseOut callback function:
     *  ( e ) => { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     *  onMouseOver callback function:
     *  ( e ) => { ... }
     */
    onMouseOver      : PropTypes.func,
    /**
     *  Grid role
     */
    role             : PropTypes.string,
    /**
     *  Row gap
     */
    rowGap           : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     *  Number of rows
     */
    rows             : PropTypes.number,
    /**
     * Vertical alignment of the grid items
     */
    verticalAlign    : PropTypes
        .oneOf( [ 'top', 'middle', 'bottom', 'stretch' ] ),
};

Grid.defaultProps =
{
    align            : 'left',
    children         : undefined,
    className        : undefined,
    columnGap        : 'M',
    columns          : 4,
    cssMap           : styles,
    customColumns    : undefined,
    customRows       : undefined,
    hasCustomColumns : false,
    hasCustomRows    : false,
    onClick          : undefined,
    onMouseOut       : undefined,
    onMouseOver      : undefined,
    role             : undefined,
    rowGap           : 'M',
    rows             : 1,
    verticalAlign    : 'top',
};

Grid.didWarn = {};

export default Grid;
