/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React     from 'react';

import TableCell from '../TableCell';
import TableRow  from '../TableRow';


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
                    { col }
                </TableCell>
            ) ) }
        </TableRow>
    ) );
}

export { buildRowsFromValues };
export default { buildRowsFromValues };
