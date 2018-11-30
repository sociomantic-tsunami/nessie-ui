/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import ThemeContext       from '../Theming/ThemeContext';
import { evalTheme }      from '../Theming/withTheme';

export default class H1 extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
        *  Title text
        */
        title : PropTypes.string,
        /**
        *  Role (style) to apply to heading
        */
        role  : PropTypes.oneOf( [
            'default',
            'subtle',
            'promoted',
            'critical',
        ] ),
    };

    static defaultProps =
    {
        title : undefined,
        role  : 'default',
    };

    static displayName = 'H1';

    render()
    {
        const {
            className,
            children,
            cssMap = evalTheme( this.context.H1, this.props ),
            title,
            role,
        } = this.props;

        return (
            <h1 className = { buildClassName( className, cssMap, { role } ) }>
                { children || title }
            </h1>
        );
    }
}
