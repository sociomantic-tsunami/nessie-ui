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

export default class NavList extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  List content (NavItems)
         */
        children : PropTypes.node,
        /**
         *  How to lay out the list items
         */
        layout   : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    };

    static defaultProps =
    {
        layout : 'horizontal',
    };

    static displayName = 'NavList';

    render()
    {
        const {
            children,
            className,
            layout,
        } = this.props;

        const cssMap = evalTheme( this.context.NavList, this.props );

        return (
            <ul className = { buildClassName( className, cssMap, { layout } ) }>
                { children }
            </ul>
        );
    }
}
