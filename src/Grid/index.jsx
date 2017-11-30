import React        from 'react';
import PropTypes    from 'prop-types';

import Css          from '../hoc/Css';
import Row          from '../Row';

const Grid = ( {
    align,
    children,
    className,
    cssMap,
    multiline, } ) =>

    <Css cssMap = { cssMap }>
        <Row
            className = { className }
            hasWrap   = { multiline }
            align     = { align }>
            { children }
        </Row>
    </Css>;

Grid.propTypes =
{
    /**
    * Horizontal alignment of the columns (“auto” makes all columns equal
    * width)
    */
    align : PropTypes.oneOf( [
        'left',
        'center',
        'right'
    ] ),
    /**
    *  Grid content to wrap
    */
    children  : PropTypes.node,
    /**
    *  Allow Grid content to wrap to the next line
    */
    multiline : PropTypes.bool,
};

Grid.defaultProps =
{
    align     : 'left',
    cssMap    : require( './grid.css' ),
    multiline : true
};

export default Grid;
