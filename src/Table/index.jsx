import React                   from 'react';
import PropTypes               from 'prop-types';

import TableCell               from '../TableCell';
import TableRow                from '../TableRow';
import Required                from '../Required';
import { buildClassName }      from '../utils';
import styles                  from './table.css';
import { buildRowsFromValues } from './utils';


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
    const rows = React.Children.toArray( children ||
        buildRowsFromValues( values ) ).map( row =>
    {
        const cells = React.Children.toArray( row.props.children );

        return React.cloneElement( row, {
            align    : row.props.align || align,
            children : cells.map( ( cell, i ) =>
            {
                const column      = columns[ i ];
                const columnProps = column && {
                    align       : cell.props.align || column.align,
                    columnTitle : cell.props.columnTitle || column.title,
                    size        : cell.props.size || column.size,
                    isRowHeader : cell.props.isRowHeader ||
                        column.isRowHeader,
                    isSticky      : cell.props.isSticky || column.isSticky,
                    verticalAlign : cell.props.verticalAlign ||
                        column.verticalAlign,
                };

                return React.cloneElement( cell, {
                    ...columnProps,
                    className : cell.props.className ?
                        `${cell.props.className}  ${cssMap.cell}` : cssMap.cell,
                } );
            } ),
            className : row.props.className ?
                `${row.props.className}  ${cssMap.row}` : cssMap.row,
            gutters       : row.props.gutters || gutters,
            verticalAlign : row.props.verticalAlign || verticalAlign,
        } );
    } );


    return (
        <div
            className = { buildClassName( className, cssMap, {
                zebra : isZebra,
            } ) }
            role = "grid">
            { columns.length &&
                <TableRow
                    align         = { align }
                    className     = { cssMap.row }
                    gutters       = { gutters }
                    isSticky      = { hasStickyHeader }
                    verticalAlign = { verticalAlign } >
                    { columns.map( ( column, i ) =>
                    {
                        const title = column.title;
                        const text  = column.isRequired ?
                            <Required>{ title }</Required> : title;
                        const stickyCell = column.isSticky;

                        return (
                            <TableCell
                                align         = { column.align }
                                className     = { cssMap.cell }
                                isHeader
                                isSortable    = { column.isSortable }
                                isSticky      = { stickyCell }
                                key           = { i }
                                onToggle      = { onToggle }
                                size          = { column.size }
                                sort          = { column.sort }
                                verticalAlign = { column.verticalAlign }>
                                { text }
                            </TableCell>
                        );
                    } ) }
                </TableRow>
            }
            { rows }
        </div>
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
    children        : undefined,
    columns         : undefined,
    cssMap          : styles,
    gutters         : 'M',
    hasStickyHeader : false,
    isZebra         : false,
    onToggle        : undefined,
    values          : undefined,
    verticalAlign   : 'middle',
};

export default Table;
