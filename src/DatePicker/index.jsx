/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import DatePickerItem       from './DatePickerItem';
import DatePickerHeader     from './DatePickerHeader';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

export default class DatePicker extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
        className : PropTypes.string,
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        headers   : PropTypes.arrayOf( PropTypes
            .objectOf( PropTypes.string ) ),
        hourIsDisabled  : PropTypes.bool,
        hourIsReadOnly  : PropTypes.bool,
        hourPlaceholder : PropTypes.string,
        hourValue       : PropTypes.string,
        isDisabled      : PropTypes.bool,
        isReadOnly      : PropTypes.bool,
        items           : PropTypes.arrayOf( PropTypes
            .arrayOf( PropTypes.object ) ),
        hasTimeInput      : PropTypes.bool,
        label             : PropTypes.string,
        minuteIsDisabled  : PropTypes.bool,
        minuteIsReadOnly  : PropTypes.bool,
        minutePlaceholder : PropTypes.string,
        minuteValue       : PropTypes.string,
        month             : PropTypes.string,
        nextIsDisabled    : PropTypes.bool,
        nextIsReadOnly    : PropTypes.bool,
        onBlur            : PropTypes.func,
        onChange          : PropTypes.func,
        onClickItem       : PropTypes.func,
        onClickNext       : PropTypes.func,
        onClickPrev       : PropTypes.func,
        onFocus           : PropTypes.func,
        onKeyPress        : PropTypes.func,
        prevIsDisabled    : PropTypes.bool,
        prevIsReadOnly    : PropTypes.bool,
        type              : PropTypes.oneOf( [ 'day', 'month' ] ),
        year              : PropTypes.string,
    };

    static defaultProps = {
        className         : undefined,
        cssMap            : undefined,
        hasTimeInput      : true,
        headers           : undefined,
        hourIsDisabled    : false,
        hourIsReadOnly    : false,
        hourPlaceholder   : undefined,
        hourValue         : undefined,
        isDisabled        : false,
        isReadOnly        : false,
        items             : undefined,
        label             : undefined,
        minuteIsDisabled  : false,
        minuteIsReadOnly  : false,
        minutePlaceholder : undefined,
        minuteValue       : undefined,
        month             : undefined,
        nextIsDisabled    : false,
        nextIsReadOnly    : false,
        onBlur            : undefined,
        onChange          : undefined,
        onClickItem       : undefined,
        onClickNext       : undefined,
        onClickPrev       : undefined,
        onFocus           : undefined,
        onKeyPress        : undefined,
        prevIsDisabled    : false,
        prevIsReadOnly    : false,
        type              : 'day',
        year              : undefined,
    };

    static displayName = 'DatePicker';

    render()
    {
        const {
            cssMap = createCssMap( this.context.DatePicker, this.props ),
            hasTimeInput,
            headers,
            hourIsDisabled,
            hourIsReadOnly,
            hourPlaceholder,
            hourValue,
            isDisabled,
            isReadOnly,
            items,
            label,
            minuteIsDisabled,
            minuteIsReadOnly,
            minutePlaceholder,
            minuteValue,
            month,
            nextIsDisabled,
            nextIsReadOnly,
            onBlur,
            onChange,
            onClickItem,
            onClickNext,
            onClickPrev,
            onFocus,
            onKeyPress,
            prevIsDisabled,
            prevIsReadOnly,
            type,
            year,
        } = this.props;

        return (
            <div className = { cssMap.main }>
                <DatePickerHeader
                    hasTimeInput      = { hasTimeInput }
                    hourIsDisabled    = { hourIsDisabled }
                    hourIsReadOnly    = { hourIsReadOnly }
                    hourPlaceholder   = { hourPlaceholder }
                    hourValue         = { hourValue }
                    isDisabled        = { isDisabled }
                    isReadOnly        = { isReadOnly }
                    label             = { label }
                    minuteIsDisabled  = { minuteIsDisabled }
                    minuteIsReadOnly  = { minuteIsReadOnly }
                    minutePlaceholder = { minutePlaceholder }
                    minuteValue       = { minuteValue }
                    month             = { month }
                    nextIsDisabled    = { nextIsDisabled }
                    nextIsReadOnly    = { nextIsReadOnly }
                    onBlur            = { onBlur }
                    onChange          = { onChange }
                    onClickNext       = { onClickNext }
                    onClickPrev       = { onClickPrev }
                    onFocus           = { onFocus }
                    onKeyPress        = { onKeyPress }
                    prevIsDisabled    = { prevIsDisabled }
                    prevIsReadOnly    = { prevIsReadOnly }
                    year              = { year } />

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
                                        </th> ) }
                                </tr>
                            </thead>
                        }
                        <tbody>
                            { items.map( ( item, i ) =>
                                <tr key = { i }>
                                    { item.map( ( item, j ) =>
                                        <td key = { j }>
                                            { item.value &&
                                                <DatePickerItem
                                                    { ...item }
                                                    onClick = { onClickItem }
                                                    type    = { type } />
                                            }
                                        </td> ) }
                                </tr> ) }
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}
