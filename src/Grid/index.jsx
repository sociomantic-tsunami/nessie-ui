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
    autoCols,
    autoFlow,
    autoRows,
    children,
    className,
    columns,
    customColumns,
    customRows,
    cssMap,
    columnGap,
    justify,
    role,
    rows,
    rowGap,
} ) =>
{
    const layout = {
        'gridAutoColumns'     : autoCols !== undefined ? `${autoCols}` : '1fr',
        'gridAutoRows'        : autoRows !== undefined ? `${autoRows}` : '1fr',
        'gridTemplateColumns' : customColumns !== undefined ?
            `${customColumns}` : `repeat( ${columns}, 1fr )`,
        'gridTemplateRows' : customRows !== undefined ?
            `${customRows}` : `repeat( ${rows}, 1fr )`,
    };

    return (
        <div
            className = { buildClassName( className, cssMap, {
                flow : autoFlow,
                justify,
                align,
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
     * Vertical alignment of the grid items
     */
    align    : PropTypes.oneOf( [ 'top', 'middle', 'bottom', 'stretch' ] ),
    /**
     * Defines the size of implicitly set columns
     */
    autoCols : PropTypes.string,
    /**
     * Controls where to auto place new grid items if their place is undefined
     */
    autoFlow : PropTypes
        .oneOf( [ 'row', 'col', 'row_dense', 'col_dense' ] ),
    /**
     * Defines the size of implicitly set rows
     */
    autoRows      : PropTypes.string,
    /**
     *  Grid content (Columns)
     */
    children      : PropTypes.node,
    /**
     *  CSS class name
     */
    className     : PropTypes.string,
    /**
     *  Column gap
     */
    columnGap     : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     *  Number of columns - should be an integer > 0
     */
    columns       : PropTypes.number,
    /**
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Custom sizes of columns
     */
    customColumns : PropTypes.string,
    /**
     *  Custom sizes of rows
     */
    customRows    : PropTypes.string,
    /**
     * Horizontal alignment of the grid items
     */
    justify       : PropTypes.oneOf( [ 'left', 'center', 'right', 'stretch' ] ),
    /**
     *  Grid role
     */
    role          : PropTypes.string,
    /**
     *  Row gap
     */
    rowGap        : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     *  Number of rows - should be an integer > 0
     */
    rows          : PropTypes.number,
};

Grid.defaultProps =
{
    align         : 'top',
    autoCols      : undefined,
    autoFlow      : 'row',
    autoRows      : undefined,
    children      : undefined,
    className     : undefined,
    columnGap     : 'M',
    columns       : undefined,
    cssMap        : styles,
    customColumns : undefined,
    customRows    : undefined,
    justify       : 'left',
    role          : undefined,
    rowGap        : 'M',
    rows          : undefined,
};

export default Grid;
