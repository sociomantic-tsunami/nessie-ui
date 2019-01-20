/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                              from 'react';
import PropTypes                          from 'prop-types';

import { createEventHandler, generateId } from '../utils';
import ThemeContext                       from '../Theming/ThemeContext';
import { createCssMap }                   from '../Theming';


export default class TimeInput extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
        className         : PropTypes.string,
        cssMap            : PropTypes.objectOf( PropTypes.string ),
        forceHover        : PropTypes.bool,
        hourIsDisabled    : PropTypes.bool,
        hourIsReadOnly    : PropTypes.bool,
        hourPlaceholder   : PropTypes.string,
        hourValue         : PropTypes.string,
        id                : PropTypes.string,
        isDisabled        : PropTypes.bool,
        isReadOnly        : PropTypes.bool,
        minuteIsDisabled  : PropTypes.bool,
        minuteIsReadOnly  : PropTypes.bool,
        minutePlaceholder : PropTypes.string,
        minuteValue       : PropTypes.string,
        onChangeHour      : PropTypes.func,
        onChangeMinute    : PropTypes.func,
    };

    static defaultProps = {
        className         : undefined,
        cssMap            : undefined,
        forceHover        : false,
        hourIsDisabled    : false,
        hourIsReadOnly    : false,
        hourPlaceholder   : 'HH',
        hourValue         : undefined,
        id                : undefined,
        isDisabled        : false,
        isReadOnly        : false,
        minuteIsDisabled  : false,
        minuteIsReadOnly  : false,
        minutePlaceholder : 'mm',
        minuteValue       : undefined,
        onChangeHour      : undefined,
        onChangeMinute    : undefined,
    };

    render()
    {
        const {
            cssMap = createCssMap( this.context.TimeInput, this.props ),
            hourIsDisabled,
            hourIsReadOnly,
            hourPlaceholder,
            hourValue,
            id = generateId( 'TimeInput' ),
            isDisabled,
            isReadOnly,
            minuteIsDisabled,
            minuteIsReadOnly,
            minutePlaceholder,
            minuteValue,
            onChangeHour,
            onChangeMinute,
        } = this.props;

        return (
            <div className = { cssMap.main }>
                <input
                    className   = { cssMap.hour }
                    disabled    = { isDisabled || hourIsDisabled }
                    id          = { `${id}-hour` }
                    onChange    = { createEventHandler( onChangeHour ) }
                    placeholder = { hourPlaceholder }
                    readOnly    = { isReadOnly || hourIsReadOnly }
                    type        = "text"
                    value       = { hourValue } />
                <span>:</span>
                <input
                    className   = { cssMap.min }
                    disabled    = { isDisabled || minuteIsDisabled }
                    id          = { `${id}-minute` }
                    onChange    = { createEventHandler( onChangeMinute ) }
                    placeholder = { minutePlaceholder }
                    readOnly    = { isReadOnly || minuteIsReadOnly }
                    type        = "text"
                    value       = { minuteValue } />
            </div>
        );
    }
}
