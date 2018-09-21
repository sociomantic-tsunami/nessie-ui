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
    justify,
} ) =>
    (
        <div
            className = { buildClassName( className, cssMap, {
                align,
                justify,
            } ) }>
            { children }
        </div>
    );


GridItem.propTypes =
{
    /**
     * Vertical alignment of the GridItem content
     */
    align     : PropTypes.oneOf( [ 'top', 'middle', 'bottom', 'stretch' ] ),
    /**
     *  GridItem content
     */
    children  : PropTypes.node,
    /**
     *  CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     * Horizontal alignment of the GridItem content
     */
    justify   : PropTypes.oneOf( [ 'left', 'center', 'right', 'stretch' ] ),
};

GridItem.defaultProps =
{
    align     : 'top',
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    justify   : 'left',
};

export default GridItem;
