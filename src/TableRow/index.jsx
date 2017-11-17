import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Row                  from '../Row';

const TableRow = ( {
    align,
    children,
    className,
    cssMap,
    gutters,
    verticalAlign } ) =>
{
    const cells = React.Children.toArray( children ).map( cell =>
        React.cloneElement( cell,
            {
                align         : align || cell.props.align,
                verticalAlign : verticalAlign || cell.props.verticalAlign,
            }
        )
    );

    return (
        <Css cssMap = { cssMap }>
            <Row
                className     = { className }
                role          = "row"
                gutters       = { gutters }
                spacing       = "none">
                { cells }
            </Row>
        </Css>
    );
};

TableRow.propTypes =
{
    /**
     *  Globally sets cell horizonal alignment
     *  for this row (individual cell alignment will override)
     */
    align : PropTypes.oneOf( [
        'auto',
        'left',
        'center',
        'right'
    ] ),
    /**
     *  Globally sets cell vertical alignment
     *  for this row (individual cell alignment will overrides)
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
     *  Row content (TableCells)
     */
    children : PropTypes.node
};

TableRow.defaultProps =
{
    align         : 'auto',
    verticalAlign : 'auto',
    gutters       : 'L',
    cssMap        : require( './tableRow.css' )
};

export default TableRow;
