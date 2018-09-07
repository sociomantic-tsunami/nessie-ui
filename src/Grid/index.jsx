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
    autoFlow,
    children,
    className,
    columns,
    customColumns,
    customRows,
    cssMap,
    columnGap,
    role,
    rows,
    rowGap,
    verticalAlign,
} ) =>
{
    const layout = {
        'gridTemplateColumns' : customColumns !== undefined ?
            `${customColumns}` : `repeat( ${columns}, 1fr )`,
        'gridTemplateRows' : customRows !== undefined ?
            `${customRows}` : `repeat( ${rows}, 1fr )`,
    };

    return (
        <div
            className = { buildClassName( className, cssMap, {
                alignX : align,
                alignY : verticalAlign,
                flow   : autoFlow,
                columnGap,
                rowGap,
            } ) }
            style = { layout }
            role  = { role && role !== 'none' ? role : null }>
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
     * Controls where to auto place new grid items if their place is undefined
     */
    autoFlow : PropTypes
        .oneOf( [ 'row', 'col', 'row_dense', 'col_dense' ] ),
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
    autoFlow         : 'row',
    children         : undefined,
    className        : undefined,
    columnGap        : 'M',
    columns          : undefined,
    cssMap           : styles,
    customColumns    : undefined,
    customRows       : undefined,
    hasCustomColumns : false,
    hasCustomRows    : false,
    role             : undefined,
    rowGap           : 'M',
    rows             : undefined,
    verticalAlign    : 'top',
};

export default Grid;
