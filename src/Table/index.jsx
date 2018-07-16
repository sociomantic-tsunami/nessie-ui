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
    borders,
    hasStickyHeader,
    isZebra,
    onMouseOut,
    onMouseOver,
    onToggle,
    rows = [],
    spacing,
    values,
    verticalAlign,
} ) =>
{
    const body = React.Children.toArray( children ||
        buildRowsFromValues( values ) ).map( ( row, i ) =>
    {
        const cells = React.Children.toArray( row.props.children );

        const rowClass = i === 0 && columns.length < 1 ?
            cssMap.headerRow : cssMap.row;

        return React.cloneElement( row, {
            ...rows[ i ],
            align    : row.props.align || align,
            children : cells.map( ( cell, j ) =>
            {
                const column      = columns[ j ];
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
                `${row.props.className}  ${rowClass}` : rowClass,
            gutters       : row.props.gutters || gutters,
            spacing       : row.props.spacing || spacing,
            verticalAlign : row.props.verticalAlign || verticalAlign,
        } );
    } );


    return (
        <div
            className = { buildClassName( className, cssMap, {
                borders,
                zebra : isZebra,
            } ) }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }
            role         = "grid">
            { columns.length > 0 &&
                <TableRow
                    align         = { align }
                    className     = { cssMap.headerRow }
                    gutters       = { gutters }
                    isSticky      = { hasStickyHeader }
                    spacing       = { spacing }
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
            { body }
        </div>
    );
};

Table.propTypes =
{
    /**
     *  Text alignment inside cells
     */
    align     : PropTypes.oneOf( [ 'left', 'right', 'center', 'auto' ] ),
    /**
     *  Table content (TableRows containing TableCells; overrides values)
     */
    children  : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className : PropTypes.string,
    /**
     *  Array of objects defining the table columns
     */
    columns   : PropTypes.arrayOf( PropTypes.object ),
    /**
     *  Gutter size
     */
    gutters   : PropTypes.oneOf( [ 'S', 'M', 'L', 'none' ] ),
    /**
     *  Display table with borders
     */
    borders   : PropTypes.oneOf( [
        'cells', 'rows', 'none', 'rowDivider', 'columnDivider' ] ),
    /**
     *  Makes header row sticky
     */
    hasStickyHeader : PropTypes.bool,
    /**
     *  Display as zebra-striped
     */
    isZebra         : PropTypes.bool,
    /**
     *  onMouseOut callback function:
     *  ( e ) => { ... }
     */
    onMouseOut      : PropTypes.func,
    /**
     *  onMouseOver callback function:
     *  ( e ) => { ... }
     */
    onMouseOver     : PropTypes.func,
    /**
     *  Column sorter onToggle callback function: ( e ) => { ... }
     */
    onToggle        : PropTypes.func,
    /**
     *  Array of objects defining the table rows
     */
    rows            : PropTypes.arrayOf( PropTypes.object ),
    /**
     *  Row spacing
     */
    spacing         : PropTypes.oneOf( [ 'S', 'M', 'L', 'none' ] ),
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
    className       : undefined,
    columns         : undefined,
    cssMap          : styles,
    gutters         : 'M',
    borders         : 'none',
    hasStickyHeader : false,
    isZebra         : false,
    onMouseOut      : undefined,
    onMouseOver     : undefined,
    onToggle        : undefined,
    rows            : undefined,
    spacing         : 'M',
    values          : undefined,
    verticalAlign   : 'middle',
};

export default Table;
