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
    hasCustomLayout,
    onClick,
    onMouseOut,
    onMouseOver,
    gutters,
    role,
    rows,
    spacing,
    verticalAlign,
} ) =>
{
    const layout = {
        'gridTemplateColumns' : `repeat( ${columns}, 1fr )`,
        'gridTemplateRows'    : `repeat( ${rows}, 1fr )`,
    };

    const customLayout = {
        'gridTemplateColumns' : `${customColumns}`,
        'gridTemplateRows'    : `${customRows}`,
    };

    return (
        <div
            className = { buildClassName( className, cssMap, {
                alignX : align,
                alignY : verticalAlign,
                col    : columns,
                row    : rows,
                gutters,
                spacing,
            } ) }
            style        = { hasCustomLayout ? customLayout : layout }
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
    align           : PropTypes.oneOf( [ 'auto', 'left', 'center', 'right' ] ),
    /**
     *  Grid content (Columns)
     */
    children        : PropTypes.node,
    /**
     *  CSS class name
     */
    className       : PropTypes.string,
    /**
     *  Number of columns
     */
    columns         : PropTypes.number,
    /**
     *  Custom sizes of columns
     */
    customColumns   : PropTypes.string,
    /**
     *  has customLayout
     */
    hasCustomLayout : PropTypes.bool,
    /**
     *  Custom sizes of rows
     */
    customRows      : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap          : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Gutter size
     */
    gutters         : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     *  onClick callback function:
     *  ( e ) => { ... }
     */
    onClick         : PropTypes.func,
    /**
     *  onMouseOut callback function:
     *  ( e ) => { ... }
     */
    onMouseOut      : PropTypes.func,
    /**
     *  onMouseOver callback function:
     *  ( e ) => { ... }
     */
    onMouseOver     : PropTypes.func,
    /**
     *  Grid role
     */
    role            : PropTypes.string,
    /**
     *  Number of rows
     */
    rows            : PropTypes.number,
    /**
     *  Row spacing
     */
    spacing         : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     * Vertical alignment of the columns (“auto” makes all columns equal
     * height)
     */
    verticalAlign   : PropTypes.oneOf( [ 'auto', 'top', 'middle', 'bottom' ] ),
};

Grid.defaultProps =
{
    align           : 'auto',
    children        : undefined,
    className       : undefined,
    columns         : 4,
    customColumns   : undefined,
    customRows      : undefined,
    cssMap          : styles,
    gutters         : 'M',
    hasCustomLayout : false,
    onClick         : undefined,
    onMouseOut      : undefined,
    onMouseOver     : undefined,
    role            : undefined,
    rows            : 1,
    spacing         : 'M',
    verticalAlign   : 'auto',
};

Grid.didWarn = {};

export default Grid;
