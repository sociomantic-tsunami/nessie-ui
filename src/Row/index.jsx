import React                from 'react';
import PropTypes            from 'prop-types';

import Grid                 from '../Grid';

const Row = ( {
    align,
    verticalAlign,
    children,
    gutters,
    hasMinHeight,
    role,
    spacing
} ) =>

    <Grid
        hasWrap       = { false }
        align         = { align }
        hasMinHeight  = { hasMinHeight }
        verticalAlign = { verticalAlign }
        gutters       = { gutters }
        spacing       = { spacing }
        role          = { role }>
        { children }
    </Grid>;

Row.propTypes =
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
     *  Row role
     */
    role     : PropTypes.string,
    /**
     *  Row content (Columns)
     */
    children : PropTypes.node
};

Row.defaultProps =
{
    align         : 'auto',
    hasMinHeight  : false,
    verticalAlign : 'auto',
    spacing       : 'default',
    gutters       : 'L',
};

export default Row;
