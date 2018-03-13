import React     from 'react';
import PropTypes from 'prop-types';

import { Grid }  from '../index';

const Row = props => <Grid { ...props } hasWrap = { false } />;

Row.propTypes =
{
    /**
     * Horizontal alignment of the columns (“auto” makes all columns equal
     * width)
     */
    align         : PropTypes.oneOf( [ 'auto', 'left', 'center', 'right' ] ),
    /**
     *  Row content (Columns)
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
     *  onClick callback function:
     *  ( e ) => { ... }
     */
    onClick       : PropTypes.func,
    /**
     *  onMouseOut callback function:
     *  () => { ... }
     */
    onMouseOut    : PropTypes.func,
    /**
     *  onMouseOver callback function:
     *  () => { ... }
     */
    onMouseOver   : PropTypes.func,
    /**
     *  Row role
     */
    role          : PropTypes.string,
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

Row.defaultProps =
{
    align         : 'auto',
    children      : undefined,
    className     : undefined,
    cssMap        : undefined,
    gutters       : 'L',
    hasMinHeight  : false,
    onClick       : undefined,
    onMouseOut    : undefined,
    onMouseOver   : undefined,
    role          : undefined,
    spacing       : 'M',
    verticalAlign : 'auto',
};

export default Row;
