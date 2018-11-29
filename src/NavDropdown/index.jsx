/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children } from 'react';
import PropTypes           from 'prop-types';

import { buildClassName }  from '../utils';
import { NavList }         from '../index';
import ThemeContext        from '../Theming/ThemeContext';
import { evalTheme }       from '../Theming/withTheme';

export default class NavDropdown extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Dropdown content (NavItems)
         */
        children  : PropTypes.node,
        /**
         *  CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
    };

    static defaultProps =
    {
        children  : undefined,
        className : undefined,
    };

    static displayName = 'NavDropdown';

    render()
    {
        const {
            children,
            className,
        } = this.props;

        const cssMap = evalTheme( this.context.NavDropdown, this.props );
        const items = Children.toArray( children ).map( child =>
            React.cloneElement( child, { ...child.props, role: 'sub' } ) );

        return (
            <NavList
                className = { buildClassName( className, cssMap ) }
                layout    = "vertical">
                { items }
            </NavList>
        );
    }
}
