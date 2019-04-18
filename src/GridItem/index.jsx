/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef }             from 'react';
import PropTypes                         from 'prop-types';

import { attachEvents, useThemeClasses } from '../utils';


const componentName = 'GridItem';

const GridItem = forwardRef( ( props, ref ) =>
{
    const {
        children,
        colSpan,
        rowSpan,
        style,
    } = props;

    const cssMap = useThemeClasses( componentName, props );

    return (
        <div
            { ...attachEvents( props ) }
            className = { cssMap.main }
            ref       = { ref }
            style     = { {
                gridColumn : `span ${colSpan}`,
                gridRow    : `span ${rowSpan}`,
                ...style,
            } }>
            { children }
        </div>
    );
} );

GridItem.propTypes =
{
    /**
     * Vertical alignment of the GridItem content
     */
    align : PropTypes.oneOf( [
        'start',
        'center',
        'end',
        'stretch',
    ] ),
    /**
     *  GridItem content
     */
    children  : PropTypes.node,
    /**
     *  CSS class name
     */
    className : PropTypes.string,
    /**
     *  GridItem column span - should be an integer > 0
     */
    colSpan   : PropTypes.number,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     * Horizontal alignment of the GridItem content
     */
    justify   : PropTypes.oneOf( [ 'start', 'center', 'end', 'stretch' ] ),
    /**
     * GridItem row span - should be an integer > 0
     */
    rowSpan   : PropTypes.number,
    /**
     *  Style overrides
     */
    style     : PropTypes.objectOf( PropTypes.string ),
};

GridItem.defaultProps =
{
    align     : 'start',
    children  : undefined,
    className : undefined,
    colSpan   : undefined,
    cssMap    : undefined,
    justify   : 'start',
    rowSpan   : undefined,
    style     : undefined,
};

GridItem.displayName = componentName;

export default GridItem;
