import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import TableRow             from '../TableRow';
import TableCell            from '../TableCell';
import Text                 from '../Text';
import Required             from '../Required';


const buildTableFromValues = ( values = [], rows = [], stickyHeaderRow  ) =>

    values.map( ( row, i ) =>
    {
        let headerRow;

        if ( rows.length )
        {
            const rowTitle = rows[ i ].title;
            const rowTitleText  = rows[ i ].isRequired ?
                <Required>{ rowTitle }</Required> : rowTitle;

            headerRow =  ( <TableCell
                isRowHeader
                isSticky = { stickyHeaderRow }
                size = { rows[ i ].size }
                key  = { `header_${i}` } // eslint-disable-line react/no-array-index-key, max-len
            >
                { rowTitleText }
            </TableCell>
            );
        }
        return (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key = { i }>
                { headerRow }
                {
                    row.map( ( col, j ) =>
                    // eslint-disable-next-line react/no-array-index-key
                        <TableCell key = { j }><Text>{ col }</Text></TableCell>
                    )
                }
            </TableRow>
        );
    } );

const Table = ( {
    children,
    className,
    columns = [],
    cssMap,
    onToggle,
    values,
    isDataTable,
    isZebra,
    rows = [],
    stickyHeader,
    stickyHeaderRow } ) =>
{
    const _children = children || buildTableFromValues( values, rows,
        stickyHeaderRow );

    const header = columns.length ?
        ( <TableRow
            isSticky = { stickyHeader }
            verticalAlign = "middle"
            className = { cssMap.row }>
            { rows.length > 0 &&
                <TableCell
                    isHeader
                    isStickyFixed = { stickyHeaderRow }
                    size = { rows[ 0 ].size } />
            }
            { columns.map( ( column, index ) =>
            {
                const title = column.title;
                const text  = column.isRequired ?
                    <Required>{ title }</Required> : title;

                return (
                    <TableCell
                        isHeader
                        isDataTable = { isDataTable }
                        isSortable  = { column.isSortable }
                        sort        = { column.sort }
                        size        = { column.size }
                        onToggle    = { onToggle }
                        key         = { index } // eslint-disable-line react/no-array-index-key, max-len
                    >
                        { text }
                    </TableCell>
                );
            } )
            }
        </TableRow> ) : null;


    const childRows = React.Children.toArray( _children ).map( ( row ) =>
    {
        const cells = React.Children.toArray( row.props.children );

        return React.cloneElement( row,
            {
                children : cells.map( ( cell, index ) =>
                {
                    const columnIndex = rows.length ? index - 1 : index;

                    if ( typeof columns[ columnIndex ] === 'object' )
                    {
                        const title = columns[ columnIndex ].title;
                        const size  = columns[ columnIndex ].size;

                        return React.cloneElement( cell,
                            {
                                columnTitle : title ||
                                cell.props.columnTitle,
                                size : size || cell.props.size
                            } );
                    }
                    return cell;
                } ),
                className : row.props.className ?
                    `${row.props.className}  ${cssMap.row}` : cssMap.row
            } );
    } );


    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { {
                dataTable : isDataTable,
                zebra     : isZebra
            } }>
            <div role = "grid" className = { className }>
                { header }
                { childRows }
            </div>
        </Css>
    );
};

Table.propTypes =
{
    /**
     * 2D Array of table values (for convenience)
     */
    values  : PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.string ) ),
    /**
     * Array of objects defining the table columns
     */
    columns : PropTypes.arrayOf( PropTypes.shape( {
        title      : PropTypes.string,
        size       : PropTypes.string,
        isRequired : PropTypes.bool,
        isSortable : PropTypes.bool,
        sort       : PropTypes.oneOf( [ 'asc', 'desc' ] )
    } ) ),
    /**
     * Array of objects defining the table rows
     */
    rows : PropTypes.arrayOf( PropTypes.shape( {
        title      : PropTypes.string,
        size       : PropTypes.string,
        isRequired : PropTypes.bool
    } ) ),
    /**
     *  Table content (TableRows containing TableCells; overrides values)
     */
    children        : PropTypes.node,
    /**
     *  Is Data Table (smaller fonts, zebra paddings)
     */
    isDataTable     : PropTypes.bool,
    /**
     *  Display as zebra-striped
     */
    isZebra         : PropTypes.bool,
    /**
     *  Column sorter onToggle callback function: ( e ) => { ... }
     */
    onToggle        : PropTypes.func,
    /**
     *  Makes header row sticky
     */
    stickyHeader    : PropTypes.bool,
    /**
     *  Makes the header of each row sticky
     */
    stickyHeaderRow : PropTypes.bool
};

Table.defaultProps =
{
    isZebra         : false,
    isDataTable     : false,
    stickyHeader    : false,
    stickyHeaderRow : false,
    cssMap          : require( './table.css' )
};

export default Table;
