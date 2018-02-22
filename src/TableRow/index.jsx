import React              from 'react';
import PropTypes          from 'prop-types';

import Row                from '../Row';
import { buildClassName } from '../utils';
import styles             from './tableRow.css';

const TableRow = ( {
    align,
    children,
    className,
    cssMap,
    gutters,
    isSticky,
    verticalAlign,
} ) =>
{
    const cells = React.Children.toArray( children ).map( cell =>
        React.cloneElement( cell,
            {
                align         : cell.props.align || align,
                verticalAlign : cell.props.verticalAlign || verticalAlign,
            }
        )
    );

    return (
        <Row
            className = { buildClassName( className, cssMap, {
                sticky : isSticky,
            } ) }
            role    = "row"
            gutters = { gutters }
            spacing = "none">
            { cells }
        </Row>
    );
};

TableRow.propTypes =
{
    /**
     *  Globally sets cell horizonal alignment
     *  for this row (individual cell alignment will override)
     */
    align         : PropTypes.oneOf( [ 'auto', 'left', 'center', 'right' ] ),
    /**
     *  Row content (TableCells)
     */
    children      : PropTypes.node,
    /**
     *  Gutter size
     */
    gutters       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     *  Makes the row sticky
     */
    isSticky      : PropTypes.bool,
    /**
     *  Globally sets cell vertical alignment
     *  for this row (individual cell alignment will overrides)
     */
    verticalAlign : PropTypes.oneOf( [ 'auto', 'top', 'middle', 'bottom' ] ),
};

TableRow.defaultProps =
{
    align         : undefined,
    children      : undefined,
    cssMap        : styles,
    gutters       : undefined,
    isSticky      : false,
    verticalAlign : undefined,
};

export default TableRow;
