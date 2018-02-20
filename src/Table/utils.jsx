import React     from 'react';

import TableCell from '../TableCell';
import TableRow  from '../TableRow';
import Text      from '../Text';

/**
 * ## buildTableRowsFromValues
 * Builds TableRows/Cols from a 2D array of string values
 *
 * @param   {Array.<Array.<String>>}    values  2D array of values
 *
 * @return  {ReactElement}
 *
 */
function buildRowsFromValues( values = [] )
{
    return values.map( ( row, i ) => (
        <TableRow key = { i }>
            { row.map( ( col, j ) => (
                <TableCell key = { j }>
                    <Text>{ col }</Text>
                </TableCell>
            ) ) }
        </TableRow>
    ) );
}

export { buildRowsFromValues };
export default { buildRowsFromValues };
