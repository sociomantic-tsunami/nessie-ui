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

import { buildClassName }   from '../utils';
import Text                 from '../Text';
import ThemeContext         from '../Theming/ThemeContext';
import { evalTheme }        from '../Theming/withTheme';

export default class MessageBox extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
        *  Message text
        */
        message     : PropTypes.string,
        /**
        *  Message type
        */
        messageType : PropTypes.oneOf( [
            'default',
            'alert',
            'info',
            'error',
            'success',
        ] ),
    };

    static defaultProps =
    {
        messageType : 'default',
    };

    static displayName = 'MessageBox';

    render()
    {
        const {
            className,
            children,
            cssMap = evalTheme( this.context.MessageBox, this.props ),
            message,
            messageType,
        } = this.props;

        const messageNode =
            <Text className = { cssMap.text } >{ message }</Text>;

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    type : messageType,
                } ) }>
                { children || messageNode }
            </div>
        );
    }
}
