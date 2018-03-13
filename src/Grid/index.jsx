import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './grid.css';

const Grid = ( {
    align,
    aria,
    children,
    className,
    cssMap,
    onClick,
    onMouseOut,
    onMouseOver,
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
        onClick      = { onClick }
        onMouseEnter = { onMouseOver }
        onMouseLeave = { onMouseOut }
        role         = { role }>
        { children }
    </div>
);

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
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Gutter size
     */
    gutters       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
    *  Set minimum height equal to average row.
    */
    hasMinHeight  : PropTypes.bool,
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
    cssMap        : styles,
    onClick       : undefined,
    onMouseOut    : undefined,
    onMouseOver   : undefined,
    gutters       : 'L',
    hasMinHeight  : false,
    hasWrap       : true,
    spacing       : 'M',
    verticalAlign : 'auto',
};

export default Grid;
