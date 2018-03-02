import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './grid.css';

const Grid = ( {
    align,
    children,
    className,
    cssMap,
    gutters,
    hasMinHeight,
    hasWrap,
    role,
    spacing,
    verticalAlign,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            alignX  : align,
            alignY  : verticalAlign,
            hasMinHeight,
            gutters : gutters !== 'none' && gutters,
            hasWrap,
            spacing : spacing !== 'none' && spacing
        } ) }
        role = { role }>
        { children }
    </div>
);

Grid.propTypes =
{
    /**
     * Horizontal alignment of the columns (“auto” makes all columns equal
     * width)
     */
    align        : PropTypes.oneOf( [ 'auto', 'left', 'center', 'right' ] ),
    /**
     *  Grid content (Columns)
     */
    children     : PropTypes.node,
    /**
     *  CSS class name
     */
    className    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Gutter size
     */
    gutters      : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
    *  Set minimum height equal to average row.
    */
    hasMinHeight : PropTypes.bool,
    /**
     * Wrap content
     */
    hasWrap      : PropTypes.bool,
    /**
     *  Grid role
     */
    role         : PropTypes.string,
    /**
     *  Row spacing
     */
    spacing      : PropTypes.oneOf( [
        'none',
        'default',
        'h1',
        'h2',
        'h3',
        'h4',
        'label'
    ] ),
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
    cssMap        : styles,
    gutters       : 'L',
    hasMinHeight  : false,
    hasWrap       : true,
    role          : undefined,
    spacing       : 'default',
    verticalAlign : 'auto',
};

export default Grid;
