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

import { IconButton, Text } from '..';

import TimeInput            from './TimeInput';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';


export default class DatePickerHeader extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
        className         : PropTypes.string,
        cssMap            : PropTypes.objectOf( PropTypes.string ),
        hasTimeInput      : PropTypes.bool,
        hourIsDisabled    : PropTypes.bool,
        hourIsReadOnly    : PropTypes.bool,
        hourPlaceholder   : PropTypes.string,
        hourValue         : PropTypes.string,
        isDisabled        : PropTypes.bool,
        isReadOnly        : PropTypes.bool,
        minuteIsDisabled  : PropTypes.bool,
        minuteIsReadOnly  : PropTypes.bool,
        minutePlaceholder : PropTypes.string,
        minuteValue       : PropTypes.string,
        month             : PropTypes.string,
        nextIsDisabled    : PropTypes.bool,
        nextIsReadOnly    : PropTypes.bool,
        onBlur            : PropTypes.func,
        onChange          : PropTypes.func,
        onClickNext       : PropTypes.func,
        onClickPrev       : PropTypes.func,
        onFocus           : PropTypes.func,
        onKeyPress        : PropTypes.func,
        prevIsDisabled    : PropTypes.bool,
        prevIsReadOnly    : PropTypes.bool,
        year              : PropTypes.string,
    };

    static defaultProps = {
        className         : undefined,
        cssMap            : undefined,
        hasTimeInput      : true,
        hourIsDisabled    : false,
        hourIsReadOnly    : false,
        hourPlaceholder   : undefined,
        hourValue         : undefined,
        isDisabled        : undefined,
        isReadOnly        : undefined,
        minuteIsDisabled  : false,
        minuteIsReadOnly  : false,
        minutePlaceholder : undefined,
        minuteValue       : undefined,
        month             : undefined,
        nextIsDisabled    : undefined,
        nextIsReadOnly    : undefined,
        onBlur            : undefined,
        onChange          : undefined,
        onClickNext       : undefined,
        onClickPrev       : undefined,
        onFocus           : undefined,
        onKeyPress        : undefined,
        prevIsDisabled    : undefined,
        prevIsReadOnly    : undefined,
        year              : undefined,
    };

    render()
    {
        const {
            cssMap = createCssMap( this.context.DatePickerHeader, this.props ),
            hasTimeInput,
            hourIsDisabled,
            hourIsReadOnly,
            hourPlaceholder,
            hourValue,
            isDisabled,
            isReadOnly,
            minuteIsDisabled,
            minuteIsReadOnly,
            minutePlaceholder,
            minuteValue,
            month,
            nextIsDisabled,
            nextIsReadOnly,
            onBlur,
            onChange,
            onClickNext,
            onClickPrev,
            onFocus,
            onKeyPress,
            prevIsDisabled,
            prevIsReadOnly,
            year,
        } = this.props;

        return (
            <div className = { cssMap.main }>
                <div className = { cssMap.buttonsWrapper }>
                    <IconButton
                        className  = { cssMap.prev }
                        iconType   = "left"
                        isDisabled = { isDisabled || prevIsDisabled }
                        isReadOnly = { isReadOnly || prevIsReadOnly }
                        onClick    = { onClickPrev }
                        role       = "inverted" />
                    <IconButton
                        className  = { cssMap.next }
                        iconType   = "right"
                        isDisabled = { isDisabled || nextIsDisabled }
                        isReadOnly = { isReadOnly || nextIsReadOnly }
                        onClick    = { onClickNext }
                        role       = "inverted" />
                </div>
                <Text className = { cssMap.date }>
                    { month }
                    <span className = { cssMap.year }> { year } </span>
                </Text>
                { hasTimeInput &&
                    <TimeInput
                        hourIsDisabled    = { hourIsDisabled }
                        hourIsReadOnly    = { hourIsReadOnly }
                        hourPlaceholder   = { hourPlaceholder }
                        hourValue         = { hourValue }
                        isDisabled        = { isDisabled }
                        isReadOnly        = { isReadOnly }
                        minuteIsDisabled  = { minuteIsDisabled }
                        minuteIsReadOnly  = { minuteIsReadOnly }
                        minutePlaceholder = { minutePlaceholder }
                        minuteValue       = { minuteValue }
                        onBlur            = { onBlur }
                        onChange          = { onChange }
                        onFocus           = { onFocus }
                        onKeyPress        = { onKeyPress } />
                }
            </div>
        );
    }
}
