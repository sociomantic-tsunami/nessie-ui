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
import { createCssMap }   from '../Theming/createCss';

export default class H4 extends React.Component
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

    static displayName = 'H4';

    render()
    {
        const {
            className,
            children,
            cssMap = createCssMap( this.context.H4, this.props ),
            title,
            role,
        } = this.props;

        return (
            <h4 className = { buildClassName( className, cssMap, { role } ) }>
                { children || title }
            </h4>
        );
    }
}
