import React                          from 'react';
import PropTypes                      from 'prop-types';

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
    type,
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

        { items &&
            <table className = { cssMap.calendar }>
                { headers &&
                    <thead className = { cssMap.calendarHeader }>
                        <tr>
                            { headers.map( ( header, i ) =>
                                <th key = { i }>
                                    <span title = { header.title }>
                                        { header.label }
                                    </span>
                                </th>
                            ) }
                        </tr>
                    </thead>
                }
                <tbody>
                    { items.map( ( item, i ) =>
                        <tr key = { i }>
                            { item.map( ( item, j ) =>
                                <td key = { j }>
                                    <DatePickerItem
                                        { ...item }
                                        onClick = { onClickItem }
                                        type    = { type } />
                                </td>
                            ) }
                        </tr>
                    ) }
                </tbody>
            </table>
        }
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
    type           : PropTypes.oneOf( [ 'day', 'month' ] ),
};

DatePicker.defaultProps = {
    className      : undefined,
    cssMap         : styles,
    headers        : undefined,
    isDisabled     : false,
    isReadOnly     : false,
    items          : undefined,
    label          : undefined,
    nextIsDisabled : false,
    onClickItem    : undefined,
    onClickNext    : undefined,
    onClickPrev    : undefined,
    prevIsDisabled : false,
    type           : "day",
};

export default DatePicker;
