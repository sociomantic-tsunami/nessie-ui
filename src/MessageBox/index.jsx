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

import Text                 from '../Text';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming/createCss';

export default class MessageBox extends React.Component
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
            children,
            cssMap = createCssMap( this.context.MessageBox, this.props ),
            message,
        } = this.props;

        const messageNode =
            <Text className = { cssMap.text } >{ message }</Text>;

        return (
            <div className = { cssMap.main }>
                { children || messageNode }
            </div>
        );
    }
}
