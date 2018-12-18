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

import ThemeContext       from '../Theming/ThemeContext';
import { createCssMap }   from '../Theming/createCss';

export default class H1 extends React.Component
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
            children,
            cssMap = createCssMap( this.context.H1, this.props ),
            title,
        } = this.props;

        return (
            <h1 className = { cssMap.main }>
                { children || title }
            </h1>
        );
    }
}
