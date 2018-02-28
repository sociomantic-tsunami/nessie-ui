import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const Grid = ( {
    align,
    verticalAlign,
    children,
    className,
    cssMap,
    gutters,
    hasMinHeight,
    hasWrap,
    role,
    spacing
} ) =>

    <Css
        cssMap   = { cssMap }
        cssProps = { {
            alignX  : align,
            alignY  : verticalAlign,
            hasMinHeight,
            gutters : gutters !== 'none' && gutters,
            hasWrap,
            spacing : spacing !== 'none' && spacing

        } }>
        <div
            className = { className }
            role      = { role }>
            { children }
        </div>
    </Css>;

Grid.propTypes =
{
    /**
     * Horizontal alignment of the columns (“auto” makes all columns equal
     * width)
     */
    align : PropTypes.oneOf( [
        'auto',
        'left',
        'center',
        'right'
    ] ),
    /**
    *  Set minimum height equal to average row.
    */
    hasMinHeight  : PropTypes.bool,
    /**
     * Wrap content
     */
    hasWrap       : PropTypes.bool,
    /**
     * Vertical alignment of the columns (“auto” makes all columns equal
     * height)
     */
    verticalAlign : PropTypes.oneOf( [
        'auto',
        'top',
        'middle',
        'bottom'
    ] ),
    /**
     *  Gutter size
     */
    gutters : PropTypes.oneOf( [
        'none',
        'S',
        'M',
        'L'
    ] ),
    /**
     *  Row spacing
     */
    spacing : PropTypes.oneOf( [
        'none',
        'default',
        'h1',
        'h2',
        'h3',
        'h4',
        'label'
    ] ),
    /**
     *  Grid role
     */
    role     : PropTypes.string,
    /**
     *  Grid content (Columns)
     */
    children : PropTypes.node
};

Grid.defaultProps =
{
    align         : 'auto',
    hasWrap       : true,
    hasMinHeight  : false,
    verticalAlign : 'auto',
    spacing       : 'default',
    gutters       : 'L',
    cssMap        : require( './grid.css' )
};

export default Grid;
