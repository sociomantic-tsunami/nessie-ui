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
import ThemeContext         from '../Theming/ThemeContext';
import { evalTheme }        from '../Theming/withTheme';

export default class PageHeader extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  PageHeader content
         */
        children : PropTypes.node,
    };

    static displayName = 'PageHeader';

    render()
    {
        const { children, className } = this.props;

        const cssMap = evalTheme( this.context.PageHeader, this.props );

        return (
            <header className = { buildClassName( className, cssMap ) }>
                { children }
            </header>
        );
    }
}
