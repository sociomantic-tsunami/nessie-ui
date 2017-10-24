import React                          from 'react';
import PropTypes                      from 'prop-types';

import { Table, TableRow, TableCell } from '../index';
import { buildClassName }             from '../utils';
import styles                         from './datePicker.css';
import DatePickerItem                 from './DatePickerItem';
import DatePickerHeader               from './DatePickerHeader';


const DatePicker = ( {
    className,
    cssMap,
    headers,
    isDisabled,
    isReadOnly,
    items,
    label,
    nextIsDisabled,
    onClickItem,
    onClickNext,
    onClickPrev,
    prevIsDisabled,
} ) => (
    <div className = { buildClassName( className, cssMap ) }>
        <DatePickerHeader
            isDisabled     = { isDisabled }
            isReadOnly     = { isReadOnly }
            label          = { label }
            nextIsDisabled = { nextIsDisabled }
            onClickNext    = { onClickNext }
            onClickPrev    = { onClickPrev }
            prevIsDisabled = { prevIsDisabled } />
        <Table>
            <TableRow gutters = "S">
                { headers && headers.map( ( header, i ) =>
                    <TableCell align = "center" isHeader key = { i }>
                        { header.label }
                    </TableCell>
                ) }
            </TableRow>
            { items && items.map( ( row, i ) =>
                <TableRow gutters = "S" key = { i }>
                    { headers && headers.map( ( header, j ) =>
                        <TableCell align = "center" key = { j }>
                            { row[ j ] &&
                                <DatePickerItem
                                    { ...row[ j ] }
                                    onClick = { onClickItem } />
                            }
                        </TableCell>
                    ) }
                </TableRow>
            ) }
        </Table>
    </div>
);

DatePicker.propTypes = {
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    headers   : PropTypes.arrayOf(
        PropTypes.objectOf( PropTypes.string ) ),
    isDisabled     : PropTypes.bool,
    isReadOnly     : PropTypes.bool,
    items          : PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.object ) ),
    label          : PropTypes.string,
    nextIsDisabled : PropTypes.bool,
    onClickItem    : PropTypes.func,
    onClickNext    : PropTypes.func,
    onClickPrev    : PropTypes.func,
    prevIsDisabled : PropTypes.bool,
};

DatePicker.defaultProps = {
    className      : null,
    cssMap         : styles,
    headers        : null,
    isDisabled     : false,
    isReadOnly     : false,
    items          : null,
    label          : null,
    nextIsDisabled : false,
    onClickItem    : null,
    onClickNext    : null,
    onClickPrev    : null,
    prevIsDisabled : false,
};

export default DatePicker;
