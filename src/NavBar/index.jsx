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
import { NavList }          from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { evalTheme }        from '../Theming/withTheme';

export default class NavBar extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Navigation bar content (NavItems)
         */
        children : PropTypes.node,
    };

    static displayName = 'NavBar';

    render()
    {
        const {
            children,
            className,
        } = this.props;

        const cssMap = evalTheme( this.context.NavBar, this.props );

        return (
            <nav className = { buildClassName( className, cssMap ) }>
                <NavList>
                    { children }
                </NavList>
            </nav>
        );
    }
}
