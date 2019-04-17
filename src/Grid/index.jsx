/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                                           from 'react';
import PropTypes                                       from 'prop-types';

import { attachEvents, useThemeClasses, useThemeVars } from '../utils';


const componentName = 'Grid';

const Grid = props =>
{
    const {
        alignContent,
        alignItems,
        autoColumns,
        autoFlow,
        autoRows,
        children,
        className,
        columns,
        gap,
        justifyContent,
        justifyItems,
        rows,
        style,
    } = props;

    const cssMap = useThemeClasses( componentName, props );
    const { spacing } = useThemeVars();

    return (
        <div
            { ...attachEvents( props ) }
            className = { `${cssMap.main} ${className}` }
            style     = { {
                alignContent,
                alignItems,
                gridAutoColumns : autoColumns,
                gridAutoFlow    : autoFlow,
                gridAutoRows    : autoRows,
                gridGap         : Array.isArray( gap ) ?
                    `${spacing[ gap[ 0 ] ]} ${spacing[ gap[ 1 ] ]}` :
                    spacing[ gap ],
                gridTemplateColumns : Array.isArray( columns ) ?
                    columns.join( ' ' ) : `repeat( ${columns}, 1fr )`,
                gridTemplateRows : Array.isArray( rows ) ?
                    rows.join( ' ' ) : `repeat( ${rows}, 1fr )`,
                justifyContent,
                justifyItems,
                ...style,
            } }>
            { children }
        </div>
    );
};

Grid.propTypes =
{
    /**
     * Block-axis (usually vertical) alignment of the grid content
     */
    alignContent : PropTypes.oneOf( [ 'start', 'center', 'end', 'stretch' ] ),
    /**
     * Block-axis (usually vertical) alignment of the grid items
     */
    alignItems   : PropTypes.oneOf( [ 'start', 'center', 'end', 'stretch' ] ),

    /**
     * Defines the size of implicit grid columns
     */
    autoColumns : PropTypes.string,
    /**
     * Controls placement of items outside the explicit grid
     */
    autoFlow    : PropTypes.oneOf( [ 'row', 'column' ] ),
    /**
     * Defines the size of implicit grid rows
     */
    autoRows    : PropTypes.string,
    /**
     *  Grid content
     */
    children    : PropTypes.node,
    /**
     *  CSS class name
     */
    className   : PropTypes.string,
    /**
     *  Number of columns (integer > 0) or array of column sizes (CSS length
     *  strings)
     */
    columns     : PropTypes.oneOfType(
        PropTypes.number,
        PropTypes.arrayOf( PropTypes.string ),
    ),
    /**
     *  CSS class map
     */
    cssMap : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Gap between rows and/or columns
     */
    gap    : PropTypes.oneOfType(
        PropTypes.oneOf( [ 'none', 's', 'm', 'l' ] ),
        PropTypes.arrayOf( [ PropTypes.oneOf( [ 'none', 's', 'm', 'l' ] ) ] ),
    ),
    /**
     * Inline-axis (usually horizontal) alignment of the grid content
     */
    justifyContent : PropTypes.oneOf( [ 'start', 'center', 'end', 'stretch' ] ),
    /**
     * Inline-axis (usually horizontal) alignment of the grid items
     */
    justifyItems   : PropTypes.oneOf( [ 'start', 'center', 'end', 'stretch' ] ),

    /**
     *  Number of rows (integer > 0) or array of column sizes (CSS length
     *  strings)
     */
    rows : PropTypes.oneOfType(
        PropTypes.number,
        PropTypes.arrayOf( PropTypes.string ),
    ),
    /**
     *  Style overrides
     */
    style : PropTypes.objectOf( PropTypes.string ),
};

Grid.defaultProps =
{
    alignContent   : undefined,
    alignItems     : undefined,
    autoColumns    : undefined,
    autoFlow       : undefined,
    autoRows       : undefined,
    children       : undefined,
    className      : undefined,
    columns        : undefined,
    cssMap         : undefined,
    gap            : 'm',
    justifyContent : undefined,
    justifyItems   : undefined,
    rows           : undefined,
    style          : undefined,
};

Grid.displayName = componentName;

export default Grid;
