import React, { Component } from 'react';
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
                    <TableCell key = { j }><Text>{ col }</Text></TableCell>
                )
            }
        </TableRow>
    ) );


export default class Table extends Component
{
    static propTypes =
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
         *  Table content (TableRows containing TableCells; overrides values)
         */
        children : PropTypes.node,

        /**
         *  Is Data Table (smaller fonts, zebra paddings)
         */
        isDataTable : PropTypes.bool,

        /**
         *  Display as zebra-striped
         */
        isZebra  : PropTypes.bool,
        /**
         *  Column sorter onToggle callback function: ( e ) => { ... }
         */
        onToggle : PropTypes.func
    };

    static defaultProps =
    {
        isZebra     : false,
        isDataTable : false,
        cssMap      : require( './table.css' )
    };

    render()
    {
        const {
                children,
                className,
                columns = [],
                cssMap,
                onToggle,
                values,
                isDataTable,
                isZebra
        } = this.props;

        const _children = children || buildTableFromValues( values );

        const header = columns.length ?
            ( <TableRow verticalAlign = "middle" className = { cssMap.row }>
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


        const rows = React.Children.toArray( _children ).map( ( row ) =>
        {
            const cells = React.Children.toArray( row.props.children );

            return React.cloneElement( row,
                {
                    children : cells.map( ( cell, index ) =>
                            {
                        if ( typeof columns[ index ] === 'object' )
                                {
                            const title = columns[ index ].title;
                            const size  = columns[ index ].size;

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
                    { rows }
                </div>
            </Css>
        );
    }
}
