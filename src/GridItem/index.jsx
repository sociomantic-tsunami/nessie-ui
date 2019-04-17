/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */
import React, { cloneElement, isValidElement } from 'react';
import PropTypes                               from 'prop-types';

const componentName = 'GridItem';


const GridItem = ( {
    align,
    children,
    colSpan,
    justify,
    rowSpan,
    style,
    ...rest
} ) =>
{
    if ( !children ) return null;

    const newProps = {
        style : {
            alignSelf   : align,
            justifySelf : justify,
            ...colSpan && { gridColumn: `span ${colSpan}` },
            ...rowSpan && { gridRow: `span ${rowSpan}` },
            ...style,
        },
        ...rest,
    };

    if ( typeof children === 'function' )
    {
        return children( newProps );
    }
    if ( isValidElement( children ) )
    {
        return cloneElement( children, newProps );
    }

    return <div { ...newProps }>{children}</div>;
};

GridItem.propTypes =
{
    /**
     * Block-axis (usually vertical) alignment of the item
     */
    align    : PropTypes.oneOf( [ 'start', 'center', 'end', 'stretch' ] ),
    /**
     *  Grid item content: react node or render function
     */
    children : PropTypes.oneOfType( PropTypes.element, PropTypes.func ),
    /**
     *  Grid column span: should be an integer > 0
     */
    colSpan  : PropTypes.number,
    /**
     * Inline-axis (usually horizontal) alignment of the item
     */
    justify  : PropTypes.oneOf( [ 'start', 'center', 'end', 'stretch' ] ),
    /**
     * Grid row span: should be an integer > 0
     */
    rowSpan  : PropTypes.number,
    /**
     *  Style overrides
     */
    style    : PropTypes.objectOf( PropTypes.string ),
};

GridItem.defaultProps =
{
    align    : undefined,
    children : undefined,
    colSpan  : undefined,
    justify  : undefined,
    rowSpan  : undefined,
    style    : undefined,
};

GridItem.displayName = componentName;

export default GridItem;
