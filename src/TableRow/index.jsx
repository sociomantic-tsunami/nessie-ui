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
    isSticky,
    verticalAlign } ) =>
{
    const cells = React.Children.toArray( children );

    return (
        <Css
            cssMap = { cssMap }
            cssProps = { {
                sticky : isSticky
            } }>
            <Row
                className     = { className }
                role          = "row"
                align         = { align }
                verticalAlign = { verticalAlign }
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
     *  Makes the row sticky
     */
    isSticky : PropTypes.bool,
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
    isSticky      : false,
    cssMap        : require( './tableRow.css' )
};

export default TableRow;
