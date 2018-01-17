import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import TableRow             from '../TableRow';
import TableCell            from '../TableCell';
import Text                 from '../Text';
import Required             from '../Required';


const buildTableFromValues = ( values = [] ) =>
    values.map( ( row, i ) =>
        (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key = { i }>
                {
                    row.map( ( col, j ) =>
                    // eslint-disable-next-line react/no-array-index-key
                        <TableCell key = { j }>
                            <Text>{ col }</Text>
                        </TableCell>
                    )
                }
            </TableRow>
        ) );

const Table = ( {
    align,
    children,
    className,
    columns = [],
    cssMap,
    gutters,
    onToggle,
    values,
    isZebra,
    hasStickyHeader,
    verticalAlign,
} ) =>
{
    const _children = children || buildTableFromValues( values );

    const header = columns.length ?
        ( <TableRow
            align         = { align }
            className     = { cssMap.row }
            gutters       = { gutters }
            isSticky      = { hasStickyHeader }
            verticalAlign = { verticalAlign } >
            { columns.map( ( column, index ) =>
            {
                const title = column.title;
                const text  = column.isRequired ?
                    <Required>{ title }</Required> : title;
                const stickyCell = column.isSticky;

                return (
                    <TableCell
                        className   = { cssMap.cell }
                        isHeader
                        isSortable  = { column.isSortable }
                        isSticky    = { stickyCell }
                        key         = { index } // eslint-disable-line react/no-array-index-key, max-len
                        onToggle    = { onToggle }
                        size        = { column.size }
                        sort        = { column.sort }>
                        { text }
                    </TableCell>
                );
            } )
            }
        </TableRow> ) : null;


    const rows = React.Children.toArray( _children ).map( ( row ) =>
    {
        const cells = React.Children.toArray( row.props.children );

        return React.cloneElement( row,
            {
                align    : align || row.props.align,
                children : cells.map( ( cell, index ) =>
                {
                    if ( typeof columns[ index ] === 'object' )
                    {
                        const title = columns[ index ].title;
                        const size  = columns[ index ].size;
                        const rowHeaderCell = columns[ index ].isRowHeader;
                        const stickyCell = columns[ index ].isSticky;

                        return React.cloneElement( cell,
                            {
                                className : cell.props.className ?
                                    `${cell.props.className}  ${cssMap.cell}`
                                    : cssMap.cell,
                                columnTitle : title || cell.props.columnTitle,
                                size        : size || cell.props.size,
                                isRowHeader : rowHeaderCell ||
                                    cell.props.isRowHeader,
                                isSticky : stickyCell || cell.props.isSticky
                            } );
                    }
                    return cell;
                } ),
                className : row.props.className ?
                    `${row.props.className}  ${cssMap.row}` : cssMap.row,
                gutters       : gutters || row.props.gutters,
                verticalAlign : verticalAlign || row.props.verticalAlign,
            } );
    } );


    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { { zebra: isZebra } }>
            <div role = "grid" className = { className }>
                { header }
                { rows }
            </div>
        </Css>
    );
};

Table.propTypes =
{
    /**
     *  Text alignment inside cells
     */
    align    : PropTypes.oneOf( [ 'left', 'right', 'center', 'auto' ] ),
    /**
     *  Table content (TableRows containing TableCells; overrides values)
     */
    children : PropTypes.node,
    /**
     * Array of objects defining the table columns
     */
    columns  : PropTypes.arrayOf( PropTypes.shape( {
        title       : PropTypes.string,
        size        : PropTypes.string,
        isRowHeader : PropTypes.bool,
        isSticky    : PropTypes.bool,
        isRequired  : PropTypes.bool,
        isSortable  : PropTypes.bool,
        sort        : PropTypes.oneOf( [ 'asc', 'desc' ] )
    } ) ),
    gutters         : PropTypes.oneOf( [ 'S', 'M', 'L', 'none' ] ),
    /**
     *  Makes header row sticky
     */
    hasStickyHeader : PropTypes.bool,
    /**
     *  Display as zebra-striped
     */
    isZebra         : PropTypes.bool,
    /**
     *  Column sorter onToggle callback function: ( e ) => { ... }
     */
    onToggle        : PropTypes.func,
    /**
     * 2D Array of table values (for convenience)
     */
    values          : PropTypes.arrayOf(
        PropTypes.arrayOf( PropTypes.string )
    ),
    /**
     *  Vertical alignment inside cells
     */
    verticalAlign : PropTypes.oneOf( [ 'top', 'bottom', 'middle' ] ),
};

Table.defaultProps =
{
    align           : 'auto',
    cssMap          : require( './table.css' ),
    gutters         : 'M',
    hasStickyHeader : false,
    isZebra         : false,
    verticalAlign   : 'middle',
};

export default Table;
